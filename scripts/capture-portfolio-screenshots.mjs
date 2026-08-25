#!/usr/bin/env node
/**
 * Capture high-quality portfolio screenshots from live project sites.
 * Excludes nordflam + buildvolume (kept as-is by request).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, 'public');
const CHROME = process.env.CHROME_PATH || '/usr/local/bin/google-chrome';
// Real product is github.com/Nibsi3/caps-tutor — not www.capstutor.co.za.
const CAPS_TUTOR_BASE = process.env.CAPS_TUTOR_BASE || 'http://127.0.0.1:9002';

const VIEWPORT = { width: 1600, height: 1000, deviceScaleFactor: 2 };

/** @type {Record<string, { dir: string, cover?: string, shots: { name: string, url: string, fullPage?: boolean, waitMs?: number }[] }>} */
const PROJECTS = {
  illumi: {
    dir: 'pixa_pics/illumi',
    cover: 'work/illumi.png',
    shots: [
      { name: 'illumi-homepage.png', url: 'https://illumi.co.za/', waitMs: 2500 },
      { name: 'illumi-pricing.png', url: 'https://illumi.co.za/pricing', waitMs: 2000 },
      { name: 'illumi-features-invoicing.png', url: 'https://illumi.co.za/features/invoicing', waitMs: 2000 },
      { name: 'illumi-features-expenses.png', url: 'https://illumi.co.za/features/expenses', waitMs: 2000 },
      { name: 'illumi-features-clients.png', url: 'https://illumi.co.za/features/clients', waitMs: 2000 },
      { name: 'illumi-features-vault.png', url: 'https://illumi.co.za/features/vault', waitMs: 2000 },
      { name: 'illumi-story.png', url: 'https://illumi.co.za/story', waitMs: 2000 },
      { name: 'illumi-contact.png', url: 'https://illumi.co.za/contact', waitMs: 2000 },
      { name: 'illumi-free-invoice-templates.png', url: 'https://illumi.co.za/free-invoice-templates', waitMs: 2000 },
      { name: 'illumi-app-login.png', url: 'https://app.illumi.co.za/login', waitMs: 2500 },
    ],
  },
  capstutor: {
    dir: 'pixa_pics/capstutor',
    cover: 'work/capstutor.jpg',
    // Real product is Nibsi3/caps-tutor. Do not recapture www.capstutor.co.za.
    // Run a local checkout (default port 9002) or set CAPS_TUTOR_BASE.
    shots: [
      { name: 'capstutor-homepage.jpg', url: `${CAPS_TUTOR_BASE}/`, waitMs: 4000 },
      { name: 'capstutor-how-it-works.jpg', url: `${CAPS_TUTOR_BASE}/how-it-works`, waitMs: 2500 },
      { name: 'capstutor-subjects.jpg', url: `${CAPS_TUTOR_BASE}/all-subjects`, waitMs: 3000 },
      { name: 'capstutor-syllabus.jpg', url: `${CAPS_TUTOR_BASE}/caps-syllabus`, waitMs: 2500 },
      { name: 'capstutor-login.jpg', url: `${CAPS_TUTOR_BASE}/login`, waitMs: 2500 },
      { name: 'capstutor-register.jpg', url: `${CAPS_TUTOR_BASE}/register`, waitMs: 2500 },
      { name: 'capstutor-blog.jpg', url: `${CAPS_TUTOR_BASE}/blog`, waitMs: 2500 },
      { name: 'capstutor-news.jpg', url: `${CAPS_TUTOR_BASE}/news`, waitMs: 2500 },
      { name: 'capstutor-contact.jpg', url: `${CAPS_TUTOR_BASE}/contact`, waitMs: 2500 },
      { name: 'capstutor-exam-tips.jpg', url: `${CAPS_TUTOR_BASE}/exam-tips`, waitMs: 2500 },
    ],
  },
  pawsonroute: {
    dir: 'pixa_pics/pawsonroute',
    cover: 'work/pawsonroute.png',
    shots: [
      { name: 'pawsonroute-homepage.png', url: 'https://pawsonroute.co.za/', waitMs: 3000 },
      { name: 'pawsonroute-services.png', url: 'https://pawsonroute.co.za/services/', waitMs: 2500 },
      { name: 'pawsonroute-contact.png', url: 'https://pawsonroute.co.za/contact/', waitMs: 2500 },
      { name: 'pawsonroute-about.png', url: 'https://pawsonroute.co.za/about/', waitMs: 2500 },
      { name: 'pawsonroute-grooming.png', url: 'https://pawsonroute.co.za/pet-grooming/', waitMs: 2500 },
    ],
  },
  vicbay: {
    dir: 'pixa_pics/vicbay',
    cover: 'work/vicbay.png',
    shots: [
      { name: 'vicbay-homepage.png', url: 'https://vicbay.co.za/', waitMs: 3000 },
      { name: 'vicbay-shop.png', url: 'https://vicbay.co.za/shop/', waitMs: 3000 },
      { name: 'vicbay-catalogue.png', url: 'https://vicbay.co.za/product-catalogue/', waitMs: 2500 },
      { name: 'vicbay-about.png', url: 'https://vicbay.co.za/about-vic-bay/', waitMs: 2500 },
      { name: 'vicbay-contact.png', url: 'https://vicbay.co.za/contact/', waitMs: 2500 },
    ],
  },
  physiope: {
    dir: 'pixa_pics/physiope',
    cover: 'work/physiope.png',
    shots: [
      { name: 'physiope-homepage.png', url: 'https://physiope.co.za/', waitMs: 3000 },
      { name: 'physiope-about.png', url: 'https://physiope.co.za/about/', waitMs: 2500 },
      { name: 'physiope-services.png', url: 'https://physiope.co.za/services/', waitMs: 2500 },
      { name: 'physiope-contact.png', url: 'https://physiope.co.za/contact/', waitMs: 2500 },
    ],
  },
  kikay: {
    dir: 'pixa_pics/kikay',
    cover: 'work/kikay.png',
    shots: [
      { name: 'kikay-homepage.png', url: 'https://kikay.co.za/', waitMs: 3000 },
      { name: 'kikay-about.png', url: 'https://kikay.co.za/about/', waitMs: 2500 },
      { name: 'kikay-services.png', url: 'https://kikay.co.za/services/', waitMs: 2500 },
      { name: 'kikay-contact.png', url: 'https://kikay.co.za/contact/', waitMs: 2500 },
    ],
  },
  keymasters: {
    dir: 'pixa_pics/keymasters',
    cover: 'work/keymasters.png',
    shots: [
      { name: 'keymasters-homepage.png', url: 'https://keymasters.co.za/', waitMs: 3000 },
      { name: 'keymasters-services.png', url: 'https://keymasters.co.za/services/', waitMs: 2500 },
      { name: 'keymasters-contact.png', url: 'https://keymasters.co.za/contact/', waitMs: 2500 },
    ],
  },
  covercrete: {
    dir: 'pixa_pics/covercrete',
    cover: 'work/covercrete.png',
    shots: [
      { name: 'covercrete-homepage.png', url: 'https://covercrete.co.za/', waitMs: 3000 },
      { name: 'covercrete-colours.png', url: 'https://covercrete.co.za/colours', waitMs: 2500 },
      { name: 'covercrete-gallery.png', url: 'https://covercrete.co.za/gallery', waitMs: 2500 },
      { name: 'covercrete-about.png', url: 'https://covercrete.co.za/about', waitMs: 2500 },
      { name: 'covercrete-contact.png', url: 'https://covercrete.co.za/contact', waitMs: 2500 },
      { name: 'covercrete-shop.png', url: 'https://covercrete.co.za/shop', waitMs: 2500 },
    ],
  },
  featherbleu: {
    dir: 'pixa_pics/featherbleu',
    cover: 'work/featherbleu.png',
    shots: [
      { name: 'featherbleu-homepage.png', url: 'https://featherbleu.co.za/', waitMs: 3000 },
      { name: 'featherbleu-services.png', url: 'https://featherbleu.co.za/services', waitMs: 2500 },
      { name: 'featherbleu-cctv.png', url: 'https://featherbleu.co.za/services/cctv', waitMs: 2500 },
      { name: 'featherbleu-gate-automation.png', url: 'https://featherbleu.co.za/services/gate-automation', waitMs: 2500 },
      { name: 'featherbleu-projects.png', url: 'https://featherbleu.co.za/projects', waitMs: 2500 },
      { name: 'featherbleu-contact.png', url: 'https://featherbleu.co.za/contact', waitMs: 2500 },
    ],
  },
  trakcare: {
    dir: 'pixa_pics/trakcare',
    cover: 'trakare/trakcareCover.png',
    shots: [
      { name: 'trakcare-homepage.png', url: 'https://trakcare-barcode-scanner.vercel.app/', waitMs: 3000 },
      { name: 'trakcare-scanner.png', url: 'https://trakcare-barcode-scanner.vercel.app/', waitMs: 3500 },
    ],
  },
  haval: {
    dir: 'pixa_pics/haval',
    cover: 'work/haval.png',
    shots: [
      { name: 'haval-homepage.png', url: 'https://haval-website.vercel.app/', waitMs: 3500 },
      { name: 'haval-models.png', url: 'https://haval-website.vercel.app/models', waitMs: 3000 },
      { name: 'haval-about.png', url: 'https://haval-website.vercel.app/about', waitMs: 2500 },
      { name: 'haval-contact.png', url: 'https://haval-website.vercel.app/contact', waitMs: 2500 },
      { name: 'haval-dealers.png', url: 'https://haval-website.vercel.app/dealers', waitMs: 2500 },
    ],
  },
  ai: {
    dir: 'pixa_pics/ai',
    cover: 'work/ai.png',
    shots: [
      { name: 'ai-testing-homepage.png', url: 'https://ai-testing.vercel.app/', waitMs: 3500 },
    ],
  },
  georgeherald: {
    dir: 'pixa_pics/georgeherald',
    cover: 'work/georgeherald.png',
    shots: [
      // Official live paper (Pixaloom Vercel preview is currently 404)
      { name: 'george-herald-homepage.png', url: 'https://www.georgeherald.com/', waitMs: 4000 },
      { name: 'george-herald-news.png', url: 'https://www.georgeherald.com/news', waitMs: 3000 },
      { name: 'george-herald-sport.png', url: 'https://www.georgeherald.com/sport', waitMs: 3000 },
      { name: 'george-herald-community.png', url: 'https://www.georgeherald.com/community', waitMs: 3000 },
    ],
  },
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function clearOldScreenshots(dirRel, keepNames) {
  const abs = path.join(OUT, dirRel);
  await ensureDir(abs);
  const entries = await fs.readdir(abs);
  for (const entry of entries) {
    if (keepNames.has(entry)) continue;
    if (!/\.(png|jpe?g|webp)$/i.test(entry)) continue;
    await fs.unlink(path.join(abs, entry));
  }
}

async function settlePage(page, waitMs = 2000) {
  try {
    await page.waitForNetworkIdle({ idleTime: 800, timeout: 12000 });
  } catch {
    // ignore — some sites keep long-polling
  }
  await new Promise((r) => setTimeout(r, waitMs));
  // Hide common cookie banners if present
  await page.evaluate(() => {
    const selectors = [
      '#cookie-law-info-bar',
      '.cookie-notice',
      '#cookie-notice',
      '.cc-window',
      '#onetrust-banner-sdk',
      '[id*="cookie"]',
      '[class*="cookie-banner"]',
    ];
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        el.style.setProperty('display', 'none', 'important');
      });
    }
    document.querySelectorAll('nextjs-portal, [data-next-badge-root]').forEach((el) => el.remove());
  }).catch(() => {});
}

