'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

function supportsViewTimeline() {
  return typeof CSS !== 'undefined' && CSS.supports('animation-timeline', 'view()');
}

/**
 * Drives cinematic portal progress from scroll.
 *
 * Prefer CSS scroll-driven animations (see globals.css) — they scrub on the
 * compositor, so desktop wheel/trackpad scrolling still shows the circle open
 * instead of jumping from intro → feature when the main thread skips frames.
 *
 * This hook:
 * - no-ops progress writes when view() timelines are active
 * - keeps a rAF + lerp fallback for browsers without scroll-driven animations
 * - still updates optional depth parallax layers
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
    const cssTimeline = !reducedMotion && supportsViewTimeline();

    if (cssTimeline) {
      section.dataset.portalDriver = 'css';
    } else {
      section.dataset.portalDriver = reducedMotion ? 'reduced' : 'js';
    }

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

    const measure = () => {
      scrollDistance = Math.max(
        window.innerHeight * 0.9,
        section.getBoundingClientRect().height - stage.getBoundingClientRect().height,
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

    const update = () => {
      if (!cssTimeline) {
        const rect = section.getBoundingClientRect();
        const target = reducedMotion
          ? (rect.top < stickyTop ? 1 : 0)
          : clamp((stickyTop - rect.top) / scrollDistance);

        if (reducedMotion) {
          displayProgress = target;
        } else {
          const delta = target - displayProgress;
          const smoothing = Math.abs(delta) > 0.12 ? 0.08 : 0.18;
          displayProgress += delta * smoothing;
          if (Math.abs(delta) < 0.001) displayProgress = target;
        }

        applyProgress(displayProgress);
      }

      applyDepth();
    };

    const loop = () => {
      if (heroVisible) update();
      loopId = window.requestAnimationFrame(loop);
    };

    const visibilityObserver = new IntersectionObserver((entries) => {
      heroVisible = entries.some((entry) => entry.isIntersecting);
      if (heroVisible) update();
    }, { rootMargin: '20% 0px' });
    visibilityObserver.observe(section);

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
      update();
    });
    resizeObserver.observe(section);
    resizeObserver.observe(stage);

    measure();
    if (!cssTimeline) {
      const rect = section.getBoundingClientRect();
      displayProgress = reducedMotion
        ? (rect.top < stickyTop ? 1 : 0)
        : clamp((stickyTop - rect.top) / scrollDistance);
      applyProgress(displayProgress);
    }
    loopId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopId);
      visibilityObserver.disconnect();
      depthObserver?.disconnect();
      resizeObserver.disconnect();
      delete section.dataset.portalDriver;
    };
  }, [sectionRef, withDepth]);
}
