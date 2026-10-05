import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The outlined badge from the reference poster: dark translucent fill,
 * hairline light border, backdrop blur.
 */
export default function Pill({
  children,
  className,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "glass-soft inline-flex items-center gap-2 rounded-full whitespace-nowrap",
        size === "sm"
          ? "px-3 py-1 text-[0.7rem] tracking-[0.14em] uppercase"
          : "px-4 py-2 text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
