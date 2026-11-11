# 115-1 Web Front End

本專案是「服務設計到 Spec」課程教材，從市場問題一路整理到可驗收的 18_spec.md，並包含學生工具包、示範案例、Prototype、validation 與教案網站。

## 學生網站

- GitHub Pages：部署後由 repository 根入口進入
- 本地入口：`00_CourseSite/index.html`
- 教材閱讀器：`00_CourseSite/reader.html?file=...`

網站提供：

- W1–W7 學習路線與 18 檔主線
- 19 個學習節點（W1 工作區＋18 檔主線）
- 每個階段的 AI 參考 Prompt
- Markdown、表格、程式碼與 Mermaid 閱讀器
- 三張可互動的全局架構圖：課程產生流程、Prototype 前端架構、示範服務系統架構
- Prototype、validation 與完整性檢查工具連結

## 本地啟動

從 repository 根目錄使用任一靜態 HTTP server：

```bash
npx serve .
```

開啟 `00_CourseSite/index.html`。不要以 `file://` 直接開啟，因為 Markdown reader 需要 HTTP fetch 與 CDN 資源。

## 啟用 GitHub Pages

第一次需要由 repository 管理者開啟一次：

1. 開啟 GitHub repository 的 **Settings → Pages**。
2. 在 **Build and deployment → Source** 選擇 **GitHub Actions**。
3. 儲存後重新執行 `Deploy course website` workflow，或再推送一次 commit。

Workflow 會先驗證網站 JavaScript 與 19 個學習節點的教材連結，再把整個 repository 部署為靜態網站。根目錄入口會導向 `00_CourseSite/index.html`。

### Pages 顯示 `Get Pages site failed`

若 workflow 在 `actions/configure-pages@v5` 顯示 `Not Found`，表示 repository 的 Pages site 尚未真正建立；這不是教材網站或 Markdown reader 的錯誤。先到 **Settings → Pages**，暫時將 **Source** 設為 **Deploy from a branch**，選 `main` 與 `/(root)`。若 **Save** 是灰色，先重新整理頁面；若目前已經是 `main`／`/(root)`，灰色通常表示沒有新的設定變更。請確認登入帳號具有 repository 管理權限；本 repository 的擁有者是 `nschou`。設定建立後，再把 **Source** 改回 **GitHub Actions**。不需要按 Jekyll 或 Static HTML 的 `Configure`，也不要建立第二個部署 workflow。最後到 **Actions → Deploy course website** 重新執行工作。

## 正式來源規則

網站是教材導覽層，不取代原始文件。正式來源仍是 W1–W7 文件、`00_學生發布版/`、`98_示範案例/` 與 Prototype。修改教材後，應重新執行相應檢查與 GitHub Pages workflow。
