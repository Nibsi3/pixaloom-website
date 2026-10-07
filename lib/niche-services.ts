export type BriefCheck = { id: string; label: string };
export type NicheService = {
  path: string;
  name: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  lead: string;
  parent: { name: string; path: string };
  action: { label: string; href: string };
  sections: { title: string; paragraphs: string[] }[];
  table: { caption: string; headings: [string, string, string]; rows: [string, string, string][] };
  proof: { slug: string; description: string }[];
  checks: BriefCheck[];
  scope: string;
  questions: [string, string][];
  sources: { label: string; href: string }[];
};

export const catalogueService: NicheService = {
  path: '/product-catalogue-websites',
  name: 'Technical product catalogue websites',
  title: 'Product Catalogue Websites for SA Suppliers',
  description: 'Technical product catalogue websites for South African suppliers. Plan specifications, product enquiries and dealer handoffs with Pixaloom.',
  eyebrow: 'For equipment suppliers, importers and distributor teams',
  heading: 'Technical product catalogue websites for South African suppliers.',
  lead: 'When customers need specifications, advice or a dealer before they buy, the website has a different job from a standard online shop. Pixaloom designs product discovery and enquiry journeys for South African suppliers, with the product model and handover agreed before development.',
  parent: { name: 'Services', path: '/services' },
  action: { label: 'Discuss your catalogue', href: '/contact' },
  sections: [
    { title: 'Start with how your products are sold.', paragraphs: [
      'A fireplace range, a 3D printer range and a consumable-parts range do not need the same category structure. We review representative products with your team: how buyers describe them, which specifications decide suitability, what changes between models and who answers a product enquiry.',
      'If installation, application advice or location changes the final quotation, an enquiry or dealer handoff may suit the range. If a buyer can choose a variant, see a reliable price and complete an order, checkout may be appropriate. A mixed range can use both journeys, with their boundaries clearly labelled.',
    ] },
    { title: 'Turn the product spreadsheet into a maintainable system.', paragraphs: [
      'Bring a small sample containing your simplest product, a complex variant and a discontinued item. We map stable identifiers, category names, specification labels and units, image rights, document versions and the source of each field. This exposes missing information before a full import becomes a development problem.',
      'Product pages should answer application and compatibility questions using information your business approves. Specifications need consistent units; downloads need identifiable versions. Related products and replacement models need deliberate links. An enquiry should retain the product reference so staff can respond without reconstructing what the visitor viewed.',
      'We agree who can edit the catalogue and how changes are reviewed. A bulk spreadsheet import, editorial screen, live stock feed and ERP connection are separate decisions. A catalogue does not imply live inventory or automated quotation calculation.',
    ] },
    { title: 'Make the range discoverable without creating URL clutter.', paragraphs: [
      'Useful category and product pages need stable addresses, descriptive links and distinct approved content. We plan which filter combinations deserve their own pages and which remain browsing controls. A migration starts with useful existing URLs and a redirect map, rather than discarding old product links.',
      'Testing follows a buyer from a mobile category page to a product specification and the agreed enquiry destination. We also test a missing document, a retired product and delivery failures. Search visibility is measured after launch; neither product markup nor a catalogue redesign guarantees Google rankings.',
    ] },
  ],
  table: {
    caption: 'Decisions to make before quoting the catalogue build',
    headings: ['Buyer needs', 'Website journey', 'Sign-off evidence'],
    rows: [
      ['Advice on a technical model', 'Specifications and a product-specific enquiry', 'The model reference reaches the receiving team'],
      ['A supplier or installer nearby', 'Product discovery followed by a dealer handoff', 'Approved dealer details and working contact links'],
      ['A fixed-price repeat purchase', 'Variants, cart and hosted checkout', 'Order, failure and notification journeys tested'],
      ['Negotiated prices or stock feeds', 'A separately scoped trade or integration workflow', 'Data ownership, permissions and failure handling agreed'],
    ],
  },
  proof: [
    { slug: 'nordflam', description: 'Saved interface captures show fireplace discovery, model information and product categories. Use the study to discuss a specification-led range and the next buyer action.' },
    { slug: 'buildvolume', description: 'Saved captures show printer brands, product grids and customer-support routes. Relevant to organising an equipment range with supporting information.' },
  ],
  checks: [
    { id: 'journey', label: 'The main journey is agreed: enquiry, dealer handoff, checkout or a defined combination' },
    { id: 'sample', label: 'Representative product data includes a stable identifier, categories, specifications and units' },
    { id: 'media', label: 'Approved images and versioned technical documents are available' },
    { id: 'ownership', label: 'The product-data owner and editing responsibilities are identified' },
    { id: 'handoff', label: 'The receiving team and product-reference handoff are defined' },
    { id: 'migration', label: 'Existing product URLs and replacement/discontinued-product rules are recorded' },
  ],
  scope: 'Catalogue work is quoted after reviewing the sample data and sales journey. The written scope names product templates, import work, editing tools and acceptance checks. Checkout, ERP synchronisation, automated quotes, photography and recurring software are included only when explicitly agreed. Existing ecommerce planning allowances cover a different scope and are not a fixed catalogue price.',
  questions: [
    ['Can a catalogue work without public prices?', 'Yes, where that matches your sales process. The page can explain specifications and how to request a quotation. We will not invent prices or stock status to populate search markup.'],
    ['Do you handle industrial equipment only?', 'This focus suits technical ranges where model differences, application questions and a sales handoff matter. The sample-data review establishes whether that approach fits your range.'],
    ['Can we keep our current catalogue addresses?', 'We first inventory the useful URLs. Retained addresses and approved redirects are part of migration planning; a new layout does not require changing every URL.'],
  ],
  sources: [],
};

