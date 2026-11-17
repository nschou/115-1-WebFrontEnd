# 18_spec 變更紀錄參考

## v1.3｜2026-11-13｜SDD 交接審核修正

| 項目 | 內容 |
|---|---|
| 需求同步 | `18_spec.md` 對齊目前 25 條 AC、22 條 REQ、10 條 US-B 與 11 條 US-I |
| 追溯補強 | 保留正式 US-B ID，補上 US-B → US-I → AC → REQ 覆蓋索引與逐條驗證方式 |
| 架構交接 | 補上架構輸入契約、P0／P1 優先級、第一個垂直切片與不做範圍 |
| 證據同步 | 更新 validation 結論、四層檢查摘要與課程回顧中的 AC 數量 |
| 驗證 | `check-spec.mjs` 通過；`check-all.mjs` 四層全部通過；AC 25/25 |

## v1.0｜2026-10-31｜18 檔主線切換

| 項目 | 內容 |
|---|---|
| 上游定義 | `04_blueprint.md` 是選項版；`07_decisions.md` 完成 SD-01–SD-11；`08_service-design-baseline.md` 是唯一服務基準 |
| W6 輸入 | `11_service-requirements.md`、`12_role-tasks.md`、`13_UserStory-B.md`、`14_elements.md`、`15_UX.md`、`16_wireframes/`、`17_UserStory-I_AC.md`、validation |
| W7 定位 | `18_spec.md` 是本課程系統級 SDD `spec.md`，也是服務級總規格；它彙整已驗證證據，建立來源—需求—Story—AC—UX 追溯，不首次設計需求。第 11 週對同一份規格做 clarify，開始整體 `research.md`；垂直切片留在同一份 spec／plan／tasks |
| 影響文件 | W1 全課程大綱、W4 Blueprint、W5 教材／手冊、W6 UX、W7 入口／講義／手冊／示範答案 |

## 本次檢查

- `07_decisions.md` 的 11 條決策已在 baseline 定案，不可在 spec 重新開啟。
- `12_role-tasks.md` 明確與實作 tasks 分開。
- `13_UserStory-B.md` 先於 UX；`17_UserStory-I_AC.md` 在線框與狀態後產出。
- validation 是 `16_wireframes/` 與 `17_UserStory-I_AC.md` 之間的檢查點，不列主線編號。
- `18_spec.md` 不含技術實作方案，並由 `check-spec.mjs` 驗證。
