(function () {
  var data = window.QUIZ_DATA || { sets: [] };
  var app = document.getElementById("app");
  var printRoot = document.getElementById("print-root");
  var params = new URLSearchParams(location.search);
  var setId = params.get("set");
  var set = data.sets.filter(function (s) { return s.id === setId; })[0];
  var answers = {};
  var startedAt = null;
  var timerId = null;
  var remaining = 0;
  var student = { sid: "", name: "" };
  var tokenInfo = { tokens: "", turns: "" };

  function esc(v) {
    return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmt(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }
  function nowText() {
    var d = new Date();
    function p(n) { return n < 10 ? "0" + n : "" + n; }
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate()) + " " + p(d.getHours()) + ":" + p(d.getMinutes()) + ":" + p(d.getSeconds());
  }
  function aiBadge() {
    return set.aiAllowed
      ? '<span class="badge ai-ok">本份可用 AI</span>'
      : '<span class="badge ai-no">本份不可使用 AI</span>';
  }

  function renderList() {
    var pres = data.sets.filter(function (s) { return s.kind === "pre"; });
    var posts = data.sets.filter(function (s) { return s.kind === "post"; });
    function cards(list) {
      return list.map(function (s) {
        return '<a class="quiz-card" href="quiz.html?set=' + encodeURIComponent(s.id) + '"><b>' + esc(s.title) + '</b><span>' + s.questions.length + ' 題 · ' + s.minutes + ' 分鐘 · ' + (s.aiAllowed ? "可用 AI" : "不可用 AI") + '</span></a>';
      }).join("");
    }
    app.innerHTML = '<h2>選擇測驗</h2>' +
      '<p class="muted">前測在課堂開始時做（不可使用 AI）；後測在下課前做（可用 AI）。交卷後產生 PDF，上傳 Teams。</p>' +
      '<h3>前測</h3><div class="quiz-list">' + cards(pres) + '</div>' +
      '<h3>後測</h3><div class="quiz-list">' + cards(posts) + '</div>';
  }

  function renderStart() {
    app.innerHTML =
      '<div class="quiz-head"><h2>' + esc(set.title) + '</h2>' + aiBadge() + '</div>' +
      '<p class="muted">' + esc(set.note || "") + '</p>' +
      '<div class="quiz-form">' +
      '<label>學號<input id="sid" autocomplete="off" placeholder="例如 B1130001"></label>' +
      '<label>姓名<input id="name" autocomplete="off" placeholder="你的姓名"></label>' +
      '</div>' +
      '<p class="warn">作答時間 ' + set.minutes + ' 分鐘；時間到自動交卷。重新整理會遺失答案。</p>' +
      '<button class="primary" id="start">開始作答</button>';
    document.getElementById("start").addEventListener("click", function () {
      var sid = document.getElementById("sid").value.trim();
      var name = document.getElementById("name").value.trim();
      if (!sid || !name) { alert("請先填學號與姓名"); return; }
      student = { sid: sid, name: name };
      startQuiz();
    });
  }

  function startQuiz() {
    startedAt = Date.now();
    remaining = set.minutes * 60;
    renderQuiz();
    timerId = setInterval(function () {
      remaining--;
      var t = document.getElementById("timer");
      if (t) {
        t.textContent = fmt(Math.max(0, remaining));
        if (remaining <= 60) t.classList.add("danger");
      }
      if (remaining <= 0) { clearInterval(timerId); timerId = null; submit(true); }
    }, 1000);
  }

  function renderQuiz() {
    var html = '<div class="quiz-head"><h2>' + esc(set.title) + '</h2><div class="timer" id="timer">' + fmt(remaining) + '</div></div>' + aiBadge();
    set.questions.forEach(function (q, i) {
      html += '<section class="q"><p class="q-text"><b>' + (i + 1) + '.</b> ' + esc(q.text);
      if (q.noAI) html += ' <span class="badge ai-no">此題不可使用 AI</span>';
      html += '</p>';
      if (q.type === "single") {
        q.options.forEach(function (op, k) {
          html += '<label class="opt"><input type="radio" name="' + esc(q.id) + '" value="' + k + '"> ' + esc(op) + '</label>';
        });
      } else {
        html += '<textarea rows="4" data-q="' + esc(q.id) + '" placeholder="寫下你的答案（條列即可）"></textarea>';
      }
      html += '</section>';
    });
    html += '<div class="quiz-actions"><button class="primary" id="submit">交卷</button></div>';
    app.innerHTML = html;
    app.querySelectorAll('input[type="radio"]').forEach(function (el) {
      el.addEventListener("change", function () { answers[el.name] = el.value; });
    });
    app.querySelectorAll("textarea").forEach(function (el) {
      el.addEventListener("input", function () { answers[el.dataset.q] = el.value; });
    });
    document.getElementById("submit").addEventListener("click", function () { submit(false); });
  }

  function submit(auto) {
    if (timerId) { clearInterval(timerId); timerId = null; }
    var used = startedAt ? Math.round((Date.now() - startedAt) / 1000) : set.minutes * 60;
    var html = '<h2>已交卷</h2><p class="muted">學號：' + esc(student.sid) + '｜姓名：' + esc(student.name) + '｜用時：' + fmt(used) + (auto ? "（時間到自動交卷）" : "") + '</p>';
    if (set.aiAllowed) {
      html += '<div class="quiz-form"><label>token 用量（看截圖填）<input id="tok" placeholder="例如 12345"></label><label>對話回合數<input id="turns" placeholder="例如 8"></label></div><p class="warn">請先截圖 token 用量頁面（含日期與模型）。</p>';
    }
    html += '<button class="primary" id="print">列印／另存 PDF</button> <button class="ghost" id="again">重新作答</button>';
    app.innerHTML = html;
    document.getElementById("print").addEventListener("click", function () {
      tokenInfo.tokens = (document.getElementById("tok") || {}).value || "";
      tokenInfo.turns = (document.getElementById("turns") || {}).value || "";
      buildPrint(used, auto);
      window.print();
    });
    document.getElementById("again").addEventListener("click", function () { location.reload(); });
  }

  function buildPrint(used, auto) {
    var html = '<div class="sheet"><h1>' + esc(set.title) + '</h1>' +
      '<table class="meta"><tr><td>學號</td><td>' + esc(student.sid) + '</td><td>姓名</td><td>' + esc(student.name) + '</td></tr>' +
      '<tr><td>交卷時間</td><td>' + nowText() + '</td><td>用時</td><td>' + fmt(used) + (auto ? "（自動交卷）" : "") + '</td></tr>' +
      '<tr><td>AI 使用</td><td>' + (set.aiAllowed ? "允許" : "不允許") + '</td><td>token／回合</td><td>' + esc(tokenInfo.tokens || "—") + '／' + esc(tokenInfo.turns || "—") + '</td></tr></table>';
    set.questions.forEach(function (q, i) {
      html += '<div class="pq"><p><b>' + (i + 1) + '.</b> ' + esc(q.text) + (q.noAI ? "（此題不可使用 AI）" : "") + '</p>';
      if (q.type === "single") {
        html += '<ul class="opts">';
        q.options.forEach(function (op, k) {
          var picked = String(answers[q.id]) === String(k);
          html += '<li class="' + (picked ? "picked" : "") + '">' + (picked ? "☑" : "☐") + ' ' + esc(op) + '</li>';
        });
        html += '</ul>';
      } else {
        html += '<p class="ans">' + (answers[q.id] ? esc(answers[q.id]).replace(/\n/g, "<br>") : "（未作答）") + '</p>';
      }
      html += '</div>';
    });
    html += '<p class="foot">上傳 Teams 作業區，檔名：' + esc(set.id) + '_學號_姓名.pdf</p></div>';
    printRoot.innerHTML = html;
  }

  if (!set) {
    if (setId) app.innerHTML = '<p>找不到這份測驗：' + esc(setId) + '</p><p><a href="quiz.html">回測驗列表</a></p>';
    else renderList();
  } else renderStart();
})();
