import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { moreProjects } from "@/content/projects";

/** Secondary projects — reachable, but kept out of the hero rail (PRD §08). */
export default function MoreWork() {
  if (moreProjects.length === 0) return null;

  return (
    <section className="shell pb-[clamp(3rem,6vw,5rem)]" aria-labelledby="more-work-heading">
      <Reveal>
        <h2 id="more-work-heading" className="eyebrow">
          More work
        </h2>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 sm:gap-5">
        {moreProjects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.06}>
            <Link
              href={`/work/${project.slug}`}
              className="glass group flex items-center gap-4 rounded-[var(--radius-lg)] p-3 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1"
            >
              <span className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[12px]">
                {project.cover.src ? (
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.6rem] font-semibold tracking-[0.16em] text-[var(--sky-light)] uppercase">
                  {project.client}
                </span>
                <span className="display mt-1 block text-[1.05rem] leading-tight text-white">
                  {project.title}
                </span>
                <span className="mt-1 block text-[0.75rem] text-white/65">
                  {project.format}
                </span>
              </span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
