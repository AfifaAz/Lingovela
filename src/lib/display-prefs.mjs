// Display preferences (colour theme, text size) shared between the website
// and the community board. Both sites store the choice in cookies on the
// parent domain (`Domain=.ki-einfach-verstehen.de`), so switching to light
// on the website also shows the board light and vice versa. localStorage
// (`kev:theme`, `kev:text-size`) stays as the website's original store and is
// kept in sync; the cookie wins when both exist, because it carries the most
// recent choice from either site. The board reads the same cookies
// server-side (packages/community/src/View/DisplayPreferences.php) and in
// packages/community/public/assets/js/theme.js — keep the three in step.
// Plain JS (not .ts) so node --test can cover it without a build step.

export const THEME_COOKIE = 'kev_theme';
export const TEXT_SIZE_COOKIE = 'kev_text_size';
export const THEME_KEY = 'kev:theme';
export const TEXT_SIZE_KEY = 'kev:text-size';
export const SHARED_DOMAIN = 'ki-einfach-verstehen.de';
export const MAX_AGE = 31536000; // one year

/** @returns {string | null} the raw value of cookie `name` in a `document.cookie` string */
export function readCookie(cookieString, name) {
	for (const part of String(cookieString ?? '').split(';')) {
		const pair = part.trimStart();
		if (pair.startsWith(name + '=')) return pair.slice(name.length + 1);
	}
	return null;
}

/** @returns {'light' | 'dark' | 'system' | null} */
export function parseTheme(value) {
	return value === 'light' || value === 'dark' || value === 'system' ? value : null;
}

/** @returns {'large' | 'normal' | null} */
export function parseTextSize(value) {
	return value === 'large' || value === 'normal' ? value : null;
}

/**
 * The reader's theme choice: the shared cookie first, then the website's
 * legacy localStorage value (light | dark; absent = system), else system.
 * @returns {'light' | 'dark' | 'system'}
 */
export function themeChoice(cookieString, storedTheme) {
	const fromCookie = parseTheme(readCookie(cookieString, THEME_COOKIE));
	if (fromCookie) return fromCookie;
	return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system';
}

/** @returns {'large' | 'normal'} */
export function textSizeChoice(cookieString, storedSize) {
	return parseTextSize(readCookie(cookieString, TEXT_SIZE_COOKIE)) ?? (storedSize === 'large' ? 'large' : 'normal');
}

/** The shared parent domain for hosts under it; null elsewhere (localhost, previews). */
export function cookieDomain(hostname) {
	const host = String(hostname ?? '').toLowerCase();
	return host === SHARED_DOMAIN || host.endsWith('.' + SHARED_DOMAIN) ? '.' + SHARED_DOMAIN : null;
}

/** A `document.cookie` assignment string for one preference cookie. */
export function serializeCookie(name, value, { hostname, protocol }) {
	const parts = [`${name}=${value}`, 'Path=/', `Max-Age=${MAX_AGE}`, 'SameSite=Lax'];
	const domain = cookieDomain(hostname);
	if (domain) parts.push(`Domain=${domain}`);
	if (protocol === 'https:') parts.push('Secure');
	return parts.join('; ');
}

/**
 * The inline <head> script (PageShell) that applies both preferences before
 * the first paint. Self-contained ES5 — it runs before any bundle — and kept
 * here, next to the helpers it mirrors, so the tests can execute it.
 */
export const HEAD_SCRIPT = `(function () {
	var d = document.documentElement;
	function cookie(name) {
		var parts = document.cookie ? document.cookie.split(';') : [];
		for (var i = 0; i < parts.length; i++) {
			var p = parts[i].replace(/^\\s+/, '');
			if (p.indexOf(name + '=') === 0) return p.slice(name.length + 1);
		}
		return null;
	}
	function stored(key) {
		try { return localStorage.getItem(key); } catch (e) { return null; }
	}
	var t = cookie('${THEME_COOKIE}');
	if (t !== 'light' && t !== 'dark' && t !== 'system') t = stored('${THEME_KEY}');
	if (t !== 'light' && t !== 'dark') {
		try { t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; } catch (e) { t = 'light'; }
	}
	d.setAttribute('data-theme', t);
	var s = cookie('${TEXT_SIZE_COOKIE}');
	if (s !== 'large' && s !== 'normal') s = stored('${TEXT_SIZE_KEY}');
	if (s === 'large') d.setAttribute('data-text-size', 'large');
})();`;
