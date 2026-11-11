/* ===========================================================
   tasks.js — 任務句（業務語言，禁止介面詞）
   七格：preState / actor / verb / object / transition / recipient / decision
   =========================================================== */
(function (g) {
  g.TASKS = [
    { id:"T-01", preState:"顧客開始點餐", actor:"顧客", verb:"選定餐點",
      object:"OBJ-01 菜單品項", transition:"未選 → 已選", recipient:"顧客（自己）",
      decision:"還要再加嗎", latency:"即時" },
    { id:"T-02", preState:"顧客已決定餐點內容", actor:"顧客", verb:"提出訂單",
      object:"OBJ-02 訂單", transition:"S1 草稿 → S2 已下單", recipient:"店員",
      decision:"現在做還是排隊", latency:"3 秒",
      openQuestions:["店家如何得知顧客已提出訂單？"] },
    { id:"T-03", preState:"訂單已成立且待付款", actor:"顧客", verb:"完成付款",
      object:"OBJ-02 訂單", transition:"付款 待付款 → 成功", recipient:"店員",
      decision:"這張單可以開始做", latency:"3 秒" },
    { id:"T-04", preState:"訂單已付款", actor:"店員", verb:"確認接單",
      object:"OBJ-02 訂單", transition:"S2 → S3", recipient:"廚師",
      decision:"先做哪一張", latency:"5 秒" },
    { id:"T-05", preState:"訂單已確認", actor:"廚師", verb:"製作餐點",
      object:"OBJ-03 餐點", transition:"S3 → S4 製作中 → S5 已完成", recipient:"店員",
      decision:"這份可以交付了嗎", latency:"即時" },
    { id:"T-06", preState:"餐點已完成但未交付", actor:"店員", verb:"備妥入櫃",
      object:"OBJ-05 取餐號碼", transition:"S5 → S6 可取餐", recipient:"顧客",
      decision:"去哪裡拿", latency:"1 秒",
      via:"OBJ-06 取餐看板", substitutes:"店員口頭叫號" },
    { id:"T-07", preState:"餐點已入櫃且顧客到店", actor:"顧客", verb:"取出餐點",
      object:"OBJ-05 取餐號碼", transition:"S6 → S7 已取餐", recipient:"店家",
      decision:"這筆訂單完成", latency:"即時",
      via:"OBJ-06 取餐看板", substitutes:"店員核對號碼並交付" },
    { id:"T-08", preState:"訂單已成立", actor:"顧客", verb:"了解進度",
      object:"OBJ-02 訂單", transition:"讀取，不改變狀態", recipient:"顧客（自己）",
      decision:"現在出發還是再等", latency:"1 秒" },
    { id:"T-09", preState:"顧客已取餐", actor:"店員", verb:"核對收款",
      object:"OBJ-02 訂單", transition:"付款 已收 → 結案", recipient:"老闆",
      decision:"今天的帳對不對", latency:"1 小時" },
    { id:"T-10", preState:"營業日開始", actor:"老闆", verb:"更新菜單",
      object:"OBJ-01 菜單品項", transition:"上架／售完／隱藏", recipient:"顧客",
      decision:"今天要點什麼", latency:"1 分鐘" },
    { id:"T-11", preState:"有交易發生", actor:"老闆", verb:"查看營收",
      object:"OBJ-07 營收紀錄", transition:"累計", recipient:"老闆（自己）",
      decision:"明天備料多少", latency:"1 小時" },
    { id:"T-12", preState:"製作中發現缺料", actor:"廚師", verb:"回報缺貨",
      object:"OBJ-01 菜單品項", transition:"供應中 → 售完", recipient:"店員",
      decision:"要不要通知顧客換品項", latency:"即時" }
  ];
})(globalThis);
