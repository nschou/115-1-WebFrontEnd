#!/usr/bin/env node
/**
 * gen-deliverables.mjs — 把 18 檔證據收斂成 6 份交付物（D1–D6）
 * 用法：node gen-deliverables.mjs
 * 原則：只從既有檔案與 prototype 資料抽取，不手寫第二份真相。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const proto = path.join(here, "16_wireframes", "prototype");
const outDir = path.join(here, "D_交付物");
fs.mkdirSync(outDir, { recursive: true });

const read = (f) => fs.existsSync(path.join(here, f)) ? fs.readFileSync(path.join(here, f), "utf8") : "";
const tableRows = (md, prefix) => md.split("\n").filter(l => new RegExp("^\\|\\s*" + prefix + "\\S*\\s*\\|").test(l));
const STATE_LEGEND = "\n> 狀態代號：S0 尚未建立訂單／S1 草稿／S2 已下單／S3 已確認／S4 製作中／S5 製作完成（待店員確認）／S6 可取餐／S7 已取餐；SX1–SX4 為例外（缺貨／付款失敗／通知未送達／修改待確認）。完整定義見 `18_spec.md` §5。\n";
const header = (title, from) => "# " + title + "\n\n> **產生檔**，來源：`" + from + "`。改上游後重跑 `node gen-deliverables.mjs`，不要手改。\n" + STATE_LEGEND;\n";

const load = (rel) => new Function(fs.readFileSync(path.join(proto, rel), "utf8"))();
load("assets/story-data.js"); load("assets/elements.js"); load("assets/tasks.js");
const D = globalThis.STORY_DATA, ELS = globalThis.ELEMENTS || [];

/* D1 */
{
  const rows = tableRows(read("07_decisions.md"), "SD-");
  const rej = read("04_blueprint.md").split("\n").filter(l => /^\|\s*R-\d/.test(l));
  fs.writeFileSync(path.join(outDir, "D1_決策書.md"), [
    header("D1 決策書", "07_decisions.md（上游 01–06、08）＋ 04_blueprint 的被否決候選"),
    "## 1. 已定案的決策（每條都有採用、依據、代價）", "",
    "| ID | 決策題 | 採用 | 依據 | 代價 |", "|---|---|---|---|---|",
    ...rows, "",
    "## 2. 被否決的候選（給未來的自己與 AI）", "",
    "| # | 被否決 | 理由 | 何時可能翻案 |", "|---|---|---|---|",
    ...rej, "",
    "## 3. 哪些還只是候選", "",
    "見 `04_blueprint.md` 的候選方案區；只有 `08_service-design-baseline.md` 寫入的才是定案。", ""
  ].join("\n"), "utf8");
}


/* D2 */
{
  const screens = [...new Set([
    ...(D.stories || []).flatMap(s => s.path || []),
    ...(D.actions || []).map(a => a.screen),
    ...ELS.map(e => e.screen)
  ].filter(Boolean))].sort();
  const edges = new Set();
  (D.stories || []).forEach(s => { const p = s.path || []; for (let i = 1; i < p.length; i++) edges.add(p[i-1] + " → " + p[i]); });
  fs.writeFileSync(path.join(outDir, "D2_頁面與流動.md"), [
    header("D2 頁面與流動", "15_UX.md、16_wireframes/、prototype/story-data.js"),
    "## 1. 頁面清單（" + screens.length + "）", "",
    "| 頁面 | 出現故事數 | 元素數 | 動作數 |", "|---|---|---|---|",
    ...screens.map(s => "| " + s + " | " + (D.stories || []).filter(x => (x.path || []).includes(s)).length
      + " | " + ELS.filter(e => e.screen === s).length + " | " + (D.actions || []).filter(a => a.screen === s).length + " |"),
    "", "## 2. 流動（由故事路徑形成的邊）", "", "| 邊 |", "|---|",
    ...[...edges].sort().map(e => "| " + e + " |"),
    "", "## 3. 狀態機", "",
    "- 訂單：S1–S7 ＋ SX1–SX4（見 `18_spec.md` 第五章）",
    "- 每頁六態：default／loading／empty／error／success／interrupted", ""
  ].join("\n"), "utf8");
}

