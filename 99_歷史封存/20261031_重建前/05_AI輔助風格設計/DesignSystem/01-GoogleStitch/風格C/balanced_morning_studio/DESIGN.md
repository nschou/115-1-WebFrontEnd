---
name: Balanced Morning Studio
colors:
  surface: '#f7faf9'
  surface-dim: '#d7dbda'
  surface-bright: '#f7faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f3'
  surface-container: '#ebeeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e0e3e2'
  on-surface: '#181c1c'
  on-surface-variant: '#41484b'
  inverse-surface: '#2d3131'
  inverse-on-surface: '#eef1f0'
  outline: '#71787b'
  outline-variant: '#c1c8cb'
  surface-tint: '#3a6472'
  primary: '#00252f'
  on-primary: '#ffffff'
  primary-container: '#0b3c49'
  on-primary-container: '#7ca6b6'
  inverse-primary: '#a2cddd'
  secondary: '#a53c00'
  on-secondary: '#ffffff'
  secondary-container: '#ff793c'
  on-secondary-container: '#642100'
  tertiary: '#172426'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c393c'
  on-tertiary-container: '#95a2a5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bee9fa'
  primary-fixed-dim: '#a2cddd'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#204c5a'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb598'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7e2c00'
  tertiary-fixed: '#d7e5e8'
  tertiary-fixed-dim: '#bbc9cc'
  on-tertiary-fixed: '#111e20'
  on-tertiary-fixed-variant: '#3c494c'
  background: '#f7faf9'
  on-background: '#181c1c'
  surface-variant: '#e0e3e2'
typography:
  display-order-num:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md-bold:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
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
  margin: 1rem
  margin-md: 2rem
  margin-lg: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system expresses a modern culinary identity: crisp, efficient, and dependable, warmed by the inviting aroma of freshly prepared breakfast. The aesthetic bridges operational precision and morning comfort—avoiding sterile software ergonomics on one end and overly rustic, messy café cues on the other.

### Design Movement: Balanced Modern
- **Tonal Contrast:** Grounded, architectural cool-toned dark teal paired with deliberate bursts of breakfast warm amber.
- **Physical Clarity:** Distinct card surfaces, tactile division lines, and comfortable target areas that reassure rushed morning commuters while ordering and tracking meals.
- **No Novelty Distractions:** Zero purple/blue neon gradients, no casual emoji icons, and no decorative micro-illustrations. Every visual element serves transactional clarity, appetite appeal, or live status awareness.

## Colors

The palette establishes an appetizing, brisk morning atmosphere built on high contrast, strict readability, and intentional functional accents.

### Core Swatches
- **Primary (`#0B3C49`):** Deep oceanic cyan/dark teal. Used for primary branding, structural headers, order numbers, and core interactive action triggers.
- **Accent / Secondary (`#D95D21`):** Warm amber orange. Reserved strictly for specials, chef recommendations, promotional badges, and time-sensitive order tracking calls-to-action.
- **Secondary Container (`#E3F1F4`):** Desaturated morning mist. Used for item configuration containers, category filter backings, and subtle state toggles.
- **Surface & Neutral Background (`#F4F7F6`):** Balanced, refreshing cool-light gray that maintains lower glare than pure white on morning mobile screens.
- **Surface Card (`#FFFFFF`):** High-clarity focal cards for individual food items, payment modules, and order receipts.
- **Border / Hairline (`#DDE5E7`):** Muted slate line providing crisp structural separation without visual weight.
- **Text Primary (`#102127`):** Ultra-dark cyan-charcoal ensuring > 7:1 contrast ratios on white surfaces for critical dish names and prices.
- **Text Secondary (`#4D6268`):** Balanced mid-tone slate teal for ingredients, nutritional details, and subtext.

### Order Status Semantics
- **Order Placed / Kitchen Preparing:** `#0369A1` (Direct Ocean Blue) with `#E0F2FE` background.
- **Ready in Locker / Available for Pickup:** `#15803D` (Crisp Garden Green) with `#DCFCE7` background.
- **Attention / Expiring Locker Hold:** `#D95D21` (Warm Amber Accent) with `#FFEDD5` background.

## Typography

The type system is powered by **Plus Jakarta Sans**, offering geometric clarity softened by warm, approachable curves that suit food commerce without sliding into childish geometric extremes.

### Hierarchy & Rules
- **Base Body Constraint:** Standard copy (`body-md`) strictly uses 16px to guarantee rapid scanning under glare or during morning transit.
- **Numbers & Values:** Prices and locker pickup numbers use semibold and extra-bold weights with tight letter-spacing for instantaneous recognition.
- **Labels & Micro-data:** Uppercase styling is restrained only to status chips and categorical flags (`label-sm`), styled with increased tracking (`letter-spacing: 0.04em`) to safeguard legibility.

## Layout & Spacing

A balanced fluid system designed around mobile-first order streams and tablet pickup dashboards.

