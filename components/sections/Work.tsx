"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import WorkCard from "./WorkCard";
import SectionHeading from "@/components/ui/SectionHeading";
import SkyGlow from "@/components/ui/SkyGlow";
import { featuredProjects as projects } from "@/content/projects";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Selected Work.
 *
 * Desktop: the section pins and the rail scrolls horizontally, with an
 * editing-timeline scrubber reporting progress. Below `lg`, or under
 * `prefers-reduced-motion`, it degrades to a plain vertical stack of cards.
 */
export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reducedMotion = usePrefersReducedMotion();
  const horizontal = isDesktop && !reducedMotion;

  useEffect(() => {
    if (!horizontal || !railRef.current || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const rail = railRef.current;
      if (!rail) return;
      const distance = () => Math.max(0, rail.scrollWidth - window.innerWidth);

      const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
      const scaleTo = gsap.quickTo(cards, "scale", {
        duration: 0.5,
        ease: "power3.out",
      });

      const total = projects.length;
      let shownIndex = 0;

      gsap.to(rail, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Written straight to the DOM. `scrub` keeps firing this every
            // frame while it settles, and routing it through state would
            // re-render every card in the rail at scroll framerate.
            if (fillRef.current) {
              fillRef.current.style.width = `${Math.max(2, self.progress * 100)}%`;
            }
            const index = Math.min(total, Math.floor(self.progress * total) + 1);
            if (index !== shownIndex && indexRef.current) {
              shownIndex = index;
              indexRef.current.textContent = String(index).padStart(2, "0");
            }
            // Scrub keeps firing as it settles, so this decays back to 1.
            const velocity = Math.min(1, Math.abs(self.getVelocity()) / 3000);
            scaleTo(1 - velocity * 0.055);
          },
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [horizontal]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden"
      aria-labelledby="work-heading"
    >
      <SkyGlow className="top-[8%] left-[-18%] h-[32rem] w-[32rem]" intensity={0.4} />
      <SkyGlow className="right-[-18%] bottom-[-12%] h-[28rem] w-[28rem]" intensity={0.36} />

      {horizontal ? (
        /* ---------- Desktop: pinned horizontal rail ---------- */
        <div className="relative flex h-[100svh] flex-col justify-center pt-[var(--nav-h)] pb-16">
          <div
            ref={railRef}
            className="flex items-center gap-8 pr-[8vw] pl-[clamp(1rem,4vw,3.5rem)] will-change-transform"
          >
            <div className="w-[min(30vw,420px)] shrink-0 pr-6">
              <SectionHeading
                index="02"
                eyebrow="Selected Work"
                title={<span id="work-heading">Work that earns the scroll.</span>}
                description="Reels, podcast clips, ads and launch campaigns — for creators, brands and my own page."
              />
              <p className="muted mt-7 flex items-center gap-2 text-[0.8rem]">
                Scroll to move the rail
                <ArrowRight size={15} aria-hidden="true" />
              </p>
            </div>

            {projects.map((project, index) => (
              <div
                key={project.slug}
                data-work-card
                className="w-[min(25vw,310px)] shrink-0 will-change-transform"
              >
                <WorkCard
                  project={project}
                  priority={index === 0}
                  sizes="30vw"
                />
              </div>
            ))}
          </div>

          <TimelineScrubber
            count={projects.length}
            fillRef={fillRef}
            indexRef={indexRef}
          />
        </div>
      ) : (
        /* ---------- Mobile / reduced motion: vertical cards ---------- */
        <div className="shell section-pad">
          <SectionHeading
            index="02"
            eyebrow="Selected Work"
            title={<span id="work-heading">Work that earns the scroll.</span>}
            description="Reels, podcast clips, ads and launch campaigns — for creators, brands and my own page."
          />

          <div className="mt-10 flex flex-col gap-6 sm:grid sm:grid-cols-2 sm:gap-7">
            {projects.map((project, index) => (
              <WorkCard
                key={project.slug}
                project={project}
                priority={index === 0}
                sizes="(max-width: 640px) 92vw, 45vw"
                className="snap-start"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Progress bar styled as a sequence timeline with one clip per project.
 * Purely presentational: the pinned ScrollTrigger drives it through these refs
 * rather than through props, so scrolling never re-renders the rail.
 */
function TimelineScrubber({
  count,
  fillRef,
  indexRef,
}: {
  count: number;
  fillRef: RefObject<HTMLDivElement | null>;
  indexRef: RefObject<HTMLSpanElement | null>;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-x-[clamp(1rem,4vw,3.5rem)] bottom-10 z-10"
      aria-hidden="true"
    >
      <div className="flex items-center gap-3">
        <span className="text-[0.6rem] font-bold tracking-[0.2em] text-white/65 uppercase">
          <span ref={indexRef}>01</span>
          <span className="text-white/90"> / {String(count).padStart(2, "0")}</span>
        </span>

        <div className="relative h-[10px] flex-1 overflow-hidden rounded-[3px] bg-white/[0.06] p-[2px]">
          <div className="flex h-full gap-[2px]">
            {Array.from({ length: count }).map((_, index) => (
              <span
                key={index}
                className="h-full flex-1 rounded-[2px] bg-white/10"
              />
            ))}
          </div>
          {/* No width transition: the pinned trigger rewrites this every
              frame, so a transition would only ever restart and lag behind. */}
          <div
            ref={fillRef}
            className="absolute inset-y-0 left-0 rounded-[3px] bg-[linear-gradient(90deg,rgba(33,110,140,.85),#87ceeb)]"
            style={{ width: "2%" }}
          />
        </div>

        <span className="relative h-4 w-[2px] bg-[var(--sky)] shadow-[0_0_10px_2px_rgba(135,206,235,.8)]" />
      </div>
    </div>
  );
}
