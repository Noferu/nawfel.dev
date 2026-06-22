import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
const IconSearch = ({ className = "" }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
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


const SECTIONS = [
  { label: "Accueil", action: "scroll", target: "hero" },
  { label: "Projets", action: "scroll", target: "projets" },
  { label: "Contact", action: "scroll", target: "contact" },
  { label: "CV", action: "route", target: "/cv" },
];

const LINKS = [
  { label: "GitHub", url: "https://github.com/Noferu" },
  { label: "LinkedIn", url: "https://linkedin.com/in/nawfel-ida-ali" },
  { label: "Linktree", url: "https://linktr.ee/nawfel.idaali" },
  { label: "Email", url: "mailto:nawfel.idaali.pro@gmail.com" },
];

export default function CommandK({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const projectItems = projects.map((p) => ({
    label: p.title,
    sublabel: p.tags.slice(0, 3).join(", "),
    action: "route",
    target: `/project/${p.slug}`,
    group: "Projets",
  }));

  const sectionItems = SECTIONS.map((s) => ({
    ...s,
    group: "Navigation",
    sublabel: null,
  }));
  const linkItems = LINKS.map((l) => ({
    label: l.label,
    url: l.url,
    action: "link",
    group: "Liens",
    sublabel: null,
  }));

  const allItems = [...sectionItems, ...projectItems, ...linkItems];

  const filtered = query.trim()
    ? allItems.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      setQuery("");
      setSelected(0);
      inputRef.current?.focus();
    }, 0);

    return () => clearTimeout(timeout);
  }, [open]);

  const execute = useCallback((item) => {
  if (!item) return;

  if (item.action === "route") {
    navigate(item.target);
    onClose();
  }

  if (item.action === "scroll") {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById(item.target)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    onClose();
  }

  if (item.action === "link") {
    window.open(item.url, "_blank");
    onClose();
  }
}, [navigate, onClose]);

  useEffect(() => {
  const handler = (e) => {
    if (!open) return;

    if (e.key === "Escape") onClose();

    if (e.key === "ArrowDown") {
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      setSelected((s) => Math.max(s - 1, 0));
    }

    if (e.key === "Enter") {
      execute(filtered[selected]);
    }
  };

  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [open, filtered, selected, onClose, execute]);

  if (!open) return null;

  const groups = {};
  filtered.forEach((item) => {
    if (!groups[item.group]) groups[item.group] = [];
    groups[item.group].push(item);
  });

  let globalIdx = 0;

  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-input-row">
          <IconSearch className="cmdk-search-icon" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Rechercher un projet, une section..."
            className="cmdk-input"
          />
          <kbd className="cmdk-esc">Esc</kbd>
        </div>

        <div className="cmdk-divider" />

        <div className="cmdk-results">
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p className="cmdk-group-label">{group}</p>
              {items.map((item) => {
                const idx = globalIdx++;
                const isSelected = idx === selected;
                return (
                  <button
                    key={idx}
                    className={`cmdk-item ${isSelected ? "cmdk-item--selected" : ""}`}
                    onClick={() => execute(item)}
                    onMouseEnter={() => setSelected(idx)}
                  >
                    <span className="cmdk-item-label">{item.label}</span>
                    {item.sublabel && (
                      <span className="cmdk-item-sub">{item.sublabel}</span>
                    )}
                    <IconArrowRight className="cmdk-item-arrow" />
                  </button>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="cmdk-empty">Aucun résultat pour "{query}"</p>
          )}
        </div>

        <div className="cmdk-footer">
          <span className="cmdk-footer-hint">
            <kbd className="cmdk-kbd">Haut/Bas</kbd> naviguer
          </span>
          <span className="cmdk-footer-hint">
            <kbd className="cmdk-kbd">Entrée</kbd> ouvrir
          </span>
          <span className="cmdk-footer-hint">
            <kbd className="cmdk-kbd">Esc</kbd> fermer
          </span>
        </div>
      </div>
    </div>
  );
}