export const rescueSpecialisms: NicheService[] = [
  {
    path: '/ai-website-app-rescue/supabase-login-data',
    name: 'Supabase login and data repair',
    title: 'Supabase Login & Data Fixes for AI-Built Apps',
    description: 'Login loops, password-reset errors or records that will not save? Plan a focused Supabase diagnosis for your Lovable, Bolt or React app with Pixaloom.',
    eyebrow: 'AI app rescue · Authentication and saved records',
    heading: 'Supabase login and data fixes for your app.',
    lead: 'A sign-in screen can look complete while the actual user journey fails. Pixaloom assesses Supabase-backed applications where redirects, sessions or data permissions interrupt the task. Start with the failing journey and an agreed test, rather than another broad rewrite.',
    parent: { name: 'AI Website & App Rescue', path: '/ai-website-app-rescue' },
    action: { label: 'Request a login/data diagnosis', href: '/ai-website-app-rescue#diagnosis' },
    sections: [
      { title: 'Separate authentication from access to records.', paragraphs: [
        'First establish where the failure occurs. Does the user never reach the app, return successfully but lose the session, or stay signed in while a record cannot be read or saved? Capture the expected action and what actually happens with a test account. An empty screen alone does not identify the cause.',
        'Lovable can use its managed Cloud backend or a separately connected Supabase project. Identify which your app uses before looking for settings in the wrong dashboard. Bolt projects also need their actual backend identified. The builder name is context, not a diagnosis or evidence that the platform caused the fault.',
      ] },
      { title: 'Check the production return journey.', paragraphs: [
        'Supabase distinguishes the default Site URL from allowed redirect destinations. A production password-reset or sign-in journey can fail if configuration still targets a local or preview address. Check the requested return path against the approved production configuration; do not solve a mismatch by permitting every destination.',
        'Our investigation follows registration or sign-in through the return to the intended screen, then a refresh and sign-out. Password reset is a separate journey. Use controlled accounts and redacted errors; callback links may contain sensitive tokens and should not be pasted into an enquiry.',
      ] },
      { title: 'Prove the right user can access the right record.', paragraphs: [
        'A successful login does not establish that database permissions are correct. For an agreed record type, we inspect the request and ownership rules, then test authorised and unauthorised access. Row Level Security policies and application checks have distinct roles. Disabling protections to make a save button work is not an acceptable repair.',
        'An acceptance example: test account A creates and updates its own record; account B cannot access it; a signed-out visitor cannot retrieve it; a denied request produces a useful error. The exact rules depend on your product. Shared records or staff roles need different explicit tests.',
        'We preserve the change history and agree a recovery path before altering policies or data. Work is performed within authorised access. A targeted permissions repair is not a comprehensive security audit, incident-response service or compliance certification.',
      ] },
    ],
    table: {
      caption: 'Use the symptom to narrow the investigation, not to assume the cause',
      headings: ['Observed symptom', 'Evidence to collect safely', 'Agreed test'],
      rows: [
        ['Returned to a local or preview address', 'The redacted destination and expected production path', 'Sign-in and reset return to the approved page'],
        ['Signed in until a refresh', 'The action sequence and redacted error', 'The authorised session survives the agreed navigation'],
        ['Signed in, but a save is denied', 'The record type and intended owner/role', 'Allowed saves succeed and prohibited access fails'],
        ['Another account can see the record', 'A controlled reproduction using synthetic data', 'Access rules tested for both accounts and signed-out use'],
      ],
    },
    proof: [{ slug: 'illumi', description: 'An invoicing and business-management application using Next.js and Supabase. The public study shows application scope and interfaces; it does not document a Lovable or Bolt rescue or certify its current security.' }],
    checks: [
      { id: 'backend', label: 'The actual backend is identified: managed builder backend or owned Supabase project' },
      { id: 'reproduce', label: 'The failing action can be reproduced with a controlled test account' },
      { id: 'redirects', label: 'The production sign-in/reset destination and permitted URLs have been reviewed' },
      { id: 'roles', label: 'Expected ownership and staff/shared-record permissions are written down' },
      { id: 'negative', label: 'A second account and signed-out test are included in acceptance checks' },
      { id: 'recovery', label: 'A recoverable change process and authorised access are agreed' },
    ],
    scope: 'The free initial review establishes suitability and a next step. Paid work follows the existing rescue packages and a written scope. A single redirect fault and a multi-role data-model repair are different jobs. Data migration, broader security review and unrelated features need separate agreement. Private invitations are arranged after scoping; never send passwords, service-role keys, session tokens or customer records through the public form.',
    questions: [
      ['Do you repair only Lovable apps?', 'No. The focus is the actual Supabase-backed workflow. We assess suitable Lovable, Bolt and custom React/Next.js projects after identifying the code and backend access available. No platform partnership is implied.'],
      ['Should I disable Row Level Security to test the app?', 'Do not remove access protections on live customer data as a workaround. Reproduce the issue with authorised test data and review the intended permissions before changing a policy.'],
      ['What should I send for an initial review?', 'A public app URL if available, the builder/backend you use, the failing action and expected behaviour. Redact screenshots and errors. We arrange safe access later if the project is suitable.'],
    ],
    sources: [
      { label: 'Supabase: authentication redirect URLs', href: 'https://supabase.com/docs/guides/auth/redirect-urls' },
      { label: 'Supabase: Row Level Security', href: 'https://supabase.com/docs/guides/database/postgres/row-level-security' },
      { label: 'Lovable: managed backend and Supabase integration', href: 'https://docs.lovable.dev/integrations/supabase' },
    ],
  },
  {
    path: '/ai-website-app-rescue/preview-to-production',
    name: 'Preview-to-production app rescue',
    title: 'AI App Works in Preview but Fails Live? Launch Help',
    description: 'Move an AI-built app from preview to a tested live release. Pixaloom assesses build failures, production configuration, domains and broken integrations.',
    eyebrow: 'AI app rescue · Build, deployment and handover',
    heading: 'Get your AI-built app from preview to live.',
    lead: 'A working builder preview and a working production release are different checkpoints. Pixaloom helps assess the gap in an existing AI-built web app: the build, runtime, domain and the business journey that must still work after publication.',
    parent: { name: 'AI Website & App Rescue', path: '/ai-website-app-rescue' },
    action: { label: 'Request a launch diagnosis', href: '/ai-website-app-rescue#diagnosis' },
    sections: [
      { title: 'Find the first failed checkpoint.', paragraphs: [
        'Does the production build fail, does the deployed app fail to start, or does the page load while a form or API fails? Those need different evidence. Keep the failed command, runtime version, release identifier and a redacted error excerpt. A new domain or another hosting provider will not automatically fix a code or configuration problem.',
        'We identify the actual framework and deployment path before recommending hosting changes. A static React build, a server-rendered Next.js app and a backend function have different runtime requirements. The existing repository and platform settings establish what the application needs; the AI tool used to generate it does not.',
      ] },
      { title: 'Trace configuration without exposing secrets.', paragraphs: [
        'A preview can have settings that were never supplied to production. We inventory required configuration by purpose and environment, check where it is used, and separate browser-visible values from server-only credentials. Secret values belong in the appropriate protected store, not a public source file or diagnostic screenshot.',
        'Domain checks follow the approved canonical address through DNS, HTTPS and redirects. For an authenticated app, the published address must also fit its login configuration. For a form or payment integration, provider access and callback destinations need their own verification. A loaded homepage proves none of those workflows.',
      ] },
      { title: 'Agree what “live” means before the release.', paragraphs: [
        'Choose one core journey and test it on the deployed URL with approved test data. A contact form needs evidence at the receiving destination, not just a success message. A payment integration needs the agreed provider event and application state; test mode must be clearly distinguished from a real transaction. Never use customer money or records for an improvised smoke test.',
        'Record the release, changed files, test result, remaining limitations and recovery method. The handover identifies the owner of the domain, repository, hosting and third-party accounts. If a provider account, missing content or a broader defect blocks launch, the result should say so rather than claim the app is production-ready.',
        'Cloudflare’s framework guidance distinguishes supported Next.js deployment paths. We check compatibility with the project’s existing adapter and runtime; migration to a different stack is a separate scope. A rescue should retain a recoverable release process and use the owner’s authorised publishing workflow.',
      ] },
    ],
    table: {
      caption: 'Four checkpoints for a release you can verify',
      headings: ['Checkpoint', 'Useful evidence', 'Acceptance condition'],
      rows: [
        ['Build', 'Runtime, build command and redacted failure', 'The exact release builds with the agreed environment'],
        ['Runtime', 'Deployment identifier and redacted server/API error', 'The required page and backend start successfully'],
        ['Domain', 'Approved host and observed redirect path', 'HTTPS and canonical redirects reach the release'],
        ['Business journey', 'Controlled input and receiving-system result', 'The agreed task completes, including its failure state'],
      ],
    },
    proof: [{ slug: 'illumi', description: 'A Next.js application with invoicing, data and email/payment workflows. Relevant application capability; the public study does not establish an AI rescue history or a measured launch-success rate.' }],
    checks: [
      { id: 'release', label: 'The repository, framework and exact release identifier are known' },
      { id: 'build', label: 'The production build command and required runtime are documented' },
      { id: 'config', label: 'Required configuration is inventoried and secrets stay out of browser code' },
      { id: 'domain', label: 'The approved domain, HTTPS and canonical redirect behaviour are checked' },
      { id: 'workflow', label: 'One core journey and its receiving-system evidence are agreed' },
      { id: 'handover', label: 'Account ownership, recovery and remaining limitations are documented' },
    ],
    scope: 'Deployment help uses the existing rescue packages after review. Hosting subscriptions, domain renewals and provider usage are separate costs. A build repair, release configuration and substantial migration are different scopes. We confirm access, an acceptance journey and the delivery estimate before paid work. A brief diagnosis is not a comprehensive code audit or a guaranteed launch deadline.',
    questions: [
      ['Can you help with Bolt, Replit or Cursor-built projects?', 'We assess the resulting code, runtime and hosting requirements. The first review establishes whether the available project and access fit the rescue service. A builder name alone is not a promise of compatibility.'],
      ['Do I have to move hosting?', 'No migration is assumed. We investigate the existing supported deployment path first. A change of platform needs a reason, an agreed scope and a recovery plan.'],
      ['Is a successful deployment enough to sign off?', 'No. Sign-off uses the agreed task on the live URL, its receiving-system evidence and relevant failure handling. Unresolved limitations are recorded in the handover.'],
    ],
    sources: [
      { label: 'Cloudflare: current Next.js deployment guidance', href: 'https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/' },
      { label: 'Bolt: platform and publishing overview', href: 'https://support.bolt.new/building/intro-bolt' },
    ],
  },
];

export const nicheServices = [catalogueService, ...rescueSpecialisms];
export function getRescueSpecialism(slug: string) {
  return rescueSpecialisms.find(item => item.path === `/ai-website-app-rescue/${slug}`);
}

export const briefStatuses = {
  unknown: 'Not checked',
  ready: 'Checked by me',
  attention: 'Needs attention',
  outside: 'Outside my scope',
} as const;
export type BriefStatus = keyof typeof briefStatuses;

export function buildNicheBrief(service: Pick<NicheService, 'name' | 'checks'>, selections: Record<string, BriefStatus>) {
  return [
    `Pixaloom project brief: ${service.name}`,
    'Self-reported planning checklist; not a Pixaloom audit or confirmation of readiness.',
    ...service.checks.map(check => `${briefStatuses[selections[check.id]] || briefStatuses.unknown}: ${check.label}`),
    '',
    'Add your public URL, expected outcome and a redacted example when you choose to contact Pixaloom.',
    'Do not include credentials, session tokens or private customer data.',
  ].join('\n');
}
