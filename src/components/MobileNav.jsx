import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * MobileNav.jsx
 *
 * Navigation mobile autonome (≤640px). Le header desktop reste masqué via CSS
 * (`header { display: none }`) ; ce composant prend le relais sur petit écran.
 * - Masqué en desktop par `.mobile-nav { display: none }` (cf. components.css).
 * - Cibles identiques à la palette ⌘K : scroll vers les sections de la home,
 *   route vers /cv, liens externes.
 * - Si on n'est pas sur la home, un scroll route d'abord vers "/" puis défile.
 * - Verrou du scroll body à l'ouverture, fermeture via X / backdrop / Échap.
 *
 * À monter une seule fois, au même endroit que <Header /> (App / layout).
 */

const SECTIONS = [
  { label: 'Accueil', action: 'scroll', target: 'hero' },
  { label: 'Projets', action: 'scroll', target: 'projets' },
  { label: 'Contact', action: 'scroll', target: 'contact' },
  { label: 'CV',      action: 'route',  target: '/cv' },
]

const LINKS = [
  { label: 'GitHub',   url: 'https://github.com/Noferu' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nawfel-ida-ali' },
  { label: 'Linktree', url: 'https://linktr.ee/nawfel.idaali' },
  { label: 'Email',    url: 'mailto:nawfel.idaali.pro@gmail.com' },
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  /* Verrouille le scroll du body quand le menu est ouvert */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Échap pour fermer */
  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = useCallback((item) => {
    setOpen(false)
    if (item.action === 'route') {
      navigate(item.target)
      return
    }
    if (item.action === 'scroll') {
      const scroll = () =>
        document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(scroll, 120) // laisse la home se monter avant de défiler
      } else {
        scroll()
      }
    }
  }, [navigate, location.pathname])

  return (
    <div className="mobile-nav">
      <button
        className={`mobile-nav-toggle ${open ? 'is-open' : ''}`}
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      {open && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          onClick={() => setOpen(false)}
        >
          <nav className="mobile-nav-panel" onClick={(e) => e.stopPropagation()}>
            <ul className="mobile-nav-list">
              {SECTIONS.map((s) => (
                <li key={s.label}>
                  <button className="mobile-nav-link" onClick={() => go(s)}>
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-links">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-nav-social"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
