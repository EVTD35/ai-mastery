import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/[0.02] border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400 text-2xl">
          ✓
        </div>
        <h1 className="text-2xl font-bold mb-2 tracking-tight">Paiement réussi !</h1>
        <p className="text-xs text-gray-400 mb-6 leading-relaxed">
          Merci pour votre confiance. Votre compte a été mis à jour et votre accès est désormais actif.
        </p>
        <Link 
          href="/dashboard" 
          className="w-full inline-block py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/20 mb-3"
        >
          Accéder à mes modules →
        </Link>
        <Link 
          href="/" 
          className="text-xs text-gray-500 hover:text-gray-300 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}