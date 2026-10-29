import Link from 'next/link';

export function WebsiteBuildFit({ local = false }: { local?: boolean }) {
  return (
    <section className="content-section">
      <div className="site-container content-grid">
        <div>
          <p className="eyebrow">Is a custom build the right fit?</p>
          <h2>{local ? 'A George service business, in practical terms.' : 'What the custom build allowance buys.'}</h2>
          <p className="service-budget">A focused five-page custom business website is planned at R7,500–R12,500. Optional features, VAT where applicable and recurring costs are separate; the written scope determines the quote.</p>
        </div>
        <div className="body-copy">
          <h3>Start with a real service journey</h3>
          <p><Link href="/work/paws-on-route">Paws On Route</Link> is a WordPress website for a George pet grooming and pet sitting business. The portfolio records service-led pages and call, WhatsApp and contact-form routes. Its saved October 2026 screenshots show the homepage, services and doggy-daycare information. This illustrates the work a visitor needs to do: understand the service and find the right way to enquire.</p>
          <p>For your build, we agree the page structure, shape the service information, design the mobile and desktop layouts, and check the enquiry journey. Search foundations, launch checks and handover are part of that scope. Content responsibilities and any booking system, payments or integrations need to be named in the quote. The Paws On Route example does not establish its original fee or a measured increase in bookings.</p>
          <h3>Choose the amount of work you need</h3>
          <p>A custom build makes sense when several services need explaining, existing pages need careful migration, or your team needs a considered content and enquiry structure. If you only need a small brochure with ready-to-use content, a simpler template site may be enough. Bring that brief so we can discuss the smaller scope before you budget for a full build.</p>
          <p>If an existing AI-built site is mostly complete and has a specific fault, <Link href="/ai-website-app-rescue">compare the rescue packages</Link>. Repair work has a different scope from designing a new website. For a build, bring your priority services, existing URL, available content and the action you want visitors to take.</p>
        </div>
      </div>
    </section>
  );
}
