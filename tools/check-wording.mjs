#!/usr/bin/env node
/**
 * check-wording.mjs — 用語檢查：數字要有主詞、術語要展開、不要用隱喻
 *
 * ① 錯誤（會讓交件失敗）
 *    - 數字沒主詞：出現「≤1 秒」「3 秒內」卻沒說「誰、看到什麼」
 *    - 隱喻代替機制：「防塞車」「打臉」「翻車」等
 * ② 警告（只提示，不擋交件）
 *    - 術語裸用：冪等、快照、降級、競態…第一次出現沒展開
 *
 * 用法：node check-wording.mjs [--strict] [--root=<專案目錄>]
 *   --strict：把警告也當錯誤
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const rootArg = (process.argv.find((a) => a.startsWith("--root=")) || "").split("=")[1];
const root = rootArg ? path.resolve(rootArg) : SCRIPT_DIR;
const strict = process.argv.includes("--strict");
const SKIP = ["99_歷史封存", "00_學生發布版", ".git", "node_modules", "vendor", "generated_reference", "_generated"];

const walk = (dir, out = []) => {
  for (const n of fs.readdirSync(dir)) {
    if (n.startsWith(".") || SKIP.some((s) => n.includes(s))) continue;
    const p = path.join(dir, n);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.md$/.test(n)) out.push(p);
  }
  return out;
};

const SKIP_FILES = ["CHANGELOG.md", "00_名詞展開_過度濃縮用語.md"]; // 變更紀錄會引用舊說法，不列入用語檢查
const files = walk(root).filter((f) => !f.endsWith("check-wording.mjs") && !SKIP_FILES.includes(path.basename(f)));
const errors = [];
const warnings = [];

const SUBJECT = /看到|可見|出現|顯示|回應|完成|送出|載入|通知|更新|狀態|顧客|店員|廚師|看板|畫面|頁面|請求|操作|系統|端|資料|離店|做完|回答|找到|決定|進入|離開|結帳|點|選|讀/;
const METAPHOR = ["防塞車", "打臉", "翻車", "踩雷", "救火", "骨牌", "止血"];
const NARRATION = ["先問：「", "接著說", "然後念", "白板上", "交棒", "我會先", "我認為", "我建議", "我預期", "要求每組", "請他只用"];
const NARRATION_EXEMPT = ["00_方法論主線與檢查點.md", "CHANGELOG.md", "00_名詞展開_過度濃縮用語.md"];
const TERMS = ["冪等", "快照", "降級", "競態", "單一狀態來源", "權威來源"];

for (const f of files) {
  const rel = path.relative(root, f);
  const lines = fs.readFileSync(f, "utf8").split("\n");
  const definedInFile = new Set();
  let fence = false;
  lines.forEach((line, i) => {
    const t = line.trim();
    if (/^```/.test(t) || /^\s*<pre/.test(t)) { fence = !fence; return; }
    if (fence) return;
    if (!t) return;

    // ① 數字沒主詞
    const numRe = /(≤\s*\d+(?:\.\d+)?\s*(?:秒|毫秒|ms))|(\d+(?:\.\d+)?\s*(?:秒|毫秒)\s*內)/g;
    for (const m of t.matchAll(numRe)) {
      const idx = m.index || 0;
      const ctx = t.slice(Math.max(0, idx - 40), idx + m[0].length + 40);
      if (!SUBJECT.test(ctx)) {
        errors.push(rel + ":" + (i + 1) + "  「" + m[0] + "」沒說誰／看到什麼 → " + t.slice(0, 80));
      }
    }

    // ② 教師動作與自我陳述（教材不要寫「我怎麼上」）
    if (!NARRATION_EXEMPT.includes(path.basename(f))) {
      for (const k of NARRATION) {
        if (t.includes(k)) errors.push(rel + ":" + (i + 1) + "  寫了教師動作或自我陳述「" + k + "」→ 直接寫問題與指令");
      }
    }

    // ③ 隱喻
    for (const k of METAPHOR) {
      if (t.includes(k)) errors.push(rel + ":" + (i + 1) + "  用隱喻「" + k + "」→ 請改寫成具體後果");
    }

    // ④ 術語裸用（警告）：同一檔案第一次出現時要有展開，之後可只用術語
    for (const k of TERMS) {
      if (!t.includes(k)) continue;
      if (definedInFile.has(k)) continue;
      const idx = t.indexOf(k);
      const around = t.slice(Math.max(0, idx - 30), idx + k.length + 40);
      if (/[（(]/.test(around) || /＝|就是|意思是|即|白話/.test(around)) { definedInFile.add(k); continue; }
      warnings.push(rel + ":" + (i + 1) + "  「" + k + "」第一次出現沒展開 → " + t.slice(0, 70));
      definedInFile.add(k); // 每檔只報一次
    }
  });
}

console.log("【① 數字主詞、教師動作、隱喻】");
if (errors.length) errors.forEach((e) => console.log("  ✗ " + e));
else console.log("  ✓ 沒有無主詞的數字，也沒有隱喻");

console.log("\n【② 術語展開（警告）】");
if (warnings.length) {
  warnings.slice(0, 15).forEach((w) => console.log("  ⚠ " + w));
  if (warnings.length > 15) console.log("  …另有 " + (warnings.length - 15) + " 筆");
} else console.log("  ✓ 沒有裸用的術語");

const fail = errors.length + (strict ? warnings.length : 0);
console.log("\n" + (fail ? fail + " 個問題" : "用語檢查：通過") + "（掃描 " + files.length + " 份）");
process.exit(fail ? 1 : 0);
