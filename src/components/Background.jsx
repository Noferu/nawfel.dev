import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LIGHTS = [
  { x: "12%", y: "18%", color: "rgba(78,2,1,0.45)", size: 580, dur: 18 },
  { x: "78%", y: "62%", color: "rgba(161,92,33,0.30)", size: 500, dur: 24 },
  { x: "48%", y: "88%", color: "rgba(212,138,57,0.22)", size: 440, dur: 20 },
  { x: "85%", y: "14%", color: "rgba(78,2,1,0.38)", size: 520, dur: 28 },
  { x: "30%", y: "55%", color: "rgba(161,92,33,0.18)", size: 380, dur: 22 },
];

const GRID = 120;
const ANGLE = (10 * Math.PI) / 180;
const MASK_R = 16;
const DOT_R = 1.5;

export default function Background() {
  const canvasRef = useRef(null);
  const offsetRef = useRef(0);
  const lightsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(ANGLE);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      const off = offsetRef.current % GRID;
      const ext = Math.max(canvas.width, canvas.height) * 1.4;
      const startX = -ext + off;
      const startY = -ext;

      ctx.strokeStyle = "rgba(251,195,115,0.05)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        ctx.moveTo(x, startY);
        ctx.lineTo(x, canvas.height + ext);
      }
      ctx.stroke();

      ctx.beginPath();
      for (let y = startY; y < canvas.height + ext; y += GRID) {
        ctx.moveTo(startX, y);
        ctx.lineTo(canvas.width + ext, y);
      }
      ctx.stroke();

      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.beginPath();
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        for (let y = startY; y < canvas.height + ext; y += GRID) {
          ctx.moveTo(x + MASK_R, y);
          ctx.arc(x, y, MASK_R, 0, Math.PI * 2);
        }
      }
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      ctx.fillStyle = "rgba(251,195,115,0.2)";
      ctx.beginPath();
      for (let x = startX; x < canvas.width + ext; x += GRID) {
        for (let y = startY; y < canvas.height + ext; y += GRID) {
          ctx.moveTo(x + DOT_R, y);
          ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      ctx.restore();
      offsetRef.current -= 0.25;
    };

    let running = true;

    const onVisibility = () => {
      if (document.hidden && running) {
        gsap.ticker.remove(draw);
        running = false;
      } else if (!document.hidden && !running) {
        gsap.ticker.add(draw);
        running = true;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    draw();
    gsap.ticker.add(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      gsap.ticker.remove(draw);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const FACTORS = [0.08, 0.12, 0.06, 0.1, 0.09];

      lightsRef.current.forEach((wrapper, i) => {
        if (!wrapper) return;
        const amplitude = window.innerHeight * FACTORS[i];
        gsap.fromTo(
          wrapper,
          { y: -amplitude / 2 },
          {
            y: amplitude / 2,
            ease: "none",
            scrollTrigger: {
              trigger: document.body,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          },
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-wrapper" data-intro="bg">
      <canvas ref={canvasRef} className="bg-canvas" />

      {LIGHTS.map((l, i) => (
        <div
          key={i}
          ref={(el) => {
            lightsRef.current[i] = el;
          }}
          className="soft-light-wrapper"
          style={{ left: l.x, top: l.y }}
        >
          <div
            className="soft-light"
            style={{
              width: l.size,
              height: l.size,
              background: `radial-gradient(circle, ${l.color} 0%, transparent 68%)`,
              filter: "blur(40px)",
              animationDuration: `${l.dur}s`,
              animationDelay: `${i * -4.5}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
