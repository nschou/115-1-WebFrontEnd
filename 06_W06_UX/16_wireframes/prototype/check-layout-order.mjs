#!/usr/bin/env node
/**
 * check-layout-order.mjs — 版面順序對照
 * 檢查：元素在畫面出現的順序，是否等於宣告的決策順序
 * 定位：優先 data-element="E-xx"，其次畫面文字
 * 產出：../22_版面順序對照.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
new Function(fs.readFileSync(path.join(root, "assets", "elements.js"), "utf8"))();
const E = globalThis.ELEMENTS || [];

const MATCH = { "E-21":"#1042", "E-24":"A-03", "E-25":"A-03", "E-53":"NT$100" };
const plain = h => h.replace(/<[^>]+>/g, "\n").replace(/&nbsp;/g, " ");

function rawSection(html, state) {
  const m = html.match(new RegExp('<section class="state state-' + state + '"[^>]*>([\\s\\S]*?)</section>'));
  return m ? m[1] : "";
}

const screens = [...new Set(E.map(e => e.screen))].sort();
const L = [];
L.push("# 22 版面順序對照（由 check-layout-order.mjs 產生）", "");
L.push("> 檢查「元素在畫面上出現的順序」是否等於「宣告的決策順序」。", "");
L.push("> 定位方式：優先 «BT»data-element=\"E-xx\"«BT»，其次畫面文字。".replaceAll("«BT»", String.fromCharCode(96)), "");
L.push("---", "");

let issues = 0, undetected = 0;
const problems = [], misses = [];

for (const s of screens) {
  const html = fs.readFileSync(path.join(root, s, "index.html"), "utf8");
  const els = E.filter(e => e.screen === s && e.order);
  const byState = {};
  els.forEach(e => { (byState[e.state] = byState[e.state] || []).push(e); });

  L.push("## " + s, "");
  L.push("| 元素 | 決策順序 | 狀態 | 畫面位置 | 結果 |");
  L.push("|---|---|---|---|---|");

  Object.keys(byState).forEach(st => {
    const arr = byState[st].sort((a, b) => a.order - b.order);
    const sec = rawSection(html, st);
    const secTxt = plain(sec);
    let last = -1;
    arr.forEach(e => {
      if (e.skipOrderCheck) {
        L.push("| " + e.name + " | " + e.order + " | " + st + " | 標題列 | 不列入順序檢查 |");
        return;
      }
      let pos = sec.indexOf('data-element="' + e.id + '"');
      if (pos < 0) {
        const key = e.shownAs || MATCH[e.id] || e.name;
        pos = sec.indexOf(key);            /* 兩者都用原始 HTML 索引 */
      }
      let res;
      if (pos < 0) {
        res = "未偵測（標題列／純視覺）"; undetected++; misses.push(s + "／" + e.name);
      } else if (pos < last) {
        res = "✗ 順序相反"; issues++; problems.push(s + "／" + e.name + "（" + st + "）");
      } else {
        res = "✓"; last = pos;
      }
      L.push("| " + e.name + " | " + e.order + " | " + st + " | " + (pos < 0 ? "—" : pos) + " | " + res + " |");
    });
  });
  L.push("");
}

L.push("## 結果", "");
L.push("| 項目 | 數量 |", "|---|---|");
L.push("| 順序相反 | " + issues + " |");
L.push("| 未偵測 | " + undetected + " |");
L.push("");
if (problems.length) { L.push("**順序相反**："); problems.forEach(p => L.push("- " + p)); L.push(""); }
if (misses.length) { L.push("**未偵測**（需人工確認或補錨點）："); misses.forEach(m => L.push("- " + m)); }

fs.writeFileSync(path.join(root, "..", "22_版面順序對照.md"), L.join("\n"), "utf8");
console.log("線框:", screens.length, "｜順序相反:", issues, "｜未偵測:", undetected);
problems.forEach(p => console.log("  ✗ " + p));
misses.forEach(m => console.log("  ? " + m));
console.log("已產生 22_版面順序對照.md");
