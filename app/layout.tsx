import type { Metadata } from "next";
import { Fraunces, Inter, Newsreader } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientChrome from "@/components/ClientChrome";
import AssistantWidget from "@/components/AssistantWidget";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], weight: ["400"], style: ["italic"], variable: "--font-newsreader", display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Classes in ${site.city}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: ["/og-image.jpg"],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${newsreader.variable}`}>
      <body>
        <ClientChrome />
        <Header />
        <main>{children}</main>
        <Footer />
        <AssistantWidget />

        {/* Google AdSense loader — only added when you set NEXT_PUBLIC_ADSENSE_CLIENT */}
        {site.adsenseClient && (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
          />
        )}
      </body>
    </html>
  );
}
