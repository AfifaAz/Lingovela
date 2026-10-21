import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { ALT_MAX, altTextsOf, checkAltLength } from './alt-text.mjs';

const website = fileURLToPath(new URL('..', import.meta.url));

test('finds alt attributes, iframe titles and alt props', () => {
	const source = [
		'<img src="/a.svg" alt="Ein Bild" />',
		'<iframe src="/b.html" title="Animation: Ablauf"></iframe>',
		"const pic = { src: '/c.webp', alt: 'Ein Foto' };",
		'<Image alt={`Vorlage`} />',
	].join('\n');
	assert.deepEqual(
		altTextsOf(source).map((a) => a.text),
		['Ein Bild', 'Animation: Ablauf', 'Ein Foto', 'Vorlage'],
	);
});

test('flags a text alternative of 140 characters, accepts 139', () => {
	assert.deepEqual(checkAltLength(`<img alt="${'x'.repeat(ALT_MAX - 1)}" />`), []);
	const findings = checkAltLength(`<p>\n<img alt="${'x'.repeat(ALT_MAX)}" />`);
	assert.equal(findings.length, 1);
	assert.match(findings[0], /^line 2: text alternative has 140 characters/);
});

test('ignores the title of a non-iframe element', () => {
	assert.deepEqual(checkAltLength(`<abbr title="${'x'.repeat(200)}">KI</abbr>`), []);
});

const walk = (dir) =>
	readdirSync(dir).flatMap((f) => {
		const path = join(dir, f);
		return statSync(path).isDirectory() ? walk(path) : [path];
	});

test('every text alternative on the website stays under 140 characters', () => {
	const findings = walk(join(website, 'src'))
		.filter((f) => /\.(mdx|md|astro|tsx|jsx|ts|mjs)$/.test(f) && !f.endsWith('.test.mjs'))
		.flatMap((f) => checkAltLength(readFileSync(f, 'utf8')).map((m) => `${relative(website, f)} ${m}`));
	assert.deepEqual(findings, []);
});
