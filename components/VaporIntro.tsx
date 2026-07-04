"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import VaporizeTextCycle, { Tag } from "@/components/ui/vapour-text-effect";

// Words about the fear of speaking, which vaporize one by one and
// resolve into the brand name. The cycle then loops.
const TEXTS = ["Fear.", "Hesitation.", "Going blank.", "Staying silent.", "Mehak Language Lounge"];

function pickFontSize(w: number) {
  if (w < 480) return "26px";
  if (w < 768) return "38px";
  if (w < 1024) return "54px";
  return "72px";
}

export default function VaporIntro() {
  // Canvas needs a real, always-available font family (next/font names are
  // hashed and not exposed to the canvas), so we use Georgia — an elegant
  // serif that echoes the site's Fraunces headings.
  const [fontSize, setFontSize] = useState("54px");

  useEffect(() => {
    const update = () => setFontSize(pickFontSize(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="vapor-intro">
      <span className="eyebrow vapor-eyebrow">Before you speak, something stops you</span>

      <div className="vapor-canvas">
        <VaporizeTextCycle
          texts={TEXTS}
          font={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize, fontWeight: 600 }}
          color="rgb(252, 250, 244)"
          spread={5}
          density={5}
          animation={{ vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 0.9 }}
          direction="left-to-right"
          alignment="center"
          tag={Tag.H1}
        />
      </div>

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
