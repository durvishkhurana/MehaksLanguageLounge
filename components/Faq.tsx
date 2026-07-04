"use client";

import { useState } from "react";

type QA = { q: string; a: string };

export default function Faq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`qa${isOpen ? " open" : ""}`}>
            <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
              {item.q}
              <span className="plus">+</span>
            </button>
            <div className="ans" style={{ maxHeight: isOpen ? 240 : 0 }}>
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
