"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

const SECTION_IDS = ["top", "about", "skills", "work", "contact"];

/**
 * Magnetic scroll-snapping on top of Lenis.
 *
 * - Viewport-height sections snap to their top (content is centered).
 * - Tall sections (Work) are directional: their TOP is a target only while
 *   approaching from above and their BOTTOM only from below; no target inside,
 *   so you scroll through freely.
 * - Snapping is magnetic: the moment the view enters a target's zone in the
 *   direction of travel (mid-glide), it snaps — no waiting for momentum to end.
 *   A short rest-fallback handles tiny scrolls that stop before reaching a zone.
 */
export function SnapController() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let prev = lenis.scroll;
    let dir = 0; // +1 down, -1 up
    let timer: number | undefined;
    let unlockTimer: number | undefined;
    let snapping = false;

    // Furthest-down snap position; anything below it is the footer => free scroll.
    const lastSnap = (vp: number, maxY: number) => {
      let m = 0;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const pos =
          el.offsetHeight > vp + 8 ? el.offsetTop + el.offsetHeight - vp : el.offsetTop;
        m = Math.max(m, Math.min(pos, maxY));
      }
      return m;
    };

    // True inside a tall section (past its edges) => free scroll, never snap.
    const insideTall = (y: number, vp: number) => {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el || el.offsetHeight <= vp + 8) continue;
        const top = el.offsetTop;
        const bottom = el.offsetTop + el.offsetHeight - vp;
        if (y > top + 2 && y < bottom - 2) return true;
      }
      return false;
    };

    const candidates = (y: number, vp: number, maxY: number) => {
      const out: number[] = [];
      const add = (pos: number) => out.push(Math.max(0, Math.min(pos, maxY)));
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (el.offsetHeight > vp + 8) {
          const bottom = el.offsetTop + el.offsetHeight - vp;
          if (dir >= 0 && y <= top + 4) add(top);
          if (dir <= 0 && y >= bottom - 4) add(bottom);
        } else {
          add(top);
        }
      }
      return out;
    };

    const snapTo = (target: number) => {
      snapping = true;
      lenis.scrollTo(target, {
        duration: 0.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      });
      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        snapping = false;
      }, 480);
    };

    const onScroll = () => {
      if (snapping) return;
      const vp = window.innerHeight;
      const maxY = Math.max(0, document.documentElement.scrollHeight - vp);
      const y = lenis.scroll;
      if (y > prev + 0.5) dir = 1;
      else if (y < prev - 0.5) dir = -1;
      prev = y;

      // Free scroll inside a tall section, or below the last section (footer zone).
      if (insideTall(y, vp) || y > lastSnap(vp, maxY) + 4) {
        window.clearTimeout(timer);
        return;
      }

      const cands = candidates(y, vp, maxY);

      // Gravity well: as soon as you head toward the nearest target, it pulls
      // you in (nearly a full viewport, so it engages while still moving rather
      // than after the glide settles).
      const GRAB = vp * 0.9;
      let grab: number | undefined;
      for (const c of cands) {
        if (dir > 0 && c >= y && c - y <= GRAB) {
          if (grab === undefined || c < grab) grab = c;
        } else if (dir < 0 && c <= y && y - c <= GRAB) {
          if (grab === undefined || c > grab) grab = c;
        }
      }
      if (grab !== undefined && Math.abs(grab - y) > 2) {
        window.clearTimeout(timer);
        snapTo(grab);
        return;
      }

      // Rest fallback: if a small scroll stops before reaching any zone, settle
      // to the nearest target.
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (snapping) return;
        const y2 = lenis.scroll;
        if (insideTall(y2, vp) || y2 > lastSnap(vp, maxY) + 4) return;
        const c2 = candidates(y2, vp, maxY);
        if (!c2.length) return;
        let best = c2[0];
        for (const c of c2) if (Math.abs(c - y2) < Math.abs(best - y2)) best = c;
        if (Math.abs(best - y2) <= vp * 1.1 && Math.abs(best - y2) > 2) snapTo(best);
      }, 120);
    };

    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
      window.clearTimeout(timer);
      window.clearTimeout(unlockTimer);
    };
  }, [lenis]);

  return null;
}
