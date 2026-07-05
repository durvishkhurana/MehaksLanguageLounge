/** @type {import('next').NextConfig} */

// Strong security headers — applied to every route by Next.js.
// This replaces the old _headers / vercel.json files.
const ContentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: blob: https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  // 'unsafe-inline' for Next's inline runtime + JSON-LD; 'unsafe-eval' for the 3D model-viewer runtime; AdSense domains included.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://googleads.g.doubleclick.net",
  // blob: + data: let the 3D model-viewer load textures decoded from the .glb.
  "connect-src 'self' https://wa.me blob: data:",
  "worker-src 'self' blob:",
  "form-action 'self' https://wa.me",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "**.amazonaws.com" }, // Notion cover images
      { protocol: "https", hostname: "**.notion.so" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
