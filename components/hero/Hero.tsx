"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArcTicker from "./ArcTicker";
import FloatingTiles from "./FloatingTiles";
import Portrait from "./Portrait";
import ToolRails from "./ToolRails";
import SkyGlow from "@/components/ui/SkyGlow";
import ChromeText from "@/components/ui/ChromeText";
import Pill from "@/components/ui/Pill";
import Magnetic from "@/components/ui/Magnetic";
import { Button, ButtonLink } from "@/components/ui/Button";
import ShowreelModal from "@/components/media/ShowreelModal";
import { MessageCircle, Play } from "lucide-react";
import { contact, heroMedia, site } from "@/content/site";
import { useIntro } from "@/components/providers/IntroProvider";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Hero — deliberately spare, following the reference poster: a centred chrome
 * headline over the cut-out portrait rising from the bottom inside a cyan halo,
 * with the ticker ribbon arcing behind it and a few glass chips floating in the
 * side gutters. Nothing else competes with the name and the face.
 *
 * Conversion lives in the nav's WhatsApp pill and the floating WhatsApp button,
 * so the first screen stays a portrait rather than a panel of controls.
 */
export default function Hero() {
  const { ready } = useIntro();
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reelOpen, setReelOpen] = useState(false);

  // Hero elements parallax apart as the section scrolls away.
  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      timeline
        .to(copyRef.current, { y: -120, opacity: 0.1, ease: "none" }, 0)
        .to(stageRef.current, { y: 80, scale: 1.05, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const animateState = ready ? "show" : "hidden";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <ToolRails />

      {/* ---------- Copy ---------- */}
      <div
        ref={copyRef}
        className="shell relative z-30 flex flex-col items-center pt-[calc(var(--nav-h)+1.75rem)] text-center sm:pt-[calc(var(--nav-h)+2.25rem)]"
      >
        <motion.div
          initial="hidden"
          animate={animateState}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
          className="flex w-full flex-col items-center"
        >
          <MaskLine>
            <p className="kicker text-white/85">{site.kicker}</p>
          </MaskLine>

          <h1 id="hero-heading" className="mt-2 sm:mt-3">
            <span className="sr-only">
              {site.name} — {site.role}
            </span>
            <MaskLine hidden>
              <ChromeText as="span" className="display display-xl block">
                Aymen
              </ChromeText>
            </MaskLine>
            <MaskLine hidden>
              <ChromeText as="span" className="display display-xl block">
                Hammami
              </ChromeText>
            </MaskLine>
          </h1>

          <MaskLine className="mt-3 sm:mt-4">
            <p
              className="display text-[clamp(1.05rem,3.1vw,1.9rem)] font-medium text-white/90"
              aria-hidden="true"
            >
              Video Editor <span className="text-[var(--sky)]">&</span> Social
              Media Manager
            </p>
          </MaskLine>

          <motion.div variants={fadeUp} className="mt-4 sm:mt-5">
            <Pill size="sm">{site.yearsExperience} years in the game</Pill>
          </motion.div>

          {/* Primary conversion lives on the first screen (PRD §10.01). */}
          <motion.div
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-7"
          >
            <Magnetic>
              <ButtonLink
                href={contact.whatsapp}
                external
                variant="primary"
                size="md"
                className="sm:px-6 sm:py-3 sm:text-[0.95rem]"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Hire me on WhatsApp
              </ButtonLink>
            </Magnetic>
            {heroMedia.showreel ? (
              <Button
                type="button"
                variant="glass"
                size="md"
                className="sm:px-6 sm:py-3 sm:text-[0.95rem]"
                onClick={() => setReelOpen(true)}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--sky)] text-[var(--bg-0)]">
                  <Play size={12} fill="currentColor" aria-hidden="true" />
                </span>
                Watch showreel
              </Button>
            ) : null}
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- Portrait stage ----------
          `flex-1` rather than an absolute height: the stage simply takes the
          space the copy leaves, so the portrait can never ride up into the
          headline on a short viewport. */}
      <div
        ref={stageRef}
        className="relative z-10 mt-6 min-h-[240px] w-full flex-1"
      >
        {/* Absolute rather than `h-full`: a percentage height does not resolve
            against a flex-sized parent, which collapses the stage to nothing. */}
        <div className="absolute inset-0 mx-auto w-full max-w-3xl">
          <SkyGlow
            className="bottom-[-18%] left-1/2 h-[46rem] w-[58rem] -translate-x-1/2"
            intensity={0.95}
            blur="110px"
          />
          <ArcTicker />
          <div className="absolute inset-0 px-6 sm:px-12">
            <Portrait />
          </div>
          <FloatingTiles />
        </div>
      </div>

      <ShowreelModal
        open={reelOpen}
        onClose={() => setReelOpen(false)}
        src={heroMedia.showreel}
        poster={heroMedia.showreelPoster}
        vertical={heroMedia.showreelVertical}
      />
    </section>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};

/** A headline line sliding up from behind its own mask. */
function MaskLine({
  children,
  className,
  hidden = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Decorative duplicate of copy already exposed elsewhere. */
  hidden?: boolean;
}) {
  return (
    <span
      className={`block overflow-hidden pb-[0.08em] ${className ?? ""}`}
      aria-hidden={hidden || undefined}
    >
      <motion.span
        className="block"
        variants={{
          hidden: { y: "110%" },
          show: { y: "0%", transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
