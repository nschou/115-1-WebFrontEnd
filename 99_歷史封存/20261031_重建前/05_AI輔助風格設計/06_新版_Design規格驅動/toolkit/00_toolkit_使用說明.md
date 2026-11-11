# 00 工具包使用說明（v6 完整包）

> 位置：`05_AI輔助風格設計/06_新版_Design規格驅動/toolkit/`
> 性質：**完整工具包（27 檔）**。發給學生時，**只發這一個目錄**即可。
> `DesignSystem/00-2-課程範本與工具包/` 已凍結為**存檔**，只做追溯，不再編輯。

---

## 一、為什麼從「增量包」改成「完整包」

初版是增量包（只放改過的與新增的），優點是不重複，但缺點很具體：**老師要壓兩個 zip 給學生**。

改成完整包之後：

| 項目 | 增量包 | 完整包（現行） |
|---|---|---|
| 發給學生的壓縮檔 | 2 個 | **1 個** |
| 學生要記的規則 | 「同名檔案本目錄優先」 | **沒有規則，只有一個目錄** |
| 漂移風險 | 低 | 低（因為 00-2 已凍結，只有一個活來源） |

**防漂移靠的不是「不複製」，而是「凍結」**：`00-2` 從此不再編輯，任何修訂都只發生在本目錄。只要守住這一條，就不會出現兩份各自演化。

---

## 二、決策留痕（ADR-lite）

- **背景**：工具包需要改版（新增 06 三件套、修正 5 個檔案），但舊版 00-2 不能就地改。
- **考慮過的選項**：
  - A 建 `00-3` 只放 delta
  - B 整包複製成 `00-3`
  - C 全部放進 `06_新版_Design規格驅動/toolkit/`（初版採 delta）
- **決定**：C，但改為**完整包**（把 00-2 全部檔案複製進來）。
- **代價**：專案內多一份 17 檔的複本；`service-design-baseline.md` 因此變成第 4 份。
- **對策**：00-2 標記為凍結存檔；本目錄為唯一維護點；`service-design-baseline.md` 保留為「參考範本」，並在檔頭加註用法（見第六節）。
- **回溯**：講義 §4、§5、§8；CHANGELOG v6.0 補記。

---

## 三、檔案清單（27 檔，依用途分五類）

### 1. 服務設計三件套（第 2–5 週，15 檔，內容未改）

| 週 | README | 研究工作表 | 結論範本 |
|---|---|---|---|
| 第 2 週 | `01_market_README.md` | `01_market_rd_template.md` | `01_market_template.md` |
| 第 2 週 | `02_persona_README.md` | `02_persona_rd_template.md` | `02_persona_template.md` |
| 第 3 週 | `03_cjm_README.md` | `03_cjm_rd_template.md` | `03_cjm_template.md` |
| 第 4 週 | `04_blueprint_README.md` | `04_blueprint_rd_template.md` | `04_blueprint_template.md` |
| 第 5 週 | `05_decisions_README.md` | `05_decisions_rd_template.md` | `05_decisions_template.md` |

### 2. Baseline 與 Stitch Prompt（6 檔）

| 檔案 | 狀態 |
|---|---|
| `baseline_README.md` | **已改**（加步驟 5） |
| `service-design-baseline-template.md` | 未改 |
| `service-design-baseline.md` | 未改（**答案卷**） |
| `stitch-prompt-template.md` | **已改**（加 2 條規則） |
| `stitch-prompt-checklist.md` | **已改**（修錯字＋加 3 項） |
| `stitch-prompts.md` | **已改**（7 章、分三次） |

### 3. 工具指南（1 檔）

| 檔案 | 狀態 |
|---|---|
| `omp-design-md-guide.md` | **已改寫**（降為無樣張備援） |

### 4. Design.md 四件套（4 檔，新增）

| 檔案 | 用途 |
|---|---|
| `06_designmd_README.md` | 方法論＋四階段 AI 腳本＋8 條驗收 |
| `06_designmd_rd_template.md` | 研究工作表 A–H |
| `06_designmd_template.md` | 10 章輸出格式 |
| `06_designmd_audit_record.md` | 審計紀錄表 |

