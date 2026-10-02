'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';
const motionQuery = '(prefers-reduced-motion: reduce)';
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

function connection() {
  return (navigator as Navigator & { connection?: Connection }).connection;
}

function subscribePreferences(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  const network = connection();
  query.addEventListener('change', callback);
  network?.addEventListener('change', callback);
  return () => {
    query.removeEventListener('change', callback);
    network?.removeEventListener('change', callback);
  };
}

function prefersStillBackground() {
  const network = connection();
  return window.matchMedia(motionQuery).matches
    || Boolean(network?.saveData)
    || network?.effectiveType === 'slow-2g'
    || network?.effectiveType === '2g';
}

export function CinematicBackgroundVideo({ mediaClassName = 'reference-media' }: { mediaClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const preferStill = useSyncExternalStore(subscribePreferences, prefersStillBackground, () => true);
  const [choice, setChoice] = useState<boolean | null>(null);
  const paused = choice ?? preferStill;
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (paused) { video.pause(); return; }

    let visible = false;
    let ready = choice === false;
    let disposed = false;
    let idleCallback: number | undefined;
    let fallbackTimer: number | undefined;

    const syncPlayback = () => {
      if (disposed || !ready || !visible || document.visibilityState !== 'visible') {
        video.pause();
        return;
      }
      if (!video.getAttribute('src')) {
        video.src = video.canPlayType('video/webm; codecs="vp9"')
          ? window.matchMedia('(max-width: 720px)').matches ? '/video/pixaloom-ambient-mobile-v2.webm' : '/video/pixaloom-ambient-hd-v2.webm'
          : '/video/pixaloom-ambient.mp4';
        video.load();
      }
      void video.play().catch(() => undefined);
    };

    const startWhenIdle = () => {
      const start = () => { ready = true; syncPlayback(); };
      if (typeof window.requestIdleCallback === 'function') {
        idleCallback = window.requestIdleCallback(start, { timeout: 1500 });
      } else {
        fallbackTimer = window.setTimeout(start, 200);
      }
    };

    // Keep the poster visible while critical assets load. An explicit Play
    // request starts immediately, including on data-saving connections.
    if (!ready) {
      if (document.readyState === 'complete') startWhenIdle();
      else window.addEventListener('load', startWhenIdle, { once: true });
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video.closest('.reference-hero') ?? video);
    video.addEventListener('canplay', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener('load', startWhenIdle);
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      video.removeEventListener('canplay', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [paused, choice]);

  return <><div className={mediaClassName} aria-hidden="true"><video ref={videoRef} width={1920} height={1080} muted loop playsInline preload="none" poster={cinematicPoster} /></div><button type="button" className="motion-toggle" aria-pressed={!paused} onClick={() => setChoice(!paused)}>{paused ? 'Play background motion' : 'Pause background motion'}</button></>;
}
