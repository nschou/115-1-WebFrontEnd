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


def footer(s, n, total):
    tb(s, 0.55, 5.22, 6.0, 0.22, "網站前端程式設計 ｜ 第 6 週 ｜ UX 設計 v2", size=8.5, color=MUTED)
    tb(s, 8.20, 5.22, 1.25, 0.22, str(n) + " / " + str(total), size=8.5, color=MUTED, align=PP_ALIGN.RIGHT)

TOTAL = 26
n = 0

# 1 封面
s = slide(); n += 1
kicker(s, "第 6 週 ｜ UX 設計 (v2)")
tb(s, 0.55, 1.55, 8.9, 1.0, "從任務到 SCR", size=42, bold=True, color=TEAL)
tb(s, 0.55, 2.70, 8.9, 0.4, "SCR 不是畫出來的，是長出來的", size=14, color=MUTED)
rect(s, 0.55, 3.40, 3.2, 0.05, fill=ORANGE)
tb(s, 0.55, 3.65, 8.9, 0.6, "任務句 → 元素 → 資訊規格 → 線框 → SCR → AC", size=12, color=INK)
footer(s, n, TOTAL)

# 2 地圖
s = slide(); n += 1
kicker(s, "0. 位置")
y = title(s, "你在整條鏈的中段", "第 5 週給你任務與物件；本週把介面長出來")
rect(s, 0.55, 1.72, 8.9, 2.1, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 1.88, 8.3, 1.85,
   "W5  任務句七格 ／ 物件 ／ 資訊流 ／ 決策 ／ DESIGN.md\n"
   "W6  ▸ 元素 → 資訊規格 → 線框 → SCR → US ／ AC ／ 四層檢查\n"
   "W7  spec.md（收斂）\n"
   "W8+ plan.md（技術規劃）", size=11, color=INK, spacing=1.55)
