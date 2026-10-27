import type { ReactNode } from "react";

type SkillChipProps = {
  children: ReactNode;
};

export function SkillChip({ children }: SkillChipProps) {
  return (
    <li className="max-w-full break-words rounded-md border border-subtle bg-background-secondary/80 px-3 py-1.5 text-sm text-foreground">
      {children}
    </li>
  );
}
