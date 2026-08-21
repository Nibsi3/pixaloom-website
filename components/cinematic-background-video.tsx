'use client';

import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';

const mobileFilm = '/video/pixaloom-ambient-mobile-v2.webm';
const desktopFilm = '/video/pixaloom-ambient-hd-v2.webm';
const fallbackFilm = '/video/pixaloom-ambient.mp4';

function pickFilmSrc() {
  if (typeof window === 'undefined') return fallbackFilm;
  if (window.matchMedia('(max-width: 720px)').matches) return mobileFilm;
  // Prefer mp4 on desktop — VP9 webm source selection is flaky in some Chromium builds
  // and can leave the element stuck on the poster with no currentSrc.
  return fallbackFilm;
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

    const desired = pickFilmSrc();
    if (video.getAttribute('src') !== desired) {
      video.src = desired;
      video.load();
    }

    const tryPlay = () => {
      const playAttempt = video.play();
      if (playAttempt) void playAttempt.catch(() => undefined);
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
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
      src={fallbackFilm}
    >
      <source src={desktopFilm} type='video/webm; codecs="vp9"' media="(min-width: 721px)" />
      <source src={mobileFilm} type='video/webm; codecs="vp9"' media="(max-width: 720px)" />
      <source src={fallbackFilm} type="video/mp4" />
    </video>
  );
}
