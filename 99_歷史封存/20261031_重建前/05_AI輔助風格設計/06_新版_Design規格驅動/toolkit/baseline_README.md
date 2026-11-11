# Baseline README

## 目標
透過 4 個步驟，從第 2-5 週標準化產出組裝出 `stitch-prompt-final.md`（餵給 Google Stitch 的 Prompt）

## 步驟1：建立 Baseline 草稿

### 輸入
- `service-design-baseline-template.md`（範本，第一章已固定）
- `01_market.md`、`02_persona.md`、`03_cjm.md`、`04_blueprint.md`（第2-4週結論）

### 用 omp

```
請讀取 @service-design-baseline-template.md（範本）和以下第2-4週標準化產出：
- @01_market.md（市場分析結論）
- @02_persona.md（三層Persona結論）
- @03_cjm.md（CJM結論）
- @04_blueprint.md（服務藍圖+選項版結論）

根據範本的 10 章結構，從這些標準化產出中提取對應內容填入。
每項資料標注「來源性質」。第六章決策表的「採用方案」欄留空。
輸出為 baseline-draft.md。如果某章資料不完整，提出問題。
```

## 步驟2：定案 Baseline

### 輸入
- `baseline-draft.md`（步驟1產出）
- `05_decisions.md`（第5週決策定案）

### 用 omp

```
請讀取 @baseline-draft.md 和 @05_decisions.md，完成 baseline 定稿。
填入11項決策、操作流程、因果鏈、設計交接摘要。
輸出為 service-design-baseline.md。
```

## 步驟3：產生 Stitch Prompt

### 輸入
- `service-design-baseline.md`（步驟2產出）
- `stitch-prompt-template.md`（範本）

### 用 omp

```
請讀取 @service-design-baseline.md 和 @stitch-prompt-template.md。
根據範本產生餵給 Google Stitch 的 Prompt。
先檢查8個必要欄位，缺漏時提問。
輸出分A（貼入Stitch）和B（審查對照），存入 stitch-prompt-draft.md。
```

## 步驟4：驗證並定稿

### 輸入
- `stitch-prompt-draft.md`（步驟3產出）
- `stitch-prompt-checklist.md`（固定查驗清單）

### 用 omp

```
請讀取 @stitch-prompt-draft.md 和 @stitch-prompt-checklist.md，
逐項檢查並修正，只保留 A 部分，存入 stitch-prompt-final.md。
```

## 步驟5：交給設計規格階段（06_designmd）

baseline 定稿後，本檔的任務結束。後續不在本 README 範圍：

| 交出去的是 | 交給誰 | 做什麼 |
|---|---|---|
| `service-design-baseline.md` | `06_designmd_README.md` | 補第 1 章（設計理由）、第 9 章（動效）、第 10 章（回溯） |
| `stitch-prompt-final.md` | Google Stitch | 生成 3 組樣張 → 擇一 → 匯出 7 章 |
| 第十章「待提出候選」 | 06 階段 | 三組風格預設在 06 階段提出與選定，baseline 不定義 |
