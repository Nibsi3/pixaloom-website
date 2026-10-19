'use client';

import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import imageLoader from '@/lib/image-loader';

export const cinematicPoster = imageLoader({ src: '/video/pixaloom-ambient-poster-v2.jpg', width: 1920 });
export function CinematicBackgroundVideo({ mediaClassName = 'reference-media' }: { mediaClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const hero = videoRef.current?.closest<HTMLElement>('.reference-hero');
    if (!hero) return;
    hero.dataset.motion = 'on';
    hero.dispatchEvent(new Event('portal-motion-change'));
    return () => { delete hero.dataset.motion; };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let visible = false;
    let ready = false;
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

    // Start automatically after critical assets load; keep a readable poster
    // if the browser blocks muted autoplay.
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
  }, []);

  return <div className={mediaClassName} aria-hidden="true"><video ref={videoRef} width={1920} height={1080} autoPlay muted loop playsInline preload="none" poster={cinematicPoster} /></div>;
}
