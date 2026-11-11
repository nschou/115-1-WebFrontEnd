# 教案網站｜學生學習導航

這是課程教材的導覽層，不取代 Markdown、Prototype 或檢查腳本。

## 目前功能

- W1–W7 學習路線與 18 檔主線導覽
- 每個階段的目標、輸入、產出、交接與常見卡關
- 每個階段一份 AI 參考 Prompt，共用「不得虛構、先列缺口、要求追溯、人工驗證」規則
- `reader.html` Markdown 閱讀器：標題、表格、清單、程式碼、引用與 Mermaid 圖表
- 閱讀器保留原始檔連結，並以 `guide-data.js` 的文件清單作為白名單
- 既有學生教材、示範案例、Prototype 與完整性檢查工具入口

## 啟動

從專案根目錄啟動靜態伺服器：

```bash
npx serve .
```

再開啟：

```text
00_CourseSite/index.html
```

也可以使用任何能提供靜態檔案的 HTTP server。不要直接以 `file://` 開啟，否則部分瀏覽器會限制連結與剪貼簿功能。

`reader.html` 使用固定版本的 jsDelivr CDN 載入 marked、DOMPurify 與 Mermaid；需要網路才能將 Markdown 與 Mermaid 渲染成閱讀畫面。無法載入 CDN 時，閱讀器會顯示錯誤，不會把未清理的 HTML 直接插入頁面。

## GitHub Pages

本專案的 GitHub Pages workflow 會以 repository 根目錄部署，網站入口為：

```text
https://nschou.github.io/115-1-WebFrontEnd/
```

根目錄 `index.html` 會導向 `00_CourseSite/index.html`。不要只上傳 `00_CourseSite/` 子目錄，因為閱讀器需要讀取同一 repository 內的教材 Markdown、Prototype 與檢查工具。

第一次啟用 GitHub Pages 時，請在 repository 的 **Settings → Pages → Build and deployment → Source** 選擇 **GitHub Actions**。設定完成後，`.github/workflows/deploy-pages.yml` 會在 `main` 推送時自動驗證並部署。

若 workflow 在 `actions/configure-pages@v5` 顯示 `Get Pages site failed` 或 `Not Found`，先在 **Settings → Pages** 暫時選 **Deploy from a branch**，指定 `main` 與 `/(root)`。若 **Save** 是灰色，先重新整理；若兩個值本來就是 `main`／`/(root)`，通常表示沒有新的設定變更，並需確認目前登入帳號具有 repository 管理權限。本 repository 的擁有者是 `nschou`。Pages site 建立後，再改回 **GitHub Actions**。不要按 Jekyll 或 Static HTML 的 `Configure`，也不要保留第二個部署 workflow；最後重新執行 `Deploy course website`。

## Prompt 使用規則

1. 先讀本階段的輸入文件與完成條件。
2. 複製 Prompt，將 `{{...}}` 替換成自己的資料。
3. 把上游文件、來源、日期、ID、限制與未決問題一起提供給 AI。
4. 要 AI 先列已知資料、缺口與矛盾，再產生草稿。
5. 人工檢查來源、ID、狀態、數量與下游交接；AI 草稿不是正式規格。
6. 沒有證據的內容必須保留為「待確認」，不能被 Prompt 使用者自行改成事實。

## 內容維護

- 課程階段與 Prompt：`assets/guide-data.js`
- 頁面結構：`index.html`
- 顯示與響應式樣式：`assets/site.css`
- 導覽、進度與複製功能：`assets/site.js`
- 教材正式來源：W1–W7 目錄、`00_學生發布版/`、`98_示範案例/`

新增或修改 Prompt 時，必須同步檢查：

- 是否要求 AI 先列缺口與矛盾
- 是否禁止虛構來源與跳過上游
- 是否指明本階段輸入、產出與交接
- 是否把人工驗證列為正式完成條件
