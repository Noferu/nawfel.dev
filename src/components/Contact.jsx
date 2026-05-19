import { useRef, useEffect } from 'react'

export default function Contact() {
  const cardRef = useRef(null)
  const orbRef  = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const orb  = orbRef.current
    if (!card || !orb) return

    const onMove = (e) => {
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
    <section id="contact" style={styles.section}>
      <div className="container">
        <div ref={cardRef} style={styles.card}>

          {/* Orb reflet */}
          <div
            ref={orbRef}
            style={styles.orb}
          />

          {/* Contenu */}
          <div style={styles.inner}>
            <p className="section-label">Contact</p>
            <h2 style={styles.title}>Travaillons ensemble.</h2>
            <p style={styles.sub}>
              Disponible pour des stages, alternances ou collaborations à partir de septembre 2026.
            </p>

            <div style={styles.links}>
              <a href="mailto:nawfel.idaali.pro@gmail.com" style={styles.mailLink}>
                nawfel.idaali.pro@gmail.com
                <span style={styles.arrow}>↗</span>
              </a>

              <div style={styles.socials}>
                {[
                  { label: 'GitHub',   href: 'https://github.com/Noferu' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/nawfel-ida-ali' },
                  { label: 'Linktree', href: 'https://linktr.ee/nawfel.idaali' },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pill"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: 'var(--sp-2xl) 0 var(--sp-xl)',
  },
  card: {
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(20,6,4,0.5)',
    border: '1px solid rgba(251,195,115,0.12)',
    borderRadius: '20px',
    padding: '4rem',
    cursor: 'default',
  },
  orb: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(251,195,115,0.12) 0%, transparent 65%)',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 200ms ease',
    zIndex: 0,
  },
  inner: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    color: 'var(--text)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  sub: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--text-muted)',
    fontWeight: 300,
    maxWidth: 480,
    lineHeight: 1.7,
  },
  links: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginTop: '0.5rem',
  },
  mailLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
    fontWeight: 600,
    color: 'var(--gold-light)',
    transition: 'color var(--t-fast)',
    width: 'fit-content',
  },
  arrow: {
    fontSize: '1rem',
    opacity: 0.6,
  },
  socials: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
}
