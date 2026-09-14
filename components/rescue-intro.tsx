import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function RescueIntro() {
  return <section className="rescue-intro" aria-labelledby="rescue-intro-title"><div className="minimal-shell rescue-intro-grid">
    <p className="rescue-kicker">AI Website &amp; App Rescue</p>
    <div><h2 id="rescue-intro-title">Built it with AI?<br /><em>Let’s get it working.</em></h2>
      <p>Broken login, forms that fail or a deployment that never goes live? We help fix and finish existing websites and web apps built with tools like Lovable, Bolt and Replit.</p>
      <Link className="rescue-link" href="/ai-website-app-rescue">Get a free app diagnosis <ArrowUpRight size={18} /></Link>
    </div>
  </div></section>;
}
