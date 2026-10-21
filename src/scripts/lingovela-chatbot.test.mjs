import assert from 'node:assert/strict';
import test from 'node:test';
import { findRelevantKnowledge, readChatCompletionAnswer } from './lingovela-chatbot.js';

const knowledge = [
	{
		source: 'modul-a1.docx',
		title: 'Modul A1',
		paragraphStart: 1,
		paragraphEnd: 2,
		text: 'Hola berarti halo. Buenos días digunakan untuk menyapa pada pagi hari.',
	},
	{
		source: 'buku-dasar.docx',
		title: 'Buku Dasar',
		paragraphStart: 4,
		paragraphEnd: 5,
		text: 'Kata kerja tener digunakan untuk menyebut usia dalam bahasa Spanyol.',
	},
];

test('retrieves passages that share meaningful question terms', () => {
	assert.equal(findRelevantKnowledge('Apa arti buenos dias?', knowledge)[0].source, 'modul-a1.docx');
});

test('returns no references when the question has no matching terms', () => {
	assert.deepEqual(findRelevantKnowledge('Bagaimana membuat pesawat luar angkasa?', knowledge), []);
});

test('limits the number of returned references', () => {
	assert.equal(findRelevantKnowledge('bahasa Spanyol', knowledge, 1).length, 1);
});

test('reads a non-empty answer from a Groq chat completion', () => {
	assert.equal(readChatCompletionAnswer({ choices: [{ message: { content: ' Hola ' } }] }), 'Hola');
});

test('rejects malformed or empty Groq chat completions', () => {
	assert.equal(readChatCompletionAnswer({ choices: [{ message: { content: '' } }] }), null);
	assert.equal(readChatCompletionAnswer({ error: 'unavailable' }), null);
});
