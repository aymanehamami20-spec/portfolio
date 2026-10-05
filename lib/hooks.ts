"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query. Returns false on the server and on the first client
 * paint, then settles — so nothing motion-dependent renders before we know.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** True once the viewport is desktop-sized and the pointer is a real mouse. */
export function useIsDesktopPointer(): boolean {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine)");
}

/** Mirrors the CSS `prefers-reduced-motion` query. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True after the component has mounted on the client. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
