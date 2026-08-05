import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/lib/supabaseServer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function GET(request: Request) {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID non configuré' }, { status: 500 });
    }

    // Récupérer la session active via le client Supabase
    const supabase = await createClient();

const { data: { user } } = await supabase.auth.getUser();

const userEmail = user?.email;
const userId = user?.id;

    // Création de la session de paiement Stripe
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}`,
    };

    if (userEmail) {
      sessionConfig.customer_email = userEmail;
    }
console.log("SESSION UTILISATEUR :", userSession);
console.log("USER ID ENVOYÉ À STRIPE :", userId);
    // <--- 2. Transmettre l'ID utilisateur à Stripe pour que le webhook le retrouve
    if (userId) {
      sessionConfig.client_reference_id = userId;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.redirect(session.url!, 303);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}