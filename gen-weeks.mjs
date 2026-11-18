#!/usr/bin/env node
/**
 * gen-weeks.mjs — 產生 00_CourseSite/weeks.html（每週流程：前測→教學→後測→作業）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, "00_CourseSite");
const enc = (p) => encodeURIComponent(p);
const TECH = "../90_技術與架構/";
const MEAS = TECH + "實驗與量測/";

const WEEKS = [
  { id: "W11", pre: "T0", preTitle: "前測（全範圍基線）", post: "W11post",
    l1: ["1", "01_全端地圖與請求生命週期"], l2: ["2", "02_瀏覽器與渲染路徑"],
    hw: MEAS + "04a_作業單_R1.md", note: "H1：訂單狀態頁；知情同意、ARCS 前測、T0 基線" },
  { id: "W12", pre: "W12pre", post: "W12post",
    l1: ["3", "03_樣式策略"], l2: ["4", "04_React與狀態"],
    hw: MEAS + "04d_作業單_H2.md", note: "H2：樣式策略與資料流；前測含 W11 保留題" },
  { id: "W13", pre: "W13pre", post: "W13post",
    l1: ["5", "05_TypeScript與Zod"], l2: ["6", "06_資料模型與ORM"],
    hw: MEAS + "04e_作業單_H3.md", note: "H3：結構定義與錯誤；前測含 W12 保留題" },
  { id: "W14", pre: "W14pre", post: "W14post",
    l1: ["7", "07_資料庫與serverless"], l2: ["8", "08_REST契約與錯誤處理"],
    hw: MEAS + "04b_作業單_R2.md", note: "H4：契約與連線策略；前測含 W13 保留題" },
  { id: "W15", pre: "W15pre", post: "W15post",
    l1: ["9", "09_身分驗證與授權"], l2: ["10", "10_即時更新與可觀測性"],
    hw: MEAS + "04f_作業單_H5.md", note: "H5：權限與即時選型；埋錯測驗" },
  { id: "W16", pre: "W16pre", post: "W16post",
    l1: ["11", "11_一致性冪等與競態"], l2: ["12", "12_選型方法"],
    hw: MEAS + "04c_作業單_R3.md", note: "H6：一致性與選型；T3 全範圍後測、成果展" }
];

const weekCard = (w) => `
      <article class="week-card">
        <div class="week-head"><b>${w.id}</b><span>${w.note}</span></div>
        <table class="map-table">
          <tr><th>時間</th><th>做什麼</th><th>入口</th></tr>
          <tr><td>0–15</td><td><b>前測</b>（不可使用 AI）${w.preTitle ? "：" + w.preTitle : ""}</td><td><a class="primary" href="quiz.html?set=${enc(w.pre)}">開始前測</a></td></tr>
          <tr><td>15–60</td><td>講義 ${w.l1[0]}＋實作</td><td><a class="secondary" href="reader.html?file=${enc(TECH + w.l1[1] + "/00_講義.md")}">講義</a> <a class="ghost" href="reader.html?file=${enc(TECH + w.l1[1] + "/00_學生操作手冊.md")}">手冊</a></td></tr>
          <tr><td>60–105</td><td>講義 ${w.l2[0]}＋實作</td><td><a class="secondary" href="reader.html?file=${enc(TECH + w.l2[1] + "/00_講義.md")}">講義</a> <a class="ghost" href="reader.html?file=${enc(TECH + w.l2[1] + "/00_學生操作手冊.md")}">手冊</a></td></tr>
          <tr><td>105–120</td><td><b>後測</b>（可用 AI）</td><td><a class="primary" href="quiz.html?set=${enc(w.post)}">開始後測</a></td></tr>
          <tr><td>120–180</td><td>實作、問答、作業說明</td><td><a class="secondary" href="reader.html?file=${enc(w.hw)}">本週作業單</a></td></tr>
        </table>
      </article>`;

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="每週流程：前測、教學、後測、作業，全部在同一個網站完成。">
  <title>每週流程｜服務設計到 Spec</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html" aria-label="回到學習導航">
      <span class="brand-mark">W</span>
      <span><b>每週流程</b><small>W11–W16</small></span>
    </a>
    <div class="top-actions">
      <a class="ghost" href="tech.html">技術架構</a>
      <a class="ghost" href="quiz.html">隨堂測驗</a>
      <a class="ghost" href="materials.html">教材索引</a>
      <a class="secondary" href="index.html">回學習導航</a>
    </div>
  </header>

  <main class="doc-shell">
    <section class="panel page-doc">
      <p class="eyebrow">WEEKLY FLOW</p>
      <h1>每週流程：15 前測 → 教學 → 15 後測 → 作業</h1>
      <p class="lead">上課不用離開這個網站：前測與後測在 <b>quiz.html</b>，講義與手冊用閱讀器打開，作業單在這裡領取。只有「使用 AI 與其他工具」需要切換視窗。</p>
      <p><a class="primary" href="quiz.html">測驗列表</a> <a class="secondary" href="tech.html">12 講總覽</a> <a class="secondary" href="reader.html?file=${enc(MEAS + "00_六週教案.md")}">六週教案</a></p>
      <p class="note-line">前測不可使用 AI；後測可用 AI（交卷前要截圖 token）。每份 15 分鐘，時間到自動交卷並產生 PDF。</p>
    </section>
${WEEKS.map(weekCard).join("\n")}
    <footer class="site-footer">
      <span>本頁由 <code>gen-weeks.mjs</code> 產生，請勿手改。</span>
      <a href="index.html">← 回學習導航</a>
    </footer>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(site, "weeks.html"), html, "utf8");
console.log("已產生 weeks.html（" + WEEKS.length + " 週）");
