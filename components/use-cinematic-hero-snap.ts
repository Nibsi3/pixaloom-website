'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

/**
 * Previously hijacked desktop wheel events into a two-stop chapter snap.
 * That path is skipped on touch (where the portal already animates correctly
 * via native scroll + --hero-progress) but on mouse/trackpad desktops it
 * preventDefault'd wheel + reset scrollY to 0, which trapped the page and
 * made the portal look frozen.
 *
 * Keep the hook as a stable import so heroes do not need a wider refactor;
 * native scrolling drives the cinematic progress everywhere.
 */
export function useCinematicHeroSnap(_sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    // no-op — see note above
  }, [_sectionRef]);
}
