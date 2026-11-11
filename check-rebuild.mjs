#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const fail = [];
const exists = rel => fs.existsSync(path.join(root, rel));
const need = rel => { if (!exists(rel)) fail.push(`missing: ${rel}`); };

const mainline = [
  "01_market.md", "02_persona.md", "03_cjm.md", "04_blueprint.md", "05_objects.md", "06_infoflow.md",
  "07_decisions.md", "08_service-design-baseline.md", "09_DESIGN.md", "10_tokens.css",
  "11_service-requirements.md", "12_role-tasks.md", "13_UserStory-B.md", "14_elements.md", "15_UX.md",
  "16_wireframes", "17_UserStory-I_AC.md", "18_spec.md"
];
const example = "98_示範案例/雲端早餐店";
mainline.forEach(name => need(`${example}/${name}`));

const weekly = [
  ["01_W01_課程總覽", "00_W01"], ["02_W02_市場與Persona", "00_W02"], ["03_W03_CJM", "00_W03"],
  ["04_W04_Blueprint", "00_W04"], ["05_W05_物件決策與Design", "00_W05"], ["06_W06_UX", "00_W06"], ["07_W07_Spec", "00_W07"]
];
for (const [dir, prefix] of weekly) {
  for (const suffix of ["上課講義.md", "上課簡報.pptx", "教師教學指引.md", "學生操作手冊.md", "學生工具包.zip"]) need(`${dir}/${prefix}_${suffix}`);
}

const decisions = fs.readFileSync(path.join(root, example, "07_decisions.md"), "utf8");
for (let n = 1; n <= 11; n++) if (!decisions.includes(`SD-${String(n).padStart(2, "0")}`)) fail.push(`decision missing: SD-${String(n).padStart(2, "0")}`);

for (const oldDir of ["01_課程總覽", "02_服務設計_行業分析＆Persona", "03_CJM_顧客旅程", "04_ServiceBlueprint_服務藍圖", "05_AI輔助風格設計", "06_UX設計", "07_Spec"]) {
  if (exists(oldDir)) fail.push(`legacy active directory remains: ${oldDir}`);
}
need("99_歷史封存/20261031_重建前/manifest.sha256.json");
need("CHANGELOG.md");
need("adr/ADR-006_18檔主線與週次重建.md");

console.log(`mainline: ${mainline.length} artifacts`);
console.log(`weekly roots: ${weekly.length}`);
console.log("decisions: SD-01–SD-11");
console.log("archive: manifest present");
if (fail.length) {
  console.error(fail.map(x => `✗ ${x}`).join("\n"));
  process.exit(1);
}
console.log("rebuild integrity: PASS");
