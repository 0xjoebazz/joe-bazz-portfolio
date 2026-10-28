"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionPreferences } from "@/components/motion/motion-preferences";

export function PortraitPulse({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { reducedMotion, fineHover } = useMotionPreferences();
  const pulseEnabled = fineHover && !reducedMotion;

  return (
    <motion.div
      data-motion=""
      className={className}
      animate={{ scale: 1 }}
      whileHover={
        pulseEnabled
          ? {
              scale: [1, 1.05, 1],
              transition: {
                duration: 1.4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              },
            }
          : undefined
      }
      transition={{ scale: { duration: 0.25, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  );
}
