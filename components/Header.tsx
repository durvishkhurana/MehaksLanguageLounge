"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/site";

const links = [
  { href: "/#courses", label: "Classes" },
  { href: "/#approach", label: "Approach" },
  { href: "/videos", label: "Videos" },
  { href: "/notes", label: "Free Notes" },
  { href: "/blog", label: "Blog" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="brand">
          {site.name}
          <span className="dot">.</span>
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => {
            const active = l.href.startsWith("/") && !l.href.includes("#") && pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : ""} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-cta">
          <Link href="/#book" className="btn btn-ghost">Contact</Link>
          <Link href="/#book" className="btn btn-primary">Book a free demo</Link>
          <button className="menu-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
