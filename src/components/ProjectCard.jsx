import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

/* Étoile Disney : 4 branches perpendiculaires longues et fines */
const DisneyStarSvg = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
    aria-hidden="true"
  >
    {/* Branche verticale */}
    <path d="M12 0 L13.2 10.8 L12 24 L10.8 10.8 Z" />
    {/* Branche horizontale */}
    <path d="M0 12 L10.8 13.2 L24 12 L10.8 10.8 Z" />
  </svg>
)

export default function ProjectCard({ project, compact = false }) {
  const cardRef  = useRef(null)
  const orbRef   = useRef(null)
  const starRef  = useRef(null)
  const tweenRef = useRef(null)
  const navigate = useNavigate()

  /* ── Glow orb cursor ── */
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

  /* ── Rotation GSAP pour l'étoile featured ── */
  useEffect(() => {
    if (!project.featured || !starRef.current) return

    // Rotation continue lente
    tweenRef.current = gsap.to(starRef.current, {
      rotation:        360,
      duration:        5,
      repeat:          -1,
      ease:            'none',
      transformOrigin: '50% 50%',
    })

    return () => tweenRef.current?.kill()
  }, [project.featured])

  const handleEnter = () => {
    if (!tweenRef.current) return
    gsap.to(tweenRef.current, { timeScale: 6, duration: 0.35, ease: 'power2.in' })
  }

  const handleLeave = () => {
    if (!tweenRef.current) return
    gsap.to(tweenRef.current, { timeScale: 1, duration: 1.8, ease: 'power3.out' })
  }

  return (
    <div
      ref={cardRef}
      className={`proj-card glow-card ${compact ? 'proj-card--compact' : ''}`}
      onClick={() => navigate(`/project/${project.slug}`)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={orbRef} className="glow-orb" />

      {/* Thumbnail (hauteur réduite ~135px) */}
      <div className="proj-card-thumb">
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="proj-card-thumb-img" />
        ) : (
          <div className="proj-card-thumb-placeholder">
            <span className="proj-card-thumb-label">{project.tags[0]}</span>
          </div>
        )}

        {/* Étoile Disney en coin — visible uniquement sur les projets featured */}
        {project.featured && (
          <div ref={starRef} className="proj-card-star" aria-hidden="true">
            <DisneyStarSvg />
          </div>
        )}
      </div>

      {/* Corps */}
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
