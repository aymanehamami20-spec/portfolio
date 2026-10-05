"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Placeholder from "./Placeholder";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Poster-first video tile.
 *
 * - `preload="none"`; the source is only attached once the tile is in view.
 * - Desktop plays on hover, mobile plays while in view.
 * - Always pauses off-screen, and never autoplays under reduced motion.
 */
export default function HoverVideo({
  video,
  poster,
  alt,
  accent = "#87ceeb",
  placeholderCaption,
  compact = false,
  className,
  sizes = "(max-width: 768px) 92vw, 30vw",
  priority = false,
  active = true,
}: {
  video: string | null;
  poster: string | null;
  alt: string;
  accent?: string;
  placeholderCaption?: string;
  /** Icon-only placeholder, for tiles too small to carry a label. */
  compact?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Parent can force playback (e.g. the focused card in a carousel). */
  active?: boolean;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isDesktop = useIsDesktopPointer();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const shouldPlay =
    !reducedMotion &&
    inView &&
    active &&
    Boolean(video) &&
    (isDesktop ? hovered : true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (shouldPlay) {
      void el.play().catch(() => {
        /* Autoplay can be refused; the poster stays visible. */
      });
    } else {
      el.pause();
      if (!inView) el.currentTime = 0;
    }
  }, [shouldPlay, inView]);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {poster ? (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover transition-opacity duration-500",
            shouldPlay ? "opacity-0" : "opacity-100",
          )}
        />
      ) : (
        <Placeholder
          accent={accent}
          caption={placeholderCaption}
          compact={compact}
          className={cn(
            "transition-opacity duration-500",
            shouldPlay ? "opacity-0" : "opacity-100",
          )}
        />
      )}

      {video && inView ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            shouldPlay ? "opacity-100" : "opacity-0",
          )}
          src={video}
          poster={poster ?? undefined}
          preload="none"
          muted
          loop
          playsInline
          aria-label={alt}
        />
      ) : null}
    </div>
  );
}
