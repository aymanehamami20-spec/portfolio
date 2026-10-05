"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import HoverVideo from "@/components/media/HoverVideo";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import SkyGlow from "@/components/ui/SkyGlow";
import { services } from "@/content/site";
import { useIsDesktopPointer } from "@/lib/hooks";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The nine PRD services as an interactive list. A row opens on hover
 * (desktop) or tap (touch) to reveal one line and a looping mini clip.
 */
export default function Services() {
  const [openId, setOpenId] = useState<string | null>(services[0].id);
  const isDesktop = useIsDesktopPointer();

  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden"
      aria-labelledby="services-heading"
    >
      <SkyGlow className="bottom-[-22%] left-[-20%] h-[30rem] w-[30rem]" intensity={0.38} />

      <div className="shell relative">
        <SectionHeading
          index="04"
          eyebrow="Services"
          title={<span id="services-heading">What I take off your plate.</span>}
          description="From one edit to the whole account — briefed or unbriefed."
        />

        <ul className="mt-10 border-t border-white/10">
          {services.map((service, index) => {
            const open = openId === service.id;
            return (
              <Reveal key={service.id} delay={Math.min(index * 0.04, 0.24)}>
                <li
                  className="border-b border-white/10"
                  onMouseEnter={() => isDesktop && setOpenId(service.id)}
                >
                  <button
                    type="button"
                    className="group flex w-full items-center gap-4 py-5 text-left sm:gap-6 sm:py-6"
                    aria-expanded={open}
                    aria-controls={`service-panel-${service.id}`}
                    onClick={() => setOpenId(open ? null : service.id)}
                  >
                    <span
                      className={cn(
                        "w-7 shrink-0 text-[0.7rem] font-bold tabular-nums transition-colors",
                        open ? "text-[var(--sky-light)]" : "text-white/55",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "display flex-1 text-[clamp(1.25rem,3.6vw,2.1rem)] transition-colors duration-300",
                        open ? "text-white" : "text-white/85",
                      )}
                    >
                      {service.title}
                    </span>

                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        open
                          ? "rotate-45 border-[var(--sky-light)]/70 bg-[var(--sky)]/20 text-[var(--sky-light)]"
                          : "border-white/25 text-white/70 group-hover:border-white/45",
                      )}
                      aria-hidden="true"
                    >
                      <Plus size={15} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        id={`service-panel-${service.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-5 pb-6 pl-11 sm:pl-13">
                          <p className="muted max-w-xl flex-1 text-pretty sm:text-[1.02rem]">
                            {service.line}
                          </p>
                          {service.poster || service.clip ? (
                          <div className="relative ml-auto hidden aspect-[3/4] w-24 shrink-0 overflow-hidden rounded-[12px] ring-1 ring-white/15 sm:block">
                            <HoverVideo
                              video={service.clip}
                              poster={service.poster}
                              alt={`${service.title} — example from the portfolio`}
                              compact
                              sizes="96px"
                            />
                          </div>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
