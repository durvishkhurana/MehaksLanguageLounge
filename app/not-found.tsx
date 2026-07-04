import Link from "next/link";

export default function NotFound() {
  return (
    <section className="band">
      <div className="wrap center-narrow" style={{ textAlign: "center", padding: "40px 0" }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
        <h1 style={{ fontSize: "clamp(32px,6vw,52px)", margin: "8px 0 16px" }}>
          This page took an <em style={{ fontStyle: "italic", color: "var(--green)" }}>unscheduled</em> break.
        </h1>
        <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 28 }}>
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="channel-cta" style={{ marginTop: 0 }}>
          <Link href="/" className="btn btn-primary btn-lg">Back to home</Link>
          <Link href="/blog" className="btn btn-ghost btn-lg">Read the blog</Link>
        </div>
      </div>
    </section>
  );
}
