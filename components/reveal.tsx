"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * One IntersectionObserver is shared by every Reveal on the page rather than
 * one per instance, and each element is unobserved once it has appeared.
 *
 * The animation itself lives in CSS (`[data-reveal]` in globals.css), so this
 * component ships no animation library. It only toggles an attribute.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
  );
  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Elements already in view on load (the hero) should not wait for a scroll.
    const observer = getObserver();
    observer.observe(element);
    return () => observer.unobserve(element);
  }, []);

  return (
    <div
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
