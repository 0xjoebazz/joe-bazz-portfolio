import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/sections/hero";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { SkillCard } from "@/components/ui/skill-card";
import { about } from "@/content/about";
import {
  services,
  servicesCta,
  servicesHeading,
  servicesIntro,
} from "@/content/services";
import { skillCategories, skillsHeading } from "@/content/skills";

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
        <Section id="about" aria-labelledby="about-heading">
          <Container>
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.7fr)] lg:gap-16">
              <div className="min-w-0 space-y-6">
                <SectionHeading id="about-heading" title={about.heading} />
                <div className="space-y-4">
                  {about.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="max-w-[65ch] text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <aside className="min-w-0 rounded-xl border border-subtle bg-surface/40 p-6 sm:p-8">
                <h3 className="mb-3 text-lg text-accent">
                  {about.education.label}
                </h3>
                <p className="break-words font-heading text-lg font-medium">
                  {about.education.value}
                </p>
              </aside>
            </div>
          </Container>
        </Section>
        <Section id="services" aria-labelledby="services-heading">
          <Container>
            <div className="space-y-10">
              <SectionHeading
                id="services-heading"
                title={servicesHeading}
                intro={servicesIntro}
              />
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service) => (
                  <li key={service.id} className="min-w-0">
                    <ServiceCard
                      icon={service.icon}
                      title={service.title}
                      description={service.description}
                    />
                  </li>
                ))}
              </ul>
              <div className="flex justify-center">
                <Button href={servicesCta.href} variant="secondary">
                  {servicesCta.label}
                </Button>
              </div>
            </div>
          </Container>
        </Section>
        <Section id="skills" aria-labelledby="skills-heading">
          <Container>
            <div className="space-y-10">
              <SectionHeading id="skills-heading" title={skillsHeading} />
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {skillCategories.map(({ category, items }) => (
                  <li key={category} className="min-w-0">
                    <SkillCard category={category} items={items} />
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="projects">
          <Container>
            <h2>Projects</h2>
          </Container>
        </Section>
        {/* Temporary placeholder section; replace in a later milestone. */}
        <Section id="contact">
          <Container>
            <h2>Contact</h2>
          </Container>
        </Section>
      </main>
    </>
  );
}
