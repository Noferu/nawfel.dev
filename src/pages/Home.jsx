import { useRef, useEffect } from "react";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import CVSnippet from "../components/CVSnippet";
import Contact from "../components/Contact";
import { usePageIntro } from "../hooks/usePageIntro";
import "../styles/home.css";

/**
 * Displays the portfolio home page.
 *
 * The page contains the hero section, projects, resume preview, contact section,
 * and an animated footer name effect.
 *
 * @returns {JSX.Element} Rendered home page.
 */
export default function Home() {
  const nameRef = useRef(null);
  const fillSvgRef = useRef(null);

  usePageIntro();

  useEffect(() => {
    const el = nameRef.current;
    const fill = fillSvgRef.current;

    if (!el || !fill) return;

    const circle = fill.querySelector("#spotCircle");

    /**
     * Moves the SVG mask circle based on the mouse position.
     *
     * @param {MouseEvent} e - Mouse move event.
     */
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * 1140;
      const svgY = ((e.clientY - rect.top) / rect.height) * 130;

      if (circle) {
        circle.setAttribute("cx", svgX);
        circle.setAttribute("cy", svgY);
      }
    };

    /**
     * Hides the SVG mask circle when the mouse leaves the name area.
     */
    const onLeave = () => {
      if (circle) {
        circle.setAttribute("cx", "-9999");
        circle.setAttribute("cy", "-9999");
      }
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const footerLinks = [
    { label: "GitHub", href: "https://github.com/Noferu" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nawfel-ida-ali" },
    { label: "Linktree", href: "https://linktr.ee/nawfel.idaali" },
  ];

  return (
    <main className="home-main">
      <Hero />

      <div className="home-divider" data-intro="divider" />

      <div data-intro="section">
        <Projects />
      </div>

      <div className="home-divider" data-intro="section" />

      <div data-intro="section">
        <CVSnippet />
      </div>

      <div className="home-divider" data-intro="section" />

      <div data-intro="section">
        <Contact />
      </div>

      <footer className="home-footer" data-intro="section">
        <div className="container home-footer-inner">
          <div className="home-footer-top">
            <span className="home-footer-copy">
              Copyright 2026 Nawfel Ida-Ali
            </span>

            <div className="home-footer-links">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="home-footer-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div
            ref={nameRef}
            className="home-footer-name"
            role="img"
            aria-label="NAWFEL IDA-ALI"
          >
            <svg
              className="footer-svg"
              viewBox="0 0 1140 130"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <text x="0" y="108" className="footer-name-outline">
                NAWFEL IDA-ALI
              </text>
            </svg>

            <svg
              ref={fillSvgRef}
              className="footer-svg footer-svg--fill"
              viewBox="0 0 1140 130"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="spotGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="55%" stopColor="white" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>

                <mask id="spotMask">
                  <rect x="0" y="0" width="1140" height="130" fill="black" />
                  <circle
                    id="spotCircle"
                    cx="-9999"
                    cy="-9999"
                    r="200"
                    fill="url(#spotGrad)"
                  />
                </mask>
              </defs>

              <text
                x="0"
                y="108"
                className="footer-name-fill"
                mask="url(#spotMask)"
              >
                NAWFEL IDA-ALI
              </text>
            </svg>
          </div>
        </div>
      </footer>
    </main>
  );
}
