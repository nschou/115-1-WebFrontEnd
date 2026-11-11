---
name: Tech Crisp Morning
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
  on-surface-variant: '#40484b'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#70787c'
  outline-variant: '#c0c8cb'
  surface-tint: '#306576'
  primary: '#003441'
  on-primary: '#ffffff'
  primary-container: '#0f4c5c'
  on-primary-container: '#87bbce'
  inverse-primary: '#9acee1'
  secondary: '#14677b'
  on-secondary: '#ffffff'
  secondary-container: '#a1e7fe'
  on-secondary-container: '#18697d'
  tertiary: '#003724'
  on-tertiary: '#ffffff'
  tertiary-container: '#005036'
  on-tertiary-container: '#53c896'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6ebfe'
  primary-fixed-dim: '#9acee1'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#114d5d'
  secondary-fixed: '#b2ebff'
  secondary-fixed-dim: '#8bd1e7'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5e'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system delivers a calm, high-efficiency breakfast ordering and pickup experience tailored to urban professionals and commuters. The emotional target is rapid precision without the morning anxiety typical of physical counter queues: every touchpoint must project punctuality, hygienic control, and frictionless speed.

The design movement combines **Engineering Functionalism** with **Modern Crisp Minimalism**:
- **Structured Precision**: Interfaces mimic clear physical control surfaces and calibrated telemetry rather than generic marketing SaaS templates.
- **Cool & Grounded Atmosphere**: Built upon slate-cyan foundations, replacing conventional breakfast "warm tones" (which often trigger sensory clutter during morning rush hours) with an emotionally settling, hyper-organized cold palette.
- **Strict Anti-Patterns**: No decorative purple-blue gradient fields, no whimsical illustrations, no emoji icons under any circumstances, and no pillowy, oversized radii. Every element conveys architectural certainty.

## Colors

The palette establishes an immediate mental shift from early-morning chaotic hunger to reliable certainty:

- **Primary (`#0F4C5C`)**: A deep slate-cyan representing stability, food safety, and mechanical punctuality. Used for primary CTAs, active header indicators, and selected states.
  - Hover / Interactive State: `#1B6B7F`
  - Container / Tint Base: `#E6F4F7` (accessible contrast against Primary text)
- **Neutral & Surface Framework**:
  - App Canvas / Base: `#F8FAFC` (Slate 50)
  - Card & Module Surfaces: `#FFFFFF` (Pure high-contrast white)
  - Structural Hairlines & Borders: `#E2E8F0` (Slate 200)
  - Subtle Dividing Lines: `#F1F5F9` (Slate 100)
- **Typography & Content Contrast**:
  - Text Primary: `#0F172A` (Slate 900) — strictly meets WCAG AAA against `#FFFFFF` (19.4:1).
  - Text Secondary: `#475569` (Slate 600) — strictly exceeds WCAG AA (5.4:1 against `#FFFFFF`).
  - Text Tertiary / Disabled: `#94A3B8` (Slate 400).
- **Domain Status Semantics**:
  - Order In-Kitchen / Queue (`#0284C7`): Clean engineering blue indicating progression.
  - Ready for Pickup / Locker Unlocked (`#059669`): Forest emerald with high legibility on light tints (`#ECFDF5`).
  - Rush Alert / Time Delay Warning (`#D97706`): Industrial amber for time-critical actions.
  - Cancellation / Out of Stock (`#DC2626`): Crisp signal red.

## Typography

The typographic hierarchy juxtaposes the technical geometry of **Space Grotesk** with the neutral legibility of **Noto Sans**:

- **Space Grotesk** is applied across all numerical readouts, locker compartment numbers, countdown timers, price tags, and category section headers. Its subtle geometric quirks supply technical competence without coldness.
- **Noto Sans** handles all long-form food descriptions, dietary warnings, ingredient specifications, and transactional notifications to maintain rapid parsing speeds.
- Body text adheres strictly to a 16px base (`body-md`) for primary product details to guarantee effortless mobile readability outdoors or while walking.
- Pickup codes, queue numbers, and locker tokens strictly utilize `label-code` with uppercase styling and tabular lining figures to ensure zero misinterpretation at the physical locker wall.

## Layout & Spacing

The layout philosophy implements a **Calibrated Compact Grid**:

