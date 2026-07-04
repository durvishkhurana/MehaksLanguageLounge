import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms for using the ${site.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="band">
      <div className="wrap center-narrow">
        <span className="eyebrow">Terms</span>
        <h1 style={{ fontSize: "clamp(30px,5vw,44px)", margin: "8px 0 20px" }}>Terms of Use</h1>
        <p style={{ color: "var(--muted)", marginBottom: 26 }}>
          Last updated: {new Date().getFullYear()}. Plain-English summary — adjust to fit your business.
        </p>

        <h3 style={{ fontSize: 20, margin: "22px 0 8px" }}>Using this site</h3>
        <p style={{ color: "var(--muted)" }}>
          This website provides information about {site.name}&apos;s classes, free lessons and notes. The content is for general educational purposes. We do our best to keep it accurate but can&apos;t guarantee it is complete or error-free.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>Free notes &amp; videos</h3>
        <p style={{ color: "var(--muted)" }}>
          Downloadable notes and videos are provided free for personal learning. Please don&apos;t resell or redistribute them as your own.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>Bookings</h3>
        <p style={{ color: "var(--muted)" }}>
          Submitting the demo form is a request, not a confirmed booking. We&apos;ll reply to arrange a time. The free demo has no obligation to enrol.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>Contact</h3>
        <p style={{ color: "var(--muted)" }}>
          Questions? Email <a href={`mailto:${site.email}`} style={{ color: "var(--green)", fontWeight: 600 }}>{site.email}</a>.
        </p>

        <div style={{ marginTop: 36 }}><Link href="/" className="btn btn-primary">← Back to home</Link></div>
      </div>
    </section>
  );
}
