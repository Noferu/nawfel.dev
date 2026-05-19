import { useState, useEffect, useRef } from 'react'
import { resume } from '../data/resume'

const SECTIONS = [
  { id: 'exp',   label: 'Expériences'  },
  { id: 'form',  label: 'Formations'   },
  { id: 'comp',  label: 'Compétences'  },
  { id: 'lang',  label: 'Langues'      },
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

  // Intersection observer pour le sommaire actif
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = refs[id]?.current
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  const scrollTo = (id) => {
    refs[id]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const toggle = (key) => setExpanded(prev => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="page" style={styles.page}>
      <div className="container" style={styles.layout}>

        {/* ── Sommaire latéral ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSticky}>
            <p style={styles.sidebarTitle}>Sommaire</p>
            <nav style={styles.nav}>
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    ...styles.navItem,
                    ...(active === s.id ? styles.navItemActive : {}),
                  }}
                >
                  <span style={{
                    ...styles.navDot,
                    ...(active === s.id ? styles.navDotActive : {}),
                  }} />
                  {s.label}
                </button>
              ))}
            </nav>

            {/* Infos rapides */}
            <div style={styles.quickInfo}>
              <p style={styles.quickName}>{resume.name}</p>
              <p style={styles.quickTitle}>{resume.title}</p>
              <p style={styles.quickLoc}>{resume.location}</p>
            </div>
          </div>
        </aside>

        {/* ── Contenu ── */}
        <main style={styles.content}>

          {/* Header page */}
          <div style={styles.pageHeader}>
            <p className="section-label">Curriculum Vitæ</p>
            <h1 style={styles.pageTitle}>{resume.name}</h1>
            <p style={styles.pageSubtitle}>{resume.title}</p>
          </div>

          {/* ── Expériences ── */}
          <div ref={refs.exp} id="exp" style={styles.block}>
            <h2 style={styles.blockTitle}>Expériences</h2>
            <div style={styles.timeline}>
              {resume.experiences.map((exp, i) => (
                <div key={i} style={styles.timelineItem}>
                  <div style={styles.timelineLine}>
                    <div style={styles.timelineDot} />
                    {i < resume.experiences.length - 1 && <div style={styles.timelineBar} />}
                  </div>
                  <div style={styles.timelineContent}>
                    <button
                      style={styles.expHeader}
                      onClick={() => toggle(`exp-${i}`)}
                    >
                      <div>
                        <p style={styles.expTitle}>{exp.poste}</p>
                        <p style={styles.expMeta}>{exp.lieu} · {exp.periode}</p>
                      </div>
                      <span style={{
                        ...styles.expandIcon,
                        transform: expanded[`exp-${i}`] ? 'rotate(45deg)' : 'rotate(0deg)',
                      }}>+</span>
                    </button>

                    {expanded[`exp-${i}`] && (
                      <ul style={styles.expPoints}>
                        {exp.points.map((pt, j) => (
                          <li key={j} style={styles.expPoint}>{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Formations ── */}
          <div ref={refs.form} id="form" style={styles.block}>
            <h2 style={styles.blockTitle}>Formations</h2>
            <div style={styles.timeline}>
              {resume.formations.map((f, i) => (
                <div key={i} style={styles.timelineItem}>
                  <div style={styles.timelineLine}>
                    <div style={styles.timelineDot} />
                    {i < resume.formations.length - 1 && <div style={styles.timelineBar} />}
                  </div>
                  <div style={styles.timelineContent}>
                    <p style={styles.expTitle}>{f.titre}</p>
                    <p style={styles.expMeta}>{f.lieu} · {f.periode}</p>
                    {f.desc && <p style={styles.formDesc}>{f.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Compétences ── */}
          <div ref={refs.comp} id="comp" style={styles.block}>
            <h2 style={styles.blockTitle}>Compétences</h2>
            <div style={styles.compGrid}>
              {resume.competences.map((cat) => (
                <div key={cat.categorie} style={styles.compCat}>
                  <p style={styles.compCatTitle}>{cat.categorie}</p>
                  <div style={styles.compTags}>
                    {cat.items.map(item => (
                      <span key={item} style={styles.compTag}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Langues ── */}
          <div ref={refs.lang} id="lang" style={styles.block}>
            <h2 style={styles.blockTitle}>Langues</h2>
            <div style={styles.langRow}>
              {resume.langues.map(l => (
                <div key={l.langue} style={styles.langItem}>
                  <p style={styles.langName}>{l.langue}</p>
                  <p style={styles.langLevel}>{l.niveau}</p>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
  },
  layout: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    gap: '4rem',
    alignItems: 'start',
    paddingTop: '2rem',
    paddingBottom: '6rem',
  },
  sidebar: {
    position: 'sticky',
    top: '6rem',
  },
  sidebarSticky: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  sidebarTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.4rem 0',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'color var(--t-fast)',
  },
  navItemActive: {
    color: 'var(--gold-light)',
  },
  navDot: {
    width: 5,
    height: 5,
    borderRadius: '50%',
    background: 'var(--text-dim)',
    flexShrink: 0,
    transition: 'background var(--t-fast)',
  },
  navDotActive: {
    background: 'var(--gold-light)',
    boxShadow: '0 0 6px var(--gold-light)',
  },
  quickInfo: {
    marginTop: '1rem',
    padding: '1rem',
    background: 'rgba(251,195,115,0.04)',
    border: '1px solid rgba(251,195,115,0.08)',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  quickName: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.8rem',
    fontWeight: 700,
    color: 'var(--text)',
  },
  quickTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--text-muted)',
    lineHeight: 1.5,
  },
  quickLoc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--text-dim)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
  },
  pageHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingBottom: '2rem',
    borderBottom: '1px solid rgba(251,195,115,0.08)',
  },
  pageTitle: {
    fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
    color: 'var(--text)',
    letterSpacing: '-0.03em',
  },
  pageSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    fontWeight: 300,
  },
  block: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    scrollMarginTop: '7rem',
  },
  blockTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--text)',
    letterSpacing: '-0.02em',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
  },
  timelineItem: {
    display: 'flex',
    gap: '1.25rem',
  },
  timelineLine: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    width: 12,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--amber)',
    flexShrink: 0,
    marginTop: '0.45rem',
    boxShadow: '0 0 8px rgba(212,138,57,0.4)',
  },
  timelineBar: {
    flex: 1,
    width: 1,
    background: 'rgba(251,195,115,0.1)',
    margin: '0.4rem 0',
    minHeight: 24,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: '1.75rem',
  },
  expHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    gap: '1rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left',
    padding: 0,
  },
  expTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 500,
    color: 'var(--text)',
    lineHeight: 1.4,
  },
  expMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--text-dim)',
    marginTop: '0.2rem',
  },
  expandIcon: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    color: 'var(--amber)',
    flexShrink: 0,
    transition: 'transform 200ms ease',
    lineHeight: 1,
    marginTop: '0.1rem',
  },
  expPoints: {
    marginTop: '0.75rem',
    paddingLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    listStyle: 'none',
  },
  expPoint: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    fontWeight: 300,
    paddingLeft: '0.75rem',
    borderLeft: '1px solid rgba(251,195,115,0.15)',
  },
  formDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
    fontWeight: 300,
    marginTop: '0.4rem',
    fontStyle: 'italic',
  },
  compGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
  },
  compCat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  compCatTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--amber)',
  },
  compTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  compTag: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    background: 'rgba(251,195,115,0.05)',
    border: '1px solid rgba(251,195,115,0.1)',
    padding: '0.25rem 0.6rem',
    borderRadius: '4px',
  },
  langRow: {
    display: 'flex',
    gap: '2rem',
  },
  langItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  langName: {
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: 700,
    color: 'var(--text)',
  },
  langLevel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
}
