import ChromeText from "@/components/ui/ChromeText";
import GlassCard from "@/components/ui/GlassCard";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SkyGlow from "@/components/ui/SkyGlow";
import { industries, site } from "@/content/site";

/** About (PRD §05, §12) — experience, adaptability, problem-solving. */
export default function About() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      <SkyGlow className="top-[4%] right-[-22%] h-[32rem] w-[32rem]" intensity={0.38} />

      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            index="05"
            eyebrow="About"
            title={
              <span id="about-heading">
                <ChromeText>6 years</ChromeText> in the game.
              </span>
            }
          />

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-pretty text-[1.05rem] leading-relaxed text-white/75 sm:text-[1.2rem]">
              From short-form content and editing to social media management and
              growth, I adapt to the situation, find the solution and execute.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="muted mt-5 max-w-2xl text-pretty">
              Based in {site.location}, working with clients locally and
              internationally. I take a business need and turn it into content
              that performs — concept, shoot, edit, publish, then read the
              numbers and do it better.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8">
              <p className="eyebrow">Industries</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <Pill key={industry}>{industry}</Pill>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={0.1}>
            <GlassCard label="The difference">
              <p className="display text-[clamp(1.5rem,3.4vw,2.1rem)] leading-[1.05] text-white">
                &ldquo;I&rsquo;m a solution finder. I can adapt to any situation
                at work.&rdquo;
              </p>
              <p className="muted mt-5 text-[0.95rem]">
                No brief, no crew, no time — the work still ships. That
                adaptability is what clients keep me for, more than any single
                tool or format.
              </p>

              <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-white/10 pt-6">
                <div>
                  <dt className="eyebrow">Experience</dt>
                  <dd className="display mt-1.5 text-[1.5rem] text-white">
                    {site.yearsExperience} years
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Based in</dt>
                  <dd className="display mt-1.5 text-[1.5rem] text-white">
                    Batna, DZ
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Handle</dt>
                  <dd className="display mt-1.5 text-[1.5rem] text-white">
                    {site.handle}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Works with</dt>
                  <dd className="display mt-1.5 text-[1.5rem] text-white">
                    Brands & creators
                  </dd>
                </div>
              </dl>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
