import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

/**
 * Main header navigation items.
 */
const NAV = [
  { label: "Accueil", to: "/", anchor: null },
  { label: "À propos", to: "/cv", anchor: null },
  { label: "Projets", to: "/", anchor: "projets" },
];

/**
 * Converts a MM/YYYY period into a sortable number.
 *
 * @param {string} period - Project period in MM/YYYY format.
 * @returns {number} Sortable date number.
 */
function periodToNumber(period) {
  if (!period) return 0;

  const [month, year] = period.split("/").map(Number);

  return year * 100 + month;
}

/**
 * Latest featured project displayed in the header.
 */
const lastProject = projects
  .map((project, index) => ({ ...project, index }))
  .filter((project) => project.featured)
  .sort((a, b) => {
    return (
      periodToNumber(b.period) - periodToNumber(a.period) || b.index - a.index
    );
  })[0];

/**
 * Displays the main desktop header.
 *
 * The header contains the latest featured project, main navigation links,
 * the current project title when needed, and a button to open the command menu.
 *
 * @param {Object} props
 * @param {Function} props.onOpenCmd - Opens the command palette.
 * @returns {JSX.Element} Rendered header.
 */
export default function Header({ onOpenCmd }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const projectMatch = pathname.match(/^\/project\/(.+)$/);
  const projectSlug = projectMatch ? projectMatch[1] : null;
  const currentProject = projectSlug
    ? projects.find((project) => project.slug === projectSlug)
    : null;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Handles navigation links that target a section on the home page.
   *
   * @param {Object} item - Navigation item.
   * @param {React.MouseEvent<HTMLAnchorElement>} e - Link click event.
   */
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

  /**
   * Checks if a navigation item matches the current route.
   *
   * @param {Object} item - Navigation item.
   * @returns {boolean} True when the item is active.
   */
  const isActive = (item) => {
    if (currentProject) return false;
    if (item.anchor) return false;

    return pathname === item.to;
  };

  return (
    <header className="header-wrapper" data-intro="header">
      <div className="header-left">
        <Link to={`/project/${lastProject.slug}`} className="header-last-proj">
          <span className="header-last-proj-label">Dernier</span>
          <span className="header-last-proj-sep" />
          <span className="header-last-proj-title">{lastProject.title}</span>
        </Link>
      </div>

      <div className="header-center">
        <nav
          className={`header-island ${
            scrolled ? "header-island--scrolled" : ""
          }`}
        >
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNav(item, e)}
              className={`header-nav-link ${
                isActive(item) ? "header-nav-link--active" : ""
              }`}
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
    </header>
  );
}
