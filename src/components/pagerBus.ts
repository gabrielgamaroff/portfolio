"use client";

/**
 * Tiny bus so the Nav (and anything else) can drive the ScrollPager, and so the
 * project modal can pause paging while it is open, without prop-drilling or
 * context. The pager registers its imperative handlers here on mount.
 */
type GoTo = (id: string) => void;

let goToFn: GoTo | null = null;
let paused = false;

export function registerPager(fn: GoTo | null) {
  goToFn = fn;
}

export function pagerGoTo(id: string) {
  goToFn?.(id);
}

export function setPagerPaused(next: boolean) {
  paused = next;
}

export function isPagerPaused() {
  return paused;
}
