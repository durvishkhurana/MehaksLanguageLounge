"use client";

import { useState } from "react";
import { whatsappLink } from "@/lib/site";

const clean = (s: string) => s.replace(/[<>]/g, "").trim();

export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = new FormData(f);
    if ((data.get("company") as string)?.length) return; // honeypot

    const name = clean((data.get("name") as string) || "");
    const phone = clean((data.get("phone") as string) || "");
    const course = clean((data.get("course") as string) || "");
    const msg = clean((data.get("msg") as string) || "");
    if (!name || !phone) return;

    const text =
      "Hi! I would like to book a FREE demo class.\n\n" +
      `• Name: ${name}\n` +
      `• Phone: ${phone}\n` +
      `• Class: ${course}` +
      (msg ? `\n• Note: ${msg}` : "");

    setSent(true);
    window.open(whatsappLink(text), "_blank", "noopener");
    f.reset();
  }

  return (
    <form className="card-form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" required autoComplete="name" placeholder="Full name" maxLength={80} />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone / WhatsApp</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+91 " maxLength={20} />
      </div>
      <div className="field">
        <label htmlFor="course">Which class?</label>
        <select id="course" name="course" defaultValue="Spoken English">
          <option>Spoken English</option>
          <option>School English (Grades 6–12)</option>
          <option>IELTS / Interview English</option>
          <option>Not sure yet — help me choose</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="msg">Anything you&apos;d like to tell the teacher? (optional)</label>
        <textarea id="msg" name="msg" rows={3} maxLength={600} placeholder="e.g. I understand English but freeze when speaking" />
      </div>

      {/* Honeypot: hidden from humans, catches spam bots */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", justifyContent: "center" }}>
        Request my free demo
      </button>
      <p className="form-privacy">
        🔒 Your details go straight to the teacher&apos;s WhatsApp. We never store them on this website and never share them.
      </p>
      {sent && <div className="form-msg">Opening WhatsApp with your details… if nothing happens, message us directly.</div>}
    </form>
  );
}
