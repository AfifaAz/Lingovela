import assert from 'node:assert/strict';
import test from 'node:test';
import {
	completeLingovelaChapter,
	emptyLingovelaProgress,
	getLingovelaProgressSummary,
	getUnlockedChapterIds,
	normalizeLingovelaProgress,
} from './lingovela-game.js';

const chapters = ['salam', 'perkenalan', 'alfabet'];

test('only the first chapter starts unlocked', () => {
	assert.deepEqual(getUnlockedChapterIds(chapters, []), ['salam']);
});

test('completing a chapter unlocks exactly the next chapter', () => {
	const progress = completeLingovelaChapter(emptyLingovelaProgress(), 'salam', chapters);
	assert.deepEqual(progress.completed, ['salam']);
	assert.deepEqual(getUnlockedChapterIds(chapters, progress.completed), ['salam', 'perkenalan']);
});

test('a locked chapter cannot be marked complete', () => {
	const progress = completeLingovelaChapter(emptyLingovelaProgress(), 'alfabet', chapters);
	assert.deepEqual(progress.completed, []);
});

test('progress normalization ignores unknown ids and later chapters beyond a gap', () => {
	const progress = normalizeLingovelaProgress(
		{ version: 1, completed: ['salam', 'not-a-chapter', 'alfabet'] },
		chapters,
	);
	assert.deepEqual(progress.completed, ['salam']);
});

test('finishing all chapters reports no next chapter', () => {
	assert.deepEqual(getLingovelaProgressSummary(chapters, chapters), {
		completed: 3,
		total: 3,
		nextChapterId: null,
	});
});

test('invalid stored progress starts fresh', () => {
	assert.deepEqual(normalizeLingovelaProgress({ version: 9 }, chapters), emptyLingovelaProgress());
});
