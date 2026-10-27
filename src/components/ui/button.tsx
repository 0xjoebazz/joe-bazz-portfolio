import type {
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = ButtonBaseProps &
  Omit<
    ComponentPropsWithoutRef<"a">,
    keyof ButtonBaseProps | "href"
  > & {
    href: string;
  };

type ButtonElementProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonLinkProps | ButtonElementProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-accent-secondary",
  secondary:
    "border border-subtle bg-surface/40 text-foreground hover:border-accent hover:text-accent",
};

function getButtonClasses(variant: ButtonVariant, className?: string) {
  return [
    "inline-flex min-h-11 items-center justify-center rounded-lg px-6 py-3 text-center font-semibold transition-colors",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  if (typeof props.href === "string") {
    const {
      href,
      children,
      variant,
      className,
      ...linkProps
    } = props;

    return (
      <a
        href={href}
        className={getButtonClasses(variant ?? "primary", className)}
        {...linkProps}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    variant,
    className,
    ...buttonProps
  } = props;

  return (
    <button
      className={getButtonClasses(variant ?? "primary", className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
