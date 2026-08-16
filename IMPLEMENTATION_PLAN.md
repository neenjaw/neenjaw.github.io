# neenjaw.com Redesign — Implementation Plan

## Design Tokens (Extracted from Framer Reference)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#f7f5ef` | Page background (warm off-white) |
| `--color-fg` | `#15161a` | Primary text (near-black) |
| `--color-border` | `#d8d5cc` | Borders, dividers |
| `--color-accent` | `#1647ff` | Essay cards, links, active nav |
| `--color-highlight` | `#c9ff2e` | Devlog badges, signal dot |
| `--color-muted` | `#65666c` | Dates, secondary text |
| `--font-mono` | JetBrains Mono | UI chrome, dates, labels, nav |
| `--font-body` | Clash Grotesk | Headings, body text, essay titles |
| `--max-width` | `1080px` | Content container |

---

## Phase 1: Configuration & Collections

### Step 1.1 — Update `_config.yml`

- Define three collections: `_notes`, `_devlogs`, `_essays` with `output: true`
- Set `permalink` patterns for each collection
- Add `header_pages` to control nav order: `essays.markdown`, `devlogs.markdown`, `profile.markdown`
- Add default layouts per collection via `defaults`

### Step 1.2 — Migrate existing posts to `_essays/`

- Move all 14 files from `_posts/` to `_essays/`
- Rename front matter: change `layout: essay` references
- Update date formats in front matter if needed
- Remove `_posts/` directory (or keep `.gitkeep` if you want fallback)

### Step 1.3 — Create sample content stubs

- 2-3 sample notes in `_notes/` with devlog slug front matter
- 2-3 sample devlogs in `_devlogs/` with thread metadata
- Ensure existing essays have proper front matter for the new design

---

## Phase 2: Fonts

### Step 2.1 — Download and self-host fonts

- Download JetBrains Mono woff2 (regular 400, 500) to `assets/fonts/`
- Download Clash Grotesk woff2 (regular 400, semibold 600, bold 700) to `assets/fonts/`
- Both are freely available (Google Fonts / Fontshare)

### Step 2.2 — Create `assets/css/fonts.css`

- `@font-face` declarations with `font-display: swap`
- Local paths to woff2 files

---

## Phase 3: CSS Architecture

### Step 3.1 — Create `assets/css/variables.css`

