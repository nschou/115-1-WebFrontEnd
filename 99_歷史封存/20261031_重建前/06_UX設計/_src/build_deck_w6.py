# -*- coding: utf-8 -*-
"""Build 第06週 UX 設計簡報。"""
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import copy

def C(h): return RGBColor.from_string(h)

TEAL   = C("134E4A")
TEALD  = C("0B3C49")
ORANGE = C("F97316")
INK    = C("0F172A")
MUTED  = C("475569")
LINE   = C("E2E8F0")
PANEL  = C("F1F5F9")
WHITE  = C("FFFFFF")
SUCCESS= C("10B981")
ERROR  = C("BA1A1A")
WARNB  = C("FFF7ED")

FONT = "Microsoft JhengHei"
MONO = "Consolas"

prs = Presentation()
prs.slide_width  = Inches(10)
prs.slide_height = Inches(5.625)
SW, SH = 10.0, 5.625
BLANK = prs.slide_layouts[6]

def slide(bg="FFFFFF"):
    s = prs.slides.add_slide(BLANK)
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
    r.fill.solid(); r.fill.fore_color.rgb = C(bg); r.line.fill.background()
    r.shadow.inherit = False
    return s

def rect(s, x, y, w, h, fill=None, line=None, shape=MSO_SHAPE.RECTANGLE, lw=1.0):
    sh = s.shapes.add_shape(shape, Inches(x), Inches(y), Inches(w), Inches(h))
    if fill is None:
        sh.fill.background()
    else:
        sh.fill.solid(); sh.fill.fore_color.rgb = fill
    if line is None:
        sh.line.fill.background()
    else:
        sh.line.color.rgb = line; sh.line.width = Pt(lw)
    sh.shadow.inherit = False
    if shape == MSO_SHAPE.ROUNDED_RECTANGLE:
        try: sh.adjustments[0] = 0.08
        except Exception: pass
    return sh

def tb(s, x, y, w, h, txt, size=14, bold=False, color=INK, font=FONT,
       align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=None, italic=False):
    box = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0; tf.margin_top = tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    for k, ln in enumerate(txt.split("\n")):
        p = tf.paragraphs[0] if k == 0 else tf.add_paragraph()
        p.alignment = align
        if spacing: p.line_spacing = spacing
        r = p.add_run(); r.text = ln
        f = r.font; f.name = font; f.size = Pt(size); f.bold = bold; f.italic = italic; f.color.rgb = color
    return box

def bullets(s, x, y, w, h, items, size=13, color=INK, gap=5, lead=1.25):
    box = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0; tf.margin_top = tf.margin_bottom = 0
    for i, it in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(gap); p.line_spacing = lead
        txt, bold = (it if isinstance(it, tuple) else (it, False))
        r = p.add_run(); r.text = txt
        r.font.name = FONT; r.font.size = Pt(size); r.font.bold = bold; r.font.color.rgb = color
    return box

def kicker(s, txt):
    tb(s, 0.55, 0.30, 6.0, 0.26, txt, size=10, bold=True, color=ORANGE)

def title(s, txt, sub=None):
    tb(s, 0.55, 0.56, 8.9, 0.55, txt, size=25, bold=True, color=TEAL)
    if sub:
        tb(s, 0.55, 1.12, 8.9, 0.3, sub, size=11.5, color=MUTED)
        y = 1.52
    else:
        y = 1.22
    rect(s, 0.55, y - 0.12, 8.9, 0.012, fill=LINE)
    return y + 0.08

def table(s, x, y, w, rows, ratios, size=10, head_h=0.30, row_h=0.29,
          head_fill=TEAL, first_bold=False, align_center_from=None):
    nrow, ncol = len(rows), len(rows[0])
    shape = s.shapes.add_table(nrow, ncol, Inches(x), Inches(y), Inches(w), Inches(head_h + row_h*(nrow-1)))
    t = shape.table
    tot = float(sum(ratios))
    for j, r in enumerate(ratios):
        t.columns[j].width = Inches(w*r/tot)
    t.rows[0].height = Inches(head_h)
    for i in range(1, nrow):
        t.rows[i].height = Inches(row_h)
    for i, row in enumerate(rows):
        for j, val in enumerate(row):
            cell = t.cell(i, j)
            cell.margin_left = Inches(0.06); cell.margin_right = Inches(0.05)
            cell.margin_top = Inches(0.02); cell.margin_bottom = Inches(0.02)
            cell.vertical_anchor = MSO_ANCHOR.MIDDLE
            cell.fill.solid()
            if i == 0:
                cell.fill.fore_color.rgb = head_fill
            else:
                cell.fill.fore_color.rgb = WHITE if i % 2 == 1 else C("F8FAFC")
            tf = cell.text_frame; tf.word_wrap = True
            p = tf.paragraphs[0]
            p.font.name = FONT
            p.font.size = Pt(size)
            if align_center_from is not None and j >= align_center_from:
                p.alignment = PP_ALIGN.CENTER
            r = p.add_run(); r.text = str(val)
            r.font.name = FONT; r.font.size = Pt(size)
            r.font.bold = (i == 0) or (first_bold and j == 0)
            r.font.color.rgb = WHITE if i == 0 else INK
    return t

