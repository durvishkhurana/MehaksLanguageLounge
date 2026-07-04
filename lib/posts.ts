// ============================================================
// The ONLY place the blog talks to its data source.
// Default source: Notion. To swap to Sanity / Decap / your own
// API, rewrite the functions below — the rest of the site keeps
// working unchanged.
//
// If NOTION_TOKEN / NOTION_DATABASE_ID are not set, the site
// falls back to the sample posts at the bottom, so it always runs.
// ============================================================
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string
  cover: string | null;
  tags: string[];
  bodyHtml: string;
};

export type PostMeta = Omit<Post, "bodyHtml">;

const token = process.env.NOTION_TOKEN;
const databaseId = process.env.NOTION_DATABASE_ID;
export const notionEnabled = Boolean(token && databaseId);

const notion = notionEnabled ? new Client({ auth: token }) : null;

/* ---------- helpers to read Notion properties safely ---------- */
function plainText(prop: any): string {
  if (!prop) return "";
  const arr = prop.title || prop.rich_text || [];
  return arr.map((t: any) => t.plain_text).join("").trim();
}
function readTags(prop: any): string[] {
  if (!prop || !prop.multi_select) return [];
  return prop.multi_select.map((t: any) => t.name);
}
function readCover(page: any): string | null {
  const p = page.properties?.Cover;
  if (p?.files?.length) {
    const f = p.files[0];
    return f.external?.url || f.file?.url || null;
  }
  const c = page.cover;
  if (c) return c.external?.url || c.file?.url || null;
  return null;
}
function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function mapMeta(page: any): PostMeta {
  const props = page.properties || {};
  const title = plainText(props.Title || props.Name) || "Untitled";
  const slug = plainText(props.Slug) || slugify(title);
  const date =
    props.Date?.date?.start || page.created_time || new Date().toISOString();
  return {
    slug,
    title,
    excerpt: plainText(props.Excerpt),
    date,
    cover: readCover(page),
    tags: readTags(props.Tags),
  };
}

/* ---------- public API used by the pages ---------- */

// List all published posts (newest first) — metadata only.
export async function getAllPosts(): Promise<PostMeta[]> {
  if (!notionEnabled || !notion) return samplePosts.map(({ bodyHtml, ...m }) => m);
  try {
    const res = await notion.databases.query({
      database_id: databaseId!,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });
    return res.results.map(mapMeta);
  } catch (err) {
    console.error("Notion getAllPosts failed, using samples:", err);
    return samplePosts.map(({ bodyHtml, ...m }) => m);
  }
}

// Full post (with rendered HTML body) for a single slug.
export async function getPost(slug: string): Promise<Post | null> {
  if (!notionEnabled || !notion) {
    return samplePosts.find((p) => p.slug === slug) || null;
  }
  try {
    const res = await notion.databases.query({
      database_id: databaseId!,
      filter: {
        and: [
          { property: "Published", checkbox: { equals: true } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
    });
    let page = res.results[0];
    // Fall back to matching a slugified title if no Slug column value.
    if (!page) {
      const all = await notion.databases.query({
        database_id: databaseId!,
        filter: { property: "Published", checkbox: { equals: true } },
      });
      page = all.results.find((p: any) => mapMeta(p).slug === slug)!;
    }
    if (!page) return null;

    const n2m = new NotionToMarkdown({ notionClient: notion });
    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const md = n2m.toMarkdownString(mdBlocks).parent || "";
    const bodyHtml = await marked.parse(md);
    return { ...mapMeta(page), bodyHtml };
  } catch (err) {
    console.error("Notion getPost failed:", err);
    return samplePosts.find((p) => p.slug === slug) || null;
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((p) => p.slug);
}

/* ---------- sample posts (used until Notion is connected) ---------- */
export const samplePosts: Post[] = [
  {
    slug: "10-phrases-to-sound-more-fluent",
    title: "10 phrases that instantly make you sound more fluent",
    excerpt:
      "Small phrase swaps that make your everyday English sound natural and confident — with examples you can use today.",
    date: "2026-07-04",
    cover: null,
    tags: ["Spoken English"],
    bodyHtml: `<p>When learners want to sound more fluent, they often reach for bigger words. In reality, fluency comes from small, natural phrases that native speakers use without thinking.</p>
<h2>1. "To be honest…"</h2>
<p>A gentle way to give your real opinion: <em>"To be honest, I preferred the first option."</em></p>
<h2>2. "It depends."</h2>
<p>Perfect when there's no single answer. Follow it with <em>"…on how much time we have."</em></p>
<h2>3. "I'd say…"</h2>
<p>Softens an opinion so you sound thoughtful, not blunt.</p>
<p>Practise one phrase a day this week, and you'll hear the difference in how natural you sound.</p>`,
  },
  {
    slug: "since-vs-for-common-mistake",
    title: '"Since" vs "For": the mistake almost everyone makes',
    excerpt:
      "A one-minute rule that clears up one of the most common grammar mix-ups in spoken and written English.",
    date: "2026-07-02",
    cover: null,
    tags: ["Grammar"],
    bodyHtml: `<p>Here's the simplest rule you'll ever need for these two words.</p>
<h2>Use "for" with a length of time</h2>
<p><em>"I've studied English <strong>for</strong> three years."</em> — three years is a duration.</p>
<h2>Use "since" with a starting point</h2>
<p><em>"I've studied English <strong>since</strong> 2023."</em> — 2023 is when it began.</p>
<blockquote>Quick test: if you can answer "how long?", use <em>for</em>. If you can answer "starting when?", use <em>since</em>.</blockquote>`,
  },
  {
    slug: "band-7-speaking-without-memorising",
    title: "How to hit Band 7 in Speaking without memorising answers",
    excerpt:
      "Memorised answers actually lower your IELTS score. Here's what examiners reward instead — and how to practise it.",
    date: "2026-06-30",
    cover: null,
    tags: ["IELTS"],
    bodyHtml: `<p>Many students memorise long answers hoping for a high band. Examiners are trained to spot this — and it hurts your score for fluency and coherence.</p>
<h2>What Band 7 actually needs</h2>
<ul>
<li>Speaking at length without obvious effort</li>
<li>A range of connectors used naturally</li>
<li>Some less common vocabulary, used correctly</li>
</ul>
<h2>A better way to practise</h2>
<p>Record yourself answering a question for two minutes. Play it back and note where you paused. Fluency grows when you practise <em>thinking</em> in English, not reciting.</p>`,
  },
];
