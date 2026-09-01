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
        <div className="reference-media" aria-hidden="true" style={{ position: 'absolute' }}>
          <CinematicBackgroundVideo />
        </div>
        <div className="reference-scrim" aria-hidden="true" />

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
              window.scrollTo({ top: window.scrollY + distance, behavior: 'smooth' });
            }}
          >
            <span>Scroll down</span><ArrowDown size={12} />
          </Link>
        </div>

        <div className="featured-copy" id="featured-state">
          <p className="featured-kicker">Pixaloom · Web design studio in George</p>
          <h1 id="hero-title">Web design<br /> <em>for South Africa.</em></h1>
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
