/**
 * quiz-data.js — 每週前測（無 AI）／後測（可用 AI）
 * 規則：題目與選項不得只寫縮寫；第一次出現要附中文說明。
 */
window.QUIZ_DATA = {
  sets: [
    { id: "T0", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W11 前測（全範圍基線）",
      note: "本份不可使用 AI。題目中的名詞都有說明；不會寫的寫下你會怎麼查。",
      questions: [
        { id:"T0-1", type:"single", text:"一次網頁請求中，哪一層負責「檢查輸入與執行業務規則」？", options:["用戶端（使用者的瀏覽器）","邊緣（CDN，內容傳遞網路）","伺服器（執行應用程式的那台機器）","資料層（資料庫）"] },
        { id:"T0-2", type:"single", text:"哪個 HTTP 狀態碼代表「用戶端送出的參數有錯，不應該重試」？", options:["200（成功）","400（請求錯誤）","500（伺服器錯誤）","503（服務暫時不可用）"] },
        { id:"T0-3", type:"short", text:"說明「訂單狀態 S5（製作完成，待店員確認）之前不得顯示取餐號碼」的理由。" },
        { id:"T0-4", type:"short", text:"付款請求因為網路逾時被重送兩次時，要怎麼避免扣兩次款？寫出做法名稱。" },
        { id:"T0-5", type:"single", text:"「顧客看不到別人的訂單」屬於下列哪一項？", options:["身分驗證（確認你是誰）","授權（確認你能做什麼）","快取（把資料暫存起來）","渲染（把資料畫成畫面）"] },
        { id:"T0-6", type:"short", text:"列出一次網頁請求八個步驟中的任三個。" },
        { id:"T0-7", type:"single", text:"要讓資料「可以舊幾秒」，主要靠什麼設定？", options:["快取有效期（Cache-Control 標頭）","資料庫索引","增加伺服器數量","改狀態碼"] },
        { id:"T0-8", type:"short", text:"你的系統中，哪一項資料最需要「強一致（consistency，讀到的一定是最新版本）」？為什麼？" }
      ] },
    { id: "W11post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W11 後測：全端地圖與渲染",
      note: "本份可用 AI。第 4 題不可使用 AI；交卷前請準備 token（AI 用量）截圖。",
      questions: [
        { id:"W11p-1", type:"short", text:"畫出你的四層架構（用戶端／邊緣／伺服器／資料層），並標出請求與回應的方向。" },
        { id:"W11p-2", type:"single", text:"哪一種腳本載入屬性代表「HTML 解析完才依序執行」？", options:["一般 script（下載並執行，會阻塞解析）","async（下載完就執行，順序不保證）","defer（解析完才依序執行）","module（以模組方式載入）"] },
        { id:"W11p-3", type:"short", text:"說明你的系統中，哪一步最可能超過 1 秒，怎麼量？" },
        { id:"W11p-4", type:"short", text:"（不可使用 AI）寫出瀏覽器渲染路徑六步中的任三步。", noAI:true }
      ] },
    { id: "W12pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W12 前測：樣式策略與前端狀態",
      note: "本份不可使用 AI。第 4 題是上週（W11）的保留題。",
      questions: [
        { id:"W12r-1", type:"single", text:"「元件庫（component library）」與「設計系統（design system）」的主要差別是什麼？", options:["免費與付費的差別","元件庫給你可修改的元件原始碼；設計系統給整套世界觀、規範與元件","一個只能用在 React","兩者沒有差別"] },
        { id:"W12r-2", type:"short", text:"為什麼顏色要集中在設計變數（design tokens，例如 --color-primary）而不是寫死在元件裡？" },
        { id:"W12r-3", type:"single", text:"「展開／收合」屬於哪一種狀態？", options:["伺服器端狀態（真相在伺服器）","用戶端狀態（只存在畫面）","資料庫狀態","網路狀態"] },
        { id:"W12r-4", type:"short", text:"（上週保留）四層架構中，哪一層負責把檔案送到離使用者最近的節點？", noAI:true }
      ] },
    { id: "W12post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W12 後測：樣式策略與前端狀態",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W12p-1", type:"short", text:"為你的專案選一條樣式策略（工具優先／元件庫／設計系統），寫出理由與一個代價。" },
        { id:"W12p-2", type:"single", text:"下列哪一項是「伺服器端狀態（真相在伺服器）」？", options:["輸入框裡正在打的字","展開或收合的選單","訂單目前的狀態","滑鼠游標的位置"] },
        { id:"W12p-3", type:"short", text:"畫出你某一頁的三條資料線：讀取（伺服器到畫面）、寫入（畫面到伺服器）、通知（伺服器到其他端）。" },
        { id:"W12p-4", type:"short", text:"（不可使用 AI）說明 CSR（用戶端渲染）與 SSR（伺服器端渲染）的差別，各舉一個適用場景。", noAI:true }
      ] },
    { id: "W13pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W13 前測：型別、ORM 與資料庫",
      note: "本份不可使用 AI。第 4 題是 W12 的保留題。",
      questions: [
        { id:"W13r-1", type:"single", text:"TypeScript（加上型別檢查的 JavaScript）的型別檢查主要發生在什麼時候？", options:["編譯期（寫完編譯時）","執行期（程式跑起來時）","部署後","資料庫"] },
        { id:"W13r-2", type:"short", text:"什麼是「一份 schema（資料欄位與型別的約定）三種用途」？寫出任兩種。" },
        { id:"W13r-3", type:"single", text:"先查 10 張訂單，再逐張查明細，總共幾次查詢？", options:["1 次","2 次","10 次","11 次"] },
        { id:"W13r-4", type:"short", text:"（上週保留）伺服器端狀態與用戶端狀態差在哪？", noAI:true }
      ] },
    { id: "W13post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W13 後測：型別、ORM 與資料庫",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W13p-1", type:"short", text:"為一個 API（應用程式介面）寫出錯誤結構的四個欄位，並說明 retryable（可否重試）的用途。" },
        { id:"W13p-2", type:"single", text:"哪一項不該放在交易（transaction，一組操作要嘛全成功、要嘛全失敗）裡？", options:["建立訂單","扣庫存","發送通知","寫入訂單明細"] },
        { id:"W13p-3", type:"short", text:"說明你專案中一處可能 N+1（先查清單、再逐筆查明細）的查詢與改法。" },
        { id:"W13p-4", type:"short", text:"（不可使用 AI）說明編譯期檢查與執行期檢查各擋什麼。", noAI:true }
      ] },
    { id: "W14pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W14 前測：資料庫與 REST 契約",
      note: "本份不可使用 AI。第 4 題是 W13 的保留題。",
      questions: [
        { id:"W14r-1", type:"single", text:"serverless（無伺服器，用多少算多少）環境最常見的資料庫問題是什麼？", options:["連線數用完","磁碟太慢","沒有 SQL（結構化查詢語言）","不能備份"] },
        { id:"W14r-2", type:"short", text:"什麼是冷啟動（cold start）？" },
        { id:"W14r-3", type:"single", text:"「只更新一張訂單的部分欄位」應該用哪個 HTTP 方法？", options:["GET（讀取）","POST（建立）","PATCH（部分更新）","DELETE（刪除）"] },
        { id:"W14r-4", type:"short", text:"（上週保留）什麼是 N+1（先查清單、再逐筆查明細）查詢？", noAI:true }
      ] },
    { id: "W14post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W14 後測：資料庫與 REST 契約",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W14p-1", type:"short", text:"為「查詢取餐號碼」寫一個 REST（以資源為中心的介面風格）端點：方法、路徑、輸入、輸出。" },
        { id:"W14p-2", type:"single", text:"新增一個欄位到 API（應用程式介面）回應，通常屬於哪一種變更？", options:["破壞性變更（舊用戶端會壞）","非破壞性變更（舊用戶端仍可用）","版本升級","錯誤"] },
        { id:"W14p-3", type:"short", text:"說明你的資料庫連線策略，為什麼不會把連線用完。" },
        { id:"W14p-4", type:"short", text:"（不可使用 AI）寫出一個 4xx（用戶端錯誤）與一個 5xx（伺服器錯誤）的例子，並說明該不該重試。", noAI:true }
      ] },
    { id: "W15pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W15 前測：驗證授權與即時更新",
      note: "本份不可使用 AI。第 4 題是 W14 的保留題。",
      questions: [
        { id:"W15r-1", type:"single", text:"HTTP 401（未通過身分驗證）與 403（已驗證但沒有權限）的差別是什麼？", options:["401 是未驗證、403 是已驗證但無權限","401 是禁止、403 是未驗證","兩者相同","401 是伺服器錯誤"] },
        { id:"W15r-2", type:"short", text:"為什麼「前端把按鈕藏起來」不能當成權限控管？" },
        { id:"W15r-3", type:"single", text:"需要伺服器主動推送、單向的狀態更新，適合用哪一種方式？", options:["輪詢（用戶端定時問）","SSE（伺服器推送事件，單向長連線）","WebSocket（雙向長連線）","FTP（檔案傳輸）"] },
        { id:"W15r-4", type:"short", text:"（上週保留）寫出一個 4xx 與一個 5xx 的例子。", noAI:true }
      ] },
    { id: "W15post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W15 後測：驗證授權與即時更新",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W15p-1", type:"short", text:"做一張權限矩陣（角色 × 動作），並寫一條「誰絕對不能做什麼」的規則。" },
        { id:"W15p-2", type:"single", text:"事件序號（sequence，每一筆事件遞增的編號）的主要用途是什麼？", options:["加密","判斷事件的新舊","壓縮","計費"] },
        { id:"W15p-3", type:"short", text:"為你的 1 秒需求選一種即時方式（輪詢／SSE（伺服器推送事件）／WebSocket（雙向長連線）），寫理由與代價。" },
        { id:"W15p-4", type:"short", text:"（不可使用 AI）說明通知失敗時的三步復原流程。", noAI:true }
      ] },
    { id: "W16pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W16 前測：一致性與選型",
      note: "本份不可使用 AI。第 4 題是 W15 的保留題。",
      questions: [
        { id:"W16r-1", type:"single", text:"「一組操作要嘛全成功、要嘛全失敗」稱為什麼？", options:["交易（transaction）","快取","降級","遷移"] },
        { id:"W16r-2", type:"short", text:"取餐號碼要怎麼避免兩個店員同時拿到同一個號碼？" },
        { id:"W16r-3", type:"single", text:"冪等（idempotent，同一個操作重送多次只生效一次）的意思是？", options:["重送多次只生效一次","速度很快","一定有交易","不需要驗證"] },
        { id:"W16r-4", type:"short", text:"（上週保留）SSE（伺服器推送事件）與 WebSocket（雙向長連線）的差別是什麼？", noAI:true }
      ] },
    { id: "W16post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W16 後測：一致性與選型",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W16p-1", type:"short", text:"寫出付款的冪等（idempotent）規則：同一個付款請求重送兩次，怎麼只扣一次？" },
        { id:"W16p-2", type:"single", text:"決策矩陣（decision matrix，用準則與權重比較選項）至少要有哪三樣？", options:["準則、權重、評分","標題、作者、日期","版本、價格、授權","前端、後端、資料庫"] },
        { id:"W16p-3", type:"short", text:"用一個決策寫 ADR（架構決策紀錄）的六個欄位（可簡寫）。" },
        { id:"W16p-4", type:"short", text:"（不可使用 AI）說明你系統中哪一項資料可以「最終一致（eventual consistency，短暫落後但最後相同）」，為什麼。", noAI:true }
      ] },
    { id: "T3", kind: "post", aiAllowed: false, minutes: 15,
      title: "W16 全範圍後測（無 AI）",
      note: "本份不可使用 AI。與 W11 前測同題型、不同情境，用來比較進步。",
      questions: [
        { id:"T3-1", type:"single", text:"一次網頁請求中，哪一層負責把檔案送到離使用者最近的節點？", options:["用戶端","邊緣（CDN，內容傳遞網路）","伺服器","資料層"] },
        { id:"T3-2", type:"single", text:"哪個狀態碼代表「已通過身分驗證，但沒有權限」？", options:["400","401","403","404"] },
        { id:"T3-3", type:"short", text:"飲料店情境：「做完但還沒封膜」不得顯示取餐號碼，理由是什麼？" },
        { id:"T3-4", type:"short", text:"取消訂單時使用者重送兩次，要怎麼保證只取消一次？" },
        { id:"T3-5", type:"single", text:"「店員不能替顧客按下『已取餐』」屬於哪一項？", options:["身分驗證","授權","快取","渲染"] },
        { id:"T3-6", type:"short", text:"列出瀏覽器渲染路徑六步中的任三步。" },
        { id:"T3-7", type:"single", text:"事件序號（sequence）的用途是什麼？", options:["判斷事件的新舊","加密","壓縮","計費"] },
        { id:"T3-8", type:"short", text:"你的系統中，哪一項資料可以容許「最終一致」？為什麼？" }
      ] }
  ]
};
