# stories.md（示範答案）｜User Story 與 AC

> 對應講義 §1.4 第 3 項產出。範圍：**11 個畫面、10 條故事**。
> **US-B** 是線框前的業務意圖；**US-I** 是線框後的介面路徑；AC 從狀態／規則反寫。
> 規則：Story 用業務語言（通過「系統→店員」測試）；AC 從狀態表反寫。
> **本檔第一、四節由 `prototype/gen-stories.mjs` 從 `story-data.js` 產生**，不要手改；改資料後重跑。

---

## 一、User Story（每條故事是一條**路徑**，不是一個畫面）

<!-- AUTO:US-BEGIN -->
| ID | US-B（業務意圖） | US-I（介面路徑） | 路徑 | AC | 來源痛點 |
|---|---|---|---|---|---|
| US-01 | 作為趕時間的通勤顧客，我想要在下單前先決定取餐時段，以便到店不用等。 | 在下單前選好取餐時段，路徑為菜單 → 下單確認 → 結帳。 | scr-02-menu → scr-03-checkout → scr-04-payment | AC-01、AC-02、AC-03 | 不知道要等多久 |
| US-02 | 作為第一次使用的顧客，我想要在送出前看到完整金額與品項，以便確認沒有點錯。 | 在送出前確認完整金額與品項，路徑為下單確認。 | scr-03-checkout | AC-01、AC-04 | 不確定總金額 |
| US-03 | 作為顧客，我想要用平常使用的行動支付完成付款，以便不用準備零錢。 | 選擇付款方式並完成付款，路徑為結帳 → 訂單狀態。 | scr-04-payment → scr-05-order-status | AC-06、AC-07 | 排隊付款 |
| US-04 | 作為付款失敗的顧客，我想要知道錢到底有沒有被扣，以便決定要不要重試。 | 付款失敗時確認付款結果與可用出路，路徑為結帳。 | scr-04-payment | AC-08 | 不敢再按一次 |
| US-05 | 作為通勤路上的顧客，我想要隨時知道餐點做到哪，以便決定什麼時候出發。 | 查看餐點目前進度，路徑為訂單狀態。 | scr-05-order-status | AC-10、AC-11 | CJM 最低點 −2 |
| US-06 | 作為快到店的顧客，我想要一眼看到取餐號碼與櫃位，以便不用在櫃前翻手機。 | 查看取餐號碼並完成取餐，路徑為訂單狀態 → 取餐櫃。 | scr-05-order-status → scr-09-locker | AC-13、AC-14 | 號碼字太小 |
| US-07 | 作為尖峰時段的店員，我想要一眼看出哪張單最急，以便不漏單。 | 依急迫度辨識要先處理的訂單，路徑為店員訂單台。 | scr-06-staff-orders | AC-16 | 紙本單找不到 |
| US-08 | 作為店員，我想要在餐點備妥時一次完成入櫃與通知，以便少一個步驟。 | 完成入櫃並通知顧客，路徑為店員訂單台。 | scr-06-staff-orders | AC-17 | 入櫃與通知分兩次 |
| US-09 | 作為廚師，我想要在餐點完成時先交給店員確認，以便避免顧客提前前往取餐。 | 廚師標記完成後等待店員確認，路徑為 KDS → 訂單狀態。 | scr-07-kds → scr-05-order-status | AC-12、AC-22、AC-11 | 廚師完成≠可取餐 |
| US-10 | 作為廚師，我想要在缺貨時標記品項，以便店員立刻通知顧客換品項。 | 標記缺貨並通知店員，路徑為 KDS → 店員訂單台。 | scr-07-kds → scr-06-staff-orders | AC-23 | 缺貨要跑去前面講 |
<!-- AUTO:US-END -->

> **語言檢查**：十條都通過「系統→店員」替換（例如 US-08：店員一次完成入櫃與通知 ✅）。
> **路徑檢查**：「路徑」是這條故事會走過的畫面（可多個）；單一畫面的故事只列一個。

---

## 二、Acceptance Criteria（EARS）

### SCR-03 下單確認

| ID | 對應狀態 | AC |
|---|---|---|
| AC-01 | default | When 顧客進入下單確認頁，the system shall 顯示品項、數量、合計與取餐時段選單。 |
| AC-02 | error | When 顧客未選取餐時段就送出，the system shall 在該欄位下方顯示「請選取一個取餐時間」，且**不得**跳頁。 |
| AC-03 | loading | While 訂單送出中，the system shall 鎖住返回並顯示處理中。 |
| AC-04 | empty | If 購物車為空，then the system shall 顯示空狀態並提供返回菜單。 |
| AC-05 | interrupted | If 送出時品項售完，then the system shall 標示該品項並建議替換。 |

