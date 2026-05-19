import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Home',     to: '/',         anchor: null        },
  { label: 'À propos', to: '/cv',       anchor: null        },
  { label: 'Projets',  to: '/#projets', anchor: 'projets'   },
]

export default function Header({ onOpenCmd }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled]   = useState(false)
  const [expanded, setExpanded]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (item, e) => {
    if (item.anchor && pathname === '/') {
      e.preventDefault()
      document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header style={styles.wrapper}>
      <div style={styles.inner}>

        {/* ── Dynamic Island ── */}
        <nav
          style={{
            ...styles.island,
            ...(scrolled ? styles.islandScrolled : {}),
            ...(expanded ? styles.islandExpanded : {}),
          }}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          {NAV.map((item) => {
            const active = pathname === item.to || (item.anchor && pathname === '/')
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={(e) => handleNav(item, e)}
                style={{
                  ...styles.navLink,
                  ...(active ? styles.navLinkActive : {}),
                }}
              >
                {item.label}
              </Link>
            )
          })}

          {/* CTRL+K */}
          <button
            onClick={onOpenCmd}
            style={styles.cmdBtn}
            title="Ouvrir la palette (Ctrl+K)"
          >
            <span style={styles.cmdIcon}>⌘</span>
            <span style={styles.cmdK}>K</span>
          </button>
        </nav>

        {/* ── Open To Work pill ── */}
        <div style={styles.otwWrapper}>
          <div style={styles.otw}>
            <span style={styles.otwDot} />
            <span style={styles.otwText}>Open To Work</span>
            <span style={styles.otwDate}>· Sep 2026</span>
          </div>
        </div>

      </div>
    </header>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 'var(--z-header)',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    pointerEvents: 'none',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    pointerEvents: 'auto',
  },
  island: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.4rem 0.6rem',
    borderRadius: '999px',
    background: 'rgba(14,3,1,0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(251,195,115,0.12)',
    transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  islandScrolled: {
    background: 'rgba(14,3,1,0.9)',
    border: '1px solid rgba(251,195,115,0.18)',
  },
  islandExpanded: {
    gap: '0.4rem',
    padding: '0.5rem 0.85rem',
  },
  navLink: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'rgba(245,236,215,0.55)',
    padding: '0.3rem 0.65rem',
    borderRadius: '999px',
    transition: 'all var(--t-fast)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
  },
  navLinkActive: {
    color: 'var(--gold-light)',
    background: 'rgba(251,195,115,0.08)',
  },
  cmdBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.15rem',
    padding: '0.3rem 0.55rem',
    borderRadius: '6px',
    background: 'rgba(251,195,115,0.06)',
    border: '1px solid rgba(251,195,115,0.12)',
    color: 'var(--text-muted)',
    marginLeft: '0.25rem',
    transition: 'all var(--t-fast)',
  },
  cmdIcon: {
    fontSize: '0.7rem',
    lineHeight: 1,
  },
  cmdK: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  otwWrapper: {
    animation: 'fadeIn 600ms ease 400ms both',
  },
  otw: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.9rem',
    borderRadius: '999px',
    background: 'rgba(14,3,1,0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(251,195,115,0.12)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
  },
  otwDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#4ade80',
    boxShadow: '0 0 6px #4ade80',
    animation: 'softPulse 2s ease-in-out infinite',
    flexShrink: 0,
  },
  otwText: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    fontWeight: 500,
    color: 'rgba(245,236,215,0.7)',
    whiteSpace: 'nowrap',
  },
  otwDate: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    color: 'rgba(245,236,215,0.35)',
    whiteSpace: 'nowrap',
  },
}
