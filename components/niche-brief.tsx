'use client';

import { useState } from 'react';
import { briefStatuses, buildNicheBrief, type BriefStatus, type NicheService } from '@/lib/niche-services';

export function NicheBrief({ name, checks }: Pick<NicheService, 'name' | 'checks'>) {
  const [selections, setSelections] = useState<Record<string, BriefStatus>>({});
  const [copyMessage, setCopyMessage] = useState('');
  const brief = buildNicheBrief({ name, checks }, selections);

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopyMessage('Brief copied. You can paste it into your enquiry.');
    } catch {
      setCopyMessage('Copy is unavailable here. Select and copy the brief below.');
    }
  }

  return <div className="niche-brief">
    <p>Mark what you have checked to prepare a useful project brief. Your selections stay on this page until you leave or reload; this tool does not submit an enquiry or inspect your website.</p>
    <fieldset><legend>Your planning checks</legend>{checks.map(check => <label key={check.id}>
      <span>{check.label}</span>
      <select value={selections[check.id] || 'unknown'} onChange={event => {
        setSelections(current => ({ ...current, [check.id]: event.target.value as BriefStatus }));
        setCopyMessage('');
      }}>{Object.entries(briefStatuses).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select>
    </label>)}</fieldset>
    <label className="niche-brief-output"><span>Your brief · self-reported, not audited</span><textarea readOnly value={brief} rows={13} /></label>
    <button className="button button-light" type="button" onClick={copyBrief}>Copy project brief</button>
    <p className="rescue-caption" role="status">{copyMessage}</p>
    <noscript><p>The checklist needs JavaScript to update. You can still read the checks and use the contact link to describe your project.</p></noscript>
  </div>;
}
