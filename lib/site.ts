// Central place for site-wide values. Reads from environment variables,
// with sensible fallbacks so the site works out-of-the-box before you
// fill in .env.local.

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Mehak Language Lounge",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://YOUR-DOMAIN.com").replace(/\/$/, ""),
  city: process.env.NEXT_PUBLIC_CITY || "Amritsar",
  state: process.env.NEXT_PUBLIC_STATE || "Punjab",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "91XXXXXXXXXX",
  email: process.env.NEXT_PUBLIC_EMAIL || "hello@your-domain.com",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE || "https://www.youtube.com/@Mehak.Language.Lounge",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/mehaklanguagelounge/",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN || "", // TODO: paste your LinkedIn page URL
  facebook: process.env.NEXT_PUBLIC_FACEBOOK || "", // TODO: paste your Facebook page URL
  // 3D model (.glb) shown by the assistant + 3D section. Self-hosted in
  // /public/models by default (CC0 KayKit girl with a custom Wave animation);
  // swap via NEXT_PUBLIC_MODEL_URL or by replacing the file.
  modelUrl: process.env.NEXT_PUBLIC_MODEL_URL || "/models/buddy.glb",
  // Animation clip (embedded in the model) to autoplay.
  modelAnimation: "Wave",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "",
  tagline: "Speak English with confidence",
  description:
    "One-on-one English mentorship for spoken English, school English (Grades 6–12) and IELTS. Online, or at our centre in Amritsar, Punjab.",
};

// Build a WhatsApp deep link with a pre-filled message.
export function whatsappLink(message: string): string {
  const num = site.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}
