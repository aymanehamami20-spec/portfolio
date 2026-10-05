import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Navy translucent card with a pill tab sitting on its top edge — the
 * "DEVICES ALLOWED" card from the reference poster, generalised.
 */
export default function GlassCard({
  label,
  children,
  className,
  bodyClassName,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div className={cn("relative", label && "pt-4", className)}>
      {label ? (
        <span
          className="absolute top-0 left-6 z-10 rounded-full border border-white/30 bg-[linear-gradient(180deg,#a8dcf2,#87ceeb)] px-4 py-1.5 text-[0.65rem] font-bold tracking-[0.18em] text-[var(--bg-0)] uppercase shadow-[0_8px_24px_-10px_rgba(135,206,235,.85)]"
          aria-hidden="true"
        >
          {label}
        </span>
      ) : null}
      <div
        className={cn(
          "glass rounded-[var(--radius-card)] p-5 sm:p-6",
          label && "pt-7 sm:pt-8",
          bodyClassName,
        )}
      >
        {label ? <span className="sr-only">{label}</span> : null}
        {children}
      </div>
    </div>
  );
}
