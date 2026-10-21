// Guard for the colour tokens: every text and control colour the site pairs
// with a surface keeps its WCAG 2.2 AA contrast in the light AND the dark
// theme. Runs without a browser (part of `pnpm lint`); the full page audit in
// the real Chrome is scripts/a11y/browser-audit.js.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { contrast } from './browser-audit.js';

const css = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');

const block = (selector) => {
	const start = css.indexOf(`${selector} {`);
	assert.ok(start >= 0, `${selector} block missing in tokens.css`);
	return css.slice(start, css.indexOf('\n}', start));
};

const tokens = (text) => Object.fromEntries([...text.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

const light = tokens(block(':root'));
const themes = { light, dark: { ...light, ...tokens(block(":root[data-theme='dark']")) } };

const resolve = (theme, name) => {
	let value = themes[theme][name];
	for (let i = 0; i < 5 && value?.startsWith('var('); i++) value = themes[theme][value.slice(6, -1)];
	assert.match(value ?? '', /^#[0-9a-f]{6}$/i, `--${name} is not a plain hex colour in the ${theme} theme`);
	const n = parseInt(value.slice(1), 16);
	return { r: n >> 16, g: (n >> 8) & 255, b: n & 255, a: 1 };
};

// [foreground, background, minimum]: 4.5 for text (1.4.3), 3 for focus rings,
// field borders and other parts needed to see a control (1.4.11).
const PAIRS = [
	...['ground-page', 'ground-zone'].flatMap((bg) => [
		['ink', bg, 4.5],
		['ink-muted', bg, 4.5],
		['petrol-deep', bg, 4.5],
		['petrol', bg, 3],
		['error', bg, 4.5],
		['focus', bg, 3],
	]),
	['amber-deep', 'ground-page', 4.5],
	['amber-deep', 'amber-soft', 4.5],
	['ink', 'amber-soft', 4.5],
	['petrol-deep', 'petrol-soft', 4.5],
	['ink', 'field-bg', 4.5],
	['field-placeholder', 'field-bg', 4.5],
	['field-border', 'field-bg', 3],
	['error', 'field-error-bg', 4.5],
];

for (const theme of Object.keys(themes)) {
	test(`colour tokens keep WCAG AA contrast (${theme} theme)`, () => {
		const failures = PAIRS.map(([fg, bg, min]) => ({ fg, bg, min, ratio: contrast(resolve(theme, fg), resolve(theme, bg)) }))
			.filter(({ ratio, min }) => ratio < min)
			.map(({ fg, bg, min, ratio }) => `--${fg} on --${bg}: ${ratio.toFixed(2)}:1, needs ${min}:1`);
		assert.deepEqual(failures, []);
	});
}
