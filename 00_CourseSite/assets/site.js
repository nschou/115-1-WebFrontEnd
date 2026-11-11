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
          '<div class="info-block"><h3>教材與工具</h3><div class="doc-links">' + s.docs.map(function (x) { return '<a class="doc-link" href="' + esc(docHref(x)) + '" target="_blank" rel="noopener">閱讀 ' + esc(x.split("/").pop()) + ' ↗</a>'; }).join("") + '</div></div>' +
        '</div>' +
        '<div class="prompt-box"><div class="prompt-top"><b>AI 參考 Prompt</b><button class="copy-btn" id="copy-prompt" type="button">複製 Prompt</button></div><pre id="prompt-text">' + esc(s.prompt) + '</pre><p class="prompt-note">複製後，請把 {{...}} 替換成自己的資料；先附上上游文件，再要求 AI 產生草稿。AI 的輸出必須人工檢查，不能直接當成正式文件。</p></div>' +
      '</div>' +
      '<div class="stage-footer">' + (previous ? '<a class="next-link" href="#stage-' + previous.id + '">← 上一階段：' + esc(previous.title) + '</a>' : '<span></span>') + (next ? '<a class="next-link" href="#stage-' + next.id + '">下一階段：' + esc(next.title) + ' →</a>' : '<span class="muted">已到最後一階段：接續 SpecKit</span>') + '</div>';

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

  function infoBlock(title, body) { return '<div class="info-block"><h3>' + esc(title) + '</h3>' + body + '</div>'; }
  function renderAll() {
    renderNav(document.getElementById("search").value);
    renderProgress();
    renderMap();
    renderStage();
  }

  document.getElementById("search").addEventListener("input", function () { renderNav(this.value); });
  document.getElementById("reset-progress").addEventListener("click", function () {
    if (!confirm("確定要清除網站上的學習進度嗎？")) return;
    state = { done: {} }; save(); renderAll();
  });
  window.addEventListener("hashchange", function () { renderAll(); document.getElementById("stage-detail").scrollIntoView({ behavior: "smooth", block: "start" }); });
  renderAll();
})();
