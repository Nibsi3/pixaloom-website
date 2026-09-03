'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/events';
import {
  estimateWebsiteCost,
  estimateContactUrl,
  formatRandRange,
  projectExtras,
  projectKinds,
  projectScales,
  type ProjectExtraId,
  type ProjectKindId,
  type ProjectScaleId,
} from '@/lib/website-cost';

export function WebsiteCostEstimator() {
  const [kind, setKind] = useState<ProjectKindId>('business');
  const [scale, setScale] = useState<ProjectScaleId>('focused');
  const [extras, setExtras] = useState<ProjectExtraId[]>([]);
  const estimate = useMemo(() => estimateWebsiteCost(kind, scale, extras), [kind, scale, extras]);

  function toggleExtra(id: ProjectExtraId) {
    setExtras((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="cost-estimator">
      <fieldset className="cost-fieldset">
        <legend>What do you need?</legend>
        <div className="cost-choice-grid">
          {projectKinds.map((item) => (
            <button
              type="button"
              key={item.id}
              className="cost-choice"
              aria-pressed={kind === item.id}
              onClick={() => setKind(item.id)}
            >
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cost-fieldset">
        <legend>How large is the first useful version?</legend>
        <div className="cost-choice-grid cost-choice-grid-three">
          {projectScales.map((item) => (
            <button
              type="button"
              key={item.id}
              className="cost-choice"
              aria-pressed={scale === item.id}
              onClick={() => setScale(item.id)}
            >
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="cost-fieldset">
        <legend>Anything else the site has to do?</legend>
        <div className="cost-extra-row">
          {projectExtras.map((item) => (
            <button
              type="button"
              key={item.id}
              className="cost-chip"
              aria-pressed={extras.includes(item.id) || (kind === 'ecommerce' && item.id === 'payments')}
              disabled={kind === 'ecommerce' && item.id === 'payments'}
              onClick={() => toggleExtra(item.id)}
            >
              <strong>{item.label}</strong>
              <span>{kind === 'ecommerce' && item.id === 'payments' ? 'Standard integration included in store base' : item.hint}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="cost-result" aria-live="polite">
        <p className="cost-result-kicker">Planning range · South Africa · 2026</p>
        <p className="cost-result-figure">{formatRandRange(estimate.min, estimate.max)}</p>
        <p className="cost-result-copy">{estimate.summary}</p>
        <p className="cost-result-time">Typical delivery {estimate.timeline} after discovery, depending on content, feedback and third-party access.</p>
        <p className="cost-result-time">Build allowances exclude VAT where applicable, domains, hosting, email, software subscriptions, payment fees and ongoing care. Final scope, tax treatment, content responsibilities and timelines are confirmed in writing.</p>
        <Link href={estimateContactUrl(kind, scale, extras)} onClick={() => trackEvent('estimate_quote_click')}>Get a scoped quote <ArrowUpRight size={15} /></Link>
      </div>
    </div>
  );
}
