#!/usr/bin/env node
/**
 * check-site.mjs — 教學網站健檢
 * ① reader.html 的渲染管線（用假 DOM 跑 guide-data.js + reader.js）
 * ② 站內連結是否都指向存在的檔案
 * 用法：node check-site.mjs
 */
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const site = path.join(root, "00_CourseSite");
const fail = [];
const ok = (m) => console.log("  ✓ " + m);
const bad = (m) => { console.log("  ✗ " + m); fail.push(m); };

/* ---------- ① reader 渲染管線 ---------- */
const QUERY = "?file=..%2F00_%E8%AA%B2%E7%A8%8B%E4%B8%AD%E9%96%93%E5%9B%9E%E9%A1%A7%E8%88%87%E6%80%9D%E8%80%83%E6%A1%86%E6%9E%B6.md";
const QUERY_D1 = "?file=..%2F98_%E7%A4%BA%E7%AF%84%E6%A1%88%E4%BE%8B%2F%E9%9B%B2%E7%AB%AF%E6%97%A9%E9%A4%90%E5%BA%97%2FD_%E4%BA%A4%E4%BB%98%E7%89%A9%2FD1_%E6%B1%BA%E7%AD%96%E6%9B%B8.md";

async function runReader(withCDN, query = QUERY) {
  const made = {};
  const el = (id) => made[id] || (made[id] = { id, innerHTML: "", textContent: "", href: "#",
    classList: { toggle() {}, add() {}, remove() {} }, addEventListener() {}, setAttribute() {},
    getAttribute() { return null; }, querySelectorAll() { return []; }, querySelector() { return null; },
    appendChild(c) { this._kids = (this._kids || []); this._kids.push(c); this.innerHTML += (c.innerHTML || c.textContent || ""); },
    append() {}, removeChild() {}, replaceChildren() {}, remove() {} });
  const ctx = {
    document: { getElementById: el, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, createElement: () => el("t" + Math.random()) },
    console, setTimeout, clearTimeout, URL, URLSearchParams, Set, Object, String, Array, Math, JSON,
    location: { protocol: "http:", href: "http://127.0.0.1/00_CourseSite/reader.html" + query, search: query, origin: "http://127.0.0.1" },
    navigator: { clipboard: { writeText: async () => {} } },
    fetch: async () => ({ ok: true, status: 200, text: async () => "# 標題\n\n內文" })
  };
  if (withCDN) {
    ctx.marked = { Renderer: function () { this.code = () => ""; }, parse: () => "<h1>OK 標題</h1>" };
    ctx.DOMPurify = { sanitize: (h) => h };
    ctx.mermaid = { initialize() {}, run: async () => {} };
  }
  ctx.window = ctx; ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(site, "assets", "guide-data.js"), "utf8"), ctx, { filename: "guide-data.js" });
  vm.runInContext(fs.readFileSync(path.join(site, "assets", "reader.js"), "utf8"), ctx, { filename: "reader.js" });
  await new Promise((r) => setTimeout(r, 60));
  return { made, ctx };
}

console.log("【閱讀器】");
{
  const { made } = await runReader(true);
  const body = made["document"] ? made["document"].innerHTML : "";
  const st = made["reader-status"] ? made["reader-status"].textContent : "";
  if (body.includes("OK 標題") && st.includes("已渲染")) ok("連線時：Markdown 正常渲染");
  else bad("連線時渲染失敗（status=" + st + "）");
}
{
  const { made } = await runReader(false);
  const body = made["document"] ? made["document"].innerHTML : "";
  const st = made["reader-status"] ? made["reader-status"].textContent : "";
  if (body.length > 0 && st.includes("離線")) ok("離線時：降級為原始文字，不整頁失敗");
  else bad("離線降級失敗（status=" + st + "）");
}

{
  const { made } = await runReader(true, QUERY_D1);
  const body = made["document"] ? made["document"].innerHTML : "";
  if (body.includes("OK")) ok("不在 guide-data 名單的檔案（D_交付物）也能開");
  else bad("D_交付物 這類新檔案打不開（白名單沒放寬）");
}

console.log("\n【離線資源】");
{
  const vendor = path.join(site, "assets", "vendor");
  const need = ["marked.min.js", "purify.min.js", "mermaid.min.js"];
  const missing = need.filter(f => !fs.existsSync(path.join(vendor, f)));
  if (missing.length) bad("缺本地 vendor：" + missing.join("、"));
  else {
    const sizes = need.map(f => f + " " + Math.round(fs.statSync(path.join(vendor, f)).size / 1024) + "KB");
    ok("三個套件都在本地（" + sizes.join("、") + "）");
  }
  const html = fs.readFileSync(path.join(site, "reader.html"), "utf8");
  if (html.includes("assets/vendor/marked.min.js") && html.includes("assets/vendor/mermaid.min.js")) ok("reader.html 以本地檔案為主");
  else bad("reader.html 未引用本地 vendor");
  if (html.includes("cdn.jsdelivr.net")) ok("保留 CDN 作為回退");
}

