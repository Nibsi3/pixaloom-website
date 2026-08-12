'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const easeInOutCubic = (value: number) => value < 0.5
  ? 4 * value * value * value
  : 1 - Math.pow(-2 * value + 2, 3) / 2;

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
    if (reducedMotion) return;

    let animationFrame = 0;
    let releaseTimer = 0;
    let gestureLocked = false;
    let touchStartY: number | null = null;
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
        window.scrollTo(0, target);
        scheduleRelease();
        return;
      }

      const startedAt = performance.now();
      const duration = clamp(720 + Math.abs(distance) * 0.22, 780, 1180);

      const step = (now: number) => {
        const progress = clamp((now - startedAt) / duration, 0, 1);
        window.scrollTo(0, start + distance * easeInOutCubic(progress));
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        } else {
          animationFrame = 0;
          window.scrollTo(0, target);
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
      if (gestureLocked) {
        event.preventDefault();
        scheduleRelease();
        return;
      }

      if (Math.abs(event.deltaY) < 2) return;
      if (beginChapterTransition(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY;
      if (touchStartY === null || currentY === undefined) return;

      if (gestureLocked) {
        event.preventDefault();
        return;
      }

      const delta = touchStartY - currentY;
      if (Math.abs(delta) < 8) return;
      if (beginChapterTransition(delta > 0 ? 1 : -1)) event.preventDefault();
    };

    const onTouchEnd = () => {
      touchStartY = null;
      if (gestureLocked) scheduleRelease(260);
    };

    const onScroll = () => {
      const current = window.scrollY;
      const start = 0;
      const end = heroEnd();

      // Wheel events are normally cancelled before scrolling. This catches
      // browser/assistive scrolling paths that apply a large position jump
      // directly and would otherwise leap over the cinematic chapter.
      if (!gestureLocked && lastScrollY <= start + 4 && current > start + 4) {
        window.scrollTo(0, start);
        lastScrollY = start;
        beginChapterTransition(1);
        return;
      }

      if (!gestureLocked && lastScrollY >= end - 4 && lastScrollY <= end + 4 && current < end - 4) {
        window.scrollTo(0, end);
        lastScrollY = end;
        beginChapterTransition(-1);
        return;
      }

      if (gestureLocked && current > end + 4) {
        window.scrollTo(0, end);
        lastScrollY = end;
        return;
      }

      if (gestureLocked && current < start - 4) {
        window.scrollTo(0, start);
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
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(releaseTimer);
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateBoundary);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionRef]);
}
