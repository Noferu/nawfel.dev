import ProjectCard from "./ProjectCard";
import { projects } from "../data/projects";
import { useInfiniteSlider } from "../hooks/useInfiniteSlider";

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