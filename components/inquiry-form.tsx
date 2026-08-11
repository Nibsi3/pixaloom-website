'use client';

import { FormEvent, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function InquiryForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus('sending');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || 'Your enquiry could not be sent.');
      form.reset();
      setStatus('sent');
    } catch (caught) {
      setStatus('error');
      setError(caught instanceof Error ? caught.message : 'Your enquiry could not be sent.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={30} />
        <h3>Brief received.</h3>
        <p>Thanks. We’ll review it and reply as soon as possible.</p>
        <button type="button" className="text-link" onClick={() => setStatus('idle')}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-grid">
        <label><span>Name *</span><input name="name" autoComplete="name" required maxLength={80} placeholder="Your name" /></label>
        <label><span>Work email *</span><input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="you@company.co.za" /></label>
        <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+27 ..." /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Business or brand" /></label>
        <label><span>What do you need?</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Website design</option><option>Ecommerce website</option><option>SEO and content</option><option>Custom web application</option><option>Website care</option><option>Not sure yet</option></select></label>
        <label><span>Indicative budget</span><select name="budget" defaultValue=""><option value="" disabled>Select a range</option><option>R10k–R25k</option><option>R25k–R50k</option><option>R50k–R100k</option><option>R100k+</option><option>Need guidance</option></select></label>
        <label className="span-2"><span>What outcome are you looking for? *</span><textarea name="message" required minLength={20} maxLength={3000} placeholder="Tell us about the business, the problem and what success should look like." /></label>
        <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button button-dark form-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : <>Send project brief <ArrowRight size={18} /></>}
      </button>
      {status === 'error' ? <p className="form-error" role="alert">{error} You can also email info@pixaloom.co.za.</p> : null}
      <p className="form-note">No hard sell. Your details are only used to respond to this enquiry.</p>
    </form>
  );
}
