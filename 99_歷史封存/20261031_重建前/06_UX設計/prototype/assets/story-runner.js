/* ===========================================================
   story-runner.js — 把「可點」升級成「可查 / 可驗」
   用法：
     ?story=US-09&mode=story    只走高亮這條故事
     ?mode=audit                列出本頁動作與 AC，可執行檢查
   =========================================================== */
(function () {
  var D = globalThis.STORY_DATA;
  if (!D) return;

  var q = new URLSearchParams(location.search);
  var mode = q.get("mode") || "color";
  var storyId = q.get("story");
  var screen = (location.pathname.replace(/\\/g, "/").split("/").slice(-2)[0] || "");

  /* 通知模擬：讓「不得通知」可以被斷言 */
  globalThis.__notify = globalThis.__notify || { sent: 0, send: function () { this.sent++; } };

  function actionsFor(sc) {
    return D.actions.filter(function (a) { return a.screen === sc; });
  }
  function checksFor(sc) {
    return D.checks.filter(function (c) { return c.screen === sc; });
  }

  /* ---------- 面板 ---------- */
  var panel = document.createElement("div");
  panel.className = "sr-panel";
  panel.hidden = true;
  document.body.appendChild(panel);

  function openPanel(html) {
    panel.innerHTML = '<button class="sr-close" aria-label="關閉">×</button>' + html;
    panel.hidden = false;
    panel.querySelector(".sr-close").onclick = function () { panel.hidden = true; };
  }

  /* ---------- 提示條 ---------- */
  function toast(msg) {
    var d = document.createElement("div");
    d.className = "sr-toast";
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function () { d.classList.add("out"); }, 350);
    setTimeout(function () { d.remove(); }, 700);
  }

  /* ---------- 每個可點元件都掛上「會發生什麼」 ---------- */
  document.querySelectorAll("[data-action]").forEach(function (el) {
    var def = D.actions.filter(function (a) { return a.id === el.dataset.action; })[0];
    if (!def) return;
    var note = (D.notes && D.notes[def.id]) || def.intent;
    el.setAttribute("title", note);
    el.setAttribute("aria-description", note);
  });

  /* ---------- 點擊攔截 ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]");
    if (!el) return;
    var def = D.actions.filter(function (a) { return a.id === el.dataset.action; })[0];
    if (!def) return;
    e.preventDefault();

    var note = (D.notes && D.notes[def.id]) || def.intent;

    /* ① 外部系統：不跳頁，先說明會發生什麼，再由使用者選結果 */
    if ((D.external || []).indexOf(def.id) >= 0) {
      openPanel(
        "<h3>" + def.label + "（外部頁面）</h3>" +
        "<p class='sr-note'>" + note + "</p>" +
        "<p><b>會改什麼</b></p><ul>" + def.changes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
        "<p><b>驗收條件</b></p><ul>" + def.ac.map(function (id) {
          var c = D.checks.filter(function (x) { return x.id === id; })[0];
          return "<li><b>" + id + "</b> " + (c ? c.desc : "") + "</li>";
        }).join("") + "</ul>" +
        "<p class='sr-note'>原型不串接真實金流，請選擇模擬結果：</p>" +
        "<div class='sr-choices'><button data-out='success'>模擬付款成功</button>" +
        "<button data-out='error'>模擬付款失敗</button></div>"
      );
      panel.querySelectorAll("[data-out]").forEach(function (b) {
        b.onclick = function () {
          var out = b.dataset.out;
          panel.hidden = true;
          if (out === "success" && def.next) {
            location.href = "../" + def.next + "/index.html?state=default&mode=" + mode + (storyId ? "&story=" + storyId : "");
          } else if (out === "error") {
            document.body.dataset.state = "error";
            toast("付款沒有完成：留在本頁，可重試或換方式");
          }
        };
      });
      return;
    }

    /* ② 內部跳頁：先顯示要去哪，再跳 */
    if (def.kind === "nav") {
      toast("→ " + note);
      setTimeout(function () {
        location.href = "../" + def.next + "/index.html?state=default&mode=" + mode + (storyId ? "&story=" + storyId : "");
      }, 450);
      return;
    }

    /* ③ 改資料：顯示說明 → 進入 loading（按鈕消失）→ 計時後套用 */
    var dur = (D.durations && D.durations[def.id]) || 1200;
    openPanel(
      "<h3>" + def.label + "</h3>" +
      "<p class='sr-note'>" + note + "</p>" +
      "<p><b>會改什麼</b></p><ul>" + def.changes.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul>" +
      "<p><b>驗收條件</b></p><ul>" + def.ac.map(function (id) {
        var c = D.checks.filter(function (x) { return x.id === id; })[0];
        return "<li><b>" + id + "</b> " + (c ? c.desc : "") + "</li>";
      }).join("") + "</ul>" +
      (def.notify === false ? "<p class='sr-guard'>🛡 這個動作<b>不會</b>發出顧客通知</p>" : "") +
      "<p class='sr-progress'>處理中…（" + (dur / 1000) + " 秒，按鈕已停用）</p>"
    );

    document.body.dataset.state = "loading";
    document.querySelectorAll("[data-action]").forEach(function (b) {
      b.setAttribute("aria-disabled", "true");
      b.style.pointerEvents = "none";
      b.style.opacity = ".5";
    });

    setTimeout(function () {
      document.querySelectorAll("[data-action]").forEach(function (b) {
        b.removeAttribute("aria-disabled");
        b.style.pointerEvents = "";
        b.style.opacity = "";
      });
      if (def.next) {
        location.href = "../" + def.next + "/index.html?state=default&mode=" + mode + (storyId ? "&story=" + storyId : "");
      } else if (def.applyState) {
        document.body.dataset.state = def.applyState;
        panel.hidden = true;
        toast("完成：" + note);
      } else {
        panel.hidden = true;
      }
    }, dur);
  });

  /* ---------- 檢查執行 ---------- */
  function runChecks() {
    var out = [];
    checksFor(screen).forEach(function (c) {
      var prev = document.body.dataset.state;
      document.body.dataset.state = c.state;
      var ok = evalCheck(c.check);
      document.body.dataset.state = prev;
      out.push({ id: c.id, ok: ok, desc: c.desc });
    });
    if (screen === "scr-07-kds") {
      document.body.dataset.state = "success";
      var btn = document.querySelector('[data-action="kds-complete"]');
      if (btn) btn.click();
      panel.hidden = true;
      var ok = globalThis.__notify.sent === 0;
      out.push({ id: "AC-12·通知", ok: ok, desc: "完成後通知次數應為 0（實際 " + globalThis.__notify.sent + "）" });
      document.body.dataset.state = "default";
    }
    return out;
  }

  function evalCheck(chk) {
    var root = document.querySelector(".app") || document.body;
    function hasSel(sel) { return !!root.querySelector(sel); }
    var txt = root.textContent || "";
    if (chk.hasAll) return chk.hasAll.every(hasSel);
    if (chk.notHas) return chk.notHas.every(function (s) { return !hasSel(s); });
    if (chk.containsText) return txt.indexOf(chk.containsText) !== -1;
    if (chk.notContainsText) return txt.indexOf(chk.notContainsText) === -1;
    if (chk.all) return chk.all.every(evalCheck);
    if (chk.orderAscText) {
      var re = new RegExp(chk.orderAscText, "g");
      var vals = txt.match(re) || [];
      for (var i = 1; i < vals.length; i++) if (vals[i] < vals[i - 1]) return false;
      return vals.length >= 2;
    }
    return false;
  }

  /* ---------- 故事列／稽核列 ---------- */
  if (mode === "audit") {
    var rows = actionsFor(screen).map(function (a) {
      return "<li><b>" + a.id + "</b>　" + a.label + "　<span class='sr-ac'>" + a.ac.join(" / ") + "</span></li>";
    }).join("");
    var bar = document.createElement("div");
    bar.className = "sr-bar";
    bar.innerHTML = "<strong>稽核</strong><span>" + screen + "</span><span class='spacer'></span>" +
      "<button id='sr-run'>執行檢查</button>";
    document.body.insertBefore(bar, document.body.firstChild);
    document.getElementById("sr-run").onclick = function () {
      var res = runChecks();
      var pass = res.filter(function (r) { return r.ok; }).length;
      openPanel("<h3>檢查結果 " + pass + " / " + res.length + "</h3><ul>" +
        res.map(function (r) {
          return "<li class='" + (r.ok ? "sr-pass" : "sr-fail") + "'>" + (r.ok ? "PASS" : "FAIL") +
            " <b>" + r.id + "</b> " + r.desc + "</li>";
        }).join("") + "</ul>");
    };
    openPanel("<h3>本頁動作</h3><ul>" + (rows || "<li>（本頁沒有定義動作）</li>") + "</ul>");
  }

  if (storyId) {
    var st = D.stories.filter(function (s) { return s.id === storyId; })[0];
    if (st) {
      var idx = st.path.indexOf(screen);
      var nav = document.createElement("div");
      nav.className = "sr-bar";
      nav.innerHTML = "<strong>" + st.id + "</strong><span>" + st.title + "</span>" +
        "<span class='spacer'></span><span>" + (idx >= 0 ? "第 " + (idx + 1) + "／" + st.path.length + " 步" : "不在這條路徑") + "</span>";
      document.body.insertBefore(nav, document.body.firstChild);
      document.querySelectorAll("[data-action]").forEach(function (el) {
        var def = D.actions.filter(function (a) { return a.id === el.dataset.action; })[0];
        if (def && def.ac.some(function (id) { return st.ac.indexOf(id) !== -1; })) {
          el.classList.add("sr-hot");
        } else {
          el.classList.add("sr-dim");
        }
      });
    }
  }
})();
