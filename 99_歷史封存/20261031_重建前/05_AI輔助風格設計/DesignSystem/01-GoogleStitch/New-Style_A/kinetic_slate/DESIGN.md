---
name: Kinetic Slate
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#5bb8fe'
  on-secondary-container: '#00476e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
  display-lg-mobile:
    fontFamily: Geist
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-telemetry:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  gutter-desktop: 1.25rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system delivers a high-efficiency breakfast ordering and preparation workflow for tech commuters, engineers, and modern cloud kitchens. The visual tone is structured, rational, and clean—treating morning fuel with the precision of an observability console rather than a chaotic street stall.

### Style Archetype
- **Movement:** Technical Minimalism meets Tactile Precision.
- **Atmosphere:** Cool steel surfaces, razor-sharp information boundaries, high legibility, zero visual clutter, and strict micro-geometries.
- **Core Philosophy:** Morning routines require speed, clarity, and certainty. The interface reduces cognitive overhead through monospaced numerical clarity, micro-status telemetry, and disciplined information hierarchy.

## Colors

The palette is rooted in industrial slate and oceanic cyan. High contrast and cool-toned neutrality strip away the traditional warm, oily aesthetic of breakfast venues in favor of a modern, clinical, and reassuringly precise environment.

- **Primary (`#0f172a`):** Deep Slate Black. Anchors dominant interactive targets, high-emphasis text, and core structural navigation.
- **Secondary (`#0284c7`):** Electric Cyan Blue. Reserved for real-time states, pick-up countdowns, live machine queues, and focused operational tags.
- **Tertiary (`#334155`):** Cool Steel. Used for sub-headers, structural borders, and secondary controls.
- **Neutral Surface Tone (`#64748b`):** Balanced Slate Grey for metadata, labels, inactive tabs, and technical descriptions.
- **Backgrounds & Canvas:** Built on `#f8fafc` (Base Canvas), `#f1f5f9` (Card/Panel Surface), and `#e2e8f0` (Precision Divider Line). No purple, magenta, or warm orange undertones are permitted.

## Typography

The typographical pairing leverages **Geist** for crisp human-language UI elements and **JetBrains Mono** for numerical values, prep timers, pickup locker coordinates, and financial totals.

- **Geist:** Delivers a technical, neutral tone with tight letter tracking and high x-height for instantaneous reading on move or in transit.
- **JetBrains Mono:** Enforces tabular alignment. Order identifiers (`#ORD-8924`), pick-up estimated arrival times (`08:42:15`), nutritional breakdown grams (`P: 28g / C: 32g`), and pricing tables must always render in this monospace font to preserve horizontal rhythm and tabular structure.

## Layout & Spacing

A compact, dense grid system is utilized to maximize situational awareness on a single screen without endless vertical scrolling.

### Breakpoints & Canvas
- **Mobile (< 768px):** 4-column dynamic grid, `margin: 1rem`, `gutter: 0.75rem`. Maximizes horizontal touch surface area with high-density card stacking.
- **Tablet (768px - 1024px):** 8-column layout, `margin: 1.5rem`, `gutter: 1rem`. Suited for in-kitchen KDS (Kitchen Display System) tablets and counter pick-up screens.
- **Desktop / Terminal (> 1024px):** 12-column fixed-max layout (1280px container), `margin-desktop: 2rem`, `gutter-desktop: 1.25rem`.

### Rhythm Rules
- Components favor horizontal split arrangements (e.g., dish title on left, macro stats and precise order button on right).
- Padding is tight (`0.5rem` to `0.75rem`) to maintain compact visual density.

## Elevation & Depth

Visual separation relies on structural outlines and subtle tonal layering rather than dramatic dropshadows or blurry gradients.

- **Low-Contrast Micro-Borders:** All cards, dialogs, and segmented toolbars feature a crisp `1px solid #e2e8f0` stroke. On dark or active elements, the border shifts to `#334155` or `#0284c7`.
- **Tonal Stacking:** Surfaces step from Base Canvas (`#f8fafc`) to Surface Container (`#ffffff`) to Surface Raised (`#f1f5f9`).
- **Ambient Focus Dropshadow:** If an active floating state or modal sheet requires separation, use a non-dispersive, clinical shadow: `box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.08)`. Never use colorful or diffused glows.

## Shapes

The geometry adheres strictly to micro-radii ranging between `4px` and `8px` (`roundedness: 1`). Pill buttons, large rounded cards (> 8px), and bubble-shaped containers are strictly forbidden.

- **Base Controls (Buttons, Inputs, Badges):** `4px` corner radius.
- **Surface Panels & Cards:** `6px` to `8px` corner radius.
- **Dividers & Insets:** Zero radius (`0px`) with sharp technical line edges to evoke instrument clusters and blueprint drafts.

## Components

### Buttons & Interactive Triggers
- **Primary Action:** Solid `#0f172a` fill, white `#ffffff` text, `4px` radius, `height: 38px`, `font-size: 14px`, `font-weight: 500`. Hover state lightens to `#1e293b`.
- **Accent / Telemetry Action:** `#0284c7` solid fill, white text, for immediate pickup confirmations or real-time queuing triggers.
- **Secondary / Ghost:** Transparent background with `1px solid #e2e8f0` border, `#0f172a` text. Active press shifts surface to `#f1f5f9`.

### Chips & Filters
- Compact height (`28px`), `4px` radius, background `#f1f5f9`, border `1px solid #e2e8f0`.
- Text styled in `12px` Geist.
- Selected state turns the background to `#0f172a` with white text and no drop shadow.

### Input Fields & Controls
- Base height `38px`, `4px` radius, background `#ffffff`, border `1px solid #cbd5e1`.
- Focused state applies a sharp `1px solid #0284c7` border with a subtle outline ring (`2px rgba(2, 132, 199, 0.15)`).
- Prefix icons, unit symbols (e.g., `QTY`, `T-MIN`), and numerical counters render in JetBrains Mono.

### Checkboxes & Segmented Radio Toggles
- Checkboxes: Square `16px x 16px` with a `2px` micro-radius, `1px solid #94a3b8`. Checked state turns `#0f172a` with a clean white tick mark.
- Radio / Segmented Controls: Multi-tab slot container with `#f1f5f9` background, `4px` radius, and `1px solid #e2e8f0` perimeter. The active segment is an inset `#ffffff` tab with a fine perimeter border.

### Menu Cards & Kitchen Item Containers
- Surface is `#ffffff` with a uniform `1px solid #e2e8f0` border and `6px` radius.
- Layout: 2-column inline format. Left holds an aspect-ratio-locked food profile image with crisp squared bounds (`4px` radius); right displays the item name, nutritional stats in `label-telemetry` monospace, preparation time countdown badge, and a fast "+ ADD" action.

### Telemetry Badge (Specialty Component)
- Displays current cloud kitchen preparation velocity (e.g., `READY IN 04:20`, `LOCKER #08`).
- Uses `#0284c7` text on an `#e0f2fe` background, `JetBrains Mono`, uppercase, tracked out (`letter-spacing: 0.05em`), bounded by a `1px solid #bae6fd` stroke.