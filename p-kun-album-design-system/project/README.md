# P-kun Album （ぴーくんアルバム） Design System

> やさしい、あたたかい、家族みんなのアルバム。
> A gentle, warm photo album for families to share kids' moments.

---

## What is P-kun Album?

**P-kun Album（ぴーくんアルバム）** is a Japanese photo album web app for parents to upload and share their kids' photos with grandparents and extended family. The product is intentionally simple and quiet:

- ✅ Upload many photos easily
- ✅ Browse photos by date / album / child
- ✅ See an "update history" feed of recent uploads
- ❌ **No** comments, **no** like buttons, **no** social pressure
- ❌ **No** algorithmic feeds — just calm, chronological photos

The product is built for **parents of young kids** in **Japanese**. The audience extends to grandparents, who view photos but rarely upload — so the experience must feel approachable for non-tech-savvy users too.

The mascot is **P-kun (ぴーくん)** — a cute baby boy character with a yellow chick-like cap, who appears in empty states, success messages, and as a friendly guide.

### Sources
- GitHub repo (export destination): `nanauda/p-album` — *was empty at design time; this system was designed from scratch.*
- Brand direction came from the user's request: "kids friendly tone", soft pastels & rounded, Japanese, mascot-driven.

---

## Index — what's in this folder

| File / Folder | What it is |
|---|---|
| `README.md` | This file. Brand overview, content rules, visual rules, iconography. |
| `SKILL.md` | Agent-Skill-compatible entry for Claude Code. |
| `colors_and_type.css` | All design tokens: colors, type, spacing, radii, shadow, motion. **Import this in any new file.** |
| `assets/` | Logos, mascot art (P-kun), illustrations, decorative SVGs. |
| `fonts/` | Webfont notes — fonts are pulled from Google Fonts via `@import`. |
| `preview/` | Small HTML cards that render in the Design System tab. |
| `ui_kits/web/` | Web app UI kit — components + interactive `index.html` prototype. |

---

## Content Fundamentals

### Voice and tone

P-kun Album talks like a **gentle, slightly older sibling or kind family member** — never like a corporate product, never like a slick consumer app. The tone is:

- **やわらかい (soft)** — short sentences, kind verbs, no commands
- **あたたかい (warm)** — empathetic to the small joys of parenting
- **しずか (quiet)** — confident enough not to shout; never urgent
- **ていねい (polite)** — uses 〜です／〜ます forms, but not overly formal keigo

### Casing / formatting (Japanese)

- **Hiragana over kanji** for warmth on emotional copy: `ようこそ` not `歓迎`, `おもいで` not `思い出` (use feeling-based judgment).
- **Kanji is fine** for clarity on functional labels: `アップロード`, `アルバム`, `家族`, `履歴`.
- **Mascot prefix**: P-kun's voice is identifiable — speech bubbles end with `〜だよ` or `〜ね`. The app's own UI voice does NOT use these (uses `〜です`).
- **Numbers** are half-width (`12枚` not `１２枚`).
- **Romaji**: avoid in body copy. App name `P-kun Album` is fine in headings.

### Address forms

- App → user: **〜です／〜ます調** ("丁寧語"). Never plain form.
- P-kun mascot → user: friendly **〜だよ／〜ね**.
- The user is referenced indirectly when possible. Avoid `あなた` (feels distant). Prefer omitting the subject or using `みなさん` for grandparent-inclusive copy.
- The product refers to itself as `ぴーくんアルバム` (rarely "we").

### Examples

| Context | ✅ Good | ❌ Avoid |
|---|---|---|
| Empty album | `まだ写真がありません。最初の1枚を追加してみませんか？` | `写真を追加してください！` (too commanding) |
| Upload success | `12枚の写真をアップロードしました` | `🎉 アップロード成功！すごい！` (too loud) |
| P-kun bubble | `ぼくが見守ってるよ〜` | `見守っています。` (wrong voice for mascot) |
| Confirm delete | `この写真を削除しますか？元に戻すことはできません。` | `本当に削除しますか？` (anxious) |
| Loading | `写真をよみこんでいます…` | `Loading...` |

