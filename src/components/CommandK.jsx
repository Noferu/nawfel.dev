import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

const SECTIONS = [
  { label: 'Accueil',   action: 'scroll', target: 'hero'    },
  { label: 'Projets',   action: 'scroll', target: 'projets' },
  { label: 'Contact',   action: 'scroll', target: 'contact' },
  { label: 'CV',        action: 'route',  target: '/cv'     },
]

const LINKS = [
  { label: 'GitHub',   url: 'https://github.com/Noferu',                    icon: '⌥' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/nawfel-ida-ali',        icon: '⌥' },
  { label: 'Linktree', url: 'https://linktr.ee/nawfel.idaali',               icon: '⌥' },
  { label: 'Email',    url: 'mailto:nawfel.idaali.pro@gmail.com',            icon: '✉' },
]

export default function CommandK({ open, onClose }) {
  const [query, setQuery]       = useState('')
  const [selected, setSelected] = useState(0)
  const navigate                = useNavigate()
  const inputRef                = useRef(null)

  // Filtre les items selon la query
  const projectItems = projects.map(p => ({
    label: p.title,
    sublabel: p.tags.slice(0, 3).join(', '),
    action: 'route',
    target: `/project/${p.slug}`,
    group: 'Projets',
  }))

  const sectionItems = SECTIONS.map(s => ({ ...s, group: 'Navigation', sublabel: null }))
  const linkItems    = LINKS.map(l => ({ label: l.label, url: l.url, action: 'link', group: 'Liens', sublabel: null }))

  const allItems = [...sectionItems, ...projectItems, ...linkItems]

  const filtered = query.trim()
    ? allItems.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelected(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1))
      if (e.key === 'ArrowUp')   setSelected(s => Math.max(s - 1, 0))
      if (e.key === 'Enter')     execute(filtered[selected])
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected])

  const execute = (item) => {
    if (!item) return
    if (item.action === 'route')  { navigate(item.target); onClose() }
    if (item.action === 'scroll') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(item.target)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      onClose()
    }
    if (item.action === 'link') { window.open(item.url, '_blank'); onClose() }
  }

  if (!open) return null

  // Groupement
  const groups = {}
  filtered.forEach(item => {
    if (!groups[item.group]) groups[item.group] = []
    groups[item.group].push(item)
  })

  let globalIdx = 0

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.panel} onClick={e => e.stopPropagation()}>

        {/* Input */}
        <div style={styles.inputRow}>
          <span style={styles.searchIcon}>⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Rechercher un projet, une section..."
            style={styles.input}
          />
          <kbd style={styles.esc}>Esc</kbd>
        </div>

        <div style={styles.divider} />

        {/* Résultats */}
        <div style={styles.results}>
          {Object.entries(groups).map(([group, items]) => (
            <div key={group}>
              <p style={styles.groupLabel}>{group}</p>
              {items.map(item => {
                const idx = globalIdx++
                const isSelected = idx === selected
                return (
                  <button
                    key={idx}
                    style={{ ...styles.item, ...(isSelected ? styles.itemSelected : {}) }}
                    onClick={() => execute(item)}
                    onMouseEnter={() => setSelected(idx)}
                  >
                    <span style={styles.itemLabel}>{item.label}</span>
                    {item.sublabel && <span style={styles.itemSub}>{item.sublabel}</span>}
                    <span style={styles.itemArrow}>→</span>
                  </button>
                )
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p style={styles.empty}>Aucun résultat pour "{query}"</p>
          )}
        </div>

        <div style={styles.footer}>
          <span style={styles.footerHint}><kbd style={styles.kbd}>↑↓</kbd> naviguer</span>
          <span style={styles.footerHint}><kbd style={styles.kbd}>↵</kbd> ouvrir</span>
          <span style={styles.footerHint}><kbd style={styles.kbd}>Esc</kbd> fermer</span>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 'var(--z-modal)',
    background: 'rgba(14,3,1,0.7)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
    animation: 'fadeIn 150ms ease',
  },
  panel: {
    width: '100%',
    maxWidth: 580,
    background: 'rgba(20,6,4,0.95)',
    border: '1px solid rgba(251,195,115,0.15)',
    borderRadius: '16px',
    boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
    overflow: 'hidden',
    animation: 'fadeUp 200ms cubic-bezier(0.16,1,0.3,1)',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.25rem',
  },
  searchIcon: {
    fontSize: '1.1rem',
    color: 'var(--text-muted)',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: 'var(--text)',
    '::placeholder': { color: 'var(--text-dim)' },
  },
  esc: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    color: 'var(--text-dim)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '0.15rem 0.4rem',
    borderRadius: '4px',
    flexShrink: 0,
  },
  divider: {
    height: 1,
    background: 'rgba(251,195,115,0.08)',
  },
  results: {
    maxHeight: 360,
    overflowY: 'auto',
    padding: '0.5rem',
  },
  groupLabel: {
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--text-dim)',
    padding: '0.5rem 0.75rem 0.25rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.55rem 0.75rem',
    borderRadius: '8px',
    transition: 'background var(--t-fast)',
    textAlign: 'left',
  },
  itemSelected: {
    background: 'rgba(251,195,115,0.08)',
  },
  itemLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--text)',
    flex: 1,
  },
  itemSub: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'var(--text-dim)',
  },
  itemArrow: {
    color: 'var(--text-dim)',
    fontSize: '0.75rem',
    opacity: 0,
  },
  empty: {
    textAlign: 'center',
    padding: '2rem',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--text-dim)',
  },
  footer: {
    display: 'flex',
    gap: '1rem',
    padding: '0.65rem 1.25rem',
    borderTop: '1px solid rgba(251,195,115,0.08)',
  },
  footerHint: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    fontFamily: 'var(--font-display)',
    fontSize: '0.6rem',
    color: 'var(--text-dim)',
  },
  kbd: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '4px',
    padding: '0.1rem 0.35rem',
    fontSize: '0.6rem',
    color: 'var(--text-muted)',
  },
}
