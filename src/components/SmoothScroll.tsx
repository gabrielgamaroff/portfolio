"use client";

import { type ReactNode, useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { SnapController } from "./SnapController";

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Respect reduced-motion: hand back native scrolling, no Lenis.
  if (reduced) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, syncTouch: true }}>
      {children}
      <SnapController />
    </ReactLenis>
  );
}
