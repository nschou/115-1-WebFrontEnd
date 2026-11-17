# D4 API 規格

> 狀態代號：S0 尚未建立訂單／S1 草稿／S2 已下單／S3 已確認／S4 製作中／S5 製作完成（待店員確認）／S6 可取餐／S7 已取餐；SX1–SX4 為例外（缺貨／付款失敗／通知未送達／修改待確認）。完整定義見 `18_spec.md` §5。

> **產生檔**，來源：`prototype/story-data.js 的動作 ＋ D3 的資料欄位`。改上游後重跑 `node gen-deliverables.mjs`，不要手改。

> 這是**由動作推導的端點候選**：action.id 就是端點語意、changes 就是要改的資料。
> 第 11 週進 SDD 時，再補正式路徑、HTTP 方法、錯誤碼與權限。

| 動作 | 頁面 | 類型 | 下一頁 | 相關資料（參數／回傳） | 會改什麼 |
|---|---|---|---|---|---|
| goto-menu | scr-01-home | 讀取／導覽（GET） | scr-02-menu | store.status、菜單品項.推薦旗標 | — |
| retry-menu | scr-01-home | 變更（POST／PATCH） | — | store.status、菜單品項.推薦旗標 | store.status 重新查詢 |
| add-to-cart | scr-02-menu | 變更（POST／PATCH） | — | 菜單品項.分類、菜單品項.名稱／描述、菜單品項.照片、菜單品項.價格 | cart.items +1；cart.subtotal 重算 |
| switch-category | scr-02-menu | 變更（POST／PATCH） | — | 菜單品項.分類、菜單品項.名稱／描述、菜單品項.照片、菜單品項.價格 | view.filter: 分類 |
| goto-checkout | scr-02-menu | 讀取／導覽（GET） | scr-03-checkout | 菜單品項.分類、菜單品項.名稱／描述、菜單品項.照片、菜單品項.價格 | — |
| submit-order | scr-03-checkout | 變更（POST／PATCH） | scr-04-payment | 訂單.pickup_slot、購物車.items、購物車.remark、訂單.total | order.status: S1 → S2；pickup_slot: 寫入；內容鎖定，不可再改品項 |
| back-to-menu | scr-03-checkout | 讀取／導覽（GET） | scr-02-menu | 訂單.pickup_slot、購物車.items、購物車.remark、訂單.total | — |
| pay | scr-04-payment | 變更（POST／PATCH） | scr-05-order-status | 訂單.total、訂單.payment_method | payment.status: 待付款 → 處理中 → 成功；order.status: S2 保持 |
| goto-status | scr-04-payment | 讀取／導覽（GET） | scr-05-order-status | 訂單.total、訂單.payment_method | — |
| refresh-status | scr-05-order-status | 變更（POST／PATCH） | — | 訂單.order_id、訂單.order_status、訂單.ready_at、取餐號碼.pickup_no | view.refresh |
| staff-confirm | scr-06-staff-orders | 變更（POST／PATCH） | — | 訂單.order_id、訂單.ready_at | order.status: S2 → S3 |
| staff-locker | scr-06-staff-orders | 變更（POST／PATCH） | — | 訂單.order_id、訂單.ready_at | order.status: S5 → S6；locker.no 指派；notify: 送出 |
| staff-retry | scr-06-staff-orders | 變更（POST／PATCH） | — | 訂單.order_id、訂單.ready_at | sync.retry |
| kds-complete | scr-07-kds | 變更（POST／PATCH） | — | 訂單.order_id、訂單.created_at | order.status: S4 → S5；不做的事：不通知顧客、不上看板 |
| kds-oos | scr-07-kds | 變更（POST／PATCH） | — | 訂單.order_id、訂單.created_at | item.supply: 售完；notify: 店員 |
| locker-open | scr-09-locker | 變更（POST／PATCH） | — | 取餐號碼.pickup_no、取餐號碼輸入暫存 | 取餐號碼: 已使用 → 回收；order.status: S6 → S7 |
| locker-scan | scr-09-locker | 變更（POST／PATCH） | — | 取餐號碼.pickup_no、取餐號碼輸入暫存 | 輸入方式: 掃碼 |
| locker-clear | scr-09-locker | 變更（POST／PATCH） | — | 取餐號碼.pickup_no、取餐號碼輸入暫存 | input: 清空 |
| save-menu | scr-10-menu-admin | 變更（POST／PATCH） | — | 菜單品項.名稱、菜單品項.供應狀態 | menu.items 更新；1 分鐘內顧客端生效 |
| upload-photo | scr-10-menu-admin | 變更（POST／PATCH） | — | 菜單品項.名稱、菜單品項.供應狀態 | content.photo 更新 |
| report-retry | scr-11-report | 變更（POST／PATCH） | — | 營收紀錄.daily_revenue、營收紀錄.avg_ticket、營收紀錄.top_items | report.reload |

## 待補（第 11 週 SDD）

- 路徑與 HTTP 方法命名規則
- 錯誤碼表（對應 SX1–SX4）
- 權限（顧客／店長／廚師／老闆）
