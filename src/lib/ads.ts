// Google AdSense wiring. The publisher id is public by nature (it sits in
// every page's source and in /ads.txt), so it lives here and not in a secret.
// Opt-in: ads only load when the build sets PUBLIC_ADS=on. Paused while the
// site has too little traffic to earn anything -- the ad script plus Google's
// consent dialog cost ~300 KB and the mobile LCP budget for no revenue
// (SEO/Matomo audit 2026-10-01). Set PUBLIC_ADS=on in the deploy workflow to
// switch them back on; staging never sets it.
// Consent (GDPR/TCF) is handled by Google's own certified CMP, configured in
// the AdSense account under "Datenschutz und Mitteilungen"; adsbygoogle.js
// shows it before any personalised ad is requested.
export const ADSENSE_CLIENT = 'ca-pub-1412276258860773';
export const ADS_ENABLED = import.meta.env.PUBLIC_ADS === 'on';

// Ad unit slots, created in the AdSense account ("Anzeigen → Nach
// Anzeigenblock"). One responsive display unit per placement so reports can
// tell them apart. Every placement sits outside the running text: never in
// the hero, never between paragraphs, never in a quiz or knowledge check.
export const AD_SLOTS = {
	/** End of a Baustein, after the feedback box. */
	bausteinEnd: '2077449056',
	/** Homepage, below the Wegkarte. */
	homeWegkarte: '5825122376',
} as const;
