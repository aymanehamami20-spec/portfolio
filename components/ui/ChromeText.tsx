import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Chrome-gradient display type. The shimmer sweep and the gradient itself live
 * in `.text-chrome` (globals.css) so the effect stays one definition.
 * Display words only — never body copy.
 */
export default function ChromeText({
  as: Tag = "span",
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={cn("text-chrome", className)}>{children}</Tag>;
}
