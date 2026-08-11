import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { primaryNavigation, site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="reference-footer">
      <div className="reference-footer-row">
        <Link href="/" className="reference-footer-brand" aria-label="Pixaloom home">
          <Image src="/pixaloom-mark.png" alt="" width={400} height={280} />
          <span className="sr-only">Pixaloom</span>
        </Link>
        <nav aria-label="Footer navigation">
          {primaryNavigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <a href={`mailto:${site.email}`}>Contact <ArrowUpRight size={12} /></a>
      </div>
      <div className="reference-footer-base">
        <span>© {new Date().getFullYear()} Pixaloom · {site.location}</span>
        <Link href="/locations">Working across South Africa</Link>
        <a href="#main-content">Back to top ↑</a>
      </div>
    </footer>
  );
}
