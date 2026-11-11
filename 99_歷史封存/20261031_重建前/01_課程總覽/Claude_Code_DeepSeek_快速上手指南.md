# Claude Code + DeepSeek API 快速上手指南

> 用 Claude Code 的優秀代理框架，搭配 DeepSeek 的低成本模型。
> 月費約 $3–5，只有 API 用量費用，不需任何訂閱。

---

## 一、為什麼選這個組合

| 面向 | 說明 |
|---|---|
| harness | Claude Code 是目前最強的終端機代理框架之一，支援讀寫檔案、執行指令、多檔編輯、codebase 導航、MCP 擴充 |
| 模型 | DeepSeek V4 程式碼能力強、速度快、價格極低 |
| 費用 | 只付 API 用量，無月費訂閱。日常開發月費約 $3–5 |
| 彈性 | 可隨時切換 deepseek-flash（快又便宜）或 deepseek-v4-pro（更強） |

---

## 二、事前準備

### 需要的東西

- [ ] Node.js 18 以上（安裝 Claude Code 需要）
- [ ] DeepSeek API 帳號與 API Key
- [ ] PayPal 或 Google Pay（儲值用）

### 安裝 Node.js（如果還沒有）

到 `nodejs.org` 下載 LTS 版本安裝，或在終端機確認：

```bash
node --version
# 應顯示 v18.x.x 以上
```

---

## 三、取得 DeepSeek API Key

### Step 1：註冊 DeepSeek 平台

1. 到 `platform.deepseek.com`
2. 註冊帳號（email 或 Google 帳號）
3. 完成登入

### Step 2：儲值

1. 進入左側「Billing」或「充值」
2. 選擇儲值金額（建議先儲 $5 試用）
3. 用 PayPal 或 Google Pay 付款
4. 確認額度已入帳

### Step 3：取得 API Key

1. 進入「API Keys」頁面
2. 點「Create New Key」
3. 取一個名稱（例如 `claude-code`）
4. 複製 API Key（只會顯示一次，請妥善保存）

> API Key 格式類似：`sk-xxxxxxxxxxxxxxxxxxxxxxxx`

---

## 四、安裝 Claude Code

在終端機執行：

```bash
npm install -g @anthropic-ai/claude-code
```

確認安裝成功：

```bash
claude --version
```

---

## 五、設定環境變數指向 DeepSeek

這是關鍵步驟：讓 Claude Code 使用 DeepSeek 的模型，而不是 Anthropic 的 Claude 模型。

### Mac / Linux

在你的 shell 設定檔（`~/.bashrc`、`~/.zshrc` 或 `~/.bash_profile`）加入：

```bash
export ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
export ANTHROPIC_AUTH_TOKEN=你的DeepSeek_API_Key
export ANTHROPIC_MODEL=deepseek-flash
export ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-flash
export ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-flash
export ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-flash
export CLAUDE_CODE_SUBAGENT_MODEL=deepseek-flash
```

然後重新載入設定：

```bash
source ~/.zshrc  # 或 source ~/.bashrc
```

### Windows（PowerShell）

```powershell
$env:ANTHROPIC_BASE_URL = "https://api.deepseek.com/anthropic"
$env:ANTHROPIC_AUTH_TOKEN = "你的DeepSeek_API_Key"
$env:ANTHROPIC_MODEL = "deepseek-flash"
$env:ANTHROPIC_DEFAULT_OPUS_MODEL = "deepseek-flash"
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = "deepseek-flash"
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = "deepseek-flash"
$env:CLAUDE_CODE_SUBAGENT_MODEL = "deepseek-flash"
```

> 若要永久設定，在 Windows 系統設定→環境變數中加入上述變數。

### 確認設定成功

```bash
echo $ANTHROPIC_BASE_URL
# 應顯示 https://api.deepseek.com/anthropic
```

---

## 六、開始使用

### 啟動 Claude Code

進入你的專案目錄，執行：

```bash
cd /path/to/your-project
claude
```

Claude Code 會啟動互動式介面，你就可以用自然語言與它對話。

### 基本操作範例

```
> 幫我看看這個專案的結構，總結一下它在做什麼

> 這個檔案有什麼問題？幫我找出 bug

> 幫我新增一個 API 端點 GET /api/orders，回傳訂單列表

> 幫我把這個函式重構，拆成三個小函式

> 執行測試，看看有沒有錯誤
```

### 常用指令

| 指令 | 功能 |
|---|---|
| `claude` | 啟動互動模式 |
| `claude "幫我修這個 bug"` | 單次指令模式 |
| `claude -p "分析這個專案"` | 印出結果後退出（適合腳本使用） |
| `/help` | 在互動模式中查看說明 |
| `/model` | 切換模型 |
| `/cost` | 查看目前用量與花費 |
| `Ctrl+C` | 中斷目前操作 |
| `Ctrl+D` | 離開 Claude Code |

---

## 七、模型切換

### deepseek-flash（日常預設）

- 最快、最便宜
- 適合：日常開發、語法問題、基本重構、讀程式碼
- 價格：離峰 $0.007/1M 輸入（快取命中）、$0.6/1M 輸出

