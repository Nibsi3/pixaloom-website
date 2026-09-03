export type WorkItem = {
  slug: string;
  name: string;
  png: string;
  fallback: string;
  meta: string;
  scope: string;
  stack: string[];
  highlights: string[];
  gallery?: string[];
  facts?: { label: string; value: string }[];
  sections?: { title: string; description?: string; bullets?: string[] }[];
  category?: 'Web App' | 'Ecommerce' | 'Business' | 'News' | 'AI & Backend' | 'Healthcare' | 'Automotive';
  url?: string;
};

const allWorkItems: WorkItem[] = [
  {
    slug: 'paws-on-route',
    name: 'Paws On Route',
    category: 'Business',
    url: 'https://pawsonroute.co.za',
    png: '/work/pawsonroute.jpg',
    fallback: '/work/paws-on-route.svg',
    meta: 'WordPress · Local Services · SEO',
    scope:
      'A WordPress website for a George-based pet grooming and pet sitting business, built to drive bookings and enquiries with a clear service structure and strong trust signals.',
    highlights: [
      'Service pages structured for local search intent',
      'Fast contact flow (call/WhatsApp/contact form)',
      'Clean design for credibility and trust',
      'SEO-focused headings, content structure, and performance basics',
    ],
    stack: ['WordPress', 'SEO setup', 'Performance tuning', 'Lead/contact flows'],
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Pet grooming + pet sitting' },
      { label: 'Location', value: 'George, Western Cape' },
      { label: 'Goal', value: 'Bookings + enquiries' },
    ],
    sections: [
      {
        title: 'What was delivered',
        bullets: [
          'Service-first site structure for clarity and local SEO',
          'Trust-building layout with clear calls-to-action',
          'Fast contact flow for mobile users',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/pawsonroute/pawsonroute-homepage.jpg',
      '/pixa_pics/pawsonroute/pawsonroute-services.png',
    ],
  },
  {
    slug: 'team-colours',
    name: 'Team Colours',
    category: 'Ecommerce',
    png: '/work/teamcolours.jpg',
    fallback: '/work/team-colours.svg',
    meta: 'WordPress · Ecommerce · SEO',
    scope:
      'A George-based South African ecommerce website focused on product discovery, SEO, and conversion. Built to scale product catalog content while keeping the shopping experience simple.',
    highlights: [
      'Ecommerce-ready site structure with product/category hierarchy',
      'SEO-focused pages and metadata baseline',
      'Conversion-first layout and product presentation',
      'Performance improvements for faster browsing',
    ],
    stack: ['WordPress', 'WooCommerce', 'SEO', 'Performance optimization'],
    facts: [
      { label: 'Platform', value: 'WordPress + WooCommerce' },
      { label: 'Type', value: 'Ecommerce' },
      { label: 'Location', value: 'George, South Africa' },
      { label: 'Focus', value: 'SEO + conversion' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Product catalog structure designed for SEO and discoverability',
          'Conversion-focused product presentation and calls-to-action',
          'Performance tuning for a smoother shopping experience',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145124.png',
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145155.png',
      '/pixa_pics/teamcolours/Screenshot 2026-01-10 145224.png',
    ],
  },
  {
    slug: 'vicbay',
    name: 'VicBay',
    category: 'Ecommerce',
    url: 'https://vicbay.co.za',
    png: '/work/vicbay.jpg',
    fallback: '/work/vicbay.svg',
    meta: 'WordPress · Ecommerce · SEO',
    scope:
      'An ecommerce-focused WordPress build with SEO and conversion-oriented landing sections, designed to represent a strong brand presence and push enquiries/sales.',
    highlights: [
      'Brand-forward layout with clear calls-to-action',
      'SEO-friendly page structure and content flow',
      'Performance-focused tweaks for a smoother experience',
    ],
    stack: ['WordPress', 'WooCommerce', 'SEO setup', 'Performance tuning'],
    facts: [
      { label: 'Platform', value: 'WordPress + WooCommerce' },
      { label: 'Type', value: 'Ecommerce' },
      { label: 'Location', value: 'George, South Africa' },
      { label: 'Goal', value: 'Sales + enquiries' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Brand-forward layout designed for credibility and conversion',
          'SEO-ready structure to support local discovery',
          'Performance tuning and cleanup for better user experience',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/vicbay/vicbay-homepage.jpg',
      '/pixa_pics/vicbay/vicbay-shop.png',
      '/pixa_pics/vicbay/vicbay-catalogue.jpg',
      '/pixa_pics/vicbay/vicbay-about.jpg',
      '/pixa_pics/vicbay/vicbay-contact.png',
    ],
  },
  {
    slug: 'illumi',
    name: 'Illumi',
    category: 'Web App',
    url: 'https://illumi.co.za',
    png: '/work/illumi.png',
    fallback: '/work/illumi.svg',
    meta: 'Next.js · Invoicing · Finance Dashboard',
    scope:
      'Illumi is a web-based invoicing + lightweight finance dashboard for small businesses. It helps you create, send, track, and get paid for invoices, with a dashboard that summarizes revenue, outstanding amounts, and key activity.',
    highlights: [
      'Create invoices with customizable templates (Classic/Minimal/Modern)',
      'Light/Dark invoice mode with logo support',
      'Public invoice payment page with payment provider integration (PayFast, Stripe)',
      'Email sending via Resend API with standardized sender',
      'Recurring & scheduled invoices with automated cron processing',
      'Dashboard overview showing revenue, pending invoices, and customer/product counts',
      'Workspace-based data separation for multi-tenant support',
      'Safe email sending: invoices retain their previous status if email fails',
      'Marketing site with resources and calculators',
    ],
    stack: [
      'Next.js (App Router)',
      'TypeScript',
      'React',
      'TailwindCSS',
      'shadcn/ui components',
      'Supabase (Postgres + Auth)',
      'Resend (email)',
      'framer-motion',
      'Tabler Icons',
      'Lucide Icons',
    ],
    facts: [
      { label: 'Type', value: 'Invoicing + finance platform' },
      { label: 'Users', value: 'Small businesses' },
      { label: 'Core features', value: 'Invoicing · Payments · Dashboard' },
      { label: 'Hosting', value: 'Vercel + Supabase' },
    ],
    sections: [
      {
        title: 'Invoicing features',
        bullets: [
          'Template-based invoice creation with preview',
          'Line items, tax calculations, and custom notes',
          'Logo upload with background handling',
          'Public payment pages for customer payments',
          'Email delivery with failure handling',
        ],
      },
      {
        title: 'Automation & scheduling',
        bullets: [
          'Recurring invoices processed via cron endpoints',
          'Scheduled invoices with automated sending',
          'Cron endpoints secured with CRON_SECRET header',
        ],
      },
      {
        title: 'Dashboard & workspace',
        bullets: [
          'Revenue tracking and outstanding invoice summaries',
          'Customer and product management',
          'Charts and summary widgets for key metrics',
          'Workspace-based data isolation',
        ],
      },
      {
        title: 'Payment integration',
        bullets: [
          'Payment provider workflow (PayFast, Stripe)',
          'Public payment links via /pay/[id] route',
          'Payment status tracking',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/illumi/illumi-homepage.png',
      '/pixa_pics/illumi/illumi-pricing.png',
      '/pixa_pics/illumi/illumi-features-invoicing.png',
      '/pixa_pics/illumi/illumi-features-expenses.png',
      '/pixa_pics/illumi/illumi-features-clients.png',
      '/pixa_pics/illumi/illumi-features-vault.png',
      '/pixa_pics/illumi/illumi-free-invoice-templates.png',
      '/pixa_pics/illumi/illumi-story.png',
      '/pixa_pics/illumi/illumi-contact.png',
      '/pixa_pics/illumi/illumi-app-login.png',
    ],
  },
  {
    slug: 'physiotherapy',
    name: 'Physiotherapy',
    category: 'Healthcare',
    url: 'https://physiope.co.za',
    png: '/work/physiope.jpg',
    fallback: '/work/physiotherapy.svg',
    meta: 'WordPress · Healthcare · Contact Flow',
    scope:
      'A Port Elizabeth-based physiotherapy website combining services, company background, and a strong contact flow—built to help patients quickly understand offerings and reach out.',
    highlights: [
      'Clear services + about structure for trust and clarity',
      'Contact-first UX with prominent enquiry actions',
      'SEO-ready content structure for local discovery',
    ],
    stack: ['WordPress', 'SEO', 'Contact forms', 'Content/portfolio sections'],
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Physiotherapy' },
      { label: 'Location', value: 'Port Elizabeth' },
      { label: 'Goal', value: 'Contact + credibility' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Services and company profile for patient trust',
          'Contact flow designed for quick enquiries',
          'SEO-ready structure for local discovery',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/physiope/physiope-homepage.jpg',
      '/pixa_pics/physiope/physiope-services.jpg',
      '/pixa_pics/physiope/physiope-treatment.jpg',
      '/pixa_pics/physiope/physiope-contact.jpg',
    ],
  },
  {
    slug: 'slip-a-tip',
    name: 'Slip a Tip',
    category: 'Web App',
    png: '/slipatip/cover.jpg',
    fallback: '/slipatip/cover.jpg',
    meta: 'Node.js · Fintech · Digital Tipping',
    scope:
      'Slip a Tip is a South African digital tipping platform that enables customers to send cashless tips to informal workers such as car guards. The platform allocates funds to individual worker wallets and supports payouts via bank transfer (EFT, RTC, PayShap) or card-based withdrawals (virtual/physical debit card with ATM PIN). Built as an embedded finance fintech stack — not just a payment app — it includes a ledger-based wallet system, payment orchestration, card issuing integration, reconciliation engine, and a compliance-aware architecture designed for regulatory requirements in South Africa.',
    highlights: [
      'QR-based tipping flow for instant cashless tips to informal workers',
      'Ledger-based wallet system with double-entry bookkeeping and immutable transaction logs',
      'Payout via EFT, RTC, PayShap, or card-based withdrawal (virtual/physical debit card)',
      'Card issuing integration with PIN-enabled ATM withdrawal support',
      'FICA/KYC verification for workers and AML transaction monitoring',
      'Reconciliation engine with daily checks, mismatch alerts, and settlement reporting',
      'JWT authentication with RBAC, rate limiting, and OWASP Top 10 protections',
      'PCI-DSS compliance via payment partner — tokenised transactions only',
      'Safeguarded trust account architecture for stored value funds',
      'Event-driven webhook processing with idempotency keys for payment retries',
    ],
    stack: [
      'Node.js (TypeScript)',
      'React Native (iOS + Android)',
      'Next.js (Admin Dashboard)',
      'PostgreSQL',
      'Redis (session + rate limiting)',
      'BullMQ (async job queue)',
      'Direct Transact / PayShap / Stitch',
      'Kubernetes / serverless deployment',
    ],
    facts: [
      { label: 'Type', value: 'Digital tipping + embedded finance' },
      { label: 'Region', value: 'South Africa' },
      { label: 'Users', value: 'Customers · Workers · Admins' },
      { label: 'Payout', value: 'EFT · PayShap · Card · ATM' },
    ],
    sections: [
      {
        title: 'Wallet architecture',
        bullets: [
          'Internal stored value wallet with ledger-based balance tracking',
          'Double-entry system: debit platform clearing account, credit worker wallet on each tip',
          'Worker sees updated balance instantly after payment confirmation',
          'Actual funds safeguarded in trust account with infrastructure partner',
        ],
      },
      {
        title: 'Payments & payouts',
        bullets: [
          'Acceptance via card (Visa/Mastercard), PayShap, and instant EFT',
          'Bank transfer payout: EFT, RTC, PayShap',
          'Card-based withdrawal: virtual debit card, physical debit card, PIN-enabled ATM',
          'Card issuing handled by BaaS provider (Direct Transact or equivalent)',
        ],
      },
      {
        title: 'Security & compliance',
        bullets: [
          'VPC isolation, AES-256 encryption at rest, TLS 1.2+ for all APIs',
          'WAF, JWT auth, RBAC, rate limiting, input validation',
          'PCI-DSS handled by payments partner — no card details stored',
          'FICA/KYC verification, AML monitoring, suspicious activity reporting',
          'Webhook signature verification and idempotency keys',
        ],
      },
      {
        title: 'Settlement & reconciliation',
        bullets: [
          'Automated daily reconciliation checks across all wallets',
          'Mismatch alerts and settlement monitoring dashboards',
          'Immutable transaction logs for audit trail',
          'Admin dashboard for user management, KYC status, and reporting',
        ],
      },
    ],
    gallery: [
      '/slipatip/cover.jpg',
      '/slipatip/Screenshot 2026-02-18 114955.png',
      '/slipatip/Screenshot 2026-02-18 115018.png',
      '/slipatip/Screenshot 2026-02-18 115037.png',
      '/slipatip/Screenshot 2026-02-18 115044.png',
    ],
  },
  {
    slug: 'spotlight',
    name: 'Spotlight',
    url: 'https://www.spot-light.co.za/',
    category: 'Web App',
    png: '/work/spotlight.jpg',
    fallback: '/work/spotlight.svg',
    meta: 'Next.js · Maps · Admin · Analytics',
    scope:
      'A Garden Route business discovery platform with an interactive map experience, SEO blog system, admin dashboard, authentication, and analytics tracking.',
    highlights: [
      'Interactive map exploration with smooth animations',
      'SEO blog system with content workflows',
      'Admin panel with authentication and role-safe access',
      'Analytics and automated reporting foundation',
    ],
    stack: [
      'Next.js',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Supabase (Postgres)',
      'NextAuth.js',
      'Mapbox GL JS',
      'Resend',
    ],
    facts: [
      { label: 'Type', value: 'Interactive map + admin platform' },
      { label: 'Region', value: 'Garden Route' },
      { label: 'Core features', value: 'Maps · Blog · Analytics' },
      { label: 'Audience', value: 'Users + admins' },
    ],
    sections: [
      {
        title: 'Key capabilities',
        bullets: [
          'Map-first discovery flow with smooth UI',
          'Admin panel with authentication and protected routes',
          'Analytics tracking for interactions and reporting foundation',
          'SEO-friendly blog system for content growth',
        ],
      },
    ],
  },
  {
    slug: 'nexai',
    name: 'NexAI',
    category: 'AI & Backend',
    png: '/work/nexai.png',
    fallback: '/work/nexai.svg',
    meta: 'AI · Backend · Integrations',
    scope:
      'An AI calling product for a US-based client, focused on reliable backend integrations, clean data flow and a stable foundation for scaling call volume.',
    highlights: [
      'API integrations and backend endpoints for product workflows',
      'Structured logging + error handling to keep production stable',
      'Foundational security and validation around inbound requests',
      'Performance-minded approach to keep response times fast',
    ],
    stack: ['Backend services', 'API integrations', 'TypeScript/Node.js', 'Database + queue-ready architecture'],
    facts: [
      { label: 'Type', value: 'AI product (backend + integrations)' },
      { label: 'Focus', value: 'Reliability + scaling' },
      { label: 'Work', value: 'Backend services + API integrations' },
    ],
    sections: [
      {
        title: 'What I focused on',
        bullets: [
          'Stable integration layer with clear input validation',
          'Production-minded error handling and logging foundations',
          'Architecture that can scale as volume increases',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/nexai/Screenshot 2026-01-10 150029.png',
      '/pixa_pics/nexai/Screenshot 2026-01-10 150043.png',
      '/pixa_pics/nexai/Screenshot 2026-01-10 150051.jpg',
    ],
  },
  {
    slug: 'ai-testing',
    name: 'AI Testing',
    category: 'AI & Backend',
    png: '/work/ai.png',
    fallback: '/work/ai-testing.svg',
    meta: 'Robotics · QA · Platforms',
    scope:
      'A European robotics QA platform for managing AI test runs, results and review workflows, with an emphasis on repeatable testing and clear reporting.',
    highlights: [
      'Dashboard-style UI for test results and trend tracking',
      'Backend endpoints for storing and querying test runs',
      'Role-based admin access for operational workflows',
      'Exportable reporting foundations for stakeholders',
    ],
    stack: ['Web app', 'API routes', 'Database-backed storage', 'Auth-ready admin tooling'],
    facts: [
      { label: 'Type', value: 'Operations platform + reporting' },
      { label: 'Focus', value: 'Repeatable testing workflows' },
      { label: 'Users', value: 'Operations teams + admins' },
    ],
    sections: [
      {
        title: 'Platform goals',
        bullets: [
          'Centralize test runs and results in one place',
          'Make trends and regressions visible to the team',
          'Keep review and reporting workflows simple and repeatable',
        ],
      },
    ],
    gallery: ['/pixa_pics/ai/Screenshot 2026-01-10 145507.png'],
  },
  {
    slug: 'haval',
    name: 'Haval South Africa',
    url: 'https://thorp.havaldemo.co.za/',
    category: 'Automotive',
    png: '/work/haval.png',
    fallback: '/work/haval.svg',
    meta: 'Automotive · Dealership · Lead Generation',
    scope:
      'A high-impact digital presence for Haval, the Chinese automotive giant making waves in South Africa. The project focused on showcasing their SUV lineup with bold visuals, seamless lead capture, and a user experience that converts browsers into test-drive bookings.',
    highlights: [
      'Vehicle showcase with immersive hero sections and model breakdowns',
      'Lead generation forms integrated throughout the buyer journey',
      'Mobile-first design for on-the-go car shoppers',
      'Dealer locator with regional filtering',
      'Finance calculator and enquiry flow for serious buyers',
      'SEO-optimized model pages for organic discovery',
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Headless CMS', 'Lead capture integrations'],
    facts: [
      { label: 'Industry', value: 'Automotive' },
      { label: 'Brand', value: 'Haval South Africa' },
      { label: 'Goal', value: 'Test drives + enquiries' },
      { label: 'Focus', value: 'Conversion + brand presence' },
    ],
    sections: [
      {
        title: 'Vehicle showcase',
        bullets: [
          'Hero sections with bold imagery and key specs',
          'Model comparison tools for informed decisions',
          'Gallery views with interior/exterior shots',
        ],
      },
      {
        title: 'Lead generation',
        bullets: [
          'Test drive booking forms with dealer routing',
          'Finance enquiry flow with pre-qualification',
          'Newsletter and launch notification signups',
        ],
      },
      {
        title: 'Dealer experience',
        bullets: [
          'Dealer locator with map integration',
          'Regional stock availability indicators',
          'Direct dealer contact options',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/haval/landing page.png',
      '/pixa_pics/haval/Screenshot 2026-02-03 152459.jpg',
      '/pixa_pics/haval/Screenshot 2026-02-03 152516.png',
      '/pixa_pics/haval/Screenshot 2026-02-03 152520.png',
      '/pixa_pics/haval/Screenshot 2026-02-03 152529.png',
      '/pixa_pics/haval/Screenshot 2026-02-03 152539.jpg',
      '/pixa_pics/haval/Screenshot 2026-02-03 152638.png',
    ],
  },
  {
    slug: 'nordflam',
    name: 'NORDflam SA',
    category: 'Ecommerce',
    url: 'https://nordflam.vercel.app',
    png: '/work/nordflam.png',
    fallback: '/work/nordflam.png',
    meta: 'Next.js · Ecommerce · Product Catalog',
    scope:
      'A premium product showcase and ecommerce website for NORDflam SA, the South African distributor of NORDflam fireplaces — a European brand with over two decades of leadership in sustainable heating technology. The site presents their full cast iron, steel, and wood-burning fireplace range with detailed product pages, pricing, and a dealer locator to connect customers with authorized retailers across Southern Africa.',
    highlights: [
      'Product catalog with categories: cast iron, steel, wood burning, and recuperation',
      'Individual product pages with specs, pricing, and imagery',
      'Dealer/retailer locator for authorized stockists',
      'Technology page showcasing ECODESIGN 2022 certification and engineering',
      'Sustainability section highlighting eco-friendly manufacturing',
      'Clean, brand-forward design with strong visual hierarchy',
      'SEO-optimized structure for product and brand discovery',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'Product catalog + ecommerce' },
      { label: 'Industry', value: 'Fireplaces & heating' },
      { label: 'Region', value: 'Southern Africa' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        title: 'Product experience',
        bullets: [
          'Category-based browsing across cast iron, steel, and wood-burning ranges',
          'Detailed product pages with specifications, kW output, and pricing in ZAR',
          'Clean product cards with quick-view information',
        ],
      },
      {
        title: 'Brand & trust',
        bullets: [
          'Technology page explaining combustion engineering and efficiency ratings',
          'Sustainability messaging with ECODESIGN 2022 certification',
          'Retailer network to build buyer confidence',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/nordflam/nordflam-fireplace-cover.png',
      '/pixa_pics/nordflam/nordflam-products-page.png',
      '/pixa_pics/nordflam/nordflam-product-categories.png',
      '/pixa_pics/nordflam/nordflam-technology-page.png',
      '/pixa_pics/nordflam/nordflam-retailers-page.png',
    ],
  },
  {
    slug: 'buildvolume',
    name: 'BuildVolume',
    category: 'Ecommerce',
    url: 'https://buildvolume.vercel.app',
    png: '/work/buildvolume.png',
    fallback: '/work/buildvolume.png',
    meta: 'Next.js · Ecommerce · 3D Printing',
    scope:
      'A full ecommerce website for BuildVolume, South Africa\'s official supplier of 3D printers, 3D scanners, consumables, and spares. The site serves as both a product discovery platform and an online shop, featuring brand landing pages for Ultimaker, Formlabs, Bambu Lab, and Creality, along with support resources, a training facility page, and a blog. BuildVolume operates from locations in Pretoria, Sandton, and Century City.',
    highlights: [
      'Full online shop with 100+ products across printers, scanners, consumables, and spares',
      'Brand-specific landing pages for Ultimaker, Formlabs, Bambu Lab, and Creality',
      'Individual product pages with detailed specs and pricing',
      'Order form for streamlined purchasing',
      'Support section with resources and book-in support',
      'Training facility page for customer education',
      'Blog for industry news and updates',
      'SEO-optimized product and category pages',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'Ecommerce + product catalog' },
      { label: 'Industry', value: '3D printing & scanning' },
      { label: 'Products', value: '100+ SKUs' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        title: 'Shop & products',
        bullets: [
          'Category-based navigation: printers, scanners, consumables, spares',
          'Product detail pages with images, specs, and pricing',
          'Brand landing pages with curated product selections',
          'Order form for direct purchasing',
        ],
      },
      {
        title: 'Support & education',
        bullets: [
          'Dedicated support section for troubleshooting and book-in',
          'Training facility page for hands-on customer education',
          'Blog with industry updates and how-to content',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/buildvolume/buildvolume-3d-printing-cover.png',
      '/pixa_pics/buildvolume/buildvolume-homepage.png',
      '/pixa_pics/buildvolume/buildvolume-shop-page.png',
      '/pixa_pics/buildvolume/buildvolume-product-detail.png',
      '/pixa_pics/buildvolume/buildvolume-about-page.png',
    ],
  },
  {
    slug: 'covercrete',
    name: 'Covercrete',
    category: 'Business',
    url: 'https://covercrete.co.za',
    png: '/work/covercrete.jpg',
    fallback: '/work/covercrete.jpg',
    meta: 'Next.js · Business · Lead Generation',
    scope:
      'A premium business website for Covercrete, a South African decorative concrete finishes company serving Gauteng, Cape Town, and KZN. The site showcases their seamless cementitious screed finishes with a strong visual gallery, 14+ colour options, application types, and a clear process flow — all designed to drive free quote requests and establish trust with homeowners and contractors.',
    highlights: [
      'Visual gallery showcasing real project transformations',
      '14+ colour options with dedicated colour browser page',
      'Application pages: floors, walls, bathrooms, outdoor, pools, countertops',
      'Step-by-step "How It Works" process flow',
      'Client testimonials for social proof',
      'Strong CTA flow driving free quote requests',
      'Pricing transparency page',
      'SEO-optimized for decorative concrete keywords in South Africa',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'Business website + lead gen' },
      { label: 'Industry', value: 'Decorative concrete finishes' },
      { label: 'Regions', value: 'Gauteng · Cape Town · KZN' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        title: 'Visual selling',
        bullets: [
          'Before/after gallery of real project transformations',
          'Colour browser with 14+ finish options',
          'Application-specific pages for targeted discovery',
        ],
      },
      {
        title: 'Lead generation',
        bullets: [
          'Free quote CTAs placed throughout the buyer journey',
          'Clear process flow to reduce friction',
          'Testimonials and social proof for conversion',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/covercrete/covercrete-homepage.jpg',
      '/pixa_pics/covercrete/covercrete-colours.jpg',
      '/pixa_pics/covercrete/covercrete-gallery.jpg',
      '/pixa_pics/covercrete/covercrete-about.png',
      '/pixa_pics/covercrete/covercrete-contact.png',
    ],
  },
  {
    slug: 'featherbleu',
    name: 'Featherbleu Industries',
    category: 'Business',
    url: 'https://featherbleu.co.za',
    png: '/work/featherbleu.jpg',
    fallback: '/work/featherbleu.jpg',
    meta: 'Next.js · Security · Smart Home',
    scope:
      'A professional business website for Featherbleu Industries, a Garden Route-based company specializing in smart security and home automation. The site covers their full service offering — gate automation, CCTV systems, access control, garage doors, and smart home automation — with service-specific pages, project showcases, and resource sections for installation guides, maintenance advice, and security tips.',
    highlights: [
      'Service pages for gate automation, CCTV, access control, garage doors, and smart home',
      'Project showcase demonstrating completed installations',
      'Resource hub: installation guides, maintenance advice, security tips, industry news',
      'Blog with security-focused content',
      'All 5-star review social proof',
      'Strong contact flow for enquiries and quotes',
      'SEO-optimized for Garden Route security keywords',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'Business website + lead gen' },
      { label: 'Industry', value: 'Security & home automation' },
      { label: 'Region', value: 'George to Knysna (Garden Route)' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        title: 'Service pages',
        bullets: [
          'Dedicated pages for each service vertical with clear CTAs',
          'Project showcase of completed installations',
          'Service comparison to help buyers choose',
        ],
      },
      {
        title: 'Resources & content',
        bullets: [
          'Installation guides and maintenance advice',
          'Security tips and industry news articles',
          'Blog system for ongoing content growth and SEO',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/featherbleu/featherbleu-homepage.jpg',
      '/pixa_pics/featherbleu/featherbleu-services.png',
      '/pixa_pics/featherbleu/featherbleu-cctv.jpg',
      '/pixa_pics/featherbleu/featherbleu-gate-automation.png',
      '/pixa_pics/featherbleu/featherbleu-contact.png',
      '/pixa_pics/featherbleu/featherbleu-cover.png',
    ],
  },
  {
    slug: 'george-herald',
    name: 'George Herald',
    category: 'News',
    url: 'https://www.georgeherald.com',
    png: '/work/georgeherald.png',
    fallback: '/work/georgeherald.png',
    meta: 'Next.js · News Platform · CMS',
    scope:
      'A full-featured digital news platform for the George Herald, the Garden Route\'s trusted local newspaper. The site delivers breaking news, sport, community stories, classifieds, photo galleries, and video content — with an admin CMS for article management, category/tag workflows, media uploads, and workspace-based content organization. Work in progress.',
    highlights: [
      'News homepage with hero stories, latest articles, and trending sections',
      'Category sections: news, sport, community, lifestyle, entertainment, opinion, schools',
      'Regional sub-sections: Mossel Bay, Knysna-Plett, Oudtshoorn, Graaff-Reinet',
      'Photo galleries and video content pages',
      'Classifieds section with subcategories (vacancies, services, etc.)',
      'Full admin CMS: article creation, categories, tags, media, and member management',
      'Search functionality across all content',
      'SEO-optimized article pages with structured metadata',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Cloudflare R2 (media storage)',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'News platform + CMS' },
      { label: 'Industry', value: 'Local news & media' },
      { label: 'Region', value: 'George & Garden Route' },
      { label: 'Status', value: 'Work in progress' },
    ],
    sections: [
      {
        title: 'Reader experience',
        bullets: [
          'Breaking news with hero stories and trending articles',
          'Category navigation across 10+ sections',
          'Photo galleries, video pages, and classified listings',
          'Full-text search across all published content',
        ],
      },
      {
        title: 'Admin CMS',
        bullets: [
          'Article creation and editing with rich content support',
          'Category and tag management workflows',
          'Media upload and management via Cloudflare R2',
          'Member and workspace management for multi-author support',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/georgeherald/george-herald-homepage.png',
      '/pixa_pics/georgeherald/george-herald-news.png',
      '/pixa_pics/georgeherald/george-herald-sport.png',
      '/pixa_pics/georgeherald/george-herald-article.png',
    ],
  },
  {
    slug: 'trakcare-barcode-scanner',
    name: 'TrakCare Barcode Scanner',
    category: 'Healthcare',
    url: 'https://trakcare-barcode-scanner.vercel.app',
    png: '/trakare/trakcareCover.png',
    fallback: '/trakare/trakcareCover.png',
    meta: 'Next.js · Healthcare · Utility',
    scope:
      'A purpose-built barcode scanning utility for doctors and healthcare workers using the NHLS TrakCare Lab system. My wife is a doctor and had issues with the lengthy login and patient search process in TrakCare — logging in, navigating to the patient search page, entering data, and searching for patient MRN numbers just to view results. Existing solutions were locked behind paywalls, so she asked me to build a free alternative. TrakCare Barcode Scanner lets medical staff scan a patient barcode, instantly copy credentials for quick login, and jump straight to patient results — saving significant time during rounds and consultations.',
    highlights: [
      'Barcode scanning via device camera for instant patient lookup',
      'TrakCare credential storage on-device for quick copy-paste login',
      'Direct deep-link to patient results in TrakCare Lab',
      'Zero paywall — free for all healthcare workers',
      'Built for speed: scan → login → results in seconds',
      'Mobile-first design for bedside and ward use',
      'Privacy-focused: all credentials stored locally on device only',
    ],
    stack: [
      'Next.js 16 (App Router)',
      'TypeScript',
      'React',
      'Tailwind CSS',
      'Turbopack',
      'Vercel',
    ],
    facts: [
      { label: 'Type', value: 'Healthcare utility app' },
      { label: 'Users', value: 'Doctors & healthcare workers' },
      { label: 'System', value: 'NHLS TrakCare Lab' },
      { label: 'Status', value: 'Live' },
    ],
    sections: [
      {
        title: 'Problem solved',
        bullets: [
          'Eliminated lengthy manual login and patient search workflow',
          'Replaced paid alternatives with a free, purpose-built tool',
          'Reduced patient lookup from minutes to seconds',
        ],
      },
      {
        title: 'How it works',
        bullets: [
          'Step 1: Save TrakCare credentials locally for quick access',
          'Step 2: Scan patient barcode with device camera',
          'Step 3: Auto-navigate to patient results in TrakCare Lab',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/trakcare/trakcare-homepage.png',
      '/pixa_pics/trakcare/trakcare-scanner.png',
    ],
  },
  {
    slug: 'kikay-pharma',
    name: 'Kikay Pharma Consultants',
    category: 'Business',
    url: 'https://kikay.co.za',
    png: '/work/kikay.jpg',
    fallback: '/work/kikay.svg',
    meta: 'WordPress · Corporate · Enquiries',
    scope:
      'An informational site for a pharmaceutical consultant, focused on explaining services clearly to the public and creating a smooth path to contact and enquiries.',
    highlights: [
      'Content structure for clarity and credibility',
      'Contact CTAs placed where users need them',
      'SEO foundation for visibility',
    ],
    stack: ['WordPress', 'SEO', 'Lead generation forms'],
    facts: [
      { label: 'Platform', value: 'WordPress' },
      { label: 'Industry', value: 'Pharmaceutical consulting' },
      { label: 'Goal', value: 'Education + enquiries' },
      { label: 'Focus', value: 'Clarity + trust' },
    ],
    sections: [
      {
        title: 'Project scope',
        bullets: [
          'Explain services clearly for a non-technical audience',
          'Build trust through structure and messaging',
          'Strong enquiry flow with easy contact actions',
        ],
      },
    ],
    gallery: [
      '/pixa_pics/kikay/kikay-homepage.jpg',
      '/pixa_pics/kikay/kikay-about.jpg',
      '/pixa_pics/kikay/kikay-what-we-do.jpg',
      '/pixa_pics/kikay/kikay-contact.png',
    ],
  },
];

// Keep paused case studies out of every public index, sitemap, and route.
const pausedWorkSlugs = new Set(['george-herald']);
export const workItems = allWorkItems.filter((item) => !pausedWorkSlugs.has(item.slug));
