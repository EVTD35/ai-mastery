'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/libsupabaseClient';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);
  const [hasPaid, setHasPaid] = useState<boolean>(false);

  useEffect(() => {
    async function checkUserAndPayment() {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('has_paid')
          .eq('id', currentUser.id);
        
        if (profiles && profiles.length > 0) {
          setHasPaid(profiles[0].has_paid ?? false);
        } else {
          setHasPaid(false);
        }
      } else {
        setHasPaid(false);
      }
    }

    checkUserAndPayment();

    // Actualise automatiquement les données quand on revient sur l'onglet / la page
    window.addEventListener('focus', checkUserAndPayment);

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUserAndPayment();
    });

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('focus', checkUserAndPayment);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans selection:bg-blue-600 selection:text-white scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0b0f]/80 border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="font-bold text-xl tracking-tight">AI Mastery</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm text-gray-400">
          <a href="#programme" className="hover:text-white transition duration-200">Programme</a>
          <a href="#pour-qui" className="hover:text-white transition duration-200">Pour qui ?</a>
          <a href="#temoignages" className="hover:text-white transition duration-200">Témoignages</a>
          <a href="#faq" className="hover:text-white transition duration-200">FAQ</a>
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-300 hover:text-white transition duration-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl"
            >
              Déconnexion
            </button>
          ) : (
            <Link href="/login" className="text-sm text-gray-300 hover:text-white transition duration-200">Connexion</Link>
          )}

          {/* Bouton dynamique selon l'achat (Corrigé avec Link de Next.js) */}
          {user && hasPaid ? (
            <Link href="/modules" className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:shadow-emerald-600/40">
              Espace membre
            </Link>
          ) : (
            <Link href="/api/checkout" className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:shadow-emerald-600/40">
              Accéder à la formation
            </Link>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-gray-300 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Nouvelle cohorte ouverte</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
            Transformez l'Intelligence Artificielle en un Véritable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Levier de Revenus</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            Apprenez à maîtriser les outils d'IA générative pour créer des automatisations, lancer des micro-activités lucratives et scaler votre productivité en 2026.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#tarifs" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 text-center shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 hover:-translate-y-0.5">
              <span>Rejoindre la formation</span>
              <span>→</span>
            </a>
          </div>
          
          <div className="grid grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/10 text-gray-400 text-sm">
            <div><span className="block text-white font-bold text-lg">1200+</span> APPRENANTS</div>
            <div><span className="block text-white font-bold text-lg">4.9/5</span> SATISFACTION</div>
            <div><span className="block text-white font-bold text-lg">40h+</span> DE CONTENU</div>
          </div>
        </div>

        {/* Illustration droite (Console / Vidéo) */}
        <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 p-4 rounded-2xl shadow-2xl relative">
          <div className="bg-[#12121a] rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <span className="text-xs text-gray-500 font-mono">console.ai-mastery</span>
            </div>
            <div className="relative aspect-video bg-black/60 flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-cover bg-center opacity-40"></div>
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/50 transition transform group-hover:scale-110">
                <span className="text-white text-xl ml-1">▶</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>AUTOMATISATION ACTIVE</span>
                <span className="text-emerald-400 flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span><span>live</span></span>
              </div>
            </div>
            <div className="px-4 py-3 bg-black/40 border-t border-white/10">
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDEAU INTERMÉDIAIRE DÉFILANT */}
      <div className="py-10 border-y border-white/5 overflow-hidden bg-white/[0.01] text-gray-500 text-base md:text-lg font-mono tracking-widest uppercase relative">
        <div className="animate-marquee flex space-x-12">
          <span className="flex items-center space-x-12">
            <span>• PROMPT ENGINEERING</span>
            <span>• AUTOMATISATION</span>
            <span>• FREELANCE</span>
            <span>• SCALE</span>
            <span>• PROMPT ENGINEERING</span>
            <span>• AUTOMATISATION</span>
            <span>• FREELANCE</span>
            <span>• SCALE</span>
          </span>
          <span className="flex items-center space-x-12" aria-hidden="true">
            <span>• PROMPT ENGINEERING</span>
            <span>• AUTOMATISATION</span>
            <span>• FREELANCE</span>
            <span>• SCALE</span>
            <span>• PROMPT ENGINEERING</span>
            <span>• AUTOMATISATION</span>
            <span>• FREELANCE</span>
            <span>• SCALE</span>
          </span>
        </div>
      </div>

      {/* SECTION 3 PILIERS (PROGRAMME) */}
      <section id="programme" className="max-w-7xl mx-auto px-6 py-24 scroll-mt-20">
        <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 font-mono">LE PROGRAMME</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Ce que vous allez apprendre, en 3 piliers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1.5 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-mono text-blue-500 font-bold">01</span>
              <span className="text-gray-600 text-xl">🧠</span>
            </div>
            <h4 className="text-lg font-bold mb-3">Fondamentaux & Prompt Engineering Avancé</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Maîtrisez les modèles de langage et apprenez à structurer des requêtes complexes pour obtenir des résultats précis, fiables et reproductibles.</p>
          </div>
          
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1.5 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-mono text-blue-500 font-bold">02</span>
              <span className="text-gray-600 text-xl">⚙️</span>
            </div>
            <h4 className="text-lg font-bold mb-3">Création de Produits & Services</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Générez du contenu, codez des MVP de sites et d'applications, et automatisez votre prospection commerciale de bout en bout.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1.5 shadow-xl">
            <div className="flex justify-between items-start mb-6">
              <span className="text-2xl font-mono text-blue-500 font-bold">03</span>
              <span className="text-gray-600 text-xl">📈</span>
            </div>
            <h4 className="text-lg font-bold mb-3">Monétisation & Scale</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Transformez ces compétences en prestations freelances rentables ou en projets SaaS automatisés qui génèrent des revenus récurrents.</p>
          </div>
        </div>
      </section>

      {/* SECTION POUR QUI ? (4 BLOCS) */}
      <section id="pour-qui" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10 scroll-mt-20">
        <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 font-mono">À QUI S'ADRESSE LA FORMATION</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Pensée pour celles et ceux qui passent à l'action</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <span className="text-2xl font-mono text-blue-500 font-bold mb-4 block">01</span>
            <h4 className="text-xl font-bold mb-2">Débutants motivés</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Aucun prérequis technique. On part des fondations pour vous rendre autonome avec les outils d'IA les plus puissants.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <span className="text-2xl font-mono text-blue-500 font-bold mb-4 block">02</span>
            <h4 className="text-xl font-bold mb-2">Salariés en reconversion</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Construisez une nouvelle expertise recherchée et créez un revenu complémentaire en parallèle de votre poste actuel.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <span className="text-2xl font-mono text-blue-500 font-bold mb-4 block">03</span>
            <h4 className="text-xl font-bold mb-2">Étudiants</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Prenez une longueur d'avance décisive sur le marché du travail avec des compétences concrètes et monétisables.</p>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <span className="text-2xl font-mono text-blue-500 font-bold mb-4 block">04</span>
            <h4 className="text-xl font-bold mb-2">Créateurs de projets</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Prototypez, lancez et automatisez vos idées de produits plus vite que jamais, sans équipe technique.</p>
          </div>
        </div>
      </section>

      {/* SECTION TEMOIGNAGES / PREUVE SOCIALE */}
      <section id="temoignages" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10 scroll-mt-20">
        <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 font-mono">PREUVE SOCIALE</h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-12">Des progressions concrètes, mesurées</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <div>
              <div className="flex text-blue-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"En deux mois, j'ai structuré une offre de création de contenu automatisée. Je facture désormais trois clients réguliers grâce aux workflows appris."</p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center font-bold text-xs">CR</div>
              <div>
                <span className="block font-bold text-sm">Camille R.</span>
                <span className="block text-xs text-gray-500">Graphiste devenue freelance IA</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <div>
              <div className="flex text-blue-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"La partie prompt engineering avancé a tout changé. Je gagne un temps considérable au quotidien et je prépare sereinement ma transition de carrière."</p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-400 flex items-center justify-center font-bold text-xs">YM</div>
              <div>
                <span className="block font-bold text-sm">Yanis M.</span>
                <span className="block text-xs text-gray-500">Salarié en reconversion</span>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/10 p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:-translate-y-1">
            <div>
              <div className="flex text-blue-400 mb-4 space-x-1">★★★★★</div>
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"J'ai codé et lancé mon premier MVP en une semaine. L'approche est rigoureuse, sans promesses irréalistes, et les templates de prompts sont précieux."</p>
            </div>
            <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center font-bold text-xs">TL</div>
              <div>
                <span className="block font-bold text-sm">Thomas L.</span>
                <span className="block text-xs text-gray-500">Fondateur d'un micro-SaaS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION OFFRE DE LANCEMENT / TARIF */}
      <section id="tarifs" className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-6">
          <span className="text-xs font-semibold text-gray-500 tracking-widest uppercase font-mono">OFFRE DE LANCEMENT</span>
        </div>
        <div className="bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-blue-600 text-xs font-bold uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider">Offre exclusive</div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Un investissement, un accès à vie</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Colonne Prix & Bouton */}
            <div className="text-center md:text-left md:border-r md:border-white/10 md:pr-8">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-2">MASTERCLASS COMPLÈTE</span>
              <div className="flex items-baseline justify-center md:justify-start space-x-3 mb-2">
                <span className="text-5xl md:text-6xl font-extrabold tracking-tight">99€</span>
                <span className="text-gray-500 line-through text-xl">199€</span>
              </div>
              <span className="text-emerald-400 block text-xs font-medium mb-8">Paiement unique • TVA incluse</span>

              <Link href="/api/checkout" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-xl shadow-blue-600/30 flex items-center justify-center space-x-2 hover:-translate-y-0.5">
                <span>🔒 Créer un compte & payer</span>
              </Link>
              <span className="block text-center text-xs text-gray-500 mt-4">Paiement 100% sécurisé — propulsé par <strong>Stripe</strong></span>
            </div>

            {/* Colonne Liste des avantages */}
            <div className="space-y-4 text-sm text-gray-300 md:pl-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block mb-4">TOUT EST INCLUS</span>
              <div className="flex items-center space-x-3"><span className="text-blue-500 font-bold">✓</span><span>Accès à vie à tous les modules vidéo (40h+)</span></div>
              <div className="flex items-center space-x-3"><span className="text-blue-500 font-bold">✓</span><span>Mises à jour régulières incluses</span></div>
              <div className="flex items-center space-x-3"><span className="text-blue-500 font-bold">✓</span><span>Communauté privée d'entraide</span></div>
              <div className="flex items-center space-x-3"><span className="text-blue-500 font-bold">✓</span><span>Templates de prompts exclusifs</span></div>
              <div className="flex items-center space-x-3"><span className="text-blue-500 font-bold">✓</span><span>Cas pratiques d'automatisation prêts à l'emploi</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FAQ */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-24 border-t border-white/10 scroll-mt-20">
        <h2 className="text-xs font-semibold text-gray-500 tracking-widest uppercase mb-3 text-center font-mono">FAQ</h2>
        <h3 className="text-3xl font-bold mb-12 text-center">Questions fréquentes</h3>

        <div className="space-y-4">
          {[
            { q: "Quels sont les prérequis nécessaires ?", a: "Aucun prérequis technique. Un ordinateur, une connexion Internet et de la motivation suffisent. La formation commence par les fondamentaux avant d'aller plus loin." },
            { q: "Combien de temps y consacrer par semaine ?", a: "Comptez 3 à 4 heures par semaine pour progresser confortablement. Le rythme est libre : vous avancez à votre rythme et gardez l'accès à vie." },
            { q: "L'accès est-il vraiment à vie ?", a: "Oui. Un paiement unique vous donne un accès permanent à l'ensemble des modules et à toutes les mises à jour futures, sans frais supplémentaires." },
            { q: "Comment sont sécurisés les paiements ?", a: "Les paiements sont traités par Stripe, référence mondiale du paiement en ligne. Vos données bancaires sont ultra-sécurisées et ne transitent jamais par nos serveurs." },
          ].map((item, index) => (
            <div key={index} className="border border-white/10 rounded-xl bg-white/[0.01] overflow-hidden transition-all duration-300 hover:border-white/20">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 text-left font-medium flex justify-between items-center hover:bg-white/[0.02] transition"
              >
                <span className="text-sm md:text-base">{item.q}</span>
                <span className={`text-blue-400 font-mono text-lg transition-transform duration-300 ${openFaq === index ? 'rotate-45' : 'rotate-0'}`}>+</span>
              </button>
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-16 px-6 max-w-7xl mx-auto text-sm text-gray-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="font-bold text-white text-lg">AI Mastery</span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              Masterclass IA & Revenus — Automatiser et Monétiser ses Compétences. Une formation rigoureuse pour transformer l'IA générative en levier concret.
            </p>
            <div className="flex space-x-2 text-xs font-mono text-gray-400">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Visa</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Mastercard</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Amex</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">Stripe</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">FORMATION</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#programme" className="hover:text-white transition">Programme</a></li>
              <li><a href="#pour-qui" className="hover:text-white transition">Pour qui ?</a></li>
              <li><a href="#temoignages" className="hover:text-white transition">Témoignages</a></li>
              <li><a href="#tarifs" className="hover:text-white transition">Tarifs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-4 font-mono">LÉGAL</h4>
            <ul className="space-y-3 text-xs">
              <li><Link href="/mentions-legales" className="hover:text-white transition">Mentions légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-white transition">Politique de confidentialité</Link></li>
              <li><Link href="/cgv" className="hover:text-white transition">CGV</Link></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
          <span>© 2026 AI Mastery. Tous droits réservés.</span>
          <span className="mt-4 md:mt-0 text-gray-600">Paiements sécurisés par Stripe · Fait avec rigueur en 2026</span>
        </div>
      </footer>
    </div>
  );
}