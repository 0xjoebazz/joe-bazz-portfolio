import { BrandIcon } from "@/components/ui/brand-icon";
import type { SocialLink } from "@/content/contact";

export function SocialLinks({ socials }: { socials: readonly SocialLink[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {socials.map(({ icon, label, url }) => (
        <li key={label}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex size-11 items-center justify-center rounded-full border border-subtle bg-surface/60 text-muted transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent"
          >
            <BrandIcon icon={icon} className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
