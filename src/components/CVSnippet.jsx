import { useNavigate } from "react-router-dom";
import { resume } from "../data/resume";
import PillButton from "./PillButton";

/**
 * Displays a right arrow icon.
 *
 * @param {Object} props
 * @param {string} props.className - Optional CSS class name.
 * @returns {JSX.Element} Rendered SVG icon.
 */
const IconArrowRight = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793L8.146 2.354a.5.5 0 1 1 .708-.708l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);

/**
 * Displays a resume preview on the home page.
 *
 * The component shows experiences, formations, and a summary of skill
 * categories before linking to the full CV page.
 *
 * @returns {JSX.Element} Rendered CV preview section.
 */
export default function CVSnippet() {
  const navigate = useNavigate();

  const sortedComp = [...resume.competences]
    .sort((a, b) => b.items.length - a.items.length)
    .map((category) => ({
      category: category.category,
      count: category.items.length,
    }));

  /**
   * Formats a resume period by keeping only the start and end years.
   *
   * @param {string[]} period - Start and end dates in DD/MM/YYYY format.
   * @returns {string} Formatted year range.
   */
  const formatPeriod = (period) => {
    const [start, end] = period;
    const toYear = (dateStr) => dateStr.split("/")[2];

    return `${toYear(start)} - ${toYear(end)}`;
  };

  return (
    <section id="cv-snippet" className="cv-snippet-section">
      <div className="container">
        <div className="cv-snippet-grid">
          <div className="cv-snippet-col">
            <p className="section-label">Expériences</p>

            <div className="cv-snippet-list">
              {resume.experiences.map((experience, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />

                  <div>
                    <p className="cv-snippet-item-title">
                      {experience.position}
                    </p>
                    <p className="cv-snippet-item-meta">
                      {experience.location} - {formatPeriod(experience.period)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-snippet-col">
            <p className="section-label">Formations</p>

            <div className="cv-snippet-list">
              {resume.formations.map((formation, i) => (
                <div key={i} className="cv-snippet-item">
                  <div className="cv-snippet-dot" />

                  <div>
                    <p className="cv-snippet-item-title">{formation.title}</p>
                    <p className="cv-snippet-item-meta">
                      {formation.institution} - {formatPeriod(formation.period)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cv-snippet-col">
            <p className="section-label">Compétences</p>

            <div className="cv-snippet-comp-grid">
              {sortedComp.map((category) => (
                <div key={category.category} className="cv-snippet-comp-item">
                  <span className="cv-snippet-comp-count">
                    {category.count}
                  </span>
                  <span className="cv-snippet-comp-cat">
                    {category.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="cv-snippet-cta">
          <PillButton onClick={() => navigate("/cv")}>
            Voir le CV <IconArrowRight className="pill-btn-icon" />
          </PillButton>
        </div>
      </div>
    </section>
  );
}
