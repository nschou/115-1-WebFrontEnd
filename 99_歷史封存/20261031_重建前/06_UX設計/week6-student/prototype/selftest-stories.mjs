#!/usr/bin/env node
/**
 * selftest-stories.mjs — 負向測試：故意做錯，確認檢查會 FAIL
 * 如果「做錯也 PASS」，那套檢查就是空的。
 * 用法：node selftest-stories.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
new Function(fs.readFileSync(path.join(root, "assets", "story-data.js"), "utf8"))();
const D = globalThis.STORY_DATA;
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
    const vals = html.match(re) || [];
    for (let i = 1; i < vals.length; i++) if (vals[i] < vals[i - 1]) return false;
    return vals.length >= 2;
  }
  return false;
}

/* 三個故意的錯誤 */
const cases = [
  { name: "製作中就偷顯示號碼（違反 AC-11）",
    ac: "AC-11", screen: "scr-05-order-status",
    mutate: h => h.replace('class="state state-default"', 'class="state state-default"') + '<span data-pickup-no>A-03</span>',
    expect: false },
  { name: "KDS 完成態誤寫「可取餐」（違反 AC-22）",
    ac: "AC-22", screen: "scr-07-kds",
    mutate: h => h.replace("待店員確認", "可取餐"),
    expect: false },
  { name: "去掉錯誤態的看板提示（違反 AC-14）",
    ac: "AC-14", screen: "scr-05-order-status",
    mutate: h => h.replace("請直接看店內看板", "請稍後再試"),
    expect: false },
  { name: "KDS 佇列順序打亂（違反 AC-20）",
    ac: "AC-20", screen: "scr-07-kds",
    mutate: h => h.replace("08:20 取餐", "08:40 取餐"),
    expect: false },
  { name: "付款處理中又冒出付款按鈕（違反 AC-07）",
    ac: "AC-07", screen: "scr-04-payment",
    mutate: h => h + '<button data-action="pay">再付一次</button>',
    expect: false }
];

let bad = 0;
console.log("【負向測試：故意做錯，檢查應該 FAIL】");
for (const c of cases) {
  const check = D.checks.find(x => x.id === c.ac);
  const p = path.join(root, c.screen, "index.html");
  const orig = fs.readFileSync(p, "utf8");
  const secRe = new RegExp('<section class="state state-' + check.state + '"[^>]*>([\\s\\S]*?)</section>');
  const m = orig.match(secRe);
  if (!m) { console.log("  ✗ 找不到區塊：" + c.ac); bad++; continue; }
  const mutated = c.mutate(m[1]);
  const ok = evalCheck(check.check, mutated);
  const good = ok === c.expect;
  console.log("  " + (good ? "PASS" : "✗ 檢查失效") + "  " + c.ac + "　" + c.name +
    "　（故意做錯 → " + (ok ? "仍然通過（空檢查！）" : "正確判為 FAIL") + "）");
  if (!good) bad++;
}
console.log("\n" + (bad === 0 ? "負向測試通過：這些檢查會紅，不是空檢查。" : bad + " 個檢查是空檢查。"));
process.exit(bad === 0 ? 0 : 1);
