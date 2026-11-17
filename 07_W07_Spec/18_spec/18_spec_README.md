# 18_spec｜導讀

> 第 7 週：把已驗證的主線證據收斂成 `18_spec.md`；在本課程中，它就是系統級的 SDD `spec.md`。官方 feature template 提供寫作元素，但本課程不拆成多份獨立 spec／plan。

| 檔案 | 給誰 | 內容 |
|---|---|---|
| `18_spec_README.md` | 全部 | 本檔 |
| `00_W07_上課講義.md` | 教師／學生 | 十章結構、寫作規則、指標 |
| `00_W07_學生操作手冊.md` | 學生 | 輸入檢查與產出步驟 |
| `18_spec_template.md` | 學生 | 十章骨架 |
| `18_spec.md` | 學生（完成後） | 本案完整 spec |
| `check-spec.mjs` | 學生／教師 | 技術名、來源、AC 與章節檢查 |
| `../../98_示範案例/雲端早餐店/00_因果鏈回推_三例.md` | 學生 | 三條 spec 條文的六層回推示範 |

## 本週在做什麼

前段先完成 `08_service-design-baseline.md`、`11`–`17` 與 validation；本週把證據排成可追溯、可驗收的系統級 `18_spec.md`。第 11 週在同一份文件內完成 clarify、標示垂直切片，再進入整體 `research.md`。

## 這週在做什麼

```text
前六週：分頭把證據做出來（市場／Persona／CJM／Blueprint 選項版／11 項決策／Blueprint baseline／物件／DESIGN.md／任務句／元素／線框／AC）
本週  ：把已凍結 baseline 與 UX 證據排成一份別人看得懂、驗得動的文件
```

## 三項驗收指標

| 指標 | 標準 |
|---|---|
| 技術名殘留 | **0** |
| 可追溯率（有來源的需求 ÷ 全部） | **100%** |
| 驗收覆蓋率（有 AC 的需求 ÷ 全部） | **100%** |

## 輸入輸出

| 週次 | 輸入／輸出 | 用途 |
|---|---|---|
| W2–W5 | `01_market`～`10_tokens` | 需求、已定案服務方案與設計限制 |
| W6 | `11_service-requirements`～`17_UserStory-I_AC`、validation | spec 的直接證據 |
| **W7** | `18_spec.md` | 完成並審計本課程系統級的 SDD `spec.md` |
| W11+ | `research.md`、`plan.md` | 整體技術研究與架構規劃；功能切片留在同一份 spec／plan／tasks |

## 一句話

> spec 寫「1 秒內四端一致」，plan 才寫「用什麼達成」。