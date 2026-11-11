# prototype／螢幕原型（HTML 版線框）

> **入口**：先開 `index.html` —— 一頁看全 10 條故事、21 個動作、13 條自動檢查。

> 把 `UX.md` 的 11 個螢幕做成**可切換狀態的 HTML 線框**。
> 不是最終實作，是「規格的可執行版本」——用 Design.md 的 token 長出來的線框。

---

## 一、現況（11／11 完成）

| 目錄 | SCR | 端 | 深度 | 狀態數 |
|---|---|---|---|---|
| `scr-01-home/` | SCR-01 首頁 | 顧客 375 | L2 | 5 |
| `scr-02-menu/` | SCR-02 菜單 | 顧客 375 | L2 | 5 |
| `scr-03-checkout/` | SCR-03 下單確認 | 顧客 375 | L3 | 6 |
| `scr-04-payment/` | SCR-04 結帳 | 顧客 375 | L3 | 6 |
| `scr-05-order-status/` | SCR-05 訂單狀態 | 顧客 375 | L3 | 6 |
| `scr-06-staff-orders/` | SCR-06 店員訂單台 | 店員 768 | L3 | 6 |
| `scr-07-kds/` | SCR-07 廚房顯示器 | 廚房 1920 | L3 | 6 |
| `scr-08-pickup-board/` | SCR-08 取餐看板 | 設施 1920 | L2 | 6 |
| `scr-09-locker/` | SCR-09 取餐櫃面板 | 設施 768 | L1 | 5 |
| `scr-10-menu-admin/` | SCR-10 菜單維護 | 老闆 768 | L1 | 6 |
| `scr-11-report/` | SCR-11 銷售報表 | 老闆 768 | L1 | 4 |

> 深度決定狀態數：**L3 六態、L1／L2 至少三態**。每一頁的取捨都寫在該頁 README。
> 例：SCR-09 沒有 empty（面板沒有「沒有資料」的情境）；SCR-11 只做 4 態（success 與 default 同義）。


## 二、目錄與檔案

```
prototype/
├── assets/
│   ├── tokens.css            ← Design.md 的 token（同步自範例）
│   ├── tokens-display.css    ← 遠距尺度（來自 DESIGN-DISPLAY.md）
│   ├── base.css              ← 共用結構（topbar／狀態切換／按鈕／卡片）
│   ├── wire.css              ← 線框模式（去飽和）與開發列
│   ├── state-switcher.js     ← 共用六態切換與畫布縮放
│   └── README.md
├── scr-05-order-status/
│   ├── index.html
│   ├── screen.css            ← 只放這一頁的專屬樣式
│   └── README.md             ← SCR、六態、MSG、業務規則
├── lint-tokens.mjs
└── README.md
```

**規則**：共用的一定放 `assets/`，每頁只寫「這一頁才有的東西」。
11 個目錄不能長出 11 種寫法。

---

## 三、五條硬規則

| # | 規則 | 怎麼檢查 |
|---|---|---|
| 1 | **只能用 token**，不得寫死色碼／間距 | `node lint-tokens.mjs`：未定義 token＝0、寫死色碼＝0、>2px 硬寫＝0 |
| 2 | **六態可切換**：`?state=default\|loading\|empty\|error\|success\|interrupted` | 逐一打開 6 個網址 |
| 3 | **灰階優先**：`?mode=wire` 或開發列切換 | 先看灰階，再看彩色 |
| 4 | **端別尺寸**：顧客 `375`／店員 `768`／KDS 與看板 `1920` | 看 `class="app app--tablet\|app--display"` |
| 5 | **HTML 不取代 AC** | 驗收仍以 `stories.md` 為準 |

> 1–2px 的髮絲線與進度線允許硬寫（lint 只擋 >2px）。

---

## 四、自動檢查

```
node lint-tokens.mjs
```

檢查：未定義的 token、寫死的色碼、>2px 的硬寫、狀態數是否符合深度、是否載入共用 JS。
目前 **11 個畫面全部 0 error／0 warning**。

---

## 四.5 裝置與互動能力（必看）

| # | 介面 | 距離 | 輸入 | 對應畫面 |
|---|---|---|---|---|
| T1 | 手機 | 30–40cm | 觸控 | scr-01～05 |
| T2 | 平板 | 60–80cm | 觸控 | scr-06／10／11 |
| T3 | 取餐櫃面板 | 約 1m | **觸控＋數字鍵＋掃碼** | scr-09 |
| T4 | KDS | 1.5–2.5m | **觸控（可戴手套）** | scr-07 |
| T5 | 看板 | 3–5m | **無** | scr-08 |

> 「遠距」不等於「不可操作」：**只有 T5 不能操作**。
> 完整規則見 `../13_裝置與互動能力矩陣.md`。

---

## 四.6 可走的故事

