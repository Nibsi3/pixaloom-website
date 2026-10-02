import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const outputDir = path.join(publicDir, 'optimized');
const manifestPath = path.join(root, 'lib/generated-image-manifest.json');
const widths = [64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048];
const settings = { quality: 85, effort: 4 };
const recipe = JSON.stringify({ widths, settings, version: 1, sharp: sharp.versions.sharp });

async function collect(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === 'optimized') continue;
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collect(filename));
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) files.push(filename);
  }
  return files;
}

await fs.mkdir(outputDir, { recursive: true });
const manifest = {};
let created = 0;
for (const filename of await collect(publicDir)) {
  const source = await fs.readFile(filename);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || (metadata.pages ?? 1) > 1) continue;
  const hash = createHash('sha256').update(source).update(recipe).digest('hex').slice(0, 20);
  // rotate() applies EXIF orientation before resizing, which can swap axes.
  const orientedWidth = metadata.autoOrient?.width ?? metadata.width;
  const maxWidth = Math.min(orientedWidth, widths[widths.length - 1]);
  const sizes = [...new Set([...widths.filter((width) => width < maxWidth), maxWidth])];
  for (const width of sizes) {
    const destination = path.join(outputDir, `${hash}-${width}.webp`);
    try { await fs.access(destination); }
    catch {
      const buffer = await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp(settings).toBuffer();
      await fs.writeFile(destination, buffer);
      created += 1;
    }
  }
  manifest[`/${path.relative(publicDir, filename).split(path.sep).join('/')}`] = { hash, widths: sizes };
}
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Prepared ${Object.keys(manifest).length} responsive images (${created} new WebP files).`);