- **Grid Architecture**:
  - **Mobile (< 768px)**: 4-column fluid layout, `0.75rem` (12px) gutters, and `1rem` (16px) side margins. The viewport maximizes item density so busy customers view menu options and order progress without continuous vertical scrolling.
  - **Tablet (768px - 1024px)**: 8-column layout, `1rem` (16px) gutters, and `1.5rem` (24px) margins.
  - **Desktop / In-store Kiosk (> 1024px)**: 12-column structured grid centered at a maximum container width of `1200px`, utilizing `1rem` gutters and `2rem` outer canvas padding.
- **Rhythm & Tight Density**:
  - Spacing uses a compact 4px scale.
  - Cards, order tickets, and modifier groups leverage tight vertical stacks (`space-sm` / 8px) with internal padding of `space-md` (12px) to prevent the diluted appearance of typical lifestyle food apps.
  - Grouping boundaries are demarcated by fine-line structural borders rather than large spacing voids.

## Elevation & Depth

This system intentionally departs from heavy drop shadows and floating atmospheric blurs, relying on **Structural Tonal Layering and Precision Outlines**:

- **Base Elevation (Level 0)**: Canvas background `#F8FAFC`.
- **Card & Data Elevation (Level 1)**: Flat `#FFFFFF` surface enclosed by a 1px solid `#E2E8F0` border. Zero blur shadow at rest; visual separation is strictly conveyed via surface contrast.
- **Interactive Hover & Focal Elevation (Level 2)**: Used exclusively for active order cards or hovered menu items. An ultra-subtle, crisp offset shadow: `box-shadow: 0 2px 4px -1px rgba(15, 23, 42, 0.06), 0 0 0 1px #CBD5E1`.
- **Sticky Status Bar & Modal Pickup Code (Level 3)**:
  - Background: `#FFFFFF`
  - Border: 1px solid `#0F4C5C` (or status semantic color)
  - Shadow: `0 8px 16px -4px rgba(15, 76, 92, 0.12)`
- No glassmorphic transparency is permitted over functional content; legibility remains razor-sharp regardless of scrolling state.

## Shapes

The shape system is strictly bound to an architectural radius scale (4px to 8px):

- Standard UI components (buttons, input fields, menu cards, locker status tags) employ **`roundedness: 1`** (`4px` radius).
- Surface containers and bottom sheets employ `rounded-lg` (`8px` radius).
- Radii larger than 8px are banned, completely preventing the soft, bulbous consumer aesthetic in favor of a crisp instrument-like UI.
- Selection indicators, checkbox elements, and segment controls preserve sharp internal micro-corners (`2px` to `4px`).

## Components

### Buttons
- **Primary Action**: Solid `#0F4C5C` fill, `#FFFFFF` text, `border-radius: 4px`. Minimum target size is strictly `44px` in height. Active state transitions to `#1B6B7F`.
- **Secondary Action**: Background `#FFFFFF`, 1.5px solid `#0F4C5C` border, `#0F4C5C` text.
- **Destructive / Cancellation**: Background `#FFFFFF`, 1px solid `#DC2626`, `#DC2626` text.
- **Accessibility & Focus**: Interactive elements include a high-visibility 2px focus ring with 2px offset: `outline: 2px solid #0F4C5C; outline-offset: 2px`.

### Chips & Filter Tags
- Compact height (`32px`), Space Grotesk `label-md`.
- Unselected: Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#475569`.
- Selected: Background `#E6F4F7`, border `1px solid #0F4C5C`, text `#0F4C5C` with bold weight.
- No emoji iconography. All categories rely exclusively on strict monochrome SVG icons (16x16px stroke-based glyphs).

### Cards (Menu & Order Status)
- Background `#FFFFFF`, 1px solid `#E2E8F0`, 4px radius, internal padding `12px`.
- High-contrast structure: Thumbnail images feature a clean 1:1 ratio with no border-radius bleed.
- Nutrition/dietary indicators rely on crisp, uppercase pill-tags with hairline borders.

### Input Fields & Modifiers
- Text input fields feature a 1px `#CBD5E1` border, 4px radius, and 44px min height.
- On `:focus`, border transitions to `#0F4C5C` with zero delay.
- Checkboxes & Radios: Strict square-derived geometry (`4px` radius for checkboxes, circle for radios), `#0F4C5C` active state with accessible checkmark/dot indicators.

### Cloud Locker Pickup Indicator (Domain-Specific)
- A high-visibility locker assignment banner:
  - Locker Identifier: Rendered in `label-code` (e.g., `BOX-04`).
  - Active Pickup State: `#ECFDF5` background, `1.5px solid #059669` border, `#059669` text.
  - Dynamic QR/Barcode zone: High-contrast white inset container with sharp 2px border, formatted for zero scanner reflection.