import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { resume } from "../data/resume";
import { deviconMap } from "../data/deviconMap";
import PillButton from "../components/PillButton";
import "../styles/cv.css";
const IconDownload = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5A1.5 1.5 0 0 0 2.5 14h11a1.5 1.5 0 0 0 1.5-1.5v-2.5a.5.5 0 0 1 1 0v2.5A2.5 2.5 0 0 1 13.5 15h-11A2.5 2.5 0 0 1 0 12.5v-2.5a.5.5 0 0 1 .5-.5z" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
  </svg>
);


const SECTIONS = [
  { id: "exp",      label: "Expériences" },
  { id: "form",     label: "Formations" },
  { id: "comp",     label: "Compétences" },
  { id: "lang",     label: "Langues" },
  { id: "qual",     label: "Qualités" },
  { id: "interests",label: "Intérêts" },
];

/* Formatage de date : "DD/MM/YYYY" vers "Mois YYYY" */
const MONTHS_FR = [
  "Jan.", "Fév.", "Mar.", "Avr.", "Mai", "Juin",
  "Juil.", "Août", "Sep.", "Oct.", "Nov.", "Déc.",
];

function parseDate(str) {
  const parts = str.split("/");
  if (parts.length === 3) {
    return { month: parseInt(parts[1], 10), year: parseInt(parts[2], 10) };
  }
  return null;
}

function formatPeriod(period) {
  if (!period || period.length < 2) return "";
  const start = parseDate(period[0]);
  const end   = parseDate(period[1]);
  if (!start || !end) return period.join(" - ");

  const startStr = `${MONTHS_FR[start.month - 1]} ${start.year}`;
  const endStr   = start.year === end.year
    ? MONTHS_FR[end.month - 1]
    : `${MONTHS_FR[end.month - 1]} ${end.year}`;

  return `${startStr} - ${endStr}`;
}