/* ---------- ⑤ 教材索引（data → html） ---------- */
console.log("\n【教材索引】");
{
  const dataUrl = pathToFileURL(path.join(site, "assets", "materials-data.mjs")).href;
  const { MATERIALS } = await import(dataUrl);
  const page = fs.readFileSync(path.join(site, "materials.html"), "utf8");
  const broken = MATERIALS.filter((m) => !fs.existsSync(path.join(site, decodeURIComponent(m.href))));
  if (broken.length) broken.forEach((m) => bad("索引指向不存在的檔案：" + m.href));
  else ok("索引 " + MATERIALS.length + " 筆，目標檔都存在");
  const stale = MATERIALS.filter((m) => !page.includes(encodeURIComponent(m.href)) && !page.includes(m.href));
  if (stale.length) bad("materials.html 未同步（請跑 node gen-materials.mjs）：" + stale.slice(0, 3).map((m) => m.title).join("、"));
  else ok("materials.html 與資料檔同步");
}

/* ---------- ⑤b 階段課堂連結 ---------- */
console.log("\n【階段課堂連結】");
{
  const gd = fs.readFileSync(path.join(site, "assets", "guide-data.js"), "utf8");
  const win = {};
  new Function("window", gd)(win);
  const qd = fs.readFileSync(path.join(site, "assets", "quiz-data.js"), "utf8");
  const win2 = {};
  new Function("window", qd)(win2);
  const setIds = new Set((win2.QUIZ_DATA.sets || []).map((s) => s.id));
  const sess = win.GUIDE_SESSION || {};
  const problems = [];
  Object.keys(sess).forEach((id) => {
    const c = sess[id];
    [c.pre, c.post].filter(Boolean).forEach((u) => {
      const m = /^quiz\.html\?set=([^&]+)/.exec(u);
      if (!m) problems.push(id + " 測驗連結格式錯：" + u);
      else if (!setIds.has(m[1])) problems.push(id + " 測驗不存在：" + m[1]);
    });
    (c.links || []).forEach((l) => {
      if (!fs.existsSync(path.join(site, decodeURIComponent(l.href.split("?")[0])))) problems.push(id + " 連結失效：" + l.href);
    });
    if (c.homework && !fs.existsSync(path.join(site, decodeURIComponent(c.homework)))) problems.push(id + " 作業單失效：" + c.homework);
  });
  if (problems.length) problems.forEach((x) => bad(x));
  else ok("階段課堂連結 " + Object.keys(sess).length + " 個階段全部有效");
}

/* ---------- ② 站內連結 ---------- */
console.log("\n【站內連結】");
for (const page of ["index.html", "reader.html", "deliverables.html", "flow.html", "materials.html", "case.html", "tech.html", "quiz.html", "weeks.html"]) {
  const p = path.join(site, page);
  if (!fs.existsSync(p)) { bad("缺頁面：" + page); continue; }
  const html = fs.readFileSync(p, "utf8");
  const links = [...html.matchAll(/href="([^"#][^"]*)"/g)].map(m => m[1]).filter(h => !/^(https?:|mailto:|javascript:)/i.test(h));
  const readerTargets = links.filter(h => /^reader\.html\?file=/.test(h))
    .map(h => decodeURIComponent(h.split("file=")[1] || ""));
  const brokenTargets = readerTargets.filter(f => !fs.existsSync(path.join(site, decodeURIComponent(f))));
  if (brokenTargets.length) bad(page + " 的閱讀器連結指向不存在的檔案：" + brokenTargets.slice(0, 3).join("、"));
  const broken = links.filter(h => {
    const noHash = h.split("#")[0];
    if (!noHash || noHash.startsWith("?")) return false;
    const clean = decodeURIComponent(noHash.split("?")[0]);
    return !fs.existsSync(path.join(site, clean));
  });
  if (broken.length) { bad(page + " 有 " + broken.length + " 個斷鏈：" + broken.slice(0, 3).join("、")); }
  else ok(page + "：" + links.length + " 個連結全部有效" + (readerTargets.length ? "（含 " + readerTargets.length + " 個閱讀器連結）" : ""));
}

console.log("\n" + (fail.length ? fail.length + " 個問題" : "網站健檢：全部通過"));
process.exit(fail.length ? 1 : 0);
