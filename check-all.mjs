#!/usr/bin/env node
/**
 * check-all.mjs — 交件前跑這個
 *
 * 一次跑完五個檢查，最後給一張表：哪一項紅、哪一項綠。
 *
 * 用法：
 *   node check-all.mjs                # 全部跑
 *   node check-all.mjs --quiet        # 只顯示結果表
 *   node check-all.mjs --list         # 看有哪些檢查
 *   node check-all.mjs --only=objects,spec   # 只跑指定項目
 *   node check-all.mjs --json         # 輸出 JSON（給 CI 用）
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (name) => args.includes("--" + name);
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1];
const onlySet = only ? new Set(only.split(",").map((s) => s.trim())) : null;
const quiet = flag("quiet");
const asJson = flag("json");

const CHECKS = [
  {
    name: "prototype",
    title: "原型四層",
    desc: "業務／資訊／版面／實作 ＋ 負向測試",
    script: "check-all.mjs",
    cwd: path.join(ROOT, "06_W06_UX", "16_wireframes", "prototype"),
  },
  {
    name: "wording",
    title: "用語",
    desc: "數字要有主詞、不用隱喻、術語要展開",
    script: "check-wording.mjs",
    cwd: ROOT,
    args: ["--strict"],
  },
  {
    name: "objects",
    title: "物件對接",
    desc: "每個物件有基數／身分／關係，且有落點",
    script: "check-objects.mjs",
    cwd: ROOT,
  },
  {
    name: "rebuild",
    title: "教材結構",
    desc: "18 份主線、每週資料夾、D1–D6、被否決候選",
    script: "check-rebuild.mjs",
    cwd: ROOT,
  },
  {
    name: "site",
    title: "教學網站",
    desc: "閱讀器管線、離線資源、站內連結",
    script: "check-site.mjs",
    cwd: ROOT,
  },
  {
    name: "spec",
    title: "總規格",
    desc: "技術名 0、需求有來源／依據／驗收、十章齊全",
    script: path.join("07_W07_Spec", "18_spec", "check-spec.mjs"),
    cwd: ROOT,
  },
];

if (flag("list")) {
  console.log("可用的檢查：");
  for (const c of CHECKS) console.log("  " + c.name.padEnd(10) + c.title.padEnd(10) + c.desc);
  process.exit(0);
}

const selected = CHECKS.filter((c) => !onlySet || onlySet.has(c.name));
if (!selected.length) {
  console.error("沒有符合的檢查項目；用 --list 看清單");
  process.exit(2);
}

const results = [];
const t0 = Date.now();

for (const c of selected) {
  const abs = path.isAbsolute(c.script) ? c.script : path.join(c.cwd, c.script);
  if (!fs.existsSync(abs)) {
    results.push({ ...c, ok: false, ms: 0, note: "找不到 " + c.script });
    if (!quiet && !asJson) console.log("\n✗ " + c.title + "：找不到 " + c.script);
    continue;
  }
  if (!quiet && !asJson) {
    console.log("\n" + "─".repeat(56));
    console.log("▶ " + c.title + "（" + c.name + "）");
    console.log("─".repeat(56));
  }
  const started = Date.now();
  let status = null;
  let captured = "";
  if (quiet || asJson) {
    // 沙箱與部分環境不能開管線擷取子程序輸出，改用工作區暫存檔
    const logPath = path.join(ROOT, ".check-all." + process.pid + ".log");
    const fd = fs.openSync(logPath, "w");
    const r = spawnSync(process.execPath, [abs, ...(c.args || [])], { cwd: c.cwd, stdio: ["ignore", fd, fd], encoding: "utf8", env: process.env });
    fs.closeSync(fd);
    status = r.error ? -1 : r.status;
    try { captured = fs.readFileSync(logPath, "utf8"); } catch { captured = ""; }
    try { fs.unlinkSync(logPath); } catch {}
  } else {
    const r = spawnSync(process.execPath, [abs, ...(c.args || [])], { cwd: c.cwd, stdio: "inherit", env: process.env });
    status = r.error ? -1 : r.status;
  }
  const ms = Date.now() - started;
  const ok = status === 0;
  results.push({ ...c, ok, ms, note: ok ? "" : "exit " + status });
  if ((quiet || asJson) && !ok && !asJson) {
    const out = captured.split("\n").filter((l) => /✗|問題|FAIL|error/i.test(l)).slice(0, 4);
    if (out.length) console.log("\n✗ " + c.title + "：\n  " + out.join("\n  "));
  }
}

const total = Date.now() - t0;
const failed = results.filter((r) => !r.ok);

if (asJson) {
  console.log(JSON.stringify({
    ok: failed.length === 0,
    totalMs: total,
    checks: results.map((r) => ({ name: r.name, ok: r.ok, ms: r.ms, note: r.note })),
  }, null, 2));
} else {
  const w = Math.max(...results.map((r) => r.title.length)) ;
  console.log("\n" + "=".repeat(56));
  console.log("交件前檢查結果");
  console.log("=".repeat(56));
  for (const r of results) {
    console.log("  " + (r.ok ? "✓" : "✗") + " " + r.title.padEnd(w) + String(r.ms).padStart(6) + " ms" + (r.note ? "  " + r.note : ""));
  }
  console.log("-".repeat(56));
  console.log("  " + results.length + " 項｜通過 " + (results.length - failed.length) + "｜失敗 " + failed.length + "｜共 " + (total / 1000).toFixed(1) + " 秒");
  if (failed.length) {
    console.log("\n先修紅的項目，再交件。");
    console.log("  " + failed.map((f) => f.name).join("、"));
  } else {
    console.log("\n全部通過，可以交件。");
  }
}

process.exit(failed.length ? 1 : 0);
