#!/usr/bin/env node
/**
 * impact.mjs — 影響分析：改一個東西，哪些頁面／資料／文件要跟著改
 * 用法：
 *   node impact.mjs --ac AC-12
 *   node impact.mjs --screen scr-03-checkout
 *   node impact.mjs --element E-16
 *   node impact.mjs --task T-06
 *   node impact.mjs --ac AC-01 --ac AC-02      （可重複，取聯集）
 * 設計原則：只讀現有資料（story-data／elements／tasks），不另建第二份對照表。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../..");   // 工作區根目錄

const load = (rel) => {
  const src = fs.readFileSync(path.join(here, rel), "utf8");
  new Function(src)();
};
load("assets/story-data.js");
load("assets/elements.js");
load("assets/tasks.js");
const G = globalThis;
const D = G.STORY_DATA, ELS = G.ELEMENTS || [], TASKS = G.TASKS || [];

/* ---------- 參數 ---------- */
const argv = process.argv.slice(2);
const pick = (k) => argv.reduce((acc, v, i) => (v === k ? acc.concat([argv[i + 1]]) : acc), []);
const acs = pick("--ac"), screens = pick("--screen"), els = pick("--element"), tasks = pick("--task"), reqs = pick("--req");
if (!acs.length && !screens.length && !els.length && !tasks.length && !reqs.length) {
  console.log("用法：node impact.mjs --ac AC-12 ｜ --screen scr-03 ｜ --element E-16 ｜ --task T-06 ｜ --req REQ-012");
  process.exit(2);
}

/* ---------- 索引 ---------- */
const acById = new Map((D.acCatalog || []).map(a => [a.id, a]));
const storyByAC = new Map();
(D.stories || []).forEach(s => (s.ac || []).forEach(id => {
  if (!storyByAC.has(id)) storyByAC.set(id, []);
  storyByAC.get(id).push(s);
}));
const actionsByScreen = new Map();
(D.actions || []).forEach(a => {
  const s = a.screen || (a.from || "").split(":")[0];
  if (!s) return;
  if (!actionsByScreen.has(s)) actionsByScreen.set(s, []);
  actionsByScreen.get(s).push(a);
});
const elsByScreen = new Map();
ELS.forEach(e => {
  if (!elsByScreen.has(e.screen)) elsByScreen.set(e.screen, []);
  elsByScreen.get(e.screen).push(e);
});
const elsByTask = new Map();
ELS.forEach(e => { if (e.task) { if (!elsByTask.has(e.task)) elsByTask.set(e.task, []); elsByTask.get(e.task).push(e); } });

/* ---------- 展開影響集 ---------- */
const hitAC = new Set(), hitScreen = new Set(), hitEl = new Set(), hitTask = new Set();
acs.forEach(id => hitAC.add(id));
els.forEach(id => hitEl.add(id));
screens.forEach(s => hitScreen.add(s));
tasks.forEach(t => hitTask.add(t));

// AC → 故事 → 頁面
hitAC.forEach(id => (storyByAC.get(id) || []).forEach(s => {
  (s.path || []).forEach(p => hitScreen.add(p));
}));
// 元素 → 頁面／任務
hitEl.forEach(id => {
  const e = ELS.find(x => x.id === id);
  if (!e) return;
  hitScreen.add(e.screen);
  if (e.task) hitTask.add(e.task);
});
// 任務 → 元素
hitTask.forEach(t => (elsByTask.get(t) || []).forEach(e => { hitEl.add(e.id); hitScreen.add(e.screen); }));

/* ---------- REQ → AC → 故事 → 頁面 ---------- */
const specPath = path.join(root, "98_示範案例/雲端早餐店/18_spec.md");
const specText = fs.existsSync(specPath) ? fs.readFileSync(specPath, "utf8") : "";
const reqInfo = [];
reqs.forEach(id => {
  const line = specText.split("\n").find(l => l.includes(id)) || "";
  const acsInLine = (line.match(/AC-\d{2}/g) || []);
  acsInLine.forEach(a => hitAC.add(a));
  reqInfo.push({ id, line: line.trim(), acs: acsInLine });
  (storyByAC.size ? [] : []).forEach(() => {});
  acsInLine.forEach(a => (storyByAC.get(a) || []).forEach(s => (s.path || []).forEach(x => hitScreen.add(x))));
});

