# AI-less design — the artifact catalog

The goal: the site should read as **crafted by a studio**, not generated. AI/template
output has a recognizable "look" — a bundle of default choices that appear together.
Below is the catalog of tells, why each reads as AI, and the professional fix. Run
the scan at the bottom before and after any visual work.

Guiding principle: **restraint + intention + specificity.** One accent, one physics,
real content, crafted details. When in doubt, remove decoration.

## Tier 1 — the dead giveaways (fix first)

### 1. Pulsing "status" dots on badges
`● Live` / `● AI online` with a radar-ping animation above the hero. Screams
template/AI-assistant. **Fix:** remove the pulse. Use a static, meaningful icon
(location pin, real logo mark) or nothing. No `@keyframes` ping.

### 2. Gradient text on headings
Violet→pink `background-clip:text` on section titles and accents. The #1 generated-
SaaS tell. **Fix:** solid ink headings; **exactly one** gradient moment per page
(the hero signature line) if any. Accent words use a single solid brand color.

### 3. Rainbow / multi-gradient numbers
Every stat in a different gradient (violet, pink-orange, green-cyan). **Fix:** solid
ink, or one single accent for all of them. Uniformity reads as designed.

### 4. Emoji as UI icons
💅 🔧 📦 🤖 ⚡ ✨ 🚀 as feature/section/card icons (or inside SVG mockups). They
render in the OS emoji font — inconsistent and toy-like. **Fix:** a single crafted
line-icon set (consistent stroke width, size, corner style). Never emoji in chrome.

### 5. Generic template copy
"We don't reinvent the wheel", "end-to-end", "seamless", "cutting-edge",
"empower your business", "✨ AI-powered". **Fix:** specific, concrete, in the
brand's voice. Real numbers, real verticals, real outcomes.

## Tier 2 — the "generated in 2021" bundle

### 6. Glassmorphism everywhere
`backdrop-filter: blur()` + translucent white cards + border. One frosted panel can
be nice; on everything it's a tell. **Fix:** solid, opaque cards with a real shadow
and a clean border. Reserve blur for genuine overlays (sticky nav, modal).

### 7. Glowing colored blobs
Multiple radial-gradient mesh blobs floating behind sections at 0.2–0.4 opacity.
**Fix:** at most one, very subtle (opacity ≤ 0.08), or replace with a crafted
graphic/product visual. No animated floating blobs.

### 8. Heavy colored glow shadows on buttons
`box-shadow: 0 20px 40px rgba(brand, 0.45)` on every button. **Fix:** subtle neutral
elevation; reserve a soft brand glow for the single primary CTA, at lower intensity.

### 9. Everything maximally rounded
`border-radius: 9999px` / 24px on every element. **Fix:** a deliberate radius scale;
pills for pills (buttons, tags), moderate radius for cards. Consistency per family.

### 10. Icon-in-gradient-rounded-square, ×N
The same gradient square with a white line-icon, repeated across a perfectly
symmetric 3/4-card grid. **Fix:** vary treatment, use restrained monochrome icon
chips, let content (not the icon frame) carry the card.

## Tier 3 — the subtle ones (polish)

### 11. Over-centered layouts
Every section centered, same max-width, same rhythm. **Fix:** vary — left-aligned
sections, asymmetric splits, editorial breaks.

### 12. Inconsistent media
Mixed B&W and color portraits; stock-looking imagery; mismatched illustration
styles. **Fix:** one photo treatment site-wide; real assets over stock.

### 13. Uniform 3-card symmetry for everything
Every concept forced into a tidy 3-up grid. **Fix:** let content dictate layout;
some things are a list, a table, or a single feature.

### 14. Fake-precise stats without source
"+85%", "3.2×", "10x" with no context. **Fix:** attach a real basis, or soften the
claim. Unsourced hyper-precision reads as generated.

### 15. Motion tells
`transition: all 0.3s ease` everywhere, everything fading in at once, long slides,
bouncy card pops. **Fix:** the `motion` skill — one easing system, choreographed
stagger, subtle travel.

## The scan (run before/after visual work)

```bash
# Tier-1 tells
grep -c 'background-clip:text' index.html                 # gradient text/numbers
grep -nE '@keyframes|animation:[^n]' index.html           # pulses / ambient motion
grep -noE '[😀-🟿🚀⚡✨💡🎯🔥]' index.html                    # emoji in markup/SVG
grep -c 'backdrop-filter' index.html                       # glassmorphism
grep -c 'radial-gradient' index.html                       # mesh blobs
# copy smells
grep -niE 'reinvent|end-to-end|seamless|cutting-edge|empower|game.?chang' index.html
```

Then verify VISUALLY in the browser (force-reveal `.reveal` for screenshots) —
tells are seen, not just grepped.

## Definition of AI-less
No pulsing badges; ≤1 gradient moment; uniform solid numbers; one crafted icon set,
zero emoji in chrome; opaque cards with real shadows; ≤1 subtle blob; deliberate
radii; specific copy; one motion physics. The page should feel quiet, confident, and
unmistakably *made*.
