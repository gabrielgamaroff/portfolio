"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Lock, X } from "lucide-react";
import { type Project } from "@/data/site";
import { setPagerPaused } from "./pagerBus";
import { ProjectGallery } from "./ProjectGallery";

export function ProjectCard({ project }: { project: Project }) {
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Pause section paging while the modal is open so scrolling stays inside it
  // (Radix locks the background scroll itself).
  const onOpenChange = (open: boolean) => setPagerPaused(open);

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          onMouseMove={onMove}
          className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface-2/70 p-6 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_18px_50px_-12px_rgb(0_0_0/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:p-8"
        >
          {/* cursor spotlight */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%)",
            }}
          />

          <div className="grid gap-6 md:grid-cols-2 md:gap-10">
            {/* left: identity + summary */}
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.08em] text-faint">
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span>{project.year}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.01em] text-ink sm:text-2xl">
                {project.name}
              </h3>
              <p className="mt-1 text-muted">{project.tagline}</p>
              <p className="mt-4 leading-relaxed text-muted">
                {project.description}
              </p>
            </div>

            {/* right: what I built + tech */}
            <div>
              <ul className="space-y-2">
                {project.contributions.slice(0, 3).map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
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
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-line/60 pt-6">
            {project.links.note ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-faint">
                <Lock className="h-3.5 w-3.5" />
                {project.links.note}
              </span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform duration-300 group-hover:translate-x-0.5">
              View project <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm motion-safe:data-[state=open]:animate-overlay-in motion-safe:data-[state=closed]:animate-overlay-out" />
        {/* Content is a full-screen flex wrapper: centering never depends on transform. */}
        <Dialog.Content className="group pointer-events-none fixed inset-0 z-[101] grid place-items-center p-4 motion-safe:data-[state=open]:animate-overlay-in motion-safe:data-[state=closed]:animate-overlay-out">
          <div className="pointer-events-auto flex max-h-[88vh] w-[min(92vw,880px)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl motion-safe:group-data-[state=open]:animate-pop-in motion-safe:group-data-[state=closed]:animate-pop-out">
            {/* header */}
            <div className="relative shrink-0 border-b border-line px-5 py-4 sm:px-8 sm:py-5">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-accent/10 to-transparent" />
              <div className="relative flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-faint">
                <span>{project.category}</span>
                <span aria-hidden>·</span>
                <span>{project.year}</span>
              </div>
              <Dialog.Title className="relative mt-2 text-2xl font-semibold tracking-[-0.02em] text-ink">
                {project.name}
              </Dialog.Title>
              <Dialog.Description className="relative mt-1 text-muted">
                {project.tagline}
              </Dialog.Description>
              <Dialog.Close className="absolute right-4 top-4 cursor-pointer rounded-lg p-2 text-faint transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </div>

            {/* scrollable body */}
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6">
              <ProjectGallery name={project.name} gallery={project.gallery} />

              <div className="mt-6 space-y-4">
                {project.overview.map((para, i) => (
                  <p
                    key={para.slice(0, 24)}
                    className={
                      i === 0
                        ? "leading-relaxed text-ink/85"
                        : "leading-relaxed text-muted"
                    }
                  >
                    {para}
                  </p>
                ))}
              </div>

              <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-faint">
                What I built
              </h4>
              <ul className="mt-3 space-y-2">
                {project.contributions.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-faint">
                Tech
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-faint"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-4">
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
