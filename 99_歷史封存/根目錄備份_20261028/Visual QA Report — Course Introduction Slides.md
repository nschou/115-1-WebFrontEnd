# Visual QA Report — Course Introduction Presentation (13 Slides)

Inspection date: 2026-09-08
Theme: Breakfast shop brand (warm beige/cream, egg yolk yellow, warm orange, dark coffee brown)
Dark slides: 1, 7, 13. Light slides: 2–6, 8–12.

---

## Summary of Issues Found

| Slide | Severity | Issues |
|-------|----------|-------|
| 1 | None | Clean |
| 2 | Minor (intentional) | Bullet style asymmetry (dash vs dot) — likely intentional |
| 3 | None | Clean |
| 4 | Minor (intentional) | Number color inconsistency (02, 05 yellow vs others dark) — likely intentional diagonal highlight |
| 5 | **HIGH** | Footer text collides/overlaps with bottom border of last card |
| 6 | None | Clean |
| 7 | **MEDIUM** | Card 1 subtext orphan-wraps "圖" onto its own line; Card 2 also wraps "系統" to a 2nd line (asymmetric vs cards 3–6) |
| 8 | None | Clean |
| 9 | None | Clean |
| 10 | None | Clean |
| 11 | None | Clean |
| 12 | None | Clean |
| 13 | **LOW–MEDIUM** | "歡迎選修。" floating unanchored (not aligned to grid); golden-orange bullet text moderate/low contrast on dark bg; accent underline shorter than title text |

---

## Per-Slide Detailed Findings

