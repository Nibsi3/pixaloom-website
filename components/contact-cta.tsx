'use client';

import { useMemo, useState } from 'react';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const whatsappBase = 'https://wa.me/27662995533?text=';
const emailTo = 'info@pixaloom.co.za';

export function ContactCTA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const [focusedField, setFocusedField] = useState<
    'name' | 'email' | 'company' | 'budget' | 'message' | null
  >(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const submitLabel = status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send enquiry';
  const submitLabelEnabled = status === 'sent' ? 'Sent' : 'Send enquiry';

  const composed = useMemo(() => {
    const lines = [
      'Project enquiry',
      '',
      `Name: ${name || '-'}`,
      `Email: ${email || '-'}`,
      `Company: ${company || '-'}`,
      `Budget: ${budget || '-'}`,
      '',
      message ? `Message: ${message}` : 'Message: -',
    ];
    return lines.join('\n');
  }, [name, email, company, budget, message]);

  const mailHref = useMemo(() => {
    if (!emailTo) return '';
    const subject = encodeURIComponent('Website / Web App project enquiry');
    const body = encodeURIComponent(composed);
    return `mailto:${emailTo}?subject=${subject}&body=${body}`;
  }, [composed]);

  const waHref = useMemo(() => {
    const text = encodeURIComponent(composed);
    return whatsappBase + text;
  }, [composed]);

  const isValid = message.trim().length >= 10;
  const canSubmit = isValid && status !== 'sending';

  async function onSubmit() {
    if (!canSubmit) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name, email, company, budget, message }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setStatus('error');
        setError(json.error || 'Failed to send. Try WhatsApp instead.');
        return;
      }

      setStatus('sent');
      setName('');
      setEmail('');
      setCompany('');
      setBudget('');
      setMessage('');
    } catch {
      setStatus('error');
      setError('Failed to send. Try WhatsApp instead.');
    }
  }

  return (
    <>
      <Section
        id="contact"
        eyebrow="Lead capture"
        title="Let’s build something that converts"
        subtitle="Send a quick brief. I’ll reply with a plan, timeline, and options."
      >
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.22]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at center, rgba(16,24,40,0) 40%, rgba(16,24,40,0.78) 100%), linear-gradient(to top, rgba(16,24,40,0.45), rgba(16,24,40,0) 35%)',
            }}
          />

          <div className="relative z-10 grid gap-4 lg:grid-cols-12">
            <div className="rounded-lg border border-bg-700 bg-bg-900/70 p-5 backdrop-blur lg:col-span-7">
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm">
                  <div
                    className={`mb-1 text-xs text-fg-100 transition-transform duration-150 ${
                      focusedField === 'name' || name ? '-translate-y-1' : ''
                    }`}
                  >
                    Your name
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField((cur) => (cur === 'name' ? null : cur))}
                    className="w-full rounded-lg border border-bg-700 bg-bg-800/90 px-3 py-2 font-mono text-sm outline-none focus:border-accent-500"
                    placeholder="John"
                  />
                </label>

                <label className="text-sm">
                  <div
                    className={`mb-1 text-xs text-fg-100 transition-transform duration-150 ${
                      focusedField === 'email' || email ? '-translate-y-1' : ''
                    }`}
                  >
                    Email (optional)
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField((cur) => (cur === 'email' ? null : cur))}
                    className="w-full rounded-lg border border-bg-700 bg-bg-800/90 px-3 py-2 font-mono text-sm outline-none focus:border-accent-500"
                    placeholder="you@company.com"
                  />
                </label>

                <label className="text-sm">
                  <div
                    className={`mb-1 text-xs text-fg-100 transition-transform duration-150 ${
                      focusedField === 'company' || company ? '-translate-y-1' : ''
                    }`}
                  >
                    Company (optional)
                  </div>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setFocusedField('company')}
                    onBlur={() => setFocusedField((cur) => (cur === 'company' ? null : cur))}
                    className="w-full rounded-lg border border-bg-700 bg-bg-800/90 px-3 py-2 font-mono text-sm outline-none focus:border-accent-500"
                    placeholder="Business / Brand"
                  />
                </label>

                <label className="text-sm sm:col-span-2">
                  <div
                    className={`mb-1 text-xs text-fg-100 transition-transform duration-150 ${
                      focusedField === 'budget' || budget ? '-translate-y-1' : ''
                    }`}
                  >
                    Budget range
                  </div>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    onFocus={() => setFocusedField('budget')}
                    onBlur={() => setFocusedField((cur) => (cur === 'budget' ? null : cur))}
                    className="w-full rounded-lg border border-bg-700 bg-bg-800/90 px-3 py-2 text-sm outline-none focus:border-accent-500"
                  >
                    <option value="">Select…</option>
                    <option value="Under R5k">Under R5k</option>
                    <option value="R5k–R10k">R5k–R10k</option>
                    <option value="R10k–R25k">R10k–R25k</option>
                    <option value="R25k–R50k">R25k–R50k</option>
                    <option value="R50k+">R50k+</option>
                  </select>
                </label>

                <label className="text-sm sm:col-span-2">
                  <div
                    className={`mb-1 text-xs text-fg-100 transition-transform duration-150 ${
                      focusedField === 'message' || message ? '-translate-y-1' : ''
                    }`}
                  >
                    Project details
                  </div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField((cur) => (cur === 'message' ? null : cur))}
                    className="min-h-[120px] w-full resize-y rounded-lg border border-bg-700 bg-bg-800/90 px-3 py-2 font-mono text-sm outline-none focus:border-accent-500"
                    placeholder="What do you need built? Who is it for? Any deadline?"
                  />
                  <div className="mt-2 text-xs text-fg-300">
                    Tip: include your goal (leads, sales, bookings) and any examples you like.
                  </div>
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                {canSubmit ? (
                  <HoverBorderGradient
                    as="button"
                    containerClassName="rounded-full"
                    className="px-7 py-3 text-sm font-semibold"
                    onClick={onSubmit}
                  >
                    {submitLabelEnabled}
                  </HoverBorderGradient>
                ) : (
                  <Button
                    onClick={onSubmit}
                    variant="secondary"
                    size="md"
                    disabled={!canSubmit}
                    className="border-bg-700 bg-black/80 text-fg-300 disabled:opacity-100"
                  >
                    {submitLabel}
                  </Button>
                )}
                <InteractiveHoverButton href={waHref}>
                  WhatsApp
                </InteractiveHoverButton>
                {emailTo ? (
                  <InteractiveHoverButton href={mailHref}>
                    Email me
                  </InteractiveHoverButton>
                ) : null}
              </div>

              {status === 'sent' ? (
                <div className="mt-3 text-xs text-accent-500">Thanks — your enquiry was sent.</div>
              ) : null}

              {status === 'error' ? (
                <div className="mt-3 text-xs text-danger-500">{error}</div>
              ) : null}
            </div>

            <SpotlightCard className="h-full lg:col-span-5">
              <div className="text-sm font-semibold">What happens next</div>
              <div className="mt-4 space-y-3 text-sm text-fg-300">
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                  <div>I reply with questions + a quick scope</div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                  <div>You get a clear quote + timeline</div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                  <div>I ship an initial version fast, then iterate</div>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-bg-700 bg-bg-850/30 p-4">
                <div className="text-xs font-medium text-fg-200">Local advantage</div>
                <div className="mt-2 text-xs text-fg-300">
                  Based in George, Western Cape — great fit for South African businesses needing a
                  premium web presence.
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </Section>

      <div className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 rounded-2xl border border-bg-700 bg-bg-900/80 px-4 py-3 backdrop-blur">
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Need a developer?</div>
            <div className="truncate text-xs text-fg-300">Fast build · SEO · Lead-gen</div>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button href="#contact" variant="primary" size="sm">
              Quote
            </Button>
            <Button href={waHref} variant="secondary" size="sm">
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
