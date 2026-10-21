---
name: Leuchtkern
description: Light-first educational brand for an approachable AI-explainer site. Petrol structure accent on white, a mint zone tint for chrome, an amber progress accent for attention moments, warm-cream paper explicitly excluded.

# All values below are the enforceable token set for packages/website. Source
# spec: packages/content/design/designsprache.md (brand-wide "Leuchtkern"
# language, decided 2026-08-20) plus the CI grilling session that adapted it
# for a light, long-form reading site (docs/chatverlauf.md), plus the
# 2026-08-20 homepage-synthesis session that added the amber second accent.
# This frontmatter is the source of truth; src/styles/tokens.css mirrors it
# verbatim by hand — keep both in sync when values change.
colors:
  # Ground and zones
  ground-page: "#FFFFFF"       # default reading surface: article bodies, glossary
  ground-zone: "#D7ECE7"       # chrome/section tint: nav, homepage sections, card grids, announcement pages (= PETROL_SOFT)
  ground-hero-0: "#0C5049"     # hero radial ground, 0% stop
  ground-hero-34: "#073B36"    # hero radial ground, 34% stop
  ground-hero-62: "#042723"    # hero radial ground, 62% stop
  ground-hero-100: "#021613"   # hero radial ground, 100% stop

  # Text
  ink: "#1B1A17"                # primary text, headings
  ink-muted: "#55524A"          # secondary text, meta, captions

  # Neutral hairlines (ground-page only — see Elevation Needs A Border rule)
  line: "#DAD6CB"
  line-deep: "#B8B3A5"

  # Petrol accent family (structure/brand accent: nav, buttons, links, cards)
  petrol: "#0E7469"             # accent on white; do not use for small text on ground-zone (4.58:1)
  petrol-deep: "#0A5148"        # links, buttons, borders, success — safe on ground-page AND ground-zone
  petrol-soft: "#D7ECE7"        # = ground-zone
  petrol-viv: "#12907F"         # large accents, icons, focus rings only — fails small-text contrast on ground-zone (3.20:1)

  # Amber accent family (second accent: progress/attention only — see "Amber Accent" below)
  amber: "#986816"              # accent on white; do not use for small text on ground-zone (3.94:1)
  amber-deep: "#62430E"         # text/borders where amber must carry small text — safe on ground-page AND ground-zone
  amber-soft: "#FBF2E0"         # pale tint for badges/highlight chips only — never a section ground (see Do Not)
  amber-viv: "#AA7418"          # large accents, icons, progress markers only — fails small-text contrast on ground-zone (3.26:1)

  # Hero-exclusive glow (never used outside Hero/announcement headers)
  halo: "#12907F"               # 44% opacity at 0%, 15% at 55%, 0% at 100%
  coreglow-hot: "#F2FCF8"       # 95% opacity
  coreglow-mid: "#9FE2D2"       # 50% opacity at 22%
  coreglow-edge: "#3FA894"      # 22% opacity at 50%
  corehot: "#FFFFFF"            # 85% opacity
  corehot-edge: "#D8F4EA"       # 30% opacity at 60%

  # State
  success: "{colors.petrol-deep}"   # 7.46:1 on ground-zone
  error: "#A8431F"                  # 4.89:1 on ground-zone, 6.02:1 on ground-page
  focus: "{colors.petrol-viv}"      # non-text UI, 3.20:1 — meets WCAG 1.4.11, not for text

  # Surface helpers that differ per theme (dark values in colors-dark below)
  zone-hover: "#CBE5DF"         # hover fill on ground-zone surfaces
  glass: "rgba(255, 255, 255, 0.55)"  # hover fill of the nav pills
  figure-bg: "linear-gradient(145deg, #FFFFFF, #D7ECE7)"

  # On-dark constants: text, lines and fills on the always-dark hero/footer
  # ground. They never flip with the theme (the hero/footer are dark in both),
  # which is why they exist next to petrol-soft, which does flip (§2 "Dark
  # reading theme"). Alphas keep each tier >= 4.5:1 against the gradient stop
  # it sits over (§6 "Footer link tiers").
  on-dark-fill: "#FFFFFF"       # primary button fill, wordmark on dark
  on-dark-ink: "#0A5148"        # text on on-dark-fill
  on-dark-soft: "#D7ECE7"       # primary footer links, focus ring on dark
  on-dark-mint: "#D8F4EA"       # ledes, taglines, light hover fill (= corehot-edge)
  on-dark-quiet: "rgba(215, 236, 231, 0.72)"     # secondary links, legal links
  on-dark-quietest: "rgba(215, 236, 231, 0.6)"   # copyright line
  on-dark-line: "rgba(215, 236, 231, 0.38)"      # language pill border
  on-dark-hairline: "rgba(215, 236, 231, 0.16)"  # legal-band divider
  on-dark-hover: "rgba(215, 236, 231, 0.14)"     # pill hover fill

  # Form controls (§6 "Form controls"; shared with the community board)
  field-bg: "#FFFFFF"
  field-bg-disabled: "#F1F5F4"
  field-border: "#8C8778"       # 3.6:1 on field-bg (WCAG 1.4.11)
  field-border-hover: "{colors.petrol}"
  field-border-focus: "{colors.petrol-deep}"
  field-placeholder: "#77736A"
  field-error-bg: "#FDF3EF"     # error text on it 5.52:1
  check-mark: "#FFFFFF"

