'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function MobileNavigation({ children }: { children: ReactNode }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;
    function dismissOutside(event: PointerEvent) {
      if (details && event.target instanceof Node && !details.contains(event.target)) details.open = false;
    }
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, []);

  return (
    <details
      ref={detailsRef}
      className="mobile-nav"
      onClick={event => {
        if (event.target instanceof Element && event.target.closest('a')) event.currentTarget.open = false;
      }}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}
      onKeyDown={event => {
        if (event.key !== 'Escape' || !event.currentTarget.open) return;
        event.preventDefault();
        event.currentTarget.open = false;
        event.currentTarget.querySelector('summary')?.focus();
      }}
    >
      {children}
    </details>
  );
}
