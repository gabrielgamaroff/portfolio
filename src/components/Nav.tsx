"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";

export function Nav() {
  const [active, setActive] = useState("");
  const lenis = useLenis();

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

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // center the section in the viewport; for sections taller than the
    // viewport, land on the top with room for the fixed nav.
    const centerOffset = Math.max(0, (window.innerHeight - el.offsetHeight) / 2);
    const target = el.offsetTop - centerOffset - (centerOffset === 0 ? 64 : 0);
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.1 });
    } else {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
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
