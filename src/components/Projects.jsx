import { useEffect, useRef, useCallback } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";

const FRICTION = 0.88;
const MIN_VEL = 0.3;

function getPeriodSortValue(period) {
  if (!period) return -Infinity;

  const value = Array.isArray(period) ? period[period.length - 1] : period;
  const str = String(value).trim();

  const monthYearMatches = str.match(/\d{1,2}\/\d{4}/g);

  if (monthYearMatches?.length) {
    const latest = monthYearMatches[monthYearMatches.length - 1];
    const [monthRaw, yearRaw] = latest.split("/");
    const month = Number(monthRaw);
    const year = Number(yearRaw);

    if (month >= 1 && month <= 12 && year) {
      return year * 100 + month;
    }
  }

  const yearMonthMatches = str.match(/\d{4}-\d{1,2}/g);

  if (yearMonthMatches?.length) {
    const latest = yearMonthMatches[yearMonthMatches.length - 1];
    const [yearRaw, monthRaw] = latest.split("-");
    const year = Number(yearRaw);
    const month = Number(monthRaw);

    if (month >= 1 && month <= 12 && year) {
      return year * 100 + month;
    }
  }

  const yearMatch = str.match(/\d{4}/);

  if (yearMatch) {
    return Number(yearMatch[0]) * 100;
  }

  return -Infinity;
}

const sortByPeriodDesc = (a, b) =>
  getPeriodSortValue(b.period) - getPeriodSortValue(a.period);

const featured = projects.filter((p) => p.featured).sort(sortByPeriodDesc);
const secondary = projects.filter((p) => !p.featured).sort(sortByPeriodDesc);

const tripledFeatured = [...featured, ...featured, ...featured];
const tripledSecondary = [...secondary, ...secondary, ...secondary];

function useInfiniteSlider(direction = "left", speed = 0.5) {
  const trackRef = useRef(null);
  const posRef = useRef(null);
  const rafRef = useRef(null);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const resumeTimer = useRef(null);
  const hasDragged = useRef(false);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const velocityRef = useRef(0);

  const clampPos = useCallback((p, segment) => {
    if (p > 0) p -= segment;
    if (p < -segment) p += segment;
    return p;
  }, []);

  const startAnimation = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const el = trackRef.current;
      if (!el) return;

      if (posRef.current === null) {
        posRef.current = direction === "right" ? -(el.scrollWidth / 3) : 0;
      }

      const segment = el.scrollWidth / 3;

      posRef.current = clampPos(
        posRef.current + (direction === "left" ? -speed : speed),
        segment,
      );

      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [direction, speed, clampPos]);

  const stopAnimation = useCallback(() => {
    if (!rafRef.current) return;

    cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(startAnimation, 5000);
  }, [startAnimation]);

  const runInertia = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const el = trackRef.current;
      if (!el) return;

      velocityRef.current *= FRICTION;

      if (Math.abs(velocityRef.current) < MIN_VEL) {
        velocityRef.current = 0;
        scheduleResume();
        return;
      }

      const segment = el.scrollWidth / 3;
      posRef.current = clampPos(posRef.current + velocityRef.current, segment);
      el.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [clampPos, scheduleResume]);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    };
  }, [startAnimation, stopAnimation]);

  const onMouseDown = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.clientX;
      dragStartPos.current = posRef.current ?? 0;
      hasDragged.current = false;
      lastX.current = e.clientX;
      lastT.current = performance.now();
      velocityRef.current = 0;

      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }

      e.preventDefault();
    },
    [stopAnimation],
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging.current || !trackRef.current) return;

      const delta = e.clientX - dragStartX.current;

      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }

      const now = performance.now();
      const dt = now - lastT.current;

      if (dt > 0) {
        velocityRef.current = ((e.clientX - lastX.current) / dt) * 16;
      }

      lastX.current = e.clientX;
      lastT.current = now;

      const segment = trackRef.current.scrollWidth / 3;
      posRef.current = clampPos(dragStartPos.current + delta, segment);
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    },
    [clampPos],
  );

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;

    dragging.current = false;

    if (Math.abs(velocityRef.current) > MIN_VEL) {
      runInertia();
    } else {
      scheduleResume();
    }
  }, [runInertia, scheduleResume]);

  const onMouseLeave = useCallback(() => {
    if (dragging.current) {
      onMouseUp();
    }
  }, [onMouseUp]);

  const onClickCapture = useCallback((e) => {
    if (!hasDragged.current) return;

    e.preventDefault();
    e.stopPropagation();
    hasDragged.current = false;
  }, []);

  const onTouchStart = useCallback(
    (e) => {
      dragging.current = true;
      dragStartX.current = e.touches[0].clientX;
      dragStartPos.current = posRef.current ?? 0;
      hasDragged.current = false;
      lastX.current = e.touches[0].clientX;
      lastT.current = performance.now();
      velocityRef.current = 0;

      stopAnimation();

      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }
    },
    [stopAnimation],
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!dragging.current || !trackRef.current) return;

      const clientX = e.touches[0].clientX;
      const delta = clientX - dragStartX.current;

      if (Math.abs(delta) > 5) {
        hasDragged.current = true;
      }

      const now = performance.now();
      const dt = now - lastT.current;

      if (dt > 0) {
        velocityRef.current = ((clientX - lastX.current) / dt) * 16;
      }

      lastX.current = clientX;
      lastT.current = now;

      const segment = trackRef.current.scrollWidth / 3;
      posRef.current = clampPos(dragStartPos.current + delta, segment);
      trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    },
    [clampPos],
  );

  const onTouchEnd = useCallback(() => {
    if (!dragging.current) return;

    dragging.current = false;

    if (Math.abs(velocityRef.current) > MIN_VEL) {
      runInertia();
    } else {
      scheduleResume();
    }
  }, [runInertia, scheduleResume]);

  return {
    trackRef,
    wrapperHandlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onMouseLeave,
      onClickCapture,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}

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