"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * The software window peeking into the reference poster's lower-left corner,
 * reimagined as an editing timeline. Decorative only — the playhead tracks
 * page scroll progress.
 */

const tracks = [
  { label: "V2", clips: [18, 26, 14], tint: "from-[#c2e6f5] to-[#5aacce]" },
  { label: "V1", clips: [34, 22, 30], tint: "from-[#87ceeb] to-[#216e8c]" },
  { label: "A1", clips: [26, 40, 18], tint: "from-[#a9ddf2] to-[#2d7f9e]" },
];

export default function TimelinePanel({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const playhead = useTransform(scrollYProgress, [0, 1], ["4%", "96%"]);

  return (
    <div
      className={cn(
        "glass pointer-events-none w-[260px] origin-bottom-left overflow-hidden rounded-t-[14px] rounded-b-none border-b-0 p-3 lg:w-[320px]",
        className,
      )}
      aria-hidden="true"
    >
      {/* Window chrome */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[0.55rem] font-semibold tracking-[0.2em] text-white/35 uppercase">
          Sequence 01
        </span>
      </div>

      <div className="relative space-y-1.5">
        {tracks.map((track) => (
          <div key={track.label} className="flex items-center gap-2">
            <span className="w-4 text-[0.5rem] font-bold text-white/30">
              {track.label}
            </span>
            <div className="flex h-5 flex-1 items-stretch gap-1 overflow-hidden rounded-[4px] bg-white/[0.04] p-[2px]">
              {track.clips.map((width, index) => (
                <span
                  key={index}
                  className={cn(
                    "rounded-[3px] bg-gradient-to-r opacity-80",
                    track.tint,
                  )}
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Playhead */}
        <motion.div
          className="absolute inset-y-[-4px] left-0 z-10 w-[2px] bg-[#87ceeb] shadow-[0_0_12px_2px_rgba(135,206,235,.8)]"
          style={{ left: playhead }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#87ceeb]" />
        </motion.div>
      </div>
    </div>
  );
}
