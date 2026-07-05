import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand">
              {site.name}
              <span className="dot">.</span>
            </div>
            <p className="tag">
              One-on-one English mentorship taught with patience, honesty, and real attention. Online &amp; at our {site.city} centre.
            </p>
          </div>
          <div>
            <h4>Classes</h4>
            <ul>
              <li><Link href="/#courses">Spoken English</Link></li>
              <li><Link href="/#courses">School English</Link></li>
              <li><Link href="/#courses">IELTS Prep</Link></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/videos">Videos</Link></li>
              <li><Link href="/notes">Free Notes</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/#feedback">Report a bug</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href={site.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              {site.linkedin && <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>}
              {site.facebook && <li><a href={site.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>}
              <li><Link href="/#book">WhatsApp</Link></li>
              <li><a href={`mailto:${site.email}`}>Email</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} {site.name}. All rights reserved.</span>
          <span>
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <a href="/sitemap.xml">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
