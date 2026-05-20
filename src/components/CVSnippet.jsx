import { useNavigate } from 'react-router-dom'
import { resume } from '../data/resume'

export default function CVSnippet() {
  const navigate = useNavigate()

  // Toutes les expériences et formations (sans limite)
  const allExp  = resume.experiences
  const allForm = resume.formations

  // Compétences triées par nombre d'items décroissant (uniquement pour ce snippet)
  const sortedComp = [...resume.competences]
    .sort((a, b) => b.items.length - a.items.length)
    .map(c => ({ categorie: c.categorie, count: c.items.length }))

  return (
    <section id="cv-snippet" className="cv-snippet-section">
      <div className="container">
        <div className="cv-snippet-grid">

          {/* Expériences */}
          <div className="cv-snippet-col">
            <p className="section-label">Expériences</p>
            <div className="cv-snippet-list">
              {allExp.map((exp, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />
                  <div>
                    <p className="cv-snippet-item-title">{exp.poste}</p>
                    <p className="cv-snippet-item-meta">{exp.lieu} · {exp.periode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formations */}
          <div className="cv-snippet-col">
            <p className="section-label">Formations</p>
            <div className="cv-snippet-list">
              {allForm.map((f, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />
                  <div>
                    <p className="cv-snippet-item-title">{f.titre}</p>
                    <p className="cv-snippet-item-meta">{f.lieu} · {f.periode}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compétences (triées par count) */}
          <div className="cv-snippet-col">
            <p className="section-label">Compétences</p>
            <div className="cv-snippet-comp-grid">
              {sortedComp.map(c => (
                <div key={c.categorie} className="cv-snippet-comp-item">
                  <span className="cv-snippet-comp-count">{c.count}</span>
                  <span className="cv-snippet-comp-cat">{c.categorie}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="cv-snippet-cta">
          <button className="btn-secondary" onClick={() => navigate('/cv')}>
            CV complet →
          </button>
        </div>
      </div>
    </section>
  )
}
