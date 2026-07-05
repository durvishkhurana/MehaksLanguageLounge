"use client";

import { useEffect, useState } from "react";
import ModelViewer from "@/components/ui/model-viewer";
import { site, whatsappLink } from "@/lib/site";

// A floating 3D "study buddy" that helps visitors navigate and book a demo.
// It's a scripted concierge (quick actions) — no backend, no AI API — so it
// keeps the site's no-database, nothing-to-hack security model.
const actions = [
  { icon: "📅", label: "Book a free demo", href: "/#book" },
  { icon: "📚", label: "See the classes", href: "/#courses" },
  { icon: "▶️", label: "Watch our videos", href: "/videos" },
  { icon: "📝", label: "Free notes to download", href: "/notes" },
  { icon: "❓", label: "Common questions", href: "/#faq" },
];

export default function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [show3d, setShow3d] = useState(false);

  // Defer the heavy 3D runtime until the browser is idle, and skip it
  // entirely on phones — most visitors are on mobile, and the WebGL
  // runtime would slow them down. Mobile gets the pill + panel only.
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setShow3d(true), { timeout: 3500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setShow3d(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = () => {
    setOpen((o) => !o);
    setShowHint(false);
  };

  const wa = whatsappLink("Hi! I found you on your website and I'd like to know more about the English classes.");

  return (
    <>
      {open && (
        <div className="assistant-panel" role="dialog" aria-label="Study buddy helper">
          <div className="assistant-hi">
            <button className="assistant-close" aria-label="Close helper" onClick={() => setOpen(false)}>✕</button>
            <strong>Hi there! 👋</strong>
            <span>I&apos;m your study buddy — tap what you need.</span>
          </div>
          <div className="assistant-actions">
            {actions.map((a) => (
              <a key={a.label} href={a.href} className="assistant-action" onClick={() => setOpen(false)}>
                <span className="ai" aria-hidden="true">{a.icon}</span>
                {a.label}
                <span className="arr" aria-hidden="true">→</span>
              </a>
            ))}
            <a href={wa} target="_blank" rel="noopener noreferrer" className="assistant-action wa" onClick={() => setOpen(false)}>
              <span className="ai" aria-hidden="true">💬</span>
              Chat on WhatsApp
              <span className="arr" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}

      {showHint && !open && (
        <button className="assistant-hint" onClick={toggle}>
          Hi! Need help? Tap me 👋
        </button>
      )}

      {/* The floating 3D character IS the launcher */}
      <div className="assistant-figure" onClick={toggle} role="presentation">
        {show3d && (
          <ModelViewer
            src={site.modelUrl}
            alt="Your friendly study buddy waving hello"
            animationName={site.modelAnimation}
            autoRotate={false}
            cameraControls={false}
            className="assistant-figure-canvas"
          />
        )}
        <button
          className={`assistant-badge${open ? " is-open" : ""}`}
          aria-label={open ? "Close helper" : "Open study buddy helper"}
          aria-expanded={open}
          onClick={(e) => { e.stopPropagation(); toggle(); }}
        >
          {open ? "✕ Close" : "Ask me"}
        </button>
      </div>
    </>
  );
}