### deepseek-v4-pro（複雜任務）

- 更強的推理能力
- 適合：複雜架構設計、多檔重構、困難除錯
- 價格：離峰 $0.022/1M 輸入、$1.98/1M 輸出

### 切換方式

在 Claude Code 互動模式中：

```
/model deepseek-v4-pro
```

或修改環境變數後重新啟動：

```bash
export ANTHROPIC_MODEL=deepseek-v4-pro
claude
```

> 建議：日常用 flash，遇到 flash 處理不了的複雜任務再切 v4-pro，用完切回 flash 省錢。

---

## 八、費用管理

### 查看用量

在 Claude Code 互動模式中：

```
/cost
```

會顯示本次對話的 token 用量與預估花費。

### 在 DeepSeek 平台查看餘額

到 `platform.deepseek.com` →「Usage」或「Billing」查看：
- 已用 token 數
- 剩餘額度
- 每日/每月用量趨勢

### 預估月費

| 使用強度 | 每日 token 量 | 預估月費 |
|---|---|---|
| 輕度（偶爾用） | 50K 輸入 + 10K 輸出 | ~$1–2 |
| 中度（日常開發） | 500K 輸入 + 100K 輸出 | ~$3–5 |
| 重度（全天開發） | 2M 輸入 + 500K 輸出 | ~$10–15 |

> 離峰時段（台灣時間約 09:00–12:00、18:00–01:00 以外的時段）價格減半，善用離峰可再省一半。

---

## 九、常見問題

### Claude Code 啟動後沒反應

確認環境變數是否正確設定：

```bash
echo $ANTHROPIC_BASE_URL
echo $ANTHROPIC_AUTH_TOKEN
```

如果沒有輸出，表示環境變數未載入，重新 `source` 設定檔或重開終端機。

### API 呼叫失敗（401 或 403）

- 確認 API Key 是否正確（沒有多餘空格）
- 確認 DeepSeek 帳號有餘額
- 確認 `ANTHROPIC_BASE_URL` 是 `https://api.deepseek.com/anthropic`（結尾有 `/anthropic`）

### 回覆品質不如預期

DeepSeek 模型對 Claude Code 的工具呼叫協議遵循精準度不如 Claude 本身。如果遇到：
- 指令理解偏差 → 用更明確的描述，避免模糊用語
- 工具呼叫失敗 → 重試一次，或拆成更小的步驟
- 複雜任務處理不好 → 切換到 `deepseek-v4-pro`

### 想用回 Claude 模型

取消環境變數，或設定為 Anthropic 預設值：

```bash
unset ANTHROPIC_BASE_URL
unset ANTHROPIC_AUTH_TOKEN
claude
```

> 使用 Claude 模型需要 Anthropic API 額度或 Claude Pro 訂閱。

### 如何在多個專案間切換

每個專案目錄獨立啟動即可，環境變數是全域的，不需每個專案重設：

```bash
cd ~/projects/breakfast-shop
claude

# 離開後
cd ~/projects/iot-sensor
claude
```

---

## 十、進階設定

### 設定推理強度

```bash
export CLAUDE_CODE_EFFORT_LEVEL=max
```

選項：`low`、`high`、`max`。`max` 推理最深入但花費較多 token。

### 設定自動壓縮視窗

控制 Claude Code 在多大上下文時自動壓縮對話歷史：

```bash
export CLAUDE_CODE_AUTO_COMPACT_WINDOW=786432
```

預設值約 786K tokens，可依需求調整。

### 使用 1M 上下文模型

DeepSeek V4 Flash 支援 1M tokens 上下文，設定模型名稱加上 `[1m]`：

```bash
export ANTHROPIC_MODEL=deepseek-flash[1m]
```

適合處理大型 codebase 或長文件分析。

---

## 十一、與課程的關係

這份指南是教授個人開發用的工具設定。課程中學生的工具配置不同：

| 對象 | 工具組合 | 費用 |
|---|---|---|
| 教授個人 | Claude Code + DeepSeek API | ~$3–5/月 |
| 學生第 4–6 週 | Codeium（VS Code 擴充套件） | 免費 |
| 學生第 7–10 週 | Google Antigravity | 免費 |

教授用 Claude Code + DeepSeek 做課程開發、產學專案、備課；學生用免費工具學習。兩者不衝突。

---

## 十二、快速啟動檢查表

第一次設定時，照這個清單逐項確認：

- [ ] 已安裝 Node.js 18+
- [ ] 已在 `platform.deepseek.com` 註冊並儲值
- [ ] 已取得 DeepSeek API Key
- [ ] 已執行 `npm install -g @anthropic-ai/claude-code`
- [ ] 已設定環境變數（ANTHROPIC_BASE_URL、ANTHROPIC_AUTH_TOKEN、ANTHROPIC_MODEL）
- [ ] 已確認 `echo $ANTHROPIC_BASE_URL` 顯示正確網址
- [ ] 已在某個專案目錄中執行 `claude` 並成功啟動
- [ ] 已試過一個基本指令（例如「分析這個專案結構」）並得到回應

全部打勾後，就完成設定了。
