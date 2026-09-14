'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/events';
import { estimateBriefFromParams } from '@/lib/website-cost';
import { contactUnavailable } from '@/lib/contact';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function InquiryForm({ rescue = false }: { rescue?: boolean }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contact', { signal: controller.signal, cache: 'no-store' })
      .then(response => response.json()).then(result => setAvailable(result.available === true)).catch(() => undefined);
    const brief = estimateBriefFromParams(new URLSearchParams(window.location.search));
    if (brief && messageRef.current) messageRef.current.value = brief;
    return () => controller.abort();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');
    trackEvent('enquiry_submit');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(20000),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your enquiry could not be sent.');
      form.reset();
      setStatus('sent');
    } catch (caught) {
      trackEvent('enquiry_error');
      setStatus('error');
      setError(caught instanceof Error && caught.name !== 'TimeoutError' ? caught.message : 'Delivery could not be confirmed. Please contact us directly before resending.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={30} />
        <h3>Brief sent.</h3>
        <p>Our email service accepted your brief. We’ll review it and reply as soon as possible. If you do not hear back, please contact us directly.</p>
        <button type="button" className="text-link" onClick={() => setStatus('idle')}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackEvent('enquiry_start'); } }}>
      {available === false ? <p className="form-error" role="status">{contactUnavailable} <a href="mailto:info@pixaloom.co.za">Email your brief</a> or <a href="https://wa.me/27662995533">use WhatsApp</a>.</p> : null}
      <div className="form-grid">
        <label><span>Name *</span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name" /></label>
        <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@company.co.za" /></label>
        {rescue ? <>
          <input type="hidden" name="service" value="AI Website & App Rescue" />
          <label><span>Platform or tool used *</span><input name="platform" required maxLength={80} placeholder="e.g. Lovable, Bolt, Replit or not sure" /></label>
          <label><span>Website or app URL</span><input name="appUrl" type="url" maxLength={500} placeholder="https://…" /></label>
        </> : <><label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+27 ..." /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Business or brand" /></label>
        <label><span>What do you need?</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design</option><option>Ecommerce website</option><option>SEO and content</option><option>Custom web application</option><option>Website care</option><option>AI rescue enquiry</option><option>Not sure yet</option></select></label>
        <label><span>Indicative budget</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>R10k–R25k</option><option>R25k–R50k</option><option>R50k–R100k</option><option>R100k+</option><option>Need guidance</option></select></label></>}
        <label className="span-2"><span>{rescue ? 'What is broken? *' : 'What outcome are you looking for? *'}</span><textarea ref={messageRef} name="message" required minLength={20} maxLength={3000} placeholder={rescue ? "Describe what fails and how to reproduce it. Redact any secrets." : "Tell us about the business, the problem and what success should look like."} /></label>
        {rescue ? <>
          <label className="span-2"><span>What should happen instead? *</span><textarea name="expected" required minLength={5} maxLength={1000} placeholder="Describe the expected result." /></label>
          <label><span>Error or screenshot link</span><input name="errorLink" type="url" maxLength={500} placeholder="Optional https:// link, with secrets removed" /></label>
          <label><span>Repository URL</span><input name="repository" type="url" maxLength={500} placeholder="Optional; private repositories are welcome" /></label>
          <label className="span-2"><span>Desired deadline</span><input name="deadline" maxLength={100} placeholder="Optional; timing is confirmed after review" /></label>
        </> : null}
        <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button button-dark form-submit" type="submit" disabled={status === 'sending' || available === false}>
        {status === 'sending' ? 'Sending…' : <>{rescue ? 'Get a free app diagnosis' : 'Send project brief'} <ArrowRight size={18} /></>}
      </button>
      {status === 'error' ? <p className="form-error" role="alert">{error} You can also email info@pixaloom.co.za.</p> : null}
      <p className="form-note">We use your details to respond to and manage your enquiry. Please do not include passwords or sensitive records. <Link href="/privacy">Read the privacy notice</Link>.</p>
    </form>
  );
}