| 檔案 | 用途 |
|---|---|
| `assets/story-data.js` | **機器可讀單一來源**：stories（路徑）／actions（意圖、會改什麼、AC）／checks（可執行檢查） |
| `gen-stories.mjs` | 從 `story-data.js` 更新正式 `17_UserStory-I_AC.md` 的自動區段；不要建立 generated 平行檔 |
| `assets/story-runner.js` | 瀏覽器端：故事模式、稽核模式、動作面板、檢查執行 |
| `verify-stories.mjs` | 靜態驗證：結構 ＋ 內容（PASS／FAIL） |
| `selftest-stories.mjs` | 負向測試：故意做錯，確認檢查會紅 |

**怎麼看**

| 網址 | 模式 |
|---|---|
| `scr-07-kds/index.html?story=US-09` | 故事模式：高亮這條故事的元素，顯示「第 n／m 步」 |
| `scr-07-kds/index.html?mode=audit` | 稽核模式：列出本頁動作與 AC，可按「執行檢查」 |

**目前已定義**：5 個動作（goto-checkout／submit-order／kds-complete／staff-confirm／locker-open）＋ 5 條自動檢查（AC-11／12／13／14／22）。

**錨點約定**：會被斷言的元素要標 `data-pickup-no`／`data-locker-no`／`data-locker-code`，
這樣「不得出現」才能被檢查（`notHas`）。

> 本案把「取餐號碼」與「櫃位」**併**成同一個編號（A-03）——正好是物件增刪修併裡「併」的例子。

---

## 四.6b 動作會真的跑（不是靜態截面）

| 動作類型 | 行為 |
|---|---|
| 內部跳頁 | 顯示「→ 前往 SCR-xx」提示後跳轉 |
| **外部系統**（前往付款） | **不跳頁**，先說明會去哪；選「模擬成功／失敗」決定結果 |
| 改資料 | 顯示意圖與 AC → 進入 loading（按鈕停用）→ 1.5–2.5 秒後才套用 |
| 操作回饋提示 | 持續顯示；使用者按「關閉」後才消失，不使用自動計時 |

每個可點元件都有 `title` 說明（滑過去就看得到），內容來自 `story-data.js` 的 `notes`。

## 四.7 怎麼跑（兩種方式）

| 方式 | 步驟 | 會看到 |
|---|---|---|
| **A. 瀏覽器即時** | 開 `index.html` → 任一條故事按「開始走」，或在檢查表右側按「稽核」→ 頁面上方出現稽核列 → 按「執行檢查」 | 當頁 PASS／FAIL，含「通知次數 0」這種執行時斷言 |
| **B. 終端機** | 在此資料夾執行 `node verify-stories.mjs`（另可跑 `lint-tokens.mjs`／`selftest-stories.mjs`） | 產生 `assets/checks-report.js`，重新整理入口頁就會更新 |

**入口頁顯示的是「上一次終端機執行的結果」**，不是即時重算——所以改過畫面要重跑 B，或用 A 現驗。

走查台：開 `review.html` → 勾選並填證據 → 按「複製報告」→ 貼進 `assets/review-report.js`。

### 驗證腳本一覽

| 指令 | 檢查什麼 |
|---|---|
| `node lint-tokens.mjs` | 版面規範：未定義 token、寫死色碼、>2px 硬寫、狀態數 |
| `node gen-stories.mjs` | 由 `story-data.js` 更新正式 `17_UserStory-I_AC.md` |
| `node verify-stories.mjs` | 故事與 AC：結構＋內容，輸出 23 條 PASS／FAIL |
| `node selftest-stories.mjs` | 負向測試：故意做錯，確認檢查會紅 |
| `node check-all.mjs` | **一支指令跑完四層**（業務／資訊／版面／實作＋負向），結果寫進入口頁 |
| `node smoke-dom.mjs` | 用假 DOM 跑入口頁與走查台，確認頁面會正常渲染 |

## 五、怎麼開

純靜態，直接開 `scr-05-order-status/index.html`。
參數：`?state=error&mode=wire`；遠距畫面可加 `&fit=0.4`。

> 遠距畫面（KDS／看板）用 `transform: scale()` 縮到視窗內，所以**看得到 1920 的完整版面**，
> 但「4 公尺可讀性」仍要用 `縮到 1/5` 的方式測（見 `../../DESIGN-DISPLAY.md`）。

---

## 六、AI 協作

| 步驟 | 誰 | 內容 |
|---|---|---|
| 1 | 人 | 給 AI：該頁 ST 表 ＋ token 名 ＋ 線框草圖 |
| 2 | AI | 產生 `index.html／screen.css`，只用 token、六態齊 |
| 3 | 人 | 跑 lint ＋ 看六態 ＋ 對 MSG ＋ 鍵盤走查 |
| 4 | 人 | 灰階 3 秒測試 |

> AI 最常犯三個錯：①寫死 hex ②只做 happy path ③把「可取餐」寫在製作中狀態。
