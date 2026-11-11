# DESIGN-DISPLAY.md｜遠距畫面設計契約

> 本檔是 KDS（廚房顯示器）與取餐看板的獨立顯示規則。`16_wireframes/prototype/assets/tokens-display.css` 只能由本檔的規則產生或同步，不另立一套尺寸。

## 1. 適用範圍

| 畫面 | 假設設備 | 觀看距離 | 主要任務 |
|---|---|---:|---|
| SCR-07 KDS | 24 吋橫向螢幕 | 2 公尺 | 廚師辨識訂單、品項、計時與下一個動作 |
| SCR-08 取餐看板 | 55 吋顯示器 | 4 公尺 | 顧客辨識取餐號碼與目前仍在製作的訂單 |

## 2. 尺度規則

- 可讀字高：觀看距離 ÷ 200；掃視字高：觀看距離 ÷ 100。
- 取餐看板號碼使用 `96px`，標籤使用 `32px`，計時器使用 `48px`。
- KDS 訂單號使用 `48px`，品項使用 `32px`，操作按鈕高度使用 `120px`、寬度使用 `240px`。
- 顏色不是唯一線索；看板與 KDS 都同時提供數字、文字或順序。
- 看板是純顯示，不放 `button`、`a`、`input` 或 `select`。

## 3. 實作對照

| 規則來源 | 實作檔 | 檢查方式 |
|---|---|---|
| 本檔尺度 | `16_wireframes/prototype/assets/tokens-display.css` | `node lint-tokens.mjs` |
| 看板／KDS 結構 | `16_wireframes/prototype/scr-08-pickup-board/`、`scr-07-kds/` | `node smoke-dom.mjs`、人工走查 |
| 遠距可讀走查 | `validation/review-report.md` 的 RV-09、RV-10 | 等效縮放截圖＋人工記錄 |

## 4. 變更規則

改設備、觀看距離或任務時，先改本檔，再同步 `tokens-display.css`、`15_UX.md`、Prototype 與 validation；不得只改 CSS。完成後重跑 `node check-all.mjs`，並更新 `09_DESIGN_audit.md`。
