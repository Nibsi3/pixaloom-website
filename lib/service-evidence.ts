type ServiceEvidence = {
  title: string;
  paragraphs: string[];
  projects: string[];
  guide: string;
  related?: { href: string; label: string }[];
  budget: string;
  acceptance: string[];
};

export const serviceEvidence: Record<string, ServiceEvidence> = {
  'website-design': {
    title: 'A website built around the next useful conversation.',
    paragraphs: [
      'We start with your offer, the customers you want to reach and the questions they ask before making contact. The deliverable is a clear content structure and responsive interface, supported by an enquiry journey that is tested from the page to the receiving inbox.',
      'Paws On Route illustrates a service-first business website; Covercrete shows a product-and-enquiry presentation. These project studies demonstrate interface and implementation scope. They are not claims of measured sales uplift. We can explain the relevant decisions before recommending a structure for your business.',
      'WordPress can suit teams that need familiar content editing. A custom Next.js build can suit a more distinctive interface or application integration. We choose with you after reviewing editing responsibilities, hosting, content migration and the cost of maintaining the result.',
      'Bring your existing URL, priority services, available photography and examples of suitable enquiries. We define what content you supply, what we produce and who signs off each stage. A redesign includes an inventory of useful existing URLs and an explicit redirect plan.',
    ], projects: ['paws-on-route', 'covercrete'], guide: 'choosing-web-developer-george',
    related: [{ href: '/locations/george', label: 'Website design in George' }, { href: '/locations/garden-route', label: 'Garden Route website delivery' }],
    budget: 'Our focused custom business-website planning allowance is R35,000–R55,000 before optional features and VAT where applicable. Hosting, domains and recurring software are separate. The final quote follows discovery; this is not a market-wide average.',
    acceptance: ['Representative mobile and desktop journeys checked', 'Contact validation, failure states and actual email delivery tested', 'Important redirects, canonical URLs and sitemap verified', 'Editing, account ownership and handover responsibilities documented'],
  },
  'ecommerce-websites': {
    title: 'The catalogue is the beginning, not the whole store.',
    paragraphs: [
      'We scope the store around representative products and the work of your operations team: variants, prices, stock, delivery, payments, notifications and returns. A standard catalogue is a different job from a store that must reconcile inventory with an ERP or supplier feed.',
      'BuildVolume and NORDflam provide product-discovery and catalogue interface examples. The linked previews let you examine the presentation. They do not establish live merchant performance or independently verified sales results.',
      'During discovery we identify who owns the merchant account and where product data comes from. We confirm the provider’s current capabilities and eligibility rather than assuming every payment method is available. One standard hosted payment integration is included in the ecommerce base allowance; custom reconciliation and other integrations are scoped separately.',
      'The launch checklist covers failed and delayed payments as well as a successful order. We define stock handling, delivery regions, customer notifications and the staff handover. Your business supplies and approves its commercial policies, prices and legally appropriate terms.',
    ], projects: ['nordflam', 'buildvolume'], guide: 'ecommerce-website-south-africa',
    budget: 'The focused store planning allowance is R60,000–R95,000, including one standard hosted payment integration. It excludes VAT where applicable, merchant transaction fees, hosting and recurring subscriptions. Catalogue import complexity and bespoke integrations affect the written quote.',
    acceptance: ['Catalogue and variants checked with representative data', 'Payment success, failure and duplicate notifications tested', 'Shipping, stock and order emails verified', 'Store administration and recurring charges documented'],
  },
  'web-app-development': {
    title: 'Start with one complete workflow.',
    paragraphs: [
      'A useful first application release lets a real user complete an important task. We map roles, records, actions and external systems before committing to a feature list. Discovery identifies what can be handled by an existing product and what actually needs custom engineering.',
      'Illumi demonstrates an invoicing and business-management interface. Spotlight demonstrates a map-led discovery product. Their case studies explain the described systems and interface decisions; the public materials are not a substitute for a security assessment or verified commercial outcome.',
      'We agree what data the application needs, which system owns it and who may read or change it. Permissions, validation, error recovery and account handover are part of the scope. Prototype data and simulated integrations are identified before a release is described as production-ready.',
      'Expect a staged delivery plan with acceptance criteria for each workflow. Source ownership, hosting, database access, support and recovery procedures are discussed upfront. Ongoing product development is separate from completing the initial release.',
    ], projects: ['illumi', 'spotlight'], guide: 'web-app-vs-website-difference',
    budget: 'A focused custom application has an initial planning allowance of R80,000–R140,000, excluding VAT where applicable and recurring infrastructure or provider charges. Discovery may recommend a smaller website or existing tool instead. Integration and data risks must be assessed before a fixed scope.',
    acceptance: ['Role and authorization rules exercised', 'Happy paths and recoverable failures verified', 'Data, backup and account ownership documented', 'Deployment, rollback and support responsibilities agreed'],
  },
  seo: {
    title: 'Fix what prevents useful visibility first.',
    paragraphs: [
      'We start with crawlability, indexing, canonical URLs, redirects, internal links and the quality of the pages that should win qualified enquiries. A search report dominated by client-brand or login queries is not the same as demand for your services.',
      'The audit separates current live evidence from older Search Console reports and distinguishes lab performance from real-user data. Recommendations name the affected URL, the observed problem and how the fix will be verified.',
      'Content work focuses on the actual offer, real project evidence and useful buying questions. Local pages must reflect genuine coverage and a distinct reader need. We do not invent offices, manufacture reviews or guarantee a ranking position.',
      'The Paws On Route project illustrates service-led page structure, not a measured SEO uplift. For your business we establish a starting point and agree which outcomes matter: relevant non-brand discovery, working enquiries and qualified conversations. Indexing and ranking decisions remain with the search engine.',
    ], projects: ['paws-on-route'], guide: 'seo-tips-garden-route-businesses',
    related: [{ href: '/locations/george', label: 'Local search support in George' }, { href: '/locations/garden-route', label: 'SEO across the Garden Route' }],
    budget: 'SEO starts with a scoped assessment of your site and access to relevant search data. We quote the assessment and implementation separately where appropriate. There is no fixed ranking package or guaranteed number of leads.',
    acceptance: ['URL-level findings and priorities documented', 'Crawl, metadata and internal-link fixes rechecked after deployment', 'Search Console submissions and exclusions reviewed', 'Contact intent, accepted enquiries and qualified leads distinguished'],
  },
  'website-care': {
    title: 'A live page is only one part of a working website.',
    paragraphs: [
      'Care begins with an inventory of the domain, hosting, code, dependencies and integrations. We establish who owns each account and what we can safely update. For a site we did not build, an initial assessment identifies the condition and risks before a recurring scope is agreed.',
      'Routine checks cover the important business journey as well as uptime. That can include contact delivery, checkout, redirects, content accuracy and performance. A form needs a verified receiving inbox, not just a success animation.',
      'WordPress plugins and themes need maintenance; custom Next.js applications have dependencies, runtimes and services to maintain too. Update testing and a recoverable release process are part of responsible operation on either stack.',
      'We agree the review frequency, included content changes, response arrangements and escalation contacts in writing. New features, major redesigns and third-party charges are not silently folded into a generic maintenance promise.',
    ], projects: [], guide: 'website-maintenance-importance',
    budget: 'Care is quoted after the account and technical assessment. The plan names included work, frequency and support arrangements. Hosting, domains, paid software and substantial development are separate unless the agreement explicitly includes them.',
    acceptance: ['Access and renewal inventory maintained', 'Key forms and integrations checked', 'Backup restoration and release recovery documented', 'Security, search and performance issues prioritised with evidence'],
  },
};
