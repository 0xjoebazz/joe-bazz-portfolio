"use client";

import { useEffect, useRef, useState } from "react";

// Keep the glow subtle and responsive without affecting page content.
const GLOW_SIZE = 640;
const GLOW_PEAK_OPACITY = 0.18;
const EASING_FACTOR = 0.15;
const POSITION_EPSILON = 0.1;
const OPACITY_EPSILON = 0.002;

type Position = {
  x: number;
  y: number;
};

export function CursorGlow() {
  const [isEnabled, setIsEnabled] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const targetPositionRef = useRef<Position>({ x: 0, y: 0 });
  const currentPositionRef = useRef<Position>({
    x: -GLOW_SIZE,
    y: -GLOW_SIZE,
  });
  const targetVisibleRef = useRef(false);
  const currentOpacityRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateAvailability() {
      setIsEnabled(
        hover.matches && finePointer.matches && !reducedMotion.matches,
      );
    }

    updateAvailability();
    hover.addEventListener("change", updateAvailability);
    finePointer.addEventListener("change", updateAvailability);
    reducedMotion.addEventListener("change", updateAvailability);

    return () => {
      hover.removeEventListener("change", updateAvailability);
      finePointer.removeEventListener("change", updateAvailability);
      reducedMotion.removeEventListener("change", updateAvailability);
    };
  }, []);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    if (!glowRef.current) {
      return;
    }

    function animate() {
      animationFrameRef.current = null;
      const glow = glowRef.current;
      if (!glow) {
        return;
      }

      const currentPosition = currentPositionRef.current;
      const targetPosition = targetPositionRef.current;
      const deltaX = targetPosition.x - currentPosition.x;
      const deltaY = targetPosition.y - currentPosition.y;

      currentPosition.x =
        Math.abs(deltaX) < POSITION_EPSILON
          ? targetPosition.x
          : currentPosition.x + deltaX * EASING_FACTOR;
      currentPosition.y =
        Math.abs(deltaY) < POSITION_EPSILON
          ? targetPosition.y
          : currentPosition.y + deltaY * EASING_FACTOR;

      const targetOpacity = targetVisibleRef.current
        ? GLOW_PEAK_OPACITY
        : 0;
      const opacityDelta = targetOpacity - currentOpacityRef.current;
      currentOpacityRef.current =
        Math.abs(opacityDelta) < OPACITY_EPSILON
          ? targetOpacity
          : currentOpacityRef.current + opacityDelta * EASING_FACTOR;

      glow.style.transform = `translate3d(${currentPosition.x - GLOW_SIZE / 2}px, ${currentPosition.y - GLOW_SIZE / 2}px, 0)`;
      glow.style.opacity = String(currentOpacityRef.current);

      if (
        currentPosition.x !== targetPosition.x ||
        currentPosition.y !== targetPosition.y ||
        currentOpacityRef.current !== targetOpacity
      ) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    }

    function requestAnimation() {
      if (animationFrameRef.current === null) {
        animationFrameRef.current = window.requestAnimationFrame(animate);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") {
        return;
      }

      targetPositionRef.current = { x: event.clientX, y: event.clientY };
      targetVisibleRef.current = true;
      requestAnimation();
    }

    function handlePointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) {
        targetVisibleRef.current = false;
        requestAnimation();
      }
    }

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      targetVisibleRef.current = false;
      currentOpacityRef.current = 0;
      currentPositionRef.current = { x: -GLOW_SIZE, y: -GLOW_SIZE };
    };
  }, [isEnabled]);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 rounded-full"
        style={{
          width: GLOW_SIZE,
          height: GLOW_SIZE,
          backgroundImage:
            "radial-gradient(circle, var(--glow-purple) 0%, transparent 70%)",
          opacity: 0,
          transform: `translate3d(${-GLOW_SIZE}px, ${-GLOW_SIZE}px, 0)`,
          willChange: "transform, opacity",
        }}
      />
    </div>
  );
}
