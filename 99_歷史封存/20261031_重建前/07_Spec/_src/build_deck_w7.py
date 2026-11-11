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


# ================= 頁碼 =================
def footer(s, n, total):
    tb(s, 0.55, 5.22, 6.0, 0.22, "網站前端程式設計 ｜ 第 7 週 ｜ spec.md", size=8.5, color=MUTED)
    tb(s, 8.20, 5.22, 1.25, 0.22, str(n) + " / " + str(total), size=8.5, color=MUTED, align=PP_ALIGN.RIGHT)

TOTAL = 16
n = 0

# 1 封面
s = slide(); n += 1
kicker(s, "第 7 週 ｜ spec.md")
tb(s, 0.55, 1.55, 8.9, 1.0, "把證據排成一份文件", size=40, bold=True, color=TEAL)
tb(s, 0.55, 2.65, 8.9, 0.4, "從服務設計到 spec.md：十章、三項指標、一條界線", size=14, color=MUTED)
rect(s, 0.55, 3.35, 3.2, 0.05, fill=ORANGE)
tb(s, 0.55, 3.60, 8.9, 0.9, "前六週分頭做證據；本週只做一件事：\n讓別人看得懂、驗得動。", size=12, color=INK, spacing=1.5)
footer(s, n, TOTAL)

# 2 地圖
s = slide(); n += 1
kicker(s, "0. 位置")
y = title(s, "你在整條鏈的終點前", "前六週累積 15 份檔案，本週收斂成 1 份")
rect(s, 0.55, 1.75, 8.9, 2.4, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 1.92, 8.3, 2.1,
   "W2  市場 ／ Persona ／ CJM\n"
   "W4  Blueprint（角色任務）\n"
   "W5  任務句七格 ／ 物件 ／ 資訊流 ／ 11 項決策 ／ DESIGN.md\n"
   "W6  元素 ／ 線框 ／ SCR ／ US ／ AC ／ 四層檢查\n"
   "W7  ▸ spec.md（業務需求匯總）\n"
   "W8+ plan.md（技術規劃）", size=11, color=INK, spacing=1.55)
tb(s, 0.55, 4.35, 8.9, 0.5, "一句話：前六週是「分頭把證據做出來」，本週是「把證據排成一份文件」。", size=11, bold=True, color=TEAL)
footer(s, n, TOTAL)

# 3 是什麼不是什麼
s = slide(); n += 1
kicker(s, "1. 定位")
y = title(s, "spec 不是合併，是收斂")
rows = [["是", "不是"],
        ["業務要什麼、為什麼、怎樣算做到", "用什麼技術、什麼框架"],
        ["每條需求都有來源與驗收", "把前幾週的檔案整段貼上"],
        ["業主、設計、工程都看得懂", "只有工程看得懂"]]
table(s, 0.55, y, 8.9, rows, [4.0, 4.4], size=10.5, row_h=0.52, first_bold=True)
tb(s, 0.55, 4.30, 8.9, 0.5, "判斷方法：換一種技術，這條需求還成立嗎？成立 → 留在 spec。", size=11, color=ORANGE, bold=True)
footer(s, n, TOTAL)

# 4 十章
s = slide(); n += 1
kicker(s, "2. 結構")
y = title(s, "十章：只有兩章是新寫的", "其餘都是搬過來、改成一致語氣")
rows = [["章", "內容", "從哪搬"],
        ["1  文件資訊", "版本／範圍／依據鏈", "新寫"],
        ["2  業務脈絡", "市場、Persona 摘要", "01／02"],
        ["3  角色與範圍", "角色表＋任務句七格＋設施替代", "04"],
        ["4  物件與資訊流", "OBJ、四原型、時效", "06／07"],
        ["5  流程與狀態機", "S1–S7 ＋ 例外", "04／06"],
        ["6  介面需求", "SCR 清單、元素群", "12／13"],
        ["7  US 與 AC", "US-B／US-I、23 條 AC", "14"],
        ["8  非功能", "時效、可用性、無障礙", "07／15"],
        ["9  假設與限制", "營業時段、不做什麼", "新寫"],
        ["10 附錄", "可驗證性、名詞、REQ 全表", "20／21／22"]]
table(s, 0.55, y-0.05, 8.9, rows, [1.7, 4.2, 1.6], size=8.5, head_h=0.26, row_h=0.30)
footer(s, n, TOTAL)

# 5 一條需求的長相
s = slide(); n += 1
kicker(s, "3. 單位")
y = title(s, "spec 的最小單位是「一條需求」", "每一條都要能往回指")
rect(s, 0.55, 1.75, 8.9, 1.95, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 1.92, 8.3, 2.0,
   "REQ-012  顧客在製作完成後，不得提前得知可取餐\n"
   "    ├─ 來源任務句：T-05（廚師完成）／T-06（店長備妥入櫃）\n"
   "    ├─ 來源物件：OBJ-02 訂單（S5 → S6）\n"
   "    ├─ 對應 AC：AC-12（不得提前通知）\n"
   "    └─ 驗證方式：自動（verify-stories）", size=11, color=INK, spacing=1.6)
