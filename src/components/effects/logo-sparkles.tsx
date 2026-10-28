"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { useMotionPreferences } from "@/components/motion/motion-preferences";

const INITIAL_DELAY = 2_000;
const BURST_DURATION = 1_550;
const MIN_REPEAT_DELAY = 15_000;
const MAX_REPEAT_DELAY = 20_000;
const STAR_COLORS = [
  "var(--accent)",
  "var(--foreground)",
  "var(--glow-purple)",
] as const;

type Sparkle = {
  id: number;
  left: number;
  top: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  color: (typeof STAR_COLORS)[number];
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createBurst(rect: DOMRect): Sparkle[] {
  return Array.from({ length: Math.floor(randomBetween(9, 13)) }, (_, id) => {
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(20, 40);

    return {
      id,
      left: rect.left + rect.width / 2 + Math.cos(angle) * rect.width * 0.42,
      top: rect.top + rect.height / 2 + Math.sin(angle) * rect.height * 0.42,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      size: randomBetween(4, 9),
      duration: randomBetween(0.9, 1.3),
      delay: randomBetween(0, 0.15),
      rotation: randomBetween(-110, 110),
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    };
  });
}

export function LogoSparkles() {
  const spotRef = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useMotionPreferences();

  return (
    <>
      <span
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      />
      {!reducedMotion ? <SparkleController spotRef={spotRef} /> : null}
    </>
  );
}

function SparkleController({
  spotRef,
}: {
  spotRef: { current: HTMLSpanElement | null };
}) {
  const [sparkles, setSparkles] = useState<Sparkle[] | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    let burstTimer: number | undefined;

    function scheduleNextBurst(delay: number) {
      timer = window.setTimeout(playBurst, delay);
    }

    function rescheduleAfterBurst() {
      scheduleNextBurst(randomBetween(MIN_REPEAT_DELAY, MAX_REPEAT_DELAY));
    }

    function playBurst() {
      timer = undefined;

      if (document.hidden) {
        setSparkles(null);
        rescheduleAfterBurst();
        return;
      }

      const rect = spotRef.current?.getBoundingClientRect();
      if (!rect) {
        rescheduleAfterBurst();
        return;
      }

      setSparkles(createBurst(rect));
      burstTimer = window.setTimeout(() => {
        burstTimer = undefined;
        setSparkles(null);
        rescheduleAfterBurst();
      }, BURST_DURATION);
    }

    function handleVisibilityChange() {
      if (!document.hidden) {
        return;
      }

      const hadScheduledBurst = timer !== undefined;
      const hadActiveBurst = burstTimer !== undefined;
      if (timer !== undefined) {
        window.clearTimeout(timer);
        timer = undefined;
      }
      if (burstTimer !== undefined) {
        window.clearTimeout(burstTimer);
        burstTimer = undefined;
        setSparkles(null);
      }
      if (hadScheduledBurst || hadActiveBurst) {
        rescheduleAfterBurst();
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    scheduleNextBurst(INITIAL_DELAY);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timer !== undefined) {
        window.clearTimeout(timer);
      }
      if (burstTimer !== undefined) {
        window.clearTimeout(burstTimer);
      }
    };
  }, [spotRef]);

  if (!sparkles) {
    return null;
  }

  return createPortal(
    <span
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
    >
      {sparkles.map((sparkle) => (
        <motion.svg
          key={sparkle.id}
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 12 12"
          className="absolute"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: sparkle.size,
            height: sparkle.size,
            color: sparkle.color,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            rotate: sparkle.rotation,
            x: sparkle.x,
            y: sparkle.y,
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            ease: "easeOut",
          }}
        >
          <path
            fill="currentColor"
            d="M6 0C6.8 3.8 8.2 5.2 12 6 8.2 6.8 6.8 8.2 6 12 5.2 8.2 3.8 6.8 0 6 3.8 5.2 5.2 3.8 6 0Z"
          />
        </motion.svg>
      ))}
    </span>,
    document.body,
  );
}
