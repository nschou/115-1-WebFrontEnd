# oh-my-pi (omp) 操作指南：產生 DESIGN.md

> 本指南說明如何用 omp 產生 DESIGN.md 規格檔案。
> 前提：omp 已安裝、已登入至少一個模型（如 ChatGPT Plus 訂閱或 Groq 免費方案）。

---

## omp 可以產生 DESIGN.md 嗎？

可以。omp 是 AI 編碼助手——它能讀寫檔案、執行指令。當你提供服務設計上下文和 DESIGN.md 格式要求，所選的 LLM 會根據輸入產生 DESIGN.md 草稿，omp 將其寫入檔案。

omp 負責的是「執行」（讀檔、寫檔、執行）；產生內容的是你選的 LLM（如 GPT、Groq 上的模型、Gemini）。omp 不需要額外的設計插件就能做到——只需要一個能理解自然語言指令的 LLM。

---

## 事前準備

### 必要設定

1. **確認 omp 已啟動且模型可用**：

```bash
# 在專案目錄中啟動 omp
cd your-breakfast-shop-project
omp

# 確認模型已登入
# 如果用 ChatGPT Plus 訂閱：
/login openai-codex

# 如果用 Groq 免費方案（設定環境變數後 omp 自動發現）：
export GROQ_API_KEY=your_key
# 然後在 omp 中執行 /model 選擇 Groq 模型
```

2. **確認服務設計文件存在**：

專案目錄中應有以下文件（從第 2-5 週累積）：

```
your-breakfast-shop-project/
  service-design-baseline.md   ← 服務設計決定版（Persona、CJM、Blueprint、11項決策）
  DESIGN.md                    ← 即將產生的檔案
```

### 可選設定（提升一致性）

如果希望 omp 每次自動讀取服務設計文件，可建立 skill：

```bash
# 在專案目錄中建立 skill
mkdir -p skills/frontend-design
```

寫入 `skills/frontend-design/SKILL.md`：

```markdown
# Frontend Design Skill

## 使用時機
當使用者要求生成前端 UI、元件、頁面，或產生/修改 DESIGN.md 時。

## 規則
1. 先讀取專案根目錄的 service-design-baseline.md 和 DESIGN.md（如存在）
2. 所有色彩、字體、間距、圓角使用 DESIGN.md 中的 tokens
3. 元件需包含完整的互動狀態（normal/hover/focus/active/disabled）
4. 手機優先設計
5. 確保 WCAG AA 對比度
6. 介面文案使用繁體中文
```

安裝後重啟 omp，skill 會自動被發現。

---

## 產生 DESIGN.md 的 Prompt

在 omp 互動模式中輸入以下指令（分兩步：先產生 DESIGN.md，再生成測試頁面）：

### 第一步：產生 DESIGN.md 草稿

---

```
請讀取 @service-design-baseline.md，根據其中的服務設計決定版產生 DESIGN.md 檔案。

DESIGN.md 是 Google Labs 的開源設計系統規範格式（github.com/google-labs-code/design.md）。
格式為：YAML frontmatter（機器可讀的設計 tokens）+ Markdown body（人類可讀的設計理由）。

請依照以下步驟執行：

1. 先讀取 service-design-baseline.md，列出：
   - 品牌人格和核心體驗目標
   - CJM 的情緒需求（放大什麼、避免什麼）
   - 服務承諾（每個階段顧客要感受到什麼）
   - 不可違反的限制（WCAG AA、中文可讀性、手機優先、鍵盤焦點可見）

2. 採用「平衡現代」風格預設：
   - 冷暖混搭——冷色基底（深青 #1B6E8C）+ 暖色點綴（暖橙 #E8743C 用於推薦標記和今日特餐）
   - 無襯線中性字體（Inter, sans-serif）
   - 中等間距密度（4px 基準，比例尺 4/8/16/24/40）
   - 中圓角（4/8/12px）
   - 中速動效（150-300ms）

3. 產生 DESIGN.md，包含以下完整內容：

   YAML frontmatter（機器可讀 tokens）：
   - 色彩 tokens：bg, surface, primary, primary-hover, text, text-muted, accent, warm-accent, border, error, success
   - 字體 tokens：heading font, body font, 字重, 字級比例尺 (xs 到 2xl), 行高
   - 間距 tokens：基準單位, xs/sm/md/lg/xl
   - 圓角 tokens：sm/md/lg

   Markdown body（人類可讀理由），按以下章節順序：
   - Overview：品牌人格、核心體驗目標、服務承諾、情緒需求
   - Colors：每個色彩的語義角色、使用規則、回溯來源
   - Typography：字體選擇理由、字級比例尺、字重使用情境
   - Layout：間距系統、網格、手機優先理由、特殊規則（等待頁留白多）
   - Elevation & Depth：陰影系統
   - Shapes：圓角值和理由
   - Components：按鈕（含 5 種狀態）、卡片、表單、通知（含錯誤預防文案）
   - Do's and Don'ts：設計護欄（不要用 emoji 當圖示、不要紫藍漸層等）

4. 在檔案末尾加上回溯表：
   - 每個設計決策一行
   - 欄位：決策、依據、回溯到、待驗證
   - 標注哪些是「設計假設，待樣張驗證」

5. 將結果寫入專案根目錄的 DESIGN.md 檔案。

6. 完成後，列出：
   - 寫入的檔案路徑
   - 採用的設計決策摘要
   - 標注為「待驗證」的項目清單

注意：
- 不要宣稱未執行的測試已通過
- 不要把設計假設寫成已驗證結論
- 介面文案範例使用繁體中文
- 所有介面文案和設計理由用繁體中文撰寫
```

