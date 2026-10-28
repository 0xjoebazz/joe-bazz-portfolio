import type { BrandIconKey } from "@/components/ui/brand-icon";

export type SkillItem = {
  name: string;
  icon: BrandIconKey;
};

type SkillCategory = {
  category: string;
  items: readonly SkillItem[];
};

export const skillsHeading = "Skills & Technologies";

export const skillCategories = [
  {
    category: "Frontend Development",
    items: [
      { name: "HTML", icon: "html5" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
    ],
  },
  {
    category: "UI/UX and Design",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "Framer", icon: "framer" },
      { name: "Adobe Illustrator", icon: "adobeIllustrator" },
    ],
  },
  {
    category: "Website Platforms",
    items: [
      { name: "Wix", icon: "wix" },
      { name: "Squarespace", icon: "squarespace" },
      { name: "Webflow", icon: "webflow" },
      { name: "WordPress", icon: "wordpress" },
      { name: "Shopify", icon: "shopify" },
    ],
  },
  {
    category: "Additional Capabilities",
    items: [
      { name: "GoHighLevel", icon: "goHighLevel" },
      { name: "AI Integrations", icon: "aiIntegrations" },
      { name: "Website Animations", icon: "websiteAnimations" },
    ],
  },
] satisfies readonly SkillCategory[];
