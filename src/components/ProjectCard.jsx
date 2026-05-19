import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProjectCard({ project, compact = false }) {
  const cardRef  = useRef(null)
  const orbRef   = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const card = cardRef.current
    const orb  = orbRef.current
    if (!card || !orb) return

    const onMove = (e) => {
      const rect = card.getBoundingClientRect()
      orb.style.left = `${e.clientX - rect.left}px`
      orb.style.top  = `${e.clientY - rect.top}px`
    }
    card.addEventListener('mousemove', onMove)
    return () => card.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={cardRef}
      style={{ ...styles.card, ...(compact ? styles.cardCompact : {}) }}
      onClick={() => navigate(`/project/${project.slug}`)}
      className="glow-card"
    >
      {/* Glow orb */}
      <div ref={orbRef} className="glow-orb" />

      {/* Thumbnail */}
      <div style={styles.thumb}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} style={styles.thumbImg} />
        ) : (
          <div style={styles.thumbPlaceholder}>
            <span style={styles.thumbLabel}>{project.tags[0]}</span>
          </div>
        )}
        {project.featured && <span style={styles.featuredBadge}>★</span>}
      </div>

      {/* Contenu */}
      <div style={styles.body}>
        <div style={styles.meta}>
          <span style={styles.year}>{project.year}</span>
          <div style={styles.tags}>
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        </div>
        <h3 style={styles.title}>{project.title}</h3>
        {!compact && <p style={styles.desc}>{project.shortDesc}</p>}
        <div style={styles.footer}>
          <span style={styles.cta}>Voir le projet →</span>
          {project.links?.[0] && (
            <a
              href={project.links[0].url}
              target="_blank"
              rel="noreferrer"
              style={styles.ghLink}
              onClick={e => e.stopPropagation()}
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    position: 'relative',
    overflow: 'hidden',
    background: 'rgba(20,6,4,0.6)',
    border: '1px solid rgba(251,195,115,0.1)',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'border-color var(--t-base), transform var(--t-base)',
    width: 320,
    flexShrink: 0,
  },
  cardCompact: {
    width: '100%',
  },
  thumb: {
    position: 'relative',
    height: 180,
    overflow: 'hidden',
    background: 'rgba(78,2,1,0.15)',
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 400ms ease',
  },
  thumbPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, rgba(78,2,1,0.3), rgba(161,92,33,0.1))',
  },
  thumbLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--text-dim)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  featuredBadge: {
    position: 'absolute',
    top: '0.75rem',
    right: '0.75rem',
    background: 'rgba(251,195,115,0.15)',
    border: '1px solid rgba(251,195,115,0.3)',
    color: 'var(--gold-light)',
    fontSize: '0.65rem',
    padding: '0.2rem 0.5rem',
    borderRadius: '999px',
    fontFamily: 'var(--font-display)',
  },
  body: {
    padding: '1rem 1.25rem 1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    position: 'relative',
    zIndex: 1,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
  },
  year: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    color: 'var(--text-dim)',
    letterSpacing: '0.08em',
  },
  tags: {
    display: 'flex',
    gap: '0.3rem',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  tag: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.58rem',
    fontWeight: 500,
    color: 'var(--amber)',
    background: 'rgba(212,138,57,0.1)',
    border: '1px solid rgba(212,138,57,0.2)',
    padding: '0.15rem 0.45rem',
    borderRadius: '4px',
    letterSpacing: '0.04em',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text)',
    lineHeight: 1.3,
  },
  desc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    fontWeight: 300,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.25rem',
  },
  cta: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.72rem',
    fontWeight: 600,
    color: 'var(--gold-light)',
    letterSpacing: '0.02em',
  },
  ghLink: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    color: 'var(--text-dim)',
    transition: 'color var(--t-fast)',
  },
}
