import { Fragment, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { projects } from "../data/projects";
import "../styles/project-page.css";
import N8nWorkflow from "../components/N8nWorkflow";
import NotFound from "./NotFound";
const IconArrowLeft = ({ className = "" }) => (
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
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l5.147-5.146a.5.5 0 1 0-.708-.708l-6 6a.5.5 0 0 0 0 .708l6 6a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>
);

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

const IconExternalLink = ({ className = "" }) => (
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
      d="M8.636 3.5a.5.5 0 0 0 0 1h2.657L6.146 9.646a.5.5 0 1 0 .708.708L12 5.207v2.657a.5.5 0 0 0 1 0V4a.5.5 0 0 0-.5-.5H8.636z"
    />
    <path
      fillRule="evenodd"
      d="M2.5 2A1.5 1.5 0 0 0 1 3.5v10A1.5 1.5 0 0 0 2.5 15h10a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-1 0v3.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5H6a.5.5 0 0 0 0-1H2.5z"
    />
  </svg>
);

const IconStarFill = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
  </svg>
);

const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function formatProjectDate(value) {
  if (!value) return "";

  const str = String(value).trim();

  const monthYear = str.match(/^(\d{1,2})\/(\d{4})$/);

  if (monthYear) {
    const month = Number(monthYear[1]);
    const year = monthYear[2];

    if (month >= 1 && month <= 12) {
      return `${MONTHS_FR[month - 1]} ${year}`;
    }
  }

  const yearMonth = str.match(/^(\d{4})-(\d{1,2})$/);

  if (yearMonth) {
    const year = yearMonth[1];
    const month = Number(yearMonth[2]);

    if (month >= 1 && month <= 12) {
      return `${MONTHS_FR[month - 1]} ${year}`;
    }
  }

  return str;
}