# Dark reading theme (:root[data-theme='dark'], tokens.css). Only the tokens
# listed here change; hero ground, on-dark-*, fonts, radii and spacing stay.
# Contrast on the dark ground-page (#0F1514): ink 14.92:1, ink-muted 8.60:1,
# petrol-deep 10.56:1, error 8.39:1; on the dark ground-zone (#17302C): ink
# 11.35:1, ink-muted 6.54:1, petrol-deep 8.04:1; focus ring petrol-viv 7.34:1
# on page, 5.58:1 on zone.
colors-dark:
  ground-page: "#0F1514"
  ground-zone: "#17302C"
  ink: "#E9E7E0"
  ink-muted: "#B4B1A7"
  line: "#2A3532"
  line-deep: "#435049"
  petrol: "#4FB8A8"
  petrol-deep: "#7FD3C4"
  petrol-soft: "#17302C"        # = dark ground-zone (was the light mint, unreadable as a tint on dark)
  petrol-viv: "#3FB5A3"
  amber: "#D9A23F"
  amber-deep: "#F0C46F"
  amber-soft: "#2D2512"
  amber-viv: "#D9A03A"
  error: "#F0997A"
  zone-hover: "#1F3F39"
  glass: "rgba(255, 255, 255, 0.08)"
  figure-bg: "linear-gradient(145deg, #F4F8F7, #D7ECE7)"
  field-bg: "#141C1B"
  field-bg-disabled: "#1A2321"
  field-border: "#66756F"       # 3.6:1 on field-bg
  field-placeholder: "#8F8B81"
  field-error-bg: "#2A1A14"     # error text on it 7.60:1
  check-mark: "#0F1514"

typography:
  # Root baseline (2026-08-20): the html root is set to font-size 118%, so the
  # nominal rem tiers below render 18% larger site-wide (1rem ≈ 18.9px, body
  # "18" ≈ 21px). Tiers stay written in nominal rem — the raised baseline is a
  # single root factor, not a rewrite of the scale. A reader-facing nav toggle
  # (`data-text-size="large"`, localStorage `kev:text-size`) offers one more
  # step at 136%; it only ever raises sizes above the Legibility Floor.
  scale:
    "12": "0.75rem"      # tracked-uppercase eyebrow/badge labels only — never body/reading text
    "13": "0.8125rem"    # dense diagram annotation (Wegkarte tick/cluster labels, ProgressRail label) — not for body copy
    "14": "0.875rem"     # legal smallprint, two-letter language pill — never links or list items users read
    "15": "0.9375rem"    # spare compact-chrome step; unused since the footer de-pilled (2026-08-25, §6 "Footer link tiers") — not for paragraph/body copy
    "16": "1rem"         # compact UI chrome floor (nav link, card CTA link, secondary footer link) — not for paragraph/body copy
    "18": "1.125rem"     # default body — legibility floor, all prose copy must be ≥ this size (see §3 Legibility Floor)
    "20": "1.25rem"      # lead paragraph / card & panel titles
    "28": "1.75rem"      # H3 / subsection heads
    "40": "2.5rem"       # H2 / headline
    "64": "4rem"         # H1 / display, wide viewports
  display:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  title:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  lede:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  meta:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
  eyebrow:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.16em"
    lineHeight: 1.4

rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  pill: "999px"

# Fixed sizes (tokens.css). hit-min is the minimum tap target for every
# control (WCAG 2.5.5 / Apple HIG); compact pills keep their visual size and
# extend the hit area with an ::after layer,
# inset: min(0px, calc(50% - var(--hit-min) / 2)).
sizing:
  hit-min: "44px"
  field-h: "2.75rem"            # form control height (>= 44px at any root size)
  check-size: "1.375rem"
  nav-h: "64px"                 # sticky nav; scroll margins and sticky offsets clear it
  shell: "min(92vw, 1880px)"    # the one content edge
  form-measure: "34rem"

spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "80px"
  3xl: "112px"

components:
  button-primary:
    backgroundColor: "{colors.petrol-deep}"
    textColor: "{colors.ground-page}"
    typography: "{typography.title}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  button-primary-hover:
    backgroundColor: "{colors.petrol}"
    textColor: "{colors.ground-page}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.petrol-deep}"
    borderColor: "{colors.petrol-deep}"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
  card-on-zone:
    backgroundColor: "{colors.ground-page}"
    textColor: "{colors.ink}"
    borderColor: "{colors.petrol-deep}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-on-page:
    backgroundColor: "{colors.ground-page}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.lg}"
    padding: "24px"
  badge:
    backgroundColor: "{colors.ground-zone}"
    textColor: "{colors.petrol-deep}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  link:
    textColor: "{colors.petrol-deep}"
  quiz-correct:
    backgroundColor: "{colors.ground-zone}"
    borderColor: "{colors.success}"
    textColor: "{colors.success}"
    rounded: "{rounded.md}"
  quiz-incorrect:
    backgroundColor: "{colors.ground-page}"
    borderColor: "{colors.error}"
    textColor: "{colors.error}"
    rounded: "{rounded.md}"
  progress-marker:
    backgroundColor: "{colors.amber-viv}"
    ringColor: "{colors.amber-soft}"
    rounded: "{rounded.pill}"
  badge-progress:
    backgroundColor: "{colors.amber-soft}"
    textColor: "{colors.amber-deep}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Leuchtkern (Website)

## 1. Overview

"Leuchtkern" is decided brand-wide (`packages/content/design/designsprache.md`, extracted from the E-Book cover). This document formalizes it for `packages/website`, which has a different job than a book cover: it carries 16 dense, long-form learning articles (Bausteine) that people read start to finish, aimed at readers who may be encountering neural networks for the first time. Light, readable, approachable — not a dark technical tool, not a cream/paper "book" pastiche.

**Key characteristics**

- Petrol is the structure/brand accent — nav, buttons, links, cards, everything that says "this is the site." Amber is a second, functionally scoped accent for progress and attention moments only (reading-position markers, "reached" states, single spotlight moments) — see "Amber Accent" below. It is not a second brand color and never appears on buttons, links, or nav.
- White is the default reading surface. The mint zone tint (`ground-zone`) marks chrome and overview sections, never body copy.
- The dark radial petrol ground + glow technique from the cover is a Hero-only signature, not a page background.
- Soft, generous radii and pill buttons — the brand is a learning companion, not a developer tool.
- Literata carries headlines only; IBM Plex Sans carries everything you actually read for more than a sentence.

## 2. Colors

### Ground and Zones

