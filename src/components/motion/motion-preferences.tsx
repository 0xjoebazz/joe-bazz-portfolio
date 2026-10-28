"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type MotionPreferences = {
  reducedMotion: boolean;
  fineHover: boolean;
};

const MotionPreferencesContext = createContext<MotionPreferences | null>(null);

export function MotionPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preferences, setPreferences] = useState<MotionPreferences>({
    reducedMotion: false,
    fineHover: false,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const hover = window.matchMedia("(hover: hover)");
    const finePointer = window.matchMedia("(pointer: fine)");

    function updatePreferences() {
      setPreferences({
        reducedMotion: reducedMotion.matches,
        fineHover: hover.matches && finePointer.matches,
      });
    }

    updatePreferences();
    reducedMotion.addEventListener("change", updatePreferences);
    hover.addEventListener("change", updatePreferences);
    finePointer.addEventListener("change", updatePreferences);

    return () => {
      reducedMotion.removeEventListener("change", updatePreferences);
      hover.removeEventListener("change", updatePreferences);
      finePointer.removeEventListener("change", updatePreferences);
    };
  }, []);

  return (
    <MotionPreferencesContext.Provider value={preferences}>
      {children}
    </MotionPreferencesContext.Provider>
  );
}

export function useMotionPreferences() {
  const preferences = useContext(MotionPreferencesContext);

  if (!preferences) {
    throw new Error(
      "Motion components must be rendered inside MotionPreferencesProvider.",
    );
  }

  return preferences;
}
