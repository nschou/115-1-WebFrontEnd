/* 由 check-all.mjs 產生，不要手改 */
globalThis.CHECK_SUMMARY = {
  "generatedAt": "2026-10-30T17:53:47.155Z",
  "allOk": true,
  "layers": [
    {
      "key": "business",
      "name": "業務層：任務句與 AC",
      "ok": true,
      "details": [
        {
          "script": "verify-stories.mjs",
          "ok": true
        }
      ]
    },
    {
      "key": "info",
      "name": "資訊層：元素與線框推展",
      "ok": true,
      "details": [
        {
          "script": "derive-wires.mjs",
          "ok": true
        }
      ]
    },
    {
      "key": "layout",
      "name": "版面層：決策順序",
      "ok": true,
      "details": [
        {
          "script": "check-layout-order.mjs",
          "ok": true
        }
      ]
    },
    {
      "key": "impl",
      "name": "實作層：版面規範與頁面渲染",
      "ok": true,
      "details": [
        {
          "script": "lint-tokens.mjs",
          "ok": true
        },
        {
          "script": "smoke-dom.mjs",
          "ok": true
        }
      ]
    },
    {
      "key": "guard",
      "name": "負向測試：檢查會不會紅",
      "ok": true,
      "details": [
        {
          "script": "selftest-stories.mjs",
          "ok": true
        }
      ]
    }
  ]
};
