'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const depthLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'));
    let animationFrame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion ? (rect.top < 0 ? 1 : 0) : clamp(-rect.top / scrollDistance);

      section.style.setProperty('--hero-progress', progress.toFixed(4));
      section.style.setProperty('--portal-size', `${17 + progress * 99}%`);
      section.style.setProperty('--portal-y', `${(1 - progress) * -2.5}vh`);
      section.style.setProperty('--intro-opacity', `${1 - clamp(progress / 0.36)}`);
      section.style.setProperty('--feature-opacity', `${clamp((progress - 0.3) / 0.3)}`);
      section.style.setProperty('--feature-copy-y', `${(1 - clamp((progress - 0.28) / 0.38)) * 45}px`);

      const viewportCentre = window.innerHeight / 2;
      for (const layer of depthLayers) {
        const anchor = layer.closest<HTMLElement>('[data-depth-section]');
        if (!anchor) continue;
        const anchorRect = anchor.getBoundingClientRect();
        if (anchorRect.bottom < -300 || anchorRect.top > window.innerHeight + 300) continue;
        const speed = Number(layer.dataset.depth || 0.08);
        const distance = viewportCentre - (anchorRect.top + anchorRect.height / 2);
        layer.style.setProperty('--depth-y', `${clamp(distance * speed, -135, 135).toFixed(2)}px`);
      }

      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  return (
    <section ref={sectionRef} className="reference-hero" aria-labelledby="hero-title">
      <div className="reference-stage">
        <div className="reference-media" aria-hidden="true" style={{ position: 'absolute' }}>
          <video autoPlay muted loop playsInline preload="auto" poster="/video/pixaloom-ambient-poster.jpg">
            <source src="/video/pixaloom-ambient.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="reference-scrim" aria-hidden="true" />

        <div className="portal-copy">
          <h1 id="hero-title">
            <span>between</span>
            <strong>Code</strong>
            <i>&amp;</i>
            <strong>Culture</strong>
          </h1>
          <span className="portal-caption">Websites · Products · Experiences</span>
          <Link className="portal-scroll" href="#featured-state">
            <span>Scroll down</span><ArrowDown size={12} />
          </Link>
        </div>

        <div className="featured-copy" id="featured-state">
          <p className="featured-kicker">Pixaloom · Independent digital studio</p>
          <h2>Push <em>the</em><br />Possible</h2>
          <p className="featured-intro">We build digital experiences with enough clarity to work and enough character to be remembered.</p>
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
