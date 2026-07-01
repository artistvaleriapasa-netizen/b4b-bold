# Easing & timing reference

## Tokens (canonical — live in `:root`)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22,1,0.36,1)` | **Default.** Enters fast, lands soft. Reveals, hovers, most transitions. |
| `--ease-in-out` | `cubic-bezier(0.65,0,0.35,1)` | Symmetric moves that start and end at rest — toggles, accordions, reorders. |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Slight overshoot. **Accents only** (a confirmation checkmark, a badge pop). Never on text or large elements. |
| `--dur-fast` | `0.18s` | Hover, press, focus, icon nudge. |
| `--dur-base` | `0.32s` | Menus, small reveals, tab switches. |
| `--dur-slow` | `0.6s` | Hero/section entrances, large fades. |

## Duration guide by interaction

| Interaction | Duration | Curve |
|---|---|---|
| Button/link hover, focus ring, press | 120–180ms | `--ease-out` |
| Icon nudge, tooltip | 150–200ms | `--ease-out` |
| Card lift, dropdown, mobile menu | 250–320ms | `--ease-out` |
| Scroll-reveal fade+rise | 500–600ms | `--ease-out` |
| Accordion / height (avoid; prefer transform) | 300ms | `--ease-in-out` |

## Travel distance
- Reveal rise: **16px** (hero/section), 8–12px for small items.
- Card/button lift: **2–4px**.
- Icon nudge: **2–3px**.
- Avoid > 24px of travel — long slides read cheap and draw attention to the motion.

## Stagger
- Sibling delay: **60–90ms** (70ms is the default sweet spot).
- Total sequence budget: **≤ 500ms** end to end. If a group has many items, stagger
  only the first ~6 and reveal the rest together, or reduce per-item delay.
- Hero order: badge → headline → subhead → CTA → trust → KPIs.

## Anti-patterns (these read as "AI/generic")
- `transition: all 0.3s ease` everywhere (generic `ease`, no shared system).
- Everything fading in at once with no choreography.
- Long 800ms+ slides, big 60px translates, `scale(1.1)` pops on cards.
- Bouncy `--ease-spring` on headings, sections, or anything large.
- Multiple floating/pulsing blobs animating at once.
- Animating `box-shadow`, `width/height`, `top/left`, or `background-position` in loops.

## Copy-paste patterns

Button:
```css
.btn{transition:transform var(--dur-fast) var(--ease-out),
                box-shadow var(--dur-fast) var(--ease-out),
                background var(--dur-fast) var(--ease-out)}
.btn:hover{transform:translateY(-2px)}
.btn:active{transform:translateY(0)}
.btn svg{transition:transform var(--dur-fast) var(--ease-out)}
.btn:hover svg{transform:translateX(3px)}
```

Reveal + stagger:
```css
.reveal{opacity:0;transform:translateY(16px);
        transition:opacity var(--dur-slow) var(--ease-out),
                   transform var(--dur-slow) var(--ease-out)}
.reveal.visible{opacity:1;transform:none}
.stagger > *{transition-delay:calc(var(--i,0) * 70ms)}
```

Reduced motion (global guard — already present in index.html):
```css
@media (prefers-reduced-motion: reduce){
  *{animation:none !important;transition:none !important}
  .reveal{opacity:1;transform:none}
}
```
