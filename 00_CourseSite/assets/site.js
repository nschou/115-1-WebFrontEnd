(function () {
  var data = window.GUIDE_DATA;
  var STORAGE = "course-guide-progress-v1";
  var state = { done: {} };
  try { state = JSON.parse(localStorage.getItem(STORAGE) || '{"done":{}}'); } catch (e) { state = { done: {} }; }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function docHref(file) {
    return /\.md$/i.test(file) ? "reader.html?file=" + encodeURIComponent(file) : file;
  }
  function stageById(id) { return data.stages.find(function (s) { return s.id === id; }) || data.stages[0]; }
  function currentId() {
    var match = location.hash.match(/stage-(\d{2})/);
    return match ? match[1] : data.stages[0].id;
  }
  function save() { localStorage.setItem(STORAGE, JSON.stringify(state)); }
  function doneCount() { return data.stages.filter(function (s) { return !!state.done[s.id]; }).length; }

  function renderNav(filter) {
    var nav = document.getElementById("stage-nav");
    var current = currentId();
    var query = (filter || "").trim().toLowerCase();
    var html = "";
    data.stages.forEach(function (s) {
      var haystack = [s.id, s.week, s.title, s.file, s.question, s.goal, s.prompt].join(" ").toLowerCase();
      if (query && haystack.indexOf(query) === -1) return;
      html += '<a class="stage-link ' + (s.id === current ? "active " : "") + (state.done[s.id] ? "done" : "") + '" href="#stage-' + s.id + '">' +
        '<span class="stage-num">' + (state.done[s.id] ? "✓" : s.id) + '</span>' +
        '<span><strong>' + esc(s.title) + '</strong><small>' + esc(s.week + " · " + s.file) + '</small></span></a>';
    });
    nav.innerHTML = html || '<div class="empty">找不到符合的階段。</div>';
  }

  function renderProgress() {
    var count = doneCount();
    document.getElementById("progress-count").textContent = count + " / " + data.stages.length;
    document.getElementById("progress-bar").style.width = (count / data.stages.length * 100) + "%";
  }

  function renderMap() {
    document.getElementById("map-strip").innerHTML = data.weeks.map(function (w) {
      var stages = data.stages.filter(function (s) { return s.week === w.id; });
      var target = stages[0] || data.stages[0];
      return '<a class="week-card" href="#stage-' + target.id + '"><strong>' + esc(w.id + "｜" + w.title) + '</strong><span>' + esc(w.range) + ' · ' + (stages.length ? stages.length + ' 個階段' : '先建立工作區') + '</span></a>';
    }).join("");
  }

  function renderStage() {
    var s = stageById(currentId());
    var previous = data.stages[data.stages.indexOf(s) - 1];
    var next = data.stages[data.stages.indexOf(s) + 1];
    var relations = (data.relations || []).filter(function (r) { return r.from === s.id || r.to === s.id; });
    var demoLinks = (data.demoLinks && data.demoLinks[s.id]) || [];
    var detail = document.getElementById("stage-detail");
    detail.id = "stage-detail";
    detail.innerHTML =
      '<div class="stage-header">' +
        '<div><span class="stage-kicker">' + esc(s.week + " · 階段 " + s.id) + '</span><h2>' + esc(s.title) + '</h2><p class="stage-question">' + esc(s.question) + '</p></div>' +
        '<button class="complete-btn ' + (state.done[s.id] ? "done" : "") + '" id="complete-stage" type="button">' + (state.done[s.id] ? "已完成 ✓" : "標記完成") + '</button>' +
      '</div>' +
      '<div class="stage-columns">' +
        '<div>' +
          infoBlock("本階段目標", '<p>' + esc(s.goal) + '</p>') +
          infoBlock("需要先準備", '<ul>' + s.inputs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>') +
          infoBlock("完成後產出", '<p>' + esc(s.outputs) + '</p>') +
          infoBlock("交給下一階段", '<p>' + esc(s.handoff) + '</p>') +
          infoBlock("學生常見卡關", '<ul>' + s.traps.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>') +
          renderSession(s) +
          '<div class="info-block"><h3>文件與工具</h3><div class="doc-links">' + s.docs.map(function (x) { return '<a class="doc-link" href="' + esc(docHref(x)) + '" target="_blank" rel="noopener">閱讀 ' + esc(x.split("/").pop()) + ' ↗</a>'; }).join("") + '</div></div>' +
        '</div>' +
        '<div class="prompt-box"><div class="prompt-top"><b>AI 參考 Prompt</b><button class="copy-btn" id="copy-prompt" type="button">複製 Prompt</button></div><pre id="prompt-text">' + esc(s.prompt) + '</pre><p class="prompt-note">複製後，請把 {{...}} 替換成自己的資料；先附上上游文件，再要求 AI 產生草稿。AI 的輸出必須人工檢查，不能直接當成正式文件。</p></div>' +
      '</div>' +
      '<div class="reference-grid">' +
        infoBlock("前後與相關節點", '<div class="reference-links">' + (relations.length ? relations.map(function (r) {
          var outgoing = r.from === s.id;
          var other = stageById(outgoing ? r.to : r.from);
          return '<a class="reference-link" href="#stage-' + other.id + '"><span>' + (outgoing ? "下游" : "上游") + '</span><b>' + esc(other.title) + '</b><small>' + esc(r.label) + '</small></a>';
        }).join("") : '<p class="muted">尚未建立跨節點參照。</p>') + '</div>') +
        infoBlock("示範專案快捷入口", '<div class="doc-links">' + (demoLinks.length ? demoLinks.map(function (x) {
          return '<a class="doc-link demo-link" href="' + esc(docHref(x.href)) + '" target="_blank" rel="noopener">' + esc(x.label) + ' ↗</a>';
        }).join("") : '<p class="muted">本階段尚無直接示範入口，請先看文件與工具。</p>') + '</div>') +
      '</div>' +
      '<div class="stage-footer">' + (previous ? '<a class="next-link" href="#stage-' + previous.id + '">← 上一階段：' + esc(previous.title) + '</a>' : '<span></span>') + (next ? '<a class="next-link" href="#stage-' + next.id + '">下一階段：' + esc(next.title) + ' →</a>' : '<span class="muted">已到課程最後一階段：封存學習與驗證證據</span>') + '</div>';

    document.getElementById("complete-stage").addEventListener("click", function () {
      state.done[s.id] = !state.done[s.id];
      save(); renderAll();
    });
    document.getElementById("copy-prompt").addEventListener("click", function () {
      var button = this;
      navigator.clipboard.writeText(s.prompt).then(function () {
        button.textContent = "已複製 ✓";
        setTimeout(function () { button.textContent = "複製 Prompt"; }, 1400);
      }).catch(function () {
        button.textContent = "請手動複製";
      });
    });
  }

  var WEEK_DOCS = {
    W1: ["01_W01_課程總覽", "W01"], W2: ["02_W02_市場與Persona", "W02"], W3: ["03_W03_CJM", "W03"],
    W4: ["04_W04_Blueprint", "W04"], W5: ["05_W05_物件決策與Design", "W05"], W6: ["06_W06_UX", "W06"],
    W7: ["07_W07_Spec", "W07"]
  };
  function renderSession(s) {
    var cfg = (window.GUIDE_SESSION || {})[s.id];
    if (!cfg) {
      var wd = WEEK_DOCS[s.week];
      if (!wd) return "";
      var dir = wd[0], wk = wd[1];
      return infoBlock("本堂課（本週教材）", '<div class="session-list">' +
        '<div class="session-row"><span class="sess-tag">講義</span><a class="doc-link" href="' + esc(docHref("../" + dir + "/00_" + wk + "_上課講義.md")) + '" target="_blank" rel="noopener">本週講義 ↗</a></div>' +
        '<div class="session-row"><span class="sess-tag">手冊</span><a class="doc-link" href="' + esc(docHref("../" + dir + "/00_" + wk + "_學生操作手冊.md")) + '" target="_blank" rel="noopener">本週操作手冊 ↗</a></div>' +
        '</div>');
    }
    var rows = [];
    if (cfg.units && cfg.units.length) {
      var ut = '<table class="session-table"><tr><th>單元</th><th>講次（講義／手冊）</th><th>前測</th><th>後測</th><th>作業</th></tr>';
      cfg.units.forEach(function (u) {
        var lec = u.lectures.map(function (l) {
          var base = "../90_技術與架構/" + l.folder + "/";
          return "講 " + l.no + " <a class=\"doc-link\" href=\"" + esc(docHref(base + "00_講義.md")) + "\" target=\"_blank\" rel=\"noopener\">講義</a> / <a class=\"doc-link\" href=\"" + esc(docHref(base + "00_學生操作手冊.md")) + "\" target=\"_blank\" rel=\"noopener\">手冊</a>";
        }).join("<br>");
        ut += '<tr><td>U' + u.no + '<br><span class="muted">' + esc(u.title) + '</span></td><td>' + lec + '</td>' +
          '<td><a class="doc-link sess-primary" href="' + esc(u.pre) + '">前測</a></td>' +
          '<td><a class="doc-link sess-primary" href="' + esc(u.post) + '">後測</a></td>' +
          '<td><a class="doc-link" href="' + esc(docHref(u.homework)) + '" target="_blank" rel="noopener">作業單 ↗</a></td></tr>';
      });
      ut += '</table>';
      if (cfg.extra && cfg.extra.length) {
        ut += '<div class="session-list">' + cfg.extra.map(function (e) {
          return '<div class="session-row"><span class="sess-tag">連結</span><a class="doc-link" href="' + esc(e.href) + '">' + esc(e.label) + '</a></div>';
        }).join("") + '</div>';
      }
      return infoBlock("6 個單元（每 2 講：前測 → 教學 → 後測 → 作業）", '<div class="session-lectures">' + ut + '</div>');
    }
    if (cfg.lectures && cfg.lectures.length) {
      var table = '<table class="session-table"><tr><th>講</th><th>講義</th><th>手冊</th></tr>';
      cfg.lectures.forEach(function (lec) {
        var base = "../90_技術與架構/" + lec.folder + "/";
        table += '<tr><td>' + lec.no + '</td>' +
          '<td><a class="doc-link" href="' + esc(docHref(base + "00_講義.md")) + '" target="_blank" rel="noopener">講義 ' + lec.no + ' ↗</a></td>' +
          '<td><a class="doc-link" href="' + esc(docHref(base + "00_學生操作手冊.md")) + '" target="_blank" rel="noopener">手冊 ' + lec.no + ' ↗</a></td></tr>';
      });
      table += '</table>';
      rows.push('<div class="session-lectures">' + table + '</div>');
    }
    if (cfg.pre) rows.push('<div class="session-row"><span class="sess-tag">前測</span><a class="doc-link sess-primary" href="' + esc(cfg.pre) + '">開始前測（不可使用 AI）</a></div>');
    (cfg.links || []).forEach(function (l) {
      rows.push('<div class="session-row"><span class="sess-tag">教材</span><a class="doc-link" href="' + esc(docHref(l.href)) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a></div>');
    });
    if (cfg.post) rows.push('<div class="session-row"><span class="sess-tag">後測</span><a class="doc-link sess-primary" href="' + esc(cfg.post) + '">開始後測（可使用 AI）</a></div>');
    if (cfg.homework) rows.push('<div class="session-row"><span class="sess-tag">作業</span><a class="doc-link" href="' + esc(docHref(cfg.homework)) + '" target="_blank" rel="noopener">本週作業單 ↗</a></div>');
    return infoBlock("本堂課（依序完成）", '<div class="session-list">' + rows.join("") + '</div>');
  }
  function infoBlock(title, body) { return '<div class="info-block"><h3>' + esc(title) + '</h3>' + body + '</div>'; }
  function applyView() {
    var home = currentId() === "00";
    var nodes = document.querySelectorAll(".home-only");
    for (var i = 0; i < nodes.length; i++) {
      if (home) nodes[i].removeAttribute("hidden");
      else nodes[i].setAttribute("hidden", "");
    }
  }
  function renderAll() {
    renderNav(document.getElementById("search").value);
    renderProgress();
    renderMap();
    renderStage();
    applyView();
  }

  document.getElementById("search").addEventListener("input", function () { renderNav(this.value); });
  document.getElementById("reset-progress").addEventListener("click", function () {
    if (!confirm("確定要清除網站上的學習進度嗎？")) return;
    state = { done: {} }; save(); renderAll();
  });
  window.addEventListener("hashchange", function () { renderAll(); document.getElementById("stage-detail").scrollIntoView({ behavior: "smooth", block: "start" }); });
  renderAll();
})();
