# 08_service-design-baseline｜Baseline README

## 目標
把 `04_blueprint.md` 的選項版，與 `05_objects.md`、`06_infoflow.md`、`07_decisions.md` 整併成唯一服務設計基準；另可依此產生設計提示，但提示不是主線產出。

> 本 README 說明流程與判斷原則；四個可直接貼用的完整 Prompt 統一放在 `../00_W05_PROMPTS.md`。學生應依該檔案執行，不需自行猜測 Prompt。
## 步驟1：建立 Baseline 草稿

### 輸入
- `08_baseline_template.md`
- `01_market.md`、`02_persona.md`、`03_cjm.md`、`04_blueprint.md`
- `05_objects.md`、`06_infoflow.md`

### 用 omp
```
請讀取上述主線檔案，依 `08_baseline_template.md` 組裝 baseline 草稿。
保留來源性質；不要把 `04_blueprint.md` 的候選方案誤寫成採用方案。
輸出為 baseline 草稿，資料不完整時提出問題。
```

## 步驟2：定案 Baseline

### 輸入
- baseline 草稿
- `07_decisions.md`（SD-01–SD-11）

### 用 omp
```
請讀取 baseline 草稿與 @07_decisions.md，完成 `08_service-design-baseline.md`。
填入 11 項決策、操作流程、因果鏈、設計交接摘要；開放選項必須為 0。
```


## 步驟3：產生 Stitch Prompt

### 輸入
- `08_service-design-baseline.md`（步驟 2 產出）
- `09_DESIGN/09_DESIGN_prompts.md`（提示範本）

### 用 omp
```
請讀取 @08_service-design-baseline.md 與設計提示範本。
根據基準產生設計工具提示；先檢查必要欄位，缺漏時提出問題。
輸出提示草稿，供 `09_DESIGN/` 審計。
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

## 步驟5：交給 Design 階段

baseline 定稿後，本檔的任務結束。後續交給 `09_DESIGN/`：

| 交出去的是 | 交給誰 | 做什麼 |
|---|---|---|
| `08_service-design-baseline.md` | `09_DESIGN/09_DESIGN_README.md` | 補設計理由、動效與回溯 |
| 設計提示／樣張 | `09_DESIGN/` | 產出 `09_DESIGN.md` 與審計紀錄 |
| 待提出候選 | Design 階段 | 提出、比較並記錄，不回寫成服務決策 |
