import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ui/project-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, projectsSection } from "@/content/projects";

function ProjectsComingSoon() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center rounded-xl border border-subtle bg-surface/40 px-6 py-10 text-center sm:px-10 sm:py-12">
      <div
        aria-hidden="true"
        className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-subtle bg-background-secondary text-accent"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-7-2 4" />
        </svg>
      </div>
      <h3 className="mb-4 text-xl sm:text-2xl">
        {projectsSection.comingSoonTitle}
      </h3>
      <p className="mb-7 max-w-[55ch] break-words text-muted">
        {projectsSection.comingSoonMessage}
      </p>
      <Button href={projectsSection.ctaHref}>{projectsSection.ctaLabel}</Button>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container>
        <div className="space-y-10">
          <SectionHeading
            id="projects-heading"
            title={projectsSection.heading}
            intro={projectsSection.intro}
          />
          {projects.length === 0 ? (
            <ProjectsComingSoon />
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <li key={project.id} className="min-w-0">
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </Section>
  );
}
