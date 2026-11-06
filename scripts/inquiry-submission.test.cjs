const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const React = require('react');
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

function formHarness(t) {
  const states = [], refs = [];
  let stateCursor = 0, refCursor = 0, resets = 0;
  t.mock.method(React, 'useState', initial => {
    const i = stateCursor++;
    if (!(i in states)) states[i] = initial;
    return [states[i], value => { states[i] = value; }];
  });
  t.mock.method(React, 'useRef', initial => {
    const i = refCursor++;
    return refs[i] ||= { current: initial };
  });
  t.mock.method(React, 'useEffect', () => {});
  t.mock.method(React, 'useId', () => 'submission-help');
  t.mock.method(globalThis, 'FormData', function () {
    return { entries: () => Object.entries({ name: 'Test', email: 'test@example.com', message: 'A synthetic test enquiry that must never be sent.' }) };
  });
  return {
    render() { stateCursor = 0; refCursor = 0; return InquiryForm({}); },
    event: { preventDefault() {}, currentTarget: { reset() { resets++; } } },
    get resets() { return resets; },
  };
}

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
  const third = pending.props.onSubmit(fixture.event);
  resolveResponse(Response.json({ ok: true }));
  await Promise.all([first, second, third]);
  assert.equal(calls, 1);
  assert.equal(fixture.resets, 1);
  assert.equal(fixture.render().props.role, 'status');
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
    const text = React.Children.toArray(alert.props.children).join('');
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
  assert.match(React.Children.toArray(alert.props.children).join(''), /Please provide a valid name and email address/);
  assert.equal(tree.props['aria-busy'], false);
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
  assert.match(React.Children.toArray(nodes(failed).find(node => node.props.role === 'alert').props.children).join(''), /contact us directly before resending/);
  assert.equal(nodes(failed).find(node => node.type === 'button').props.disabled, false);
  accepted = true;
  await failed.props.onSubmit(fixture.event);
  assert.equal(fixture.resets, 1);
  assert.equal(fixture.render().props.role, 'status');
});
