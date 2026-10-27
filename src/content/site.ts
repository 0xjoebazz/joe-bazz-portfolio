type NavLink = {
  label: string;
  href: string;
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] satisfies readonly NavLink[];

export const hero = {
  greeting: "Hi, I'm Enoch Josiah.",
  supportingHeadline: "I bring ideas to life through code and design.",
  title: "Frontend Developer & UI/UX Designer",
  description:
    "I'm JOE BAZZ, a Frontend Developer and UI/UX Designer creating clean, responsive websites and digital experiences for brands, creators, and growing businesses.",
  availability: "Available for freelance work",
  primaryCta: {
    label: "Explore My Work",
    href: "#projects",
  },
  secondaryCta: {
    label: "Let's Talk",
    href: "#contact",
  },
} as const;

export const portrait: {
  src: string | null;
  alt: string;
} = {
  src: null,
  alt: "Portrait of Enoch Josiah (JOE BAZZ)",
};
