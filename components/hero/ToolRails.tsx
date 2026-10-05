import {
  AudioLines,
  Clapperboard,
  Contrast,
  Crop,
  Film,
  Gauge,
  Layers,
  Music,
  Palette,
  PenTool,
  Scissors,
  SlidersHorizontal,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The reference poster's faded Photoshop toolbars, translated to a video
 * editor: two vertical rails of editing glyphs, gradient-masked top and bottom,
 * scrolling slowly in opposite directions. Purely decorative.
 */

const leftTools = [
  Scissors,
  Layers,
  PenTool,
  Gauge,
  Type,
  AudioLines,
  Crop,
  Palette,
  Film,
];

const rightTools = [
  Clapperboard,
  SlidersHorizontal,
  Wand2,
  Contrast,
  Music,
  Sparkles,
  Scissors,
  Gauge,
  Layers,
];

function Rail({
  icons,
  direction,
  className,
}: {
  icons: typeof leftTools;
  direction: "up" | "down";
  className?: string;
}) {
  // Rendered twice so the loop wraps seamlessly at -50%.
  const loop = [...icons, ...icons];

  return (
    <div className={cn("mask-y overflow-hidden", className)}>
      <div
        className={cn(
          "flex flex-col items-center gap-9",
          direction === "up" ? "animate-rail-up" : "animate-rail-down",
        )}
        style={{ ["--rail-duration" as string]: direction === "up" ? "44s" : "52s" }}
      >
        {loop.map((Icon, index) => (
          <span key={index} className="text-white/22">
            <Icon size={26} strokeWidth={1.2} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ToolRails() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-0 right-0 z-0 hidden select-none md:block"
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-[86px] bg-gradient-to-r from-white/[0.045] to-transparent">
        <Rail icons={leftTools} direction="up" className="h-full py-10" />
      </div>
      <div className="absolute inset-y-0 right-0 w-[86px] bg-gradient-to-l from-white/[0.045] to-transparent">
        <Rail icons={rightTools} direction="down" className="h-full py-10" />
      </div>
    </div>
  );
}
