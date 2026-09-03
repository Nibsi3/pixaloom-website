// Editorial changes are dated explicitly, never inferred from deployment time.
// Preserve original publication dates in blog-posts.ts.
export type JournalRevision = { title: string; excerpt: string; modified: string; service: string; project?: string; content: string };
export const journalRevisions: Record<string, JournalRevision> = {
  'why-george-businesses-need-modern-website': {
    title: 'What a George Business Website Needs to Do',
    excerpt: 'A practical brief for a local service website: explain the offer, show real work and make an enquiry easy.',
    modified: '2026-09-03', service: 'website-design', project: 'paws-on-route',
    content: `A George business does not need a website simply because its competitors have one. It needs a reliable place to explain what it offers, who it can help and how to take the next step. Start by looking at the questions people ask before they become customers.

## Build around the actual enquiry

A pet owner comparing grooming services needs different information from a procurement manager ordering uniforms. List your services in the language customers use. Explain the location or service area, what an appointment involves and how to make contact. Show prices where you can keep them accurate; explain the quote process where the job must be assessed first.

For a concrete example, our [Paws On Route project](/work/paws-on-route) separates pet-care services and provides direct contact routes. It illustrates a service-led structure, not a claim that any particular layout guarantees bookings.

## Make the information trustworthy

Use photos of the actual business and work, with permission. Identify the people responsible for the service. Keep opening hours and phone numbers consistent with the business profile. Only list qualifications, testimonials and coverage that the business can substantiate.

Avoid creating a page for every nearby town unless each page answers a genuinely different customer need. A clear service-area explanation is more useful than repeating the same copy with a different place name.

## Test before spending on traffic

- Open the site on a narrow phone screen and follow the full enquiry journey.
- Check that a message actually reaches the intended inbox; a green success message alone is not proof.
- Make phone and WhatsApp actions visible without covering the page.
- Test the busiest service page on a constrained connection, not just the homepage on office Wi-Fi.

Our [George web design service](/locations/george) explains how we work locally. For a new build, bring an existing URL, your priority services and examples of good enquiries. We can then scope the [website design](/services/website-design) around a useful outcome rather than a page count.`
  },
  'next-js-vs-wordpress-south-africa': {
    title: 'Next.js vs WordPress: Choose Around the Work',
    excerpt: 'Compare editing, development, hosting and maintenance without assuming one platform is always faster or safer.',
    modified: '2026-09-03', service: 'website-design', project: 'illumi',
    content: `Next.js and WordPress solve overlapping but different problems. WordPress combines publishing and content administration in a widely used CMS. Next.js is a React framework for building interfaces and server-backed applications. A Next.js project still needs an editing system if a non-technical team will manage its content.

## Start with who edits the website

For a team publishing pages and articles frequently, evaluate the actual editor, roles, preview workflow and media library. A well-built WordPress site can be a practical choice. Test changes with the people who will maintain the site; do not choose a CMS only because a developer prefers it.

For a custom dashboard, permissions model or application workflow, Next.js may give the development team more control. Our [Illumi project](/work/illumi) describes an invoicing and business-management interface. Its needs differ from a marketing site whose main job is publishing service information.

## Speed and security are implementation questions

Neither platform guarantees a fast website. Large images, third-party scripts, inefficient queries and excessive client-side code can slow either stack. Compare representative production pages using both lab tests and real-user measurements when available.

Next.js applications can use databases, authentication, payment providers and third-party dependencies. They are not immune to security failures. WordPress needs responsible plugin selection, updates and access controls; custom applications need dependency updates, server-side authorization, backups and monitoring too.

## Compare the complete cost

- Content entry, migration and editor training.
- Hosting, backups and staging environments.
- Paid extensions, integrations and maintenance responsibilities.
- Developer availability and handover documentation.
- The effort needed to change the design or data model later.

Pixaloom works with both WordPress and custom application stacks. Our recommendation follows your content workflow, integration needs and ownership requirements. Ask for those decisions in a [website design brief](/services/website-design), or explore [custom web application development](/services/web-app-development) when users need accounts and operational tools. Choose the smallest maintainable solution that genuinely fits the job.`
  },
  'seo-tips-garden-route-businesses': {
    title: 'Garden Route SEO: 10 Practical Checks',
    excerpt: 'A local search checklist focused on accurate business information, useful service pages and measurable enquiries.',
    modified: '2026-09-03', service: 'seo', project: 'paws-on-route',
    content: `Local SEO starts with helping the right customer understand a real business. These checks are useful for Garden Route service businesses, but none is a promise of a particular ranking. Prioritise the pages and enquiries that matter to your own operation.

## The ten checks

1. **Verify your business details.** Keep your trading name, phone, hours and service area accurate across your website and eligible business profile.
2. **Explain each important service.** Describe scope, suitability, exclusions and the next step instead of repeating a short sales line.
3. **Show credible proof.** Publish permitted project examples and genuine customer feedback. Do not invent reviews or local offices.
4. **Inspect indexing.** Use Search Console to see whether your priority URLs are accessible, canonical and indexed. A sitemap submission does not guarantee indexing.
5. **Repair broken journeys.** Follow navigation, enquiry links and contact forms on real devices. Check actual email delivery.
6. **Use descriptive internal links.** Link a relevant guide to its service and a service to its project evidence. Avoid linking every article to every page.
7. **Keep images useful and efficient.** Use real work, descriptive alternatives where needed and appropriately sized files.
8. **Check mobile usability and speed.** Review layout, controls and content stability as well as a Lighthouse score.
9. **Preserve useful URLs during a redesign.** Redirect only to genuinely equivalent content. Leave a proper not-found response where no replacement exists.
10. **Measure qualified enquiries.** Separate brand searches, phone clicks and submitted briefs from work that becomes a suitable lead.

## Apply the checklist to one page first

For a local pet-care page, that might mean clarifying appointment services, showing the actual environment and checking that the phone link works. [Paws On Route](/work/paws-on-route) is an example of that service-first information structure. For accommodation, availability and arrival details may matter more; the [tourism website guide](/blog/george-tourism-website-best-practices) covers that journey.

Choose one important page and document its starting point before changing it. Review search and enquiry patterns after Google has had time to recrawl; do not attribute every movement to the latest edit. Our [technical SEO service](/services/seo) starts with these observable problems, supported by our [Garden Route delivery process](/locations/garden-route).`
  },
  'how-much-does-website-cost-south-africa': {
    title: 'How to Budget for a Website in South Africa',
    excerpt: 'Compare website proposals by scope, responsibilities and ongoing costs—not an unsupported national average.',
    modified: '2026-09-03', service: 'website-design', project: 'buildvolume',
    content: `A website price is meaningful only alongside a scope. A five-page marketing site, a stock-connected online store and a customer portal are different products. This guide explains how to compare proposals. The [Pixaloom cost estimator](/website-cost) provides our indicative planning ranges; it is not a survey of South African market prices or a binding quotation.

## Define the first useful release

Write down the main audience, the action they should take and the information or tools they need. Then identify who supplies copy, photography, product data and approvals. Missing content and unclear responsibility can change both cost and delivery time.

For ecommerce, count more than pages. Product variants, imports, stock rules, shipping zones, payment failures and order notifications all affect the work. The [BuildVolume interface study](/work/buildvolume) shows why catalogue navigation and product detail deserve their own design attention.

## Compare the same deliverables

- Research, content structure and design revisions.
- Responsive implementation and accessible interaction testing.
- Content migration, redirects and search metadata.
- Contact, payment or booking integrations and their failure states.
- Testing, launch support, documentation and account handover.

Ask which items are included, optional or dependent on a third-party supplier. A standard payment connection should not silently appear in both an ecommerce base price and an additional feature fee.

## Separate build costs from running costs

Request a separate schedule for domains, hosting, email delivery, payment fees, licensed software and ongoing support. Confirm billing currency, taxes, renewal terms and what happens if you move to another supplier. Pixaloom's estimator excludes VAT where applicable and recurring third-party charges; the written quote must settle the actual treatment and inclusions.

## Budget for acceptance, not just appearance

A finished-looking page is not enough. Agree how you will verify enquiries, editing, checkout, redirects and mobile usability before acceptance. Keep room for content and testing rather than spending the entire budget on a homepage concept.

Use the estimator to prepare a conversation, then request a [scoped website proposal](/services/website-design). Your saved selections can be carried into the contact brief. The final quote follows discovery and should explain assumptions, exclusions, milestones and change requests.`
  },
  'website-speed-matters-south-africa': {
    title: 'Website Speed: What to Measure and Fix First',
    excerpt: 'Separate lab scores from real-user performance, then improve the resources that delay the useful page.',
    modified: '2026-09-03', service: 'website-care', project: 'nordflam',
    content: `A fast website lets a visitor read, compare and act without unnecessary waiting. South African visitors use different devices and connections, so a desktop test on fibre is not enough. There is no useful basis for claiming that speed matters more here than in every other country.

## Know what a score can tell you

Lighthouse is a controlled lab test. It is useful for finding blocking resources and comparing changes under similar conditions. Its performance score is not a conversion rate or a guarantee that every visitor has a good experience.

Core Web Vitals field data describes real visits where sufficient data exists. LCP covers main-content loading, INP responsiveness to interaction and CLS visual stability. A site with no field dataset cannot honestly claim a field pass simply because its Lighthouse result is high.

## Follow the actual bottleneck

Inspect the page's largest visible content and the chain of requests needed to display it. A large hero image, late stylesheet or slow server can require different fixes. Below-the-fold images should not compete unnecessarily with the opening viewport. Fingerprinted scripts and styles should be cacheable across visits.

For interactive pages, test opening menus, filtering products and submitting forms as well as initial loading. Use the [NORDflam project](/work/nordflam) as a catalogue example: the useful experience includes navigation and product discovery, not only the first image.

## Keep the design; reduce waste

- Size images for their display and preserve readable detail.
- Avoid unnecessary client-side libraries and third-party tags.
- Reserve space for media so content does not jump.
- Respect reduced-motion preferences and provide a way to pause looping decoration.
- Verify compression and caching on the deployed host.

Keep a record of the test URL, device profile and date. Repeat measurements because a single run can vary. Review the effect on real journeys rather than chasing a perfect score at the expense of clarity. Our [website care service](/services/website-care) covers ongoing checks, while [website design](/services/website-design) includes performance decisions from the start.`
  },
  'lead-generation-website-design': {
    title: 'Designing a Website for Better Enquiries',
    excerpt: 'Connect a clear offer, relevant proof and a reliable contact journey before spending more on traffic.',
    modified: '2026-09-03', service: 'website-design', project: 'covercrete',
    content: `A lead-generation website should help a suitable customer decide whether to contact you. That does not mean adding a button to every section or promising that design alone produces sales. It means answering the questions that prevent a useful conversation.

## Make the offer understandable

State the service, who it is for and where it is available. Explain what is included and when a different solution may be more appropriate. An enquiry is more useful when both sides understand the likely scope.

Follow that explanation with evidence relevant to the offer. A service example should describe the actual work, not only display a logo. The [Covercrete interface study](/work/covercrete) illustrates a product-and-enquiry presentation; its screenshots are design evidence, not proof of measured revenue improvement.

## Ask only what you need next

A first-contact form often needs a name, reply address and short description of the goal. Budget or service selections can help qualification when clearly optional. Do not request identity documents, payment details or confidential operational records in a general website form.

Give fields visible labels and meaningful validation. Keep a person's message intact after an error. Include direct email, phone or WhatsApp alternatives so a failed integration does not become a dead end.

## Test the complete delivery path

Test an authorized enquiry from submission through the email provider to the receiving inbox. A successful HTTP response can mean the provider accepted a message; it does not prove the recipient read it. Monitor provider failures without recording message contents in general application logs.

Separate your measurements:
- A contact click signals intent, not a delivered enquiry.
- A provider-accepted message is not necessarily a qualified lead.
- Qualification and project wins require a separate business record.

Before changing the layout, record where enquiries originate and why unsuitable leads are unsuitable. Improve the offer or form around that evidence. Our [website design service](/services/website-design) combines the content, interface and delivery checks; the [cost estimator](/website-cost) helps you prepare a realistic initial brief.`
  },
  'google-business-profile-george': {
    title: 'Google Business Profile: A George Business Checklist',
    excerpt: 'Check eligibility, ownership and accurate information before trying to improve local visibility.',
    modified: '2026-09-03', service: 'seo',
    content: `A Google Business Profile can help customers discover and contact an eligible local business. It is not appropriate for every online business, and creating additional profiles for towns you serve is not a shortcut to local rankings. Start with Google's current eligibility and representation guidelines.

## Confirm the actual business model

Check whether customers visit a genuine staffed business location or whether you travel to customers as a service-area business. Use the address and visibility settings that match reality. Do not publish a private home address to satisfy a website template, and do not claim a virtual office as a staffed branch.

Keep ownership with an account controlled by the business. Give a supplier the appropriate management access rather than sharing passwords. Resolve an existing listing or duplicate through Google's supported process before creating another profile.

## Complete information customers use

- Use the real-world trading name without adding a string of service keywords.
- Choose categories that describe what the business actually does.
- Keep opening hours, special hours, phone and website accurate.
- Describe services and coverage truthfully.
- Publish current photos that represent the real business and that you have permission to use.

For a George service business, link to a page that explains the local offer and contact process. For a business serving several Garden Route towns, a clear coverage page may be more useful than a collection of near-identical landing pages.

## Ask for honest feedback

Invite genuine customers to describe their experience without incentives, fabricated accounts or filtering requests only to people expected to leave positive feedback. Respond professionally and avoid disclosing private customer information in public replies.

## Measure and maintain

Review the profile after a phone, address, service or opening-hours change. Compare profile interactions with enquiries, but do not treat an interaction count as confirmed revenue. Local visibility depends on factors including relevance, distance and prominence; no profile setting guarantees a position.

Our [SEO service](/services/seo) can help assess the website and profile together. The [George studio page](/locations/george) describes Pixaloom's actual base; it is not a claim that every listed service area contains an office.`
  },
  'ecommerce-website-south-africa': {
    title: 'Planning a South African Ecommerce Website',
    excerpt: 'Define catalogue, checkout, payment and fulfilment rules before choosing an ecommerce platform.',
    modified: '2026-09-03', service: 'ecommerce-websites', project: 'buildvolume',
    content: `An online store is an operational system as well as a visual catalogue. Before choosing the platform, document how products, payments, stock and fulfilment work today. The cost and risk usually sit in those rules rather than the number of screen designs.

## Start with representative products

Collect examples covering a simple item, variants, an out-of-stock item and any product needing a quote or special delivery. Define the source of truth for price and stock, who updates it and how frequently it changes. Clean catalogue data is part of the build, not an automatic by-product of installing a shop.

Our [BuildVolume project](/work/buildvolume) shows category, shop and product-detail interfaces for a specialist catalogue. [NORDflam](/work/nordflam) offers another product-discovery example. The public previews demonstrate interface work; they do not establish live sales or merchant integration outcomes.

## Treat payment as a full journey

Choose a payment provider after checking current merchant eligibility, fees, supported methods and settlement terms directly with that provider. Confirm who owns the merchant account. Avoid handling raw payment-card data in your own application when a hosted provider flow fits the requirement.

Test successful, failed, cancelled and delayed payments. Verify server-side payment notifications, duplicate handling, order status and confirmation emails. A checkout success screen must not be the only evidence that an order was paid.

## Resolve fulfilment and support

- Delivery regions, collection options and exclusions.
- Shipping calculations for bulky or unusual items.
- Stock reservation and what happens when inventory changes.
- Returns, refunds and customer-support responsibilities.
- Tax and consumer-facing terms checked for the actual business.

Keep legal policies consistent with the business and obtain qualified advice where necessary; a generic template cannot determine compliance.

## Launch a manageable scope

Agree which catalogue and fulfilment cases the first release supports, and document what remains manual. Build a test order checklist that staff can repeat after changes. Explore our [ecommerce development service](/services/ecommerce-websites) for scope and examples, then use the [planning estimator](/website-cost) to prepare the initial budget conversation.`
  },
  'mobile-first-design-importance': {
    title: 'Mobile-First Design: A Practical Testing Checklist',
    excerpt: 'Test real reading, navigation and form journeys on phones—not just whether a desktop layout becomes narrower.',
    modified: '2026-09-03', service: 'website-design', project: 'paws-on-route',
    content: `Mobile-first design starts with a constrained viewport and the actions a visitor needs to complete. It is not a claim that every business has the same mobile traffic share. Use your own audience data where available, and make the site work across devices regardless.

## Test the useful journey

Begin on the page a customer is likely to find through search, not always the homepage. Can they identify the service, read the evidence and make contact without hunting through a menu? A local-service example such as [Paws On Route](/work/paws-on-route) makes service information and direct contact a useful test path.

Check long headings, pricing ranges, tables and project galleries at narrow widths. Avoid fixed-width components that create horizontal scrolling. Allow text to wrap and zoom instead of shrinking it until it technically fits.

## Use real controls

Buttons and links should have understandable names and comfortable targets. Menus must work with keyboard input and retain visible focus. Forms need labels, appropriate input types and understandable validation messages. An error should not clear everything the visitor has written.

Test with the on-screen keyboard open. Confirm that the submit button remains reachable and that a sticky contact bar does not obscure fields or privacy information. Native select controls can be more dependable than elaborate custom menus when the task is simply choosing a service.

## Respect preferences and connections

Provide a static alternative to decorative motion and a pause control for ongoing animation. Reduced-motion preferences should actually change the experience, not merely shorten one transition while leaving a video looping.

Load images at appropriate sizes and defer non-critical content. A mobile screenshot is not a performance measurement, and an automated accessibility score is not a complete usability review.

Before sign-off, record the tested device, viewport, browser and tasks completed. Our [website design process](/services/website-design) includes these checks alongside responsive styling. The [website speed guide](/blog/website-speed-matters-south-africa) explains how to measure loading separately from layout.`
  },
  'ssl-https-website-security': {
    title: 'HTTPS Is Essential—But It Is Not a Security Audit',
    excerpt: 'Understand what a TLS certificate protects and which application, access and maintenance risks remain.',
    modified: '2026-09-03', service: 'website-care',
    content: `HTTPS protects data in transit between a browser and the server it connects to. A valid TLS certificate supports that connection and server authentication. It does not prove that a business is trustworthy, that an application has no vulnerabilities or that a website complies with privacy law.

## Check the whole public journey

Verify that HTTP requests move to the correct HTTPS URL, certificates cover the active hostnames and pages do not load insecure scripts or images. Include forms, downloads and external integrations in the check. Certificate renewal needs an owner and a failure alert even when a hosting platform normally automates it.

Use current platform guidance for TLS and security headers. A policy copied from another application can break embeds, media or integrations; test it against the actual site before enforcing it.

## Protect what HTTPS does not

- Keep framework, plugin and dependency updates under review.
- Validate submitted data on the server, not only in browser fields.
- Enforce authorization on protected actions and records.
- Store credentials in an appropriate secret store rather than the repository or client bundle.
- Limit account access and remove access that is no longer needed.
- Keep backups and verify a restoration procedure.

For a contact form, the important questions include who receives the message, whether failures are monitored and whether personal details leak into logs. A valid certificate cannot repair an unconfigured email provider or an exposed API error.

## Minimise information collection

A general enquiry form should not request passwords, identity documents or sensitive records. Explain what the information is used for and provide a privacy contact. Requirements depend on the business and processing involved; obtain qualified advice for legal obligations rather than treating HTTPS as a compliance certificate.

Our [website care service](/services/website-care) covers operational checks and maintenance scope. If a site includes user accounts or sensitive workflows, discuss the security requirements explicitly during [application discovery](/services/web-app-development). Security is continuing work, not a padlock graphic added at launch.`
  },
  'content-marketing-small-business': {
    title: 'Small-Business Content: Publish Useful Answers',
    excerpt: 'Build a manageable publishing process around customer questions, genuine examples and a clear next step.',
    modified: '2026-09-03', service: 'seo',
    content: `Useful content helps a potential customer make a decision. For a small business, a well-maintained answer to a real question can be more valuable than a large archive of generic articles. Begin with questions from enquiries, proposals and support conversations, removing any confidential information.

## Give each page a job

A service page explains the offer and whether it fits. A case study shows what was actually done. A guide helps someone understand a decision before buying. These pages can support one another, but they should not all target the same question with slightly different titles.

For example, our [website budgeting guide](/blog/how-much-does-website-cost-south-africa) explains how to compare scope, while the [cost estimator](/website-cost) produces an indicative range from selections. The article and tool serve related but distinct needs.

## Build from evidence

Use a real example, explain the decision and distinguish observation from measured results. Screenshots can demonstrate layout and workflows; they do not prove increased sales. Publish client figures only with permission and enough context to explain the measurement.

When you make a technical claim, link to a relevant primary source and check that the advice is current. A generic source list does not substantiate every statistic in an article. Remove claims you cannot support instead of adding a new source label beneath them.

## Keep the publishing process small

1. Choose one customer question with a clear connection to the business.
2. Gather examples and verify any factual claims.
3. Draft a direct answer with useful headings and a next step.
4. Review links, accessibility and what the page claims about your work.
5. Record the publication and substantive-update dates.

Avoid changing dates simply to make an old page appear fresh. Review pages when services, pricing assumptions or technical guidance change. Merge genuinely redundant material where a clear replacement exists.

Use Search Console and enquiry quality to assess whether the content reaches suitable readers. Publishing frequency alone is not a ranking guarantee. Our [SEO and content service](/services/seo) focuses on fixing the useful pages first, then identifying the next evidence-backed question worth answering.`
  },
  'web-app-vs-website-difference': {
    title: 'Website or Web App? Start with the Workflow',
    excerpt: 'Decide whether customers need information, transactions or a persistent tool before choosing the build.',
    modified: '2026-09-03', service: 'web-app-development', project: 'illumi',
    content: `The line between a website and a web application is not absolute. Many websites include forms, booking tools or checkout. The useful planning question is whether people mainly need information or need to manage a continuing workflow with data, accounts and permissions.

## When a website is enough

A marketing website can explain services, display evidence and collect enquiries. An existing booking or payment provider may handle a transaction without a custom platform. This often reduces the amount of software your business must operate and maintain.

If your main goal is to present an offer and receive suitable leads, start with [website design](/services/website-design). Avoid creating accounts solely to let someone ask a question.

## When a custom application makes sense

Consider an application when users need a workspace: saving records, collaborating, checking status or carrying out repeat tasks. [Illumi](/work/illumi) illustrates this distinction with invoicing and business-management interfaces. Its screens show a product workflow rather than a conventional brochure.

Write down the people using the system, the records they handle and which actions each role may perform. Define the source of truth for data and how third-party systems connect. These decisions usually matter more than choosing a visual framework.

## Scope the smallest complete workflow

- One clear task a user can finish from beginning to end.
- Required sign-in and authorization rules.
- Validation, empty states and recoverable errors.
- Notifications and external integrations.
- Backup, support and account ownership responsibilities.

An MVP should be small in scope, not careless about access control or data integrity. Avoid presenting a prototype's simulated data as a production capability.

## Budget for operating the product

Custom software needs a release process, monitoring and ongoing maintenance. Specify who owns cloud accounts, databases, source code and documentation. Plan how staff will get support and how you will test a restoration or failed integration.

Our [web application development service](/services/web-app-development) starts with the workflow and its risks. Use the [planning estimator](/website-cost) for a broad initial range, then validate the scope before committing to a full platform.`
  },
  'george-tourism-website-best-practices': {
    title: 'Garden Route Tourism Websites: Help Guests Decide',
    excerpt: 'Make availability, location, suitability and booking terms easy to understand on a phone.',
    modified: '2026-09-03', service: 'website-design',
    content: `A tourism website has to answer practical questions while communicating the character of an experience. Guests planning a Garden Route trip may be comparing several places, travelling with limited attention or checking a detail from a phone. The design should make that decision easier, not merely display a large slideshow.

## Answer the questions behind a booking

For accommodation, explain room types, occupancy, amenities, accessibility information and arrival arrangements accurately. For an activity, state duration, meeting point, suitability, what is included and any relevant restrictions. Use real photographs and keep descriptions aligned with what the visitor will receive.

Do not claim distances, travel times, facilities or availability without checking them. A place name in a heading is less helpful than precise directions or an explanation of how the experience fits an itinerary.

## Distinguish enquiries from confirmed bookings

If your website sends a request, label it as a booking enquiry. Do not imply that a room or time slot is secured until the actual system confirms it. When using a third-party booking engine, test the handover on mobile and make pricing, cancellation and payment terms accessible before the guest commits.

Test sold-out dates, unavailable activities, payment failure and confirmation messages. Someone must own the availability feed and respond to enquiries. A beautiful page cannot correct a neglected booking inbox.

## Keep the mobile experience calm

- Make contact details and directions easy to find.
- Use readable images without forcing a large gallery download before essential information.
- Keep calls to action descriptive: check availability, request dates or book the activity.
- Provide visible labels and clear errors in enquiry forms.
- Allow visitors to pause moving backgrounds and respect reduced motion.

## Use local information that helps

Publish only genuinely useful nearby information that you can maintain. Avoid filling the site with copied descriptions of every Garden Route town. Ask real guests which details they struggled to find and update the relevant page.

Our [Garden Route website service](/locations/garden-route) explains regional delivery from George. Discuss the booking model, content responsibilities and integrations during [website discovery](/services/website-design), before choosing the page layout.`
  },
  'website-maintenance-importance': {
    title: 'Website Maintenance: What the Plan Should Cover',
    excerpt: 'Define responsibility for updates, recovery, content and working enquiries after the launch.',
    modified: '2026-09-03', service: 'website-care',
    content: `A maintenance plan should explain what is checked, what is changed and who responds when something fails. Hosting a website and maintaining its application are different responsibilities. Neither a monthly invoice nor an uptime graph proves that a customer can complete the important journey.

## Keep an inventory

Record the domain registrar, host, source repository, CMS, email provider and third-party integrations. Identify the business-controlled account owner and renewal responsibility for each. Keep secrets outside the document and use appropriate access management rather than shared passwords.

For WordPress, include themes and plugins. For custom applications, include runtime and dependency versions, databases and background tasks. Both types of site need ongoing attention; a custom framework does not eliminate maintenance.

## Test outcomes as well as uptime

- Contact submission reaches the intended inbox.
- Booking or checkout behaves correctly for success and failure.
- Important pages and redirects return appropriate responses.
- Content, contact details and service descriptions remain accurate.
- Backups can be restored through a documented procedure.
- Key journeys remain usable after updates.

Agree how often checks run and what evidence is retained. A backup that has never been restored is an untested assumption. A form that reports success without checking the email provider can conceal a delivery problem.

## Make update risk explicit

Review security advisories and dependencies, test changes in an appropriate environment and keep a rollback path. Define which work is routine maintenance and which requires a new scope. Major redesigns, new integrations and content production should not hide inside an undefined promise to handle everything.

## Review search and performance

Watch for indexing changes, broken internal links and new performance regressions. Compare repeatable tests and investigate meaningful changes instead of treating every daily fluctuation as an incident.

Our [website care service](/services/website-care) describes the areas to scope. For a handover, bring the account inventory, known issues and most important customer journeys. The [HTTPS guide](/blog/ssl-https-website-security) explains why transport security is one part of this work, not a substitute for it.`
  },
  'structured-data-schema-markup-seo': {
    title: 'Structured Data: Accurate Markup, Not a Shortcut',
    excerpt: 'Describe visible content consistently, validate it and avoid promising rich results that Google does not support.',
    modified: '2026-09-03', service: 'seo',
    content: `Structured data provides machine-readable descriptions of content and entities on a page. It can help a search engine interpret a business, article, product or breadcrumb. It does not replace useful content, establish facts you have not demonstrated or guarantee a search feature.

## Match the visible page

Start with the actual content. An article's title, author and dates should agree with what readers see. A product's price and availability must reflect the relevant offer. A service-area business should not invent street addresses or coordinates to populate a template.

Use a consistent identifier for the same organization across pages. A service page can refer to that provider instead of creating a new local business entity with a keyword-stuffed name for every town.

## Separate Schema.org vocabulary from Google features

A valid Schema.org type is not necessarily eligible for a Google rich result. Check the currently supported search features and their requirements before promising an enhancement.

Google stopped showing FAQ rich results in May 2026. A useful on-page FAQ may still help customers, but adding FAQPage markup is not a route to that retired feature. Similarly, special files or extra schema types should not be sold as guaranteed AI-search visibility.

## Validate in layers

1. Confirm that the JSON is valid and safely embedded in the HTML.
2. Check property names, identifiers and relationships against the relevant vocabulary.
3. Use Google's Rich Results Test for supported features.
4. Inspect the deployed page and compare markup with visible facts.
5. Use Search Console to investigate issues after Google recrawls.

Passing a syntax test is not evidence that every statement is accurate or that Google will display an enhancement. Keep optional fields out when the information is not established; do not invent reviews, coordinates or credentials to remove a warning.

Our [SEO service](/services/seo) treats structured data as part of a wider crawl, content and measurement review. The [Garden Route SEO checklist](/blog/seo-tips-garden-route-businesses) covers the practical foundations that should accompany it.`
  },
  'choosing-web-developer-george': {
    title: 'Choosing a Web Developer in George',
    excerpt: 'Questions that reveal the scope, ownership and support behind a proposal—not just the quality of a screenshot.',
    modified: '2026-09-03', service: 'website-design', project: 'nordflam',
    content: `Choose a developer by examining how they work as well as what their portfolio looks like. A screenshot can demonstrate visual direction, but it cannot establish who built every part, how the system performs or whether the client owns the necessary accounts.

## Ask what the example represents

For each relevant project, ask whether it is a live production site, a public preview or an interface study. Clarify the developer's role, the version shown and which outcomes were measured. A client's current website may have changed after a handover, so a live link and an archived capture can show different work.

Our [NORDflam project](/work/nordflam) and other [selected projects](/projects) provide interfaces and scope to discuss. They should be assessed as evidence of the described work, not as an implied endorsement from every brand or a guarantee of business results.

## Ask for a written scope

- What content and assets must you supply?
- Which pages, workflows and integrations are included?
- How are revisions, approvals and change requests handled?
- What tests determine whether the work is ready to launch?
- Which recurring charges and support responsibilities remain afterward?

For a redesign, ask how useful existing URLs and content will be handled. For ecommerce, ask about real test orders and failure scenarios. For a custom application, ask about permissions, backups and deployment ownership.

## Keep control of the essentials

Agree ownership of the domain, hosting, source code and third-party accounts. Ask what documentation and training accompany the handover. A supplier should explain what another competent developer would need to continue the work.

Look for clear answers about limitations as well as capabilities. Guaranteed rankings, unsupported revenue claims or unexplained ownership restrictions deserve further questions.

## Compare like for like

Use the [budgeting guide](/blog/how-much-does-website-cost-south-africa) to separate scope from price. Then discuss your most important customer journey with the person responsible for delivery. You can [meet Pixaloom](/about) and review our [website design process](/services/website-design) before deciding whether the studio is a fit.`
  },
};
