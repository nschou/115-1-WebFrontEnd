---
name: Balanced Modern Morning
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#404847'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#707977'
  outline-variant: '#bfc8c6'
  surface-tint: '#316763'
  primary: '#003633'
  on-primary: '#ffffff'
  primary-container: '#134e4a'
  on-primary-container: '#87beb8'
  inverse-primary: '#9ad1cb'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#003824'
  on-tertiary: '#ffffff'
  tertiary-container: '#005136'
  on-tertiary-container: '#35cc92'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b5ede7'
  primary-fixed-dim: '#9ad1cb'
  on-primary-fixed: '#00201e'
  on-primary-fixed-variant: '#144f4b'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Noto Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Noto Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Noto Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-sm:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Noto Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Noto Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Noto Sans
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Noto Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Noto Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-mobile: 0.5rem
  margin: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system expresses a crisp, punctual, and appetizing digital breakfast experience tailored for morning commuters and office workers. The emotional resonance balances two critical states: the calm, efficient predictability of professional routine, and the warm, sensory anticipation of fresh food. 

The aesthetic is **Balanced Modern** with tactile, low-contrast physical metaphors:
- **Tone:** Professional, precise, grounded, and reassuringly warm.
- **Visual Tenets:** Generous breathing room, structural hierarchy without visual clutter, crisp micro-borders, and high-readability typography optimized for glanceability while moving through transit hubs.
- **Anti-patterns:** Avoid heavy neo-brutalism, gratuitous gradient backgrounds, abstract 3D blobs, playful emoji icons in core workflows, and ethereal SaaS glassmorphism that alienates food craft.

## Colors

The color strategy uses functional color assignment to maintain a clean culinary cadence:
- **Primary (`#134E4A` - Deep Slate Teal):** Serves as the bedrock of navigation bars, primary button states, order status tracking headers, and strong typography. Evokes modern efficiency and precision.
- **Secondary (`#F97316` - Warm Amber Orange):** Applied purposefully to activate appetite and guide immediate action: conversion CTAs ("立即結帳", "加購"), badge highlights ("今日特餐", "主廚推薦"), and active heat states.
- **Tertiary (`#10B981` - Emerald Mint):** Exclusively reserved for completion and readiness states, such as "可至 04 號智慧保溫櫃取餐" and verified receipts.
- **Neutral Canvas (`#F8FAFC` to `#FFFFFF`):** High-clarity backgrounds paired with fine-line structural borders (`#E2E8F0`). Text layers employ `#0F172A` for high-contrast primary labels, `#475569` for auxiliary details, and `#94A3B8` for disabled indicators.

## Typography

Typography prioritizes rapid scannability during transit and one-handed operation:
- Font pairings leverage **Noto Sans** (with standard fallbacks to system Chinese fonts `PingFang TC`, `Heiti TC`, `Microsoft JhengHei`) to ensure clear rendering of Traditional Chinese characters.
- Strict optical hierarchy guarantees dish names, nutritional tags, customizable option items, and pickup countdown times remain legible under bright outdoor conditions.
- Price tags utilize `headline-sm` with tabular numerals (`font-variant-numeric: tabular-nums`) to ensure vertical alignment across order summaries and cart breakdowns.

## Layout & Spacing

This layout system is structured primarily around mobile touch ergonomics, adhering to a 4px/8px modular spacing scale:
- **Mobile First Canvas:** Standard margin is fixed at `1rem` (16px) to maximize screen real estate while protecting comfortable edge tap targets.
- **Thumb Zone Optimization:** All primary actions (cart toggles, category anchor pills, primary CTAs) sit within the lower 45% of the mobile viewport.
- **Card Padding Cadence:** Internal card padding relies on `space-md` (12px) for condensed product tiles and `space-lg` (16px) for order tracking receipts and checkout groupings.
- **List & Grid Distribution:** Menu lists operate on single-column stacks with a `space-md` gap, transitioning to 2-column grids for add-on side orders and drink carousels.

## Elevation & Depth

Visual depth is achieved through structural border layers and subtle ambient lighting rather than heavy drop shadows:
- **Level 0 (Base Canvas):** `#F8FAFC`, non-elevated ground plane for the mobile app view.
- **Level 1 (Card / Tile Surfaces):** `#FFFFFF` paired with a 1px boundary stroke (`#E2E8F0`). Flat elevation with zero blur shadow in resting states to keep the feed crisp and readable.
- **Level 2 (Floating Action Bars / Bottom Sheet):** `#FFFFFF` surface elevated via `box-shadow: 0 -4px 16px -2px rgba(15, 23, 42, 0.06)`, maintaining clear separation from underlying scroll content.
- **Level 3 (Modal Alerts & Pickup Code Modals):** `box-shadow: 0 12px 28px -4px rgba(19, 78, 74, 0.12)`, tinted slightly with Slate Teal to harmonize with brand identity.

## Shapes

The shape system adopts standard modern rounding (`roundedness: 2` = 8px base, 16px large):
- **Base Components (Inputs, Small Badges, Option Pills):** 8px (`rounded-md`) provides a structured, modern perimeter.
- **Cards, Modals & Item Containers:** 12px to 16px (`rounded-lg`) creates an approachable, friendly food delivery touchpoint without leaning into bubbly aesthetics.
- **Status Pills & Micro Indicators:** Full rounded pill format for status tags ("熱銷中", "烘烤完成") to signify actionable or categorical states distinct from squared food image frames.
- **Food Images:** Clipped precisely at 10px corner radius to mirror outer container borders cleanly.

## Components

### Buttons
- **Primary CTA:** Background `#134E4A`, text `#FFFFFF`, 48px minimum height for reliable thumb tap target. Active feedback: scale(0.98) with subtle opacity dimming.
- **Accent Action (Checkout / Quick Order):** Background `#F97316`, text `#FFFFFF`, bold weight label.
- **Secondary / Ghost:** Transparent background with 1px border `#E2E8F0`, text `#134E4A`.
- **Counter Stepper (+ / -):** 32x32px squircle buttons with bold neutral glyphs and tabular number counter.

### Chips & Filters
- **Filter Pills (Meal Categories):** Unselected pills feature `#F1F5F9` background and `#475569` text. Selected pills flip to `#134E4A` with `#FFFFFF` text.
- **Dietary Badges:** Low-saturation light amber or teal fills with 1px matching borders (e.g., "蛋奶素", "低碳水").

### Cards
- **Menu Item Card:** Horizontal layout for mobile feed. Left side: meal name, condensed spec, price (`#0F172A`), and quick-add icon. Right side: 88x88px food image with 8px radius.
- **Active Order Tracker Card:** Stacked layout pinned to the top of screen. Displays pickup time, live status bar (with breathing glow indicator for "製作中"), and high-contrast numerical locker pin ("取餐櫃 03 號").

### Inputs & Modifiers
- **Customization Selectors (Ice/Sugar/Egg Prep):** Segmented buttons with 8px inner radii, ensuring single-tap selections without nested menus.
- **Checkboxes & Radios:** 20px diameter with `#134E4A` active fill and white checkmark icon.

### Dedicated Commuter Components
- **Locker Code Badge:** High-impact `#10B981` themed block with prominent monospaced pickup alphanumeric code for zero-friction terminal pickup.