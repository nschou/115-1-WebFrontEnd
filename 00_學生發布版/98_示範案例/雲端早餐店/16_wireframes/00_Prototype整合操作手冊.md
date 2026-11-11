# Prototype 整合操作手冊

> 目的：讓學生知道 Prototype 不是額外再做一份畫面，而是把前面產物組成一個可以操作、切換狀態、跑故事、跑檢查的工作模型。這能降低來回翻文件的心智負荷，但不能取代來源文件。

## 1. 先分清楚三種檔案

| 類型 | 例子 | 規則 |
|---|---|---|
| 正式主線 | `15_UX.md`、`17_UserStory-I_AC.md` | 可交付、可引用；不得另造同義版本 |
| Prototype 的可執行資料 | `assets/tasks.js`、`elements.js`、`story-data.js` | 把主線中的任務、元素、路徑與 AC 轉成可操作檢查；改動前先回寫正式文件 |
| 產生檔 | `21_WIRE推展表.md`、`22_版面順序對照.md`、`assets/checks-summary.js` | 只由腳本產生；不要手改，改輸入後重跑 |

Prototype 內的 `story-data.js` 是故事、動作、AC 與自動檢查的機器可讀單一來源；它不是另一份學生規格。示範案例的正式 `17_UserStory-I_AC.md` 由 `gen-stories.mjs` 產生，不能再保留 `17_UserStory-I_AC_generated.md` 這種平行正式檔。

## 2. 動態線框怎麼產生

```text
12_role-tasks.md／Blueprint／物件／資訊流
        ↓ 人工轉成可執行欄位
assets/tasks.js（七格任務）
        ↓ 對每個決策列出資訊、操作、狀態與去處
assets/elements.js（E-ID）
        ↓ derive-wires.mjs
21_WIRE推展表.md＋畫面入口／出口檢查
        ↓ 每個 SCR 的 HTML、screen.css、六態
Prototype（?state=、?mode=wire、?fit=）
        ↓ story-data.js／verify／人工走查
17_UserStory-I_AC.md＋validation／18_spec.md
```

- `tasks.js` 把角色任務保留在業務語言；不要寫按鈕、頁面或 API。
- `elements.js` 把每個決策需要的顯示、輸入與操作列成 E-ID；操作元素必須有狀態改變、去處、回饋與失敗去處。
- `derive-wires.mjs` 不是畫圖工具；它根據任務與元素檢查每個畫面是否有入口、顯示元素、合理負載與操作去處。
- `state-switcher.js` 讓同一個 SCR 切換 `default／loading／empty／error／success／interrupted`；所以學生不用複製六份頁面，改一個畫面就能走完整狀態。
- `story-runner.js` 把 `story-data.js` 的故事路徑與動作接到畫面；操作後可立即檢查 AC，而不是只看靜態截圖。

## 3. 學生實際操作順序

在 `16_wireframes/prototype/` 執行：

```text
node gen-tables.mjs
node derive-wires.mjs
node check-layout-order.mjs
node gen-stories.mjs
node verify-stories.mjs
node lint-tokens.mjs
node selftest-stories.mjs
node check-all.mjs
node smoke-dom.mjs
```

建議順序的理由：先更新任務／元素參考表，再檢查線框推展與版面順序；接著從 `story-data.js` 更新正式 `17_UserStory-I_AC.md`，再跑 AC、token、負向測試與總檢查。

## 4. 來源改動對照表

| 你要改的內容 | 先改哪裡 | 接著重跑 |
|---|---|---|
| 角色、業務動作、交接 | `12_role-tasks.md`，再同步 `assets/tasks.js` | `gen-tables`、`derive-wires`、`check-all` |
| 顯示資訊、操作後果、錯誤去處 | `14_elements.md`／`15_UX.md`，再同步 `assets/elements.js` | `gen-tables`、`derive-wires`、`check-layout-order`、`check-all` |
| 故事路徑、AC、檢查邏輯 | `assets/story-data.js` | `gen-stories`、`verify-stories`、`selftest-stories`、`check-all` |
| 色彩、字級、間距 | `09_DESIGN.md`、`10_tokens.css` | `lint-tokens`、Prototype 人工走查 |
| 遠距設備與觀看距離 | `DESIGN-DISPLAY.md` | `tokens-display.css`、`lint-tokens`、RV-09／RV-10 |
| 畫面狀態與文案 | `15_UX.md`、對應 SCR 的 HTML／CSS | `smoke-dom`、`verify-stories`、人工走查 |

如果 Prototype 先發現上游文件錯誤，不要只改 Prototype。先修正式文件，再同步可執行資料；否則下一次重跑會把問題覆蓋回來。

## 5. 走查完成的判定

- `check-all.mjs` 通過，只代表業務、資訊、版面、實作與負向測試通過。
- `review-report.md` 必須有每一項 `PASS` 或有明確理由的 `N/A`，不能有 `pending`。
- `N/A` 只能表示本示範案例明確不包含外部使用者／現場設備測試；不能拿來掩蓋學生專案未測。
- `18_spec.md` 要同時列出自動檢查、Prototype 走查、Design audit 的檔案路徑與範圍，不能只寫「已驗證」。
