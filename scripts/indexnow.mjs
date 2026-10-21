#!/usr/bin/env node
// IndexNow payload for a deploy (Bing, Yandex & co. -- Google ignores
// IndexNow and reads the sitemap itself). Compares the sitemap that was live
// before the deploy with the freshly built one and lists every URL that is
// new or whose <lastmod> changed. Every page carries a <lastmod> (git date of
// its sources, enforced by scripts/check-search-snippets.mjs); one without it
// is only reported when it first appears: without a trustworthy date there
// is no signal that it changed, and pinging every URL on each daily rebuild
// would turn IndexNow into noise.
//
// Usage: node scripts/indexnow.mjs <live-sitemap.xml> <built-sitemap.xml> [public-dir]
// Prints the JSON body for POST https://api.indexnow.org/indexnow, or nothing
// when no URL changed. A missing live sitemap (first deploy, fetch failed)
// counts as empty, so everything is reported once.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** @returns {Map<string, string | undefined>} loc -> lastmod */
export function readSitemap(xml) {
	const entries = new Map();
	for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
		const loc = body.match(/<loc>([^<]+)<\/loc>/)?.[1];
		if (loc) entries.set(loc, body.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]);
	}
	return entries;
}

/** URLs that are new in `built` or carry a different lastmod than in `live`. */
export function changedUrls(liveXml, builtXml) {
	const live = readSitemap(liveXml);
	return [...readSitemap(builtXml)].filter(([loc, lastmod]) => !live.has(loc) || live.get(loc) !== lastmod).map(([loc]) => loc);
}

/** The IndexNow key is the name of the 32-hex-char key file in public/. */
export function findKey(publicDir) {
	const file = readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
	if (!file) throw new Error(`no IndexNow key file (<32 hex chars>.txt) in ${publicDir}`);
	return file.slice(0, -4);
}

function main([livePath, builtPath, publicDir]) {
	if (!livePath || !builtPath) throw new Error('usage: indexnow.mjs <live-sitemap.xml> <built-sitemap.xml> [public-dir]');
	const here = path.dirname(fileURLToPath(import.meta.url));
	const liveXml = existsSync(livePath) ? readFileSync(livePath, 'utf8') : '';
	const urls = changedUrls(liveXml, readFileSync(builtPath, 'utf8'));
	if (!urls.length) return;
	const key = findKey(publicDir ?? path.join(here, '..', 'public'));
	const { host, origin } = new URL(urls[0]);
	process.stdout.write(JSON.stringify({ host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls }));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main(process.argv.slice(2));
