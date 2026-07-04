import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdSlot from "@/components/AdSlot";
import SpotlightCard from "@/components/SpotlightCard";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 60; // ISR: new posts appear without a redeploy

export const metadata: Metadata = {
  title: "Blog — Free English tips",
  description: `Free English tips on spoken English, grammar and IELTS from ${site.name}. New posts added often.`,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="page-hero">
        <div className="aurora" aria-hidden="true"><span className="a1" /><span className="a2" /><span className="a3" /></div>
        <div className="wrap center-narrow reveal">
          <span className="eyebrow" style={{ justifyContent: "center" }}>The blog</span>
          <h1>Free English tips, <em className="grad-text">posted often</em>.</h1>
          <p>Short, useful reads to keep improving between classes — speaking, grammar, exams and more.</p>
        </div>
      </section>

      <div className="ad-band"><div className="wrap"><AdSlot variant="leaderboard" /></div></div>

      <section className="band">
        <div className="wrap">
          {posts.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center" }}>No posts yet — check back soon!</p>
          ) : (
            <div className="blog-grid">
              {posts.map((p) => (
                <SpotlightCard as="article" className="post reveal" key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="thumb">
                    {p.cover && <Image src={p.cover} alt="" fill sizes="(max-width:900px) 100vw, 380px" />}
                    <span>{p.tags[0] || "Blog"}</span>
                  </Link>
                  <div className="body">
                    <div className="date">{formatDate(p.date)}</div>
                    <h3><Link href={`/blog/${p.slug}`}>{p.title}</Link></h3>
                    <p className="excerpt">{p.excerpt}</p>
                    <Link href={`/blog/${p.slug}`} className="more">Read post →</Link>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
