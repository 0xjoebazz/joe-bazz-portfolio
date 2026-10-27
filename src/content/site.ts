type NavLink = {
  label: string;
  href: string;
};

export const logo: {
  src: string;
  width: number;
  height: number;
} = {
  src: "/images/joe-bazz-mark.png",
  width: 335,
  height: 227,
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
  src: "/images/joe-bazz-portrait.png",
  alt: "Enoch Josiah (JOE BAZZ) working at a laptop in a dimly lit, blue-toned workspace.",
};
