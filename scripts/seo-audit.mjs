import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { brokenFragments, canonicalProblems, linkGraph, mainContent, plainText, renderedImageSources, robotsAllows, schemaDates } from './seo-analysis.mjs';

const args = process.argv.slice(2);
const reportIndex = args.indexOf('--report');
const reportPath = reportIndex === -1 ? undefined : args[reportIndex + 1];
if (reportIndex !== -1 && (!reportPath || reportPath.startsWith('--'))) throw new Error('--report needs an output JSON path');
const positional = reportIndex === -1 ? args : args.filter((_, index) => index !== reportIndex && index !== reportIndex + 1);
const canonicalOrigin = new URL(
  process.env.CANONICAL_ORIGIN || "https://www.pixaloom.co.za",
);
const crawlOrigin = new URL(positional[0] || canonicalOrigin);
const requestTimeoutMs = 20_000;
const requestConcurrency = 6;

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

async function mapConcurrent(items, callback) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(requestConcurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await callback(items[index]);
    }
  }));
  return results;
}

async function get(value, redirect = "manual") {
  const start = performance.now();
  const response = await fetch(value, {
    headers: { "user-agent": "Pixaloom technical SEO audit" },
    redirect,
    signal: AbortSignal.timeout(requestTimeoutMs),
  });
  const ttfbMs = Math.round(performance.now() - start);
  return { response, text: await response.text(), ttfbMs };
}

