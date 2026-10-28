import { Header } from "@/components/layout/header";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionPreferencesProvider } from "@/components/motion/motion-preferences";
import { Reveal } from "@/components/motion/reveal";
import { StaggerList, StaggerListItem } from "@/components/motion/stagger";
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
    <MotionPreferencesProvider>
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
                <Reveal>
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
                </Reveal>
                <Reveal>
                  <aside className="min-w-0 rounded-xl border border-subtle bg-surface/40 p-6 sm:p-8">
                    <h3 className="mb-3 text-lg text-accent">
                      {about.education.label}
                    </h3>
                    <p className="break-words font-heading text-lg font-medium">
                      {about.education.value}
                    </p>
                  </aside>
                </Reveal>
              </div>
            </Container>
          </Section>
          <Section id="services" aria-labelledby="services-heading">
            <Container>
              <div className="space-y-10">
                <Reveal>
                  <SectionHeading
                    id="services-heading"
                    title={servicesHeading}
                    intro={servicesIntro}
                  />
                </Reveal>
                <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {services.map((service) => (
                    <StaggerListItem key={service.id} className="min-w-0">
                      <ServiceCard
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                      />
                    </StaggerListItem>
                  ))}
                </StaggerList>
                <Reveal>
                  <div className="flex justify-center">
                    <Button href={servicesCta.href} variant="secondary">
                      {servicesCta.label}
                    </Button>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
          <Section id="skills" aria-labelledby="skills-heading">
            <Container>
              <div className="space-y-10">
                <Reveal>
                  <SectionHeading id="skills-heading" title={skillsHeading} />
                </Reveal>
                <StaggerList className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {skillCategories.map(({ category, items }) => (
                    <StaggerListItem key={category} className="min-w-0">
                      <SkillCard category={category} items={items} />
                    </StaggerListItem>
                  ))}
                </StaggerList>
              </div>
            </Container>
          </Section>
          <ProjectsSection />
          <ContactSection />
        </main>
      </>
    </MotionPreferencesProvider>
  );
}
