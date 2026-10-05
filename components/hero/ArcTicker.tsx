"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame, useScroll, useVelocity } from "motion/react";
import { tickerWords } from "@/content/site";
import { usePrefersReducedMotion } from "@/lib/hooks";

const ARC = "M 0 96 Q 600 300 1200 96";
const PHRASE = `${tickerWords.join("  •  ")}  •  `;
const REPEATS = 8;

/**
 * The curved ribbon from the reference poster, wrapping behind the portrait.
 * Text rides an SVG arc via `textPath`; the loop is seamless because the
 * offset wraps by exactly one phrase width. Scrolling speeds it up.
 */
export default function ArcTicker() {
  const textRef = useRef<SVGTextElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const offsetRef = useRef(0);
  const [unit, setUnit] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // One phrase width, measured from the rendered glyph advances.
  useEffect(() => {
    const measure = () => {
      const node = textRef.current;
      if (!node) return;
      try {
        setUnit(node.getComputedTextLength() / REPEATS);
      } catch {
        setUnit(0);
      }
    };
    measure();
    // Re-measure once webfonts have settled, since advances change.
    if (document.fonts?.ready) void document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (reducedMotion || unit === 0 || !textPathRef.current) return;
    const boost = Math.min(220, Math.abs(scrollVelocity.get()) * 0.06);
    offsetRef.current -= ((58 + boost) * delta) / 1000;
    if (offsetRef.current <= -unit) offsetRef.current += unit;
    textPathRef.current.setAttribute("startOffset", String(offsetRef.current));
  });

  return (
    <svg
      className="pointer-events-none absolute inset-x-[-22%] bottom-[30%] h-auto w-[144%] select-none sm:bottom-[20%]"
      viewBox="0 0 1200 320"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <path id="arc-ticker-path" d={ARC} />
        <linearGradient id="arc-ribbon" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dff2fa" stopOpacity="0" />
          <stop offset="18%" stopColor="#dff2fa" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="82%" stopColor="#dff2fa" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#dff2fa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="arc-text" x1="0" y1="0" x2="1200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#216e8c" stopOpacity="0" />
          <stop offset="20%" stopColor="#124154" stopOpacity="1" />
          <stop offset="80%" stopColor="#124154" stopOpacity="1" />
          <stop offset="100%" stopColor="#216e8c" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* The ribbon band the text sits on. */}
      <use
        href="#arc-ticker-path"
        stroke="url(#arc-ribbon)"
        strokeWidth="50"
        strokeLinecap="butt"
        opacity="0.92"
      />
      <use
        href="#arc-ticker-path"
        stroke="url(#arc-ribbon)"
        strokeWidth="1.2"
        opacity="0.5"
      />

      <text
        ref={textRef}
        fill="url(#arc-text)"
        className="font-bold"
        dominantBaseline="central"
        style={{ fontSize: 28, letterSpacing: "0.1em" }}
      >
        <textPath ref={textPathRef} href="#arc-ticker-path" startOffset="0">
          {PHRASE.repeat(REPEATS)}
        </textPath>
      </text>
    </svg>
  );
}
