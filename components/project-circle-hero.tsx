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
  meta: string;
  name: string;
  outcomes: string[];
  summary: string;
};

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export function ProjectCircleHero({ accent, category, image, index, liveUrl, meta, name, outcomes, summary }: ProjectCircleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

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
      section.style.setProperty('--project-portal-size', `${17 + progress * 99}%`);
      section.style.setProperty('--project-portal-y', `${(1 - progress) * -2.5}vh`);
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="project-circle-hero"
      style={{ '--project-accent': accent } as CSSProperties}
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
          <h1 id="project-circle-title">{name}</h1>
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