/* ---------- 輸出 ---------- */
console.log("========================================");
console.log("影響分析：" + [].concat(reqs.length?["REQ "+reqs.join("、")]:[], acs.length?["AC "+acs.join("、")]:[], screens.length?["頁面 "+screens.join("、")]:[],
  els.length?["元素 "+els.join("、")]:[], tasks.length?["任務 "+tasks.join("、")]:[]).join(" ｜ "));
console.log("========================================");

if (reqInfo.length) {
  console.log("\n■ 需求");
  reqInfo.forEach(r => {
    const m = r.line.match(/\|\s*REQ-\d{3}\s*\|([^|]+)\|/);
    console.log("  " + r.id + "  " + ((m && m[1].trim()) || "(找不到需求敘述)").slice(0, 40)
      + "  → " + (r.acs.join("、") || "（無 AC）"));
  });
}

if (hitAC.size) {
  console.log("\n■ 受影響的驗收條件");
  [...hitAC].sort().forEach(id => {
    const a = acById.get(id) || {};
    const st = (storyByAC.get(id) || []).map(s => s.id).join("、") || "—";
    console.log("  " + id.padEnd(7) + (a.title || a.desc || "").slice(0, 34).padEnd(36) + "故事 " + st);
  });
}

if (hitScreen.size) {
  console.log("\n■ 要檢查的頁面（" + hitScreen.size + "）");
  [...hitScreen].sort().forEach(s => {
    const eb = (elsByScreen.get(s) || []).length;
    const ab = (actionsByScreen.get(s) || []).length;
    console.log("  " + s.padEnd(24) + "元素 " + String(eb).padStart(2) + "｜動作 " + String(ab).padStart(2));
  });
}

const dataFields = new Set();
[...hitEl].forEach(id => { const e = ELS.find(x => x.id === id); if (e && e.source) dataFields.add(String(e.source)); });
[...hitScreen].forEach(s => (elsByScreen.get(s) || []).forEach(e => { if (e.kind !== "act" && e.source) dataFields.add(String(e.source)); }));
if (dataFields.size) {
  console.log("\n■ 會動到的資料（前後端共享的事實）");
  [...dataFields].sort().slice(0, 24).forEach(f => console.log("  " + f));
  if (dataFields.size > 24) console.log("  … 共 " + dataFields.size + " 筆");
}

const actOut = new Set();
[...hitScreen].forEach(s => (actionsByScreen.get(s) || []).forEach(a => { if (a.action) actOut.add(a.action); }));
if (actOut.size) {
  console.log("\n■ 可能受影響的動作／端點");
  [...actOut].sort().forEach(a => console.log("  " + a));
}

console.log("\n■ 改完要重跑");
["verify-stories.mjs（AC 與任務）", "check-layout-order.mjs（版面順序）", "smoke-dom.mjs（頁面渲染）", "node check-all.mjs（四層一次跑）"]
  .forEach(x => console.log("  · " + x));

/* 文件提及 */
const docRoots = ["98_示範案例/雲端早餐店", "06_W06_UX", "07_W07_Spec"];
const ids = [...hitAC, ...hitEl, ...hitTask, ...hitScreen, ...reqs];
const mentions = [];
const walk = (d) => {
  if (!fs.existsSync(d)) return;
  for (const n of fs.readdirSync(d)) {
    if (n.startsWith(".") || n === "prototype" || n === "week6-student" || n === "week7-student") continue;
    const p = path.join(d, n);
    if (fs.statSync(p).isDirectory()) { walk(p); continue; }
    if (!/\.md$/.test(n)) continue;
    const t = fs.readFileSync(p, "utf8");
    const hit = ids.filter(id => t.includes(id));
    if (hit.length) mentions.push([path.relative(root, p), hit.length]);
  }
};
docRoots.forEach(r => walk(path.join(root, r)));
if (mentions.length) {
  console.log("\n■ 提到這些 ID 的文件（改完要同步）");
  mentions.sort((a, b) => b[1] - a[1]).slice(0, 30).forEach(([f, c]) => console.log("  " + String(c).padStart(2) + " 處  " + f));
}
console.log("");
