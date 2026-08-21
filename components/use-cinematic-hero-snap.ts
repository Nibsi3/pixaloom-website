'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const easeInOutCubic = (value: number) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2;

/** Instant scroll — `html { scroll-behavior: smooth }` must not fight the rAF portal drive. */
const scrollInstant = (top: number) => {
  window.scrollTo({ top, left: 0, behavior: 'auto' });
};

/**
 * Turns the cinematic opening into a deliberate two-stop sequence. Momentum
 * from the gesture that starts a reveal is absorbed until that gesture ends,
 * preventing a fast trackpad flick from skipping directly into page content.
 */
export function useCinematicHeroSnap(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const usesTouchInput = window.matchMedia('(hover: none), (pointer: coarse), (any-pointer: coarse)').matches
      || navigator.maxTouchPoints > 0;

    // Touch browsers already provide momentum scrolling. Replacing that
    // gesture with a scripted scroll makes the two animations fight and is
    // especially unstable while mobile browser chrome is resizing.
    if (reducedMotion || usesTouchInput) return;

    let animationFrame = 0;
    let releaseTimer = 0;
    let gestureLocked = false;
    let touchMode = false;
    let lastScrollY = window.scrollY;
    let heroBoundary = 0;

    const updateBoundary = () => {
      const rect = section.getBoundingClientRect();
      heroBoundary = Math.max(0, window.scrollY + rect.top + rect.height - window.innerHeight);
    };
    const heroEnd = () => heroBoundary;
    const inHeroSequence = () => window.scrollY >= -3 && window.scrollY <= heroBoundary + 3;

    const scheduleRelease = (delay = 180) => {
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(() => {
        gestureLocked = false;
      }, delay);
    };

    const animateTo = (target: number) => {
      const start = window.scrollY;
      const distance = target - start;

      if (Math.abs(distance) < 2) {
        scrollInstant(target);
        scheduleRelease();
        return;
      }

      const startedAt = performance.now();
      const duration = clamp(720 + Math.abs(distance) * 0.22, 780, 1180);

      const step = (now: number) => {
        const progress = clamp((now - startedAt) / duration, 0, 1);
        scrollInstant(start + distance * easeInOutCubic(progress));
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        } else {
          animationFrame = 0;
          scrollInstant(target);
          scheduleRelease();
        }
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const beginChapterTransition = (direction: 1 | -1) => {
      if (!inHeroSequence()) return false;

      const start = 0;
      const end = heroEnd();
      const atStart = window.scrollY <= start + 3;
      const atEnd = window.scrollY >= end - 3;

      if ((direction > 0 && atEnd) || (direction < 0 && atStart)) return false;

      gestureLocked = true;
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animateTo(direction > 0 ? end : start);
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (touchMode) return;

      if (gestureLocked) {
        event.preventDefault();
        // Keep the lock alive while the chapter animation is still running;
        // only start the release countdown once the scripted scroll finishes.
        if (!animationFrame) scheduleRelease();
        return;
      }

      if (Math.abs(event.deltaY) < 2) return;
      if (beginChapterTransition(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    };

    const onTouchStart = () => {
      // Capability detection is intentionally backed up by the real input
      // event. If a browser misreports its pointer, the first touch disables
      // chapter snapping for the rest of this page view.
      touchMode = true;
      gestureLocked = false;
      window.clearTimeout(releaseTimer);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const onScroll = () => {
      const current = window.scrollY;
      if (touchMode) {
        lastScrollY = current;
        return;
      }

      const start = 0;
      const end = heroEnd();

      // Wheel events are normally cancelled before scrolling. This catches
      // browser/assistive scrolling paths that apply a large position jump
      // directly and would otherwise leap over the cinematic chapter.
      if (!gestureLocked && lastScrollY <= start + 4 && current > start + 4) {
        scrollInstant(start);
        lastScrollY = start;
        beginChapterTransition(1);
        return;
      }

      if (!gestureLocked && lastScrollY >= end - 4 && lastScrollY <= end + 4 && current < end - 4) {
        scrollInstant(end);
        lastScrollY = end;
        beginChapterTransition(-1);
        return;
      }

      if (gestureLocked && current > end + 4) {
        scrollInstant(end);
        lastScrollY = end;
        return;
      }

      if (gestureLocked && current < start - 4) {
        scrollInstant(start);
        lastScrollY = start;
        return;
      }

      lastScrollY = current;
    };

    updateBoundary();
    const resizeObserver = new ResizeObserver(updateBoundary);
    resizeObserver.observe(section);
    window.addEventListener('resize', updateBoundary);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(releaseTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBoundary);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionRef]);
}
