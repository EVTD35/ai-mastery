import Link from 'next/link';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:underline">← Retour à l'accueil</Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">Politique de Confidentialité</h1>
        
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Collecte des données personnelles</h2>
            <p>Dans le cadre de l'utilisation du site AI Mastery et de l'achat de la formation, nous sommes amenés à collecter certaines données personnelles (nom, adresse email, données de facturation).</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Utilisation des données</h2>
            <p>Les données collectées sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>La gestion de votre accès à la formation et à l'espace membre.</li>
              <li>Le traitement sécurisé des paiements (effectué via notre prestataire Stripe).</li>
              <li>L'envoi d'informations relatives à votre suivi pédagogique.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Sécurité des paiements</h2>
            <p>Les paiements en ligne sont gérés par la société <strong>Stripe</strong>. Vos données bancaires sont traitées selon les normes de sécurité les plus strictes (PCI-DSS) et ne transitent jamais par nos serveurs.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Vos droits (RGPD)</h2>
            <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles en nous contactant à l'adresse email : contact@ai-mastery.fr.</p>
          </section>
        </div>
      </div>
    </div>
  );
}