### Grid & Breakpoints
- **Compact (Mobile: 360px – 599px):** 4-column layout, `margin: 1rem`, `gutter: 1rem`. Cart controls, quick item add-ons, and tracker cards span full width.
- **Medium (Tablet / Pickup Display: 600px – 1023px):** 8-column layout, `margin-md: 2rem`, `gutter-md: 1.5rem`. Split-screen support for menu browsing on the left and order progress on the right.
- **Expanded (Desktop / Backoffice: 1024px+):** 12-column layout maxed at 1280px container width, `margin-lg: 3rem`. Multi-column menu matrix and live kitchen feeds.

### Spacing Principles
- Minimum interactive tap target height: **44px** (standard buttons measure 48px to 52px).
- Product card padding uses `space-md` (16px) internally, with item clusters separated by `space-sm` (8px).

## Elevation & Depth

Visual hierarchy leverages calm, low-elevation layering combined with subtle, slate-tinted ambient occlusion rather than heavy drop shadows.

### Elevation Levels
- **Level 0 (Base Canvas):** `#F4F7F6` flat floor.
- **Level 1 (Menu & Food Cards):** `#FFFFFF` with a crisp border (`1px solid #DDE5E7`) and an ambient shadow: `0 2px 6px rgba(11, 60, 73, 0.04)`.
- **Level 2 (Interactive Floating Actions & Cart Bar):** `#FFFFFF` with `0 8px 24px rgba(11, 60, 73, 0.08)` and subtle border `1px solid rgba(221, 229, 231, 0.6)`.
- **Level 3 (Modals & Pickup Number Takeovers):** `#FFFFFF` with `0 16px 36px rgba(11, 60, 73, 0.14)`.

### Borders as Depth
Instead of muddy stacked shadows, depth is clarified using structural 1px ghost borders colored in `#DDE5E7`, which isolate distinct meal bundles, modifiers, and cart summaries cleanly.

## Shapes

The interface adopts a controlled, contemporary corner language with 8px–12px rounding, matching the balanced modern ethos: structured enough to signal hygiene and precision, soft enough to feel morning-friendly.

### Application Specs
- **Default Elements (Inputs, Buttons, Filter Chips):** `8px` (`roundedness: 2`).
- **Product Cards & Modal Containers:** `12px` (`rounded-lg`).
- **Accent Badges & Status Pills:** `9999px` (Full pill shape) for swift identification of order status tags and calorie/dietary indicators.

## Components

### Buttons
- **Primary Action (Add to Cart / Confirm Payment):** Background `#0B3C49`, text `#FFFFFF`, min-height `48px`, font weight `600`, radius `8px`. Hover: `#082C36`. Active: `#051D24`.
- **Special / Recommendation Action:** Background `#D95D21`, text `#FFFFFF`, min-height `48px`. Used specifically on daily combo features or "Reorder Breakfast" triggers. Hover: `#BC4D17`.
- **Secondary Action:** Background `#E3F1F4`, text `#0B3C49`, border `none`, hover background `#D3E8EC`.
- **Touch Target:** All button variants preserve an active touch boundary of at least `44px × 44px`.

### Product Cards
- **Base Surface:** Surface `#FFFFFF`, border `1px solid #DDE5E7`, radius `12px`, padding `16px`.
- **Recommendation Card Variant:** Features a subtle top border highlight (`2px solid #D95D21`) and an integrated warm amber pill badge ("今日推薦 / Today's Special").
- **Card Hierarchy:** High-resolution food photography (top or left, radius `8px`), followed by dish title in `#102127` (`headline-sm`), description in `#4D6268` (`body-md`), bottom row pairing price in `#0B3C49` (`headline-md`) with an immediate `+` action button.

### Filter Chips
- **Inactive:** Surface `#FFFFFF`, border `1px solid #DDE5E7`, text `#4D6268`, padding `8px 16px`, height `36px`.
- **Active:** Surface `#0B3C49`, text `#FFFFFF`, border `1px solid #0B3C49`.
- **Special Filter (e.g., 早鳥特餐):** Inactive text `#D95D21`, border `#D95D21`. Active surface `#D95D21`, text `#FFFFFF`.

### Inputs & Quantity Selectors
- **Input Fields:** Height `48px`, background `#FFFFFF`, border `1px solid #DDE5E7`, radius `8px`, text `#102127`, placeholder `#4D6268`. Focus ring: `2px solid #0B3C49` with zero offset.
- **Quantity Stepper:** Stepper box in `#E3F1F4`, buttons with direct `#0B3C49` vector icons (`-` and `+`), text `16px` bold in `#102127`.

### Locker & Live Tracking Display
- **Locker Code Ticket:** Container `#FFFFFF`, thick border `2px solid #0B3C49`, radius `12px`, padding `24px`. Pickup number rendered in `#0B3C49` (`display-order-num`, 48px).
- **Status Stepper:**
  - Step 1 (Kitchen): Dot and label in `#0369A1`.
  - Step 2 (Locker Ready): Dot and label in `#15803D` with pulsing micro-ring.
  - Box Assignment: Locker slot highlighted in `#D95D21` bold text on `#FFEDD5` container.
- **Iconography Rule:** Pure SVG geometric icons only (line weight 2px, stroke-rounded). Absolute prohibition of standard consumer emoji symbols.