# DESIGN-DISPLAY.md｜遠距畫面教學規則

> KDS（廚房顯示器）與取餐看板不能直接套手機線框。這份規則說明如何把設備、觀看距離與任務轉成 Prototype 可檢查的顯示尺度。

## 操作順序

1. 從 `15_UX.md` 找出遠距 SCR、觀看者、主要決策與不能漏看的資訊。
2. 寫清楚設備、觀看距離、畫面方向與是否可操作。
3. 先定字高、號碼大小、卡片間距與觸控目標，再同步 `assets/tokens-display.css`。
4. 以目標尺寸與等效縮放各走一次；不能只看瀏覽器塞進視窗後的縮圖。
5. 把結果寫入 `validation/`，不把「設計上看起來夠大」寫成實測通過。

## 必查規則

- 可讀字高至少依觀看距離推導；掃視資訊要比一般正文更大。
- 看板若是純顯示，不得放 `button`、`a`、`input` 或 `select`。
- KDS 若要戴手套操作，按鈕要另列實際觸控目標，不得只用手機 44px 標準。
- 顏色不能是唯一線索；號碼、文字、順序或圖形也要能辨識狀態。
- 設備或距離改變時，要同步 `15_UX.md`、Prototype token、畫面、validation 與 `18_spec.md`。

## Prototype 對照

- `prototype/assets/tokens-display.css`：可執行尺度。
- `prototype/scr-07-kds/`、`prototype/scr-08-pickup-board/`：遠距畫面。
- `prototype/assets/review-data.js`：RV-09、RV-10 的走查方法。
- `validation/review-report.md`：實際證據；沒有證據就保持 N/A 或待驗證，不可寫 PASS。
