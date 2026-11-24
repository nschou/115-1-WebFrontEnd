#!/usr/bin/env node
/**
 * gen-tech.mjs — 產生 00_CourseSite/tech.html（技術與架構 12 講）
 * 資料在本檔 LECTURES；改這裡再跑 node gen-tech.mjs。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, "00_CourseSite");
const enc = (p) => encodeURIComponent(p);
const BASE = "../90_技術與架構/";

const LECTURES = [
  ["W11", 0, "開發環境：Bun＋Next.js＋Prisma＋serverless＋Tailwind", "能啟動、能連資料庫、能改畫面", "00_開發環境"],
  ["W11", 1, "全端地圖與一次請求的生命週期", "四層圖＋三個卡點", "01_全端地圖與請求生命週期"],
  ["W11", 2, "瀏覽器：HTML／CSS／JS 與渲染路徑", "指出哪一步會卡住", "02_瀏覽器與渲染路徑"],
  ["W12", 3, "樣式策略：工具優先／元件庫／設計系統", "三條路各寫優缺點", "03_樣式策略"],
  ["W12", 4, "React＋渲染模式＋伺服器端／用戶端狀態", "為一頁選模式並畫資料流", "04_React與狀態"],
  ["W13", 5, "TypeScript＋Zod：結構定義當唯一事實", "由 schema 產型別與驗證", "05_TypeScript與Zod"],
  ["W13", 6, "資料模型與 ORM（Prisma／Drizzle）", "同一模型寫兩次", "06_資料模型與ORM"],
  ["W14", 7, "資料庫與 serverless（連線池、遷移）", "上線前五個風險", "07_資料庫與serverless"],
  ["W14", 8, "REST 契約（contract）與錯誤處理", "一份 API 契約", "08_REST契約與錯誤處理"],
  ["W15", 9, "身分驗證（authentication）與授權（authorization）", "權限矩陣＋三條禁用規則", "09_身分驗證與授權"],
  ["W15", 10, "即時更新（SSE／WebSocket／輪詢）與可觀測性", "為 1 秒需求選一個並寫事件紀錄", "10_即時更新與可觀測性"],
  ["W16", 11, "一致性、冪等（idempotent）、競態條件（race condition）", "付款與號碼各一條規則", "11_一致性冪等與競態"],
  ["W16", 12, "選型方法：決策矩陣（decision matrix）與 ADR", "用案例五個決策評分", "12_選型方法"]
];

const MEASURES = [
  ["六週教案（W11–W16）", "每週 3 小時、兩個技術主題、量測點", "00_六週教案.md"],
  ["crossover 任務設計", "同構任務、分組交換、rubric", "01_crossover任務設計.md"],
  ["前測／後測題本", "題本 A／B、rubric、施測說明", "02_前後測題本.md"],
  ["段考題本（無 AI＋AI 擴展）", "兩階段 60＋60、gap 算法", "03_段考題本.md"],
  ["三段式作業模板（A／B／C）", "手寫核心／指揮 AI／驗證報告", "04_作業模板_ABC.md"],
  ["作業單 R1：訂單狀態頁", "A 無 AI、B 有 AI、C 驗證報告", "04a_作業單_R1.md"],
  ["作業單 R2：介面契約", "A 無 AI、B 有 AI、C 驗證報告", "04b_作業單_R2.md"],
  ["作業單 R3：一致性與權限", "A 無 AI、B 有 AI、C 驗證報告（整合）", "04c_作業單_R3.md"],
  ["量測表單", "ARCS、觀察表、埋錯 10 題、prompt 分類、token CSV", "05_量測表單.md"],
  ["知情同意書", "研究目的、資料處理、退出權利", "06_知情同意書.md"]
];

const row = ([week, no, title, output, folder]) => {
  const links = folder
    ? `<a class="secondary" href="reader.html?file=${enc(BASE + folder + "/00_講義.md")}">講義</a>
       <a class="ghost" href="reader.html?file=${enc(BASE + folder + "/00_學生操作手冊.md")}">手冊</a>`
    : '<span class="muted">尚未產出</span>';
  return `        <tr>
          <td>${week}</td>
          <td>${no}</td>
          <td><b>${title}</b><br><span class="muted">產出：${output}</span></td>
          <td>${links}</td>
        </tr>`;
};

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="技術與架構：W11–W16 十二講。">
  <title>技術與架構｜服務設計到 Spec</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html" aria-label="回到學習導航">
      <span class="brand-mark">12</span>
      <span><b>技術與架構</b><small>W11–W16</small></span>
    </a>
    <div class="top-actions">
      <a class="ghost" href="case.html">案例走讀</a>
      <a class="ghost" href="quiz.html">隨堂測驗</a>
      <a class="ghost" href="materials.html">教材索引</a>
      <a class="secondary" href="index.html">回學習導航</a>
    </div>
  </header>

  <main class="doc-shell">
    <section class="panel page-doc">
      <p class="eyebrow">TECH & ARCHITECTURE</p>
      <h1>技術與架構：十二講</h1>
      <p class="lead">以 Web 前端為主，但把全端講清楚。<b>每講一個可驗收產出</b>，練習一律回到示範案例；作業與期末專案仍用你自己的版本。</p>
      <p><a class="primary" href="reader.html?file=${enc(BASE + "00_課程地圖.md")}">課程地圖與主題檢視</a></p>
      <table class="map-table">
        <tr><th>週</th><th>講</th><th>主題</th><th>教材</th></tr>
${LECTURES.map(row).join("\n")}
      </table>
      <p class="note-line">尚未產出的講次會標示「尚未產出」；產出後重新執行 <code>node gen-tech.mjs</code> 即可更新。</p>
    </section>

    <section class="panel page-doc">
      <h2>實驗與量測（教學研究）</h2>
      <p class="lead">上課與量測的完整設計：六週教案、交叉任務、前後測、段考、作業模板、表單與同意書。</p>
      <p><a class="primary" href="weeks.html">看每週流程</a> <a class="secondary" href="quiz.html">開始線上測驗</a>（15 分鐘，交卷後產生 PDF）</p>
      <table class="map-table">
        <tr><th>項目</th><th>說明</th><th>連結</th></tr>
${MEASURES.map(([title, desc, file]) => `        <tr><td><b>${title}</b></td><td class="muted">${desc}</td><td><a class="secondary" href="reader.html?file=${enc(BASE + "實驗與量測/" + file)}">線上觀看</a></td></tr>`).join("\n")}
      </table>
    </section>
    <footer class="site-footer">
      <span>本頁由 <code>gen-tech.mjs</code> 產生，請勿手改。</span>
      <a href="index.html">← 回學習導航</a>
    </footer>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(site, "tech.html"), html, "utf8");
console.log("已產生 tech.html（" + LECTURES.length + " 講）");
