import { useEffect, useRef } from 'react'

const LIGHTS = [
  { x: '15%',  y: '20%',  color: 'rgba(78,2,1,0.35)',      size: 500, dur: 18 },
  { x: '75%',  y: '60%',  color: 'rgba(161,92,33,0.2)',     size: 400, dur: 24 },
  { x: '50%',  y: '85%',  color: 'rgba(212,138,57,0.15)',   size: 350, dur: 20 },
  { x: '85%',  y: '15%',  color: 'rgba(78,2,1,0.25)',       size: 450, dur: 28 },
]

export default function Background() {
  const canvasRef = useRef(null)
  const offsetRef = useRef(0)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const GRID  = 100
    const ANGLE = (10 * Math.PI) / 180
    const GAP   = 25

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      // Centre, rotation, puis translation infinie
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(ANGLE)
      ctx.translate(-(canvas.width / 2), -(canvas.height / 2))

      const off = offsetRef.current % GRID
      const ext = Math.max(canvas.width, canvas.height) * 1.5
      const startX = -ext + off
      const startY = -ext

      ctx.strokeStyle = 'rgba(251,195,115,0.06)'
      ctx.lineWidth   = 1

      // Lignes verticales avec trou
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        // Segment du haut
        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x, canvas.height / 2 - GAP)
        ctx.stroke()
        // Segment du bas
        ctx.beginPath()
        ctx.moveTo(x, canvas.height / 2 + GAP)
        ctx.lineTo(x, canvas.height + ext)
        ctx.stroke()
      }

      // Lignes horizontales avec trou
      for (let y = startY; y < canvas.height + ext; y += GRID) {
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(canvas.width / 2 - GAP, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2 + GAP, y)
        ctx.lineTo(canvas.width + ext, y)
        ctx.stroke()
      }

      // Points aux croisements
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        for (let y = startY; y < canvas.height + ext; y += GRID) {
          ctx.beginPath()
          ctx.arc(x, y, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(251,195,115,0.2)'
          ctx.fill()
        }
      }

      ctx.restore()

      offsetRef.current -= 0.3
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div style={styles.wrapper}>
      {/* Canvas grille */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Soft lights */}
      {LIGHTS.map((l, i) => (
        <div
          key={i}
          style={{
            ...styles.light,
            left:     l.x,
            top:      l.y,
            width:    l.size,
            height:   l.size,
            background: `radial-gradient(circle, ${l.color} 0%, transparent 70%)`,
            animationDuration: `${l.dur}s`,
            animationDelay:    `${i * -4}s`,
          }}
        />
      ))}
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
  canvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  light: {
    position: 'absolute',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'lightFloat linear infinite',
    willChange: 'transform',
  },
}
