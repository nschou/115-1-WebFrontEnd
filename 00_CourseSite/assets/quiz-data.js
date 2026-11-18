/**
 * quiz-data.js — 每週前測（無 AI）／後測（可用 AI）
 * kind: pre / post；aiAllowed 控制整份是否可用 AI；題目 noAI:true 表示該題不可用 AI。
 * 答案另存（07_答案與評分規準）。
 */
window.QUIZ_DATA = {
  sets: [
    { id: "T0", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W11 前測（全範圍基線）",
      note: "本份不可使用 AI。目的：建立你的起點；不會寫的寫下你會怎麼查。",
      questions: [
        { id:"T0-1", type:"single", text:"一次請求中，哪一層負責驗證與業務規則？", options:["用戶端","邊緣","伺服器","資料層"] },
        { id:"T0-2", type:"single", text:"哪個狀態碼代表用戶端參數錯誤、不該重試？", options:["200","400","500","503"] },
        { id:"T0-3", type:"short", text:"說明「S5（製作完成，待店員確認）之前不得顯示取餐號碼」的理由。" },
        { id:"T0-4", type:"short", text:"付款重送時，要怎麼避免扣兩次？寫出做法名稱。" },
        { id:"T0-5", type:"single", text:"顧客看不到別人的訂單，屬於哪一項？", options:["身分驗證","授權","快取","渲染"] },
        { id:"T0-6", type:"short", text:"列出一次請求八個步驟中的任三個。" },
        { id:"T0-7", type:"single", text:"要讓資料可以舊幾秒，主要靠什麼設定？", options:["快取有效期","資料庫索引","增加伺服器","改狀態碼"] },
        { id:"T0-8", type:"short", text:"你的系統中，哪一項資料最需要強一致（consistency）？為什麼？" }
      ] },
    { id: "W11post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W11 後測：全端地圖與渲染",
      note: "本份可用 AI。第 4 題不可使用 AI；交卷前請準備 token 截圖。",
      questions: [
        { id:"W11p-1", type:"short", text:"畫出你的四層架構（文字描述即可），並標出請求與回應方向。" },
        { id:"W11p-2", type:"single", text:"哪一種腳本屬性「解析完才依序執行」？", options:["一般 script","async","defer","module"] },
        { id:"W11p-3", type:"short", text:"說明你的系統中，哪一步最可能超過 1 秒，怎麼量？" },
        { id:"W11p-4", type:"short", text:"（不可使用 AI）寫出渲染路徑六步中的任三步。", noAI:true }
      ] },
    { id: "W12pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W12 前測：樣式策略與前端狀態",
      note: "本份不可使用 AI。第 4 題是上週（W11）的保留題。",
      questions: [
        { id:"W12r-1", type:"single", text:"「元件庫」與「設計系統」的主要差別？", options:["免費與付費","原始碼與整套世界觀","React 專用","沒有差別"] },
        { id:"W12r-2", type:"short", text:"為什麼顏色要集中在設計變數（tokens）？" },
        { id:"W12r-3", type:"single", text:"「展開／收合」屬於哪一種狀態？", options:["伺服器端狀態","用戶端狀態","資料庫狀態","網路狀態"] },
        { id:"W12r-4", type:"short", text:"（上週保留）四層架構中，哪一層把檔案送到最近節點？", noAI:true }
      ] },
    { id: "W12post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W12 後測：樣式策略與前端狀態",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W12p-1", type:"short", text:"為你的專案選一條樣式策略，寫出理由與一個代價。" },
        { id:"W12p-2", type:"single", text:"下列哪一項是伺服器端狀態？", options:["輸入框的字","展開的選單","訂單目前狀態","滑鼠位置"] },
        { id:"W12p-3", type:"short", text:"畫出你某一頁的三條資料線（讀取／寫入／通知）。" },
        { id:"W12p-4", type:"short", text:"（不可使用 AI）說明 CSR 與 SSR 的差別，各舉一個適用場景。", noAI:true }
      ] },
    { id: "W13pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W13 前測：型別、ORM 與資料庫",
      note: "本份不可使用 AI。第 4 題是 W12 的保留題。",
      questions: [
        { id:"W13r-1", type:"single", text:"TypeScript 的型別檢查主要發生在什麼時候？", options:["編譯期","執行期","部署後","資料庫"] },
        { id:"W13r-2", type:"short", text:"什麼是「一份 schema 三種用途」？寫出任兩種。" },
        { id:"W13r-3", type:"single", text:"先查 10 張訂單再逐張查明細，總共幾次查詢？", options:["1","2","10","11"] },
        { id:"W13r-4", type:"short", text:"（上週保留）伺服器端狀態與用戶端狀態差在哪？", noAI:true }
      ] },
    { id: "W13post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W13 後測：型別、ORM 與資料庫",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W13p-1", type:"short", text:"為一個 API 寫出錯誤結構四欄，並說明 retryable 的用途。" },
        { id:"W13p-2", type:"single", text:"哪一項不該放在交易（transaction）裡？", options:["建立訂單","扣庫存","發送通知","寫入明細"] },
        { id:"W13p-3", type:"short", text:"說明你專案中一處可能 N+1 的查詢與改法。" },
        { id:"W13p-4", type:"short", text:"（不可使用 AI）說明編譯期與執行期檢查各擋什麼。", noAI:true }
      ] },
    { id: "W14pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W14 前測：資料庫與 REST 契約",
      note: "本份不可使用 AI。第 4 題是 W13 的保留題。",
      questions: [
        { id:"W14r-1", type:"single", text:"serverless 環境最常見的資料庫問題？", options:["連線數用完","磁碟太慢","沒有 SQL","不能備份"] },
        { id:"W14r-2", type:"short", text:"什麼是冷啟動（cold start）？" },
        { id:"W14r-3", type:"single", text:"「部分更新一張訂單」應該用哪個方法？", options:["GET","POST","PATCH","DELETE"] },
        { id:"W14r-4", type:"short", text:"（上週保留）什麼是 N+1 查詢？", noAI:true }
      ] },
    { id: "W14post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W14 後測：資料庫與 REST 契約",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W14p-1", type:"short", text:"為「查詢取餐號碼」寫一個端點（方法、路徑、輸入、輸出）。" },
        { id:"W14p-2", type:"single", text:"新增欄位到 API 回應，通常屬於？", options:["破壞性變更","非破壞性變更","版本升級","錯誤"] },
        { id:"W14p-3", type:"short", text:"說明你的連線策略，為什麼不會把連線用完。" },
        { id:"W14p-4", type:"short", text:"（不可使用 AI）寫出一個 4xx 與一個 5xx 的例子，並說明該不該重試。", noAI:true }
      ] },
    { id: "W15pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W15 前測：驗證授權與即時更新",
      note: "本份不可使用 AI。第 4 題是 W14 的保留題。",
      questions: [
        { id:"W15r-1", type:"single", text:"401 與 403 的差別？", options:["401 未驗證、403 已驗證但無權限","401 禁止、403 未驗證","兩者相同","401 是伺服器錯誤"] },
        { id:"W15r-2", type:"short", text:"為什麼前端把按鈕藏起來不能當成權限控管？" },
        { id:"W15r-3", type:"single", text:"需要伺服器主動推、單向的更新，適合用？", options:["輪詢","SSE","WebSocket","FTP"] },
        { id:"W15r-4", type:"short", text:"（上週保留）寫出一個 4xx 與一個 5xx 的例子。", noAI:true }
      ] },
    { id: "W15post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W15 後測：驗證授權與即時更新",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W15p-1", type:"short", text:"做一張權限矩陣（四角色 × 四動作），並寫一條禁用規則。" },
        { id:"W15p-2", type:"single", text:"事件序號（sequence）的主要用途？", options:["加密","判斷新舊事件","壓縮","計費"] },
        { id:"W15p-3", type:"short", text:"為你的 1 秒需求選一種即時方式，寫理由與代價。" },
        { id:"W15p-4", type:"short", text:"（不可使用 AI）說明通知失敗時的三步復原流程。", noAI:true }
      ] },
    { id: "W16pre", kind: "pre", aiAllowed: false, minutes: 15,
      title: "W16 前測：一致性與選型",
      note: "本份不可使用 AI。第 4 題是 W15 的保留題。",
      questions: [
        { id:"W16r-1", type:"single", text:"「一組操作要嘛全成功、要嘛全失敗」稱為什麼？", options:["交易（transaction）","快取","降級","遷移"] },
        { id:"W16r-2", type:"short", text:"取餐號碼要怎麼避免兩人同時拿到同一個號碼？" },
        { id:"W16r-3", type:"single", text:"冪等（idempotent）的意思是？", options:["重送多次只生效一次","速度很快","一定有交易","不需要驗證"] },
        { id:"W16r-4", type:"short", text:"（上週保留）SSE 與 WebSocket 的差別？", noAI:true }
      ] },
    { id: "W16post", kind: "post", aiAllowed: true, minutes: 15,
      title: "W16 後測：一致性與選型",
      note: "本份可用 AI。第 4 題不可使用 AI。",
      questions: [
        { id:"W16p-1", type:"short", text:"寫出付款冪等（idempotent）規則：重送兩次怎麼只扣一次？" },
        { id:"W16p-2", type:"single", text:"決策矩陣（decision matrix）至少要有哪三樣？", options:["準則、權重、評分","標題、作者、日期","版本、價格、授權","前端、後端、資料庫"] },
        { id:"W16p-3", type:"short", text:"用一個決策寫 ADR 的六個欄位（可簡寫）。" },
        { id:"W16p-4", type:"short", text:"（不可使用 AI）說明你系統中哪一項資料可以最終一致（eventual consistency），為什麼。", noAI:true }
      ] },
    { id: "T3", kind: "post", aiAllowed: false, minutes: 15,
      title: "W16 全範圍後測（無 AI）",
      note: "本份不可使用 AI。與 W11 前測同題型、不同情境，用來比較進步。",
      questions: [
        { id:"T3-1", type:"single", text:"一次請求中，哪一層負責把檔案送到最近節點？", options:["用戶端","邊緣","伺服器","資料層"] },
        { id:"T3-2", type:"single", text:"哪個狀態碼代表已驗證但沒有權限？", options:["400","401","403","404"] },
        { id:"T3-3", type:"short", text:"飲料店情境：「做完但還沒封膜」不得顯示取餐號，理由是什麼？" },
        { id:"T3-4", type:"short", text:"取消訂單時使用者重送兩次，要怎麼保證只取消一次？" },
        { id:"T3-5", type:"single", text:"店員不能替顧客按下已取餐，屬於哪一項？", options:["身分驗證","授權","快取","渲染"] },
        { id:"T3-6", type:"short", text:"列出渲染路徑六步中的任三步。" },
        { id:"T3-7", type:"single", text:"事件序號（sequence）的用途？", options:["判斷事件新舊","加密","壓縮","計費"] },
        { id:"T3-8", type:"short", text:"你的系統中，哪一項資料可以容許最終一致？為什麼？" }
      ] }
  ]
};
