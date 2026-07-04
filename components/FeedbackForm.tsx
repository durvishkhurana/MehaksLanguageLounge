"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const clean = (s: string) => s.replace(/[<>]/g, "").trim();

export default function FeedbackForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    if ((data.get("website") as string)?.length) return; // honeypot

    const type = clean((data.get("type") as string) || "");
    const message = clean((data.get("message") as string) || "");
    const contact = clean((data.get("contact") as string) || "");
    if (!message) return;

    const text =
      "WEBSITE FEEDBACK\n\n" +
      `• Type: ${type}\n` +
      `• Details: ${message}` +
      (contact ? `\n• Contact: ${contact}` : "") +
      `\n• Page: ${typeof window !== "undefined" ? window.location.href : ""}`;

    setSent(true);
    window.open(whatsappLink(text), "_blank", "noopener");
    f.reset();
  }

  return (
    <form className="card-form feedback-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="fb-type">What&apos;s this about?</label>
        <select id="fb-type" name="type" defaultValue="Something is broken / a bug">
          <option>Something is broken / a bug</option>
          <option>The site is slow</option>
          <option>Something is confusing</option>
          <option>A suggestion / idea</option>
          <option>Other</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="fb-msg">Tell us what happened</label>
        <textarea id="fb-msg" name="message" rows={4} required maxLength={1000} placeholder="e.g. The 'Book a demo' button didn't do anything on my phone" />
      </div>
      <div className="field">
        <label htmlFor="fb-contact">
          Your email or phone <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional — only if you&apos;d like a reply)</span>
        </label>
        <input id="fb-contact" name="contact" type="text" maxLength={120} autoComplete="off" placeholder="So we can thank you / follow up" />
      </div>

      {/* Honeypot */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
        Send feedback
      </button>
      <p className="form-privacy">🔒 Sent straight to us. No tracking, no data stored on this site.</p>
      {sent && <div className="form-msg">Thank you! Opening your messenger to send this to us…</div>}
    </form>
  );
}
