# B4B design system — tokens & usage

All tokens live in the `:root` block of each page's inline `<style>` (defined in
`index.html`, mirrored on other pages). **Always reference these via `var(--…)`.**
If a needed value is missing, add a token to `:root` — don't hardcode.

## Color

| Token | Value | Use for |
|---|---|---|
| `--primary` | `#5046E5` | Brand violet — CTAs, active states, emphasis, links |
| `--primary-dark` | `#3D35B8` | Hover/pressed state of primary |
| `--primary-light` | `#7B68EE` | Gradient partner, soft accents |
| `--black` | `#0A0A1A` | Max-contrast headings, dark sections |
| `--gray-900` | `#1A1A2E` | Default body text |
| `--gray-700` | `#3D3D4E` | Secondary text |
| `--gray-500` | `#6B6B7B` | Muted text, eyebrows, captions |
| `--gray-400` | `#9999A8` | Placeholder, disabled |
| `--gray-300 / 200` | `#C5C5CE / #E5E5EA` | Borders, dividers |
| `--gray-100 / 50` | `#F2F2F7 / #FAFAFC` | Section backgrounds, pills |
| `--white` | `#FFFFFF` | Base background, text on dark |
| `--success / warning / error` | `#10B981 / #F59E0B / #EF4444` | Semantic states |

**Gradients:** `--gradient-primary` (violet→light violet), `--gradient-bold`
(violet→pink `#EC4899`), `--gradient-soft` (pale violet→pale pink),
`--gradient-dark` (near-black). Use `--gradient-bold` for hero/stat highlights via
`background-clip:text`. Gradients are accents, not backgrounds for whole sections.

**Rule:** violet is precious — reserve it for CTAs, active nav, and key emphasis.
Neutrals do the heavy lifting.

## Typography

- `--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif` — everything.
- `--font-mono: 'JetBrains Mono', monospace` — eyebrows, labels, stats, code, kickers
  (usually uppercase, `letter-spacing:0.08em`, `~11px`, `--gray-500`).

Loaded from Google Fonts (Inter 400–900, JetBrains Mono 400–600). Body is `16px`
/ `line-height:1.6`. Headings: tighten leading (~1.05–1.15) and
`letter-spacing:-0.02em` on large sizes. Prefer `clamp()` for display/hero type.

## Spacing scale

`--space-xs 4px` · `--space-sm 8px` · `--space-md 16px` · `--space-lg 24px` ·
`--space-xl 48px` · `--space-2xl 96px`

Snap vertical rhythm to these. Major sections ~`--space-2xl` apart. Note the gap
between `xl(48)` and `2xl(96)` — if you repeatedly need ~64–72px, add a
`--space-3xl` token rather than a magic number.

## Radius

`--radius-sm 8px` · `--radius-md 12px` · `--radius-lg 16px` · `--radius-xl 24px` ·
`--radius-full 9999px` (pills, avatars, toggles). Keep radii consistent per
component family.

## Shadows / elevation

`--shadow-sm` (hairline) · `--shadow-md` (cards) · `--shadow-lg` (raised cards,
popovers) · `--shadow-xl` (modals, hero cards). Brand glow: `--shadow-primary`
and `--shadow-primary-lg` for CTA buttons and violet elements on hover.

## Layout conventions

- Content container: `max-width` ~1200px, centered, side padding via `--space-lg`.
- Prose measure: ~65ch for readability.
- Standard button: pill (`--radius-full`), violet bg, white text, `--shadow-primary`;
  hover → `--primary-dark` + `translateY(-2px)` + `--shadow-primary-lg`.
- Eyebrow/kicker pattern: mono, uppercase, tracked, muted, small, sits above a heading.

## House style (match the source)

- CSS is compact/minified-ish (`prop:value;prop:value` on fewer lines). Match the
  surrounding density; don't reformat unrelated CSS.
- Section banners in the stylesheet use `═══` comment rulers — keep that style if
  you add a new section.
