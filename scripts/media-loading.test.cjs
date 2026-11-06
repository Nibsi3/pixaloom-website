const { test } = require('node:test');
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
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, filename);
};
require.extensions['.css'] = (module) => { module.exports = {}; };

test('decorative hero renders a poster and keyboard control without starting a video request', () => {
  const { CinematicBackgroundVideo } = require('../components/cinematic-background-video.tsx');
  const html = renderToStaticMarkup(React.createElement(CinematicBackgroundVideo));
  const video = html.match(/<video\b[^>]*>/)?.[0];
  assert.ok(video);
  assert.match(video, /poster="\/optimized\/[^\"]+\.webp"/);
  assert.match(video, /preload="none"/);
  assert.doesNotMatch(video, /\s(?:src|autoplay)=/);
  assert.match(html, /<button[^>]*type="button"[^>]*aria-label="Play animation"[^>]*aria-pressed="false"/);
  assert.match(html, /<\/video><\/div><button/, 'The motion control must be outside the decorative aria-hidden wrapper.');
});

test('capability previews provide responsive candidates without eagerly rendering the full-size dialog', () => {
  const { CapabilityCapture } = require('../components/capability-capture.tsx');
  const html = renderToStaticMarkup(React.createElement(CapabilityCapture, {
    src: '/capabilities/illumi-paygate-enhanced.png', caption: 'Payment workflow', width: 1893, height: 1000,
  }));
  assert.match(html, /loading="lazy"/);
  assert.match(html, /srcSet="/);
  assert.match(html, /sizes="/);
  assert.equal((html.match(/<img\b/g) ?? []).length, 1);
  assert.doesNotMatch(html, /<dialog\b/);
  assert.match(html, /aria-haspopup="dialog"/);
});
