"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionPreferences } from "@/components/motion/motion-preferences";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  trigger?: "load" | "view";
  staggerDelay?: number;
};

function useStaggerVariants(staggerDelay = 0.06) {
  const { reducedMotion } = useMotionPreferences();

  return {
    reducedMotion,
    containerVariants: {
      hidden: {},
      visible: {
        transition: reducedMotion
          ? { duration: 0, staggerChildren: 0 }
          : { staggerChildren: staggerDelay },
      },
    },
    itemVariants: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: reducedMotion
          ? { duration: 0 }
          : { duration: 0.38, ease: "easeOut" as const },
      },
    },
  };
}

export function StaggerContainer({
  children,
  className,
  trigger = "load",
  staggerDelay = 0.06,
}: StaggerProps) {
  const { reducedMotion, containerVariants } =
    useStaggerVariants(staggerDelay);

  return (
    <motion.div
      data-motion=""
      className={className}
      variants={containerVariants}
      initial={reducedMotion ? false : "hidden"}
      animate={trigger === "load" || reducedMotion ? "visible" : undefined}
      whileInView={
        trigger === "view" && !reducedMotion ? "visible" : undefined
      }
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: Omit<StaggerProps, "trigger">) {
  const { itemVariants } = useStaggerVariants();

  return (
    <motion.div data-motion="" className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

export function StaggerList({
  children,
  className,
}: Omit<StaggerProps, "trigger">) {
  const { reducedMotion, containerVariants } = useStaggerVariants(0.08);

  return (
    <motion.ul
      data-motion=""
      className={className}
      variants={containerVariants}
      initial={reducedMotion ? false : "hidden"}
      animate={reducedMotion ? "visible" : undefined}
      whileInView={!reducedMotion ? "visible" : undefined}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.ul>
  );
}

export function StaggerListItem({
  children,
  className,
}: Omit<StaggerProps, "trigger">) {
  const { itemVariants } = useStaggerVariants(0.08);

  return (
    <motion.li data-motion="" className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
