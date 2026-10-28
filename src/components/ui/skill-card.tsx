import { SkillChip } from "@/components/ui/skill-chip";
import type { SkillItem } from "@/content/skills";

type SkillCardProps = {
  category: string;
  items: readonly SkillItem[];
};

export function SkillCard({ category, items }: SkillCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-subtle bg-surface/40 p-5 sm:p-6">
      <h3 className="mb-5 text-xl leading-snug">{category}</h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <SkillChip key={item.name} icon={item.icon}>
            {item.name}
          </SkillChip>
        ))}
      </ul>
    </article>
  );
}
