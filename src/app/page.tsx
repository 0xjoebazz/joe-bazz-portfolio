import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const colorTokens = [
  { name: "Main background", className: "bg-background" },
  { name: "Secondary background", className: "bg-background-secondary" },
  { name: "Elevated surface", className: "bg-surface" },
  { name: "Primary accent", className: "bg-accent" },
  { name: "Secondary cyan", className: "bg-accent-secondary" },
  { name: "Primary text", className: "bg-foreground" },
  { name: "Secondary text", className: "bg-muted" },
  {
    name: "Subtle border",
    className: "border border-subtle bg-surface",
  },
  { name: "Focus ring", className: "bg-focus" },
];

export default function Home() {
  return (
    // Temporary visual foundation for Milestone 1; replace in Milestone 2.
    <Container as="main" className="min-h-screen">
      <Section id="foundation" className="space-y-12">
        <header className="space-y-8">
          <p className="font-heading text-sm font-semibold tracking-[0.3em] text-accent">
            JOE BAZZ
          </p>
          <div className="space-y-5">
            <h1>Design system foundation</h1>
            <p className="text-muted">
              A temporary sample of the heading and body typefaces, color
              tokens, and elevated surface.
            </p>
          </div>
          <a
            href="#color-tokens"
            className="inline-flex text-accent underline underline-offset-4"
          >
            Review color tokens
          </a>
        </header>

        <section id="color-tokens" aria-labelledby="color-tokens-heading">
          <h2 id="color-tokens-heading" className="mb-6">
            Color tokens
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens.map(({ name, className }) => (
              <li
                key={name}
                className="flex min-w-0 items-center gap-4 rounded-xl border border-subtle bg-background-secondary p-4"
              >
                <span
                  aria-hidden="true"
                  className={`h-10 w-10 shrink-0 rounded-lg ${className}`}
                />
                <span className="text-sm text-muted">{name}</span>
              </li>
            ))}
          </ul>
        </section>

        <article className="max-w-2xl rounded-2xl border border-subtle bg-surface p-6 sm:p-8">
          <h3 className="mb-3 text-foreground">Elevated surface</h3>
          <p className="text-muted">
            This sample card uses the surface and subtle border tokens.
          </p>
        </article>
      </Section>
    </Container>
  );
}
