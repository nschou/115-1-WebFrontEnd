/* 由 verify-stories.mjs 自動產生，不要手改 */
globalThis.CHECKS_REPORT = {
  "generatedAt": "2026-11-11T07:17:37.915Z",
  "total": 23,
  "passed": 23,
  "fails": 0,
  "checks": [
    {
      "id": "AC-11",
      "screen": "scr-05-order-status",
      "state": "default",
      "desc": "製作中不得顯示取餐號碼與櫃位",
      "ok": true
    },
    {
      "id": "AC-13",
      "screen": "scr-05-order-status",
      "state": "success",
      "desc": "可取餐時，號碼、櫃位、開櫃碼必須同時出現",
      "ok": true
    },
    {
      "id": "AC-14",
      "screen": "scr-05-order-status",
      "state": "error",
      "desc": "通知未送達時，要指出去看板",
      "ok": true
    },
    {
      "id": "AC-22",
      "screen": "scr-07-kds",
      "state": "success",
      "desc": "KDS 完成態要有完成卡，且不得寫「可取餐」",
      "ok": true
    },
    {
      "id": "AC-12",
      "screen": "scr-07-kds",
      "state": "success",
      "desc": "完成後只顯示「待店員確認」",
      "ok": true
    },
    {
      "id": "AC-01",
      "screen": "scr-03-checkout",
      "state": "default",
      "desc": "確認頁要看得到品項、合計、取餐時段、姓名",
      "ok": true
    },
    {
      "id": "AC-03",
      "screen": "scr-03-checkout",
      "state": "loading",
      "desc": "送出中不得再出現可送出的按鈕",
      "ok": true
    },
    {
      "id": "AC-05",
      "screen": "scr-03-checkout",
      "state": "interrupted",
      "desc": "品項售完時要提供換品項的出路",
      "ok": true
    },
    {
      "id": "AC-06",
      "screen": "scr-04-payment",
      "state": "default",
      "desc": "結帳頁要顯示付款方式與金額",
      "ok": true
    },
    {
      "id": "AC-08",
      "screen": "scr-04-payment",
      "state": "error",
      "desc": "付款失敗要提供重試與換方式",
      "ok": true
    },
    {
      "id": "AC-02",
      "screen": "scr-03-checkout",
      "state": "error",
      "desc": "錯誤訊息要指到是哪個欄位（不跳頁仍需人工）",
      "ok": true
    },
    {
      "id": "AC-04",
      "screen": "scr-03-checkout",
      "state": "empty",
      "desc": "購物車為空時要有可點的出路",
      "ok": true
    },
    {
      "id": "AC-07",
      "screen": "scr-04-payment",
      "state": "loading",
      "desc": "付款處理中不得再出現付款按鈕（防重複提交）",
      "ok": true
    },
    {
      "id": "AC-09",
      "screen": "scr-04-payment",
      "state": "interrupted",
      "desc": "銀行確認中要說明不會重複扣款",
      "ok": true
    },
    {
      "id": "AC-10",
      "screen": "scr-05-order-status",
      "state": "default",
      "desc": "訂單成立要看得到進度",
      "ok": true
    },
    {
      "id": "AC-15",
      "screen": "scr-05-order-status",
      "state": "interrupted",
      "desc": "修改要求要顯示等待店員確認",
      "ok": true
    },
    {
      "id": "AC-18",
      "screen": "scr-06-staff-orders",
      "state": "empty",
      "desc": "沒有待處理訂單要顯示空狀態",
      "ok": true
    },
    {
      "id": "AC-20",
      "screen": "scr-07-kds",
      "state": "default",
      "desc": "佇列要依取餐時段由早到晚排序",
      "ok": true
    },
    {
      "id": "AC-16",
      "screen": "scr-06-staff-orders",
      "state": "success",
      "desc": "新單要能被認出來（高亮／標記新訂單）",
      "ok": true
    },
    {
      "id": "AC-17",
      "screen": "scr-06-staff-orders",
      "state": "default",
      "desc": "入櫃與通知必須是同一個動作",
      "ok": true
    },
    {
      "id": "AC-19",
      "screen": "scr-06-staff-orders",
      "state": "error",
      "desc": "連線中斷要能重試",
      "ok": true
    },
    {
      "id": "AC-21",
      "screen": "scr-07-kds",
      "state": "default",
      "desc": "計時器除了顏色，還要有數字",
      "ok": true
    },
    {
      "id": "AC-23",
      "screen": "scr-07-kds",
      "state": "interrupted",
      "desc": "缺貨要能通知店員",
      "ok": true
    }
  ]
};
