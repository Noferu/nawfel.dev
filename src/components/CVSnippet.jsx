import { useNavigate } from 'react-router-dom'
import { resume } from '../data/resume'

export default function CVSnippet() {
  const navigate = useNavigate()

  const recentExp  = resume.experiences.slice(0, 3)
  const recentForm = resume.formations.slice(0, 2)

  const compCounts = resume.competences.map(c => ({
    categorie: c.categorie,
    count: c.items.length,
  }))

  return (
    <section id="cv-snippet" style={styles.section}>
      <div className="container">
        <div style={styles.grid}>

          {/* Expériences */}
          <div style={styles.col}>
            <p className="section-label">Expériences</p>
            <div style={styles.list}>
              {recentExp.map((exp, i) => (
                <div key={i} style={styles.item}>
                  <div style={styles.itemDot} />
                  <div>
                    <p style={styles.itemTitle}>{exp.poste}</p>
                    <p style={styles.itemMeta}>{exp.lieu} · {exp.periode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div style={styles.col}>
            <p className="section-label">Formations</p>
            <div style={styles.list}>
              {recentForm.map((f, i) => (
                <div key={i} style={styles.item}>
                  <div style={styles.itemDot} />
                  <div>
                    <p style={styles.itemTitle}>{f.titre}</p>
                    <p style={styles.itemMeta}>{f.lieu} · {f.periode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences */}
          <div style={styles.col}>
            <p className="section-label">Compétences</p>
            <div style={styles.compGrid}>
              {compCounts.map(c => (
                <div key={c.categorie} style={styles.compItem}>
                  <span style={styles.compCount}>{c.count}</span>
                  <span style={styles.compCat}>{c.categorie}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={styles.cta}>
          <button
            className="btn-secondary"
            onClick={() => navigate('/cv')}
          >
            CV complet →
          </button>
        </div>

      </div>
    </section>
  )
}

const styles = {
  section: {
    padding: 'var(--sp-2xl) 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '3rem',
    marginBottom: '2.5rem',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  item: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  itemDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--amber)',
    flexShrink: 0,
    marginTop: '0.35rem',
  },
  itemTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 500,
    color: 'var(--text)',
    lineHeight: 1.4,
  },
  itemMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.72rem',
    color: 'var(--text-dim)',
    marginTop: '0.15rem',
  },
  compGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  compItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  compCount: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--gold-light)',
    width: 28,
    textAlign: 'right',
    flexShrink: 0,
  },
  compCat: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  cta: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(251,195,115,0.06)',
  },
}
