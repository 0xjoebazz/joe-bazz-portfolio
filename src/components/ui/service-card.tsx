import type { ReactNode } from "react";
import type { services } from "@/content/services";

type ServiceIconKey = (typeof services)[number]["icon"];

type ServiceCardProps = {
  icon: ServiceIconKey;
  title: string;
  description: string;
};

function ServiceIcon({ icon }: { icon: ServiceIconKey }) {
  const paths: Record<ServiceIconKey, ReactNode> = {
    code: <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-7-2 6" />,
    design: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M4 9h16M9 9v11m3-7 2 2 4-4" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5M4 17v-5h5" />
        <path d="M5.5 9a7 7 0 0 1 11.6-2L20 12M4 12l2.9 5a7 7 0 0 0 11.6-2" />
      </>
    ),
    responsive: (
      <>
        <rect x="3" y="5" width="13" height="10" rx="1.5" />
        <path d="M7 19h5m-2.5-4v4" />
        <rect x="17" y="8" width="4" height="10" rx="1" />
      </>
    ),
    store: (
      <>
        <path d="M4 10v10h16V10M3 5h18l-1 5H4L3 5Z" />
        <path d="M9 20v-6h6v6m-9-10a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0" />
      </>
    ),
    mobile: (
      <>
        <rect x="7" y="3" width="10" height="18" rx="2" />
        <path d="M11 17h2" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-6 w-6 text-accent"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[icon]}
    </svg>
  );
}

export function ServiceCard({
  icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <article
      tabIndex={0}
      className="h-full min-w-0 rounded-xl border border-subtle bg-surface/40 p-5 transition-colors hover:border-accent hover:bg-background-secondary/70 focus-within:border-accent focus-within:bg-background-secondary/70 sm:p-6"
    >
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-subtle bg-background-secondary">
        <ServiceIcon icon={icon} />
      </div>
      <h3 className="mb-3 text-xl leading-snug">{title}</h3>
      <p className="break-words text-sm text-muted sm:text-base">{description}</p>
    </article>
  );
}
