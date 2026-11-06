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
globalThis.fetch = async () => { throw new Error('No live requests are permitted in form tests'); };
after(() => { globalThis.fetch = originalFetch; });
const { InquiryForm } = require('../components/inquiry-form.tsx');

function nodes(tree) {
  if (!tree || typeof tree !== 'object') return [];
  return [tree, ...React.Children.toArray(tree.props?.children).flatMap(nodes)];
}
function textContent(tree) {
  if (typeof tree === 'string' || typeof tree === 'number') return String(tree);
  if (!tree || typeof tree !== 'object') return '';
  return React.Children.toArray(tree.props?.children).map(textContent).join('');
}

function formHarness(t) {
  const states = [], refs = [], effects = [];
  let stateCursor = 0, refCursor = 0, resets = 0;
  const fields = { name: 'Test', email: 'test@example.com', message: 'A synthetic test enquiry that must never be sent.' };
  t.mock.method(React, 'useState', initial => {
    const i = stateCursor++;
    if (!(i in states)) states[i] = initial;
    return [states[i], value => { states[i] = value; }];
  });
  t.mock.method(React, 'useRef', initial => {
    const i = refCursor++;
    return refs[i] ||= { current: initial };
  });
  t.mock.method(React, 'useEffect', (callback, dependencies) => effects.push({ callback, dependencies }));
  t.mock.method(React, 'useId', () => 'submission-help');
  t.mock.method(React, 'useSyncExternalStore', (_subscribe, getSnapshot) => getSnapshot());
  t.mock.method(globalThis, 'FormData', function () {
    return { entries: () => Object.entries(fields) };
  });
  return {
    render() { stateCursor = 0; refCursor = 0; effects.length = 0; return InquiryForm({}); },
    flushStatusEffects() { effects.filter(effect => effect.dependencies?.length === 1).forEach(effect => effect.callback()); },
    event: { preventDefault() {}, currentTarget: { reset() { resets++; } } },
    fields,
    get resets() { return resets; },
  };
}

test('server-rendered forms cannot expose enquiry fields through native GET submission', () => {
  for (const rescue of [false, true]) {
    const markup = renderToStaticMarkup(React.createElement(InquiryForm, { rescue }));
    assert.match(markup, /<form[^>]*method="post"/);
    assert.match(markup, /<fieldset[^>]*disabled=""/);
    assert.match(markup, /<button(?=[^>]*type="submit")(?=[^>]*disabled="")[^>]*>/);
    assert.match(markup, /<noscript>.*mailto:info@pixaloom.co.za.*https:\/\/wa.me\/27662995533.*<\/noscript>/);
  }
});

test('submission is ignored until the client submit handler is ready', async t => {
  const fixture = formHarness(t);
  t.mock.method(React, 'useSyncExternalStore', (_subscribe, _getSnapshot, getServerSnapshot) => getServerSnapshot());
  let requests = 0;
  t.mock.method(globalThis, 'fetch', async () => { requests++; return Response.json({ ok: true }); });
  await fixture.render().props.onSubmit(fixture.event);
  assert.equal(requests, 0);
  assert.equal(fixture.resets, 0);
  assert.equal(nodes(fixture.render()).find(node => node.type === 'fieldset').props.disabled, true);
});

test('rapid repeated submits send only one enquiry before the first response', async t => {
  const fixture = formHarness(t);
  let resolveResponse;
  const response = new Promise(resolve => { resolveResponse = resolve; });
  let calls = 0;
  t.mock.method(globalThis, 'fetch', async () => { calls++; return response; });
  const initial = fixture.render();
  const first = initial.props.onSubmit(fixture.event);
  const second = initial.props.onSubmit(fixture.event);
  const pending = fixture.render();
  assert.equal(pending.props['aria-busy'], true);
  const editableFields = nodes(pending).find(node => node.props.className === 'form-grid');
  assert.equal(editableFields.type, 'fieldset', 'Pending values must be protected from edits that would be discarded after acceptance');
  assert.equal(editableFields.props.disabled, true);
  const third = pending.props.onSubmit(fixture.event);
  resolveResponse(Response.json({ ok: true }));
  await Promise.all([first, second, third]);
  assert.equal(calls, 1);
  assert.equal(fixture.resets, 1);
  assert.equal(fixture.render().props.role, 'status');
});

