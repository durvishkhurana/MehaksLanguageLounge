"use client";

import { Youtube, Instagram, Play } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { site } from "@/lib/site";

export type ShowcaseVideo = { id: string; title: string };

// Note: Instagram/YouTube block embedding their real profile pages inside
// other sites, so these are styled previews. The YouTube one shows the
// channel's REAL latest videos (fetched server-side); the Instagram grid
// uses placeholder photos until real post screenshots are added to
// /public/instagram (ig1.jpg ... ig9.jpg).
function YouTubeMock({ videos }: { videos: ShowcaseVideo[] }) {
  return (
    <div className="h-full w-full flex flex-col bg-white">
      <div className="h-20 md:h-28 w-full bg-gradient-to-r from-[#0A2947] to-[#061C33]" />
      <div className="px-4 md:px-6 -mt-8 flex items-center gap-4">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#8B5E3C] border-4 border-white flex items-center justify-center text-[#FFFBF0] shrink-0">
          <Youtube className="w-7 h-7 md:w-9 md:h-9" />
        </div>
        <div className="flex-1 pt-8 min-w-0">
          <div className="font-semibold text-[#0A2947] text-base md:text-lg truncate">{site.name}</div>
          <div className="text-xs text-[#6A7364] truncate">Free English lessons · new videos weekly</div>
        </div>
        <button className="mt-8 bg-[#0A2947] text-white text-xs md:text-sm font-semibold px-3 md:px-4 py-2 rounded-full flex items-center gap-2 shrink-0">
          <Youtube className="w-4 h-4" /> Subscribe
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 md:gap-3 p-4 md:p-6 flex-1 overflow-hidden">
        {videos.slice(0, 6).map((v, i) => (
          <a key={i} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="rounded-xl overflow-hidden bg-black/5 flex flex-col">
            <div className="relative aspect-video bg-[#0A2947]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" className="w-full h-full object-cover" loading="lazy" />
              <span className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#8B5E3C]/90 flex items-center justify-center text-[#FFFBF0]">
                <Play className="w-4 h-4" fill="currentColor" />
              </span>
            </div>
            <div className="px-2 py-1.5 text-[11px] md:text-xs font-medium text-[#0A2947] leading-snug line-clamp-2">{v.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function InstagramMock() {
  const seeds = ["mll1", "mll2", "mll3", "mll4", "mll5", "mll6", "mll7", "mll8", "mll9"];
  return (
    <div className="h-full w-full bg-white flex flex-col">
      <div className="px-4 md:px-6 pt-5 flex items-center gap-4 md:gap-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] bg-gradient-to-tr from-[#8B5E3C] via-[#6F4A2E] to-[#0A2947] shrink-0">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#6F4A2E]">
            <Instagram className="w-7 h-7 md:w-9 md:h-9" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-[#0A2947] truncate">mehaklanguagelounge</span>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="bg-[#8B5E3C] text-[#FFFBF0] text-xs font-semibold px-3 py-1.5 rounded-lg">Follow</a>
          </div>
          <div className="text-xs text-[#0A2947] mt-2">✍️ Daily English tips · 🎯 IELTS &amp; spoken · 📍 {site.city}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 md:gap-1.5 p-3 md:p-4 flex-1">
        {seeds.map((s) => (
          <a key={s} href={site.instagram} target="_blank" rel="noopener noreferrer" className="relative aspect-square overflow-hidden group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://picsum.photos/seed/${s}/400/400`} alt="" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function FollowShowcase({ videos }: { videos: ShowcaseVideo[] }) {
  return (
    <section className="band band-warm" id="follow">
      <div className="wrap">
        <div className="sec-head center reveal" style={{ marginBottom: 0 }}>
          <span className="eyebrow">Follow along</span>
          <h2>See us on YouTube &amp; Instagram.</h2>
          <p>A peek at what we post — the real profiles are one tap away.</p>
        </div>
      </div>

      <ContainerScroll
        titleComponent={
          <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6F4A2E] font-semibold">
            <Youtube className="w-6 h-6" /> Our YouTube channel →
          </a>
        }
      >
        <YouTubeMock videos={videos} />
      </ContainerScroll>

      <ContainerScroll
        titleComponent={
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#6F4A2E] font-semibold">
            <Instagram className="w-6 h-6" /> Our Instagram →
          </a>
        }
      >
        <InstagramMock />
      </ContainerScroll>
    </section>
  );
}
