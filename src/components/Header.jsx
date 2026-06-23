import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

const NAV = [
  { label: "Accueil", to: "/", anchor: null },
  { label: "À propos", to: "/cv", anchor: null },
  { label: "Projets", to: "/", anchor: "projets" },
];

function periodToNumber(period) {
  if (!period) return 0;

  const [month, year] = period.split("/").map(Number);

  return year * 100 + month;
}

const lastProject = projects
  .map((project, index) => ({ ...project, index }))
  .sort((a, b) => {
    return (
      periodToNumber(b.period) - periodToNumber(a.period) || b.index - a.index
    );
  })[0];

export default function Header({ onOpenCmd }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const projectMatch = pathname.match(/^\/project\/(.+)$/);
  const projectSlug = projectMatch ? projectMatch[1] : null;
  const currentProject = projectSlug
    ? projects.find((p) => p.slug === projectSlug)
    : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (item, e) => {
    if (item.anchor) {
      e.preventDefault();
      if (pathname === "/") {
        document
          .getElementById(item.anchor)
          ?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById(item.anchor)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    }
  };

  const isActive = (item) => {
    if (currentProject) return false;
    if (item.anchor) return false;
    return pathname === item.to;
  };

  return (
    /* data-intro="header" cible par usePageIntro */
    <header className="header-wrapper" data-intro="header">
      {/* Gauche : pill Last Project */}
      <div className="header-left">
        <Link to={`/project/${lastProject.slug}`} className="header-last-proj">
          <span className="header-last-proj-label">Dernier</span>
          <span className="header-last-proj-sep" />
          <span className="header-last-proj-title">{lastProject.title}</span>
        </Link>
      </div>

      {/* Centre : Dynamic Island */}
      <div className="header-center">
        <nav
          className={`header-island ${scrolled ? "header-island--scrolled" : ""}`}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNav(item, e)}
              className={`header-nav-link ${isActive(item) ? "header-nav-link--active" : ""}`}
            >
              {item.label}
            </Link>
          ))}

          {currentProject && (
            <span className="header-nav-project" title={currentProject.title}>
              {currentProject.title}
            </span>
          )}

          <button
            onClick={onOpenCmd}
            className="header-cmd-btn"
            title="Ouvrir la palette (Ctrl+K)"
          >
            <span className="header-cmd-icon">Ctrl</span>
            <span className="header-cmd-k">K</span>
          </button>
        </nav>
      </div>

      {/* Droite : pill Open To Work */}
      <div className="header-right">
        <div className="header-otw-wrapper">
          <div className="header-otw">
            <span className="header-otw-dot" />
            <span className="header-otw-text">Open To Work</span>
            <span className="header-otw-date">Sep 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
}
