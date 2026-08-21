'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

const REVEAL_DURATION_MS = 1100;
const MIN_REVEAL_SECONDS = REVEAL_DURATION_MS / 1000;
const easeInOutCubic = (value: number) => (
  value < 0.5 ? 4 * value ** 3 : 1 - ((-2 * value + 2) ** 3) / 2
);

/**
 * Drives cinematic portal CSS variables from scroll position.
 *
 * One desktop wheel gesture advances the full chapter through a controlled
 * animation. Touch devices retain native scroll. The capped rAF fallback also
 * protects keyboard/programmatic scrolling from hard-cutting between states.
 */
export function usePortalScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
  withDepth = false,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const stage = section.querySelector<HTMLElement>('.reference-stage');
    if (!stage) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section.dataset.portalDriver = reducedMotion ? 'reduced' : 'js';

    const depthLayers = withDepth
      ? Array.from(document.querySelectorAll<HTMLElement>('[data-depth]')).flatMap((layer) => {
          const anchor = layer.closest<HTMLElement>('[data-depth-section]');
          return anchor ? [{ anchor, layer, speed: Number(layer.dataset.depth || 0.08) }] : [];
        })
      : [];
    const activeDepthLayers = new Set<(typeof depthLayers)[number]>();

    let scrollDistance = 1;
    let stickyTop = 0;
    let loopId = 0;
    let heroVisible = true;
    let displayProgress = 0;
    let lastTime = performance.now();
    let chapterAnimationId = 0;
    let chapterAnimating = false;

    const measure = () => {
      scrollDistance = Math.max(
        window.innerHeight * 1.2,
        section.offsetHeight - stage.offsetHeight,
      );
      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    };

    const applyProgress = (progress: number) => {
      section.style.setProperty('--hero-progress', progress.toFixed(4));
      section.style.setProperty('--portal-size', `${17 + progress * 99}%`);
      section.style.setProperty('--portal-y', `${(1 - progress) * -2.5}vh`);
      section.style.setProperty('--intro-opacity', `${1 - clamp(progress / 0.36)}`);
      section.style.setProperty('--feature-opacity', `${clamp((progress - 0.3) / 0.3)}`);
      section.style.setProperty('--feature-copy-y', `${(1 - clamp((progress - 0.28) / 0.38)) * 45}px`);

      if (!withDepth || activeDepthLayers.size === 0) return;

      const viewportCentre = window.innerHeight / 2;
      for (const { anchor, layer, speed } of activeDepthLayers) {
        const anchorRect = anchor.getBoundingClientRect();
        const distance = viewportCentre - (anchorRect.top + anchorRect.height / 2);
        layer.style.setProperty('--depth-y', `${clamp(distance * speed, -135, 135).toFixed(2)}px`);
      }
    };

    const readTarget = () => {
      const rect = section.getBoundingClientRect();
      if (reducedMotion) return rect.top < stickyTop ? 1 : 0;
      return clamp((stickyTop - rect.top) / scrollDistance);
    };

    const animateChapter = (destination: 0 | 1) => {
      window.cancelAnimationFrame(chapterAnimationId);
      chapterAnimating = true;

      const startTime = performance.now();
      const startY = window.scrollY;
      const startProgress = displayProgress;
      const sectionTop = startY + section.getBoundingClientRect().top;
      const endY = sectionTop - stickyTop + destination * scrollDistance;

      const frame = (now: number) => {
        const elapsed = clamp((now - startTime) / REVEAL_DURATION_MS);
        const eased = easeInOutCubic(elapsed);
        displayProgress = startProgress + (destination - startProgress) * eased;
        applyProgress(displayProgress);
        window.scrollTo(0, startY + (endY - startY) * eased);

        if (elapsed < 1) {
          chapterAnimationId = window.requestAnimationFrame(frame);
        } else {
          displayProgress = destination;
          applyProgress(destination);
          chapterAnimating = false;
          lastTime = now;
        }
      };

      chapterAnimationId = window.requestAnimationFrame(frame);
    };

    const isDesktopPointer = !window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const onWheel = (event: WheelEvent) => {
      if (reducedMotion || !isDesktopPointer || !heroVisible) return;

      if (chapterAnimating) {
        event.preventDefault();
        return;
      }

      const target = readTarget();
      const wantsNext = event.deltaY > 4 && target < 0.98;
      const wantsPrevious = event.deltaY < -4 && target > 0.02;
      if (!wantsNext && !wantsPrevious) return;

      event.preventDefault();
      animateChapter(wantsNext ? 1 : 0);
    };

    const update = (now: number) => {
      const dt = Math.min(0.064, Math.max(0, (now - lastTime) / 1000));
      lastTime = now;

      if (chapterAnimating) return;
      const target = readTarget();

      if (reducedMotion) {
        displayProgress = target;
      } else {
        const delta = target - displayProgress;
        const maxStep = dt / MIN_REVEAL_SECONDS;
        if (Math.abs(delta) <= maxStep) displayProgress = target;
        else displayProgress += Math.sign(delta) * maxStep;
      }

      applyProgress(displayProgress);
    };

    const loop = (now: number) => {
      // Keep easing even briefly after the hero leaves so a late jump still finishes.
      if (heroVisible || Math.abs(readTarget() - displayProgress) > 0.001) update(now);
      else lastTime = now;
      loopId = window.requestAnimationFrame(loop);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      heroVisible = entries.some((entry) => entry.isIntersecting);
    }, { rootMargin: '30% 0px' });
    visibilityObserver.observe(section);
    window.addEventListener('wheel', onWheel, { passive: false });

    const depthObserver = withDepth
      ? new IntersectionObserver((entries) => {
          for (const observed of entries) {
            for (const depthLayer of depthLayers) {
              if (depthLayer.anchor !== observed.target) continue;
              if (observed.isIntersecting) activeDepthLayers.add(depthLayer);
              else activeDepthLayers.delete(depthLayer);
            }
          }
        }, { rootMargin: '300px 0px' })
      : null;

    if (depthObserver) {
      for (const { anchor } of depthLayers) depthObserver.observe(anchor);
    }

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(stage);

    measure();
    displayProgress = readTarget();
    applyProgress(displayProgress);
    loopId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopId);
      window.cancelAnimationFrame(chapterAnimationId);
      window.removeEventListener('wheel', onWheel);
      visibilityObserver.disconnect();
      depthObserver?.disconnect();
      resizeObserver.disconnect();
      delete section.dataset.portalDriver;
    };
  }, [sectionRef, withDepth]);
}
