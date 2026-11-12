# 115-1 網站前端｜學生教材入口與課程導航

> **用途**：本文件是學生的唯一入口。先從這裡確認本週要做什麼、需要下載什麼、要產出什麼，再進入各週教材。
>
> **目前教材版本**：2026-10-31｜18 檔主線重建版
>
> **目前發布範圍**：W1–W7：服務設計到 Spec

> **教案網站版**：若在課程專案中以 HTTP server 開啟，可使用 `../00_CourseSite/index.html` 作為互動導覽；網站只負責導航與 Prompt 呈現，正式來源仍是本入口、W1–W7 文件與 Prototype。

---

## 0. 先看這裡：你要完成什麼？

這個課程不是先畫畫面，也不是先寫程式，而是把一個服務問題逐步收斂成可以驗收的 `18_spec.md`。

你每週都要回答三個問題：

1. **本週的輸入是什麼？**
2. **本週要產出哪些文件？**
3. **這些產出如何支持下一週？**

如果上游證據不足，不要直接跳到後面的使用者經驗（UX）、線框（Wireframe）或規格（Spec）；先回到缺少證據的階段補齊。
中段回顧時，請閱讀 W1 工具包中的 `00_課程中間回顧與思考框架.md`；它整理從 `01_market.md` 到 `18_spec.md` 的操作細節、常見卡關、術語規則與 SpecKit 銜接方式。

---

## 1. 學生使用順序

每週依照以下順序使用教材：

1. 閱讀本週上課講義。
2. 上課時跟著上課簡報與教師說明。
3. 開啟學生操作手冊，依步驟實作。
4. 下載並使用本週學生工具包。
5. 參照示範案例，但不要直接複製答案。
6. 完成本週產出與驗收條件。
7. 將本週產出保留為下一週的輸入。

> **重要**：數字較大的文件不是「比較進階所以可以先做」。主線必須依序完成。

### 第一次使用教材

請按照以下順序開始，不要自行跳到後面的文件：

1. 先讀本入口文件，了解 W1–W7 與 18 檔主線。
2. 下載 W1 學生工具包，讀上課講義、學生操作手冊與工具包說明。
3. 先建立自己的 `00_project-brief.md`、`00_document-index.md` 與 `00_open-questions.md`。
4. 再進入 W2，從 `01_market.md` 開始產出。
5. 每週完成「閱讀 → 參考示範案例 → 自己實作 → 執行檢查 → 交給下一週」。

### 示範案例的正確用法

示範案例不是可以直接複製的答案。請用它回答「這份文件要解決什麼問題」以及「上游哪個欄位交給下游」；看完後，仍要用自己的服務重新推導。若不知道答案，寫「待確認」並列入 `00_open-questions.md`，不要用想像補成事實。

### 什麼情況要停下來

- 上游沒有來源或證據：回到缺資料的階段。
- 不知道本週產出交給誰：先更新 `00_document-index.md`。
- 文件之間的 ID、狀態或數量不一致：先修正矛盾，不要繼續往後寫。
- 只有畫面、沒有例外狀態或操作後果：回到 `14_elements.md`、`15_UX.md` 或 `16_wireframes/`。

不要先寫 UI、API、資料庫或框架；本課程先建立服務問題與證據鏈。

---

## 2. 18 檔主線：先知道自己要做什麼

