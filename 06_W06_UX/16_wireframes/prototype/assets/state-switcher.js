/* state-switcher.js — 六態切換與畫布縮放（所有畫面共用）
   ?state=default|loading|empty|error|success|interrupted
   ?mode=wire|color
   ?fit=0..1（遠距畫面用） */
(function () {
  var STATES = ["default", "loading", "empty", "error", "success", "interrupted"];

  function apply(state, mode) {
    if (STATES.indexOf(state) === -1) state = "default";
    document.body.dataset.state = state;
    document.body.dataset.mode = (mode === "wire") ? "wire" : "color";
    document.querySelectorAll("[data-set-state]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.setState === state));
    });
    var m = document.querySelector("[data-toggle-mode]");
    if (m) {
      var isWire = document.body.dataset.mode === "wire";
      m.setAttribute("aria-pressed", String(isWire));
      m.textContent = isWire ? "彩色模式" : "線框模式";
    }
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
  }

  function fit() {
    var el = document.querySelector("[data-fit]");
    if (!el) return;
    var target = Number(el.dataset.fitWidth || 1920);
    var scale = Math.min(1, (window.innerWidth - 48) / target);
    el.style.setProperty("--fit", String(Math.max(0.2, scale)));
  }

  function fromQuery() {
    var q = new URLSearchParams(location.search);
    apply(q.get("state") || "default", q.get("mode") || "color");
    var f = q.get("fit");
    var el = document.querySelector("[data-fit]");
    if (el && f) el.style.setProperty("--fit", f);
    else fit();
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-set-state]");
    if (btn) { apply(btn.dataset.setState, document.body.dataset.mode); return; }
    if (e.target.closest("[data-toggle-mode]")) {
      apply(document.body.dataset.state, document.body.dataset.mode === "wire" ? "color" : "wire");
    }
  });

  window.addEventListener("resize", fit);
  fromQuery();
})();
