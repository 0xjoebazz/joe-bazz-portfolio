type SectionHeadingProps = {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: string;
};

export function SectionHeading({
  id,
  title,
  eyebrow,
  intro,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 id={id}>{title}</h2>
      {intro ? <p className="max-w-[60ch] text-muted">{intro}</p> : null}
    </div>
  );
}
