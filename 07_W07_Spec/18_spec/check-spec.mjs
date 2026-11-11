#!/usr/bin/env node
/**
 * check-spec.mjs — spec.md 的三項指標檢查
 * 用法：node check-spec.mjs [檔案]（預設 18_spec_example.md）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const target = process.argv[2] || "18_spec_example.md";
const file = path.isAbsolute(target) ? target : path.join(root, target);
if (!fs.existsSync(file)) { console.log("找不到檔案：" + file); process.exit(1); }
const md = fs.readFileSync(file, "utf8");

/* 技術名清單（不得出現在 spec） */
const TECH = [
  "Redis","Kafka","RabbitMQ","WebSocket","HTTP","HTTPS","REST","API","JSON","XML",
  "SQL","NoSQL","React","Vue","Angular","Tailwind","Docker","Kubernetes","K8s",
  "MySQL","PostgreSQL","MongoDB","Nginx","JWT",
  "資料庫","伺服器","快取","佇列","訊息佇列","微服務","容器化","部署","前後端","前端","後端",
  "框架","演算法","程式碼","資料表","欄位型別","快取層","負載平衡"
];

let fails = 0;
console.log("檢查檔案：" + path.basename(file));

/* ① 技術名 */
console.log("\n【① 技術名殘留（標準 0）】");
const hits = [];
for (const w of TECH) {
  const re = new RegExp(w, "g");
  const n = (md.match(re) || []).length;
  if (n) hits.push(w + "×" + n);
}
if (hits.length) { console.log("  ✗ " + hits.join("、")); fails += hits.length; }
else console.log("  ✓ 無技術名");

/* ② 需求：來源 ＋ 驗收 */
console.log("\n【② 需求可追溯與驗收（標準 100%）】");
const reqLines = md.split("\n").filter(l => /^\|\s*REQ-\d+/.test(l));
const noSrc = reqLines.filter(l => !l.includes("T-") && !l.includes("OBJ-"));
const noAC = reqLines.filter(l => !l.includes("AC-"));
if (!reqLines.length) { console.log("  ✗ 找不到 REQ 清單"); fails++; }
else {
  console.log("  需求 " + reqLines.length + " 條｜缺來源 " + noSrc.length + "｜缺驗收 " + noAC.length);
  noSrc.forEach(l => console.log("  ✗ 缺來源：" + l.slice(0, 48) + "…"));
  noAC.forEach(l => console.log("  ✗ 缺驗收：" + l.slice(0, 48) + "…"));
  fails += noSrc.length + noAC.length;
  if (!noSrc.length && !noAC.length) console.log("  ✓ 每條需求都有來源與驗收");
}

/* ③ 十章 */
console.log("\n【③ 十章齊全】");
const chapters = ["1. 文件資訊","2. 業務脈絡","3. 角色與服務範圍","4. 業務物件與資訊流",
  "5. 業務流程與狀態機","6. 介面需求","7. 使用者故事與驗收條件","8. 非功能需求","9. 假設與限制","10. 附錄"];
const miss = chapters.filter(c => !md.includes(c));
if (miss.length) { console.log("  ✗ 缺章節：" + miss.join("、")); fails += miss.length; }
else console.log("  ✓ 十章齊全");

console.log("\n" + (fails === 0 ? "三項指標全部通過" : fails + " 個問題"));
process.exit(fails === 0 ? 0 : 1);
