'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

/** Scrolled-into-hero distance (px) that opens the portal, and that closes it again. */
const OPEN_AFTER_PX = 36;
const CLOSE_BEFORE_PX = 10;

/**
 * Opens the cinematic portal as soon as the visitor scrolls into the hero.
 *
 * Scrolling is never hijacked: JS only toggles `.is-revealed` and CSS plays the
 * circle/copy transition, so the reveal always runs at full duration instead of
 * being scrubbed by scroll position. The state resets near the top of the hero,
 * so scrolling back up and down replays the animation every time.
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

    let stickyTop = 0;
    let heroVisible = true;
    let revealed = false;
    let readyFrame = 0;
    let scrollFrame = 0;

    const measure = () => {
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

    /** How far the page has scrolled into the hero, in pixels. */
    const readOffset = () => stickyTop - section.getBoundingClientRect().top;

    const setRevealed = (next: boolean) => {
      if (revealed === next) return;
      revealed = next;
      section.classList.toggle('is-revealed', revealed);
    };

    const syncState = () => {
      const offset = readOffset();
      // Hysteresis keeps the state stable while the transition plays.
      if (!revealed && offset > OPEN_AFTER_PX) setRevealed(true);
      else if (revealed && offset < CLOSE_BEFORE_PX) setRevealed(false);
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        if (!heroVisible) return;
        applyDepth();
        syncState();
      });
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      heroVisible = entries.some((entry) => entry.isIntersecting);
    }, { rootMargin: '30% 0px' });
    visibilityObserver.observe(section);
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
    // Match the current scroll position before transitions are enabled so a
    // mid-page refresh does not replay, then let scrolling drive it from there.
    revealed = readOffset() > OPEN_AFTER_PX;
    section.classList.toggle('is-revealed', revealed);
    readyFrame = window.requestAnimationFrame(() => {
      section.classList.add('portal-ready');
      syncState();
    });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      window.cancelAnimationFrame(scrollFrame);
      window.removeEventListener('scroll', onScroll);
      visibilityObserver.disconnect();
      depthObserver?.disconnect();
      resizeObserver.disconnect();
      section.classList.remove('portal-ready', 'is-revealed');
      delete section.dataset.portalDriver;
    };
  }, [sectionRef, withDepth]);
}
