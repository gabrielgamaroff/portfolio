"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "./Container";

/**
 * Full-height section (slightly taller than the viewport for snap breathing room).
 * Content is vertically centered and fades / drifts in and out as you scroll
 * through it, tied to scroll position (not a one-shot reveal).
 */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [64, 0, -64]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative flex min-h-[100dvh] flex-col justify-center py-28 ${className}`}
    >
      <Container>
        <motion.div style={reduce ? undefined : { opacity, y }}>
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
