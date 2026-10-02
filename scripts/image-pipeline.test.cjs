const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const sharp = require('sharp');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const manifestPath = path.join(root, 'lib/generated-image-manifest.json');
assert.ok(fs.existsSync(manifestPath), 'Run npm run images:build before testing the image pipeline.');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

// Load the actual Next loader with the existing TypeScript compiler, without
// changing global require hooks or needing an additional test dependency.
const loaderPath = path.join(root, 'lib/image-loader.ts');
const loaderModule = new Module(loaderPath, module);
loaderModule.filename = loaderPath;
loaderModule.paths = Module._nodeModulePaths(path.dirname(loaderPath));
loaderModule._compile(ts.transpileModule(fs.readFileSync(loaderPath, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, loaderPath);
const imageLoader = loaderModule.exports.default;

test('every public raster source has responsive outputs that preserve its dimensions', async () => {
  const sources = fs.readdirSync(publicDir, { recursive: true })
    .filter(filename => !filename.startsWith(`optimized${path.sep}`) && /\.(png|jpe?g|webp)$/i.test(filename));
  assert.ok(sources.length > 0, 'The source scan must cover actual public images.');

  for (const filename of sources) {
    const source = await sharp(path.join(publicDir, filename)).metadata();
    if (!source.width || (source.pages ?? 1) > 1) continue;
    const src = `/${filename.split(path.sep).join('/')}`;
    const image = manifest[src];
    assert.ok(image, `${src} must appear in the generated manifest`);
    assert.match(image.hash, /^[a-f0-9]{20}$/, `${src} needs a content fingerprint`);
    assert.ok(image.widths.length > 0, `${src} needs at least one generated width`);
    const oriented = source.autoOrient ?? source;
    assert.equal(image.widths.at(-1), Math.min(oriented.width, 2048), `${src} must preserve its largest supported width`);

    for (const [index, width] of image.widths.entries()) {
      assert.ok(Number.isInteger(width) && width > 0, `${src} has a positive integer width`);
      if (index > 0) assert.ok(width > image.widths[index - 1], `${src} widths must be sorted without duplicates`);
      const output = path.join(publicDir, 'optimized', `${image.hash}-${width}.webp`);
      assert.ok(fs.existsSync(output), `${src} is missing its ${width}px output`);
      const result = await sharp(output).metadata();
      assert.equal(result.format, 'webp', `${output} must contain WebP bytes`);
      assert.equal(result.width, width, `${output} width must match the manifest and URL`);
      assert.ok(result.width <= oriented.width, `${output} must not upscale the source`);
      const expectedHeight = oriented.height * width / oriented.width;
      assert.ok(Math.abs(result.height - expectedHeight) <= 1, `${output} must preserve the source aspect ratio`);
    }
  }
});

test('the image loader selects the smallest sufficient output and caps at the source width', () => {
  for (const [src, image] of Object.entries(manifest)) {
    const output = width => `/optimized/${image.hash}-${width}.webp`;
    assert.equal(imageLoader({ src, width: 1 }), output(image.widths[0]));
    for (const [index, width] of image.widths.entries()) {
      assert.equal(imageLoader({ src, width }), output(width), `${src}: exact width ${width}`);
      if (index > 0) {
        const between = image.widths[index - 1] + 1;
        assert.equal(imageLoader({ src, width: between }), output(width), `${src}: round ${between} up to ${width}`);
      }
    }
    assert.equal(imageLoader({ src, width: 4096 }), output(image.widths.at(-1)), `${src}: cap at available width`);
  }
});

test('SVG, remote and unknown image sources pass through without broken generated URLs', () => {
  for (const src of ['/noise.svg', '/not-in-manifest.png', 'https://example.com/image.jpg']) {
    assert.equal(imageLoader({ src, width: 640, quality: 75 }), src);
  }
});

test('mobile portfolio outputs materially reduce downloaded bytes from the original PNGs', () => {
  for (const src of ['/work/nordflam.png', '/work/buildvolume.png']) {
    const original = fs.statSync(path.join(publicDir, src)).size;
    const optimized = fs.statSync(path.join(publicDir, imageLoader({ src, width: 640 }))).size;
    assert.ok(optimized < original * 0.5, `${src}: 640px WebP must be less than half of the original bytes (${optimized} vs ${original})`);
  }
});
