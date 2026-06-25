/**
 * Resume data used across the portfolio.
 *
 * This object contains identity information, education, work experience,
 * skills, languages, qualities, and interests.
 *
 * It is used by the CV page, the home page resume preview, and the hero stats.
 * Date ranges use DD/MM/YYYY strings.
 */
export const resume = {
  // Identity
  name: "Nawfel Ida-Ali",
  title: "Ingénierie logicielle, automatisation & systèmes interactifs",
  location: "Strasbourg, France",
  email: "nawfel.idaali.pro@gmail.com",
  phone: "+33 7 49 59 27 39",
  links: {
    linktree: "https://linktr.ee/nawfel.idaali",
    github: "https://github.com/Noferu",
  },

  // Languages
  languages: [
    { language: "Français", level: "Maternelle" },
    { language: "Anglais", level: "B2+/C1" },
  ],

  // Education
  education: [
    {
      title: "Poursuite d’études en informatique",
      specialization: "Formation Bac + 5 en alternance à définir",
      institution: "France",
      location: "France",
      period: ["07/09/2026", "07/07/2028"],

      points: [
        "Projet de poursuite d’études vers une formation supérieure en informatique, avec une orientation développement, ingénierie logicielle, systèmes numériques ou technologies web avancées.",
        "Volonté d’approfondir les compétences liées à la conception logicielle, à l’architecture applicative, aux données, à l’automatisation et aux infrastructures numériques.",
        "Recherche d’un parcours en alternance permettant de continuer à progresser dans un cadre professionnel, avec une mise en pratique sur des projets techniques concrets.",
      ],

      tags: [
        "Informatique",
        "Développement",
        "Ingénierie logicielle",
        "Architecture",
        "Alternance",
        "Bac+5",
      ],
    },
    {
      title: "BUT MMI",
      specialization: "Développement Web & Dispositifs Interactifs",
      institution: "IUT de Haguenau — Université de Strasbourg",
      location: "Haguenau, France",
      period: ["09/09/2023", "01/07/2026"],

      points: [
        "Formation pluridisciplinaire centrée sur le développement web, les interfaces interactives et la communication numérique.",
        "Réalisation de projets mêlant développement front-end et back-end, intégration web, audiovisuel, UX/UI et dispositifs interactifs.",
        "Travail sur des problématiques de conception, d’architecture web, d’intégration responsive, d’hébergement et de gestion de projet.",
        "Approche orientée pratique avec production régulière de projets individuels et collaboratifs.",
      ],

      tags: [
        "Développement web",
        "Full-stack",
        "UI/UX",
        "Intégration web",
        "Dispositifs interactifs",
        "Audiovisuel",
      ],
    },
    {
      title: "Baccalauréat Général",
      specialization: "Spécialités NSI & Physique-Chimie",
      institution: "Lycée Jean Rostand",
      location: "Strasbourg, France",
      period: ["04/09/2020", "07/07/2023"],

      points: [
        "Parcours général (cordées de la réussite) avec spécialités Numérique et Sciences Informatiques et Physique-Chimie.",
        "Première approche structurée de la programmation, de l’algorithmique et de la logique informatique.",
        "Grand Oral réalisé autour des réseaux neuronaux et des intelligences artificielles avec une note de 18/20.",
        "Obtention du baccalauréat avec mention Assez Bien et note de 16/20 en NSI à l’épreuve terminale.",
      ],

      tags: ["NSI", "Programmation", "Algorithmique", "Physique-Chimie"],
    },
  ],

  // Experience
  experiences: [
    {
      position:
        "Conception de services numériques, automatisation & architecture applicative",
      company: "Cabinet comptable Doucy Consilium",
      employmentType: "Stage",
      location: "Sélestat, Grand Est, France",
      workMode: "Sur site",
      period: ["09/02/2026", "15/05/2026"],
      points: [
        "Conception et maintenance d’une infrastructure complète d’automatisation métier interconnectée à plusieurs APIs comptables et outils cloud dans un environnement de production réel.",
        "Développement de workflows avancés sous n8n couvrant différents besoins métiers : onboarding client, reporting financier automatisé, synchronisation de données, génération de documents PDF, systèmes de mailing, publication automatisée de contenus, alertes d’échéances et orchestration de processus internes.",
        "Conception de pipelines de traitement de données impliquant plusieurs services et APIs (Pennylane, MyUnisoft, Silae, Microsoft Graph, Airtable, Outlook, WordPress…), avec gestion de la fiabilité, de l’idempotence, des erreurs, des limitations d’API et des exécutions concurrentes.",
        "Mise en place d’une architecture technique orientée maintenabilité et robustesse : découpage en sous-workflows spécialisés, systèmes de routage, webhooks centralisés, validation et normalisation de données, monitoring, gestion des logs et sécurisation des accès.",
        "Administration et optimisation d’un environnement self-hosted sous Docker : déploiement et maintenance de services comme n8n, Gotenberg, sécurisation du VPS, optimisation des ressources serveur et gestion de l’infrastructure applicative.",
        "Développement de solutions assistées par IA : génération automatisée de contenus, workflows d’analyse et automatisation de traitements complexes.",
        "Conception d’une architecture Airtable relationnelle destinée à remplacer des processus internes fragmentés, avec réflexion sur la modélisation des données, les automatisations inter-tables et l’expérience utilisateur des collaborateurs.",
        "Création d’outils internes complémentaires : extensions Chrome, interfaces de supervision, formulaires dynamiques et systèmes de documentation automatisée.",
      ],

      tags: [
        "Automatisation",
        "Architecture applicative",
        "APIs",
        "Docker",
        "IA",
        "Self-hosted",
        "Infrastructure",
        "n8n",
        "Pipelines de données",
        "Airtable",
        "Workflows",
      ],
    },
    {
      position: "Chauffeur-Livreur",
      company: "Amazon Logistics (AGEX)",
      employmentType: "Emploi saisonnier",
      location: "Strasbourg, France",
      workMode: "Sur site",
      period: ["12/07/2025", "20/08/2025"],

      points: [
        "Gestion autonome de tournées de livraison en zones urbaines et périurbaines avec adaptation aux imprévus (adresses, accès, clients absents, anomalies).",
        "Utilisation quotidienne de l’application Amazon Logistics pour la navigation, le suivi des colis, le scan, le reporting et la gestion opérationnelle des livraisons.",
        "Organisation et optimisation des trajets afin de respecter des objectifs de performance et des délais dans un environnement à haute cadence.",
        "Résolution rapide de problèmes terrain et maintien d’une continuité de livraison malgré les contraintes logistiques.",
        "Conduite de véhicules utilitaires et manipulation de colis dans le respect des consignes de sécurité.",
        "Interaction avec les clients lors des remises en main propre et maintien d’une attitude professionnelle en situation opérationnelle.",
      ],

      tags: [
        "Logistique",
        "Livraison",
        "Organisation",
        "Autonomie",
        "Outils numériques",
        "Gestion du stress",
        "Résolution de problèmes",
        "Service client",
        "Optimisation",
        "Transport",
      ],
    },
    {
      position: "Création de contenus visuels & audiovisuels",
      company: "Kartal Propreté",
      employmentType: "Stage",
      location: "Strasbourg, Grand Est, France",
      workMode: "Hybride",
      period: ["07/04/2025", "12/06/2025"],

      points: [
        "Création de supports de communication print et web : affiches, flyers, kakemonos, pictogrammes, formulaires et contenus institutionnels.",
        "Conception de contenus promotionnels autour du lancement d’une prestation de nettoyage par drone.",
        "Production de vidéos promotionnelles, teasers, motion design et montages événementiels sous Premiere Pro et After Effects.",
        "Création et déclinaison d’éléments graphiques dans le respect de la charte visuelle de l’entreprise.",
        "Participation à des démonstrations drone sur le terrain avec captation photo et vidéo.",
        "Réalisation de supports destinés à des partenaires institutionnels et événements publics.",
        "Travail en autonomie avec échanges réguliers, validations progressives et nombreuses itérations de production.",
        "Préparation de contenus destinés aux réseaux sociaux, au site web et à la communication événementielle.",
      ],

      tags: [
        "Communication visuelle",
        "Audiovisuel",
        "Motion design",
        "Montage vidéo",
        "Premiere Pro",
        "After Effects",
        "Photoshop",
        "Illustrator",
        "Canva",
        "Drone",
        "Événementiel",
        "Direction artistique",
      ],
    },
    {
      position: "Freelance & Autodidaxie (Création et Projets)",
      company: "Micro-entreprise",
      employmentType: "Indépendant",
      location: "Strasbourg, France",
      workMode: "À distance",
      period: ["01/01/2019", "31/12/2024"],

      points: [
        "Réalisation de projets personnels et expérimentations autour du développement web, du design et de la création numérique.",
        "Création de contenus visuels, montages vidéo et interfaces web.",
        "Apprentissage autodidacte de technologies et outils numériques à travers la pratique et les projets personnels.",
        "Travail ponctuel sur des demandes de création et supports numériques.",
      ],

      tags: [
        "Autodidacte",
        "Projets personnels",
        "Développement web",
        "Création numérique",
        "Design",
        "Montage vidéo",
      ],
    },
    {
      position: "Immersion en projets informatiques",
      company: "Capgemini",
      employmentType: "Stage d'observation",
      location: "Schiltigheim, France",
      workMode: "Sur site",
      period: ["01/11/2019", "08/11/2019"],

      points: [
        "Découverte du fonctionnement de projets informatiques en entreprise.",
        "Observation du cycle de développement et des méthodes de travail utilisées dans un environnement IT.",
      ],

      tags: ["Observation", "Informatique", "Agile"],
    },
  ],

  // Skills
  skills: [
    {
      category: "Langages",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "PHP",
        "SQL",
        "REST",
        "Python",
        "C#",
        "Kotlin",
      ],
    },
    {
      category: "Frameworks & Bibliothèques",
      items: [
        "Symfony",
        "Laravel",
        "React",
        "Flutter",
        "Firebase",
        "Node.js",
        "Tailwind",
        "Twig",
        "WordPress",
        "Drupal",
        "n8n",
        "WebSocket",
        "LangChain",
      ],
    },
    {
      category: "Bases de données",
      items: [
        "MySQL",
        "Conception relationnelle",
        "ORM",
        "Requêtes SQL",
        "Vector DB",
        "Seeding",
      ],
    },
    {
      category: "DevOps & Automatisation",
      items: [
        "GitLab",
        "GitHub",
        "CI/CD",
        "PhpStorm",
        "VSCode",
        "XAMPP",
        "Plesk",
        "Vite",
        "RAG",
      ],
    },
    {
      category: "UI / UX & Intégration",
      items: [
        "Figma",
        "Responsive",
        "Opquast",
        "Chart.js",
        "Alpine.js",
        "Adobe",
        "Blender",
      ],
    },
    {
      category: "Sécurité & Hébergement",
      items: [
        "OWASP Top 10",
        "XSS",
        "SQLi",
        "CSRF",
        "HTTPS/SSL",
        "Apache",
        "Auth.",
      ],
    },
    {
      category: "Algorithmique",
      items: [
        "Structures de données",
        "Complexité",
        "Optimisation",
        "Automatisation",
      ],
    },
  ],

  // Qualities
  qualities: [
    "Autonomie et apprentissage autodidacte",
    "Esprit d’analyse et réflexion systémique",
    "Curiosité technique et veille continue",
    "Capacité d’adaptation",
    "Rigueur et sens de la maintenabilité",
    "Résolution de problèmes complexes",
    "Créativité et sens du détail",
    "Communication technique et vulgarisation",
  ],

  // Interests
  interests: [
    "Cinéma et narration",
    "Jeux vidéo",
    "Worldbuilding et écriture",
    "Montage vidéo",
    "Technologies et culture numérique",
  ],
};
