export type Service = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  promise: string;
  outcomes: string[];
  inclusions: string[];
  suitedFor: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'website-design',
    name: 'Website Design & Development',
    shortName: 'Website design',
    eyebrow: 'Make the right first impression',
    description:
      'Strategic, mobile-first websites for South African businesses that need to look credible, explain their value clearly and turn visits into calls, messages and qualified enquiries.',
    promise: 'A distinctive business website that is fast, easy to use and built around the next action you want a customer to take.',
    outcomes: ['A sharper market position', 'More qualified enquiries', 'A faster mobile experience', 'A platform your team can grow'],
    inclusions: ['Discovery and conversion strategy', 'Custom responsive design', 'Copy structure and content guidance', 'Next.js or WordPress development', 'On-page SEO foundations', 'Analytics and conversion setup', 'Launch support and team handover'],
    suitedFor: ['Professional services', 'Tourism and hospitality', 'Construction and trades', 'Healthcare practices', 'B2B and industrial companies', 'Local and multi-location businesses'],
    process: [
      { title: 'Discover', description: 'We clarify the audience, offer, proof and commercial goal before pixels or code.' },
      { title: 'Structure', description: 'We map the customer journey, page hierarchy, messaging and high-intent actions.' },
      { title: 'Design', description: 'You see a custom visual direction shaped around your brand and market.' },
      { title: 'Build', description: 'We develop, optimise, test and launch a responsive production website.' },
    ],
    faqs: [
      { question: 'How long does a business website take?', answer: 'Most focused business websites take four to eight weeks. Larger content, ecommerce or integration requirements may extend the timeline.' },
      { question: 'Can you redesign an existing website?', answer: 'Yes. We audit what is worth preserving, protect valuable URLs, plan redirects and rebuild the experience without throwing away useful search equity.' },
      { question: 'Do you work outside George?', answer: 'Yes. Pixaloom is based in George and works remotely with businesses across every South African province.' },
    ],
  },
  {
    slug: 'ecommerce-websites',
    name: 'Ecommerce Website Development',
    shortName: 'Ecommerce',
    eyebrow: 'Turn product interest into revenue',
    description:
      'High-performance online stores designed for South African buying behaviour, mobile checkout and the operational reality of payments, shipping, inventory and product content.',
    promise: 'An ecommerce store that makes products easy to find, simple to buy and manageable behind the scenes.',
    outcomes: ['Fewer checkout obstacles', 'Better product discovery', 'A trustworthy mobile store', 'A scalable catalogue structure'],
    inclusions: ['Store and catalogue strategy', 'Custom storefront design', 'WooCommerce or headless commerce', 'PayFast, Peach Payments or Stripe integration', 'Shipping and fulfilment configuration', 'Product and category SEO', 'Analytics and purchase tracking'],
    suitedFor: ['Retail brands', 'Manufacturers and distributors', 'Specialist catalogues', 'Subscription products', 'Tourism products', 'Direct-to-consumer businesses'],
    process: [
      { title: 'Model', description: 'We map products, variants, margins, fulfilment and the buying journey.' },
      { title: 'Merchandise', description: 'We build the category, filter and product structure around how customers shop.' },
      { title: 'Integrate', description: 'Payments, delivery, notifications and operational workflows are connected and tested.' },
      { title: 'Optimise', description: 'We validate mobile checkout, analytics, search visibility and launch readiness.' },
    ],
    faqs: [
      { question: 'Which ecommerce platform do you use?', answer: 'The right platform depends on catalogue size, internal workflows and growth plans. We commonly use WooCommerce or a custom/headless stack when the requirements justify it.' },
      { question: 'Can you integrate South African payments?', answer: 'Yes. We can integrate common South African and international gateways, subject to provider approval and your merchant account.' },
      { question: 'Will the store be optimised for Google?', answer: 'Yes. We plan crawlable categories, product metadata, structured data, canonical rules and performance from the start.' },
    ],
  },
  {
    slug: 'seo',
    name: 'SEO & Content Systems',
    shortName: 'SEO',
    eyebrow: 'Build durable, compounding visibility',
    description:
      'Technical SEO, information architecture and useful content systems that help the right South African customers discover your business without shortcuts that put your domain at risk.',
    promise: 'A measurable search programme built on technical health, genuine relevance and content that earns attention.',
    outcomes: ['Cleaner crawl and indexation', 'Stronger commercial relevance', 'More non-branded visibility', 'Clear measurement and priorities'],
    inclusions: ['Technical SEO audit', 'Keyword and intent research', 'Information architecture', 'On-page optimisation', 'Local and regional search strategy', 'Schema and sitemap implementation', 'Search Console and analytics setup', 'Content roadmap and reporting'],
    suitedFor: ['Businesses rebuilding a website', 'Companies expanding to new markets', 'Local service providers', 'Ecommerce catalogues', 'B2B companies', 'Content-led brands'],
    process: [
      { title: 'Measure', description: 'We establish the baseline across rankings, crawl health, pages and conversions.' },
      { title: 'Prioritise', description: 'We rank opportunities by commercial intent, effort and realistic authority.' },
      { title: 'Improve', description: 'Technical fixes, page improvements and new content ship in an accountable sequence.' },
      { title: 'Learn', description: 'Search Console and conversion data inform the next iteration.' },
    ],
    faqs: [
      { question: 'Can you guarantee number one rankings?', answer: 'No credible SEO provider can guarantee a ranking that Google controls. We can guarantee disciplined implementation, transparent measurement and a strategy designed to improve qualified visibility over time.' },
      { question: 'How long does SEO take?', answer: 'Technical improvements can be recognised quickly, while competitive commercial rankings usually require sustained work over several months.' },
      { question: 'Do you create a page for every town?', answer: 'Only where a page can be genuinely useful and distinct. Near-duplicate city pages can be treated as doorway abuse, so national coverage is supported by strong regional hubs and substantive market content.' },
    ],
  },
  {
    slug: 'web-app-development',
    name: 'Custom Web App Development',
    shortName: 'Web applications',
    eyebrow: 'Turn a manual process into a useful product',
    description:
      'Custom portals, dashboards, internal tools and software products built for real workflows—not impressive demos that become expensive to maintain.',
    promise: 'A focused digital product that solves the highest-value workflow first and has room to grow.',
    outcomes: ['Less repetitive admin', 'One reliable source of truth', 'Better customer self-service', 'A foundation for product growth'],
    inclusions: ['Product discovery', 'UX and interface design', 'Next.js and React development', 'Authentication and permissions', 'Database and API integration', 'Payments and transactional email', 'Testing, deployment and monitoring'],
    suitedFor: ['Customer portals', 'Operations dashboards', 'Booking systems', 'Education platforms', 'Workflow automation', 'New software products'],
    process: [
      { title: 'Define', description: 'We identify the user, painful workflow and smallest valuable release.' },
      { title: 'Prototype', description: 'The key journeys are validated before the build expands.' },
      { title: 'Engineer', description: 'We deliver the product in testable milestones with sensible architecture.' },
      { title: 'Evolve', description: 'Real usage data shapes the roadmap after launch.' },
    ],
    faqs: [
      { question: 'Can you build an MVP?', answer: 'Yes. We prefer a tightly scoped first release that proves value before funding every possible feature.' },
      { question: 'Do you handle hosting and deployment?', answer: 'Yes. We can configure production hosting, domains, environments and monitoring appropriate to the stack.' },
      { question: 'Can you integrate existing systems?', answer: 'Usually. We review the available APIs, data quality, security model and operational constraints during discovery.' },
    ],
  },
  {
    slug: 'website-care',
    name: 'Website Care & Optimisation',
    shortName: 'Website care',
    eyebrow: 'Keep the site working after launch',
    description:
      'Ongoing updates, performance checks, security maintenance and conversion improvements for businesses that need a dependable web partner.',
    promise: 'A maintained website with clear ownership, fewer surprises and regular improvement.',
    outcomes: ['Reduced technical risk', 'Faster issue resolution', 'Fresh accurate content', 'Continuous performance gains'],
    inclusions: ['Dependency and plugin updates', 'Uptime and form checks', 'Backups and recovery support', 'Performance monitoring', 'Content updates', 'Search health checks', 'Monthly improvement recommendations'],
    suitedFor: ['Existing Pixaloom clients', 'WordPress businesses', 'Next.js websites', 'Small internal marketing teams', 'High-value lead generation sites', 'Ecommerce stores'],
    process: [
      { title: 'Baseline', description: 'We document ownership, access, risk, dependencies and current performance.' },
      { title: 'Stabilise', description: 'Critical security, reliability and tracking issues are addressed first.' },
      { title: 'Maintain', description: 'A recurring checklist keeps the site healthy and current.' },
      { title: 'Improve', description: 'Conversion and search opportunities feed a practical monthly backlog.' },
    ],
    faqs: [
      { question: 'Can you maintain a site you did not build?', answer: 'Often, yes. We start with a paid technical assessment so both sides understand the condition and risk.' },
      { question: 'Are hosting fees included?', answer: 'Hosting and third-party software are usually billed separately so ownership and costs stay transparent.' },
      { question: 'What counts as an update?', answer: 'Routine content and configuration changes can fit a care plan; larger design, development or integration work is scoped separately.' },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
