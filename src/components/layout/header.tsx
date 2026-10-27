import Image from "next/image";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { logo, navLinks } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-background/80 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <a
          href="#home"
          aria-label="JOE BAZZ, back to top"
          className="inline-flex min-h-11 shrink-0 items-center"
        >
          <Image
            src={logo.src}
            width={logo.width}
            height={logo.height}
            alt=""
            priority
            className="h-10 w-auto md:h-12"
          />
        </a>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm text-muted hover:text-accent"
            >
              {label}
            </a>
          ))}
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
