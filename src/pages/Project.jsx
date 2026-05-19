import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Project() {
  const { slug } = useParams()
  const navigate  = useNavigate()
  const project   = projects.find(p => p.slug === slug)

  if (!project) {
    return (
      <div className="page" style={styles.notFound}>
        <p style={styles.nfCode}>404</p>
        <p style={styles.nfMsg}>Projet introuvable.</p>
        <button className="btn-secondary" onClick={() => navigate('/projects')}>
          ← Retour aux projets
        </button>
      </div>
    )
  }

  const idx      = projects.filter(p => p.category === 'info').findIndex(p => p.slug === slug)
  const infoList = projects.filter(p => p.category === 'info')
  const prev     = infoList[idx - 1]
  const next     = infoList[idx + 1]

  return (
    <div className="page" style={styles.page}>
      <div className="container">

        {/* ── Nav ── */}
        <div style={styles.nav}>
          <button style={styles.backBtn} onClick={() => navigate(-1)}>
            ← Retour
          </button>
          <div style={styles.siblings}>
            {prev && (
              <button style={styles.sibBtn} onClick={() => navigate(`/project/${prev.slug}`)}>
                ← {prev.title}
              </button>
            )}
            {next && (
              <button style={styles.sibBtn} onClick={() => navigate(`/project/${next.slug}`)}>
                {next.title} →
              </button>
            )}
          </div>
        </div>

        {/* ── Header ── */}
        <header style={styles.header}>
          <div style={styles.meta}>
            <span style={styles.year}>{project.year}</span>
            {project.featured && <span style={styles.featuredBadge}>★ Featured</span>}
            <span style={styles.category}>{project.category === 'bonus' ? 'Projet créatif' : 'Projet technique'}</span>
          </div>

          <h1 style={styles.title}>{project.title}</h1>

          <div style={styles.tags}>
            {project.tags.map(tag => (
              <span key={tag} style={styles.tag}>{tag}</span>
            ))}
          </div>
        </header>

        {/* ── Hero visuel ── */}
        {project.hero && (
          <div style={styles.heroBlock}>
            {project.hero.type === 'image' && (
              <img src={project.hero.url} alt={project.hero.alt || project.title} style={styles.heroImg} />
            )}
            {(project.hero.type === 'video' || project.hero.type === 'iframe') && (
              <iframe
                src={project.hero.url}
                title={project.title}
                style={styles.heroIframe}
                allow="autoplay; fullscreen"
                frameBorder="0"
              />
            )}
          </div>
        )}

        {/* ── Corps ── */}
        <div style={styles.body}>

          {/* Description */}
          <div style={styles.section}>
            <p className="section-label">Contexte</p>
            <p style={styles.longDesc}>{project.longDesc}</p>

            <div style={styles.infoGrid}>
              {project.context && (
                <div style={styles.infoRow}>
                  <span style={styles.infoKey}>Contexte</span>
                  <span style={styles.infoVal}>{project.context}</span>
                </div>
              )}
              {project.role && (
                <div style={styles.infoRow}>
                  <span style={styles.infoKey}>Rôle</span>
                  <span style={styles.infoVal}>{project.role}</span>
                </div>
              )}
              {project.stack && (
                <div style={styles.infoRow}>
                  <span style={styles.infoKey}>Stack</span>
                  <span style={styles.infoVal}>{project.stack.join(' · ')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Extrait de code */}
          {project.codeSnippet && (
            <div style={styles.section}>
              <p className="section-label">Extrait</p>
              <pre style={styles.pre}>
                <code style={styles.code}>{project.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Galerie */}
          {project.media?.length > 0 && (
            <div style={styles.section}>
              <p className="section-label">Médias</p>
              <div style={styles.mediaGrid}>
                {project.media.map((m, i) => (
                  <img key={i} src={m.url} alt={m.alt || ''} style={styles.mediaImg} />
                ))}
              </div>
            </div>
          )}

          {/* Liens */}
          {project.links?.length > 0 && (
            <div style={styles.section}>
              <p className="section-label">Liens</p>
              <div style={styles.linksRow}>
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    paddingBottom: '6rem',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    minHeight: '80vh',
    textAlign: 'center',
  },
  nfCode: {
    fontFamily: 'var(--font-display)',
    fontSize: '4rem',
    fontWeight: 800,
    color: 'rgba(251,195,115,0.15)',
    letterSpacing: '-0.04em',
  },
  nfMsg: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem 0',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  backBtn: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--text-muted)',
    background: 'none',
    border: '1px solid var(--border)',
    padding: '0.4rem 0.9rem',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all var(--t-fast)',
    letterSpacing: '0.02em',
  },
  siblings: {
    display: 'flex',
    gap: '0.5rem',
  },
  sibBtn: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    color: 'var(--text-dim)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    transition: 'color var(--t-fast)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBottom: '2.5rem',
    borderBottom: '1px solid rgba(251,195,115,0.08)',
    marginBottom: '3rem',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  year: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    color: 'var(--text-dim)',
    letterSpacing: '0.08em',
  },
  featuredBadge: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    color: 'var(--gold-light)',
    background: 'rgba(251,195,115,0.08)',
    border: '1px solid rgba(251,195,115,0.2)',
    padding: '0.15rem 0.5rem',
    borderRadius: '999px',
    letterSpacing: '0.06em',
  },
  category: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    color: 'var(--text-dim)',
    letterSpacing: '0.06em',
  },
  title: {
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    color: 'var(--text)',
    letterSpacing: '-0.03em',
    lineHeight: 1.1,
  },
  tags: {
    display: 'flex',
    gap: '0.4rem',
    flexWrap: 'wrap',
  },
  tag: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    fontWeight: 500,
    color: 'var(--amber)',
    background: 'rgba(212,138,57,0.08)',
    border: '1px solid rgba(212,138,57,0.18)',
    padding: '0.2rem 0.55rem',
    borderRadius: '4px',
    letterSpacing: '0.03em',
  },
  heroBlock: {
    width: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid rgba(251,195,115,0.1)',
    marginBottom: '3rem',
  },
  heroImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  heroIframe: {
    width: '100%',
    height: 480,
    border: 'none',
    display: 'block',
    background: '#000',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    maxWidth: 780,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  longDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'var(--text-muted)',
    lineHeight: 1.85,
    fontWeight: 300,
  },
  infoGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0',
    marginTop: '0.5rem',
    border: '1px solid rgba(251,195,115,0.08)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  infoRow: {
    display: 'flex',
    gap: '1.5rem',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(251,195,115,0.06)',
  },
  infoKey: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.65rem',
    fontWeight: 600,
    color: 'var(--text-dim)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    width: 80,
    flexShrink: 0,
    paddingTop: '0.1rem',
  },
  infoVal: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    lineHeight: 1.6,
  },
  pre: {
    background: 'rgba(251,195,115,0.03)',
    border: '1px solid rgba(251,195,115,0.1)',
    borderRadius: '8px',
    padding: '1.5rem',
    overflowX: 'auto',
  },
  code: {
    fontFamily: "'DM Mono', 'Fira Code', monospace",
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    lineHeight: 1.8,
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '0.75rem',
  },
  mediaImg: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid rgba(251,195,115,0.08)',
  },
  linksRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
}
