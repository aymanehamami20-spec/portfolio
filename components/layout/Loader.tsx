"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { useIntro } from "@/components/providers/IntroProvider";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { EASE_OUT_EXPO } from "@/lib/motion";

const SESSION_KEY = "ah-intro-seen";

/**
 * Intro: a timeline playhead sweeps across, the name cuts in like an edit,
 * then the panel wipes off the hero. Roughly 1.2s, once per session, and
 * skipped entirely under `prefers-reduced-motion`.
 */
export default function Loader() {
  const { complete } = useIntro();
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<"pending" | "playing" | "done">("pending");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* Private mode — treat as unseen but never block the page. */
    }

    if (seen || reducedMotion) {
      setPhase("done");
      complete();
      return;
    }

    setPhase("playing");
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* ignore */
    }

    const revealTimer = window.setTimeout(complete, 1000);
    const endTimer = window.setTimeout(() => setPhase("done"), 1250);
    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(endTimer);
    };
  }, [complete, reducedMotion]);

  // Freeze the page behind the curtain, so the intro cannot be scrolled past
  // and the hero is where it belongs the moment the panel wipes off.
  useEffect(() => {
    if (phase !== "playing") return;
    lockScroll();
    return () => unlockScroll();
  }, [phase]);

  return (
    <AnimatePresence>
      {phase === "playing" ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[var(--bg-0)]"
          initial={{ opacity: 1 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
          aria-hidden="true"
        >
          <div className="relative w-full max-w-3xl px-6">
            {/* Name cutting in, one segment at a time. */}
            <motion.p
              className="display display-md text-chrome text-center"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{
                clipPath: [
                  "inset(0 100% 0 0)",
                  "inset(0 62% 0 0)",
                  "inset(0 30% 0 0)",
                  "inset(0 0% 0 0)",
                ],
              }}
              transition={{ duration: 0.72, times: [0, 0.3, 0.62, 1], ease: "linear" }}
            >
              {site.name}
            </motion.p>

            {/* Timeline track + sweeping playhead. */}
            <div className="relative mx-auto mt-8 h-[3px] w-full overflow-visible rounded-full bg-white/10">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,rgba(135,206,235,.25),#87ceeb)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute -top-[7px] h-[17px] w-[2px] bg-[#87ceeb] shadow-[0_0_16px_3px_rgba(135,206,235,.85)]"
                initial={{ left: "0%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 0.85, ease: [0.5, 0, 0.2, 1] }}
              />
            </div>
          </div>

          {/* Blue slice that leads the wipe. */}
          <motion.span
            className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--sky)]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: "left" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
