#!/usr/bin/env node
/**
 * Retry / complete portfolio screenshot capture with Cloudflare waits.
 * Does NOT delete existing files until a shot succeeds.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(process.cwd());
const OUT = path.join(ROOT, 'public');
const CHROME = '/usr/local/bin/google-chrome';
const VIEWPORT = { width: 1600, height: 1000, deviceScaleFactor: 2 };
const CAPS_TUTOR_BASE = process.env.CAPS_TUTOR_BASE || 'http://127.0.0.1:9002';

const JOBS = [
  // Illumi already captured — skip unless missing
  {
    key: 'capstutor',
    dir: 'pixa_pics/capstutor',
    cover: 'work/capstutor.jpg',
    replaceOld: true,
    // Real product is Nibsi3/caps-tutor. Do not recapture www.capstutor.co.za.
    shots: [
      { name: 'capstutor-homepage.jpg', url: `${CAPS_TUTOR_BASE}/` },
      { name: 'capstutor-how-it-works.jpg', url: `${CAPS_TUTOR_BASE}/how-it-works` },
      { name: 'capstutor-subjects.jpg', url: `${CAPS_TUTOR_BASE}/all-subjects` },
      { name: 'capstutor-syllabus.jpg', url: `${CAPS_TUTOR_BASE}/caps-syllabus` },
      { name: 'capstutor-login.jpg', url: `${CAPS_TUTOR_BASE}/login` },
      { name: 'capstutor-register.jpg', url: `${CAPS_TUTOR_BASE}/register` },
      { name: 'capstutor-blog.jpg', url: `${CAPS_TUTOR_BASE}/blog` },
      { name: 'capstutor-news.jpg', url: `${CAPS_TUTOR_BASE}/news` },
      { name: 'capstutor-contact.jpg', url: `${CAPS_TUTOR_BASE}/contact` },
      { name: 'capstutor-exam-tips.jpg', url: `${CAPS_TUTOR_BASE}/exam-tips` },
    ],
  },
  {
    key: 'physiope',
    dir: 'pixa_pics/physiope',
    cover: 'work/physiope.png',
    replaceOld: true,
    shots: [
      { name: 'physiope-homepage.png', url: 'https://physiope.co.za/' },
      { name: 'physiope-services.png', url: 'https://physiope.co.za/services/' },
      { name: 'physiope-treatment.png', url: 'https://physiope.co.za/treatment/' },
      { name: 'physiope-contact.png', url: 'https://physiope.co.za/contact/' },
    ],
  },
  {
    key: 'kikay',
    dir: 'pixa_pics/kikay',
    cover: 'work/kikay.png',
    replaceOld: true,
    shots: [
      { name: 'kikay-homepage.png', url: 'https://kikay.co.za/' },
      { name: 'kikay-about.png', url: 'https://kikay.co.za/#about' },
      { name: 'kikay-what-we-do.png', url: 'https://kikay.co.za/#what-we-do' },
      { name: 'kikay-contact.png', url: 'https://kikay.co.za/#contact' },
    ],
  },
  {
    key: 'keymasters',
    dir: 'pixa_pics/keymasters',
    cover: 'work/keymasters.png',
    replaceOld: true,
    shots: [
      { name: 'keymasters-homepage.png', url: 'https://keymasters.co.za/' },
      { name: 'keymasters-about.png', url: 'https://keymasters.co.za/about-us/' },
      { name: 'keymasters-services.png', url: 'https://keymasters.co.za/our-services/' },
      { name: 'keymasters-contact.png', url: 'https://keymasters.co.za/contact-us/' },
      { name: 'keymasters-locations.png', url: 'https://keymasters.co.za/cities/' },
    ],
  },
  {
    key: 'featherbleu',
    dir: 'pixa_pics/featherbleu',
    cover: 'work/featherbleu.png',
    replaceOld: true,
    shots: [
      { name: 'featherbleu-homepage.png', url: 'https://featherbleu.co.za/' },
      { name: 'featherbleu-services.png', url: 'https://featherbleu.co.za/services' },
      { name: 'featherbleu-cctv.png', url: 'https://featherbleu.co.za/services/cctv' },
      { name: 'featherbleu-gate-automation.png', url: 'https://featherbleu.co.za/services/gate-automation' },
      { name: 'featherbleu-projects.png', url: 'https://featherbleu.co.za/projects' },
      { name: 'featherbleu-contact.png', url: 'https://featherbleu.co.za/contact' },
    ],
  },
  {
    key: 'georgeherald',
    dir: 'pixa_pics/georgeherald',
    cover: 'work/georgeherald.png',
    replaceOld: true,
    shots: [
      { name: 'george-herald-homepage.png', url: 'https://www.georgeherald.com/' },
      { name: 'george-herald-news.png', url: 'https://www.georgeherald.com/news' },
      { name: 'george-herald-sport.png', url: 'https://www.georgeherald.com/sport' },
      { name: 'george-herald-article.png', url: 'https://www.georgeherald.com/news' },
    ],
  },
];

async function ensureDir(d) {
  await fs.mkdir(d, { recursive: true });
}

async function waitCloudflare(page) {
  for (let i = 0; i < 25; i++) {
    const probe = await page.evaluate(() => ({
      title: document.title,
      text: (document.body?.innerText || '').slice(0, 120),
    }));
    if (!/just a moment|checking your browser|attention required|enable javascript and cookies/i.test(
      `${probe.title} ${probe.text}`,
    )) {
      return true;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  return false;
}

async function settle(page, ms = 2200) {
  await waitCloudflare(page);
  try {
    await page.waitForNetworkIdle({ idleTime: 700, timeout: 10000 });
  } catch {}
  await new Promise((r) => setTimeout(r, ms));
  await page.evaluate(() => {
    for (const sel of [
      '#cookie-law-info-bar',
      '.cookie-notice',
      '#cookie-notice',
      '.cc-window',
      '#onetrust-banner-sdk',
      '.moove-gdpr-infobar',
    ]) {
      document.querySelectorAll(sel).forEach((el) => el.style.setProperty('display', 'none', 'important'));
    }
  }).catch(() => {});
}

async function capture(page, shot, dest) {
  const res = await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const status = res?.status() ?? 0;
  if (status === 429) throw new Error('HTTP 429');
  if (status >= 400) {
    console.warn(`  SKIP ${shot.name} HTTP ${status}`);
    return false;
  }
  await settle(page, shot.waitMs ?? 2500);

  // For hash sections, try scrolling to matching id / heading
  if (shot.url.includes('#')) {
    const hash = shot.url.split('#')[1];
    await page.evaluate((h) => {
      const el =
        document.getElementById(h) ||
        document.querySelector(`[id*="${h}"]`) ||
        [...document.querySelectorAll('h1,h2,h3,section')].find((n) =>
          (n.textContent || '').toLowerCase().includes(h.replace(/-/g, ' ')),
        );
      el?.scrollIntoView({ block: 'start' });
    }, hash).catch(() => {});
    await new Promise((r) => setTimeout(r, 800));
  }

  const title = await page.title();
  const text = await page.evaluate(() => (document.body?.innerText || '').slice(0, 80));
  if (/just a moment|checking your browser/i.test(title + text)) {
    throw new Error('Still on Cloudflare challenge');
  }

  const isJpeg = /\.jpe?g$/i.test(shot.name);
  await page.screenshot({
    path: dest,
    type: isJpeg ? 'jpeg' : 'png',
    quality: isJpeg ? 78 : undefined,
    fullPage: false,
    captureBeyondViewport: false,
  });
  const size = (await fs.stat(dest)).size;
  console.log(`  OK ${shot.name} (${Math.round(size / 1024)}KB) — ${title}`);
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
      '--hide-scrollbars',
      '--window-size=1600,1000',
    ],
    defaultViewport: VIEWPORT,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36',
  );

  const results = {};

  for (const job of JOBS) {
    console.log(`\n=== ${job.key} ===`);
    const dir = path.join(OUT, job.dir);
    await ensureDir(dir);
    const captured = [];

    for (const shot of job.shots) {
      const dest = path.join(dir, shot.name);
      let ok = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          ok = await capture(page, shot, dest);
          break;
        } catch (err) {
          console.warn(`  retry ${attempt}/3 ${shot.name}: ${err.message}`);
          await new Promise((r) => setTimeout(r, 4000 * attempt));
        }
      }
      if (ok) captured.push(shot.name);
      await new Promise((r) => setTimeout(r, 1500));
    }

    if (job.replaceOld && captured.length) {
      const keep = new Set(captured);
      for (const entry of await fs.readdir(dir)) {
        if (!/\.(png|jpe?g|webp)$/i.test(entry)) continue;
        if (keep.has(entry)) continue;
        await fs.unlink(path.join(dir, entry));
        console.log(`  removed old ${entry}`);
      }
    }

    if (job.cover && captured.length) {
      const coverDest = path.join(OUT, job.cover);
      await ensureDir(path.dirname(coverDest));
      await fs.copyFile(path.join(dir, captured[0]), coverDest);
      console.log(`  COVER -> ${job.cover}`);
    }

    results[job.key] = captured;
  }

  await browser.close();
  const manifestPath = path.join(ROOT, 'scripts/screenshot-manifest.json');
  let existing = {};
  try {
    existing = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  } catch {}
  await fs.writeFile(manifestPath, JSON.stringify({ ...existing, ...results }, null, 2));
  console.log('\nUpdated screenshot-manifest.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
