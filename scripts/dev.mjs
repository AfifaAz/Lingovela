import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const astroCli = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
const children = [
	spawn(process.execPath, [fileURLToPath(new URL('./chatbot-api-dev.mjs', import.meta.url))], {
		stdio: 'inherit',
	}),
	spawn(process.execPath, [astroCli, 'dev'], { stdio: 'inherit' }),
];

let stopping = false;

function stopChildren(signal = 'SIGTERM') {
	if (stopping) return;
	stopping = true;
	for (const child of children) {
		if (child.exitCode === null && child.signalCode === null) child.kill(signal);
	}
}

for (const child of children) {
	child.on('error', (error) => {
		console.error('Could not start a local development process:', error.message);
		process.exitCode = 1;
		stopChildren();
	});
	child.on('exit', (code, signal) => {
		if (!stopping) {
			process.exitCode = code ?? (signal ? 1 : 0);
			stopChildren();
		}
	});
}

process.on('SIGINT', () => stopChildren('SIGINT'));
process.on('SIGTERM', () => stopChildren('SIGTERM'));
