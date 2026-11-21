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
  return { ...context.exports, calls, beacons, context };
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
    const h = harness(host); h.trackEvent('whatsapp_click'); assert.equal(h.calls.length, 0); assert.equal(h.beacons.length, 0);
  }
});
test('page and contact counts survive a missing tracker and carry only fixed section names', async () => {
  const h = harness();
  delete h.context.window.plausible;
  const requests = [];
  h.context.fetch = async (...args) => requests.push(args);
  h.recordAction('page_view', '/locations/george');
  h.recordAction('page_view', '/blog/PRIVATE');
  h.recordAction('page_view', '/PRIVATE');
  h.trackEvent('enquiry_accepted');
  assert.deepEqual(requests.map(([, init]) => JSON.parse(init.body)), [
    { event: 'page_view', section: 'george' }, { event: 'page_view', section: 'blog' },
    { event: 'enquiry_accepted', section: 'contact' },
  ]);
  for (const [url, init] of requests) {
    assert.equal(url, '/api/events');
    assert.equal(init.credentials, 'omit');
    assert.equal(init.referrerPolicy, 'origin');
    assert.equal(init.keepalive, true);
  }
});
test('unavailable analytics never interrupts the enquiry journey', () => {
  assert.doesNotThrow(() => harness('www.pixaloom.co.za', true).trackEvent('enquiry_accepted'));
});
