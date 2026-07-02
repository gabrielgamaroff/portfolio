"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { site } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] flex-col justify-center py-28"
    >
      <Container>
        <motion.div style={reduce ? undefined : { y, opacity }}>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-faint">
              {site.role}
            </p>
            <h1 className="mt-5 max-w-3xl text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              {site.hero.tagline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {site.hero.sub}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_40px_rgb(99_102_241_/_0.25)] transition-colors hover:bg-accent-2"
              >
                Email me
              </a>
              <a
                href="#work"
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                View work →
              </a>
            </div>
            <p className="mt-12 font-mono text-xs text-faint">
              {site.hero.status}
            </p>
          </Reveal>
        </motion.div>
      </Container>
    </section>
  );
}
