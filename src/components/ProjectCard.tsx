"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowUpRight, Lock } from "lucide-react";
import { type Project } from "@/data/site";

export function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // card-level fade + drift, tied to scroll
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0.15, 1, 1, 0.15]);
  const cardY = useTransform(scrollYProgress, [0, 1], [48, -48]);
  // image parallax within its frame
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.article
      ref={ref}
      style={reduce ? undefined : { opacity, y: cardY }}
      className="grid gap-6 rounded-2xl border border-line bg-surface-2/70 p-4 backdrop-blur-sm sm:p-6 md:grid-cols-2 md:items-center md:gap-10 md:p-8"
    >
      {/* Media with parallax */}
      <div className={reversed ? "md:order-2" : ""}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
          <motion.div
            style={reduce ? undefined : { y: imgY }}
            className="absolute inset-x-0 -top-[15%] h-[130%]"
          >
            {project.image ? (
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="font-mono text-sm text-faint">
                  {project.name}
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Text */}
      <div className={reversed ? "md:order-1" : ""}>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-faint">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-1 text-muted">{project.tagline}</p>

        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-4 space-y-2">
          {project.contributions.map((c) => (
            <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span>{c}</span>
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-faint"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-4">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-2"
            >
              Live site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
          {project.links.note && (
            <span className="inline-flex items-center gap-1.5 text-xs text-faint">
              <Lock className="h-3.5 w-3.5" />
              {project.links.note}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
