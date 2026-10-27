import Image from "next/image";
import { SkillChip } from "@/components/ui/skill-chip";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

function ProjectLink({
  href,
  label,
  title,
}: {
  href: string;
  label: string;
  title: string;
}) {
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith("//");

  return (
    <Button
      href={href}
      variant="secondary"
      aria-label={`${label} for ${title}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </Button>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      tabIndex={0}
      className="h-full min-w-0 overflow-hidden rounded-xl border border-subtle bg-surface/40 transition-colors hover:border-accent hover:bg-background-secondary/70 focus-within:border-accent focus-within:bg-background-secondary/70"
    >
      {project.image ? (
        <div className="relative aspect-video overflow-hidden border-b border-subtle bg-background-secondary">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc((100vw - 3rem) / 2), 33vw"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}
      <div className="flex h-full min-w-0 flex-col p-5 sm:p-6">
        <h3 className="mb-3 text-xl leading-snug break-words">
          {project.title}
        </h3>
        <p className="mb-5 break-words text-sm text-muted sm:text-base">
          {project.description}
        </p>
        {project.technologies.length > 0 ? (
          <ul className="mb-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <SkillChip key={technology}>{technology}</SkillChip>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-3">
          {project.liveUrl ? (
            <ProjectLink
              href={project.liveUrl}
              label="Live site"
              title={project.title}
            />
          ) : null}
          {project.repoUrl ? (
            <ProjectLink
              href={project.repoUrl}
              label="Source code"
              title={project.title}
            />
          ) : null}
          {project.caseStudyUrl ? (
            <ProjectLink
              href={project.caseStudyUrl}
              label="Case study"
              title={project.title}
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
