const ignoredWords = new Set([
	'ahi', 'algo', 'algun', 'alguna', 'algunas', 'algunos', 'ante', 'antes',
	'aqui', 'como', 'con', 'cual', 'cuando', 'de', 'del', 'desde', 'donde',
	'el', 'ella', 'ellas', 'ellos', 'en', 'entre', 'era', 'es', 'esa', 'esas',
	'ese', 'eso', 'esos', 'esta', 'estas', 'este', 'esto', 'estos', 'fue',
	'ha', 'hay', 'la', 'las', 'le', 'les', 'lo', 'los', 'mas', 'me', 'mi',
	'mis', 'muy', 'no', 'nos', 'o', 'para', 'pero', 'por', 'que', 'se',
	'si', 'sin', 'sobre', 'su', 'sus', 'te', 'tu', 'tus', 'un', 'una',
	'unas', 'uno', 'unos', 'y', 'ya',
]);

function tokenize(value) {
	return value
		.toLocaleLowerCase('id')
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.match(/[\p{Letter}\p{Number}]{3,}/gu) ?? [];
}

export function findRelevantKnowledge(question, knowledge, limit = 4) {
	const queryTerms = new Set(tokenize(question).filter((term) => !ignoredWords.has(term)));
	if (queryTerms.size === 0) return [];

	return knowledge
		.map((entry) => {
			const textTerms = new Set(tokenize(entry.text));
			const score = [...queryTerms].reduce((total, term) => total + Number(textTerms.has(term)), 0);
			return { entry, score };
		})
		.filter(({ score }) => score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map(({ entry }) => entry);
}

export function readChatCompletionAnswer(value) {
	if (!value || typeof value !== 'object' || !('choices' in value) || !Array.isArray(value.choices)) return null;
	const firstChoice = value.choices[0];
	if (!firstChoice || typeof firstChoice !== 'object' || !('message' in firstChoice)) return null;
	const message = firstChoice.message;
	if (!message || typeof message !== 'object' || !('content' in message)) return null;
	return typeof message.content === 'string' && message.content.trim() ? message.content.trim() : null;
}
