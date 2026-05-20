import { useRef, useEffect } from 'react'

export default function Contact() {
  const cardRef = useRef(null)
  const orbRef  = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const orb  = orbRef.current
    if (!card || !orb) return
    const onMove  = (e) => {
      const rect = card.getBoundingClientRect()
      orb.style.left    = `${e.clientX - rect.left}px`
      orb.style.top     = `${e.clientY - rect.top}px`
      orb.style.opacity = '1'
    }
    const onLeave = () => { orb.style.opacity = '0' }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div ref={cardRef} className="contact-card">
          <div ref={orbRef} className="contact-orb" />
          <div className="contact-inner">
            <p className="section-label">Contact</p>
            <h2 className="contact-title">Travaillons ensemble.</h2>
            <p className="contact-sub">
              Disponible pour des stages, alternances ou collaborations à partir de septembre 2026.
            </p>
            <div className="contact-links">
              <a href="mailto:nawfel.idaali.pro@gmail.com" className="contact-mail">
                nawfel.idaali.pro@gmail.com
                <span className="contact-arrow">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Flèche scroll-to-top — sous la card, séparée visuellement */}
        <div className="contact-scroll-top">
          <button
            className="scroll-top-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut de la page"
          >
            ↑
          </button>
        </div>
      </div>
    </section>
  )
}
