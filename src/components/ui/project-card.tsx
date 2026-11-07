import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      className="relative h-full min-w-0 overflow-hidden rounded-[1.25rem] border border-subtle bg-surface motion-safe:transition-[transform,border-color] motion-safe:duration-300 hover:border-accent motion-safe:hover:-translate-y-1 focus-within:border-accent motion-safe:focus-within:-translate-y-1"
    >
      {project.image ? (
        <div className="relative aspect-video overflow-hidden border-b border-subtle bg-background-secondary">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc((100vw - 4rem) / 2), (max-width: 1279px) calc((100vw - 5rem) / 2), 28rem"
            className="object-cover object-top"
          />
        </div>
      ) : null}
      <div
        className={`min-w-0 px-5 pb-6 pt-3 sm:px-6 ${project.badge ? "pb-12" : ""}`}
      >
        {project.liveUrl || project.repoUrl ? (
          <div className="mb-3 flex items-center justify-between">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${project.title} live site (opens in a new tab)`}
                className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-background-secondary hover:text-accent focus-visible:text-accent"
              >
                <FiExternalLink aria-hidden="true" className="size-5" />
              </a>
            ) : (
              <span aria-hidden="true" className="size-11" />
            )}
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`}
                className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:bg-background-secondary hover:text-accent focus-visible:text-accent"
              >
                <BrandIcon icon="github" className="size-5" />
              </a>
            ) : (
              <span aria-hidden="true" className="size-11" />
            )}
          </div>
        ) : null}
        <h3 className="mb-3 text-center font-heading text-xl leading-snug tracking-[0.12em] text-foreground uppercase break-words">
          {project.title}
        </h3>
        {project.description ? (
          <p className="mx-auto mb-4 line-clamp-2 text-center text-sm text-muted">
            {project.description}
          </p>
        ) : null}
        {project.technologies.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-2">
            {project.technologies.map((technology) => (
              <li
                key={technology}
                className="max-w-full break-words rounded-full bg-foreground px-3 py-1 text-xs font-medium tracking-wide text-background uppercase"
              >
                {technology}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {project.badge ? (
        <span className="absolute bottom-0 right-0 rounded-tl-lg rounded-br-[inherit] bg-foreground px-3 py-1 text-xs font-medium tracking-wide text-background uppercase">
          {project.badge}
        </span>
      ) : null}
    </article>
  );
}
