# Mehak Language Lounge — website

A fast, secure marketing + blog site for a small English-tuition business, built with **Next.js (App Router) + TypeScript + Tailwind CSS** and deployed on **Vercel**.

The design is warm and editorial, with a signature "dictionary entry" hero. The blog is powered by **Notion** (a non-technical person writes posts in Notion; they appear on the site automatically). Inquiries go **straight to WhatsApp** — there is no database, which is what makes the site so hard to attack.

---

## Quick start (run it locally)

```bash
npm install
npm run dev
```

Open http://localhost:3000. It works immediately with **sample blog posts** — you don't need Notion configured to develop.

```bash
npm run build   # production build
npm run start   # run the production build locally
```

---

## Set your details

Copy the example env file and fill it in:

```bash
cp .env.local.example .env.local
```

| Variable | What it's for |
|---|---|
| `NEXT_PUBLIC_SITE_NAME` | Your business name (shown across the site) |
| `NEXT_PUBLIC_SITE_URL` | Your live domain, e.g. `https://theenglishroom.com` |
| `NEXT_PUBLIC_CITY` / `NEXT_PUBLIC_STATE` | Your location (used in copy + SEO) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp number, **digits only**, country code, no `+`. India example: `919812345678` |
| `NEXT_PUBLIC_EMAIL` | Contact email |
| `NEXT_PUBLIC_YOUTUBE` | Your YouTube channel URL |
| `NOTION_TOKEN` / `NOTION_DATABASE_ID` | The blog (optional — see below) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Google AdSense publisher id (optional) |

Everything is optional — the site runs with sensible fallbacks until you fill these in.

---

## How the teacher adds a blog post (Notion)

1. Go to https://www.notion.so/my-integrations → **New integration** → copy the **Internal Integration Secret** into `NOTION_TOKEN`.
2. Create a Notion **database** (table) with these columns:
   - **Title** (title)
   - **Slug** (text) — the URL, e.g. `my-first-post` (leave blank to auto-generate from the title)
   - **Published** (checkbox) — only checked posts appear on the site
   - **Date** (date)
   - **Excerpt** (text) — the short summary on cards
   - **Cover** (files & media) — optional cover image
   - **Tags** (multi-select)
   - **Body** — just write the post content in the page itself
3. Open the database → **•••** menu → **Connections** → add your integration.
4. Copy the database ID from its URL (the 32-character string) into `NOTION_DATABASE_ID`.

**To publish:** write a post in Notion, tick **Published**. It appears on the site within ~60 seconds (ISR) — no redeploy needed.

> Want a different CMS? All blog data access is isolated in [`lib/posts.ts`](lib/posts.ts). Rewrite those functions for Sanity / Decap / your own API and the rest of the site is unchanged.

---

## Editing content without Notion

- **Classes, reviews, FAQs, videos, notes** live in [`lib/content.ts`](lib/content.ts) — edit the text there.
- **YouTube videos**: each needs its video ID (the part after `v=` in the URL).
- **Downloadable notes**: put a PDF in `public/notes/` and set `href: "/notes/yourfile.pdf"`, or paste a Google Drive share link.

---

## Deploy to Vercel + connect your domain

1. Push this folder to a GitHub repo.
2. Go to https://vercel.com → **Add New → Project** → import the repo.
3. Add your environment variables (from `.env.local`) in **Project Settings → Environment Variables**.
4. Deploy. You get HTTPS, a global CDN, image optimization, and DDoS protection automatically.
5. **Domain:** Project Settings → **Domains** → add your domain and follow the DNS steps.

Security headers (CSP, HSTS, etc.) are configured in [`next.config.mjs`](next.config.mjs) and apply automatically. After going live, check your grade at https://securityheaders.com (aim for **A**).

---

## Why it's secure and won't break under load

- **No database** → nothing to steal, leak, or delete. Form inquiries go straight to your WhatsApp.
- **No server-side login** → no admin panel to break into. The only thing that can change the site is your Vercel account — protect it with **2FA**.
- **Static + CDN** → pages are pre-rendered and served from Vercel's global edge. 2,000 concurrent visitors is trivial; the network also absorbs DDoS attacks.
- **Spam protection** → both forms use a hidden honeypot and input length limits.
- **Privacy-friendly** → YouTube uses click-to-play `youtube-nocookie` embeds; nothing loads until a visitor clicks.

> Honest note: no site is literally "unbreakable," but with no database and no login, the usual attacks have nothing to target. The most important thing *you* control is your Vercel/domain account password + 2FA.

---

## SEO

- Per-page metadata, Open Graph and Twitter cards.
- JSON-LD: `EducationalOrganization` on the home page, `Article` on each blog post.
- Dynamic `sitemap.xml` (includes every blog post) and `robots.txt`.
- Add an `og-image.jpg` (1200×630) to `public/` for nicer social sharing previews.

---

## Project structure

```
app/            pages & routes (home, videos, notes, blog, privacy, terms, 404, sitemap, robots)
components/     Header, Footer, forms, YouTube cards, FAQ, ad slots
lib/            site config, content, and the swappable blog data layer (posts.ts)
```
