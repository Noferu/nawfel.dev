import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { speed = 80, deleteSpeed = 40, pause = 1800 } = {}) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [phase,   setPhase]   = useState('typing') // 'typing' | 'pausing' | 'deleting'
  const charIdx = useRef(0)

  useEffect(() => {
    const word = words[wordIdx]

    if (phase === 'typing') {
      if (charIdx.current >= word.length) { setPhase('pausing'); return }
      const t = setTimeout(() => {
        setDisplay(word.slice(0, charIdx.current + 1))
        charIdx.current++
      }, speed)
      return () => clearTimeout(t)
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), pause)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (charIdx.current <= 0) {
        setWordIdx(i => (i + 1) % words.length)
        setPhase('typing')
        return
      }
      const t = setTimeout(() => {
        charIdx.current--
        setDisplay(word.slice(0, charIdx.current))
      }, deleteSpeed)
      return () => clearTimeout(t)
    }
  }, [phase, display, wordIdx, words, speed, deleteSpeed, pause])

  return display
}
