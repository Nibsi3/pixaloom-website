'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Only mount on public pages; never send query strings or form values.
export function PlausibleAnalytics() {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const lastPath = useRef<string | null>(null);
  useEffect(() => {
    if (!ready || !pathname || lastPath.current === pathname) return;
    if (!['pixaloom.co.za', 'www.pixaloom.co.za'].includes(window.location.hostname)) return;
    const tracker = (window as Window & { plausible?: (event: string, options: { u: string }) => void }).plausible;
    if (!tracker) return;
    tracker('pageview', { u: window.location.origin + pathname });
    lastPath.current = pathname;
  }, [pathname, ready]);
  return <Script id="plausible-analytics" strategy="afterInteractive"
    src="https://immich.tail31199f.ts.net/analytics/script.manual.js"
    data-domain="pixaloom.co.za" data-api="https://immich.tail31199f.ts.net/analytics/event"
    onReady={() => setReady(true)} />;
}