tb(s, 0.55, 4.05, 8.9, 0.5, "本週最常犯的錯：直接開編輯器畫圖。順序反了。", size=11, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 3 三個名詞
s = slide(); n += 1
kicker(s, "1. 名詞")
y = title(s, "三個名詞先分清楚")
rows = [["名詞", "是什麼", "載體"],
        ["資訊規格", "有哪些元素、六態、互動、文案", "README ＋ elements"],
        ["線框", "HTML 結構，元素依決策順序排", "index.html ＋ screen.css"],
        ["tokens", "顏色／字級／間距／圓角", "tokens.css"],
        ["SCR", "上面三件的組合", "同一編號、同一資料夾"]]
table(s, 0.55, y, 8.9, rows, [1.7, 4.6, 2.6], size=10, row_h=0.48, first_bold=True)
footer(s, n, TOTAL)

# 4 SCR 公式
s = slide(); n += 1
kicker(s, "1. 定義")
y = title(s, "SCR ＝ 資訊規格 ＋ 線框 ＋ 樣式")
rect(s, 0.55, 1.80, 2.55, 1.0, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.70, 2.05, 2.25, 0.5, "資訊規格", size=14, bold=True, color=TEAL, align=PP_ALIGN.CENTER)
rect(s, 3.30, 1.80, 2.55, 1.0, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 3.45, 2.05, 2.25, 0.5, "線框", size=14, bold=True, color=TEAL, align=PP_ALIGN.CENTER)
rect(s, 6.05, 1.80, 2.55, 1.0, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 6.20, 2.05, 2.25, 0.5, "tokens", size=14, bold=True, color=TEAL, align=PP_ALIGN.CENTER)
tb(s, 0.55, 2.95, 8.9, 0.35, "這三個元件合成後，才叫 SCR（螢幕／介面單元）", size=11, color=MUTED, align=PP_ALIGN.CENTER)
rect(s, 0.55, 3.45, 8.9, 0.55, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.55, 8.4, 0.4, "所以 SCR 不是設計的起點，是套用公式後自然產生的產物。", size=11, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)
footer(s, n, TOTAL)

# 5 任務句複習
s = slide(); n += 1
kicker(s, "2. 先備")
y = title(s, "先複習：任務句七格", "第 5 週 §3.8；本週從「任務句已寫好」開始")
rows = [["格", "例"],
        ["前置業務狀態", "顧客已決定餐點內容"],
        ["A ／ 業務動作", "顧客 ／ 提出訂單"],
        ["物件 ／ 狀態轉換", "OBJ-02 訂單 ／ S1 → S2"],
        ["B ／ B 的決策", "店員 ／ 現在做還是排隊"],
        ["規則", "禁用介面詞；店長測試"]]
table(s, 0.55, y, 8.9, rows, [2.4, 6.2], size=10.5, row_h=0.44, first_bold=True)
footer(s, n, TOTAL)

# 6 元素定義
s = slide(); n += 1
kicker(s, "3. 元素")
y = title(s, "資訊元素：支撐一次決策的最小單位", "不是欄位，也不是按鈕")
rect(s, 0.55, 1.78, 8.9, 0.95, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 1.92, 8.4, 0.7, "使用者為了做某個判斷，必須看到或給出的一件事。\n例：顧客要判斷「值不值得」，就需要「合計金額」這個元素。", size=11, color=INK, spacing=1.4)
tb(s, 0.55, 2.95, 4.3, 0.3, "從哪來？", size=10, bold=True, color=ORANGE)
bullets(s, 0.55, 3.28, 4.3, 1.4, ["任務句的「B 的決策」→ 他要知道什麼", "任務句的「物件」→ 哪個屬性能回答", "每個屬性 → 一到多個元素"], size=9.5, gap=5)
tb(s, 5.15, 2.95, 4.3, 0.3, "不要從哪裡來？", size=10, bold=True, color=ORANGE)
bullets(s, 5.15, 3.28, 4.3, 1.4, ["不要從「我覺得需要」開始", "不要從「別的網站有」開始", "不要從「欄位清單」開始"], size=9.5, gap=5)
footer(s, n, TOTAL)

# 7 三種類型
s = slide(); n += 1
kicker(s, "3. 元素")
y = title(s, "先分功能類型，再談型態")
rows = [["類型", "意思", "例", "型態"],
        ["顯示", "讀它才能判斷", "合計、進度、號碼", "大字／清單／進度條"],
        ["輸入", "給它才能繼續", "取餐時段、姓名", "下拉／文字框"],
        ["操作", "按它才能推進", "送出、付款、完成", "主按鈕／大按鈕"]]
table(s, 0.55, y, 8.9, rows, [1.2, 2.6, 3.2, 2.6], size=10, row_h=0.5)
tb(s, 0.55, 3.85, 8.9, 0.5, "反過來做（先想按鈕）就會變成「先畫畫面」。", size=11, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 8 元素表 11 欄
s = slide(); n += 1
kicker(s, "3. 元素")
y = title(s, "元素表：十一欄，缺一不可")
rows = [["欄位", "回答", "誰要填"],
        ["元素／用途／資料來源", "叫什麼、幫誰回答什麼、從哪個物件來", "全部"],
        ["功能類型／建議型態／型態依據", "顯示或輸入或操作、用什麼元件、為什麼", "全部"],
        ["歸屬視圖", "哪個角色、哪個任務要看它", "全部"],
        ["狀態改變／去處／回饋／失敗去處", "操作之後發生什麼", "只有操作"]]
table(s, 0.55, y, 8.9, rows, [3.4, 4.4, 1.4], size=9.5, row_h=0.5)
tb(s, 0.55, 4.05, 8.9, 0.5, "最後四欄是這一節最重要的設計工作——沒有它們，按鈕只是一個方框。", size=10.5, bold=True, color=TEAL)
footer(s, n, TOTAL)

# 9 五步
s = slide(); n += 1
kicker(s, "3. 產生")
y = title(s, "五步把元素長出來")
rows = [["步", "做什麼", "依據"],
        ["1", "從「B 的決策」問：他要知道什麼才能決定", "任務句第 7 格"],
        ["2", "從物件找對應屬性", "物件清單"],
        ["3", "每個屬性 → 一到多個元素，標功能類型", "顯示／輸入／操作"],
        ["4", "輸入與操作元素定型態與依據", "選項數、範圍、重要性"],
        ["5", "標註歸屬視圖", "角色 × 物件 × 需求"]]
table(s, 0.55, y, 8.9, rows, [0.7, 5.6, 2.6], size=10, row_h=0.46)
footer(s, n, TOTAL)

# 10 例子
s = slide(); n += 1
kicker(s, "3. 例子")
y = title(s, "T-02 提出訂單 → 六個元素 → 一頁", "這一頁就是這樣長出來的")
rows = [["元素", "用途", "資料來源", "功能類型", "型態"],
        ["取餐時段", "決定幾點拿", "訂單.pickup_slot", "輸入", "下拉"],
        ["品項清單", "確認點了什麼", "購物車.items", "顯示", "清單"],
        ["客製備註", "記住偏好", "購物車.remark", "顯示", "小字"],
        ["合計金額", "判斷值不值得", "訂單.total", "顯示", "大字"],
        ["顧客姓名", "叫號辨識", "訂單.customer_name", "輸入", "文字框"],
        ["送出訂單", "提出訂單", "—", "操作", "主按鈕"]]
table(s, 0.55, y, 8.9, rows, [1.8, 2.4, 2.6, 1.2, 1.2], size=9.5, head_h=0.28, row_h=0.40)
tb(s, 0.55, 4.45, 8.9, 0.4, "決策順序：取餐時段 → 品項與合計 → 姓名 → 送出；六個元素聚成群 → 才叫 SCR-03。", size=9.5, color=MUTED)
footer(s, n, TOTAL)

# 11 操作是邊
s = slide(); n += 1
kicker(s, "4. 線框")
y = title(s, "顯示／輸入是節點，操作是「邊」")
rows = [["元素類型", "結構角色", "後果"],
        ["顯示／輸入", "節點（留在同一線框）", "不產生新線框"],
        ["操作", "邊（送到別處或改狀態）", "終點不存在，就要新增線框"]]
table(s, 0.55, y, 8.9, rows, [1.8, 3.6, 3.5], size=10, row_h=0.5)
rect(s, 0.55, 3.55, 8.9, 0.55, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.65, 8.4, 0.4, "線框不是被「切」出來的，是被「走」出來的。", size=11, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)
tb(s, 0.55, 4.25, 8.9, 0.4, "E-16 送出訂單 → S1→S2 → 前往 SCR-04（所以 SCR-04 必須存在）", size=10, color=INK)
footer(s, n, TOTAL)

# 12 三來源
s = slide(); n += 1
kicker(s, "4. 線框")
y = title(s, "線框的三個來源")
rows = [["#", "來源", "例"],
        ["1", "元素群聚（≤7）", "6 個元素聚成 SCR-03"],
        ["2", "邊的終點", "送出訂單要去付款 → SCR-04 必須存在"],
        ["3", "例外", "付款失敗留在原頁 error 態"]]
table(s, 0.55, y, 8.9, rows, [0.7, 3.2, 5.0], size=10.5, row_h=0.52)
footer(s, n, TOTAL)

# 13 非介面入口
s = slide(); n += 1
kicker(s, "4. 線框")
y = title(s, "不是所有線框都靠點擊進入", "每條非介面入口都要寫理由")
rows = [["線框", "入口", "性質"],
        ["SCR-06 店長台", "開店登入，常駐", "非介面"],
        ["SCR-07 廚房顯示", "開店常駐", "非介面"],
        ["SCR-09 取餐櫃", "顧客走到櫃檯", "實體移動"],
        ["SCR-10／11", "後台登入", "非介面"],
        ["SCR-08 看板", "常駐顯示", "設施"]]
table(s, 0.55, y, 8.9, rows, [2.6, 4.2, 2.1], size=10, row_h=0.44)
tb(s, 0.55, 4.25, 8.9, 0.4, "寫不出理由的，就是孤兒線框。", size=11, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 14 決策順序
s = slide(); n += 1
kicker(s, "5. 版面")
y = title(s, "版面順序不是美感，是決策順序")
rows = [["問法", "例"],
        ["使用者第一個要判斷什麼？", "SCR-05：先知道幾點拿 → 預計時間在進度之前"],
        ["哪些是並列選項？", "SCR-09：掃碼與鍵盤並列，替代方案不能放最後"],
        ["哪個是承諾動作？", "送出、確認、儲存——永遠最後"]]
table(s, 0.55, y, 8.9, rows, [3.0, 5.9], size=10, row_h=0.55)
tb(s, 0.55, 4.10, 8.9, 0.4, "線框的排列順序，就是這三題的答案。", size=11, bold=True, color=TEAL)
footer(s, n, TOTAL)

# 15 兩個修正
s = slide(); n += 1
kicker(s, "5. 實例")
y = title(s, "兩個真實抓到的版面錯誤")
rows = [["SCR", "錯在哪", "怎麼修"],
        ["SCR-05", "進度條排在預計時間之前", "調整順序：預計時間 → 進度"],
        ["SCR-09", "掃碼排在鍵盤與確認之後", "改版面：掃碼移到鍵盤之前"]]
table(s, 0.55, y, 8.9, rows, [1.3, 4.2, 3.4], size=10, row_h=0.55)
tb(s, 0.55, 3.75, 8.9, 0.9, "第二個是真正的 UX 缺陷：原本等於告訴顧客「你先用鍵盤，不行再掃」，\n而實際應該反過來——替代方案要早點出現。", size=10.5, color=INK, spacing=1.4)
footer(s, n, TOTAL)

# 16 六態
s = slide(); n += 1
kicker(s, "6. 結構")
y = title(s, "六態：不只做 happy path")
rows = [["態", "要回答的問題"],
        ["default", "正常長什麼樣"],
        ["loading", "正在處理時看什麼（必須有文字）"],
        ["empty", "沒有資料時給什麼出路"],
        ["error", "出錯時怎麼修正"],
        ["success", "完成時確認什麼"],
        ["interrupted", "被打斷（售完／逾時／衝突）怎麼辦"]]
table(s, 0.55, y, 8.9, rows, [1.6, 7.3], size=10, row_h=0.38)
footer(s, n, TOTAL)

# 17 US 兩段式
s = slide(); n += 1
kicker(s, "7. 故事")
y = title(s, "US 出現兩次", "先寫業務版，線框之後再寫介面版")
rows = [["版本", "時機", "長相"],
        ["US-B 業務版", "元素之前", "沒有畫面，用來確認「值得做」"],
        ["US-I 介面版", "線框之後", "有路徑（SCR-02 → 03）、有 AC"]]
table(s, 0.55, y, 8.9, rows, [1.8, 1.8, 5.3], size=10.5, row_h=0.52)
rect(s, 0.55, 3.55, 8.9, 0.75, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.68, 8.4, 0.55, "US-01-B：作為趕時間的顧客，我想在下單前先決定取餐時間，以便到店不用等。\nUS-01-I：路徑 SCR-02 → SCR-03 → SCR-04；AC-01、AC-02、AC-03", size=9.5, color=INK, spacing=1.35)
footer(s, n, TOTAL)

# 18 AC 兩層
s = slide(); n += 1
kicker(s, "7. 驗收")
y = title(s, "AC 也分兩層")
rows = [["層", "例子", "來源"],
        ["業務 AC", "店長入櫃後，顧客 1 秒內看到號碼", "狀態轉換 ＋ 資訊流"],
        ["介面 AC", "送出中不得再出現送出按鈕", "UX 決策（選了按鈕）"],
        ["禁止型", "廚師完成不得通知顧客", "不可逆的業務規則"]]
table(s, 0.55, y, 8.9, rows, [1.5, 4.4, 3.1], size=10, row_h=0.5)
tb(s, 0.55, 3.85, 8.9, 0.6, "「不得跳頁」是介面 AC——它預設了「有按鈕」這個設計；\n換成語音點餐，它就得改成「不得重複成立訂單」。", size=10, color=MUTED, spacing=1.35)
footer(s, n, TOTAL)

# 19 可走的故事
s = slide(); n += 1
kicker(s, "8. 驗證")
y = title(s, "可走的故事：把「可點」升級成「可驗」")
rows = [["層次", "定義", "證據"],
        ["可點", "流程走得通", "點一遍，畫面會動"],
        ["可查", "每個動作對得到 AC", "動作面板 ＋ 稽核模式"],
        ["可驗", "做錯了會紅", "斷言 ＋ PASS／FAIL"]]
table(s, 0.55, y, 8.9, rows, [1.3, 4.0, 3.7], size=10, row_h=0.48)
tb(s, 0.55, 3.75, 8.9, 0.5, "不會失敗的檢查，是說明書；會失敗的檢查，才是規格。", size=11, bold=True, color=TEAL)
footer(s, n, TOTAL)

# 20 四問法
s = slide(); n += 1
kicker(s, "8. 驗證")
y = title(s, "把「只能人工」變成「可自動」：四問法")
rows = [["#", "問自己"],
        ["1", "你怎麼知道它成立？列三個證據"],
        ["2", "是「可讀的值」還是「感覺」？感覺 → 找代理指標"],
        ["3", "判準能寫成布林嗎？不能 → 再拆"],
        ["4", "有錨點嗎？沒有 → 加 data-*"]]
table(s, 0.55, y, 4.9, rows, [0.6, 4.2], size=9.5, row_h=0.46)
rect(s, 5.65, y, 3.8, 1.95, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.90, y+0.14, 3.3, 1.7, "原本 7 條人工 ＋ 1 條人判\n→ 用四問法重看\n→ 8 條全都能自動", size=10.5, color=ERROR, bold=True, spacing=1.5)
footer(s, n, TOTAL)

# 21 兩層證據
s = slide(); n += 1
kicker(s, "8. 驗證")
y = title(s, "兩層證據：規則層與體驗層")
rows = [["層", "問什麼", "誰做", "會失敗嗎"],
        ["規則層", "有沒有照規則做", "機器（斷言）", "會紅"],
        ["體驗層", "好不好用", "人（走查 14 項）", "會不通過"]]
table(s, 0.55, y, 8.9, rows, [1.4, 3.4, 2.6, 1.5], size=10, row_h=0.5)
rect(s, 0.55, 3.55, 8.9, 0.7, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.68, 8.4, 0.5, "規則全綠，但體驗只完成 0%——這正是「能驗」不等於「好用」。", size=11, bold=True, color=TEAL, anchor=MSO_ANCHOR.MIDDLE)
footer(s, n, TOTAL)

# 22 四層檢查
s = slide(); n += 1
kicker(s, "9. 品質")
y = title(s, "四層檢查：每一層都會紅")
rows = [["層", "工具", "抓什麼"],
        ["業務", "verify-stories", "任務七格、介面詞、AC 對應"],
        ["資訊", "derive-wires", "空線框、元素過多、孤兒線框"],
        ["版面", "check-layout-order", "順序與決策不合"],
        ["實作", "lint-tokens／smoke-dom", "token、狀態數、頁面渲染"],
        ["負向", "selftest-stories", "檢查會不會紅"]]
table(s, 0.55, y, 8.9, rows, [1.0, 3.6, 4.3], size=9.5, head_h=0.28, row_h=0.40)
tb(s, 0.55, 4.20, 8.9, 0.4, "node check-all.mjs → 一支指令跑完，入口頁顯示五個燈號。", size=10, color=MUTED)
footer(s, n, TOTAL)

# 23 入口頁
s = slide(); n += 1
kicker(s, "9. 品質")
y = title(s, "入口頁：學生進來的第一站")
rect(s, 0.55, 1.72, 8.9, 1.55, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 1.88, 8.3, 1.3,
   "10 條故事 ／ 21 個動作 ／ 53 個元素 ／ 23 條 AC\n"
   "四層檢查：業務 ✓　資訊 ✓　版面 ✓　實作 ✓　負向 ✓\n"
   "兩層證據：規則 23/23　體驗 0/14", size=11, color=INK, spacing=1.6)
tb(s, 0.55, 3.55, 8.9, 0.9, "入口頁不是「好看的首頁」，是**檢查結果的儀表板**：\n學生一進來就看到「還缺哪一層」。", size=11, color=INK, spacing=1.45)
footer(s, n, TOTAL)

# 24 課堂流程
s = slide(); n += 1
kicker(s, "10. 課堂")
y = title(s, "180 分鐘怎麼走")
rows = [["時間", "段落", "產出"],
        ["0–10", "地圖 ＋ 五分鐘複習", "—"],
        ["10–25", "任務句複習（指回第 5 週）", "—"],
        ["25–45", "資訊元素 11 欄", "元素表"],
        ["45–60", "決策順序 → 分群", "元素群"],
        ["60–90", "線框（含邊與入口）", "一頁 HTML"],
        ["90–110", "六態", "六態畫面"],
        ["110–130", "US-B／US-I ＋ AC", "故事與 AC"],
        ["130–150", "四層檢查", "全綠"],
        ["150–180", "交叉審計 ＋ 收束", "回報"]]
table(s, 0.55, y-0.05, 8.9, rows, [1.2, 4.6, 3.0], size=9, head_h=0.26, row_h=0.28)
footer(s, n, TOTAL)

# 25 評分
s = slide(); n += 1
kicker(s, "10. 評分")
y = title(s, "評分與常見失分")
rows = [["項目", "比重", "判準"],
        ["任務句與元素", "30", "七格、無介面詞、操作元素有去處"],
        ["線框與版面", "25", "順序＝決策順序、六態齊"],
        ["US 與 AC", "25", "US-B／US-I 分開、AC 指回狀態"],
        ["檢查與負向測試", "20", "四層全綠 ＋ 2 個故意做錯"]]
table(s, 0.55, y, 8.9, rows, [2.4, 1.0, 5.4], size=10, row_h=0.46)
tb(s, 0.55, 4.05, 8.9, 0.5, "全綠但沒有負向測試 → 最後 20 分不給。", size=11, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 26 收束
s = slide(); n += 1
kicker(s, "11. 收束")
tb(s, 0.55, 1.45, 8.9, 1.5, "SCR 不是畫出來的，\n是從任務與元素長出來的。", size=26, bold=True, color=TEAL, spacing=1.4)
rect(s, 0.55, 3.15, 3.2, 0.05, fill=ORANGE)
tb(s, 0.55, 3.42, 8.9, 0.5, "你畫的每一頁，都要說得出「是誰召喚它出來的」。", size=13, color=MUTED)
tb(s, 0.55, 4.20, 8.9, 0.5, "下一站：第 7 週 spec.md（把證據收斂成一份文件）", size=11, color=INK)
footer(s, n, TOTAL)

out = r"G:\AsusWebStorage\2025\00_Teaching\115-1-csie@nuu\網站前端程式設計\06_UX設計\09_第06週簡報_v2.pptx"
prs.save(out)
print("OK slides=" + str(len(prs.slides)))
print("saved: " + out)
