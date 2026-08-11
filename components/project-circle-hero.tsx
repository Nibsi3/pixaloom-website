'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ExternalLink } from 'lucide-react';

type ProjectCircleHeroProps = {
  accent: string;
  category?: string;
  image: string;
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

const projectVisuals = [
  { layout: 'cascade', x: 53, y: 48, mobileX: 50, mobileY: 40, size: 17, driftX: 0, driftY: -2.5, rotate: -0.6 },
  { layout: 'counter', x: 67, y: 43, mobileX: 66, mobileY: 38, size: 15.5, driftX: -1.4, driftY: 2.8, rotate: 1.1 },
  { layout: 'orbit', x: 41, y: 52, mobileX: 36, mobileY: 48, size: 18.5, driftX: 1.6, driftY: -1.2, rotate: -1.5 },
  { layout: 'rise', x: 57, y: 36, mobileX: 58, mobileY: 34, size: 16, driftX: -0.8, driftY: 3.8, rotate: 0.8 },
  { layout: 'edge', x: 35, y: 46, mobileX: 34, mobileY: 42, size: 14.5, driftX: 1.8, driftY: 1.4, rotate: -1 },
  { layout: 'axis', x: 62, y: 57, mobileX: 62, mobileY: 52, size: 17.8, driftX: -1.2, driftY: -3.2, rotate: 1.4 },
] as const;

export function ProjectCircleHero({ accent, category, image, index, lead, liveUrl, meta, name, outcomes, summary, trail }: ProjectCircleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLength = name.length > 20 ? 'xlong' : name.length > 9 ? 'long' : 'standard';
  const leadLength = lead.length > 10 ? 'xlong' : lead.length > 8 ? 'long' : 'standard';
  const trailLength = trail.length > 11 ? 'xlong' : trail.length > 9 ? 'long' : 'standard';
  const visualBase = projectVisuals[index % projectVisuals.length];
  const visualCycle = Math.floor(index / projectVisuals.length);
  const visual = {
    ...visualBase,
    x: visualBase.x + [0, -2, 2][visualCycle % 3],
    y: visualBase.y + [0, 2, -2][visualCycle % 3],
    mobileX: visualBase.mobileX + [0, -3, 3][visualCycle % 3],
    mobileY: visualBase.mobileY + [0, 2, -2][visualCycle % 3],
    size: visualBase.size + visualCycle * 0.7,
    rotate: visualBase.rotate + visualCycle * 0.35,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = reducedMotion ? (rect.top < 0 ? 1 : 0) : clamp(-rect.top / distance);

      section.style.setProperty('--project-progress', progress.toFixed(4));
      section.style.setProperty('--project-portal-size', `${visual.size + progress * (116 - visual.size)}%`);
      section.style.setProperty('--project-portal-x-shift', `${(1 - progress) * visual.driftX}vw`);
      section.style.setProperty('--project-portal-y', `${(1 - progress) * visual.driftY}vh`);
      section.style.setProperty('--project-portal-rotate', `${(1 - progress) * visual.rotate}deg`);
      section.style.setProperty('--project-intro-opacity', `${1 - clamp(progress / 0.36)}`);
      section.style.setProperty('--project-reveal-opacity', `${clamp((progress - 0.3) / 0.3)}`);
      section.style.setProperty('--project-reveal-y', `${(1 - clamp((progress - 0.28) / 0.38)) * 45}px`);
      frame = 0;
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, [visual.driftX, visual.driftY, visual.rotate, visual.size]);

  return (
    <section
      ref={sectionRef}
      className="project-circle-hero"
      data-project-layout={visual.layout}
      style={{
        '--project-accent': accent,
        '--project-portal-x': `${visual.x}%`,
        '--project-portal-y-origin': `${visual.y}%`,
        '--project-mobile-x': `${visual.mobileX}%`,
        '--project-mobile-y': `${visual.mobileY}%`,
        '--project-portal-size': `${visual.size}%`,
      } as CSSProperties}
      aria-labelledby="project-circle-title"
    >
      <div className="project-circle-stage">
        <div className="project-circle-media" aria-hidden="true">
          <Image src={image} alt="" fill priority quality={92} sizes="100vw" />
        </div>
        <div className="project-circle-tint" aria-hidden="true" />

        <div className="project-circle-intro">
          <Link href="/projects" className="project-circle-back"><ArrowLeft size={13} /> All work</Link>
          <span className="project-circle-index">Case study · {String(index + 1).padStart(2, '0')}</span>
          <p>{category} · Pixaloom</p>
          <h1
            id="project-circle-title"
            className="project-circle-title-composition"
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

        <div className="project-circle-reveal">
          <div className="project-circle-rings" aria-hidden="true"><span /><span /></div>
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
