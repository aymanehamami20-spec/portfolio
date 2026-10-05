import Counter from "@/components/ui/Counter";
import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SkyGlow from "@/components/ui/SkyGlow";
import { stats } from "@/content/site";

/**
 * Results (PRD §06). These six figures are the only numbers on the site —
 * they are Aymen's own claims, presented cleanly and without embellishment.
 */
export default function Results() {
  return (
    <section
      id="results"
      className="section-pad relative overflow-hidden"
      aria-labelledby="results-heading"
    >
      <SkyGlow className="top-[-16%] right-[-20%] h-[32rem] w-[32rem]" intensity={0.34} />

      <div className="shell relative">
        <SectionHeading
          index="03"
          eyebrow="Results"
          title={<span id="results-heading">Six years, counted.</span>}
          description="Figures from work delivered across fashion, e-commerce, real estate and podcast projects."
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <GlassCard
                className="h-full"
                bodyClassName="flex h-full flex-col justify-between gap-6 p-5 sm:p-7"
              >
                <span className="display text-[clamp(2rem,6vw,3.4rem)] leading-none text-white">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </span>
                <span className="text-[0.82rem] leading-snug text-white/70">
                  {stat.label}
                </span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
