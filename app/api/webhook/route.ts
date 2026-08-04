import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia' as any,
});

// Client Supabase Admin pour contourner les règles RLS lors du webhook
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Attention: bien utiliser la clé service_role (secrète)
);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log("TYPE EVENT :", event.type);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Quand le paiement Stripe est réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
console.log("CLIENT REFERENCE ID :", session.client_reference_id);
console.log("SESSION COMPLETE :", session);
const userId = session.client_reference_id;

if (userId) {

  console.log("USER ID STRIPE :", userId);

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update({ has_paid: true })
    .eq('id', userId)
    .select();

  console.log("PROFIL MIS A JOUR :", data);
  console.log("ERREUR UPDATE :", error);

      if (error) {
        console.error('Erreur Supabase Webhook:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour BDD' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
}