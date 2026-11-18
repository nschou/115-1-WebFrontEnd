/**
 * materials-data.mjs — 教材索引的唯一來源
 * 改這份，然後跑 `node gen-materials.mjs` 重生 materials.html。
 *
 * audience：teach = 教學視角（我會怎麼上）；learn = 學習者步驟（你依序做什麼）；ref = 參考資料
 * kind：doc = Markdown（線上觀看走閱讀器、另給原始檔）；page = 網站頁面
 */
export const MATERIALS = [
  { audience: "teach", type: "講義", group: "W1", title: "W1 講義：課程總覽與證據鏈", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../01_W01_課程總覽/00_W01_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W2", title: "W2 講義：市場與 Persona", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../02_W02_市場與Persona/00_W02_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W3", title: "W3 講義：顧客旅程地圖", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../03_W03_CJM/00_W03_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W4", title: "W4 講義：服務藍圖", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../04_W04_Blueprint/00_W04_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W5", title: "W5 講義：物件、資訊流、決策、Design", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../05_W05_物件決策與Design/00_W05_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W6", title: "W6 講義：UX、線框、故事與 AC", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../06_W06_UX/00_W06_上課講義.md", kind: "doc" },
  { audience: "teach", type: "講義", group: "W7", title: "W7 講義：18_spec 總規格", desc: "授課視角：我會怎麼帶這一週、重點與常見誤解", href: "../07_W07_Spec/00_W07_上課講義.md", kind: "doc" },
  { audience: "teach", type: "教案", group: "工作坊", title: "典範教案：紙本早餐店（180 分鐘）", desc: "我會怎麼上：觀察 → 三通道 → 損失 → 零科技方案 → 何時才需要系統", href: "../02_W02_市場與Persona/00_典範教案_紙本早餐店.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W1", title: "W1 操作手冊：課程總覽與證據鏈", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../01_W01_課程總覽/00_W01_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W2", title: "W2 操作手冊：市場與 Persona", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../02_W02_市場與Persona/00_W02_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W3", title: "W3 操作手冊：顧客旅程地圖", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../03_W03_CJM/00_W03_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W4", title: "W4 操作手冊：服務藍圖", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../04_W04_Blueprint/00_W04_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W5", title: "W5 操作手冊：物件、資訊流、決策、Design", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../05_W05_物件決策與Design/00_W05_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W6", title: "W6 操作手冊：UX、線框、故事與 AC", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../06_W06_UX/00_W06_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "操作手冊", group: "W7", title: "W7 操作手冊：18_spec 總規格", desc: "學習者步驟：你依序做什麼、檢查什麼、交出什麼", href: "../07_W07_Spec/00_W07_學生操作手冊.md", kind: "doc" },
  { audience: "learn", type: "作業範本", group: "作業", title: "工程推進紀錄：作業範本", desc: "每週一則：症狀 → 誤判 → 證據 → 修法 → 防護", href: "../98_示範案例/雲端早餐店/00_工程推進紀錄_作業範本.md", kind: "doc" },
  { audience: "ref", type: "導覽", group: "導覽", title: "一頁流程圖", desc: "三層卡、紙筆五題、兩個極限、資訊釋放、spec 四條件", href: "flow.html", kind: "page" },
  { audience: "ref", type: "交付", group: "交付", title: "六份交付物導覽", desc: "D1–D6、18 檔對照、為什麼不是 18 份交付物", href: "deliverables.html", kind: "page" },
  { audience: "ref", type: "方法", group: "方法", title: "紙筆 → UX → spec（三層對應）", desc: "紙筆測對不對、畫面測順不順、契約說清楚", href: "../98_示範案例/雲端早餐店/00_紙筆到spec_三層對應.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "因果鏈回推三例", desc: "三條 spec 條文如何從市場與痛點長出來", href: "../98_示範案例/雲端早餐店/00_因果鏈回推_三例.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "spec → research → plan 的驗證", desc: "spec 如何逼出研究題目、回填成計畫取捨", href: "../98_示範案例/雲端早餐店/00_spec到research_plan的驗證.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "領域狀態 vs UI 狀態", desc: "S5（製作完成，待店員確認）之前不得顯示取餐號碼", href: "../98_示範案例/雲端早餐店/00_領域狀態與UI狀態.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "物件定義：基數與身分", desc: "「餐點」只寫存在等於沒定義；1 訂單 → N 份", href: "../98_示範案例/雲端早餐店/00_物件定義_基數與身分.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "工程推進紀錄（七個案例）", desc: "症狀 → 誤判 → 證據 → 修法 → 防護", href: "../98_示範案例/雲端早餐店/00_工程推進紀錄_問題發現與解決.md", kind: "doc" },
  { audience: "ref", type: "方法", group: "方法", title: "名詞展開（30+ 條）", desc: "四端／六態／冪等／降級／單一狀態來源…一句話展開", href: "../98_示範案例/雲端早餐店/00_名詞展開_過度濃縮用語.md", kind: "doc" }
  ,{ audience: "learn", type: "工具", group: "工具", title: "工具與檢查腳本（下載與執行）", desc: "三個 .mjs 放 tools/、在哪個目錄跑、參數與常見錯誤", href: "../tools/README.md", kind: "doc" }
  ,{ audience: "ref", type: "導覽", group: "導覽", title: "示範案例走讀（01 → 18）", desc: "照順序看一次案例：每份回答什麼、下一份接什麼", href: "case.html", kind: "page" }
  ,{ audience: "teach", type: "講義", group: "技術與架構", title: "技術與架構：課程地圖（W11–W16）", desc: "八項主題檢視、P0/P1、十二講、台灣用語對照", href: "../90_技術與架構/00_課程地圖.md", kind: "doc" }
  ,{ audience: "teach", type: "講義", group: "技術與架構", title: "第 1 講講義：全端地圖與請求生命週期", desc: "四層、八步、狀態碼、HTTPS/CORS、快取、拆解 1 秒", href: "../90_技術與架構/01_全端地圖與請求生命週期/00_講義.md", kind: "doc" }
  ,{ audience: "learn", type: "操作手冊", group: "技術與架構", title: "第 1 講手冊：全端地圖與請求生命週期", desc: "六個步驟，每步有「這樣算完成」", href: "../90_技術與架構/01_全端地圖與請求生命週期/00_學生操作手冊.md", kind: "doc" }
  ,{ audience: "ref", type: "導覽", group: "導覽", title: "技術與架構（十二講）", desc: "W11–W16 十二講的主題與教材入口", href: "tech.html", kind: "page" }
  ,{ audience: "teach", type: "教案", group: "技術與架構", title: "六週教案：技術與架構＋教學實驗", desc: "W11–W16 流程、crossover 規則、量測點", href: "../90_技術與架構/實驗與量測/00_六週教案.md", kind: "doc" }
  ,{ audience: "learn", type: "作業", group: "技術與架構", title: "三段式作業模板（A／B／C）", desc: "手寫核心 40／指揮 AI 30／驗證報告 30", href: "../90_技術與架構/實驗與量測/04_作業模板_ABC.md", kind: "doc" }
  ,{ audience: "ref", type: "導覽", group: "技術與架構", title: "實驗與量測（研究設計）", desc: "前後測、段考、crossover、量測表單、同意書", href: "tech.html", kind: "page" }
  ,{ audience: "learn", type: "測驗", group: "技術與架構", title: "線上隨堂測驗（8 份）", desc: "每份 15 分鐘；交卷後產生 PDF，上傳 Teams", href: "quiz.html", kind: "page" }
  ,{ audience: "learn", type: "作業", group: "技術與架構", title: "作業單 R1：訂單狀態頁", desc: "A 無 AI／B 有 AI／C 驗證報告", href: "../90_技術與架構/實驗與量測/04a_作業單_R1.md", kind: "doc" }
  ,{ audience: "learn", type: "作業", group: "技術與架構", title: "作業單 R2：介面契約", desc: "A 無 AI／B 有 AI／C 驗證報告", href: "../90_技術與架構/實驗與量測/04b_作業單_R2.md", kind: "doc" }
  ,{ audience: "learn", type: "作業", group: "技術與架構", title: "作業單 R3：一致性與權限", desc: "整合驗收與反思", href: "../90_技術與架構/實驗與量測/04c_作業單_R3.md", kind: "doc" }
  ,{ audience: "learn", type: "導覽", group: "技術與架構", title: "每週流程（W11–W16）", desc: "前測→教學→後測→作業，全部在同一頁", href: "weeks.html", kind: "page" }
];
