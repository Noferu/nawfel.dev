import { useRef, useEffect } from 'react'
import Hero      from '../components/Hero'
import Projects  from '../components/Projects'
import CVSnippet from '../components/CVSnippet'
import Contact   from '../components/Contact'
import '../styles/home.css'

export default function Home() {
  const nameRef = useRef(null)
  const orbRef  = useRef(null)

  // Orb sur le nom footer
  useEffect(() => {
    const el  = nameRef.current
    const orb = orbRef.current
    if (!el || !orb) return

    const onMove  = (e) => {
      const rect    = el.getBoundingClientRect()
      orb.style.left = `${e.clientX - rect.left}px`
      orb.style.top  = `${e.clientY - rect.top}px`
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <main className="home-main">
      <Hero />

      <div className="home-divider" />
      <Projects />

      <div className="home-divider" />
      <CVSnippet />

      <div className="home-divider" />
      <Contact />

      {/* Footer */}
      <footer className="home-footer">
        <div className="container home-footer-inner">
          <div className="home-footer-top">
            <span className="home-footer-copy">© 2026 Nawfel Ida-Ali</span>
            <div className="home-footer-links">
              {[
                { label: 'GitHub',   href: 'https://github.com/Noferu' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/nawfel-ida-ali' },
                { label: 'Linktree', href: 'https://linktr.ee/nawfel.idaali' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="home-footer-link">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nom en grand avec orb hover */}
          <div ref={nameRef} className="home-footer-name">
            <div ref={orbRef} className="home-footer-name-orb" />
            <span className="home-footer-name-text">NAWFEL IDA-ALI</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
