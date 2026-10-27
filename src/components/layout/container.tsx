import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
} from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  const classes = [
    "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