/* D3 */
{
  const rows = tableRows(read("05_objects.md"), "OBJ-");
  const fields = new Map();
  ELS.forEach(e => { if (e.source && e.source !== "—") { const k = String(e.source).split(".")[0]; if (!fields.has(k)) fields.set(k, new Set()); fields.get(k).add(String(e.source)); } });
  fs.writeFileSync(path.join(outDir, "D3_資料模型.md"), [
    header("D3 資料模型", "05_objects.md、06_infoflow.md、14_elements.md"),
    "## 1. 物件（前後端共享的唯一事實）", "",
    "| OBJ | 物件 | 類型 | 擁有者 | 生命週期 | 涉及角色 |", "|---|---|---|---|---|---|",
    ...rows, "", "## 2. 被畫面引用的資料欄位", "",
    "| 資料來源 | 欄位 | 引用次數 |", "|---|---|---|",
    ...[...fields.entries()].sort().flatMap(([k, set]) => [...set].sort().map(f =>
      "| " + k + " | " + f + " | " + ELS.filter(e => e.source === f).length + " |")),
    "", "## 3. 生命週期與觀測者", "", "見 `05_objects.md` 第二節：每個狀態都要有觀測者。", ""
  ].join("\n"), "utf8");
}

/* D4 */
{
  const kinds = { nav: "讀取／導覽（GET）", mutate: "變更（POST／PATCH）" };
  fs.writeFileSync(path.join(outDir, "D4_API規格.md"), [
    header("D4 API 規格", "prototype/story-data.js 的動作 ＋ D3 的資料欄位"),
    "> 這是**由動作推導的端點候選**：action.id 就是端點語意、changes 就是要改的資料。",
    "> 第 11 週進 SDD 時，再補正式路徑、HTTP 方法、錯誤碼與權限。", "",
    "| 動作 | 頁面 | 類型 | 下一頁 | 相關資料（參數／回傳） | 會改什麼 |", "|---|---|---|---|---|---|",
    ...(D.actions || []).map(a => {
      const els = ELS.filter(e => e.screen === a.screen && e.kind !== "act" && e.source && e.source !== "—");
      const params = [...new Set(els.map(e => String(e.source)))].slice(0, 4);
      return "| " + a.id + " | " + a.screen + " | " + (kinds[a.kind] || a.kind) + " | " + (a.next || "—")
        + " | " + (params.join("、") || "—") + " | " + ((a.changes || []).join("；") || "—") + " |";
    }),
    "", "## 待補（第 11 週 SDD）", "",
    "- 路徑與 HTTP 方法命名規則", "- 錯誤碼表（對應 SX1–SX4）", "- 權限（顧客／店長／廚師／老闆）", ""
  ].join("\n"), "utf8");
}

/* D5 */
{
  const rows = fs.readFileSync(path.join(here, "17_UserStory-I_AC.md"), "utf8").split("\n").filter(l => /^\|\s*AC-/.test(l));
  const auto = (D.acCatalog || []).filter(a => a.verify === "auto").length;
  fs.writeFileSync(path.join(outDir, "D5_驗收條件.md"), [
    header("D5 驗收條件（AC）", "17_UserStory-I_AC.md、prototype/story-data.js"),
    "| ID | 狀態 | 條件 |", "|---|---|---|",
    ...rows, "",
    "## 檢查方式", "",
    "- 自動 " + auto + " 條／人工 " + ((D.acCatalog || []).length - auto) + " 條",
    "- 一次跑四層：`node check-all.mjs`", ""
  ].join("\n"), "utf8");
}

/* D6 */
{
  const spec = read("18_spec.md").split("\n").filter(l => /1 秒|3 秒|1 小時|降級|記憶體/.test(l)).slice(0, 8);
  fs.writeFileSync(path.join(outDir, "D6_非功能三條.md"), [
    header("D6 非功能三條", "06_infoflow.md、15_UX.md、18_spec.md 第八章"),
    "## 1. 可量測的要求", "",
    "| # | 類型 | 要求 | 誰在等 |", "|---|---|---|---|",
    "| NFR-1 | 反應時間 | 狀態變更後 1 秒內，顧客端可見 | 站在櫃前的顧客 |",
    "| NFR-2 | 反應時間 | 新單 3 秒內出現在廚房待製作清單 | 廚師 |",
    "| NFR-3 | 記憶體 | 尖峰 3 分鐘 40 單時，單頁不得因資料累積而明顯變慢 | 店長 |",
    "| NFR-4 | 降級 | 通知不可用時，店內看板仍必須完整 | 顧客 |",
    "", "## 2. 來源行", "",
    ...spec.map(l => "- " + l.trim()),
    "", "> 後端技術堆疊不寫在這裡：那是 `plan.md` 的事。", ""
  ].join("\n"), "utf8");
}

console.log("已產生 D1–D6 →", path.relative(process.cwd(), outDir));
for (const f of fs.readdirSync(outDir)) console.log("  " + f.padEnd(24) + (fs.statSync(path.join(outDir, f)).size / 1024).toFixed(1) + " KB");
