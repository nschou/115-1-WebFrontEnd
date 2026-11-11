# ADR-005：服務需求、US-B／US-I 與 spec.md 的分層契約

- **狀態**：Accepted
- **日期**：2026-10-30
- **決策者**：課程設計維護者
- **版本**：v1.1
- **修訂**：2026-10-30：補上 W4 選項版 → SD-01–SD-11 → Blueprint baseline 閘門
- **範圍**：W3 CJM、W4 Service Blueprint、W5 設計規格、W6 UX、W7 spec

## 背景

原本的教學順序容易把角色任務、User Story、線框與 `spec.md` 混成一條單向文件流程，也把 W4 Blueprint 的「方案選項版」誤當成可以直接交給 Design／UX 的定案輸入。這造成四個可追溯性問題：

1. 角色任務是服務供給側的工作與交接，User Story 是需求／價值側的表述，兩者不能互相取代。
2. `04_blueprint.md` 同時含有多種設計選項；若不先經過 11 項決策，後續 Design／UX 可能各自選 A／B／C，形成互相矛盾的服務。
3. 只在 UX 前寫一種 Story，無法同時保留「值得做什麼」與「介面怎麼走」；只在 UX 後寫，則 UX 缺少價值約束。
4. 若把資料資訊、Wireframe、AC 首次放進 `spec.md`，W7 會重新設計，而非彙整前面已驗證的證據。
## 決策

採用兩階段 User Story、Blueprint baseline 閘門與明確的階段契約：

```text
CJM 痛點／機會 + Blueprint 角色任務／交接／方案選項
  → W5 物件／資訊流
  → 05_decisions.md（SD-01–SD-11）
  → service-design-baseline.md（Blueprint baseline；開放選項 0）
  → DESIGN／tokens
  → 服務需求索引 + 任務句 + US-B
  → 元素／資訊規格／任務流／狀態／文案／Wireframe
  → US-I + AC + prototype + review
  → W7 spec.md 彙整與鎖定
```

**硬性閘門**：`04_blueprint.md` 是選項版；沒有完成 `05_decisions.md` 的 11／11 定案並產出 `service-design-baseline.md`，不得進入 Design、UX 或 spec。

### 定義

| 名稱 | 層次 | 內容 | 禁止內容 | 產出時機 |
|---|---|---|---|---|
| Blueprint 選項版 | 服務設計候選 | 誰做什麼、交給誰、前置狀態、例外與可行方案 | 不視為已選方案；不直接餵 Design／UX | W4 |
| 角色任務 | 服務供給側 | 從 Blueprint 選項版整理出的誰做什麼、交給誰、前置狀態、例外 | 不以畫面或按鈕描述 | W4→W5 |
| 11 項決策 | 服務定案側 | SD-01–SD-11 的採用方案、理由、代價／限制與約束／產出 | 不留未選 A／B／C 作為工程輸入 | W5 |
| Blueprint baseline | 凍結業務契約 | `baseline-draft.md + 05_decisions.md` 整併後的決定版服務設計 | 不再帶開放選項進下游 | W5 決策後 |
| 服務需求索引 | 跨來源索引 | baseline 角色任務、交接、物件／狀態、CJM 痛點／機會 | 不新增無來源需求 | W6 Step 1 |
| US-B | 業務／價值側 | 角色想達成什麼、為什麼有價值 | 頁面、按鈕、API、資料表 | W6 UX 前 |
| US-I | 介面／路徑側 | 從 US-B 實際走哪些 SCR、完成哪個任務 | 不脫離既有線框與狀態 | W6 線框後 |
| AC | 驗收契約 | 狀態轉換、例外、業務規則與可觀察結果 | 不從視覺外觀猜規則 | W6 狀態定案後 |
| spec.md | 彙整／鎖定 | 來源、需求、資訊、流程、US、AC、SCR 的追溯關係 | 不首次發明 UX 或技術方案 | W7 |

## 輸入與輸出契約

| 階段 | 必要輸入 | 方法 | 必要輸出 | 下一階段如何使用 |
|---|---|---|---|---|
| W3 CJM | W2 Persona／情境 | 旅程、痛點、機會、資訊需求 | `03_cjm.md` | Blueprint 列服務行為、缺口與候選方案 |
| W4 Blueprint（選項版） | CJM、角色、物件候選 | 前台／後台／支援、交接、例外、方案選項 | `04_blueprint.md` | W5 比較選項、建立物件／資訊流與 11 項決策 |
| W5 決策與 baseline | Blueprint 選項版、物件／資訊流、W3–W4 依據 | SD-01–SD-11、baseline 整併與凍結 | `05_decisions.md` + `service-design-baseline.md` | Design／W6 UX／W7 spec 只使用 baseline |
| W5 Design | 已凍結 baseline、Design 方法 | 將服務決定轉成設計理由、規格與 tokens | `08_DESIGN.md`、`09_tokens.css` | UX 套用視覺約束，不重新選服務方案 |
| W6 前段 | baseline＋CJM＋W4 任務／交接＋W5 物件／資訊流／Design | 索引、任務句、US-B | `10_tasks.md` | UX 不必猜價值來源或服務方案 |
| W6 中段 | `10_tasks`、OBJ、資訊流、例外 | 元素、狀態、文案、流程、線框 | `11–13` | 可產生實際 SCR 路徑 |
| W6 後段 | `11–13`、業務規則 | US-I、AC、原型、走查 | `14–15` | W7 可直接彙整並驗收 |
| W7 | W2–W6 已驗收檔案 | 去重、追溯、鎖定 | `16_spec.md` | W8+ plan 只能依此規劃 |

