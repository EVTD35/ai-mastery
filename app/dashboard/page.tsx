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
        content: "Pour maîtriser l'intelligence artificielle, il faut arrêter de voir les modèles de langage comme des boîtes magiques ou des entités douées de conscience. Un Large Language Model (LLM) est, fondamentalement, une machine à prédire le mot (ou plutôt le token) suivant.\n\n1. Qu'est-ce qu'un token ?\nUn LLM ne lit pas les mots de la même façon que nous. Il découpe le texte en morceaux appelés *tokens* (qui peuvent être des mots entiers, des syllabes ou des caractères). Chaque token est converti en une suite de chiffres (un vecteur) dans un espace mathématique à haute dimension.\n\n2. Le mécanisme de prédiction probabiliste\nLorsqu'on lui soumet un texte (un prompt), le modèle analyse tout le contexte et calcule une distribution de probabilités pour le token suivant. Il ne 'réfléchit' pas : il choisit statistiquement le mot le plus cohérent par rapport à tout ce qu'il a absorbé durant son entraînement.\n\n3. Les paramètres clés à comprendre :\n• La Température (Temperature) : Elle contrôle la créativité. Une température basse (0.1) rend le modèle prévisible, factuel et rigoureux (idéal pour le code ou la logique). Une température élevée (0.8 ou plus) augmente l'aléa et la créativité (idéal pour le brainstorming ou l'écriture créative).\n• Le Top-p / Top-k : D'autres curseurs qui filtrent les choix de mots probables pour éviter que le modèle ne dérive trop.\n\nPourquoi c'est crucial pour toi :\nEn comprenant que l'IA fonctionne par probabilités et par tokens, tu comprends pourquoi tes prompts doivent être précis, contextuels et structurés. Moins tu laisses de place au hasard dans ton contexte, plus la réponse du LLM sera alignée avec tes attentes.", 
        resources: [
          {
            type: 'video',
            title: "Comprendre les LLM en vidéo",
            description: "Une vidéo claire et pédagogique pour visualiser le fonctionnement interne d'un modèle de langage.",
            actionText: "Voir la vidéo",
            actionUrlOrContent: "https://www.youtube.com/watch?v=1RRHr3dFogQ"
          },
          {
            type: 'text',
            title: "Prompt de test du comportement probabiliste",
            description: "Un prompt pour tester la manière dont le modèle prédit la suite et gère le contexte.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant que laboratoire de test. Je vais te donner une phrase incomplète, et tu dois me proposer les 3 suites possibles les plus probables selon toi, en expliquant le calcul statistique implicite derrière ton choix."
          },
          {
            type: 'file',
            title: "Lexique des tokens et paramètres (PDF)",
            description: "Un récapitulatif visuel pour comprendre l'impact de la Temperature et du Top-p.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/lexique-tokens-parametres.pdf"
          }
        ]
      },
      { 
        title: "Le framework de prompt en 5 couches", 
        content: "Un mauvais prompt donne une réponse floue. Un prompt structuré selon le framework des 5 couches transforme l'IA en un assistant ultra-précis et chirurgical.\n\nVoici les 5 couches indispensables pour bâtir un prompt infaillible :\n\n1. Couche 1 : Le Rôle (Who)\nDéfinis clairement l'identité et l'expertise de l'IA. Ex: *'Agis en tant qu'expert en Growth Marketing et copywriter senior.'*\n\n2. Couche 2 : Le Contexte (Context)\nFournis la situation de départ, les contraintes métier ou le background nécessaire. Ex: *'Je lance une application de fitness pour les cadres stressés qui manquent de temps.'*\n\n3. Couche 3 : La Tâche (Task)\nExprime précisément l'action attendue, sans ambiguïté. Ex: *'Rédige une séquence de 3 e-mails de prospection pour convertir de futurs bêta-testeurs.'*\n\n4. Couche 4 : Les Contraintes (Constraints)\nFixe les limites, ce qu'il faut faire et ne pas faire. Ex: *'Pas de jargon marketing creux, des phrases courtes, ton direct et percutant, maximum 150 mots par e-mail.'*\n\n5. Couche 5 : Le Format de Sortie (Output)\nSpécifie la structure exacte de la réponse attendue. Ex: *'Présente chaque e-mail sous forme de bloc avec un objet accrocheur, un corps de texte et un appel à l'action distinct.'*\n\nPourquoi cette méthode change tout :\nEn séparant clairement ces 5 dimensions, tu supprimes l'ambiguïté. L'IA n'a plus à deviner ce que tu veux : elle applique une méthodologie rigoureuse.", 
        resources: [
          {
            type: 'video',
            title: "Maîtriser le Prompt Engineering en vidéo",
            description: "Un guide complet pour comprendre comment structurer ses demandes et exploiter tout le potentiel des LLM.",
            actionText: "Voir la vidéo",
            actionUrlOrContent: "https://www.youtube.com/watch?v=H89bSRvuY14"
          },
          {
            type: 'text',
            title: "Le 'Prompt Master' (Template universel)",
            description: "Le modèle squelette en 5 couches prêt à être copié-collé et rempli pour tous tes cas d'usage.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant que [Rôle précis]. Contexte : [Décris ta situation, ton projet et ton public cible]. Tâche : [Ce que l'IA doit accomplir exactement]. Contraintes : [Ce qu'il faut respecter absolument, ton, limites]. Format de sortie : [Structure attendue de la réponse : tableaux, listes, blocs...]."
          },
          {
            type: 'file',
            title: "La Cheat Sheet du Framework 5 Couches (PDF)",
            description: "Le mémo visuel récapitulatif des 5 couches pour structurer tes prompts à chaque instant.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/cheat-sheet-prompt-5-couches.pdf"
          }
        ]
      },
      { 
        title: "Enchaînage, contexte et few-shot avancé", 
        content: "Un LLM est puissant sur une seule tâche, mais il devient redoutable lorsqu'on combine les techniques avancées : le chaînage (chaining), la gestion fine du contexte et le few-shot prompting.\n\n1. Le Chaînage de Prompts (Prompt Chaining)\nPlutôt que de vouloir tout obtenir en une seule commande complexe, décompose ton objectif en une suite d'actions logiques. Chaque étape nourrit la suivante :\n• Étape 1 : Analyse et extraction des besoins.\n• Étape 2 : Rédaction d'un plan ou d'une structure.\n• Étape 3 : Génération et optimisation du contenu final.\n\n2. Le Few-Shot Prompting (Donner des exemples)\nAu lieu d'expliquer ce que tu veux avec de longs discours, montre-le à l'IA. En lui fournissant 2 ou 3 exemples précis de ce que tu attends (format d'entrée -> format de sortie idéal), le modèle comprend instantanément le style, le ton et la structure exacte.\n\n3. La gestion du contexte long\nPlus une conversation avance, plus le modèle doit traiter de tokens. Apprends à purger l'inutile, à relancer des sessions ciblées (agents persistants) et à injecter uniquement les données fraîches pour éviter la dilution de l'attention de l'IA.\n\nPourquoi c'est l'étape supérieure :\nC'est la maîtrise de ces trois techniques combinées qui te permet d'automatiser de vrais processus complexes et de concevoir des applications ou des workflows sans friction.", 
        resources: [
          {
            type: 'text',
            title: "Modèle de Few-Shot Prompting",
            description: "Un template structuré intégrant des blocs d'exemples (Input / Output) pour calibrer le style du LLM.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant qu'expert. Je souhaite que tu rédiges [Objectif]. Pour cela, voici des exemples précis du format et du style attendus :\n\n[Exemple 1]\nEntrée : ...\nSortie idéale : ...\n\n[Exemple 2]\nEntrée : ...\nSortie idéale : ...\n\nApplique maintenant cette même logique et ce même style pour la requête suivante : [Ta requête finale]."
          },
          {
            type: 'file',
            title: "Guide Avancé des Workflows & Prompts en Chaîne (PDF)",
            description: "Le livre blanc complet détaillant l'architecture des chaînes de prompts, le few-shot et l'hygiène de contexte.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/guide-workflows-prompt-chaining.pdf"
          }
        ]
      },
      { 
        title: "Atelier : Bibliothèque de prompts réutilisables", 
        content: "Le propre d'un professionnel de l'IA est de ne jamais repartir d'une page blanche. Conserver et structurer ses meilleurs prompts dans une bibliothèque centralisée permet de gagner un temps précieux et d'industrialiser sa productivité.\n\n1. Pourquoi créer sa bibliothèque de prompts ?\n• Gain de temps immédiat : Fini de réécrire les mêmes consignes à chaque nouveau projet.\n• Amélioration continue : Un prompt s'affine avec le temps. Centraliser tes versions te permet de traquer ce qui fonctionne le mieux.\n• Standardisation : Si tu travailles en équipe, c'est le meilleur moyen de partager les 'best practices' de l'entreprise.\n\n2. Comment structurer chaque prompt de sa bibliothèque ?\nUn bon prompt réutilisable doit être pensé comme un template avec des variables (entre crochets `[comme ceci]`) :\n• Le Titre & l'Objectif : À quoi sert ce prompt et dans quel cas l'utiliser ?\n• Le corps modulaire : Les 5 couches fixes (Rôle, Contexte, Tâche, Contraintes, Format).\n• Les balises de variables : Les zones que l'utilisateur doit adapter rapidement selon son besoin du moment.\n\n3. L'organisation idéale\nClasse tes prompts par grands départements métier ou par cas d'usage (Marketing, Code & Tech, Management & RH, Création de contenu, Productivité & Ops).", 
        resources: [
          {
            type: 'file',
            title: "La Bible des Prompts : 50+ Templates Métiers (PDF)",
            description: "Le catalogue massif et exhaustif regroupant une bibliothèque géante de prompts prêts à l'emploi pour tous les départements.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/catalogue-bibliotheque-prompts.pdf"
          }
        ]
      }
    ]
  },
  {
    id: '02',
    title: 'Création de Produits & Services',
    lessons: [
      { 
        title: 'Du besoin au MVP en une semaine', 
        content: "La plus grande erreur d'un créateur est de passer des mois à coder ou concevoir un produit parfait en secret, pour s'apercevoir au lancement que personne n'en veut. La méthode MVP (Minimum Viable Product) consiste à construire la version la plus simple possible de ton produit qui résout un vrai problème, afin de la tester immédiatement sur le marché.\n\n1. Étape 1 : Identifier une vraie friction (Jours 1 et 2)\nNe pars pas de ton idée, pars du problème de tes utilisateurs. Une bonne idée de produit naît d'une frustration récurrente, coûteuse ou chronophage que les gens ont déjà.\n\n2. Étape 2 : Le découpage minimaliste (Jour 3)\nRéduis les fonctionnalités de ton produit à son strict minimum vital. Si ton application résout un seul problème majeur avec brio, elle a de la valeur. Élimine tout le superflu (pas de design complexe, pas de fonctionnalités 'nice-to-have').\n\n3. Étape 3 : Le prototypage accéléré par l'IA (Jours 4 et 5)\nC'est ici que l'IA change la donne. Au lieu d'écrire des milliers de lignes de code ou de faire des maquettes complexes, utilise l'IA pour générer la structure, les interfaces et la logique de ton prototype en quelques heures.\n\n4. Étape 4 : Le test de marché (Jours 6 et 7)\nMets ton prototype entre les mains de tes premiers bêta-testeurs ou prospects. Observe leurs retours, regarde où ils bloquent et valide s'ils sont prêts à payer pour résoudre leur problème.\n\nPourquoi c'est crucial :\nL'objectif d'un MVP n'est pas d'être parfait, mais d'apprendre le plus vite possible à moindre coût.", 
        resources: [
          {
            type: 'text',
            title: "Prompt de cadrage de MVP",
            description: "Un prompt pour forcer l'IA à analyser ton idée et à éliminer tout le superflu pour concevoir un MVP en 7 jours.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant qu'expert en Product Management et spécialiste Lean Startup. Je souhaite créer un produit pour répondre à ce besoin : [Décris ton idée]. Aide-moi à concevoir un plan de MVP strict sur 7 jours. Décompose pour chaque jour les actions à mener et liste uniquement les 3 fonctionnalités absolument vitales pour lancer une première version sans superflu."
          },
          {
            type: 'file',
            title: "Le Framework MVP en 7 Jours (PDF)",
            description: "Le guide méthodologique complet et la feuille de route pour valider ton idée de produit en une semaine.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/framework-mvp-7-jours.pdf"
          }
        ]
      },
      { 
        title: "Coder une application avec l'IA (sans être dev)", 
        content: "La barrière entre l'idée et le code a totalement disparu. Aujourd'hui, l'IA ne se contente plus de répondre à du texte : elle conçoit, structure, assemble et déploie des applications web et mobiles entières à partir de consignes en langage naturel.\n\n1. Le nouveau rôle du créateur : Product Engineer\nTu n'as plus besoin de connaître par cœur la syntaxe de JavaScript ou de Python. Ton rôle est d'avoir une vision claire de ton architecture, de formuler des consignes de développement chirurgicales et de piloter l'IA comme un chef de projet technique.\n\n2. Le workflow complet de la création au déploiement\n• Étape 1 : Le cahier des charges textuel (définir les fonctionnalités, l'interface et les interactions avec un LLM spécialisé comme Claude).\n• Étape 2 : L'assemblage visuel et logique (générer les blocs de code HTML/CSS/JS et les tester instantanément).\n• Étape 3 : L'hébergement et la mise en ligne (transférer le code sur une plateforme de déploiement instantané pour obtenir une URL publique).\n• Étape 4 : La conversion mobile (transformer ta web app en application installable sur smartphone via des outils no-code/low-code).\n\nPourquoi ça change tout :\nTu peux désormais prototyper, tester et lancer un produit logiciel viable sur le marché en quelques minutes, sans dépendre d'une agence ou d'une équipe technique externe.", 
        resources: [
          {
            type: 'video',
            title: "Créer une App IA complète en 10 min (sans coder)",
            description: "Une démonstration pratique de A à Z pour concevoir, tester, héberger et transformer une application en APK mobile grâce à l'IA.",
            actionText: "Voir la vidéo",
            actionUrlOrContent: "https://www.youtube.com/watch?v=XxSz67I_mb4"
          },
          {
            type: 'text',
            title: "Prompt de génération de cahier des charges technique",
            description: "Un prompt structuré pour transformer une idée brute en plan de développement technique pour l'IA.",
            actionText: "Copier le prompt",
            actionUrlOrContent: "Agis en tant qu'architecte logiciel senior. Je souhaite créer une application web qui fait [Décris ton application]. Rédige un cahier des charges technique clair incluant : 1) La structure des fichiers (HTML, CSS, JS), 2) Les composants UI indispensables, 3) La logique des données et des interactions, 4) Un plan d'implémentation étape par étape pour que je puisse le coder avec l'aide d'un LLM."
          },
          {
            type: 'file',
            title: "Le Guide du Code Assisté par IA (PDF)",
            description: "Le livre blanc complet détaillant le workflow de zéro à la mise en ligne d'une application sans savoir coder.",
            actionText: "Télécharger",
            actionUrlOrContent: "/fichiers/guide-code-assiste-ia.pdf"
          }
        ]
      },
      {
  title: "Pipelines de contenu automatisés",
  content: `Dans cette section, nous passons de la simple création de contenu ponctuelle à l'industrialisation grâce aux pipelines automatisés. L'objectif : faire travailler l'IA en arrière-plan pour alimenter vos canaux de diffusion de manière fluide et continue.

1. Qu'est-ce qu'un pipeline de contenu ?
Un pipeline (ou tunnel de traitement) est une chaîne d'actions séquentielles où chaque étape automatise une transformation de l'information :
• L'amont (Trigger / Source) : Une idée, un lien web, une note vocale ou une ligne dans un tableau de bord (Airtable / Google Sheets).
• Le traitement (LLM / IA) : Un agent ou un prompt système qui analyse, enrichit, structure et rédige le contenu selon vos critères de marque.
• L'aval (Action / Diffusion) : L'export automatique vers votre site web, votre plateforme de formation, vos réseaux sociaux ou votre boîte mail.

2. Les briques essentielles de l'automatisation
Pour mettre en place votre premier pipeline sans écrire une seule ligne de code, vous combinez généralement :
• Un outil d'orchestration No-Code : Make.com ou Zapier pour faire communiquer les applications entre elles.
• Une base de données ou un CRM : Airtable ou Google Sheets pour stocker et piloter le statut de vos contenus (Idée, En rédaction, Validé, Publié).
• Une API d'IA : Les modèles d'OpenAI ou d'Anthropic intégrés directement dans vos scénarios d'automatisation.

3. Bonnes pratiques et garde-fous
Automatiser ne signifie pas perdre le contrôle :
• Intégrez toujours une étape de validation humaine (Human-in-the-middle) : Programmez un système de notification (sur Slack, Discord ou par e-mail) qui vous demande d'approuver le contenu avant sa publication définitive.
• Soignez le prompt système : Plus vos instructions d'automatisation sont précises sur le ton, la mise en forme et les contraintes, moins vous aurez de corrections manuelles à effectuer.`,
  resources: [
    {
      type: 'video',
      title: "Créer un Pipeline de Contenu Automatisé de A à Z",
      description: "Une démonstration pratique pour configurer son premier scénario No-Code et connecter l'IA à ses outils de diffusion.",
      actionText: "Voir la vidéo",
      actionUrlOrContent: "https://www.youtube.com/watch?v=XxSz67I_mb4"
    },
    {
      type: 'text',
      title: "Prompt système pour automatisation de rédaction",
      description: "Le prompt structuré à intégrer dans votre brique IA (Make/Zapier) pour générer du contenu aux normes de votre marque.",
      actionText: "Copier le prompt",
      actionUrlOrContent: "Agis en tant qu'expert en automatisation de contenu et en rédaction web. À partir des notes brutes ou de l'idée suivante : [Insérer la variable de la Source], réédite et structure un article complet en Markdown. Respecte scrupuleusement les consignes suivantes : un titre accrocheur, des sous-titres clairs, un ton professionnel et direct, et une conclusion engageante."
    },
    {
      type: 'file',
      title: "Le Guide des Pipelines de Contenu (PDF)",
      description: "Le support de cours complet détaillant l'architecture technique, les outils no-code et la checklist d'implémentation.",
      actionText: "Télécharger",
      actionUrlOrContent: "/fichiers/pipeline-contenu-automatise.pdf"
      }
        ]
      } // <--- Fermeture de l'objet de la leçon "Pipelines de contenu automatisés" (PAS de virgule ici si c'est la dernière leçon)
    ] // <--- Fermeture du tableau lessons: [ ... ] du Pilier 02
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