- All custom properties on `:root` (colors, fonts, sizes, spacing)
- Dark mode `@media (prefers-color-scheme: dark)` overrides (same values for now, per the Framer design which doesn't differentiate)

### Step 3.2 — Create `assets/css/reset.css`

- Minimal box-sizing reset
- Margin/padding reset for headings, figures, paragraphs
- `-webkit-font-smoothing: antialiased` on `:root`

### Step 3.3 — Create `assets/css/base.css`

- `body` typography (JetBrains Mono as base, Clash Grotesk for headings)
- Link styles (color transitions, no underline by default)
- `img` defaults (`max-width: 100%`, `display: block`)
- `.container` class (max-width 1080px, centered, responsive padding)

### Step 3.4 — Create `assets/css/header.css`

- Flex row, space-between, border-bottom
- Identity block: green signal dot (10px, border-radius 10px) + "NEENJAW" wordmark (14px, letter-spacing 0.8px)
- Nav links: 12px, monospace, no decoration, blue on hover/active
- Responsive: collapse to hamburger or stacked on narrow screens

### Step 3.5 — Create `assets/css/footer.css`

- Flex row, space-between, border-top
- Footer note: 11px monospace, muted color
- Footer links: GitHub icon + any other links

### Step 3.6 — Create `assets/css/stream.css` (home page stream)

- `.stream-header`: flex row, "LATEST" label + count, border-bottom
- `.stream-item`: flex row with date column (150px, muted) + content column (flex: 1)
- `.stream-item--note`: border-bottom (1px solid border color)
- `.stream-item--essay`: full-width blue card, white text, 32px padding, border-radius
  - Essay metadata row: "ESSAY / MM.DD.YY" + arrow icon
  - Essay title: Clash Grotesk, 34px, semibold, -0.8px letter-spacing
  - Essay excerpt: 17px, regular weight, 1.5em line-height
- `.devlog-badge`: neon green background, border-radius 999px, 6px 10px padding, 10px text, arrow icon
- `.stream-footer`: "READ THE ENTIRE STREAM" link with arrow

### Step 3.7 — Create `assets/css/intro.css` (home page introduction)

- Kicker text: 12px, monospace, muted, letter-spacing 0.4px
- Title (h1): Clash Grotesk, 48px, semibold, -1.5px letter-spacing, 1.02em line-height
- Introduction copy: 17px, max-width 720px, balanced text wrap
- Publishing legend: flex row, note marker (8px green square) + label, essay marker (8px blue square) + label

### Step 3.8 — Create `assets/css/essay.css` (single essay page)

- Essay header: title, date, optional subtitle
- Essay body: Clash Grotesk 17px, 1.55em line-height, comfortable reading width
- Code blocks, blockquotes, lists styling
- Prev/next navigation

### Step 3.9 — Create `assets/css/essay-index.css` (essays listing page)

- Similar to stream but essays-only view

### Step 3.10 — Create `assets/css/devlog.css` (single devlog + devlog index)

- Devlog thread display
- Notes within a devlog thread

### Step 3.11 — Create `assets/css/note.css` (single note page)

- Compact note display with date, optional devlog badge, body text

### Step 3.12 — Create `assets/css/profile.css` (profile/about page)

- Photo, bio sections, tech stack, interests

### Step 3.13 — Create `assets/css/responsive.css`

- Container query breakpoints for stream items
- Media queries for mobile/tablet/desktop
- Responsive font scaling
- Navigation collapse

### Step 3.14 — Update `assets/css/main.css`

- Import all partials via `@import` (or concatenate)
- Remove old styles entirely
- Replace with the new modular CSS architecture

---

## Phase 4: Layouts

### Step 4.1 — Rewrite `_layouts/default.html`

- Semantic HTML5 structure: `<html>`, `<head>`, `<body>`
- Include `head.html`, `header.html`, `footer.html`
- Wrap content in `<main>` with container class
- Add `class` hook for page-specific styling (e.g., `class="page-home"`)
- Dark mode meta tag

### Step 4.2 — Rewrite `_includes/head.html`

- Charset, viewport, SEO tags
- Font stylesheets (fonts.css)
- CSS imports (variables, reset, base, etc.)
- Favicon references
- Feed meta

### Step 4.3 — Rewrite `_includes/header.html`

- Semantic `<header>` with role="banner"
- Identity block: `<a>` with signal dot `<span>` + wordmark
- `<nav>` with Essays, Devlogs, Profile links
- Active page highlighting via `page.url` comparison

### Step 4.4 — Rewrite `_includes/footer.html`

- Semantic `<footer>` with role="contentinfo"
- Footer note text
- GitHub icon link (inline SVG)

### Step 4.5 — Create `_layouts/home.html` (extends default)

- Introduction section (kicker, title, intro copy, publishing legend)
- Stream section: merge notes + essays chronologically
- Liquid logic to combine `site.notes` + `site.essays`, sort by date, limit to 4
- "READ THE ENTIRE STREAM" link

### Step 4.6 — Create `_layouts/essay.html` (extends default)

- Single essay display with microformats2
- Title, date, optional subtitle
- Article body content
- Prev/next navigation

### Step 4.7 — Create `_layouts/essay_index.html` (extends default)

- Essays listing page
- Similar stream layout but essays-only

### Step 4.8 — Create `_layouts/devlog.html` (extends default)

- Single devlog display
- Threaded notes within the devlog

### Step 4.9 — Create `_layouts/devlog_index.html` (extends default)

- Devlogs listing page

### Step 4.10 — Create `_layouts/note.html` (extends default)

- Single note display

### Step 4.11 — Create `_layouts/profile.html` (extends default)

- About/profile page with photo, bio, tech stack

### Step 4.12 — Remove old `_layouts/essay.html` and `_layouts/essay_index.html`

- Replaced by new versions

---

## Phase 5: Includes (Partials)

### Step 5.1 — Create `_includes/stream-item-note.html`

- Date column + body text + optional devlog badge
- Border-bottom styling

### Step 5.2 — Create `_includes/stream-item-essay.html`

- Blue card with white text
- Essay metadata, title, excerpt

### Step 5.3 — Create `_includes/devlog-badge.html`

- Reusable badge component with icon + text

### Step 5.4 — Create `_includes/arrow-icon.svg`

- Inline SVG for the arrow/chevron icons used throughout

### Step 5.5 — Create `_includes/signal-dot.html`

- The green dot used in the header identity

---

## Phase 6: Content Pages

### Step 6.1 — Rewrite `index.markdown`

- Use `layout: home`
- No body content needed (layout handles everything)

### Step 6.2 — Rewrite `essays.markdown`

- Use `layout: essay_index`
- Title: "essays"
- Permalink: `/essays/`

### Step 6.3 — Create `devlogs.markdown`

- Use `layout: devlog_index`
- Title: "devlogs"
- Permalink: `/devlogs/`

### Step 6.4 — Rewrite `profile.markdown`

- Use `layout: profile`
- Keep existing bio content
- Restructure for new layout

---

## Phase 7: SVG Icons

### Step 7.1 — Create `assets/icons/arrow-ne.svg`

- The north-east arrow used in essay cards and links (viewBox 0 0 24 24, 2px stroke)

### Step 7.2 — Create `assets/icons/arrow-right.svg`

- The right-pointing arrow used in "READ THE ENTIRE STREAM"

### Step 7.3 — Create `assets/icons/github.svg`

- GitHub octocat icon for footer (16x16, currentColor fill)

---

## Phase 8: Dark Mode

### Step 8.1 — Add `@media (prefers-color-scheme: dark)` overrides in `variables.css`

- Currently the Framer design uses the same tokens for both modes
- Structure it so dark mode can be differentiated later
- Set `color-scheme: light dark` on `:root`

---

## Phase 9: Responsive Design

### Step 9.1 — Implement container queries

- Stream items adapt layout within their container
- Essay cards adjust padding and font-size

### Step 9.2 — Media query breakpoints

- Mobile: `< 640px` — stacked layout, smaller fonts, full-width padding
- Tablet: `640px - 1024px` — adjusted spacing
- Desktop: `> 1024px` — full design as shown in Framer reference

### Step 9.3 — Navigation responsiveness

- Desktop: horizontal nav links
- Mobile: consider stacking or simplified nav

---

## Phase 10: Verification

### Step 10.1 — Build the site

```
bundle exec jekyll build
```

Verify:
- All collections render correctly
- No layout errors
- All pages have correct URLs

### Step 10.2 — Serve and manually verify

```
bundle exec jekyll serve
```

Verify:
- Home page stream mixes notes + essays chronologically
- Essays page lists all essays
- Devlogs page lists devlogs
- Profile page renders correctly
- Navigation works across all pages
- Responsive behavior at various widths
- Fonts load correctly
- CSS custom properties apply

### Step 10.3 — Fix any build errors or visual issues

---

## File Inventory (New/Modified)

| File | Action |
|------|--------|
| `_config.yml` | Modify — add collections, defaults, header_pages |
| `_posts/*` to `_essays/*` | Move — migrate 14 posts |
| `assets/fonts/` | Create — JetBrains Mono + Clash Grotesk woff2 |
| `assets/css/variables.css` | Create |
| `assets/css/reset.css` | Create |
| `assets/css/base.css` | Create |
| `assets/css/header.css` | Create |
| `assets/css/footer.css` | Create |
| `assets/css/intro.css` | Create |
| `assets/css/stream.css` | Create |
| `assets/css/essay.css` | Create |
| `assets/css/essay-index.css` | Create |
| `assets/css/devlog.css` | Create |
| `assets/css/note.css` | Create |
| `assets/css/profile.css` | Create |
| `assets/css/responsive.css` | Create |
| `assets/css/main.css` | Rewrite — imports all partials |
| `assets/css/confetti.css` | Keep as-is |
| `assets/icons/` | Create — SVG icons |
| `_layouts/default.html` | Rewrite |
| `_layouts/home.html` | Create |
| `_layouts/essay.html` | Rewrite |
| `_layouts/essay_index.html` | Rewrite |
| `_layouts/devlog.html` | Create |
| `_layouts/devlog_index.html` | Create |
| `_layouts/note.html` | Create |
| `_layouts/profile.html` | Create |
| `_includes/head.html` | Rewrite |
| `_includes/header.html` | Rewrite |
| `_includes/footer.html` | Rewrite |
| `_includes/stream-item-note.html` | Create |
| `_includes/stream-item-essay.html` | Create |
| `_includes/devlog-badge.html` | Create |
| `index.markdown` | Rewrite |
| `essays.markdown` | Rewrite |
| `devlogs.markdown` | Create |
| `profile.markdown` | Rewrite |

---

## Decisions Made

- **Fonts**: JetBrains Mono (monospace) + Clash Grotesk (sans-serif), self-hosted woff2
- **Post migration**: Existing 14 posts moved from `_posts/` to `_essays/`
- **Legacy features**: confetti.html and preact-components/ preserved as-is
