import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { resume } from "../data/resume";
import { deviconMap } from "../data/deviconMap";
import PillButton from "../components/PillButton";
import "../styles/cv.css";

/**
 * Displays a download icon.
 *
 * @param {Object} props
 * @param {string} props.className - Optional CSS class name.
 * @returns {JSX.Element} Rendered SVG icon.
 */
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

/**
 * CV sections displayed in the sidebar navigation.
 */
const SECTIONS = [
  { id: "exp", label: "Expériences" },
  { id: "form", label: "Formations" },
  { id: "comp", label: "Compétences" },
  { id: "lang", label: "Langues" },
  { id: "qual", label: "Qualités" },
  { id: "interests", label: "Intérêts" },
];

/**
 * Short French month labels used to display resume periods.
 */
const MONTHS_FR = [
  "Jan.",
  "Fév.",
  "Mar.",
  "Avr.",
  "Mai",
  "Juin",
  "Juil.",
  "Août",
  "Sep.",
  "Oct.",
  "Nov.",
  "Déc.",
];

/**
 * Parses a date string from DD/MM/YYYY format.
 *
 * @param {string} str - Date string to parse.
 * @returns {{ month: number, year: number } | null} Parsed month and year.
 */
function parseDate(str) {
  const parts = str.split("/");

  if (parts.length === 3) {
    return {
      month: parseInt(parts[1], 10),
      year: parseInt(parts[2], 10),
    };
  }

  return null;
}

/**
 * Formats a resume period into a short readable label.
 *
 * @param {string[]} period - Start and end dates in DD/MM/YYYY format.
 * @returns {string} Formatted period label.
 */
function formatPeriod(period) {
  if (!period || period.length < 2) return "";

  const start = parseDate(period[0]);
  const end = parseDate(period[1]);

  if (!start || !end) return period.join(" - ");

  const startStr = `${MONTHS_FR[start.month - 1]} ${start.year}`;
  const endStr =
    start.year === end.year
      ? MONTHS_FR[end.month - 1]
      : `${MONTHS_FR[end.month - 1]} ${end.year}`;

  return `${startStr} - ${endStr}`;
}

/**
 * Displays the full resume page.
 *
 * The page renders resume data, a sticky sidebar navigation, collapsible
 * timeline entries, and a GSAP entrance animation.
 *
 * @returns {JSX.Element} Rendered resume page.
 */