---

omp 會讀取 service-design-baseline.md，根據上述指令產生 DESIGN.md 並寫入檔案。產出後請檢查：

- YAML frontmatter 是否以 `---` 包圍
- 所有 8 個章節是否齊全
- 色彩是否有暖色點綴（warm-accent #E8743C）
- 元件是否包含互動狀態
- 回溯表是否標注「待驗證」

### 第二步：從 DESIGN.md 生成測試頁面（驗證規格一致性）

產生 DESIGN.md 後，用以下指令要求 omp 生成一個可渲染的 HTML 頁面，反向驗證 DESIGN.md 是否可用：

---

```
請讀取 @DESIGN.md，根據規格生成「雲端早餐店」顧客端首頁的 HTML/CSS。

要求：
1. 所有色彩、字體、間距、圓角使用 DESIGN.md 中的 tokens（用 CSS 變數）
2. 頁面內容：今日推薦區（用 warm-accent 標記推薦品項）、菜單分群（主餐/套餐/飲品/加購）、下單按鈕
3. 按鈕包含完整的互動狀態（normal/hover/active/focus/disabled）
4. 手機優先設計
5. 繁體中文介面文案
6. 將 HTML 寫入 index.html，CSS 寫入 styles.css

生成後，請列出你使用的 CSS 變數名稱和值，讓我核對是否與 DESIGN.md 一致。
```

---

### 第三步：一致性驗證

修改 DESIGN.md 中的某個 token，要求 omp 重新生成，檢查程式碼是否跟著更新：

---

```
我剛修改了 DESIGN.md 中的 --color-primary 從 #1B6E8C 改為 #FF0000。
請重新讀取 @DESIGN.md 並更新 index.html 和 styles.css。
生成後告訴我 --color-primary 的新值是什麼。
```

如果 omp 回報的值是 #FF0000，表示 DESIGN.md 被正確讀取。如果仍是 #1B6E8C，表示檔案未被正確載入——檢查 @DESIGN.md 引用是否生效。

驗證完成後，記得將 --color-primary 改回 #1B6E8C。

---

## 完整流程總覽

```
第一步：omp 讀取 service-design-baseline.md → 產生 DESIGN.md
  ↓ 檢查格式完整性
第二步：omp 讀取 DESIGN.md → 生成 HTML/CSS 測試頁面
  ↓ 核對 CSS 變數與 DESIGN.md 一致
第三步：修改一個 token → 重新生成 → 確認更新
  ↓ 通過驗證
DESIGN.md 定稿 → 可用於後續頁面開發
```

---

## 常見問題

**Q: omp 產生的 DESIGN.md 格式不正確怎麼辦？**
A: 在 Prompt 中更明確地指定格式。可以貼入 [官方規格](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)的 YAML 範例作為參考。也可以先用 Google Stitch 生成基礎 DESIGN.md（Stitch 原生產生格式正確），再用 omp 補充互動狀態和回溯表。

**Q: Groq 免費額度夠用嗎？**
A: Groq 免費方案每日 1,000 次請求、200,000 tokens（[官方 rate limits](https://console.groq.com/docs/rate-limits)）。產生一份 DESIGN.md 約需 2-3 次對話迭代，在額度內。但大量生成多頁面前端程式碼可能耗盡當日額度——建議課堂練習用 Groq，大量實作用 ChatGPT Plus 或 DeepSeek API。

**Q: 可以不用 service-design-baseline.md，直接從零產生 DESIGN.md 嗎？**
A: 可以，但不建議。沒有服務設計上游，產生的 DESIGN.md 會缺乏回溯依據——變成「憑感覺的清單」而非「有推導鏈的規格」。如果沒有 baseline 文件，至少在 Prompt 中提供品牌人格、情緒需求和服務承諾的文字描述。

**Q: omp 和 Google Stitch 產生的 DESIGN.md 有什麼差異？**
A: Stitch 從視覺設計提取 DESIGN.md——先有畫面，再萃取規格。omp 從服務設計文件產生 DESIGN.md——先有需求，再寫規格。兩者互補：Stitch 適合風格探索（看到實際畫面），omp 適合從服務設計直接推導規格（有完整的回溯鏈）。
