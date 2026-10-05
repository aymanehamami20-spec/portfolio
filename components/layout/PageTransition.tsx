"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Page-transition "cut": a blue panel slices off the incoming page, led by a
 * thin cyan edge — the grammar of a hard cut on a timeline.
 *
 * Driven by `usePathname` rather than by `template.tsx`, because a template
 * does not remount when navigating between two routes in the same dynamic
 * segment (`/work/a` → `/work/b`) — which is exactly where this fires most.
 * The first render is skipped; the intro loader owns that moment.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const [cutKey, setCutKey] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (reducedMotion) return;
    setCutKey(pathname);
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {cutKey ? (
        <motion.div
          key={cutKey}
          className="pointer-events-none fixed inset-0 z-[150]"
          aria-hidden="true"
          onAnimationComplete={() => setCutKey(null)}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 origin-top bg-[linear-gradient(180deg,#87ceeb_0%,#1d6484_55%,#06141d_100%)]"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          />
          <motion.div
            className="absolute inset-x-0 h-[3px] bg-[var(--sky-light)] shadow-[0_0_24px_4px_rgba(135,206,235,.85)]"
            initial={{ top: "100%" }}
            animate={{ top: "0%" }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
