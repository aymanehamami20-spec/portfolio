"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Placeholder from "./Placeholder";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Fullscreen showreel player. Escape closes, focus is trapped inside while
 * open, and the page beneath is frozen.
 */
export default function ShowreelModal({
  open,
  onClose,
  src,
  poster,
  vertical = false,
}: {
  open: boolean;
  onClose: () => void;
  src: string | null;
  poster: string | null;
  /** 9:16 reel instead of a 16:9 film. */
  vertical?: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  // Held in a ref so the effect below can depend on `open` alone. Callers pass
  // `onClose` as an inline arrow, so keying the effect on it would re-run the
  // whole open/close sequence on every parent render — releasing the scroll
  // lock and yanking focus out of the video each time.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video[controls], [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    lockScroll();
    document.addEventListener("keydown", handleKeyDown);
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      unlockScroll();
      restoreFocusRef.current?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Showreel"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-[#030d14]/90 backdrop-blur-md"
            onClick={onClose}
            aria-label="Close showreel"
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            className={vertical ? "relative w-[min(420px,88vw,calc(84svh*9/16))]" : "relative w-full max-w-5xl"}
            initial={{ scale: 0.94, y: 18, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
          >
            <div className={`glass relative w-full overflow-hidden rounded-[var(--radius-lg)] ${vertical ? "aspect-[9/16]" : "aspect-video"}`}>
              {src ? (
                <video
                  className="h-full w-full object-cover"
                  src={src}
                  poster={poster ?? undefined}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Placeholder
                  label="Showreel placeholder"
                  caption="Drop showreel.mp4 into /public/media/hero and set heroMedia.showreel in content/site.ts"
                />
              )}
            </div>

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="glass absolute -top-3 -right-1 flex h-11 w-11 items-center justify-center rounded-full transition hover:border-white/40 sm:-top-5 sm:-right-5"
              aria-label="Close showreel"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
