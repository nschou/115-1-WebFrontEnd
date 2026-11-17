# 工具與檢查腳本

> 你的專案只需要三個檔案，全部放在 `tools/`。
> 所有指令都在**專案根目錄**執行（不是 `tools/` 裡面）。

## 1. 你的目錄結構

````text
project-name/
├── 00_project-brief.md
├── 01_market.md
├── 02_persona.md
├── 03_cjm.md
├── 04_blueprint.md
├── 05_objects.md
├── 06_infoflow.md
├── 07_decisions.md
├── 08_service-design-baseline.md
├── 09_DESIGN.md
├── 10_tokens.css
├── 11_service-requirements.md
├── 12_role-tasks.md
├── 13_UserStory-B.md
├── 14_elements.md
├── 15_UX.md
├── 16_wireframes/            ← W6 之後放線框與 prototype
├── 17_UserStory-I_AC.md
├── 18_spec.md
├── validation/
│   └── review-report.md      ← W6 人工走查
└── tools/                    ← 檢查腳本集中在這裡
    ├── check-spec.mjs
    ├── check-wording.mjs
    └── check-project-integrity.mjs
````

## 2. 要下載哪三個檔案

| 檔案 | 檢查什麼 | 什麼時候跑 |
|---|---|---|
| `check-spec.mjs` | 18_spec 有沒有技術名、每條需求有沒有來源與依據 | W7 |
| `check-wording.mjs` | 用語：數字要有主詞、不寫教師動作、不用隱喻、術語要展開 | W2–W7 每次交件前 |
| `check-project-integrity.mjs` | 證據檔案齊不齊、prototype 與 17 的 AC 是否一致 | W7 |

三個檔案都從課程資料夾複製到你的 `tools/`。若課程更新，重新複製一次。

## 3. 怎麼跑

| 想檢查 | 指令 | 參數說明 |
|---|---|---|
| 總規格 | `node tools/check-spec.mjs 18_spec.md` | 參數是 spec 檔名；`07_decisions.md` 放在同層即可 |
| 用語 | `node tools/check-wording.mjs --root=. --strict` | `--root=.` 掃描目前目錄；`--strict` 讓警告也算失敗 |
| 證據鏈 | `node tools/check-project-integrity.mjs .` | 參數是專案根目錄 |

不在專案根目錄時，把 `.` 換成專案路徑：

````powershell
node tools/check-project-integrity.mjs "D:\my-project"
````

## 4. 什麼時候跑哪一支

| 週次 | 指令 |
|---|---|
| W2–W6 每次交件前 | `node tools/check-wording.mjs --root=. --strict` |
| W7 寫完 18_spec 後 | `node tools/check-spec.mjs 18_spec.md` |
| W7 全部交件前 | `node tools/check-project-integrity.mjs .` |

## 5. 常見錯誤

| 訊息 | 原因 | 怎麼修 |
|---|---|---|
| `Cannot find module` | 沒有在專案根目錄執行 | `cd` 到專案根，再跑 `node tools/…` |
| `找不到 18_spec.md` | 檔名或位置不對 | 確認檔名是 `18_spec.md`，且放在專案根目錄 |
| `找不到 16_wireframes/prototype/index.html` | W6 以前還沒有 prototype | 這支是 W7 交件前才跑 |
| `用語檢查：掃描 0 份` | `--root` 指錯 | 用 `--root=.` |
| `node` 不是可辨識的指令 | 沒安裝 Node.js | 安裝 Node.js LTS（22 以上） |

## 6. 需要的環境

- Node.js **22 以上**
- 不需要安裝任何套件（三支腳本只用 Node 內建模組）
- Windows／macOS 都可以
