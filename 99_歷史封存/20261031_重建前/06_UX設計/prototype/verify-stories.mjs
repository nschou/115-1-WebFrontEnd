#!/usr/bin/env node
/**
 * verify-stories.mjs — 故事／AC 的靜態驗證
 * 用法：node verify-stories.mjs
 * ① 結構：data-action 都有定義、next／path／screen 目錄存在、AC 都寫在 stories 文件裡
 * ② 內容：對每個 check 取出對應 state 的 HTML 區塊，靜態判定 PASS／FAIL
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dataSrc = fs.readFileSync(path.join(root, "assets", "story-data.js"), "utf8");
new Function(dataSrc)();
const D = globalThis.STORY_DATA;

const dirs = fs.readdirSync(root).filter(d => fs.existsSync(path.join(root, d, "index.html")));
const has = d => dirs.indexOf(d) !== -1;

/* 取出某狀態的 section HTML */
function section(html, state) {
  const re = new RegExp('<section class="state state-' + state + '"[^>]*>([\\s\\S]*?)</section>');
  const m = html.match(re);
  return m ? m[1] : "";
}
const plain = h => h.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
const hasSel = (h, sel) => {
  const m = sel.match(/\[([a-z-]+)(?:="([^"]*)")?\]/);
  if (!m) return false;
  if (m[2] === undefined) return new RegExp("\\b" + m[1] + "\\b").test(h);
  return new RegExp(m[1] + '\\s*=\\s*"' + m[2] + '"').test(h);
};
function evalCheck(chk, html) {
  const txt = plain(html);
  if (chk.hasAll) return chk.hasAll.every(s => hasSel(html, s));
  if (chk.notHas) return chk.notHas.every(s => !hasSel(html, s));
  if (chk.containsText) return txt.indexOf(chk.containsText) !== -1;
  if (chk.notContainsText) return txt.indexOf(chk.notContainsText) === -1;
  if (chk.all) return chk.all.every(c => evalCheck(c, html));
  if (chk.orderAscText) {
    const re = new RegExp(chk.orderAscText, "g");
    const vals = (html.match(re) || []);
    for (let i = 1; i < vals.length; i++) if (vals[i] < vals[i - 1]) return false;
    return vals.length >= 2;
  }
  return false;
}

let fails = 0;
console.log("【結構檢查】");
for (const d of dirs) {
  const html = fs.readFileSync(path.join(root, d, "index.html"), "utf8");
  const used = [...html.matchAll(/data-action="([\w-]+)"/g)].map(m => m[1]);
  used.forEach(id => {
    const def = D.actions.find(a => a.id === id);
    if (!def) { console.log("  ✗ " + d + " 使用未定義動作 " + id); fails++; }
    else if (def.screen !== d) { console.log("  ✗ " + d + " 使用別頁動作 " + id); fails++; }
  });
}
for (const a of D.actions) {
  if (!has(a.screen)) { console.log("  ✗ 動作 " + a.id + " 的 screen 不存在"); fails++; }
  if (a.next && !has(a.next)) { console.log("  ✗ 動作 " + a.id + " 的 next 不存在：" + a.next); fails++; }
}
for (const s of D.stories) {
  s.path.forEach(p => { if (!has(p)) { console.log("  ✗ 故事 " + s.id + " 的路徑不存在：" + p); fails++; } });
}
for (const c of D.checks) {
  if (!has(c.screen)) { console.log("  ✗ 檢查 " + c.id + " 的 screen 不存在"); fails++; }
}
/* AC 是否真的寫在 stories 文件裡 */
const storiesMd = fs.readFileSync(path.join(root, "..", "13_STORIES_示範答案.md"), "utf8");
const acIds = new Set([...storiesMd.matchAll(/\|\s*(AC-\d+)\s*\|/g)].map(m => m[1]));
const referenced = new Set();
D.actions.forEach(a => a.ac.forEach(x => referenced.add(x)));
D.stories.forEach(s => s.ac.forEach(x => referenced.add(x)));
D.checks.forEach(c => referenced.add(c.id));
[...referenced].forEach(id => {
  if (!acIds.has(id)) { console.log("  ✗ 引用了不存在的 AC：" + id); fails++; }
});
const usedAll = new Set();
dirs.forEach(d => {
  const html = fs.readFileSync(path.join(root, d, "index.html"), "utf8");
  [...html.matchAll(/data-action="([\w-]+)"/g)].forEach(m => usedAll.add(m[1]));
});
D.actions.forEach(a => {
  if (!usedAll.has(a.id)) console.log("  ⚠ 動作 " + a.id + " 有定義但頁面沒有使用");
});
/* 可點元件說明：每個動作都要有一句話，且不得是空話 */
const notes = D.notes || {};
const banned = /\b系統\b|請稍後|稍後再試/;
D.actions.forEach(a => {
  const n = notes[a.id];
  if (!n) { console.log("  ✗ 動作 " + a.id + " 缺少「點下去會發生什麼」的說明"); fails++; return; }
  if (banned.test(n)) { console.log("  ✗ 動作 " + a.id + " 的說明含禁用詞：" + n); fails++; }
});
(D.external || []).forEach(id => {
  const a = D.actions.find(x => x.id === id);
  if (!a) { console.log("  ✗ external 指向不存在的動作 " + id); fails++; return; }
  if (!a.next) { console.log("  ✗ 外部動作 " + id + " 必須指定 next（成功後去哪）"); fails++; }
});
Object.keys(D.durations || {}).forEach(id => {
  const a = D.actions.find(x => x.id === id);
  if (!a || a.kind !== "mutate") { console.log("  ✗ durations 只能設在 mutate 動作：" + id); fails++; }
});


/* ================= 任務句與元素表（ADR-001） ================= */
const tasksSrc = fs.readFileSync(path.join(root, "assets", "tasks.js"), "utf8");
new Function(tasksSrc)();
const elementsSrc = fs.readFileSync(path.join(root, "assets", "elements.js"), "utf8");
new Function(elementsSrc)();
const T = globalThis.TASKS || [];
const E = globalThis.ELEMENTS || [];

const UI_WORDS = /(頁面|頁|畫面|按鈕|按下|點選|點擊|輸入框|下拉|選單|彈窗|跳轉|滑動|勾選|掃碼|導覽)/;

console.log("【任務句（七格）】");
const T_FIELDS = ["preState", "actor", "verb", "object", "transition", "recipient", "decision"];
let taskBad = 0;
T.forEach(x => {
  T_FIELDS.forEach(f => {
    if (!x[f]) { console.log("  ✗ " + x.id + " 缺「" + f + "」"); taskBad++; }
  });
  const all = T_FIELDS.map(f => x[f] || "").join(" ");
  const m = all.match(UI_WORDS);
  if (m) { console.log("  ✗ " + x.id + " 含介面詞「" + m[0] + "」，請改成業務語言"); taskBad++; }
  if (x.object && !/^OBJ-\d+/.test(x.object)) { console.log("  ✗ " + x.id + " 的物件沒有指向 OBJ-xx"); taskBad++; }
});
console.log(taskBad === 0 ? "  ✓ " + T.length + " 條任務句全部合格" : "  ✗ 任務句問題 " + taskBad + " 個");
fails += taskBad;

console.log("\n【資訊元素表】");
let elBad = 0;
const E_FIELDS = ["name", "purpose", "source", "kind"];
const taskIds = new Set(T.map(x => x.id));
const actIds = new Set(D.actions.map(a => a.id));
E.forEach(x => {
  E_FIELDS.forEach(f => { if (!x[f]) { console.log("  ✗ " + x.id + " 缺「" + f + "」"); elBad++; } });
  if (["display", "input", "act"].indexOf(x.kind) === -1) { console.log("  ✗ " + x.id + " kind 不合法：" + x.kind); elBad++; }
  if (x.kind === "act" && x.recovery === true) {
    /* 復原動作（重試／返回／清除）不屬業務任務，但仍要有動作 */
    if (!x.action) { console.log("  ✗ " + x.id + " 是復原元素但沒有對應動作"); elBad++; }
  } else if (x.kind === "act") {
    if (!x.task) { console.log("  ✗ " + x.id + " 是操作元素但沒有回指任務句"); elBad++; }
    else if (!taskIds.has(x.task)) { console.log("  ✗ " + x.id + " 指向不存在的任務 " + x.task); elBad++; }
    if (!x.action) { console.log("  ✗ " + x.id + " 是操作元素但沒有對應動作"); elBad++; }
    else if (!actIds.has(x.action)) { console.log("  ✗ " + x.id + " 對應不存在的動作 " + x.action); elBad++; }
  }
  if (!x.rationale) { console.log("  ⚠ " + x.id + " 沒有「型態依據」"); }
});
/* 每頁 ≤ 7 個元素 */
const perScreen = {};
E.forEach(x => { if (x.scope !== "global") perScreen[x.screen] = (perScreen[x.screen] || 0) + 1; });
Object.keys(perScreen).forEach(s => {
  if (perScreen[s] > 7) { console.log("  ✗ " + s + " 有 " + perScreen[s] + " 個元素（上限 7）"); elBad++; }
});
/* 每個 data-action 都要有對應的 act 元素 */
const actCovered = new Set(E.filter(x => x.action).map(x => x.action));
D.actions.forEach(a => {
  if (!actCovered.has(a.id)) { console.log("  ✗ 動作 " + a.id + " 沒有任何資訊元素對應它（按鈕沒有出處）"); elBad++; }
});
console.log(elBad === 0 ? "  ✓ " + E.length + " 個元素全部合格，且動作全部有出處" : "  ✗ 元素問題 " + elBad + " 個");
fails += elBad;


/* ---- 操作元素的後果（是「邊」，不是「節點」） ---- */
console.log("\n【操作元素的後果】");
const SE = globalThis.SCREEN_ENTRY || {};
let edgeBad = 0;
const OUT_FIELDS = ["stateChange", "to", "feedback", "failTo"];
E.filter(x => x.kind === "act").forEach(x => {
  OUT_FIELDS.forEach(f => {
    if (!x[f]) { console.log("  ✗ " + x.id + "（" + x.name + "）缺「" + f + "」"); edgeBad++; }
  });
  const a = D.actions.find(y => y.id === x.action);
  if (a && a.next && x.to && x.to.indexOf(a.next) === -1) {
    console.log("  ✗ " + x.id + " 的去處與動作 " + a.id + " 的 next(" + a.next + ") 不一致");
    edgeBad++;
  }
});
/* 入口邊：每個線框都要有一條進來的邊，否則要標 SCREEN_ENTRY */
const incoming = {};
E.filter(x => x.kind === "act" && x.to).forEach(x => {
  const m = String(x.to).match(/scr-\d+-[a-z-]+/g) || [];
  m.forEach(s => { incoming[s] = (incoming[s] || 0) + 1; });
});
const screensAll = [...new Set(E.map(x => x.screen))];
screensAll.forEach(s => {
  if (!incoming[s] && !SE[s]) { console.log("  ✗ " + s + " 沒有入口邊（孤兒線框）"); edgeBad++; }
});
console.log(edgeBad === 0 ? "  ✓ " + E.filter(x=>x.kind==="act").length + " 個操作元素都有後果，且每個線框都有入口" : "  ✗ 邊的問題 " + edgeBad + " 個");
fails += edgeBad;


/* ---- 舊名稱殘留（SCR / scr- / display-NN） ---- */
console.log("\n【命名一致性】");
let nameBad = 0;
const scanFiles = [];
const walkProto = (d) => {
  for (const n of fs.readdirSync(d)) {
    const q = path.join(d, n);
    if (fs.statSync(q).isDirectory()) { walkProto(q); continue; }
    if (/\.(js|mjs|html|css|md)$/.test(n) && n !== "verify-stories.mjs" && n !== "checks-report.js") scanFiles.push(q);
  }
};
walkProto(root);
scanFiles.forEach(q => {
  const s = fs.readFileSync(q, "utf8");
  const hits = s.match(/wire-\d|\bWIRE\b/g);
  if (hits) { console.log("  ✗ " + path.relative(root, q) + " 仍有舊名稱：" + [...new Set(hits)].join(", ")); nameBad++; }
});
console.log(nameBad === 0 ? "  ✓ 程式與頁面已無舊名稱（WIRE／wire-）" : "  ✗ 命名殘留 " + nameBad + " 個檔案");
fails += nameBad;

/* 文件漂移：13_STORIES 的故事表必須與 story-data 一致 */
const mdDoc = fs.readFileSync(path.join(root, "..", "13_STORIES_示範答案.md"), "utf8");
const usBlock = (mdDoc.match(/<!-- AUTO:US-BEGIN -->([\s\S]*?)<!-- AUTO:US-END -->/) || [])[1] || "";
const usRows = usBlock.split("\n").filter(l => /^\| US-\d+/.test(l.trim()));
if (!usBlock) { console.log("  ✗ 13_STORIES 缺少 AUTO:US 區塊（請執行 node gen-stories.mjs）"); fails++; }
if (usRows.length !== D.stories.length) {
  console.log("  ✗ 文件漂移：故事表 " + usRows.length + " 列，資料有 " + D.stories.length + " 條（請執行 node gen-stories.mjs）");
  fails++;
}
D.stories.forEach(s => {
  const row = usRows.find(r => r.indexOf("| " + s.id + " |") === 0 || r.indexOf("| " + s.id + " ") === 0);
  if (!row) { console.log("  ✗ 文件漂移：故事表缺少 " + s.id); fails++; return; }
  const scrPath = s.path.map(x => x.replace("wire-", "SCR-").replace(/^(SCR-\d+)-.*$/, "$1")).join(" → ");
  if (row.indexOf(scrPath) === -1) {
    console.log("  ✗ 文件漂移：" + s.id + " 的路徑應為「" + scrPath + "」（請執行 node gen-stories.mjs）");
    fails++;
  }
  const acs = [...new Set([...(s.ac || []), ...(s.guard || [])])];
  acs.forEach(a => {
    if (row.indexOf(a) === -1) { console.log("  ✗ 文件漂移：" + s.id + " 缺少 " + a); fails++; }
  });
});
console.log(fails === 0 ? "  ✓ 結構全部通過（含文件一致性）" : "  ✗ 結構問題 " + fails + " 個");

console.log("\n【內容檢查（靜態掃 HTML）】");
let pass = 0, total = 0;
for (const c of D.checks) {
  total++;
  const html = fs.readFileSync(path.join(root, c.screen, "index.html"), "utf8");
  const sec = section(html, c.state);
  if (!sec) { console.log("  ✗ " + c.id + " 找不到狀態 " + c.state); fails++; continue; }
  const ok = evalCheck(c.check, sec);
  console.log("  " + (ok ? "PASS" : "FAIL") + "  " + c.id + "  " + c.desc);
  if (ok) pass++; else fails++;
}
console.log("\n結果：" + pass + "/" + total + " 通過，" + fails + " 個問題");

/* 輸出給入口頁讀取 */
const report = {
  generatedAt: new Date().toISOString(),
  total: total,
  passed: pass,
  fails: fails,
  checks: D.checks.map(c => {
    const html = fs.readFileSync(path.join(root, c.screen, "index.html"), "utf8");
    const sec = section(html, c.state);
    return { id: c.id, screen: c.screen, state: c.state, desc: c.desc, ok: sec ? evalCheck(c.check, sec) : false };
  })
};
fs.writeFileSync(path.join(root, "assets", "checks-report.js"),
  "/* 由 verify-stories.mjs 自動產生，不要手改 */\nglobalThis.CHECKS_REPORT = " + JSON.stringify(report, null, 2) + ";\n", "utf8");
process.exit(fails === 0 ? 0 : 1);
