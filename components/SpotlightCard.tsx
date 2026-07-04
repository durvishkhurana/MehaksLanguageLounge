"use client";

import type { ElementType, ReactNode, MouseEvent } from "react";

// Wraps content in a card that glows toward the cursor on hover.
// `as` lets it render a semantic tag (e.g. "article") instead of a div.
export default function SpotlightCard({
  children,
  className = "",
  as,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const Tag = as || "div";
  function onMove(e: MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  return (
    <Tag className={`spotlight ${className}`} onMouseMove={onMove}>
      {children}
    </Tag>
  );
}
