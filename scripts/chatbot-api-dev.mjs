import { createServer } from 'node:http';
import { handleChatRequest } from '../api/chat.js';

const maxRequestBytes = 16_000;
const port = 4322;

const server = createServer(async (incoming, outgoing) => {
	if (incoming.url !== '/api/chat') {
		outgoing.writeHead(404).end();
		return;
	}

	const chunks = [];
	let size = 0;
	for await (const chunk of incoming) {
		size += chunk.length;
		if (size > maxRequestBytes) {
			outgoing.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
			outgoing.end(JSON.stringify({ error: 'Ukuran permintaan terlalu besar.' }));
			return;
		}
		chunks.push(chunk);
	}

	const headers = new Headers();
	for (const [name, value] of Object.entries(incoming.headers)) {
		if (typeof value === 'string') headers.set(name, value);
		else if (Array.isArray(value)) headers.set(name, value.join(', '));
	}
	headers.delete('origin');

	const method = incoming.method ?? 'GET';
	const request = new Request(`http://127.0.0.1:${port}${incoming.url}`, {
		method,
		headers,
		body: method === 'GET' || method === 'HEAD' ? undefined : Buffer.concat(chunks),
	});
	const response = await handleChatRequest(request);

	outgoing.writeHead(response.status, Object.fromEntries(response.headers));
	outgoing.end(Buffer.from(await response.arrayBuffer()));
});

server.listen(port, '127.0.0.1', () => {
	console.log(`Local chatbot API listening on http://127.0.0.1:${port}`);
});
