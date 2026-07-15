import { useEffect, useRef } from "react";

/**
 * Animated neural-network canvas background.
 * Nodes drift, connect within range, and react to the cursor.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let nodes: Node[] = [];

    const palette = [190, 270, 320]; // cyan, violet, pink hues

    const init = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.8,
        hue: palette[Math.floor(Math.random() * palette.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.32;
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 90%, 65%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // cursor influence
        const mdx = a.x - mouse.current.x;
        const mdy = a.y - mouse.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 160) {
          const alpha = (1 - mdist / 160) * 0.6;
          ctx.strokeStyle = `hsla(${a.hue}, 95%, 70%, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.current.x, mouse.current.y);
          ctx.stroke();
          // gentle push away
          a.vx += (mdx / mdist) * 0.02;
          a.vy += (mdy / mdist) * 0.02;
        }
      }

      // nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // friction
        n.vx *= 0.992;
        n.vy *= 0.992;
        // wrap
        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
        glow.addColorStop(0, `hsla(${n.hue}, 95%, 70%, 0.9)`);
        glow.addColorStop(1, `hsla(${n.hue}, 95%, 70%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${n.hue}, 95%, 80%, 0.95)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => init();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    init();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 h-full w-full"
      style={{ pointerEvents: "none", zIndex: 0 }}
      aria-hidden
    />
  );
}
