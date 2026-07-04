import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} handles your information. Short version: we don't store your data on this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="band">
      <div className="wrap center-narrow">
        <span className="eyebrow">Privacy</span>
        <h1 style={{ fontSize: "clamp(30px,5vw,44px)", margin: "8px 0 20px" }}>Privacy Policy</h1>
        <p style={{ color: "var(--muted)", marginBottom: 26 }}>
          Last updated: {new Date().getFullYear()}. This is a plain-English summary — edit it to fit your exact situation, or ask a lawyer if you need a formal policy.
        </p>

        <h3 style={{ fontSize: 20, margin: "22px 0 8px" }}>The short version</h3>
        <p style={{ color: "var(--muted)" }}>
          This website does <strong>not</strong> store your personal information in any database. When you fill in the demo or feedback form, the details you type are sent directly to us over WhatsApp — nothing is saved on the website itself.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>What we collect</h3>
        <p style={{ color: "var(--muted)" }}>
          Only what you choose to send us through the forms (your name, phone/WhatsApp, and any message). We use it solely to reply to you about classes. We never sell or share it.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>Third-party services</h3>
        <p style={{ color: "var(--muted)" }}>
          Videos are embedded from YouTube (Google), and ads may be served by Google AdSense. These services have their own privacy policies. Our forms open WhatsApp, which is operated by Meta.
        </p>

        <h3 style={{ fontSize: 20, margin: "26px 0 8px" }}>Contact</h3>
        <p style={{ color: "var(--muted)" }}>
          Questions about your privacy? Email <a href={`mailto:${site.email}`} style={{ color: "var(--green)", fontWeight: 600 }}>{site.email}</a>.
        </p>

        <div style={{ marginTop: 36 }}><Link href="/" className="btn btn-primary">← Back to home</Link></div>
      </div>
    </section>
  );
}