test('unchanged retries reuse an opaque send key; edits and a new enquiry get new keys', async t => {
  const fixture = formHarness(t);
  let accepted = false;
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    calls.push({ key: new Headers(options.headers).get('idempotency-key'), body: options.body });
    return Response.json(accepted ? { ok: true } : { ok: false, error: 'Delivery could not be confirmed.' }, { status: accepted ? 200 : 502 });
  });
  await fixture.render().props.onSubmit(fixture.event);
  await fixture.render().props.onSubmit(fixture.event);
  assert.match(calls[0].key, /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i);
  assert.equal(calls[0].key, calls[1].key);
  assert.equal(calls[0].body, calls[1].body);
  fixture.fields.message += ' An edited brief is a new send.';
  await fixture.render().props.onSubmit(fixture.event);
  assert.notEqual(calls[1].key, calls[2].key);
  accepted = true;
  await fixture.render().props.onSubmit(fixture.event);
  assert.equal(calls[2].key, calls[3].key);
  nodes(fixture.render()).find(node => node.type === 'button').props.onClick();
  await fixture.render().props.onSubmit(fixture.event);
  assert.notEqual(calls[3].key, calls[4].key);
});

test('malformed responses never accept an enquiry or expose parser errors', async t => {
  const fixture = formHarness(t);
  let response;
  t.mock.method(globalThis, 'fetch', async () => response);
  for (const value of [null, [], { ok: 'true' }, { ok: false, error: { internal: 'private diagnostics' } }, '<html>Upstream error</html>']) {
    response = typeof value === 'string' ? new Response(value, { status: 502 }) : Response.json(value);
    await fixture.render().props.onSubmit(fixture.event);
    const tree = fixture.render();
    const alert = nodes(tree).find(node => node.props.role === 'alert');
    assert.ok(alert, `Response ${JSON.stringify(value)} must not be accepted`);
    const text = textContent(alert);
    assert.match(text, /Delivery could not be confirmed/);
    assert.doesNotMatch(text, /Unexpected|JSON|Cannot read|private diagnostics|\[object Object\]/);
    assert.equal(fixture.resets, 0);
  }
});

test('a validated rejection keeps the correction message and does not clear the form', async t => {
  const fixture = formHarness(t);
  t.mock.method(globalThis, 'fetch', async () => Response.json({ ok: false, error: 'Please provide a valid name and email address.' }, { status: 400 }));
  await fixture.render().props.onSubmit(fixture.event);
  const tree = fixture.render();
  const alert = nodes(tree).find(node => node.props.role === 'alert');
  assert.match(textContent(alert), /Please provide a valid name and email address/);
  assert.equal(tree.props['aria-busy'], false);
  assert.equal(nodes(tree).find(node => node.props.className === 'form-grid').props.disabled, false);
  assert.equal(fixture.resets, 0);
});

test('a network timeout retains the brief and releases the sending lock for an explicit retry', async t => {
  const fixture = formHarness(t);
  let accepted = false;
  t.mock.method(globalThis, 'fetch', async () => {
    if (!accepted) throw new DOMException('A timeout including transport details', 'TimeoutError');
    return Response.json({ ok: true });
  });
  await fixture.render().props.onSubmit(fixture.event);
  const failed = fixture.render();
  assert.equal(fixture.resets, 0);
  assert.match(textContent(nodes(failed).find(node => node.props.role === 'alert')), /contact us directly before resending/);
  assert.equal(nodes(failed).find(node => node.type === 'button').props.disabled, false);
  accepted = true;
  await failed.props.onSubmit(fixture.event);
  assert.equal(fixture.resets, 1);
  assert.equal(fixture.render().props.role, 'status');
});

test('error and accepted feedback receive focus after the submission control changes', async t => {
  const fixture = formHarness(t);
  let accepted = false, focused = '';
  t.mock.method(globalThis, 'fetch', async () => Response.json(accepted ? { ok: true } : { ok: false, error: 'Please check the brief.' }, { status: accepted ? 200 : 400 }));
  await fixture.render().props.onSubmit(fixture.event);
  const error = nodes(fixture.render()).find(node => node.props.role === 'alert');
  assert.equal(error.props.tabIndex, -1);
  error.props.ref.current = { focus() { focused = 'error'; } };
  fixture.flushStatusEffects();
  assert.equal(focused, 'error');
  accepted = true;
  await fixture.render().props.onSubmit(fixture.event);
  const success = fixture.render();
  assert.equal(success.props.role, 'status');
  assert.equal(success.props.tabIndex, -1);
  success.props.ref.current = { focus() { focused = 'success'; } };
  fixture.flushStatusEffects();
  assert.equal(focused, 'success');
  nodes(success).find(node => node.type === 'button').props.onClick();
  const fresh = fixture.render();
  nodes(fresh).find(node => node.props.name === 'name').props.ref.current = { focus() { focused = 'name'; } };
  fixture.flushStatusEffects();
  assert.equal(focused, 'name');
});
