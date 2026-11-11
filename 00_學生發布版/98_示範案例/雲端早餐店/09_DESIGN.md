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

<!-- 凍結區：第 2–8 章由 Google Stitch 產生（New-Style_C / Balanced Modern Morning） -->
<!-- 人寫區：第 1 章（設計理由）、第 9 章（動效）、第 10 章（回溯與可替換性） -->

# Design.md：雲端早餐店訂餐管理系統

## 文件導覽

| 項目 | 內容 |
|---|---|
| 版本 | v1.0（2026-10-26） |
| 產生模式 | 正常模式（Google Stitch → 3 組樣張 → 老闆擇一） |
| 選定預設 | 平衡現代（Balanced Modern）｜ New-Style_C |
| 凍結範圍 | 第 2–8 章（DS-BRAND ~ DS-COMP），原文逐字 |
| 人寫範圍 | 第 1 章（DS-RATIONALE）、第 9 章（DS-MOTION）、第 10 章（DS-TRACE） |
| 讀者導覽 | 老闆看第 1 章｜設計師看 1–9｜工程看 frontmatter＋2–8＋10 |
| 遠距顯示 | 見 `DESIGN-DISPLAY.md`（KDS／看板，另立一份） |

> **「原封不動」的三種允許修改**：①加章號 ②加凍結標記 ③在該章下方加「中文導讀」。其餘一字不改。

---

## 1. 設計理由（DS-RATIONALE）

### 1.1 風格一句話定義

> **俐落、可信、不催促** — 讓趕時間的人在 30 秒內做完決定，且不覺得被催。

### 1.2 品牌人格

| 品牌人格 | 視覺對應（引用第 2–8 章既有值） | 型別 | 反面案例 | 來源 |
|---|---|---|---|---|
| 俐落 | 緊湊間距（space-md 12px）、小圓角（8px 基準）、無襯線 | **慣例** | 蘋果以大圓角表現俐落；北歐極簡以大量留白表現俐落 | 老闆王建興目標＋張家豪期望（baseline §4） |
| 現代 | 冷色基底（深青 `#134E4A`）＋細邊框（`#E2E8F0`） | 慣例 | 暖米色同樣可以現代（端看排版密度） | 同上 |
| 可信賴 | 對比 ≥4.5:1、狀態不只靠顏色、錯誤不責備 | **定律** | 無（WCAG 有實測標準） | WCAG 2.1 SC 1.4.3 |

### 1.3 核心體驗目標

| 目標 | 放大什麼 | 避免什麼 | 來源 |
|---|---|---|---|
| 高效 | 一眼掃到品名與價格 | 需要逐字閱讀的長句 | 張家豪「通勤路上、單手操作」（baseline §4） |
| 清楚 | 主 CTA 永遠只有一個 | 同時出現多個同級按鈕 | 同上 |
| 安心 | 進度與取餐資訊隨時可見 | 「不知道要等多久」的空白 | CJM 最低點 −2（baseline §7） |

### 1.4 服務承諾

| 階段 | 承諾句 | 來源（Blueprint 前台） |
|---|---|---|
| 決定 | 顧客一定可以在 30 秒內看懂今天能吃什麼、多少錢 | 顧客查看菜單品項與價格 |
| 下單 | 顧客一定可以在 3 步內完成下單，且知道幾點拿得到 | 顧客提交訂單；收到確認與預估時間 |
| 等待取餐 | 顧客一定可以隨時知道「現在做到哪」 | 顧客查看訂單進度 |
| 取餐 | 顧客一定可以不看第二次手機就找到櫃位與號碼 | 顧客聽到取餐通知；領取餐點 |

### 1.5 情緒需求與不可違反的限制

| 優先 | 情緒需求 | 依據 |
|---|---|---|
| 1 | 掌控感（知道進度） | CJM 等待取餐 −2（最低點） |
| 2 | 被尊重（錯誤不責備） | 顧客不期望感受：焦慮、混亂 |
| 3 | 食慾感（暖色點綴） | 「複合式」需要食物吸引力 |

| 類別 | 限制 |
|---|---|
| 無障礙 | WCAG AA（內文 4.5:1、大字 3:1）、鍵盤焦點可見、狀態不只靠顏色 |
| 中文可讀 | 內文 ≥16px、行高 1.5–1.6、系統字 fallback |
| 裝置 | 手機優先（375px），店員平板 768，KDS／看板 1920 |
| 禁用 | 紫藍漸層、過度 SaaS 感、抽象 3D 背景、emoji 當圖示、全站 16px 圓角、重陰影堆疊 |

