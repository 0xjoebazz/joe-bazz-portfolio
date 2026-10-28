import type { ReactNode } from "react";
import { BrandIcon } from "@/components/ui/brand-icon";
import type { BrandIconKey } from "@/components/ui/brand-icon";

type SkillChipProps = {
  children: ReactNode;
  icon?: BrandIconKey;
};

export function SkillChip({ children, icon }: SkillChipProps) {
  return (
    <li
      className={`max-w-full break-words rounded-md border border-subtle bg-background-secondary/80 px-3 py-1.5 text-sm text-foreground ${
        icon ? "inline-flex min-w-0 items-center gap-2" : ""
      }`}
    >
      {icon ? (
        <>
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-subtle bg-surface/80 text-muted">
            <BrandIcon icon={icon} className="size-4" />
          </span>
          <span className="min-w-0 break-words">{children}</span>
        </>
      ) : (
        children
      )}
    </li>
  );
}
