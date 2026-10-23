const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function harness(hostname = 'www.pixaloom.co.za', throwing = false) {
  const calls = [], beacons = [];
  const source = ts.transpileModule(fs.readFileSync(require.resolve('../lib/events.ts'), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const context = {
    exports: {},
    window: { location: { hostname, origin: `https://${hostname}`, pathname: '/contact', search: '?message=PRIVATE', hash: '#PRIVATE' },
      plausible: (...args) => { if (throwing) throw new Error('offline'); calls.push(args); } },
    navigator: { sendBeacon: (...args) => { if (throwing) throw new Error('offline'); beacons.push(args); return true; } },
  };
  vm.runInNewContext(source, context);
  return { ...context.exports, calls, beacons };
}

test('accepted enquiries and attempts are distinct and omit query/form data', () => {
  const h = harness();
  h.trackEvent('enquiry_submit'); h.trackEvent('enquiry_accepted');
  assert.deepEqual(h.calls.map(c => c[0]), ['enquiry_submit', 'enquiry_accepted']);
  assert.equal(h.calls[1][1].u, 'https://www.pixaloom.co.za/contact');
  assert.doesNotMatch(JSON.stringify([h.calls, h.beacons]), /PRIVATE|message=/);
  assert.ok(h.conversionEvents.includes('enquiry_accepted'));
});
test('preview and local hosts do not pollute production analytics', () => {
  for (const host of ['localhost', 'pixaloom-preview.workers.dev', 'www.pixaloom.co.za.evil.test']) {
    const h = harness(host); h.trackEvent('whatsapp_click'); assert.equal(h.calls.length, 0);
  }
});
test('unavailable analytics never interrupts the enquiry journey', () => {
  assert.doesNotThrow(() => harness('www.pixaloom.co.za', true).trackEvent('enquiry_accepted'));
});
