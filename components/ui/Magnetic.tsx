"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Pulls its child slightly toward the pointer on hover. Mouse-only: touch
 * devices and reduced-motion users get a plain wrapper.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktopPointer();
  const reducedMotion = usePrefersReducedMotion();
  const active = isDesktop && !reducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={active ? { x: springX, y: springY } : undefined}
      onPointerMove={(event) => {
        if (!active || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
