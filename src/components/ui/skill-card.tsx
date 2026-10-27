type SkillCardProps = {
  category: string;
  items: readonly string[];
};

export function SkillCard({ category, items }: SkillCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-subtle bg-surface/40 p-5 sm:p-6">
      <h3 className="mb-5 text-xl leading-snug">{category}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="max-w-full break-words rounded-md border border-subtle bg-background-secondary/80 px-3 py-1.5 text-sm text-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
