import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const featured  = projects.filter(p => p.featured) .sort((a, b) => b.year - a.year)
const secondary = projects.filter(p => !p.featured) .sort((a, b) => b.year - a.year)

const doubledFeatured  = [...featured,  ...featured]
const doubledSecondary = [...secondary, ...secondary]

export default function Projects() {
  // Pause indépendante pour chaque ligne
  const [pausedTop, setPausedTop]       = useState(false)
  const [pausedBottom, setPausedBottom] = useState(false)

  return (
    <section id="projets" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="section-label">Projets</p>
            <h2 className="projects-title">Sélection récente</h2>
          </div>
        </div>
      </div>

      {/* Ligne 1 : featured → gauche */}
      <div
        className="projects-slider-wrapper"
        onMouseEnter={() => setPausedTop(true)}
        onMouseLeave={() => setPausedTop(false)}
      >
        <div className="projects-fade-left"  />
        <div className="projects-fade-right" />
        <div className={`projects-track projects-track--left ${pausedTop ? 'projects-track--paused' : ''}`}>
          {doubledFeatured.map((project, i) => (
            <ProjectCard key={`feat-${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* Ligne 2 : non-featured → droite */}
      <div
        className="projects-slider-wrapper"
        style={{ marginTop: '1rem' }}
        onMouseEnter={() => setPausedBottom(true)}
        onMouseLeave={() => setPausedBottom(false)}
      >
        <div className="projects-fade-left"  />
        <div className="projects-fade-right" />
        <div className={`projects-track projects-track--right ${pausedBottom ? 'projects-track--paused' : ''}`}>
          {doubledSecondary.map((project, i) => (
            <ProjectCard key={`sec-${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
