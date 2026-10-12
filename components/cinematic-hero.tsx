'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { CinematicBackgroundVideo } from '@/components/cinematic-background-video';
import { usePortalScrollProgress } from '@/components/use-portal-scroll-progress';

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  usePortalScrollProgress(sectionRef, true);

  return (
    <section ref={sectionRef} className="reference-hero" aria-labelledby="hero-title">
      <div className="reference-stage">
        <CinematicBackgroundVideo />
        <div className="reference-scrim" aria-hidden="true" />
        <div className="hero-offer"><p>Built it with AI? Let&apos;s get it live.</p><span>A brief initial review. Clear scope before paid work.</span><Link href="/ai-website-app-rescue#diagnosis">Get a free app diagnosis <ArrowUpRight size={14} /></Link></div>

        <div className="portal-copy">
          <p className="portal-wordmark" aria-hidden="true">
            <span>between</span>
            <strong>Code</strong>
            <i>&amp;</i>
            <strong>Culture</strong>
          </p>
          <span className="portal-caption">AI project help · Web development · South Africa</span>
          <Link
            className="portal-scroll"
            href="#work-archive"
            onClick={(event) => {
              event.preventDefault();
              const section = sectionRef.current;
              if (!section) return;
              const stage = section.querySelector<HTMLElement>('.reference-stage');
              const distance = stage
                ? Math.max(window.innerHeight * 0.9, section.offsetHeight - stage.offsetHeight)
                : window.innerHeight;
              // Smooth scroll so the CSS view-timeline portal can scrub visibly.
              window.scrollTo({ top: window.scrollY + distance, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
            }}
          >
            <span>Scroll down</span><ArrowDown size={12} />
          </Link>
        </div>

        <div className="featured-copy" id="featured-state">
          <p className="featured-kicker">Pixaloom · AI project help from George, South Africa</p>
          <h1 id="hero-title">Built it with AI?<br /> <em>Let&apos;s get it live.</em></h1>
          <p className="featured-intro">We help founders and business owners finish AI-built websites and apps, connect the services they need and work through launch blockers.</p>
          <div className="featured-project">
            <span>Finish · Connect · Launch</span>
            <strong>Made in George, South Africa</strong>
            <Link href="/projects">View portfolio <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
