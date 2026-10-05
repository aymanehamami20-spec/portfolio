import { cn } from "@/lib/utils";

/**
 * Stand-in for media that has not been supplied yet. Deliberately obvious —
 * a gradient, a frame count and a "Placeholder" label — so nothing ever ships
 * looking like finished work. No stock photography anywhere on this site.
 */
export default function Placeholder({
  label = "Placeholder",
  caption,
  accent = "#87ceeb",
  compact = false,
  className,
}: {
  label?: string;
  caption?: string;
  accent?: string;
  /** Icon only — for tiles too small to carry a label. */
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "placeholder-fill relative flex h-full w-full flex-col items-center justify-center overflow-hidden",
        className,
      )}
      style={{ ["--ph-accent" as string]: accent }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute -inset-[30%] opacity-45 blur-3xl"
        style={{
          background: `radial-gradient(45% 45% at 50% 60%, ${accent}, transparent 70%)`,
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="opacity-70">
          <rect
            x="2.5"
            y="4.5"
            width="19"
            height="15"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path d="M2.5 8.5h19M2.5 15.5h19" stroke="currentColor" strokeWidth="1.1" opacity=".5" />
          <path
            d="M10 10.2v3.6l3.4-1.8z"
            fill="currentColor"
            opacity=".9"
          />
        </svg>
        {compact ? null : (
          <span className="text-[0.62rem] font-bold tracking-[0.22em] text-white/85 uppercase">
            {label}
          </span>
        )}
        {caption && !compact ? (
          <span className="max-w-[16rem] text-[0.7rem] leading-snug text-white/80">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}
