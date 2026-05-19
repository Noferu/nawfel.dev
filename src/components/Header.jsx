import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

const NAV = [
  { label: 'Home',     to: '/',    anchor: null      },
  { label: 'À propos', to: '/cv',  anchor: null      },
  { label: 'Projets',  to: '/',    anchor: 'projets' },
]

// Projet le plus récent (par year, puis premier dans le tableau)
const lastProject = [...projects].sort((a, b) => b.year - a.year)[0]

export default function Header({ onOpenCmd }) {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  // Détection page projet courante
  const projectMatch  = pathname.match(/^\/project\/(.+)$/)
  const projectSlug   = projectMatch ? projectMatch[1] : null
  const currentProject = projectSlug ? projects.find(p => p.slug === projectSlug) : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (item, e) => {
    if (item.anchor) {
      e.preventDefault()
      if (pathname === '/') {
        document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById(item.anchor)?.scrollIntoView({ behavior: 'smooth' })
        }, 150)
      }
    }
  }

  const isActive = (item) => {
    if (currentProject) return false   // page projet : aucun item nav actif
    if (item.anchor)    return false   // Projets jamais actif (ancre, pas une page)
    return pathname === item.to
  }

  return (
    <header className="header-wrapper">

      {/* ── Gauche : pill Last Project ── */}
      <div className="header-left">
        <Link to={`/project/${lastProject.slug}`} className="header-last-proj">
          <span className="header-last-proj-label">Dernier</span>
          <span className="header-last-proj-sep" />
          <span className="header-last-proj-title">{lastProject.title}</span>
        </Link>
      </div>

      {/* ── Centre : Dynamic Island ── */}
      <div className="header-center">
        <nav className={`header-island ${scrolled ? 'header-island--scrolled' : ''}`}>
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNav(item, e)}
              className={`header-nav-link ${isActive(item) ? 'header-nav-link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}

          {/* Sur page projet : nom du projet mis en avant */}
          {currentProject && (
            <span className="header-nav-project" title={currentProject.title}>
              {currentProject.title}
            </span>
          )}

          {/* Bouton Ctrl+K */}
          <button
            onClick={onOpenCmd}
            className="header-cmd-btn"
            title="Ouvrir la palette (Ctrl+K)"
          >
            <span className="header-cmd-icon">⌘</span>
            <span className="header-cmd-k">K</span>
          </button>
        </nav>
      </div>

      {/* ── Droite : pill Open To Work ── */}
      <div className="header-right">
        <div className="header-otw-wrapper">
          <div className="header-otw">
            <span className="header-otw-dot" />
            <span className="header-otw-text">Open To Work</span>
            <span className="header-otw-date">· Sep 2026</span>
          </div>
        </div>
      </div>

    </header>
  )
}