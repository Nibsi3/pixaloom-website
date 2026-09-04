// Change individual entries only when that page's substantive content changes.
// Unknown legacy modification dates are omitted, not replaced with build time.
const pageDates: Record<string, string> = {
  '/': '2026-09-03', '/about': '2026-09-03', '/blog': '2026-09-03',
  '/contact': '2026-09-03', '/privacy': '2026-09-03', '/website-cost': '2026-09-03',
  '/locations/george': '2026-09-04', '/locations/garden-route': '2026-09-03',
  '/services/website-design': '2026-09-04', '/services/ecommerce-websites': '2026-09-03',
  '/services/seo': '2026-09-04', '/services/web-app-development': '2026-09-03', '/services/website-care': '2026-09-03',
  '/locations/western-cape': '2026-09-03', '/locations/gauteng': '2026-09-03', '/locations/kwazulu-natal': '2026-09-03',
  '/locations/eastern-cape': '2026-09-03', '/locations/free-state': '2026-09-03', '/locations/limpopo': '2026-09-03',
  '/locations/mpumalanga': '2026-09-03', '/locations/north-west': '2026-09-03', '/locations/northern-cape': '2026-09-03',
  '/work/paws-on-route': '2026-09-03', '/work/team-colours': '2026-09-03', '/work/vicbay': '2026-09-03',
  '/work/illumi': '2026-09-03', '/work/physiotherapy': '2026-09-03', '/work/slip-a-tip': '2026-09-03',
  '/work/spotlight': '2026-09-03', '/work/nexai': '2026-09-03', '/work/ai-testing': '2026-09-03', '/work/haval': '2026-09-03',
  '/work/nordflam': '2026-09-03', '/work/buildvolume': '2026-09-03', '/work/covercrete': '2026-09-03',
  '/work/featherbleu': '2026-09-03', '/work/trakcare-barcode-scanner': '2026-09-03', '/work/kikay-pharma': '2026-09-03',
};
export function contentModified(path: string) { return pageDates[path || '/']; }
