import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import HoverVideo from "@/components/media/HoverVideo";
import { aspectRatio, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * One hero project. The work is shown clean — nothing printed over it — with
 * a short caption underneath (PRD §09: large media, minimal copy). Social
 * designs already carry their own type, so overlaying ours would fight it.
 */
export default function WorkCard({
  project,
  className,
  sizes,
  priority = false,
}: {
  project: Project;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const headline = project.results[0];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group glass relative block overflow-hidden rounded-[var(--radius-lg)] p-2.5 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5",
        className,
      )}
      aria-label={`${project.title} — view case study`}
    >
      <div
        className="relative w-full overflow-hidden rounded-[calc(var(--radius-lg)-8px)]"
        style={{ aspectRatio: aspectRatio[project.aspect] }}
      >
        <HoverVideo
          video={project.video}
          poster={project.poster.src ?? project.cover.src}
          alt={project.poster.alt}
          accent={project.accent}
          placeholderCaption={`${project.client} — add cover + clip to /public/media/projects/${project.slug}`}
          sizes={sizes ?? "(max-width: 768px) 92vw, 30vw"}
          priority={priority}
          className="transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
        />

        <span className="absolute top-3 left-3 rounded-full bg-[var(--bg-0)]/75 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.04em] text-white backdrop-blur-md">
          {project.format}
        </span>
      </div>

      <div className="px-2 pt-4 pb-2.5">
        <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--sky-light)]/90 uppercase">
          {project.client}
        </p>

        {headline ? (
          <p className="display mt-2 text-[1.5rem] leading-none text-[var(--sky)]">
            {headline.value}{" "}
            <span className="text-[0.7rem] font-medium tracking-[0.12em] text-white/70 uppercase">
              {headline.label}
            </span>
          </p>
        ) : null}

        <h3 className="display mt-1.5 text-[1.2rem] leading-tight text-white sm:text-[1.3rem]">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-snug text-white/70">
          {project.summary}
        </p>

        <span className="mt-3 inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-white">
          View case
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
