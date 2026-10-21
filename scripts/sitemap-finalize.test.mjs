import { test } from 'node:test';
import assert from 'node:assert/strict';
import { finalizeSitemap, readPageInfo } from './sitemap-finalize.mjs';

const urlset = (entries) =>
	`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries
		.map((u) => `<url><loc>${u}</loc></url>`)
		.join('')}</urlset>`;

test('readPageInfo: noindex meta and hreflang links from the head only', () => {
	const html = `<html><head><meta name="robots" content="noindex, follow" />
<link rel="alternate" hreflang="id" href="https://x.de/" />
<link rel="alternate" hreflang="x-default" href="https://x.de/" />
</head><body><link rel="alternate" hreflang="en" href="https://x.de/b/" /></body></html>`;
	assert.deepEqual(readPageInfo(html), {
		noindex: true,
		alternates: [
			{ hreflang: 'id', href: 'https://x.de/' },
			{ hreflang: 'x-default', href: 'https://x.de/' },
		],
	});
	assert.equal(readPageInfo('<html><head></head></html>').noindex, false);
});

test('finalizeSitemap: drops noindex URLs, keeps the rest, injects alternates', () => {
	const xml = urlset(['https://x.de/', 'https://x.de/stub/', 'https://x.de/old/']);
	const info = {
		'https://x.de/': { noindex: false, alternates: [{ hreflang: 'id', href: 'https://x.de/' }] },
		'https://x.de/stub/': { noindex: true, alternates: [] },
	};
	const { xml: out, kept, dropped } = finalizeSitemap(xml, (loc) => info[loc]);
	assert.equal(kept, 2);
	assert.deepEqual(dropped, ['https://x.de/stub/']);
	assert.ok(!out.includes('/stub/'));
	assert.ok(out.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'));
	assert.ok(
		out.includes(
			'<url><loc>https://x.de/</loc><xhtml:link rel="alternate" hreflang="id" href="https://x.de/"/></url>',
		),
	);
	// Unknown page (no HTML on disk): entry passes through untouched.
	assert.ok(out.includes('<url><loc>https://x.de/old/</loc></url>'));
});

test('finalizeSitemap: no alternates means no xhtml namespace is added', () => {
	const { xml: out } = finalizeSitemap(urlset(['https://x.de/']), () => ({ noindex: false, alternates: [] }));
	assert.ok(!out.includes('xmlns:xhtml'));
});

test('readPageInfo + finalizeSitemap: dcterms.modified becomes <lastmod>', () => {
	const info = readPageInfo('<html><head><meta name="dcterms.modified" content="2026-10-01" /></head></html>');
	assert.equal(info.lastmod, '2026-10-01');
	assert.equal(readPageInfo('<html><head></head></html>').lastmod, undefined);
	const { xml: out } = finalizeSitemap(urlset(['https://x.de/a/', 'https://x.de/b/']), (loc) =>
		loc.endsWith('/a/') ? { ...info, alternates: [{ hreflang: 'id', href: 'https://x.de/a/' }] } : { noindex: false, alternates: [] },
	);
	assert.ok(
		out.includes('<url><loc>https://x.de/a/</loc><lastmod>2026-10-01</lastmod><xhtml:link rel="alternate" hreflang="id" href="https://x.de/a/"/></url>'),
	);
	assert.ok(out.includes('<url><loc>https://x.de/b/</loc></url>'));
});
