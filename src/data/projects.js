/**
 * Project data displayed across the portfolio.
 *
 * Each project object describes a portfolio entry with metadata, descriptions,
 * media, links, optional workflow demos, and optional code snippets.
 *
 * Main fields:
 * - slug: unique URL identifier used by project routes.
 * - title: project name displayed in cards and pages.
 * - period: project date, usually in MM/YYYY format.
 * - featured: whether the project appears in the featured slider.
 * - category: project type used for display labels.
 * - tags: technologies or keywords displayed in cards and filters.
 * - shortDesc: short summary displayed in project cards and headers.
 * - longDesc: detailed description displayed on the project page.
 * - context: academic, personal, or professional context.
 * - role: main responsibility in the project.
 * - stack: technologies used in the project.
 * - hero: main media displayed first on the project page.
 * - media: optional additional images, videos, or iframes.
 * - links: optional external links such as GitHub or Figma.
 * - workflows: optional n8n workflow files displayed with N8nWorkflow.
 * - codeSnippet: optional code extract displayed on the project page.
 */
export const projects = [
  {
    slug: "plateforme-onboarding",
    title: "Plateforme Onboarding Client",
    period: "05/2026",
    featured: true,
    category: "info",
    tags: ["n8n", "Automatisation", "API", "PDF", "IA"],
    shortDesc:
      "Plateforme métier d’onboarding client construite autour d’Airtable et n8n, avec suivi des prospects, tâches dépendantes, génération PDF, emails MJML et analyse automatique des réponses.",
    longDesc: {
      genesis:
        "Plateforme Onboarding Client est un projet développé pendant mon stage, dans un contexte où le suivi des nouveaux clients était très manuel et assez dispersé. Le cabinet avait besoin d’un système plus clair pour suivre l’avancement des prospects, éviter les oublis, mieux organiser les relances et centraliser les informations importantes. Avant de construire la solution, nous avons comparé plusieurs outils comme Monday, Baserow, Airtable et d’autres plateformes no-code. Airtable a finalement été retenu comme base, mais il fallait encore construire toute la logique métier autour pour que le processus devienne vraiment exploitable au quotidien.",
      overview:
        "La plateforme permet de suivre un client depuis son arrivée jusqu’à la fin de son onboarding. Les prospects avancent à travers différentes phases, avec des tâches qui se déclenchent selon des dépendances et des statuts. Le système permet aussi de générer des documents, d’envoyer des mails personnalisés, de planifier des communications et de classer automatiquement certaines réponses. L’objectif côté direction était surtout l’automatisation, mais dans les faits, l’un des plus gros apports était aussi l’organisation : rendre le travail plus fluide entre les collaborateurs, donner une meilleure visibilité sur les dossiers et éviter que chacun doive chercher les informations à plusieurs endroits.",
      build:
        "Techniquement, j’ai construit une vingtaine de workflows n8n interconnectés, avec un routeur central basé sur Airtable qui redirigeait les actions vers des handlers spécialisés. J’ai mis en place la logique des phases, des tâches, des dépendances, la génération de PDF multi-pages via Gotenberg, ainsi que des emails personnalisés en MJML. Un workflow de polling Outlook récupérait les réponses aux mails, puis Gemini les classait pour mettre à jour automatiquement les statuts dans Airtable. Ce projet m’a surtout appris à penser une automatisation comme un vrai système métier, avec des cas particuliers, des erreurs possibles et des besoins humains derrière chaque étape.",
    },
    context: "Stage - Cabinet comptable Doucy Consilium, Sélestat",
    role: "Conception du système métier et développement des workflows",
    stack: [
      "n8n",
      "Airtable API",
      "Gotenberg",
      "Microsoft Outlook API",
      "Google Gemini API",
      "Silae API",
      "Pennylane API",
      "MJML",
      "JavaScript",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/plateforme-onboarding-client/hero.webp",
      alt: "Vue d'ensemble du pipeline de synthèse comptable",
    },
    workflows: [
      {
        label: "Onboarding",
        src: "/assets/projects/plateforme-onboarding-client/workflows/onboarding-demo.json",
      }
    ],
  },
  {
    slug: "pipeline-synthese-comptable",
    title: "Pipeline Synthèse Comptable",
    period: "03/2026",
    featured: true,
    category: "info",
    tags: ["n8n", "Automatisation", "API", "JavaScript", "IA"],
    shortDesc:
      "Système automatisé de synthèse financière mensuelle multi-logiciels générant des rapports KPI personnalisés par client et les envoyant par mail.",
    longDesc: {
      genesis:
        "Pipeline Synthèse Comptable est un projet développé pendant mon stage dans un cabinet comptable. Le besoin venait d’une tâche très répétitive : produire des synthèses financières pour les clients et donner aux collaborateurs un récapitulatif clair de leurs dossiers. Avant de reconstruire le système, j’ai dû auditer une première version qui était devenue difficile à maintenir et peu pratique au quotidien. Par exemple, la sélection des clients passait par plusieurs fichiers Excel séparés, un pour inclure certains clients et un autre pour en exclure, ce qui rendait le processus lourd, fragile et pas vraiment tenable.",
      overview:
        "Le système que j’ai mis en place permet de déclencher automatiquement deux workflows de production, l’un pour MyUnisoft et l’autre pour Pennylane. Chaque mois, ils récupèrent les sociétés clientes, collectent plusieurs niveaux de données financières, les normalisent, les enrichissent avec les budgets, puis génèrent des indicateurs utiles. Le résultat final comprend des KPIs, un graphique d’évolution de trésorerie et un rapport HTML envoyé par Outlook. Le gain était concret : une tâche qui pouvait prendre environ 5 heures pouvait descendre autour de 15 minutes.",
      build:
        "Techniquement, j’ai reconstruit une grande partie de la logique dans n8n. J’ai utilisé les API MyUnisoft et Pennylane, géré les limites d’appels, structuré les traitements en sous-workflows et automatisé la génération des rapports. J’ai aussi remplacé la sélection manuelle par Excel par un système beaucoup plus propre avec les data tables de n8n et un formulaire administrateur construit en bidouillant le moteur de n8n pour obtenir quelque chose de vraiment utilisable. L’administrateur pouvait simplement cocher les clients à traiter, avec leurs noms, et sauvegarder la configuration. C’est typiquement le genre de projet où le vrai travail n’était pas seulement d’automatiser, mais de rendre le processus compréhensible, maintenable et agréable à gérer.",
    },
    context: "Stage - Cabinet comptable Doucy Consilium, Sélestat",
    role: "Audit, refonte et automatisation complète du processus",
    stack: [
      "n8n",
      "MyUnisoft API",
      "Pennylane API",
      "Microsoft Outlook API",
      "Google Gemini API",
      "JavaScript",
      "Airtable",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/pipeline-synthese-comptable/hero.webp",
      alt: "Vue d'ensemble du pipeline de synthèse comptable",
    },
    workflows: [
      {
        label: "Synthèse mensuelle Pennylane",
        src: "/assets/projects/pipeline-synthese-comptable/workflows/synthese-demo.json",
      },
      {
        label: "Calcul et envoi des synthèses",
        src: "/assets/projects/pipeline-synthese-comptable/workflows/calculation-send-demo.json",
      },
      {
        label: "Sélection des abonnements",
        src: "/assets/projects/pipeline-synthese-comptable/workflows/subscribtion-selection-demo.json",
      },
      {
        label: "Portail de Gestion des Abonnements",
        src: "/assets/projects/pipeline-synthese-comptable/workflows/subs-manager-form-demo.json",
      },
    ],
  },
  {
    slug: "usine-chocolat",
    title: "Usine Chocolat",
    period: "01/2026",
    featured: true,
    category: "info",
    tags: ["Laravel", "React", "WebSocket", "MySQL", "CI/CD", "PHP"],
    shortDesc:
      "Application full-stack pensée pour piloter une chaîne de production de sachets de chocolat en temps réel : commandes visiteurs, dashboard opérateur, stocks, qualité, rôles et CI/CD.",
    longDesc: {
      genesis:
        "Usine Chocolat est arrivé dans le cadre d’un projet scolaire autour des Journées Portes Ouvertes de l’IUT. L’idée était de créer une interface pour accompagner une ligne de production de sachets de chocolats gérée par le département QLIO, afin de montrer concrètement comment fonctionne une chaîne de production. J’ai choisi de faire le projet seul pour garder la main sur toute l’application, avancer à mon rythme et éviter de dépendre de l’avancement de quelqu’un d’autre. Ça représentait plus de travail, mais aussi moins de coordination à gérer, ce qui me permettait d’être plus autonome.",
      overview:
        "L’application permettait aux visiteurs de scanner un QR code, de renseigner leurs informations, d’indiquer d’éventuelles allergies, puis de passer une commande de sachets de chocolats. Une fois la commande envoyée, ils pouvaient suivre son avancement étape par étape, récupérer un numéro de commande et en relancer une nouvelle dans la limite prévue. De l’autre côté, les opérateurs et superviseurs disposaient d’un tableau de bord en temps réel pour suivre les commandes, les déplacer entre les postes de travail, déclarer des non-conformités, gérer les stocks et consulter des statistiques utiles sur l’avancée de la production.",
      build:
        "Techniquement, j’ai construit toute l’application : le dashboard, la gestion des commandes, les stocks, les alertes, les rôles, les sessions annuelles, la partie qualité, le modèle de données, les tests et l’architecture globale. Le projet reposait sur Laravel, React, Inertia, MySQL et un système WebSocket pour le temps réel. J’ai aussi mis en place une pipeline CI/CD sur GitLab avec des tests automatisés, ce qui m’a permis de travailler sur une base plus fiable. C’était un projet assez complet, parce qu’il ne s’agissait pas seulement de faire une interface jolie, mais de gérer un vrai flux de production avec plusieurs profils, plusieurs étapes et des données qui devaient rester cohérentes.",
    },
    context: "Projet académique individuel - SAE 501, BUT MMI 3",
    role: "Conception et développement full-stack complet",
    stack: [
      "Laravel 12",
      "React 18",
      "Inertia.js",
      "Tailwind CSS v4",
      "MySQL",
      "PHPUnit",
      "Socket.io",
      "Node.js",
      "Express",
      "GitLab CI",
      "Vite",
      "PHP 8.2",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/usine-chocolat/usine-chocolat-hero.webp",
      alt: "Accueil Usine Chocolat",
    },
    media: [
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/user-1.webp",
        alt: "Première page du parcours visiteur",
      },
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/user-2.webp",
        alt: "Deuxième page du parcours visiteur",
      },
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/user-3.webp",
        alt: "Troisième page du parcours visiteur",
      },
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/production.webp",
        alt: "Dashboard de production d'opérateur",
      },
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/statistics.webp",
        alt: "Dashboard de statistiques d'opérateur",
      },
      {
        type: "image",
        url: "/assets/projects/usine-chocolat/stocks.webp",
        alt: "Dashboard de stocks d'opérateur",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/sae-501-2-usine-chocolat",
      },
    ],
    thumbnail: "/assets/projects/usine-chocolat/thumbnail.webp",
  },
  {
    slug: "di5-festival",
    title: "F.E.F.F.S",
    period: "12/2025",
    featured: true,
    category: "info",
    tags: ["Flutter", "Firebase", "Mobile", "Dart"],
    shortDesc:
      "Application mobile Flutter/Firebase pour un festival de cinéma, avec programmation en temps réel, réservations, tickets, accessibilité et système de vote par QR code.",
    longDesc: {
      genesis:
        "L'application DI5 FEFFS est un projet académique réalisé en équipe autour du Festival Européen du Film Fantastique de Strasbourg. L’objectif était de concevoir une application mobile qui accompagne un festivalier dans son expérience, de la consultation de la programmation jusqu’à la réservation et au vote. Nous avons choisi Flutter pour pouvoir viser Android et iOS avec une seule base, et Firebase pour gérer l’authentification, les données et les flux applicatifs. Nous avons aussi retravaillé la direction graphique avec une interface sombre, sobre et plus simple à parcourir.",
      overview:
        "L’application permet à un utilisateur de consulter les films et événements du festival, d’accéder aux détails, de réserver des séances, de retrouver ses tickets, de voter pour des films via un QR code et de gérer une partie de son profil. Elle intègre aussi des fonctionnalités liées au téléphone, comme l’ajout d’événements au calendrier ou certaines notifications. Une attention particulière a été portée à l’accessibilité, notamment avec les bonnes sémantiques Flutter pour que l’application reste utilisable avec un lecteur d’écran.",
      build:
        "Sur ce projet, je me suis surtout occupé du cœur applicatif. J’ai développé la page d’accueil, organisé les flux Firestore en temps réel, mis en place la pagination, le cache des films et une partie importante de la structuration des données. J’ai aussi travaillé sur les seeders pour nettoyer et réinjecter des données réalistes dans Firebase, ainsi que sur le système de votes utilisateurs. Cette partie allait jusqu’à la génération des QR codes, la page de scan, la redirection vers le formulaire de vote, l’enregistrement en base et le retour vers la page du film. C’était un projet intéressant parce qu’il demandait à la fois de penser l’expérience utilisateur, la structure des données et la coordination avec le reste de l’équipe.",
    },
    context: "Projet académique en groupe - BUT MMI S5",
    role: "Cœur applicatif, structuration Firestore et système de vote QR",
    stack: [
      "Flutter 3",
      "Dart",
      "Firebase Auth",
      "Cloud Firestore",
      "Firebase Cloud Messaging",
      "Mapbox Maps SDK",
      "mobile_scanner",
      "Google Sign-In",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/feffs/search-result.webp",
      alt: "Écran de résultats de recherche de l'application FEFFS",
    },
    media: [
      {
        type: "image",
        url: "/assets/projects/feffs/daily.webp",
        alt: "Programmation quotidienne du festival",
      },
      {
        type: "image",
        url: "/assets/projects/feffs/news.webp",
        alt: "Fil d'actualités du festival",
      },
      {
        type: "image",
        url: "/assets/projects/feffs/ticket.webp",
        alt: "Détail d'un billet de séance",
      },
      {
        type: "image",
        url: "/assets/projects/feffs/my-tickets.webp",
        alt: "Liste des billets réservés par l'utilisateur",
      },
      {
        type: "image",
        url: "/assets/projects/feffs/my-reviews.webp",
        alt: "Avis et votes laissés par l'utilisateur",
      },
      {
        type: "image",
        url: "/assets/projects/feffs/emulation.webp",
        alt: "Application FEFFS lancée dans un émulateur mobile",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Teyncz/DI5_ROTH_BERGMANN_IDA-ALI",
      },
    ],
  },
  {
    slug: "yasuragi",
    title: "Yasuragi",
    period: "11/2025",
    featured: true,
    category: "info",
    tags: ["Laravel", "PHP", "JavaScript", "MySQL", "UX"],
    shortDesc:
      "Outil de gestion de projet plus léger et plus calme que les plateformes classiques, avec backlog, sprints, roadmap, rôles et Kanban interactif en drag & drop.",
    longDesc: {
      genesis:
        "Yasuragi est un projet individuel réalisé dans le cadre de la SAE 501, avec l’envie de créer un outil de gestion de projet plus léger et plus agréable que les grosses plateformes classiques. L’idée n’était pas de refaire Jira ou Trello à l’identique, mais plutôt de construire un espace plus simple, plus calme, où l’on peut organiser un projet sans se sentir noyé dans les fonctionnalités. Le nom Yasuragi renvoie justement à cette idée de sérénité, ce qui correspondait bien à l’ambiance que je voulais donner à l’application.",
      overview:
        "L’application permet de créer des projets, d’organiser les tâches, de gérer un backlog, des sprints, une roadmap et un board Kanban. Les utilisateurs peuvent avoir différents rôles, comme Owner, Manager, Member ou Viewer, ce qui permet d’adapter les droits selon la place de chacun dans le projet. Le board Kanban est pensé pour être fluide, avec du drag & drop, des mises à jour rapides et même des petits sons pour rendre l’expérience plus vivante. Je voulais vraiment que l’outil donne envie d’être utilisé, pas juste qu’il coche une liste de fonctionnalités.",
      build:
        "Techniquement, le projet a été construit avec Laravel et Blade, en gardant une architecture assez classique mais propre. J’ai développé la gestion des rôles, les projets, les tâches, les sprints, la roadmap, le Kanban en drag & drop natif et les mises à jour optimistes via AJAX. Le plus compliqué n’a pas seulement été la logique technique, même si le Kanban demandait pas mal de soin, mais surtout l’UX. Trouver une belle roadmap, un board agréable, une interface claire et cohérente, c’était finalement ce qui prenait le plus de réflexion. Ce projet m’a donné l’impression de construire un vrai petit outil, assez simple pour rester utilisable, mais assez complet pour ressembler à quelque chose de concret.",
    },
    context: "Projet académique individuel - SAE 501, BUT MMI 3",
    role: "Conception UX et développement full-stack complet",
    stack: [
      "Laravel 12",
      "PHP 8.3",
      "Blade",
      "Tailwind CSS",
      "JavaScript ES Modules",
      "Chart.js",
      "HTML5 Drag & Drop API",
      "Vite",
      "MySQL",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/yasuragi/home.webp",
      alt: "Accueil de Yasuragi",
    },
    media: [
      {
        type: "image",
        url: "/assets/projects/yasuragi/dashboard.webp",
        alt: "Dashboard de Yasuragi",
      },
      {
        type: "image",
        url: "/assets/projects/yasuragi/kanban.webp",
        alt: "Kanban d'un projet",
      },
      {
        type: "image",
        url: "/assets/projects/yasuragi/project.webp",
        alt: "Détails d'un projet",
      },
      {
        type: "image",
        url: "/assets/projects/yasuragi/roadmap.webp",
        alt: "Roadmap d'un projet",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/sae-501-yasuragi",
      },
    ],
    thumbnail: "/assets/projects/yasuragi/thumbnail.webp",
  },
  {
    slug: "luma",
    title: "LUMA",
    period: "02/2025",
    featured: true,
    category: "info",
    tags: ["JavaScript", "Chart.js", "CSS", "HTML5", "Data viz"],
    shortDesc:
      "Site web interactif de sensibilisation à la sobriété numérique, conçu pour parler d’un sujet sérieux avec une expérience colorée, animée et accessible aux jeunes.",
    longDesc: {
      genesis:
        "L.U.M.A. (Ligue pour une Utilisation Modérée et Accessible) est un projet collectif réalisé autour de la sobriété numérique et de l’impact énergétique des loisirs en ligne. L’objectif était de sensibiliser les jeunes sans tomber dans un ton trop lourd ou culpabilisant. On voulait montrer qu’il est possible de parler d’un sujet sérieux avec une approche plus visuelle, colorée et accessible. La mascotte LUMA, les couleurs vives et l’univers graphique avaient justement pour but de rendre le message plus engageant, surtout pour un public habitué à consommer du contenu rapidement.",
      overview:
        "Le site présente les enjeux de la consommation énergétique liée au numérique à travers des sections claires, des visuels, des animations, une vidéo explicative et des graphiques. L’expérience devait rester simple à parcourir, avec peu de texte, des informations rapides à comprendre et une ambiance assez dynamique pour garder l’attention. Une partie du site était aussi dédiée aux graphiques Chart.js, chacun ayant travaillé sur son propre graphique pour illustrer une donnée ou une comparaison liée au sujet.",
      build:
        "Sur ce projet, j’ai réalisé l’intégralité du site web final. Les maquettes avaient été travaillées à plusieurs, mais toute la construction du site, l’intégration, la structure des sections, les animations et l’expérience finale côté web étaient de mon côté. J’ai aussi réalisé mon propre graphique Chart.js dans une partie plus cachée du site. Ce projet était intéressant parce qu’il ne s’agissait pas seulement de coder une page, mais de traduire une intention collective en une expérience web cohérente, agréable et assez vivante pour donner envie de s’intéresser au sujet.",
    },
    context: "Projet académique collectif - SAE 303, groupe de 5",
    role: "Développement complet du site web final et intégration interactive",
    stack: ["HTML5", "CSS3", "JavaScript", "Chart.js", "Web Animations API"],
    demo: "https://luma-vert-tau.vercel.app/",
    media: [
      {
        type: "iframe",
        url: "https://luma-vert-tau.vercel.app/",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/site_luma",
      },
    ],
    thumbnail: "/assets/projects/luma/thumbnail.webp",
  },
  {
    slug: "era-explorer",
    title: "Era Explorer",
    period: "06/2024",
    featured: true,
    category: "info",
    tags: ["PHP", "MySQL", "AJAX", "Twig", "MVC"],
    shortDesc:
      "Site e-commerce immersif avec navigation temporelle à travers des époques historiques, système de notation, panier/favoris et architecture MVC.",
    longDesc: {
      genesis:
        "Era Explorer est un projet individuel réalisé dans le cadre d’une SAE, avec comme point de départ la création d’un site e-commerce. J’ai choisi de partir sur un univers autour du voyage dans le temps, parce que le sujet me parlait vraiment et me donnait beaucoup d’idées. Au lieu de faire une boutique classique, je voulais construire une vraie ambiance, où chaque époque avait son identité, ses objets, ses sons et sa manière d’être explorée. C’était un projet scolaire à la base, mais j’ai rapidement accroché au concept, au point de vouloir pousser l’expérience plus loin que le simple cahier des charges.",
      overview:
        "L’application permet à l’utilisateur de parcourir différentes époques historiques comme s’il visitait une boutique à travers le temps. Il peut consulter des produits liés à chaque période, les filtrer, les ajouter à son panier, les mettre en favoris, laisser des notes et des commentaires, et naviguer grâce à une frise chronologique interactive. J’avais aussi ajouté des musiques d’ambiance selon les époques pour renforcer l’immersion. L’idée était vraiment de faire sentir que l’utilisateur ne se contente pas de regarder une liste de produits, mais qu’il entre dans un petit univers.",
      build:
        "Techniquement, j’ai construit le projet avec une architecture MVC complète. J’ai mis en place l’authentification avec hachage des mots de passe, la gestion du panier, des favoris persistants, des commentaires, des notes, des filtres dynamiques en AJAX et la frise chronologique. Ce projet m’a beaucoup aidé à mieux comprendre comment organiser une application web complète, avec une vraie séparation entre les données, la logique et l’affichage. Il représente bien une période où je commençais à prendre plaisir à transformer un sujet scolaire en quelque chose de plus personnel et plus vivant.",
    },
    context: "Projet académique individuel - SAE 203, BUT MMI S2",
    role: "Développement full-stack complet",
    stack: [
      "PHP",
      "Twig",
      "MySQL",
      "JavaScript",
      "AJAX",
      "HTML5",
      "CSS3",
      "Composer",
      "PDO",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/era-explorer/hero.webp",
      alt: "Page d'accueil du site Era Explorer",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/sae203",
      },
    ],
  },
  {
    slug: "ranker",
    title: "Ranker",
    period: "05/2026",
    featured: false,
    category: "bonus",
    tags: ["JavaScript", "HTML", "Algorithme", "Elo", "Outil"],
    shortDesc:
      "Application web autonome de classement par duels : collez une liste, répondez à des confrontations VS, obtenez un classement ordonné via un système Elo multi-passes.",
    longDesc: {
      genesis:
        "Ranker est un outil personnel que j’ai créé parce que j’avais souvent besoin de faire des classements rapidement, sans passer par des systèmes trop lourds comme les tier lists classiques. Je voulais quelque chose de simple, rapide à lancer, facile à partager et utilisable sans préparation compliquée. L’idée était aussi de pouvoir prendre des notes et obtenir un classement plus propre qu’un simple tri fait à la main, surtout quand il y a beaucoup d’éléments à comparer.",
      overview:
        "L’outil fonctionne entièrement côté navigateur. On entre une liste d’éléments, puis Ranker propose des duels successifs entre eux. À chaque duel, on choisit l’élément qu’on préfère, ou on indique une égalité, et l’outil construit progressivement un classement. Une fois terminé, le résultat peut être exporté en Markdown ou en JSON. L’interface intègre aussi des raccourcis clavier, une barre de progression, la possibilité d’annuler le dernier choix et une logique pensée pour aller vite. C’est un projet simple en apparence, mais qui répond à un vrai besoin, au point que je m’en sers encore.",
      build:
        "Techniquement, Ranker tient dans un seul fichier HTML, sans dépendance externe. J’ai choisi ce format par praticité : c’est facile à ouvrir, à partager, à modifier et à garder sous la main. L’algorithme repose sur un système de duels combiné à un score Elo, en partant d’une base existante que j’ai adaptée à mon usage. J’ai ajouté une organisation des comparaisons en plusieurs passes pour limiter le nombre de choix nécessaires tout en obtenant un classement cohérent. Ce projet montre bien ma manière de faire des petits outils utiles : pas forcément gros, pas forcément impressionnants au premier regard, mais pensés pour résoudre un vrai problème de manière directe.",
    },
    context: "Projet personnel",
    role: "Conception et développement complet",
    stack: ["JavaScript vanilla", "HTML5", "CSS3"],
    media: [
      {
        type: "iframe",
        url: "/assets/projects/ranker/ranker.html",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/ranker",
      },
    ],
    thumbnail: "/assets/projects/ranker/hero.webp",
  },
  {
    slug: "yuumi",
    title: "Yuumi - Compagnon Airtable",
    period: "05/2026",
    featured: false,
    category: "info",
    tags: ["Chrome Extension", "JavaScript", "Manifest V3", "Airtable", "DOM"],
    shortDesc:
      "Extension Chrome qui greffe des raccourcis, du filtrage de tables et des formulaires flottants directement dans l'interface Airtable, configurable sans toucher au code.",
    longDesc: {
      genesis:
        "Yuumi est une extension navigateur que j’ai développée pendant mon stage pour répondre à une frustration très concrète avec Airtable. L’outil était utile pour structurer une partie du travail du cabinet, mais il avait aussi des limites assez gênantes au quotidien : trop de clics, trop de tables visibles, pas assez de raccourcis métier et pas de vraie manière de masquer ou organiser certains groupes selon les usages. Plutôt que de livrer un système incomplet en disant simplement “Airtable ne le permet pas”, j’ai préféré développer moi-même les fonctionnalités manquantes autour de l’outil.",
      overview:
        "L’extension ajoute une couche pratique directement dans Airtable. Elle permet d’avoir une navigation enrichie, des liens rapides, des groupes de tables affichables ou masquables selon des configurations nommées, des tables épinglées toujours visibles et des formulaires flottants pour créer rapidement des entrées sans multiplier les allers-retours dans l’interface. Ces formulaires envoyaient ensuite les données via webhook, ce qui permettait de déclencher les bons traitements derrière. Yuumi était utilisé par l’équipe et les collaborateurs du cabinet pour rendre Airtable plus fluide dans les usages quotidiens.",
      build:
        "Techniquement, Yuumi repose sur une architecture d’extension navigateur avec un service worker, des content scripts et un popup de configuration. Les fonctionnalités sont injectées directement dans la page Airtable, sans modifier Airtable lui-même. J’ai utilisé le stockage du navigateur pour permettre de surcharger une configuration par défaut, et un MutationObserver pour suivre les changements de page dans l’interface Airtable, qui fonctionne comme une SPA. Le projet n’était pas forcément compliqué dans sa logique, mais il était très satisfaisant parce qu’il répondait à un vrai problème : améliorer un outil existant sans attendre que l’outil propose lui-même les fonctionnalités.",
    },
    context: "Stage - Cabinet comptable Doucy Consilium, Sélestat",
    role: "Conception et développement complet",
    stack: [
      "JavaScript",
      "Chrome Extension API",
      "Manifest V3",
      "Service Worker",
      "Content Scripts",
      "MutationObserver",
      "chrome.storage",
      "Airtable Webhooks",
    ],
    codeSnippet: {
      filename: "manifest.json",
      language: "json",
      highlightLines: [4, 5, 6, 7, 8, 9, 10],
      code: '{\n  "manifest_version": 3,\n\n  "name": "Yuumi, compagnon Airtable",\n  "short_name": "Yuumi",\n\n  "version": "2.0.0",\n  "version_name": "2.0 - Refonte UI/UX",\n\n  "description": "Chevauchant son Grimoire, Yuumi bondit sur Airtable pour y greffer des boutons magiques et des portails vers d\'autres dimensions.",\n  "author": "Nawfel",\n  "homepage_url": "https://github.com/Noferu/yuumi-for-airtable",\n  "minimum_chrome_version": "114",\n  "offline_enabled": true,\n  "incognito": "split",\n\n  "permissions": [\n    "storage",\n    "tabs"\n  ],\n\n  "host_permissions": [\n    "https://airtable.com/*",\n    "https://hooks.airtable.com/*"\n  ],\n\n  "background": {\n    "service_worker": "background/background.js"\n  },\n\n  "action": {\n    "default_title": "Yuumi",\n    "default_popup": "popup/popup.html",\n    "default_icon": {\n      "16": "assets/icon16.png",\n      "48": "assets/icon48.png",\n      "128": "assets/icon128.png"\n    }\n  },\n\n  "content_scripts": [\n    {\n      "matches": ["https://airtable.com/*"],\n      "js": [\n        "content/config.js",\n        "content/menu.js",\n        "content/form.js",\n        "content/tables.js"\n      ],\n      "run_at": "document_idle",\n      "all_frames": false\n    }\n  ],\n\n  "web_accessible_resources": [\n    {\n      "resources": [\n        "assets/icon16.png",\n        "assets/icon48.png",\n        "assets/icon128.png"\n      ],\n      "matches": ["<all_urls>"]\n    },\n    {\n      "resources": [\n        "popup/*.css",\n        "popup/*.js"\n      ],\n      "matches": ["https://airtable.com/*"]\n    }\n  ],\n\n  "content_security_policy": {\n    "extension_pages": "script-src \'self\'; object-src \'self\';"\n  }\n}',
    },
    media: [
      {
        type: "image",
        url: "/assets/projects/yuumi/extension.webp",
        alt: "Fenêtres de configuration de l'extension Yuumi",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/yuumi-for-airtable",
      },
    ],
    thumbnail: "/assets/projects/yuumi/splashart.webp",
  },
  {
    slug: "discord-riot-bot",
    title: "Shacolback",
    period: "04/2026",
    featured: false,
    category: "info",
    tags: ["Python", "API", "IA", "Automatisation"],
    shortDesc:
      "Bot Discord autonome trackant les parties League of Legends en temps réel avec persona IA via Gemini.",
    longDesc: {
      genesis:
        "Shacolback, un bot mêlant les APIs de Riot et Discord, est une expérimentation avancée que j’ai développée pour suivre les parties League of Legends d’un groupe d’amis sur Discord. Le but n’était pas de faire un produit public ou un bot parfait, mais plutôt de créer un outil vivant pour notre serveur : détecter les games, poster des infos automatiquement, suivre les résultats et ajouter une petite ambiance de taquinerie entre potes. C’était aussi une bonne occasion de pousser l’intégration entre Discord, l’API Riot et une couche d’IA avec une persona bien marquée.",
      overview:
        "Le bot permettait de détecter quand un joueur lançait une partie, puis de poster un message Discord avec les informations importantes : champion joué, mode de jeu, statistiques, KDA ou encore évolution de LP selon les cas. Il pouvait aussi attribuer automatiquement des rôles Discord selon l’activité des joueurs. Une persona IA inspirée de Shaco, avec un ton de bouffon démoniaque, permettait au bot de répondre avec une personnalité reconnaissable. Tout ce qui constituait le cœur du projet fonctionnait : la détection des parties, les messages Discord, l’API Riot, les rôles et les réponses IA.",
      build:
        "Techniquement, le bot était développé en Python avec une architecture modulaire pour séparer les responsabilités. Il interrogeait régulièrement l’API Riot Spectator pour repérer les débuts et fins de parties, puis construisait des messages Discord avec Components V2. La persona IA était propulsée par Gemini 2.0 Flash avec un contexte adapté au serveur. Le projet est resté une expérimentation avancée plutôt qu’un outil maintenu sur le long terme, principalement parce que l’objectif technique était atteint. J’avais réussi à prouver que l’intégration fonctionnait, y compris avec les limites de l’API et les contraintes d’usage, ce qui était le plus intéressant pour moi.",
    },
    context: "Projet personnel",
    role: "Conception et développement complet",
    stack: [
      "Python 3",
      "discord.py",
      "Riot Games API",
      "Google Gemini API",
      "asyncio",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/shacolback/bot-profile.webp",
      alt: "Profil Discord du bot Shacolback",
    },
    codeSnippet: {
      filename: "riot.py",
      language: "py",
      code: '# ----------------------------------\n# RIOT API\n# ----------------------------------\n\nasync def get_puuid(game_name, tag_line):\n    url = f"{RIOT_API_BASE_URL}/riot/account/v1/accounts/by-riot-id/{game_name}/{tag_line}"\n    data = await riot_get(url)\n    return data["puuid"]\n\nasync def get_name_and_tag(puuid):\n    url = f"{RIOT_API_BASE_URL}/riot/account/v1/accounts/by-puuid/{puuid}"\n    data = await riot_get(url)\n    return f"{data[\'gameName\']}#{data[\'tagLine\']}"\n\nasync def get_spectator(puuid):\n    """Returns live game data, or None if the player is not in game."""\n    url = f"{RIOT_REGIONAL_URL}/lol/spectator/v5/active-games/by-summoner/{puuid}"\n    return await riot_get(url)\n\nasync def get_lp(puuid):\n    """Returns the player\'s current ranked solo LP, or None if unranked."""\n    url = f"{RIOT_REGIONAL_URL}/lol/league/v4/entries/by-puuid/{puuid}"\n    data = await riot_get(url)\n    if not data:\n        return None\n    for entry in data:\n        if entry["queueType"] == "RANKED_SOLO_5x5":\n            return entry["leaguePoints"]\n    return None',
    },
    media: [
      {
        type: "image",
        url: "/assets/projects/shacolback/bot-detection.webp",
        alt: "Message Discord de détection d'une partie en cours",
      },
      {
        type: "image",
        url: "/assets/projects/shacolback/bot-ai.webp",
        alt: "Réponse du bot avec sa persona IA inspirée de Shaco",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/discord-riot-bot",
      },
    ],
    thumbnail: "/assets/projects/shacolback/thumbnail.webp",
  },
  {
    slug: "mastermind-flutter",
    title: "Mastermind Flutter",
    period: "01/2026",
    featured: false,
    category: "info",
    tags: ["Flutter", "Dart", "Mobile"],
    shortDesc:
      "Implémentation mobile du jeu Mastermind en Flutter, avec logique de jeu complète et interface Material Design.",
    longDesc: {
      genesis:
        "Mastermind Flutter est un projet académique que j’ai réalisé seul dans le cadre d’un TP noté. Le but était de recréer le jeu Mastermind en application mobile, avec une version simple mais propre. J’avais déjà touché à Flutter avant, mais ce projet représentait un contact plus officiel avec la techno dans un cadre évalué, donc l’objectif était surtout de produire quelque chose de clair, fonctionnel et fidèle au sujet.",
      overview:
        "L’application permet au joueur de deviner une combinaison secrète de quatre couleurs en dix tentatives maximum. À chaque essai, il sélectionne ses couleurs, valide sa proposition, puis reçoit un retour visuel pour savoir si certains éléments sont bien placés ou présents dans la combinaison. Le jeu garde aussi l’historique des tentatives, détecte la victoire ou la défaite, et permet de relancer une partie. Je suis resté assez fidèle au sujet, sans chercher à ajouter des fonctionnalités inutiles.",
      build:
        "Techniquement, le plus intéressant était surtout la logique de jeu. Il fallait générer la combinaison secrète, gérer les tentatives, comparer les couleurs, produire les bons retours visuels et maintenir l’état de la partie jusqu’à la fin. L’interface en elle-même restait assez simple, mais il fallait que l’ensemble soit lisible et agréable à utiliser sur mobile. Ce projet n’était pas le plus difficile, mais il représente un exercice propre, bien cadré, qui m’a permis de consolider ma manière de structurer une petite application Flutter.",
    },
    context: "Projet académique - BUT MMI",
    role: "Développement mobile complet",
    stack: ["Flutter", "Dart", "Material Design"],
    hero: {
      type: "image",
      url: "/assets/projects/mastermind/screenshot.webp",
      alt: "Écran de jeu de Mastermind sur mobile",
    },
    media: [
      {
        type: "video",
        url: "/assets/projects/mastermind/gameplay.mp4",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/mastermind_flutter",
      },
    ],
    thumbnail: "/assets/projects/mastermind/thumbnail.webp",
  },
  {
    slug: "mutualmap",
    title: "MutualMap",
    period: "07/2025",
    featured: false,
    category: "info",
    tags: ["Python", "JavaScript", "API", "Visualisation"],
    shortDesc:
      "Outil de visualisation de réseaux sociaux Discord sous forme de graphe interactif avec analyse statistique.",
    longDesc: {
      genesis:
        "MutualMap est né d’une curiosité assez simple : voir à quoi ressemblent vraiment les réseaux d’amis Discord quand on les transforme en graphes. À la base, c’était un projet très “entre potes”, presque un délire de curiosité, mais je trouvais intéressant de rendre visibles des connexions qu’on ne perçoit pas forcément dans l’interface Discord. Au lieu de seulement voir une liste d’amis, je voulais comprendre les groupes, les ponts entre communautés, les personnes isolées et les liens communs entre plusieurs comptes.",
      overview:
        "L’outil permet d’exporter les relations d’un compte Discord puis de générer un graphe interactif en HTML. On peut y voir les différents groupes d’amis, les clusters, les connexions importantes, les utilisateurs isolés et quelques statistiques comme la densité du réseau, le diamètre du graphe ou les top connexions. J’ai aussi ajouté un mode “mega graph” qui permet de fusionner plusieurs exports de comptes différents pour voir les interconnexions entre plusieurs réseaux. C’est le genre de projet qui n’a pas besoin d’être très sérieux pour être intéressant : il rend juste visible un truc qu’on connaît tous, mais qu’on ne voit jamais vraiment.",
      build:
        "Techniquement, le projet repose sur un script JavaScript lancé côté navigateur pour récupérer les données via Discord, puis sur un traitement Python qui génère un graphe interactif avec PyVis et Vis.js. J’ai enrichi le rendu avec un panneau de statistiques, des indicateurs sur la structure du réseau et des outils pour fusionner plusieurs exports. La partie extraction n’est pas forcément la plus “propre” au sens académique, mais elle a l’avantage d’être transparente et compréhensible pour quelqu’un qui veut générer son propre graphe localement. Ce projet m’a surtout plu parce qu’il mélangeait collecte de données, visualisation et analyse sociale d’une manière assez concrète.",
    },
    context: "Projet personnel",
    role: "Conception et développement complet",
    stack: [
      "Python 3",
      "PyVis",
      "Vis.js",
      "JavaScript",
      "HTML",
      "CSS",
      "Discord API",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/mutualmap/hero.webp",
      alt: "Graphe interactif d'un réseau d'amis Discord généré par MutualMap",
    },
    demo: "/assets/projects/mutualmap/discord_friends_marco.html",
    media: [
      {
        type: "iframe",
        url: "/assets/projects/mutualmap/discord_friends_marco.html",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/mutualmap",
      },
    ],
  },
  {
    slug: "generosus",
    title: "Generosus",
    period: "06/2025",
    featured: false,
    category: "bonus",
    tags: ["JavaScript", "Canvas API", "Pixel Art", "Game Dev", "Aseprite"],
    shortDesc:
      "Jeu narratif 2D side-scrolling développé intégralement en JavaScript vanilla, avec moteur de jeu custom, dialogues JSON et direction artistique pixel art.",
    longDesc: {
      genesis:
        "Generosus est un projet personnel de jeu vidéo narratif 2D, né d’une période plus intime et émotionnelle. Le jeu tourne autour de thèmes comme la solitude, l’espoir, l’acceptation et le besoin d’être vu par les autres. Le nom Generosus vient du latin et signifie “généreux”, en lien avec la signification de mon prénom, Nawfel. Même si le projet venait d’un contexte très personnel, j’ai choisi de le transformer en univers symbolique, avec une ambiance plus douce, mystérieuse et poétique.",
      overview:
        "Le joueur incarne Generosus, un voyageur qui traverse différentes scènes et avance dans un monde en noir et blanc, avec quelques touches lumineuses. L’expérience est surtout narrative et contemplative : on se déplace, on interagit avec des personnages, on découvre des dialogues et on passe d’un lieu à l’autre dans une atmosphère assez calme, presque mélancolique. Je voulais que le joueur ressente une forme de solitude, mais pas quelque chose de totalement désespéré. Il y a aussi une idée d’espoir, de chemin à faire, même quand le monde paraît vide ou difficile à comprendre.",
      build:
        "Techniquement, j’ai développé le jeu sans bibliothèque externe, uniquement avec JavaScript et la Canvas API. J’ai construit mon propre petit moteur avec la boucle de jeu, les déplacements, la caméra, les collisions, les changements de scène, les interactions, les dialogues chargés depuis des fichiers JSON, la parallaxe, les animations et la gestion des sprites. Le projet comprenait déjà les bases jouables : déplacement, moteur, interactions, chat/dialogues, transitions entre scènes et ambiance visuelle. Ce dont je suis le plus fier, c’est surtout le pixel art et l’atmosphère générale, parce que c’est là que le projet prend vraiment son identité.",
    },
    context: "Projet personnel",
    role: "Développement complet, direction artistique, game design, narration",
    stack: [
      "JavaScript vanilla",
      "Canvas API",
      "HTML5",
      "CSS3",
      "JSON",
      "Aseprite",
    ],
    demo: "https://generosus.vercel.app/",
    media: [
      {
        type: "iframe",
        url: "https://generosus.vercel.app/",
      },
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/generosus",
      },
    ],
    thumbnail: "/assets/projects/generosus/main.webp",
  },
  {
    slug: "blind-test",
    title: "Blind Test Multijoueur",
    period: "03/2025",
    featured: false,
    category: "info",
    tags: ["Node.js", "WebSocket", "PHP", "MySQL", "JavaScript"],
    shortDesc:
      "Application web multijoueur temps réel avec synchronisation Socket.IO, intégration YouTube API et gestion de sessions côté serveur.",
    longDesc: {
      genesis:
        "Blind Test Multijoueur est un projet personnel que j’ai développé pour explorer l’interactivité en temps réel sur le web, tout en faisant quelque chose de fun et directement jouable. L’idée était simple : créer une partie, inviter plusieurs joueurs, lancer des extraits musicaux et faire monter les scores en direct. C’était un projet très orienté expérimentation, mais avec un vrai usage derrière, parce que le blind test est typiquement le genre de jeu qui devient intéressant seulement si tout le monde voit la même chose au même moment.",
      overview:
        "L’application permettait de créer automatiquement un salon avec un code de session et un mot de passe. Les joueurs pouvaient rejoindre la partie avec un pseudo, écouter les extraits musicaux intégrés via YouTube, répondre et voir les scores évoluer pendant la session. Le projet était jouable et fonctionnait globalement bien, même s’il restait quelques soucis par moments, comme des décalages de quelques secondes ou des scores qui ne se comptabilisaient pas toujours correctement. Avec le recul, je vois clairement comment je pourrais le refaire plus proprement aujourd’hui, mais c’est aussi ce qui rend le projet intéressant : il montre une vraie première approche du temps réel.",
      build:
        "Techniquement, l’application reposait sur une architecture hybride avec un serveur Node.js, Express et Socket.IO pour gérer la logique temps réel, et un backend PHP/MySQL pour les données persistantes. Node s’occupait de la synchronisation entre les joueurs, des salons et des événements en direct, tandis que PHP/MySQL permettait de garder les informations nécessaires côté base de données. Le projet a été déployé sur un serveur Plesk avec une configuration Node.js, ce qui m’a aussi permis de toucher à une partie plus concrète du déploiement. Ce n’était pas le projet le plus parfait, mais il m’a vraiment aidé à comprendre les contraintes d’une application multijoueur en temps réel.",
    },
    context: "Projet personnel",
    role: "Conception et développement complet",
    stack: [
      "Node.js",
      "Express",
      "Socket.IO",
      "PHP",
      "MySQL",
      "JavaScript",
      "YouTube Embed API",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/blindtest/hero.webp",
      alt: "Interface du Blind Test multijoueur",
    },
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Noferu/blind_test",
      },
    ],
  },
  {
    slug: "cook-quest",
    title: "Cook Quest",
    period: "06/2024",
    featured: false,
    category: "bonus",
    tags: [
      "Figma",
      "Miro",
      "UX/UI",
      "Gamification",
      "Ergonomie",
      "Tests utilisateurs",
    ],
    shortDesc:
      "Prototype UX/UI d’un site de cuisine gamifié mêlant commande d’ingrédients, recettes guidées, progression par mondes, défis et récompenses pour rendre la cuisine plus accessible et ludique.",
    longDesc: {
      genesis:
        "Cook Quest est un projet académique réalisé en groupe dans le cadre de la SAE 201, avec comme objectif de concevoir la maquette d’un produit tout en justifiant nos choix grâce à des méthodes ergonomiques. Au départ, nous voulions partir sur une idée proche du jeu vidéo, mais nous cherchions quelque chose de plus original et plus universel. La question qui a vraiment lancé le projet était assez simple : qu’est-ce qui rassemble tout le monde ? La nourriture s’est imposée naturellement. De là est née l’idée d’un site de cuisine interactif, capable d’aider des étudiants ou des débutants à se lancer en cuisine, tout en rendant l’expérience plus motivante grâce à une logique de progression, de défis, de mondes culinaires et de récompenses. L’objectif n’était donc pas seulement de présenter des recettes, mais de transformer l’apprentissage de la cuisine en une aventure plus ludique et engageante.",
      overview:
        "Le concept de Cook Quest mélange une expérience de cuisine inspirée de services comme HelloFresh avec une logique de gamification plus proche d’applications comme Duolingo. L’utilisateur peut parcourir un catalogue de recettes, découvrir des mondes culinaires, suivre sa progression, gagner des étoiles, consulter son profil, relever des défis et accéder à des pages de recettes plus détaillées. La direction artistique reprend volontairement des codes visuels du jeu vidéo : couleurs pastel, gros boutons, icônes illustrées, cartes de progression, badges et interface très expressive. Cette approche a été particulièrement bien reçue, notamment parce qu’elle permettait de se démarquer d’un simple site de recettes classique. Nous avons aussi travaillé l’arborescence, les catégories et les sous-catégories du site à partir de méthodes comme le focus group et le tri par cartes, ce qui nous a permis de mieux organiser les mondes, par exemple autour de catégories comme les recettes carnées, herbacées, fruitées ou encore gourmandes.",
      build:
        "Sur ce projet, mon rôle principal était la conception UX/UI, la direction graphique et le prototypage sur Figma. J’ai réalisé une très grande partie des maquettes, travaillé la charte graphique, les couleurs, les icônes, les boutons, les composants et l’organisation visuelle des pages principales : accueil, aventure, catalogue, fonctionnement, profil, recette et carte de monde. J’ai aussi participé à la réflexion théorique autour du concept, des personæ, du benchmark, de l’arborescence et des tests utilisateurs. Nous avons utilisé Miro pour structurer les idées, les personæ et les résultats des enquêtes, Figma pour construire le prototype interactif, Photoshop pour retravailler certains visuels, et de la génération assistée d’assets visuels pour produire des icônes et images cohérentes avec l’univers graphique. Les tests utilisateurs ont permis d’identifier plusieurs pistes d’amélioration, notamment le besoin de rendre certains boutons plus incitatifs, de mieux expliquer le fonctionnement des niveaux, des étoiles et des badges, ou encore de clarifier certaines icônes comme celle des commandes. Ces retours ont été importants, parce qu’ils nous ont obligés à ne pas seulement penser au rendu visuel, mais aussi à la compréhension réelle de l’interface. Cook Quest m’a donc permis de progresser autant sur le design d’interface que sur la logique d’expérience utilisateur, la structuration d’un prototype, la cohérence des composants et l’application concrète de principes ergonomiques comme les lois de proximité et de similitude.",
    },
    context: "Projet académique en groupe - SAE 201, BUT MMI 1",
    role: "Conception UX/UI, direction graphique et prototypage Figma",
    stack: [
      "Figma",
      "Miro",
      "Photoshop",
      "ChatGPT",
      "UX Design",
      "UI Design",
      "Tests utilisateurs",
    ],
    hero: {
      type: "image",
      url: "/assets/projects/cook-quest/home.webp",
      alt: "Page d'accueil du prototype Cook Quest",
    },
    media: [
      {
        type: "video",
        url: "/assets/projects/cook-quest/demo-cook-quest.mp4",
      },
      {
        type: "iframe",
        url: "https://embed.figma.com/design/yHfdN9HNW9YoMmsi8LTxxi/Cook-Quest-Prototype?embed-host=share",
      },
      {
        type: "image",
        url: "/assets/projects/cook-quest/adventure.webp",
        alt: "Écran d'aventure avec la progression par mondes culinaires",
      },
    ],
    links: [
      {
        label: "Figma",
        url: "https://www.figma.com/design/yHfdN9HNW9YoMmsi8LTxxi/Cook-Quest-Prototype?m=auto&t=6Rl8DylJrcXibdEf-1",
      },
    ],
    thumbnail: "/assets/projects/cook-quest/thumbnail.webp",
  },
];
