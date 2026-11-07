import Image from "next/image";
import { FiArrowUp } from "react-icons/fi";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SocialLinks } from "@/components/ui/social-links";
import { contact } from "@/content/contact";
import { footer, hero, navLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-subtle bg-background/30">
      <Reveal duration={0.4} distance={12}>
        <Container className="py-8 sm:py-10">
          <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <a
                href="#home"
                aria-label="JOE BAZZ, back to top"
                className="inline-flex min-h-11 max-w-full items-center"
              >
                <Image
                  src="/images/joe-bazz-logo.png"
                  width={335}
                  height={278}
                  alt=""
                  className="h-24 w-auto max-w-full md:h-28"
                />
              </a>
              <p className="mt-2 text-sm text-muted">{hero.title}</p>
            </div>

            <nav aria-label="Footer" className="min-w-0">
              <ul className="flex flex-wrap gap-x-1 gap-y-1">
                {navLinks.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex min-w-0 flex-col items-start gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between lg:col-span-1 lg:flex-col lg:items-end lg:justify-start">
              <div role="group" aria-label="Social links">
                <SocialLinks socials={contact.socials} />
              </div>
              <a
                href="#home"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm text-muted transition-colors hover:text-accent focus-visible:text-accent"
              >
                {footer.backToTopLabel}
                <FiArrowUp aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <p className="mt-8 border-t border-subtle pt-5 text-center text-xs text-muted sm:text-sm">
            © {footer.copyrightYear} {footer.ownerName}. All rights reserved.
          </p>
        </Container>
      </Reveal>
    </footer>
  );
}
