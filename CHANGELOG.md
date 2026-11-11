# CHANGELOG
## 2026-11-11｜課程中間回顧、學生思考框架與術語修正

### 變更

- 新增 `00_課程中間回顧與思考框架.md`，整理本次從 `01_market.md` 到 `18_spec.md` 的完整檢視、學生卡關點、文件責任、validation 證據與 SpecKit 銜接。
- 方法論主線文件改用 `00_方法論主線與檢查點.md`，統一使用「檢查點（checkpoint）」。
- W1 工具包新增中段回顧文件，入口、W1、W5、W6 文件同步更新引用。
- 新增跨文件完整性檢查 `07_W07_Spec/18_spec/check-project-integrity.mjs`，補上正式檔、Prototype、SCR 數量、validation、Design audit 與 pending 狀態檢查。
- 示範案例指定 `17_UserStory-I_AC.md` 為唯一正式檔；移除平行 `generated` 檔，Prototype 由 `story-data.js` 產生並驗證正式檔。
- 補上動態線框操作手冊、遠距顯示契約、Design 審查紀錄與 validation 報告；`18_spec.md` 同步為 11/11 畫面、53 個元素。
- 不使用自行縮寫；拆解與測試統一寫成「拆解並測試（decompose and test）」。
- 學生入口補上「從 W1 開始、依週次實作、示範案例只作對照、遇到證據不足要回上游」的學習引導；W1 講義與操作手冊同步加入相同流程。
- 新增 `00_教案網站/` 學習導航網站：包含 W1 起步、18 檔主線、19 個學習節點、每階段 AI 參考 Prompt、文件連結、進度標記與搜尋。
- 新增 `00_教案網站/reader.html` 與閱讀器資產，使用固定版本的 marked、DOMPurify、Mermaid；教材連結可進入美化閱讀頁，並保留原始 Markdown 連結與檔案白名單。
- 建立 GitHub repository／Pages 部署基礎：根目錄入口、`.nojekyll`、`.gitignore`、`.github/workflows/deploy-pages.yml` 與 repository README；網站以完整 repository 為靜態根目錄。

### 驗證

- 已檢查現行主線引用，舊檔名改為 `00_方法論主線與檢查點.md`。
- 已重新建立 W1–W7 學生工具包；W6 含 Prototype 整合操作手冊與遠距顯示教學，W7 含跨文件完整性檢查腳本。
- `check-rebuild.mjs` PASS；示範案例的 Prototype 四層檢查、23/23 AC、Spec 檢查與跨文件完整性檢查 PASS。
## 2026-11-10｜決策與檢查點用語整理

### 變更

- 將現行文件中不符合台灣課程語境的決策檢查用語，改為「檢查點」或具體的「輸入檢查／完成條件」。
- 將 Blueprint baseline 改寫為「Blueprint 的服務基準（service baseline）」。
- 保留 `99_歷史封存/` 的歷史文件與既有主線檔名，不改動封存內容或路徑。

### 驗證

- 現行文件不再使用舊的決策檢查用語。
- `node package-student.mjs` 已重建 W1–W7 學生工具包。

## 2026-10-31｜18 檔主線與週次目錄重建

### 變更

- 將主線文件固定為 `01_market.md`～`18_spec.md`，並按 W1–W7 重新分群。
- 將角色任務正式命名為 `12_role-tasks.md`，避免與規格驅動開發（Spec-Driven Development，SDD）的 tasks 混淆。
- 保留 `11_service-requirements.md`、`12_role-tasks.md`、`13_UserStory-B.md` 三個不同層次：需求索引、供應側任務、需求側價值敘述。
- 將 `review` 降為 `validation/` 檢查活動，不列入主線編號。
- 將 US-I 與 AC 合併在 `17_UserStory-I_AC.md` 的不同章節，維持教學連續性。
- 把 Blueprint 的候選方案透過 `07_decisions.md` 的 SD-01–SD-11 定案，再整併成 `08_service-design-baseline.md`。
- 重寫第 1 週完整課程大綱，補上每一階段的輸入、作法、產出與檢查理由。
- 建立 `98_示範案例/雲端早餐店/` 的 18 檔完整案例。
- 將重建前現行樹完整封存至 `99_歷史封存/20261031_重建前/`，並保留 SHA-256 manifest。

### 驗證

- 封存前後 449 個檔案內容與雜湊一致。
- 新樹的 18 檔順序、週次入口、示範案例與工具包清單需由 `package-student.mjs`、主線檢查腳本與 W6／W7 smoke checks 驗證。

## 2026-10-31｜Prototype 操作回饋持續顯示

### 變更

- 修正 `scr-02-menu` 加入購物車後提示只顯示約 700ms、無法閱讀的問題。
- 將 active prototype 與 `98_示範案例/雲端早餐店/` 的共用動態回饋改為持續顯示。
- 沒有導頁或 `applyState` 的操作，完成後保留操作面板，直到使用者按「關閉」。
- toast 提示現在包含明確的「關閉」按鈕，並補上 `role="status"` 與 `aria-live="polite"`。
- 移除 toast 自動淡出／自動刪除計時，避免其他操作回饋出現後立即消失。

