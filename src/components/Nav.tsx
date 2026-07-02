"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";

export function Nav() {
  const [active, setActive] = useState("");
  const lenis = useLenis();
  const deepLinked = useRef(false);

  const scrollToSection = (id: string, immediate = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    // center the section; for sections taller than the viewport, land on the
    // top with room for the fixed nav.
    const centerOffset = Math.max(0, (window.innerHeight - el.offsetHeight) / 2);
    const target = el.offsetTop - centerOffset - (centerOffset === 0 ? 64 : 0);
    if (lenis) {
      lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
    }
  };

  // Track which section is in view (hero included).
  useEffect(() => {
    const ids = ["top", ...site.nav.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Keep the URL hash in sync with the section in view (no jump, no history spam).
  useEffect(() => {
    if (!active) return;
    const desired = active === "top" ? "" : `#${active}`;
    if (window.location.hash !== desired) {
      const base = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", desired ? base + desired : base);
    }
  }, [active]);

  // Honor an incoming #section link on first load.
  useEffect(() => {
    if (deepLinked.current) return;
    const id = window.location.hash.slice(1);
    if (!id || !document.getElementById(id)) return;
    deepLinked.current = true;
    const t = window.setTimeout(() => scrollToSection(id, true), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-canvas/60 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1024px] items-center justify-between px-[clamp(20px,5vw,40px)]">
        <a
          href="#top"
          onClick={(e) => go(e, "top")}
          className="font-mono text-sm font-medium tracking-tight text-ink"
        >
          <span className="hidden sm:inline">Gabriel Gamaroff</span>
          <span className="sm:hidden">GG</span>
        </a>
        <ul className="flex items-center gap-3 sm:gap-6">
          {site.nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => go(e, item.id)}
                className={`font-mono text-[11px] uppercase tracking-wide transition-colors hover:text-ink sm:text-xs sm:tracking-wider ${
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
