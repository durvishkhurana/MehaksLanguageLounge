# Build Brief — "The English Room" Tuition Website

You are building a production, deployable marketing + blog website for a small English-tuition business (run by a single teacher). A design prototype already exists in this folder as **`index.html`** — treat it as the **visual source of truth**. Match its palette, typography, layout, copy tone, and the signature "dictionary entry" hero element. Your job is to turn that single static file into a real, deployable Next.js app with a working blog.

## Before you start
Ask me for these values (or leave them as clearly-marked `TODO` placeholders if I don't answer): **brand name**, **city/state**, **domain**, **contact phone/WhatsApp**, **email**. Everywhere `index.html` says `The English Room`, `[City]`, `YOUR-DOMAIN.com`, replace with these.

## Stack (keep it lean — this is a small site, do NOT over-engineer)
- **Next.js (App Router) + TypeScript + Tailwind CSS**
- **Deployment target: Vercel** (free tier gives HTTPS, CDN, image optimization, Core Web Vitals). No Docker, Nginx, or CI/CD pipeline — Vercel's git integration handles it.
- Fonts: Fraunces (display), Inter (body), Newsreader italic (accents) via `next/font/google`.

## Design tokens (from index.html — reuse exactly)
- paper `#FBF7EF`, paper-warm `#F3ECDD`, ink `#1C2B28`, green `#2F5D50`, green-deep `#24473D`, marigold `#E39A2B`, marigold-dark `#C77E17`, muted `#6B7C74`, line `#DDD3C1`.
- Rounded, warm, editorial. Marigold is the accent, used sparingly. Keep the hero "dictionary entry" card — it's the brand signature.

## Pages / routes
- `/` — home. Port every section from `index.html`: hero, ad slot, courses, approach, ad slot, reviews, blog preview (pull 3 latest real posts), demo/booking form, FAQ accordion, footer.
- `/blog` — list of all posts (paginated).
- `/blog/[slug]` — individual post page. Must have per-post SEO metadata + Article JSON-LD.
- `/privacy`, `/terms` — simple legal pages.
- `not-found.tsx` (404).

## Blog — the important part (must handle DAILY posting by a NON-technical person)
**Default: Notion as the CMS.** The teacher writes posts in a Notion database; the site fetches them at build/ISR time via `@notionhq/client`. Set up:
- A `NOTION_TOKEN` + `NOTION_DATABASE_ID` in `.env.local` (document the required Notion DB columns: Title, Slug, Published (checkbox), Date, Excerpt, Cover, Tags, Body).
- ISR with `revalidate` (~60s) so new posts appear without a redeploy.
- Render Notion blocks to HTML (use `notion-to-md` or equivalent).
> If I say I'd rather use **Sanity/Decap** or **my own FastAPI+Postgres backend** instead, swap the blog data-source layer only — keep everything else. Isolate all blog fetching behind a single `lib/posts.ts` module so the source is swappable.

## Features to wire up
- **Demo/booking form**: on submit, send the inquiry somewhere real. Simplest: a `mailto:`/WhatsApp deep-link, or a Next.js route handler (`/api/inquiry`) that emails via Resend. Make the destination a single env var.
- **Google AdSense slots**: keep the marked ad placeholders from `index.html`. Add the AdSense script via `next/script` and leave `data-ad-slot` as TODO placeholders with a comment on where to paste the real unit IDs.

## SEO (this is a core goal — the site must rank)
- Per-page `metadata` (title, description, canonical, Open Graph, Twitter card).
- JSON-LD: `EducationalOrganization` on `/`, `Article` on each blog post.
- Generate **`sitemap.xml`** (include all blog posts dynamically) and **`robots.txt`**.
- Semantic HTML, single `<h1>` per page, descriptive `alt` text, `next/image` for all images.
- Target green Core Web Vitals: lazy-load below-the-fold, no layout shift.

## Accessibility / quality floor
- Responsive to mobile (match index.html breakpoints).
- Visible keyboard focus, `prefers-reduced-motion` respected, WCAG AA contrast.

## Deliver
- A working repo I can `npm run dev` immediately.
- A `README.md` with: local setup, env vars, how the teacher adds a blog post (Notion steps), and how to deploy to Vercel + connect the domain.
- Do NOT invent metrics or write anything into a resume — I handle claims separately.

Build it, then tell me what env vars I need to fill in and what to do to go live.
