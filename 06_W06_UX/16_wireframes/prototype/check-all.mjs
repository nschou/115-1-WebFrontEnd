#!/usr/bin/env node
/**
 * check-all.mjs — 一支指令跑完四層檢查
 * 用法：node check-all.mjs
 * 產出：assets/checks-summary.js（給入口頁讀）
 * 註：使用 stdio:"inherit"，各檢查的輸出會直接印在終端機。
 */
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

const LAYERS = [
  { key:"business", name:"業務層：任務句與 AC",          scripts:["verify-stories.mjs"] },
  { key:"info",     name:"資訊層：元素與線框推展",        scripts:["derive-wires.mjs"] },
  { key:"layout",   name:"版面層：決策順序",              scripts:["check-layout-order.mjs"] },
  { key:"impl",     name:"實作層：版面規範與頁面渲染",    scripts:["lint-tokens.mjs", "smoke-dom.mjs"] },
  { key:"guard",    name:"負向測試：檢查會不會紅",        scripts:["selftest-stories.mjs"] }
];

const results = [];
let allOk = true;

console.log("================ 四層檢查 ================");
for (const L of LAYERS) {
  console.log("\n─── " + L.name + " ───");
  let ok = true;
  const details = [];
  for (const s of L.scripts) {
    const r = spawnSync(process.execPath, [s], { cwd: root, stdio: "inherit" });
    const pass = r.status === 0;
    if (!pass) ok = false;
    details.push({ script: s, ok: pass });
  }
  if (!ok) allOk = false;
  results.push({ key: L.key, name: L.name, ok, details });
  console.log((ok ? "✓ " : "✗ ") + L.name + " → " + (ok ? "通過" : "未通過"));
}
console.log("\n==========================================");
console.log(allOk ? "四層全部通過" : "有層級未通過（看上面 ✗）");

fs.writeFileSync(path.join(root, "assets", "checks-summary.js"),
  "/* 由 check-all.mjs 產生，不要手改 */\nglobalThis.CHECK_SUMMARY = " +
  JSON.stringify({ generatedAt: new Date().toISOString(), allOk, layers: results }, null, 2) + ";\n", "utf8");

process.exit(allOk ? 0 : 1);
