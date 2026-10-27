import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { contact } from "@/content/contact";

export function ContactSection() {
  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 space-y-8">
            <SectionHeading
              id="contact-heading"
              title={contact.copy.heading}
              intro={contact.copy.intro}
            />
            <div className="space-y-2">
              <p className="font-medium">{contact.copy.directEmailLabel}</p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-11 max-w-full items-center break-all text-accent underline-offset-4 hover:underline"
              >
                {contact.email}
              </a>
            </div>
            <nav aria-label="Social profiles">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {contact.socials.map(({ label, url }) => (
                  <li key={label}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} profile (opens in a new tab)`}
                      className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-accent hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
