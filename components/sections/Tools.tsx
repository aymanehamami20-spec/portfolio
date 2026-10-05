import GlassCard from "@/components/ui/GlassCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SkyGlow from "@/components/ui/SkyGlow";
import { gear, software } from "@/content/site";

/**
 * Tools & production (PRD §11). Deliberately light — equipment is supporting
 * proof, not the selling point.
 */
export default function Tools() {
  return (
    <section
      id="tools"
      className="section-pad relative overflow-hidden"
      aria-labelledby="tools-heading"
    >
      <SkyGlow className="bottom-[-18%] right-[-14%] h-[28rem] w-[30rem]" intensity={0.36} />

      <div className="shell relative">
        <SectionHeading
          index="07"
          eyebrow="Tools & production"
          title={<span id="tools-heading">The stack behind the work.</span>}
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <Reveal className="h-full">
            <GlassCard label="Software" className="h-full">
              <ul className="flex flex-wrap gap-2">
                {software.map((item) => (
                  <li
                    key={item}
                    className="glass-soft rounded-full px-3.5 py-2 text-[0.85rem] text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.08} className="h-full">
            <GlassCard label="Production" className="h-full">
              <ul className="flex flex-wrap gap-2">
                {gear.map((item) => (
                  <li
                    key={item}
                    className="glass-soft rounded-full px-3.5 py-2 text-[0.85rem] text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
