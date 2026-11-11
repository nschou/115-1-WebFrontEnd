# 第 5 週 Prompt 參考與操作檔

> 用途：提供從服務設計輸入到 Google Stitch 的四個可直接使用 Prompt。
> 這四個 Prompt 產生的是工作檔；`09_DESIGN.md` 仍須經 Stitch 匯出、整併與審計才算完成。

## 使用規則

1. 先完成 `05_objects.md`、`06_infoflow.md`、`07_decisions.md`。
2. 每次只執行一個 Prompt，確認上一個輸出存在且通過檢查後，才進入下一步。
3. `@` 後面的檔名代表要附加給 AI 讀取的檔案；若檔案位於子目錄，請改成實際相對路徑。
4. AI 找不到來源時必須標記「待補證據」，不得自行補寫成已決定內容。
5. `04_blueprint.md` 的候選方案不是定案；只有 `07_decisions.md` 與 `08_service-design-baseline.md` 才能作為下游服務輸入。

## 四步輸入／輸出鏈

| 步驟 | 目的 | 主要輸入 | 工作輸出 |
|---|---|---|---|
| Prompt 1 | 建立 Baseline 草稿 | W2–W5 輸入與範本 | `baseline-draft.md` |
| Prompt 2 | 依 11 條決策定案 | 草稿＋`07_decisions.md` | `08_service-design-baseline.md` |
| Prompt 3 | 組裝 Stitch Prompt | 定案 baseline＋提示範本 | `stitch-prompt-draft.md` |
| Prompt 4 | 驗證並定稿 | Prompt 草稿＋13 項清單 | `stitch-prompt-final.md` |

---

## Prompt 1｜建立 Baseline 草稿

### 輸入

- `@01_market.md`
- `@02_persona.md`
- `@03_cjm.md`
- `@04_blueprint.md`
- `@05_objects.md`
- `@06_infoflow.md`
- `@08_service-design-baseline/08_baseline_template.md`

### 可直接貼給 AI 的 Prompt

```text
你是服務設計資料整理助手。請讀取以下檔案：

@01_market.md
@02_persona.md
@03_cjm.md
@04_blueprint.md
@05_objects.md
@06_infoflow.md
@08_service-design-baseline/08_baseline_template.md

請依照 08_baseline_template.md 的章節結構，建立 baseline-draft.md。

規則：
1. 只整理檔案中已有的內容，不得編造研究、測試、核准或營運數據。
2. 每一項重要內容都附上來源檔案與章節定位。
3. 清楚區分「上游證據」「由證據推導的整理」與「尚待決策」。
4. 04_blueprint.md 的 A／B／C 等方案只能標為候選，不得寫成採用方案。
5. 07_decisions.md 尚未進入本步驟；決策章的採用方案欄先留空，SD-01–SD-11 先列出待填欄位。
6. 保留物件、角色、交接、資訊流、等待者、時效、例外與服務承諾；不要改寫成畫面、按鈕、API 或技術架構。
7. 若資料不足，請在對應位置寫「待補證據」，並在檔案最後列出問題，不要猜答案。

輸出：只建立 baseline-draft.md。
完成後回報：缺漏資料、候選方案清單、尚未定案的 SD-01–SD-11 欄位。
```

### 產出後人工檢查

- 每章都有來源或「待補證據」。
- `04_blueprint.md` 候選沒有被誤寫成採用方案。
- 物件與資訊流已進入草稿。
- 沒有 UI、API 或技術名詞混入服務決策。

---

## Prompt 2｜依 11 條決策定案 Baseline

### 輸入

- `@baseline-draft.md`
- `@07_decisions.md`
- `@08_service-design-baseline/08_baseline_template.md`

### 可直接貼給 AI 的 Prompt

```text
你是服務設計定案助手。請讀取：

@baseline-draft.md
@07_decisions.md
@08_service-design-baseline/08_baseline_template.md

請將 baseline-draft.md 與 07_decisions.md 整併成 08_service-design-baseline.md。

規則：
1. SD-01–SD-11 必須全部出現，逐項填入採用方案、理由、代價／限制與來源。
2. 採用方案只能來自 07_decisions.md；若決策資料缺漏，標記「待補決策」，不得自行選擇。
3. 移除或明確標示所有未採用候選；定案後「開放選項」必須為 0。
4. 保留市場、Persona、CJM、Blueprint、物件、資訊流與服務規則的來源鏈。
5. 補齊操作流程、角色交接、服務承諾、例外與設計交接摘要。
6. 不新增按鈕、頁面、API、資料表或其他技術實作決定。
7. 若 baseline-draft 與 07_decisions.md 矛盾，列出矛盾並停止，不要默選其中一個。

輸出：只建立 08_service-design-baseline.md。
完成後回報：11 條決策是否全數完成、開放選項數量、矛盾清單與待補項目。
```

