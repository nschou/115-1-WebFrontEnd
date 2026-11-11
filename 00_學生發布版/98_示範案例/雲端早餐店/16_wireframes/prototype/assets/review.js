/* review.js — 走查台：勾選、記錄證據、產生報告 */
(function () {
  var KEY = "review-state-v1";
  var D = globalThis.REVIEW_DATA;
  var RR = globalThis.REVIEW_REPORT || null;
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { saved = {}; }

  function stateOf(id) {
    if (saved[id]) return saved[id];
    if (RR && RR.items && RR.items[id]) return { v: RR.items[id], ev: (RR.evidence && RR.evidence[id]) || "" };
    return { v: "pending", ev: "" };
  }

  function render() {
    var html = "";
    D.categories.forEach(function (c) {
      html += '<section class="rv-cat"><h2>' + c.name + '</h2>';
      D.items.filter(function (i) { return i.cat === c.id; }).forEach(function (i) {
        var s = stateOf(i.id);
        html += '<div class="rv-item" data-id="' + i.id + '">' +
          '<div><div class="id">' + i.id + '</div><div class="o">' + i.owner + '</div></div>' +
          '<div><div class="t">' + i.title + '</div>' +
          '<div class="m">怎麼測：' + i.method + '</div>' +
          '<div class="crit">算過：' + i.pass + '</div>' +
          (i.link ? '<a class="rv-go" href="' + i.link + '" target="_blank">開畫面去測 ↗</a>' : '') +
          '<div class="rv-ev"><input placeholder="證據：數字／觀察／日期" value="' + (s.ev || "").replace(/"/g, "&quot;") + '"></div></div>' +
          '<div class="rv-btns">' +
            '<button data-v="pass" aria-pressed="' + (s.v === "pass") + '">通過</button>' +
            '<button data-v="fail" aria-pressed="' + (s.v === "fail") + '">不通過</button>' +
            '<button data-v="na" aria-pressed="' + (s.v === "na") + '">不適用</button>' +
          '</div></div>';
      });
      html += '</section>';
    });
    document.getElementById("list").innerHTML = html;
    summary();
  }

  function summary() {
    var all = D.items.length;
    var pass = 0, fail = 0, na = 0;
    D.items.forEach(function (i) { var v = stateOf(i.id).v; if (v === "pass") pass++; else if (v === "fail") fail++; else if (v === "na") na++; });
    var todo = all - pass - fail - na;
    document.getElementById("progress").innerHTML =
      '<span>體驗層：<b>' + pass + '/' + (all - na) + '</b> 可適用通過</span>' +
      '<span>不通過 <b>' + fail + '</b></span>' +
      '<span>待驗 <b>' + todo + '</b></span>' +
      '<span>不適用 <b>' + na + '</b></span>' +
      '<span class="muted">規則層是自動的（23 條），這裡是體驗層</span>';
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".rv-btns button");
    if (!b) return;
    var id = b.closest(".rv-item").dataset.id;
    var cur = stateOf(id);
    cur.v = (cur.v === b.dataset.v) ? "pending" : b.dataset.v;
    saved[id] = cur;
    localStorage.setItem(KEY, JSON.stringify(saved));
    render();
  });

  document.addEventListener("input", function (e) {
    if (!e.target.matches(".rv-ev input")) return;
    var id = e.target.closest(".rv-item").dataset.id;
    var cur = stateOf(id);
    cur.ev = e.target.value;
    saved[id] = cur;
    localStorage.setItem(KEY, JSON.stringify(saved));
  });

  document.getElementById("copy").onclick = function () {
    var out = { generatedAt: new Date().toISOString(), items: {}, evidence: {} };
    D.items.forEach(function (i) { var s = stateOf(i.id); out.items[i.id] = s.v; if (s.ev) out.evidence[i.id] = s.ev; });
    var txt = "globalThis.REVIEW_REPORT = " + JSON.stringify(out, null, 2) + ";";
    navigator.clipboard && navigator.clipboard.writeText(txt);
    document.getElementById("hint").textContent = "已複製，貼進 assets/review-report.js 就會顯示在入口頁。";
  };

  document.getElementById("reset").onclick = function () {
    localStorage.removeItem(KEY); saved = {}; render();
  };

  render();
})();
