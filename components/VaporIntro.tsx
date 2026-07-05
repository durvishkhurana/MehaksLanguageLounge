"use client";

import Link from "next/link";
import { RandomLetterSwapPingPong } from "@/components/ui/random-letter-swap";

// Opening banner: the brand name with a playful letter-swap on hover.
// One component per word so the heading wraps naturally on phones.
// (Animation only runs on hover/tap, so it costs nothing on load.)
const WORDS = ["Mehak", "Language", "Lounge"];

export default function VaporIntro() {
  return (
    <section className="vapor-intro">
      <span className="eyebrow vapor-eyebrow">Before you speak, something stops you</span>

      <h1 className="intro-brand">
        {WORDS.map((word) => (
          <RandomLetterSwapPingPong
            key={word}
            label={word}
            reverse={false}
            transition={{ type: "spring", duration: 0.7 }}
            staggerDuration={0.025}
          />
        ))}
      </h1>

      <p className="vapor-sub">
        Leave the fear of speaking behind. Step into the room where you finally find your voice.
      </p>
      <div className="vapor-cta">
        <Link href="/#book" className="btn btn-primary btn-lg btn-shimmer">Book a free demo class</Link>
        <Link href="/#courses" className="btn btn-ghost-light btn-lg">See the classes</Link>
      </div>
    </section>
  );
}
