// WCAG audit that runs inside the real Chrome (visual checks only happen in
// the user's browser, never headless). Paste into the console of any page on
// the preview server (`pnpm build && pnpm exec astro preview`), or inject it
// with the Chrome extension, then call:
//
//   await kevA11yAudit({ paths: ['/'], themes: ['light', 'dark'] })
//
// Without `paths`, every page from /sitemap-0.xml is checked. Each page is
// loaded in a same-origin iframe, so the run is deterministic: same build,
// same rules, same result.
//
// Checks:
// - axe-core (WCAG 2.0/2.1/2.2 A and AA rules, incl. colour contrast of text
//   and target size),
// - non-text contrast (WCAG 1.4.11): icons inside controls and decorative icons
//   next to text need 3:1 against the colour actually behind them,
// - focus visible (WCAG 2.4.7): every focusable control must look different
//   when focused by keyboard.

const AXE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.10.2/axe.min.js';
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const parseRgb = (value) => {
	const m = /rgba?\(([^)]+)\)/.exec(value || '');
	if (!m) return null;
	const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
	return { r, g, b, a };
};

const luminance = ({ r, g, b }) => {
	const lin = (c) => {
		const s = c / 255;
		return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};

export const contrast = (a, b) => {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
};

const blend = (top, bottom) => ({
	r: top.r * top.a + bottom.r * (1 - top.a),
	g: top.g * top.a + bottom.g * (1 - top.a),
	b: top.b * top.a + bottom.b * (1 - top.a),
	a: 1,
});

/** Colours behind `el`: one entry, or every stop of a gradient (the worst one counts). */
const backgroundsOf = (el) => {
	const layers = [];
	for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
		const cs = node.ownerDocument.defaultView.getComputedStyle(node);
		const image = cs.backgroundImage;
		if (image && image !== 'none' && /gradient/.test(image)) {
			const stops = (image.match(/rgba?\([^)]+\)/g) || []).map(parseRgb);
			if (stops.length) {
				layers.push(stops);
				break;
			}
		}
		const color = parseRgb(cs.backgroundColor);
		if (color && color.a > 0) {
			layers.push([color]);
			if (color.a >= 1) break;
		}
	}
	let result = [{ r: 255, g: 255, b: 255, a: 1 }];
	for (const layer of layers.reverse()) {
		result = layer.flatMap((top) => result.map((bottom) => (top.a >= 1 ? top : blend(top, bottom))));
	}
	return result;
};

const isShown = (el) => {
	const win = el.ownerDocument.defaultView;
	const rect = el.getBoundingClientRect();
	if (rect.width === 0 || rect.height === 0) return false;
	for (let node = el; node && node.nodeType === 1; node = node.parentElement) {
		const cs = win.getComputedStyle(node);
		if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
	}
	return true;
};

const label = (el) => {
	const id = el.closest('[data-testid]')?.getAttribute('data-testid');
	const name = (node) => {
		const cls = String(node.className?.baseVal ?? node.className ?? '').split(' ')[0];
		return `${node.tagName.toLowerCase()}${cls ? '.' + cls : ''}`;
	};
	const parent = el.parentElement ? name(el.parentElement) + ' > ' : '';
	return [id && `[data-testid=${id}]`, parent + name(el)].filter(Boolean).join(' ');
};

/** WCAG 1.4.11 for icons: the painted stroke/fill against everything behind it. */
const iconContrast = (doc) => {
	const out = [];
	for (const svg of doc.querySelectorAll('svg')) {
		if (!isShown(svg)) continue;
		const interactive = svg.closest('button, a, [role="button"], summary, label');
		// 1.4.11 covers graphics needed to understand or operate something: an icon
		// that alone tells what a control does, or an informative image. An icon next
		// to the control's visible text, and a decorative mark, are not required.
		const visibleText = interactive && interactive.innerText.trim().length > 0;
		const decorative = svg.closest('[aria-hidden="true"]');
		const meaningful = interactive ? !visibleText : svg.getAttribute('role') === 'img' && !decorative;
		if (!meaningful || svg.closest('.kev-demo [role="img"], figure')) continue;
		const win = doc.defaultView;
		const painted = [...svg.querySelectorAll('path, line, circle, rect, polyline, polygon, ellipse')].find(isShown) || svg;
		const cs = win.getComputedStyle(painted);
		const ink = [cs.stroke, cs.fill]
			.filter((v) => v && v !== 'none')
			.map((v) => parseRgb(v === 'currentcolor' ? cs.color : v))
			.find((c) => c && c.a > 0);
		if (!ink) continue;
		const opacity = Number(win.getComputedStyle(svg).opacity) * Number(cs.opacity);
		const backs = backgroundsOf(svg);
		const worst = Math.min(...backs.map((back) => contrast(blend({ ...ink, a: ink.a * opacity }, back), back)));
		if (worst < 3) out.push({ target: label(interactive || svg), ratio: Math.round(worst * 100) / 100 });
	}
	return out;
};

/** Style rules that only apply while an element has focus, with the selector
 *  rewritten to match the element without focus (`a:focus-visible` -> `a`). */
