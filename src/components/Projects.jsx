import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

// Tri par année décroissante
const featured  = projects.filter(p => p.featured) .sort((a, b) => b.year - a.year)
const secondary = projects.filter(p => !p.featured) .sort((a, b) => b.year - a.year)

// Double pour boucle infinie
const doubledFeatured  = [...featured,  ...featured]
const doubledSecondary = [...secondary, ...secondary]

export default function Projects() {
  const [paused, setPaused] = useState(false)
  const navigate = useNavigate()

  return (
    <section id="projets" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="section-label">Projets</p>
            <h2 className="projects-title">Sélection récente</h2>
          </div>
          <button
            className="projects-see-all"
            onClick={() => navigate('/projects')}
          >
            Tous les projets
            <span className="projects-count">{projects.length}</span>
          </button>
        </div>
      </div>

      {/* Deux lignes de slider */}
      <div
        className="projects-rows"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ligne 1 : projets featured → défilement gauche */}
        <div className="projects-slider-wrapper">
          <div className="projects-fade-left"  />
          <div className="projects-fade-right" />
          <div className={`projects-track projects-track--left ${paused ? 'projects-track--paused' : ''}`}>
            {doubledFeatured.map((project, i) => (
              <ProjectCard key={`feat-${project.slug}-${i}`} project={project} />
            ))}
          </div>
        </div>

        {/* Ligne 2 : projets secondaires → défilement droite */}
        <div className="projects-slider-wrapper">
          <div className="projects-fade-left"  />
          <div className="projects-fade-right" />
          <div className={`projects-track projects-track--right ${paused ? 'projects-track--paused' : ''}`}>
            {doubledSecondary.map((project, i) => (
              <ProjectCard key={`sec-${project.slug}-${i}`} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
