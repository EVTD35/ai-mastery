'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/libsupabaseClient';

// Interface pour typer proprement les ressources de chaque leçon
export interface ResourceItem {
  type: 'file' | 'video' | 'text';
  title: string;
  description: string;
  actionText: string;
  actionUrlOrContent: string; // URL pour un PDF/Vidéo, ou le texte brut pour un prompt
}

export interface Lesson {
  title: string;
  content: string;
  resources?: ResourceItem[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Structure des modules enrichie avec plusieurs types de ressources par leçon
const modulesData: Module[] = [
  {
    id: '01',
    title: 'Fondamentaux & Prompt Engineering Avancé',
    lessons: [
      { 
        title: 'Bienvenue', 
        content: "Bienvenue dans AI Mastery. Tu viens de franchir un cap décisif.\n\nIci, pas de théorie superficielle ou de concepts abstraits : tu vas apprendre à maîtriser l'intelligence artificielle comme un véritable levier de puissance et de productivité.\n\nQue tu souhaites automatiser ton quotidien, concevoir des produits de rupture ou scaler ton activité, ce programme a été structuré pour t'emmener de zéro à l'élite opérationnelle.\n\nComment tirer le meilleur de cette formation :\n• Avance étape par étape : Ne saute pas les fondations, chaque pilier repose sur le précédent.\n• Teste en direct : Ouvre une fenêtre avec ton outil d'IA et applique immédiatement les concepts et les prompts fournis.\n• Utilise les ressources : Des mémos et des templates sont à ta disposition dans chaque module pour accélérer ton passage à l'action.\n\nPrends le temps de t'approprier chaque leçon, marque tes progrès au fur et à mesure, et prépare-toi à transformer ta façon de travailler. Bon apprentissage !", 
        resources: [
          {
            type: 'text',
            title: "Prompt système initial",
            description: "Le prompt de base pour configurer ton assistant aux standards de la formation.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant qu'expert senior et partenaire de réflexion stratégique. Ton rôle est de m'aider à structurer mes idées, résoudre des problèmes complexes et rédiger des contenus ou du code de haute qualité. Sois direct, pragmatique, évite le jargon inutile, et propose toujours des plans d'action clairs et chiffrés ou structurés par étapes. Si tu as besoin de précisions pour être plus pertinent, pose-moi des questions courtes avant de répondre."
          },
          {
            type: 'file',
            title: "Feuille de route de la Masterclass (PDF)",
            description: "Le guide complet au format PDF pour suivre ton parcours d'apprentissage.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/feuille-de-route-ai-mastery.pdf"
          }
        ]
      },
      { 
        title: "Anatomie d'un LLM : ce qu'il faut vraiment savoir", 
        content: "Découvrez comment un modèle de langage traite l'information, anticipe les tokens et génère du texte de manière probabiliste.", 
        resources: [
          {
            type: 'file',
            title: "Lexique des tokens et paramètres",
            description: "Fiche mémo détaillée sur la Temperature, le Top-p et la gestion du contexte.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/lexique-tokens.pdf"
          },
          {
            type: 'video',
            title: "Comprendre les LLM en vidéo",
            description: "Démonstration visuelle du fonctionnement probabiliste d'un modèle.",
            actionText: "Regarder",
            actionUrlOrContent: "https://youtube.com/watch?v=exemple"
          }
        ]
      },
      { 
        title: 'Le framework de prompt en 5 couches', 
        content: "Une méthode rigoureuse pour structurer vos requêtes : Rôle, Contexte, Tâche, Contraintes et Format de sortie.",
        resources: [
          {
            type: 'text',
            title: "Template du framework en 5 couches",
            description: "Structure prête à l'emploi pour rédiger des prompts d'une précision chirurgicale.",
            actionText: "Copier",
            actionUrlOrContent: "[Rôle] : ...\n[Contexte] : ...\n[Tâche] : ...\n[Contraintes] : ...\n[Format] : ..."
          }
        ]
      },
      { 
        title: 'Chaînage, contexte et few-shot avancé', 
        content: "Apprenez à guider l'IA pas à pas en lui fournissant des exemples précis pour éliminer les hallucinations.",
        resources: [
          {
            type: 'file',
            title: "Guide pratique du Few-Shot Prompting",
            description: "Exemples concrets de classification et de génération assistée par exemples.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/guide-few-shot.pdf"
          }
        ]
      },
      { 
        title: 'Atelier : bibliothèque de prompts réutilisables', 
        content: "Construisez votre propre catalogue de prompts prêts à l'emploi pour vos tâches quotidiennes.",
        resources: [
          {
            type: 'file',
            title: "Pack de 10 prompts productivité",
            description: "Catalogue complet de templates pour automatiser vos tâches récurrentes.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/pack-10-prompts.pdf"
          }
        ]
      }
    ]
  },
  {
    id: '02',
    title: 'Création de Produits & Services',
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
  
  // États de progression et modale
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    async function checkUserSession() {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        window.location.href = '/login';
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('has_paid')
        .eq('id', session.user.id)
        .single();

      if (!profile?.has_paid) {
        window.location.href = '/';
        return;
      }

      setUser(session.user);
      
      const savedProgress = localStorage.getItem(`ai_mastery_progress_${session.user.id}`);
      if (savedProgress) {
        try {
          setCompletedLessons(JSON.parse(savedProgress));
        } catch (e) {
          console.error("Erreur chargement progression", e);
        }
      }

      setLoading(false);
    }

    checkUserSession();
  }, []);

  const toggleLessonComplete = (modIdx: number, lessonIdx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `${modIdx}-${lessonIdx}`;
    const updated = { ...completedLessons, [key]: !completedLessons[key] };
    setCompletedLessons(updated);
    if (user) {
      localStorage.setItem(`ai_mastery_progress_${user.id}`, JSON.stringify(updated));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
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

  const totalLessonsCount = modulesData.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const globalProgressPercent = Math.round((completedCount / totalLessonsCount) * 100);

  const getModuleProgress = (modIdx: number) => {
    const mod = modulesData[modIdx];
    const modCompleted = mod.lessons.filter((_, lIdx) => completedLessons[`${modIdx}-${lIdx}`]).length;
    return {
      completed: modCompleted,
      total: mod.lessons.length,
      percent: Math.round((modCompleted / mod.lessons.length) * 100)
    };
  };

  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    } else if (currentModuleIndex > 0) {
      const prevModIdx = currentModuleIndex - 1;
      setCurrentModuleIndex(prevModIdx);
      setCurrentLessonIndex(modulesData[prevModIdx].lessons.length - 1);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < activeModule.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    } else if (currentModuleIndex < modulesData.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentLessonIndex(0);
    }
  };

  const hasPrevious = currentModuleIndex > 0 || currentLessonIndex > 0;
  const hasNext = currentModuleIndex < modulesData.length - 1 || currentLessonIndex < activeModule.lessons.length - 1;

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white font-sans selection:bg-blue-600 selection:text-white pb-16 relative">
      
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
        
        {/* EN-TÊTE & PROGRESSION */}
        <div className="mb-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 rounded-3xl backdrop-blur-md flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1">
              Bonjour {user?.user_metadata?.full_name || user?.email?.split('@')[0]} , bienvenue dans la Masterclass
            </h1>
            <p className="text-xs text-gray-400">3 piliers de formation • Accès complet à vie • Mises à jour incluses</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl min-w-[240px]">
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-gray-300 font-medium">Avancement global</span>
              <span className="font-mono font-bold text-blue-400">{globalProgressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${globalProgressPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-gray-400 mt-1.5 text-right">
              {completedCount} / {totalLessonsCount} leçons terminées
            </div>
          </div>
        </div>

        {/* GRILLE CENTRALE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* ZONE DE LECTURE */}
          <div className="lg:col-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-md flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="mb-4 pb-4 border-b border-white/10 flex justify-between items-center">
                <div>
                  <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block mb-1">
                    {activeModule.title}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold">{activeLesson.title}</h2>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono bg-white/5 border border-white/10 px-3 py-1 rounded-full text-gray-300 hidden sm:inline">
                    Leçon {currentLessonIndex + 1} / {activeModule.lessons.length}
                  </span>
                  <button
                    onClick={(e) => toggleLessonComplete(currentModuleIndex, currentLessonIndex, e)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition border ${
                      completedLessons[`${currentModuleIndex}-${currentLessonIndex}`]
                        ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{completedLessons[`${currentModuleIndex}-${currentLessonIndex}`] ? '✓ Lu' : 'Marquer comme lu'}</span>
                  </button>
                </div>
              </div>

              {/* Texte du cours pur */}
              <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 py-4 whitespace-pre-line">
                {activeLesson.content}
              </div>

              {/* BOUTON D'OUVERTURE DE LA MODALE DES RESSOURCES */}
              {activeLesson.resources && activeLesson.resources.length > 0 && (
                <div className="mt-8 p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-blue-400 block mb-0.5">📁 Centre de ressources</span>
                    <p className="text-xs text-gray-300">Cette leçon contient des documents, vidéos ou templates à exploiter.</p>
                  </div>
                  <button
                    onClick={() => setIsResourceModalOpen(true)}
                    className="whitespace-nowrap px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-medium text-white transition shadow-lg flex items-center space-x-1.5 flex-shrink-0"
                  >
                    <span>Voir les ressources ({activeLesson.resources.length})</span>
                  </button>
                </div>
              )}
            </div>

            {/* NAVIGATION */}
            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={goToPreviousLesson}
                disabled={!hasPrevious}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center space-x-1.5 ${
                  hasPrevious
                    ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white'
                    : 'opacity-40 cursor-not-allowed bg-white/5 border border-white/5 text-gray-600'
                }`}
              >
                <span>← Leçon précédente</span>
              </button>

              <span className="text-xs text-emerald-400 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>En cours de lecture</span>
              </span>

              <button
                onClick={goToNextLesson}
                disabled={!hasNext}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition flex items-center space-x-1.5 ${
                  hasNext
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg'
                    : 'opacity-40 cursor-not-allowed bg-white/5 border border-white/5 text-gray-600'
                }`}
              >
                <span>Leçon suivante →</span>
              </button>
            </div>
          </div>

          {/* LISTE LATÉRALE DES MODULES */}
          <div className="space-y-4">
            {modulesData.map((mod, modIdx) => {
              const modProgress = getModuleProgress(modIdx);
              return (
                <div 
                  key={mod.id} 
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 transition hover:border-white/20"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-mono text-blue-400 font-bold">Pilier {mod.id}</span>
                    <span className="text-[10px] font-mono text-gray-400">{modProgress.completed}/{modProgress.total}</span>
                  </div>
                  <h4 className="text-sm font-bold mb-2 text-white">{mod.title}</h4>
                  
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${modProgress.percent}%` }}
                    ></div>
                  </div>
                  
                  <div className="space-y-1">
                    {mod.lessons.map((lesson, lessonIdx) => {
                      const isSelected = currentModuleIndex === modIdx && currentLessonIndex === lessonIdx;
                      const isDone = completedLessons[`${modIdx}-${lessonIdx}`];
                      return (
                        <div
                          key={lessonIdx}
                          onClick={() => {
                            setCurrentModuleIndex(modIdx);
                            setCurrentLessonIndex(lessonIdx);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-center justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-600/20 border border-blue-500/40 text-white font-medium' 
                              : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          <span className="truncate pr-2">{lesson.title}</span>
                          <button
                            onClick={(e) => toggleLessonComplete(modIdx, lessonIdx, e)}
                            className={`w-4 h-4 rounded flex items-center justify-center border transition flex-shrink-0 ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-400 text-black'
                                : 'border-white/20 hover:border-white/40 bg-white/5'
                            }`}
                            title="Marquer comme lu"
                          >
                            {isDone && <span className="text-[10px] font-bold">✓</span>}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition shadow-lg"
          >
            <span>← Retour à l'accueil</span>
          </Link>
        </div>

      </main>

      {/* FENÊTRE MODALE DES RESSOURCES MULTIPLES */}
      {isResourceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121218] border border-white/15 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsResourceModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-1 text-white">Ressources de la leçon</h3>
            <p className="text-xs text-gray-400 mb-6">Supports associés à : <span className="text-blue-400 font-medium">{activeLesson.title}</span></p>

            {/* Liste dynamique des ressources de la leçon */}
            <div className="space-y-3 mb-6">
              {activeLesson.resources?.map((res, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-xl mt-0.5">
                      {res.type === 'file' ? '📄' : res.type === 'video' ? '🎥' : '💬'}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-white mb-0.5">{res.title}</h5>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{res.description}</p>
                    </div>
                  </div>

                  {/* Bouton d'action selon le type */}
                  {res.type === 'file' && (
                    <a 
                      href={res.actionUrlOrContent} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-xs font-medium text-blue-200 transition text-center whitespace-nowrap"
                    >
                      {res.actionText}
                    </a>
                  )}

                  {res.type === 'video' && (
                    <a 
                      href={res.actionUrlOrContent} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/40 text-xs font-medium text-red-200 transition text-center whitespace-nowrap"
                    >
                      {res.actionText}
                    </a>
                  )}

                  {res.type === 'text' && (
                    <button 
                      onClick={() => handleCopy(res.actionUrlOrContent, idx)}
                      className="px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-xs font-medium text-blue-200 transition whitespace-nowrap"
                    >
                      {copiedIndex === idx ? 'Copié !' : res.actionText}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsResourceModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition"
            >
              Fermer
            </button>

          </div>
        </div>
      )}

    </div>
  );
}