import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import YouTubeCard from "@/components/YouTubeCard";
import { site } from "@/lib/site";
import { videos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Video Lessons — Free English lessons on YouTube",
  description: `Watch free English lessons: spoken English, grammar and IELTS tips. New videos every week from ${site.name} in ${site.city}.`,
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap center-narrow reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Video lessons</span>
          <h1>Learn English <em>free</em>, one video at a time.</h1>
          <p>
            Short, practical lessons on speaking, grammar and IELTS. Watch here or subscribe on YouTube — and grab the matching notes on the{" "}
            <Link href="/notes" style={{ color: "var(--green)", fontWeight: 600 }}>Free Notes</Link> page.
          </p>
          <div className="channel-cta" style={{ marginTop: 26 }}>
            <a href={site.youtube} className="btn btn-green btn-lg" target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
            <Link href="/notes" className="btn btn-ghost btn-lg">Get the notes</Link>
          </div>
        </div>
      </section>

      <div className="ad-band"><div className="wrap"><AdSlot variant="leaderboard" /></div></div>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Latest lessons</span>
            <h2>Pick a topic and press play.</h2>
            <p>Edit the list in <code>lib/content.ts</code> — each video just needs its YouTube ID.</p>
          </div>
          <div className="video-grid">
            {videos.map((v, i) => (
              <YouTubeCard key={i} id={v.id} tag={v.tag} title={v.title} desc={v.desc} />
            ))}
          </div>
          <div className="channel-cta">
            <a href={site.youtube} className="btn btn-green btn-lg" target="_blank" rel="noopener noreferrer">See the full channel</a>
          </div>
        </div>
      </section>

      <div className="ad-band"><div className="wrap"><AdSlot variant="content" /></div></div>
    </>
  );
}
