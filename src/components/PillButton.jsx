/**
 * Displays a reusable pill-shaped button or link.
 *
 * The component renders an anchor when href is provided, otherwise it renders
 * a button. It can also display an optional badge next to the main content.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Main button or link content.
 * @param {React.ReactNode} [props.badge] - Optional badge displayed on the right.
 * @param {Function} [props.onClick] - Click handler used when rendering a button.
 * @param {string} [props.href] - Link URL. When provided, the component renders an anchor.
 * @param {string} [props.target] - Optional anchor target.
 * @param {string} [props.rel] - Optional anchor rel attribute.
 * @param {boolean|string} [props.download] - Optional anchor download attribute.
 * @returns {JSX.Element} Rendered pill button or link.
 */
export default function PillButton({
  children,
  badge,
  onClick,
  href,
  target,
  rel,
  download,
  ...props
}) {
  const className = `pill-btn${props.className ? " " + props.className : ""}`;

  const content = (
    <>
      {children}
      {badge != null && <span className="pill-btn-badge">{badge}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={className}
        target={target}
        rel={rel}
        download={download}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={className} {...props}>
      {content}
    </button>
  );
}
