import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import vm from 'node:vm';
import {
	HEAD_SCRIPT,
	cookieDomain,
	parseTheme,
	readCookie,
	serializeCookie,
	textSizeChoice,
	themeChoice,
} from './display-prefs.mjs';

test('readCookie finds the exact name, not a prefix match', () => {
	assert.equal(readCookie('a=1; kev_theme=dark; b=2', 'kev_theme'), 'dark');
	assert.equal(readCookie('xkev_theme=dark', 'kev_theme'), null);
	assert.equal(readCookie('', 'kev_theme'), null);
	assert.equal(readCookie(undefined, 'kev_theme'), null);
});

test('only the allowlisted theme values are accepted', () => {
	for (const v of ['light', 'dark', 'system']) assert.equal(parseTheme(v), v);
	for (const v of ['Dark', 'dark ', '', 'auto', '<script>', null]) assert.equal(parseTheme(v), null);
});

test('theme choice: cookie (set by either site) wins over localStorage, then system', () => {
	assert.equal(themeChoice('kev_theme=light', 'dark'), 'light');
	assert.equal(themeChoice('kev_theme=system', 'dark'), 'system');
	assert.equal(themeChoice('', 'dark'), 'dark');
	assert.equal(themeChoice('kev_theme=bogus', 'light'), 'light');
	assert.equal(themeChoice('', null), 'system');
});

test('text size choice: cookie first, then localStorage', () => {
	assert.equal(textSizeChoice('kev_text_size=normal', 'large'), 'normal');
	assert.equal(textSizeChoice('', 'large'), 'large');
	assert.equal(textSizeChoice('kev_text_size=huge', null), 'normal');
});

test('the parent domain is only set on the project domain and its subdomains', () => {
	assert.equal(cookieDomain('ki-einfach-verstehen.de'), '.ki-einfach-verstehen.de');
	assert.equal(cookieDomain('staging.ki-einfach-verstehen.de'), '.ki-einfach-verstehen.de');
	assert.equal(cookieDomain('community-staging.ki-einfach-verstehen.de'), '.ki-einfach-verstehen.de');
	assert.equal(cookieDomain('localhost'), null);
	assert.equal(cookieDomain('127.0.0.1'), null);
	assert.equal(cookieDomain('evil-ki-einfach-verstehen.de'), null);
	assert.equal(cookieDomain('ki-einfach-verstehen.de.evil.com'), null);
});

test('serializeCookie: Domain only on the project domain, Secure only on https', () => {
	assert.equal(
		serializeCookie('kev_theme', 'light', { hostname: 'staging.ki-einfach-verstehen.de', protocol: 'https:' }),
		'kev_theme=light; Path=/; Max-Age=31536000; SameSite=Lax; Domain=.ki-einfach-verstehen.de; Secure',
	);
	assert.equal(
		serializeCookie('kev_theme', 'dark', { hostname: 'localhost', protocol: 'http:' }),
		'kev_theme=dark; Path=/; Max-Age=31536000; SameSite=Lax',
	);
});

/** Runs the inline head script against a minimal fake document. */
function runHead({ cookie = '', storage = {}, systemDark = false, storageThrows = false }) {
	const attrs = {};
	const context = {
		document: {
			cookie,
			documentElement: { setAttribute: (k, v) => (attrs[k] = v) },
		},
		localStorage: {
			getItem: (k) => {
				if (storageThrows) throw new Error('blocked');
				return storage[k] ?? null;
			},
		},
		matchMedia: () => ({ matches: systemDark }),
	};
	vm.runInNewContext(HEAD_SCRIPT, context);
	return attrs;
}

test('head script: a cookie written by the board overrides the stored website choice', () => {
	assert.deepEqual(runHead({ cookie: 'kev_theme=light', storage: { 'kev:theme': 'dark' }, systemDark: true }), { 'data-theme': 'light' });
});

test('head script: system cookie follows the OS even with a stale localStorage value', () => {
	assert.deepEqual(runHead({ cookie: 'kev_theme=system', storage: { 'kev:theme': 'light' }, systemDark: true }), { 'data-theme': 'dark' });
});

test('head script: falls back to localStorage, then the system, and survives blocked storage', () => {
	assert.equal(runHead({ storage: { 'kev:theme': 'dark' } })['data-theme'], 'dark');
	assert.equal(runHead({ systemDark: true })['data-theme'], 'dark');
	assert.equal(runHead({ storageThrows: true })['data-theme'], 'light');
	assert.equal(runHead({ cookie: 'kev_theme=<b>' })['data-theme'], 'light');
});

test('head script: text size from cookie or localStorage', () => {
	assert.equal(runHead({ cookie: 'kev_text_size=large' })['data-text-size'], 'large');
	assert.equal(runHead({ cookie: 'kev_text_size=normal', storage: { 'kev:text-size': 'large' } })['data-text-size'], undefined);
	assert.equal(runHead({ storage: { 'kev:text-size': 'large' } })['data-text-size'], 'large');
});
