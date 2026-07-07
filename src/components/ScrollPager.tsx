"use client";

import { useEffect } from "react";
import { registerPager, isPagerPaused } from "./pagerBus";

const IDS = ["top", "about", "skills", "work", "contact"];

/**
 * Discrete section pager on top of native scrolling — no smooth-scroll engine.
 *
 * Each vertical gesture (wheel / trackpad / swipe / arrow key) is treated as a
 * page change: we `preventDefault` the native scroll and animate once to the
 * neighbouring section. That removes the trackpad's inertial glide on the
 * one-screen sections, so it behaves like a mouse — one gesture, one page.
 *
 * A trackpad's momentum tail is a stream of decaying wheel deltas. We reject it
 * with fullPage.js's acceleration test: only act when the recent deltas are
 * accelerating (avg of last 10 >= avg of last 70). The tail always decelerates,
 * so it never triggers an extra page; a single mouse notch reads as accelerating
 * and pages immediately.
 *
 * Sections taller than the viewport (the Work grid) are exempt: inside them we
 * let native scrolling run normally, and only take over at their top/bottom
 * edges to page to the neighbour.
 */
export function ScrollPager() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const EDGE = 8; // px tolerance for "at the top/bottom of a tall section"

    type M = {
      top: number;
      height: number;
      tall: boolean;
      centerY: number;
      topY: number;
      bottomY: number;
    };

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const metrics = (): M[] => {
      const vh = window.innerHeight;
      const maxY = maxScroll();
      return IDS.map((id) => {
        const el = document.getElementById(id);
        const top = el ? el.offsetTop : 0;
        const height = el ? el.offsetHeight : vh;
        // Only treat clearly-taller-than-viewport sections as free-scroll, so a
        // section that merely spills over slightly still pages as one screen.
        const tall = height > vh + 160;
        return {
          top,
          height,
          tall,
          centerY: clamp(top - (vh - height) / 2, 0, maxY),
          topY: clamp(top, 0, maxY),
          bottomY: clamp(top + height - vh, 0, maxY),
        };
      });
    };

    const currentIndex = (m: M[]) => {
      const c = window.scrollY + window.innerHeight / 2;
      for (let i = 0; i < m.length; i++) {
        if (c >= m[i].top && c < m[i].top + m[i].height) return i;
      }
      let best = 0;
      let bd = Infinity;
      for (let i = 0; i < m.length; i++) {
        const d = Math.abs(window.scrollY - m[i].centerY);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };

    // --- movement + lock ------------------------------------------------------
    let moving = false;
    let releaseTimer: number | undefined;
    let endHandler: (() => void) | null = null;

    const disarmRelease = () => {
      if (endHandler) window.removeEventListener("scrollend", endHandler);
      endHandler = null;
      window.clearTimeout(releaseTimer);
    };
    const armRelease = () => {
      disarmRelease();
      const h = () => {
        disarmRelease();
        moving = false;
      };
      endHandler = h;
      window.addEventListener("scrollend", h); // native settle
      releaseTimer = window.setTimeout(h, 1000); // fallback if scrollend misses
    };

    const moveTo = (y: number) => {
      const target = Math.round(y);
      if (Math.abs(target - window.scrollY) < 2) return;
      if (reduce) {
        window.scrollTo({ top: target });
        return;
      }
      moving = true;
      window.scrollTo({ top: target, behavior: "smooth" });
      armRelease();
    };

    const targetFor = (m: M, dirDown: boolean) =>
      m.tall ? (dirDown ? m.topY : m.bottomY) : m.centerY;

    const goToIndex = (index: number, dirDown: boolean) => {
      const m = metrics();
      const i = clamp(index, 0, m.length - 1);
      moveTo(targetFor(m[i], dirDown));
    };

    // Nav clicks / deep links
    const goToId = (id: string) => {
      const i = IDS.indexOf(id);
      if (i < 0) return;
      const m = metrics();
      const dirDown = i >= currentIndex(m);
      moveTo(targetFor(m[i], dirDown));
    };
    registerPager(goToId);

    // Advance one page in a direction, including the footer at the very bottom.
    const trigger = (dirDown: boolean) => {
      const m = metrics();
      const cur = currentIndex(m);
      const maxY = maxScroll();
      if (dirDown) {
        if (cur === m.length - 1) {
          if (window.scrollY < maxY - EDGE) moveTo(maxY); // reveal footer
          return;
        }
        goToIndex(cur + 1, true);
      } else {
        if (cur === m.length - 1 && window.scrollY > maxY - EDGE) {
          moveTo(m[cur].centerY); // footer -> back to last section
          return;
        }
        if (cur === 0) return;
        goToIndex(cur - 1, false);
      }
    };

    // In a tall section, is native scrolling still available in this direction?
    const nativeInTall = (m: M[], cur: number, dirDown: boolean) => {
      const sec = m[cur];
      if (!sec.tall) return false;
      const atTop = window.scrollY <= sec.topY + EDGE;
      const atBottom = window.scrollY >= sec.bottomY - EDGE;
      return dirDown ? !atBottom : !atTop;
    };

    // --- wheel (fullPage.js acceleration test) --------------------------------
    let scrollings: number[] = [];
    let prevTime = Date.now();
    const avg = (n: number) => {
      const arr = scrollings.slice(Math.max(scrollings.length - n, 0));
      return arr.reduce((a, b) => a + b, 0) / n;
    };

    const onWheel = (e: WheelEvent) => {
      if (reduce || isPagerPaused()) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gesture
      const m = metrics();
      const cur = currentIndex(m);
      const dirDown = e.deltaY > 0;

      if (nativeInTall(m, cur, dirDown)) return; // free scroll inside Work

      e.preventDefault(); // own the gesture; kills native momentum here

      // Record every owned event (even mid-move) so the decaying tail is seen
      // as decelerating and never triggers an extra page.
      const now = Date.now();
      const timeDiff = now - prevTime;
      prevTime = now;
      if (timeDiff > 200) scrollings = []; // new, separate gesture
      scrollings.push(Math.abs(e.deltaY));
      if (scrollings.length > 150) scrollings.shift();

      if (moving) return;
      if (avg(10) < avg(70)) return; // momentum tail (decelerating) -> ignore
      trigger(dirDown);
    };

    // --- touch ----------------------------------------------------------------
    let touchStartY = 0;
    let touchActive = false;
    const onTouchStart = (e: TouchEvent) => {
      if (reduce || isPagerPaused()) return;
      touchStartY = e.touches[0].clientY;
      touchActive = true;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (reduce || isPagerPaused() || !touchActive) return;
      const dy = touchStartY - e.touches[0].clientY; // down positive
      const dirDown = dy > 0;
      const m = metrics();
      const cur = currentIndex(m);
      if (nativeInTall(m, cur, dirDown)) return;
      e.preventDefault();
      if (moving || Math.abs(dy) < 45) return; // swipe threshold
      touchActive = false; // one page per swipe
      trigger(dirDown);
    };
    const onTouchEnd = () => {
      touchActive = false;
    };

    // --- keyboard -------------------------------------------------------------
    const onKey = (e: KeyboardEvent) => {
      if (reduce || isPagerPaused() || moving) return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.key === "Home") {
        e.preventDefault();
        moveTo(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        moveTo(maxScroll());
        return;
      }
      const down =
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        (e.key === " " && !e.shiftKey);
      const up =
        e.key === "ArrowUp" ||
        e.key === "PageUp" ||
        (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      const m = metrics();
      const cur = currentIndex(m);
      if (nativeInTall(m, cur, down)) return;
      e.preventDefault();
      trigger(down);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKey);

    return () => {
      registerPager(null);
      disarmRelease();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