- **`ground-page`** (`#FFFFFF`): default surface for anything meant to be read at length — Baustein articles, glossary entries, quiz body copy.
- **`ground-zone`** (`#D7ECE7`, = `PETROL_SOFT`): chrome and overview surfaces — navigation, homepage sections, Themenbereich card grids, announcement pages. Never the background of a reading page.
- **Hero ground** (`ground-hero-0` → `ground-hero-100`, four-stop radial): the dark petrol-to-black gradient from the cover, `cx=0.5 cy=0.27 r=1.15`. Hero sections and announcement headers only.
- **`PAPER`/`PAPER_HI`** (the warm cream tokens from `wortbildmarke-generate.py`) are explicitly **not used** on the website. They read as book/paper pastiche; the website's light mode is `ground-page` white, not warm paper.

### The Elevation Needs A Border Rule

`ground-zone` and white have almost no luminance difference (~1.2:1 — checked, not eyeballed). A white card floating on `ground-zone` with no border is invisible. Any card sitting on `ground-zone` (`card-on-zone`) **must** carry a `petrol-deep` hairline border — shadow or whitespace alone will not separate it. A card sitting on `ground-page` (`card-on-page`) uses the neutral `line` hairline instead; it doesn't need the stronger petrol border because the surrounding ground is already white.

### Text

- **`ink`** (`#1B1A17`): headings, primary body text. 14.1:1 on `ground-page`, 14.1:1 on `ground-zone`.
- **`ink-muted`** (`#55524A`): captions, meta lines, secondary copy. 6.3:1 on `ground-zone`.

### Petrol Accent

- **`petrol`** (`#0E7469`): accent on white. Do not use for small text on `ground-zone` — 4.58:1 there is borderline AA.
- **`petrol-deep`** (`#0A5148`): the safe default for links, button fills, borders, and success state — 7.46:1 on both grounds. When in doubt, use this one, not `petrol`.
- **`petrol-viv`** (`#12907F`): large accents, icons, and focus rings only. 3.20:1 on `ground-zone` clears WCAG 1.4.11 (non-text, 3:1) but fails normal-text AA (4.5:1) — never set body or label text in this color.

### Amber Accent (Second Accent)

Petrol reads cool and structural; amber (hue ≈38°, warm gold/brown) sits ~135° away on the wheel — a strong, deliberate contrast rather than a tint of petrol — while matching petrol's own four-tier lightness structure (base/deep/soft/viv) so the two families read as a designed pair, not an accident:

- **`amber`** (`#986816`): accent on white (4.85:1). Do not use for small text on `ground-zone` — 3.94:1 fails AA there.
- **`amber-deep`** (`#62430E`): the safe default when amber must carry small text, borders, or links — 9.02:1 on `ground-page`, 7.32:1 on `ground-zone`, matching `petrol-deep`'s role and headroom.
- **`amber-soft`** (`#FBF2E0`): pale warm tint for badges and highlight chips only. It is **not** a second zone ground — using it as a section background would create the second theme the brand explicitly rejects (see Do Not).
- **`amber-viv`** (`#AA7418`): large accents, icons, and progress markers only — 3.26:1 on `ground-zone` clears WCAG 1.4.11 (non-text, 3:1) but fails normal-text AA, same constraint as `petrol-viv`.

**Scope — what amber is for:** amber is the "you are here / this is new / this is done" color, not a decorative palette expansion. Valid uses: the reading-position marker and "reached" waypoint states (the Wegweiser spine/`Du`-dot motif), progress rings and completion badges, a single spotlight highlight per view (e.g. the next-unread Baustein on a returning visit), and a semantic axis in the homepage knowledge-graph (e.g. core vs. optional nodes) — never a second color assigned per Themenbereich, which wouldn't scale past two topic areas anyway. Amber never appears on `button-primary`/`button-secondary`, links, or nav — those stay petrol so the site's primary actions keep one unambiguous accent.

### State

- **Success** = `petrol-deep`. Reuses the brand accent rather than inventing a separate green.
- **Error** = a new vermillion `#A8431F` (4.89:1 on `ground-zone`, 6.02:1 on `ground-page` — checked against both surfaces this color can appear on, e.g. quiz feedback).
- **Focus** = `petrol-viv` ring, non-text use only.

These are foundational values for consistency across tickets. The Quiz-Mechanismus ticket may refine exact usage (icon shapes, animation) but works within this palette rather than inventing its own.

### Dark reading theme (2026-08, documented 2026-10-02)

A reader-selectable theme (nav toggle; cookie `kev_theme` = `light | dark | system`, shared with the community board on the parent domain) sets `:root[data-theme='dark']`. "system" is resolved from `prefers-color-scheme` by a head script before first paint, so the CSS only ever keys on the attribute — there are no `@media (prefers-color-scheme)` token blocks, and without JavaScript the page renders light. The values are the `colors-dark` frontmatter block: a warm-neutral near-black with a petrol tint (`#0F1514`), off-white text, and a lighter petrol family so links and fills keep their contrast. Hero and footer stay dark in both themes.

- **`petrol-soft` flips** to the dark zone tint `#17302C`. In light it equals the mint `ground-zone`; on a dark ground that mint would be a glaring light block, so everything that uses `petrol-soft` as a *tint* (selected tab, pressed reaction, zone hovers) stays a quiet tint in dark. `petrol-deep` text on it: 8.04:1.
- **The `on-dark-*` constants do not flip.** Text and lines on the always-dark hero/footer ground used to be written as `petrol-soft` (+ alpha); once `petrol-soft` became theme-dependent they would have turned dark-on-dark. They are now their own constants (frontmatter `colors`), and nothing on the hero/footer may use `petrol-soft` directly.
- Contrast pairs to re-check when a dark value changes: `ink`/`ink-muted`/`petrol-deep` on `ground-page` and `ground-zone`, `error` on `ground-page` and `field-error-bg`, `petrol-viv` (focus) on both grounds, `field-border` on `field-bg` (≥ 3:1).

