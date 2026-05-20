import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useTypewriter } from '../hooks/useTypewriter'
import { projects } from '../data/projects'
import { resume } from '../data/resume'

const WORDS = [
  'Full-Stack',
  'en IA & Data',
  'd’APIs & Intégrations',
  'en Architecture Logicielle',
  'd’Applications Temps Réel',
  'Cloud & DevOps',
  'en Cybersécurité',
  'en Automatisation',
  'd’Applications Mobiles',
  'd’Expériences Interactives',
  'd’Outils Métier',
  'de Jeux Vidéo',
]

/* ── Icônes sociales SVG inline ── */
const IconGitHub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const IconLinkedIn = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const IconTree = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm.75 4.5l2.12 2.12a1.06 1.06 0 01-1.5 1.5L12 8.81l-1.37 1.31a1.06 1.06 0 01-1.5-1.5L11.25 6.5a1.06 1.06 0 011.5 0zM16.5 16.5h-3V12a1 1 0 00-2 0v4.5H7.5a1.5 1.5 0 010-3H11V12a1 1 0 012 0v1.5h3.5a1.5 1.5 0 010 3z"/>
  </svg>
)
const IconMail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

/* Étoile pixel art (5 carrés en croix) pour le CTA pixel */
const PixelStar = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true" style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="0" width="5" height="5"/>
    <rect x="0" y="5" width="5" height="5"/>
    <rect x="5" y="5" width="5" height="5"/>
    <rect x="10" y="5" width="5" height="5"/>
    <rect x="5" y="10" width="5" height="5"/>
  </svg>
)

const PILLS = [
  { label: 'GitHub',   href: 'https://github.com/Noferu',             Icon: IconGitHub   },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nawfel-ida-ali', Icon: IconLinkedIn },
  { label: 'Linktree', href: 'https://linktr.ee/nawfel.idaali',        Icon: IconTree     },
  { label: 'Email',    href: 'mailto:nawfel.idaali.pro@gmail.com',     Icon: IconMail     },
]

/* ── Stats dynamiques ── */
function useStats() {
  // Projets : depuis projects.js
  const projectsCount = projects.length

  // Années d'expérience : depuis resume.js (première entrée la plus ancienne)
  const firstYear = resume.experiences.reduce((min, exp) => {
    const y = parseInt(exp.periode?.match(/\d{4}/)?.[0] ?? '9999')
    return y < min ? y : min
  }, 9999)
  const expYears = `${new Date().getFullYear() - firstYear}+`

  // Commits GitHub (API publique Search Commits)
  const [commits, setCommits] = useState('800+')
  useEffect(() => {
    fetch('https://api.github.com/search/commits?q=author:Noferu', {
      headers: { Accept: 'application/vnd.github.cloak-preview+json' },
    })
      .then(r => r.json())
      .then(d => { if (d.total_count) setCommits(`${d.total_count}+`) })
      .catch(() => {})
  }, [])

  return [
    { label: 'commits GitHub', value: commits },
    { label: 'projets',        value: projectsCount },
    { label: "ans d'exp.",     value: expYears },
  ]
}

export default function Hero() {
  const word    = useTypewriter(WORDS)
  const heroRef = useRef(null)
  const stats   = useStats()

  /* ── Entrée GSAP (même transition que les autres pages) ── */
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    gsap.fromTo(el,
      { opacity: 0, filter: 'blur(12px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)',  y: 0, duration: 0.9, ease: 'power2.out', clearProps: 'filter' }
    )
  }, [])

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      <div className="container hero-inner" ref={heroRef}>

        {/* ── Photo (anneau gradient, pas de flip hover) ── */}
        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring">
            <div className="hero-photo-circle">
              <img src="/assets/img/nawfel.webp" alt="Nawfel Ida-Ali" className="hero-photo" />
            </div>
          </div>
          <div className="hero-photo-halo" />
        </div>

        {/* ── Contenu ── */}
        <div className="hero-content">

          {/* Titre sur une seule ligne, no-wrap */}
          <h1 className="hero-h1">
            Développeur{' '}
            <span className="hero-accent">
              <span className="hero-typewriter">{word || '\u00A0'}</span>
              <span className="hero-cursor">|</span>
            </span>
          </h1>

          <p className="hero-desc">
            Je suis <strong className="hero-name">Nawfel Ida-Ali</strong>, en troisième année d'un BUT. Je construis des systèmes complexes, automatise des processus métier et crée des expériences numériques qui ont du sens, comme d'autres peignent des tableaux.
          </p>

          {/* CTAs */}
          <div className="hero-ctas">
            <a href="#projets" onClick={scrollToProjects} className="btn-primary">
              Voir mes projets
            </a>

            {/* ── CTA créatif : masque-reveal pixel art ── */}
            <a
              href="https://0xnawfel-rpg.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-creative"
            >
              {/* Couche par défaut */}
              <span className="btn-creative__default">✦ Version créative</span>

              {/* Couche pixel — révélée par le shine-masque */}
              <span className="btn-creative__pixel">
                <PixelStar />
                <span>Mode pixel</span>
              </span>

              {/* Shine qui sert de masque de révélation */}
              <span className="btn-creative__shine" aria-hidden="true" />
            </a>
          </div>

          {/* Pills sociales + stats */}
          <div className="hero-pills-row">
            {PILLS.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="pill-social">
                <span className="pill-social-icon"><Icon /></span>
                <span className="pill-social-sep" aria-hidden="true" />
                <span className="pill-social-label">{label}</span>
              </a>
            ))}
            <div className="hero-pills-divider" aria-hidden="true" />
            {stats.map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
