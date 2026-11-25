// 練習用：刻意放在 head、沒有 defer，會阻塞解析
const orders = [
  { id: "1042", status: "製作完成（待店員確認）", pickup: null },
  { id: "1043", status: "可取餐", pickup: "A-1043" },
  { id: "1044", status: "製作中", pickup: null },
  { id: "1046", status: "已取餐", pickup: "A-1046" }
];

function render() {
  const list = document.getElementById("list");
  list.innerHTML = orders.map((o) => `
    <article class="card">
      <div><b>#${o.id}</b> <span class="badge">${o.status}</span></div>
      <div class="muted">取餐號碼：${o.pickup ?? "尚未提供"}</div>
    </article>`).join("");
}

// 模擬載入延遲
setTimeout(render, 800);
