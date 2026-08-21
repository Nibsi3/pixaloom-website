'use client';

import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';

const mobileFilm = '/video/pixaloom-ambient-mobile-v2.webm';
const desktopFilm = '/video/pixaloom-ambient.mp4';

function pickFilmSrc() {
  if (typeof window === 'undefined') return desktopFilm;
  return window.matchMedia('(max-width: 720px)').matches ? mobileFilm : desktopFilm;
}

export function CinematicBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      video.removeAttribute('src');
      video.load();
      video.pause();
      return;
    }

    // Single explicit src — nested <source media> tags were winning over src on
    // desktop Chromium and leaving autoplay stuck on the poster.
    const desired = pickFilmSrc();
    if (video.currentSrc !== new URL(desired, window.location.origin).href) {
      video.src = desired;
      video.load();
    }

    const tryPlay = () => {
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt) void playAttempt.catch(() => undefined);
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={cinematicPoster}
      src={desktopFilm}
    />
  );
}
