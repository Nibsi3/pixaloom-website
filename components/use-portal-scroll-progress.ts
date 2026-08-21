'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));
const REVEAL_DURATION_MS = 1050;

/**
 * Turns the hero into a two-state chapter. JS only changes the state; CSS owns
 * the actual circle/copy transition, so wheel rendering cannot skip its frames.
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
    section.dataset.portalDriver = 'css-state';

    const depthLayers = withDepth
      ? Array.from(document.querySelectorAll<HTMLElement>('[data-depth]')).flatMap((layer) => {
          const anchor = layer.closest<HTMLElement>('[data-depth-section]');
          return anchor ? [{ anchor, layer, speed: Number(layer.dataset.depth || 0.08) }] : [];
        })
      : [];
    const activeDepthLayers = new Set<(typeof depthLayers)[number]>();

    let scrollDistance = 1;
    let stickyTop = 0;
    let heroVisible = true;
    let revealed = false;
    let transitioning = false;
    let transitionTimer = 0;
    let readyFrame = 0;

    const measure = () => {
      scrollDistance = Math.max(
        window.innerHeight * 1.2,
        section.offsetHeight - stage.offsetHeight,
      );
      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    };

    const applyDepth = () => {
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
      return clamp((stickyTop - rect.top) / scrollDistance);
    };

    const setChapter = (nextRevealed: boolean) => {
      if (transitioning || revealed === nextRevealed) return;
      revealed = nextRevealed;
      transitioning = !reducedMotion;
      section.classList.toggle('is-revealed', revealed);
      section.classList.toggle('is-transitioning', transitioning);

      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        const destination = sectionTop - stickyTop + (revealed ? scrollDistance : 0);
        window.scrollTo({ top: destination, behavior: 'auto' });
        transitioning = false;
        section.classList.remove('is-transitioning');
      }, reducedMotion ? 0 : REVEAL_DURATION_MS);
    };

    const onWheel = (event: WheelEvent) => {
      if (reducedMotion || !heroVisible) return;

      if (transitioning) {
        event.preventDefault();
        return;
      }

      const wantsNext = event.deltaY > 0 && !revealed;
      const wantsPrevious = event.deltaY < 0 && revealed;
      if (!wantsNext && !wantsPrevious) return;

      event.preventDefault();
      setChapter(wantsNext);
    };

    const onScroll = () => {
      applyDepth();
      if (transitioning || !heroVisible) return;
      const target = readTarget();
      // Touch, keyboard and scrollbar fallback. Wheel reaches this via onWheel.
      if (!revealed && target > 0.08) setChapter(true);
      else if (revealed && target < 0.92) setChapter(false);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      heroVisible = entries.some((entry) => entry.isIntersecting);
    }, { rootMargin: '30% 0px' });
    visibilityObserver.observe(section);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });

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
    revealed = readTarget() >= 0.5;
    section.classList.toggle('is-revealed', revealed);
    readyFrame = window.requestAnimationFrame(() => {
      section.classList.add('portal-ready');
    });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.clearTimeout(transitionTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      visibilityObserver.disconnect();
      depthObserver?.disconnect();
      resizeObserver.disconnect();
      section.classList.remove('portal-ready', 'is-revealed', 'is-transitioning');
      delete section.dataset.portalDriver;
    };
  }, [sectionRef, withDepth]);
}
