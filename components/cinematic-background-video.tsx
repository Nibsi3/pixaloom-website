'use client';

import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';

const mobileFilm = '/video/pixaloom-ambient-mobile-v2.webm';
const desktopFilm = '/video/pixaloom-ambient-hd-v2.webm';
/** H.264 fallback for browsers without VP9; both films are 1920x1080. */
const fallbackFilm = '/video/pixaloom-ambient.mp4';

function pickFilmSrc(video: HTMLVideoElement) {
  // VP9 keeps the film sharp at a fraction of the size on these soft gradients,
  // so it is preferred wherever it plays and mp4 only covers the rest.
  if (!video.canPlayType('video/webm; codecs="vp9"')) return fallbackFilm;
  return window.matchMedia('(max-width: 720px)').matches ? mobileFilm : desktopFilm;
}

export function CinematicBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The ambient film is the hero's content, not incidental motion, so it keeps
    // looping under prefers-reduced-motion instead of being stripped and paused.
    // Single explicit src — nested <source media> tags were winning over src on
    // desktop Chromium and leaving autoplay stuck on the poster.
    const desired = pickFilmSrc(video);
    if (video.currentSrc !== new URL(desired, window.location.origin).href) {
      video.src = desired;
      video.load();
    }

    const tryPlay = () => {
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt) void playAttempt.catch(() => undefined);
    };

    // Some browsers drop playback after a stall or a partial-content refetch, so
    // the film is nudged back into a loop rather than freezing on a still frame.
    const resume = () => {
      if (video.ended) video.currentTime = 0;
      if (video.paused) tryPlay();
    };

    tryPlay();
    for (const event of ['loadeddata', 'canplay', 'pause', 'stalled', 'suspend', 'ended'] as const) {
      video.addEventListener(event, resume);
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') resume();
    };
    document.addEventListener('visibilitychange', onVisibility);
    const watchdog = window.setInterval(resume, 4000);

    return () => {
      for (const event of ['loadeddata', 'canplay', 'pause', 'stalled', 'suspend', 'ended'] as const) {
        video.removeEventListener(event, resume);
      }
      document.removeEventListener('visibilitychange', onVisibility);
      window.clearInterval(watchdog);
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
    />
  );
}
