import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import { getAllPosts, getPost } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      images: post.cover ? [post.cover] : ["/og-image.jpg"],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: post.cover ? [post.cover] : [`${site.url}/og-image.jpg`],
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="band">
        <div className="wrap article">
          <div style={{ marginBottom: 20 }}>
            <Link href="/blog" className="more" style={{ color: "var(--green)", fontWeight: 600 }}>← All posts</Link>
          </div>
          <div className="date" style={{ color: "var(--muted)", fontSize: 14, marginBottom: 8 }}>
            {post.tags[0] ? `${post.tags[0]} · ` : ""}{formatDate(post.date)}
          </div>
          <h1>{post.title}</h1>

          {post.cover && (
            <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 16, overflow: "hidden", margin: "24px 0" }}>
              <Image src={post.cover} alt={post.title} fill sizes="720px" priority />
            </div>
          )}

          <div className="prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />

          <div style={{ marginTop: 40 }}><AdSlot variant="content" /></div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/#book" className="btn btn-primary btn-lg">Book a free demo class</Link>
          </div>
        </div>
      </article>
    </>
  );
}