### Hero-Exclusive Glow

The three-stop glow (`halo` → `coreglow` → `corehot`) from the cover transfers directly to Hero sections and nothing else. See `packages/content/design/designsprache.md` for the full radial-gradient recipe — this document doesn't duplicate it, only fixes that its use is Hero-bound.

## 3. Typography

**Display/headline face:** Literata (serif) — `H1`/`H2` only.
**Body/UI face:** IBM Plex Sans — body copy, navigation, buttons, labels, meta, everything below headline scale.

Both are self-hosted via `@fontsource` (`@fontsource/literata`, `@fontsource/ibm-plex-sans`) — no Google Fonts CDN request, consistent with the project's cookie-free Matomo stance.

### The Two-Face Rule

Literata never carries body text — a full page of serif reads heavier than 16 dense Bausteine articles should. IBM Plex Sans never carries `H1`/`H2` — headlines need the brand's serif signature to read as "Leuchtkern," not generic UI.

### The Cover Lockup Is A Signature Moment

The three-weight single-line treatment ("**KI** *einfach* **verstehen**" — bold/italic/bold in one line) from the cover is reserved for the Hero's standalone logotype (`.lockup .t1/.t2/.t3` in `Hero.astro`) — the one place it appears verbatim, carrying no mark. Nav and Footer are not smaller cuts of that same treatment; they pair the Wortbildmarke mark with a single-weight wordmark instead, per the ratio system in §8 "Wortbildmarke" (2026-08-20, corrected during the full-site review pass — DESIGN.md previously and incorrectly implied Footer reused the cover's three-weight treatment). Regular `H1`/`H2` headings use a single Literata weight (700) — they are not brand-lockup moments and don't need either treatment.

### Eyebrow/Kicker Adaptation

The cover's kicker style (IBM Plex Sans 500, wide tracking, `PETROL_SOFT` text) was tuned for a dark hero ground — `PETROL_SOFT` text is illegible on white. On `ground-page`/`ground-zone`, the eyebrow uses `petrol-deep` (badge component) or `ink-muted` for neutral labels instead, keeping the wide-tracking mono-weight pattern but swapping the color for the light context.

### Legibility Floor (2026-08-20)

All prose/reading copy — paragraphs, list items, card descriptions, teaser text, and any link or CTA label a visitor actually reads rather than scans as chrome — must render at **≥1rem at default browser zoom**, with `body` (1.125rem) as the preferred default for long-form article text. Since 2026-08-20 the site ships a raised root baseline of **118%** (`:root { font-size: 118% }` in `tokens.css`), so those nominal sizes land at ≈18.9px and ≈21px in practice — the floor is therefore comfortably above the classic 16px/18px marks, and the nominal rem tiers must not be lowered to "compensate" for the baseline. A nav toggle offers readers one further step (`data-text-size="large"` → 136%, persisted in localStorage `kev:text-size`); it scales the whole rem ramp up and can never take any text below the floor. This applies site-wide, not only to Baustein article bodies: the goal is effortless reading for all age groups, glasses-wearers, and tired eyes, with no zooming required and no strain from squinting at small type.

