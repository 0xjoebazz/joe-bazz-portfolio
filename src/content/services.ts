type Service = {
  id: string;
  title: string;
  description: string;
  icon: "code" | "design" | "refresh" | "responsive" | "store" | "mobile";
};

export const servicesHeading = "Services";
export const servicesIntro = "What I can build for you.";
export const servicesCta = {
  label: "Discuss Your Project",
  href: "#contact",
} as const;

export const services = [
  {
    id: "frontend-development",
    title: "Frontend Development",
    description:
      "Responsive, accessible websites built with modern tools like React, Next.js and Tailwind CSS.",
    icon: "code",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "User-focused interfaces and layouts designed in Figma, from first layout to polished visuals.",
    icon: "design",
  },
  {
    id: "website-design-and-redesign",
    title: "Website Design and Redesign",
    description:
      "Fresh, modern designs for new sites, or a redesign that gives an existing site a clearer look and better usability.",
    icon: "refresh",
  },
  {
    id: "responsive-websites-and-landing-pages",
    title: "Responsive Websites and Landing Pages",
    description:
      "Mobile-friendly landing pages and business websites that look right on every screen.",
    icon: "responsive",
  },
  {
    id: "e-commerce-websites",
    title: "E-commerce Websites",
    description:
      "Online stores built on platforms such as Shopify, designed to make browsing and buying straightforward.",
    icon: "store",
  },
  {
    id: "mobile-app-interfaces-and-development",
    title: "Mobile App Interfaces and Mobile App Development",
    description:
      "Clean, usable interfaces for mobile apps and, where the project calls for it, mobile app development.",
    icon: "mobile",
  },
] satisfies readonly Service[];
