import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { projects } from '../data/projects'
import '../styles/project-page.css'

export default function Project() {
  const { slug }   = useParams()
  const navigate   = useNavigate()
  const project    = projects.find(p => p.slug === slug)
  const [mediaIdx, setMediaIdx] = useState(0)
  const pageRef    = useRef(null)

  // Navigation entre projets (ordre du tableau)
  const allIdx = projects.findIndex(p => p.slug === slug)
  const prev   = allIdx > 0                   ? projects[allIdx - 1] : null
  const next   = allIdx < projects.length - 1 ? projects[allIdx + 1] : null

  // Médias : hero + media[]
  const allMedia = project ? [
    ...(project.hero  ? [{ type: project.hero.type || 'image', url: project.hero.url, alt: project.hero.alt || project.title }] : []),
    ...(project.media ? project.media.map(m => ({ type: 'image', url: m.url, alt: m.alt || '' })) : []),
  ] : []

  /* ── Reset scroll + animation entrée à chaque changement de projet ── */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMediaIdx(0)
    if (!pageRef.current) return
    gsap.fromTo(pageRef.current,
      { opacity: 0, filter: 'blur(12px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)',  y: 0, duration: 0.9, ease: 'power2.out', clearProps: 'filter' }
    )
  }, [slug])

  /* ── Raccourcis clavier ←→ pour naviguer entre projets ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft'  && prev) navigate(`/project/${prev.slug}`)
      if (e.key === 'ArrowRight' && next) navigate(`/project/${next.slug}`)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next, navigate])

  if (!project) {
    return (
      <div className="page proj-not-found">
        <p className="proj-nf-code">404</p>
        <p className="proj-nf-msg">Projet introuvable.</p>
        <button className="btn-secondary" onClick={() => navigate(-1)}>← Retour</button>
      </div>
    )
  }

  return (
    <div className="page proj-page" ref={pageRef}>
      <div className="container">

        {/* ── Navigation ── */}
        <div className="proj-nav">
          <button className="proj-back-btn" onClick={() => navigate(-1)}>← Retour</button>
          <div className="proj-siblings">
            {prev && (
              <button className="proj-sib-btn" onClick={() => navigate(`/project/${prev.slug}`)}>
                ← {prev.title}
              </button>
            )}
            {next && (
              <button className="proj-sib-btn" onClick={() => navigate(`/project/${next.slug}`)}>
                {next.title} →
              </button>
            )}
            {(prev || next) && (
              <span className="proj-kbd-hint">
                <kbd className="proj-kbd">←</kbd>
                <kbd className="proj-kbd">→</kbd>
                naviguer
              </span>
            )}
          </div>
        </div>

        {/* ── Header ── */}
        <header className="proj-header">
          <div className="proj-meta">
            <span className="proj-year">{project.year}</span>
            {project.featured && <span className="proj-featured-badge">★ Featured</span>}
            <span className="proj-category">
              {project.category === 'bonus' ? 'Projet créatif' : 'Projet technique'}
            </span>
          </div>
          <h1 className="proj-title">{project.title}</h1>
          <div className="proj-tags">
            {project.tags.map(tag => (
              <span key={tag} className="proj-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* ── Carousel ── */}
        {allMedia.length > 0 && (
          <div className="proj-carousel">
            <div className="proj-carousel-inner">
              {allMedia[mediaIdx].type === 'image' ? (
                <img src={allMedia[mediaIdx].url} alt={allMedia[mediaIdx].alt} className="proj-carousel-img" />
              ) : (
                <iframe
                  src={allMedia[mediaIdx].url}
                  title={project.title}
                  className="proj-carousel-iframe"
                  allow="autoplay; fullscreen"
                  frameBorder="0"
                />
              )}
              {allMedia.length > 1 && (
                <>
                  <button
                    className="proj-carousel-btn proj-carousel-btn--prev"
                    onClick={() => setMediaIdx(i => Math.max(0, i - 1))}
                    disabled={mediaIdx === 0}
                    aria-label="Image précédente"
                  >←</button>
                  <button
                    className="proj-carousel-btn proj-carousel-btn--next"
                    onClick={() => setMediaIdx(i => Math.min(allMedia.length - 1, i + 1))}
                    disabled={mediaIdx === allMedia.length - 1}
                    aria-label="Image suivante"
                  >→</button>
                </>
              )}
            </div>
            {allMedia.length > 1 && (
              <div className="proj-progress" role="tablist">
                {allMedia.map((_, i) => (
                  <div
                    key={i}
                    role="tab"
                    aria-selected={i === mediaIdx}
                    className={`proj-progress-segment ${i === mediaIdx ? 'proj-progress-segment--active' : ''}`}
                    onClick={() => setMediaIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Corps ── */}
        <div className="proj-body">
          <div className="proj-section">
            <p className="section-label">Contexte</p>
            <p className="proj-long-desc">{project.longDesc}</p>
            <div className="proj-info-grid">
              {project.context && (
                <div className="proj-info-row">
                  <span className="proj-info-key">Contexte</span>
                  <span className="proj-info-val">{project.context}</span>
                </div>
              )}
              {project.role && (
                <div className="proj-info-row">
                  <span className="proj-info-key">Rôle</span>
                  <span className="proj-info-val">{project.role}</span>
                </div>
              )}
              {project.stack && (
                <div className="proj-info-row">
                  <span className="proj-info-key">Stack</span>
                  <span className="proj-info-val">{project.stack.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>

          {project.codeSnippet && (
            <div className="proj-section">
              <p className="section-label">Extrait</p>
              <pre className="proj-pre"><code className="proj-code">{project.codeSnippet.code}</code></pre>
            </div>
          )}

          {project.links?.length > 0 && (
            <div className="proj-section">
              <p className="section-label">Liens</p>
              <div className="proj-links-row">
                {project.links.map((link, i) => (
                  <a key={i} href={link.url} target="_blank" rel="noreferrer" className="btn-secondary">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
