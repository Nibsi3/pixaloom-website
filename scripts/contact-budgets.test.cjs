const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText, filename);
};
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('Network disabled in local tests'); };
after(() => { globalThis.fetch = originalFetch; });
const { contactBudgetOptions, contactBudgetHelp } = require('../lib/contact-budgets.ts');
const { rescuePackages } = require('../lib/ai-rescue.ts');
const { validateContact } = require('../lib/contact.ts');
const { InquiryForm } = require('../components/inquiry-form.tsx');
const { WebsiteBuildFit } = require('../components/website-build-fit.tsx');
const email = require('../lib/email.ts');
const { POST } = require('../app/api/contact/route.ts');
const valid = { name: 'Local Test', email: 'test@example.com', message: 'A synthetic brief for a local mocked test.' };

function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  return [tree, ...React.Children.toArray(tree.props?.children).flatMap(nodes)];
}

// Exercise the actual component handlers with deterministic hook state. Effects
// are deliberately suppressed so readiness and analytics cannot reach a server.
function formHarness(t) {
  const state = [];
  let cursor = 0;
  t.mock.method(React, 'useState', initial => {
    const i = cursor++;
    if (!(i in state)) state[i] = initial;
    return [state[i], value => { state[i] = value; }];
  });
  t.mock.method(React, 'useRef', value => ({ current: value }));
  t.mock.method(React, 'useEffect', () => {});
  t.mock.method(React, 'useId', () => 'budget-help-test');
  return () => { cursor = 0; return InquiryForm({}); };
}
const field = (tree, name) => nodes(tree).find(node => node.props.name === name);

test('rescue choices share the package source and custom qualification stays intact', () => {
  assert.deepEqual(contactBudgetOptions('AI rescue enquiry'), [...rescuePackages.map(p => `${p.name} — ${p.price.startsWith('From ') ? p.price : `From ${p.price}`}`), 'Need guidance']);
  assert.deepEqual(contactBudgetOptions('Website design'), ['Under R5k', 'R5k-R10k', 'R10k-R25k', 'R25k-R50k', 'R50k-R100k', 'R100k+', 'Need guidance']);
  for (const service of ['Ecommerce website', 'Custom web application', 'Not sure yet']) assert.deepEqual(contactBudgetOptions(service), contactBudgetOptions('Website design'));
  for (const service of ['SEO and content', 'Website care']) assert.deepEqual(contactBudgetOptions(service), ['Need guidance']);
  assert.deepEqual(contactBudgetOptions(''), []);
  assert.match(contactBudgetHelp('Website design'), /R7,500–R12,500/);
});

test('switching services clears stale budgets in both directions and keeps native labels', t => {
  const render = formHarness(t);
  let tree = render();
  assert.equal(field(tree, 'budget').props.disabled, true);
  for (const service of ['Website design', 'AI rescue enquiry', 'Custom web application', 'Website care', 'AI rescue enquiry']) {
    field(tree, 'service').props.onChange({ target: { value: service } });
    tree = render();
    assert.equal(field(tree, 'budget').props.value, '');
    assert.equal(field(tree, 'budget').props.disabled, false);
    assert.deepEqual(nodes(field(tree, 'budget')).filter(n => n.type === 'option').slice(1).map(n => n.props.value), contactBudgetOptions(service));
    const description = nodes(tree).find(n => n.props.id === field(tree, 'budget').props['aria-describedby']);
    assert.equal(description.props.role, 'status');
    assert.ok(nodes(tree).some(n => n.type === 'label' && nodes(n).some(child => child.props.name === 'budget')));
    assert.ok(nodes(tree).some(n => n.type === 'label' && nodes(n).some(child => child.props.name === 'service')));
    const selected = contactBudgetOptions(service)[0];
    field(tree, 'budget').props.onChange({ target: { value: selected } });
    tree = render();
    assert.equal(field(tree, 'budget').props.value, selected);
  }
});

