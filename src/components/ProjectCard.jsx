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
      const rect    = card.getBoundingClientRect()
      orb.style.left = `${e.clientX - rect.left}px`
      orb.style.top  = `${e.clientY - rect.top}px`
    }
    card.addEventListener('mousemove', onMove)
    return () => card.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`proj-card glow-card ${compact ? 'proj-card--compact' : ''}`}
      onClick={() => navigate(`/project/${project.slug}`)}
    >
      <div ref={orbRef} className="glow-orb" />

      {/* Thumbnail */}
      <div className="proj-card-thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="proj-card-thumb-img" />
        ) : (
          <div className="proj-card-thumb-placeholder">
            <span className="proj-card-thumb-label">{project.tags[0]}</span>
          </div>
        )}
        {project.featured && <span className="proj-card-featured">★</span>}
      </div>

      {/* Contenu */}
      <div className="proj-card-body">
        <div className="proj-card-meta">
          <span className="proj-card-year">{project.year}</span>
          <div className="proj-card-tags">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="proj-card-tag">{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="proj-card-title">{project.title}</h3>

        {!compact && <p className="proj-card-desc">{project.shortDesc}</p>}

        <div className="proj-card-footer">
          <span className="proj-card-cta">Voir le projet →</span>
          {project.links?.[0] && (
            <a
              href={project.links[0].url}
              target="_blank"
              rel="noreferrer"
              className="proj-card-gh"
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
