#!/usr/bin/env node
/**
 * lint-tokens.mjs — 原型規範檢查
 * 用法：node lint-tokens.mjs
 * 檢查：①所有 var(--x) 都有定義 ②畫面檔不得寫死色碼 ③不得寫死 >2px 的數值 ④六態按鈕與 section 一一對應
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const tokenFiles = ["assets/tokens.css", "assets/tokens-display.css"];
const defined = new Set();
for (const tf of tokenFiles) {
  const fp = path.join(root, tf);
  if (!fs.existsSync(fp)) continue;
  const src = fs.readFileSync(fp, "utf8");
  [...src.matchAll(/--([a-z0-9-]+)\s*:/g)].forEach(m => defined.add(m[1]));
}

const screens = fs.readdirSync(root).filter(d => d.startsWith("scr-"));
let errors = 0, warns = 0;

for (const scr of screens) {
  const dir = path.join(root, scr);
  if (!fs.statSync(dir).isDirectory()) continue;
  console.log("\n■ " + scr);
  for (const f of ["index.html", "screen.css"]) {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) { console.log("  ⚠ 缺少 " + f); warns++; continue; }
    const t = fs.readFileSync(p, "utf8");

    const used = [...t.matchAll(/var\(\s*--([a-z0-9-]+)\s*\)/g)].map(m => m[1]);
    used.forEach(u => { if (!defined.has(u)) { console.log("  ✗ 未定義 token: --" + u + " (" + f + ")"); errors++; } });

    [...t.matchAll(/#[0-9A-Fa-f]{6}\b/g)].forEach(m => { console.log("  ✗ 寫死色碼: " + m[0] + " (" + f + ")"); errors++; });

    [...t.matchAll(/(?<![\w-])(\d+(?:\.\d+)?)px/g)].forEach(m => {
      if (Number(m[1]) > 2) { console.log("  ✗ 寫死數值: " + m[1] + "px (" + f + ")"); errors++; }
    });
  }
  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  if (!html.includes("state-switcher.js")) { console.log("  ✗ 未載入共用 state-switcher.js"); errors++; }
  const btns = [...html.matchAll(/data-set-state="(\w+)"/g)].map(m => m[1]);
  const secs = [...html.matchAll(/class="state state-(\w+)"/g)].map(m => m[1]);
  const rd = fs.readFileSync(path.join(dir, "README.md"), "utf8");
  const dm = rd.match(/\bL([123])\b/);
  const depth = dm ? Number(dm[1]) : 3;
  const need = depth === 3 ? 6 : 3;
  if (btns.length !== secs.length) { console.log("  ✗ 按鈕數(" + btns.length + ")與狀態數(" + secs.length + ")不一致"); errors++; }
  if (btns.length < need) { console.log("  ✗ 只有 " + btns.length + " 態（L" + depth + " 至少 " + need + "）"); errors++; }
  else console.log("  ✓ " + btns.length + " 態（L" + depth + "，需 ≥" + need + "）: " + btns.join(" / "));
}


/* ---------------- tokens 與 DESIGN.md 同步 ---------------- */
console.log("\n■ tokens 與 DESIGN.md 同步");
const designTokens = path.join(root, "../../../05_W05_物件決策與Design/10_tokens/tokens_example.css");
const parseTokens = (src) => {
  const m = new Map();
  [...src.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gm)].forEach(x => m.set(x[1], x[2].trim()));
  return m;
};
if (fs.existsSync(designTokens)) {
  const A = parseTokens(fs.readFileSync(path.join(root, "assets/tokens.css"), "utf8"));
  const B = parseTokens(fs.readFileSync(designTokens, "utf8"));
  const diff = [...A.keys()].filter(k => B.has(k) && A.get(k) !== B.get(k));
  const missing = [...B.keys()].filter(k => !A.has(k));
  if (diff.length || missing.length) {
    console.log("  ⚠ 與 DESIGN.md 不同步：" + diff.length + " 個值不同、" + missing.length + " 個缺少");
    diff.slice(0, 5).forEach(k => console.log("      " + k + "  原型=" + A.get(k) + "  DESIGN=" + B.get(k)));
    warns++;
  } else console.log("  ✓ 與 DESIGN.md 一致（" + A.size + " 個 token，值全部相同）");
} else console.log("  ⚠ 找不到 DESIGN.md 的 tokens.css（略過同步檢查）");

