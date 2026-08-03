'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/libsupabaseClient';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        // Si non connecté, on redirige vers la page de login
        window.location.href = '/login';
      } else {
        setUser(session.user);
        setLoading(false);
      }
    }
    checkUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white flex items-center justify-center text-sm text-gray-400">
        Chargement de votre espace...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans">
      {/* NAVBAR DU DASHBOARD */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="font-bold text-xl tracking-tight">AI Mastery — Espace Membre</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs text-gray-400 hidden sm:inline">{user?.email}</span>
          <button 
            onClick={handleLogout}
            className="text-xs text-gray-300 hover:text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl transition"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* CONTENU DES MODULES */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Bienvenue dans votre formation 🚀</h1>
          <p className="text-gray-400 text-sm">Retrouvez ci-dessous l'ensemble de vos modules, ressources et templates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/40 transition">
            <div>
              <span className="text-xs font-mono text-blue-500 font-bold mb-2 block">MODULE 01</span>
              <h3 className="text-lg font-bold mb-2">Fondamentaux & Prompt Engineering</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">Maîtrisez l'art de prompter et d'obtenir des résultats parfaits de la part des LLMs.</p>
            </div>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
              Accéder au module
            </button>
          </div>

          {/* Module 2 */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/40 transition">
            <div>
              <span className="text-xs font-mono text-blue-500 font-bold mb-2 block">MODULE 02</span>
              <h3 className="text-lg font-bold mb-2">Création de Produits & MVP</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">Codez et lancez des applications et des micro-services automatisés rapidement.</p>
            </div>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
              Accéder au module
            </button>
          </div>

          {/* Module 3 */}
          <div className="bg-white/[0.02] border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-blue-500/40 transition">
            <div>
              <span className="text-xs font-mono text-blue-500 font-bold mb-2 block">MODULE 03</span>
              <h3 className="text-lg font-bold mb-2">Monétisation & Scale</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">Transformez vos compétences en sources de revenus régulières ou en freelance.</p>
            </div>
            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
              Accéder au module
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}