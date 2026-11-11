#!/usr/bin/env node
/**
 * package-student.mjs — 重建兩份學生資料包（week5-student.zip / week6-student.zip）
 * 用法：node package-student.mjs
 * 特色：純 Node 實作 ZIP（store），不需要 PowerShell 或外部工具。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const D5 = path.join(root, "05_AI輔助風格設計", "06_新版_Design規格驅動");
const D6 = path.join(root, "06_UX設計");
const TK = path.join(D5, "toolkit");
const D7 = path.join(root, "07_Spec");

/* ---------------- ZIP（store） ---------------- */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function dosTime(d) {
  const time = ((d.getHours() & 31) << 11) | ((d.getMinutes() & 63) << 5) | ((d.getSeconds() / 2) & 31);
  const date = (((d.getFullYear() - 1980) & 127) << 9) | (((d.getMonth() + 1) & 15) << 5) | (d.getDate() & 31);
  return { time, date };
}

function zipDir(dir, outFile) {
  const files = [];
  const walk = (d, rel) => {
    for (const n of fs.readdirSync(d).sort()) {
      const p = path.join(d, n);
      const r = rel ? rel + "/" + n : n;
      const st = fs.statSync(p);
      if (st.isDirectory()) walk(p, r);
      else if (!/\.(zip|png|jpg|jpeg)$/i.test(n)) files.push({ p, r });
    }
  };
  walk(dir, "");

  const chunks = [];
  const central = [];
  let offset = 0;
  const { time, date } = dosTime(new Date());

  for (const f of files) {
    const data = fs.readFileSync(f.p);
    const name = Buffer.from(f.r, "utf8");
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, name, data);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(0, 10);
    cd.writeUInt16LE(time, 12);
    cd.writeUInt16LE(date, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(data.length, 20);
    cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(name.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([cd, name]));

    offset += local.length + name.length + data.length;
  }

  const cdBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(cdBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  fs.writeFileSync(outFile, Buffer.concat([...chunks, cdBuf, eocd]));
  return { count: files.length, bytes: fs.statSync(outFile).size };
}

/* ---------------- 建包工具 ---------------- */
function copyTree(s, d, skip) {
  fs.mkdirSync(d, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(s)) {
    if (skip && skip.test(name)) continue;
    const a = path.join(s, name), b = path.join(d, name);
    if (fs.statSync(a).isDirectory()) n += copyTree(a, b, skip);
    else { fs.copyFileSync(a, b); n++; }
  }
  return n;
}
function build(dstDir, plan) {
  fs.rmSync(dstDir, { recursive: true, force: true });
  fs.mkdirSync(dstDir, { recursive: true });
  let n = 0, miss = [];
  for (const item of plan) {
    const [from, to, kind] = item;
    if (!fs.existsSync(from)) { miss.push(path.basename(from)); continue; }
    const target = path.join(dstDir, to);
    if (kind === "dir") { n += copyTree(from, target, /\.(zip|png|jpg|jpeg)$/i); continue; }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(from, target);
    n++;
  }
  return { n, miss };
}

/* ---------------- 第 5 週清單 ---------------- */
const P5 = [
  [path.join(D5, "START_HERE_第5週.md"), "START_HERE.md"],
  [path.join(D5, "27_學生操作手冊_第5週.md"), "27_學生操作手冊.md"],
  [path.join(D5, "01_第05週講義_v6_設計規格驅動.md"), "lecture/01_第05週講義_v6.md"],
  ...["01_market_template.md","01_market_rd_template.md","02_persona_template.md","02_persona_rd_template.md",
      "03_cjm_template.md","03_cjm_rd_template.md","04_blueprint_template.md","04_blueprint_rd_template.md",
      "05_decisions_template.md","05_decisions_rd_template.md",
      "06_designmd_template.md","06_designmd_rd_template.md","06_designmd_audit_record.md","06_designmd_README.md"]
      .map(n => [path.join(TK, n), "templates/" + n]),
  ...["service-design-baseline.md","service-design-baseline-template.md","00_toolkit_使用說明.md"]
      .map(n => [path.join(TK, n), "reference/" + n]),
  [path.join(D5, "12_物件與資訊架構.md"), "reference/12_物件與資訊架構.md"],
  [path.join(D5, "14_資訊流與動態需求.md"), "reference/14_資訊流與動態需求.md"],
  ...[["DESIGN.md","reference/範例_DESIGN_10章/DESIGN.md"],
      ["tokens.css","reference/範例_DESIGN_10章/tokens.css"],
      ["整併紀錄.md","reference/範例_DESIGN_10章/整併紀錄.md"],
      ["README.md","reference/範例_DESIGN_10章/README.md"]]
      .map(([a,b]) => [path.join(TK,"範例_DESIGN_10章_平衡現代",a), b])
];

/* ---------------- 第 6 週清單 ---------------- */
const P6 = [
  [path.join(D6, "START_HERE.md"), "START_HERE.md"],
  [path.join(D6, "24_學生操作手冊_第6週.md"), "24_學生操作手冊.md"],
  [path.join(D6, "17_走查作業手冊.md"), "17_走查作業手冊.md"],
  [path.join(D6, "11_欄位命名規則.md"), "11_欄位命名規則.md"],
  [path.join(D6, "04_ux_template.md"), "templates/04_ux_template.md"],
  [path.join(D6, "04_ux_rd_template.md"), "templates/04_ux_rd_template.md"],
  [path.join(D6, "07_第06週講義_v1.md"), "lecture/07_第06週講義_v1.md"],
  [path.join(D6, "09_第06週簡報_v2.pptx"), "lecture/09_第06週簡報_v2.pptx"],
  ...["12_UX_示範答案.md","13_STORIES_示範答案.md","14_線框_示範答案.md","20_任務句與元素表.md",
      "21_SCR推展表.md","22_版面順序對照.md","18_推導修正的思考軌跡.md"]
      .map(n => [path.join(D6, n), "reference/" + n]),
  [path.join(D6, "prototype"), "prototype", "dir"]
];

/* ---------------- 第 7 週清單 ---------------- */
const P7 = [
  [path.join(D7, "START_HERE_第7週.md"), "START_HERE.md"],
  [path.join(D7, "02_學生操作手冊_第7週.md"), "02_學生操作手冊.md"],
  [path.join(D7, "05_spec_範本.md"), "templates/05_spec_範本.md"],
  [path.join(D7, "01_第07週講義_v1.md"), "lecture/01_第07週講義_v1.md"],
  [path.join(D7, "00_README_導讀.md"), "reference/00_README_導讀.md"],
  [path.join(D7, "06_spec_示範答案.md"), "reference/06_spec_示範答案.md"],
  [path.join(D7, "check-spec.mjs"), "tools/check-spec.mjs"],
  [path.join(D7, "07_第07週簡報_v1.pptx"), "lecture/07_第07週簡報_v1.pptx"]
];

/* ---------------- 主流程 ---------------- */
const steps = [
  { name: "第 5 週", dir: path.join(D5, "week5-student"), zip: path.join(D5, "week5-student.zip"), plan: P5, start: path.join(D5, "START_HERE_第5週.md") },
  { name: "第 6 週", dir: path.join(D6, "week6-student"), zip: path.join(D6, "week6-student.zip"), plan: P6, start: path.join(D6, "START_HERE.md") },
  { name: "第 7 週", dir: path.join(D7, "week7-student"), zip: path.join(D7, "week7-student.zip"), plan: P7, start: path.join(D7, "START_HERE_第7週.md") }
];

let bad = 0;
for (const s of steps) {
  const r = build(s.dir, s.plan);
  /* START_HERE 直接從來源複製（第 5 週沒有獨立檔，跳過） */
  /* START_HERE 已在清單中 */
  const z = zipDir(s.dir, s.zip);
  console.log(s.name + "：複製 " + r.n + " 檔 → " + path.basename(s.zip) + "（" + z.count + " 項，" + Math.round(z.bytes / 1024) + " KB）");
  if (r.miss.length) { console.log("  缺檔：" + r.miss.join("、")); bad++; }
}
console.log(bad === 0 ? "三份資料包已重建" : "有缺檔，請修正清單");
process.exit(bad === 0 ? 0 : 1);
