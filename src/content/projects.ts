export type ProjectCategoryId = "react" | "ui-ux" | "shopify" | "typescript";
export type ProjectCategoryFilterId = "general" | ProjectCategoryId;

export const projectCategories = [
  { id: "general", label: "General" },
  { id: "react", label: "React" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "shopify", label: "Shopify" },
  { id: "typescript", label: "TypeScript" },
] as const satisfies readonly {
  id: ProjectCategoryFilterId;
  label: string;
}[];

export type Project = {
  id: string;
  title: string;
  technologies: string[];
  categories: ProjectCategoryId[];
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  liveUrl?: string;
  repoUrl?: string;
  brand?: string;
  badge?: string;
  description?: string;
};

// React includes React-based frameworks such as Next.js; TypeScript means built with TypeScript;
// Shopify means a store built on Shopify; UI/UX Design means the owner designed the interface and
// experience in Figma, Framer or Photoshop. Projects can have several categories and always also
// appear under General.
// Add projects here with accurate categories; images must be local files under public/images/projects/.
export const projects: Project[] = [
  {
    id: "joe-bazz-music",
    title: "Joe Bazz Music",
    technologies: ["Figma"],
    categories: ["ui-ux"],
    liveUrl: "https://wild-champion-985818.framer.app/",
    image: {
      src: "/images/projects/joe-bazz-music.webp",
      alt: "Screenshot of the Joe Bazz Music homepage with the headline 'Pro bassist dedicated to your growth' beside a black-and-white bass guitar photo.",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "joe-bazz-tech",
    title: "Joe Bazz Tech",
    technologies: ["Framer"],
    categories: ["ui-ux"],
    liveUrl: "https://soulful-guidance-075650.framer.app/",
    image: {
      src: "/images/projects/joe-bazz-tech.webp",
      alt: "Screenshot of the Joe Bazz Tech homepage with a purple and black hero introducing a web developer and UI/UX designer.",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "berneese",
    title: "Berneese",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    categories: ["react"],
    liveUrl: "https://bernise.vercel.app/",
    badge: "Concept",
    image: {
      src: "/images/projects/berneese.webp",
      alt: "Screenshot of the Berneese homepage with the headline 'Football, travel and the long way to the stadium.' on a dark purple background.",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "gorilla-guy",
    title: "Gorilla Guy",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    categories: ["react"],
    liveUrl: "https://chekwas-creator-platform.vercel.app/",
    badge: "Concept",
    image: {
      src: "/images/projects/gorilla-guy.webp",
      alt: "Screenshot of the Gorilla Guy creator platform homepage with the headline 'One man. Many sides.' on a dark navy background.",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "d-real-kombo",
    title: "D REAL KOMBO",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    categories: ["react"],
    liveUrl: "https://d-real-kombo.vercel.app/",
    badge: "Concept",
    image: {
      src: "/images/projects/d-real-kombo.webp",
      alt: "Screenshot of the D REAL KOMBO football hub homepage with a red stadium hero and the headline 'Football is more than a game. It's a conversation.'",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "annas-fashion-visage",
    title: "Anna's Fashion Visage",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    categories: ["react"],
    liveUrl: "https://afv-website-pi.vercel.app/",
    image: {
      src: "/images/projects/annas-fashion-visage.webp",
      alt: "Screenshot of the Anna's Fashion Visage homepage with the headline 'Elegance Beyond Borders' over a photo of a designer at work.",
      width: 1280,
      height: 720,
    },
  },
  {
    id: "rossyz-fashion",
    title: "Rossyz Fashion",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    categories: ["react", "typescript"],
    liveUrl: "https://rossyzfashion-pwms.vercel.app/",
    image: {
      src: "/images/projects/rossyz-fashion.webp",
      alt: "Screenshot of the Rossyz Fashion homepage with the headline 'Crafted with elegance. Designed to make a statement.' beside three bridal gowns.",
      width: 1280,
      height: 720,
    },
  },
];

export const projectsSection = {
  heading: "Projects",
  intro: "A selection of websites and interfaces I've designed and built.",
  comingSoonTitle: "Projects are on the way",
  comingSoonMessage:
    "Real projects, screenshots and links will appear here soon. In the meantime, I'd be glad to talk about what you'd like to build.",
  emptyCategoryMessage: "No projects in this category yet.",
  ctaLabel: "Let's Talk",
  ctaHref: "#contact",
} as const;
