'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import ReactDOM from 'react-dom';
import { Pause, Play } from 'lucide-react';
import imageLoader from '@/lib/image-loader';

export const cinematicPoster = imageLoader({ src: '/video/pixaloom-ambient-poster-v2.jpg', width: 1920 });

type DataConnection = EventTarget & { saveData?: boolean };
const dataConnection = () => (navigator as Navigator & { connection?: DataConnection }).connection;
const automaticMotionEnabled = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !dataConnection()?.saveData;
const serverMotionEnabled = () => false;

function subscribeMotionPreference(onChange: () => void) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const connection = dataConnection();
  preference.addEventListener('change', onChange);
  connection?.addEventListener('change', onChange);
  return () => {
    preference.removeEventListener('change', onChange);
    connection?.removeEventListener('change', onChange);
  };
}

export function CinematicBackgroundVideo({ mediaClassName = 'reference-media' }: { mediaClassName?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const automaticMotion = useSyncExternalStore(subscribeMotionPreference, automaticMotionEnabled, serverMotionEnabled);
  const [motionOverride, setMotionOverride] = useState<boolean | null>(null);
  const motionEnabled = motionOverride ?? automaticMotion;
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const hero = videoRef.current?.closest<HTMLElement>('.reference-hero');
    if (!hero) return;
    hero.dataset.motion = motionEnabled ? 'on' : 'off';
    hero.dispatchEvent(new Event('portal-motion-change'));
    return () => { delete hero.dataset.motion; };
  }, [motionEnabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !motionEnabled) return;

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

    // Do not request decorative video until critical assets have loaded and
    // motion is allowed. The poster remains usable without JavaScript/autoplay.
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
      // Stop buffering when motion is disabled, and restore the static poster.
      video.removeAttribute('src');
      video.load();
    };
  }, [motionEnabled]);

  return <>
    <div className={mediaClassName} aria-hidden="true"><video ref={videoRef} width={1920} height={1080} muted loop playsInline preload="none" poster={cinematicPoster} /></div>
    <button className="motion-toggle" type="button" aria-label={motionEnabled ? 'Pause animation' : 'Play animation'} title={motionEnabled ? 'Pause animation' : 'Play animation'} aria-pressed={motionEnabled} onClick={() => setMotionOverride(!motionEnabled)}>
      {motionEnabled ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
    </button>
  </>;
}
