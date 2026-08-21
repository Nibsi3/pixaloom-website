'use client';

import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';

export function CinematicBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    // Some browsers leave <video> on the poster when source media queries are
    // evaluated late; nudge playback once the element is in the document.
    const tryPlay = () => {
      const playAttempt = video.play();
      if (playAttempt) void playAttempt.catch(() => undefined);
    };

    tryPlay();
    video.addEventListener('loadeddata', tryPlay);
    return () => video.removeEventListener('loadeddata', tryPlay);
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
    >
      <source
        src="/video/pixaloom-ambient-mobile-v2.webm"
        type='video/webm; codecs="vp9"'
        media="(max-width: 720px)"
      />
      <source
        src="/video/pixaloom-ambient-hd-v2.webm"
        type='video/webm; codecs="vp9"'
        media="(min-width: 721px)"
      />
      <source src="/video/pixaloom-ambient.mp4" type="video/mp4" />
    </video>
  );
}
