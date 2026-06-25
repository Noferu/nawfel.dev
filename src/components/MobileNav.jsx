import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Main navigation entries displayed in the mobile menu.
 */
const SECTIONS = [
  { label: "Accueil", action: "scroll", target: "hero" },
  { label: "Projets", action: "scroll", target: "projets" },
  { label: "Contact", action: "scroll", target: "contact" },
  { label: "CV", action: "route", target: "/cv" },
];

/**
 * External links displayed at the bottom of the mobile menu.
 */
const LINKS = [
  { label: "GitHub", url: "https://github.com/Noferu" },
  { label: "LinkedIn", url: "https://linkedin.com/in/nawfel-ida-ali" },
  { label: "Linktree", url: "https://linktr.ee/nawfel.idaali" },
  { label: "Email", url: "mailto:nawfel.idaali.pro@gmail.com" },
];

/**
 * Displays the mobile navigation menu.
 *
 * The component opens a fullscreen menu on small screens, locks body scroll
 * while the menu is open, and supports closing with the Escape key.
 *
 * @returns {JSX.Element} Rendered mobile navigation.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    /**
     * Closes the mobile menu when the Escape key is pressed.
     *
     * @param {KeyboardEvent} e - Keyboard event.
     */
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /**
   * Runs the selected mobile navigation action.
   *
   * Route items navigate directly. Scroll items navigate to the home page first
   * when needed, then scroll to the target section.
   *
   * @param {Object} item - Navigation item to execute.
   */
  const go = useCallback(
    (item) => {
      setOpen(false);

      if (item.action === "route") {
        navigate(item.target);
        return;
      }

      if (item.action === "scroll") {
        const scroll = () => {
          document
            .getElementById(item.target)
            ?.scrollIntoView({ behavior: "smooth" });
        };

        if (location.pathname !== "/") {
          navigate("/");
          setTimeout(scroll, 120);
        } else {
          scroll();
        }
      }
    },
    [navigate, location.pathname],
  );

  return (
    <div className="mobile-nav">
      <button
        className={`mobile-nav-toggle ${open ? "is-open" : ""}`}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          onClick={() => setOpen(false)}
        >
          <nav
            className="mobile-nav-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="mobile-nav-list">
              {SECTIONS.map((section) => (
                <li key={section.label}>
                  <button
                    className="mobile-nav-link"
                    onClick={() => go(section)}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="mobile-nav-links">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mobile-nav-social"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