### 產出後人工檢查

- SD-01–SD-11 為 11／11。
- 每條決策都有採用理由、代價／限制與來源。
- 開放選項為 0。
- 這份 baseline 才是後續 Design、UX 與 Spec 的服務輸入。

---

## Prompt 3｜組裝 Stitch Prompt 草稿

### 輸入

- `@08_service-design-baseline.md`
- `@09_DESIGN/09_DESIGN_prompts.md`
- `@09_DESIGN/09_DESIGN_template.md`

### 可直接貼給 AI 的 Prompt

```text
你是設計工具提示組裝助手。請讀取：

@08_service-design-baseline.md
@09_DESIGN/09_DESIGN_prompts.md
@09_DESIGN/09_DESIGN_template.md

請根據已定案的 08_service-design-baseline.md，建立 stitch-prompt-draft.md。

輸出必須分成兩部分：
A. 可直接貼入 Google Stitch 的完整 Prompt。
B. 給學生審查的來源對照表。

A 部分必須包含：
1. 品牌背景與市場／營運目標。
2. 主要使用者、期望感受與不期望感受。
3. 服務流程、CJM 階段與情緒最低點。
4. 從接觸點推導的畫面清單；每個畫面標明對應階段。
5. 已定案的關鍵服務規則、角色交接與例外。
6. 三組可比較的風格候選；每組都要有色彩、字體、間距、圓角與動效參數。
7. 負面約束至少五項。
8. 主要裝置與使用情境。

規則：
- 服務規則只能取自 baseline；不能把設計推導寫成已核准的服務決策。
- 三組風格的頁數、資訊架構、區塊順序與文案必須相同，只能改風格參數。
- 新提出的視覺候選標記為「設計推導，待討論」。
- 找不到來源的內容標記「無來源，待補」，不得編造。
- B 部分逐段標明來源檔案與章節；指出哪些是服務定案、哪些是設計推導。

輸出：只建立 stitch-prompt-draft.md。
```

### 產出後人工檢查

- A 部分可以直接貼入 Stitch。
- B 部分每段都有來源。
- 三組樣張的 IA、頁數、區塊順序與文案一致。
- 設計推導沒有冒充服務決策。

---

## Prompt 4｜驗證並定稿 Stitch Prompt

### 輸入

- `@stitch-prompt-draft.md`
- `@09_DESIGN/stitch-prompt-checklist.md`
- `@08_service-design-baseline.md`

### 可直接貼給 AI 的 Prompt

```text
你是 Stitch Prompt 審查助手。請讀取：

@stitch-prompt-draft.md
@09_DESIGN/stitch-prompt-checklist.md
@08_service-design-baseline.md

請依照 stitch-prompt-checklist.md 的 13 項清單逐項審查 stitch-prompt-draft.md。

處理方式：
1. 先列出每一項的「通過／待修正」結果與理由。
2. 對待修正項目提出具體改寫內容。
3. 對沒有 baseline 來源的內容，不得補猜；改為「設計推導，待討論」或刪除。
4. 修正品牌、Persona、CJM、接觸點、服務規則、三組風格、負面約束、裝置與來源對照。
5. 確認三組樣張的頁數、IA、區塊順序與文案完全一致，只替換風格參數。
6. 確認後續能從最終 Prompt 生成 7 章 DESIGN 匯出原料。
7. 最後只保留 A 部分（可貼入 Stitch 的 Prompt），移除 B 部分審查資料。

輸出：
- 審查結果保留在對話或另存審查紀錄。
- 將修正後的 A 部分存為 stitch-prompt-final.md。
- 不要直接產生或重寫 09_DESIGN.md；那是 Stitch 匯出後的下一階段工作。
```

### 產出後人工檢查

- 13 項清單均有結果。
- `stitch-prompt-final.md` 只含可貼入 Stitch 的最終 Prompt。
- 沒有把審查表、來源說明或 AI 推測混入最終 Prompt。
- 使用最終 Prompt 生成三組樣張後，才進入 `09_DESIGN_README.md` 的匯出、整併與審計流程。

## 與 Design.md 的關係

```text
Prompt 1 → baseline-draft.md
Prompt 2 → 08_service-design-baseline.md
Prompt 3 → stitch-prompt-draft.md
Prompt 4 → stitch-prompt-final.md
    ↓
Google Stitch：三組樣張 → 選定 → 匯出 7 章
    ↓
09_DESIGN_README.md：整併、補第 1／9／10 章、審計
    ↓
09_DESIGN.md（10 章）＋ 09_DESIGN_audit.md
```
