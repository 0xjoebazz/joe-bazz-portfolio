"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/content/site";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-subtle text-foreground hover:border-accent hover:text-accent"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {isOpen ? (
            <path d="m6 6 12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile primary"
        hidden={!isOpen}
        className="absolute right-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-subtle bg-background-secondary/95 p-2 shadow-2xl backdrop-blur-md"
      >
        <ul className="flex flex-col">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-4 text-foreground hover:bg-surface hover:text-accent"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
