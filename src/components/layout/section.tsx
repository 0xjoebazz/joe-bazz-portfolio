import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className, children }: SectionProps) {
  const classes = ["py-16 sm:py-20 lg:py-24", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}
