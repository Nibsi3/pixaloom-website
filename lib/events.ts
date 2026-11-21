export const conversionEvents = ['email_click', 'phone_click', 'whatsapp_click', 'enquiry_start', 'enquiry_submit', 'enquiry_accepted', 'enquiry_error', 'estimate_quote_click'] as const;
export type ConversionEvent = (typeof conversionEvents)[number];

const sections = ['home', 'website-cost', 'george', 'garden-route', 'services', 'locations', 'projects', 'work', 'blog', 'contact', 'ai-website-app-rescue', 'capabilities', 'about', 'custom-website-vs-website-builder'] as const;
type Section = (typeof sections)[number];

export function isPublicSite() {
  return typeof window !== 'undefined' && ['pixaloom.co.za', 'www.pixaloom.co.za'].includes(window.location.hostname);
}

export function isEventSection(value: unknown): value is Section {
  return sections.some(section => section === value);
}

function pageSection(path: string): Section | undefined {
  if (path === '/') return 'home';
  if (path === '/locations/george') return 'george';
  if (path === '/locations/garden-route') return 'garden-route';
  const section = path.split('/')[1];
  return isEventSection(section) ? section : undefined;
}

// Aggregate HTTP counts remain available while the owner's dashboard is offline.
// Only fixed section labels leave the page, never its URL or the enquiry fields.
export function recordAction(event: ConversionEvent | 'page_view', path: string) {
  if (!isPublicSite()) return;
  const section = pageSection(path);
  if (event === 'page_view' && !section) return;
  const body = JSON.stringify({ event, section });
  try {
    if (typeof fetch === 'function') {
      void fetch('/api/events', { method: 'POST', body, keepalive: true, credentials: 'omit', referrerPolicy: 'origin' }).catch(() => undefined);
    } else if (typeof navigator !== 'undefined') {
      navigator.sendBeacon?.('/api/events', body);
    }
  } catch { /* Recording a count must never delay a visitor action. */ }
}

export function trackEvent(event: ConversionEvent) {
  // Use the existing owner-hosted analytics destination. Acceptance means the
  // email provider accepted the message, not inbox delivery or a qualified lead.
  // Tracking must never prevent a contact action if a tracker is unavailable.
  if (!isPublicSite()) return;
  try {
    const tracker = (window as Window & { plausible?: (name: string, options: { u: string }) => void }).plausible;
    tracker?.(event, { u: window.location.origin + window.location.pathname });
  } catch { /* Contact actions work independently of analytics. */ }
  recordAction(event, window.location.pathname);
}
