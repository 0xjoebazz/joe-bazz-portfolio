"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionPreferences } from "@/components/motion/motion-preferences";

type RevealProps = {
  children: ReactNode;
  className?: string;
  trigger?: "load" | "view";
  delay?: number;
  duration?: number;
  distance?: number;
  fromScale?: number;
};

export function Reveal({
  children,
  className,
  trigger = "view",
  delay = 0,
  duration = 0.5,
  distance = 20,
  fromScale = 1,
}: RevealProps) {
  const { reducedMotion } = useMotionPreferences();
  const variants = {
    hidden: { opacity: 0, y: distance, scale: fromScale },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reducedMotion
        ? { duration: 0 }
        : { duration, delay, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      data-motion=""
      className={className}
      variants={variants}
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
