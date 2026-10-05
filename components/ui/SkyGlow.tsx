import { cn } from "@/lib/utils";

/**
 * A soft #87ceeb bloom. Purely decorative — used to carry the brand colour
 * down the page so every section sits in sky light, not just the hero.
 *
 * Placement is left to the caller so the bright core can be kept out from
 * behind body copy, where a luminous background would cost contrast.
 */
export default function SkyGlow({
  className,
  intensity = 0.5,
  blur = "90px",
}: {
  className?: string;
  /** Peak alpha of the bloom, 0–1. */
  intensity?: number;
  blur?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full", className)}
      style={{
        filter: `blur(${blur})`,
        background: `radial-gradient(50% 50% at 50% 50%, rgba(135,206,235,${intensity}) 0%, rgba(135,206,235,${intensity * 0.35}) 45%, rgba(135,206,235,0) 72%)`,
      }}
    />
  );
}
