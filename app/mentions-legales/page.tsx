import Link from 'next/link';

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-blue-400 hover:underline">← Retour à l'accueil</Link>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 tracking-tight">Mentions Légales</h1>
        
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-2">1. Éditeur du site</h2>
            <p>Le site <strong>AI Mastery</strong> est édité dans le cadre d'une activité de formation en ligne.</p>
            <p className="mt-2">Responsable de publication : </p>
            <p>Contact : contact@ai-mastery.fr</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">2. Hébergement</h2>
            <p>Le site est hébergé par la plateforme <strong>Vercel Inc.</strong></p>
            <p>Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789, USA / Site web : <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-blue-400 underline">vercel.com</a></p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">3. Propriété intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-2">4. Limitation de responsabilité</h2>
            <p>Les informations fournies sur AI Mastery le sont à titre indicatif. L'éditeur ne saurait garantir l'exactitude, la complétude, ou l'actualité des informations diffusées sur le site. En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.</p>
          </section>
        </div>
      </div>
    </div>
  );
}