const focusRules = (doc) => {
	const rules = [];
	const VISIBLE = /outline|box-shadow|border|background|text-decoration|color/;
	const walk = (list) => {
		for (const rule of list) {
			if (rule.cssRules && !rule.selectorText) {
				if (!rule.media || doc.defaultView.matchMedia(rule.media.mediaText).matches) walk(rule.cssRules);
				continue;
			}
			if (!rule.selectorText || !/:focus(?!-within)/.test(rule.selectorText)) continue;
			const style = rule.style;
			const props = [...style].filter((p) => VISIBLE.test(p));
			if (!props.length) continue;
			// outline: none / 0 alone does not make focus visible.
			const onlyRemovesOutline = props.every((p) => p.startsWith('outline') && /none|^0/.test(style.getPropertyValue(p)));
			if (onlyRemovesOutline) continue;
			for (const part of rule.selectorText.split(',')) {
				if (!/:focus(?!-within)/.test(part)) continue;
				const plain = part.replace(/:focus-visible|:focus(?!-within)/g, '').trim() || '*';
				rules.push(plain);
			}
		}
	};
	for (const sheet of doc.styleSheets) {
		try {
			walk(sheet.cssRules);
		} catch {
			// cross-origin sheet (fonts): no focus styles there
		}
	}
	return rules;
};

/** WCAG 2.4.7: every control must have a style rule that changes it on focus,
 *  or keep the browser's default focus ring. */
const focusVisible = (doc) => {
	const rules = focusRules(doc);
	const resets = outlineResets(doc);
	const out = [];
	const controls = [...doc.querySelectorAll('a[href], button, input, select, textarea, summary, [tabindex]:not([tabindex="-1"])')].filter(
		(el) => !el.disabled && isShown(el),
	);
	const matches = (el, selector) => {
		try {
			return el.matches(selector);
		} catch {
			return false;
		}
	};
	for (const el of controls) {
		if (rules.some((selector) => matches(el, selector))) continue;
		// No own focus rule: the browser default ring stays unless the author removed it.
		if (resets.some((selector) => matches(el, selector))) out.push({ target: label(el) });
	}
	return out;
};

/** Selectors of rules that set `outline: none|0` outside any focus state. */
const outlineResets = (doc) => {
	const found = [];
	const walk = (list) => {
		for (const rule of list) {
			if (rule.cssRules && !rule.selectorText) {
				walk(rule.cssRules);
				continue;
			}
			if (!rule.selectorText || /:focus/.test(rule.selectorText)) continue;
			const outline = rule.style?.getPropertyValue('outline-style') || rule.style?.getPropertyValue('outline');
			if (/none|^0/.test(outline || '')) found.push(rule.selectorText);
		}
	};
	for (const sheet of doc.styleSheets) {
		try {
			walk(sheet.cssRules);
		} catch {
			// cross-origin sheet
		}
	}
	return found;
};

const loadFrame = (doc, path, width) =>
	new Promise((resolve) => {
		const frame = doc.createElement('iframe');
		frame.style.cssText = `width:${width}px;height:900px;position:fixed;left:-${width + 50}px;top:0;`;
		frame.onload = () => setTimeout(() => resolve(frame), 1200);
		frame.src = path;
		doc.body.appendChild(frame);
	});

const injectAxe = (win) =>
	win.axe
		? Promise.resolve()
		: new Promise((resolve, reject) => {
				const s = win.document.createElement('script');
				s.src = AXE_URL;
				s.onload = resolve;
				s.onerror = reject;
				win.document.head.appendChild(s);
			});

const allPaths = async () => {
	const xml = await (await fetch('/sitemap-0.xml')).text();
	const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
	return paths;
};

export async function kevA11yAudit({ paths, themes = ['light', 'dark'], width = 1280, onPage } = {}) {
	const list = paths ?? (await allPaths());
	const report = [];
	for (const path of list) {
		for (const theme of themes) {
			const frame = await loadFrame(document, path, width);
			const win = frame.contentWindow;
			const doc = frame.contentDocument;
			// Colours fade on a theme switch; measure the settled state, not a frame of the fade.
			const still = doc.createElement('style');
			still.textContent = '*,*::before,*::after{transition:none!important;animation:none!important}';
			doc.head.appendChild(still);
			doc.documentElement.dataset.theme = theme;
			await new Promise((r) => setTimeout(r, 200));
			let axeViolations = [];
			try {
				await injectAxe(win);
				const res = await win.axe.run(doc, { runOnly: { type: 'tag', values: AXE_TAGS }, resultTypes: ['violations'] });
				axeViolations = res.violations.map((v) => ({
					id: v.id,
					impact: v.impact,
					targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
					count: v.nodes.length,
				}));
			} catch (error) {
				axeViolations = [{ id: 'axe-failed', impact: 'serious', targets: [String(error)], count: 1 }];
			}
			const entry = { path, theme, axe: axeViolations, icons: iconContrast(doc), focus: focusVisible(doc) };
			report.push(entry);
			onPage?.(entry);
			frame.remove();
		}
	}
	return report;
}

if (typeof window !== 'undefined') window.kevA11yAudit = kevA11yAudit;