---

## 2. Brand & Style（DS-BRAND）

<!-- 以下原文逐字保留，不得修改 -->
This design system expresses a crisp, punctual, and appetizing digital breakfast experience tailored for morning commuters and office workers. The emotional resonance balances two critical states: the calm, efficient predictability of professional routine, and the warm, sensory anticipation of fresh food. 

The aesthetic is **Balanced Modern** with tactile, low-contrast physical metaphors:
- **Tone:** Professional, precise, grounded, and reassuringly warm.
- **Visual Tenets:** Generous breathing room, structural hierarchy without visual clutter, crisp micro-borders, and high-readability typography optimized for glanceability while moving through transit hubs.
- **Anti-patterns:** Avoid heavy neo-brutalism, gratuitous gradient backgrounds, abstract 3D blobs, playful emoji icons in core workflows, and ethereal SaaS glassmorphism that alienates food craft.

**中文導讀**

這章定義「語氣與反模式」。注意 **Anti-patterns** 那行——它同時是第 1 章「不可違反的限制」的來源，也是第 10 章「不可換（底座）」的依據。

---

## 3. Colors（DS-COLOR）

<!-- 以下原文逐字保留，不得修改 -->
The color strategy uses functional color assignment to maintain a clean culinary cadence:
- **Primary (`#134E4A` - Deep Slate Teal):** Serves as the bedrock of navigation bars, primary button states, order status tracking headers, and strong typography. Evokes modern efficiency and precision.
- **Secondary (`#F97316` - Warm Amber Orange):** Applied purposefully to activate appetite and guide immediate action: conversion CTAs ("立即結帳", "加購"), badge highlights ("今日特餐", "主廚推薦"), and active heat states.
- **Tertiary (`#10B981` - Emerald Mint):** Exclusively reserved for completion and readiness states, such as "可至 04 號智慧保溫櫃取餐" and verified receipts.
- **Neutral Canvas (`#F8FAFC` to `#FFFFFF`):** High-clarity backgrounds paired with fine-line structural borders (`#E2E8F0`). Text layers employ `#0F172A` for high-contrast primary labels, `#475569` for auxiliary details, and `#94A3B8` for disabled indicators.

**中文導讀**

注意一個落差：本章散文寫 Primary `#134E4A`、Secondary `#F97316`，但 YAML 的 `primary` 是 `#003633`、`secondary` 是 `#9D4300`（散文其實對應 `primary-container` 與 `secondary-container`）。落差已記在第 10 章。

---

## 4. Typography（DS-TYPE）

<!-- 以下原文逐字保留，不得修改 -->
Typography prioritizes rapid scannability during transit and one-handed operation:
- Font pairings leverage **Noto Sans** (with standard fallbacks to system Chinese fonts `PingFang TC`, `Heiti TC`, `Microsoft JhengHei`) to ensure clear rendering of Traditional Chinese characters.
- Strict optical hierarchy guarantees dish names, nutritional tags, customizable option items, and pickup countdown times remain legible under bright outdoor conditions.
- Price tags utilize `headline-sm` with tabular numerals (`font-variant-numeric: tabular-nums`) to ensure vertical alignment across order summaries and cart breakdowns.

**中文導讀**

10 級字階（11–32px）。中文用 Noto Sans ＋ 系統字 fallback——這條就是「中文可讀」這項底座的具體化。

---

## 5. Layout & Spacing（DS-SPACE）

<!-- 以下原文逐字保留，不得修改 -->
This layout system is structured primarily around mobile touch ergonomics, adhering to a 4px/8px modular spacing scale:
- **Mobile First Canvas:** Standard margin is fixed at `1rem` (16px) to maximize screen real estate while protecting comfortable edge tap targets.
- **Thumb Zone Optimization:** All primary actions (cart toggles, category anchor pills, primary CTAs) sit within the lower 45% of the mobile viewport.
- **Card Padding Cadence:** Internal card padding relies on `space-md` (12px) for condensed product tiles and `space-lg` (16px) for order tracking receipts and checkout groupings.
- **List & Grid Distribution:** Menu lists operate on single-column stacks with a `space-md` gap, transitioning to 2-column grids for add-on side orders and drink carousels.

**中文導讀**

