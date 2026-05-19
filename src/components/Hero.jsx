import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'

const WORDS = [
  'Full-Stack',
  'Automatisation',
  'Intelligence Artificielle',
  'Mobile',
  'Motion Design',
  'Game Developer',
]

const STATS = [
  { label: 'commits GitHub', value: '800+' },
  { label: 'projets', value: '15+' },
  { label: 'ans d\'expérience', value: '5+' },
]

const PILLS = [
  { label: 'GitHub',   href: 'https://github.com/Noferu',                 icon: '⌥' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nawfel-ida-ali',     icon: '⌥' },
  { label: 'Linktree', href: 'https://linktr.ee/nawfel.idaali',            icon: '⌥' },
  { label: 'Email',    href: 'mailto:nawfel.idaali.pro@gmail.com',         icon: '✉' },
]

export default function Hero() {
  const word    = useTypewriter(WORDS)
  const heroRef = useRef(null)

  // Animation d'entrée : flou qui se retire de gauche à droite
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.filter  = 'blur(12px)'
    el.style.transform = 'translateY(20px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 800ms ease, filter 800ms ease, transform 800ms cubic-bezier(0.16,1,0.3,1)'
      el.style.opacity   = '1'
      el.style.filter    = 'blur(0px)'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  const scrollToProjects = (e) => {
    e.preventDefault()
    document.getElementById('projets')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" style={styles.section}>
      <div className="container" style={styles.inner} ref={heroRef}>

        {/* ── Photo ── */}
        <div style={styles.photoWrapper}>
          <div style={styles.photoRing}>
            <div style={styles.photoCircle}>
              <img src="/assets/img/nawfel.webp" alt="Nawfel Ida-Ali" style={styles.photo} />
            </div>
          </div>
          {/* Halo derrière la photo */}
          <div style={styles.photoHalo} />
        </div>

        {/* ── Texte ── */}
        <div style={styles.content}>

          {/* Titre principal */}
          <h1 style={styles.title}>
            Développeur{' '}
            <span style={styles.accent}>
              {word}
              <span style={styles.cursor}>|</span>
            </span>
          </h1>

          {/* Description avec prénom */}
          <p style={styles.desc}>
            Je suis <strong style={styles.name}>Nawfel Ida-Ali</strong>, étudiant en Master Informatique
            à Strasbourg. Je construis des systèmes complexes, automatise des processus métier
            et crée des expériences numériques qui ont du sens.
          </p>

          {/* CTAs */}
          <div style={styles.ctas}>
            <a href="#projets" onClick={scrollToProjects} className="btn-primary">
              Voir mes projets
            </a>
            <a
              href="https://0xnawfel-rpg.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              ✦ Version créative
            </a>
          </div>

          {/* Pills liens + stats */}
          <div style={styles.pillsRow}>
            {PILLS.map(p => (
              <a key={p.label} href={p.href} target="_blank" rel="noreferrer" className="pill">
                {p.label}
              </a>
            ))}
            <div style={styles.divider} />
            {STATS.map(s => (
              <div key={s.label} style={styles.stat}>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '7rem',
    paddingBottom: '4rem',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '5rem',
  },
  photoWrapper: {
    position: 'relative',
    flexShrink: 0,
  },
  photoRing: {
    width: 220,
    height: 220,
    borderRadius: '50%',
    padding: 3,
    background: 'linear-gradient(135deg, var(--copper), var(--gold-light), var(--red-deep))',
    position: 'relative',
    zIndex: 1,
  },
  photoCircle: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'var(--red-deep)',
  },
  photo: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, var(--red-deep), #2a0100)',
  },
  photoInitials: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    fontWeight: 800,
    color: 'rgba(251,195,115,0.4)',
    letterSpacing: '-0.04em',
  },
  photoHalo: {
    position: 'absolute',
    inset: -30,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(78,2,1,0.5) 0%, transparent 70%)',
    zIndex: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: 800,
    color: 'var(--text)',
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
  },
  accent: {
    color: 'var(--gold-light)',
    display: 'inline-block',
    minWidth: '3ch',
  },
  cursor: {
    animation: 'softPulse 1s step-end infinite',
    color: 'var(--amber)',
    marginLeft: 2,
  },
  desc: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.8,
    maxWidth: 520,
    fontWeight: 300,
  },
  name: {
    color: 'var(--text)',
    fontWeight: 500,
  },
  ctas: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  pillsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  divider: {
    width: 1,
    height: 20,
    background: 'rgba(251,195,115,0.15)',
    margin: '0 0.25rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 0.5rem',
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--gold-light)',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    color: 'var(--text-dim)',
    whiteSpace: 'nowrap',
    marginTop: 2,
  },
}
