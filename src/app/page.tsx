import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only fixed left-4 top-4 z-50 inline-flex min-h-11 items-center rounded-lg bg-surface px-4 text-foreground focus:not-sr-only"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="about">
          <h2>About</h2>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="services">
          <h2>Services</h2>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="skills">
          <h2>Skills</h2>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="projects">
          <h2>Projects</h2>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="contact">
          <h2>Contact</h2>
        </Section>
      </main>
    </>
  );
}
