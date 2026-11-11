
import fs from "node:fs";
new Function(fs.readFileSync("assets/tasks.js","utf8"))();
new Function(fs.readFileSync("assets/elements.js","utf8"))();
const T = globalThis.TASKS, E = globalThis.ELEMENTS;
const L = [];
L.push("# 12_role-tasks／14_elements 產生參考", "");
L.push("> 由 «BT»node gen-tables.mjs«BT» 從 «BT»tasks.js«BT»／«BT»elements.js«BT» 產生，請勿手改。", "");
L.push("---", "", "## 一、任務句（12 條，業務語言）", "");
L.push("| ID | 前置業務狀態 | A | 業務動作 | 物件 | 狀態轉換 | B | B 的決策 | 時效 |");
L.push("|---|---|---|---|---|---|---|---|---|");
T.forEach(t => L.push("| " + [t.id,t.preState,t.actor,t.verb,t.object,t.transition,t.recipient,t.decision,t.latency].join(" | ") + " |"));
L.push("", "## 二、資訊元素（" + E.length + " 個）", "");
const byScreen = {};
E.forEach(e => { (byScreen[e.screen] = byScreen[e.screen] || []).push(e); });
Object.keys(byScreen).forEach(s => {
  L.push("### " + s + "（" + byScreen[s].length + " 個元素）", "");
  L.push("| ID | 元素 | 用途 | 資料來源 | 類型 | 建議型態 | 型態依據 | 回指任務 | 狀態改變 | 去處 | 回饋 | 失敗去處 |");
  L.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
  byScreen[s].forEach(e => L.push("| " + [e.id,e.name,e.purpose,e.source,
    e.kind === "display" ? "顯示" : e.kind === "input" ? "輸入" : "操作",
    e.widget, e.rationale || "—",
    e.task || (e.recovery ? "復原（免）" : "—"),
    e.stateChange || "—", e.to || "—", e.feedback || "—", e.failTo || "—"].join(" | ") + " |"));
  L.push("");
});
const out = L.join("\n").replaceAll("«BT»", String.fromCharCode(96));
fs.writeFileSync("../../12_role-tasks/12_role-tasks_generated_reference.md", out, "utf8");
fs.writeFileSync("../../14_elements/14_elements_generated_reference.md", out, "utf8");
console.log("已產生 12_role-tasks_generated_reference.md、14_elements_generated_reference.md");
