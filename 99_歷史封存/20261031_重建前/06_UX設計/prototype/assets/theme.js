/* theme.js — 主題切換（青綠／藍）
   用法：頁面載入 <script src=".../theme.js"></script> 即可，
   會自動把 tokens.css 換成 tokens.blue.css，並在 .devbar 注入按鈕。
   偏好存在 localStorage.theme。 */
(function () {
  var KEY = "theme";
  var BASE = "tokens.css";
  var BLUE = "tokens.blue.css";

  function link() {
    var ls = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < ls.length; i++) {
      if (/tokens(\.blue)?\.css$/.test(ls[i].getAttribute("href") || "")) return ls[i];
    }
    return null;
  }

  function apply(name) {
    var l = link();
    if (!l) return;
    var href = l.getAttribute("href") || BASE;
    var dir = href.slice(0, href.lastIndexOf("/") + 1);
    l.setAttribute("href", dir + (name === "blue" ? BLUE : BASE));
    try { localStorage.setItem(KEY, name); } catch (e) {}
    paint(name);
  }

  function paint(name) {
    var b = document.querySelector("[data-toggle-theme]");
    if (b) b.textContent = name === "blue" ? "主題：藍" : "主題：青綠";
  }

  function inject() {
    var bar = document.querySelector(".devbar") || document.querySelector("[data-theme-slot]");
    if (!bar || bar.querySelector("[data-toggle-theme]")) return;
    var b = document.createElement("button");
    b.setAttribute("data-toggle-theme", "");
    b.setAttribute("aria-pressed", "false");
    b.textContent = "主題：青綠";
    bar.appendChild(b);
    b.addEventListener("click", function () {
      var cur = link();
      var isBlue = cur && /tokens\.blue\.css$/.test(cur.getAttribute("href") || "");
      apply(isBlue ? "color" : "blue");
      b.setAttribute("aria-pressed", String(!isBlue));
    });
  }

  var saved = "color";
  try { saved = localStorage.getItem(KEY) || "color"; } catch (e) {}
  inject();
  if (saved === "blue") apply("blue");
})();
