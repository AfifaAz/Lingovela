// Build-time "last changed" stamp for a content file: the newest commit that
// touched it, so a reader (and the author) can trace any page back to the
// exact change. Never fails the build -- without git history (or in a
// shallow clone, where every file would wrongly report the same commit) the
// stamp is simply left out.
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const GITHUB_REPO_URL = 'https://github.com/silvio-l/ki-einfach-verstehen-website';

export interface LastCommit {
	hash: string;
	short: string;
	/** ISO date (YYYY-MM-DD) of the commit. */
	date: string;
	/** Only in the public mirror build, whose commits are public. */
	url?: string;
	/** The file has changes not yet committed (local or staging builds). */
	dirty: boolean;
}

const git = (args: string[]) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();

let repo: { usable: boolean; isMirror: boolean } | undefined;
function repoInfo() {
	if (repo) return repo;
	try {
		const shallow = git(['rev-parse', '--is-shallow-repository']) === 'true';
		// The public mirror is packages/website split out as its own repo.
		const isMirror = path.resolve(git(['rev-parse', '--show-toplevel'])) === path.resolve(process.cwd());
		repo = { usable: !shallow, isMirror };
	} catch {
		repo = { usable: false, isMirror: false };
	}
	return repo;
}

/** ISO date (YYYY-MM-DD) of the commit that first added the file (following
 * renames, e.g. the .md -> .mdx conversion) -- the page's publication date
 * for structured data. Undefined without usable history. */
export function firstCommitDate(filePath: string | undefined): string | undefined {
	const { usable } = repoInfo();
	if (!filePath || !usable) return undefined;
	try {
		const file = path.resolve(process.cwd(), filePath);
		const dates = git(['log', '--follow', '--diff-filter=A', '--format=%cs', '--', file]).split('\n').filter(Boolean);
		return dates.at(-1) || undefined;
	} catch {
		return undefined;
	}
}

export function lastCommit(filePath: string | undefined): LastCommit | undefined {
	const { usable, isMirror } = repoInfo();
	if (!filePath || !usable) return undefined;
	try {
		const file = path.resolve(process.cwd(), filePath);
		const [hash, date] = git(['log', '-1', '--format=%H%x09%cs', '--', file]).split('\t');
		if (!hash || !date) return undefined;
		const dirty = git(['status', '--porcelain', '--', file]) !== '';
		return { hash, short: hash.slice(0, 7), date, dirty, url: isMirror ? `${GITHUB_REPO_URL}/commit/${hash}` : undefined };
	} catch {
		return undefined;
	}
}

/** ISO date (YYYY-MM-DD) of the newest commit touching any of the given
 * paths (files, directories or git pathspec globs, relative to the package
 * root) -- the "last changed" date of a page assembled from several sources,
 * e.g. a hub page plus the entries it lists. Undefined without usable
 * history, so the page then simply carries no date. */
export function newestCommitDate(paths: string[]): string | undefined {
	const { usable } = repoInfo();
	if (paths.length === 0 || !usable) return undefined;
	try {
		return git(['log', '-1', '--format=%cs', '--', ...paths]) || undefined;
	} catch {
		return undefined;
	}
}
