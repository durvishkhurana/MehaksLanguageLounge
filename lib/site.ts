// Central place for site-wide values. Reads from environment variables,
// with sensible fallbacks so the site works out-of-the-box before you
// fill in .env.local.

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "The English Room",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN.com").replace(/\/$/, ""),
  city: process.env.NEXT_PUBLIC_CITY || "[City]",
  state: process.env.NEXT_PUBLIC_STATE || "[State]",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "91XXXXXXXXXX",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@your-domain.com",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@YOUR-CHANNEL",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  tagline: "Speak English with confidence",
  description:
    "Small-batch English classes for spoken English, school English (Grades 6–12) and IELTS. Personal teaching, real results.",
};

// Build a WhatsApp deep link with a pre-filled message.
export function whatsappLink(message: string): string {
  const num = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
