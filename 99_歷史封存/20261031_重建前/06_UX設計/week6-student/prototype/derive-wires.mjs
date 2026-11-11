#!/usr/bin/env node
/**
 * derive-wires.mjs — 線框推展（從任務句與資訊元素重新推出線框）
 * 用法：node derive-wires.mjs
 * 產出：../21_WIRE推展表.md
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
new Function(fs.readFileSync(path.join(root, "assets", "tasks.js"), "utf8"))();
new Function(fs.readFileSync(path.join(root, "assets", "elements.js"), "utf8"))();
const T = globalThis.TASKS || [];
const E = globalThis.ELEMENTS || [];
const SE = globalThis.SCREEN_ENTRY || {};

const END = {
  "scr-01-home":"顧客", "scr-02-menu":"顧客", "scr-03-checkout":"顧客",
  "scr-04-payment":"顧客", "scr-05-order-status":"顧客", "scr-09-locker":"顧客",
  "scr-06-staff-orders":"店員", "scr-07-kds":"廚房", "scr-08-pickup-board":"設施",
  "scr-10-menu-admin":"老闆", "scr-11-report":"老闆"
};

const screens = [...new Set(E.map(e => e.screen))].sort();
const kindZh = k => k === "display" ? "顯示" : k === "input" ? "輸入" : "操作";

const L = [];
L.push("# 21 線框推展表（由 derive-wires.mjs 產生）", "");
L.push("> 從「任務句 ＋ 資訊元素」重新推出線框。這不是描述現況，是**驗證現況**。", "");
L.push("---", "", "## 一、推展結果總覽", "");
L.push("| 線框 | 端 | 元素數 | 入口 | 出邊 | 關聯任務 |");
L.push("|---|---|---|---|---|---|");

let issues = 0;
const note = [];
const edgesOut = {};
const edgesIn = {};
E.filter(e => e.kind === "act" && e.to).forEach(e => {
  edgesOut[e.screen] = edgesOut[e.screen] || [];
  const m = String(e.to).match(/scr-\d+-[a-z-]+/g) || [];
  m.forEach(t => { edgesOut[e.screen].push(t); edgesIn[t] = (edgesIn[t] || 0) + 1; });
});

screens.forEach(s => {
  const els = E.filter(e => e.screen === s && e.scope !== "global");
  const acts = els.filter(e => e.kind === "act");
  const tasks = [...new Set(acts.map(a => a.task).filter(Boolean))];
  const out = [...new Set(edgesOut[s] || [])];
  const entry = edgesIn[s] ? "介面入口（" + edgesIn[s] + " 條）" : (SE[s] ? SE[s].reason : "**無入口**");
  L.push("| " + s + " | " + (END[s] || "?") + " | " + els.length + " | " + entry + " | " +
    (out.length ? out.join("、") : "—") + " | " + (tasks.length ? tasks.join("、") : "—") + " |");

  if (els.length > 7) { note.push("✗ " + s + " 元素 " + els.length + " 個（上限 7）"); issues++; }
  if (!els.some(e => e.kind === "display")) { note.push("✗ " + s + " 沒有顯示元素（空線框）"); issues++; }
  if (acts.length && !tasks.length) { note.push("✗ " + s + " 有操作元素但沒有任務"); issues++; }
  if (!edgesIn[s] && !SE[s]) { note.push("✗ " + s + " 沒有入口"); issues++; }
});

/* 重複元素：同資料來源、同名稱，出現在不同線框 */
L.push("", "## 二、重複元素（同一件事被定義兩次）", "");
L.push("| 元素 | 資料來源 | 出現於 | 建議 |");
L.push("|---|---|---|---|");
const key = e => e.source + "|" + e.name;
const seen = {};
E.forEach(e => { (seen[key(e)] = seen[key(e)] || []).push(e); });
let dup = 0;
Object.keys(seen).forEach(k => {
  const arr = seen[k];
  if (arr.length > 1) {
    dup++;
    const [src, nm] = k.split("|");
    L.push("| " + nm + " | " + src + " | " + arr.map(a => a.id + "@" + a.screen).join("、") + " | 合併為一個元素、兩個歸屬 |");
  }
});
if (dup === 0) L.push("| — | — | — | 無重複 |");

/* 每個線框的元素群 */
L.push("", "## 三、各線框的元素群", "");
screens.forEach(s => {
  const els = E.filter(e => e.screen === s);
  L.push("### " + s + "（" + (END[s] || "?") + "，容器：頁面）", "");
  L.push("| 類型 | 元素 | 用途 | 狀態改變 | 去處 | 失敗去處 |");
  L.push("|---|---|---|---|---|---|");
  ["display", "input", "act"].forEach(k => {
    els.filter(e => e.kind === k).forEach(e => {
      L.push("| " + kindZh(k) + " | " + e.name + " | " + e.purpose + " | " +
        (e.stateChange || "—") + " | " + (e.to || "—") + " | " + (e.failTo || "—") + " |");
    });
  });
  L.push("");
});

L.push("## 四、推展檢查", "");
if (note.length === 0) L.push("全部通過。");
else note.forEach(n => L.push("- " + n));
L.push("", "**重複元素**：" + dup + " 組");

fs.writeFileSync(path.join(root, "..", "21_WIRE推展表.md"), L.join("\n"), "utf8");

console.log("線框數:", screens.length, "｜元素:", E.length, "｜重複元素:", dup, "｜問題:", issues);
if (note.length) note.forEach(n => console.log("  " + n));
console.log("已產生 21_WIRE推展表.md");
