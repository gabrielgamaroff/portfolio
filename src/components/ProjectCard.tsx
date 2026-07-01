import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { type Project } from "@/data/site";

export function ProjectCard({
  project,
  reversed = false,
}: {
  project: Project;
  reversed?: boolean;
}) {
  return (
    <article className="grid gap-6 rounded-2xl border border-line bg-surface-2 p-4 sm:p-6 md:grid-cols-2 md:items-center md:gap-10 md:p-8">
      {/* Media */}
      <div className={reversed ? "md:order-2" : ""}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
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
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
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
    </article>
  );
}