4/8px 基準。注意 `space-md` 是 12px、`space-lg` 是 16px，比常見的 16/24 更緊——符合「尖峰快速點餐」的節奏。

---

## 6. Elevation & Depth（DS-DEPTH）

<!-- 以下原文逐字保留，不得修改 -->
Visual depth is achieved through structural border layers and subtle ambient lighting rather than heavy drop shadows:
- **Level 0 (Base Canvas):** `#F8FAFC`, non-elevated ground plane for the mobile app view.
- **Level 1 (Card / Tile Surfaces):** `#FFFFFF` paired with a 1px boundary stroke (`#E2E8F0`). Flat elevation with zero blur shadow in resting states to keep the feed crisp and readable.
- **Level 2 (Floating Action Bars / Bottom Sheet):** `#FFFFFF` surface elevated via `box-shadow: 0 -4px 16px -2px rgba(15, 23, 42, 0.06)`, maintaining clear separation from underlying scroll content.
- **Level 3 (Modal Alerts & Pickup Code Modals):** `box-shadow: 0 12px 28px -4px rgba(19, 78, 74, 0.12)`, tinted slightly with Slate Teal to harmonize with brand identity.

**中文導讀**

用邊框與極淡陰影做層次，不用重陰影。第 9 章（動效）與遠距看板會**刪除**這一章——因為 4 公尺外看不到陰影。

---

## 7. Shapes（DS-SHAPE）

<!-- 以下原文逐字保留，不得修改 -->
The shape system adopts standard modern rounding (`roundedness: 2` = 8px base, 16px large):
- **Base Components (Inputs, Small Badges, Option Pills):** 8px (`rounded-md`) provides a structured, modern perimeter.
- **Cards, Modals & Item Containers:** 12px to 16px (`rounded-lg`) creates an approachable, friendly food delivery touchpoint without leaning into bubbly aesthetics.
- **Status Pills & Micro Indicators:** Full rounded pill format for status tags ("熱銷中", "烘烤完成") to signify actionable or categorical states distinct from squared food image frames.
- **Food Images:** Clipped precisely at 10px corner radius to mirror outer container borders cleanly.

**中文導讀**

以 8px 為基準、12–16px 給大容器；「Food Images 10px」是特例，第 10 章標為「慣例」。

---

## 8. Components（DS-COMP）

<!-- 以下原文逐字保留，不得修改 -->
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

**中文導讀**

只列 5 類元件。**缺通知／toast／進度條**——UX 階段會發現缺元件，要回寫 v1.1。這也是第 10 章「需連動」的來源。

---

## 9. 動效原則（DS-MOTION）

### 9.1 節奏檔位

> 本案選 **中（200–250ms）**。
> 理由（引用第 1 章）：核心體驗目標是「高效」，但風格定義是「**不催促**」——
> 所以不用 150ms 的急迫感，也不用 300ms 的慢節奏。中速＋短距離移動，符合「俐落但不催」。

### 9.2 動效清單

| 觸發點 | 目的 | 時長 | 緩動 | reduced-motion 降級 |
|---|---|---|---|---|
| 按鈕按下 | 回饋 | 200ms | ease-out | 保留（改為 0ms） |
| 卡片進場 | 引導 | 240ms | ease-out | 全關 |
| 訂單進度更新 | 狀態說明 | 250ms | ease-in-out | 改為直接替換 |
| 加入購物車浮起 | 回饋 | 200ms | ease-out | 全關 |
| 底部購物車列出現 | 引導 | 240ms | ease-out | 全關 |
| 取餐號碼變更（看板） | 狀態說明 | 300ms 淡入 | ease-in-out | 直接替換 |

### 9.3 禁止清單

- 視差滾動、跑馬燈、自動播放影片
- 超過 400ms 的阻塞動畫（會讓尖峰點餐變慢）
- 用動效掩飾載入延遲（該顯示骨架屏就顯示）
- 持續閃爍（強光環境下易造成不適）

### 9.4 不做動效的地方

> 金額、錯誤訊息、訂單號、取餐號碼（靜態顯示）——**這四類不動，避免注意力被搶走**。

---

## 10. 回溯表與可替換性契約（DS-TRACE）

### 10.1 回溯表

