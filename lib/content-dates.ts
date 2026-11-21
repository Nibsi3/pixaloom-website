import { projectCaptureSets } from '@/lib/project-captures';

// Change individual entries only when that page's substantive content changes.
// Unknown legacy modification dates are omitted, not replaced with build time.
const pageDates: Record<string, string> = {
  '/custom-website-vs-website-builder': '2026-10-30',
  '/capabilities': '2026-11-21',
  '/': '2026-11-21', '/services': '2026-10-30', '/ai-website-app-rescue': '2026-11-06', '/about': '2026-09-03', '/blog': '2026-11-06',
  '/contact': '2026-11-21', '/privacy': '2026-11-21', '/website-cost': '2026-11-21',
  '/locations': '2026-11-21', '/locations/george': '2026-11-21', '/locations/garden-route': '2026-11-21',
  '/services/website-design': '2026-11-21', '/services/ecommerce-websites': '2026-11-21',
  '/services/seo': '2026-11-21', '/services/web-app-development': '2026-11-21', '/services/website-care': '2026-11-21',
  '/locations/western-cape': '2026-11-21', '/locations/gauteng': '2026-11-21', '/locations/kwazulu-natal': '2026-11-21',
  '/locations/eastern-cape': '2026-11-21', '/locations/free-state': '2026-11-21', '/locations/limpopo': '2026-11-21',
  '/locations/mpumalanga': '2026-11-21', '/locations/north-west': '2026-11-21', '/locations/northern-cape': '2026-11-21',
  '/work/paws-on-route': '2026-11-19', '/work/team-colours': '2026-09-03', '/work/vicbay': '2026-09-03',
  '/work/illumi': '2026-09-03', '/work/physiotherapy': '2026-09-03', '/work/slip-a-tip': '2026-09-03',
  '/work/spotlight': '2026-09-03', '/work/nexai': '2026-09-03', '/work/ai-testing': '2026-09-03', '/work/haval': '2026-09-03',
  '/work/emberwell': '2026-10-14', '/work/layerforge': '2026-10-14', '/work/mineralis': '2026-10-14',
  '/work/featherbleu': '2026-09-03', '/work/trakcare-barcode-scanner': '2026-09-03', '/work/kikay-pharma': '2026-09-03',
};
export function contentModified(path: string) {
  if (path === '/projects') return '2026-10-28';
  const capture = path.startsWith('/work/') ? projectCaptureSets[path.slice('/work/'.length)] : undefined;
  const pageDate = pageDates[path || '/'];
  if (capture && (!pageDate || capture.capturedAt > pageDate)) return capture.capturedAt;
  return pageDate;
}
