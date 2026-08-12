const canonicalOrigin = new URL(
  process.env.CANONICAL_ORIGIN || "https://www.pixaloom.co.za",
);
const crawlOrigin = new URL(process.argv[2] || canonicalOrigin);
const requestTimeoutMs = 20_000;

const failures = [];
const warnings = [];

function normalizeUrl(value) {
  const url = new URL(value, canonicalOrigin);
  url.hash = "";
  url.search = "";
  if (url.pathname === "/") url.pathname = "";
  else url.pathname = url.pathname.replace(/\/$/, "");
  return url.href;
}

function decodeHtml(value = "") {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    result[match[1].toLowerCase()] = decodeHtml(match[2] ?? match[3] ?? "");
  }
  return result;
}

function elements(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    (match) => ({ tag: match[0], attrs: attributes(match[0]) }),
  );
}

function pageUrl(value) {
  const canonical = new URL(value, canonicalOrigin);
  return new URL(`${canonical.pathname}${canonical.search}`, crawlOrigin);
}

async function get(value) {
  const response = await fetch(value, {
    headers: { "user-agent": "Pixaloom technical SEO audit" },
    redirect: "follow",
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  return { response, text: await response.text() };
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function duplicateValues(pages, key) {
  const seen = new Map();
  for (const page of pages) {
    if (!page[key]) continue;
    const paths = seen.get(page[key]) || [];
    paths.push(page.path);
    seen.set(page[key], paths);
  }
  return [...seen.entries()].filter(([, paths]) => paths.length > 1);
}

async function audit() {
  const robotsUrl = new URL("/robots.txt", crawlOrigin);
  const sitemapUrl = new URL("/sitemap.xml", crawlOrigin);
  const [{ response: robotsResponse, text: robots }, { response: sitemapResponse, text: sitemap }] =
    await Promise.all([get(robotsUrl), get(sitemapUrl)]);

  if (!robotsResponse.ok) fail(`robots.txt returned ${robotsResponse.status}`);
  if (!sitemapResponse.ok) fail(`sitemap.xml returned ${sitemapResponse.status}`);
  if (!/^user-agent:\s*\*/im.test(robots)) fail("robots.txt has no wildcard user-agent group");
  if (/disallow:\s*\/$/im.test(robots)) fail("robots.txt blocks the entire site");
  if (!/^sitemap:\s*https?:\/\//im.test(robots)) warn("robots.txt does not advertise the sitemap");

  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decodeHtml(match[1]),
  );
  if (!sitemapUrls.length) fail("sitemap.xml contains no URLs");

  const pages = await Promise.all(
    sitemapUrls.map(async (canonicalUrl) => {
      const target = pageUrl(canonicalUrl);
      const { response, text: html } = await get(target);
      const path = new URL(canonicalUrl).pathname;
      const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
      const metas = elements(html, "meta");
      const links = elements(html, "link");
      const description = metas.find(({ attrs }) => attrs.name?.toLowerCase() === "description")
        ?.attrs.content;
      const robotsMeta = metas.find(({ attrs }) => attrs.name?.toLowerCase() === "robots")
        ?.attrs.content;
      const canonical = links.find(({ attrs }) =>
        attrs.rel?.toLowerCase().split(/\s+/).includes("canonical"),
      )?.attrs.href;
      const h1Count = [...html.matchAll(/<h1\b[^>]*>/gi)].length;
      const language = attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang;
      const jsonLdBlocks = [...html.matchAll(
        /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      )];

      if (response.status !== 200) fail(`${path}: returned ${response.status}`);
      if (!title) fail(`${path}: missing title`);
      if (!description) fail(`${path}: missing meta description`);
      if (!canonical) fail(`${path}: missing canonical URL`);
      else if (normalizeUrl(canonical) !== normalizeUrl(canonicalUrl)) {
        fail(`${path}: canonical is ${canonical}, expected ${canonicalUrl}`);
      }
      if (h1Count !== 1) fail(`${path}: expected one H1, found ${h1Count}`);
      if (language !== "en-ZA") fail(`${path}: html lang is ${language || "missing"}`);
      if (/noindex/i.test(robotsMeta || "")) fail(`${path}: sitemap URL is marked noindex`);
      if (!jsonLdBlocks.length) warn(`${path}: no JSON-LD found`);
      for (const [, json] of jsonLdBlocks) {
        try {
          JSON.parse(json);
        } catch {
          fail(`${path}: invalid JSON-LD`);
        }
      }
      if (title && (title.length < 10 || title.length > 65)) {
        warn(`${path}: title length is ${title.length}`);
      }
      if (description && (description.length < 70 || description.length > 170)) {
        warn(`${path}: description length is ${description.length}`);
      }

      const internalLinks = [...html.matchAll(/<a\b[^>]*>/gi)]
        .map((match) => attributes(match[0]).href)
        .filter(Boolean)
        .flatMap((href) => {
          if (/^(?:mailto:|tel:|javascript:|#)/i.test(href)) return [];
          try {
            const url = new URL(href, canonicalOrigin);
            return url.origin === canonicalOrigin.origin ? [url] : [];
          } catch {
            fail(`${path}: malformed link ${href}`);
            return [];
          }
        });

      return { path, title, description, internalLinks };
    }),
  );

  for (const [value, paths] of duplicateValues(pages, "title")) {
    fail(`duplicate title on ${paths.join(", ")}: ${value}`);
  }
  for (const [value, paths] of duplicateValues(pages, "description")) {
    fail(`duplicate description on ${paths.join(", ")}: ${value}`);
  }

  const linkedUrls = new Map();
  for (const page of pages) {
    for (const url of page.internalLinks) linkedUrls.set(normalizeUrl(url), url);
  }
  await Promise.all(
    [...linkedUrls.values()].map(async (url) => {
      const target = pageUrl(url);
      const response = await fetch(target, {
        headers: { "user-agent": "Pixaloom technical SEO audit" },
        redirect: "follow",
        signal: AbortSignal.timeout(requestTimeoutMs),
      });
      if (response.status >= 400) fail(`internal link ${url.pathname} returned ${response.status}`);
    }),
  );

  console.log(
    `Audited ${pages.length} sitemap pages and ${linkedUrls.size} unique internal links at ${crawlOrigin.origin}.`,
  );
  for (const message of warnings) console.warn(`WARN  ${message}`);
  for (const message of failures) console.error(`FAIL  ${message}`);
  console.log(`${failures.length} failure(s), ${warnings.length} warning(s).`);
  if (failures.length) process.exitCode = 1;
}

audit().catch((error) => {
  console.error(`SEO audit could not complete: ${error.message}`);
  process.exitCode = 1;
});
