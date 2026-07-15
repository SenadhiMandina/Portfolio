import { useEffect, useRef, useState } from "react";

/**
 * Glowing dual-ring cursor that follows the pointer with smooth easing
 * and reacts to hoverable elements.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      const target = e.target as HTMLElement;
      hovering = !!target.closest("a, button, [data-cursor='hover'], input, textarea");
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = hovering ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = hovering
          ? "rgba(236, 72, 153, 0.9)"
          : "rgba(34, 211, 238, 0.6)";
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-300"
        style={{ boxShadow: "0 0 12px rgba(34,211,238,0.9)" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-9 w-9 rounded-full border transition-[border-color] duration-200"
        style={{ borderColor: "rgba(34,211,238,0.6)" }}
      />
    </>
  );
}
