"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/data/site";

export function SkillsExplorer() {
  const areas = site.skillAreas;
  const [activeId, setActiveId] = useState(areas[0].id);
  const active = areas.find((a) => a.id === activeId) ?? areas[0];
  const reduce = useReducedMotion();

  return (
    <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-12">
      {/* Area selector: horizontal scroll on mobile, vertical list on desktop */}
      <div
        role="tablist"
        aria-label="Skill areas"
        className="-mx-1 flex gap-1 overflow-x-auto px-1 md:mx-0 md:flex-col md:overflow-visible md:px-0"
      >
        {areas.map((area, i) => {
          const selected = area.id === active.id;
          return (
            <button
              key={area.id}
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(area.id)}
              className={`group flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                selected
                  ? "bg-surface text-ink"
                  : "text-faint hover:text-ink"
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

      {/* Detail panel — fixed floor so vertical centering doesn't shift between areas */}
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
  );
}
