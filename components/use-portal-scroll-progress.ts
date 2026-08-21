'use client';

import type { RefObject } from 'react';
import { useEffect } from 'react';

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

/**
 * Drives the cinematic portal CSS variables from scroll position.
 * Samples on every animation frame while the hero is on screen so desktop
 * trackpad/wheel scrolling still advances the portal even when scroll events
 * are sparse or suppressed.
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

    const measure = () => {
      scrollDistance = Math.max(1, section.getBoundingClientRect().height - stage.getBoundingClientRect().height);
      stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
    };

    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = reducedMotion
        ? (rect.top < stickyTop ? 1 : 0)
        : clamp((stickyTop - rect.top) / scrollDistance);

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
    update();
    loopId = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(loopId);
      visibilityObserver.disconnect();
      depthObserver?.disconnect();
      resizeObserver.disconnect();
    };
  }, [sectionRef, withDepth]);
}