tb(s, 0.55, 3.90, 8.9, 0.5, "沒有「來源」的需求，就是憑空想的。", size=12, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 6 十條規則
s = slide(); n += 1
kicker(s, "4. 規則")
y = title(s, "十條寫作規則（前五條最常犯）")
rows = [["#", "規則", "反例"],
        ["1", "不得出現技術名", "Redis／Kafka／WebSocket"],
        ["2", "不得出現框架與套件", "React／Vue／Tailwind"],
        ["3", "不寫資料表與路徑", "POST /orders"],
        ["4", "不寫演算法", "用快取加速"],
        ["5", "形容詞要可操作", "「現代」→「對比 ≥4.5:1」"],
        ["6–10", "時效寫業務參數／每條有來源／有驗收／現在式／一條一事", "見講義 §4"]]
table(s, 0.55, y, 8.9, rows, [0.8, 4.4, 3.6], size=9.5, row_h=0.42)
footer(s, n, TOTAL)

# 7 技術名禁令
s = slide(); n += 1
kicker(s, "4. 規則")
y = title(s, "技術名一出現，它就變成 plan 了")
rows = [["✗ 寫成技術", "✓ 寫成業務"],
        ["用 WebSocket 推播", "狀態變更後 1 秒內，顧客端可見"],
        ["用訊息佇列解耦", "店長入櫃後，顧客端的號碼與櫃位同時出現"],
        ["用快取降低負載", "尖峰 3 分鐘 40 單時，操作不得延遲超過 1 秒"],
        ["用資料庫交易確保一致", "同一取餐號碼不得同時發給兩位顧客"]]
table(s, 0.55, y, 8.9, rows, [3.4, 5.0], size=9.5, row_h=0.46)
tb(s, 0.55, 4.35, 8.9, 0.4, "口訣：把「用什麼」換成「不能不做到什麼」。", size=11, bold=True, color=ORANGE)
footer(s, n, TOTAL)

# 8 時效
s = slide(); n += 1
kicker(s, "5. 非功能")
y = title(s, "時效寫「誰在等」，不寫「用什麼」")
rows = [["誰在等", "需求寫法", "不寫"],
        ["顧客站在櫃前", "1 秒內顧客端可見", "用推播"],
        ["廚師盯廚房顯示", "3 秒內出現在待製作清單", "用訊息佇列"],
        ["老闆看報表", "1 小時內可落後，金額必須正確", "用批次排程"]]
table(s, 0.55, y, 8.9, rows, [2.3, 4.2, 2.4], size=10, row_h=0.5)
tb(s, 0.55, 3.95, 8.9, 0.6, "判準：換一種技術，這條需求還成立嗎？\n成立 → 業務需求；不成立 → 技術決策，搬到 plan。", size=11, color=INK, spacing=1.4)
footer(s, n, TOTAL)

# 9 spec vs plan
s = slide(); n += 1
kicker(s, "5. 界線")
y = title(s, "spec 與 plan 的分界", "本週最容易錯的一題")
rows = [["", "spec.md", "plan.md"],
        ["回答", "要什麼、為什麼、怎樣算做到", "用什麼做、怎麼做"],
        ["可以寫", "1 秒內一致、四端同步、離線可用", "資料庫、快取、訊息佇列"],
        ["讀者", "業主、設計、工程、驗收", "工程"],
        ["誰核准", "業主", "技術負責人"]]
table(s, 0.55, y, 8.9, rows, [1.4, 4.0, 3.5], size=10, row_h=0.48, first_bold=True)
rect(s, 0.55, 4.05, 8.9, 0.75, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.18, 8.4, 0.55, "spec：狀態變更後 1 秒內，四端顯示一致\nplan：用推送 ＋ 單一寫入點達成上述要求", size=10.5, color=INK, spacing=1.35)
footer(s, n, TOTAL)

# 10 三項指標
s = slide(); n += 1
kicker(s, "6. 驗收")
y = title(s, "三項指標：全部要過")
rows = [["指標", "公式", "標準"],
        ["技術名殘留", "出現的技術名數量", "0"],
        ["可追溯率", "有來源的需求 ÷ 需求總數", "100%"],
        ["驗收覆蓋率", "有 AC 的需求 ÷ 需求總數", "100%"]]
table(s, 0.55, y, 8.9, rows, [2.2, 4.6, 2.0], size=10.5, row_h=0.5)
tb(s, 0.55, 3.95, 8.9, 0.4, "三項都過，spec 才算完成。", size=12, bold=True, color=TEAL)
footer(s, n, TOTAL)

# 11 檢查器
s = slide(); n += 1
kicker(s, "6. 驗收")
y = title(s, "檢查器會告訴你哪裡紅了")
rect(s, 0.55, 1.72, 8.9, 1.75, fill=C("0B1220"), shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 1.88, 8.4, 2.05,
   "$ node check-spec.mjs\n"
   "【① 技術名殘留（標準 0）】\n"
   "  X 佇列×2\n"
   "【② 需求可追溯與驗收】 需求 20 條｜缺來源 0｜缺驗收 0  ✓\n"
   "【③ 十章齊全】 ✓", size=10, color=C("E2E8F0"), font=MONO, spacing=1.55)
tb(s, 0.55, 3.72, 8.9, 0.55, "它在示範答案上抓到作者自己寫的「佇列」（技術詞），改成「待製作清單」才過。", size=10.5, color=ORANGE, spacing=1.4)
footer(s, n, TOTAL)

# 12 交叉審計
s = slide(); n += 1
kicker(s, "7. 課堂")
y = title(s, "交叉審計：五個必找的問題")
rows = [["#", "找什麼"],
        ["1", "有沒有技術名"],
        ["2", "有沒有沒來源的需求"],
        ["3", "有沒有沒 AC 的需求"],
        ["4", "有沒有和前幾章矛盾"],
        ["5", "有沒有形容詞無法驗收"]]
table(s, 0.55, y, 4.4, rows, [0.6, 3.8], size=10, row_h=0.42)
rect(s, 5.15, y, 4.3, 1.9, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 5.40, y+0.14, 3.8, 1.65, "每組至少找出 5 個問題。\n\n全部說「很好」的組，不給分。", size=10.5, color=ERROR, bold=True, spacing=1.5)
footer(s, n, TOTAL)

# 13 課堂流程
s = slide(); n += 1
kicker(s, "8. 課堂")
y = title(s, "180 分鐘怎麼走")
rows = [["時間", "段落", "產出"],
        ["0–10", "地圖 ＋ 複習", "—"],
        ["10–40", "十章骨架 ＋ 搬前三章", "十章有內容"],
        ["40–70", "寫需求（每組 10 條）", "REQ 清單"],
        ["70–90", "補來源與 AC", "可追溯 100%"],
        ["90–100", "休息", "—"],
        ["100–130", "非功能需求", "非功能章"],
        ["130–160", "交叉審計", "每組 5 個問題"],
        ["160–180", "三指標 ＋ 收束", "全過"]]
table(s, 0.55, y-0.05, 8.9, rows, [1.2, 4.6, 3.0], size=9.5, head_h=0.26, row_h=0.30)
footer(s, n, TOTAL)

# 14 評分
s = slide(); n += 1
kicker(s, "9. 評分")
y = title(s, "評分（100）")
rows = [["項目", "比重", "判準"],
        ["十章完整", "20", "每章都有實質內容"],
        ["需求品質", "30", "有來源、有 AC、一條一事"],
        ["非功能需求", "20", "時效寫成「誰在等」"],
        ["三項指標", "20", "技術名 0、可追溯 100%、覆蓋 100%"],
        ["交叉審計", "10", "至少 5 個具體問題"]]
table(s, 0.55, y, 8.9, rows, [2.2, 1.2, 5.5], size=10.5, row_h=0.46)
tb(s, 0.55, 4.25, 8.9, 0.4, "技術名出現一次，扣 5 分——讓代價可見。", size=11, bold=True, color=ERROR)
footer(s, n, TOTAL)

# 15 常見失分
s = slide(); n += 1
kicker(s, "9. 評分")
y = title(s, "五個常見失分")
rows = [["#", "失分", "為什麼"],
        ["1", "spec 裡寫「用 WebSocket」", "那是 plan 的事，技術一改需求就作廢"],
        ["2", "需求沒有來源", "無法判斷是否該存在"],
        ["3", "需求沒有 AC", "無法驗收"],
        ["4", "一條需求講三件事", "驗收時無法判斷通過與否"],
        ["5", "直接貼上前幾週檔案", "語氣不一致、重複、矛盾"]]
table(s, 0.55, y, 8.9, rows, [0.8, 4.0, 4.4], size=9.5, row_h=0.46)
footer(s, n, TOTAL)

# 16 收束
s = slide(); n += 1
kicker(s, "10. 收束")
tb(s, 0.55, 1.45, 8.9, 1.5, "spec 不是「把檔案合併」，\n是「把證據排成一份驗得動的文件」。", size=26, bold=True, color=TEAL, spacing=1.4)
rect(s, 0.55, 3.15, 3.2, 0.05, fill=ORANGE)
tb(s, 0.55, 3.42, 8.9, 0.5, "技術名出現的那一刻，它就變成 plan 了。", size=13, color=MUTED)
tb(s, 0.55, 4.20, 8.9, 0.5, "下一站：plan.md（技術規劃）", size=11, color=INK)
footer(s, n, TOTAL)

out = r"G:\AsusWebStorage\2025\00_Teaching\115-1-csie@nuu\網站前端程式設計\07_Spec\\07_第07週簡報_v1.pptx"
prs.save(out)
print("OK slides=" + str(len(prs.slides.__iter__.__self__._sldIdLst)) if False else "OK slides=" + str(len(prs.slides)))
print("saved: " + out)
