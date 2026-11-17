#!/usr/bin/env node
/**
 * check-objects.mjs — 物件對接檢查
 * ① 05_objects 的每個 OBJ 都要有「基數／身分／關係」三欄
 * ② plan.md §3 的每張資料表都要對應一個 OBJ，或明確標「非業務」
 * ③ 每個 OBJ 在 plan.md 至少被提到一次（落點）
 * 用法：node check-objects.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const ex = path.join(root, "98_示範案例", "雲端早餐店");
const fail = [];
const ok = (m) => console.log("  ✓ " + m);
const bad = (m) => { console.log("  ✗ " + m); fail.push(m); };

const objs = fs.readFileSync(path.join(ex, "05_objects.md"), "utf8");
const plan = fs.readFileSync(path.join(ex, "plan.md"), "utf8");

/* ---------- ① 物件卡三欄 ---------- */
console.log("【① 物件卡：基數／身分／關係】");
const lines = objs.split("\n");
const head = lines.find(l => /^\| OBJ \| 物件/.test(l)) || "";
const hasCols = /基數/.test(head) && /身分/.test(head) && /關係/.test(head);
if (!hasCols) bad("05_objects 缺少「基數／身分／關係」欄位");
else {
  const rows = lines.filter(l => /^\|\s*OBJ-\d{2}/.test(l));
  const empty = rows.filter(l => {
    const c = l.split("|").slice(1, -1).map(s => s.trim());
    return c.some(x => x === "" || x === "—");
  });
  console.log("  物件 " + rows.length + " 個｜欄位不全 " + empty.length);
  empty.forEach(l => bad("欄位不全：" + l.slice(0, 40) + "…"));
  if (!empty.length) ok("每個物件都有基數、身分、關係");
}

/* ---------- ② plan 資料表的 OBJ 對應 ---------- */
console.log("\n【② plan 資料表 → OBJ】");
const objIds = [...new Set((objs.match(/OBJ-\d{2}/g) || []))].sort();
const planRows = plan.split("\n").filter(l => /^\|\s*`[a-z_]+`/.test(l));
const covered = new Set();
planRows.forEach(l => (l.match(/OBJ-\d{2}/g) || []).forEach(x => covered.add(x)));
const orphan = planRows.filter(l => !/OBJ-\d{2}/.test(l) && !/非業務/.test(l) && !/技術實體/.test(l));
console.log("  資料表 " + planRows.length + " 張｜有 OBJ " + covered.size + " 個｜無 OBJ 且未標非業務 " + orphan.length);
orphan.forEach(l => bad("資料表沒有 OBJ 也沒標非業務：" + l.split("|")[1].trim()));
if (!orphan.length) ok("每張資料表都有 OBJ 或標明非業務");
const noLanding = objIds.filter(id => !covered.has(id) && !new RegExp(id + "[^\\n]*落點").test(plan));
if (noLanding.length) noLanding.forEach(id => bad("OBJ 沒有落點：" + id));
else ok("每個 OBJ 都有落點（或已註明由 OOD 決定）");

/* ---------- ③ 業務層是否講清楚基數 ---------- */
console.log("\n【③ 餐點基數】");
if (/1 訂單 → N 份/.test(objs) && /1 訂單 → N 份/.test(plan)) ok("「1 訂單 → N 份」已寫進物件表與 plan");
else bad("「餐點」的基數未在物件表與 plan 同時寫清楚");

/* ---------- ④ 狀態代號對照 ---------- */
console.log("\n【④ 狀態代號對照】");
const SKIP = ["99_歷史封存", "00_學生發布版", ".git", "node_modules", "vendor", "generated_reference"];
const mdFiles = [];
const walkMd = (dir) => {
  for (const n of fs.readdirSync(dir)) {
    if (SKIP.some((s) => n.includes(s))) continue;
    const p = path.join(dir, n);
    const st = fs.statSync(p);
    if (st.isDirectory()) walkMd(p);
    else if (n.endsWith(".md")) mdFiles.push(p);
  }
};
walkMd(root);
const noLegend = [];
for (const f of mdFiles) {
  const s = fs.readFileSync(f, "utf8");
  if (!/\bS[0-7]\b|\bSX[1-4]\b/.test(s)) continue;
  const okLegend = /狀態代號|代號對照|完整定義見|\|\s*S1\s*\|\s*草稿|\|\s*S1 草稿/.test(s);
  if (!okLegend) noLegend.push(path.relative(root, f));
}
if (noLegend.length) noLegend.forEach((f) => bad("用到狀態代號但沒有對照：" + f));
else ok("用到狀態代號的教材都有對照（" + mdFiles.length + " 份掃描）");

console.log("\n" + (fail.length ? fail.length + " 個問題" : "物件對接：全部通過"));
process.exit(fail.length ? 1 : 0);
