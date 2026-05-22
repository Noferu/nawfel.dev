import { useNavigate } from 'react-router-dom'
import { resume } from '../data/resume'
import PillButton from './PillButton'

export default function CVSnippet() {
  const navigate = useNavigate()

  const sortedComp = [...resume.competences]
    .sort((a, b) => b.items.length - a.items.length)
    .map(c => ({ category: c.category, count: c.items.length }))

  const formatPeriod = (period) => {
    const [start, end] = period
    const toYear = (dateStr) => dateStr.split('/')[2]
    return `${toYear(start)} – ${toYear(end)}`
  }

  return (
    <section id="cv-snippet" className="cv-snippet-section">
      <div className="container">
        <div className="cv-snippet-grid">

          <div className="cv-snippet-col">
            <p className="section-label">Expériences</p>
            <div className="cv-snippet-list">
              {resume.experiences.map((exp, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />
                  <div>
                    <p className="cv-snippet-item-title">{exp.position}</p>
                    <p className="cv-snippet-item-meta">{exp.location} · {formatPeriod(exp.period)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-snippet-col">
            <p className="section-label">Formations</p>
            <div className="cv-snippet-list">
              {resume.formations.map((f, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />
                  <div>
                    <p className="cv-snippet-item-title">{f.title}</p>
                    <p className="cv-snippet-item-meta">{f.institution} · {formatPeriod(f.period)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-snippet-col">
            <p className="section-label">Compétences</p>
            <div className="cv-snippet-comp-grid">
              {sortedComp.map(c => (
                <div key={c.category} className="cv-snippet-comp-item">
                  <span className="cv-snippet-comp-count">{c.count}</span>
                  <span className="cv-snippet-comp-cat">{c.category}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA sans divider au-dessus */}
        <div className="cv-snippet-cta">
          <PillButton onClick={() => navigate('/cv')}>
            Voir le CV →
          </PillButton>
        </div>
      </div>
    </section>
  )
}