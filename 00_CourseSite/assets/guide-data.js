window.GUIDE_DATA = {
  sharedPrompt: String.raw`你是本課程的分析與文件協作助手。請遵守以下規則：
1. 只能根據我提供的文件、研究資料與明確標示的假設推導；沒有證據的內容標記為「待確認」，不要虛構來源、數字、訪談或使用者行為。
2. 先列出已知資料、缺少資料、矛盾與需要我決定的問題，再提出草稿。
3. 每個結論都要附來源文件、段落或 ID；找不到來源就不要寫成確定事實。
4. 不要跳過上游階段，不要擅自決定服務規則，不要把技術方案混入業務文件。
5. 請把「建議草稿」與「需要人工確認」分開，最後列出下一步與驗收方式。
6. 請使用臺灣繁體中文；第一次出現的英文術語保留英文原詞。`,
  weeks: [
    { id: "W1", title: "方法與工作區", range: "建立證據鏈" },
    { id: "W2", title: "市場與 Persona", range: "01–02" },
    { id: "W3", title: "CJM 顧客旅程", range: "03" },
    { id: "W4", title: "服務藍圖", range: "04" },
    { id: "W5", title: "物件、決策與 Design", range: "05–10" },
    { id: "W6", title: "需求到 UX", range: "11–17" },
    { id: "W7", title: "Spec", range: "18" }
  ],
  stages: [
    {
      id: "00", week: "W1", title: "建立工作區", file: "00_project-brief.md",
      question: "這個服務問題、角色與研究範圍是什麼？",
      goal: "建立專案工作區、文件索引與未決問題；先學會管理證據，不先做畫面。",
      inputs: ["一個至少有兩種角色交接的服務題目", "初步問題假設", "目前知道與不知道的事情"],
      outputs: "00_project-brief.md、00_document-index.md、00_open-questions.md、changelog.md。",
      handoff: "把問題假設、研究問題與文件交接欄位交給 W2 的 01_market.md、02_persona.md。",
      traps: ["只寫想做一個 App", "先做 UI 或技術方案", "把空白檔案當完成", "用想像填補未知資料"],
      docs: ["../00_學生發布版/00_學生教材入口_GoogleDoc.md", "../00_學生發布版/01_W01_課程總覽/00_W01_學生操作手冊.md", "../00_學生發布版/01_W01_課程總覽/00_W01_上課講義.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：W1 建立工作區
服務題目：{{服務名稱與服務場域}}
目前知道的問題：{{填寫已有觀察或資料}}
目前不知道的事情：{{至少三個待研究問題}}

請協助我建立 W1 工作區，不要替我發明研究結論：
1. 將服務問題整理成 00_project-brief.md：服務名稱、問題情境、初步角色、範圍、排除範圍與假設。
2. 建立 00_document-index.md：列出 18 檔主線、每份文件回答的問題、直接輸入與直接交給誰。
3. 建立 00_open-questions.md：至少三個目前不能猜的問題，標示原因、預計解決週次與影響文件。
4. 建立 changelog.md 初始紀錄；若涉及文件責任或重大決策，提醒我建立 ADR。
5. 檢查本服務是否至少有兩種角色互相交接；若只有單一使用者，先提出範圍問題。

本週禁止產生 UI、Wireframe、API、資料庫或技術方案。
輸出順序：已知／未知 → 缺口與風險 → 三份 W1 文件草稿 → 下一週輸入 → 人工確認清單。`
    },
    {
      id: "01", week: "W2", title: "市場選擇", file: "01_market.md",
      question: "選哪個市場？機會與限制是什麼？",
      goal: "用可查證的研究比較市場，不直接從喜好選題。",
      inputs: ["研究問題與專案假設", "至少兩個候選市場", "來源、日期與限制"],
      outputs: "市場比較、選擇理由、限制與仍待確認的問題。",
      handoff: "把市場範圍、角色線索與限制交給 02_persona.md。",
      traps: ["只研究一個市場", "沒有來源日期", "請 AI 直接寫結論", "把猜測寫成市場事實"],
      docs: ["../00_學生發布版/01_W01_課程總覽/00_W01_學生操作手冊.md", "../00_學生發布版/98_示範案例/雲端早餐店/01_market.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：01_market.md
我的服務暫定為：{{服務名稱}}
研究範圍：{{市場或場域}}
目前已有資料：
{{貼上研究資料、來源 URL、日期與限制}}

請協助我：
1. 將資料整理成候選市場比較表，欄位至少包含問題、需求證據、角色、機會、限制、來源與日期。
2. 分開「資料直接支持的觀察」與「需要再研究的推論」。
3. 提出市場選擇建議，但不得替我假造研究結論。
4. 產生 01_market.md 草稿前，先列出缺少的來源與需要我決定的問題。
5. 每個選擇理由回指來源；沒有來源的內容標記為待確認。

輸出順序：資料盤點 → 矛盾與缺口 → 比較表 → 可選結論 → 待確認問題 → 文件草稿。`
    },
    {
      id: "02", week: "W2", title: "Persona 與角色", file: "02_persona.md",
      question: "誰有問題、誰決策、誰交付？",
      goal: "辨認付款者、決策者、主要使用者、交付者與支援角色。",
      inputs: ["01_market.md", "研究推導資料", "角色線索與責任"],
      outputs: "角色層次、目標、痛點、責任與待確認事項。",
      handoff: "把角色情境與責任交給 03_cjm.md、04_blueprint.md。",
      traps: ["把 Persona 寫成人物小說", "把付款者、使用者與交付者混成一人", "捏造人物資料"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/02_persona.md", "../00_學生發布版/00_學生教材入口_GoogleDoc.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：02_persona.md
上一階段市場結論：
{{貼上 01_market.md 中的選擇、限制與來源}}
研究或訪談資料：
{{貼上資料；沒有資料請明確寫沒有}}

請協助我：
1. 分辨付款／決策者、主要使用者、服務交付者、設施或支援角色。
2. 對每個角色整理情境、目標、責任、痛點、成功標準與證據來源。
3. 不要補寫未被資料支持的人口統計或行為。
4. 找出角色之間的交接與衝突，列入後續 CJM／Blueprint 的研究問題。
5. 先輸出缺資料與矛盾，再產生 02_persona.md 草稿。

請使用角色表，不要寫成沒有證據的人物故事。`
    },
    {
      id: "03", week: "W3", title: "CJM 顧客旅程", file: "03_cjm.md",
      question: "顧客在哪一段旅程中受阻？",
      goal: "描述階段、行動、接觸點、情緒、痛點與機會，指出最低點。",
      inputs: ["02_persona.md", "使用情境", "角色目標與痛點"],
      outputs: "完整旅程、情緒變化、最低點、機會與來源。",
      handoff: "把前台行動、痛點與機會交給 04_blueprint.md。",
      traps: ["用頁面切旅程", "把多個角色混成一條旅程", "只有 happy path", "情緒沒有證據"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/03_cjm.md", "../03_W03_CJM/00_W03_教師教學指引.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：03_cjm.md
角色與情境：
{{貼上 02_persona.md 的相關內容}}
研究資料：
{{貼上旅程事件、訪談、觀察或明確假設}}

請協助我：
1. 以時間順序整理顧客旅程階段，不要用畫面名稱代替旅程階段。
2. 每階段列出角色行動、目標、接觸點、情緒、痛點、機會與證據。
3. 指出情緒最低點及其原因；若沒有資料，標記待確認。
4. 分別列出顧客、服務交付者與支援角色的旅程差異。
5. 先指出推導缺口與相互矛盾之處，再產生 03_cjm.md 草稿。

不要把「做一個 App」當成機會；機會必須回應已辨認的痛點。`
    },
    {
      id: "04", week: "W4", title: "服務藍圖", file: "04_blueprint.md",
      question: "前台行動背後誰做什麼？",
      goal: "把前台、後台、支援、交接、失敗與候選方案放在同一張服務藍圖。",
      inputs: ["02_persona.md", "03_cjm.md", "支援系統角色"],
      outputs: "前台行動、後台活動、支援、交接、等待與候選方案。",
      handoff: "把角色交接、業務對象與失敗點交給 05–07。",
      traps: ["把系統當成角色", "把候選方案提前當定案", "漏掉等待與失敗交接"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/04_blueprint.md", "../04_W04_Blueprint/00_W04_教師教學指引.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：04_blueprint.md
CJM 相關階段：
{{貼上 03_cjm.md 的旅程與最低點}}
角色資料：
{{貼上 02_persona.md 的角色責任}}

請協助我建立服務藍圖：
1. 對每個旅程階段列出顧客／前台行動、可見證據、後台活動、支援活動與責任角色。
2. 找出角色交接、等待、失敗、補救與資訊回傳。
3. 列出至少兩個可行方案，明確說明差異、代價與未決問題；不要直接替我定案。
4. 把「系統」拆成實際負責的角色、活動或支援服務。
5. 每列回指 CJM、Persona 或研究來源。

輸出：資料缺口 → 藍圖表 → 交接與失敗分析 → 候選方案 → 待決策事項。`
    },
    {
      id: "05", week: "W5", title: "業務物件", file: "05_objects.md",
      question: "哪些業務物件會跨角色流動？",
      goal: "定義會被不同角色建立、觀察、修改或交接的業務物件。",
      inputs: ["04_blueprint.md", "角色交接", "服務事件"],
      outputs: "物件 ID、生命週期、觀測者、責任者與來源。",
      handoff: "把物件、狀態與觀測者交給 06_infoflow.md。",
      traps: ["把每個欄位都當物件", "漏掉生命週期", "只列名詞不說誰使用"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/05_objects.md", "../05_W05_物件決策與Design/00_W05_學生操作手冊.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：05_objects.md
服務藍圖與角色交接：
{{貼上 04_blueprint.md 相關段落}}

請協助我辨認跨角色業務物件：
1. 只列會被建立、傳遞、觀察、修改或交接的業務物件，不要把每個欄位都當成物件。
2. 為每個物件給唯一 ID、定義、建立者、使用者／觀測者、生命週期與來源。
3. 指出物件與角色任務、服務階段的關係。
4. 找出名稱重複、責任不明或其實只是資訊欄位的項目。
5. 先列缺口與疑問，再產生 05_objects.md 草稿。

不要加入資料庫表格、API 或技術實作名詞。`
    },
    {
      id: "06", week: "W5", title: "資訊流", file: "06_infoflow.md",
      question: "物件如何變更？誰在等待？",
      goal: "描述事件、狀態變更、等待者、時效、競爭與真實來源。",
      inputs: ["04_blueprint.md", "05_objects.md", "服務事件"],
      outputs: "事件、狀態轉換、等待者、時效、衝突與例外。",
      handoff: "把狀態與時序交給 07_decisions.md、08_baseline。",
      traps: ["改寫成 API 或資料庫設計", "漏掉等待者", "狀態名稱不一致", "沒有例外路徑"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/06_infoflow.md", "../00_學生發布版/00_學生教材入口_GoogleDoc.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：06_infoflow.md
業務物件：
{{貼上 05_objects.md}}
服務藍圖：
{{貼上 04_blueprint.md 的交接與失敗段落}}

請協助我整理業務資訊流：
1. 對每個物件列出事件、前置狀態、後置狀態、觸發角色、等待者、時效與可觀察證據。
2. 找出同一物件被不同角色同時修改、等待過久或狀態名稱不一致的地方。
3. 描述失敗、重試、取消、補救與通知，不要只寫正常流程。
4. 標示真正的業務來源與誰有權改變狀態。
5. 不要加入 API、資料庫、佇列或框架方案；先完成業務資訊流。

先輸出狀態與事件表，再列矛盾與待確認問題。`
    },
    {
      id: "07", week: "W5", title: "服務決策", file: "07_decisions.md",
      question: "候選方案採用哪一個？",
      goal: "用證據、限制、代價與影響做出可追溯決策。",
      inputs: ["01–06 主線文件", "候選方案", "研究與限制"],
      outputs: "SD-01 起的決策、採用方案、理由、代價與影響。",
      handoff: "把已採用的方案交給 08_service-design-baseline.md。",
      traps: ["保留 A 或 B 不決定", "只寫比較方便", "決策沒有影響範圍", "讓 AI 自動代替決策者"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/07_decisions.md", "../05_W05_物件決策與Design/00_W05_教師教學指引.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：07_decisions.md
目前候選方案與上游證據：
{{貼上 01–06 中與決策相關的內容}}
決策者與限制：
{{誰可以決定、有哪些不可違反限制}}

請協助我建立可審查的決策紀錄：
1. 將每個決策編成 SD-01、SD-02……，寫清楚背景、候選方案、評估準則、證據、採用方案、理由、代價、風險與受影響文件。
2. 分開「證據支持的判斷」與「仍需決策者選擇的部分」。
3. 找出決策互相矛盾或會影響上游／下游的地方。
4. 不要替我自動選擇；若缺少決策者輸入，標記待決定。
5. 產生 07_decisions.md 草稿前，先列出所有未決選項。

最後產生一份可交給決策者確認的摘要。`
    },
    {
      id: "08", week: "W5", title: "服務基準", file: "08_service-design-baseline.md",
      question: "現在唯一採用的服務版本是什麼？",
      goal: "把候選方案收斂成唯一服務基準，讓下游不再自行選方案。",
      inputs: ["04–07", "已採用的 SD 決策", "不可違反限制"],
      outputs: "唯一服務版本、狀態、責任、限制與開放選項為 0。",
      handoff: "把服務基準交給 09–18；下游不得重新開啟已決策事項。",
      traps: ["同時保留多個版本", "與 07_decisions.md 矛盾", "把未決選項藏進文字", "讓 AI 自行選方案"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/08_service-design-baseline.md", "../00_課程中間回顧與思考框架.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：08_service-design-baseline.md
已採用決策：
{{貼上 07_decisions.md 的已採用決策}}
相關 Blueprint、物件與資訊流：
{{貼上需要保留的內容}}

請協助我整理唯一的服務基準：
1. 只納入已採用且有來源的服務規則、角色、物件、狀態、交接與限制。
2. 每一項回指對應 SD、Blueprint、Object 或 Infoflow ID。
3. 列出仍未解決的問題；不要把未決選項假裝成基準。
4. 檢查與 07_decisions.md 是否矛盾，若矛盾先停止並列出差異。
5. 產生 08_service-design-baseline.md 前，先輸出「唯一採用版本摘要」與「下游不可重新決定事項」。

完成條件：開放選項為 0；下游可以直接依此建立 Design 與需求。`
    },
    {
      id: "09", week: "W5", title: "Design 契約", file: "09_DESIGN.md",
      question: "視覺與互動的設計契約是什麼？",
      goal: "把服務基準轉成可追溯、可重用且可審查的設計規則。",
      inputs: ["08_service-design-baseline.md", "品牌資料", "可用性與環境限制"],
      outputs: "設計原則、元件規則、狀態、文案、來源與限制。",
      handoff: "把語意設計契約交給 10_tokens.css、15_UX 與 Prototype。",
      traps: ["只交工具匯出檔", "沒有來源", "畫面各自決定顏色", "漏掉錯誤與遠距顯示"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/09_DESIGN.md", "../00_學生發布版/98_示範案例/雲端早餐店/09_DESIGN_audit.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：09_DESIGN.md
服務基準：
{{貼上 08_service-design-baseline.md}}
品牌／環境／可用性資料：
{{貼上來源與限制}}

請協助我建立設計契約：
1. 從服務基準推導資訊優先級、狀態、互動原則、文案原則、元件規則與環境限制。
2. 每個設計結論附來源；分開品牌來源、可用性理由與目前假設。
3. 明確處理 default、loading、empty、error、success、interrupted 等必要狀態。
4. 檢查對比、字級、觸控、鍵盤、遠距顯示與錯誤回饋，不要只談顏色美感。
5. 不要直接產生框架 CSS；先產生可審查的設計規則與待確認事項。

輸出：來源盤點 → 設計原則 → 元件與狀態契約 → 可用性限制 → 審查問題。`
    },
    {
      id: "10", week: "W5", title: "Design Tokens", file: "10_tokens.css",
      question: "如何把設計契約變成可重用尺度？",
      goal: "建立語意 token，讓設計契約能被 Prototype 與後續實作一致使用。",
      inputs: ["09_DESIGN.md", "語意顏色、尺度、字體與元件規則"],
      outputs: "可重用 token、語意別名、來源註記與同步規則。",
      handoff: "把 token 契約交給 UX、Wireframe、Prototype 與 SpecKit plan。",
      traps: ["只改原始色票", "畫面各自寫 CSS", "token 名稱沒有語意", "YAML、CSS 與畫面不同步"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/10_tokens.css", "../06_W06_UX/16_wireframes/prototype/assets/tokens.css"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：10_tokens.css
設計契約：
{{貼上 09_DESIGN.md 中的顏色、字級、間距、元件與狀態規則}}

請協助我設計語意 token：
1. 將原始色票、字體、間距與元件值分成「來源值」與「語意別名」。
2. token 名稱必須表達用途，例如背景、主要操作、錯誤文字，不要只叫 color-1。
3. 建立 09_DESIGN.md → token → 元件／畫面的對照表。
4. 找出同一語意有多個值、CSS 與設計文件不一致、或畫面繞過 token 的地方。
5. 不要替我引入框架；輸出可直接審查的 token 草稿與同步規則。

任何沒有設計來源的 token 請標記待確認。`
    },
    {
      id: "11", week: "W6", title: "服務需求索引", file: "11_service-requirements.md",
      question: "需求如何跨來源索引？",
      goal: "把 CJM、Blueprint、物件與資訊流中的需求整理成可追溯索引。",
      inputs: ["08_service-design-baseline.md", "03、04、05、06", "研究與決策 ID"],
      outputs: "REQ、角色、痛點、物件、狀態、來源與下游連結。",
      handoff: "把可追溯需求交給 12_role-tasks.md 與 13_UserStory-B.md。",
      traps: ["寫成功能清單", "來源欄位空白", "把技術需求混進業務需求", "同一需求重複命名"],
      docs: ["../06_W06_UX/11_service-requirements/README.md", "../00_學生發布版/98_示範案例/雲端早餐店/11_service-requirements.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：11_service-requirements.md
上游文件與 ID：
{{貼上 Baseline、CJM、Blueprint、Objects、Infoflow 的相關內容}}

請協助我建立需求索引：
1. 將服務問題轉成 REQ-xx，描述業務需要，不描述按鈕、API、資料庫或框架。
2. 每條 REQ 指定角色、痛點、物件、狀態、來源 ID、成功結果與限制。
3. 合併重複需求，保留不同來源與差異。
4. 找出沒有來源、無法驗證、彼此矛盾或其實是技術方案的項目。
5. 先輸出追溯矩陣與缺口，再產生 11_service-requirements.md 草稿。

完成條件：每條需求都能追溯到上游，且能交給角色任務與 User Story。`
    },
    {
      id: "12", week: "W6", title: "角色任務", file: "12_role-tasks.md",
      question: "每個角色在什麼狀態對物件做什麼？",
      goal: "用七格業務任務描述角色、動作、物件、狀態、決策與時效。",
      inputs: ["08、11", "05_objects.md", "06_infoflow.md"],
      outputs: "角色任務句、狀態轉換、B 的決策與時效。",
      handoff: "把任務契約交給 13_UserStory-B 與 14_elements。",
      traps: ["寫成按鈕或程式任務", "漏掉前置狀態", "沒有 B 的決策", "時效寫不清楚"],
      docs: ["../06_W06_UX/12_role-tasks/12_role-tasks_generated_reference.md", "../00_學生發布版/98_示範案例/雲端早餐店/12_role-tasks.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：12_role-tasks.md
需求與資訊流：
{{貼上 11_service-requirements、05_objects、06_infoflow 的內容}}

請協助我把需求寫成七格角色任務：
1. 每條任務包含前置業務狀態、A、業務動作、物件、狀態轉換、B 的決策與時效。
2. 使用業務語言，不寫頁面、按鈕、API 或程式實作。
3. 檢查每個動作是否真的改變狀態，或明確標示為查詢／觀察。
4. 找出角色責任、物件名稱、狀態名稱與 Infoflow 不一致的地方。
5. 先列不完整任務與缺資料，再產生 12_role-tasks.md 草稿。

請提供任務 ID，讓後續 User Story、Elements 與 AC 可以回指。`
    },
    {
      id: "13", week: "W6", title: "User Story-B", file: "13_UserStory-B.md",
      question: "角色要完成什麼業務價值？",
      goal: "從旅程、需求與角色任務寫出業務價值，不先寫畫面。",
      inputs: ["03_cjm.md", "11_service-requirements.md", "12_role-tasks.md"],
      outputs: "角色、目標、成果、以便、來源與任務回指。",
      handoff: "把業務意圖交給 14_elements、15_UX。",
      traps: ["寫成我要一個按鈕", "沒有角色或成果", "把 US-B 與 US-I 混在一起", "沒有來源痛點"],
      docs: ["../06_W06_UX/13_UserStory-B/README.md", "../00_學生發布版/98_示範案例/雲端早餐店/13_UserStory-B.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：13_UserStory-B.md
CJM 痛點：
{{貼上相關 CJM 段落}}
需求與角色任務：
{{貼上 REQ 與 T 的內容}}

請協助我寫 User Story-B：
1. 每條使用「作為某角色，我想要完成某成果，以便得到某價值」的業務語言。
2. 角色必須來自 Persona／Role tasks，成果必須來自需求與任務，價值必須回應 CJM 痛點。
3. 不要寫畫面、按鈕、欄位、API 或技術方案。
4. 每條 US-B 回指來源痛點、REQ 與任務 ID。
5. 檢查重複、角色錯置、成果不可能或沒有證據的價值主張。

先列來源與缺口，再產生 13_UserStory-B.md 草稿。`
    },
    {
      id: "14", week: "W6", title: "資訊元素", file: "14_elements.md",
      question: "這個決策需要哪些資訊與操作？",
      goal: "從任務推導顯示、輸入、操作、成功與失敗去處。",
      inputs: ["05_objects.md", "06_infoflow.md", "12_role-tasks.md", "13_UserStory-B.md"],
      outputs: "元素 ID、用途、資料來源、型態、任務回指與操作後果。",
      handoff: "把元素與操作後果交給 15_UX 與 16_wireframes。",
      traps: ["先畫畫面再補理由", "操作沒有成功／失敗去處", "資訊元素沒有來源", "把裝飾當需求"],
      docs: ["../06_W06_UX/14_elements/14_elements_generated_reference.md", "../00_學生發布版/98_示範案例/雲端早餐店/14_elements.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：14_elements.md
物件、資訊流、角色任務與 User Story：
{{貼上相關內容}}

請協助我建立資訊元素表：
1. 對每個任務列出必要的顯示、輸入與操作元素。
2. 每個元素有唯一 ID、名稱、用途、資料來源、型態依據、回指任務、狀態改變、成功去處、失敗去處與回饋。
3. 操作元素必須說明按下／輸入後造成的業務後果；沒有後果的元素標記疑問。
4. 不要為了填滿畫面增加沒有任務來源的裝飾。
5. 先列出元素缺口與任務覆蓋矩陣，再產生 14_elements.md 草稿。

檢查每個任務是否有足夠元素，也檢查每個操作是否能回到業務狀態。`
    },
    {
      id: "15", week: "W6", title: "UX 使用者經驗", file: "15_UX.md",
      question: "畫面、狀態、流程如何承接需求？",
      goal: "把元素、設計契約與業務路徑整理成 SCR、流程與完整狀態。",
      inputs: ["09_DESIGN.md", "10_tokens.css", "13_UserStory-B.md", "14_elements.md"],
      outputs: "SCR、流程、六種狀態、文案、限制與可用性檢查。",
      handoff: "把可執行的畫面契約交給 16_wireframes。",
      traps: ["只寫 happy path", "漏掉 loading、empty、error、interrupted", "SCR 沒有來源", "只看手機畫面"],
      docs: ["../00_學生發布版/06_W06_UX/00_W06_學生操作手冊.md", "../00_學生發布版/98_示範案例/雲端早餐店/15_UX.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：15_UX.md
Design 與 tokens：
{{貼上 09_DESIGN.md、tokens.css 的相關規則}}
User Story-B 與元素：
{{貼上 13_UserStory-B、14_elements}}

請協助我建立 UX 契約：
1. 把業務任務與元素整理成 SCR-xx、FLOW-xx 與畫面路徑。
2. 每個 SCR 說明目的、入口、出口、元素、來源與限制。
3. 為重要畫面規劃 default、loading、empty、error、success、interrupted 狀態；沒有必要的狀態要說明原因。
4. 把錯誤、等待、重試、取消、通知與操作後果寫清楚。
5. 檢查 SCR 數量、元素 ID、Design 規則與 User Story 是否一致。

先輸出追溯矩陣與狀態缺口，再產生 15_UX.md 草稿；不要先寫 HTML。`
    },
    {
      id: "16", week: "W6", title: "Wireframe 與 Prototype", file: "16_wireframes/",
      question: "線框是否真的能走完路徑？",
      goal: "把 UX 契約轉成可走的線框與動態 Prototype，並驗證狀態與操作後果。",
      inputs: ["14_elements.md", "15_UX.md", "09_DESIGN.md", "10_tokens.css"],
      outputs: "畫面、狀態、入口、出口、Prototype、四層檢查與人工走查。",
      handoff: "把已走查的畫面路徑與證據交給 17_UserStory-I_AC。",
      traps: ["直接手畫漂亮畫面", "修改產生檔", "沒有錯誤狀態", "只跑自動檢查不做人工走查"],
      docs: ["../06_W06_UX/16_wireframes/00_Prototype整合操作手冊.md", "../00_學生發布版/98_示範案例/雲端早餐店/16_wireframes/prototype/index.html", "../00_學生發布版/98_示範案例/雲端早餐店/16_wireframes/prototype/review.html"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：16_wireframes/ 與 Prototype
UX 契約：
{{貼上 15_UX.md 的 SCR、FLOW、狀態與限制}}
資訊元素與 Design：
{{貼上 14_elements.md、09_DESIGN.md、tokens 的相關內容}}

請協助我規劃 Prototype 實作與走查，不要跳過上游：
1. 建立 SCR → 元素 → 狀態 → 入口／出口的追溯表。
2. 指出每個畫面需要的狀態與每個操作的成功、失敗、等待或返回去處。
3. 將資料來源、機器可讀表、產生腳本、HTML／CSS 與人工走查分開說明。
4. 產生操作順序：先更新來源資料，再執行產生工具與檢查，最後進行瀏覽器人工走查。
5. 列出必須檢查的鍵盤、觸控、對比、縮放、遠距顯示、reduced motion 與錯誤狀態。

禁止直接修改產生檔；若上游資料不足，先列待確認事項。`
    },
    {
      id: "17", week: "W6", title: "User Story-I 與 AC", file: "17_UserStory-I_AC.md",
      question: "介面路徑如何落地？怎樣算通過？",
      goal: "把走查後的介面路徑與狀態規則寫成可驗收的 User Story-I 與 AC。",
      inputs: ["13_UserStory-B.md", "15_UX.md", "16_wireframes/", "validation"],
      outputs: "介面路徑、EARS AC、自動／人工／使用者驗證等級。",
      handoff: "把正式 Story、AC 與驗證證據交給 18_spec.md。",
      traps: ["直接複製畫面文字", "AC 沒有狀態或觸發條件", "正式檔與 generated 檔並存", "把未測試寫成通過"],
      docs: ["../00_學生發布版/98_示範案例/雲端早餐店/17_UserStory-I_AC.md", "../06_W06_UX/17_UserStory-I_AC/README.md", "../00_學生發布版/98_示範案例/雲端早餐店/validation/review-report.md"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：17_UserStory-I_AC.md
業務意圖：
{{貼上 13_UserStory-B.md}}
UX、Prototype 與 validation：
{{貼上 SCR、實際路徑、走查證據與未完成範圍}}

請協助我建立介面路徑與 Acceptance Criteria：
1. 將每條 US-B 轉成實際介面路徑 US-I，回指 SCR、任務與業務目的。
2. 使用 EARS 寫 AC：觸發條件、系統行為、狀態、禁止事項與可觀察結果要清楚。
3. 每條 AC 標示 auto、manual、human 或 N/A 的驗證方式；沒有證據不能標成 pass。
4. 找出 Prototype、UX、Story 與業務規則不一致的地方並停止產生草稿。
5. 保持 17_UserStory-I_AC.md 為唯一正式檔；story-data.js 是機器可讀來源，不能建立平行 generated 正式檔。

輸出：追溯矩陣 → 矛盾與缺口 → US-I 草稿 → AC 清單 → 驗證計畫。`
    },
    {
      id: "18", week: "W7", title: "Specification", file: "18_spec.md",
      question: "如何交付完整、可追溯的業務規格？",
      goal: "彙整已驗證的服務與 UX 契約，交給後續實作與 SpecKit。",
      inputs: ["08–17", "validation", "Design audit", "Prototype 證據"],
      outputs: "需求、來源、驗收、限制、證據索引與 SpecKit 銜接資料。",
      handoff: "交給 SpecKit specify／plan；不是直接跳過需求分析進入 tasks。",
      traps: ["第一次在 Spec 決定服務規則", "加入技術架構", "複製貼上造成矛盾", "只交 18_spec 沒有中間證據"],
      docs: ["../00_學生發布版/07_W07_Spec/00_W07_學生操作手冊.md", "../00_學生發布版/98_示範案例/雲端早餐店/18_spec.md", "../07_W07_Spec/18_spec/check-project-integrity.mjs"],
      prompt: String.raw`${"{{共用規則}}"}

本次階段：18_spec.md
已完成的來源文件：
{{貼上文件索引、08 baseline、11 requirements、13 User Story-B、15 UX、17 User Story-I_AC}}
驗證與 Design 證據：
{{貼上 check 結果、validation/review-report.md、09_DESIGN_audit.md、Prototype 路徑}}

請協助我整理 18_spec.md：
1. 只彙整已存在且已驗證的服務需求、角色、流程、規則、限制與 Acceptance Criteria。
2. 每條需求回指來源與驗收；每個驗收條件回指 Prototype 或 validation 證據。
3. 檢查 08 baseline、15 UX、17 User Story-I_AC、Prototype 與 validation 是否有矛盾；有矛盾先停止並列差異。
4. 不要新增服務決策，不要加入 React、API、資料庫、部署或其他技術架構。
5. 明確列出 N/A 的驗證範圍；N/A 不是 PASS，也不能保留未說明的 pending。
6. 最後產生 SpecKit handoff：哪些內容給 specify，哪些內容給 plan，哪些證據保留為參考。

輸出：來源盤點 → 矛盾檢查 → 需求與 AC 追溯表 → Spec 草稿 → SpecKit handoff → 交件前檢查表。`
    }
  ]
};

window.GUIDE_DATA.stages.forEach(function (stage) {
  stage.prompt = stage.prompt.replace("{{共用規則}}", window.GUIDE_DATA.sharedPrompt);
});