function blocksIndexing(metas, response) {
  const directives = [
    response.headers.get("x-robots-tag") || "",
    ...metas.filter(({ attrs }) => /^(robots|googlebot)$/i.test(attrs.name || ""))
      .map(({ attrs }) => attrs.content || ""),
  ];
  return directives.some((value) => /\b(?:noindex|none)\b/i.test(value));
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
  const advertisedSitemaps = [...robots.matchAll(/^sitemap:\s*(\S+)/gim)].map((match) => match[1]);
  if (!advertisedSitemaps.some((url) => normalizeUrl(url) === normalizeUrl("/sitemap.xml"))) {
    fail("robots.txt does not advertise the canonical sitemap");
  }

  const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    decodeHtml(match[1]),
  );
  if (!sitemapUrls.length) fail("sitemap.xml contains no URLs");
  if (new Set(sitemapUrls.map(normalizeUrl)).size !== sitemapUrls.length) fail("sitemap.xml contains duplicate URLs");
  const modifiedDates = new Map([...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => {
    const url = decodeHtml(entry.match(/<loc>(.*?)<\/loc>/)?.[1]);
    const modified = entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    if (modified && (!Number.isFinite(Date.parse(modified)) || Date.parse(modified) > Date.now())) fail(`${url}: invalid or future sitemap lastmod ${modified}`);
    return [normalizeUrl(url), modified];
  }));
  for (const url of sitemapUrls) {
    if (new URL(url).origin !== canonicalOrigin.origin) fail(`sitemap URL uses a noncanonical origin: ${url}`);
    if (!robotsAllows(robots, url)) fail(`robots.txt blocks Googlebot from sitemap URL: ${url}`);
  }
  const imageUrls = new Set([...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)]
    .map((match) => decodeHtml(match[1])));

  const pages = await mapConcurrent(sitemapUrls, async (canonicalUrl) => {
      const target = pageUrl(canonicalUrl);
      const { response, text: html, ttfbMs } = await get(target);
      const path = new URL(canonicalUrl).pathname;
      const title = decodeHtml(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]);
      const metas = elements(html, "meta");
      const links = elements(html, "link");
      const description = metas.find(({ attrs }) => attrs.name?.toLowerCase() === "description")
        ?.attrs.content;
      const metaValue = (name) => metas.find(({ attrs }) =>
        (attrs.name || attrs.property)?.toLowerCase() === name)?.attrs.content;
      const canonicals = links.filter(({ attrs }) =>
        attrs.rel?.toLowerCase().split(/\s+/).includes("canonical"),
      ).map(({ attrs }) => attrs.href);
      const canonical = canonicals[0];
      const h1Count = [...html.matchAll(/<h1\b[^>]*>/gi)].length;
      const language = attributes(html.match(/<html\b[^>]*>/i)?.[0] || "").lang;
      const jsonLdBlocks = [...html.matchAll(
        /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
      )];

      if (response.status !== 200) fail(`${path}: returned ${response.status}`);
      if (!response.headers.get("content-type")?.includes("text/html")) fail(`${path}: response is not HTML`);
      if (!title) fail(`${path}: missing title`);
      if (!description) fail(`${path}: missing meta description`);
      for (const problem of canonicalProblems(canonicals, canonicalUrl)) fail(`${path}: ${problem}`);
      if (h1Count !== 1) fail(`${path}: expected one H1, found ${h1Count}`);
      if (language !== "en-ZA") fail(`${path}: html lang is ${language || "missing"}`);
      if (blocksIndexing(metas, response)) fail(`${path}: sitemap URL is marked noindex in metadata or HTTP headers`);
      if (normalizeUrl(metaValue("og:url") || "/") !== normalizeUrl(canonicalUrl)) {
        fail(`${path}: Open Graph URL does not match its canonical`);
      }
      for (const key of ["og:title", "og:description", "og:url", "og:image", "og:image:alt", "twitter:title", "twitter:description", "twitter:image", "twitter:image:alt"]) {
        if (!metaValue(key)) fail(`${path}: missing ${key}`);
      }
      if (metaValue("twitter:card") !== "summary_large_image") fail(`${path}: missing large social preview card`);
      for (const { attrs } of metas.filter(({ attrs }) => attrs.property === "article:author")) {
        try {
          const author = new URL(attrs.content);
          if (!["https:", "http:"].includes(author.protocol)) throw new Error("Not a web URL");
        } catch {
          fail(`${path}: article:author must identify a profile URL, received ${attrs.content}`);
        }
      }
      for (const key of ["og:image", "twitter:image"]) {
        const value = metaValue(key);
        if (value) {
          const url = new URL(value, canonicalOrigin);
          if (url.origin !== canonicalOrigin.origin) fail(`${path}: ${key} uses a noncanonical origin`);
          else imageUrls.add(url.href);
        }
      }
      for (const { attrs } of elements(html, "img")) {
        if (!("alt" in attrs)) fail(`${path}: image is missing alt text: ${attrs.src}`);
      }
      const renderedImages = [
        ...elements(html, 'img'),
        ...elements(html, 'source').map(({ attrs }) => ({ attrs: { srcset: attrs.srcset } })),
        ...elements(html, 'video').map(({ attrs }) => ({ attrs: { poster: attrs.poster } })),
      ];
      for (const { attrs } of renderedImages) {
        for (const value of renderedImageSources(attrs)) {
          const source = new URL(value, canonicalUrl);
          if (source.origin === canonicalOrigin.origin) imageUrls.add(source.href);
        }
      }
      if (!jsonLdBlocks.length) warn(`${path}: no JSON-LD found`);
      const schemaEntities = [];
      for (const [, json] of jsonLdBlocks) {
        try {
          const data = JSON.parse(json);
          for (const block of Array.isArray(data) ? data : [data]) {
            if (!block || typeof block !== "object") throw new Error("Invalid schema object");
            const entities = Array.isArray(block["@graph"]) ? block["@graph"] : [block];
            if (entities.some((entity) => !entity || typeof entity !== "object")) throw new Error("Invalid schema entity");
            schemaEntities.push(...entities);
          }
          for (const date of schemaDates(data)) {
            if (typeof date.modified !== 'string' || !Number.isFinite(Date.parse(date.modified)) || Date.parse(date.modified) > Date.now()) fail(`${path}: invalid or future schema dateModified ${date.modified}`);
          }
        } catch {
          fail(`${path}: invalid JSON-LD`);
        }
      }
      const modified = modifiedDates.get(normalizeUrl(canonicalUrl));
      for (const entity of schemaEntities) {
        if (entity.dateModified && typeof entity.dateModified !== "string") {
          fail(`${path}: structured dateModified must be an ISO date string`);
          continue;
        }
        if (entity.dateModified && entity.url && normalizeUrl(entity.url) === normalizeUrl(canonicalUrl)
          && modified && entity.dateModified.slice(0, 10) !== modified.slice(0, 10)) {
          fail(`${path}: structured dateModified ${entity.dateModified} disagrees with sitemap lastmod ${modified}`);
        }
      }
      if (/^\/(?:services|locations|work|blog|ai-website-app-rescue)\/.+/.test(path) || ["/ai-website-app-rescue", "/product-catalogue-websites"].includes(path)) {
        const breadcrumb = schemaEntities.find((entity) => entity["@type"] === "BreadcrumbList");
        const items = breadcrumb?.itemListElement;
        if (!Array.isArray(items) || items.length < 2) fail(`${path}: missing structured breadcrumb trail`);
        else {
          if (items.some((item, index) => item?.position !== index + 1 || !item?.name || !item?.item)) {
            fail(`${path}: breadcrumb items need consecutive positions, names and URLs`);
          }
          if (normalizeUrl(items.at(-1)?.item || "/") !== normalizeUrl(canonicalUrl)) {
            fail(`${path}: breadcrumb does not end at its canonical page`);
          }
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
          if (/^(?:mailto:|tel:|javascript:)/i.test(href)) return [];
          try {
            const url = new URL(href, canonicalUrl);
            return url.origin === canonicalOrigin.origin ? [url] : [];
          } catch {
            fail(`${path}: malformed link ${href}`);
            return [];
          }
        });

      const main = mainContent(html);
      if (!main) fail(`${path}: missing main landmark`);
      // Main-body links include breadcrumb links; global header/footer links are excluded.
      const contentLinks = elements(main, 'a').flatMap(({ attrs }) => {
        try {
          const url = new URL(attrs.href, canonicalUrl);
          return attrs.href && url.origin === canonicalOrigin.origin ? [url.pathname] : [];
        } catch { return []; }
      });
      const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => decodeHtml(match[1]));
      const h1 = plainText(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '');
      return { path, title, description, h1, internalLinks, contentLinks, ids,
        status: response.status, canonical, lastModified: modifiedDates.get(normalizeUrl(canonicalUrl)),
        mainWords: plainText(main).split(/\s+/).filter(Boolean).length,
        htmlBytes: Buffer.byteLength(html), ttfbMs,
        cacheStatus: response.headers.get('cf-cache-status'),
        searchConsoleMetaVerification: Boolean(metaValue('google-site-verification')) };
    });

  for (const [value, paths] of duplicateValues(pages, "title")) {
    fail(`duplicate title on ${paths.join(", ")}: ${value}`);
  }
  for (const [value, paths] of duplicateValues(pages, "description")) {
    fail(`duplicate description on ${paths.join(", ")}: ${value}`);
  }
  for (const failure of brokenFragments(pages)) fail(failure);
  const graph = linkGraph(pages);
  for (const page of graph) {
    if (page.depth === null) fail(`${page.path}: sitemap page is unreachable by links from the homepage`);
    else if (page.depth > 3) warn(`${page.path}: ${page.depth} clicks from homepage`);
    if (page.path.startsWith('/blog/') && page.contextualIncoming.length < 2) warn(`${page.path}: only ${page.contextualIncoming.length} main-body referring page(s)`);
  }

  const linkedUrls = new Map();
  for (const page of pages) {
    for (const url of page.internalLinks) linkedUrls.set(normalizeUrl(url), url);
  }
  const crawledUrls = new Set(sitemapUrls.map(normalizeUrl));
  await mapConcurrent([...linkedUrls.values()].filter((url) => !crawledUrls.has(normalizeUrl(url))), async (url) => {
      const target = pageUrl(url);
      const response = await fetch(target, {
        headers: { "user-agent": "Pixaloom technical SEO audit" },
        redirect: "follow",
        signal: AbortSignal.timeout(requestTimeoutMs),
      });
      if (response.status >= 400) fail(`internal link ${url.pathname} returned ${response.status}`);
      await response.body?.cancel();
    });

  await mapConcurrent([...imageUrls], async (url) => {
    const source = new URL(url, canonicalOrigin);
    const target = source.origin === canonicalOrigin.origin ? pageUrl(source) : source;
    const response = await fetch(target, {
      method: "HEAD",
      redirect: "manual",
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
    if (response.status !== 200) fail(`image ${source.pathname} returned ${response.status}`);
    if (!response.headers.get("content-type")?.startsWith("image/")) fail(`image ${source.pathname} has a non-image content type`);
    if (blocksIndexing([], response)) fail(`image ${source.pathname} is marked noindex`);
  });

  await mapConcurrent(["/os", "/jokes"], async (path) => {
    const { response, text: html } = await get(pageUrl(path));
    if (response.status !== 200) fail(`${path}: experiment returned ${response.status}`);
    if (!blocksIndexing(elements(html, "meta"), response)) fail(`${path}: experiment is missing noindex`);
    if (!robotsAllows(robots, path)) fail(`${path}: robots.txt blocks Googlebot from reading experiment noindex`);
    if (crawledUrls.has(normalizeUrl(path))) fail(`${path}: experiment is included in sitemap`);
  });
  await mapConcurrent(["/seo-audit-missing-page", "/work/seo-audit-missing-project", "/work/caps-tutor", "/work/george-herald", "/blog/seo-audit-missing-post", "/services/seo-audit-missing-service", "/locations/seo-audit-missing-place", "/ai-website-app-rescue/seo-audit-missing-specialism"], async (path) => {
    const { response } = await get(pageUrl(path));
    if (response.status !== 404) fail(`${path}: missing page returned ${response.status}, expected 404`);
  });
  const redirectCases = [
    [pageUrl("/pricing?utm_source=seo-audit&topic=web%20design"), "/website-cost"],
    [pageUrl("/website-offer?utm_source=seo-audit&topic=web%20design"), "/website-cost"],
    [pageUrl("/product-catalogue-websites?utm_source=seo-audit&product=sample%20model"), "/services/ecommerce-websites"],
    [pageUrl("/blog/social-media-vs-website-garden-route?utm_source=seo-audit"), "/blog/why-george-businesses-need-modern-website"],
    [pageUrl("/blog/george-businesses-losing-customers-online"), "/blog/why-george-businesses-need-modern-website"],
    [pageUrl("/blog/garden-route-seo-secrets-competitors-dont-want-you-to-know"), "/blog/seo-tips-garden-route-businesses"],
    [pageUrl("/shop"), "/services/ecommerce-websites"],
  ];
  if (crawlOrigin.origin === canonicalOrigin.origin && canonicalOrigin.hostname.startsWith("www.")) {
    const apexOrigin = new URL(canonicalOrigin);
    apexOrigin.hostname = apexOrigin.hostname.slice(4);
    for (const path of ["/", "/services/website-design", "/work/slip-a-tip", "/work/nexai", "/work/ai-testing", "/blog/next-js-vs-wordpress-south-africa"]) {
      redirectCases.push([new URL(`${path}?utm_source=seo-audit&topic=web%20design`, apexOrigin), path]);
    }
    // HTTPS enforcement lives at Cloudflare, so exercise it only against production.
    for (const path of ["/", "/services/website-design"]) {
      const insecure = new URL(`${path}?utm_source=seo-audit`, canonicalOrigin);
      insecure.protocol = 'http:';
      redirectCases.push([insecure, path]);
    }
  }
  await mapConcurrent(redirectCases, async ([target, destination]) => {
    const { response } = await get(target);
    if (![301, 308].includes(response.status)) {
      fail(`${target.href}: expected a permanent redirect, received ${response.status}`);
      return;
    }
    const location = response.headers.get("location");
    if (!location) { fail(`${target.href}: redirect is missing Location`); return; }
    const redirected = new URL(location, target);
    // Wrangler's local proxy rewrites its configured upstream origin in Location.
    const localProxyRedirect = ["localhost", "127.0.0.1", "[::1]"].includes(crawlOrigin.hostname)
      && redirected.origin === crawlOrigin.origin;
    if ((!localProxyRedirect && redirected.origin !== canonicalOrigin.origin) || redirected.pathname !== destination) {
      fail(`${target.href}: redirects to ${redirected.href}, expected canonical ${destination}`);
    }
    for (const [key, value] of target.searchParams) {
      if (redirected.searchParams.get(key) !== value) fail(`${target.href}: redirect lost query parameter ${key}`);
    }
  });

  console.log(
    `Audited ${pages.length} sitemap pages, ${linkedUrls.size} unique internal links, ${imageUrls.size} images, redirects, experiment noindex and missing-page status at ${crawlOrigin.origin}.`,
  );
  for (const message of warnings) console.warn(`WARN  ${message}`);
  for (const message of failures) console.error(`FAIL  ${message}`);
  console.log(`${failures.length} failure(s), ${warnings.length} warning(s).`);
  if (reportPath) {
    await mkdir(dirname(reportPath), { recursive: true });
    await writeFile(reportPath, JSON.stringify({
      auditedAt: new Date().toISOString(), origin: crawlOrigin.origin,
      limitations: ['HTTP/source audit, not proof of Google indexing or rankings.', 'TTFB is one request from this audit machine; not field Core Web Vitals.', 'Word counts are diagnostics, not a ranking target.', 'Schema checks cover JSON syntax and modification dates, not full rich-result eligibility.'],
      totals: { pages: pages.length, internalLinks: linkedUrls.size, images: imageUrls.size },
      failures, warnings,
      pages: pages.map(({ internalLinks, ids, contentLinks, ...page }) => ({ ...page,
        links: internalLinks.map(url => url.href), ...graph.find(item => item.path === page.path) })),
    }, null, 2) + '\n');
    console.log(`Saved audit evidence to ${reportPath}`);
  }
  if (failures.length) process.exitCode = 1;
}

audit().catch((error) => {
  console.error(`SEO audit could not complete: ${error.message}`);
  process.exitCode = 1;
});
