import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useInfiniteSlider } from "../hooks/useInfiniteSlider";

/**
 * Converts a project period into a sortable numeric value.
 *
 * Supported formats include MM/YYYY, YYYY-MM, plain years, and arrays of dates.
 *
 * @param {string|string[]} period - Project period value.
 * @returns {number} Sort value based on year and month.
 */
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

/**
 * Sorts projects from newest to oldest.
 *
 * @param {Object} a - First project.
 * @param {Object} b - Second project.
 * @returns {number} Sort comparison result.
 */
const sortByPeriodDesc = (a, b) =>
  getPeriodSortValue(b.period) - getPeriodSortValue(a.period);

const featured = projects
  .filter((project) => project.featured)
  .sort(sortByPeriodDesc);
const secondary = projects
  .filter((project) => !project.featured)
  .sort(sortByPeriodDesc);

/**
 * Repeated project lists used by the infinite slider.
 */
const tripledFeatured = [...featured, ...featured, ...featured];
const tripledSecondary = [...secondary, ...secondary, ...secondary];

/**
 * Displays the projects section with two infinite sliders.
 *
 * Featured projects are displayed in the first row. Secondary projects are
 * displayed in the second row. Both rows can be dragged and auto-scroll.
 *
 * @returns {JSX.Element} Rendered projects section.
 */
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