### 5. 本檔（1 檔）

---

## 四、哪 5 檔與 00-2 不同（給老師看的 diff 摘要）

| 檔案 | 一句話 |
|---|---|
| `omp-design-md-guide.md` | 8 章 → 對照 10 章；移除硬寫 hex；改為備援模式 |
| `stitch-prompts.md` | 「8 章」→「7 章」；新增「分三次生成、IA 一致」 |
| `stitch-prompt-checklist.md` | 修 `02_market` 錯字；加 3 項檢查 |
| `stitch-prompt-template.md` | 加「同 IA 同頁數」「不得自行增刪頁面」 |
| `baseline_README.md` | 加步驟 5（交接給 06_designmd） |

---

## 五、整條工具鏈

```text
第 2 週  01_market_*    → 01_market.md
第 2 週  02_persona_*   → 02_persona.md
第 3 週  03_cjm_*       → 03_cjm.md
第 4 週  04_blueprint_* → 04_blueprint.md
第 5 週  05_decisions_* → 05_decisions.md
         baseline_README + template → service-design-baseline.md
         stitch-prompt-*  → stitch-prompt-final.md
         ↓ Google Stitch：3 組 → 擇一 → 匯出 7 章
         06_designmd_*    → DESIGN.md（10 章）＋審計紀錄
第 6 週  服務需求索引＋US-B → 資訊／狀態／Wireframe
         → US-I＋AC＋可走原型
第 7 週  spec.md（彙整前六週證據）
```

---

## 六、發教材前必做（兩件事）

1. **只發本目錄。** 不要連 `00-2` 一起打包，否則學生會拿到兩份同名檔案。
2. **`service-design-baseline.md` 要發，但它是「參考範本」不是「抄本」。**
   它是流程**步驟 2（定案 Baseline）**的產出示例，讓學生知道「做到完整長什麼樣」。
   學生自己產的一定不同——換了 Persona，CJM 情緒曲線就變；換了市場，11 項決策就變。
   **已在檔頭加上用法說明**（含它與審計機制的關係：第 1 章的來源定位，要回到**自己的** baseline 用 Ctrl+F 對得上，否則記為「來源無法定位」）。
   注意：本檔在專案內有 4 份副本（00-2／本目錄／工具包 zip／`05_AI輔助風格設計/` 根目錄），**要修訂只改本目錄這一份**。

---

## 七、兩個模式

| 模式 | 怎麼做 | 前提 | 品質標記 |
|---|---|---|---|
| 正常（主線） | `stitch-prompts.md` → Stitch → 匯出 7 章 → 補 3 章 | 能連上 Stitch | token 可回溯到樣張 |
| 無樣張（備援） | `omp-design-md-guide.md` | Stitch 不可用 | 第 10 章全部「待驗證」 |

兩者不可混用，一份 Design.md 只標一種模式。

---

## 八、版本

| 版本 | 日期 | 內容 |
|---|---|---|
| v6.0 | 2026-10-26 | 完整包 27 檔：17 檔自 00-2 複製（未改）＋ 5 檔改版 ＋ 4 檔新增 ＋ 本說明 |

---

## 九、範例：從原始輸出到 10 章成品

| 資料夾 | 內容 | 用途 |
|---|---|---|
| `範例_Stitch原始輸出/New-Style_C/` | Stitch 匯出的 **YAML ＋ 7 章** ＋ 4 個畫面（code.html／png） | 讓學生看到「工具吐出來的樣子」 |
| `範例_DESIGN_10章_平衡現代/` | **10 章完整版** ＋ `tokens.css` ＋ README | 讓學生看到「做完的樣子」 |

**兩者是對照組**：左邊缺「為什麼／動效／回溯」三章，右邊補上了。
學生的任務不是寫出跟範例一樣的內容，而是走完同樣三步：**匯出 7 章 → 補 3 章 → 跑三項指標**。

> UX 階段的線框與原型直接吃 `tokens.css`；`06_UX設計/prototype/assets/tokens.css` 就是從這裡同步過去的。
