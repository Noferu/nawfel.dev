import { useCallback } from 'react'

export function useCursorGlow() {
  const bind = useCallback((ref) => {
    if (!ref) return

    const orb = ref.querySelector('.glow-orb')
    if (!orb) return

    const onMove = (e) => {
      const rect = ref.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      orb.style.left = `${x}px`
      orb.style.top  = `${y}px`
    }

    ref.addEventListener('mousemove', onMove)
    return () => ref.removeEventListener('mousemove', onMove)
  }, [])

  return bind
}
