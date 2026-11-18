# CHANGELOG
## 2026-11-13｜SDD 技術教學主線重整

### 變更

- 將第 11–16 週主線改為單一整合服務的 SDD 證據鏈：`01_market.md`～`17_UserStory-I_AC.md`、Prototype、Design、UX、validation → `constitution.md` → `18_spec.md`（本課程系統級 `spec.md`）→ `research.md` → `plan.md` → `tasks.md` → AI implement → 測試與架構驗證；垂直切片留在同一條鏈內。
- 將資訊架構導讀納入 `research.md`：client/server、HTML／CSS／JavaScript、CSS framework、React、非同步、Zod schema、RESTful／gRPC 與 serverless database。
- 移除以固定 A／B／C 四輪作業綁架第 11–16 週教學的規劃；研究指標改為嵌入 SDD 交接點，成功或失敗都如實記錄。
- 修正前一版把 GitHub Spec Kit 的 feature-oriented 預設誤當成課程必要拆分的解讀：`18_spec.md` 同時是服務級總規格與本課程系統級 SDD `spec.md`；不另建立彼此獨立的 feature spec／research／plan，再事後整合。
- 補強 W6→W7 的 Prototype 教學交接：正式文件 → `tasks.js`／`elements.js`／`story-data.js` → Node 產生工具 → 自動驗證 → 瀏覽器人工走查 → validation 證據。
- 修正雲端早餐店示範案例的追溯漂移：`story-data.js` 明確記錄 `usBIds`；11 條 US-I 覆蓋 10 條 US-B，US-B-03 由成功／失敗兩條 US-I 分支實作；補上 US-B-10 的菜單／報表 US-I 與 AC-24／AC-25。
- 同步 W6／W7 週次教材、學生發布版、`18_spec` 範例與 validation 證據；舊的 23 AC／20 REQ 摘要已移除，七個學生工具包重新封裝。
- 課程網站 `00_CourseSite` 擴充 W11–W16 的 SDD 交接導航，新增 `research.md`、`plan.md`、`tasks.md`、實作驗證與 T1 反思的階段、Prompt、文件連結與進度地圖。
- TASK-001 明確記錄 RQ-01～RQ-05 的第一階段決策邊界，並同步 `research.md`、`plan.md` 與 `tasks.md` 的交接限制。
- 課程網站改為交互參照學習網站與示範專案入口：每個節點可查看上游／下游／跨階段關係、教材文件與 Prototype／validation／SDD 快捷入口。
### 驗證

- `node --check 00_CourseSite/assets/guide-data.js` PASS。
- 已檢查 `18_spec.md` 的十章、來源／AC／驗證契約，以及 `check-spec.mjs` 的對應定義。
- 已檢查教師方案、學生入口與課程導航的 SDD 交接順序與第 10／11 週敘述一致；舊的 Phase 1 A／B／C 與 `T0_IA-Framework` 規劃已移除。
- Prototype 架構圖與 `01_market`→`18_spec` 流程圖的 HTML 檢查 PASS；兩份 Archify candidate 的 showcase validation PASS。
- 課程網站瀏覽器驗證：25 個階段顯示、W11–W16 導覽可用、43 個文件連結回應 200。
- 交互參照驗證：25 個節點、29 條關係、17 個示範入口、所有示範檔案存在；瀏覽器實測 User Story-I、Prototype 與驗證報告連結可開啟。


## 2026-11-12｜第 10 週 AI 協作分享紀錄修正

### 變更

- 將「每位學生 3 分鐘分享：2 分鐘說明 AI 協作方式、1 分鐘說明 AI 幫不上忙的地方」標記為第 10 週已完成活動。
- 修正剩餘六週安排：第 11 週改為 `T0_IA-Framework` 無 AI 基線與資訊架構導入，不再重複列入分享。

### 驗證

