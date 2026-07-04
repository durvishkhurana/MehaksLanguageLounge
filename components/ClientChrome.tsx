"use client";

import { useEffect, useRef } from "react";

// Renders the reading-progress bar and runs the scroll-reveal animation.
// Mounted once in the root layout so every page gets both.
export default function ClientChrome() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scroll reveal (respects reduced motion)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!reduce && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("in");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add("in"));
    }

    // progress bar
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (bar.current) bar.current.style.width = `${Math.min(1, Math.max(0, scrolled)) * 100}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  });

  return <div className="progress" ref={bar} aria-hidden="true" />;
}
