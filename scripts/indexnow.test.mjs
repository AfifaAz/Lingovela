import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { changedUrls, findKey, readSitemap } from './indexnow.mjs';

const urlset = (entries) =>
	`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries
		.map(([loc, lastmod]) => `<url><loc>${loc}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
		.join('')}</urlset>`;

test('readSitemap: loc with optional lastmod', () => {
	const map = readSitemap(urlset([['https://x.de/de/', undefined], ['https://x.de/de/a/', '2026-10-06']]));
	assert.deepEqual([...map], [['https://x.de/de/', undefined], ['https://x.de/de/a/', '2026-10-06']]);
});

test('changedUrls: new URLs and changed lastmod only', () => {
	const live = urlset([['https://x.de/de/', undefined], ['https://x.de/de/a/', '2026-10-01'], ['https://x.de/de/b/', '2026-10-01']]);
	const built = urlset([
		['https://x.de/de/', undefined],
		['https://x.de/de/a/', '2026-10-06'],
		['https://x.de/de/b/', '2026-10-01'],
		['https://x.de/de/c/', undefined],
	]);
	assert.deepEqual(changedUrls(live, built), ['https://x.de/de/a/', 'https://x.de/de/c/']);
	assert.deepEqual(changedUrls(built, built), []);
});

test('changedUrls: no live sitemap reports everything once', () => {
	assert.deepEqual(changedUrls('', urlset([['https://x.de/de/', undefined]])), ['https://x.de/de/']);
});

test('findKey: name of the 32-hex key file', () => {
	const dir = mkdtempSync(path.join(tmpdir(), 'indexnow-'));
	writeFileSync(path.join(dir, 'ads.txt'), '');
	writeFileSync(path.join(dir, '7ff3ce8cd55e4d5688d6c40693dd960a.txt'), '7ff3ce8cd55e4d5688d6c40693dd960a');
	assert.equal(findKey(dir), '7ff3ce8cd55e4d5688d6c40693dd960a');
	assert.throws(() => findKey(mkdtempSync(path.join(tmpdir(), 'indexnow-'))));
});
