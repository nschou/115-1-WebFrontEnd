#!/usr/bin/env node
/**
 * Build one student package per week from the new W1–W7 tree.
 * Output: 00_Wxx_學生工具包.zip inside each weekly directory.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const skipName = /^(?:_shots|.*\.(?:zip|png|jpg|jpeg))$/i;

function copyTree(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  let count = 0;
  for (const name of fs.readdirSync(src).sort()) {
    if (skipName.test(name)) continue;
    const from = path.join(src, name);
    const to = path.join(dst, name);
    if (fs.statSync(from).isDirectory()) count += copyTree(from, to);
    else { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); count++; }
  }
  return count;
}

function copyEntry(source, stage, rel) {
  if (!fs.existsSync(source)) throw new Error(`missing source: ${source}`);
  const target = path.join(stage, rel);
  if (fs.statSync(source).isDirectory()) return copyTree(source, target);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
  return 1;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (const byte of buf) c = crcTable[(c ^ byte) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function dosDateTime() {
  const d = new Date();
  return {
    time: ((d.getHours() & 31) << 11) | ((d.getMinutes() & 63) << 5) | ((d.getSeconds() / 2) & 31),
    date: (((d.getFullYear() - 1980) & 127) << 9) | (((d.getMonth() + 1) & 15) << 5) | (d.getDate() & 31)
  };
}
function zipDir(dir, outFile) {
  const files = [];
  const walk = (current, rel = "") => {
    for (const name of fs.readdirSync(current).sort()) {
      if (skipName.test(name)) continue;
      const full = path.join(current, name);
      const next = rel ? `${rel}/${name}` : name;
      if (fs.statSync(full).isDirectory()) walk(full, next);
      else files.push({ full, rel: next });
    }
  };
  walk(dir);
  const chunks = [], central = [];
  let offset = 0;
  const { time, date } = dosDateTime();
  for (const file of files) {
    const data = fs.readFileSync(file.full);
    const name = Buffer.from(file.rel, "utf8");
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8); local.writeUInt16LE(time, 10); local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26); local.writeUInt16LE(0, 28);
    chunks.push(local, name, data);
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(0, 10); cd.writeUInt16LE(time, 12); cd.writeUInt16LE(date, 14);
    cd.writeUInt32LE(crc, 16); cd.writeUInt32LE(data.length, 20); cd.writeUInt32LE(data.length, 24);
    cd.writeUInt16LE(name.length, 28); cd.writeUInt16LE(0, 30); cd.writeUInt16LE(0, 32); cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36); cd.writeUInt32LE(0, 38); cd.writeUInt32LE(offset, 42);
    central.push(Buffer.concat([cd, name]));
    offset += local.length + name.length + data.length;
  }
  const centralBuffer = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(0, 4); end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuffer.length, 12); end.writeUInt32LE(offset, 16); end.writeUInt16LE(0, 20);
  fs.writeFileSync(outFile, Buffer.concat([...chunks, centralBuffer, end]));
  return { files: files.length, bytes: fs.statSync(outFile).size };
}

const weeks = [
  {
    dir: "01_W01_課程總覽", zip: "00_W01_學生工具包.zip",
    entries: [
      ["00_W01_上課講義.md", "00_W01_上課講義.md"], ["00_W01_上課簡報.pptx", "00_W01_上課簡報.pptx"],
      ["00_W01_學生操作手冊.md", "00_W01_學生操作手冊.md"], ["00_W01_學生工具包說明.md", "00_W01_學生工具包說明.md"],
      ["../00_方法論主線與檢查點.md", "00_方法論主線與檢查點.md"],
      ["../00_課程中間回顧與思考框架.md", "00_課程中間回顧與思考框架.md"]
    ]
  },
  {
    dir: "02_W02_市場與Persona", zip: "00_W02_學生工具包.zip",
    entries: [["00_W02_上課講義.md", "00_W02_上課講義.md"], ["00_W02_上課簡報.pptx", "00_W02_上課簡報.pptx"], ["00_W02_學生操作手冊.md", "00_W02_學生操作手冊.md"], ["01_market", "01_market"], ["02_persona", "02_persona"]]
  },
  {
    dir: "03_W03_CJM", zip: "00_W03_學生工具包.zip",
    entries: [["00_W03_上課講義.md", "00_W03_上課講義.md"], ["00_W03_上課簡報.pptx", "00_W03_上課簡報.pptx"], ["00_W03_學生操作手冊.md", "00_W03_學生操作手冊.md"], ["03_cjm", "03_cjm"]]
  },
  {
    dir: "04_W04_Blueprint", zip: "00_W04_學生工具包.zip",
    entries: [["00_W04_上課講義.md", "00_W04_上課講義.md"], ["00_W04_上課簡報.pptx", "00_W04_上課簡報.pptx"], ["00_W04_學生操作手冊.md", "00_W04_學生操作手冊.md"], ["04_blueprint", "04_blueprint"]]
  },
  {
    dir: "05_W05_物件決策與Design", zip: "00_W05_學生工具包.zip",
    entries: [["00_W05_上課講義.md", "00_W05_上課講義.md"], ["00_W05_上課簡報.pptx", "00_W05_上課簡報.pptx"], ["00_W05_學生操作手冊.md", "00_W05_學生操作手冊.md"], ["00_W05_PROMPTS.md", "00_W05_PROMPTS.md"], ["05_objects", "05_objects"], ["06_infoflow", "06_infoflow"], ["07_decisions", "07_decisions"], ["08_service-design-baseline", "08_service-design-baseline"], ["09_DESIGN", "09_DESIGN"], ["10_tokens", "10_tokens"]]
  },
  {
    dir: "06_W06_UX", zip: "00_W06_學生工具包.zip",
    entries: [["00_W06_上課講義.md", "00_W06_上課講義.md"], ["00_W06_上課簡報.pptx", "00_W06_上課簡報.pptx"], ["00_W06_學生操作手冊.md", "00_W06_學生操作手冊.md"], ["11_service-requirements", "11_service-requirements"], ["12_role-tasks", "12_role-tasks"], ["13_UserStory-B", "13_UserStory-B"], ["14_elements", "14_elements"], ["15_UX", "15_UX"], ["16_wireframes", "16_wireframes"], ["17_UserStory-I_AC", "17_UserStory-I_AC"], ["validation", "validation"]]
  },
  {
    dir: "07_W07_Spec", zip: "00_W07_學生工具包.zip",
    entries: [["00_W07_上課講義.md", "00_W07_上課講義.md"], ["00_W07_上課簡報.pptx", "00_W07_上課簡報.pptx"], ["00_W07_學生操作手冊.md", "00_W07_學生操作手冊.md"], ["18_spec", "18_spec"]]
  }
];

let failures = 0;
for (const week of weeks) {
  const weeklyDir = path.join(root, week.dir);
  const stage = path.join(weeklyDir, ".student-package");
  fs.rmSync(stage, { recursive: true, force: true });
  let count = 0;
  try {
    for (const [sourceRel, targetRel] of week.entries) count += copyEntry(path.join(weeklyDir, sourceRel), stage, targetRel);
    const zip = path.join(weeklyDir, week.zip);
    const result = zipDir(stage, zip);
    fs.rmSync(stage, { recursive: true, force: true });
    console.log(`${week.dir}: ${count} source files -> ${week.zip} (${result.files} entries, ${Math.round(result.bytes / 1024)} KB)`);
  } catch (error) {
    failures++;
    fs.rmSync(stage, { recursive: true, force: true });
    console.error(`${week.dir}: ${error.message}`);
  }
}
if (failures) process.exit(1);
console.log("7 weekly student packages rebuilt");
