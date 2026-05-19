import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const featured = projects.filter(p => p.featured)
// Double pour boucle infinie
const doubled = [...featured, ...featured]

export default function Projects() {
  const trackRef = useRef(null)
  const [paused, setPaused] = useState(false)
  const navigate = useNavigate()

  return (
    <section id="projets" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <div>
            <p className="section-label">Projets</p>
            <h2 style={styles.title}>Sélection récente</h2>
          </div>
          <button
            style={styles.seeAll}
            onClick={() => navigate('/projects')}
          >
            Voir tous les projets
            <span style={styles.count}>{projects.length}</span>
          </button>
        </div>
      </div>

      {/* Slider full width */}
      <div
        style={styles.sliderWrapper}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div style={styles.fadeLeft} />
        <div style={styles.fadeRight} />

        <div
          ref={trackRef}
          style={{
            ...styles.track,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {doubled.map((project, i) => (
            <ProjectCard key={`${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}

const styles = {
  section: {
    padding: 'var(--sp-2xl) 0',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: '2.5rem',
    gap: '1rem',
  },
  title: {
    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
    color: 'var(--text)',
    marginTop: '0.5rem',
  },
  seeAll: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-display)',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
    border: '1px solid var(--border)',
    padding: '0.45rem 1rem',
    borderRadius: '8px',
    transition: 'all var(--t-fast)',
    flexShrink: 0,
  },
  count: {
    background: 'rgba(251,195,115,0.1)',
    border: '1px solid rgba(251,195,115,0.2)',
    color: 'var(--gold-light)',
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    fontWeight: 700,
    padding: '0.1rem 0.45rem',
    borderRadius: '999px',
  },
  sliderWrapper: {
    position: 'relative',
  },
  fadeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 120,
    background: 'linear-gradient(to right, var(--black), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  fadeRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 120,
    background: 'linear-gradient(to left, var(--black), transparent)',
    zIndex: 2,
    pointerEvents: 'none',
  },
  track: {
    display: 'flex',
    gap: '1rem',
    padding: '1rem 1.5rem',
    width: 'max-content',
    animation: 'scrollLeft 30s linear infinite',
    willChange: 'transform',
  },
}
