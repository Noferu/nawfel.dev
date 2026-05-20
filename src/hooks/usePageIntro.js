/**
 * usePageIntro.js
 *
 * Hook d'orchestration de l'animation d'entrée de la page d'accueil.
 * Utilise sessionStorage pour ne jouer l'animation complète qu'à la
 * toute première visite de la session (rechargement = abrégé).
 *
 * Actes :
 *   0 → 400ms   : écran noir / silence
 *   400ms       : background canvas + soft lights fade-in (lent, 1.8s)
 *   700ms       : header island glisse du haut (blur → net)
 *   900ms       : photo + halo révélation
 *  1100ms       : h1 ligne par ligne (stagger 120ms)
 *  1400ms       : description, pills sociales, stats
 *  1700ms       : CTAs
 *  2000ms       : ligne de séparation → sections inférieures
 *
 * Usage :
 *   const { isFirstVisit } = usePageIntro()
 *
 * Les éléments sont ciblés par data-intro="xxx" pour ne pas coupler
 * aux classes utilitaires existantes.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const SESSION_KEY = 'portfolio_intro_played'

export function usePageIntro() {
  const isFirstVisit = !sessionStorage.getItem(SESSION_KEY)
  const tlRef = useRef(null)

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, '1')

    // Délai de base selon première visite ou non
    const base = isFirstVisit ? 0 : 0

    // Masquer tous les éléments intro AVANT que le DOM soit visible
    const els = document.querySelectorAll('[data-intro]')
    gsap.set(els, { autoAlpha: 0 })

    // Éléments spécifiques
    const bg      = document.querySelector('[data-intro="bg"]')
    const header  = document.querySelector('[data-intro="header"]')
    const photo   = document.querySelector('[data-intro="photo"]')
    const halo    = document.querySelector('[data-intro="halo"]')
    const h1Words = document.querySelectorAll('[data-intro="h1-word"]')
    const desc    = document.querySelector('[data-intro="desc"]')
    const ctas    = document.querySelector('[data-intro="ctas"]')
    const pills   = document.querySelector('[data-intro="pills"]')
    const divider = document.querySelector('[data-intro="divider"]')
    const sections = document.querySelectorAll('[data-intro="section"]')

    const tl = gsap.timeline({ delay: base })
    tlRef.current = tl

    if (isFirstVisit) {
      // ── ACTE 1 : Background s'allume (fondu lent, comme un écran CRT) ──
      tl.to(bg, {
        autoAlpha: 1,
        duration: 2.2,
        ease: 'power1.inOut',
      }, 0.35)

      // Légère pulsation du background au début (scale depuis 0.97)
      if (bg) {
        gsap.fromTo(bg,
          { scale: 0.98, filter: 'brightness(0)' },
          { scale: 1, filter: 'brightness(1)', duration: 2.5, ease: 'power2.out', delay: 0.35 }
        )
      }

      // ── ACTE 2 : Header glisse du haut avec blur ──
      tl.fromTo(header,
        { autoAlpha: 0, y: -24, filter: 'blur(8px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', clearProps: 'filter' },
        0.7
      )

      // ── ACTE 3 : Photo + halo ──
      tl.fromTo(photo,
        { autoAlpha: 0, scale: 0.88, filter: 'blur(16px)' },
        { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', clearProps: 'filter' },
        0.9
      )
      tl.fromTo(halo,
        { autoAlpha: 0, scale: 0.6 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'expo.out' },
        1.0
      )

      // ── ACTE 4 : H1 mot par mot ──
      if (h1Words.length) {
        tl.fromTo(h1Words,
          { autoAlpha: 0, y: 18, filter: 'blur(6px)' },
          {
            autoAlpha: 1, y: 0, filter: 'blur(0px)',
            duration: 0.75,
            stagger: 0.10,
            ease: 'power3.out',
            clearProps: 'filter',
          },
          1.1
        )
      }

      // ── ACTE 5 : Description ──
      tl.fromTo(desc,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        1.45
      )

      // ── ACTE 6 : CTAs ──
      tl.fromTo(ctas,
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.65
      )

      // ── ACTE 7 : Pills + stats ──
      tl.fromTo(pills,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        1.8
      )

      // ── ACTE 8 : Divider + sections (wipe horizontal) ──
      tl.fromTo(divider,
        { autoAlpha: 0, scaleX: 0 },
        { autoAlpha: 1, scaleX: 1, duration: 0.8, ease: 'power2.inOut', transformOrigin: 'left center' },
        2.0
      )

      tl.fromTo(sections,
        { autoAlpha: 0, y: 24, filter: 'blur(8px)' },
        {
          autoAlpha: 1, y: 0, filter: 'blur(0px)',
          duration: 0.85,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'filter',
        },
        2.15
      )

    } else {
      // ── VERSION ABRÉGÉE (retour sur la page) ── plus rapide mais toujours fluide
      tl.to([bg, header], { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }, 0)

      tl.fromTo([photo, halo],
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        0.1
      )

      tl.fromTo(h1Words,
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
        0.2
      )

      tl.fromTo([desc, ctas, pills],
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
        0.35
      )

      tl.to([divider, ...sections],
        { autoAlpha: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
        0.45
      )
    }

    return () => { tl.kill() }
  }, []) // eslint-disable-line

  return { isFirstVisit }
}
