"use client";

import type Lenis from "lenis";

/**
 * Module-level handle on the Lenis instance so overlays (showreel modal,
 * mobile menu) can freeze the page without prop-drilling a ref through the
 * whole tree. Falls back to clipping the scroller when Lenis is not running —
 * which is the case under `prefers-reduced-motion`.
 */
let instance: Lenis | null = null;
let locks = 0;
let restoreOverflow = "";

/**
 * Clearance every programmatic scroll leaves for the fixed nav, as a negative
 * Lenis offset. Read from `--nav-h` so it tracks the one token the nav itself
 * is sized from, and matches the `scroll-margin-top` the CSS reserves for
 * native anchor jumps — otherwise an anchored section lands behind the nav.
 */
export function anchorOffset(): number {
  const token = getComputedStyle(document.documentElement).getPropertyValue(
    "--nav-h",
  );
  const navHeight = Number.parseFloat(token) || 68;
  return -(navHeight + 24);
}

export function setLenis(next: Lenis | null): void {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function lockScroll(): void {
  locks += 1;
  if (locks > 1) return;
  instance?.stop();
  // Clip the documentElement, not the body: the body is not the scroller, so
  // clipping it leaves the page scrollable whenever Lenis is not running.
  // `scrollbar-gutter: stable` keeps this from shifting the layout.
  restoreOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  instance?.start();
  document.documentElement.style.overflow = restoreOverflow;
}

/**
 * Snaps the scroll position to `target` without animating, and — crucially —
 * syncs Lenis's internal target so the next wheel event does not lerp back to
 * wherever the page used to be.
 */
export function syncScrollTo(target: HTMLElement | number): void {
  const offset = typeof target === "number" ? 0 : anchorOffset();

  if (instance) {
    instance.scrollTo(target, { immediate: true, force: true, offset });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "instant" });
  } else {
    target.scrollIntoView({ block: "start", behavior: "instant" });
  }
}

/** Smooth-scrolls to an in-page anchor, accounting for the fixed nav. */
export function scrollToId(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  if (instance) {
    instance.scrollTo(target, { offset: anchorOffset(), duration: 1.2 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
