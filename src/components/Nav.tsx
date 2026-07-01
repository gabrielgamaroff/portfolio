"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const { id } of site.nav) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-[clamp(20px,5vw,40px)]">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          <span className="hidden sm:inline">Gabriel Gamaroff</span>
          <span className="sm:hidden">GG</span>
        </a>
        <ul className="flex items-center gap-4 sm:gap-6">
          {site.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`font-mono text-xs uppercase tracking-wider transition-colors hover:text-ink ${
                  active === item.id ? "text-accent" : "text-faint"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
