# SCR-11 銷售報表

| 項目 | 內容 |
|---|---|
| SCR | SCR-11（老闆端，L1，768 平板） |
| 承接任務 | T13 看營收 |
| 承接狀態 | 日／週 |
| 進入條件 | 後台登入（決策 7 POS ＋ 決策 11 報表） |

| 頁面狀態 | 顯示 | MSG |
|---|---|---|
| default | 三張 KPI＋熱銷前三＋資料來源 | — |
| loading | 骨架 | — |
| empty | 今日尚無資料 | MSG-12 |
| error | POS 連線異常 | MSG-18 |

**只做 4 態**：這是 L1 頁面，success 與 default 同義、interrupted 由 error 承接。