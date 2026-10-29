import { projectCaptureSets } from '@/lib/project-captures';

// Change individual entries only when that page's substantive content changes.
// Unknown legacy modification dates are omitted, not replaced with build time.
const pageDates: Record<string, string> = {
  '/': '2026-10-29', '/services': '2026-09-14', '/ai-website-app-rescue': '2026-09-14', '/about': '2026-09-03', '/blog': '2026-09-03',
  '/contact': '2026-10-23', '/privacy': '2026-10-23', '/website-cost': '2026-10-26',
  '/locations/george': '2026-10-26', '/locations/garden-route': '2026-10-26',
  '/services/website-design': '2026-10-23', '/services/ecommerce-websites': '2026-10-23',
  '/services/seo': '2026-09-04', '/services/web-app-development': '2026-09-14', '/services/website-care': '2026-09-14',
  '/locations/western-cape': '2026-09-03', '/locations/gauteng': '2026-09-03', '/locations/kwazulu-natal': '2026-09-03',
  '/locations/eastern-cape': '2026-09-03', '/locations/free-state': '2026-09-03', '/locations/limpopo': '2026-09-03',
  '/locations/mpumalanga': '2026-09-03', '/locations/north-west': '2026-09-03', '/locations/northern-cape': '2026-09-03',
  '/work/paws-on-route': '2026-09-03', '/work/team-colours': '2026-09-03', '/work/vicbay': '2026-09-03',
  '/work/illumi': '2026-09-03', '/work/physiotherapy': '2026-09-03', '/work/slip-a-tip': '2026-09-03',
  '/work/spotlight': '2026-09-03', '/work/nexai': '2026-09-03', '/work/ai-testing': '2026-09-03', '/work/haval': '2026-09-03',
  '/work/emberwell': '2026-10-14', '/work/layerforge': '2026-10-14', '/work/mineralis': '2026-10-14',
  '/work/featherbleu': '2026-09-03', '/work/trakcare-barcode-scanner': '2026-09-03', '/work/kikay-pharma': '2026-09-03',
};
export function contentModified(path: string) {
  if (path === '/projects') return '2026-10-28';
  const capture = path.startsWith('/work/') ? projectCaptureSets[path.slice('/work/'.length)] : undefined;
  return capture?.capturedAt ?? pageDates[path || '/'];
}
