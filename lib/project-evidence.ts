import type { WorkItem } from '@/components/work-items';

// Visually reviewed against the saved captures on 2026-09-03, not inferred from filenames.
// Several filenames describe a different page from the interface actually shown.
export const verifiedDescriptions: Record<string, string> = {
  '/pixa_pics/pawsonroute/pawsonroute-homepage.jpg': 'Paws On Route homepage with dog-grooming introduction, puppy photograph and pet-care information',
  '/pixa_pics/pawsonroute/pawsonroute-services.png': 'Paws On Route service cards for dog grooming, pet and house sitting, and doggy daycare',
  '/pixa_pics/teamcolours/Screenshot 2026-01-10 145124.png': 'Team Colours men’s rugby product category with four coloured shirts and catalogue sorting',
  '/pixa_pics/teamcolours/Screenshot 2026-01-10 145155.png': 'Team Colours contact page with business contact options and a South Africa location map',
  '/pixa_pics/teamcolours/Screenshot 2026-01-10 145224.png': 'Team Colours about page with company introduction and monochrome product photography',
  '/pixa_pics/vicbay/vicbay-homepage.jpg': 'VicBay apparel homepage featuring a premium T-shirt campaign and product navigation',
  '/pixa_pics/vicbay/vicbay-shop.png': 'VicBay all-products catalogue with category filters and clothing product cards',
  '/pixa_pics/vicbay/vicbay-catalogue.jpg': 'VicBay clothing-range landing page with apparel photography and catalogue introduction',
  '/pixa_pics/vicbay/vicbay-about.jpg': 'VicBay South African apparel brand introduction with clothing and bag photographs',
  '/pixa_pics/vicbay/vicbay-contact.png': 'VicBay contact landing page directing customers to the appropriate team',
  '/pixa_pics/illumi/illumi-homepage.png': 'Illumi invoicing homepage with an example invoice and create-invoice action',
  '/pixa_pics/illumi/illumi-pricing.png': 'Illumi pricing page comparing free and paid invoicing plans',
  '/pixa_pics/illumi/illumi-features-invoicing.png': 'Illumi email-invoicing feature page with an itemised invoice preview',
  '/pixa_pics/illumi/illumi-features-expenses.png': 'Illumi expense-tracking feature page with monthly bars and expense categories',
  '/pixa_pics/illumi/illumi-features-clients.png': 'Illumi client-management feature page introducing a shared client workspace',
  '/pixa_pics/illumi/illumi-features-vault.png': 'Illumi document-vault feature page showing an organised document and invoice workspace',
  '/pixa_pics/physiope/physiope-homepage.jpg': 'Cecile van der Merwe Physiotherapy homepage with rehabilitation photograph and appointment action',
  '/pixa_pics/physiope/physiope-services.jpg': 'Physiotherapy techniques page with exercise-ball photograph and treatment-technique information',
  '/pixa_pics/physiope/physiope-treatment.jpg': 'Physiotherapy treatments page introducing sports injury treatment and rehabilitation',
  '/pixa_pics/physiope/physiope-contact.jpg': 'Physiotherapy contact page with practice photograph, location map and enquiry form',
  '/slipatip/cover.jpg': 'Slip a Tip homepage introducing digital tipping with a demonstration tip amount selector',
  '/slipatip/Screenshot 2026-02-18 114955.png': 'Slip a Tip pricing section with fee breakdown, included features and account-creation action',
  '/slipatip/Screenshot 2026-02-18 115018.png': 'Slip a Tip sign-in form with phone-number and password fields',
  '/slipatip/Screenshot 2026-02-18 115037.png': 'Slip a Tip withdrawal dashboard with a new-withdrawal form and history area',
  '/slipatip/Screenshot 2026-02-18 115044.png': 'Slip a Tip personal QR-code page with download and copy-link controls',
  '/work/spotlight.jpg': 'Spotlight discovery interface with a Garden Route map, location markers and category navigation',
  '/pixa_pics/nexai/Screenshot 2026-01-10 150029.png': 'NexAI frequently asked questions section with expandable implementation and integration questions',
  '/pixa_pics/nexai/Screenshot 2026-01-10 150043.png': 'NexAI process section outlining onboarding, project setup and weekly consultations',
  '/pixa_pics/nexai/Screenshot 2026-01-10 150051.jpg': 'NexAI use-case cards illustrated with film production, laptop work and restaurant imagery',
  '/pixa_pics/ai/Screenshot 2026-01-10 145507.png': 'AI integration-testing concept page with introductory copy and industrial robot photograph',
  '/pixa_pics/haval/landing page.png': 'Automotive project preview featuring a Haval H6 GT, model specifications and enquiry actions',
  '/pixa_pics/haval/Screenshot 2026-02-03 152459.jpg': 'Haval vehicle showcase with a featured off-road vehicle and image thumbnails',
  '/pixa_pics/haval/Screenshot 2026-02-03 152516.png': 'Haval vehicle-detail section with interior craftsmanship and exterior photographs',
  '/pixa_pics/haval/Screenshot 2026-02-03 152520.png': 'Haval technical specification table and safety-feature section beside vehicle-detail photographs',
  '/pixa_pics/haval/Screenshot 2026-02-03 152529.png': 'Haval variant selector with an indicative price, specifications and feature badges',
  '/pixa_pics/haval/Screenshot 2026-02-03 152539.jpg': 'Automotive new-vehicles page introducing a GWM and Haval vehicle range',
  '/pixa_pics/nordflam/nordflam-fireplace-cover.png': 'NORDflam homepage with a dark fireplace setting and product-discovery actions',
  '/pixa_pics/nordflam/nordflam-products-page.png': 'NORDflam fireplace presentation with a living-room photograph and product information link',
  '/pixa_pics/nordflam/nordflam-product-categories.png': 'NORDflam product catalogue with fireplace photographs, model names and prices',
  '/pixa_pics/nordflam/nordflam-technology-page.png': 'NORDflam Arica fireplace product detail with price, specifications and dealer action',
  '/pixa_pics/nordflam/nordflam-retailers-page.png': 'NORDflam responsible-design section with forest imagery and environmental design copy',
  '/pixa_pics/buildvolume/buildvolume-3d-printing-cover.png': 'BuildVolume homepage with a 3D printer photograph and shop and contact actions',
  '/pixa_pics/buildvolume/buildvolume-homepage.png': 'BuildVolume company introduction beside a close-up of a 3D printer making an object',
  '/pixa_pics/buildvolume/buildvolume-shop-page.png': 'BuildVolume 3D-printer catalogue with brand navigation and Ultimaker product cards',
  '/pixa_pics/buildvolume/buildvolume-product-detail.png': 'BuildVolume Formlabs product grid with printer photographs, model names and rand prices',
  '/pixa_pics/buildvolume/buildvolume-about-page.png': 'BuildVolume customer-support section with contact options, training and quick-start resources',
  '/pixa_pics/covercrete/covercrete-homepage.jpg': 'Covercrete homepage with a concrete-finish wall, planter and site navigation',
  '/pixa_pics/covercrete/covercrete-colours.jpg': 'Covercrete colour-selection grid with named concrete-finish swatches',
  '/pixa_pics/covercrete/covercrete-gallery.jpg': 'Covercrete project gallery comparing floor and stair finishes before and after treatment',
  '/pixa_pics/covercrete/covercrete-about.png': 'Covercrete about section with service information and expandable product topics',
  '/pixa_pics/covercrete/covercrete-contact.png': 'Covercrete enquiry form requesting a name, contact number, email and project message',
  '/pixa_pics/featherbleu/featherbleu-homepage.jpg': 'Featherbleu security and automation homepage with team photograph and quote and service actions',
  '/pixa_pics/featherbleu/featherbleu-services.png': 'Featherbleu service cards for smart-home automation, garage doors and gate automation',
  '/pixa_pics/featherbleu/featherbleu-cctv.jpg': 'Featherbleu installation gallery showing a garage-door motor with project-image thumbnails',
  '/pixa_pics/featherbleu/featherbleu-gate-automation.png': 'Featherbleu company-story section beside a modern building-interior photograph',
  '/pixa_pics/featherbleu/featherbleu-contact.png': 'Featherbleu advice article grid with topic filters and security and automation guides',
  '/pixa_pics/featherbleu/featherbleu-cover.png': 'Featherbleu alternate homepage design with security-camera imagery and quote and service actions',
  '/pixa_pics/trakcare/trakcare-homepage.png': 'TrakCare barcode-scanner start screen with install-app prompt, scan and history tabs',
  '/pixa_pics/trakcare/trakcare-scanner.png': 'TrakCare scanner workspace with a tap-to-scan camera area and privacy section',
  '/pixa_pics/kikay/kikay-homepage.jpg': 'Kikay Pharma Consultants homepage introducing regulatory affairs and an expert-contact action',
  '/pixa_pics/kikay/kikay-about.jpg': 'Kikay Pharma company introduction with regulatory-compliance imagery and values link',
  '/pixa_pics/kikay/kikay-what-we-do.jpg': 'Kikay Pharma regulatory-affairs landing section above the company introduction',
  '/pixa_pics/kikay/kikay-contact.png': 'Kikay Pharma enquiry section with contact form and expert-contact information',
};

export function projectMediaDescription(item: Pick<WorkItem, 'name' | 'category'>, image: string) {
  if (verifiedDescriptions[image]) return verifiedDescriptions[image];
  const roles: Record<string, string> = { Business: 'business website', Ecommerce: 'product catalogue website', 'Web App': 'web application', Healthcare: 'healthcare website or application', Automotive: 'automotive website', 'AI & Backend': 'software project' };
  return `${item.name}: archived ${roles[item.category || 'Business'] || 'website'} interface capture`;
}

export function projectService(item: Pick<WorkItem, 'category'>) {
  return item.category === 'Ecommerce' ? 'ecommerce-websites' : item.category === 'Web App' || item.category === 'AI & Backend' ? 'web-app-development' : 'website-design';
}

export function projectVersion(item: Pick<WorkItem, 'slug' | 'url'>) {
  if (item.url?.includes('.vercel.app') || item.url?.includes('havaldemo.co.za')) return 'Public project preview';
  return item.url ? 'Archived work with a public website link' : 'Archived interface study; no public demo linked';
}
