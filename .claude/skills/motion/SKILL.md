---
name: motion
description: Apple-tier motion & animation playbook for the B4B Moldova site. Use when adding or refining animation, transitions, scroll reveals, hover/press feedback, parallax, entrance choreography, or any movement in the UI — or when asked to make the site feel more premium, polished, "expensive", or like Apple/Linear/Stripe. Pairs with the `designer` skill.
---

# Motion — B4B Moldova

Motion is the difference between a site that looks designed and one that feels
*built by a top brand*. The rule is **restraint with intention**: nothing moves
without a reason, everything moves on the same physics, and a user who never
notices the animation is the goal — they just feel the quality.

Read `references/easing-and-timing.md` for the exact tokens and curves.

## The four laws (Apple / Linear / Stripe house style)

1. **Purpose over decoration.** Motion should communicate — reveal hierarchy,
   confirm an action, guide the eye, show cause→effect. If an animation doesn't
   help the user understand or feel something, cut it. No motion for motion's sake.
2. **One physics for the whole site.** All movement shares a small set of easing
   curves and durations (the motion tokens). Mismatched easings are the #1 tell of
   an "assembled" site. Snappy in, gentle to rest — never linear, never bouncy-cute
   unless it's a deliberate playful accent.
3. **Fast and short.** UI feedback 120–200ms. Entrances 300–600ms. Anything over
   ~700ms feels sluggish. Distance is small: 8–24px of travel, not 60px slides.
   Subtle beats showy every time.
4. **Never block, never annoy.** Motion must not delay interaction or fire on
   every scroll tick. Reveal once, then leave content alone. Always honor
   `prefers-reduced-motion` — the site must be fully usable and complete with all
   motion off.

## The motion tokens (add to `:root` if missing)

```css
--ease-out:cubic-bezier(0.22,1,0.36,1);    /* default — snappy in, soft landing */
--ease-in-out:cubic-bezier(0.65,0,0.35,1); /* symmetric moves (toggles, reorder) */
--ease-spring:cubic-bezier(0.34,1.56,0.64,1); /* tiny overshoot — use RARELY, accents only */
--dur-fast:0.18s;   /* hover, press, focus */
--dur-base:0.32s;   /* small reveals, menus */
--dur-slow:0.6s;    /* hero / section entrances */
```

Always animate through a token, never a raw `0.3s ease`. If you need a new curve,
add a token — don't inline a one-off bezier.

## What to animate (and how)

### Micro-feedback (hover / focus / press) — `--dur-fast`, `--ease-out`
- Buttons: lift `translateY(-2px)` + shadow bump on hover, `translateY(0)` on
  `:active`. Directional icons (arrows) nudge `translateX(2–3px)`.
- Cards: gentle lift (`-2px to -4px`) + slightly stronger shadow. Never scale > 1.03.
- Links: color/underline shift. Focus-visible ring appears instantly (no fade).

### Entrance reveals — `--dur-slow`, `--ease-out`
- Fade + short rise: `opacity 0→1`, `translateY(16px→0)`. IntersectionObserver,
  reveal **once** (`unobserve` after), threshold ~0.1–0.15.
- **Choreograph, don't dump.** Stagger siblings 60–90ms so the eye reads in order
  (see below). Hero: badge → headline → sub → CTA → proof.
- Trigger slightly before fully in view (`rootMargin:'0px 0px -50px 0px'`).

### Stagger pattern (CSS-only, pairs with the reveal system)
```css
.stagger > *{transition-delay:calc(var(--i,0) * 70ms)}
/* or explicit per-child transition-delay on known groups */
```
Keep total sequence under ~500ms — the last item shouldn't feel late.

### Continuous / ambient — use almost never
Pulsing dots, slow gradient drifts, floating blobs: at most one small ambient
element per viewport, low amplitude, and pause under reduced-motion. Ambient
motion is where "AI/generic SaaS" sites overdo it — resist.

## Performance (non-negotiable)
- **Only animate `transform` and `opacity`.** They're GPU-composited. Never
  animate `width`, `height`, `top`, `left`, `margin`, `box-shadow` size, or
  `background-position` in a loop — they cause layout/paint jank.
- Promote long-running animations with `will-change:transform` sparingly; remove
  it after. Don't leave `will-change` on everything.
- No JS scroll handlers driving layout per frame — use IntersectionObserver or CSS
  `@scroll-timeline`/`animation-timeline` where supported, with a static fallback.
- This is a no-build static site: **add zero animation libraries.** CSS + a little
  vanilla JS (the existing IntersectionObserver) is the whole toolkit.

## Reduced motion (must ship with every change)
```css
@media (prefers-reduced-motion: reduce){
  *{animation:none !important; transition:none !important}
  .reveal{opacity:1; transform:none}
}
```
The site already has this global guard — keep new reveals compatible with it
(start hidden only via `.reveal`, which the JS force-shows under reduced motion).

## Definition of done
Motion is done when: every interactive element has fast, token-based feedback;
entrances are subtle, staggered, and fire once; only `transform`/`opacity` animate;
nothing blocks interaction; reduced-motion fully disables it; and — verified in the
browser — the page feels *calmer and more expensive*, not busier.
