'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { isPublicSite, recordAction } from '@/lib/events';

const subscribe = () => () => {};
const serverSnapshot = () => false;

export function PlausibleAnalytics() {
  const pathname = usePathname();
  const production = useSyncExternalStore(subscribe, isPublicSite, serverSnapshot);
  const [ready, setReady] = useState(false);
  const countedPath = useRef<string | null>(null);
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!production || !pathname || countedPath.current === pathname) return;
    countedPath.current = pathname;
    recordAction('page_view', pathname);
  }, [pathname, production]);
  useEffect(() => {
    if (!production || !ready || !pathname || lastPath.current === pathname) return;
    const tracker = (window as Window & { plausible?: (event: string, options: { u: string }) => void }).plausible;
    if (!tracker) return;
    lastPath.current = pathname;
    try { tracker('pageview', { u: window.location.origin + pathname }); } catch { /* Analytics is optional. */ }
  }, [pathname, production, ready]);
  if (!production) return null;
  return <Script id="plausible-analytics" strategy="afterInteractive"
    src="https://immich.tail31199f.ts.net/analytics/script.manual.js"
    data-domain="pixaloom.co.za" data-api="https://immich.tail31199f.ts.net/analytics/event"
    onReady={() => setReady(true)} />;
}