### SCR-04 結帳

| ID | 對應狀態 | AC |
|---|---|---|
| AC-06 | default | When 顧客進入結帳頁，the system shall 顯示付款方式與合計金額。 |
| AC-07 | loading | While 付款處理中，the system shall 顯示「請不要關閉畫面」並禁止重複提交。 |
| AC-08 | error | If 付款失敗，then the system shall 說明「付款沒有完成」並提供重試或換方式。 |
| AC-09 | interrupted | If 付款處於銀行確認中，then the system shall 顯示「稍後回來看結果」且不重複扣款。 |

### SCR-05 訂單狀態

| ID | 對應狀態 | AC |
|---|---|---|
| AC-10 | default | When 訂單成立，the system shall 顯示訂單號、預計取餐時間與目前進度。 |
| AC-11 | — | While 訂單為製作中，the system shall 顯示進度，且**不得**顯示取餐號碼。 |
| AC-12 | — | **When 廚師標記完成，the system shall 仍顯示「製作中」，且不得發送取餐通知。** |
| AC-13 | success | When 店員確認備妥入櫃，the system shall 顯示取餐號碼與櫃位，並發送通知。 |
| AC-14 | error | If 通知未送達，then the system shall 提示「請看店內看板」，並提供手動重新整理。 |
| AC-15 | interrupted | If 顧客送出修改要求，then the system shall 顯示「等待店員確認」，且製作中不得修改。 |

### SCR-06 店員訂單台

| ID | 對應狀態 | AC |
|---|---|---|
| AC-16 | success | When 新訂單成立，the system shall 在列表頂端高亮並發出提示音 3 秒。 |
| AC-17 | — | When 店員確認入櫃，the system shall 同時把狀態改為可取餐並觸發顧客通知。 |
| AC-18 | empty | If 目前沒有待處理訂單，then the system shall 顯示空狀態而非空白列表。 |
| AC-19 | error | If 與系統斷線，then the system shall 顯示重試狀態並在恢復後自動同步。 |

### SCR-07 KDS

| ID | 對應狀態 | AC |
|---|---|---|
| AC-20 | default | When 訂單進入廚房，the system shall 依取餐時段排序並顯示計時器。 |
| AC-21 | — | While 計時進行中，the system shall 於 3 分與 6 分改變顏色，**並同時顯示數字**（不只靠顏色）。 |
| AC-22 | success | When 廚師按完成，the system shall 標記為「待店員確認」並通知店員。 |
| AC-23 | interrupted | When 廚師標記缺貨，the system shall 通知店員並暫停該品項的製作。 |

---

## 三、禁止型 AC 清單（本週重點）

| ID | 內容 | 為什麼重要 |
|---|---|---|
| AC-02 | 不得跳頁 | 錯誤要留在原頁修正 |
| AC-11 | 不得顯示取餐號碼 | 避免顧客提早去櫃前等 |
| **AC-12** | **不得提前通知、不得上看板** | 「廚師完成 ≠ 可領取」 |
| AC-15 | 製作中不得修改 | 已下鍋的不能改 |
| AC-21 | 不得只靠顏色 | 色盲與強光環境 |

> 這五條都**寫不出來**如果只從 Story 推——它們來自狀態表與業務規則。

---

## 四、驗證等級（由 `acCatalog` 產生）

<!-- AUTO:VERIFY-BEGIN -->
| verify | 條數 | 條目 | 誰做 |
|---|---|---|---|
| **auto**（已實作斷言） | 23 | AC-01、AC-02、AC-03、AC-04、AC-05、AC-06、AC-07、AC-08、AC-09、AC-10、AC-11、AC-12、AC-13、AC-14、AC-15、AC-16、AC-17、AC-18、AC-19、AC-20、AC-21、AC-22、AC-23 | `node verify-stories.mjs` |
| manual | 0 | — | 助教 |
| human | 0 | — | 使用者測試 |
<!-- AUTO:VERIFY-END -->

**回報格式**：

> 自動 23 條通過、人工 0 條、需使用者測試 0 條；體驗層另計（見 `17_走查作業手冊`）。

> 判定「auto」的條件：**做錯了會紅**。若一條 AC 無論怎麼寫都會 PASS，它就不是檢查，是口號。
