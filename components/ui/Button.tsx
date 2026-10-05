import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "glass" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)] disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "btn-glossy hover:-translate-y-0.5",
  glass:
    "glass text-[var(--ink)] hover:border-white/35 hover:bg-white/5 hover:-translate-y-0.5",
  ghost: "text-[var(--ink)]/80 hover:text-[var(--ink)]",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[0.95rem] sm:px-8 sm:py-4 sm:text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({
  href,
  external,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "children" | "className"
  >) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, "children" | "className">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
