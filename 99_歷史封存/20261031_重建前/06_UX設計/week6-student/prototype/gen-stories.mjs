#!/usr/bin/env node
/**
 * gen-stories.mjs — 從 story-data.js 產生 13_STORIES 的第一、四節
 * 用法：node gen-stories.mjs
 * 目的：故事（路徑／AC／痛點）與驗證等級只有一份來源，避免文件漂移。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const mdPath = path.join(root, "..", "13_STORIES_示範答案.md");

new Function(fs.readFileSync(path.join(root, "assets", "story-data.js"), "utf8"))();
const D = globalThis.STORY_DATA;

const scrLabel = s => s.replace("wire-", "SCR-").replace(/^SCR-(\d+)-.*$/, "SCR-$1");

/* 一、User Story 表：先列業務意圖（US-B），再列介面路徑（US-I） */
const usHead = "| ID | US-B（業務意圖） | US-I（介面路徑） | 路徑 | AC | 來源痛點 |\n|---|---|---|---|---|---|";
const usRows = D.stories.map(s => {
  const p = s.path.map(scrLabel).join(" → ");
  const ac = [...new Set([...(s.ac || []), ...(s.guard || [])])].join("、");
  return "| " + s.id + " | " + (s.usB || s.us || s.title) + " | " + (s.usI || s.us || s.title) + " | " + p + " | " + ac + " | " + (s.pain || "—") + " |";
}).join("\n");

/* 四、驗證等級表 */
const byLevel = { auto: [], manual: [], human: [] };
D.acCatalog.forEach(c => { (byLevel[c.verify] || byLevel.auto).push(c.id); });
const verifyTable = [
  "| verify | 條數 | 條目 | 誰做 |",
  "|---|---|---|---|",
  "| **auto**（已實作斷言） | " + byLevel.auto.length + " | " + byLevel.auto.join("、") + " | `node verify-stories.mjs` |",
  "| manual | " + byLevel.manual.length + " | " + (byLevel.manual.join("、") || "—") + " | 助教 |",
  "| human | " + byLevel.human.length + " | " + (byLevel.human.join("、") || "—") + " | 使用者測試 |"
].join("\n").split("`").join(String.fromCharCode(96));

let md = fs.readFileSync(mdPath, "utf8");
md = md.replace(/<!-- AUTO:US-BEGIN -->[\s\S]*?<!-- AUTO:US-END -->/,
  "<!-- AUTO:US-BEGIN -->\n" + usHead + "\n" + usRows + "\n<!-- AUTO:US-END -->");
md = md.replace(/<!-- AUTO:VERIFY-BEGIN -->[\s\S]*?<!-- AUTO:VERIFY-END -->/,
  "<!-- AUTO:VERIFY-BEGIN -->\n" + verifyTable + "\n<!-- AUTO:VERIFY-END -->");
fs.writeFileSync(mdPath, md, "utf8");

console.log("已產生：" + D.stories.length + " 條故事、" + D.acCatalog.length + " 條 AC");
console.log("auto " + byLevel.auto.length + "／manual " + byLevel.manual.length + "／human " + byLevel.human.length);