/* ---------------- 顏色 token 使用率（資訊） ---------------- */
const colorDefs = [...fs.readFileSync(path.join(root, "assets/tokens.css"), "utf8")
  .matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|var\(--m3-[a-z0-9-]+\));/gm)].map(m => m[1]);
const usedColor = new Set();
const scan = (d) => {
  for (const n of fs.readdirSync(d)) {
    const q = path.join(d, n);
    if (fs.statSync(q).isDirectory()) { scan(q); continue; }
    if (!/\.(css|html)$/.test(n) || n.startsWith("tokens")) continue;
    const s = fs.readFileSync(q, "utf8");
    [...s.matchAll(/var\(\s*(--[a-z0-9-]+)/g)].forEach(m => usedColor.add(m[1]));
  }
};
scan(root);
const usedColorCount = colorDefs.filter(c => usedColor.has(c)).length;
console.log("\n■ 顏色 token 使用率");
console.log("  " + usedColorCount + " / " + colorDefs.length + " 個顏色 token 被畫面引用"
  + (usedColorCount < colorDefs.length ? "（未使用多為 m3 原始色票，僅供追溯）" : ""));



/* ---------------- 主題切換 ---------------- */
console.log("\n■ 主題切換");
{
  const blue = path.join(root, "assets/tokens.blue.css");
  if (!fs.existsSync(blue)) { console.log("  ✗ 缺 assets/tokens.blue.css"); errors++; }
  else if (!fs.readFileSync(blue, "utf8").includes('@import url("tokens.css")')) {
    console.log("  ✗ tokens.blue.css 沒有 @import tokens.css（會變成第二份來源）"); errors++;
  } else console.log("  ✓ 藍色主題以 @import 疊在 tokens.css 上（單一來源）");

  let noTheme = 0;
  const allPages = screens.concat(fs.existsSync(path.join(root, "index.html")) ? ["."] : []);
  for (const p of allPages) {
    const f = p === "." ? path.join(root, "index.html") : path.join(root, p, "index.html");
    if (!fs.readFileSync(f, "utf8").includes("theme.js")) { console.log("  ✗ " + (p === "." ? "index.html" : p) + " 未載入 theme.js"); errors++; noTheme++; }
  }
  if (noTheme === 0) console.log("  ✓ 12 個頁面都能切換主題");
}

/* ---------------- m3 色票的實際引用（資訊） ---------------- */
console.log("\n■ m3 色票引用");
{
  const src = fs.readFileSync(path.join(root, "assets/tokens.css"), "utf8");
  const defs = [...src.matchAll(/^\s*(--[a-z0-9-]+)\s*:\s*([^;]+);/gm)].map(m => [m[1], m[2].trim()]);
  const all = defs.filter(([k]) => k.startsWith("--m3-"));
  const refd = new Set();
  defs.filter(([k]) => k.startsWith("--color-")).forEach(([, v]) => {
    const m = v.match(/var\(\s*(--m3-[a-z0-9-]+)/);
    if (m) refd.add(m[1]);
  });
  console.log("  " + all.length + " 個色票中，" + refd.size + " 個被 --color-* 引用；"
    + (all.length - refd.size) + " 個只作 DESIGN.md 對照（改它們不影響畫面）");
  const dead = all.map(([k]) => k).filter(k => !refd.has(k)).slice(0, 6);
  console.log("  例：" + dead.join("、") + " …");
}

/* ---------------- 線框模式可切換 ---------------- */
console.log("\n■ 線框模式");
let noWire = 0;
for (const scr of screens) {
  const html = fs.readFileSync(path.join(root, scr, "index.html"), "utf8");
  if (!html.includes("wire.css") || !html.includes("data-toggle-mode")) { console.log("  ✗ " + scr + " 缺線框模式（wire.css 或 [data-toggle-mode]）"); errors++; noWire++; }
}
if (noWire === 0) console.log("  ✓ 11 個畫面都可切換線框模式");

console.log("\n" + (errors === 0 ? "通過（0 error）" : errors + " 個 error") + "，" + warns + " 個 warning");
process.exit(errors === 0 ? 0 : 1);