| 順序 | 主線文件／目錄 | 主要問題 | 週次 |
|---:|---|---|---:|
| 01 | `01_market.md` | 選哪個市場、機會與限制？ | W2 |
| 02 | `02_persona.md` | 誰有問題、誰決策、誰交付？ | W2 |
| 03 | `03_cjm.md` | 顧客旅程哪裡中斷、最低點在哪？ | W3 |
| 04 | `04_blueprint.md` | 前台背後誰做什麼、如何交接？ | W4 |
| 05 | `05_objects.md` | 服務中有哪些跨角色業務物件？ | W5 |
| 06 | `06_infoflow.md` | 物件如何變更、誰在等、會不會撞？ | W5 |
| 07 | `07_decisions.md` | Blueprint 的候選方案採用哪一個？ | W5 |
| 08 | `08_service-design-baseline.md` | 將選項版服務收斂成唯一基準 | W5 |
| 09 | `09_DESIGN.md` | 視覺與互動的設計契約是什麼？ | W5 |
| 10 | `10_tokens.css` | 如何把設計契約變成可重用尺度？ | W5 |
| 11 | `11_service-requirements.md` | 跨來源服務需求如何索引？ | W6 |
| 12 | `12_role-tasks.md` | 每個角色在什麼狀態對物件做什麼？ | W6 |
| 13 | `13_UserStory-B.md` | 角色／顧客要完成的價值是什麼？ | W6 |
| 14 | `14_elements.md` | 每個任務需要哪些資訊元素與操作？ | W6 |
| 15 | `15_UX.md` | 畫面、狀態、流程如何完整承接需求？ | W6 |
| 16 | `16_wireframes/` | 線框是否真的能走完路徑？ | W6 |
| 17 | `17_UserStory-I_AC.md` | 介面路徑如何落地、如何驗收？ | W6 |
| 18 | `18_spec.md` | 如何交付完整、可追溯的業務規格？ | W7 |

### 三個容易混淆的文件

- `11_service-requirements.md` 是**跨來源需求索引**。
- `12_role-tasks.md` 是**供應側的角色任務契約**，不要和 Spec Driven Development 的實作 `tasks` 混淆。
- `13_UserStory-B.md` 是**需求側的價值／意圖敘述**，不是畫面操作說明。

### US-B、US-I、AC 的順序

```text
CJM 痛點＋角色任務
  → UserStory-B：我要完成什麼價值？
  → UX／Wireframe：實際如何走？
  → UserStory-I：介面路徑是什麼？
  → AC：怎樣算通過？
  → Spec：彙整已驗證契約
```

---

## 3. 七週課程總覽

| 週次 | 主題 | 本週主要產出 | 下一週會使用什麼？ |
|---:|---|---|---|
| W1 | 方法論、證據鏈與檔案規約 | 研究問題、專案假設、文件索引 | W2 市場與 Persona |
| W2 | 市場與 Persona | `01_market.md`、`02_persona.md` | W3 CJM、W4 Blueprint |
| W3 | CJM 顧客旅程 | `03_cjm.md` | W4 Blueprint |
| W4 | 服務藍圖（Service Blueprint） | `04_blueprint.md` 選項版 | W5 物件、資訊流、決策 |
| W5 | 物件、資訊流、決策與 Design | `05`～`10` | W6 需求與 UX |
| W6 | 服務需求、角色任務、User Story、使用者經驗（UX）與線框（Wireframe） | `11`～`17`、validation | W7 規格（Spec） |
| W7 | 規格（Spec） | `18_spec.md` | 後續實作與驗收 |

---

## 3A. AI 輔助教學的課程節奏

上表的 W1–W7 是「教材學習模組」，不一定等於學校行事曆的第 1–7 週。依 AI 輔助教學計畫，教師會把模組分散到完整學期：

- 第 1–2 週：無 AI 基本功前測與基本 HTML／CSS／JavaScript 練習。
- 第 3 週：AI 協作流程不計分試行；先學會記錄 Prompt、來源與錯誤。
- 第 4、6、8、10 週：四次正式追蹤，每次都有「先自己做 → 指揮 AI → 驗證反思」。
- 期中與期末：都會有無 AI 核心任務；AI 不能代替基本功。

可以使用 AI 的階段，仍然要保留上游文件、Prompt、修改理由、Token／回合紀錄與驗證報告。AI 產出不是正式答案；沒有來源的內容必須標為「待確認」。

## 3B. 目前已完成十週後的六週安排

前十週是 AI 協作使用訓練與服務設計主線；接下來六週進入新的資訊架構（Information Architecture, IA）與程式框架領域。前十週不從學習紀錄中刪除，但本次驗證會從新領域重新建立基線。

- 本週：3 分鐘 AI 協作心得分享，完成 `T0_IA-Framework` 無 AI 基線任務。
- 第 11 週：資訊架構、網站地圖、使用流程、路由、元件、狀態與資料流。
- 第 12–15 週：每週一輪「A 無 AI 核心 → B AI 協作 → C 測試與反思」。
- 第 16 週：`T1_IA-Framework` 無 AI 後測、成果發表與學習反思。

