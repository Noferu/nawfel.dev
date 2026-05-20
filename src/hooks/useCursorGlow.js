import { useCallback } from 'react'

export function useCursorGlow() {
  const bind = useCallback((ref) => {
    if (!ref) return

    const orb = ref.querySelector('.glow-orb')
    if (!orb) return

    const onMove = (e) => {
      const rect    = ref.getBoundingClientRect()
      orb.style.left = `${e.clientX - rect.left}px`
      orb.style.top  = `${e.clientY - rect.top}px`
    }

    ref.addEventListener('mousemove', onMove)
    return () => ref.removeEventListener('mousemove', onMove)
  }, [])

  return bind
}
