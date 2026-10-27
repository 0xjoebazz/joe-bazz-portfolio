type SkillCategory = {
  category: string;
  items: readonly string[];
};

export const skillsHeading = "Skills & Technologies";

export const skillCategories = [
  {
    category: "Frontend Development",
    items: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "UI/UX and Design",
    items: ["Figma", "Framer", "Adobe Illustrator"],
  },
  {
    category: "Website Platforms",
    items: ["Wix", "Squarespace", "Webflow", "WordPress", "Shopify"],
  },
  {
    category: "Additional Capabilities",
    items: ["GoHighLevel", "AI Integrations", "Website Animations"],
  },
] satisfies readonly SkillCategory[];