### Slide 1 — Title slide (dark background)
**Status: CLEAN — no issues found.**
- Layout: Left-aligned text hierarchy (title → subtitle → accent line → week tag → footer affiliation).
- Title "網站前端程式設計" in white, subtitle "AI 協作 × 服務設計 × 前端實作" in golden-yellow, accent bar beneath subtitle, week tag "第 1 週 · 課程說明" in light gray, footer "國立聯合大學 資訊工程學系" in muted gray.
- No stray shapes, no overlaps, no text cutoff.
- Margins generous on all sides (>0.5").
- Minor note (not a defect): Footer affiliation text in muted gray has slightly lower contrast — readable on modern screens but could be dim on low-brightness projectors. This is a design choice, not a bug.

---

### Slide 2 — "This is NOT traditional frontend course" (two-column comparison)
**Status: CLEAN (one intentional stylistic asymmetry noted).**
- Two cards side by side: left "傳統前端課" (beige fill, gray header, dash bullets "—"), right "這門課" (white fill, yellow border, orange header, round bullets "•").
- Both cards same height, top/bottom edges aligned. All 5 list items align row-for-row between cards.
- No text overflow, no stray shapes, no collisions.
- Margins and gaps sufficient.
- **Stylistic note (likely intentional):** Left card uses dash bullets (—), right card uses round bullets (•). This appears to be a deliberate visual contrast between "traditional" vs "this course" styling, not a defect.

---

### Slide 3 — Breakfast shop project (3 roles)
**Status: CLEAN — no issues found.**
- Title "貫穿 16 週的專案" with yellow accent underline. Central rounded card with pale yellow fill.
- Card title "雲端早餐店訂餐管理系統" centered. Three role rows: 顧客端, 店員端, 老闆端 — each with terracotta label and dark gray details.
- Footer note inside card: "不是零散作業，而是一個從服務設計到上線部署的完整產品" — centered, ample clearance from rows above and card bottom.
- No stray shapes, no overflow, no collisions.
- Margins generous, spacing even, contrast sufficient.

---

### Slide 4 — 16-week tech tree (2×3 grid)
**Status: CLEAN (one intentional color pattern noted).**
- Title "16 週技術樹：六層學習路徑" with yellow accent underline beneath "16 週技術".
- 6 cards in 2 columns × 3 rows, all identical size, uniform gaps, centered grid.
- Each card: week range (gray), large number, layer title, description.
- No text overflow, no stray shapes, no collisions.
- **Color note (likely intentional):** Numbers 02 and 05 are golden-yellow; 01, 03, 04, 06 are dark charcoal. The yellow numbers form a diagonal (top-right + bottom-left). Card 05 is uniquely "全學期" and Card 02 is the design/UX layer — this appears to be a deliberate highlight pattern, not a defect.

---

### Slide 5 — AI tools (4 tools in rows) ⚠️ HIGH SEVERITY
**Status: ISSUE FOUND — footer text collides with last card border.**

**Issue: Footer/collision (HIGH)**
- The italicized footer note at the bottom — "全部免費，不需信用卡。AI 是副駕駛，你才是做決定的人。" — directly **overlaps and collides with the bottom border line of the fourth card** ("GitHub Copilot 學生版"). The card's bottom grey outline runs through the upper-to-middle portion of the footer text characters, creating a visible rendering collision.
- The footer text should sit clearly below the card stack with adequate vertical separation (≥0.3"), not overlap the card's bottom edge.

**Other aspects (clean):**
- 4 white cards stacked vertically, all same width/height, uniform vertical gaps.
- 4 columns per row (tool name, timeline, description, pricing) — all single-line, no wrapping.
- No stray shapes. Title "你會學到的 AI 工具" with yellow accent underline is clean.

---

### Slide 6 — Teaching method (3-step flow)
**Status: CLEAN — no issues found.**
- Title "教學方式：規格驅動 + AI 協作" with yellow accent underline beneath "教學方式：".
- 3 equal-sized white rounded cards horizontally, connected by golden-yellow right arrows (➔).
- Each card: yellow circular numbered badge (1, 2, 3), title, description — all badges same size, centered, same vertical baseline.
- Footer: two lines at bottom (primary + italic note) — properly centered, no collisions.
- No stray shapes, no overflow, no cutoff. Margins sufficient.

---

### Slide 7 — Pipeline (6 steps, dark background) ⚠️ MEDIUM SEVERITY
**Status: ISSUES FOUND — text wrapping asymmetry in cards 1 and 2.**

**Issue 1: Orphan character "圖" on its own line (MEDIUM)**
- Card 1 ("服務設計"): subtext wraps as "角色・旅程・藍" on line 1, then "圖" alone on line 2. The single character "圖" dangles as an orphan on its own line, creating an awkward break. The text "角色・旅程・藍圖" should fit on one line or break more evenly.

**Issue 2: Asymmetric wrapping in Card 2 (MEDIUM)**
- Card 2 ("風格設計"): subtext wraps as "品牌・UX・設計" on line 1, then "系統" on line 2. This 2-line wrap makes Cards 1 and 2 taller/different from Cards 3–6, which have only a single subtext line each. The text wrapping is inconsistent across the 6 cards.

**Other aspects (clean):**
- All 6 cards identical in width/height, evenly spaced horizontally.
- 5 yellow arrows between cards, centered in gaps, vertically at card midpoint.
- Footer text (2 lines, yellow + white) has generous clearance from cards and bottom edge — no collision.
- No stray shapes, no text overflow outside cards.
- Note: Card backgrounds (taupe/warm-gray) have subtle contrast against the dark brown slide background, but text remains legible.

---

### Slide 8 — Skills (2×2 grid)
**Status: CLEAN — no issues found.**
- Title "你會帶走什麼能力" with yellow accent underline.
- 4 white cards in 2×2 grid, all identical size. Horizontal and vertical gaps uniform (horizontal gap slightly wider than vertical, consistent across layout).
- Each card: terracotta header + bullet list. Top-left card has 2 bullets; other 3 cards have 3 bullets each. Line spacing adjusts to balance negative space — starts at same vertical offset.
- No stray shapes, no overflow, no clipping. Margins >0.5" on all sides. Contrast strong.

---

### Slide 9 — Assessment (6-row table)
**Status: CLEAN — no issues found.**
- Title "評量方式" with yellow accent underline.
- 6 rows with alternating backgrounds (white / light beige). All rows same height.
- 3 columns: item name (left, bold), description/timeline (center-left), percentage (right, large orange). All columns align vertically across rows.
- Footer note at bottom centered, ample clearance from row 6 — no collision.
- No stray shapes, no overflow, no wrapping. Alternating colors consistent. Margins sufficient.

---

### Slide 10 — Who should take (green checkmarks)
**Status: CLEAN — no issues found.**
- Title "什麼樣的學生適合選修" in dark green with green accent underline beneath "什麼樣".
- 6 items, each with circular green badge containing white checkmark (✓). All badges same size, vertically aligned in a column.
- All text single-line, no wrapping. Even vertical spacing. Margins generous on all sides.
- High contrast (dark green/charcoal on cream). No stray shapes, no defects.

---

### Slide 11 — Who should NOT take (red X marks)
**Status: CLEAN — no issues found.**
- Title "什麼樣的學生不建議選修" in dark red with red accent underline beneath "什麼樣的".
- 6 items, each with circular red badge containing white X (✕). All badges same size, vertically aligned.
- All text single-line, no wrapping. Even vertical spacing. Margins generous.
- High contrast. No stray shapes, no defects. Layout consistent with slide 10 (mirror design).

---

### Slide 12 — Pre-class preparation (5 numbered items)
**Status: CLEAN — no issues found.**
- Title "第 1 週上課前你需要準備" with yellow accent underline beneath "第 1 週".
- 5 items, each with yellow circular numbered badge (1–5). All badges same size, vertically aligned.
- 3-column layout: badge | label | description — all columns share consistent left-aligned X-coordinates.
- All text single-line, no wrapping or overflow. Even vertical spacing. Margins generous.
- No stray shapes, no defects.

---

### Slide 13 — Closing promise (dark background) ⚠️ LOW–MEDIUM SEVERITY
**Status: ISSUES FOUND — floating element + contrast.**

**Issue 1: "歡迎選修。" floating unanchored (LOW–MEDIUM)**
- The closing phrase "歡迎選修。" is positioned in the lower-right area but is not aligned to any grid: it is not left-aligned with the main text block, not right-aligned to a standard margin, and not centered relative to the slide width. It sits roughly in the 45–60% horizontal zone, appearing as an asymmetrical floating call-to-action without a clear anchor point. It should be either left-aligned with the bullet list, centered on the slide, or right-aligned to a consistent margin.

**Issue 2: Golden-orange bullet text moderate/low contrast (LOW)**
- The four bullet points are rendered in golden-orange/ochre against the dark chocolate-brown background. While legible, the luminance contrast is noticeably weaker than the pure white used for the heading and introductory text. This could pose readability issues on dimmer projectors or in high-ambient-light presentation environments. Consider using a brighter shade or white for the bullet text.

**Issue 3: Accent underline shorter than title (LOW — cosmetic)**
- The golden-orange accent line beneath the title "這門課的承諾" spans roughly under "這門課的承" and terminates before the last character "諾". The underline is shorter than the full title text width. This is a minor cosmetic inconsistency compared to other slides where the accent line typically underlines a natural word/phrase boundary.

**Other aspects:**
- No stray dots/circles or orphan shapes detected.
- No text overflow or cutoff. Margins exceed 0.5" on all sides.
- Layout is heavily left-weighted, leaving large empty negative space on the right half (intentional minimalist design).

---

## Issues Requiring Fixes (Priority Order)

1. **Slide 5 (HIGH):** Footer text "全部免費，不需信用卡。AI 是副駕駛，你才是做決定的人。" overlaps/collides with the bottom border of the 4th card. → Move footer down with clear separation (≥0.3" gap) below the card stack.

2. **Slide 7 (MEDIUM):** Card 1 subtext "角色・旅程・藍圖" orphan-wraps "圖" onto its own line. Card 2 subtext "品牌・UX・設計系統" wraps "系統" to a 2nd line. Cards 3–6 have single-line subtext. → Widen cards 1–2, reduce font size, or rephrase subtext so all 6 cards have consistent single-line subtext.

3. **Slide 13 (LOW–MEDIUM):** "歡迎選修。" is floating without grid alignment. → Align it left with the bullet block, center it on the slide, or right-align to a consistent margin.

4. **Slide 13 (LOW):** Golden-orange bullet text has moderate contrast on dark background. → Use brighter shade or white for improved legibility.

5. **Slide 13 (LOW — cosmetic):** Accent underline is shorter than the title text. → Extend to match or underline a natural phrase boundary.

## Slides Confirmed Clean (no issues)
Slides 1, 2, 3, 4, 6, 8, 9, 10, 11, 12.
