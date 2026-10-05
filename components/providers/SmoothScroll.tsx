"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { anchorOffset, setLenis, syncScrollTo } from "@/lib/scroll";

/**
 * Lenis smooth scroll driven by the GSAP ticker, so ScrollTrigger and Lenis
 * share one RAF loop and never fight over frame order. Disabled entirely under
 * `prefers-reduced-motion` — the page then scrolls natively.
 */
export default function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      // Plain `<a href="#id">` clicks (the skip link) clear the nav too.
      anchors: { offset: anchorOffset() },
    });

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Every measured trigger distance depends on text metrics, so the first
    // measurement is taken against fallback faces. Re-measure once the
    // webfonts have swapped in.
    let live = true;
    void document.fonts?.ready.then(() => {
      if (live) ScrollTrigger.refresh();
    });

    return () => {
      live = false;
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  /**
   * Next moves the window itself on a route change, which leaves Lenis holding
   * the *previous* page's scroll target — the next wheel event then lerps
   * straight back to that old offset. Snap Lenis onto the incoming position,
   * honouring a `/#section` hash, and re-measure every trigger against the new
   * document height.
   */
  const settle = useCallback(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    syncScrollTo(target ?? 0);
  }, []);

  useEffect(() => {
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }

    // Immediately, so the incoming page never paints at the old offset…
    settle();

    // …then again after the frame in which the incoming page resolves its
    // media-query-driven layout branches, since an anchor's offset (and the
    // page height ScrollTrigger measures) is only final once that has run.
    const raf = requestAnimationFrame(() => {
      settle();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, settle]);

  return null;
}
