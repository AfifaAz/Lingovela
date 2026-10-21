import assert from 'node:assert/strict';
import test from 'node:test';
import {
	QUIZ_STORAGE_KEY,
	emptyQuizProgress,
	isQuestionDue,
	nextDueAt,
	readQuizProgress,
	recordAnswer,
	scheduleReview,
	summarizeQuizStatus,
} from '../src/scripts/quiz-progress.js';

const NOW = Date.parse('2026-08-21T12:00:00.000Z');
const DAY_MS = 24 * 60 * 60 * 1000;

test('a first correct answer becomes due after three days', () => {
	const record = scheduleReview(undefined, true, NOW);
	assert.equal(record.level, 1);
	assert.equal(Date.parse(record.dueAt), NOW + 3 * DAY_MS);
});

test('correct answers advance intervals and stop at the final level', () => {
	let record;
	for (let i = 0; i < 8; i += 1) record = scheduleReview(record, true, NOW);
	assert.equal(record.level, 5);
	assert.equal(Date.parse(record.dueAt), NOW + 60 * DAY_MS);
});

test('an incorrect answer resets progress and becomes due tomorrow', () => {
	const record = scheduleReview({ level: 4, attempts: 6 }, false, NOW);
	assert.equal(record.level, 0);
	assert.equal(record.attempts, 7);
	assert.equal(Date.parse(record.dueAt), NOW + DAY_MS);
});

test('unseen and elapsed questions are due, future questions are not', () => {
	let progress = emptyQuizProgress();
	assert.equal(isQuestionDue(progress, 'lesson', 'q1', NOW), true);
	progress = recordAnswer(progress, 'lesson', 'q1', true, NOW);
	assert.equal(isQuestionDue(progress, 'lesson', 'q1', NOW + DAY_MS), false);
	assert.equal(isQuestionDue(progress, 'lesson', 'q1', NOW + 3 * DAY_MS), true);
});

test('the earliest review date is calculated across lesson questions', () => {
	let progress = emptyQuizProgress();
	progress = recordAnswer(progress, 'lesson', 'q1', true, NOW);
	progress = recordAnswer(progress, 'lesson', 'q2', false, NOW);
	assert.equal(nextDueAt(progress, 'lesson', [{ id: 'q1' }, { id: 'q2' }]), NOW + DAY_MS);
});

test('invalid persisted data falls back to an empty versioned store', () => {
	const storage = { getItem: (key) => key === QUIZ_STORAGE_KEY ? '{broken' : null };
	assert.deepEqual(readQuizProgress(storage), emptyQuizProgress());
});

test('summarizeQuizStatus reports "none" for a lesson without questions', () => {
	const summary = summarizeQuizStatus(emptyQuizProgress(), 'lesson', [], NOW);
	assert.deepEqual(summary, { state: 'none', dueCount: 0, total: 0, nextDueAt: undefined });
});

test('summarizeQuizStatus reports "new" when no question was ever answered', () => {
	const questions = [{ id: 'q1' }, { id: 'q2' }];
	const summary = summarizeQuizStatus(emptyQuizProgress(), 'lesson', questions, NOW);
	assert.equal(summary.state, 'new');
	assert.equal(summary.dueCount, 2);
	assert.equal(summary.total, 2);
});

test('summarizeQuizStatus reports "due" once at least one answered question is due again', () => {
	const questions = [{ id: 'q1' }, { id: 'q2' }];
	let progress = emptyQuizProgress();
	progress = recordAnswer(progress, 'lesson', 'q1', true, NOW);
	progress = recordAnswer(progress, 'lesson', 'q2', false, NOW);
	const summary = summarizeQuizStatus(progress, 'lesson', questions, NOW + DAY_MS);
	assert.equal(summary.state, 'due');
	assert.equal(summary.dueCount, 1);
});

test('summarizeQuizStatus reports "up-to-date" once every question is answered and none is due', () => {
	const questions = [{ id: 'q1' }, { id: 'q2' }];
	let progress = emptyQuizProgress();
	progress = recordAnswer(progress, 'lesson', 'q1', true, NOW);
	progress = recordAnswer(progress, 'lesson', 'q2', true, NOW);
	const summary = summarizeQuizStatus(progress, 'lesson', questions, NOW + DAY_MS);
	assert.equal(summary.state, 'up-to-date');
	assert.equal(summary.dueCount, 0);
	assert.equal(summary.nextDueAt, NOW + 3 * DAY_MS);
});
