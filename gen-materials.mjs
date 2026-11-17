#!/usr/bin/env node
/**
 * gen-materials.mjs — 從 assets/materials-data.mjs 重生 00_CourseSite/materials.html
 * 教材分三類：教學視角（我會怎麼上）／學習者步驟（你依序做什麼）／參考
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { MATERIALS } from "./00_CourseSite/assets/materials-data.mjs";

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, "00_CourseSite");
const enc = (p) => encodeURIComponent(p);

const row = (m) => {
  const reader = m.kind === "doc" ? "reader.html?file=" + enc(m.href) : m.href;
  const raw = m.kind === "doc"
    ? `<a class="ghost" href="${m.href}" download>原始檔</a>`
    : '<span class="muted">—</span>';
  return `        <tr>
          <td>${m.type}</td>
          <td><b>${m.title}</b><br><span class="muted">${m.desc}</span></td>
          <td><a class="secondary" href="${reader}">線上觀看</a></td>
          <td>${raw}</td>
        </tr>`;
};

const section = (title, eyebrow, note, audience) => {
  const items = MATERIALS.filter((m) => m.audience === audience);
  if (!items.length) return "";
  return `    <section id="${audience}" class="panel page-doc">
      <p class="eyebrow">${eyebrow}</p>
      <h2>${title}</h2>
      <p class="muted">${note}</p>
      <table class="map-table">
        <tr><th>類型</th><th>教材</th><th>線上</th><th>原始檔</th></tr>
${items.map(row).join("\n")}
      </table>
    </section>`;
};

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="教材索引：教學視角、學習者步驟、參考資料。">
  <title>教材索引｜服務設計到 Spec</title>
  <link rel="stylesheet" href="assets/site.css">
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html" aria-label="回到學習導航">
      <span class="brand-mark">18</span>
      <span><b>服務設計到 Spec</b><small>教材索引</small></span>
    </a>
    <div class="top-actions">
      <a class="ghost" href="flow.html">一頁流程圖</a>
      <a class="secondary" href="index.html">回學習導航</a>
    </div>
  </header>

  <main class="doc-shell">
    <section class="panel page-doc">
      <p class="eyebrow">MATERIALS</p>
      <h1>教材索引</h1>
      <p class="lead">同一份內容有兩種讀法：<b>教學視角</b>（我會怎麼上）與<b>學習者步驟</b>（你依序做什麼）。兩者用途不同，不要混用。原始檔是正式來源，網站是閱讀與講解介面。</p>
      <p><a class="secondary" href="#teach">教學視角</a> <a class="secondary" href="#learn">學習者步驟</a> <a class="secondary" href="#ref">參考資料</a></p>
    </section>

${section("教學視角：我會怎麼上", "FOR TEACHING", "教案與講義。讀的時候可以把自己放在「要教這堂課的人」的位置。", "teach")}

${section("學習者步驟：你依序做什麼", "FOR LEARNING", "操作手冊與作業範本。一步一步做，做完一步再進行下一步。", "learn")}

${section("參考資料", "REFERENCE", "方法說明、狀態與物件定義、工程紀錄、名詞展開。", "ref")}

    <footer class="site-footer">
      <span>本頁由 \`gen-materials.mjs\` 從 \`assets/materials-data.mjs\` 產生，請勿手改。</span>
      <a href="index.html">← 回學習導航</a>
    </footer>
  </main>
</body>
</html>
`;
fs.writeFileSync(path.join(site, "materials.html"), html, "utf8");
console.log("已產生 materials.html（" + MATERIALS.length + " 筆）");
