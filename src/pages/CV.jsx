import { useState, useEffect, useRef } from 'react'
import { resume } from '../data/resume'
import { deviconMap } from '../data/deviconMap'
import '../styles/cv.css'

const SECTIONS = [
  { id: 'exp',   label: 'Expériences' },
  { id: 'form',  label: 'Formations'  },
  { id: 'comp',  label: 'Compétences' },
  { id: 'lang',  label: 'Langues'     },
]

export default function CV() {
  const [active,   setActive]   = useState('exp')
  const [expanded, setExpanded] = useState({})

  const refs = {
    exp:  useRef(null),
    form: useRef(null),
    comp: useRef(null),
    lang: useRef(null),
  }

  // Intersection Observer — détection de la section active au scroll
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = refs[id]?.current
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-25% 0px -65% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  // Au clic : active immédiat + scroll (fix pour la petite section Langues)
  const scrollTo = (id) => {
    setActive(id)
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="page cv-page">
      <div className="container cv-layout">

        {/* ── Sidebar ── */}
        <aside className="cv-sidebar">
          <div className="cv-sidebar-sticky">

            {/* Photo de profil */}
            <div className="cv-sidebar-photo">
              <img src="/assets/img/nawfel.webp" alt="Nawfel Ida-Ali" />
            </div>

            <p className="cv-sidebar-title">Sommaire</p>
            <nav className="cv-nav">
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`cv-nav-item ${active === s.id ? 'cv-nav-item--active' : ''}`}
                >
                  <span className={`cv-nav-dot ${active === s.id ? 'cv-nav-dot--active' : ''}`} />
                  {s.label}
                </button>
              ))}
            </nav>

          </div>
        </aside>

        {/* ── Contenu ── */}
        <main className="cv-content">

          <div className="cv-page-header">
            <p className="section-label">Curriculum Vitæ</p>
            <h1 className="cv-page-title">{resume.name}</h1>
            <p className="cv-page-subtitle">{resume.title}</p>
          </div>

          {/* ── Expériences ── */}
          <div ref={refs.exp} id="exp" className="cv-block">
            <h2 className="cv-block-title">Expériences</h2>
            <div className="cv-timeline">
              {resume.experiences.map((exp, i) => (
                <div key={i} className="cv-timeline-item">
                  <div className="cv-timeline-line">
                    <div className="cv-timeline-dot" />
                    {i < resume.experiences.length - 1 && <div className="cv-timeline-bar" />}
                  </div>
                  <div className="cv-timeline-content">
                    <button
                      className="cv-exp-header"
                      onClick={() => toggle(`exp-${i}`)}
                    >
                      <div>
                        <p className="cv-exp-title">{exp.poste}</p>
                        <p className="cv-exp-meta">{exp.lieu} · {exp.periode}</p>
                      </div>
                      <span className={`cv-expand-icon ${expanded[`exp-${i}`] ? 'cv-expand-icon--open' : ''}`}>
                        +
                      </span>
                    </button>

                    <ul className={`cv-exp-points ${expanded[`exp-${i}`] ? 'cv-exp-points--open' : ''}`}>
                      {exp.points.map((pt, j) => (
                        <li key={j} className="cv-exp-point">{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Formations ── */}
          <div ref={refs.form} id="form" className="cv-block">
            <h2 className="cv-block-title">Formations</h2>
            <div className="cv-timeline">
              {resume.formations.map((f, i) => (
                <div key={i} className="cv-timeline-item">
                  <div className="cv-timeline-line">
                    <div className="cv-timeline-dot" />
                    {i < resume.formations.length - 1 && <div className="cv-timeline-bar" />}
                  </div>
                  <div className="cv-timeline-content">
                    {/* Formations avec desc sont expandables */}
                    {f.desc ? (
                      <button
                        className="cv-exp-header"
                        onClick={() => toggle(`form-${i}`)}
                      >
                        <div>
                          <p className="cv-exp-title">{f.titre}</p>
                          <p className="cv-exp-meta">{f.lieu} · {f.periode}</p>
                        </div>
                        <span className={`cv-expand-icon ${expanded[`form-${i}`] ? 'cv-expand-icon--open' : ''}`}>
                          +
                        </span>
                      </button>
                    ) : (
                      <div>
                        <p className="cv-exp-title">{f.titre}</p>
                        <p className="cv-exp-meta">{f.lieu} · {f.periode}</p>
                      </div>
                    )}

                    {f.desc && (
                      <p className={`cv-form-desc ${expanded[`form-${i}`] ? 'cv-form-desc--open' : ''}`}>
                        {f.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Compétences ── */}
          <div ref={refs.comp} id="comp" className="cv-block">
            <h2 className="cv-block-title">Compétences</h2>
            <div className="cv-comp-grid">
              {resume.competences.map((cat) => (
                <div key={cat.categorie} className="cv-comp-cat">
                  <p className="cv-comp-cat-title">{cat.categorie}</p>
                  <div className="cv-comp-tags">
                    {cat.items.map(item => {
                      const iconClass = deviconMap[item]
                      return (
                        <span key={item} className="cv-comp-tag">
                          {iconClass && <i className={`devicon ${iconClass}`} aria-hidden="true" />}
                          {item}
                        </span>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Langues ── */}
          <div ref={refs.lang} id="lang" className="cv-block">
            <h2 className="cv-block-title">Langues</h2>
            <div className="cv-lang-row">
              {resume.langues.map(l => (
                <div key={l.langue} className="cv-lang-item">
                  <p className="cv-lang-name">{l.langue}</p>
                  <p className="cv-lang-level">{l.niveau}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}