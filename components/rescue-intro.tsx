import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { rescueSpecialisms } from '@/lib/niche-services';

export function RescueIntro() {
  return <section className="rescue-intro" aria-labelledby="rescue-intro-title"><div className="minimal-shell rescue-intro-grid">
    <p className="rescue-kicker">AI Website &amp; App Rescue</p>
    <div><h2 id="rescue-intro-title">Finish it. Connect it.<br /><em>Work towards launch.</em></h2>
      <p>You have an AI-built website or app, but it is not ready to use. We assess what is missing, help connect login, data, payments and other services, and finish agreed work. Projects started with Lovable, Bolt, Replit and similar tools are assessed for fit and access before we promise changes.</p>
      <Link className="rescue-link" href="/ai-website-app-rescue">Get a free app diagnosis <ArrowUpRight size={18} /></Link>
      <div className="minimal-inline-links">{rescueSpecialisms.map(item => <Link className="rescue-link" key={item.path} href={item.path}>{item.name} <ArrowUpRight size={16} /></Link>)}</div>
    </div>
  </div></section>;
}
