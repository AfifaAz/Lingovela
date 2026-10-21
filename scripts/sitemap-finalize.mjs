#!/usr/bin/env node
// Post-build pass over the generated sitemap (@astrojs/sitemap), run from
// `pnpm build` after `astro build`:
//   1. drops every URL whose page is `noindex` (the "in Vorbereitung" stub
//      pages, src/layouts/StubLessonLayout.astro) -- a sitemap must only list
//      canonical, indexable URLs or Search Console reports them as errors;
//   2. adds <xhtml:link rel="alternate" hreflang=...> entries read from each
//      page's own <link rel="alternate" hreflang> tags, keeping sitemap
//      alternates aligned with the HTML declarations;
//   3. adds <lastmod> from each page's <meta name="dcterms.modified"> (the
//      git date of the files the page is built from, set by PageShell from
//      `modified` or `sources`) -- pages without one get none rather than a
//      guessed date, since Google only trusts lastmod that is consistently
//      accurate; scripts/check-search-snippets.mjs makes sure none lacks it.
// Pure transformation in `finalizeSitemap`, filesystem glue in `main`.
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @typedef {{ noindex: boolean, alternates: { hreflang: string, href: string }[], lastmod?: string }} PageInfo
 */

/** Reads robots/hreflang facts from one built HTML document. @returns {PageInfo} */
export function readPageInfo(html) {
	const head = html.slice(0, html.indexOf('</head>') === -1 ? html.length : html.indexOf('</head>'));
	const noindex = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(head);
	const alternates = [];
	for (const m of head.matchAll(/<link\s+rel="alternate"\s+hreflang="([^"]+)"\s+href="([^"]+)"/g)) {
		alternates.push({ hreflang: m[1], href: m[2] });
	}
	const lastmod = /<meta\s+name="dcterms\.modified"\s+content="(\d{4}-\d{2}-\d{2})"/i.exec(head)?.[1];
	return lastmod ? { noindex, alternates, lastmod } : { noindex, alternates };
}

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * @param {string} xml the sitemap (urlset) document
 * @param {(loc: string) => PageInfo | undefined} lookup page facts per URL; undefined keeps the entry untouched
 * @returns {{ xml: string, kept: number, dropped: string[] }}
 */
export function finalizeSitemap(xml, lookup) {
	const dropped = [];
	let kept = 0;
	let out = xml.replace(/<url>([\s\S]*?)<\/url>/g, (entry, inner) => {
		const loc = /<loc>([^<]+)<\/loc>/.exec(inner)?.[1];
		const info = loc ? lookup(loc) : undefined;
		if (info?.noindex) {
			dropped.push(loc);
			return '';
		}
		kept++;
		if (!info || (info.alternates.length === 0 && !info.lastmod)) return entry;
		const lastmod = info.lastmod && !inner.includes('<lastmod>') ? `<lastmod>${info.lastmod}</lastmod>` : '';
		const links = info.alternates
			.map((a) => `<xhtml:link rel="alternate" hreflang="${escapeXml(a.hreflang)}" href="${escapeXml(a.href)}"/>`)
			.join('');
		return `<url>${inner.replace(/(<loc>[^<]+<\/loc>)/, `$1${lastmod}${links}`)}</url>`;
	});
	if (out.includes('<xhtml:link') && !/xmlns:xhtml=/.test(out)) {
		out = out.replace('<urlset ', '<urlset xmlns:xhtml="http://www.w3.org/1999/xhtml" ');
	}
	return { xml: out, kept, dropped };
}

function main(distDir) {
	const files = readdirSync(distDir).filter((f) => /^sitemap-\d+\.xml$/.test(f));
	if (files.length === 0) {
		console.error(`sitemap-finalize: no sitemap-*.xml in ${distDir}`);
		process.exit(1);
	}
	const lookup = (loc) => {
		const pathname = decodeURIComponent(new URL(loc).pathname);
		const file = pathname.endsWith('/') ? path.join(distDir, pathname, 'index.html') : path.join(distDir, pathname);
		if (!existsSync(file)) return undefined;
		return readPageInfo(readFileSync(file, 'utf8'));
	};
	for (const f of files) {
		const file = path.join(distDir, f);
		const { xml, kept, dropped } = finalizeSitemap(readFileSync(file, 'utf8'), lookup);
		writeFileSync(file, xml);
		console.log(`sitemap-finalize: ${f} — ${kept} URLs kept, ${dropped.length} noindex URLs dropped`);
		for (const d of dropped) console.log(`  - ${d}`);
	}
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	main(path.resolve(process.argv[2] ?? 'dist'));
}
