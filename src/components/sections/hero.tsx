import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { hero, portrait } from "@/content/site";

export function Hero() {
  return (
    <Section id="home" className="py-10 sm:py-14 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)] lg:gap-16">
          <div className="min-w-0 space-y-5 sm:space-y-6">
            <p className="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-accent">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
              />
              {hero.availability}
            </p>
            <div className="space-y-4">
              <h1 className="max-w-[13ch] text-[clamp(2.5rem,8vw,4.5rem)]">
                {hero.greeting}
              </h1>
              <p className="max-w-[35ch] font-heading text-xl leading-snug text-muted sm:text-2xl">
                {hero.supportingHeadline}
              </p>
            </div>
            <p className="font-heading text-base font-semibold text-accent sm:text-lg">
              {hero.title}
            </p>
            <p className="max-w-[60ch] text-muted">{hero.description}</p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Button href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-8 rounded-full bg-accent/15 blur-3xl"
            />
            <div className="relative aspect-square overflow-hidden rounded-xl border border-subtle bg-background-secondary shadow-[0_0_3rem_-1.5rem] shadow-accent/50 lg:aspect-[4/5]">
              {portrait.src ? (
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover object-[45%_30%]"
                />
              ) : (
                // Keep the placeholder available when no portrait is configured.
                <div className="flex h-full items-center justify-center bg-surface">
                  <span
                    aria-hidden="true"
                    className="font-heading text-7xl font-semibold tracking-widest text-accent/80 sm:text-8xl"
                  >
                    JB
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
