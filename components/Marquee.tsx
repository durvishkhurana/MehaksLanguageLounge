import type { ReactNode, CSSProperties } from "react";

// Auto-scrolling row. Renders the children twice so the loop is seamless.
// Pauses on hover. Pure CSS — no JS, no dependencies.
export default function Marquee({
  children,
  reverse = false,
  duration = 34,
  className = "",
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`marquee ${reverse ? "reverse" : ""} ${className}`}>
      <div className="marquee-track" style={{ ["--dur" as any]: `${duration}s` } as CSSProperties}>
        <div className="marquee-group">{children}</div>
        <div className="marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
