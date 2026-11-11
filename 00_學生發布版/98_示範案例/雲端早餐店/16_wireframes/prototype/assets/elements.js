/* ===========================================================
   elements.js — 資訊元素表（SCR 的真正來源）
   order: 該狀態內的「決策順序」（1 = 最先要判斷的）
   state: 出現在哪個狀態（default / success / error / empty / interrupted）
   scope: global = 跨頁常駐元件（不計入單頁元素群上限）
   =========================================================== */
(function (g) {
  g.ELEMENTS = [
    {"id":"E-01","screen":"scr-01-home","name":"營業狀態","purpose":"判斷今天能不能點","source":"store.status","kind":"display","widget":"文字標籤","rationale":"狀態優先於內容","order":1,"state":"interrupted"},
    {"id":"E-02","screen":"scr-01-home","name":"今日推薦","purpose":"減少選擇成本","source":"菜單品項.推薦旗標","kind":"display","widget":"圖文卡","rationale":"需要份量感","order":1,"state":"default"},
    {"id":"E-03","screen":"scr-01-home","name":"開始點餐","purpose":"進入點餐","source":"—","kind":"act","widget":"主按鈕","rationale":"唯一主 CTA","task":"T-01","action":"goto-menu","stateChange":"—","to":"scr-02-menu","feedback":"進入菜單","failTo":"—","order":2,"state":"default"},
    {"id":"E-04","screen":"scr-02-menu","name":"分類篩選","purpose":"縮小範圍","source":"菜單品項.分類","kind":"input","widget":"分頁籤","rationale":"選項少且互斥","action":"switch-category","order":1,"state":"default","shownAs":"主餐"},
    {"id":"E-05","screen":"scr-02-menu","name":"品項名稱與說明","purpose":"知道這是什麼","source":"菜單品項.名稱／描述","kind":"display","widget":"文字","rationale":"需逐字閱讀","order":3,"state":"default"},
    {"id":"E-06","screen":"scr-02-menu","name":"品項照片","purpose":"判斷份量與食慾","source":"菜單品項.照片","kind":"display","widget":"縮圖 1:1","rationale":"顧客決策需要實物","order":2,"state":"default"},
    {"id":"E-07","screen":"scr-02-menu","name":"價格","purpose":"預算判斷","source":"菜單品項.價格","kind":"display","widget":"數字","rationale":"決策關鍵","order":4,"state":"default"},
    {"id":"E-08","screen":"scr-02-menu","name":"售完標記","purpose":"避免點了才發現沒有","source":"菜單品項.供應狀態","kind":"display","widget":"灰化標籤","rationale":"狀態要可見","order":5,"state":"default","skipOrderCheck":true},
    {"id":"E-09","screen":"scr-02-menu","name":"加入購物車","purpose":"累積選購","source":"購物車.items","kind":"act","widget":"圓形按鈕","rationale":"單手可點","task":"T-01","action":"add-to-cart","stateChange":"購物車 +1（S0→S1）","to":"留在原地","feedback":"底部小計更新","failTo":"售完提示","order":6,"state":"default","shownAs":"＋"},
    {"id":"E-10","screen":"scr-02-menu","name":"前往結帳","purpose":"提出訂單","source":"—","kind":"act","widget":"底部主按鈕","rationale":"流程推進","task":"T-02","action":"goto-checkout","stateChange":"—","to":"scr-03-checkout","feedback":"進入確認頁","failTo":"—","order":8,"state":"default"},
    {"id":"E-11","screen":"scr-03-checkout","name":"取餐時段","purpose":"決定幾點拿","source":"訂單.pickup_slot","kind":"input","widget":"下拉","rationale":"固定 4–6 選項要全看到","order":1,"state":"default","shownAs":"取餐時段"},
    {"id":"E-12","screen":"scr-03-checkout","name":"品項清單","purpose":"確認點了什麼","source":"購物車.items","kind":"display","widget":"清單","rationale":"需逐項核對","order":2,"state":"default","shownAs":"全麥三明治"},
    {"id":"E-13","screen":"scr-03-checkout","name":"客製備註","purpose":"記住偏好","source":"購物車.remark","kind":"display","widget":"小字","rationale":"次要資訊","order":3,"state":"default"},
    {"id":"E-14","screen":"scr-03-checkout","name":"合計金額","purpose":"判斷值不值得","source":"訂單.total","kind":"display","widget":"大字","rationale":"決策關鍵數字","order":4,"state":"default","shownAs":"合計"},
    {"id":"E-15","screen":"scr-03-checkout","name":"顧客姓名","purpose":"叫號辨識","source":"訂單.customer_name","kind":"input","widget":"文字框","rationale":"自由輸入","order":5,"state":"default","shownAs":"顧客姓名"},
    {"id":"E-16","screen":"scr-03-checkout","name":"送出訂單","purpose":"提出訂單","source":"—","kind":"act","widget":"主按鈕","rationale":"任務唯一觸發點","task":"T-02","action":"submit-order","stateChange":"訂單 S1 草稿 → S2 已下單","to":"scr-04-payment","feedback":"success 態 0.5 秒後前進","failTo":"留在 scr-03 error 態（不跳頁）","order":6,"state":"default","shownAs":"送出訂單"},
    {"id":"E-17","screen":"scr-04-payment","name":"應付金額","purpose":"確認付多少","source":"訂單.total","kind":"display","widget":"大字","rationale":"決策關鍵數字","order":1,"state":"default","shownAs":"應付金額"},
    {"id":"E-18","screen":"scr-04-payment","name":"付款方式","purpose":"選擇怎麼付","source":"訂單.payment_method","kind":"input","widget":"無線電","rationale":"選項少且互斥","order":2,"state":"default","shownAs":"付款方式"},
    {"id":"E-19","screen":"scr-04-payment","name":"執行付款","purpose":"完成付款","source":"—","kind":"act","widget":"主按鈕","rationale":"任務唯一觸發點","task":"T-03","action":"pay","stateChange":"付款 待付款 → 成功","to":"scr-05-order-status（外部回報成功）","feedback":"顯示付款完成","failTo":"留在 scr-04 error 態（可重試）","order":3,"state":"default","shownAs":"前往付款"},
    {"id":"E-20","screen":"scr-04-payment","name":"查看訂單狀態","purpose":"知道下一步","source":"—","kind":"act","widget":"次要連結","rationale":"付款後引導","task":"T-08","action":"goto-status","stateChange":"—","to":"scr-05-order-status","feedback":"進入狀態頁","failTo":"—","order":1,"state":"success"},
    {"id":"E-21","screen":"scr-05-order-status","name":"訂單號","purpose":"辨識是哪一筆","source":"訂單.order_id","kind":"display","widget":"文字","rationale":"需要引用","order":1,"state":"default","skipOrderCheck":true},
    {"id":"E-22","screen":"scr-05-order-status","name":"進度","purpose":"知道做到哪","source":"訂單.order_status","kind":"display","widget":"進度條","rationale":"需一眼看懂","order":3,"state":"default","shownAs":"製作中"},
    {"id":"E-23","screen":"scr-05-order-status","name":"預計取餐時間","purpose":"決定何時出發","source":"訂單.ready_at","kind":"display","widget":"時間","rationale":"決策關鍵","order":2,"state":"default","shownAs":"預計"},
    {"id":"E-24","screen":"scr-05-order-status","name":"取餐號碼","purpose":"到店找餐","source":"取餐號碼.pickup_no","kind":"display","widget":"大字","rationale":"需遠距可讀","order":1,"state":"success"},
    {"id":"E-25","screen":"scr-05-order-status","name":"櫃位","purpose":"知道去哪","source":"取餐號碼.locker_no","kind":"display","widget":"大字","rationale":"需遠距可讀","order":2,"state":"success"},
    {"id":"E-26","screen":"scr-05-order-status","name":"重新整理","purpose":"通知失敗時自救","source":"—","kind":"act","widget":"次要按鈕","rationale":"通知不可靠時的必要動作","task":"T-08","action":"refresh-status","stateChange":"讀取最新狀態","to":"留在原地","feedback":"狀態更新","failTo":"停在 error 態","order":1,"state":"error"},
    {"id":"E-27","screen":"scr-06-staff-orders","name":"訂單列表","purpose":"決定先處理哪張","source":"訂單.order_id","kind":"display","widget":"清單","rationale":"依時間排序","order":1,"state":"default","shownAs":"#1045"},
    {"id":"E-28","screen":"scr-06-staff-orders","name":"剩餘時間","purpose":"判斷急迫度","source":"訂單.ready_at","kind":"display","widget":"倒數","rationale":"需一眼比較","order":2,"state":"default"},
    {"id":"E-29","screen":"scr-06-staff-orders","name":"確認接單","purpose":"推進製作","source":"—","kind":"act","widget":"主按鈕","rationale":"任務唯一觸發點","task":"T-04","action":"staff-confirm","stateChange":"訂單 S2 → S3","to":"留在原地","feedback":"卡片移入進行中","failTo":"斷線提示","order":3,"state":"default","shownAs":"確認接單"},
    {"id":"E-30","screen":"scr-06-staff-orders","name":"備妥入櫃","purpose":"交付顧客","source":"—","kind":"act","widget":"主按鈕","rationale":"同時觸發通知","task":"T-06","action":"staff-locker","stateChange":"訂單 S5 → S6、指派櫃位、通知顧客","to":"留在原地","feedback":"卡片移入可取餐","failTo":"通知失敗標記","order":4,"state":"default","shownAs":"入櫃並通知"},
    {"id":"E-31","screen":"scr-06-staff-orders","name":"手動重試","purpose":"斷線自救","source":"—","kind":"act","widget":"次要按鈕","rationale":"連線不可靠","task":"T-04","action":"staff-retry","stateChange":"重新同步","to":"留在原地","feedback":"恢復連線","failTo":"持續重試","order":1,"state":"error"},
    {"id":"E-32","screen":"scr-07-kds","name":"佇列卡片","purpose":"決定做哪張","source":"訂單.order_id","kind":"display","widget":"卡片","rationale":"依取餐時段排序","order":1,"state":"default","shownAs":"#1045"},
    {"id":"E-33","screen":"scr-07-kds","name":"計時器","purpose":"判斷急迫度","source":"訂單.created_at","kind":"display","widget":"數字＋顏色","rationale":"不只靠顏色","order":2,"state":"default"},
    {"id":"E-34","screen":"scr-07-kds","name":"標記完成","purpose":"移交店員","source":"—","kind":"act","widget":"大按鈕","rationale":"戴手套可點","task":"T-05","action":"kds-complete","stateChange":"訂單 S4 → S5","to":"留在原地（完成態）","feedback":"卡片標記「完成（待店員確認）」","failTo":"留在原卡片","order":3,"state":"default","shownAs":"開始製作"},
    {"id":"E-35","screen":"scr-07-kds","name":"回報缺貨","purpose":"通知店員","source":"—","kind":"act","widget":"警示按鈕","rationale":"例外處理","task":"T-12","action":"kds-oos","stateChange":"品項 供應中 → 售完","to":"留在原地","feedback":"標記缺貨並通知店員","failTo":"留在原卡片","order":4,"state":"interrupted","shownAs":"通知店員"},
    {"id":"E-36","screen":"scr-08-pickup-board","name":"可取餐號碼","purpose":"到店找餐","source":"取餐號碼.pickup_no","kind":"display","widget":"大字格","rationale":"4 公尺可讀","order":1,"state":"default","shownAs":"可取餐"},
    {"id":"E-37","screen":"scr-08-pickup-board","name":"製作中清單","purpose":"知道還沒好","source":"訂單.order_status","kind":"display","widget":"次區文字","rationale":"降低焦慮","order":2,"state":"default","shownAs":"製作中"},
    {"id":"E-38","screen":"scr-09-locker","name":"取餐號碼輸入","purpose":"取餐","source":"取餐號碼.pickup_no","kind":"input","widget":"數字鍵盤","rationale":"單手可操作","order":3,"state":"default","shownAs":"清除"},
    {"id":"E-39","screen":"scr-09-locker","name":"確認開櫃","purpose":"取出餐點","source":"—","kind":"act","widget":"主按鈕","rationale":"任務唯一觸發點","task":"T-07","action":"locker-open","stateChange":"訂單 S6 → S7、號碼回收","to":"留在原地（開櫃成功）","feedback":"開櫃並倒數返回","failTo":"error 態（號碼錯誤）","order":4,"state":"default","shownAs":"確認"},
    {"id":"E-40","screen":"scr-09-locker","name":"憑證掃描","purpose":"替代手動輸入","source":"取餐號碼.pickup_no","kind":"act","widget":"次要按鈕","rationale":"有人記不住號碼","task":"T-07","action":"locker-scan","stateChange":"輸入方式 = 憑證掃描","to":"留在原地","feedback":"帶入號碼","failTo":"error 態","order":2,"state":"default","shownAs":"QR Code"},
    {"id":"E-41","screen":"scr-10-menu-admin","name":"品項列表","purpose":"維護菜單","source":"菜單品項.名稱","kind":"display","widget":"清單","rationale":"需大量編輯","order":1,"state":"default","shownAs":"全麥三明治"},
    {"id":"E-42","screen":"scr-10-menu-admin","name":"供應開關","purpose":"即時售完","source":"菜單品項.供應狀態","kind":"input","widget":"開關","rationale":"高頻切換","order":2,"state":"default"},
    {"id":"E-43","screen":"scr-10-menu-admin","name":"儲存變更","purpose":"更新菜單","source":"—","kind":"act","widget":"主按鈕","rationale":"任務唯一觸發點","task":"T-10","action":"save-menu","stateChange":"menu.items 更新","to":"留在原地（success）","feedback":"已儲存","failTo":"留在 error 態","order":4,"state":"default","shownAs":"儲存變更"},
    {"id":"E-44","screen":"scr-10-menu-admin","name":"更換品項照","purpose":"提升決策品質","source":"菜單品項.照片","kind":"act","widget":"次要按鈕","rationale":"照片是必要資產","task":"T-10","action":"upload-photo","stateChange":"content.photo 更新","to":"留在原地","feedback":"縮圖更新","failTo":"格式錯誤提示","order":3,"state":"default","shownAs":"上傳／更換品項照"},
    {"id":"E-45","screen":"scr-11-report","name":"每日營收","purpose":"知道賺多少","source":"營收紀錄.daily_revenue","kind":"display","widget":"KPI 卡","rationale":"決策關鍵","order":1,"state":"default","shownAs":"今日營收"},
    {"id":"E-46","screen":"scr-11-report","name":"客單價","purpose":"判斷客群","source":"營收紀錄.avg_ticket","kind":"display","widget":"KPI 卡","rationale":"決策關鍵","order":2,"state":"default","shownAs":"客單價"},
    {"id":"E-47","screen":"scr-11-report","name":"熱銷品","purpose":"決定備料","source":"營收紀錄.top_items","kind":"display","widget":"排行","rationale":"決策關鍵","order":3,"state":"default","shownAs":"熱銷品"},
    {"id":"E-48","screen":"scr-11-report","name":"重新取得報表","purpose":"資料異常自救","source":"—","kind":"act","widget":"次要按鈕","rationale":"POS 連線不可靠","task":"T-11","action":"report-retry","stateChange":"report.reload","to":"留在原地","feedback":"資料更新","failTo":"error 態","order":1,"state":"error"},
    {"id":"E-49","screen":"scr-01-home","name":"重新取得推薦","purpose":"載入失敗時自救","source":"—","kind":"act","widget":"次要按鈕","rationale":"連線不可靠","recovery":true,"action":"retry-menu","stateChange":"store.status 重新查詢","to":"留在原地（success）","feedback":"重新載入完成","failTo":"留在 error 態","order":1,"state":"error"},
    {"id":"E-50","screen":"scr-03-checkout","name":"回到菜單","purpose":"購物車為空時離開","source":"—","kind":"act","widget":"次要連結","rationale":"空狀態需要出路","recovery":true,"action":"back-to-menu","stateChange":"—","to":"scr-02-menu","feedback":"回到菜單","failTo":"—","order":1,"state":"empty"},
    {"id":"E-51","screen":"scr-09-locker","name":"清除輸入","purpose":"輸錯時重來","source":"—","kind":"act","widget":"次要按鈕","rationale":"輸入錯誤要能自救","recovery":true,"action":"locker-clear","stateChange":"輸入清空","to":"留在原地","feedback":"清空","failTo":"—","order":null,"state":"default"},
    {"id":"E-52","screen":"scr-09-locker","name":"已輸入號碼","purpose":"確認按到第幾位、有沒有按錯","source":"取餐號碼輸入暫存","kind":"display","widget":"點狀顯示（code dots）","rationale":"1 公尺外要看得見進度","order":1,"state":"default"},
    {"id":"E-53","screen":"scr-02-menu","name":"購物車小計","purpose":"知道現在選了幾件、多少錢","source":"購物車.items／subtotal","kind":"display","widget":"底部固定條","rationale":"隨時可見，不必回首頁","order":7,"state":"default","scope":"global"}
  ];

  /* 沒有「介面入口」的 SCR 要說明它是怎麼開始的 */
  g.SCREEN_ENTRY = {
    "scr-01-home": { reason: "開啟 App", kind: "非介面" },
    "scr-06-staff-orders": { reason: "開店登入，常駐工作台", kind: "非介面" },
    "scr-07-kds": { reason: "開店常駐（廚房大屏）", kind: "非介面" },
    "scr-09-locker": { reason: "顧客走到櫃檯（實體移動，非介面操作）", kind: "非介面" },
    "scr-10-menu-admin": { reason: "後台登入", kind: "非介面" },
    "scr-11-report": { reason: "後台登入", kind: "非介面" },
    "scr-08-pickup-board": { reason: "常駐顯示（設施）", kind: "非介面" }
  };
})(globalThis);
