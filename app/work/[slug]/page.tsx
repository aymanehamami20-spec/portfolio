import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import HoverVideo from "@/components/media/HoverVideo";
import Placeholder from "@/components/media/Placeholder";
import ChromeText from "@/components/ui/ChromeText";
import GlassCard from "@/components/ui/GlassCard";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { ButtonLink } from "@/components/ui/Button";
import {
  aspectRatio,
  getNextProject,
  getProject,
  projects,
  type Project,
} from "@/content/projects";
import { contact, site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

/**
 * Vertical work would otherwise render a near-full-screen block on desktop,
 * so each aspect gets a sensible ceiling.
 */
const heroMediaWidth: Record<Project["aspect"], string> = {
  "9:16": "max-w-[290px] sm:max-w-[330px]",
  "3:4": "max-w-[400px]",
  "4:5": "max-w-[420px]",
  "1:1": "max-w-[460px]",
  "16:9": "max-w-full",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — ${project.client}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} — ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);

  return (
    <article className="relative">
      {/* ---------- Hero ---------- */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] pb-12 sm:pb-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60 blur-[90px]"
          style={{
            background: `radial-gradient(50% 45% at 50% 0%, ${project.accent}55 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="shell relative">
          <Link
            href="/#work"
            className="muted inline-flex items-center gap-2 text-[0.85rem] font-medium transition-colors hover:text-white"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            All work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                {project.client} · {project.industry} · {project.year}
              </p>
              <h1 className="display display-lg mt-5">
                <ChromeText>{project.title}</ChromeText>
              </h1>
              <p className="muted mt-6 max-w-xl text-pretty sm:text-[1.1rem]">
                {project.summary}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div
                className={`glass relative mx-auto w-full overflow-hidden rounded-[var(--radius-lg)] lg:mr-0 ${heroMediaWidth[project.aspect]}`}
                style={{ aspectRatio: aspectRatio[project.aspect] }}
              >
                <HoverVideo
                  video={project.video}
                  poster={project.cover.src ?? project.poster.src}
                  alt={project.cover.alt}
                  accent={project.accent}
                  placeholderCaption={`Add cover + clip to /public/media/projects/${project.slug}`}
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ---------- Story ---------- */}
      <section className="shell grid gap-10 pb-16 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <Block title="Challenge" body={project.challenge} />
          <Block title="Aymen's role" body={project.role} />
          <Block title="Creative approach" body={project.approach} />
        </div>

        <aside className="flex flex-col gap-5 lg:col-span-5">
          <Reveal>
            <GlassCard label="Deliverables">
              <ul className="flex flex-col gap-3">
                {project.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] text-white/80"
                  >
                    <span
                      className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--sky)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {project.results.length > 0 ? (
            <Reveal delay={0.08}>
              <GlassCard label="Results">
                <dl className="grid grid-cols-2 gap-4">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <dt className="text-[0.75rem] text-white/65">
                        {result.label}
                      </dt>
                      <dd className="display mt-1 text-[1.75rem] text-white">
                        {result.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </GlassCard>
            </Reveal>
          ) : null}

          <Reveal delay={0.14}>
            <div className="flex flex-wrap gap-2">
              <Pill size="sm">{project.industry}</Pill>
              <Pill size="sm">{project.year}</Pill>
              <Pill size="sm">{project.format}</Pill>
            </div>
          </Reveal>
        </aside>
      </section>

      {/* ---------- Gallery ---------- */}
      <section className="shell pb-16" aria-labelledby="gallery-heading">
        <Reveal>
          <h2 id="gallery-heading" className="eyebrow">
            Selected media
          </h2>
        </Reveal>

        {project.gallery.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 items-start gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {project.gallery.map((item, index) => (
              <Reveal
                key={item.src ?? index}
                delay={Math.min((index % 4) * 0.05, 0.2)}
              >
                <figure
                  className="glass relative overflow-hidden rounded-[var(--radius-card)]"
                  style={{
                    aspectRatio:
                      item.width && item.height
                        ? `${item.width} / ${item.height}`
                        : aspectRatio[project.aspect],
                  }}
                >
                  {item.video ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover"
                      src={item.video}
                      poster={item.src ?? undefined}
                      controls
                      playsInline
                      preload="none"
                      aria-label={item.alt}
                    />
                  ) : item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 23vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.03]"
                    />
                  ) : (
                    <Placeholder accent={project.accent} compact />
                  )}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className="glass relative overflow-hidden rounded-[var(--radius-card)]"
                style={{ aspectRatio: aspectRatio[project.aspect] }}
              >
                <Placeholder
                  accent={project.accent}
                  caption={`/public/media/projects/${project.slug}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ---------- Next + CTA ---------- */}
      <section className="shell pb-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Link
              href={`/work/${next.slug}`}
              className="glass group flex h-full flex-col justify-between gap-8 rounded-[var(--radius-lg)] p-6 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 sm:p-8"
            >
              <span className="eyebrow">Next project</span>
              <span>
                <span className="display block text-[clamp(1.4rem,3.4vw,2.1rem)] text-white">
                  {next.title}
                </span>
                <span className="muted mt-2 flex items-center gap-1.5 text-[0.85rem]">
                  {next.client} · {next.industry}
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </span>
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass flex h-full flex-col justify-between gap-8 rounded-[var(--radius-lg)] p-6 sm:p-8">
              <span className="eyebrow">Work with me</span>
              <div>
                <p className="display text-[clamp(1.4rem,3.4vw,2.1rem)] text-white">
                  Got a project like this?
                </p>
                <Magnetic className="mt-6 inline-block">
                  <ButtonLink
                    href={contact.whatsapp}
                    external
                    variant="primary"
                    size="lg"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    {contact.whatsappLabel}
                  </ButtonLink>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <Reveal>
      <div className="border-t border-white/10 pt-6">
        <h2 className="eyebrow">{title}</h2>
        <p className="mt-4 max-w-2xl text-pretty text-[1.02rem] leading-relaxed text-white/75 sm:text-[1.12rem]">
          {body}
        </p>
      </div>
    </Reveal>
  );
}
