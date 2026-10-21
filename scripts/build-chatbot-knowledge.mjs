import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mammoth from 'mammoth';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'src', 'data', 'chatbot-knowledge.generated.js');
const maxChunkLength = 1800;
const sources = [
	{
		file: 'buku-bahasa-spanyol-dasar.docx',
		title: 'Buku Bahasa Spanyol Dasar',
	},
	{
		file: 'pdf-belajar-spanyolpdf.docx',
		title: 'Belajar Spanyol',
	},
	{
		file: 'pdf-modul-bahasa-spanyol-a1-bahasa-indonesia.docx',
		title: 'Modul Bahasa Spanyol A1 (Bahasa Indonesia)',
	},
];

function splitLongParagraph(text) {
	const pieces = [];
	let remaining = text;

	while (remaining.length > maxChunkLength) {
		let boundary = remaining.lastIndexOf(' ', maxChunkLength);
		if (boundary < maxChunkLength * 0.6) boundary = maxChunkLength;
		pieces.push(remaining.slice(0, boundary).trim());
		remaining = remaining.slice(boundary).trim();
	}

	if (remaining) pieces.push(remaining);
	return pieces;
}

function makeChunks(text, source, title) {
	const paragraphs = text
		.split(/\r?\n+/)
		.map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
		.filter(Boolean);
	const chunks = [];
	let currentText = '';
	let firstParagraph = 1;
	let lastParagraph = 1;

	const flush = () => {
		if (!currentText) return;
		chunks.push({
			source,
			title,
			paragraphStart: firstParagraph,
			paragraphEnd: lastParagraph,
			text: currentText,
		});
		currentText = '';
	};

	paragraphs.forEach((paragraph, index) => {
		const paragraphNumber = index + 1;
		for (const piece of splitLongParagraph(paragraph)) {
			const nextText = currentText ? `${currentText}\n${piece}` : piece;
			if (currentText && nextText.length > maxChunkLength) flush();
			if (!currentText) firstParagraph = paragraphNumber;
			currentText = currentText ? `${currentText}\n${piece}` : piece;
			lastParagraph = paragraphNumber;
		}
	});
	flush();
	return chunks;
}

const knowledge = [];
for (const { file, title } of sources) {
	const sourcePath = path.join(root, 'lessons', 'Español', file);
	const { value } = await mammoth.extractRawText({ path: sourcePath });
	knowledge.push(...makeChunks(value, file, title));
}

if (knowledge.length === 0) {
	throw new Error('No text was extracted from the Spanish lesson documents.');
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `export const chatbotKnowledge = ${JSON.stringify(knowledge)};\n`, 'utf8');
console.log(`Chatbot knowledge: extracted ${knowledge.length} passages from ${sources.length} DOCX files.`);