- 已檢查教師方案與學生入口的週次敘述一致。

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
- 新增 `00_CourseSite/` 學習導航網站：包含 W1 起步、18 檔主線、19 個學習節點、每階段 AI 參考 Prompt、文件連結、進度標記與搜尋。
- 新增 `00_CourseSite/reader.html` 與閱讀器資產，使用固定版本的 marked、DOMPurify、Mermaid；教材連結可進入美化閱讀頁，並保留原始 Markdown 連結與檔案白名單。
- 建立 GitHub repository／Pages 部署基礎：根目錄入口、`.nojekyll`、`.gitignore`、`.github/workflows/deploy-pages.yml` 與 repository README；網站以完整 repository 為靜態根目錄。
- 補上 GitHub Pages 第一次啟用的操作：repository Settings → Pages → Source 選擇 GitHub Actions。
- 補充 Pages API 回傳 `Get Pages site failed` 時的處理：先以 `main`／`/(root)` 暫時啟用 branch publishing，再切回 GitHub Actions；不新增 Jekyll 或 Static HTML 的重複 workflow。
- GitHub Pages 已可使用；教學網站入口為 `https://nschou.github.io/115-1-WebFrontEnd/00_CourseSite/index.html`。
- 將 `.archify/` 中三張互動架構圖整合到 `00_CourseSite` 首頁，依序呈現 `01_market → 18_spec` 流程、Prototype 前端架構與示範服務系統架構；首頁以 iframe 嵌入，並保留另開完整互動圖連結。
- 新增 `00_AI輔助教學計畫對應與課程執行方案.md`，將附件計畫轉成 16 週課程、雙層能力、四輪追蹤、無 AI 前／中／後測、AI 教練 Prompt、評量與研究證據要求；學生入口補上教材模組與學期週次的區分。
- 重新對齊原計畫六個期程階段：第 11 週基線、第 12 週工作坊一、第 13 週試行、第 14 週工作坊二、第 12–15 週穿插四輪正式運作、第 16 週兩階段上機考；績效指標從 IA／框架新領域的 T0 開始收集。
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

---

## 2026-11-14｜第 1–3 步：交付物收斂（18 → 6）

| 步 | 產出 |
|---|---|
| 1 | `00_CourseSite/deliverables.html`（完整對照）＋首頁新區塊「你只需要交出 6 份」 |
| 2 | `06_W06_UX/16_wireframes/prototype/impact.mjs`（改 AC／頁面／元素／任務 → 受影響清單） |
| 3 | `98_示範案例/雲端早餐店/D_交付物/`（D1–D6）＋`gen-deliverables.mjs`＋案例索引 |

**設計原則**：18 檔是推理順序、6 份是交付清單；D1–D6 由上游**產生**，不手寫第二份真相。

**驗證**：`check-rebuild.mjs` 已把 D1–D6 列為必要產物；四層檢查全綠。
---

## 2026-11-14｜留痕三項：依據欄、依據檢查、被否決候選

| # | 項目 | 結果 |
|---|---|---|
| 1 | `18_spec`（案例＋範例）需求表加 **依據** 欄 | 22 條全部指回 SD-01–11 |
| 2 | `check-spec.mjs` 新增「②b 需求依據」 | 缺依據或指到不存在的決策 → 紅燈 |
| 3 | `04_blueprint` 新增「被否決的候選與理由」（R-1～R-5）＋`check-rebuild` 驗證 | 少於 2 條 → FAIL |
| 4 | `D1_決策書` 產生器一併輸出被否決候選 | D1 現在同時有「採用」與「不採用」 |

**量化**：`18_spec` 的 SD 引用從 **2 次 → 26 次**（理由有了出口）。

**為什麼**：只記「做了什麼」會失憶；要記「為什麼不是另一個」——那是三端（業務／開發／AI）唯一共同需要的深度。
---

## 2026-11-14｜修復教材閱讀器（Markdown＋Mermaid）

**症狀**：閱讀器停在「正在載入文件…」，不顯示任何內容。

**根因**：`00_CourseSite/assets/reader.js` 的 `extraFiles` 宣告被刪，但 `allowed` 仍引用它 → 載入即 `ReferenceError: extraFiles is not defined`，整個 IIFE 中止。

| 修正 | 內容 |
|---|---|
| 補回宣告 | `extraFiles = [學生教材入口、課程中間回顧]`（與 `demoLinks` 併入白名單） |
| 離線降級 | CDN（marked／DOMPurify）不可用時改顯示原始文字，不再整頁失敗 |
| file:// 提示 | 用 `file://` 開啟時明確說明 fetch 會被封鎖 |
| 新增檢查 | `check-site.mjs`：假 DOM 跑 reader 管線（連線／離線兩種）＋站內連結斷鏈檢查 |

**驗證**：`node check-site.mjs` 全部通過；`check-rebuild.mjs` PASS。

---

## 2026-11-15｜check-all.mjs：交件前單一入口

| 項目 | 內容 |
|---|---|
| 新增 | 根目錄 `check-all.mjs`，一次跑五項檢查並給結果表 |
| 包含 | 物件對接、教材結構、教學網站、總規格、原型四層（含負向測試） |
| 參數 | `--quiet`／`--json`／`--only=<names>`／`--list` |
| 修正 | 安靜模式以工作區暫存檔擷取輸出（沙箱環境不能開管線） |
| 實測 | 5 項全綠，約 2–3 秒 |


