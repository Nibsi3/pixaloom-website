'use client';

import { FormEvent, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/events';
import { estimateBriefFromParams } from '@/lib/website-cost';
import { contactDeliveryUnconfirmed, contactUnavailable } from '@/lib/contact';
import { contactBudgetHelp, contactBudgetOptions } from '@/lib/contact-budgets';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type Status = 'idle' | 'sending' | 'sent' | 'error';
const subscribeToHydration = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export function InquiryForm({ rescue = false }: { rescue?: boolean }) {
  // Native form submission must stay unavailable until the JSON submit handler
  // is attached. Otherwise a slow or absent script can put a brief in the URL.
  const hydrated = useSyncExternalStore(subscribeToHydration, clientReady, serverReady);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const budgetHelpId = useId();
  const [available, setAvailable] = useState<boolean | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);
  const submitting = useRef(false);
  const submission = useRef<{ body: string; key: string } | null>(null);
  const focusNewEnquiry = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contact', { signal: controller.signal, cache: 'no-store' })
      .then(response => response.json()).then(result => setAvailable((result as { available?: boolean }).available === true)).catch(() => undefined);
    const brief = estimateBriefFromParams(new URLSearchParams(window.location.search));
    if (brief && messageRef.current) messageRef.current.value = brief;
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (status === 'sent') successRef.current?.focus();
    if (status === 'error') errorRef.current?.focus();
    if (status === 'idle' && focusNewEnquiry.current) {
      nameRef.current?.focus();
      focusNewEnquiry.current = false;
    }
  }, [status]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // State updates are batched; a ref also blocks a second submit event before
    // React has disabled the button or rendered the next frame.
    if (!hydrated || submitting.current || available === false) return;
    submitting.current = true;
    const form = event.currentTarget;
    let rejectionMessage = '';
    setError('');
    trackEvent('enquiry_submit');

    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const body = JSON.stringify(data);
      // Keep one opaque key for an unchanged manual retry. No form contents or
      // identifiers are persisted to browser storage or included in analytics.
      if (!submission.current || submission.current.body !== body) submission.current = { body, key: crypto.randomUUID() };
      // Capture FormData before disabling the fieldset, because disabled inputs
      // are omitted from FormData. Keep that snapshot visible until completion.
      setStatus('sending');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'idempotency-key': submission.current.key },
        body,
        signal: AbortSignal.timeout(20000),
      });
      const result: unknown = await response.json();
      if (!result || typeof result !== 'object' || !('ok' in result) || typeof result.ok !== 'boolean') {
        throw new Error('Invalid enquiry response');
      }
      if (!response.ok || !result.ok) {
        if ('error' in result && typeof result.error === 'string') rejectionMessage = result.error.trim();
        throw new Error('Enquiry rejected');
      }
      trackEvent('enquiry_accepted');
      form.reset();
      submission.current = null;
      setService('');
      setBudget('');
      setStatus('sent');
    } catch {
      trackEvent('enquiry_error');
      setStatus('error');
      setError(rejectionMessage || contactDeliveryUnconfirmed);
    } finally {
      submitting.current = false;
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success" role="status" ref={successRef} tabIndex={-1}>
        <CheckCircle2 size={30} />
        <h3>Brief sent.</h3>
        <p>Our email service accepted your brief. We’ll review it and reply as soon as possible. If you do not hear back, please contact us directly.</p>
        <button type="button" className="text-link" onClick={() => { focusNewEnquiry.current = true; setStatus('idle'); }}>Send another enquiry</button>
      </div>
    );
  }

  return (
    <form className="inquiry-form" method="post" aria-busy={status === 'sending'} onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; trackEvent('enquiry_start'); } }}>
      <noscript><p className="form-error">JavaScript is disabled. <a href="mailto:info@pixaloom.co.za">Email your brief</a> or <a href="https://wa.me/27662995533">contact us on WhatsApp</a>.</p></noscript>
      {available === false ? <p className="form-error" role="status">{contactUnavailable} <a href="mailto:info@pixaloom.co.za">Email your brief</a> or <a href="https://wa.me/27662995533">use WhatsApp</a>.</p> : null}
      <fieldset className="form-grid" disabled={!hydrated || status === 'sending'} style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}>
        <legend className="sr-only">Your project details</legend>
        <label><span>Name *</span><input ref={nameRef} name="name" autoComplete="name" required maxLength={80} placeholder="Your name" /></label>
        <label><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={120} placeholder="Your email address" /></label>
        {rescue ? <>
          <input type="hidden" name="service" value="AI Website & App Rescue" />
          <label><span>Platform or tool used *</span><input name="platform" required maxLength={80} placeholder="e.g. Lovable, Bolt, Replit or not sure" /></label>
          <label><span>Website or app URL</span><input name="appUrl" type="url" maxLength={500} placeholder="https://…" /></label>
        </> : <><label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+27 ..." /></label>
        <label><span>Company</span><input name="company" autoComplete="organization" maxLength={120} placeholder="Business or brand" /></label>
        <label><span>What do you need?</span><select name="service" value={service} onChange={event => { setService(event.target.value); setBudget(''); }}><option value="" disabled>Select a service</option><option>Website design</option><option>Ecommerce website</option><option>SEO and content</option><option>Custom web application</option><option>Website care</option><option>AI rescue enquiry</option><option>Not sure yet</option></select></label>
        <label><span>Indicative budget</span><select name="budget" value={budget} disabled={!service} aria-describedby={budgetHelpId} onChange={event => setBudget(event.target.value)}><option value="" disabled>{service ? 'Select a budget option' : 'Choose a service first'}</option>{contactBudgetOptions(service).map(option => <option key={option} value={option}>{option}</option>)}</select></label>
        <div className="span-2"><p className="service-budget" id={budgetHelpId} role="status">{service ? 'Budget options updated for your service. ' : ''}{contactBudgetHelp(service)}</p>{service === 'AI rescue enquiry' ? <Link className="text-link" href="/ai-website-app-rescue">Compare rescue package scope</Link> : null}</div></>}
        <label className="span-2"><span>{rescue ? 'What is broken? *' : 'What website do you need? *'}</span><textarea ref={messageRef} name="message" required minLength={20} maxLength={3000} placeholder={rescue ? "Describe what fails and how to reproduce it. Redact any secrets." : "Tell us what your business does and whether you need a new website, online store or redesign. A few sentences are enough."} /></label>
        {rescue ? <>
          <label className="span-2"><span>What should happen instead? *</span><textarea name="expected" required minLength={5} maxLength={1000} placeholder="Describe the expected result." /></label>
          <label><span>Error or screenshot link</span><input name="errorLink" type="url" maxLength={500} placeholder="Optional https:// link, with secrets removed" /></label>
          <label><span>Repository URL</span><input name="repository" type="url" maxLength={500} placeholder="Optional; private repositories are welcome" /></label>
          <label className="span-2"><span>Desired deadline</span><input name="deadline" maxLength={100} placeholder="Optional; timing is confirmed after review" /></label>
        </> : null}
        <label className="honeypot" aria-hidden="true"><span>Website</span><input name="website" tabIndex={-1} autoComplete="off" /></label>
      </fieldset>
      <button className="button button-dark form-submit" type="submit" disabled={!hydrated || status === 'sending' || available === false}>
        {status === 'sending' ? 'Sending…' : <>{rescue ? 'Get a free app diagnosis' : 'Ask about my website'} <ArrowRight size={18} /></>}
      </button>
      {status === 'error' ? <p className="form-error" role="alert" ref={errorRef} tabIndex={-1}>{error} You can also <a href="mailto:info@pixaloom.co.za">email your brief</a>.</p> : null}
      <p className="form-note">We use your details to respond to and manage your enquiry. Please do not include passwords or sensitive records. <Link href="/privacy">Read the privacy notice</Link>.</p>
    </form>
  );
}
