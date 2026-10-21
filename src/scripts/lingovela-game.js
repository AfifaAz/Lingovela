export const LINGOVELA_PROGRESS_KEY = 'lingovela:game:v1';

export function emptyLingovelaProgress() {
	return { version: 1, completed: [] };
}

export function normalizeLingovelaProgress(value, chapterIds) {
	if (!value || value.version !== 1 || !Array.isArray(value.completed)) return emptyLingovelaProgress();

	const saved = new Set(value.completed.filter((id) => typeof id === 'string'));
	const completed = [];
	for (const id of chapterIds) {
		if (!saved.has(id)) break;
		completed.push(id);
	}
	return { version: 1, completed };
}

export function getUnlockedChapterIds(chapterIds, completedIds) {
	const completed = new Set(completedIds);
	const unlocked = [];
	for (const id of chapterIds) {
		unlocked.push(id);
		if (!completed.has(id)) break;
	}
	return unlocked;
}

export function completeLingovelaChapter(progress, chapterId, chapterIds) {
	const unlocked = getUnlockedChapterIds(chapterIds, progress.completed);
	if (!unlocked.includes(chapterId)) return progress;
	return normalizeLingovelaProgress(
		{ version: 1, completed: [...progress.completed, chapterId] },
		chapterIds,
	);
}

export function getLingovelaProgressSummary(chapterIds, completedIds) {
	const completed = new Set(completedIds);
	return {
		completed: chapterIds.filter((id) => completed.has(id)).length,
		total: chapterIds.length,
		nextChapterId: chapterIds.find((id) => !completed.has(id)) ?? null,
	};
}
