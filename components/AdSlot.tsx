"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

type Props = {
  /** visual size preset */
  variant?: "leaderboard" | "content" | "sidebar";
  /** your AdSense ad-unit slot id, e.g. "1234567890". Leave undefined to show a placeholder. */
  slot?: string;
  label?: string;
};

// Shows a real Google AdSense unit when both NEXT_PUBLIC_ADSENSE_CLIENT
// and a `slot` are set. Otherwise renders a labelled placeholder so you
// can see where ads will appear.
export default function AdSlot({ variant = "content", slot, label }: Props) {
  const live = Boolean(site.adsenseClient && slot);

  useEffect(() => {
    if (!live) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by the AdSense script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ignore */
    }
  }, [live]);

  const cls = `ad-slot ad-${variant}`;
  const defaultLabel =
    variant === "leaderboard" ? "Ad space · 970×90" : variant === "sidebar" ? "Ad space · 300×250" : "Ad space · responsive in-content";

  if (!live) {
    return <div className={cls}>{label || defaultLabel}</div>;
  }

  return (
    <ins
      className={`adsbygoogle ${cls}`}
      style={{ display: "block" }}
      data-ad-client={site.adsenseClient}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
