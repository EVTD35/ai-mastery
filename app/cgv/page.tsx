import Link from 'next/link';

export default function CgvPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:underline">← Retour à l'accueil</Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">Conditions Générales de Vente (CGV)</h1>
        
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Objet</h2>
            <p>Les présentes Conditions Générales de Vente régissent la vente de la formation en ligne "AI Mastery" accessible depuis le site web.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Prix et Modalités de Paiement</h2>
            <p>Les prix de nos formations sont indiqués en Euros TTC (Toutes Taxes Comprises). Le paiement s'effectue comptant par carte bancaire au moment de la commande via la solution sécurisée Stripe.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Accès au service</h2>
            <p>L'accès à la formation est accordé de manière permanente (accès à vie) dès la validation du paiement par notre prestataire bancaire. Un identifiant de connexion est généré pour l'espace membre.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Droit de rétractation</h2>
            <p>Conformément à l'article L. 221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contrats de fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé avec l'accord exprès du consommateur.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">5. Droit applicable</h2>
            <p>Les présentes CGV sont soumises à la loi française. En cas de litige, les tribunaux français seront seuls compétents.</p>
          </section>
        </div>
      </div>
    </div>
  );
}