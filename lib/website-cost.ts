export const projectKinds = [
  {
    id: 'business',
    label: 'Business website',
    detail: 'A marketing site that explains the offer and turns visits into calls, WhatsApp messages or quotes.',
  },
  {
    id: 'ecommerce',
    label: 'Ecommerce store',
    detail: 'Product catalogue, checkout and South African payments, shipping and order handling.',
  },
  {
    id: 'application',
    label: 'Custom web app',
    detail: 'A portal, dashboard or workflow product with accounts, data and ongoing product work.',
  },
  {
    id: 'redesign',
    label: 'Redesign / rebuild',
    detail: 'Replace an existing site while keeping useful URLs, content and search equity where they still earn their place.',
  },
] as const;

export const projectScales = [
  {
    id: 'focused',
    label: 'Focused',
    detail: 'A clear offer, a handful of pages and one primary conversion path.',
  },
  {
    id: 'growing',
    label: 'Growing',
    detail: 'More sections, proof, locations or catalogue depth, with measurement from launch.',
  },
  {
    id: 'complex',
    label: 'Complex',
    detail: 'Multiple audiences, integrations or a product that has to keep evolving after launch.',
  },
] as const;

export const projectExtras = [
  { id: 'payments', label: 'Payments', hint: 'PayFast, Peach, Stripe or similar' },
  { id: 'booking', label: 'Bookings', hint: 'Enquiries, diaries or deposits' },
  { id: 'cms', label: 'Editable CMS', hint: 'Your team updates content' },
  { id: 'multilingual', label: 'More than one language', hint: 'English plus Afrikaans or more' },
  { id: 'integrations', label: 'Other systems', hint: 'CRM, stock, accounting, APIs' },
] as const;

export type ProjectKindId = (typeof projectKinds)[number]['id'];
export type ProjectScaleId = (typeof projectScales)[number]['id'];
export type ProjectExtraId = (typeof projectExtras)[number]['id'];

const baseRange: Record<ProjectKindId, Record<ProjectScaleId, readonly [number, number]>> = {
  business: {
    focused: [7500, 12500],
    growing: [15000, 25000],
    complex: [30000, 50000],
  },
  ecommerce: {
    focused: [15000, 25000],
    growing: [25000, 45000],
    complex: [45000, 80000],
  },
  application: {
    focused: [35000, 60000],
    growing: [60000, 120000],
    complex: [120000, 220000],
  },
  redesign: {
    focused: [6500, 11000],
    growing: [12500, 22500],
    complex: [25000, 45000],
  },
};

const extraRange: Record<ProjectExtraId, readonly [number, number]> = {
  payments: [2500, 5000],
  booking: [2500, 6500],
  cms: [2500, 5000],
  multilingual: [3500, 8000],
  integrations: [5000, 20000],
};

const timeline: Record<ProjectScaleId, string> = {
  focused: 'about four to eight weeks',
  growing: 'about eight to fourteen weeks',
  complex: 'about three to six months',
};

export type WebsiteCostEstimate = {
  min: number;
  max: number;
  timeline: string;
  summary: string;
};

export function estimateWebsiteCost(
  kind: ProjectKindId,
  scale: ProjectScaleId,
  extras: readonly ProjectExtraId[],
): WebsiteCostEstimate {
  const uniqueExtras = [...new Set(extras)].filter(extra => !(kind === 'ecommerce' && extra === 'payments'));
  let [min, max] = baseRange[kind][scale];
  for (const extra of uniqueExtras) {
    min += extraRange[extra][0];
    max += extraRange[extra][1];
  }

  const kindLabel = projectKinds.find((item) => item.id === kind)?.label.toLowerCase() ?? 'project';
  const extraNote = uniqueExtras.length
    ? ` Selected extras are included in the range, not added as surprise line items later.`
    : '';

  return {
    min,
    max,
    timeline: timeline[scale],
    summary: `Our indicative build range for a ${scale} ${kindLabel} is ${formatRandRange(min, max)}, with delivery ${timeline[scale]}.${extraNote} ${kind === 'ecommerce' ? 'One standard hosted payment integration is already included. ' : ''}This is a planning allowance, not a quote or a national market average.`,
  };
}

export function formatRand(value: number) {
  return `R${value.toLocaleString('en-ZA')}`;
}

export function formatRandRange(min: number, max: number) {
  return `${formatRand(min)}–${formatRand(max)}`;
}

export function estimateContactUrl(kind: ProjectKindId, scale: ProjectScaleId, extras: readonly ProjectExtraId[]) {
  return `/contact?${new URLSearchParams({ kind, scale, extras: [...new Set(extras)].filter(extra => !(kind === 'ecommerce' && extra === 'payments')).join(',') })}`;
}

export function estimateBriefFromParams(params: URLSearchParams) {
  const kind = projectKinds.find(item => item.id === params.get('kind'));
  const scale = projectScales.find(item => item.id === params.get('scale'));
  if (!kind || !scale) return '';
  const extras = projectExtras.filter(item => (params.get('extras') || '').split(',').includes(item.id) && !(kind.id === 'ecommerce' && item.id === 'payments'));
  const estimate = estimateWebsiteCost(kind.id, scale.id, extras.map(item => item.id));
  return `Website planning brief\nProject: ${kind.label}\nScale: ${scale.label}\nAdditional features: ${extras.map(item => item.label).join(', ') || 'None selected'}${kind.id === 'ecommerce' ? '\nStandard hosted payment integration included' : ''}\nIndicative build allowance: ${formatRandRange(estimate.min, estimate.max)} (excluding VAT where applicable and recurring third-party charges; not a quote)\n\nMy business and goals:\n`;
}
