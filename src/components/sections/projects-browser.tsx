"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useMotionPreferences } from "@/components/motion/motion-preferences";
import { ProjectCard } from "@/components/ui/project-card";
import {
  projectCategories,
  type Project,
  type ProjectCategoryFilterId,
} from "@/content/projects";

type ProjectsBrowserProps = {
  projects: Project[];
  emptyCategoryMessage: string;
};

export function ProjectsBrowser({
  projects,
  emptyCategoryMessage,
}: ProjectsBrowserProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategoryFilterId>("general");
  const { reducedMotion } = useMotionPreferences();
  const selectedCategory = projectCategories.find(
    (category) => category.id === activeCategory,
  );
  const visibleProjects =
    activeCategory === "general"
      ? projects
      : projects.filter((project) =>
          project.categories.includes(activeCategory),
        );

  return (
    <div className="space-y-8">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {projectCategories.map((category) => {
          const count =
            category.id === "general"
              ? projects.length
              : projects.filter((project) =>
                  project.categories.includes(category.id),
                ).length;
          const isActive = category.id === activeCategory;

          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                isActive
                  ? "border-accent bg-accent text-background hover:bg-accent-secondary"
                  : "border-subtle bg-surface/40 text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              <span>{category.label}</span>
              <span
                aria-hidden="true"
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isActive ? "bg-background/15" : "bg-background-secondary"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <p role="status" aria-live="polite" className="sr-only">
        Showing {visibleProjects.length}{" "}
        {visibleProjects.length === 1 ? "project" : "projects"} in{" "}
        {selectedCategory?.label}
      </p>
      {visibleProjects.length === 0 ? (
        <p className="text-center text-muted">{emptyCategoryMessage}</p>
      ) : (
        <ul className="flex flex-wrap justify-center gap-4">
          {visibleProjects.map((project, index) => (
            <motion.li
              key={`${activeCategory}-${project.id}`}
              data-motion=""
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reducedMotion ? 0 : 0.3,
                delay: reducedMotion ? 0 : index * 0.05,
                ease: "easeOut",
              }}
              className="w-full min-w-0 max-w-[28rem] md:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.667rem)]"
            >
              <div className="flex h-full min-w-0 items-stretch gap-2">
                {project.brand ? (
                  <span className="flex shrink-0 items-center [writing-mode:vertical-rl] text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    {project.brand}
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <ProjectCard project={project} />
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
