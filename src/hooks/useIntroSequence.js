/**
 * useIntroSequence
 *
 * Orchestre la séquence d'allumage du site au premier chargement de la page d'accueil.
 * Utilise sessionStorage pour ne jouer l'animation qu'une seule fois par session.
 *
 * Retourne { isIntro, backgroundRef, headerRef, heroPartsRef }
 *   - isIntro       : true si la séquence doit jouer (caché par défaut le temps du boot)
 *   - backgroundRef : ref à passer à Background
 *   - headerRef     : ref à passer à Header (wrapper)
 *   - heroPartsRef  : callback ref — appeler heroPartsRef(el) sur chaque bloc du Hero
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

const SESSION_KEY = 'intro_played'

export function useIntroSequence() {
  // true = on doit jouer l'intro (premier chargement de session)
  const [isIntro] = useState(() => !sessionStorage.getItem(SESSION_KEY))

  const backgroundRef = useRef(null)
  const headerRef     = useRef(null)
  const heroParts     = useRef([])

  // Callback ref pour collecter les blocs du Hero dans l'ordre du DOM
  const heroPartsRef = useCallback((el) => {
    if (el && !heroParts.current.includes(el)) {
      heroParts.current.push(el)
    }
  }, [])

  useEffect(() => {
    if (!isIntro) return

    // Marque la session pour ne plus rejouer
    sessionStorage.setItem(SESSION_KEY, '1')

    const bg     = backgroundRef.current
    const header = headerRef.current
    const parts  = heroParts.current

    // État initial : tout invisible
    if (bg)     gsap.set(bg,     { opacity: 0 })
    if (header) gsap.set(header, { opacity: 0, y: -16 })
    if (parts.length) {
      gsap.set(parts, { opacity: 0, y: 22, filter: 'blur(8px)' })
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    // 1. Background : fondu lent depuis le noir, comme un écran qui s'allume
    if (bg) {
      tl.to(bg, { opacity: 1, duration: 1.6, ease: 'power1.inOut' }, 0)
    }

    // 2. Header : glisse du haut, léger décalage
    if (header) {
      tl.to(header, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.9)
    }

    // 3. Blocs Hero : cascade staggerée, chaque bloc entre 120ms après le précédent
    if (parts.length) {
      tl.to(
        parts,
        {
          opacity:  1,
          y:        0,
          filter:   'blur(0px)',
          duration: 0.75,
          stagger:  0.12,
          ease:     'power2.out',
          clearProps: 'filter',
        },
        1.05   // démarre légèrement après le header
      )
    }

    return () => tl.kill()
  }, [isIntro])

  return { isIntro, backgroundRef, headerRef, heroPartsRef }
}
