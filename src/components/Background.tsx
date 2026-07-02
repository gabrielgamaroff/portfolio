"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = auroraRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    // target (tx,ty) from pointer, current (cx,cy) eased toward it
    let tx = 0.5;
    let ty = 0.22;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const loop = () => {
      // low factor => sluggish, delayed follow
      cx += (tx - cx) * 0.022;
      cy += (ty - cy) * 0.022;
      el.style.setProperty("--mx", `${(cx * 100).toFixed(2)}%`);
      el.style.setProperty("--my", `${(cy * 100).toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-layer" aria-hidden>
      <div ref={auroraRef} className="bg-aurora" />
      <div className="bg-grid" />
      <div className="bg-grain" />
    </div>
  );
}
