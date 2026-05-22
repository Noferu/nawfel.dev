<div align="center">

![Portfolio Preview](public/assets/img/homepage.webp)

# nawfel-dev — Portfolio

**Portfolio personnel de Nawfel Ida-Ali**  
Développeur Full-Stack · Strasbourg, France

[![Live](https://img.shields.io/badge/🌐_Live-nawfel--dev.vercel.app-orange?style=flat-square)](https://nawfel-dev.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-Animation-88CE02?style=flat-square&logo=greensock&logoColor=black)](https://gsap.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## ✦ Aperçu

Portfolio développé entièrement from scratch, sans template, sans UI library, avec une attention particulière portée à l'animation, à la performance et à l'expérience utilisateur. L'objectif : que le site soit lui-même un projet à part entière.

**→ [nawfel-dev.vercel.app](https://nawfel-dev.vercel.app/)**

---

## ⚙️ Stack technique

| Couche | Technologie |
|---|---|
| Framework | React 18 + React Router v6 |
| Build | Vite |
| Animation | GSAP (ScrollTrigger, ticker, timeline) |
| Canvas | API Canvas 2D native |
| Routing | React Router DOM |
| Déploiement | Vercel |

Aucune dépendance CSS externe. Tout le style est écrit en CSS vanilla modulaire.

---

## 🗂️ Structure du projet

```
src/
├── components/
│   ├── Background.jsx      # Canvas animé (grille custom inclinée + soft lights)
│   ├── CommandK.jsx        # Palette de commandes (Ctrl+K)
│   ├── Contact.jsx         # Section contact avec orb cursor
│   ├── CVSnippet.jsx       # Aperçu CV sur la homepage
│   ├── Header.jsx          # Header Dynamic Island avec nav adaptative
│   ├── Hero.jsx            # Section hero avec typewriter & stats GitHub live
│   ├── PillButton.jsx      # Bouton pill réutilisable
│   ├── ProjectCard.jsx     # Carte projet avec glow orb + étoile GSAP
│   └── Projects.jsx        # Sliders infinis draggables (2 lignes)
│
├── pages/
│   ├── Home.jsx            # Page d'accueil orchestrant les composants ci-dessus
│   ├── CV.jsx              # Page CV avec sidebar sticky & collapse
│   └── Project.jsx         # Page projet individuelle
│
├── data/
│   ├── projects.js         # Données de tous les projets
│   ├── resume.js           # Données du CV (expériences, formations, compétences)
│   └── deviconMap.js       # Mapping techno → icône Devicon
│
├── hooks/
│   ├── usePageIntro.js     # Orchestration animation d'entrée cinématographique
│   ├── useTypewriter.js    # Effet machine à écrire avec suppression
│   └── useCursorGlow.js    # Hook orb cursor générique
│
└── styles/
    ├── components.css      # Éléments de style des composants
    ├── cv.css              # Design de la page du Curriculum Vitae
    ├── global.css          # Éléments de style partagés par toutes les pages
    ├── home.css            # Design de la page d'accueil
    ├── project-page.css    # Design de la page projet
    ├── responsive.css      # Feuille de style importée par `global.css` contenant le design responsive
    ├── tokens.css          # Définition des variables liées à la direction artistique
```

---

## ✨ Fonctionnalités notables

### Background canvas
Grille inclinée à 10° avec défilement horizontal infini piloté par `gsap.ticker`, masques circulaires aux intersections via `destination-out`, et 5 soft lights animées avec parallaxe au scroll via `ScrollTrigger`.

### Animation d'entrée cinématographique
`usePageIntro` orchestre une timeline GSAP en 8 actes (background CRT → header → photo → H1 mot par mot → description → CTAs → pills → sections). Ne joue l'animation complète qu'à la première visite de session ; version abrégée au retour.

### Palette de commandes (⌘K)
Accessible via `Ctrl+K` ou le bouton header, la palette permet de naviguer vers toutes les sections, tous les projets et tous les liens externes. Navigation clavier complète (↑↓, Entrée, Échap) avec recherche filtrée en temps réel.

### Sliders infinis
Deux rangées de `ProjectCard` en défilement continu infini (une vers la gauche, une vers la droite), draggables à la souris et au touch, avec reprise automatique 5s après le relâchement. Les contenus sont triplés pour garantir l'absence de bord visible.

### Header Dynamic Island
Pill adaptative qui affiche le nom du projet courant lorsqu'on navigue sur une page `/project/:slug`. Se contracte au scroll avec transition blur → net.

### Stats GitHub live
Le hook `useStats` dans `Hero.jsx` interroge l'API GitHub Search Commits pour afficher le nombre de commits réels au chargement.

### Footer interactif
SVG outline `NAWFEL IDA-ALI` avec spotlight radial qui suit le curseur, rendu via masque SVG et gradient radial.

---

## 🚀 Lancer le projet en local

```bash
# Cloner le repo
git clone https://github.com/Noferu/nawfel-dev.git
cd nawfel-dev

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173)

```bash
# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🗃️ Projets référencés

Le portfolio présente actuellement **14 projets** couvrant plusieurs domaines de l'informatique :

| Projet | Année | Stack principale |
|---|---|---|
| Pipeline Synthèse Comptable | 2026 | n8n, APIs comptables, Gemini |
| Plateforme Onboarding Client | 2026 | n8n, Airtable, Gotenberg, MJML |
| Usine Chocolat | 2026 | Laravel, React, WebSocket, CI/CD |
| DI5 Festival | 2026 | Flutter, Firebase, Mapbox |
| Discord Riot Bot | 2026 | Python, Riot API, Gemini |
| Yasuragi | 2025 | Laravel, Drag & Drop HTML5 |
| Blind Test Multijoueur | 2025 | Node.js, Socket.IO, PHP |
| Mastermind Flutter | 2025 | Flutter, Dart |
| LUMA | 2025 | JavaScript, Chart.js |
| MutualMap | 2025 | Python, PyVis, Discord API |
| Generosus | 2025 | JavaScript vanilla, Canvas API |
| SAE401 — Symfony | 2025 | Symfony, Doctrine, Twig |
| Era Explorer | 2024 | PHP, MySQL, AJAX, MVC |

---

## 📄 Licence

Code source disponible à titre de référence. Contenu (textes, visuels, design) — tous droits réservés © 2026 Nawfel Ida-Ali.

---

<div align="center">
  <sub>Conçu et développé par <strong>Nawfel Ida-Ali</strong> · Strasbourg, France</sub><br/>
  <sub>
    <a href="https://nawfel-dev.vercel.app/">Site</a> ·
    <a href="https://github.com/Noferu">GitHub</a> ·
    <a href="https://linkedin.com/in/nawfel-ida-ali">LinkedIn</a> ·
    <a href="https://linktr.ee/nawfel.idaali">Linktree</a>
  </sub>
</div>