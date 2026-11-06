const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const resolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return resolve.call(this, request.startsWith('@/') ? path.join(root, request.slice(2)) : request, parent, ...rest);
};
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } }).outputText, filename);
};
const nativeFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('External network requests are disabled in contact tests'); };
after(() => { globalThis.fetch = nativeFetch; });
const { POST } = require('../app/api/contact/route.ts');
const key = 'd77e2300-68f9-4a87-86ac-03f3a44e82b6';
const valid = { name: 'Synthetic Person', email: 'synthetic@example.com', message: 'A local fixture for a complete enquiry that is never delivered.' };
const request = (data = valid, id = key, type = 'application/json') => new Request('https://www.pixaloom.co.za/api/contact', {
  method: 'POST', headers: { 'Content-Type': type, Origin: 'https://www.pixaloom.co.za', ...(id === undefined ? {} : { 'Idempotency-Key': id }) }, body: JSON.stringify(data),
});

function providerHarness(t) {
  const values = { BYTESEND_API_KEY: 'fixture-only', BYTESEND_BASE_URL: undefined, BYTESEND_FROM: undefined };
  const previous = Object.fromEntries(Object.keys(values).map(name => [name, process.env[name]]));
  for (const [name, value] of Object.entries(values)) value === undefined ? delete process.env[name] : process.env[name] = value;
  t.after(() => { for (const [name, value] of Object.entries(previous)) value === undefined ? delete process.env[name] : process.env[name] = value; });
  const calls = [], logs = [];
  t.mock.method(console, 'error', value => logs.push(value));
  t.mock.method(console, 'info', value => logs.push(value));
  return { calls, logs };
}

test('ambiguous provider failure explains uncertainty and never retries automatically', async t => {
  const fixture = providerHarness(t);
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    fixture.calls.push(options);
    // The provider can accept a send before its response is lost.
    throw new TypeError('fixture provider accepted, response connection lost');
  });
  const response = await POST(request());
  assert.equal(response.status, 502);
  const result = await response.json();
  assert.match(result.error, /Delivery could not be confirmed/);
  assert.match(result.error, /before resending/);
  assert.equal(fixture.calls.length, 1);
  assert.doesNotMatch(fixture.logs.join(' '), /fixture-only|synthetic@example|Synthetic Person|connection lost/);
});

test('JSON media types and header-control input are validated before the provider is contacted', async t => {
  const fixture = providerHarness(t);
  t.mock.method(globalThis, 'fetch', async () => { fixture.calls.push(1); return Response.json({ emailId: 'fixture-id' }); });
  for (const type of ['application/jsonp', 'text/plain; ignored=application/json', 'application/json-extra']) {
    assert.equal((await POST(request(valid, key, type))).status, 415);
  }
  for (const data of [{ ...valid, name: 'Name\u0000Control' }, { ...valid, email: 'syn\u0000thetic@example.com' }, { ...valid, name: 'Name\u007fControl' }]) {
    assert.equal((await POST(request(data))).status, 400);
  }
  assert.equal(fixture.calls.length, 0);
  assert.equal((await POST(request(valid, key, 'Application/JSON; charset=UTF-8'))).status, 200);
  assert.equal(fixture.calls.length, 1);
});

test('invalid request keys are rejected and legacy callers remain supported without a false dedupe claim', async t => {
  const fixture = providerHarness(t);
  t.mock.method(globalThis, 'fetch', async (_url, options) => { fixture.calls.push(options); return Response.json({ emailId: 'fixture-id' }); });
  for (const id of ['', 'synthetic@example.com', 'x'.repeat(300), 'd77e2300-68f9-0a87-86ac-03f3a44e82b6']) {
    assert.equal((await POST(request(valid, id))).status, 400);
  }
  assert.equal(fixture.calls.length, 0);
  const legacy = new Request('https://www.pixaloom.co.za/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(valid) });
  assert.equal((await POST(legacy)).status, 200);
  assert.equal(new Headers(fixture.calls[0].headers).get('idempotency-key'), null);
});

test('parallel sends and replay use the documented ByteSend key contract with identical provider bodies', async t => {
  const fixture = providerHarness(t);
  let release;
  const pending = new Promise(resolve => { release = resolve; });
  const inFlight = new Set(), accepted = new Map();
  let sends = 0;
  // A local contract fixture, not proof of the running cloud provider version.
  t.mock.method(globalThis, 'fetch', async (_url, options) => {
    const id = new Headers(options.headers).get('idempotency-key');
    fixture.calls.push({ id, body: options.body });
    assert.equal(id, `pixaloom-enquiry-${key}`);
    const previous = accepted.get(id);
    if (previous) return previous === options.body ? Response.json({ emailId: 'fixture-id' }) : Response.json({ error: { code: 'NOT_UNIQUE' } }, { status: 409 });
    if (inFlight.has(id)) return Response.json({ error: { code: 'NOT_UNIQUE' } }, { status: 409 });
    inFlight.add(id); sends++;
    await pending;
    accepted.set(id, options.body); inFlight.delete(id);
    return Response.json({ emailId: 'fixture-id' });
  });
  const first = POST(request());
  // Wait for the first mocked send to reach the provider before contention.
  for (let attempt = 0; !fixture.calls.length && attempt < 50; attempt++) await new Promise(resolve => setImmediate(resolve));
  assert.equal(fixture.calls.length, 1);
  const second = await POST(request());
  assert.equal(second.status, 502);
  assert.match((await second.json()).error, /before resending/);
  release();
  assert.equal((await first).status, 200);
  assert.equal((await POST(request())).status, 200);
  assert.equal(sends, 1);
  assert.equal(new Set(fixture.calls.map(call => call.body)).size, 1);
  assert.equal((await POST(request({ ...valid, message: valid.message + ' Changed.' }))).status, 502);
  assert.equal(sends, 1);
  assert.doesNotMatch(fixture.logs.join(' '), /fixture-only|synthetic@example|Synthetic Person|d77e2300/);
});

test('native fetch deadlines cover a provider that never returns headers or stalls its JSON body', async t => {
  const originalTimeout = AbortSignal.timeout;
  for (const mode of ['headers', 'body']) await t.test(mode, { timeout: 3000 }, async child => {
    const fixture = providerHarness(child);
    const server = http.createServer((_req, res) => {
      if (mode === 'body') { res.writeHead(200, { 'Content-Type': 'application/json' }); res.write('{"emailId":'); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    child.after(() => { server.closeAllConnections(); server.close(); });
    const port = server.address().port;
    const deadlines = [];
    child.mock.method(AbortSignal, 'timeout', milliseconds => { deadlines.push(milliseconds); return originalTimeout(80); });
    child.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(url, 'https://bytesend.cloud/api/v1/emails');
      fixture.calls.push(options);
      return nativeFetch(`http://127.0.0.1:${port}`, options);
    });
    const response = await POST(request());
    assert.equal(response.status, 502);
    assert.match((await response.json()).error, /Delivery could not be confirmed/);
    assert.deepEqual(deadlines, [10000]);
    assert.equal(fixture.calls.length, 1);
  });
});
