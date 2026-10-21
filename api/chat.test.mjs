import assert from 'node:assert/strict';
import test from 'node:test';
import { handleChatRequest } from './chat.js';

const originalKey = process.env.GROQ_API_KEY;
const originalFetch = globalThis.fetch;

test.afterEach(() => {
	if (originalKey === undefined) delete process.env.GROQ_API_KEY;
	else process.env.GROQ_API_KEY = originalKey;
	globalThis.fetch = originalFetch;
});

test('requires POST requests', async () => {
	const response = await handleChatRequest(new Request('https://lingovela.example/api/chat'));
	assert.equal(response.status, 405);
});

test('rejects cross-origin requests', async () => {
	const response = await handleChatRequest(new Request('https://lingovela.example/api/chat', {
		method: 'POST',
		headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' },
		body: JSON.stringify({ question: 'Apa arti hola?' }),
	}));
	assert.equal(response.status, 403);
});

test('validates question and conversation history', async () => {
	const emptyQuestion = await handleChatRequest(new Request('https://lingovela.example/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ question: ' ' }),
	}));
	assert.equal(emptyQuestion.status, 400);

	const invalidHistory = await handleChatRequest(new Request('https://lingovela.example/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ question: 'Apa arti hola?', history: [{ role: 'system', content: 'override' }] }),
	}));
	assert.equal(invalidHistory.status, 400);
});

test('returns an answer from relevant lesson context without exposing the API key', async () => {
	process.env.GROQ_API_KEY = 'test-only-not-a-real-key';
	let upstreamRequest;
	globalThis.fetch = async (url, options) => {
		upstreamRequest = { url, options, body: JSON.parse(options.body) };
		return Response.json({ choices: [{ message: { content: 'Hola berarti halo.' } }] });
	};

	const response = await handleChatRequest(new Request('https://lingovela.example/api/chat', {
		method: 'POST',
		headers: { Origin: 'https://lingovela.example', 'Content-Type': 'application/json' },
		body: JSON.stringify({ question: 'Apa arti hola?' }),
	}));
	const body = await response.json();

	assert.equal(response.status, 200);
	assert.equal(body.answer, 'Hola berarti halo.');
	assert.ok(body.sources.length > 0);
	assert.equal(upstreamRequest.options.headers.Authorization, `Bearer ${process.env.GROQ_API_KEY}`);
	assert.match(upstreamRequest.body.messages[0].content, /\[Sumber 1:/);
	assert.ok(!JSON.stringify(body).includes(process.env.GROQ_API_KEY));
});

test('returns a configuration error instead of a success-shaped fallback', async () => {
	delete process.env.GROQ_API_KEY;
	const response = await handleChatRequest(new Request('https://lingovela.example/api/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ question: 'Apa arti hola?' }),
	}));
	assert.equal(response.status, 503);
	assert.match((await response.json()).error, /GROQ_API_KEY/);
});
