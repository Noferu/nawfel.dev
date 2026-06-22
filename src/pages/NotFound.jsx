import { Link } from "react-router-dom";
import "../styles/notfound.css";

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

export default function NotFound({
  subtitle = "Cette page n'existe pas, ou n'existe plus.",
}) {
  return (
    <main className="nf-scene">
      <h1 className="nf-title">
        4<span className="nf-title-accent">0</span>4
      </h1>

      <p className="nf-subtitle">{subtitle}</p>

      <div className="nf-divider" aria-hidden="true" />

      <Link to="/" className="nf-link">
        <IconArrowLeft className="nf-link-arrow" />
        Retour à l'accueil
      </Link>
    </main>
  );
}