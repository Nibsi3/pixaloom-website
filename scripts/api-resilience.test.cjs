const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
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
const originalFetch = globalThis.fetch;
globalThis.fetch = async () => { throw new Error('Unexpected network request in API test'); };
after(() => { globalThis.fetch = originalFetch; });

const { readRequestText, RequestBodyError } = require('../lib/request-body.ts');
const events = require('../app/api/events/route.ts');
const weather = require('../app/api/weather/route.ts');
const joke = require('../app/api/joke/route.ts');
const github = require('../app/api/github/route.ts');
const request = body => new Request('https://www.pixaloom.co.za/api/events', {
  method: 'POST', body, duplex: 'half', headers: { Origin: 'https://www.pixaloom.co.za' },
});
const encoder = new TextEncoder();
const failureStatus = status => error => error instanceof RequestBodyError && error.status === status;

test('request reader counts bytes and preserves UTF-8 split across chunks', async () => {
  const bytes = encoder.encode('café');
  const stream = new ReadableStream({ start(controller) {
    controller.enqueue(bytes.slice(0, 4));
    controller.enqueue(bytes.slice(4));
    controller.close();
  } });
  assert.equal(await readRequestText(request(stream), { maxBytes: 5 }), 'café');
  await assert.rejects(readRequestText(request('café'), { maxBytes: 4 }), failureStatus(413));
});

test('request reader does not wait for a stalled producer cancellation', async () => {
  let cancelled = false;
  const stream = new ReadableStream({
    start(controller) { controller.enqueue(encoder.encode('oversized')); },
    cancel() { cancelled = true; return new Promise(() => {}); },
  });
  await assert.rejects(readRequestText(request(stream), { maxBytes: 2, timeoutMs: 100 }), failureStatus(413));
  assert.equal(cancelled, true);
});

test('stalled request streams reach a deadline without leaking producer errors', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; throw new Error('PRIVATE PRODUCER'); } });
  await assert.rejects(readRequestText(request(stream), { maxBytes: 128, timeoutMs: 10 }), error => {
    assert.doesNotMatch(error.message, /PRIVATE/);
    return failureStatus(408)(error);
  });
  assert.equal(cancelled, true);
});

test('malformed, missing and interrupted request streams reject as client errors', async () => {
  await assert.rejects(readRequestText(request(null), { maxBytes: 128 }), failureStatus(400));
  const broken = new ReadableStream({ start(controller) { controller.error(new Error('PRIVATE READ ERROR')); } });
  await assert.rejects(readRequestText(request(broken), { maxBytes: 128 }), failureStatus(400));
  const truncatedUtf8 = new ReadableStream({ start(controller) { controller.enqueue(new Uint8Array([0xc3])); controller.close(); } });
  await assert.rejects(readRequestText(request(truncatedUtf8), { maxBytes: 128 }), failureStatus(400));
});

test('events handle stream errors and retain only the allowlisted event', async t => {
  const logs = [];
  t.mock.method(console, 'info', value => logs.push(value));
  const broken = new ReadableStream({ start(controller) { controller.error(new Error('PRIVATE')); } });
  const failed = await events.POST(request(broken));
  assert.equal(failed.status, 400);
  assert.equal(failed.headers.get('cache-control'), 'no-store');
  assert.equal(await failed.text(), '');
  assert.equal((await events.POST(request('null'))).status, 400);
  assert.equal((await events.POST(request('{"event":"unknown"}'))).status, 400);
  assert.equal((await events.POST(request('{"event":"email_click","private":"do not log"}'))).status, 204);
  assert.deepEqual(logs.map(JSON.parse), [{ event: 'email_click', source: 'website_action' }]);
});

function providerFixture(t, value, status = 200) {
  const calls = [];
  const deadlines = [];
  t.mock.method(AbortSignal, 'timeout', milliseconds => {
    deadlines.push(milliseconds);
    return new AbortController().signal;
  });
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url: String(url), options });
    return Response.json(value, { status });
  });
  return { calls, deadlines };
}

test('weather preserves zero values and bounds its upstream request', async t => {
  const fixture = providerFixture(t, { current: { temperature_2m: 0, wind_speed_10m: 0, weather_code: 0 } });
  const response = await weather.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, city: 'George, Western Cape', temperatureC: 0, windKmh: 0, weatherCode: 0 });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(fixture.deadlines, [8000]);
  assert.equal(fixture.calls[0].options.redirect, 'manual');
  assert.equal(fixture.calls[0].options.cache, 'no-store');
  assert.ok(fixture.calls[0].options.signal instanceof AbortSignal);
});

test('joke route returns only a usable string', async t => {
  const fixture = providerFixture(t, { error: false, type: 'single', joke: '  A programming joke.  ' });
  const response = await joke.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, joke: 'A programming joke.' });
  assert.deepEqual(fixture.deadlines, [8000]);
  assert.equal(fixture.calls[0].options.redirect, 'manual');
});

test('provider error payloads and wrong shapes are never reported as successful data', async t => {
  const cases = [
    [weather, [null, {}, { current: {} }, { current: { temperature_2m: '20', wind_speed_10m: 10, weather_code: 0 } }]],
    [joke, [null, {}, { error: true, joke: 'PRIVATE' }, { joke: {} }, { joke: ' ' }]],
    [github, [null, { message: 'PRIVATE' }, 'unexpected']],
  ];
  for (const [route, payloads] of cases) for (const payload of payloads) {
    t.mock.method(globalThis, 'fetch', async () => Response.json(payload));
    const response = await route.GET();
    assert.equal(response.status, 502);
    const body = await response.text();
    assert.equal(JSON.parse(body).ok, false);
    assert.doesNotMatch(body, /PRIVATE|unexpected/);
  }
});

test('GitHub activity tolerates omitted commits and malformed optional entries', async t => {
  const fixture = providerFixture(t, [null, 'invalid', { type: 'WatchEvent' }, {
    type: 'PushEvent', repo: { name: 'Nibsi3/example' }, created_at: '2026-11-06T10:00:00Z',
    payload: { commits: [null, { message: 12 }, { message: ' ' }, { message: ' one ' }, { message: 'two' }, { message: 'three' }, { message: 'four' }] },
  }, { type: 'PushEvent', repo: { name: 7 }, created_at: 'invalid', payload: { commits: {} } }]);
  const response = await github.GET();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, user: 'Nibsi3', items: [
    { repo: 'Nibsi3/example', createdAt: '2026-11-06T10:00:00Z', messages: ['one', 'two', 'three'] },
    { repo: 'unknown', createdAt: null, messages: [] },
  ] });
  assert.deepEqual(fixture.deadlines, [8000]);
  assert.equal(fixture.calls[0].options.redirect, 'manual');
});

test('upstream HTTP, JSON and timeout failures are generic and never leak provider responses', async t => {
  for (const route of [weather, joke, github]) for (const fixture of [
    async () => Response.json({ message: 'PRIVATE PROVIDER' }, { status: 429 }),
    async () => new Response('PRIVATE INVALID JSON'),
    async () => { throw new DOMException('PRIVATE TIMEOUT', 'TimeoutError'); },
  ]) {
    t.mock.method(globalThis, 'fetch', fixture);
    const response = await route.GET();
    assert.equal(response.status, 502);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.doesNotMatch(await response.text(), /PRIVATE/);
  }
});
