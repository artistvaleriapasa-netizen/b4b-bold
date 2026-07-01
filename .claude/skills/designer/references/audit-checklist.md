# Audit checklist

Run this in step 1. For each item that fails, note **where** (selector or line)
and **why it hurts**, then rank by leverage. Above-the-fold and primary-CTA issues
outrank micro-polish.

## Visual polish
- [ ] Type hierarchy is unmistakable (display vs h1/h2 vs body vs caption)?
- [ ] Heading leading tight, body `1.6`, large headings have negative tracking?
- [ ] Vertical spacing snaps to the spacing scale (no random margins)?
- [ ] Sections breathe (~`--space-2xl` between major blocks)?
- [ ] Violet used only for emphasis/CTA, neutrals carry the rest?
- [ ] Radii/shadows consistent within each component family?
- [ ] No stray hardcoded hex/px where a token exists?
- [ ] Container width capped (~1200px), prose ~65ch, edges optically aligned?

## UX & conversion
- [ ] Each section has one clear job and the hero one primary CTA?
- [ ] Headline states the outcome; subhead the how; proof is scannable?
- [ ] Concrete metrics / cases / logos surfaced near CTAs?
- [ ] Secondary actions visually subordinate to primary?
- [ ] Long pages repeat/stick the CTA; no dead-end sections?
- [ ] Nav is clear; user always knows the next step?

## Motion & interaction
- [ ] Every interactive element has hover + focus-visible + active states?
- [ ] Buttons lift/glow on hover using brand shadow tokens?
- [ ] Scroll reveals are subtle, fast, staggered (IntersectionObserver)?
- [ ] Transitions 150–300ms ease-out, nothing janky or blocking?
- [ ] All non-essential motion disabled under `prefers-reduced-motion: reduce`?

## Responsive & accessibility
- [ ] 375px: no horizontal scroll, columns stack, hero still sells?
- [ ] Tap targets ≥44px, text ≥16px on mobile?
- [ ] `clamp()` used for hero type / section padding where it smooths scaling?
- [ ] Contrast ≥4.5:1 body / 3:1 large text?
- [ ] Semantic tags, logical heading order, `alt` text, `aria-label` on icon buttons?
- [ ] Visible focus rings; language switcher + mobile menu keyboard-operable?
- [ ] No heavy libs added; below-fold images `loading="lazy"`?
