# 18_spec 變更紀錄參考

## v1.0｜2026-10-31｜18 檔主線切換

| 項目 | 內容 |
|---|---|
| 上游定義 | `04_blueprint.md` 是選項版；`07_decisions.md` 完成 SD-01–SD-11；`08_service-design-baseline.md` 是唯一服務基準 |
| W6 輸入 | `11_service-requirements.md`、`12_role-tasks.md`、`13_UserStory-B.md`、`14_elements.md`、`15_UX.md`、`16_wireframes/`、`17_UserStory-I_AC.md`、validation |
| W7 定位 | `18_spec.md` 只彙整已驗證證據，建立來源—需求—Story—AC—UX 追溯，不首次設計需求 |
| 影響文件 | W1 全課程大綱、W4 Blueprint、W5 教材／手冊、W6 UX、W7 入口／講義／手冊／示範答案 |

## 本次檢查

- `07_decisions.md` 的 11 條決策已在 baseline 定案，不可在 spec 重新開啟。
- `12_role-tasks.md` 明確與實作 tasks 分開。
- `13_UserStory-B.md` 先於 UX；`17_UserStory-I_AC.md` 在線框與狀態後產出。
- validation 是 `16_wireframes/` 與 `17_UserStory-I_AC.md` 之間的檢查點，不列主線編號。
- `18_spec.md` 不含技術實作方案，並由 `check-spec.mjs` 驗證。
