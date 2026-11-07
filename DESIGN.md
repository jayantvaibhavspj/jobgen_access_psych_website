# Access Psych design system

## Direction

Calm, welcoming healthcare with a polished editorial feel. Use real Access Psych photography, generous whitespace, strong dark-teal typography, and restrained motion. Keep the existing logo, copy, links, and imagery; do not borrow other sites' content or assets.

## Color

| Token | Value | Role |
|---|---|---|
| Deep teal | `#0b2a33` | Main text, dark panels, footer, and primary buttons |
| Sea glass | `#86d6c6` | Decorative highlights, selected states, and subtle focus accents |
| Peach | `#ffb48a` | Booking actions and warm highlights; pair with deep-teal text |
| Mist | `#f2f7f6` | Main canvas and light section backgrounds |
| White | `#ffffff` | Card surfaces and text on dark panels |
| Secondary text | `#53676b` | Supporting copy on light backgrounds |
| Divider | `#d5e2df` | Hairline rules and quiet boundaries |

Use deep teal for text on peach and sea-glass surfaces. Reserve white text for deep-teal backgrounds.

## Typography

- Display: Fraunces for headings, with a confident editorial scale.
- Body: Figtree for navigation, body text, and controls.
- Body copy: 16px minimum where practical, with 1.65–1.8 line height.
- Use fluid heading sizes and avoid long lines; content width is capped at 1240px.

## Spacing and shape

- Use an 8px spacing rhythm.
- Section padding: `clamp(70px, 10vw, 130px)`.
- Cards: 28px radius; large panels: 48px radius; controls may use a pill shape.
- Keep shadows soft and limited to elevated navigation, cards, and floating actions.

## Components and motion

- Primary booking action: peach pill with deep-teal text.
- Secondary action: transparent outline on dark surfaces and deep-teal outline on light surfaces.
- Quiet links: deep-teal with an arrow that moves on hover.
- Navigation: transparent over the hero, dark blurred glass after 40px scroll; dropdowns are rounded, shadowed, and keyboard operable.
- Cards: use for actual grouped items; vary sizes and layouts rather than repeating identical tiles.
- Focus: visible 3px outline with offset.
- Respect `prefers-reduced-motion`; keep hover and scroll motion subtle and element-local.

## Imagery and icons

- Use original Access Psych photography and logo, never reference-site assets.
- Prefer candid, human-scale photos with readable contrast and descriptive alt text.
- Use Lucide icons as small functional cues, not as decoration.
