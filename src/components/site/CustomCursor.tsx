import { useEffect, useRef } from "react";

/** Gold dot + trailing ring with a sparkle trail. Desktop (mouse) only. */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("custom-cursor");
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf = 0, last = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      root.classList.remove("cursor-hidden");
      const now = performance.now();
      if (now - last > 45) {
        last = now;
        const s = document.createElement("span");
        s.className = "cursor-spark";
        s.style.left = `${x}px`;
        s.style.top = `${y}px`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 700);
      }
      const t = e.target as Element | null;
      root.classList.toggle(
        "cursor-hover",
        !!t?.closest("a, button, [role='button'], input, textarea, select, label"),
      );
    };
    const down = () => root.classList.add("cursor-down");
    const up = () => root.classList.remove("cursor-down");
    const leave = () => root.classList.add("cursor-hidden");

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("mousemove", move);
    addEventListener("mousedown", down);
    addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", move);
      removeEventListener("mousedown", down);
      removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      root.classList.remove("custom-cursor", "cursor-hover", "cursor-down", "cursor-hidden");
    };
  }, []);

  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dot} className="cursor-dot" aria-hidden="true"><span /></div>
    </>
  );
}
