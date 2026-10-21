import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkPage, MAX_TITLE, MIN_DESCRIPTION, MAX_DESCRIPTION } from './check-search-snippets.mjs';

const head = ({ title = 'Embeddings — KI einfach verstehen', description = 'x'.repeat(120), siteName = true, modified = true } = {}) =>
	`<html><head><title>${title}</title><meta name="description" content="${description}">` +
	(siteName ? '<meta property="og:site_name" content="KI einfach verstehen">' : '') +
	(modified ? '<meta name="dcterms.modified" content="2026-10-13">' : '') +
	'</head><body><title>not the head</title></body></html>';

test('a page with fitting title, description, site name and date passes', () => {
	assert.deepEqual(checkPage(head()), []);
});

test('titles over the limit fail, entities count as one character', () => {
	assert.equal(checkPage(head({ title: 'a'.repeat(MAX_TITLE) })).length, 0);
	assert.equal(checkPage(head({ title: `${'a'.repeat(MAX_TITLE - 1)}&amp;` })).length, 0);
	assert.match(checkPage(head({ title: 'a'.repeat(MAX_TITLE + 1) }))[0], /title has 66 characters/);
});

test('descriptions outside the range fail', () => {
	assert.match(checkPage(head({ description: 'a'.repeat(MIN_DESCRIPTION - 1) }))[0], /description has 69/);
	assert.match(checkPage(head({ description: 'a'.repeat(MAX_DESCRIPTION + 1) }))[0], /description has 161/);
	assert.equal(checkPage(head({ description: `${'a'.repeat(MAX_DESCRIPTION - 1)}&quot;` })).length, 0);
});

test('missing site name or modified date fail', () => {
	assert.deepEqual(checkPage(head({ siteName: false })), ['no og:site_name']);
	assert.match(checkPage(head({ modified: false }))[0], /no dcterms\.modified/);
});

test('without git history the date is not required', () => {
	assert.deepEqual(checkPage(head({ modified: false }), { requireModified: false }), []);
});