async function captureShot(page, shot, destAbs) {
  const res = await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
  const status = res?.status() ?? 0;
  if (status >= 400) {
    console.warn(`  SKIP ${shot.name} — HTTP ${status} for ${shot.url}`);
    return false;
  }
  await settlePage(page, shot.waitMs ?? 2000);
  const title = await page.title();
  if (/not found|404|vercel/i.test(title) && status !== 200) {
    console.warn(`  SKIP ${shot.name} — title suggests missing page: ${title}`);
    return false;
  }
  const isJpeg = /\.jpe?g$/i.test(shot.name);
  await page.screenshot({
    path: destAbs,
    type: isJpeg ? 'jpeg' : 'png',
    quality: isJpeg ? 78 : undefined,
    fullPage: Boolean(shot.fullPage),
    captureBeyondViewport: false,
  });
  const stat = await fs.stat(destAbs);
  console.log(`  OK ${shot.name} (${Math.round(stat.size / 1024)}KB) — ${title}`);
  return true;
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'shell',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=none',
      '--hide-scrollbars',
      '--window-size=1600,1000',
    ],
    defaultViewport: VIEWPORT,
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
  );
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-ZA,en;q=0.9' });

  const results = {};

  for (const [key, project] of Object.entries(PROJECTS)) {
    console.log(`\n=== ${key} ===`);
    const keep = new Set(project.shots.map((s) => s.name));
    await clearOldScreenshots(project.dir, keep);

    const captured = [];
    for (const shot of project.shots) {
      const dest = path.join(OUT, project.dir, shot.name);
      try {
        const ok = await captureShot(page, shot, dest);
        if (ok) captured.push(shot.name);
        else keep.delete(shot.name);
      } catch (err) {
        console.warn(`  FAIL ${shot.name}: ${err.message}`);
      }
    }

    if (project.cover && captured.length) {
      const coverSrc = path.join(OUT, project.dir, captured[0]);
      const coverDest = path.join(OUT, project.cover);
      await ensureDir(path.dirname(coverDest));
      await fs.copyFile(coverSrc, coverDest);
      console.log(`  COVER -> ${project.cover}`);
    }

    results[key] = captured;
  }

  await browser.close();
  await fs.writeFile(
    path.join(ROOT, 'scripts/screenshot-manifest.json'),
    JSON.stringify(results, null, 2),
  );
  console.log('\nWrote scripts/screenshot-manifest.json');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
