# 03_API 契約（示例）

> 這份是練習用的契約，不是正式規格；錯誤格式刻意留了「可以更好」的地方。

## GET /menu

| 項目 | 內容 |
|---|---|
| 成功 | 200 `[{ id, name, price, available }]` |
| 錯誤 | 500 `{ code: "INTERNAL", retryable: true }` |

## POST /orders

| 項目 | 內容 |
|---|---|
| 輸入 | `{ customer, items: [{ name, quantity }] }` |
| 成功 | 201 `{ id, status }` |
| 參數錯 | 400 `{ code: "INVALID_INPUT", retryable: false }` |
| 重複送出 | 409 `{ code: "DUPLICATE", retryable: false }` |

## GET /orders/{id}

| 項目 | 內容 |
|---|---|
| 成功 | 200 `{ id, status, pickupNumber }` |
| 找不到 | 404 `{ code: "NOT_FOUND", retryable: false }` |
| 沒權限 | 403 `{ code: "FORBIDDEN", retryable: false }` |

## PATCH /orders/{id}

| 項目 | 內容 |
|---|---|
| 輸入 | `{ status }` |
| 成功 | 200 `{ id, status }` |
| 狀態不合法 | 409 `{ code: "INVALID_TRANSITION", retryable: false }` |

## GET /events（SSE）

| 事件 | 內容 |
|---|---|
| `order` | `{ seq, id, status }` |
| 心跳 | 註解行 `: ping` |
