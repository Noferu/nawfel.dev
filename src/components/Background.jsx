import { useEffect, useRef } from 'react'

const LIGHTS = [
  { x: '12%',  y: '18%',  color: 'rgba(78,2,1,0.65)',      size: 550, dur: 18 },
  { x: '78%',  y: '62%',  color: 'rgba(161,92,33,0.45)',    size: 480, dur: 24 },
  { x: '48%',  y: '88%',  color: 'rgba(212,138,57,0.35)',   size: 420, dur: 20 },
  { x: '85%',  y: '14%',  color: 'rgba(78,2,1,0.50)',       size: 500, dur: 28 },
  { x: '30%',  y: '55%',  color: 'rgba(161,92,33,0.25)',    size: 360, dur: 22 },
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

    const GRID      = 100
    const ANGLE     = (10 * Math.PI) / 180
    const MASK_R    = 5    // rayon du masque circulaire autour de chaque point
    const DOT_R     = 1.5  // rayon du point visible

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(ANGLE)
      ctx.translate(-canvas.width / 2, -canvas.height / 2)

      const off  = offsetRef.current % GRID
      const ext  = Math.max(canvas.width, canvas.height) * 1.5
      const startX = -ext + off
      const startY = -ext

      // ── Lignes ──
      ctx.strokeStyle = 'rgba(251,195,115,0.055)'
      ctx.lineWidth   = 1

      for (let x = startX; x < canvas.width + ext; x += GRID) {
        ctx.beginPath()
        ctx.moveTo(x, startY)
        ctx.lineTo(x, canvas.height + ext)
        ctx.stroke()
      }

      for (let y = startY; y < canvas.height + ext; y += GRID) {
        ctx.beginPath()
        ctx.moveTo(startX, y)
        ctx.lineTo(canvas.width + ext, y)
        ctx.stroke()
      }

      // ── Points avec masque circulaire ──
      // Le masque "coupe" les lignes autour du point pour faire ressortir le dot
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        for (let y = startY; y < canvas.height + ext; y += GRID) {
          // Masque (background color) pour effacer les lignes autour du point
          ctx.beginPath()
          ctx.arc(x, y, MASK_R, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(14,3,1,0.92)'
          ctx.fill()

          // Point lumineux
          ctx.beginPath()
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(251,195,115,0.22)'
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
    <div className="bg-wrapper">
      <canvas ref={canvasRef} className="bg-canvas" />

      {LIGHTS.map((l, i) => (
        <div
          key={i}
          className="soft-light"
          style={{
            left:              l.x,
            top:               l.y,
            width:             l.size,
            height:            l.size,
            background:        `radial-gradient(circle, ${l.color} 0%, transparent 68%)`,
            animationDuration: `${l.dur}s`,
            animationDelay:    `${i * -4.5}s`,
          }}
        />
      ))}
    </div>
  )
}
