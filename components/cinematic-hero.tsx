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
          <h1 id="hero-title">
            <span>between</span>
            <strong>Code</strong>
            <i>&amp;</i>
            <strong>Culture</strong>
          </h1>
          <span className="portal-caption">Web design · Products · South Africa</span>
          <Link className="portal-scroll" href="#featured-state">
            <span>Scroll down</span><ArrowDown size={12} />
          </Link>
        </div>

        <div className="featured-copy" id="featured-state">
          <p className="featured-kicker">Pixaloom · South African web design studio</p>
          <h2>Push <em>the</em><br />Possible</h2>
          <p className="featured-intro">We design and build fast websites, ecommerce stores and digital products with enough character to be remembered.</p>
          <div className="featured-project">
            <span>Strategy · Design · Engineering</span>
            <strong>Made in South Africa</strong>
            <Link href="/projects">View portfolio <ArrowUpRight size={13} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