def codebox(s, x, y, w, h, txt, size=9.5):
    rect(s, x, y, w, h, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    box = s.shapes.add_textbox(Inches(x+0.14), Inches(y+0.10), Inches(w-0.28), Inches(h-0.20))
    tf = box.text_frame; tf.word_wrap = True
    tf.margin_left = tf.margin_right = 0; tf.margin_top = tf.margin_bottom = 0
    for i, ln in enumerate(txt.split("\n")):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.line_spacing = 1.25
        r = p.add_run(); r.text = ln
        r.font.name = MONO; r.font.size = Pt(size); r.font.color.rgb = INK

def divider(num, en, zh, line):
    s = slide("0B3C49")
    tb(s, 0.55, 0.75, 8.9, 0.35, en, size=11, bold=True, color=ORANGE)
    tb(s, 0.55, 1.15, 8.9, 1.05, num, size=62, bold=True, color=C("1F5C57"))
    tb(s, 0.55, 2.15, 8.9, 0.75, zh, size=30, bold=True, color=WHITE)
    rect(s, 0.55, 3.05, 1.4, 0.045, fill=ORANGE)
    tb(s, 0.55, 3.30, 8.6, 0.6, line, size=12, color=C("CBD5E1"))
    return s

def timeline(items, y, h=0.62, x0=0.55, total=8.9, hi=None):
    n = len(items); gap = 0.06
    w = (total - gap*(n-1)) / n
    for i, it in enumerate(items):
        x = x0 + i*(w+gap)
        on = (hi is not None and i == hi)
        rect(s_cur, x, y, w, h, fill=TEAL if on else PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
        tb(s_cur, x+0.04, y+0.06, w-0.08, h-0.10, it,
           size=8.5 if n > 9 else 9.5, bold=on, color=WHITE if on else MUTED,
           align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 1 封面 ----------------
s = slide("0B3C49")
rect(s, 0, 0, SW, 0.10, fill=ORANGE)
tb(s, 0.75, 1.32, 8.5, 0.3, "網站前端程式設計 ｜ 115-1 ｜ 第 6 週", size=11, color=C("94A3B8"))
tb(s, 0.75, 1.76, 8.7, 0.62, "UX 設計：從角色任務", size=34, bold=True, color=WHITE)
tb(s, 0.75, 2.42, 8.7, 0.62, "到頁面結構", size=34, bold=True, color=WHITE)
rect(s, 0.75, 3.20, 1.6, 0.05, fill=ORANGE)
tb(s, 0.75, 3.46, 8.4, 0.55, "11 個介面 ｜ 狀態機 ｜ 頁面拆分機制 ｜ 遠距顯示", size=13, color=C("E2E8F0"))
tb(s, 0.75, 4.55, 8.4, 0.3, "v1.0（2026-10-26）｜ 前置：第 5 週 DESIGN.md（10 章）", size=9.5, color=C("94A3B8"))

# ---------------- 2 做什麼 ----------------
s = slide()
kicker(s, "1.1 定位")
y = title(s, "這一週做什麼、不做什麼", "第 5 週做「視覺語言」，第 6 週做「行為結構」")
rect(s, 0.55, 1.78, 4.30, 2.55, fill=C("E6F4F1"), shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.78, 1.92, 3.9, 0.28, "做", size=11, bold=True, color=TEAL)
bullets(s, 0.78, 2.28, 3.95, 1.95, [
  "盤點角色任務 → 螢幕清單",
  "定義狀態機與每頁狀態",
  "決定頁面怎麼切（含不切頁的解法）",
  "寫文案與互動規格",
  "產出 User Story ＋ AC"], size=10, gap=6)
rect(s, 5.15, 1.78, 4.30, 2.55, fill=C("F8FAFC"), line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.38, 1.92, 2.0, 0.28, "不做", size=11, bold=True, color=C("64748B"))
bullets(s, 5.38, 2.28, 3.95, 1.95, [
  "畫漂亮視覺（已在 DESIGN.md）",
  "寫程式（第 7 週起）",
  "選技術框架",
  "定資料庫欄位（交給 spec）"], size=10, gap=8, color=MUTED)
tb(s, 0.55, 4.50, 8.9, 0.30, "一句話：這一週產出的不是畫面，是「可被實作的結構」。", size=10.5, bold=True, color=ORANGE)

# ---------------- 3 三名詞 ----------------
s = slide()
kicker(s, "1.2 名詞")
y = title(s, "三個名詞先分清楚", "多數人把這三個混著用，於是「畫了線框就以為做完 UX」")
rows = [["名詞","是什麼","在哪一層","本週角色"],
        ["UX","結構與行為：有哪些頁、每頁做什麼、出錯怎麼辦","行為層","主角"],
        ["UI","視覺：顏色、字級、間距、元件長相","視覺層","已在 DESIGN.md 完成"],
        ["Wireframe","上面兩者的呈現格式（灰階版面）","不是層，是視圖","驗證工具"]]
table(s, 0.55, 1.85, 8.9, rows, [1.3, 4.2, 1.9, 2.1], size=10, row_h=0.60)
rect(s, 0.55, 4.18, 8.9, 0.72, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.30, 8.4, 0.48, "所以「第 6 週做 UX/UI 設計」是錯的：UI 已經做完，線框也不是階段。", size=11, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 4 五層 ----------------
s = slide()
kicker(s, "1.3 定位")
y = title(s, "五層定位：你現在在第 2 層", None)
rows = [["層","載體","回答什麼","完成於"],
        ["1 服務層","baseline","誰、在什麼階段、要什麼感受","第 2–5 週"],
        ["2 UX 層","UX.md","有哪些螢幕、每頁做什麼、什麼狀態","本週"],
        ["3 視覺層","DESIGN.md","同一個元件長什麼樣","第 5 週"],
        ["4 契約層","spec.md","誰要什麼價值、怎樣算做完","第 6 週末–第 7 週"],
        ["5 實作層","程式碼","用什麼技術做","第 7 週起"]]
t = table(s, 0.55, 1.78, 8.9, rows, [1.5, 1.8, 4.6, 2.2], size=10, row_h=0.44)
for j in range(4):
    cell = t.cell(2, j); cell.fill.solid(); cell.fill.fore_color.rgb = C("E6F4F1")

# ---------------- 5 divider ----------------
divider("01", "CHAPTER 01 · WHY", "為什麼從 Blueprint 切入", "CJM 只有顧客一條線；Blueprint 有 N 條，包含設施角色。")

# ---------------- 6 被推翻的假設 ----------------
s = slide()
kicker(s, "2.1 問題")
y = title(s, "一個被推翻的假設", "原本：CJM → 數位接觸點 → 頁面清單")
rows = [["來源","產出","問題"],
        ["CJM 的 7 個數位接觸點","首頁／菜單／確認／結帳／訂單狀態／通知／看板","全部是顧客端"],
        ["店員端","0 頁","但後台有「接單／確認／入櫃／收款」"],
        ["廚房端","0 頁","但「排順序／回報進度」是廚師在做"]]
table(s, 0.55, 1.85, 8.9, rows, [2.6, 4.0, 2.4], size=10, row_h=0.52)
tb(s, 0.55, 3.85, 8.9, 0.35, "這不是執行疏漏，是根源選錯。", size=15, bold=True, color=ERROR)
tb(s, 0.55, 4.28, 8.9, 0.55, "CJM 天生只有一條線。用它推整個系統，等於用「體驗的長度」推「系統的寬度」。", size=10, color=MUTED)

# ---------------- 7 三論證 ----------------
s = slide()
kicker(s, "2.2 論證")
y = title(s, "三個論證")
cards = [("論證 1","UX 的最小單位是「任務在一個介面上被完成」","體驗是連續的，任務是可切分的；介面只能照可切分的單位切。"),
         ("論證 2","介面數量 ＝ 角色任務的聯集","不是顧客旅程的長度。CJM 1 條線，Blueprint N 條線。"),
         ("論證 3","設施角色有任務，但沒有旅程","取餐櫃、看板會執行動作，卻沒有 Persona——CJM 永遠生不出看板。")]
for i,(k,h,d) in enumerate(cards):
    x = 0.55 + i*3.0
    rect(s, x, 1.85, 2.80, 2.20, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    rect(s, x, 1.85, 2.80, 0.06, fill=[TEAL, TEAL, ERROR][i])
    tb(s, x+0.20, 2.02, 2.4, 0.26, k, size=9, bold=True, color=ORANGE)
    tb(s, x+0.20, 2.32, 2.45, 0.75, h, size=11, bold=True, color=TEAL, spacing=1.25)
    tb(s, x+0.20, 3.18, 2.45, 0.75, d, size=9, color=MUTED, spacing=1.3)
tb(s, 0.55, 4.30, 8.9, 0.30, "只要系統裡有一個非人的角色，CJM 就不足以當 UX 的根源。", size=10, bold=True, color=ORANGE)

# ---------------- 8 主從 ----------------
s = slide()
kicker(s, "2.3 主從")
y = title(s, "不是二選一，是把主從倒過來")
rows = [["問題","由誰回答"],
        ["有哪些介面？","Blueprint（角色 × 任務）"],
        ["每個介面屬於哪一端？","Blueprint（可見線／內部互動線）"],
        ["每頁要做完什麼？","Blueprint（動作 ＋ 受詞）"],
        ["介面之間怎麼串？","Blueprint（5 個 handoff）"],
        ["會出什麼錯？","Blueprint（4 個例外）"],
        ["先做哪一個？","CJM（情緒曲線 −2）"],
        ["用什麼語氣？","CJM ＋ Persona"]]
table(s, 0.55, 1.78, 8.9, rows, [3.4, 5.5], size=10, row_h=0.36, first_bold=False)
tb(s, 0.55, 4.55, 8.9, 0.30, "CJM 沒有被淘汰，它降為「兩個特定問題的答案來源」。", size=10, color=MUTED)

# ---------------- 9 兩個新發現 ----------------
s = slide()
kicker(s, "2.4 轉折")
y = title(s, "選對根源，會逼出真實缺口")
rect(s, 0.55, 1.80, 4.30, 2.45, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.78, 1.94, 3.9, 0.28, "發現 1：設施介面要獨立設計", size=10, bold=True, color=TEAL)
rows1 = [["","手機","看板/KDS"],["距離","30–40cm","1.5–5m"],["輸入","觸控","看板無"],["資訊","可捲動","一屏定生死"]]
table(s, 0.78, 2.30, 3.85, rows1, [1.0, 1.4, 1.5], size=8.5, row_h=0.36, head_h=0.26)
rect(s, 5.15, 1.80, 4.30, 2.45, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.38, 1.94, 3.9, 0.28, "發現 2：主 DESIGN.md 缺一整層", size=10, bold=True, color=ERROR)
bullets(s, 5.38, 2.30, 3.85, 1.75, [
  "只有 web breakpoints（640／1024）",
  "內文 16px，遠距需要 32–96px",
  "沒有強光對比規則",
  "沒有 1920 橫式佈局"], size=9, gap=5, color=INK)
tb(s, 0.55, 4.38, 8.9, 0.30, "對策：另立 DESIGN-DISPLAY.md，只覆寫尺度，不重定義顏色。", size=10, bold=True, color=ORANGE)

# ---------------- 10 divider ----------------
divider("02", "CHAPTER 02 · INVENTORY", "盤點：角色任務 → 螢幕", "逐條原文照抄，不要改寫成功能名稱。")

# ---------------- 11 輸入 ----------------
s = slide()
kicker(s, "3.1 輸入")
y = title(s, "上游給了什麼")
rows = [["輸入","從哪來","用來做什麼"],
        ["角色表（含設施角色）","baseline §五","誰要做什麼"],
        ["服務藍圖（5 handoff、4 例外）","baseline §八","任務、端別、錯誤"],
        ["11 項決策","baseline §六","哪些功能存在（會員不做→沒有登入頁）"],
        ["CJM 情緒曲線","baseline §七","只決定優先序"],
        ["DESIGN.md / DESIGN-DISPLAY.md","第 5 週／本週","token、限制、遠距尺度"]]
table(s, 0.55, 1.80, 8.9, rows, [3.4, 2.3, 3.6], size=10, row_h=0.46)
tb(s, 0.55, 4.45, 8.9, 0.30, "前置作業是夠的；缺的兩項（非顧客端清單、MVP 範圍）正好是本週第一件事。", size=9.5, color=MUTED)

# ---------------- 12 角色任務 ----------------
s = slide()
kicker(s, "3.2 盤點")
y = title(s, "角色任務：逐條原文照抄", "一旦改寫成「功能名稱」，覆蓋率就算不出來")
rows = [["#","角色","動作（原文）","端別"],
        ["1","店員","接收訂單並確認內容","店員"],
        ["2","店員","通知廚師製作","店員"],
        ["3","廚師","安排製作順序","廚房"],
        ["4","廚師","回報製作進度","廚房"],
        ["5","店員","確認進度、通知顧客","店員"],
        ["6","店員","放置餐點至取餐櫃","店員"],
        ["7","店員","收錢","店員"],
        ["8","取餐櫃","通知顧客取餐號碼","設施"]]
table(s, 0.55, 1.72, 8.9, rows, [0.6, 1.4, 5.4, 1.5], size=9.5, row_h=0.315)

# ---------------- 13 端別與分類 ----------------
s = slide()
kicker(s, "3.3 分類")
y = title(s, "端別切分 ＋ 人工 vs 自動")
codebox(s, 0.55, 1.80, 4.20, 2.10,
"""┌─────────────────────────┐
│ 前台（顧客端）            │
├──── 可見線 ──────────────┤
│ 店員 / 廚房（平板、KDS）   │
├──── 內部互動線 ──────────┤
│ 支援系統（通常無介面）      │
└─────────────────────────┘""", size=8.5)
rows = [["類型","定義","落點"],
        ["人工作業","需要有人判斷或輸入","SCR（覆蓋率 100%）"],
        ["系統自動","由決策指定自動執行","spec 的系統行為"],
        ["無介面","SOP、實體流程","不在 UX 範圍"]]
table(s, 5.00, 1.85, 4.45, rows, [1.2, 2.1, 1.6], size=9, row_h=0.62)
tb(s, 0.55, 4.20, 8.9, 0.55, "不分類，學生會為了湊 100% 而替自動化動作硬造頁面 —— 那是「AI 味介面」的來源。", size=10, color=ERROR)

# ---------------- 14 覆蓋率 ----------------
s = slide()
kicker(s, "3.4 指標")
y = title(s, "覆蓋率這樣算")
tb(s, 0.55, 1.80, 2.6, 0.55, "100", size=48, bold=True, color=TEAL)
tb(s, 2.15, 2.02, 2.0, 0.30, "%", size=16, bold=True, color=TEAL)
tb(s, 0.55, 2.45, 4.0, 0.30, "人工動作覆蓋率", size=12, bold=True, color=INK)
rows = [["類別","數量","說明"],
        ["人工作業","11","全部有 SCR 承接"],
        ["系統自動","4","KDS 路由／推播／POS／號碼"],
        ["無介面","1","環境清潔（SOP）"]]
table(s, 4.60, 1.82, 4.85, rows, [1.3, 0.8, 2.7], size=9.5, row_h=0.50)
tb(s, 0.55, 3.60, 8.9, 0.75, "只算「人工」。若把自動化也算進去，就會逼學生替系統行為造頁面。", size=10, color=MUTED, spacing=1.3)


# ---------------- 15 divider ----------------
divider("03", "CHAPTER 03 · STATE", "訂單狀態機", "頁面狀態不是 UI 的四種樣子，是任務進度在介面上的投影。")

# ---------------- 16 主線 7 態 ----------------
s = slide()
kicker(s, "4.1 狀態機")
y = title(s, "主線 7 態", "先定狀態機，再談頁面；否則每頁各自發明狀態")
rows = [["狀態","代碼","觸發者","落在哪頁"],
        ["購物車草稿","S1 Draft","顧客","SCR-02／03"],
        ["已下單","S2 Received","顧客","SCR-03 → 05"],
        ["已確認","S3 Confirmed","店員","SCR-06"],
        ["製作中","S4 Preparing","廚師","SCR-07"],
        ["製作完成（待確認）","S5 Ready","廚師","SCR-07"],
        ["可取餐","S6 ReadyForPickup","店員","06／08／09／05"],
        ["已取餐","S7 PickedUp","店員","SCR-06／05"]]
table(s, 0.55, 1.78, 8.9, rows, [2.6, 2.3, 1.4, 2.6], size=9.5, row_h=0.36)

# ---------------- 17 例外 ----------------
s = slide()
kicker(s, "4.2 例外")
y = title(s, "例外 4 態：錯誤不是附錄，是設計的一部分")
rows = [["例外","代碼","觸發","落點"],
        ["品項缺貨","SX1","廚師確認缺貨","02 標記／03 提示／06 換品項"],
        ["付款失敗","SX2","支付回傳失敗","SCR-04 可重試"],
        ["通知未送達","SX3","推播失敗","SCR-05 降級（看板＋口頭）"],
        ["修改要求","SX4","顧客要求修改","SCR-06（製作前可改、中不可改）"]]
table(s, 0.55, 1.85, 8.9, rows, [1.7, 0.9, 2.4, 3.9], size=10, row_h=0.56)
tb(s, 0.55, 4.30, 8.9, 0.55, "不列例外，AI 只會生成 happy path —— 你現有的 25 個 code.html 就是證據。", size=10, color=MUTED)

# ---------------- 18 箭頭 ----------------
s = slide()
kicker(s, "4.3 關鍵規則")
y = title(s, "一條不能跳過的箭頭", "業務規則 → 狀態機 → UI 元件，同一個決定的三次投影")
boxes = [("S4 製作中","廚師按完成"),("S5 完成待確認","店員確認備妥"),("S6 可取餐","上看板、通知")]
for i,(h,d) in enumerate(boxes):
    x = 0.55 + i*3.02
    hi = (i == 1)
    rect(s, x, 1.90, 2.60, 1.05, fill=C("FFF7ED") if hi else PANEL, line=ERROR if hi else None, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.18, 2.02, 2.25, 0.32, h, size=12, bold=True, color=ERROR if hi else TEAL)
    tb(s, x+0.18, 2.42, 2.25, 0.30, d, size=9, color=MUTED)
    if i < 2:
        tb(s, x+2.62, 2.22, 0.38, 0.35, "▶", size=12, color=ORANGE, align=PP_ALIGN.CENTER)
rect(s, 0.55, 3.30, 8.9, 0.72, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.42, 8.4, 0.48, "S5 時【不上看板】、不通知顧客 —— 廚師完成 ≠ 顧客可以拿。", size=11, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)
tb(s, 0.55, 4.25, 8.9, 0.30, "這條業務規則直接決定 UI 必須是兩個狀態，不是一個。", size=10, color=MUTED)

# ---------------- 19 狀態×端 ----------------
s = slide()
kicker(s, "4.4 檢查")
y = title(s, "狀態 → 頁面：檢查有沒有洞")
rows = [["狀態","顧客","店員","廚房","設施"],
        ["S1 草稿","02／03","—","—","—"],
        ["S2 已下單","05","06","07","—"],
        ["S3 已確認","05","06","07","—"],
        ["S4–S5 製作","05","06","07","—"],
        ["S6 可取餐","05","06","—","08／09"],
        ["S7 已取餐","05","06","—","09"],
        ["SX1–SX4","02／03／04／05","06","—","—"]]
t = table(s, 0.55, 1.80, 8.9, rows, [2.6, 2.4, 1.5, 1.3, 1.5], size=9.5, row_h=0.42, align_center_from=1)
tb(s, 0.55, 4.55, 8.9, 0.30, "每一格空著都要能說明為什麼（例如：S1 在店員端不需要，因為訂單還沒成立）。", size=9.5, color=MUTED)

# ---------------- 20 divider ----------------
divider("04", "CHAPTER 04 · SPLIT", "頁面拆分機制", "頁面不是任務的容器，是狀態機的視圖。")

# ---------------- 21 二分圖 ----------------
s = slide()
kicker(s, "5.1 模型")
y = title(s, "任務 ↔ 頁面 是二分圖", "不是一對一。先拆掉「一個功能一頁」的預設")
codebox(s, 0.55, 1.82, 4.55, 1.70,
"""任務 T1 ──承接狀態─▶ 頁面 P1
任務 T1 ────────────▶ 頁面 P2
任務 T2 ────────────▶ 頁面 P1""", size=9.5)
rows = [["現象","本案實例"],
        ["一任務跨多頁","取餐 ＝ 05（知道去哪）＋ 08（找到號碼）＋ 09（開櫃）"],
        ["一頁多任務","SCR-06 ＝ 接單／備妥入櫃／收款"]]
table(s, 5.25, 1.90, 4.20, rows, [1.5, 2.7], size=9, row_h=0.66)
tb(s, 0.55, 3.75, 8.9, 0.30, "所以「頁面數量」不是設計目標，「切點位置」才是。", size=12, bold=True, color=ORANGE)

# ---------------- 22 兩句核心 ----------------
s = slide()
kicker(s, "5.2 核心")
y = title(s, "兩句話，記住就不會做錯")
rect(s, 0.55, 1.85, 4.30, 1.85, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 2.05, 3.9, 1.45, "頁面不是任務的容器，\n是「狀態機的視圖」。", size=17, bold=True, color=WHITE, spacing=1.35)
rect(s, 5.15, 1.85, 4.30, 1.85, fill=C("FFF7ED"), line=ORANGE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.40, 2.05, 3.9, 1.45, "切頁不是切資料，\n是切 episode。", size=17, bold=True, color=C("9A3412"), spacing=1.35)
tb(s, 0.55, 3.95, 8.9, 0.30, "episode ＝ 使用者心裡的一段事", size=9.5, bold=True, color=MUTED)
tb(s, 0.55, 4.28, 8.9, 0.55, "選主餐→選飲料→選加購 是同一段（切了三頁會失憶）；決定→確認→付款 是三段（該切）。", size=10, color=INK)

# ---------------- 23 四種容器 ----------------
s = slide()
kicker(s, "5.3 容器")
y = title(s, "拆分不是只有「換頁」：四種容器")
rows = [["容器","何時用","代價"],
        ["頁面","跨角色／跨裝置；需深連結","要處理返回與持久化"],
        ["分步","有先後依賴、同上下文、≤3 步","失去深連結"],
        ["彈窗／抽屜","補充性任務","阻斷感"],
        ["區塊","同一任務的次群組","長頁遮蔽"]]
table(s, 0.55, 1.80, 4.60, rows, [1.4, 2.0, 1.9], size=9, row_h=0.60)
codebox(s, 5.35, 1.80, 4.10, 2.55,
"""跨角色/裝置？      → 頁面
需深連結？          → 頁面
前置狀態不同？      → 頁面/同頁兩態
有先後依賴？
  ≤3 步             → 分步
  步驟多/需恢復      → 頁面
純補充？            → 彈窗/抽屜
次群組？            → 區塊""", size=8.2)
tb(s, 0.55, 4.48, 8.9, 0.30, "只會做「頁面」的人，會把 11 頁的系統做成 16 頁。", size=10, color=MUTED)

# ---------------- 24 三切兩合 ----------------
s = slide()
kicker(s, "5.4 判準")
y = title(s, "三條切線、兩條合線")
rows = [["類型","規則","例子"],
        ["切線 1","資料邊界：需要不同資料集","菜單 vs 結帳"],
        ["切線 2","狀態邊界：前置狀態不同","未下單 vs 已下單"],
        ["切線 3","端邊界：不同角色／裝置（最硬）","手機 vs 看板"],
        ["合線 1","同上下文：資料同、動作可並存","店員台的四個任務"],
        ["合線 2","不超載：決策數 ≤ 5–7","超過要分群"]]
table(s, 0.55, 1.85, 8.9, rows, [1.3, 4.6, 3.0], size=10, row_h=0.48)
tb(s, 0.55, 4.35, 8.9, 0.30, "三條切線裡，端邊界最硬（不可能合）；狀態邊界最軟（可用同頁切換解決）。", size=9.5, color=MUTED)

# ---------------- 25 頁面契約 ----------------
s = slide()
kicker(s, "5.5 頁面背後的狀態")
y = title(s, "頁面契約：一頁交出一張表", "沒有進入條件的頁面，就是一個沒有來源的斷點")
rows = [["欄位","例（SCR-03 下單確認）"],
        ["路由","/checkout"],
        ["讀取的全局狀態","session（可匿名）、cart（必非空）"],
        ["寫入的全局狀態","pendingOrder"],
        ["進入條件","cart 非空；否則導回 SCR-02"],
        ["離開條件","成功 → SCR-05；失敗 → 停本頁 error"],
        ["狀態機來源","ST-ORDER（S1–S3）"],
        ["資料需求","品項、金額、取餐時段（只寫名）"]]
table(s, 0.55, 1.82, 8.9, rows, [2.4, 6.5], size=9.5, row_h=0.38)

# ---------------- 26 全局狀態矩陣 ----------------
s = slide()
kicker(s, "5.6 矩陣")
y = title(s, "全局狀態 × 頁面", "把「登入與否、購物車空不空」變成可檢查的條件")
rows = [["全局狀態","型別","SCR-02","SCR-03","SCR-05","SCR-06"],
        ["session 未登入","會話","讀","讀（可匿名）","讀","—"],
        ["cart 空","資料","忽略","進入失敗","—","—"],
        ["orderStatus","交易","—","寫入","讀（7 態）","寫入"],
        ["notificationPermission","裝置","—","請求","讀（降級）","—"]]
table(s, 0.55, 1.85, 8.9, rows, [3.4, 1.2, 1.4, 1.6, 1.5, 1.4], size=9.5, row_h=0.55, align_center_from=2)
tb(s, 0.55, 4.40, 8.9, 0.30, "頁面狀態不是 UI 的四種樣子，是任務進度在介面上的投影。", size=10, bold=True, color=TEAL)

# ---------------- 27 divider ----------------
divider("05", "CHAPTER 05 · LIST", "11 個介面", "13 頁重算為 11 頁：合併不是縮水，是模型更正確。")

# ---------------- 28 13→11 ----------------
s = slide()
kicker(s, "6.1 重算")
y = title(s, "13 → 11：兩組合併", "改用「狀態機視圖」重新推，答案就變了")
rows = [["動作","原本","重算後","理由"],
        ["合併","取餐通知","→ SCR-05","通知只是深連結開同一頁，顯示 S6"],
        ["合併","出餐確認","→ SCR-06","入櫃是 S5→S6 的狀態轉換，長在訂單卡上"],
        ["保留","其餘 11 頁","—","端邊界或 episode 邊界"]]
table(s, 0.55, 1.85, 8.9, rows, [0.9, 1.9, 1.7, 4.4], size=9.5, row_h=0.55)
rect(s, 0.55, 3.85, 8.9, 0.72, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.97, 8.4, 0.48, "原本那兩頁各自維護一份同一張訂單的畫面 —— 正是「兩份事實」的開始。", size=10.5, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 29 11 頁 ----------------
s = slide()
kicker(s, "6.2 清單")
y = title(s, "11 個介面", "四端：顧客 5、店員 1、廚房 1、設施 2、老闆 2")
rows = [["ID","端","承接任務","深度"],
        ["SCR-01","顧客","決定吃什麼","L2"],
        ["SCR-02","顧客","決定、客製加購","L2"],
        ["SCR-03","顧客","客製、確認與取餐時間","L3"],
        ["SCR-04","顧客","付款","L3"],
        ["SCR-05","顧客","等多久、找櫃位","L3"],
        ["SCR-06","店員","接單、備妥入櫃、收款","L3"],
        ["SCR-07","廚房","排序與回報","L3"],
        ["SCR-08","設施","顯示可取餐號碼","L2"],
        ["SCR-09","設施","開櫃取餐","L1"],
        ["SCR-10","老闆","維護菜單","L1"],
        ["SCR-11","老闆","看營收","L1"]]
t = table(s, 0.55, 1.70, 5.60, rows, [0.9, 0.7, 2.6, 0.6], size=8.5, row_h=0.245, head_h=0.26)
for r in range(1, 12):
    if t.cell(r, 3).text == "L3":
        for j in range(4):
            t.cell(r, j).fill.solid(); t.cell(r, j).fill.fore_color.rgb = C("E6F4F1")
tb(s, 6.45, 1.85, 3.0, 0.30, "L3 ＝ MVP（5 頁）", size=11, bold=True, color=TEAL)
bullets(s, 6.45, 2.25, 3.0, 2.20, [
  "CJM 最低點沿線（03/04/05）",
  "交易核心（03/04）",
  "跨端同步（06/07）",
  "4 例外中 3 個在這"], size=9, gap=7, color=INK)
tb(s, 6.45, 4.45, 3.0, 0.30, "其餘 6 頁做 L1／L2", size=9, color=MUTED)

# ---------------- 30 任務矩陣 ----------------
s = slide()
kicker(s, "6.3 矩陣")
y = title(s, "任務 × 頁面：讀出兩件事", "完整矩陣見講義 §6.3；這裡只畫最有代表性的兩列")
rect(s, 0.55, 1.82, 4.30, 2.45, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.78, 1.96, 3.8, 0.28, "T6 取餐：一個任務，三頁", size=10, bold=True, color=TEAL)
for i, item in enumerate([("SCR-05", "知道去哪、還要等多久"), ("SCR-08", "在店內找到號碼"), ("SCR-09", "開櫃取餐")]):
    p_, d_ = item
    yy = 2.34 + i*0.60
    rect(s, 0.78, yy, 3.85, 0.48, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, 0.92, yy+0.08, 1.05, 0.32, p_, size=9.5, bold=True, color=ORANGE)
    tb(s, 2.02, yy+0.10, 2.5, 0.30, d_, size=9, color=INK)
rect(s, 5.15, 1.82, 4.30, 2.45, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.38, 1.96, 3.8, 0.28, "SCR-06：一頁，三個任務", size=10, bold=True, color=TEAL)
for i, item in enumerate([("T7 接單", "接收並確認內容"), ("T8 入櫃", "備妥放入取餐櫃"), ("T9 收款", "確認付款")]):
    t_, d_ = item
    yy = 2.34 + i*0.60
    rect(s, 5.38, yy, 3.85, 0.48, fill=C("FFF7ED"), shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, 5.52, yy+0.08, 1.15, 0.32, t_, size=9.5, bold=True, color=C("9A3412"))
    tb(s, 6.76, yy+0.10, 2.35, 0.30, d_, size=9, color=INK)
tb(s, 0.55, 4.45, 8.9, 0.55, "其餘 9 頁皆為單一任務。頁面數量從來不是目標，切點位置才是。", size=10, color=MUTED, spacing=1.3)

# ---------------- 31 不是頁面的 ----------------
s = slide()
kicker(s, "6.4 容器判定")
y = title(s, "這些「不是」頁面", "若都做成獨立頁，會從 11 頁膨脹到 16 頁")
rows = [["子任務","容器","理由"],
        ["客製化（去冰、蛋半熟）","抽屜","同上下文、補充性"],
        ["取餐櫃格號配對","彈窗","在 SCR-06 內完成"],
        ["菜單品項編輯","抽屜","在 SCR-10 內"],
        ["購物車檢視","抽屜","隨時可開、不中斷瀏覽"],
        ["付款方式選擇","分步（同頁）","有先後依賴、同上下文"]]
table(s, 0.55, 1.85, 8.9, rows, [3.4, 1.8, 3.7], size=10, row_h=0.42)
tb(s, 0.55, 4.30, 8.9, 0.30, "每一個新頁，都是一個新的斷點。", size=10, bold=True, color=ERROR)

# ---------------- 32 分級 ----------------
s = slide()
kicker(s, "6.5 範圍")
y = title(s, "MVP ＝ 深度分級，不是砍頁")
cards = [("L1","規格 ＋ 狀態表 ＋ 文案 ＋ 線框","10–15 分／頁"),
         ("L2","＋ 可運作 HTML（套 token）","30–40 分／頁"),
         ("L3","＋ 例外實作 ＋ 走查","60–75 分／頁")]
for i,(k,h,d) in enumerate(cards):
    x = 0.55 + i*3.02
    hi = (i == 2)
    rect(s, x, 1.85, 2.80, 1.55, fill=TEAL if hi else PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.20, 1.98, 2.3, 0.35, k, size=16, bold=True, color=WHITE if hi else TEAL)
    tb(s, x+0.20, 2.40, 2.45, 0.55, h, size=9, color=C("E2E8F0") if hi else INK, spacing=1.3)
    tb(s, x+0.20, 3.02, 2.45, 0.26, d, size=8.5, color=C("94A3B8") if hi else MUTED)
tb(s, 0.55, 3.70, 8.9, 0.55, "11 頁全部設計；只有 L3 的 5 頁做到底。", size=12, bold=True, color=TEAL)
tb(s, 0.55, 4.25, 8.9, 0.40, "範圍全開，深度分層 —— 這樣才練得到設施角色與遠距顯示。", size=9.5, color=MUTED)

# ---------------- 33 divider ----------------
divider("06", "CHAPTER 06 · CONTRACT", "狀態、文案、Story 與 AC", "先有狀態，才有 AC。")

# ---------------- 34 六態 ----------------
s = slide()
kicker(s, "7.1 頁面狀態")
y = title(s, "6 個狀態，缺一不可")
rows = [["狀態","要回答什麼","常見錯誤"],
        ["default","正常進來的樣子","—"],
        ["loading","資料還沒到時顯示什麼","只放轉圈，沒有文字"],
        ["empty","沒有資料時（空車、查無訂單）","直接顯示空白"],
        ["error","失敗時說哪一句、能不能重試","「錯誤！」不說明怎麼修"],
        ["success","完成後給什麼回饋","沒有明確終點"],
        ["interrupted","被例外打斷（缺貨／付款失敗／修改）","完全沒做"]]
table(s, 0.55, 1.85, 8.9, rows, [1.7, 4.3, 2.9], size=9.5, row_h=0.42)
tb(s, 0.55, 4.55, 8.9, 0.30, "元件狀態（hover／focus／disabled）屬第 8 章，不要混用。", size=9.5, color=MUTED)

# ---------------- 35 文案 ----------------
s = slide()
kicker(s, "7.2 文案")
y = title(s, "錯誤要幫人，不是罵人")
rows = [["情況","不要這樣寫","這樣寫"],
        ["沒選時間","錯誤！請輸入正確資料","請選取一個取餐時間，讓我們準時為你準備"],
        ["空購物車","無資料","你的購物車還是空的，先看看今天的套餐？"],
        ["付款失敗","交易失敗","付款沒有完成，可以換一種付款方式再試"],
        ["按鈕","確定","送出訂單"]]
table(s, 0.55, 1.85, 8.9, rows, [1.4, 2.9, 4.6], size=9.5, row_h=0.58)
tb(s, 0.55, 4.45, 8.9, 0.30, "規則：指出怎麼修／按鈕用動詞／按鈕 ≤6 字、錯誤 ≤30 字。", size=9.5, color=MUTED)

# ---------------- 36 Story vs 任務 ----------------
s = slide()
kicker(s, "8.1 關係")
y = title(s, "角色任務 vs User Story", "兩者都長成「誰做什麼」，但回答不同問題")
rows = [["","角色任務","User Story"],
        ["回答","誰必須做什麼、交給誰","誰想達成什麼、為什麼"],
        ["主體","人 或 設施","只有人"],
        ["完成","handoff 完成","使用者得到價值"]]
table(s, 0.55, 1.85, 4.40, rows, [0.9, 1.7, 1.8], size=9, row_h=0.62)
tb(s, 5.35, 1.90, 4.1, 0.28, "語言測試", size=10, bold=True, color=ORANGE)
tb(s, 5.35, 2.20, 4.1, 0.55, "把句子裡的「系統」換成「店員」，\n還讀得通嗎？", size=10.5, bold=True, color=TEAL, spacing=1.3)
rows2 = [["句子","判定"],["系統通知顧客進度","✅"],["系統呼叫推播 API","❌"]]
table(s, 5.35, 2.90, 4.10, rows2, [3.2, 0.9], size=9, row_h=0.40)
tb(s, 0.55, 4.25, 8.9, 0.30, "寫不出「以便」的，就是角色任務。", size=9.5, color=MUTED)

# ---------------- 37 AC ----------------
s = slide()
kicker(s, "8.2 反寫")
y = title(s, "從狀態表反寫 AC（SCR-05）", "狀態表最大的價值：逼你寫出「禁止型 AC」")
rows = [["狀態","AC"],
        ["success","When 送出成功，shall 顯示訂單號與預計時間"],
        ["loading","While 製作中，shall 顯示進度，不得顯示取餐號碼"],
        ["完成待確認","When 廚師標記完成，shall 仍顯示「製作中」"],
        ["可取餐","When 店員確認入櫃，shall 顯示號碼與櫃位並通知"],
        ["error","If 推播未送達，shall 提示看板並提供重新整理"]]
table(s, 0.55, 1.80, 8.9, rows, [1.9, 7.0], size=9.5, row_h=0.42)
rect(s, 0.55, 4.30, 8.9, 0.70, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.42, 8.4, 0.46, "第 3 條驗收的是「不可以做什麼」—— 這種 AC 靠 Story 推不出來。", size=10.5, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 38 divider ----------------
divider("07", "CHAPTER 07 · WRAP", "線框、遠距、課堂", "先有結構，才有線框；先有距離，才有字級。")

# ---------------- 39 線框 ----------------
s = slide()
kicker(s, "9.1 線框")
y = title(s, "線框的四條規則", "它驗證資訊層次與動線，不是美感")
bullets(s, 0.55, 1.88, 5.2, 2.30, [
  "只用灰階（一上色，討論就變成「顏色不好看」）",
  "用真實 token 尺寸（375px；標 space-lg 不標 px）",
  "必須畫狀態變體（只畫 happy path 等於沒畫）",
  "每個區塊標元件名（對應 DS-COMP）"], size=10.5, gap=10, color=INK)
rect(s, 6.00, 1.85, 3.45, 1.75, fill=C("FFF7ED"), line=ORANGE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 6.22, 1.98, 3.0, 0.28, "三秒測試", size=10, bold=True, color=ORANGE)
tb(s, 6.22, 2.30, 3.05, 1.10, "遮住文字只看版面，\n3 秒內能不能指出主 CTA？", size=10, color=C("9A3412"), spacing=1.35)
tb(s, 6.00, 3.80, 3.45, 0.55, "指不出來＝結構有問題，不是線框不好看。", size=8.5, color=MUTED, spacing=1.25)
tb(s, 0.55, 4.45, 5.2, 0.30, "缺的元件 → 回寫 DESIGN.md v1.1", size=9.5, bold=True, color=TEAL)

# ---------------- 40 遠距 ----------------
s = slide()
kicker(s, "10. 遠距顯示")
y = title(s, "字級由距離決定，不是憑感覺")
codebox(s, 0.55, 1.82, 4.20, 1.05,
"""可讀：字高 ≥ 距離 ÷ 200
掃視：字高 ≥ 距離 ÷ 100""", size=10)
rows = [["介面","距離","字級","輸入"],
        ["取餐櫃面板","1 m","32px","觸控＋鍵盤＋掃碼"],
        ["KDS","2 m","36px","觸控（可戴手套）"],
        ["看板","4 m","32–96px","無（純顯示）"]]
table(s, 5.05, 1.82, 4.45, rows, [1.05, 0.60, 0.90, 1.90], size=8, row_h=0.44)
tb(s, 0.55, 2.98, 4.25, 0.55, "55 吋：可讀 ≥ 20mm、號碼 ≥ 40mm\n1px ≈ 0.634mm → 32px／64px", size=9, color=MUTED, spacing=1.3)
rect(s, 0.55, 3.62, 8.9, 0.68, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.73, 8.4, 0.46, "同一個 96px：手機上是錯的，看板上是對的 —— 對錯由距離算出。", size=11, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)
tb(s, 0.55, 4.38, 8.9, 0.55, "遠距 ≠ 不可操作：只有看板不能點；KDS 與櫃檯面板都要能操作。\n驗收：把 1920 縮到手機寬度（1/5），還讀得出號碼。", size=9.5, color=ERROR)

# ---------------- 41 流程 ----------------
s = slide()
kicker(s, "11.1 課堂")
y = title(s, "課堂流程（180 分鐘）")
rows = [["時間","段落","產出"],
        ["0–20","為什麼從 Blueprint 切入","理解"],
        ["20–40","角色任務盤點 ＋ 端別切分","任務表"],
        ["40–55","訂單狀態機（7＋4）","ST-ORDER"],
        ["55–85","頁面拆分機制 ＋ 11 頁清單","SCR 表"],
        ["85–110","狀態表 ＋ 文案（L3 五頁）","ST／MSG"],
        ["110–135","Story ＋ AC（三明治）","US／AC"],
        ["135–165","線框（含狀態變體）","灰階圖"],
        ["165–180","走查與分享","指標"]]
table(s, 0.55, 1.72, 8.9, rows, [0.9, 5.6, 2.4], size=9.5, row_h=0.335)

# ---------------- 42 評分 ----------------
s = slide()
kicker(s, "11.2 評量")
y = title(s, "60 ／ 40：產出與指標分開算")
rows = [["大項","比重","子項"],
        ["A 產出完整性","60%","螢幕清單 15｜狀態與文案 15｜Story＋AC 15｜線框 15"],
        ["B 可驗證指標","40%","覆蓋率 15｜例外落點 10｜過載與斷點 15"]]
table(s, 0.55, 1.85, 8.9, rows, [1.8, 0.9, 6.2], size=9.5, row_h=0.72)
rect(s, 0.55, 3.72, 8.9, 0.95, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.82, 8.4, 0.20, "一條硬規則", size=9, bold=True, color=ERROR)
tb(s, 0.80, 4.06, 8.4, 0.55, "任何一頁缺「進入條件」→ 該頁不計分。\n因為它是一個沒有來源的頁面（斷點）。", size=10.5, bold=True, color=INK, spacing=1.3)

# ---------------- 43 核心一句話 ----------------
s = slide("0B3C49")
rect(s, 0, 0, SW, 0.10, fill=ORANGE)
tb(s, 0.75, 0.72, 8.5, 0.30, "本週核心", size=10, bold=True, color=ORANGE)
lines = ["CJM 告訴你顧客在哪裡痛；",
         "Blueprint 告訴你誰要動手。",
         "",
         "頁面不是任務的容器，是狀態機的視圖；",
         "切頁不是切資料，是切 episode。"]
yy = 1.20
for i, ln in enumerate(lines):
    if ln == "":
        yy += 0.16; continue
    tb(s, 0.75, yy, 8.6, 0.50, ln, size=16.5 if i < 2 else 14.5, bold=True,
       color=WHITE if i < 2 else C("E2E8F0"), spacing=1.25)
    yy += 0.56
rect(s, 0.75, 4.50, 1.4, 0.045, fill=ORANGE)
tb(s, 0.75, 4.70, 8.5, 0.40, "先有狀態，才有 AC；先有結構，才有線框。", size=11, color=C("94A3B8"))

# ---------------- notes ----------------
NOTES = {
1:"開場：這一週不做視覺，做結構。第 5 週的 DESIGN.md 已經是「字母與語法」，這週要寫「文章」。",
2:"強調左邊五件事、右邊四件不做；最容易誤解的是「以為要重新設計畫面」。",
3:"三個名詞分清楚，後面才不會有人說「線框階段」。",
4:"五層定位可以問：spec.md 屬於第幾層？答第 4 層。",
5:"章節頁。可以先問：如果沒有 Blueprint，店員端會怎麼被設計出來？",
6:"這一頁是整個方法論的起點：讓學生看到「7 個接觸點全在顧客端」的荒謬。",
7:"論證 3 是決定性的：設施角色沒有 Persona，CJM 永遠生不出看板。",
8:"主從表只需要記住最後兩列：優先序與語氣仍由 CJM 決定。",
9:"兩個新發現是「選對根源」的回報，不是額外工作。",
10:"章節頁。",
11:"輸入清單讓學生知道不需要重新研究，只是換一種讀法。",
12:"強調「原文照抄」：改成功能名稱，覆蓋率就算不出來。",
13:"人工 vs 自動這一頁很關鍵，避免學生替自動化造頁面。",
14:"100% 是針對 11 條人工動作；不是所有後台動作。",
15:"章節頁。",
16:"7 態要能背；後面所有狀態表都從這裡長出來。",
17:"例外不要當附錄，它是最容易被漏掉、也最影響體驗的部分。",
18:"這頁是全課最重要的一張圖：業務規則→狀態機→UI。",
19:"空白的格子要能解釋，這是最便宜的檢查法。",
20:"章節頁。",
21:"二分圖先建立直覺，後面才講規則。",
22:"兩句話請學生抄下來。",
23:"四種容器是為了避免「只會換頁」的反射動作。",
24:"端邊界最硬、狀態邊界最軟 —— 記住這條就不會亂切。",
25:"頁面契約＝設計完成的定義；沒有進入條件就是斷點。",
26:"全局狀態矩陣把口頭默契變成可檢查條件。",
27:"章節頁。",
28:"示範「模型換了答案就變」，這是方法論的價值。",
29:"11 頁要能對回 4 個端與 13 個任務。",
30:"矩陣讓學生自己發現 T6 跨 3 頁、SCR-06 承接 3 任務。",
31:"抽屜／彈窗不是偷懶，是避免製造新斷點。",
32:"MVP 是深度不是範圍；L3 五頁有明確理由。",
33:"章節頁。",
34:"頁面 6 態 vs 元件 5 態，混用會出現「整頁 disabled」。",
35:"文案用 before/after 對照最快，請學生現場改一句。",
36:"語言測試請現場做一次替換。",
37:"禁止型 AC 是這頁的重點：Story 推不出來，只有狀態表逼得出來。",
38:"章節頁。",
39:"線框只驗結構；三秒測試可以請學生互相測。",
40:"字級由距離算出，這是「有憑有據」最好的例子。",
41:"時間不足可拆兩週，但故事線不要拆。",
42:"60/40 的分法要說清楚：指標是可算的，不是印象分。",
43:"收尾：三句話，分別對應根源、拆分、順序。",
}
for i, sl in enumerate(prs.slides, 1):
    if i in NOTES:
        sl.notes_slide.notes_text_frame.text = NOTES[i]

# ---------------- footer ----------------
total = len(prs.slides._sldIdLst)
for i, sl in enumerate(prs.slides, 1):
    dark = (i in (1, 5, 10, 15, 20, 27, 33, 38, 43))
    col = C("64748B") if dark else C("94A3B8")
    tb(sl, 0.55, 5.22, 5.0, 0.22, "網站前端程式設計 ｜ 第 6 週 ｜ UX 設計", size=8, color=col)
    tb(sl, 8.6, 5.22, 0.9, 0.22, "%d / %d" % (i, total), size=8, color=col, align=PP_ALIGN.RIGHT)

out = r"G:\\AsusWebStorage\\2025\\00_Teaching\\115-1-csie@nuu\\網站前端程式設計\\06_UX設計\\09_第06週簡報_v1.pptx"
prs.save(out)
print("OK slides=%d" % total)
