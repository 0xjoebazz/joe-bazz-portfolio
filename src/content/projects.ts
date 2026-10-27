export type Project = {
  id: string;
  title: string;
  description: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
};

// Add real projects here; keep project images local under public/images/projects/.
export const projects: Project[] = [];

export const projectsSection = {
  heading: "Projects",
  intro: "Selected work, coming soon.",
  comingSoonTitle: "Projects are on the way",
  comingSoonMessage:
    "Real projects, screenshots and links will appear here soon. In the meantime, I'd be glad to talk about what you'd like to build.",
  ctaLabel: "Let's Talk",
  ctaHref: "#contact",
} as const;
