"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Diamond, Gauge, Scissors, type LucideIcon } from "lucide-react";
import { usePrefersReducedMotion, useIsDesktopPointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * The reference poster's floating 3D app chips, rebuilt as generic editing
 * tiles. Drawn entirely in CSS/SVG — deliberately no official software logos.
 * Idle bob is CSS; the mouse parallax is a spring per depth layer.
 */

type Tile = {
  /** Generic editing-tool glyph — deliberately not a software brand mark. */
  icon: LucideIcon;
  caption: string;
  className: string;
  depth: number;
  tilt: string;
  blurred?: boolean;
  variant: "chip" | "orb";
};

const tiles: Tile[] = [
  {
    icon: Scissors,
    caption: "Cut",
    className: "left-[3%] top-[20%] h-14 w-14 sm:h-[72px] sm:w-[72px]",
    depth: 26,
    tilt: "-8deg",
    variant: "chip",
  },
  {
    icon: Diamond,
    caption: "Keyframe",
    className: "right-[4%] top-[12%] h-12 w-12 sm:h-16 sm:w-16",
    depth: 40,
    tilt: "10deg",
    variant: "orb",
  },
  {
    icon: Gauge,
    caption: "Speed ramp",
    className: "right-[1%] top-[56%] hidden h-[52px] w-[52px] sm:block sm:h-14 sm:w-14",
    depth: 16,
    tilt: "6deg",
    blurred: true,
    variant: "chip",
  },
];

export default function FloatingTiles({ className }: { className?: string }) {
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktopPointer();
  const parallax = isDesktop && !reducedMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.6 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.6 });

  useEffect(() => {
    if (!parallax) return;
    const onMove = (event: MouseEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, pointerX, pointerY]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-20", className)}
      aria-hidden="true"
    >
      {tiles.map((tile, index) => (
        <TileNode
          key={tile.caption}
          tile={tile}
          index={index}
          smoothX={smoothX}
          smoothY={smoothY}
          parallax={parallax}
        />
      ))}
    </div>
  );
}

function TileNode({
  tile,
  index,
  smoothX,
  smoothY,
  parallax,
}: {
  tile: Tile;
  index: number;
  smoothX: ReturnType<typeof useSpring>;
  smoothY: ReturnType<typeof useSpring>;
  parallax: boolean;
}) {
  const x = useTransform(smoothX, (value) => value * tile.depth * -1);
  const y = useTransform(smoothY, (value) => value * tile.depth * -1);

  return (
    <motion.div
      className={cn("absolute", tile.className)}
      style={parallax ? { x, y } : undefined}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.5 + index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className={cn(
          "animate-bob h-full w-full",
          tile.blurred && "blur-[1.2px] opacity-90",
        )}
        style={{
          ["--tilt" as string]: tile.tilt,
          ["--bob-duration" as string]: `${6.5 + index * 0.9}s`,
          ["--bob-delay" as string]: `${index * 0.55}s`,
        }}
      >
        {tile.variant === "chip" ? (
          <GlassChip icon={tile.icon} />
        ) : (
          <GlassOrb icon={tile.icon} />
        )}
      </div>
    </motion.div>
  );
}

/** Dark glossy app-style tile with a bright rim — the reference's "Ps" chip. */
function GlassChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative h-full w-full rounded-[26%] bg-[linear-gradient(155deg,#2b6f8f_0%,#0f3a50_55%,#06141d_100%)] shadow-[0_24px_48px_-16px_rgba(4,22,32,.95),0_0_36px_-8px_rgba(135,206,235,.55)] ring-1 ring-white/25">
      <span className="absolute inset-x-[8%] top-[5%] h-[42%] rounded-[40%] bg-[linear-gradient(180deg,rgba(255,255,255,.32),rgba(255,255,255,0))]" />
      <span className="absolute inset-0 flex items-center justify-center text-[var(--sky-light)] drop-shadow-[0_0_10px_rgba(135,206,235,.8)]">
        <Icon className="h-[42%] w-[42%]" strokeWidth={2.2} />
      </span>
      <span className="absolute inset-0 rounded-[26%] ring-1 ring-inset ring-white/10" />
    </div>
  );
}

/** Bright glossy blue orb — the round chip floating over the reference headline. */
function GlassOrb({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="relative h-full w-full rounded-full bg-[radial-gradient(75%_75%_at_32%_24%,#f0fafe_0%,#a9ddf2_30%,#87ceeb_58%,#2b7f9e_100%)] shadow-[0_18px_40px_-14px_rgba(4,22,32,.9),0_0_40px_-6px_rgba(135,206,235,.8)] ring-1 ring-white/40">
      <span className="absolute left-[18%] top-[12%] h-[24%] w-[36%] rounded-full bg-white/70 blur-[3px]" />
      <span className="absolute inset-0 flex items-center justify-center text-[var(--bg-0)]">
        <Icon className="h-[40%] w-[40%]" strokeWidth={2.4} fill="rgba(255,255,255,.25)" />
      </span>
    </div>
  );
}
