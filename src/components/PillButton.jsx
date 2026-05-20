/**
 * PillButton — bouton outline réutilisable
 * Style cohérent avec les boutons de section (Voir les projets, Voir le CV, Télécharger le CV)
 *
 * Props :
 *   - onClick       : handler click (optionnel si href)
 *   - href          : lien (rend un <a>) (optionnel)
 *   - badge         : contenu badge à droite (optionnel)
 *   - target        : _blank etc. (optionnel, pour href)
 *   - children      : label du bouton
 */
export default function PillButton({ children, badge, onClick, href, target, rel, download, ...props }) {
  const className = `pill-btn${props.className ? ' ' + props.className : ''}`
  const content = (
    <>
      {children}
      {badge != null && <span className="pill-btn-badge">{badge}</span>}
    </>
  )

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
    )
  }

  return (
    <button onClick={onClick} className={className} {...props}>
      {content}
    </button>
  )
}
