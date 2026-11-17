#!/usr/bin/env node
/**
 * check-project-integrity.mjs — 檢查 Spec 以外的來源、證據與 Prototype 是否一致。
 * 用法：node check-project-integrity.mjs <專案根目錄>
 */
import fs from "node:fs";
import path from "node:path";
const arg = process.argv[2];
const project = arg ? path.resolve(arg) : "";
if (!arg || !fs.existsSync(project)) {
  console.error("用法：node check-project-integrity.mjs <專案根目錄>");
  process.exit(1);
}

let fails = 0;
const ok = (msg) => console.log("  ✓ " + msg);
const fail = (msg) => { console.log("  ✗ " + msg); fails++; };
const exists = (rel) => fs.existsSync(path.join(project, rel));
const read = (rel) => fs.readFileSync(path.join(project, rel), "utf8");

console.log("檢查專案：" + project);
console.log("\n【① 必要證據檔案】");
[
  "18_spec.md",
  "17_UserStory-I_AC.md",
  "15_UX.md",
  "16_wireframes/prototype/index.html",
  "16_wireframes/prototype/assets/story-data.js",
  "16_wireframes/prototype/assets/review-report.js",
  "16_wireframes/prototype/assets/checks-summary.js",
  "validation/review-report.md",
  "09_DESIGN_audit.md",
  "DESIGN-DISPLAY.md"
].forEach(rel => exists(rel) ? ok(rel) : fail("找不到 " + rel));
if (exists("17_UserStory-I_AC_generated.md")) fail("仍有平行正式檔 17_UserStory-I_AC_generated.md");

if (!fails) {
  console.log("\n【② Prototype 與正式 Story】");
  const dataCode = read("16_wireframes/prototype/assets/story-data.js");
  const data = new Function(dataCode + "\nreturn globalThis.STORY_DATA;")();
  const storyMd = read("17_UserStory-I_AC.md");
  const acIds = [...storyMd.matchAll(/\|\s*(AC-\d+)\s*\|/g)].map(m => m[1]);
  const uniqueAc = new Set(acIds);
  if (uniqueAc.size === data.acCatalog.length) ok(`正式 17 有 ${uniqueAc.size} 條 AC，與 story-data.js ${data.acCatalog.length} 條一致`);
  else fail(`正式 17 有 ${uniqueAc.size} 條 AC，但 story-data.js 有 ${data.acCatalog.length} 條`);

  const scrDirs = fs.readdirSync(path.join(project, "16_wireframes/prototype"))
    .filter(name => /^scr-\d+/.test(name) && fs.statSync(path.join(project, "16_wireframes/prototype", name)).isDirectory());
  const ux = read("15_UX.md");
  const uxMatch = ux.match(/範圍\s*\|\s*(\d+)\s*個介面/);
  const uxCount = uxMatch ? Number(uxMatch[1]) : null;
  if (uxCount === scrDirs.length) ok(`UX、Prototype 都是 ${uxCount} 個 SCR`);
  else fail(`UX SCR=${uxCount ?? "未找到"}、Prototype=${scrDirs.length}，數量不一致`);

  const reviewCode = read("16_wireframes/prototype/assets/review-report.js");
  const report = new Function(reviewCode + "\nreturn globalThis.REVIEW_REPORT;")();
  const statuses = Object.values(report.items || {});
  const pending = statuses.filter(v => v === "pending").length;
  const missing = (data.checks || []).filter(c => !uniqueAc.has(c.id));
  if (!pending) ok(`人工走查沒有 pending（PASS ${statuses.filter(v => v === "pass").length}、N/A ${statuses.filter(v => v === "na").length}）`);
  else fail(`人工走查仍有 ${pending} 個 pending`);
  if (!missing.length) ok("Prototype checks 的 AC 都存在於正式 17");
  else fail("Prototype checks 引用不存在的 AC：" + missing.map(c => c.id).join("、"));

  const summary = read("16_wireframes/prototype/assets/checks-summary.js");
  if (/["']?allOk["']?\s*:\s*true/.test(summary)) ok("checks-summary.js 記錄四層檢查通過");
  else fail("checks-summary.js 沒有 allOk: true");

  const spec = read("18_spec.md");
  if (/11\/11/.test(spec) && /53 個元素/.test(spec)) ok("18_spec 的畫面與元素數量已同步");
  else fail("18_spec 缺少 11/11 畫面或 53 個元素的一致性證據");
  if (/validation\/review-report\.md/.test(spec) && /09_DESIGN_audit\.md/.test(spec)) ok("18_spec 引用的 validation 與 Design audit 路徑存在");
  else fail("18_spec 沒有完整引用 validation／Design audit");
}

console.log("\n" + (fails ? `${fails} 個問題` : "跨文件完整性全部通過"));
process.exit(fails ? 1 : 0);
