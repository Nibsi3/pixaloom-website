import Link from 'next/link';
import { estimateWebsiteCost, formatRandRange } from '@/lib/website-cost';

const focusedBusiness = estimateWebsiteCost('business', 'focused', []);

export function WebsiteBuildFit() {
  return (
    <section className="content-section">
      <div className="site-container content-grid">
        <div>
          <p className="eyebrow">Is a custom build the right fit?</p>
          <h2>What a five-page website includes.</h2>
          <p className="service-budget">Budget {formatRandRange(focusedBusiness.min, focusedBusiness.max)} for a focused custom build. Optional features, VAT where applicable and recurring costs are separate.</p>
          <Link className="text-link" href="/website-cost#five-page-website">Compare five-page website costs and scope</Link>
        </div>
        <div className="body-copy">
          <h3>Help a customer find the right service</h3>
          <p>On the <Link href="/work/paws-on-route">Paws On Route WordPress website</Link>, a pet owner in George can check daycare fees and message the team to ask about availability. For a trades or professional services site, the same page should explain what is included and tell customers what to send when they request a quote.</p>
          <p>For your build, we agree the page structure, shape the service information, design the mobile and desktop layouts and test the enquiry flow. The quote names who supplies the copy and images and what is needed for any booking system, payment or other integration.</p>
          <h3>Choose the amount of work you need</h3>
          <p>A custom build makes sense when several services need explaining, existing pages need careful migration, or your team needs a considered content and enquiry structure. If you only need a small brochure with ready-to-use content, a simpler template site may be enough. Bring that brief so we can discuss the smaller scope before you budget for a full build.</p>
          <p><Link href="/custom-website-vs-website-builder">Compare custom websites and DIY builders</Link> to decide which approach fits your content and enquiry needs.</p>
          <p>For a new build, bring your priority services, existing URL, available content and the action you want visitors to take. If an existing AI-built site is mostly complete and has a specific fault, see <Link href="/ai-website-app-rescue">AI website and app repair</Link>.</p>
        </div>
      </div>
    </section>
  );
}
