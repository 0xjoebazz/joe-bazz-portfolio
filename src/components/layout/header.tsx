import Image from "next/image";
import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { LogoSparkles } from "@/components/effects/logo-sparkles";
import { Reveal } from "@/components/motion/reveal";
import { logo, navLinks } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-background/80 backdrop-blur-md">
      <Reveal trigger="load" duration={0.3} distance={0}>
        <Container className="flex min-h-16 items-center justify-between gap-6">
          <a
            href="#home"
            aria-label="JOE BAZZ, back to top"
            className="relative inline-flex min-h-11 shrink-0 items-center"
          >
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt=""
              priority
              className="h-10 w-auto md:h-12"
            />
            <LogoSparkles />
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
      </Reveal>
    </header>
  );
}
