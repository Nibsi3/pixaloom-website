'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ExternalLink } from 'lucide-react';
import { useCinematicHeroSnap } from '@/components/use-cinematic-hero-snap';

type ProjectCircleHeroProps = {
  accent: string;
  category?: string;
  index: number;
  liveUrl?: string;
  lead: string;
  meta: string;
  name: string;
  outcomes: string[];
  summary: string;
  trail: string;
};

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export function ProjectCircleHero({ accent, category, index, lead, liveUrl, meta, name, outcomes, summary, trail }: ProjectCircleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useCinematicHeroSnap(sectionRef);
  const titleLength = name.length > 20 ? 'xlong' : name.length > 9 ? 'long' : name.length > 7 ? 'medium' : 'standard';
  const leadLength = lead.length > 10 ? 'xlong' : lead.length > 8 ? 'long' : 'standard';
  const trailLength = trail.length > 11 ? 'xlong' : trail.length > 8 ? 'long' : 'standard';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollDistance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion ? (rect.top < 0 ? 1 : 0) : clamp(-rect.top / scrollDistance);

      // These are intentionally identical to CinematicHero so the project
      // portal follows the homepage frame-for-frame.
      section.style.setProperty('--hero-progress', progress.toFixed(4));
      section.style.setProperty('--portal-size', `${17 + progress * 99}%`);
      section.style.setProperty('--portal-y', `${(1 - progress) * -2.5}vh`);
      section.style.setProperty('--intro-opacity', `${1 - clamp(progress / 0.36)}`);
      section.style.setProperty('--feature-opacity', `${clamp((progress - 0.3) / 0.3)}`);
      section.style.setProperty('--feature-copy-y', `${(1 - clamp((progress - 0.28) / 0.38)) * 45}px`);
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
    <section
      ref={sectionRef}
      className="reference-hero project-case-hero"
      style={{ '--project-accent': accent, '--project-hue': `${(index * 41) % 360}deg` } as CSSProperties}
      aria-labelledby="project-circle-title"
    >
      <div className="reference-stage project-case-stage">
        <div className="reference-media project-case-media" aria-hidden="true">
          <video autoPlay muted loop playsInline preload="auto" poster="/video/pixaloom-ambient-poster.jpg">
            <source src="/video/pixaloom-ambient.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="reference-scrim project-case-scrim" aria-hidden="true" />

        <div className="portal-copy project-case-intro">
          <Link href="/projects" className="project-circle-back"><ArrowLeft size={13} /> All work</Link>
          <span className="project-circle-index">Case study · {String(index + 1).padStart(2, '0')}</span>
          <p>{category} · Pixaloom</p>
          <h1
            id="project-circle-title"
            className="project-case-title"
            data-lead-length={leadLength}
            data-title-length={titleLength}
            data-trail-length={trailLength}
          >
            <span>{lead}</span>
            <strong>{name}</strong>
            <i>&amp;</i>
            <strong>{trail}</strong>
          </h1>
          <span className="project-circle-meta">{meta}</span>
          <span className="project-circle-scroll">Scroll to reveal <ArrowDown size={12} /></span>
        </div>

        <div className="featured-copy project-case-featured">
          <div className="project-circle-copy">
            <p>Project {String(index + 1).padStart(2, '0')} · What we delivered</p>
            <h2>{name}</h2>
            <p className="project-circle-summary">{summary}</p>
            {liveUrl ? <a href={liveUrl} target="_blank" rel="noreferrer">Visit live project <ExternalLink size={13} /></a> : <span className="project-circle-engagement">Selected engagement</span>}
          </div>
          <div className="project-circle-outcomes">
            <p>Selected outcomes</p>
            <ol>{outcomes.slice(0, 3).map((outcome, outcomeIndex) => <li key={outcome}><span>0{outcomeIndex + 1}</span>{outcome}</li>)}</ol>
          </div>
        </div>
      </div>
    </section>
  );
}
