import { projectCaptureSets } from '@/lib/project-captures';

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
  concept?: boolean;
};

const allWorkItems: WorkItem[] = [
  {
    slug: 'gearshift',
    name: 'Gearshift',
    category: 'Web App',
    url: 'https://gearshift.co.za',
    png: '/portfolio/2026-10-19/gearshift-home.png',
    fallback: '/portfolio/2026-10-19/gearshift-home.png',
    meta: 'Vehicle ownership · Driver workspace · Dealership platform',
    scope: 'A connected vehicle platform bringing driver information, service planning and dealership workflows into one place. The public website introduces the product, while dedicated workspaces support drivers and dealership teams.',
    highlights: ['Vehicle profiles with mileage and service schedules', 'Driver workspace with service booking and vehicle information', 'Dealership workspace for customer and service workflows'],
    stack: ['TypeScript', 'Cloudflare Workers', 'Cloudflare D1'],
    facts: [{ label: 'Industry', value: 'Automotive' }, { label: 'Product', value: 'Vehicle ownership platform' }, { label: 'Website', value: 'gearshift.co.za' }],
    sections: [{ title: 'Connected ownership', description: 'A public product website and separate application workspaces for drivers and dealership teams. Dashboard screenshots show local demonstration accounts with synthetic data.' }],
  },
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
    "slug": "emberwell",
    "name": "Emberwell — Concept",
    "concept": true,
    "url": "https://emberwell-concept.cameronfalck03.workers.dev",
    "category": "Ecommerce",
    "png": "/concept/emberwell-cover.png",
    "fallback": "/concept/emberwell-cover.png",
    "meta": "Independent concept · Next.js · Responsive design",
    "scope": "Emberwell is a self-initiated, independent website concept for a fictional fireplaces & interiors brand. Pixaloom designed and built this study to explore responsive visual design, useful navigation and clear product or service discovery. It was not commissioned by a client and does not represent a live trading business. Content, product details and prices are illustrative; demo forms send nothing.",
    "highlights": [
      "Self-initiated design and implementation for a fictional brand",
      "Accessible, responsive navigation and page layouts",
      "Original website layouts and photography with fictional branding",
      "Product or finish discovery with sample interface content",
      "Local demo interactions with clear concept disclosures",
      "No client endorsements, testimonials or commercial-result claims"
    ],
    "stack": [
      "Next.js 16 (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS"
    ],
    "facts": [
      {
        "label": "Project",
        "value": "Independent concept design"
      },
      {
        "label": "Industry",
        "value": "Fireplaces & interiors"
      },
      {
        "label": "Commission",
        "value": "Self-initiated; no client"
      },
      {
        "label": "Status",
        "value": "Published concept demo"
      }
    ],
    "sections": [
      {
        "title": "Design exploration",
        "bullets": [
          "Preserved the distinctive visual direction while creating a fictional identity",
          "Responsive layouts with clear typography and keyboard access",
          "Browser screenshots of the implemented website and product catalogue"
        ]
      },
      {
        "title": "Honest demonstration",
        "bullets": [
          "Sample content illustrates an interface, not a commercial service",
          "Forms demonstrate local interactions and do not send enquiries",
          "No measured sales, certification or client-delivery outcomes claimed"
        ]
      }
    ],
    "gallery": [
      "/concept/emberwell-hero.png",
      "/concept/emberwell-detail.png",
      "/concept/emberwell-technical.png"
    ]
  },
  {
    "slug": "layerforge",
    "name": "Layerforge — Concept",
    "concept": true,
    "url": "https://layerforge-concept.cameronfalck03.workers.dev",
    "category": "Ecommerce",
    "png": "/concept/layerforge-cover.png",
    "fallback": "/concept/layerforge-cover.png",
    "meta": "Independent concept · Next.js · Responsive design",
    "scope": "Layerforge is a self-initiated, independent website concept for a fictional 3d printing & scanning brand. Pixaloom designed and built this study to explore responsive visual design, useful navigation and clear product or service discovery. It was not commissioned by a client and does not represent a live trading business. Content, product details and prices are illustrative; demo forms send nothing.",
    "highlights": [
      "Self-initiated design and implementation for a fictional brand",
      "Accessible, responsive navigation and page layouts",
      "Original website layouts and photography with fictional branding",
      "Product or finish discovery with sample interface content",
      "Local demo interactions with clear concept disclosures",
      "No client endorsements, testimonials or commercial-result claims"
    ],
    "stack": [
      "Next.js 16 (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS"
    ],
    "facts": [
      {
        "label": "Project",
        "value": "Independent concept design"
      },
      {
        "label": "Industry",
        "value": "3D printing & scanning"
      },
      {
        "label": "Commission",
        "value": "Self-initiated; no client"
      },
      {
        "label": "Status",
        "value": "Published concept demo"
      }
    ],
    "sections": [
      {
        "title": "Design exploration",
        "bullets": [
          "Preserved the distinctive visual direction while creating a fictional identity",
          "Responsive layouts with clear typography and keyboard access",
          "Browser screenshots of the implemented website and product catalogue"
        ]
      },
      {
        "title": "Honest demonstration",
        "bullets": [
          "Sample content illustrates an interface, not a commercial service",
          "Forms demonstrate local interactions and do not send enquiries",
          "No measured sales, certification or client-delivery outcomes claimed"
        ]
      }
    ],
    "gallery": [
      "/concept/layerforge-hero.png",
      "/concept/layerforge-detail.png",
      "/concept/layerforge-technical.png"
    ]
  },
  {
    "slug": "mineralis",
    "name": "Mineralis — Concept",
    "concept": true,
    "url": "https://mineralis-concept.cameronfalck03.workers.dev",
    "category": "Business",
    "png": "/concept/mineralis-cover.png",
    "fallback": "/concept/mineralis-cover.png",
    "meta": "Independent concept · Next.js · Responsive design",
    "scope": "Mineralis is a self-initiated, independent website concept for a fictional decorative concrete finishes brand. Pixaloom designed and built this study to explore responsive visual design, useful navigation and clear product or service discovery. It was not commissioned by a client and does not represent a live trading business. Content, product details and prices are illustrative; demo forms send nothing.",
    "highlights": [
      "Self-initiated design and implementation for a fictional brand",
      "Accessible, responsive navigation and page layouts",
      "Original website layouts and photography with fictional branding",
      "Product or finish discovery with sample interface content",
      "Local demo interactions with clear concept disclosures",
      "No client endorsements, testimonials or commercial-result claims"
    ],
    "stack": [
      "Next.js 16 (App Router)",
      "TypeScript",
      "React",
      "Tailwind CSS"
    ],
    "facts": [
      {
        "label": "Project",
        "value": "Independent concept design"
      },
      {
        "label": "Industry",
        "value": "Decorative concrete finishes"
      },
      {
        "label": "Commission",
        "value": "Self-initiated; no client"
      },
      {
        "label": "Status",
        "value": "Published concept demo"
      }
    ],
    "sections": [
      {
        "title": "Design exploration",
        "bullets": [
          "Preserved the distinctive visual direction while creating a fictional identity",
          "Responsive layouts with clear typography and keyboard access",
          "Browser screenshots of the implemented website and product catalogue"
        ]
      },
      {
        "title": "Honest demonstration",
        "bullets": [
          "Sample content illustrates an interface, not a commercial service",
          "Forms demonstrate local interactions and do not send enquiries",
          "No measured sales, certification or client-delivery outcomes claimed"
        ]
      }
    ],
    "gallery": [
      "/concept/mineralis-hero.png",
      "/concept/mineralis-detail.png",
      "/concept/mineralis-technical.png"
    ]
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
export const workItems = allWorkItems.filter((item) => !pausedWorkSlugs.has(item.slug)).map((item) => {
  const captures = projectCaptureSets[item.slug];
  if (!captures) return item;
  const gallery = captures.images.map((image) => image.src);
  return { ...item, png: gallery[0], fallback: gallery[0], gallery };
});
