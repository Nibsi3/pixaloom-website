'use client';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';
const motionQuery = '(prefers-reduced-motion: reduce)';
function subscribeMotion(callback: () => void) { const query = window.matchMedia(motionQuery); query.addEventListener('change', callback); return () => query.removeEventListener('change', callback); }
function prefersReducedMotion() { return window.matchMedia(motionQuery).matches; }

export function CinematicBackgroundVideo({ mediaClassName = 'reference-media' }: { mediaClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribeMotion, prefersReducedMotion, () => true);
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? reduced;
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) { video.pause(); return; }
    if (!video.getAttribute('src')) {
      video.src = video.canPlayType('video/webm; codecs="vp9"')
        ? window.matchMedia('(max-width: 720px)').matches ? '/video/pixaloom-ambient-mobile-v2.webm' : '/video/pixaloom-ambient-hd-v2.webm'
        : '/video/pixaloom-ambient.mp4';
      video.load();
    }
    const play = () => { if (document.visibilityState === 'visible') void video.play().catch(() => undefined); };
    const visibility = () => { if (document.visibilityState === 'hidden') video.pause(); else play(); };
    play();
    video.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', visibility);
    return () => { video.removeEventListener('canplay', play); document.removeEventListener('visibilitychange', visibility); video.pause(); };
  }, [paused]);

  return <><div className={mediaClassName} aria-hidden="true"><video ref={videoRef} muted loop playsInline preload="none" poster={cinematicPoster} /></div><button type="button" className="motion-toggle" aria-pressed={!paused} onClick={() => setChoice(!paused)}>{paused ? 'Play background motion' : 'Pause background motion'}</button></>;
}