| 決策 | 依據 | 回溯到 | 驗證狀態 | 可替換性 |
|---|---|---|---|---|
| 主色深青 `#134E4A` | CJM 最低點需安心感；深色傳達穩重 | §1.5／baseline §7 | 設計推導 | 可換（風格） |
| 暖橙 `#F97316` 只用於推薦與 CTA | 「複合式」需要食慾感，但不能搶走主色 | §1.2 現代 | 設計推導 | 可換（風格） |
| 成功色 `#10B981` 只用於可取餐 | 完成狀態要一眼辨識 | §1.4 取餐承諾 | 設計推導 | 可換（風格） |
| 中性色 `#F8FAFC`／`#0F172A`／`#475569` | 高對比、可長時間閱讀 | §1.5 中文可讀 | — | **不可換（底座）** |
| 對比 ≥4.5:1 | WCAG AA | §1.5 | Prototype 關鍵樣本 8.90–17.13:1；見 validation RV-05／RV-06 | **不可換（底座）** |
| 字階 10 級（11–32px） | 字階要能拉出層次，且中文 ≥16px | §1.5 | 設計推導 | 可換（尺度） |
| 間距 4/8px 基準、space-md 12px | 尖峰快速 → 緊湊但不擁擠 | §1.3 高效 | 設計推導 | 可換（風格） |
| 圓角 8px 基準 | 「俐落」→ 小圓角（慣例） | §1.2 | 設計推導 | 可換（風格） |
| 食物圖 10px 圓角 | 與外框對齊的視覺細節 | 第 7 章原文 | 設計推導 | 可換（細節） |
| 用邊框而非重陰影做層次 | 避免「SaaS 玻璃感」 | 第 2 章反模式 | 設計推導 | 可換（風格） |
| 動效 200–250ms | 「高效但不催促」 | §9.1 | 設計推導 | 可換（風格） |
| 支援 reduced-motion | 無障礙 | §1.5 | 已驗證規範 | **不可換（底座）** |
| 手機優先 375px | 通勤單手操作 | baseline §7 使用情境 | 已驗證 | **不可換（底座）** |
| 元件缺通知／進度條 | UX 階段會用到 | 第 8 章 | 已由 `E-22`、`E-30`、`E-35` 與 MSG-13／23／24 承接 | **已補** |

### 10.2 覆蓋率

| 項目 | 數值 |
|---|---|
| token 總數 N（色 47＋字 10＋圓 6＋距 9） | **72** |
| 已回溯（群組化） | **72** |
| 覆蓋率 | **100%** |
| 未覆蓋 | 0 |
| 但「元件缺項」 | 2（通知、進度條）→ 待 v1.1 |

### 10.3 已知落差（必須記錄，不要默默修正）

| 落差 | 散文 | YAML | 處理 |
|---|---|---|---|
| 主色 | `#134E4A` | `primary: #003633`／`primary-container: #134e4a` | 實作以 `--color-primary → --m3-primary-container` 採用散文語意值；M3 原始值保留作對照 | 已處理 |
| 強調色 | `#F97316` | `secondary: #9D4300`／`secondary-container: #FD761A` | 實作以 `--color-accent → --m3-secondary-container`；差異是 M3 角色映射，不是未同步 | 已處理 |
| 成功色 | `#10B981` | `tertiary-container: #005136`／`on-tertiary-container: #35cc92` | 實作以 `--color-success → --m3-tertiary-container`；Prototype 另以文字與狀態表示，非只靠顏色 | 已處理 |
| 底層 | `#F8FAFC` | `surface: #f7f9fb` | 實作採 YAML 的 `#f7f9fb`；散文值是近似設計意向，差異已明列 | 已處理 |

> 這一節是**審計的證據**：不是「看不出差異」，而是「知道有差異、決定怎麼處理」。

### 10.4 可替換性契約

| 層 | 內容 | 誰可以改 | 換了要同步 |
|---|---|---|---|
| **不可換（底座）** | 對比、焦點、中文可讀、狀態語義、手機優先、reduced-motion | 只有專案負責人 | 重跑整條鏈 |
| **可換（風格）** | 色彩、字階、間距、圓角、陰影、動效速度 | **外包設計師可整組換** | 只換第 2–8 章 ＋ `tokens.css` |
| **需連動** | token 名稱對應、元件尺寸、缺項元件 | 換風格時必須一起改 | 元件與間距重新對齊 |

### 10.5 換版程序

```
外包只交：第 2–8 章（新風格）＋ 新 tokens.css
  → 比對 10.4 的「不可換」清單（有沒有動到對比、焦點、中文可讀）
    → 通過 → merge，更新版本指紋（v1.1）
      → 不通過 → 退回，並指出違反哪一條
```
