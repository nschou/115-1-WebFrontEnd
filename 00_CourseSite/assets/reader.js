(function () {
  var params = new URLSearchParams(location.search);
  var requested = params.get("file");
  var titleNode = document.getElementById("doc-title");
  var pathNode = document.getElementById("doc-path");
  var statusNode = document.getElementById("reader-status");
  var article = document.getElementById("document");
  var rawLink = document.getElementById("raw-link");
  var copyLink = document.getElementById("copy-link");

  var extraFiles = [
    "../00_學生發布版/00_學生教材入口_GoogleDoc.md",
    "../00_課程中間回顧與思考框架.md"
  ];
  var allowed = new Set(extraFiles.concat(window.GUIDE_DATA.stages.flatMap(function (s) { return s.docs; }))
    .map(function (file) { return new URL(file, location.href).pathname; }));

  function setStatus(message, isError) {
    statusNode.textContent = message;
    statusNode.classList.toggle("error", !!isError);
  }
  function fail(message) {
    setStatus(message, true);
    titleNode.textContent = "無法開啟教材";
    article.innerHTML = "";
  }
  function escaped(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function resolveRequested(file) {
    if (!file) return null;
    var url;
    try { url = new URL(file, location.href); } catch (e) { return null; }
    if (url.origin !== location.origin || !allowed.has(url.pathname)) return null;
    return url;
  }
  function sourceLabel(url) {
    return decodeURIComponent(url.pathname.replace(/^\//, ""));
  }
  function configureMarked() {
    var renderer = new marked.Renderer();
    var defaultCode = renderer.code.bind(renderer);
    renderer.code = function (token, infostring) {
      var text = typeof token === "object" ? token.text : token;
      var lang = typeof token === "object" ? (token.lang || "") : (infostring || "");
      if (String(lang).trim().toLowerCase() === "mermaid") {
        return '<div class="mermaid-source">' + escaped(text) + "</div>";
      }
      return defaultCode(token, infostring);
    };
    return renderer;
  }
  function transformLinks(baseUrl) {
    article.querySelectorAll("a[href]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href || href[0] === "#" || /^(https?:|mailto:|javascript:)/i.test(href)) return;
      var target;
      try { target = new URL(href, baseUrl); } catch (e) { return; }
      if (target.origin !== location.origin || !allowed.has(target.pathname)) return;
      var rawPath = target.pathname + target.search + target.hash;
      link.href = "reader.html?file=" + encodeURIComponent(rawPath);
      link.target = "_self";
      link.removeAttribute("rel");
    });
  }
  async function renderMermaid() {
    var nodes = Array.from(article.querySelectorAll(".mermaid-source"));
    if (!nodes.length) return;
    if (!window.mermaid) throw new Error("Mermaid 載入失敗；請確認網路連線或 CDN 可用。");
    window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", themeVariables: { primaryColor: "#d9efeb", primaryTextColor: "#18212a", primaryBorderColor: "#087f73", lineColor: "#66727d", secondaryColor: "#fff4df", tertiaryColor: "#f4f7f8" } });
    var diagrams = [];
    nodes.forEach(function (source, index) {
      var wrap = document.createElement("div");
      wrap.className = "mermaid-wrap";
      var diagram = document.createElement("div");
      diagram.className = "mermaid";
      diagram.id = "mermaid-diagram-" + index;
      diagram.textContent = source.textContent;
      wrap.appendChild(diagram);
      source.replaceWith(wrap);
      diagrams.push(diagram);
    });
    await window.mermaid.run({ nodes: diagrams });
  }
  function renderPlainText(text, url) {
    article.innerHTML = "";
    var pre = document.createElement("pre");
    var code = document.createElement("code");
    code.textContent = text;
    pre.appendChild(code);
    article.appendChild(pre);
    pathNode.textContent = sourceLabel(url) + "（原始文字檔）";
  }
  async function load() {
    var url = resolveRequested(requested);
    if (!url) return fail("這個檔案不在閱讀器允許的教材清單中。請從課程網站的文件連結進入。 ");
    rawLink.href = url.href;
    pathNode.textContent = sourceLabel(url);
    try {
      var response = await fetch(url.href);
      if (!response.ok) throw new Error("HTTP " + response.status);
      var text = await response.text();
      var extension = url.pathname.split(".").pop().toLowerCase();
      if (extension !== "md") {
        titleNode.textContent = decodeURIComponent(url.pathname.split("/").pop());
        renderPlainText(text, url);
        setStatus("這是原始文字檔；Markdown 與 Mermaid 渲染只套用於 .md 文件。", false);
        return;
      }
      if (!window.marked || !window.DOMPurify) throw new Error("Markdown renderer 尚未載入；請確認網路連線或 CDN 可用。");
      var html = window.marked.parse(text, { renderer: configureMarked(), gfm: true, breaks: false, headerIds: false, mangle: false });
      article.innerHTML = window.DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
      transformLinks(url);
      await renderMermaid();
      var h1 = article.querySelector("h1");
      titleNode.textContent = h1 ? h1.textContent : decodeURIComponent(url.pathname.split("/").pop());
      setStatus("已渲染 Markdown；Mermaid 圖表會在圖表區塊中顯示。", false);
    } catch (error) {
      fail("文件載入或渲染失敗：" + error.message);
      console.error(error);
    }
  }
  copyLink.addEventListener("click", function () {
    navigator.clipboard.writeText(location.href).then(function () {
      copyLink.textContent = "已複製 ✓";
      setTimeout(function () { copyLink.textContent = "複製閱讀連結"; }, 1400);
    }).catch(function () { copyLink.textContent = "請手動複製網址"; });
  });
  load();
})();
