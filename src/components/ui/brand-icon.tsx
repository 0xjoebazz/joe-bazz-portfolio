import {
  FaBolt,
  FaLinkedin,
  FaRobot,
  FaWandMagicSparkles,
} from "react-icons/fa6";
import {
  SiCss,
  SiDiscord,
  SiFacebook,
  SiFigma,
  SiFramer,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiShopify,
  SiSquarespace,
  SiTailwindcss,
  SiThreads,
  SiWebflow,
  SiWix,
  SiWordpress,
  SiX,
} from "react-icons/si";
import { TbBrandAdobeIllustrator } from "react-icons/tb";

const icons = {
  github: SiGithub,
  linkedin: FaLinkedin,
  facebook: SiFacebook,
  x: SiX,
  threads: SiThreads,
  discord: SiDiscord,
  html5: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  react: SiReact,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  figma: SiFigma,
  framer: SiFramer,
  adobeIllustrator: TbBrandAdobeIllustrator,
  wix: SiWix,
  squarespace: SiSquarespace,
  webflow: SiWebflow,
  wordpress: SiWordpress,
  shopify: SiShopify,
  goHighLevel: FaBolt,
  aiIntegrations: FaRobot,
  websiteAnimations: FaWandMagicSparkles,
} as const;

export type BrandIconKey = keyof typeof icons;

export function BrandIcon({
  icon,
  className,
}: {
  icon: BrandIconKey;
  className?: string;
}) {
  const Icon = icons[icon];

  return <Icon aria-hidden="true" focusable="false" className={className} />;
}