test('required fields, rescue diagnostics and accessible initial markup remain available', () => {
  const markup = renderToStaticMarkup(React.createElement(InquiryForm));
  assert.match(markup, /<input(?=[^>]*name="email")(?=[^>]*required)[^>]*>/);
  assert.match(markup, /name="message"[^>]*required[^>]*minLength="20"/);
  assert.match(markup, /name="budget"[^>]*disabled=""[^>]*aria-describedby=/);
  const rescue = renderToStaticMarkup(React.createElement(InquiryForm, { rescue: true }));
  assert.match(rescue, /name="service"[^>]*value="AI Website &amp; App Rescue"/);
  assert.match(rescue, /<input(?=[^>]*name="platform")(?=[^>]*required)[^>]*>/);
  assert.match(rescue, /name="expected"[^>]*required/);
  assert.doesNotMatch(rescue, /name="budget"/);
});

test('all new budgets reach the unchanged backend payload with mail fully mocked', async t => {
  const messages = [];
  t.mock.method(email, 'getEmailConfig', () => ({ test: true }));
  t.mock.method(email, 'sendEmail', async message => { messages.push(message); });
  t.mock.method(console, 'info', () => {});
  for (const service of ['AI rescue enquiry', 'Website design', 'SEO and content', 'Website care']) {
    for (const budget of [...contactBudgetOptions(service), '']) {
      const body = { ...valid, service, budget };
      assert.equal(validateContact(body).ok, true);
      const response = await POST(new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' }, body: JSON.stringify(body) }));
      assert.equal(response.status, 200);
      assert.ok(messages.at(-1).text.includes(`Service: ${service}`));
      assert.ok(messages.at(-1).text.includes(`Budget: ${budget || '-'}`));
    }
  }
  const count = messages.length;
  for (const change of [{ email: 'invalid' }, { message: 'short' }, { budget: 1490 }, { budget: 'x'.repeat(81) }]) {
    const response = await POST(new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...valid, ...change }) }));
    assert.equal(response.status, 400);
  }
  assert.equal(messages.length, count);
});

test('form success resets service and budget; failure retains the brief for correction', async t => {
  const render = formHarness(t);
  const entries = Object.entries({ ...valid, service: 'AI rescue enquiry', budget: contactBudgetOptions('AI rescue enquiry')[0] });
  t.mock.method(globalThis, 'FormData', function () { return { entries: () => entries }; });
  let accepted = false;
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url, payload: JSON.parse(options.body) });
    return Response.json(accepted ? { ok: true } : { error: 'Mock failure' }, { status: accepted ? 200 : 502 });
  });
  let tree = render();
  field(tree, 'service').props.onChange({ target: { value: 'AI rescue enquiry' } });
  tree = render();
  field(tree, 'budget').props.onChange({ target: { value: entries.at(-1)[1] } });
  tree = render();
  let resets = 0;
  const event = { preventDefault() {}, currentTarget: { reset() { resets++; } } };
  await tree.props.onSubmit(event);
  tree = render();
  assert.equal(field(tree, 'budget').props.value, entries.at(-1)[1]);
  assert.ok(nodes(tree).some(n => n.props.role === 'alert'));
  assert.equal(resets, 0);
  accepted = true;
  await tree.props.onSubmit(event);
  tree = render();
  assert.equal(tree.props.role, 'status');
  nodes(tree).find(n => n.type === 'button').props.onClick();
  tree = render();
  assert.equal(field(tree, 'service').props.value, '');
  assert.equal(field(tree, 'budget').props.value, '');
  assert.equal(resets, 1);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0].payload, Object.fromEntries(entries));
});

test('build guidance links existing evidence, qualifies price and distinguishes concepts', () => {
  const markup = renderToStaticMarkup(React.createElement(WebsiteBuildFit));
  for (const text of ['/work/paws-on-route', 'R7,500–R12,500', 'does not establish its original fee', 'simpler template site', '/ai-website-app-rescue']) assert.ok(markup.includes(text));
  const { serviceEvidence } = require('../lib/service-evidence.ts');
  assert.match(serviceEvidence['website-design'].paragraphs.join(' '), /Mineralis is a separate, self-initiated design for a fictional brand, not commissioned client work/);
});