可以使用 AI 的部分，仍要保留規格、Prompt、修改理由、Token／回合紀錄與驗證報告。AI 產出不是正式答案；沒有來源的內容必須標為「待確認」。

## 4. 每週教材下載

> 以下已填入每週教材與示範案例的直接 Google Drive URL。學生不需要自行搜尋檔案。
> **Google Drive 課程入口**：<https://drive.google.com/drive/folders/1JO_VocSj2Y_591XUmtWpGFCyBdt2JEob?usp=drive_link>

| 週次 | 整包下載 | 上課講義 | 上課簡報 | 學生操作手冊 |
|---:|---|---|---|---|
| W1 | [學生工具包](https://drive.google.com/file/d/1xA19jIlIt3J5YcVlcOyuvQ6TMqy9fubg/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/1vtk8gTVDe-qIobc4fxBJxZhilrzTKGuM/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1KJa3hnVDWLLaXDE8-x3vRPe4ShYxs0qo/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1dr4OjZQaf0xvUFv025ApmjRZTyAZGEHu/view?usp=drive_link) |
| W2 | [學生工具包](https://drive.google.com/file/d/1oZFluqnMLb8-iGoSchoRcP6ORtE4_YRv/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/19NRi5d3AKBYUvWxHA5TVXq0P9RJW_Td2/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1hobkvbYf5SdmTO6qMokU1KvNO7HKxApa/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/11rojKG3MHzI5iu_yBxtak5gfMk6FquuO/view?usp=drive_link) |
| W3 | [學生工具包](https://drive.google.com/file/d/1JEIlekK5FV4w5X9LgTh1Wi1UC6NKtmbz/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/1AZUZd7lOEE6wIjM5QTPMCj8v4apzQD-s/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1w0rTK29W11TQIl7q3h2VKD5eDov7xa5H/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1JPf6LTacygyG7H9z0D_feilIYP-0UgpE/view?usp=drive_link) |
| W4 | [學生工具包](https://drive.google.com/file/d/1GlXZH5u5s4BkF64azWr3ZfIIIO5v83Xz/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/16oIVnNym61yDnQ_hJ-b44awir59DDF3r/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1qK6w4HgazWVFEF4Bsc3yUaUsHasH6y98/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1G2PF-pDYv82ZJ2lOxN20r4mrl-3U6eIu/view?usp=drive_link) |
| W5 | [學生工具包](https://drive.google.com/file/d/1SRwgEjCl1TEwQXZMV7EIO4ZVeqXX-wYu/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/1S0c8W6gxkBBgQve1OG51TEcW0U-sD7yW/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1w74jWqzkhslj3HuIDp264lNFxuc4xOh_/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1u17ic-GslftICkyfNiICii2xBEVpv9_-/view?usp=drive_link) |
| W6 | [學生工具包](https://drive.google.com/file/d/1q5jAvYVAvKFqZl6aGns0xoK9p3CKzH7u/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/1TAXdYoPuwiGNif3bJvDFWYAKBVnTVNOe/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1hS_Sfx8dSzWbaHQWFMKlqvoJ91GyQo-8/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1cOyUcnVsMvsd6irc20RZ6ZO2aPLlQ68k/view?usp=drive_link) |
| W7 | [學生工具包](https://drive.google.com/file/d/169di0bM81Ea8S17C_hmNWLqjUvW90J6R/view?usp=drive_link) | [上課講義](https://drive.google.com/file/d/16D_o-xlCDJVrGSqYT012vcjIuBRBJsGr/view?usp=drive_link) | [上課簡報](https://drive.google.com/file/d/1Y0unoivAJaLFagJB9kAU4o52uKI9699m/view?usp=drive_link) | [學生操作手冊](https://drive.google.com/file/d/1u41ABLjZHyEQRULWwrFTnxITsLzLI2Tb/view?usp=drive_link) |

### 示範案例

**雲端早餐店｜[18 檔完整示範案例](https://drive.google.com/drive/folders/1Ds41GULb61hQhkJF2tFmd7lZAkpjzy_F/view?usp=drive_link)**

示範案例的閱讀方式：

```text
01_market
→ 02_persona
→ 03_cjm
→ 04_blueprint
→ 05_objects
→ 06_infoflow
→ 07_decisions
→ 08_service-design-baseline
→ 09_DESIGN
→ 10_tokens.css
→ 11_service-requirements
→ 12_role-tasks
→ 13_UserStory-B
→ 14_elements
→ 15_UX
→ 16_wireframes
→ 17_UserStory-I_AC
→ 18_spec
```

---

## 5. 每週課堂操作規則

### W1：建立工作方式

你要完成：

- 了解 18 檔主線
- 建立研究問題與專案假設
- 建立文件索引
- 了解來源定位、ID、版本與修改紀錄規則

### W2：市場與 Persona

你要完成：

- `01_market.md`
- `02_persona.md`

判定完成：

- 市場選擇有來源與理由
- 老闆、顧客、支持系統等角色責任清楚
- Persona 可以支持後續 CJM 與 Blueprint

### W3：CJM

你要完成：

- `03_cjm.md`

判定完成：

- 有完整旅程階段
- 每個階段有行動、接觸點、情緒、痛點與機會
- 能指出情緒最低點

### W4：Blueprint

你要完成：

- `04_blueprint.md`

判定完成：

- 前台、後台、支援與交接清楚
- 失敗點與等待點明確
- 可以保留不同候選方案
- 不要提前替服務做最終決策

### W5：決策與 Baseline

你要完成：

- `05_objects.md`
- `06_infoflow.md`
- `07_decisions.md`
- `08_service-design-baseline.md`
- `09_DESIGN.md`
- `10_tokens.css`

判定完成：

- SD-01～SD-11 共 11 條決策全部定案
- `08_service-design-baseline.md` 不保留未決方案
- 物件、資訊流、角色與決策沒有矛盾
- Design 與 tokens 服從已定案的服務基準

### W6：需求到 UX

你要完成：

- `11_service-requirements.md`
- `12_role-tasks.md`
- `13_UserStory-B.md`
- `14_elements.md`
- `15_UX.md`
- `16_wireframes/`
- `17_UserStory-I_AC.md`

判定完成：

- 每條需求有來源
- 每列角色任務都有物件、狀態、決策與時效
- 每條 US-B 都有角色、成果、以便與來源
- 每個操作元素都有成功、失敗與狀態後果
- Wireframe 能實際走完路徑
- US-I 與 AC 能回指狀態與業務規則

### W7：Spec

你要完成：

- `18_spec.md`

判定完成：

- 不重新開啟上游服務決策
- 每條需求有來源與驗收條件
- 技術實作名詞不進入業務 Spec
- 需求、Story、AC、UX 與線框可以互相追溯

進入 SpecKit 前，先確認 `18_spec.md` 不是孤立文件。它要和 User Story／AC、UX、Wireframe／Prototype、Design、tokens、theme 與 validation 證據一起使用；不必把所有內容複製到同一份 spec，但每個引用都必須能開啟、能追溯。

---

## 6. 不要犯的錯

- 不要跳過 `07_decisions.md` 直接畫 UX。
- 不要把 `04_blueprint.md` 的候選方案當成已定案方案。
- 不要把 `service-requirements`、`role-tasks`、`UserStory-B` 合併成一張表。
- 不要在 UserStory-B 裡寫按鈕、頁面或 API。
- 不要在 `18_spec.md` 才第一次決定服務規則。
- 不要只檢查「有沒有畫面」，還要檢查狀態、例外與操作後果。
- 不要使用歷史封存中的舊檔案當作現行輸入。

---

## 7. 版本與修改紀錄

| 日期 | 版本 | 變更 |
|---|---|---|
| 2026-10-31 | 18 檔主線重建版 | W1–W7 重新分群、主線連續編號、加入決策與 Baseline 檢查點 |
| 2026-10-31 | Drive 連結版 | W1–W7 教材、示範案例與課程入口已填入直接 Google Drive URL |

> 若教材連結失效、內容與課堂說明不一致，請先回報「週次、檔名、連結」，不要自行使用歷史版本替代。
