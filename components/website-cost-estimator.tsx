'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { trackEvent } from '@/lib/events';
import {
  estimateWebsiteCost,
  estimateContactUrl,
  formatRand,
  formatRandRange,
  projectExtras,
  projectKinds,
  projectScales,
  type ProjectExtraId,
  type ProjectKindId,
  type ProjectScaleId,
} from '@/lib/website-cost';
import styles from './website-cost-estimator.module.css';

function costInCents(value: string) {
  if (value.trim() === '') return 0;
  const parts = /^(\d+)(?:[.,](\d{1,2}))?$/.exec(value.trim());
  if (!parts) return null;
  const cents = Number(parts[1] + (parts[2] ?? '').padEnd(2, '0'));
  return Number.isSafeInteger(cents) ? cents : null;
}

function FirstYearBudget({ min, max }: { min: number; max: number }) {
  const id = useId();
  const [monthly, setMonthly] = useState('');
  const [annual, setAnnual] = useState('');
  const monthlyCents = costInCents(monthly);
  const annualCents = costInCents(annual);
  const hasAmounts = monthly.trim() !== '' || annual.trim() !== '';
  const recurringCents = monthlyCents !== null && annualCents !== null ? monthlyCents * 12 + annualCents : null;
  let result = <p>Enter a cost to see the build allowance plus a year of running costs.</p>;
  if (recurringCents === null) {
    result = <p>Enter a non-negative amount in each filled field, for example 120 or 120.50.</p>;
  } else if (hasAmounts) {
    const firstYearMin = min * 100 + recurringCents;
    const firstYearMax = max * 100 + recurringCents;
    // Keep the result precise to one cent when converting back to rand for display.
    if (firstYearMax / 100 >= 2 ** 46) {
      result = <p>These amounts are too large to calculate accurately. Check both amounts.</p>;
    } else {
      result = <>
        <strong>First-year budget {formatRandRange(firstYearMin / 100, firstYearMax / 100)}</strong>
        <p>Includes the selected build and {formatRand(recurringCents / 100)} in running costs. That covers twelve monthly payments and one annual payment. VAT and any costs you leave out are excluded.</p>
      </>;
    }
  }

  return (
    <details className={styles.budget}>
      <summary>Calculate your first-year website budget</summary>
      <p id={id}>Add your own running costs in rand, excluding VAT. Enter each fee once. An empty field adds R0. Use digits and up to two decimal places.</p>
      <div className={styles.fields}>
        <label>Monthly costs (R)
          <input type="text" inputMode="decimal" autoComplete="off" value={monthly} aria-describedby={id} aria-invalid={monthlyCents === null} onChange={(event) => setMonthly(event.target.value)} />
          <span>For example, hosting, email or a care plan.</span>
        </label>
        <label>Annual costs (R)
          <input type="text" inputMode="decimal" autoComplete="off" value={annual} aria-describedby={id} aria-invalid={annualCents === null} onChange={(event) => setAnnual(event.target.value)} />
          <span>For example, domain renewal or annual software licences.</span>
        </label>
      </div>
      <div className={styles.budgetResult} aria-live="polite" aria-atomic="true">{result}</div>
    </details>
  );
}

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
        <p className="cost-result-kicker">Estimated build cost · South Africa</p>
        <p className="cost-result-figure">{formatRandRange(estimate.min, estimate.max)}</p>
        <p className="cost-result-time">Typical delivery {estimate.timeline} after discovery, depending on content, feedback and third-party access.</p>
        <p className="cost-result-copy">The build allowance includes your selected features. {kind === 'ecommerce' && 'One standard hosted payment integration is included. '}VAT where applicable, domains, hosting, email, software, transaction fees and ongoing care are separate.</p>
        <Link href={estimateContactUrl(kind, scale, extras)} onClick={() => trackEvent('estimate_quote_click')}>Get a scoped quote <ArrowUpRight size={15} /></Link>
      </div>
      <FirstYearBudget min={estimate.min} max={estimate.max} />
    </div>
  );
}