Only genuine non-reading UI chrome may sit below that floor: tracked-uppercase eyebrow/badge labels (`12`/0.75rem), dense diagram annotation on the Wegkarte/ProgressRail signature elements (`13`/0.8125rem), and the footer's whole legal band — copyright line, legal smallprint links (Impressum/Datenschutz/X) and the two-letter DE/EN language pill (`14`/0.875rem). Nothing else — nav links, footer navigation links, card body text, list items, meta lines, button/link labels — may use the `12`, `13`, or `14` scale tiers; `16` is for compact-but-read chrome (nav links, card CTA links, the footer's secondary link tier), never paragraph copy, and `18`+ is for anything meant to be read at length (including the footer's primary link tier — see §6 "Footer link tiers").

This is a project design decision, not something an automated check enforces: generic tooling floors (11px for functional/UI text, 10px for non-interactive smallprint, 12px for general body copy) are a mechanical safety net against genuinely broken type, not a target to design down to. Upholding the stricter floor above is a manual review responsibility for every new component, human or agent.

## 4. Motif: Phyllotaxis

The Goldwinkel spiral (parameters in `packages/content/design/designsprache.md`) is a brand signature, not decoration — it appears in exactly two places:

1. **Hero bloom** — large, full parametrization, Hero sections only.
2. **Section mark** — small, low-density instance as a section-end/footer marker (e.g. closing a Baustein, or a footer flourish).

No other placement. Reusing it as generic background texture on cards, loading states, or dividers dilutes it into wallpaper.

### Topic pages sit on the same ramp (2026-08-24)

The Themenbereich overview (`TopicLayout.astro`) had drifted off the documented system with its own private values — a 5.25rem H1 (past the 64/4rem display cap), 1.08rem intro prose (below the Legibility Floor), 0.8/0.78/0.9rem meta sizes, an undefined `--font-display` token (which silently rendered the "3/6" stat and lesson numbers in the sans face instead of Literata), and 0.875rem breadcrumbs with a different separator than the article shell. All of it was brought back on ramp during the reading-flow pass: H1 uses the `display` composite, the intro uses `body` at the shared 53rem measure, lesson titles use the `title` tier (1.25rem), tracked-uppercase state labels use the eyebrow tier, reading-time meta uses `16`/1rem, and breadcrumbs reuse the article-shell treatment (1rem, petrol links, `/` separators). The mobile `border-top: 3px solid amber-viv` on the status block — the horizontal cousin of the rejected side-tab border — became a neutral `line` hairline. If a future page wants to deviate from the ramp, that's a documented decision here, not a per-file font-size.

### Structural layout tokens (2026-08-24)

`tokens.css` carries two structural tokens that are not part of the DESIGN.md frontmatter color/type contract but are binding for layout code: `--shell` (the one elastic content edge) and `--nav-h` (the sticky nav height, 64px). Everything that must clear the nav — sticky rail offsets, the reading-progress hairline, anchor `scroll-margin-top` — derives from `--nav-h` instead of repeating the number.

## 5. Shape

Soft and approachable, not technical-precise: radii from `8px` (small chips) up to full `pill` (buttons, badges). This is a deliberate departure from a sharp-cornered "dev tool" aesthetic — the brand's "du"-address and beginner-friendly tone call for rounder, softer geometry.

## 6. Components

- **Buttons**: `button-primary` (`petrol-deep` fill, white text, pill), `button-secondary` (transparent, `petrol-deep` border + text, pill). No ghost/ternary variant defined yet — add one only when a real page needs it.
- **Cards**: `card-on-zone` (white fill, mandatory `petrol-deep` border — see Elevation rule) vs. `card-on-page` (white fill, `line` neutral border). Pick the variant by what ground the card sits on, not by preference.
- **Badge/eyebrow**: `ground-zone` fill, `petrol-deep` text, pill, used for tags and kickers on light grounds.
- **Links**: `petrol-deep` text (never `petrol` at small sizes on a zone ground).
- **Quiz feedback**: `quiz-correct` (zone fill, `success`/`petrol-deep` border+text), `quiz-incorrect` (page fill, `error` border+text). Exact card layout is the Quiz-Mechanismus ticket's job; the colors are fixed here so that ticket doesn't invent its own.
- **Progress marker**: `amber-viv` fill with an `amber-soft` ring, pill-shaped — the reading-position/"you are here" dot and "reached" waypoint states.
- **Progress badge**: `amber-soft` fill, `amber-deep` text, pill — completion/"new" chips, distinct from the neutral `badge` (which stays `ground-zone`/`petrol-deep`).

### Form controls (2026-10-02, shared with the community board)

One control language for every form on the website and on the community board. Tokens (`--field-*`, `--check-*`, `--form-*`) live in `src/styles/tokens.css` with light and dark values; the component rules live in `src/styles/forms.css` (opt-in classes `.form-stack`, `.form-card`, `.field`, `.field-check`, `.field-row`, `.field-hint`, `.field-error`, `.form-actions`). `packages/community/scripts/sync-tokens.sh` copies both files verbatim into the board — edit them here only.

- **Inputs, select, textarea**: `2.75rem` minimum height (≥ 44px touch target), `r-md` radius, 1.5px `field-border` (`#8C8778` light / `#66756F` dark — 3.6:1 against the field fill, WCAG 1.4.11), `field-bg` fill (white / `#141C1B`). Hover darkens the border to `petrol`; focus keeps the site-wide ring (2px `focus`, 2px offset) and sets the border to `petrol-deep`. Placeholder `#77736A` / `#8F8B81` (≥ 4.5:1).
- **Error state**: `error` border on an `field-error-bg` tint, message in `error` with a drawn "!" badge — never colour alone.
- **Checkbox/radio**: native inputs (keyboard, screen readers, autofill unchanged) drawn as a `1.375rem` box, 6px radius (radio round), checked = `petrol-deep` fill with a `check-mark` tick/dot; the box sits on the label's first line and the label is the ≥ 44px tap target.
- **Buttons in forms**: the existing `button-primary` / `button-secondary`, at least `field-h` tall; disabled at 0.55 opacity. Busy states use the small `.form-spinner` next to a short status text, not a spinner alone.
- **Surface**: `.form-card` = `card-on-page` (white fill, `line` border, `r-lg`), `34rem` measure. No shadows — see the Elevation rule.

### Footer link tiers (2026-08-25, replaces the footer link pills)

`Footer.astro` used to render all eight navigation destinations as identical outlined pills (`15`/0.9375rem, `r-pill`, `petrol-soft` border) in one centered wrapping row. It was reported as overloaded, and it was: eight same-shape, same-size, same-color chips carry no primary/secondary distinction, and on a 375px viewport they stacked into five ragged pill rows above two further rows of legal chrome. The replacement keeps every link, href and label, and derives hierarchy from size, weight, color and proximity instead of chrome:

- **Primary tier** — the site's own learning path (Themenbereiche, Glossar, Wissenstest-Hub): `18`/1.125rem, weight 600, `petrol-soft`, `--sp-lg` column gap.
- **Secondary tier** — surrounding formats and project pages (Community, YouTube, E-Book, Merch, Warum wir das machen): `16`/1rem, weight 400, `petrol-soft` at 0.72 alpha, `--sp-md` column gap.
- **Legal band** — language pill, X, Impressum, Datenschutz and the copyright line, set off by a `petrol-soft`/0.16 hairline: `14`/0.875rem, links at 0.72 alpha, copyright at 0.6. Two poles (legal left, copyright right) above 720px; stacked and centered below it.

No border, background or radius on any navigation link — the two-letter language pill is the single piece of chrome left in the footer, and its border is dimmed to 0.38 alpha so it reads as the one control rather than the loudest mark. Secondary text on the footer's petrol ground is always tinted from `petrol-soft` at reduced alpha, never a neutral gray (`line-deep` on petrol read muddy); the alphas above are chosen so each tier still clears 4.5:1 against the gradient stop it actually sits over. Vertical rhythm is deliberate rather than one repeated gap (`xs` lockup→tagline, `lg` →navigation, `sm` between tiers, `xl` →legal band), and `.foot-inner` is capped at `62rem` so the footer stays one centered block under the centered radial ground instead of sprawling across a wide `--shell`.

If a future footer link needs to stand out, it joins the primary tier — it does not get a pill back.

### Prose Elements (markdown-rendered article content)

Every standard markdown output element inside an article body (`.prose` in `ContentEntryLayout.astro`, Bausteine and Glossar entries alike, DE + EN) is part of the system — an unstyled browser-default table or list in a Baustein is a bug, not a content problem. Canonical treatments:

- **One reading measure for everything**: `--measure: 53rem` is the single column width for running text AND explanatory media — paragraphs, headings, lists, quotes, tables, code blocks, `<details>` excursions, images, inline diagrams, the article header (eyebrow, title, lede, hairline) and the retrieval quiz all sit on the same centered column with exactly one left and one right edge from title to quiz. A two-tier split (text 53rem, media breaking out to a wider 64rem) was tried earlier the same day and **rejected on user review** (2026-08-24): two different right edges read as an inconsistent page, not a unified reading flow. Widening the text to the media width instead was ruled out by measurement, not taste — at 53rem body text already renders at ~103 real characters per line (IBM Plex Sans; the older "76ch" figure counts CSS `ch` units of the wide `0` glyph, not actual German text), and 64rem would push it to ~124, far past the ~90-cpl comfort limit even with the generous 1.75 leading. So the unified value is the reading measure, and media conforms to it. The measure stays a rem value, not `ch`: `ch` recomputes against each element's own font-size, so `h2`/`h3` silently received a far wider cap and never shared an edge with the paragraphs.
- **Explanatory media framing**: images and inline SVG diagrams carry the shared editorial frame (soft zone-tint gradient, `line-deep` hairline, `--r-xl`) as the default treatment for all future Bausteine — at the shared `--measure`, never wider.
- **Tables**: collapsed borders — outer frame `line-deep`, inner cell hairlines `line`; header row `ground-zone` fill with IBM Plex Sans 600 in `petrol-deep`; cell padding from the `sp` spacing tokens; body cells use `tabular-nums` so number columns (scores, counts) align vertically.
- **Lists**: petrol-deep `::marker`, ~1.4em indent, breathing room between items.
- **Blockquotes**: Literata italic at `1.15em`, `ink-muted` text, with a `petrol-soft` serif open-quote mark instead of a colored left bar — ties quotes to the editorial voice rather than a generic UI rule (2026-08-20, replaced the border-left treatment during the full-site review pass).
- **Inline code**: monospace on a `ground-zone` chip, small radius. **Code blocks** (Shiki): the highlighter brings its own theme background; the frame — `sp` padding, large radius, horizontal scroll — comes from the system.
- **`<details>` excursions** ("Eine Ebene tiefer"): quiet `line`-bordered card, border and summary text turning `petrol-deep` when open.
- **`<hr>`**: a `line-deep` hairline pause at the reading measure, never a decorative divider.

### Story pages and embedded components sit on the same measure (2026-08-25)

The prose contract above was written for `ContentEntryLayout` (Bausteine, Glossar). It binds `StoryArticle.astro` — the third reading register, used by every Ankündigungsseite (`merch`, `community`, `e-book`, `youtube`) and by `warum`/`why` — in exactly the same way, and it binds **embedded components**, not just markdown-rendered tags.

`StoryArticle` used to apply the measure through an element list (`p`, `hr`). That list was the bug: the merch gallery is a `<div class="merch-grid">`, matched nothing, inherited no width, and stretched to the full `--shell` — 1325px next to 53rem (≈1001px) paragraphs on a 1440px viewport, 1880px on a wide monitor. That is the two-right-edges layout rejected on 2026-08-24, only wider, and it is what "kein harmonischer Gesamteindruck" on the merch page turned out to mean on inspection. The rule is now a default on every direct child of the prose container, so a block that gets slotted into a story conforms without anyone remembering to extend a selector. **There is no wide band and no `--measure-wide` token** — that is the rejected pattern wearing a token.

A richer block (gallery, card grid) enters a story page through the sanctioned wrapper:

```html
<section class="story-section">
  <h2>…</h2>
  <SomeComponent />
</section>
```

The heading owns the interval — generous space above it (`3.2em`), tight space below it (`0.7em`, ≈24px) to its content — both em-based so the ratio survives the reader's text-size toggle — so the block opens as a designed section instead of prose that stops and restarts. It uses the `28`/1.75rem subsection tier, never the H2 display tier, because a section head inside a story sits below the page title rather than level with it. Consequence for component authors: **an embedded block carries no outer top margin of its own** (`MerchGallery` lost its `margin-top: var(--sp-xl)` here); spacing between prose and section belongs to the frame, so the rhythm stays consistent no matter which component is slotted in.

## 7. Do and Do Not

### Do

- Do default reading surfaces to `ground-page` (white).
- Do use `ground-zone` for chrome and overview/grid sections, never for a page of body copy.
- Do border every card on `ground-zone` with `petrol-deep` — it's the only thing that makes it visible there.
- Do keep the Hero radial-glow ground and the three-weight cover logotype exclusive to the Hero's standalone brand moment — Nav and Footer use the mark+wordmark ratio lockup instead (§8).
- Do use `petrol-deep` as the default safe accent when unsure between it and `petrol`/`petrol-viv`.
- Do self-host Literata and IBM Plex Sans via `@fontsource`.
- Do use amber only for progress/attention moments (position markers, "reached"/"new" states, a single spotlight highlight, the core-vs-optional axis on the knowledge graph) — never as a general-purpose second brand color.

### Do Not

- Do not use `PAPER`/`PAPER_HI` (warm cream) anywhere on the website — that's cover-exclusive and explicitly rejected for the site's light mode.
- Do not set body or label text in `petrol` on a `ground-zone` background (4.58:1, borderline) or in `petrol-viv` anywhere (3.20:1, fails text AA). The same rule applies to `amber` on `ground-zone` (3.94:1) and `amber-viv` anywhere (3.26:1 on zone) — use `amber-deep` wherever amber must carry small text.
- Do not rely on shadow or whitespace alone to separate a card from `ground-zone` — it doesn't create enough contrast; use the border.
- Do not use Literata for body copy or IBM Plex Sans for `H1`/`H2`.
- Do not reuse the Phyllotaxis motif as generic decoration beyond the Hero bloom and the section mark.
- Do not invent a third theme or per-page colour schemes. The light theme is the default; the dark reading theme (§2 "Dark reading theme") is a reader choice with its own fixed token values, not a place for new hues. `amber-soft` is a chip/badge tint, not a section ground; it must never replace `ground-page`/`ground-zone` as a page or section background.
- Do not put amber on `button-primary`/`button-secondary`, links, or nav — those stay petrol so primary actions keep one unambiguous accent.
- Do not assign amber (or any hue) per Themenbereich as a category-color scheme — it doesn't scale as topic areas are added; differentiate Themenbereiche by content/position, not by a growing color palette.

## 8. Wortbildmarke

This section is binding, not descriptive. It exists because the wrong mark shipped
live twice before this was written down — once as an invented "small cut" nobody
decided on. Read it before touching any brand-mark file.

**There is exactly one decided Wortbildmarke: Kandidat A, weight-corrected.** Source of
truth is `packages/content/design/wortbildmarke-generate.py`, function `mark_a()` — a
textured, 13-mass, 10-stroke/7-node "K" geometry. The weight correction ("Gewichtskorrektur")
exists specifically so this SAME full-detail geometry holds up at every size the site
actually uses it at, nav and footer included — see the comparison at 24px/40px/56px in
`packages/content/design/wortbildmarke-forschung.html`, "Kandidat A · Gewichtskorrektur",
Runde 4.

**Use it everywhere, at every size ≥24px, with no alternate cut.** Exported files:
`export/mark-light.svg` (light ground) and `export/mark-dark.svg` (dark ground, footer),
both `viewBox="7.57 3.17 66 93.66"` — aspect ratio width:height = 66 : 93.66 ≈ **0.7046**.
Any CSS sizing a `<Fragment set:html={...} />` of these must derive width from height
times 0.7046 (or vice versa), never an approximated or rounded ratio.

**Do not invent or reintroduce a simplified "small cut."** The generator also contains
`mark_a_small()` and the export script writes `mark-small-light.svg`/`mark-small-dark.svg`
from it — a structurally different, 4-mass simplified geometry with viewBox
`4.73 1.12 71.58 97.77` (ratio ≈ 0.7322). This is not an approved alternate for small
sizes. It was used live in Nav/Footer/favicons in an earlier session without real sign-off,
renders as a smooth rounded blob barely readable as a "K," and was corrected on
2026-08-20. If a future session is tempted to reach for it because the full cut looks
noisy at very small pixel sizes (see below), that temptation is the bug, not the fix —
raise the sizing problem instead of quietly swapping geometry.

**Known open tension: raster favicons at 16×16px.** The full Kandidat-A cut's texture
(13 masses, fine Fugen) is close to the legibility limit at a true 16×16px raster —
`favicon-16.png` reads as soft/noisy at that size, `favicon-32.png` is legible but not
crisp. This is a real, disclosed trade-off, not a silently accepted defect: the
alternative (falling back to `mark_a_small()` for favicons only) was deliberately
rejected because it would let the "invent a small cut" pattern back in through a side
door. If this needs revisiting, it should be solved by generating a genuinely new,
purpose-built low-resolution glyph reduction (fewer masses, same silhouette logic,
explicitly scoped to "favicon raster only") and documenting it here as a named,
decided exception — not by reaching for `mark_a_small()`.

**Favicon raster pipeline**: `packages/content/design/wortbildmarke-export.py` renders
`mark-light.svg` at 768px via `rsvg-convert`, then Lanczos-downsamples to each target
size (16/32/48/180) — never a naive direct-size SVG rasterisation. Re-run that script
and copy its `export/favicon-*.png`, `export/apple-touch-icon-180.png`, and
`export/mark-light.svg` (→ `public/favicon.svg`) into `packages/website/public/`
whenever the generator geometry changes.

**The mark+wordmark lockup**: wherever the mark sits next to the "KI einfach verstehen"
wordmark (Nav, Footer), the size of the mark, its vertical alignment, the gap, and the
wordmark's font/weight/color are not independent choices — they're one documented ratio
system, taken verbatim from `packages/content/design/wortbildmarke-forschung.html`'s own
`.lockup` component (the "24 px — Navigationsleiste" / "40 px — Header" / "56 px — Hero"
examples). Given a wordmark font-size `--fs`:

```
--cap-ratio: 0.701;   --overshoot: 1.32;   --gap-ratio: 0.3;
--cap:    calc(var(--fs) * var(--cap-ratio));
--mark-h: calc(var(--cap) * var(--overshoot));
--gap:    calc(var(--cap) * var(--gap-ratio));
--shift:  calc(var(--cap) * (var(--overshoot) - 1) / 2);
```

The mark's height is `--mark-h`, its width follows the 0.7046 aspect ratio above, and it
sits `translateY(var(--shift))` to optically align with the wordmark's cap-height on a
`display: flex; align-items: baseline` row with `gap: var(--gap)`. The wordmark itself is
Literata (`var(--font-serif)`), weight 500, `font-size: var(--fs)`, with only "KI" bold
(700) and colored — `petrol-deep` on a light ground (Nav), `petrol-viv` on the dark footer
ground — the rest of the words stay regular weight in the ambient text color (`ink` on
Nav, `ground-page` white on the dark Footer ground — never `PAPER`/`PAPER_HI`, see the Do
Not list above). Nav uses the 24px tier (`--fs: 1.5rem`), Footer the 40px tier (`--fs: 2.5rem`,
clamped down on narrow viewports). Do not restyle the mark size or the wordmark font
independently of this formula, and do not reintroduce IBM Plex Sans or a single-color
wordmark here — that was the concrete bug reported and fixed on 2026-08-20. The Hero's
big standalone three-weight logotype (`.lockup .t1/.t2/.t3` in `Hero.astro`, DESIGN.md §3
"Reserved three-weight lockup") is a separate, deliberately different composition — it
carries no mark and is not governed by this ratio system.
- Do not load fonts from Google Fonts CDN.

## 9. Community board (`packages/community`)

The board at `community.ki-einfach-verstehen.de` is a server-rendered PHP/Twig app, not part of the Astro build, but it is the same brand and must be indistinguishable from the website down to the token. Its stylesheets live in `packages/community/public/assets/css/`.

### Source of truth

- **Tokens, base styles and form controls are copied, never re-typed.** `packages/community/scripts/sync-tokens.sh` copies `src/styles/tokens.css` and `src/styles/forms.css` verbatim (plus a "Do not edit here" header), the brand marks and the self-hosted font faces into the board. `tests/Unit/View/SyncedDesignAssetsTest.php` fails the board's test suite when a copy drifts from the website source. Change a token here (this frontmatter, then `tokens.css`), run the sync script, commit both.
- **Nav and footer mirror `Nav.astro` and `Footer.astro` rule for rule** (`community.css` "Nav" and "Footer"), including the `--hit-min` pill hit layers, the footer link tiers and the on-dark focus ring. Change them together. The board has no menu sheet, so its nav keeps sign-in/register, theme, text size and language in the row and drops elements at its own measured breakpoints instead.
- **Theme and text size** use the same cookies (`kev_theme`, `kev_text_size`) and attributes (`data-theme`, `data-text-size`); the board renders an explicit choice server-side and resolves "system" in `public/assets/js/theme.js` before first paint (the CSP forbids inline scripts).
- The board's own stylesheets (`community.css`, `content.css`, `forum.css`, `compose.css`, `identity.css`) contain **no raw colour values** — only `var(--…)` tokens. Every font size is a tier of the §3 scale (`12`, `13`, `14`, `16`, `18`, `20`, `28`, plus the headline/error-title clamps shared with the website).

### Board components (additions on top of §6)

- **Board nav**: a second row under the site nav (`ground-page`, `line` hairline) with the question lists, search and the primary "ask" button (`btn-primary` at the nav button size, `9px 22px`). Below 640px the lists fold into a `<details>` menu.
- **Buttons**: a bare `.btn` is the secondary button. **`.btn-danger`** (board-only) is the secondary shape in `error` (text and border), hover fill `field-error-bg`; used for account deletion and turning off two-factor. `.btn-small` keeps `--hit-min` height. Disabled buttons use the shared `forms.css` rule (0.55 opacity, `not-allowed`).
- **Badges**: one family on the website's `.badge` type (eyebrow tier, pill). Neutral status = outlined (`line-deep` border, `ink-muted` text); `badge-ok` = `ground-zone` + `petrol-deep`; `badge-role` = `petrol-deep` fill + `ground-page` text; `badge-lang` = dashed outline.
- **Labels**: section labels (legal TOC heading, Baustein list heading) are the eyebrow tier (`12`/500/0.16em, uppercase, `ink-muted`). Dense data labels (forum table column heads, phone cell labels, stat labels) keep the eyebrow size and weight but the website's tighter `0.08em` stat/diagram tracking, so narrow number columns don't break every word onto its own line.
- **Notices**: amber (`amber-soft` + `amber` bar) for plain and info notices — the attention tone; `notice-error` = `field-error-bg` + `error` bar; `notice-success` = `ground-zone` + `petrol-deep` bar.
- **Posts**: `card-on-page` (`line` border, `r-md`); the opening post is zone-tinted, and code chips inside it flip to `ground-page` so they stay visible; the accepted answer has a 2px `petrol-deep` border. Inline code is `ui-monospace` at `0.95em` on `ground-zone`, as in website prose. Quotes in user posts use the website blockquote (Literata italic, `petrol-soft` serif open-quote mark, no side bar) — one quote treatment across site and board (owner decision 2026-10-02).
- **Avatars and author card** (2026-10-02): every author name carries the member's avatar motif as a disc with a `line` hairline ring — `1.5rem` in thread lists, search results, the forum table and comments (inside the name link, `sp-xs` gap), `2.5rem` in the post header, sized in rem so they follow the large-text setting. Always decorative (`alt=""`, the name follows). The post header is a small author card: avatar spanning two lines (a duplicate link outside the tab order), then name with the `badge-role` "Team" and asker badges, then the public Hintergrund (Vorwissen · Kontext) and the time at `14` in `ink-muted`. A deleted member gets an empty dashed `line-deep` disc on `ground-zone` and no link. The 32 motifs (`a01`–`a32`: figures without recognisable people, animals, objects, abstract emblems) are illustrations in the project style (`docs/content-plan/designbibel-illustrationen.md`), post-processed to 192px square WebP: one bold motif centred inside the circle-safe area on a uniform light `ground-zone` (`#D7ECE7`) ground, so the set reads as one family at `1.5rem` and the disc stays light on the dark theme too.
- **Breadcrumbs** mirror the website trail: `/` separators in `line-deep`, unadorned `petrol-deep` links with hover underline, and on phones only a `←` back-link to the parent level.
- **Legal pages** follow `LegalLayout.astro`: `line` separators between sections, `ink-muted` `<dt>`, 1.75 line height, `overflow-wrap: break-word`, Matomo opt-out in a `ground-zone` frame with `line` border and `r-lg`. The board adds a zone-tinted table of contents.
- **Headings** on board pages (`.hero-title`) use the headline clamp with `hyphens: auto` and `overflow-wrap: break-word`, so long German compounds break at 360px.
- **Print**: nav, board nav, footer, breadcrumbs and all write/action forms are hidden.

### Checked states

Every interactive element has the site focus ring (`petrol-viv`, 2px, offset 3px; on the dark footer `on-dark-soft`), a hover state (underline for text links, `ground-zone`/`glass` fill for outlined controls, `field-error-bg` for danger), a ≥ 44px hit area (`--hit-min`, directly or via the `::after` layer), and a pressed state where it toggles (`aria-pressed` → `petrol-soft` fill + `petrol-deep` border, or `petrol-deep` fill for the text-size pill). Buttons (`.btn`, site and board) settle by 1px on `:active`, and filled primaries return to their resting fill while pressed (2026-10-02). Animations (error bloom, captcha spinner) run only under `prefers-reduced-motion: no-preference`, and the global reduced-motion reset from `tokens.css` applies.

