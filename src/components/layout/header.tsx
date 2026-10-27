import { Container } from "@/components/layout/container";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { navLinks } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-subtle bg-background/80 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <a
          href="#home"
          className="inline-flex min-h-11 shrink-0 items-center font-heading text-lg font-bold tracking-[0.12em] text-foreground"
        >
          JOE BAZZ
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
