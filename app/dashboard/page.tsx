'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/libsupabaseClient';

// Structure des modules et de leurs leçons textuelles
const modulesData = [
  {
    id: '01',
    title: 'Fondamentaux & Prompt Engineering Avancé',
    duration: '9h 20min',
    lessons: [
      { title: 'Bienvenue', content: "Bienvenue dans le premier module de la formation. Ici, nous allons poser les bases indispensables pour comprendre et maîtriser les grands modèles de langage." },
      { title: "Anatomie d'un LLM : ce qu'il faut vraiment savoir", content: "Découvrez comment un modèle de langage traite l'information, anticipe les tokens et génère du texte de manière probabiliste." },
      { title: 'Le framework de prompt en 5 couches', content: "Une méthode rigoureuse pour structurer vos requêtes : Rôle, Contexte, Tâche, Contraintes et Format de sortie." },
      { title: 'Chaînage, contexte et few-shot avancé', content: "Apprenez à guider l'IA pas à pas en lui fournissant des exemples précis pour éliminer les hallucinations." },
      { title: 'Atelier : bibliothèque de prompts réutilisables', content: "Construisez votre propre catalogue de prompts prêts à l'emploi pour vos tâches quotidiennes." }
    ]
  },
  {
    id: '02',
    title: 'Création de Produits & Services',
    duration: '13h 05min',
    lessons: [
      { title: 'Du besoin au MVP en une semaine', content: "Comment valider une idée de produit rapidement et concevoir un prototype fonctionnel sans y passer des mois." },
      { title: "Coder une application avec l'IA (sans être dev)", content: "Utilisez les outils de code assisté pour générer, déboguer et déployer des applications web complètes." },
      { title: 'Pipelines de contenu automatisés', content: "Mettez en place des flux de travail automatisés pour produire et diffuser du contenu à grande échelle." },
      { title: 'Automatiser la prospection de bout en bout', content: "Créez un système autonome pour identifier des clients, personnaliser les messages et relancer automatiquement." }
    ]
  },
  {
    id: '03',
    title: 'Monétisation & Scale',
    duration: '10h 40min',
    lessons: [
      { title: 'Packager une offre freelance rentable', content: "Transformez vos compétences en IA en prestations à forte valeur perçue et packagées pour vos clients." },
      { title: 'Fixer ses prix et signer ses premiers clients', content: "Les stratégies de tarification et les techniques de closing adaptées aux services technologiques." },
      { title: 'Construire un micro-SaaS automatisé', content: "Lancez un mini-logiciel payant en ligne capable de tourner en arrière-plan avec une intervention humaine minimale." },
      { title: "Scaler : systèmes, délégation et revenus récurrents", content: "Passez de l'artisanat à une structure industrialisée pour pérenniser et accroître votre chiffre d'affaires." }
    ]
  }
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
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

  const activeModule = modulesData[currentModuleIndex];
  const activeLesson = activeModule.lessons[currentLessonIndex];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans selection:bg-blue-600 selection:text-white pb-16">
      
      {/* NAVBAR */}
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto mb-8">
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

      {/* CONTENU PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-6">
        
        {/* EN-TÊTE DE BIENVENUE */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">
            Bonjour {user?.user_metadata?.full_name || user?.email?.split('@')[0]} , bienvenue dans la Masterclass
          </h1>
          <p className="text-xs text-gray-400">3 modules • Accès complet à vie • Mises à jour incluses</p>
        </div>

        {/* GRILLE CENTRALE (COURS + LISTE DES MODULES) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ZONE DE LECTURE DU TEXTE (À gauche - Remplace la vidéo) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-md">
            <div className="mb-4 pb-4 border-b border-white/10 flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                  {activeModule.title}
                </span>
                <h2 className="text-xl md:text-2xl font-bold">{activeLesson.title}</h2>
              </div>
              <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300">
                Leçon {currentLessonIndex + 1} / {activeModule.lessons.length}
              </span>
            </div>

            {/* Emplacement du texte modifiable */}
            <div className="min-h-[320px] text-gray-300 text-sm md:text-base leading-relaxed space-y-4 py-4">
              <p>{activeLesson.content}</p>
            </div>

            {/* Pied de la zone de lecture */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
              <span>EN COURS DE LECTURE</span>
              <span className="text-emerald-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Module actif</span>
              </span>
            </div>
          </div>

          {/* LISTE DES MODULES & SOUS-CATÉGORIES (À droite - Style Accordéon / Sidebar) */}
          <div className="space-y-4 lg:max-h-[750px] lg:overflow-y-auto pr-1">
            {modulesData.map((mod, modIdx) => (
              <div 
                key={mod.id} 
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 transition"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-blue-500 font-bold">{mod.id}</span>
                  <span className="text-xs font-mono text-gray-500">{mod.duration}</span>
                </div>
                <h4 className="text-sm font-bold mb-3 text-white">{mod.title}</h4>
                
                {/* Liste des leçons/sous-catégories */}
                <div className="space-y-1.5">
                  {mod.lessons.map((lesson, lessonIdx) => {
                    const isSelected = currentModuleIndex === modIdx && currentLessonIndex === lessonIdx;
                    return (
                      <button
                        key={lessonIdx}
                        onClick={() => {
                          setCurrentModuleIndex(modIdx);
                          setCurrentLessonIndex(lessonIdx);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs flex items-center justify-between transition ${
                          isSelected 
                            ? 'bg-blue-600/20 border border-blue-500/40 text-white font-medium' 
                            : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <div className="flex items-center space-x-2 truncate">
                          <span className="text-blue-400 text-xs">▶</span>
                          <span className="truncate">{lesson.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOUTON RETOUR À L'ACCUEIL */}
        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition shadow-lg"
          >
            <span>← Retour à l'accueil</span>
          </Link>
        </div>

      </main>
    </div>
  );
}