---
name: Precision Slate
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#99efe5'
  on-secondary-container: '#006f67'
  tertiary: '#004870'
  on-tertiary: '#ffffff'
  tertiary-container: '#006194'
  on-tertiary-container: '#b2d9ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#9cf2e8'
  secondary-fixed-dim: '#80d5cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#93ccff'
  on-tertiary-fixed: '#001d31'
  on-tertiary-fixed-variant: '#004b73'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 3rem
    fontWeight: '600'
    lineHeight: 3.75rem
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.625rem
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: 3rem
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: 2.375rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2.125rem
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: '0'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.9125rem
    letterSpacing: '0'
  body-md:
    fontFamily: Noto Sans
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.65rem
    letterSpacing: '0'
  body-sm:
    fontFamily: Noto Sans
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.4875rem
    letterSpacing: '0'
  label-md:
    fontFamily: Noto Sans
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: 1.3125rem
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Noto Sans
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: 1.125rem
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Personality & Emotional Response
The design system projects an aura of surgical clarity, stability, and quiet authority. Its character is defined by three pillars:
- **Sharp & Modern (俐落、現代):** Purposeful geometric structure, crisp divisions, and deliberate typography eliminate ambiguity.
- **Trustworthy & Secure (可信賴、安心):** An understated, disciplined foundation delivers structural reassurance for high-stakes operational workflows.
- **Efficient & Weightless (高效、無負擔):** Generous negative space, restrained color usage, and high-legibility surfaces ensure users never feel visual fatigue or friction.

### Visual Style
A hybrid of **Precision Modernism** and **Tactile Tonal Architecture**. Rather than heavy skeuomorphism or blurry neon gradients, it leverages balanced neutral surfaces, micro-borders with deliberate contrast ratios, and purposeful semantic accents. The visual canvas remains quiet so critical telemetry, security indicators, and content stay dominant.

## Colors

### Hierarchy & Semantics
- **Neutral Core (Slate Navy):**
  - Text Primary: `#0F172A` (Slate 900) — delivers > 13:1 contrast against pure white backgrounds for Chinese and Western text.
  - Text Secondary: `#475569` (Slate 600) — strictly compliant at > 5.5:1 contrast against white surfaces.
  - Text Tertiary / Muted: `#64748B` (Slate 500) — minimum 4.6:1 contrast against white backgrounds.
  - Surface Primary: `#FFFFFF`.
  - Surface Subdued (Canvas / App Base): `#F8FAFC` (Slate 50).
  - Surface Card / Raised: `#FFFFFF`.
  - Border Subdued: `#E2E8F0` (Slate 200).
  - Border Prominent / Structural: `#CBD5E1` (Slate 300).
- **Primary (Cobalt Precision):** `#1D4ED8` (Blue 700). Used for confirmed interactive primaries, essential brand anchors, and keyboard focus outlines.
- **Secondary (Cyber Emerald / Verification):** `#0F766E` (Teal 700). Dedicated to safe states, verified nodes, high-trust indicators, and security seals.
- **Tertiary (Analytical Sky):** `#0284C7` (Sky 600). Applied to telemetry highlights, non-critical metrics, and secondary tags.

### State & Contrast Governance
- **Focus Ring:** `#1D4ED8` rendered via `outline: 2px solid #1D4ED8; outline-offset: 2px;` strictly visible on `:focus-visible`.
- **Negative / Hazard:** `#DC2626` (Red 600) against white; `#FEF2F2` (Red 50) fill with `#991B1B` (Red 800) text for warnings.
- All body-level text elements strictly adhere to WCAG AA 4.5:1 minimums; large typography (>= 24px) retains minimum 3:1 contrast across all tiers.

## Typography

### Chinese & Latin Script Pairing
The typography is built around high-density technical reading without visual friction:
- **Headlines (`Space Grotesk`):** Modern geometric numerals and sharp Latin characters provide technical sophistication, falling back smoothly to system sans for CJK title glyphs.
- **Body & Labels (`Noto Sans`):** Selected for balanced stroke distribution, universal CJK glyph completeness, and exceptional render crispness at standard DPI.

### Readability Guardrails
- **Minimum Base Size:** Never set functional Chinese content below 12px (`0.75rem`).
- **Standard Body Sizing:** Body defaults strictly to 16px (`1rem`), with paragraph line-height pinned between 1.6x and 1.7x (represented here at `1.65rem`).
- **Kerning & Punctuation:** No artificial letter-spacing on CJK body content to prevent rhythm breaks. Label sizes utilize subtle micro-tracking (`0.01em` - `0.02em`) exclusively for Latin metadata and metric keys.

## Layout & Spacing

### Layout Structure & Grid
- **Desktop (>= 1024px):** 12-column fluid grid system bounded by a max container width of `1280px` or `1440px` for high-density dashboards. Grid gutters set to `1.5rem` (`gutter`), outer section padding set to `2rem` (`margin`).
- **Tablet (768px - 1023px):** 8-column layout. Gutters scale to `1.25rem`, outer section margin set to `1.5rem`.
- **Mobile (< 768px):** 4-column layout. Gutter shrinks to `1rem` (`gutter-mobile`), and lateral canvas inset compresses to `1rem` (`margin-mobile`).

### Spacing Principles
- **No Clutter Rhythm:** Vertical rhythm operates on a base 4px/8px modular cadence.
- **Density Management:** Component interiors leverage `space-md` (16px) for breathable structural padding, while grouped elements inside list items or toolbars stick to `space-sm` (8px) to preserve scanning agility.

