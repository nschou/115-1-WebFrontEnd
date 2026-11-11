---
name: Warm Trust Breakfast
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede9'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#53433d'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#86736c'
  outline-variant: '#d9c2ba'
  surface-tint: '#8f4c31'
  primary: '#6f331a'
  on-primary: '#ffffff'
  primary-container: '#8c4a2f'
  on-primary-container: '#ffc9b5'
  inverse-primary: '#ffb599'
  secondary: '#9b4500'
  on-secondary: '#ffffff'
  secondary-container: '#fd8a42'
  on-secondary-container: '#682c00'
  tertiary: '#005011'
  on-tertiary: '#ffffff'
  tertiary-container: '#186a21'
  on-tertiary-container: '#95e88f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#72361c'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb68e'
  on-secondary-fixed: '#331200'
  on-secondary-fixed-variant: '#763300'
  tertiary-fixed: '#a3f69c'
  tertiary-fixed-dim: '#88d982'
  on-tertiary-fixed: '#002204'
  on-tertiary-fixed-variant: '#005312'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-md: 1.5rem
  gutter-lg: 2rem
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a restorative, calm, and grounded breakfast ordering experience. It rejects high-stress urgency counters, neon accent tags, and cold digital aesthetics in favor of a tactile, editorial warmth centered around natural morning rituals.

### Brand Personality & Emotional Impact
- **Warm & Reassuring:** Evoking freshly baked sourdough, ceramic dishware, and morning sunlight without drifting into kitsch.
- **Calm & Unhurried:** Eliminating micro-stress in morning routines through spacious layouts, balanced typographic hierarchy, and measured feedback.
- **Crafted Reliability:** Fostering trust through structured order status milestones, legibility, and physical clarity.

### Aesthetic Movement
A curated blend of **Warm Organic Minimalism** and **Tactile Domesticity**:
- **Backgrounds:** Off-white, soft oat-cream substrates replace sterile hospital whites and harsh dark modes.
- **Surfaces:** Pure crisp white surface cards grounded by delicate warm-sand outlines.
- **Restraint:** Strictly no generic SaaS indigo/purple hues, no cyber-neon gradients, and zero non-functional decorative emojis. Visual iconography is consistently stroked with warm charcoal line-work.

## Colors

The palette balances warm organic earth tones with crisp operational indicators, strictly calibrated to meet WCAG AA contrast standards against light substrates.

### Key Roles
- **Primary (`#8C4A2F` - Terracotta Clay):** Used for primary conversion actions, active state tabs, and brand focal anchors.
  - *Primary Container Light (`#F7EFE9`):* Soft terracotta wash for badge backgrounds and active item fills.
  - *Primary Container Dark (`#4A2818`):* Deep baked earthen brown for prominent hero banners and dark contrast tags.
- **Secondary (`#B45309` - Amber Warm Gold):** Reserved for "In Preparation" status tags and warm cautionary alerts.
- **Tertiary (`#2E7D32` - Olive Forest Green):** Reserved exclusively for "Ready for Locker Pickup" completion states, successful payments, and freshness affirmations.
- **Neutral / Canvas (`#FAF7F2` - Oat Warm White):** The overarching base background tone across mobile and desktop viewports.
  - *Card Surface (`#FFFFFF`):* Elevated component planes creating gentle contrast against the oat canvas.
  - *Border Subtle (`#EADBCC`):* Soft sand outline grounding cards, dividers, and inputs without heavy black division.
- **Typography:**
  - *Text Primary (`#2B231D` - Warm Charcoal):* Highest contrast reading tone with a subtle warm undertone.
  - *Text Secondary (`#6E5F55` - Earth Muted):* Subtitles, preparation metadata, and secondary options.

## Typography

Typography pairs **Plus Jakarta Sans** for Latin and numeric displays with system-fallback **Noto Sans TC** for Traditional Chinese glyphs. The type hierarchy honors humanistic rhythm and high legibility during hasty morning interactions.

- **Baseline Reading Standard:** Core content (`body-md`) strictly sits at 16px with an open 26px line height. Subtext never falls below 12px.
- **Numbers & Prices:** Numeric displays leverage tabular figures in Plus Jakarta Sans to prevent layout jitter when updating dynamic cart prices or countdown timers.
- **Micro-Copy:** Nutritional disclaimers, pickup locker numbers, and allergen warnings use crisp medium and semibold weights (`label-md` and `label-sm`) with subtle positive tracking for immediate legibility at a glance.

## Layout & Spacing

The layout employs a responsive fluid grid that prioritizes thumb-driven ordering on mobile devices and an unhurried, multi-column editorial catalog on desktop screens.

