import { useEffect, useState } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { projects } from "../data/projects";
import { resume } from "../data/resume";

/** Displays a construction warning icon. */
const IconConstruction = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M7.999 1.5 1.5 14h13L7.999 1.5zm0 2.25L12.1 12H3.898l4.1-8.25z" />
    <path d="M7.5 6h1v3.5h-1V6zm0 5h1v1h-1v-1z" />
  </svg>
);

/**
 * Words displayed by the typewriter animation.
 */
const WORDS = [
  "Full-Stack",
  "en IA & Data",
  "d'APIs & Intégrations",
  "en Architecture Logicielle",
  "d'Applications Temps Réel",
  "Cloud & DevOps",
  "en Cybersécurité",
  "en Automatisation",
  "d'Applications Mobiles",
  "d'Expériences Interactives",
  "d'Outils Métier",
  "de Jeux Vidéo",
];

/** Displays a GitHub icon. */
const IconGitHub = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

/** Displays a LinkedIn icon. */
const IconLinkedIn = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/** Displays a Linktree-style icon. */
const IconTree = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm.75 4.5l2.12 2.12a1.06 1.06 0 01-1.5 1.5L12 8.81l-1.37 1.31a1.06 1.06 0 01-1.5-1.5L11.25 6.5a1.06 1.06 0 011.5 0zM16.5 16.5h-3V12a1 1 0 00-2 0v4.5H7.5a1.5 1.5 0 010-3H11V12a1 1 0 012 0v1.5h3.5a1.5 1.5 0 010 3z" />
  </svg>
);

/** Displays an email icon. */
const IconMail = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

/** Displays a small pixel-style star icon. */
const PixelStar = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 15 15"
    fill="currentColor"
    aria-hidden="true"
    style={{ imageRendering: "pixelated" }}
  >
    <rect x="5" y="0" width="5" height="5" />
    <rect x="0" y="5" width="5" height="5" />
    <rect x="5" y="5" width="5" height="5" />
    <rect x="10" y="5" width="5" height="5" />
    <rect x="5" y="10" width="5" height="5" />
  </svg>
);

/**
 * Social links displayed under the hero call-to-action buttons.
 */
const PILLS = [
  { label: "GitHub", href: "https://github.com/Noferu", Icon: IconGitHub },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/nawfel-ida-ali",
    Icon: IconLinkedIn,
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/nawfel.idaali",
    Icon: IconTree,
  },
  {
    label: "Email",
    href: "mailto:nawfel.idaali.pro@gmail.com",
    Icon: IconMail,
  },
];

/**
 * Extracts a year from a date string.
 *
 * @param {string} str - Date string to parse.
 * @returns {number} Parsed year or 9999 when no year is found.
 */
function yearFromDateStr(str) {
  if (!str) return 9999;

  const parts = str.split("/");

  if (parts.length === 3) return parseInt(parts[2], 10);

  const match = str.match(/\d{4}/);

  return match ? parseInt(match[0], 10) : 9999;
}

/**
 * Builds the hero statistics.
 *
 * The hook counts projects locally, estimates experience years from resume
 * data, and fetches the GitHub commit count when the browser is idle.
 *
 * @returns {{ label: string, value: string|number }[]} Hero statistics.
 */
function useStats() {
  const projectsCount = projects.length;

  const firstYear = resume.experiences.reduce((min, exp) => {
    const y = yearFromDateStr(exp.period?.[0]);

    return y < min ? y : min;
  }, 9999);

  const expYears =
    firstYear < 9999 ? `${new Date().getFullYear() - firstYear}+` : "N/A";

  const [commits, setCommits] = useState("500+");

  useEffect(() => {
    const run = () => {
      fetch("https://api.github.com/search/commits?q=author:Noferu", {
        headers: { Accept: "application/vnd.github.cloak-preview+json" },
        priority: "low",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.total_count) setCommits(`${data.total_count}+`);
        })
        .catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(run, { timeout: 3000 });

      return () => cancelIdleCallback(id);
    }

    const id = setTimeout(run, 1500);

    return () => clearTimeout(id);
  }, []);

  return [
    { label: "commits GitHub", value: commits },
    { label: "projets", value: projectsCount },
    { label: "ans d'exp.", value: expYears },
  ];
}

/**
 * Displays the hero section of the portfolio home page.
 *
 * The component shows the profile photo, availability badge, animated job
 * title, introduction text, main actions, social links, and key statistics.
 *
 * @returns {JSX.Element} Rendered hero section.
 */
export default function Hero() {
  const word = useTypewriter(WORDS);
  const stats = useStats();

  /**
   * Smoothly scrolls to the projects section.
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Link click event.
   */
  const scrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * Smoothly scrolls to the contact section.
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Link click event.
   */
  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-inner">
        <div className="hero-photo-wrapper" data-intro="photo">
          <div className="hero-photo-ring">
            <div className="hero-photo-circle">
              <img
                src="/assets/site/nawfel.webp"
                alt="Nawfel Ida-Ali"
                className="hero-photo"
                width="235"
                height="235"
                fetchpriority="high"
              />
            </div>
          </div>

          <div className="hero-photo-halo" data-intro="halo" />
        </div>

        <div className="hero-content">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="hero-status"
            data-intro="badge"
          >
            <span className="hero-status-dot" aria-hidden="true" />
            Disponible pour une alternance - Septembre 2026
          </a>

          <h1 className="hero-h1">
            <span data-intro="h1-word">Développeur</span>{" "}
            <span className="hero-accent" data-intro="h1-word">
              <span className="hero-typewriter">{word || "\u00A0"}</span>
              <span className="hero-cursor">|</span>
            </span>
          </h1>

          <p className="hero-desc" data-intro="desc">
            Je suis <strong className="hero-name">Nawfel Ida-Ali</strong>, en
            troisième année de BUT MMI. Je cherche une alternance pour
            poursuivre en master informatique. Je construis des systèmes
            complexes, automatise des processus métier et crée des expériences
            numériques qui ont du sens, comme d'autres peignent des tableaux.
          </p>

          <div className="hero-ctas" data-intro="ctas">
            <a
              href="#projets"
              onClick={scrollToProjects}
              className="btn-primary"
            >
              Voir mes projets
            </a>

            <span
              className="btn-creative btn-creative--disabled"
              aria-disabled="true"
            >
              <span className="btn-creative__default">
                <PixelStar /> Version créative
              </span>
              <span className="btn-creative__construction">
                <IconConstruction className="btn-creative__icon" /> En
                construction
              </span>
            </span>
          </div>

          <div className="hero-pills-row" data-intro="pills">
            {PILLS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="pill-social"
              >
                <span className="pill-social-icon">
                  <Icon />
                </span>
                <span className="pill-social-sep" aria-hidden="true" />
                <span className="pill-social-label">{label}</span>
              </a>
            ))}

            <div className="hero-pills-divider" aria-hidden="true" />

            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