### 驗證

- active prototype 與示範案例同步更新。
- W6 四層 prototype 檢查、入口頁／走查台 smoke check 與負向測試均需重新通過。

## 2026-10-31｜學生 Google Doc 入口草稿

### 變更

- 新增 `00_學生發布版/00_學生教材入口_GoogleDoc.md`，作為學生唯一入口與唯一維護來源。
- 首頁加入 18 檔主線簡化表，讓學生先理解每個階段要做什麼、核心問題與週次。
- 加入 W1–W7 課程總覽、每週產出、驗收條件、下載索引與示範案例閱讀順序。
- 已確認學生發布資料夾：`https://drive.google.com/drive/folders/1JO_VocSj2Y_591XUmtWpGFCyBdt2JEob?usp=drive_link`。
- 入口下載表改為填入 W1–W7 四類教材的 28 個直接 Drive URL，示範案例補上直接資料夾 URL。
- 移除會從根目錄複製入口文件的 `prepare-student-release.mjs`，避免入口文件產生兩個維護位置。
- 已確認 Drive 中的 `00_學生教材入口_GoogleDoc.md` 已更新，最新檔案大小 8 KB，修改時間顯示為上午 8:41。
- 驗證入口文件不再含有 `待填入`、`尚未逐一建立` 或空白連結；共檢出 30 個 Drive URL。
- 刪除專案根目錄的 `00_學生教材入口_GoogleDoc.md` 副本；入口文件只保留在 `00_學生發布版/`。

## 2026-10-31｜W5 Design 四個 Prompt 參考補齊

### 變更

- 新增 `05_W05_物件決策與Design/00_W05_PROMPTS.md`，集中提供 Prompt 1～4 的完整可貼用版本、輸入、輸出、操作規則與人工檢查。
- 新增 `05_W05_物件決策與Design/09_DESIGN/stitch-prompt-checklist.md`，提供 Prompt 4 使用的 13 項驗證清單，並區分幻覺與設計推導。
- 在 W5 上課講義、學生操作手冊、START_HERE 與教師教學指引中明確標示四個 Prompt 的執行順序與檔案位置。
- 更新 `08_service-design-baseline/08_baseline_README.md`，明確要求以集中版 Prompt 參考檔執行。
- 同步 `00_學生發布版/05_W05_物件決策與Design/` 的學生講義、操作手冊、Prompt 參考檔與驗證清單。
- 重建 W1–W7 學生工具包；W5 工具包現在包含 21 個檔案及新增 Prompt／驗證資料。

### 驗證

- `node package-student.mjs` 成功重建 7 個週次工具包。
- W5 工具包輸出為 21 個 entries；發布版 ZIP 已同步。
- 講義與操作手冊均能導向 Prompt 1 → 2 → 3 → 4，並明確連接到 `09_DESIGN.md`。

### Google Drive 需重新上傳

- 替換 `00_W05_上課講義.md`。
- 替換 `00_W05_學生操作手冊.md`。
- 新增 `00_W05_PROMPTS.md`。
- 新增 `09_DESIGN/stitch-prompt-checklist.md`。
- 替換 `00_W05_學生工具包.zip`。
- `00_W05_上課簡報.pptx` 本次未修改，不需重傳。

## 2026-10-31｜W1–W7 學生操作手冊升級

### 變更

- 將 W1–W7 的學生操作手冊由簡短任務摘要提升為可獨立執行的操作指南。
- 每週手冊統一補上：輸入檢查、輸入／輸出鏈、逐步操作、範本欄位說明、AI Prompt、人工判斷、交付檢查、下週交接與缺資料退回規則。
- W1 補上專案工作區、`00_project-brief.md`、`00_document-index.md` 與 `00_open-questions.md` 的建立方式。
- W2–W4 補上研究工作表、CJM、Blueprint 的逐欄填寫、來源標注與候選方案規則。
- W5 補上 `05_objects`、`06_infoflow`、SD-01～SD-11、四個 Prompt、Stitch 匯出與 `DESIGN.md` 整併流程。
- W6 補上 `11`～`17` 的完整推導鏈、元素十一欄、六態、線框推展、prototype 指令、validation 與 US-I／AC。
- W7 補上十章 Spec 的逐章整理、REQ 追溯表、`check-spec.mjs`、人工交叉審查與 plan 邊界。
- 同步 `00_學生發布版/` 中 W1–W7 的七份學生操作手冊。
- 新增 `adr/ADR-008_學生操作手冊可執行化.md`，將「可獨立執行」確立為學生手冊交付契約。

### 驗證

- 七份來源版手冊均已寫入並同步至學生發布版。
- 每週手冊均明確列出正式輸出檔案、下游輸入與交付檢查。
- `node package-student.mjs` 已成功重建 W1–W7；新版手冊已封裝並同步至七個學生工具包。