### Grid & Breakpoints
- **Mobile (320px – 767px):** 4-column fluid grid. Outer margin is `1rem` (16px), column gutter is `1rem` (16px). All single-tap critical paths (such as menu lists and checkout footers) anchor within natural thumb reach.
- **Tablet (768px – 1023px):** 8-column grid. Outer margin expands to `2rem` (32px), gutter `1.5rem` (24px).
- **Desktop (1024px+):** 12-column grid capped at a maximum container width of `1200px`. Outer margin expands to `3rem` (48px) with `2rem` (32px) gutters, positioning the visual menu in an expansive 8-column feed paired with a persistent 4-column order summary pane.

### Layout Rhythms
- Spacing relies on generous internal component padding (`space-lg` for cards, `space-md` for row items) to prevent visual clutter, establishing a breezy, serene pacing during rushed morning hours.

## Elevation & Depth

Visual depth is achieved through layered warm surfaces and delicate tinted ambient shadows, avoiding sterile synthetic blur filters and harsh drop shadows.

### Surface Stacking
1. **Canvas Layer (`#FAF7F2`):** Base canvas framing the full viewport.
2. **Elevated Card Layer (`#FFFFFF`):** Sits upon the oat canvas, defined by a 1px solid `#EADBCC` border.
3. **Floating Overlay / Modal:** Sits above active screens with a dual-stage warm shadow:
   `0 12px 32px -4px rgba(74, 40, 24, 0.08), 0 4px 12px -2px rgba(74, 40, 24, 0.04)`.

### Ambient Shadow Characteristics
Shadows are tinted with Terracotta and Warm Charcoal base tones (`rgba(74, 40, 24, ...)`) rather than neutral pitch blacks. This preserves the soft, ceramic warmth of paper menus and morning tabletop settings.

## Shapes

The design uses a generous curved language (`roundedness: 2`) with base radii ranging between 12px and 16px to communicate friendliness, safety, and modern organic polish.

### Shape Tokens
- **Standard Cards & Modals (`rounded-lg` / 16px):** Used on menu item cards, order progress modules, and floating summary drawers.
- **Interactive Elements & Fields (`rounded` / 12px):** Inputs, pickers, and large action buttons.
- **Pills / Status Chips (`rounded-full` / 9999px):** Applied to locker pin badges, preparation tags, and single-choice filter chips.
- **Images:** Food photography matches card bounds using 12px–16px corner clipping with an internal 1px inner border (`rgba(43, 35, 29, 0.04)`) to anchor images naturally against light backgrounds.

## Components

### Buttons
- **Touch Targets:** All primary and secondary buttons maintain a minimum interactive hit area of 48px (strictly exceeding the 44px minimum).
- **Primary Action Button:** Background `#8C4A2F`, Text `#FFFFFF`, Border radius 12px. Hover state deepens to `#763E27`. Focused state displays an outer 3px ring of `#F7EFE9` with an inner `#8C4A2F` stroke.
- **Secondary Outlined Button:** Transparent background, 1.5px border `#8C4A2F`, Text `#8C4A2F`. Hover state uses `#F7EFE9`.

### Chips & Filter Pills
- **Filter Chip (Inactive):** Background `#FFFFFF`, Border 1px `#EADBCC`, Text `#6E5F55`, Border radius 9999px, height 36px.
- **Filter Chip (Selected):** Background `#F7EFE9`, Border 1.5px `#8C4A2F`, Text `#8C4A2F`, Font weight 600.
- **Semantic Status Badges:**
  - *In Preparation (製作中):* Background `#FEF3C7`, Text `#B45309`, Border 1px `#FDE68A`.
  - *Ready in Locker (已入櫃可領取):* Background `#E8F5E9`, Text `#2E7D32`, Border 1px `#C8E6C9`. Accompany with high-contrast locker number badge (`#2E7D32` background with white text).

### Cards
- **Product Card:** Base background `#FFFFFF`, border 1px solid `#EADBCC`, border radius 16px, padding `1rem`. Active state exhibits a soft transition to an ambient shadow (`0 8px 24px rgba(74, 40, 24, 0.06)`).
- **Cart Summary Card:** Base background `#FFFFFF`, anchored to bottom with upper border 1px solid `#EADBCC`.

### Form Fields & Selection Controls
- **Input Fields:** Height 52px, background `#FFFFFF`, border 1.5px solid `#EADBCC`, radius 12px, text `#2B231D`. Focus state transitions border to `#8C4A2F` with no harsh default blue outlines.
- **Checkboxes & Radios:** Size 24px × 24px with a centered 48px transparent touch hit-box. Checked fill `#8C4A2F` with clean white internal glyphs.

### Breakfast Locker Pickup Module (Domain-Specific)
- A dedicated high-visibility card module designed for rapid morning retrieval:
  - Surface: `#FFFFFF` with a thick 2px top accent bar in `#2E7D32`.
  - Locker Code Display: Sits inside an oat-toned inset container (`#FAF7F2`) rendered in `headline-xl` (40px) tabular bold type for immediate recognition under bright morning glare.