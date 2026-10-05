import type { Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Section entrance: rise with a short blur-to-sharp. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

/** Parent that staggers its children on entrance. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

/** A headline line sliding up from behind its mask. */
export const maskLine: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.95, ease: EASE_OUT_EXPO },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Viewport settings shared by every scroll-triggered section. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
