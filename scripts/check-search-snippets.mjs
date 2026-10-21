#!/usr/bin/env node
// Post-build guard over every page the sitemap lists (run from `pnpm build`
// after sitemap-finalize): what a search result shows of the page must fit,
// and the page must carry the date its <lastmod> comes from.
//   - <title> at most 65 characters (Google cuts off around there,
//     docs/content-plan/seo-technik.md);
//   - meta description 70 to 160 characters (shorter says too little,
//     longer is cut mid-sentence);
//   - og:site_name present;
//   - dcterms.modified present (PageShell `modified` or `sources`), so the
//     sitemap's <lastmod> and the IndexNow ping see every change. A build
//     without git history (shallow clone) dates no page at all; that only
//     warns, since the dates then simply stay out of the sitemap.
// Pure check in `checkPage`, filesystem glue in `main`.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MAX_TITLE = 65;
export const MIN_DESCRIPTION = 70;
export const MAX_DESCRIPTION = 160;

const decode = (s) =>
	s
		.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
		.replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
		.replace(/&quot;/g, '"')
		.replace(/&#39;|&apos;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

/** Problems with one built page's head; empty when it is fine. @returns {string[]} */
export function checkPage(html, { requireModified = true } = {}) {
	const end = html.indexOf('</head>');
	const head = end === -1 ? html : html.slice(0, end);
	const problems = [];
	const title = /<title>([^<]*)<\/title>/.exec(head)?.[1];
	if (title === undefined) problems.push('no <title>');
	else if ([...decode(title)].length > MAX_TITLE) problems.push(`title has ${[...decode(title)].length} characters (max ${MAX_TITLE}): ${decode(title)}`);
	const description = /<meta\s+name="description"\s+content="([^"]*)"/.exec(head)?.[1];
	if (description === undefined) problems.push('no meta description');
	else {
		const length = [...decode(description)].length;
		if (length < MIN_DESCRIPTION || length > MAX_DESCRIPTION)
			problems.push(`description has ${length} characters (${MIN_DESCRIPTION} to ${MAX_DESCRIPTION})`);
	}
	if (!/<meta\s+property="og:site_name"/.test(head)) problems.push('no og:site_name');
	if (requireModified && !/<meta\s+name="dcterms\.modified"/.test(head)) problems.push('no dcterms.modified (pass `modified` or `sources` to PageShell)');
	return problems;
}

function main(distDir) {
	const sitemaps = readdirSync(distDir).filter((f) => /^sitemap-\d+\.xml$/.test(f));
	const files = [];
	for (const f of sitemaps) {
		const xml = readFileSync(path.join(distDir, f), 'utf8');
		for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
			const pathname = decodeURIComponent(new URL(loc).pathname);
			const file = pathname.endsWith('/') ? path.join(distDir, pathname, 'index.html') : path.join(distDir, pathname);
			if (existsSync(file)) files.push({ pathname, html: readFileSync(file, 'utf8') });
		}
	}
	const requireModified = files.some(({ html }) => /<meta\s+name="dcterms\.modified"/.test(html));
	if (!requireModified) console.warn('check-search-snippets: no page carries a date (no git history?); <lastmod> stays out of the sitemap');
	let failed = 0;
	for (const { pathname, html } of files) {
		const problems = checkPage(html, { requireModified });
		if (problems.length === 0) continue;
		failed++;
		for (const p of problems) console.error(`check-search-snippets: ${pathname}: ${p}`);
	}
	if (failed) {
		console.error(`check-search-snippets: ${failed} of ${files.length} pages need a metadata fix`);
		process.exit(1);
	}
	console.log(`check-search-snippets: ${files.length} pages ok`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	main(path.resolve(process.argv[2] ?? 'dist'));
}
