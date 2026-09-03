'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowLeft, ExternalLink } from 'lucide-react';
import { CinematicBackgroundVideo } from '@/components/cinematic-background-video';
import { usePortalScrollProgress } from '@/components/use-portal-scroll-progress';

type ProjectCircleHeroProps = {
  accent: string;
  category?: string;
  index: number;
  liveUrl?: string;
  meta: string;
  name: string;
  outcomes: string[];
  summary: string;
};

export function ProjectCircleHero({ accent, category, index, liveUrl, meta, name, outcomes, summary }: ProjectCircleHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  usePortalScrollProgress(sectionRef, false);
  const titleLength = name.length > 20 ? 'xlong' : name.length > 9 ? 'long' : name.length > 7 ? 'medium' : 'standard';

  return (
    <section
      ref={sectionRef}
      className="reference-hero project-case-hero"
      style={{ '--project-accent': accent, '--project-hue': `${(index * 41) % 360}deg` } as CSSProperties}
      aria-labelledby="project-circle-title"
    >
      <div className="reference-stage project-case-stage">
        <CinematicBackgroundVideo mediaClassName="reference-media project-case-media" />
        <div className="reference-scrim project-case-scrim" aria-hidden="true" />

        <div className="portal-copy project-case-intro">
          <Link href="/projects" className="project-circle-back"><ArrowLeft size={13} /> All work</Link>
          <span className="project-circle-index">Case study · {String(index + 1).padStart(2, '0')}</span>
          <p>{category} · Pixaloom</p>
          <h1
            id="project-circle-title"
            className="project-case-title"
            data-title-length={titleLength}
          >
            <strong>{name}</strong>
          </h1>
          <span className="project-circle-meta">{meta}</span>
          <span className="project-circle-scroll">Scroll to reveal <ArrowDown size={12} /></span>
        </div>

        <div className="featured-copy project-case-featured">
          <div className="project-circle-copy">
            <p>Project {String(index + 1).padStart(2, '0')} · What we delivered</p>
            <h2>{name}</h2>
            <p className="project-circle-summary">{summary}</p>
            {liveUrl ? <a href={liveUrl} target="_blank" rel="noreferrer">{liveUrl.includes('.vercel.app') || liveUrl.includes('havaldemo.co.za') ? 'Visit project preview' : 'Visit public website'} <ExternalLink size={13} /></a> : <span className="project-circle-engagement">Archived interface study</span>}
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