---

## 2026-11-15｜一頁流程圖上線，列為 W1 指定閱讀

| 項目 | 內容 |
|---|---|
| 新增 | `00_CourseSite/flow.html`：紙筆 → 畫面 → 契約（三層卡、紙筆五題、兩個極限、資訊釋放、spec 四條件、OOA/OOD 接縫） |
| 首頁 | hero 加「看一頁流程圖」；新增「先紙筆，再畫面，最後才是契約」面板；footer 加連結 |
| 導覽 | `deliverables.html`、`reader.html` topbar 加「一頁流程圖」 |
| W1 | 講義（兩份）新增 §0.1「開課前先看」；操作手冊（兩份）加 5 分鐘提示 |
| 修正 | `reader.js`：非 .md 的同源連結改為絕對網址（否則以 reader.html 為基準解析會錯） |
| 檢查 | `check-site.mjs` 納入 `flow.html`（8 連結、3 個閱讀器連結） |


---

## 2026-11-16｜用語檢查：數字要有主詞

| 項目 | 內容 |
|---|---|
| 新增 | `check-wording.mjs`：①「≤1 秒」沒說誰／看到什麼 → 錯誤 ②隱喻（防塞車、骨牌、打臉…）→ 錯誤 ③術語裸用（冪等、快照、降級…）→ 警告 |
| 修正 | W2 講義「第一張骨牌」→ 起點／問題；W5「打臉」→ 矛盾；W5 手冊與 06_infoflow README 的「≤1 秒」補主詞 |
| 整合 | `check-all.mjs` 加入第 6 項「用語」，交件前一次檢查 |
| 實測 | 195 份文件，0 錯誤 |


---

## 2026-11-16｜用語檢查升級為 strict（術語也要展開）

| 項目 | 內容 |
|---|---|
| 詞彙 | 16 份文件在開頭加「名詞：降級／冪等／快照／競態…」一句話展開 |
| 規則 | `check-wording.mjs` 改為「每份檔案第一次出現要展開」，之後可用術語 |
| 升級 | `check-all.mjs` 的用語檢查改用 `--strict`（警告＝錯誤） |
| 豁免 | `CHANGELOG.md`（會引用舊說法）、`00_名詞展開`（本身就是定義） |
| 修正 | 掃描器誤將 Markdown 註記插入 4 個 HTML 檔 → 已移除，並限制只掃 `.md`、跳過點開頭目錄 |
| 實測 | 157 份 md，0 錯誤、0 警告；6 項檢查全綠 |


---

## 2026-11-16｜教材索引改為 data-driven

| 項目 | 內容 |
|---|---|
| 新增 | `00_CourseSite/assets/materials-data.mjs`：教材索引唯一來源（11 筆） |
| 新增 | `gen-materials.mjs`：由資料檔產生 `materials.html` |
| 檢查 | `check-site` 新增：①索引目標檔存在 ②materials.html 與資料同步（未同步會紅） |
| 入口 | 首頁、flow、deliverables、reader 的導覽都加「教材索引」 |
| 流程 | 改資料 → `node gen-materials.mjs` → `node check-all.mjs` |


---

## 2026-11-18｜首頁分層：00 顯示全部，01–25 只留導覽與階段內容

| 項目 | 內容 |
|---|---|
| 標記 | 三層框架、六份交付物、全域架構、AI 規則、主線地圖 → 加 `home-only` |
| 行為 | `site.js` 依當前階段切換：00 顯示全部；01–25 只顯示 hero 與階段詳情 |
| hero 錨點 | 「先看全局架構」「先看 AI 使用規則」兩顆按鈕也只在 00 顯示 |
| 檢查 | site.js 語法通過；六項檢查全綠 |


---

## 2026-11-18｜每個階段頁＝該堂課的操作台

| 項目 | 內容 |
|---|---|
| 新增 | `GUIDE_SESSION`：階段 19–25 放入前測、後測、講義、手冊、作業單、每週流程 |
| 預設 | 階段 00–18 自動顯示當週講義與操作手冊（W1–W7） |
| 渲染 | `site.js` 在階段詳情加「本堂課（依序完成）」區塊：前測 → 教材 → 後測 → 作業 |
| 檢查 | `check-site` 新增階段連結檢查：測驗 id 存在、連結與作業單檔案存在 |
| 結果 | 7 個階段連結全部有效；六項檢查全綠 |