### Emoji

- **Generally avoided** in product UI — we have a mascot for warmth.
- Acceptable sparingly in **mascot speech bubbles** (e.g. `🌸` on spring greetings) — never more than one emoji per bubble.
- Never in buttons, labels, error messages, or system notifications.

---

## Visual Foundations

### Color

A **soft pastel system** anchored on sky blue (P-kun's color), with cream, blossom pink, mint, and lavender as supporting accents. Neutrals are **warm off-whites and putty tones** — never pure gray, never pure black.

- **Primary** `--brand` (#97a05c) — muted yellow-green (苔色). Use for primary actions, brand surfaces, P-kun's overalls. Never bright/saturated.
- **Background** `--bg` (#fbfdf2) — pale yellow-green warm white. The whole app sits on this, not pure white.
- **Text** `--fg` (#272a18) — warm near-black, never `#000`.
- Accent colors rotate as **album cover tints** and **category chips** — they are decorative, not semantic (except status colors).

### Typography

- **Display & headings**: Zen Maru Gothic — round, friendly, distinctively Japanese-friendly without being childish.
- **Body**: M PLUS Rounded 1c — very legible, supports both Japanese and Latin glyphs gracefully.
- **Mono**: Kosugi Maru — only for timestamps / IDs; rarely used.

Headings are **bold but not loud**. Body text uses 1.6 line-height (Japanese reads cleaner with breathing room). Slight positive letter-spacing on Japanese body text (`0.02em`) improves rhythm.

### Spacing & layout

- 4px grid. Most spacing snaps to multiples of 4 (`--sp-1` through `--sp-20`).
- **Generous whitespace.** This is a calm app. Never crowd.
- Container max-width on web: ~1200px, photos take precedence.
- Photos are the **hero** of every screen — chrome recedes.

### Backgrounds

- **Default**: warm cream solid (`--bg`).
- **Tinted sections**: pale `--bg-tinted` for hierarchy.
- **No gradients** in the main UI — gradients feel "tech-y" and clash with the gentle vibe. Exception: subtle **protection gradients** (top-down dark fade) over photos to keep overlay text readable.
- **No full-bleed photographic backgrounds** behind chrome. Photos appear inside frames.
- **Decorative motifs**: occasional scattered dots, soft confetti, small P-kun illustrations — used only on empty states, onboarding, and the marketing splash. Never behind functional UI.

### Animation

- **Easing**: `--ease-out` for entrances, `--ease-bounce` for *only* mascot/celebration moments (gentle bounce, not springy).
- **Durations**: 140/220/360ms (fast/base/slow). Default `220ms`.
- **Hover**: `transform: translateY(-2px)` + slightly stronger shadow on cards. No color shift.
- **Press**: `transform: scale(0.97)` — gentle squish.
- **Page transitions**: cross-fade only, 220ms. No slides, no flips.
- **Micro-celebrations**: P-kun does a tiny bounce on upload success. One bounce, then rest.

### Hover & press states

| State | Effect |
|---|---|
| Button hover | Background → `--brand-hover` (one shade darker), shadow strengthens |
| Button press | `scale(0.97)`, background → `--brand-press` |
| Card hover | `translateY(-2px)`, shadow grows from `md` → `lg` |
| Photo hover | Scale 1.02 inside its container's `overflow: hidden` |
| Icon button | Background fades in to `var(--brand-soft)` (10% brand) |
| Disabled | Opacity 0.5, no pointer events |

### Borders

- Borders are **rare**. Most separation comes from background tint or shadow.
- When used: 1px solid `--border` (#ece8df) — almost imperceptible.
- Never colored borders for "accent" purposes (no left-border-accent cards).

### Shadows

Shadows are **warm-tinted** (rgba 70,60,30) — not neutral gray. Four levels:

- `--shadow-sm` — barely-there for subtle lifts
- `--shadow-md` — default card resting state
- `--shadow-lg` — card hover, modal
- `--shadow-xl` — full modals, photo lightbox
- `--shadow-photo` — slightly punchier, for photo tiles only

### Corner radii — generously round

- Default card: **20px** (`--r-lg`)
- Buttons: **999px** (`--r-pill`) — fully rounded for friendliness
- Inputs: **14px** (`--r-md`)
- Modals / hero panels: **28–36px** (`--r-xl` / `--r-2xl`)
- Photo thumbnails: **20px** — soft, never sharp

### Cards

Cards are **white-on-cream**:
- Background `#ffffff` against `--bg` cream — provides natural separation.
- Radius 20px.
- Shadow `--shadow-md` resting, `--shadow-lg` on hover.
- No border by default. Add 1px `--border` only when shadow can't be used (e.g. on tinted backgrounds).
- Padding generous: 24–32px for content cards, 0 for photo cards (image bleeds to corners).

### Transparency & blur

- Backdrop blur (`backdrop-filter: blur(12px)`) on **fixed overlays only** — sticky header on scroll, photo lightbox chrome.
- Never on resting cards or buttons.
- Use `rgba(255,253,249,0.85)` (paper at 85%) for blurred surfaces — keeps the warm tone.

### Imagery

Photos are user-supplied (kids photos), so we don't dictate color treatment — but the **frames around them** establish warmth:
- Photo cards always have soft shadow + rounded corners.
- Empty/placeholder photo slots show a **friendly cream tile** with a small P-kun silhouette, never a gray box.
- Stock illustrations (when present) are **pastel, flat, with soft outlines** — never photoreal, never 3D, never realistic shadows.

### Layout rules

- **Sticky header** on scroll, with backdrop blur. Always reachable.
- **Side rail** for primary nav on desktop; bottom tab bar on tablet/mobile.
- **Floating action button** for upload (the one truly fixed action) — bottom-right, always visible.
- **No advertisement, banner, or promotional space** anywhere.

---

## Iconography

### Icon system: **Phosphor Icons (Duotone)**

P-kun Album uses [Phosphor Icons](https://phosphoricons.com/) in **Duotone** style. This is a substitution flagged below — there's no original codebase to lift from. Phosphor Duotone fits because:

- The **rounded terminals** match the type and corner radii.
- The **two-tone fill** lets icons feel softer (not stark single-stroke).
- Strokes are gentle (`1.5–2px equivalent`) — no hard edges.

> **⚠️ Substitution flag:** Phosphor Duotone was chosen because no original icon set existed. If the user has a preferred Japanese-friendly icon set or wants custom drawings, please share and we'll swap.

Loaded via CDN:
```html
<script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
<i class="ph-duotone ph-image"></i>
```

### Usage rules

- Icons are **always paired with a text label** in primary actions. Icon-only is reserved for: header utility buttons, the FAB, and clearly-conventional toolbar buttons.
- Default icon color: `--fg-muted`. Active/selected: `--brand`.
- Default size: 20px inline, 24px on touch targets, 32px+ for empty states.
- Hit target: minimum 44×44px (we are kids+grandparents friendly).

### Custom illustrations

- **P-kun mascot** — stored in `assets/p-kun/`. Used in empty states, splash, success moments.
- Decorative motifs (clouds, stars, dots) — small flat SVGs in `assets/decor/`.
- All custom art is **pastel-flat**: solid soft fills, soft outlines (or none), no gradients beyond a single soft highlight.

### Emoji

Avoided in product UI. See Content Fundamentals → Emoji.

### Unicode characters as icons

Avoided. Always use real SVG icons.

---

## Quick start for designers

1. Import the foundations:
   ```html
   <link rel="stylesheet" href="colors_and_type.css">
   <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>
   ```
2. Use semantic CSS vars (`--brand`, `--fg`, `--bg`) — never hardcode hex.
3. Pull components from `ui_kits/web/` rather than rebuilding.
4. When in doubt: more whitespace, more rounded, more gentle.
