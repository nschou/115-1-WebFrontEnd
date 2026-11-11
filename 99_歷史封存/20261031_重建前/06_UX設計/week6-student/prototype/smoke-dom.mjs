#!/usr/bin/env node
/**
 * smoke-dom.mjs — 用假的 DOM 跑入口頁與走查台的腳本，確認它們真的會渲染
 * 用法：node smoke-dom.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

function makeDom() {
  const nodes = new Map();
  function node(id) {
    if (!nodes.has(id)) nodes.set(id, {
      id, innerHTML: "", textContent: "", hidden: false,
      dataset: {}, style: {}, onclick: null,
      setAttribute() {}, getAttribute() { return null; },
      addEventListener() {}, closest() { return null; },
      querySelector() { return null; }, querySelectorAll() { return []; }
    });
    return nodes.get(id);
  }
  const document = {
    getElementById: node,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener() {},
    createElement: () => node("__tmp" + Math.random()),
    body: node("__body"),
    documentElement: node("__html")
  };
  const storage = {
    _d: {},
    getItem(k) { return this._d[k] === undefined ? null : this._d[k]; },
    setItem(k, v) { this._d[k] = String(v); },
    removeItem(k) { delete this._d[k]; }
  };
  return { document, localStorage: storage, nodes };
}

function run(files, dom) {
  const ctx = {
    document: dom.document,
    localStorage: dom.localStorage,
    console,
    Date,
    Math,
    JSON,
    URLSearchParams,
    navigator: { clipboard: { writeText() {} } },
    location: { search: "", pathname: "/prototype/index.html" },
    setTimeout, clearTimeout
  };
  ctx.window = ctx;
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  for (const f of files) {
    vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f });
  }
  return ctx;
}

let bad = 0;
function check(name, cond, extra) {
  console.log((cond ? "  PASS  " : "  FAIL  ") + name + (extra ? "　" + extra : ""));
  if (!cond) bad++;
}

/* ---------- 入口頁 ---------- */
console.log("【入口頁 index.html】");
{
  const dom = makeDom();
  run(["assets/story-data.js", "assets/checks-report.js", "assets/checks-summary.js", "assets/theme.js",
       "assets/review-data.js",
       "assets/review-report.js", "assets/hub.js"], dom);
  const g = id => (dom.nodes.get(id) || { innerHTML: "", textContent: "" });
  const stats = g("stats").innerHTML;
  const stories = g("stories").innerHTML;
  const checks = g("checks").innerHTML;
  const two = g("twolayer").innerHTML;
  const cov = g("coverage").innerHTML;
  const err = g("boot-error");

  check("沒有載入錯誤", !err.textContent, err.textContent || "");
  check("統計列有數字", /\d+ \/ \d+/.test(stats) && stats.includes("AC 覆蓋"));
  check("故事卡有 10 條", (stories.match(/story-card/g) || []).length === 10);
  check("檢查表有 PASS", checks.includes("PASS"));
  check("兩層證據有規則層", two.includes("規則層") && two.includes("體驗層"));
  check("覆蓋矩陣有故事列", cov.includes("US-01"));
  const layers = g("layers").innerHTML;
  check("四層檢查有結果", layers.includes("業務層") && layers.includes("版面層"));
}

/* ---------- 走查台 ---------- */
console.log("\n【走查台 review.html】");
{
  const dom = makeDom();
  run(["assets/review-data.js", "assets/review-report.js", "assets/review.js"], dom);
  const list = (dom.nodes.get("list") || { innerHTML: "" }).innerHTML;
  const prog = (dom.nodes.get("progress") || { innerHTML: "" }).innerHTML;
  check("清單有 14 項", (list.match(/rv-item/g) || []).length === 14);
  check("進度列有分母", prog.includes("/14") || prog.includes("14"));
}

console.log("\n" + (bad === 0 ? "全部通過：兩個頁面的腳本都會正常渲染。" : bad + " 項失敗。"));
process.exit(bad === 0 ? 0 : 1);
