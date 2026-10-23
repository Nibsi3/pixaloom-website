'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { CinematicBackgroundVideo } from '@/components/cinematic-background-video';
import { usePortalScrollProgress } from '@/components/use-portal-scroll-progress';
import { site } from '@/lib/site';

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  usePortalScrollProgress(sectionRef, true);

  return (
    <section ref={sectionRef} className="reference-hero" aria-labelledby="hero-title">
      <div className="reference-stage">
        <CinematicBackgroundVideo />
        <div className="reference-scrim" aria-hidden="true" />
        <div className="hero-offer">
          <h1 id="hero-title">Web design in George.<br />Built for your business.</h1>
          <span>Business websites, online stores and redesigns.<br />George, the Garden Route and South Africa.</span>
          <div className="hero-offer-actions">
            <a href={`${site.whatsapp}?text=${encodeURIComponent('Hi Cameron, I need a website for my business. Can we discuss the scope?')}`}>WhatsApp Cameron <ArrowUpRight size={14} /></a>
            <Link href="/website-cost">See website costs <ArrowUpRight size={14} /></Link>
          </div>
        </div>

        <div className="portal-copy">
          <p className="portal-wordmark" aria-hidden="true">
            <span>between</span>
            <strong>Code</strong>
            <i>&amp;</i>
            <strong>Culture</strong>
          </p>
          <span className="portal-caption">Web design · Products · South Africa</span>
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
          <p className="featured-kicker">Pixaloom · Web design studio in George</p>
          <h2>Web design<br /> <em>for South Africa.</em></h2>
          <p className="featured-intro">We design and build fast websites, ecommerce stores and digital products from George—with enough character to be remembered.</p>
          <div className="featured-project">
            <span>Strategy · Design · Engineering</span>
            <strong>Made in George, South Africa</strong>
            <Link href="/projects">View portfolio <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