## Elevation & Depth

### Philosophy: Structural Clarity over Visual Weight
Heavy drop shadows and excessive blur treatments add artificial weight and cause visual fatigue. The design system uses an architectural stacking model composed of calibrated surface fills and hairline borders:

1. **Level 0 (Base Canvas):** Background `#F8FAFC`. Zero elevation, non-interactive foundation.
2. **Level 1 (Cards, Content Containers, Tables):** Solid `#FFFFFF` fill with a fine structural border `1px solid #E2E8F0`. Shadow: `0px 1px 2px rgba(15, 23, 42, 0.04)`.
3. **Level 2 (Interactive Flyouts, Dropdowns, Hovered Modules):** Solid `#FFFFFF` fill with `1px solid #CBD5E1`. Shadow: `0px 4px 12px -2px rgba(15, 23, 42, 0.06), 0px 2px 4px -1px rgba(15, 23, 42, 0.03)`.
4. **Level 3 (Modals, Confirmation Overlays):** Solid `#FFFFFF` fill with `1px solid #CBD5E1`. Shadow: `0px 16px 32px -8px rgba(15, 23, 42, 0.12)`. Paired with a backdrop dimming tint of `#0F172A` at 35% opacity.

### Motion Guidance
- Transitions must respect `prefers-reduced-motion: reduce`. When active, all transitions collapse to instant display (`0ms`).
- Default animations remain snappy: 150ms to 200ms with a cubic-bezier easing curve `cubic-bezier(0.16, 1, 0.3, 1)` for subtle tactile feedback.

## Shapes

### Shape Language
A controlled, calibrated corner radius (`roundedness: 1` — Soft) reinforces technical precision. Overly round or pill-shaped containers dilute perceived authority and consume unnecessary horizontal layout budget in Asian languages.

- **Standard Inputs, Badges, Buttons:** `0.25rem` (4px).
- **Cards, Group Containers, Panels:** `0.5rem` (8px / `rounded-lg`).
- **Modals, Floating Toolbars:** `0.75rem` (12px / `rounded-xl`).
- **Data Nodes & Circular Status Avatars:** Full circle `50%` reserved strictly for icons, profile glyphs, or verification indicators.

## Components

### 1. Buttons
- **Primary:** Background `#1D4ED8`, text `#FFFFFF`, border `1px solid transparent`, corner radius `0.25rem`. Hover: `#1E40AF`. Active: `#1E3A8A`.
- **Secondary / Subdued:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #CBD5E1`. Hover: `#F8FAFC` and border `#94A3B8`.
- **Destructive:** Background `#DC2626`, text `#FFFFFF`. Hover: `#B91C1C`.
- **Focus State:** `outline: 2px solid #1D4ED8; outline-offset: 2px;` visible on keyboard navigation (`:focus-visible`).
- **Height & Padding:** Minimum tap target `40px` height on desktop, `44px` on mobile screens. Padding horizontal: `1rem`, vertical: `0.5rem`.

### 2. Input Fields & Textareas
- **Default:** Background `#FFFFFF`, border `1px solid #CBD5E1`, border-radius `0.25rem`, padding `0.5rem 0.75rem`, text `#0F172A`, placeholder `#64748B`.
- **Focus:** Border color transitions to `#1D4ED8`, paired with standard focus outline ring offset.
- **Error State:** Border `#DC2626`, helper text `#B91C1C`, accompanied by an explicit warning icon for accessibility (not relying solely on color).

### 3. Checkboxes & Radio Buttons
- **Box Size:** Precise `18px × 18px` boundary.
- **Unchecked:** Background `#FFFFFF`, border `1.5px solid #64748B`.
- **Checked:** Background `#1D4ED8`, border `1.5px solid #1D4ED8`, white centered icon/dot.
- **Target Cushion:** Hit area expanded to minimum `32px × 32px` via transparent pseudo-elements.

### 4. Chips & Security Badges
- **Status Neutral:** Fill `#F1F5F9`, border `1px solid #E2E8F0`, text `#334155`.
- **Status Secure / Verified (Cyber Emerald):** Fill `#F0FDFA`, border `1px solid #99F6E4`, text `#0F766E`, font weight 500.
- **Status Alert:** Fill `#FEF2F2`, border `1px solid #FECACA`, text `#991B1B`.
- **Shape:** Corner radius `0.25rem`, height `24px`, font size `0.75rem` (`label-sm`).

### 5. Cards & Panels
- **Structure:** Background `#FFFFFF`, border `1px solid #E2E8F0`, radius `0.5rem` (`rounded-lg`).
- **Spacing:** Inner padding of `1.25rem` to `1.5rem` (`space-lg`).
- **Header Divider:** Subtle separator `1px solid #F1F5F9` separating card title from operational body.

### 6. Lists & Data Rows
- **Alternating Logic:** White rows paired with fine bottom borders `1px solid #F1F5F9`.
- **Hover:** Clean row background shift to `#F8FAFC`.
- **Line Alignment:** Vertically centered action icons, text line-height strictly respected to guarantee Chinese character accents are never clipped.

### 7. Telemetry & Security Banners
- Non-intrusive top-tier contextual banners: solid background tint `#F8FAFC`, anchored by a left structural line (`3px solid #0F766E` for secure status, `3px solid #1D4ED8` for system information).