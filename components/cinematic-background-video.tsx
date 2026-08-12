'use client';

import ReactDOM from 'react-dom';

export const cinematicPoster = '/video/pixaloom-ambient-poster-v2.jpg';

export function CinematicBackgroundVideo() {
  ReactDOM.preload(cinematicPoster, { as: 'image', fetchPriority: 'high' });

  return (
    <video autoPlay muted loop playsInline preload="metadata" poster={cinematicPoster}>
      <source
        src="/video/pixaloom-ambient-mobile-v2.webm"
        type='video/webm; codecs="vp9"'
        media="(max-width: 720px) and (prefers-reduced-motion: no-preference)"
      />
      <source
        src="/video/pixaloom-ambient-hd-v2.webm"
        type='video/webm; codecs="vp9"'
        media="(min-width: 721px) and (prefers-reduced-motion: no-preference)"
      />
      <source
        src="/video/pixaloom-ambient.mp4"
        type="video/mp4"
        media="(prefers-reduced-motion: no-preference)"
      />
    </video>
  );
}
