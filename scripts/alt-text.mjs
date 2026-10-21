/**
 * Text alternatives stay under 140 characters, on the website and in the
 * book, DE and EN (Kindle Publishing Guidelines 11.4.1, user decision
 * 2026-10-10). Details belong in the caption or the body text.
 *
 * The book takes an image's alt, or a mechanism iframe's title, as its
 * text alternative (packages/ebook/scripts/figures.mjs), so both count.
 */
export const ALT_MAX = 140;

// alt="…" on any tag, title="…" on an iframe, and alt: '…' in component props.
const PATTERNS = [
	/<[A-Za-z][\w.]*\b[^>]*?\balt=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{"([^"]*)"\}|\{'([^']*)'\})/g,
	/<iframe\b[^>]*?\btitle=(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{"([^"]*)"\}|\{'([^']*)'\})/g,
	/\balt:\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`)/g,
];

/** Every literal text alternative in a source file, with its line number. */
export function altTextsOf(source) {
	const found = [];
	for (const pattern of PATTERNS)
		for (const m of source.matchAll(pattern)) {
			const text = m.slice(1).find((g) => g !== undefined);
			found.push({ text, line: source.slice(0, m.index).split('\n').length });
		}
	return found.sort((a, b) => a.line - b.line);
}

/** One message per text alternative that reaches ALT_MAX characters. */
export function checkAltLength(source) {
	return altTextsOf(source)
		.filter(({ text }) => text.length >= ALT_MAX)
		.map(
			({ text, line }) =>
				`line ${line}: text alternative has ${text.length} characters (must stay under ${ALT_MAX}, KPG 11.4.1): "${text.slice(0, 50)}…" -- move details into the caption or body`,
		);
}
