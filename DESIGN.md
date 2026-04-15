# Design Brief

## Purpose
Sales enablement knowledge platform for Liquid Instruments Moku products — engineering field reps and technical sales staff learning product specs, use cases, and solution architecture across verticals.

## Tone & Differentiation
Brutalist-utilitarian. Dark-tech engineering workbench aesthetic. Zero decorative bloat — every pixel serves information clarity or interaction feedback. Sidebar-first navigation with integrated product/vertical browser. Hierarchy through typography weight and size, not color or shape.

## Color Palette (OKLCH)

| Token | Light | Dark | Purpose |
|-------|-------|------|---------|
| Background | `0.98 0 0` | `0.11 0.01 260` | Main surface, minimal contrast for sustained focus |
| Foreground | `0.15 0 0` | `0.92 0 0` | Text, semantic reverse |
| Card | `0.96 0 0` | `0.15 0.01 260` | Elevated content containers |
| Primary | `0.42 0.08 258` | `0.68 0.12 258` | Buttons, interactive elements (deep blue) |
| Accent | `0.68 0.15 260` | `0.72 0.15 193` | CTAs, highlights, active states (cyan) — used sparingly |
| Destructive | `0.55 0.22 25` | `0.65 0.19 22` | Warnings, errors (red) |
| Border | `0.92 0 0` | `0.22 0.02 260` | Thin lines, semantic separation |
| Muted | `0.88 0.03 256` | `0.28 0.03 256` | Disabled, secondary text, placeholders |

## Typography

| Tier | Font | Size | Weight | Use |
|------|------|------|--------|-----|
| Display | Geist Mono | 28–32px | 600–700 | Section headers, key metrics |
| Body | DM Sans | 14–16px | 400 | Content, descriptions |
| Mono | Geist Mono | 11–13px | 400–500 | Specs, schematics, code blocks |

## Structural Zones

| Zone | Background | Border | Elevation | Notes |
|------|------------|--------|-----------|-------|
| Sidebar | Card | Thin right border | None | Left nav: product/vertical categories, persistent |
| Header | Background | Thin bottom border | None | Top bar: logo, search, user menu (optional) |
| Main Content | Background | None | None | Cards within, alternating muted 30% for rhythm |
| Cards | Card | Thin border (border token) | subtle shadow | Information containers: specs, use cases, solutions |
| Footer | Muted 40% bg | Thin top border | None | Secondary links, metadata |

## Spacing & Rhythm
- Padding within cards: 16px–24px
- Gap between cards: 16px–20px
- Sidebar width: 240px
- Typography line-height: 1.5 for body, 1.2 for display
- Radius: 4px for inputs, 0px for borders (sharp edges reinforce technical aesthetic)

## Component Patterns
- Buttons: Primary (accent bg, dark fg) | Secondary (muted bg, light fg) | Ghost (no bg, accent text)
- Inputs: border, muted bg, 4px radius, monospace label
- Cards: Card bg, border, shadow-subtle, alternating rhythm
- Tables: Monospace specs, striped rows (muted/background alternation), thin borders
- Navigation: Sidebar items with accent underline on active state, no hover color change (just weight/opacity)

## Motion
- Transition default: `all 0.2s cubic-bezier(0.4, 0, 0.2, 1)` — smooth, professional, not playful
- No entrance animations, no hover scale effects
- Focus states via ring token, underline for nav active

## Constraints & Anti-Patterns
- ❌ No gradients, no decorative motion, no rounded full-width buttons
- ❌ No shadows beyond subtle/elevated, no glow effects
- ❌ No color-only differentiation (always pair with weight or space)
- ❌ No skeuomorphism, no AI-generic purples or cyan overuse

## Signature Detail
Information-dense grid layout with thin vertical separators between columns. Monospace headers for technical sections (specs, schematics). Dark background with high contrast foreground creates reading endurance. Cyan accent used only for primary CTAs and active navigation states — restraint builds impact.
