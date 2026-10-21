// Self-hosted Matomo instance (existing, shared across projects -- see
// ~/.claude/infrastructure/README.md, and the dedicated admin project at
// ~/Documents/Projekte/matomo, docs/sites.md). Not a secret: the site ID
// and tracker URL are visible in the client-side snippet by definition,
// so both are committed literals rather than env vars.
export const MATOMO_URL = 'https://matomo.silvio-und-maik.de/';
// Site 9, "KI einfach verstehen" -- registered 2026-08-24.
export const MATOMO_SITE_ID = 9;
// The tracker starts only on these exact hostnames (PageShell.astro), so
// local previews of a production build (localhost) never count as visits.
export const MATOMO_HOSTS = ['ki-einfach-verstehen.de', 'www.ki-einfach-verstehen.de'];

// Client-side custom event, best-effort: the tracker may be absent (dev,
// staging, blocked) and must never break the interaction it decorates.
// Category > Action > Name mirrors Matomo's own report hierarchy.
export function trackEvent(category: string, action: string, name?: string): void {
	try {
		(window as unknown as { _paq?: unknown[][] })._paq?.push(['trackEvent', category, action, name]);
	} catch {
		/* tracking best-effort */
	}
}