export default function CV() {
  const [active, setActive] = useState("exp");
  const [expanded, setExpanded] = useState({});
  const pageRef = useRef(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    if (!pageRef.current) return;

    gsap.fromTo(
      pageRef.current,
      { opacity: 0, filter: "blur(12px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        clearProps: "filter",
      },
    );
  }, []);

  useEffect(() => {
    const observers = SECTIONS.map(({ id }) => {
      const el = sectionRefs.current[id];

      if (!el) return null;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-10% 0px -80% 0px" },
      );

      obs.observe(el);

      return obs;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  /**
   * Scrolls to a CV section and updates the active sidebar item.
   *
   * @param {string} id - Section id to scroll to.
   */
  const scrollTo = (id) => {
    setActive(id);
    sectionRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /**
   * Opens or closes a timeline entry.
   *
   * @param {string} key - Unique entry key.
   */
  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="page cv-page" ref={pageRef}>
      <div className="container cv-layout">
        <aside className="cv-sidebar">
          <div className="cv-sidebar-sticky">
            <div className="cv-sidebar-photo">
              <img src="/assets/site/nawfel.webp" alt="Nawfel Ida-Ali" />
            </div>

            <p className="cv-sidebar-title">Sommaire</p>

            <nav className="cv-nav">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`cv-nav-item ${
                    active === section.id ? "cv-nav-item--active" : ""
                  }`}
                >
                  <span
                    className={`cv-nav-dot ${
                      active === section.id ? "cv-nav-dot--active" : ""
                    }`}
                  />
                  {section.label}
                </button>
              ))}
            </nav>

            <PillButton
              href="/assets/site/cv-nawfel-ida-ali.pdf"
              download
              target="_blank"
            >
              Télécharger le CV en PDF{" "}
              <IconDownload className="pill-btn-icon" />
            </PillButton>
          </div>
        </aside>

        <main className="cv-content">
          <div className="cv-page-header">
            <p className="section-label">Curriculum Vitæ</p>
            <h1 className="cv-page-title">{resume.name}</h1>
            <p className="cv-page-subtitle">{resume.title}</p>
          </div>

          <div
            ref={(el) => {
              sectionRefs.current.exp = el;
            }}
            id="exp"
            className="cv-block"
          >
            <h2 className="cv-block-title">Expériences</h2>

            <div className="cv-timeline">
              {resume.experiences.map((exp, i) => {
                const key = `exp-${i}`;
                const isOpen = !!expanded[key];

                return (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-line">
                      <div className="cv-timeline-dot" />
                      {i < resume.experiences.length - 1 && (
                        <div className="cv-timeline-bar" />
                      )}
                    </div>

                    <div className="cv-timeline-content">
                      <button
                        className="cv-exp-header"
                        onClick={() => toggle(key)}
                      >
                        <div>
                          <p className="cv-exp-title">{exp.position}</p>

                          <p className="cv-exp-company">
                            {exp.company && <span>{exp.company}</span>}
                            {exp.employmentType && (
                              <span className="cv-exp-type">
                                {exp.employmentType}
                              </span>
                            )}
                          </p>

                          <p className="cv-exp-meta">
                            {exp.location} - {formatPeriod(exp.period)}
                          </p>
                        </div>

                        <span
                          className={`cv-expand-icon ${
                            isOpen ? "cv-expand-icon--open" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {exp.tags && exp.tags.length > 0 && (
                        <div className="cv-comp-tags cv-entry-tags">
                          {exp.tags.map((tag) => (
                            <span key={tag} className="cv-comp-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div
                        className={`cv-exp-collapse ${
                          isOpen ? "cv-exp-collapse--open" : ""
                        }`}
                      >
                        <ul className="cv-exp-points">
                          {exp.points.map((point, j) => (
                            <li key={j} className="cv-exp-point">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            ref={(el) => {
              sectionRefs.current.form = el;
            }}
            id="form"
            className="cv-block"
          >
            <h2 className="cv-block-title">Formations</h2>

            <div className="cv-timeline">
              {resume.formations.map((formation, i) => {
                const key = `form-${i}`;
                const isOpen = !!expanded[key];

                return (
                  <div key={i} className="cv-timeline-item">
                    <div className="cv-timeline-line">
                      <div className="cv-timeline-dot" />
                      {i < resume.formations.length - 1 && (
                        <div className="cv-timeline-bar" />
                      )}
                    </div>

                    <div className="cv-timeline-content">
                      <button
                        className="cv-exp-header"
                        onClick={() => toggle(key)}
                      >
                        <div>
                          <p className="cv-exp-title">{formation.title}</p>

                          {formation.specialization && (
                            <p className="cv-exp-company">
                              {formation.specialization}
                            </p>
                          )}

                          <p className="cv-exp-meta">
                            {formation.institution} -{" "}
                            {formatPeriod(formation.period)}
                          </p>
                        </div>

                        <span
                          className={`cv-expand-icon ${
                            isOpen ? "cv-expand-icon--open" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>

                      {formation.tags && formation.tags.length > 0 && (
                        <div className="cv-comp-tags cv-entry-tags">
                          {formation.tags.map((tag) => (
                            <span key={tag} className="cv-comp-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {formation.points && formation.points.length > 0 && (
                        <div
                          className={`cv-exp-collapse ${
                            isOpen ? "cv-exp-collapse--open" : ""
                          }`}
                        >
                          <ul className="cv-exp-points">
                            {formation.points.map((point, j) => (
                              <li key={j} className="cv-exp-point">
                                {point}
                              </li>
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

          <div
            ref={(el) => {
              sectionRefs.current.comp = el;
            }}
            id="comp"
            className="cv-block"
          >
            <h2 className="cv-block-title">Compétences</h2>

            <div className="cv-comp-grid">
              {resume.competences.map((category) => (
                <div key={category.category} className="cv-comp-cat">
                  <p className="cv-comp-cat-title">{category.category}</p>

                  <div className="cv-comp-tags">
                    {category.items.map((item) => {
                      const iconClass = deviconMap[item];

                      return (
                        <span key={item} className="cv-comp-tag">
                          {iconClass && (
                            <i
                              className={`devicon ${iconClass}`}
                              aria-hidden="true"
                            />
                          )}
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={(el) => {
              sectionRefs.current.lang = el;
            }}
            id="lang"
            className="cv-block"
          >
            <h2 className="cv-block-title">Langues</h2>

            <div className="cv-lang-row">
              {resume.langues.map((language) => (
                <div key={language.langue} className="cv-lang-item">
                  <p className="cv-lang-name">{language.langue}</p>
                  <p className="cv-lang-level">{language.niveau}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={(el) => {
              sectionRefs.current.qual = el;
            }}
            id="qual"
            className="cv-block"
          >
            <h2 className="cv-block-title">Qualités</h2>

            <ul className="cv-qual-list">
              {resume.qualities.map((quality, i) => (
                <li key={i} className="cv-qual-item">
                  <span className="cv-qual-dot" aria-hidden="true" />
                  {quality}
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={(el) => {
              sectionRefs.current.interests = el;
            }}
            id="interests"
            className="cv-block"
          >
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