export default function CV() {
  const [active,   setActive]   = useState("exp");
  const [expanded, setExpanded] = useState({});
  const pageRef      = useRef(null);
  const sectionRefs  = useRef({});

  /* Entrée GSAP */
  useEffect(() => {
    if (!pageRef.current) return;
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, filter: "blur(12px)", y: 20 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, ease: "power2.out", clearProps: "filter" },
    );
  }, []);

  /* IntersectionObserver */
  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-10% 0px -80% 0px" },
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const scrollTo = (id) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="page cv-page" ref={pageRef}>
      <div className="container cv-layout">

        {/* Sidebar */}
        <aside className="cv-sidebar">
          <div className="cv-sidebar-sticky">
            <div className="cv-sidebar-photo">
              <img src="/assets/img/nawfel.webp" alt="Nawfel Ida-Ali" />
            </div>
            <p className="cv-sidebar-title">Sommaire</p>
            <nav className="cv-nav">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`cv-nav-item ${active === s.id ? "cv-nav-item--active" : ""}`}
                >
                  <span className={`cv-nav-dot ${active === s.id ? "cv-nav-dot--active" : ""}`} />
                  {s.label}
                </button>
              ))}
            </nav>
            <PillButton href="/assets/site/cv-nawfel-ida-ali.pdf" download target="_blank">
              Télécharger le CV en PDF <IconDownload className="pill-btn-icon" />
            </PillButton>
          </div>
        </aside>

        {/* Contenu */}
        <main className="cv-content">
          <div className="cv-page-header">
            <p className="section-label">Curriculum Vitæ</p>
            <h1 className="cv-page-title">{resume.name}</h1>
            <p className="cv-page-subtitle">{resume.title}</p>
          </div>

          {/* Expériences */}
          <div ref={(el) => { sectionRefs.current.exp = el; }} id="exp" className="cv-block">
            <h2 className="cv-block-title">Expériences</h2>
            <div className="cv-timeline">
              {resume.experiences.map((exp, i) => {
                const key = `exp-${i}`;
                const isOpen = !!expanded[key];
                return (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-line">
                      <div className="cv-timeline-dot" />
                      {i < resume.experiences.length - 1 && <div className="cv-timeline-bar" />}
                    </div>
                    <div className="cv-timeline-content">
                      <button className="cv-exp-header" onClick={() => toggle(key)}>
                        <div>
                          <p className="cv-exp-title">{exp.position}</p>
                          <p className="cv-exp-company">
                            {exp.company && <span>{exp.company}</span>}
                            {exp.employmentType && <span className="cv-exp-type">{exp.employmentType}</span>}
                          </p>
                          <p className="cv-exp-meta">
                            {exp.location} - {formatPeriod(exp.period)}
                          </p>
                        </div>
                        <span className={`cv-expand-icon ${isOpen ? "cv-expand-icon--open" : ""}`}>+</span>
                      </button>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="cv-comp-tags cv-entry-tags">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="cv-comp-tag">{tag}</span>
                          ))}
                        </div>
                      )}

                      <div className={`cv-exp-collapse ${isOpen ? "cv-exp-collapse--open" : ""}`}>
                        <ul className="cv-exp-points">
                          {exp.points.map((pt, j) => (
                            <li key={j} className="cv-exp-point">{pt}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formations */}
          <div ref={(el) => { sectionRefs.current.form = el; }} id="form" className="cv-block">
            <h2 className="cv-block-title">Formations</h2>
            <div className="cv-timeline">
              {resume.formations.map((f, i) => {
                const key = `form-${i}`;
                const isOpen = !!expanded[key];
                return (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-line">
                      <div className="cv-timeline-dot" />
                      {i < resume.formations.length - 1 && <div className="cv-timeline-bar" />}
                    </div>
                    <div className="cv-timeline-content">
                      <button className="cv-exp-header" onClick={() => toggle(key)}>
                        <div>
                          <p className="cv-exp-title">{f.title}</p>
                          {f.specialization && (
                            <p className="cv-exp-company">{f.specialization}</p>
                          )}
                          <p className="cv-exp-meta">
                            {f.institution} - {formatPeriod(f.period)}
                          </p>
                        </div>
                        <span className={`cv-expand-icon ${isOpen ? "cv-expand-icon--open" : ""}`}>+</span>
                      </button>

                      {f.tags && f.tags.length > 0 && (
                        <div className="cv-comp-tags cv-entry-tags">
                          {f.tags.map((tag) => (
                            <span key={tag} className="cv-comp-tag">{tag}</span>
                          ))}
                        </div>
                      )}

                      {f.points && f.points.length > 0 && (
                        <div className={`cv-exp-collapse ${isOpen ? "cv-exp-collapse--open" : ""}`}>
                          <ul className="cv-exp-points">
                            {f.points.map((pt, j) => (
                              <li key={j} className="cv-exp-point">{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compétences */}
          <div ref={(el) => { sectionRefs.current.comp = el; }} id="comp" className="cv-block">
            <h2 className="cv-block-title">Compétences</h2>
            <div className="cv-comp-grid">
              {resume.competences.map((cat) => (
                <div key={cat.category} className="cv-comp-cat">
                  <p className="cv-comp-cat-title">{cat.category}</p>
                  <div className="cv-comp-tags">
                    {cat.items.map((item) => {
                      const iconClass = deviconMap[item];
                      return (
                        <span key={item} className="cv-comp-tag">
                          {iconClass && <i className={`devicon ${iconClass}`} aria-hidden="true" />}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Langues */}
          <div ref={(el) => { sectionRefs.current.lang = el; }} id="lang" className="cv-block">
            <h2 className="cv-block-title">Langues</h2>
            <div className="cv-lang-row">
              {resume.langues.map((l) => (
                <div key={l.langue} className="cv-lang-item">
                  <p className="cv-lang-name">{l.langue}</p>
                  <p className="cv-lang-level">{l.niveau}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Qualités */}
          <div ref={(el) => { sectionRefs.current.qual = el; }} id="qual" className="cv-block">
            <h2 className="cv-block-title">Qualités</h2>
            <ul className="cv-qual-list">
              {resume.qualities.map((q, i) => (
                <li key={i} className="cv-qual-item">
                  <span className="cv-qual-dot" aria-hidden="true" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Centres d'intérêt */}
          <div ref={(el) => { sectionRefs.current.interests = el; }} id="interests" className="cv-block">
            <h2 className="cv-block-title">Centres d'intérêt</h2>
            <ul className="cv-qual-list">
              {resume.interests.map((interest, i) => (
                <li key={i} className="cv-qual-item">
                  <span className="cv-qual-dot" aria-hidden="true" />
                  {interest}
                </li>
              ))}
            </ul>
          </div>

        </main>
      </div>
    </div>
  );
}