export default function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [mediaIdx, setMediaIdx] = useState(0);
  const pageRef = useRef(null);

  const allIdx = projects.findIndex((p) => p.slug === slug);
  const prev = allIdx > 0 ? projects[allIdx - 1] : null;
  const next = allIdx < projects.length - 1 ? projects[allIdx + 1] : null;

  const allMedia = project
    ? [
        ...(project.hero
          ? [
              {
                type: project.hero.type || "image",
                url: project.hero.url,
                alt: project.hero.alt || project.title,
                poster: project.hero.poster || null,
              },
            ]
          : []),
        ...(project.media
          ? project.media.map((m) => ({
              type: m.type || "image",
              url: m.url,
              alt: m.alt || "",
              poster: m.poster || null,
            }))
          : []),
      ]
    : [];

  const safeIdx = Math.min(mediaIdx, Math.max(0, allMedia.length - 1));
  const currentMedia = allMedia[safeIdx];
  const projectDate = project ? formatProjectDate(project.period) : "";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });

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
  }, [slug]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft" && prev) {
        navigate(`/project/${prev.slug}`);
      }

      if (e.key === "ArrowRight" && next) {
        navigate(`/project/${next.slug}`);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [prev, next, navigate]);

  if (!project) {
    return <NotFound subtitle="Ce projet n'existe pas, ou n'existe plus." />;
  }

  return (
    <div className="page proj-page" ref={pageRef}>
      <div className="container">
        <div className="proj-nav">
          <button className="proj-back-btn" onClick={() => navigate("/")}>
            <IconArrowLeft className="proj-btn-icon" /> Retour
          </button>

          <div className="proj-siblings">
            {prev && (
              <button
                className="proj-sib-btn"
                onClick={() => navigate(`/project/${prev.slug}`)}
              >
                <span className="proj-sib-kicker">Précédent</span>
                <span className="proj-sib-title">{prev.title}</span>
              </button>
            )}

            {next && (
              <button
                className="proj-sib-btn"
                onClick={() => navigate(`/project/${next.slug}`)}
              >
                <span className="proj-sib-kicker">Suivant</span>
                <span className="proj-sib-title">{next.title}</span>
              </button>
            )}
          </div>
        </div>

        <div className="proj-content">
          <header className="proj-header">
            <div className="proj-meta">
              {projectDate && <span className="proj-year">{projectDate}</span>}

              {project.featured && (
                <span className="proj-featured-badge">
                  <IconStarFill className="proj-featured-icon" /> En vedette
                </span>
              )}

              <span className="proj-category">
                {project.category === "bonus"
                  ? "Projet créatif"
                  : "Projet technique"}
              </span>
            </div>

            <h1 className="proj-title">{project.title}</h1>

            {project.shortDesc && (
              <p className="proj-short-desc">{project.shortDesc}</p>
            )}

            <div className="proj-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="proj-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {allMedia.length > 0 && currentMedia && (
            <div className="proj-carousel">
              <div className="proj-carousel-inner">
                {currentMedia.type === "image" ? (
                  <img
                    src={currentMedia.url}
                    alt={currentMedia.alt}
                    className="proj-carousel-img"
                  />
                ) : currentMedia.type === "video" ? (
                  <video
                    src={currentMedia.url}
                    className="proj-carousel-video"
                    controls
                    loop
                    playsInline
                    poster={currentMedia.poster || undefined}
                  />
                ) : (
                  <iframe
                    src={currentMedia.url}
                    title={project.title}
                    className="proj-carousel-iframe"
                    allow="autoplay; fullscreen"
                  />
                )}

                {allMedia.length > 1 && (
                  <>
                    <button
                      className="proj-carousel-btn proj-carousel-btn--prev"
                      onClick={() => setMediaIdx((i) => Math.max(0, i - 1))}
                      disabled={safeIdx === 0}
                      aria-label="Média précédent"
                    >
                      <IconArrowLeft className="proj-carousel-icon" />
                    </button>

                    <button
                      className="proj-carousel-btn proj-carousel-btn--next"
                      onClick={() =>
                        setMediaIdx((i) => Math.min(allMedia.length - 1, i + 1))
                      }
                      disabled={safeIdx === allMedia.length - 1}
                      aria-label="Média suivant"
                    >
                      <IconArrowRight className="proj-carousel-icon" />
                    </button>
                  </>
                )}
              </div>

              {allMedia.length > 1 && (
                <div className="proj-progress" role="tablist">
                  {allMedia.map((_, i) => (
                    <div
                      key={i}
                      role="tab"
                      aria-selected={i === safeIdx}
                      className={`proj-progress-segment ${
                        i === safeIdx ? "proj-progress-segment--active" : ""
                      }`}
                      onClick={() => setMediaIdx(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {(project.context || project.role || project.stack?.length > 0) && (
            <div className="proj-info-grid">
              {project.context && (
                <div className="proj-info-card">
                  <span className="proj-info-key">Contexte</span>
                  <span className="proj-info-val">{project.context}</span>
                </div>
              )}

              {project.role && (
                <div className="proj-info-card">
                  <span className="proj-info-key">Rôle</span>
                  <span className="proj-info-val">{project.role}</span>
                </div>
              )}

              {project.stack?.length > 0 && (
                <div className="proj-info-card proj-info-card--wide">
                  <span className="proj-info-key">Stack</span>
                  <span className="proj-info-val proj-stack">
                    {project.stack.map((item, i) => (
                      <Fragment key={item}>
                        {i > 0 && (
                          <span className="proj-stack-dot" aria-hidden="true" />
                        )}
                        <span className="proj-stack-item">{item}</span>
                      </Fragment>
                    ))}
                  </span>
                </div>
              )}
            </div>
          )}

          <section className="proj-section proj-section--intro">
            <p className="section-label">Présentation</p>

            {project.longDesc && (
              <div className="proj-long-desc">
                {project.longDesc
                  .split(/\r?\n\s*\r?\n/)
                  .map((paragraph) => paragraph.trim())
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
              </div>
            )}
          </section>

          {project.workflows?.length > 0 && (
            <div className="proj-workflow-wrapper">
              <p className="section-label">
                {project.workflows.length > 1 ? "Workflows" : "Workflow"}
              </p>

              <N8nWorkflow workflows={project.workflows} />
            </div>
          )}

          {project.codeSnippet && (
            <section className="proj-section">
              <p className="section-label">Extrait</p>

              <pre className="proj-pre">
                <code className="proj-code">{project.codeSnippet.code}</code>
              </pre>
            </section>
          )}

          {(project.demo || project.links?.length > 0) && (
            <section className="proj-section">
              <p className="section-label">Liens</p>

              <div className="proj-links-row">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary"
                  >
                    Voir la démo <IconExternalLink className="proj-link-icon" />
                  </a>
                )}

                {project.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    {link.label} <IconExternalLink className="proj-link-icon" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}