import {
  Fragment,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
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

const LONG_DESC_BLOCKS = [
  { key: "genesis", label: "Genèse" },
  { key: "overview", label: "En pratique" },
  { key: "build", label: "Réalisation" },
];

const EMPTY_RATIOS = {};

function getDescBlocks(longDesc) {
  if (!longDesc) return [];

  if (typeof longDesc === "string") {
    return longDesc
      .split(/\r?\n\s*\r?\n/)
      .map((text) => text.trim())
      .filter(Boolean)
      .map((text) => ({ label: null, text }));
  }

  return LONG_DESC_BLOCKS.map(({ key, label }) => ({
    label,
    text: longDesc[key],
  })).filter((block) => block.text);
}

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

const SLIDE_ASPECT = 16 / 9;
const COVER_MIN_RATIO = 1.2;

function buildSlides(media, ratios, target = SLIDE_ASPECT) {
  const slides = [];
  let group = [];
  let sum = 0;

  const flush = () => {
    if (group.length) {
      slides.push({ items: group });
      group = [];
      sum = 0;
    }
  };

  for (const m of media) {
    const ratio = m.type === "image" ? ratios[m.url] : null;

    if (ratio == null) {
      flush();
      slides.push({ items: [m] });
      continue;
    }

    if (group.length && sum + ratio > target) flush();

    group.push(m);
    sum += ratio;

    if (sum >= target) flush();
  }

  flush();

  return slides;
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 6;
const SWIPE_THRESHOLD = 60;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

export default function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const allIdx = projects.findIndex((p) => p.slug === slug);
  const project = allIdx >= 0 ? projects[allIdx] : null;
  const prev = allIdx > 0 ? projects[allIdx - 1] : null;
  const next =
    allIdx >= 0 && allIdx < projects.length - 1 ? projects[allIdx + 1] : null;

  const pageRef = useRef(null);
  const railRef = useRef(null);
  const stageRef = useRef(null);
  const pointers = useRef(new Map());
  const pinch = useRef(null);
  const pan = useRef(null);
  const swipe = useRef(null);

  const allMedia = useMemo(() => {
    if (!project) return [];

    return [
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
    ];
  }, [project]);

  const images = useMemo(
    () => allMedia.filter((m) => m.type === "image"),
    [allMedia],
  );

  const imageKey = useMemo(() => images.map((m) => m.url).join("|"), [images]);

  const [ratioState, setRatioState] = useState({
    key: "",
    values: EMPTY_RATIOS,
  });

  const ratios = useMemo(
    () => (ratioState.key === imageKey ? ratioState.values : EMPTY_RATIOS),
    [ratioState.key, ratioState.values, imageKey],
  );

  const [slideIdxState, setSlideIdxState] = useState({
    slug,
    value: 0,
  });

  const slideIdx = slideIdxState.slug === slug ? slideIdxState.value : 0;

  const setSlideIdx = useCallback(
    (value) => {
      setSlideIdxState((prevState) => {
        const currentValue = prevState.slug === slug ? prevState.value : 0;
        const nextValue =
          typeof value === "function" ? value(currentValue) : value;

        if (prevState.slug === slug && prevState.value === nextValue) {
          return prevState;
        }

        return {
          slug,
          value: nextValue,
        };
      });
    },
    [slug],
  );

  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [zoom, setZoom] = useState({ scale: 1, x: 0, y: 0 });
  const [isLightboxInteracting, setIsLightboxInteracting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!images.length) return;

    Promise.all(
      images.map(
        (m) =>
          new Promise((resolve) => {
            const img = new Image();

            img.onload = () =>
              resolve([
                m.url,
                img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1,
              ]);

            img.onerror = () => resolve([m.url, 1]);
            img.src = m.url;
          }),
      ),
    ).then((entries) => {
      if (!cancelled) {
        setRatioState({
          key: imageKey,
          values: Object.fromEntries(entries),
        });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [images, imageKey]);

  const slides = useMemo(
    () => buildSlides(allMedia, ratios),
    [allMedia, ratios],
  );

  useLayoutEffect(() => {
    if (railRef.current) {
      railRef.current.scrollLeft = 0;
    }
  }, [slug]);

  const onRailScroll = useCallback(() => {
    const rail = railRef.current;

    if (!rail) return;

    const center = rail.scrollLeft + rail.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;

    Array.from(rail.children).forEach((child, i) => {
      const c = child.offsetLeft + child.offsetWidth / 2;
      const d = Math.abs(c - center);

      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });

    setSlideIdx(best);
  }, [setSlideIdx]);

  const goToSlide = useCallback((i) => {
    const rail = railRef.current;

    if (!rail) return;

    const child = rail.children[i];

    if (!child) return;

    rail.scrollTo({
      left: child.offsetLeft - (rail.clientWidth - child.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  const lightboxOpen = lightboxIdx != null && images[lightboxIdx];

  const resetZoom = useCallback(() => {
    pointers.current.clear();
    pinch.current = null;
    pan.current = null;
    swipe.current = null;

    setIsLightboxInteracting(false);
    setZoom({ scale: 1, x: 0, y: 0 });
  }, []);

  const openLightbox = useCallback(
    (media) => {
      const idx = images.findIndex((m) => m.url === media.url);

      if (idx === -1) return;

      setLightboxIdx(idx);
      resetZoom();
    },
    [images, resetZoom],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    resetZoom();
  }, [resetZoom]);

  const showPrevImage = useCallback(() => {
    setLightboxIdx((i) =>
      i == null ? i : (i - 1 + images.length) % images.length,
    );
    resetZoom();
  }, [images.length, resetZoom]);

  const showNextImage = useCallback(() => {
    setLightboxIdx((i) => (i == null ? i : (i + 1) % images.length));
    resetZoom();
  }, [images.length, resetZoom]);

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
        clearProps: "filter,transform",
      },
    );
  }, [slug]);

  useEffect(() => {
    const handler = (e) => {
      if (lightboxIdx != null) return;
      if (e.key === "ArrowLeft" && prev) navigate(`/project/${prev.slug}`);
      if (e.key === "ArrowRight" && next) navigate(`/project/${next.slug}`);
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, navigate, lightboxIdx]);

  useEffect(() => {
    if (lightboxIdx == null) return;

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrevImage();
      else if (e.key === "ArrowRight") showNextImage();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, closeLightbox, showPrevImage, showNextImage]);

  useEffect(() => {
    if (lightboxIdx == null) return;

    const el = stageRef.current;

    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const cx = e.clientX - (rect.left + rect.width / 2);
      const cy = e.clientY - (rect.top + rect.height / 2);

      setZoom((z) => {
        const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        const ns = clamp(z.scale * factor, ZOOM_MIN, ZOOM_MAX);

        if (ns === 1) return { scale: 1, x: 0, y: 0 };

        const k = ns / z.scale;

        return {
          scale: ns,
          x: k * z.x + cx * (1 - k),
          y: k * z.y + cy * (1 - k),
        };
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => el.removeEventListener("wheel", onWheel);
  }, [lightboxIdx]);

  const onPointerDown = (e) => {
    if (!stageRef.current) return;

    setIsLightboxInteracting(true);
    stageRef.current.setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      pinch.current = { dist: dist(pts[0], pts[1]), scale: zoom.scale };
      pan.current = null;
      swipe.current = null;
    } else if (pointers.current.size === 1) {
      if (zoom.scale > 1) pan.current = { x: e.clientX, y: e.clientY };
      else swipe.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;

    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    const pts = [...pointers.current.values()];

    if (pts.length >= 2 && pinch.current) {
      const d = dist(pts[0], pts[1]);
      const ns = clamp(
        (pinch.current.scale * d) / pinch.current.dist,
        ZOOM_MIN,
        ZOOM_MAX,
      );

      setZoom((z) => {
        const k = ns / z.scale;

        return ns === 1
          ? { scale: 1, x: 0, y: 0 }
          : { scale: ns, x: k * z.x, y: k * z.y };
      });
    } else if (pts.length === 1 && pan.current && zoom.scale > 1) {
      const dx = e.clientX - pan.current.x;
      const dy = e.clientY - pan.current.y;

      pan.current = { x: e.clientX, y: e.clientY };

      setZoom((z) => ({ ...z, x: z.x + dx, y: z.y + dy }));
    }
  };

  const onPointerUp = (e) => {
    const wasSwipe = swipe.current;

    pointers.current.delete(e.pointerId);

    if (pointers.current.size < 2) {
      pinch.current = null;
    }

    if (pointers.current.size === 0) {
      setIsLightboxInteracting(false);

      pan.current = null;
      swipe.current = null;

      if (wasSwipe && zoom.scale === 1) {
        const dx = e.clientX - wasSwipe.x;

        if (dx > SWIPE_THRESHOLD) showPrevImage();
        else if (dx < -SWIPE_THRESHOLD) showNextImage();
      }

      setZoom((z) => (z.scale <= 1 ? { scale: 1, x: 0, y: 0 } : z));
    } else if (pointers.current.size === 1) {
      const p = [...pointers.current.values()][0];

      if (zoom.scale > 1) {
        pan.current = { x: p.x, y: p.y };
      }
    }
  };

  const onDoubleClick = (e) => {
    const el = stageRef.current;

    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = e.clientX - (rect.left + rect.width / 2);
    const cy = e.clientY - (rect.top + rect.height / 2);

    setZoom((z) => {
      if (z.scale > 1) return { scale: 1, x: 0, y: 0 };

      const ns = 2.5;
      const k = ns / 1;

      return {
        scale: ns,
        x: cx * (1 - k),
        y: cy * (1 - k),
      };
    });
  };

  if (!project) {
    return <NotFound subtitle="Ce projet n'existe pas, ou n'existe plus." />;
  }

  const projectDate = formatProjectDate(project.period);
  const descBlocks = getDescBlocks(project.longDesc);
  const currentImage = lightboxOpen ? images[lightboxIdx] : null;

  const imgInteract = (m) => ({
    onClick: () => openLightbox(m),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(m);
      }
    },
    role: "button",
    tabIndex: 0,
  });

  const renderSingle = (m) => {
    if (m.type === "image") {
      const ratio = ratios[m.url];
      const cover = ratio != null && ratio >= COVER_MIN_RATIO;

      return (
        <img
          src={m.url}
          alt={m.alt}
          className={`proj-slide-img ${cover ? "proj-slide-img--cover" : ""}`}
          loading="lazy"
          {...imgInteract(m)}
        />
      );
    }

    if (m.type === "video") {
      return (
        <video
          src={m.url}
          className="proj-slide-video"
          controls
          loop
          playsInline
          poster={m.poster || undefined}
        />
      );
    }

    return (
      <iframe
        src={m.url}
        title={project.title}
        className="proj-slide-iframe"
        allow="autoplay; fullscreen"
      />
    );
  };

  const renderCell = (m) => (
    <div
      className="proj-slide-cell"
      key={m.url}
      style={{ flex: `${ratios[m.url] || 1} 1 0` }}
    >
      <img
        src={m.url}
        alt={m.alt}
        className="proj-slide-cell-img"
        loading="lazy"
        {...imgInteract(m)}
      />
    </div>
  );

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

          {slides.length > 0 && (
            <div className="proj-carousel">
              <div
                className="proj-carousel-rail"
                ref={railRef}
                onScroll={onRailScroll}
              >
                {slides.map((slide, i) => (
                  <div
                    className={`proj-slide ${
                      slide.items.length > 1 ? "proj-slide--multi" : ""
                    }`}
                    key={i}
                  >
                    {slide.items.length > 1
                      ? slide.items.map(renderCell)
                      : renderSingle(slide.items[0])}
                  </div>
                ))}
              </div>

              {slides.length > 1 && (
                <>
                  <button
                    className="proj-carousel-btn proj-carousel-btn--prev"
                    onClick={() => goToSlide(Math.max(0, slideIdx - 1))}
                    disabled={slideIdx === 0}
                    aria-label="Slide précédente"
                  >
                    <IconArrowLeft className="proj-carousel-icon" />
                  </button>

                  <button
                    className="proj-carousel-btn proj-carousel-btn--next"
                    onClick={() =>
                      goToSlide(Math.min(slides.length - 1, slideIdx + 1))
                    }
                    disabled={slideIdx === slides.length - 1}
                    aria-label="Slide suivante"
                  >
                    <IconArrowRight className="proj-carousel-icon" />
                  </button>

                  <div className="proj-progress" role="tablist">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        role="tab"
                        aria-selected={i === slideIdx}
                        className={`proj-progress-segment ${
                          i === slideIdx ? "proj-progress-segment--active" : ""
                        }`}
                        onClick={() => goToSlide(i)}
                      />
                    ))}
                  </div>
                </>
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

            {descBlocks.length > 0 && (
              <div className="proj-long-desc">
                {descBlocks.map((block, index) => (
                  <div className="proj-desc-block" key={block.label || index}>
                    {block.label && (
                      <h3 className="proj-desc-block-title">{block.label}</h3>
                    )}
                    <p>{block.text}</p>
                  </div>
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

          {project.codeSnippet?.code && (
            <section className="proj-section">
              <p className="section-label">Extrait</p>

              <div className="proj-code-window">
                <div className="proj-code-topbar">
                  <div className="proj-code-dots" aria-hidden="true">
                    <span className="proj-code-dot proj-code-dot--red" />
                    <span className="proj-code-dot proj-code-dot--yellow" />
                    <span className="proj-code-dot proj-code-dot--green" />
                  </div>

                  {(project.codeSnippet.filename ||
                    project.codeSnippet.language) && (
                    <div className="proj-code-title">
                      {project.codeSnippet.filename ||
                        project.codeSnippet.language}
                    </div>
                  )}
                </div>

                <pre className="proj-code-block">
                  <code className="proj-code">
                    {project.codeSnippet.code.split("\n").map((line, index) => {
                      const lineNumber = index + 1;
                      const highlighted =
                        project.codeSnippet.highlightLines?.includes(
                          lineNumber,
                        );

                      return (
                        <span
                          key={lineNumber}
                          className={`proj-code-line ${
                            highlighted ? "proj-code-line--highlighted" : ""
                          }`}
                        >
                          <span className="proj-code-line-number">
                            {lineNumber}
                          </span>
                          <span className="proj-code-line-content">
                            {line || " "}
                          </span>
                        </span>
                      );
                    })}
                  </code>
                </pre>
              </div>
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

      {lightboxOpen && currentImage && (
        <div
          className="proj-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          <button
            className="proj-lightbox-close"
            type="button"
            onClick={closeLightbox}
            aria-label="Fermer le plein écran"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                className="proj-lightbox-btn proj-lightbox-btn--prev"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
                aria-label="Image précédente"
              >
                <IconArrowLeft className="proj-lightbox-icon" />
              </button>

              <button
                className="proj-lightbox-btn proj-lightbox-btn--next"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
                aria-label="Image suivante"
              >
                <IconArrowRight className="proj-lightbox-icon" />
              </button>
            </>
          )}

          <div
            className="proj-lightbox-stage"
            ref={stageRef}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={onDoubleClick}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              src={currentImage.url}
              alt={currentImage.alt}
              className={`proj-lightbox-img ${
                zoom.scale > 1 ? "proj-lightbox-img--zoomed" : ""
              }`}
              draggable={false}
              style={{
                transform: `translate(${zoom.x}px, ${zoom.y}px) scale(${zoom.scale})`,
                transition: isLightboxInteracting
                  ? "none"
                  : "transform 120ms ease-out",
              }}
            />
          </div>

          {images.length > 1 && (
            <div className="proj-lightbox-counter">
              {lightboxIdx + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
