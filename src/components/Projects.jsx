import { useEffect, useRef, useCallback } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const featured = projects
  .filter((p) => p.featured)
  .sort((a, b) => b.year - a.year);
const secondary = projects
  .filter((p) => !p.featured)
  .sort((a, b) => b.year - a.year);

// Triplé : garantit qu'on ne voit jamais le bord, même avec peu de projets
const tripledFeatured = [...featured, ...featured, ...featured];
const tripledSecondary = [...secondary, ...secondary, ...secondary];

// ─── Hook ────────────────────────────────────────────────────────────────────

function useInfiniteSlider(direction = "left", speed = 0.5) {
  const trackRef = useRef(null);
  const posRef = useRef(null); // null = pas encore initialisé
  const rafRef = useRef(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const resumeTimer = useRef(null);

  // ── animation loop ─────────────────────────────────────────────────────────

  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const el = trackRef.current;
      if (!el) return;

      if (posRef.current === null) {
        posRef.current = direction === "right" ? -(el.scrollWidth / 3) : 0;
      }

      const segment = el.scrollWidth / 3;

      posRef.current += direction === "left" ? -speed : speed;

      if (posRef.current <= -segment) posRef.current += segment;
      if (posRef.current >= 0) posRef.current -= segment;

      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [direction, speed]);

  const stopAnimation = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAnimation, 5000);
  }, [startAnimation]);

  // ── lifecycle ──────────────────────────────────────────────────────────────

  useEffect(() => {
    startAnimation();
    return () => {
      stopAnimation();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── drag – mouse ───────────────────────────────────────────────────────────

  const onMouseDown = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartPos.current = posRef.current ?? 0;
      stopAnimation();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
      e.preventDefault();
    },
    [stopAnimation],
  );

  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !trackRef.current) return;
    const segment = trackRef.current.scrollWidth / 3;
    let p = dragStartPos.current + (e.clientX - dragStartX.current);
    if (p > 0) p -= segment;
    if (p < -segment) p += segment;
    posRef.current = p;
    trackRef.current.style.transform = `translateX(${p}px)`;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    scheduleResume();
  }, [scheduleResume]);

  const onMouseLeave = useCallback(() => {
    if (dragging.current) onMouseUp();
  }, [onMouseUp]);

  // ── drag – touch ───────────────────────────────────────────────────────────

  const onTouchStart = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartPos.current = posRef.current ?? 0;
      stopAnimation();
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    },
    [stopAnimation],
  );

  const onTouchMove = useCallback((e) => {
    if (!dragging.current || !trackRef.current) return;
    const segment = trackRef.current.scrollWidth / 3;
    let p = dragStartPos.current + (e.touches[0].clientX - dragStartX.current);
    if (p > 0) p -= segment;
    if (p < -segment) p += segment;
    posRef.current = p;
    trackRef.current.style.transform = `translateX(${p}px)`;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    scheduleResume();
  }, [scheduleResume]);

  return {
    trackRef,
    wrapperHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Projects() {
  const { trackRef: topTrackRef, wrapperHandlers: topHandlers } =
    useInfiniteSlider("left", 0.5);

  const { trackRef: bottomTrackRef, wrapperHandlers: bottomHandlers } =
    useInfiniteSlider("right", 0.5);

  return (
    <section id="projets" className="projects-section">
      <div className="container">
        <div className="projects-header">
          <div>
            <p className="section-label">Projets</p>
            <h2 className="projects-title">Sélection récente</h2>
          </div>
        </div>
      </div>

      {/* Ligne 1 : featured → gauche */}
      <div
        className="projects-slider-wrapper"
        style={{ userSelect: "none", touchAction: "pan-y" }}
        {...topHandlers}
      >
        <div className="projects-fade-left" />
        <div className="projects-fade-right" />
        <div
          ref={topTrackRef}
          className="projects-track"
          style={{ animation: "none", willChange: "transform" }}
        >
          {tripledFeatured.map((project, i) => (
            <ProjectCard key={`feat-${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>

      {/* Ligne 2 : non-featured → droite */}
      <div
        className="projects-slider-wrapper"
        style={{ marginTop: "1rem", userSelect: "none", touchAction: "pan-y" }}
        {...bottomHandlers}
      >
        <div className="projects-fade-left" />
        <div className="projects-fade-right" />
        <div
          ref={bottomTrackRef}
          className="projects-track"
          style={{ animation: "none", willChange: "transform" }}
        >
          {tripledSecondary.map((project, i) => (
            <ProjectCard key={`sec-${project.slug}-${i}`} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
