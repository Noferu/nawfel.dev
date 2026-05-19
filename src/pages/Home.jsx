import Hero      from '../components/Hero'
import Projects  from '../components/Projects'
import CVSnippet from '../components/CVSnippet'
import Contact   from '../components/Contact'

export default function Home() {
  return (
    <main style={styles.main}>
      <Hero />

      <div style={styles.divider} />
      <Projects />

      <div style={styles.divider} />
      <CVSnippet />

      <div style={styles.divider} />
      <Contact />

      {/* Footer */}
      <footer style={styles.footer}>
        <div className="container" style={styles.footerInner}>
          <div style={styles.footerTop}>
            <span style={styles.footerCopy}>© 2026 Nawfel Ida-Ali</span>
            <div style={styles.footerLinks}>
              {[
                { label: 'GitHub',   href: 'https://github.com/Noferu' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/nawfel-ida-ali' },
                { label: 'Linktree', href: 'https://linktr.ee/nawfel.idaali' },
              ].map(l => (
                <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={styles.footerLink}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nom en grand */}
          <div style={styles.footerName}>
            <span style={styles.footerNameText}>NAWFEL IDA-ALI</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

const styles = {
  main: {
    position: 'relative',
    zIndex: 1,
  },
  divider: {
    height: 1,
    background: 'linear-gradient(to right, transparent, rgba(251,195,115,0.08), transparent)',
    margin: '0 2rem',
  },
  footer: {
    borderTop: '1px solid rgba(251,195,115,0.06)',
    marginTop: 'var(--sp-xl)',
  },
  footerInner: {
    paddingTop: '2rem',
    paddingBottom: '2rem',
  },
  footerTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  footerCopy: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--text-dim)',
  },
  footerLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  footerLink: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.75rem',
    color: 'var(--text-dim)',
    transition: 'color var(--t-fast)',
  },
  footerName: {
    overflow: 'hidden',
  },
  footerNameText: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem, 10vw, 8rem)',
    fontWeight: 800,
    color: 'transparent',
    WebkitTextStroke: '1px rgba(251,195,115,0.12)',
    letterSpacing: '-0.03em',
    lineHeight: 0.9,
    display: 'block',
    userSelect: 'none',
  },
}
