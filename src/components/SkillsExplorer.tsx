"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { site } from "@/data/site";

export function SkillsExplorer() {
  const areas = site.skillAreas;
  const [activeId, setActiveId] = useState(areas[0].id);
  const active = areas.find((a) => a.id === activeId) ?? areas[0];
  const reduce = useReducedMotion();

  return (
    <>
      {/* Mobile: accordion — tap an area to expand its detail inline. */}
      <ul className="border-t border-line md:hidden">
        {areas.map((area) => {
          const open = area.id === activeId;
          return (
            <li key={area.id} className="border-b border-line">
              <button
                aria-expanded={open}
                onClick={() => setActiveId(area.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span
                  className={`font-mono text-[13px] uppercase tracking-[0.06em] transition-colors ${
                    open ? "text-ink" : "text-faint"
                  }`}
                >
                  {area.label}
                </span>
                {/* Chevron only on closed rows: it invites opening. The open
                    row has no close affordance (you switch by opening another). */}
                {!open && (
                  <ChevronDown aria-hidden className="h-4 w-4 shrink-0 text-faint" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="body"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-5">
                      <p className="text-sm leading-relaxed text-muted">
                        {area.blurb}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {area.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-full border border-line bg-surface/60 px-2.5 py-1 text-xs text-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Desktop: sidebar tablist + detail panel. */}
      <div className="hidden gap-12 md:grid md:grid-cols-[240px_1fr]">
        <div
          role="tablist"
          aria-label="Skill areas"
          className="flex flex-col gap-1"
        >
          {areas.map((area, i) => {
            const selected = area.id === active.id;
            return (
              <button
                key={area.id}
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(area.id)}
                className={`group flex shrink-0 cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  selected ? "bg-surface text-ink" : "text-faint hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-xs ${selected ? "text-accent" : "text-faint group-hover:text-muted"}`}
                >
                  0{i + 1}
                </span>
                <span className="whitespace-nowrap font-mono text-sm">
                  {area.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0.15 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="max-w-[560px] text-lg leading-relaxed text-muted">
                {active.blurb}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {active.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface/60 px-3 py-1.5 text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
