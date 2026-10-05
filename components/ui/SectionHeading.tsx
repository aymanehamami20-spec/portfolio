import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        align === "center" && "flex flex-col items-center text-center",
        className,
      )}
    >
      <p className="eyebrow flex items-center gap-2">
        {index ? (
          <span className="text-[var(--sky)]">{index}</span>
        ) : null}
        <span className="h-px w-6 bg-white/25" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="display display-md mt-4 text-white">{title}</h2>
      {description ? (
        <p className="muted mt-4 max-w-xl text-pretty sm:text-[1.05rem]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
