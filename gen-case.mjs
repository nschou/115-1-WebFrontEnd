#!/usr/bin/env node
/**
 * gen-case.mjs — 產生 00_CourseSite/case.html（示範案例 01→18 走讀）
 * 資料在本檔的 ARTIFACTS / EXTRAS 陣列；改這裡再跑 node gen-case.mjs。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, "00_CourseSite");
const enc = (p) => encodeURIComponent(p);
const BASE = "../98_示範案例/雲端早餐店/";

const ARTIFACTS = [
  ["01", "01_market.md", "選哪個市場、機會與限制", "01_market.md"],
  ["02", "02_persona.md", "誰有問題、誰決定、誰交付", "02_persona.md"],
  ["03", "03_cjm.md", "旅程哪裡中斷、最低點在哪", "03_cjm.md"],
  ["04", "04_blueprint.md", "前台背後誰做什麼、如何交接（含被否決候選）", "04_blueprint.md"],
  ["05", "05_objects.md", "有哪些物件、有幾個、怎麼認", "05_objects.md"],
  ["06", "06_infoflow.md", "怎麼動、誰在等、會不會撞", "06_infoflow.md"],
  ["07", "07_decisions.md", "選了哪個方案、代價是什麼、否決了什麼", "07_decisions.md"],
  ["08", "08_service-design-baseline.md", "把上面定案成基準（凍結）", "08_service-design-baseline.md"],
  ["09", "09_DESIGN.md", "設計語言與理由（含 09_DESIGN_audit）", "09_DESIGN.md"],
  ["10", "10_tokens.css", "視覺變數（顏色、字級、間距）", "10_tokens.css"],
  ["11", "11_service-requirements.md", "跨角色的服務需求索引", "11_service-requirements.md"],
  ["12", "12_role-tasks.md", "七格任務句：誰在什麼狀態下做什麼", "12_role-tasks.md"],
  ["13", "13_UserStory-B.md", "業務版故事（無畫面）", "13_UserStory-B.md"],
  ["14", "14_elements.md", "元素、去處與失敗去處", "14_elements.md"],
  ["15", "15_UX.md", "頁面、進入條件與六態", "15_UX.md"],
  ["16", "16_wireframes/16_wireframes_example.md", "線框與推展（附 Prototype）", "16_wireframes/16_wireframes_example.md"],
  ["17", "17_UserStory-I_AC.md", "驗收條件（含禁止型）", "17_UserStory-I_AC.md"],
  ["18", "18_spec.md", "服務級總規格（十章）", "18_spec.md"]
];

const EXTRAS = [
  ["交付物", "D1–D6", "六份交付物（由 01–18 彙整）", "deliverables.html", "page"],
  ["研究與計畫", "research.md", "架構研究：條件、選項、結論、RQ", BASE + "research.md", "doc"],
  ["研究與計畫", "plan.md", "技術計畫：資料模型、契約、一致性", BASE + "plan.md", "doc"],
  ["研究與計畫", "tasks.md", "可驗收的任務卡", BASE + "tasks.md", "doc"],
  ["走讀輔助", "因果鏈回推三例", "三條 spec 條文一路回推到痛點", BASE + "00_因果鏈回推_三例.md", "doc"],
  ["走讀輔助", "名詞展開", "遇到看不懂的詞先查這裡", BASE + "00_名詞展開_過度濃縮用語.md", "doc"],
  ["走讀輔助", "物件定義：基數與身分", "為什麼「餐點」落不了點", BASE + "00_物件定義_基數與身分.md", "doc"],
  ["走讀輔助", "領域狀態 vs UI 狀態", "S5 之前為什麼不能顯示取餐號碼", BASE + "00_領域狀態與UI狀態.md", "doc"],
  ["走讀輔助", "紙筆 → UX → spec", "三層分工與兩個極限", BASE + "00_紙筆到spec_三層對應.md", "doc"]
];

const docLink = (href, label) => `<a class="secondary" href="reader.html?file=${enc(href)}">${label}</a>`;
const rawLink = (href) => `<a class="ghost" href="${href}" download>原始檔</a>`;

const rows = ARTIFACTS.map(([no, name, desc, href]) => `        <tr>
          <td>${no}</td>
          <td><b>${name}</b><br><span class="muted">${desc}</span></td>
          <td>${docLink(BASE + href, "線上觀看")}</td>
          <td>${rawLink(BASE + href)}</td>
        </tr>`).join("\n");

const extraRows = EXTRAS.map(([group, name, desc, href, kind]) => `        <tr>
          <td>${group}</td>
          <td><b>${name}</b><br><span class="muted">${desc}</span></td>
          <td>${kind === "page" ? `<a class="secondary" href="${href}">開啟</a>` : docLink(href, "線上觀看")}</td>
          <td>${kind === "page" ? '<span class="muted">—</span>' : rawLink(href)}</td>
        </tr>`).join("\n");

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="示範案例走讀：01 到 18，以及研究、計畫、交付物。">
  <title>示範案例走讀｜服務設計到 Spec</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html" aria-label="回到學習導航">
      <span class="brand-mark">18</span>
      <span><b>服務設計到 Spec</b><small>示範案例走讀</small></span>
    </a>
    <div class="top-actions">
      <a class="ghost" href="flow.html">一頁流程圖</a>
      <a class="ghost" href="tech.html">技術架構</a>
      <a class="ghost" href="materials.html">教材索引</a>
      <a class="secondary" href="index.html">回學習導航</a>
    </div>
  </header>

  <main class="doc-shell">
    <section class="panel page-doc">
      <p class="eyebrow">CASE WALKTHROUGH</p>
      <h1>示範案例走讀：雲端早餐店</h1>
      <p class="lead">照 01→18 的順序看一次。每一份都回答一個問題，也把答案交給下一份。<b>看不懂的詞先查「名詞展開」，想知道「為什麼」就看「因果鏈回推」。</b></p>
      <p><a class="primary" href="reader.html?file=${enc(BASE + "00_因果鏈回推_三例.md")}">先看因果鏈回推</a>
         <a class="secondary" href="reader.html?file=${enc(BASE + "00_名詞展開_過度濃縮用語.md")}">名詞展開</a>
         <a class="secondary" href="deliverables.html">六份交付物</a></p>
    </section>

    <section class="panel page-doc">
      <h2>主線：01 → 18</h2>
      <table class="map-table">
        <tr><th>序</th><th>產出（回答什麼）</th><th>線上</th><th>原始檔</th></tr>
${rows}
      </table>
      <p class="note-line">16 是資料夾（線框與 Prototype）；10 是 CSS 檔（閱讀器以純文字顯示）。</p>
    </section>

    <section class="panel page-doc">
      <h2>旁支：研究、計畫、交付物與走讀輔助</h2>
      <table class="map-table">
        <tr><th>類別</th><th>內容</th><th>線上</th><th>原始檔</th></tr>
${extraRows}
      </table>
    </section>

    <footer class="site-footer">
      <span>本頁由 \`gen-case.mjs\` 產生，請勿手改。</span>
      <a href="index.html">← 回學習導航</a>
    </footer>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(site, "case.html"), html, "utf8");
console.log("已產生 case.html（" + ARTIFACTS.length + " 份主線＋" + EXTRAS.length + " 筆旁支）");
