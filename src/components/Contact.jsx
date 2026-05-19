import { useRef, useEffect } from 'react'

export default function Contact() {
  const cardRef = useRef(null)
  const orbRef  = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const orb  = orbRef.current
    if (!card || !orb) return

    const onMove  = (e) => {
      const rect      = card.getBoundingClientRect()
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
              Disponible pour une alternance à partir de septembre 2026 à Strasbourg ou Lille.
            </p>

            <div className="contact-links">
              <a href="mailto:nawfel.idaali.pro@gmail.com" className="contact-mail">
                nawfel.idaali.pro@gmail.com
                <span className="contact-arrow">↗</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}