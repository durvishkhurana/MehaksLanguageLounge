// Fetches the channel's REAL latest videos from YouTube's public RSS feed.
// Runs on the server at build/revalidate time (ISR) — no API key, no database.
// Falls back to the sample list in lib/content.ts if YouTube is unreachable
// or the channel has no public videos yet.
import { videos as sampleVideos, pinnedVideos, videoPriority } from "@/lib/content";
import { site } from "@/lib/site";

export type LatestVideo = { id: string; title: string; tag: string; desc?: string };

// Order the feed the way the owner wants: pinned videos first (with optional
// title overrides), then videos matching the priority keywords, then the rest
// (newest first — Array.sort is stable, so recency is kept within groups).
function curate(list: LatestVideo[], limit: number): LatestVideo[] {
  const byId = new Map(list.map((v) => [v.id, v]));
  const used = new Set<string>();
  const out: LatestVideo[] = [];

  for (const p of pinnedVideos) {
    const v = byId.get(p.id);
    if (v) {
      out.push({ ...v, title: p.title || v.title });
      used.add(p.id);
    } else if (p.title) {
      // Pinned video is older than the feed window — still show it.
      out.push({ id: p.id, title: p.title, tag: "On YouTube" });
      used.add(p.id);
    }
  }

  const score = (title: string) => {
    const i = videoPriority.findIndex((k) => title.toLowerCase().includes(k.toLowerCase()));
    return i === -1 ? videoPriority.length : i;
  };
  const rest = list.filter((v) => !used.has(v.id)).sort((a, b) => score(a.title) - score(b.title));

  return [...out, ...rest].slice(0, limit);
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

// The RSS feed needs the channel's UC... id, not the @handle. We resolve it
// once a day by reading the public channel page (or use YT_CHANNEL_ID if set).
async function resolveChannelId(): Promise<string | null> {
  if (process.env.YT_CHANNEL_ID) return process.env.YT_CHANNEL_ID;
  try {
    const res = await fetch(site.youtube, {
      next: { revalidate: 86400 },
      headers: { "user-agent": "Mozilla/5.0 (compatible; site-build)" },
    });
    if (!res.ok) return null;
    const html = await res.text();
    // YouTube serves the id under different keys depending on the page build.
    const m =
      html.match(/"externalId":"(UC[0-9A-Za-z_-]{22})"/) ||
      html.match(/rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[0-9A-Za-z_-]{22})"/) ||
      html.match(/"channelId":"(UC[0-9A-Za-z_-]{22})"/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

export async function getLatestVideos(limit = 6): Promise<LatestVideo[]> {
  try {
    const channelId = await resolveChannelId();
    if (!channelId) return sampleVideos.slice(0, limit);

    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`, {
      next: { revalidate: 3600 }, // refresh every hour
    });
    if (!res.ok) return sampleVideos.slice(0, limit);

    const xml = await res.text();
    const all: LatestVideo[] = [];
    const re = /<yt:videoId>([\w-]+)<\/yt:videoId>[\s\S]*?<title>([\s\S]*?)<\/title>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(xml)) !== null) {
      all.push({ id: m[1], title: decodeXml(m[2].trim()), tag: "On YouTube" });
    }
    return all.length ? curate(all, limit) : sampleVideos.slice(0, limit);
  } catch {
    return sampleVideos.slice(0, limit);
  }
}