## 為什麼不是其他方案

### 方案 A：只在 UX 前寫一種 User Story

拒絕。它能表達價值，但不能保證 Story 對到實際 SCR、狀態與例外；學生會在畫面完成後另補無法驗證的故事。

### 方案 B：只在 UX 後寫一種 User Story

拒絕。價值意圖會被畫面決定，且前置的資訊與頁面拆分缺乏可追溯的需求來源。

### 方案 C：把全部內容首次放入 spec.md

拒絕。W7 會變成第二次需求／UX 設計，破壞「每階段輸出是下一階段輸入」的閘門。

### 方案 D：採用 US-B → UX → US-I／AC → spec.md

採用。US-B 提供 UX 的價值約束；UX 提供元素、狀態與 SCR；US-I／AC 將設計轉成可走、可驗收的契約；spec.md 只做整合與鎖定。

## 影響

- W5 必須先完成 `05_decisions.md` 的 SD-01–SD-11，並產出凍結的 `service-design-baseline.md`；W6 `10_tasks.md` 才能開始。
- W6 `10_tasks.md` 必須先有服務需求索引與 US-B；任務句仍是同一檔案的業務推導層。
- `14_stories.md` 必須同時保存 US-B、US-I、AC，並可回指來源與 SCR。
- W7 的 `spec.md` 章節必須引用，而不是重新創造 W6 的資料、資訊、Wireframe 或 AC。
- 教學檢查點從「有沒有寫 Story」改為「baseline 已凍結、US-B 有來源、US-I 有路徑、AC 有狀態／規則」。
- 舊版檔案保留作歷史，不作目前流程的輸入；活動文件以本 ADR 與根目錄流程審計為準。

## 風險與控制

| 風險 | 控制 |
|---|---|
| Blueprint 選項未定案就進 UX | W5 必須完成 SD-01–SD-11；baseline 驗收開放選項 0，W6 不讀 raw `04_blueprint.md` 作方案輸入 |
| US-B 與 US-I 被誤當成兩個需求 | 同一業務編號加 `-B`／`-I`，並在表格保留對應欄 |
| US-I 偷渡新需求 | 每條 US-I 必須指回 US-B 與既有 SCR／任務 |
| AC 變成畫面描述 | 每條 AC 指回狀態、例外或業務規則，至少有一條禁止型 AC |
| spec 漏掉來源 | W7 建立來源—需求—US—AC—SCR 追溯矩陣 |

## 驗證

1. 根目錄 `00_方法論主線與閘門.md` 的 S1–S12 與 G1–G11 必須能指向實際檔案，且 G5 能驗收 SD-01–SD-11 與 baseline。
2. W5 `05_decisions.md` 必須有 11／11 採用方案、理由、代價／限制；`service-design-baseline.md` 必須可回指 W4 選項並且開放選項 0。
3. W6 手冊必須按 `Blueprint baseline → 服務需求索引 → US-B → UX／SCR → US-I／AC` 執行。
4. 原型 `gen-stories.mjs` 產出的 Story 表必須分開顯示 US-B、US-I、SCR 路徑與 AC。
5. W7 文件必須把 `10_tasks`–`15_review` 列為直接輸入，且明確寫出 `spec.md` 不首次設計。
6. 以 `node check-all.mjs`、`node check-spec.mjs` 與跨文件搜尋驗證產物、路徑、命名與順序。

## 回滾

若課堂時間不足，允許先縮減 Design 的展示深度，但不得跳過 `05_decisions.md` 的 SD-01–SD-11 或 `service-design-baseline.md` 的凍結閘門。若兩段式 Story 造成不可接受的負擔，可保留 `US-B` 為唯一業務需求欄，但不得刪除 US-I 的路徑與 AC 來源欄；回滾只縮減表述，不恢復「W4 選項直接進 UX」、「spec 首次設計」或「角色任務等於 User Story」的舊契約。

## 關聯文件

- `00_方法論主線與閘門.md`
- `01_課程總覽/第01週_課程大綱.md`
- `01_課程總覽/課程綱要_第2-16週.md`
- `06_UX設計/adr/ADR-001_任務表述層升級.md`
- `07_Spec/03_CHANGELOG.md`
