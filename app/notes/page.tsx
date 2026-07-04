import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import { site } from "@/lib/site";
import { notes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Free Notes & Downloads — English lesson PDFs",
  description: `Download free English notes and worksheets that go with our YouTube lessons — spoken English, grammar and IELTS. Free PDFs from ${site.name}.`,
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap center-narrow reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>Free notes</span>
          <h1>The notes from our <em>videos</em> — free to download.</h1>
          <p>Every worksheet, phrase list and cheat-sheet we mention on YouTube lives here. No sign-up, no email required. Just download and learn.</p>
        </div>
      </section>

      <div className="ad-band"><div className="wrap"><AdSlot variant="leaderboard" /></div></div>

      <section className="band">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">Downloads</span>
            <h2>Grab what you need.</h2>
            <p>Add your own in <code>lib/content.ts</code>: drop a PDF in <code>public/notes/</code>, or paste a Google Drive link.</p>
          </div>

          <div className="notes-grid">
            {notes.map((n, i) => (
              <div className="note-card reveal" key={i}>
                <div className="note-icon" aria-hidden="true">{n.icon}</div>
                <div className="vtag">{n.tag}</div>
                <h3>{n.title}</h3>
                <p>{n.desc}</p>
                <div className="note-meta">{n.meta}</div>
                <a href={n.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Download PDF</a>
              </div>
            ))}
          </div>

          <div className="notes-tip reveal">
            💡 <strong>New here?</strong> Watch the matching lesson on our{" "}
            <Link href="/videos" style={{ color: "var(--green-deep)", fontWeight: 600, textDecoration: "underline" }}>Videos page</Link>,
            then download the notes to practise. New notes are added every time we post a new video.
          </div>
        </div>
      </section>

      <div className="ad-band"><div className="wrap"><AdSlot variant="content" /></div></div>
    </>
  );
}
