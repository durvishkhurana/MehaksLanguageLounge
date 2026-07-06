import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import AdSlot from "@/components/AdSlot";
import BookingForm from "@/components/BookingForm";
import FeedbackForm from "@/components/FeedbackForm";
import YouTubeCard from "@/components/YouTubeCard";
import Faq from "@/components/Faq";
import VaporIntro from "@/components/VaporIntro";
import FollowShowcase from "@/components/FollowShowcase";
import Marquee from "@/components/Marquee";
import SpotlightCard from "@/components/SpotlightCard";
import CountUp from "@/components/CountUp";
import { site } from "@/lib/site";
import { courses, approach, faqs } from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { getLatestVideos } from "@/lib/youtube";
import { formatDate } from "@/lib/format";

export const revalidate = 60; // ISR: refresh blog preview without redeploy

const wins = [
  "One-on-one mentorship",
  "Spoken English · IELTS",
  "School English · Grades 6–12",
  "Online & at our Amritsar centre",
  "Free first demo class",
  "Interview & exam prep",
  "Free notes with every video",
  "New videos every week",
];

// Real Instagram post screenshots dropped into /public/instagram replace the
// placeholder photos in the Instagram preview automatically.
function getInstagramImages(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "instagram");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .slice(0, 9)
      .map((f) => `/instagram/${f}`);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [allPosts, latestVideos] = await Promise.all([getAllPosts(), getLatestVideos(6)]);
  const posts = allPosts.slice(0, 3);
  const igImages = getInstagramImages();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />

      {/* VAPORIZE INTRO — fear of speaking dissolves into the brand */}
      <VaporIntro />

      {/* HERO */}
      <section className="hero">
        <div className="aurora" aria-hidden="true">
          <span className="a1" /><span className="a2" /><span className="a3" />
        </div>
        <div className="wrap hero-grid">
          <div className="reveal">
            <span className="eyebrow">Spoken English · School English · IELTS</span>
            <h1>Speak English with the <em className="grad-text">confidence</em> it takes to be heard.</h1>
            <p className="lead">One-on-one mentorship with a teacher who actually listens. Learn to speak clearly — not just pass a test.</p>
            <div className="hero-actions">
              <Link href="/#book" className="btn btn-primary btn-lg btn-shimmer">Book a free demo class</Link>
              <Link href="/#courses" className="btn btn-ghost btn-lg">See the classes</Link>
            </div>
            <p className="hero-note">Free first class · No card needed · Online, or at our {site.city} centre</p>
          </div>

          <div className="entry reveal">
            <div className="headword">flu·en·cy</div>
            <div className="phon">/ˈfluː.ən.si/</div>
            <div className="pos">noun</div>
            <div className="def">the quiet ease of saying exactly what you mean, in a room full of people — and being understood.</div>
            <hr />
            <div className="stats">
              <div><div className="n"><CountUp end={500} suffix="+" /></div><div className="l">students taught</div></div>
              <div><div className="n">1-on-1</div><div className="l">private mentorship</div></div>
              <div><div className="n">Free</div><div className="l">first demo class</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF MARQUEE */}
      <div className="wins-band">
        <Marquee duration={40}>
          {wins.map((w, i) => (
            <span className="wins-pill" key={i}><span className="star">★</span> {w}</span>
          ))}
        </Marquee>
      </div>

      {/* AD */}
      <div className="ad-band"><div className="wrap"><AdSlot variant="leaderboard" /></div></div>

      {/* COURSES */}
      <section className="band band-warm" id="courses">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The classes</span>
            <h2>Pick the class that fits where you are now.</h2>
            <p>Every class is one-on-one — the full session is about you, your pace and your goals.</p>
          </div>
          <div className="cards">
            {courses.map((c) => (
              <SpotlightCard className="course reveal" key={c.title}>
                <div className="tag">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="meta">{c.meta}</div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="band" id="approach">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">The approach</span>
            <h2>Why students actually improve here.</h2>
          </div>
          <div className="appr-grid">
            {approach.map((a) => (
              <div className="appr reveal" key={a.num}>
                <div className="num">{a.num}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AD */}
      <div className="ad-band"><div className="wrap"><AdSlot variant="content" /></div></div>

      {/* YOUTUBE PREVIEW */}
      <section className="band band-warm" id="watch">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">On YouTube</span>
            <h2>Learn for free, any time.</h2>
            <p>Short lessons on speaking, grammar and IELTS — plus every downloadable note we share.</p>
          </div>
          <div className="video-grid">
            {latestVideos.slice(0, 3).map((v, i) => (
              <YouTubeCard key={i} id={v.id} tag={v.tag} title={v.title} desc={v.desc} />
            ))}
          </div>
          <div className="channel-cta">
            <Link href="/videos" className="btn btn-ghost btn-lg">See all videos</Link>
            <a href={site.youtube} className="btn btn-green btn-lg" target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
          </div>
        </div>
      </section>

      {/* FOLLOW — YouTube + Instagram scroll showcase */}
      <FollowShowcase videos={latestVideos} igImages={igImages} />

      {/* AD */}
      <div className="ad-band"><div className="wrap"><AdSlot variant="content" /></div></div>

      {/* BLOG PREVIEW */}
      <section className="band band-warm" id="blog">
        <div className="wrap">
          <div className="sec-head reveal">
            <span className="eyebrow">From the blog</span>
            <h2>Free English tips, posted often.</h2>
            <p>Short, useful posts to keep improving between classes — and to help new students find us on Google.</p>
          </div>
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
          <div style={{ marginTop: 32 }}><Link href="/blog" className="btn btn-ghost">Read all posts</Link></div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="band" id="book">
        <div className="wrap book">
          <div className="reveal">
            <span className="eyebrow">Book a free demo</span>
            <h2>Try one class. Then decide.</h2>
            <p>No payment, no pressure. Come to one full class, meet the teacher, and see if it&apos;s the right fit for you.</p>
            <ul className="checklist">
              <li>A real one-on-one class, not a sales call</li>
              <li>Online, or at our centre in {site.city}, {site.state}</li>
              <li>We reply within a few hours</li>
            </ul>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="band band-warm" id="faq">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Questions</span>
            <h2>Everything you might be wondering.</h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="band" id="feedback">
        <div className="wrap">
          <div className="sec-head center reveal">
            <span className="eyebrow">Help us improve</span>
            <h2>Spotted a bug? Tell us.</h2>
            <p>If something on this site looks broken, loads slowly, or feels confusing, let us know. It goes straight to us — quick note, big help.</p>
          </div>
          <FeedbackForm />
        </div>
      </section>
    </>
  );
}
