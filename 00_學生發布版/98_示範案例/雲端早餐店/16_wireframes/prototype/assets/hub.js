/* hub.js — 入口頁（先計算、再渲染；任何錯誤都會顯示在頁面上） */
(function () {
  var D  = globalThis.STORY_DATA    || null;
  var R  = globalThis.CHECKS_REPORT || null;
  var RD = globalThis.REVIEW_DATA   || null;
  var RR = globalThis.REVIEW_REPORT || null;

  function el(id) { return document.getElementById(id); }
  function show(msg) {
    var b = el("boot-error");
    if (b) { b.hidden = false; b.textContent = msg; }
  }

  function boot() {
    if (!D) { show("找不到 story-data.js（請確認 assets/ 下有這個檔）。"); return; }

    /* ---------- 先把所有數字算完 ---------- */
    var cat = D.acCatalog || [];
    var checks = D.checks || [];
    var autoIds = {};
    checks.forEach(function (c) { autoIds[c.id] = true; });
    var autoCount = cat.filter(function (c) { return autoIds[c.id]; }).length;
    var passed = R ? R.passed : 0;
    var ruleAll = R ? R.total : checks.length;

    var rvState = {};
    try { rvState = JSON.parse(localStorage.getItem("review-state-v1") || "{}"); } catch (e) { rvState = {}; }
    function rvOf(id) {
      if (rvState[id] && rvState[id].v) return rvState[id].v;
      return (RR && RR.items && RR.items[id]) || "pending";
    }
    var rvTotal = RD ? RD.items.length : 0;
    var rvPass = 0, rvFail = 0, rvNa = 0;
    (RD ? RD.items : []).forEach(function (i) {
      var v = rvOf(i.id);
      if (v === "pass") rvPass++;
      else if (v === "fail") rvFail++;
      else if (v === "na") rvNa++;
    });

    /* ---------- 統計 ---------- */
    el("stats").innerHTML = [
      ["畫面", 11], ["故事", D.stories.length], ["動作", D.actions.length],
      ["自動檢查", passed + " / " + ruleAll], ["AC 覆蓋", autoCount + " / " + cat.length]
    ].map(function (s) {
      return '<div class="stat"><b>' + s[1] + '</b><span>' + s[0] + '</span></div>';
    }).join("");

    el("report-time").textContent = R
      ? "（報告時間：" + new Date(R.generatedAt).toLocaleString() + "）"
      : "（還沒有報告，請在終端機執行 node verify-stories.mjs）";

    /* ---------- 四層檢查 ---------- */
  var CS = globalThis.CHECK_SUMMARY;
  var lyEl = el("layers");
  if (lyEl) {
    if (!CS) {
      lyEl.innerHTML = '<div class="ly-note">還沒有結果，請執行 <code>node check-all.mjs</code>。</div>';
    } else {
      lyEl.innerHTML = CS.layers.map(function (L) {
        return '<div class="ly-card ' + (L.ok ? "ly-ok" : "ly-bad") + '">' +
          '<span class="ly-tag">' + (L.ok ? "✓ 通過" : "✗ 未通過") + '</span>' +
          '<b>' + L.name + '</b>' +
          '<span class="muted">' + L.details.map(function (d) { return d.script; }).join("、") + '</span>' +
          '</div>';
      }).join("") +
      '<div class="ly-note">' + (CS.allOk ? '<b>四層全部通過</b>，可以進 spec.md。' : '<b>有層級未通過</b>，先修再往下。') + '</div>';
      if (el("layers-time")) el("layers-time").textContent = "（" + new Date(CS.generatedAt).toLocaleString() + "）";
    }
  }

  /* ---------- 兩層證據 ---------- */
    el("twolayer").innerHTML =
      '<div class="tl-card tl-rule"><span class="tl-tag">規則層</span><b>' + passed + ' / ' + ruleAll + '</b>' +
        '<span class="muted">自動斷言，做錯會紅</span></div>' +
        '<div class="tl-card tl-exp"><span class="tl-tag">體驗層</span><b>' + rvPass + ' / ' + (rvTotal - rvNa) + '</b>' +
          '<span class="muted">可適用走查' + (rvFail ? '，不通過 ' + rvFail + ' 項' : '') + '；N/A ' + rvNa + ' 項</span></div>' +
      '<div class="tl-note">' + (
        (passed === ruleAll && rvTotal && rvPass < rvTotal - rvNa)
          ? '<b>規則全綠，但仍有可適用體驗檢查未完成</b>——不能只看自動檢查。'
          : (rvTotal && rvPass === rvTotal - rvNa && !rvFail
            ? '<b>可適用的規則與體驗檢查都完成</b>；N/A 項目已在 validation 說明範圍。'
            : '規則層與體驗層都要過，才算完成。')
      ) + '</div>';

    /* ---------- 故事卡 ---------- */
    el("stories").innerHTML = D.stories.map(function (s) {
      var seg = function (p) { return p.split("-")[0] + "-" + p.split("-")[1]; };
      var path = s.path.map(function (p) {
        return '<a class="chip-s" href="' + p + '/index.html?story=' + s.id + '&mode=story">' + seg(p) + '</a>';
      }).join(" → ");
      var acs = s.ac.map(function (a) {
        return '<span class="chip-s' + (autoIds[a] ? ' cov-auto' : '') + '">' + a + (autoIds[a] ? ' ✓' : '') + '</span>';
      }).join("");
      var g = s.guard.map(function (a) { return '<span class="chip-s guard">🛡 ' + a + '</span>'; }).join("");
      return '<article class="story-card">' +
        '<div class="story-id">' + s.id + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<div class="chips">' + path + '</div>' +
        '<div class="chips">' + acs + g + '</div>' +
        '<a class="start" href="' + s.start + '/index.html?story=' + s.id + '&mode=story">開始走</a>' +
        '</article>';
    }).join("");

    /* ---------- 覆蓋矩陣 ---------- */
    var catMap = {};
    cat.forEach(function (c) { catMap[c.id] = c; });
    el("cov-summary").textContent = "（自動覆蓋 " + autoCount + " / " + cat.length + "，" +
      (cat.length ? Math.round(autoCount / cat.length * 100) : 0) + "%）";

    function chip(id) {
      var c = catMap[id] || { verify: "manual" };
      var cls = autoIds[id] ? "cov-auto" : (c.verify === "human" ? "cov-human" : "cov-manual");
      var lab = autoIds[id] ? "✓" : (c.verify === "human" ? "人" : "手");
      return '<span class="cov ' + cls + '" title="' + (c.title || "") + '">' + id.replace("AC-", "") + " " + lab + '</span>';
    }

    var crows = ['<tr><th>故事</th><th>路徑</th><th>AC</th><th>自動覆蓋</th></tr>'];
    D.stories.forEach(function (s) {
      var list = (s.ac || []).concat(s.guard || []);
      var uniq = [];
      list.forEach(function (x) { if (uniq.indexOf(x) === -1) uniq.push(x); });
      var got = uniq.filter(function (x) { return autoIds[x]; }).length;
      crows.push('<tr><td><b>' + s.id + '</b><br><span class="muted">' + s.title + '</span></td>' +
        '<td>' + s.path.map(function (p) { return p.split("-")[0] + "-" + p.split("-")[1]; }).join(" → ") + '</td>' +
        '<td>' + uniq.map(chip).join(" ") + '</td>' +
        '<td>' + got + ' / ' + uniq.length + (uniq.length ? '（' + Math.round(got / uniq.length * 100) + '%）' : '') + '</td></tr>');
    });
    el("coverage").innerHTML = crows.join("");

    var gaps = cat.filter(function (c) { return !autoIds[c.id]; });
    el("gaps").innerHTML = gaps.length
      ? '<h3>還缺自動化的 AC（' + gaps.length + ' 條）</h3><p>' +
        gaps.map(function (c) { return c.id + "（" + c.title + "）"; }).join("、") + '</p>'
      : '<h3>全部 AC 都有自動檢查</h3><p class="muted">規則層沒有缺口；體驗層請到走查台。</p>';

    /* ---------- 檢查表（可點「去驗」直接開稽核模式） ---------- */
    var rows = ['<tr><th>AC</th><th>畫面</th><th>狀態</th><th>檢查</th><th>結果</th><th>去驗</th></tr>'];
    (R ? R.checks : checks.map(function (c) {
      return { id: c.id, screen: c.screen, state: c.state, desc: c.desc, ok: null };
    })).forEach(function (c) {
      rows.push('<tr><td>' + c.id + '</td><td>' + c.screen + '</td><td>' + c.state + '</td><td>' +
        c.desc + '</td><td class="' + (c.ok === true ? "pass" : c.ok === false ? "fail" : "") + '">' +
        (c.ok === true ? "PASS" : c.ok === false ? "FAIL" : "—") + '</td>' +
        '<td><a class="start" href="' + c.screen + '/index.html?mode=audit">稽核</a></td></tr>');
    });
    el("checks").innerHTML = rows.join("");

    /* ---------- 動作表 ---------- */
    var arows = ['<tr><th>動作</th><th>畫面</th><th>類型</th><th>意圖</th><th>AC</th></tr>'];
    D.actions.forEach(function (a) {
      arows.push('<tr><td><code>' + a.id + '</code> ' + a.label + '</td><td>' + a.screen + '</td><td>' +
        a.kind + '</td><td>' + a.intent + '</td><td>' + ((a.ac || []).join(" ") || "—") + '</td></tr>');
    });
    el("actions").innerHTML = arows.join("");

    el("screens").textContent = "scr-01～11（11 頁）＋ scr-08 ＋ review.html";

    document.getElementById("toggle-mode").onclick = function () {
      var w = document.body.dataset.mode === "wire";
      document.body.dataset.mode = w ? "color" : "wire";
    };
  }

  try { boot(); }
  catch (e) { show("入口頁載入失敗：" + e.message + "（請回報這行訊息）"); }
})();
