import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { resume } from '../data/resume'
import { deviconMap } from '../data/deviconMap'
import PillButton from '../components/PillButton'
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
  const pageRef = useRef(null)

  const refs = {
    exp:  useRef(null),
    form: useRef(null),
    comp: useRef(null),
    lang: useRef(null),
  }

  /* ── Entrée GSAP (même transition que hero) ── */
  useEffect(() => {
    if (!pageRef.current) return
    gsap.fromTo(pageRef.current,
      { opacity: 0, filter: 'blur(12px)', y: 20 },
      { opacity: 1, filter: 'blur(0px)',  y: 0, duration: 0.9, ease: 'power2.out', clearProps: 'filter' }
    )
  }, [])

  /* ── IntersectionObserver pour suivi scroll ── */
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

  const scrollTo = (id) => {
    setActive(id)
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="page cv-page" ref={pageRef}>
      <div className="container cv-layout">

        {/* ── Sidebar ── */}
        <aside className="cv-sidebar">
          <div className="cv-sidebar-sticky">
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

            {/* Bouton téléchargement */}
            <PillButton href="/assets/cv-nawfel-ida-ali.pdf" download target="_blank">
              Télécharger le CV ↓
            </PillButton>
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
                    <button className="cv-exp-header" onClick={() => toggle(`exp-${i}`)}>
                      <div>
                        <p className="cv-exp-title">{exp.poste}</p>
                        <p className="cv-exp-meta">{exp.lieu} · {exp.periode}</p>
                      </div>
                      <span className={`cv-expand-icon ${expanded[`exp-${i}`] ? 'cv-expand-icon--open' : ''}`}>+</span>
                    </button>
                    {/* Grid rows animation : 0fr → 1fr, fluide et naturel */}
                    <div className={`cv-exp-collapse ${expanded[`exp-${i}`] ? 'cv-exp-collapse--open' : ''}`}>
                      <ul className="cv-exp-points">
                        {exp.points.map((pt, j) => (
                          <li key={j} className="cv-exp-point">{pt}</li>
                        ))}
                      </ul>
                    </div>
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
                    {f.desc ? (
                      <>
                        <button className="cv-exp-header" onClick={() => toggle(`form-${i}`)}>
                          <div>
                            <p className="cv-exp-title">{f.titre}</p>
                            <p className="cv-exp-meta">{f.lieu} · {f.periode}</p>
                          </div>
                          <span className={`cv-expand-icon ${expanded[`form-${i}`] ? 'cv-expand-icon--open' : ''}`}>+</span>
                        </button>
                        <div className={`cv-exp-collapse ${expanded[`form-${i}`] ? 'cv-exp-collapse--open' : ''}`}>
                          <p className="cv-form-desc">{f.desc}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="cv-exp-title">{f.titre}</p>
                        <p className="cv-exp-meta">{f.lieu} · {f.periode}</p>
                      </>
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
