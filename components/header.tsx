import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Menu } from 'lucide-react';
import { primaryNavigation, site } from '@/lib/site';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Pixaloom Digital studio home">
          <Image className="brand-logo" src="/pixaloom-mark.png" alt="" width={400} height={280} loading="eager" />
          <span className="sr-only">Pixaloom</span>
          <span className="brand-studio">Digital studio</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item, index) => (
            <Link key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Contact <ArrowUpRight size={14} />
        </Link>

        <details className="mobile-nav">
          <summary aria-label="Open navigation"><Menu size={20} /></summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item, index) => (
              <Link key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</Link>
            ))}
            <Link href="/contact"><span>05</span>Contact</Link>
            <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Pixaloom — I would like to discuss a digital project.')}`}><span>06</span>WhatsApp</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
