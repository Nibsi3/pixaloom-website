'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { CinematicBackgroundVideo } from '@/components/cinematic-background-video';
import { useCinematicHeroSnap } from '@/components/use-cinematic-hero-snap';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export function CinematicHero() {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematicHeroSnap(sectionRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector<HTMLElement>('.reference-stage');
    if (!stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const depthLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]')).flatMap((layer) => {
      const anchor = layer.closest<HTMLElement>('[data-depth-section]');
      return anchor ? [{ anchor, layer, speed: Number(layer.dataset.depth || 0.08) }] : [];
    });
    const activeDepthLayers = new Set<(typeof depthLayers)[number]>();
    let animationFrame = 0;
    let scrollDistance = 1;
    let stickyTop = 0;

    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      scrollDistance = Math.max(1, sectionRect.height - stageRect.height);
      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = reducedMotion ? (rect.top < stickyTop ? 1 : 0) : clamp((stickyTop - rect.top) / scrollDistance);
      const viewportCentre = window.innerHeight / 2;
      const depthUpdates = Array.from(activeDepthLayers, ({ anchor, layer, speed }) => {
        const anchorRect = anchor.getBoundingClientRect();
        const distance = viewportCentre - (anchorRect.top + anchorRect.height / 2);
        return { layer, value: `${clamp(distance * speed, -135, 135).toFixed(2)}px` };
      });

      // Batch every geometry read before writes so scrolling never forces a
      // synchronous layout between individual layers.
      section.style.setProperty('--hero-progress', progress.toFixed(4));
      section.style.setProperty('--portal-size', `${17 + progress * 99}%`);
      section.style.setProperty('--portal-y', `${(1 - progress) * -2.5}vh`);
      section.style.setProperty('--intro-opacity', `${1 - clamp(progress / 0.36)}`);
      section.style.setProperty('--feature-opacity', `${clamp((progress - 0.3) / 0.3)}`);
      section.style.setProperty('--feature-copy-y', `${(1 - clamp((progress - 0.28) / 0.38)) * 45}px`);
      for (const { layer, value } of depthUpdates) layer.style.setProperty('--depth-y', value);

      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    const depthObserver = new IntersectionObserver((entries) => {
      for (const observed of entries) {
        for (const depthLayer of depthLayers) {
          if (depthLayer.anchor !== observed.target) continue;
          if (observed.isIntersecting) activeDepthLayers.add(depthLayer);
          else activeDepthLayers.delete(depthLayer);
        }
      }
      requestUpdate();
    }, { rootMargin: '300px 0px' });
    for (const { anchor } of depthLayers) depthObserver.observe(anchor);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      requestUpdate();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(stage);

    measure();
    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      depthObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestUpdate);
    };
  }, []);

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
