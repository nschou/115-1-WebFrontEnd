# -*- coding: utf-8 -*-
"""Build 第05週 v6 完整版簡報 (40 slides)."""
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
tb(s, 0.75, 1.35, 8.5, 0.3, "網站前端程式設計 ｜ 115-1 ｜ 聯合大學資工系", size=11, color=C("94A3B8"))
tb(s, 0.75, 1.76, 8.7, 0.62, "第 5 週：從服務設計決定版", size=34, bold=True, color=WHITE)
tb(s, 0.75, 2.42, 8.7, 0.62, "到 Design.md（10 章）", size=34, bold=True, color=WHITE)
rect(s, 0.75, 3.28, 1.6, 0.05, fill=ORANGE)
tb(s, 0.75, 3.55, 8.4, 0.55, "10 章結構 ｜ AI 三型任務 ｜ 審計機制 ｜ 可替換性契約", size=13, color=C("E2E8F0"))
tb(s, 0.75, 4.55, 8.4, 0.3, "v6.1（2026-10-26）重建版 ｜ 舊版 v5 已凍結", size=9.5, color=C("94A3B8"))

# ---------------- 2 本週位置 ----------------
s_cur = s = slide()
kicker(s, "課程定位")
y = title(s, "本週在整條鏈上的位置", "上游是服務設計決定版；下游是 UX/UI、Wireframe 與 spec.md")
rows = [["階段","產出","狀態"],
        ["第 2–4 週","市場／Persona／CJM／Blueprint","已完成"],
        ["第 5 週前段","11 項決策 → baseline（決定版）","已完成"],
        ["第 5 週 (本週)","Design.md（10 章）＋ 整併紀錄","進行中"],
        ["第 6 週","IA → 狀態機 → User Story → Wireframe → spec.md","下一站"],
        ["第 7 週起","omp 讀 spec ＋ DESIGN.md 生成前端","待進行"]]
table(s, 0.55, 1.72, 8.9, rows, [1.3, 5.6, 1.4], size=10.5, row_h=0.42)
tb(s, 0.55, 4.55, 8.9, 0.35, "本週不是「做設計」，是把服務意圖翻譯成一份可被審查的契約。", size=11, bold=True, color=ORANGE)

# ---------------- 3 議程 ----------------
s = slide()
kicker(s, "AGENDA")
y = title(s, "今天的三小時", "七段，每段都有產出")
ag = [["段","內容","分鐘"],
      ["A","為什麼：三個斷點、四條路、四命題、Design.md 是 ABI","20"],
      ["B","上游：baseline 九節 → 10 章對應、走讀檢核","20"],
      ["C","流程：五步總覽、兩個接縫","10"],
      ["D","結構：7+3、凍結區、穩定 ID、中文導讀","15"],
      ["E","三章怎麼做：AI 三型任務、第 1／9／10 章","35"],
      ["F","整併與審計：三項指標、五條清單、換版程序","30"],
      ["G","落地：課堂流程、評分、下週銜接","10"]]
table(s, 0.55, 1.72, 8.9, ag, [0.5, 7.4, 0.9], size=10.5, row_h=0.40, align_center_from=2)

# ---------------- 4 divider ----------------
divider("01", "CHAPTER 01 · WHY", "為什麼要這樣設計", "不是教你設計，是教你讓 AI 產出可被審查的設計。")

# ---------------- 5 三個斷點 ----------------
s = slide()
kicker(s, "1.1 問題")
y = title(s, "理工學生做 UI 的三個斷點", "不是能力問題，是知識型別不匹配")
cards = [("1","不會把形容詞翻成參數","「我想要溫暖一點」之後呢？\n改色、改圓角、還是改間距？"),
         ("2","不會排","知道要有標題、卡片、按鈕，\n但不知字級差多少、間距用幾 px"),
         ("3","不會判斷對錯","沒有審美標準，也無法驗證\n「這樣對不對」，只能憑感覺")]
for i,(n,h,d) in enumerate(cards):
    x = 0.55 + i*3.0
    rect(s, x, 1.80, 2.8, 1.62, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.20, 1.95, 0.5, 0.4, n, size=20, bold=True, color=ORANGE)
    tb(s, x+0.20, 2.35, 2.4, 0.4, h, size=13, bold=True, color=TEAL)
    tb(s, x+0.20, 2.80, 2.45, 0.75, d, size=10, color=MUTED, spacing=1.25)
rect(s, 0.55, 3.72, 8.9, 0.72, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.85, 8.4, 0.5, "關鍵觀察：這三個斷點，剛好都是 AI 的強項 —— 所以解法不是「讓學生變強」，是重新分工。",
   size=12, bold=True, color=TEAL, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 6 四條路 ----------------
s = slide()
kicker(s, "1.2 選項")
y = title(s, "四條路，為什麼選第四條")
rows = [["#","作法","為什麼不選"],
        ["1","先教平面設計基礎（色彩學、字體學、構圖）","16 週不夠，也不是資工核心；結果是「懂名詞但做不出來」"],
        ["2","讓 AI 全權生成（無規格）","快，但不可維護、不可交接、不可驗收；品質賭在單次生成"],
        ["3","套現成 UI 框架（Bootstrap／Material）","一致但同質，無法回應品牌人格；換品牌就無解"],
        ["4","AI 生成 ＋ 機器可讀規格 ＋ 人類擇一","本課採用：有憑有據、可交接、可替換"]]
t = table(s, 0.55, 1.78, 8.9, rows, [0.4, 3.9, 4.6], size=10, row_h=0.60)
for j in range(3):
    pass
tb(s, 0.55, 4.60, 8.9, 0.3, "第 4 條靠三個替代品成立：AI 代替設計直覺、Design.md 代替設計稿、審計代替審美。",
   size=10.5, color=MUTED)

# ---------------- 7 四命題 ----------------
s = slide()
kicker(s, "1.3 思想主幹")
y = title(s, "四條命題")
ps = [("命題 1","目標不是培養設計師，\n是產出可被專業接手的提案","判準：可審查、可交接、可替換"),
      ("命題 2","AI 生成的價值\n只在「有規格」時成立","規格不是描述 AI 的成果，是約束 AI 的工具"),
      ("命題 3","不滿意不是重來，是換模組","換的是風格層，不是服務層或結構層"),
      ("命題 4","外包是升級路徑，不是逃生門","拿到的會是「有理由、有邊界、有回溯」的契約")]
for i,(k,h,d) in enumerate(ps):
    x = 0.55 + (i%2)*4.55
    yy = 1.78 + (i//2)*1.52
    rect(s, x, yy, 4.35, 1.32, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    rect(s, x, yy, 0.07, 1.32, fill=ORANGE if i%2==0 else TEAL)
    tb(s, x+0.22, yy+0.12, 3.9, 0.25, k, size=9, bold=True, color=ORANGE)
    tb(s, x+0.22, yy+0.38, 3.95, 0.52, h, size=11.5, bold=True, color=TEAL, spacing=1.2)
    tb(s, x+0.22, yy+0.95, 3.95, 0.3, d, size=9.5, color=MUTED)

# ---------------- 8 ABI ----------------
s = slide()
kicker(s, "1.4 核心概念")
y = title(s, "Design.md 的真正身分：設計的介面契約（ABI）", "換工具不換介面，換風格不換結構，換實作不換規格")
rows = [["維度","可以換成","只需要動","契約保證什麼"],
        ["工具","Stitch → 未來任何工具","第 2–8 章的內容","DS-* 章節 ID 不變，引用不斷"],
        ["風格","外包給視覺設計專家","第 2–8 章 ＋ token 表","第 1／9／10 章與 baseline 不動"],
        ["實作","omp → 其他 AI 或人工","只有程式碼","Design.md 不動（改 token 才重生）"]]
table(s, 0.55, 1.85, 8.9, rows, [0.9, 2.9, 2.5, 3.2], size=10, row_h=0.62)
rect(s, 0.55, 4.30, 8.9, 0.70, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 4.44, 8.3, 0.42, "不滿意 → 不是重做整個系統，是換第 2–8 章。其他部分繼續推進。",
   size=12, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 9 四方讀者 ----------------
s = slide()
kicker(s, "1.5 使用方式")
y = title(s, "四方讀者：同一份文件，四種讀法", "把「一份文件給三種人看」變成可操作")
rows = [["讀者","只讀","要回答的問題"],
        ["老闆／業主","第 1 章","「這是不是我要給客人的感覺？」"],
        ["服務設計師","第 1 ＋ 10 章","「有沒有背叛服務承諾？有沒有超出可換範圍？」"],
        ["視覺設計師／外包","第 1–9 章","「我可以在什麼邊界內優化？」"],
        ["前端／AI 工具","frontmatter＋2–8＋10","「我要用哪些值？哪些不能改？」"],
        ["教師／審查者","第 10 章","「每個值憑什麼？」"]]
table(s, 0.55, 1.85, 8.9, rows, [1.9, 2.2, 4.9], size=10, row_h=0.46)
tb(s, 0.55, 4.62, 8.9, 0.3, "這個表格直接寫進 Design.md 的前言。", size=10, color=MUTED)

# ---------------- 10 divider ----------------
divider("02", "CHAPTER 02 · UPSTREAM", "上游：服務設計決定版", "本週不重講 baseline，只做「走讀」與「檢核」。")

# ---------------- 11 九節對應 ----------------
s = slide()
kicker(s, "2.1 對應")
y = title(s, "baseline 九節 → 10 章", "先看懂原料怎麼餵進成品")
rows = [["節","內容","餵給哪一章"],
        ["一","為什麼要先做決定版","無（方法論）"],
        ["二","市場選擇與約束鏈","1.2 品牌人格（老闆目標）"],
        ["三","案例範圍與假設","1.5 不可違反的限制"],
        ["四","三層 Persona","1.2 人格／1.3 體驗目標／1.5 情緒"],
        ["五","角色表與 5 個交接","9.1 節奏 ＋ 元件狀態"],
        ["六","11 項服務決策","元件需求 ＋ 回溯來源"],
        ["七","CJM（5 階段，最低點 −2）","1.4 承諾／1.5 優先序／9.1 檔位"],
        ["八","Blueprint（3 層 2 線＋4 例外）","1.4 承諾 ＋ 錯誤／空狀態"],
        ["九","因果鏈追蹤表","第 10 章的種子（SD-01~11）"]]
table(s, 0.55, 1.72, 8.9, rows, [0.55, 3.6, 4.75], size=9.5, row_h=0.315)

# ---------------- 12 走讀檢核 ----------------
s = slide()
kicker(s, "2.2 檢核")
y = title(s, "走讀檢核：5 題全對才進 Part B")
qs = [("①","CJM 的情緒最低點是哪一階段？幾分？為什麼它決定第 1 章的情緒優先序？"),
      ("②","Blueprint 有幾個例外？分別對應 UI 的哪一種狀態（錯誤／空／載入／中斷）？"),
      ("③","11 項決策中，哪幾項是「規則自動化」、哪幾項是「AI 增強」？（POS 扣庫存 ≠ AI）"),
      ("④","三層 Persona 各自的「期望感受」是什麼？哪一層最影響 UI？"),
      ("⑤","哪兩項以上的決策會直接改變 UI 元件？（例：KDS 狀態流 → 進度元件）")]
for i,(n,q) in enumerate(qs):
    yy = 1.80 + i*0.62
    rect(s, 0.55, yy, 8.9, 0.50, fill=WHITE if i%2==0 else PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, 0.75, yy+0.10, 0.35, 0.3, n, size=13, bold=True, color=ORANGE)
    tb(s, 1.15, yy+0.10, 8.1, 0.32, q, size=10.5, color=INK)
tb(s, 0.55, 4.95, 8.9, 0.3, "答不出來，第 1 章一定寫成空話。先回去讀 baseline，不要急著開 Stitch。", size=10, bold=True, color=ERROR)

# ---------------- 12.5 物件（一） ----------------
s = slide()
kicker(s, "3.6 物件")
y = title(s, "物件：決定版缺的第三個元素", "角色、動作、對象——我們只建模了前兩個")
rows = [["角色","動作","對象"],
        ["店員","接收訂單並確認","訂單"],
        ["廚師","安排製作順序","訂單"],
        ["老闆","更新菜單","菜單"]]
table(s, 0.55, 1.90, 4.10, rows, [0.9, 2.0, 1.0], size=9.5, row_h=0.42)
tb(s, 5.05, 1.90, 4.3, 0.28, "物件四類", size=10, bold=True, color=ORANGE)
bullets(s, 5.05, 2.24, 4.35, 1.9, [
  "實體物：餐點、食材、櫃位",
  "紀錄物：訂單、銷售紀錄、庫存",
  "憑證物：取餐號碼、開櫃碼",
  "內容物：照片、文案、影片"], size=10, gap=6)
rect(s, 0.55, 3.55, 8.9, 0.78, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.66, 8.4, 0.55, "我們只建模了「訂單」（7 態＋4 例外＋四端視圖），其餘一個都沒有。\n所以「菜單該長什麼樣」沒有地方可以回答。", size=10.5, bold=True, color=ERROR, spacing=1.3)
tb(s, 0.55, 4.55, 8.9, 0.30, "判準：跨角色 ／ 影響決策 ／ 有生命週期 ／ 可持有傳遞", size=9.5, color=MUTED)

# ---------------- 12.6 物件（二） ----------------
s = slide()
kicker(s, "3.6 物件")
y = title(s, "角色 × 物件 × 資訊需求", "同一物件，不同角色要的面向不同——這就是 IA 的種子")
rows = [["角色","要看到什麼","做什麼決策","缺少會怎樣"],
        ["顧客","實物照（份量）、價格、辣度","要不要點","不敢點、點了後悔"],
        ["老闆","成本、毛利、照片品質、熱銷","要不要換品項","品牌與毛利失控"],
        ["廚師","品名、份量、客製","怎麼做","做錯"],
        ["店員","品名、客製、對應訂單","哪一張單","送錯"]]
table(s, 0.55, 1.82, 8.9, rows, [1.0, 3.4, 2.0, 2.5], size=9.5, row_h=0.48)
rect(s, 0.55, 4.22, 8.9, 0.62, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 4.32, 8.3, 0.42, "所以「顧客端要有圖、後台不要圖」不是偏好，是資訊需求不同。", size=11.5, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 12.7 物件（三） ----------------
s = slide()
kicker(s, "3.6 物件")
y = title(s, "物件的增刪修併：設計師的創新語彙", "物件不是給定的——可以創造、合併、刪除")
rows = [["動詞","案例","解決什麼"],
        ["增（憑證）","新增「取餐號碼」","找不到單、櫃前徘徊"],
        ["增（狀態）","訂單加「完成待確認」","廚師完成但沒入櫃，顧客提早來"],
        ["刪","刪掉紙本排隊號碼牌","顧客不用拿兩張紙"],
        ["改","紙本單 → 訂單狀態機","跨端不同步"],
        ["併","訂單號 ＝ 取餐號","顧客少記一組號碼"]]
table(s, 0.55, 1.82, 5.65, rows, [1.2, 2.4, 2.1], size=9, row_h=0.42)
tb(s, 6.45, 1.88, 3.0, 0.28, "三個判準", size=10, bold=True, color=ORANGE)
bullets(s, 6.45, 2.20, 3.0, 1.8, [
  "解決哪個 Persona 痛點？",
  "消除哪次交接或等待？",
  "新狀態誰需要觀測？"], size=9, gap=6)
rect(s, 0.55, 4.35, 8.9, 0.62, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.45, 8.4, 0.42, "答不出來 → 那不是設計，是加功能。", size=10.5, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 12.8 資訊流（2x2） ----------------
s = slide()
kicker(s, "3.7 資訊流")
y = title(s, "物件會動，而且有人在等", "兩個軸：傳播廣度 × 延遲容忍")
# 軸標
tb(s, 0.55, 1.86, 1.6, 0.30, "多端 3+", size=9, bold=True, color=TEAL)
tb(s, 1.95, 1.86, 1.6, 0.30, "秒級", size=9, bold=True, color=MUTED)
tb(s, 3.35, 1.86, 1.6, 0.30, "分—時級", size=9, bold=True, color=MUTED)
tb(s, 0.55, 3.12, 1.6, 0.30, "少數 1–2", size=9, bold=True, color=TEAL)
def cell(x, y, head, body, fill):
    rect(s, x, y, 1.80, 1.02, fill=fill, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.12, y+0.10, 1.60, 0.30, head, size=10.5, bold=True, color=TEAL, spacing=1.1)
    tb(s, x+0.12, y+0.42, 1.58, 0.52, body, size=8.5, color=MUTED, spacing=1.2)
cell(1.05, 2.12, "廣播型", "訂單狀態\n單一來源＋即時推送", WARNB)
cell(2.95, 2.12, "彙總型", "營收、熱銷\n批次即可", WHITE)
cell(1.05, 3.42, "競爭型", "庫存、號碼、櫃位\n唯一性＋防超賣", WARNB)
cell(2.95, 3.42, "記錄型", "銷售明細\n非同步即可", WHITE)
# 右側
tb(s, 5.20, 2.02, 4.3, 0.30, "三條紀律", size=10, bold=True, color=ORANGE)
bullets(s, 5.20, 2.36, 4.35, 2.2, [
  "延遲由「誰在等」決定：顧客 1 秒、廚房 3 秒、報表 1 小時",
  "只寫需求，不寫方案：出現 Redis／Kafka 一律退回",
  "spec 寫「1 秒內四端一致」，plan 才寫用什麼達成"], size=9.5, gap=8)
rect(s, 0.55, 4.62, 8.9, 0.46, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.68, 8.4, 0.34, "服務設計給「誰、為什麼」；物件給「有什麼」；資訊流給「怎麼動、誰在等、會不會撞」。", size=9.5, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 13 三組預設 ----------------
s = slide()
kicker(s, "2.3 風格預設")
y = title(s, "三組預設，本案選「平衡現代」", "從服務設計推導三個情緒方向，各綁定一組參數")
rows = [["預設","情緒方向","色彩","字體","間距","圓角","動效"],
        ["科技俐落","高效科技感","冷色基底","無襯線幾何","緊湊","小 4–8","快 150ms"],
        ["溫暖信賴","安心舒適感","暖色克制","無襯線圓潤","寬鬆","大 12–16","慢 300ms"],
        ["平衡現代","科技＋人情味","冷暖混搭","無襯線中性","中等","中 8–12","中 200ms"]]
t = table(s, 0.55, 1.78, 8.9, rows, [1.3, 1.5, 1.4, 1.5, 0.9, 1.1, 1.2], size=10, row_h=0.52)
cell = t.cell(3,0); cell.fill.solid(); cell.fill.fore_color.rgb = C("E6F4F1")
tb(s, 0.55, 4.05, 8.9, 0.75,
   "選定理由：品牌人格要科技感（排除純暖）＋ CJM 最低點要溫度（排除純冷）。\n注意：「溫暖＝慢動效」是慣例，不是定律。",
   size=10, color=MUTED, spacing=1.3)

# ---------------- 14 divider ----------------
divider("03", "CHAPTER 03 · FLOW", "流程總覽：五步", "每一步都是「輸入檔 → Prompt → 輸出檔」。")

# ---------------- 15 五步 ----------------
s = slide()
kicker(s, "3.1 總覽")
y = title(s, "從 baseline 到 Design.md", "照檔名走，就不會迷路；卡住時看自己在哪一格")
steps = [("步驟 1","建立草稿","baseline-draft.md","第2–4週 4 檔＋範本"),
         ("步驟 2","定案","service-design-baseline.md","＋ 05_decisions.md"),
         ("步驟 3","組 Prompt","stitch-prompt-draft.md","＋ Prompt 範本"),
         ("步驟 4","驗證定稿","stitch-prompt-final.md","＋ 13 項清單"),
         ("步驟 5","生成與整併","DESIGN.md（10 章）","Stitch → 匯出 → 補 3 章")]
for i,(n,h,out,inp) in enumerate(steps):
    x = 0.55 + i*1.80
    hi = (i == 4)
    rect(s, x, 1.80, 1.70, 2.30, fill=TEAL if hi else PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.12, 1.92, 1.45, 0.25, n, size=9, bold=True, color=ORANGE if hi else C("64748B"))
    tb(s, x+0.12, 2.20, 1.45, 0.35, h, size=12.5, bold=True, color=WHITE if hi else TEAL)
    tb(s, x+0.12, 2.72, 1.50, 0.55, inp, size=8, color=C("94A3B8") if hi else MUTED, spacing=1.2)
    tb(s, x+0.12, 3.52, 1.50, 0.45, out, size=7.8, bold=True, color=C("FED7AA") if hi else ORANGE, font_=None) if False else tb(s, x+0.12, 3.50, 1.50, 0.50, out, size=7.8, bold=True, color=C("FED7AA") if hi else ORANGE, spacing=1.15)
tb(s, 0.55, 4.35, 8.9, 0.3, "藍色為本版新增的第 5 步：整併（舊版只到步驟 4，學生匯出後就卡住）。",
   size=9.5, color=MUTED)

# ---------------- 16 兩個接縫 ----------------
s = slide()
kicker(s, "3.2 風險")
y = title(s, "兩個接縫最容易出事")
for i,(a,b,c) in enumerate([("步驟 2 → 3","Prompt 的「關鍵服務規則」寫錯","baseline 還沒定案就急著寫 Prompt，決策還在「A 或 B」"),
                            ("步驟 4 → 5","匯出後不知道要幹嘛，把 7 章當成品","Prompt 有範本，整併沒人教 —— 本版補的段落")]):
    x = 0.55 + i*4.55
    rect(s, x, 1.80, 4.35, 1.90, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    rect(s, x, 1.80, 4.35, 0.06, fill=ERROR)
    tb(s, x+0.22, 2.00, 3.9, 0.28, a, size=10, bold=True, color=ERROR)
    tb(s, x+0.22, 2.32, 3.95, 0.5, b, size=12, bold=True, color=TEAL, spacing=1.2)
    tb(s, x+0.22, 2.95, 3.95, 0.6, c, size=9.5, color=MUTED, spacing=1.25)
tb(s, 0.55, 4.05, 8.9, 0.3, "其餘三步都有範本可依；只有第 5 步要靠理解 —— 所以它值得 60 分鐘。", size=10, color=MUTED)

# ---------------- 17 divider ----------------
divider("04", "CHAPTER 04 · STRUCTURE", "10 章結構", "Stitch 給 7 章，我們補 3 章。")

# ---------------- 18 7+3 ----------------
s = slide()
kicker(s, "4.1 結構")
y = title(s, "7 ＋ 3 ＝ 10", "工具匯出 7 章；缺的三件由人機協作補上")
rows = [["章","穩定 ID","章名","來源"],
        ["1","DS-RATIONALE","設計理由","人機協作（抽取）"],
        ["2–8","DS-BRAND … DS-COMP","Brand & Style 等 7 章","Stitch 原文（逐字）"],
        ["9","DS-MOTION","動效原則","人機協作（聯想）"],
        ["10","DS-TRACE","回溯表與可替換性契約","人機協作（計算）"]]
table(s, 0.55, 1.78, 8.9, rows, [0.6, 2.5, 3.4, 2.4], size=10, row_h=0.58)
tb(s, 0.55, 4.42, 8.9, 0.6,
   "工具缺的三件事：為什麼（無法變通）、時間（只有靜態）、憑什麼（無法驗收）。\n這三件事都需要「服務設計的上下文」，工具本來就不該負責。",
   size=10, color=MUTED, spacing=1.3)

# ---------------- 19 骨架 ----------------
s = slide()
kicker(s, "4.2 檔案骨架")
y = title(s, "凍結區：原文不動，只加三樣東西")
codebox(s, 0.55, 1.75, 8.9, 2.95,
"""---
# （Stitch 匯出的 YAML，逐字保留）
---
<!-- 凍結區：DS-BRAND ~ DS-COMP 由 Stitch 產生 -->
# Design.md：雲端早餐店訂餐管理系統
## 文件導覽（版本／模式／凍結範圍／讀者導覽／遠距顯示）
## 1. 設計理由（DS-RATIONALE）
<!-- ===== 凍結區開始：勿手改，要改請回 Stitch 重生 ===== -->
## 2. Brand & Style（DS-BRAND）
   … 每章下方可加「中文導讀」
## 8. Components（DS-COMP）
<!-- ===== 凍結區結束 ===== -->
## 9. 動效原則（DS-MOTION）
## 10. 回溯表與可替換性契約（DS-TRACE）""", size=9)
tb(s, 0.55, 4.85, 8.9, 0.3, "YAML frontmatter 保留在檔案最前面（機器讀取用），不佔章號。", size=9.5, color=MUTED)

# ---------------- 20 三種修改 ----------------
s = slide()
kicker(s, "4.3 邊界")
y = title(s, "「原封不動」的邊界：只允許三種修改", "否則三個月後就名存實亡")
mods = [("1","加章號前綴","## Brand & Style → ## 2. Brand & Style"),
        ("2","加凍結標記","<!-- 凍結區開始 --> / <!-- 凍結區結束 -->"),
        ("3","在該章下方加「中文導讀」","原文不動，導讀另起一段")]
for i,(n,h,d) in enumerate(mods):
    yy = 1.80 + i*0.72
    rect(s, 0.55, yy, 8.9, 0.60, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, 0.75, yy+0.15, 0.35, 0.3, n, size=13, bold=True, color=ORANGE)
    tb(s, 1.15, yy+0.13, 2.5, 0.3, h, size=11, bold=True, color=TEAL)
    tb(s, 3.70, yy+0.15, 5.5, 0.3, d, size=9.5, color=MUTED, font_=MONO) if False else tb(s, 3.70, yy+0.15, 5.5, 0.3, d, size=9, color=MUTED, font=MONO)
rect(s, 0.55, 4.20, 8.9, 0.62, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.32, 8.4, 0.42, "要改內容 → 只有兩條路：回 Stitch 重生，或走換版程序。不准「順手潤飾」。",
   size=11, bold=True, color=ERROR, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 21 中文導讀 ----------------
s = slide()
kicker(s, "4.4 評量裝置")
y = title(s, "中文導讀：把「原封不動」變成評量工具", "Stitch 的 body 是英文。不要翻譯 —— 翻譯就對不上工具回寫")
gains = [("原文 100% 原封不動","不用改英文，也不怕工具重生成後對不上"),
         ("學生必須真的讀懂","寫得出導讀，才表示看懂那一章在講什麼"),
         ("老師有東西可評分","導讀品質 ＝ 理解力，不必懂設計也能評")]
for i,(h,d) in enumerate(gains):
    yy = 1.90 + i*0.78
    rect(s, 0.55, yy, 0.06, 0.60, fill=[TEAL, ORANGE, SUCCESS][i])
    tb(s, 0.80, yy+0.02, 8.4, 0.28, h, size=12, bold=True, color=TEAL)
    tb(s, 0.80, yy+0.32, 8.4, 0.28, d, size=10, color=MUTED)
tb(s, 0.55, 4.55, 8.9, 0.3, "做法：原文保留 ＋ 每章下方 3–5 行學生自寫的中文導讀。", size=10, color=MUTED)

# ---------------- 22 divider ----------------
divider("05", "CHAPTER 05 · GENERATION", "新增三章怎麼做", "AI 負責翻譯與壓縮，學生負責驗證它有沒有胡說。")

# ---------------- 23 三型任務 ----------------
s = slide()
kicker(s, "5.1 分工")
y = title(s, "AI 的三種任務型別", "不同型別有不同的失敗模式，要對應不同的審計動作")
rows = [["型別","在哪幾章","AI 的強項","AI 的失敗模式","學生審什麼"],
        ["聯想型","1.2、9.1","形容詞 → 參數","把慣例講成定律","有沒有給反面案例"],
        ["抽取型","1.3／1.4／10.1","60 萬字抓 10 行","幻覺來源","原文片段存不存在"],
        ["計算型","10.2","群組、統計","不列被群組的 token","數字對不對"]]
table(s, 0.55, 1.80, 8.9, rows, [1.0, 1.7, 2.3, 2.0, 2.2], size=9.5, row_h=0.55)
rect(s, 0.55, 4.05, 8.9, 0.62, fill=TEAL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.85, 4.17, 8.3, 0.42, "AI 負責把理由翻成參數，學生負責驗證參數有沒有胡說。",
   size=12, bold=True, color=WHITE, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 24 第1章 ----------------
s = slide()
kicker(s, "5.2 第 1 章")
y = title(s, "DS-RATIONALE：五個小節", "硬條件：這一章必須能脫離 baseline 單獨閱讀（給外包設計師）")
rows = [["小節","填什麼","從哪裡來"],
        ["1.1 風格一句話","〔人格〕×〔情緒〕×〔節奏〕，≤25 字","1.2 ＋ 1.5 壓縮"],
        ["1.2 品牌人格","形容詞／視覺對應／型別／反面案例／來源","老闆目標 ＋ 顧客期望"],
        ["1.3 體驗目標","2–3 個感受（放大什麼／避免什麼）","顧客 Persona"],
        ["1.4 服務承諾","每個 CJM 階段一句","Blueprint 前台"],
        ["1.5 情緒＋限制","優先序 ＋ 不可違反限制","CJM 曲線 ＋ 課程固定"]]
table(s, 0.55, 1.85, 8.9, rows, [1.5, 4.3, 3.1], size=9.5, row_h=0.46)
tb(s, 0.55, 4.55, 8.9, 0.55, "範例：俐落 → 緊湊間距、小圓角、無襯線（慣例，反例：蘋果用大圓角表現俐落）；\n可信賴 → 對比 ≥4.5:1、狀態不只靠顏色（定律，不可換）。",
   size=9.5, color=MUTED, spacing=1.3)

# ---------------- 25 第9章 ----------------
s = slide()
kicker(s, "5.3 第 9 章")
y = title(s, "DS-MOTION：補上時間維度", "Stitch 只給靜態畫面；不定義，實作時就會亂加動畫")
rows = [["小節","填什麼"],
        ["9.1 節奏檔位","快 150／中 200–250／慢 300ms，選一檔＋理由（引用第 1 章）"],
        ["9.2 動效清單","觸發點／目的／時長／緩動／reduced-motion 降級"],
        ["9.3 禁止清單","視差、自動播放、>400ms 阻塞動畫、用動效掩飾載入"],
        ["9.4 不做動效","金額、錯誤訊息、訂單號（避免注意力被搶）"]]
table(s, 0.55, 1.85, 8.9, rows, [1.6, 7.2], size=10, row_h=0.55)
tb(s, 0.55, 4.35, 8.9, 0.6, "紀律：時長只能從這四個值裡選；目的填「裝飾」的，降級欄一律寫「全關」。\n每個動效都要能回答：它幫使用者理解什麼？答不出來就刪。",
   size=10, color=MUTED, spacing=1.3)

# ---------------- 26 第10章 ----------------
s = slide()
kicker(s, "5.4 第 10 章")
y = title(s, "DS-TRACE：回溯表 ＋ 可替換性契約", "這是整份文件的守門章，也是九章舊版最弱的一章")
rows = [["層","內容","誰可以改","換了要同步"],
        ["不可換（底座）","資訊層次、狀態語義、焦點、對比度、中文可讀","只有專案負責人","重跑整條鏈"],
        ["可換（風格）","色彩、字體、圓角、陰影、動效速度、圖像","外包設計師可整組換","只換第 2–8 章＋token"],
        ["需連動","token 名稱對應、元件尺寸、間距階","換風格時必須一起改","元件與間距重新對齊"]]
table(s, 0.55, 1.85, 8.9, rows, [1.7, 3.9, 2.2, 2.4], size=9.5, row_h=0.62)
tb(s, 0.55, 4.45, 8.9, 0.55, "回溯表每列多一欄「可替換性」——這一欄就是外包設計師的施工邊界。\n沒有它，「換風格不換結構」只是口號。",
   size=10, color=MUTED, spacing=1.3)

# ---------------- 27 定律vs慣例 ----------------
s = slide()
kicker(s, "5.5 關鍵判斷")
y = title(s, "定律 or 慣例：一個判斷，服務兩章", "「俐落 → 小圓角」不是真理，是慣例")
rows = [["","定律","慣例"],
        ["例子","對比 ≥4.5:1、焦點可見、內文 ≥16px","俐落＝小圓角、溫暖＝暖色、高效＝緊湊"],
        ["來源","標準（WCAG），可實測","文化聯想，約七成可信"],
        ["第 1 章標","定律","慣例（必附反面案例）"],
        ["第 10 章標","不可換（底座）","可換（風格模組）"]]
t = table(s, 0.55, 1.85, 8.9, rows, [1.3, 3.8, 3.8], size=10, row_h=0.52)
cell = t.cell(4,2); cell.fill.solid(); cell.fill.fore_color.rgb = C("E6F4F1")
tb(s, 0.55, 4.60, 8.9, 0.3, "慣例可被外包整組換掉；定律換了會壞 —— 文件因此自我一致。", size=10.5, bold=True, color=TEAL)

# ---------------- 28 divider ----------------
divider("06", "CHAPTER 06 · AUDIT", "整併與審計", "分數要能由不看設計的人算出。")

# ---------------- 29 整併五步+指標 ----------------
s = slide()
kicker(s, "6.1 整併")
y = title(s, "從 7 章匯出檔到 10 章定稿", "五個動作，三個可計算的指標")
acts = ["① 貼進骨架\n加章號＋凍結標記", "② 補第 1 章\nDS-RATIONALE",
        "③ 補第 9 章\nDS-MOTION", "④ 補第 10 章\nDS-TRACE",
        "⑤ 跑指標\n定稿 v1.0"]
for i,a in enumerate(acts):
    x = 0.55 + i*1.80
    rect(s, x, 1.80, 1.70, 0.95, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.10, 1.92, 1.5, 0.7, a, size=9, bold=True, color=TEAL, spacing=1.2)
rows = [["指標","定義","標準"],
        ["回溯覆蓋率","已回溯 token 數 ÷ 第 2–8 章 token 總數","≥ 80%"],
        ["跨章矛盾數","章與章互相打臉的條目","= 0"],
        ["來源命中率","抽查 5 條中找得到 baseline 原文的比例","= 100%"]]
table(s, 0.55, 2.95, 8.9, rows, [1.8, 5.5, 1.6], size=10, row_h=0.40)
tb(s, 0.55, 4.52, 8.9, 0.3, "三個數字讓「設計文件」變成可 lint 的文件 —— 老師不必懂設計也能評分。", size=9.5, color=MUTED)

# ---------------- 30 審計五條 ----------------
s = slide()
kicker(s, "6.2 審計")
y = title(s, "五條清單 ＋ 抽樣規則", "無差別掃描＝形式主義；審計要有觸發條件")
rows = [["#","動作","怎麼做","通過標準"],
        ["1","來源抽查","抽 5 條，Ctrl+F 找原文","100% 命中"],
        ["2","矛盾掃描","1.2 說「緊湊」vs 9.1 說 300ms","0 個"],
        ["3","對應完整性","1.2 的形容詞在 2–8 章有值嗎","全部有"],
        ["4","反面檢查","標「慣例」的有反例嗎","全部有"],
        ["5","誠實度","待驗證有沒有被寫成已驗證","100%（全審）"]]
table(s, 0.55, 1.78, 8.9, rows, [0.4, 1.7, 4.5, 2.3], size=9.5, row_h=0.40)
rect(s, 0.55, 4.22, 8.9, 0.66, fill=PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 4.32, 8.4, 0.48, "抽樣：定律／底座 100% ｜ 待驗證 100% ｜ AI 自陳 3 條 100% ｜ 慣例／可換 隨機 30%",
   size=10.5, bold=True, color=TEAL, anchor=MSO_ANCHOR.MIDDLE)

# ---------------- 31 自陳與處置 ----------------
s = slide()
kicker(s, "6.3 機制")
y = title(s, "要 AI 自陳 3 條 ＋ 三種處置", "這比隨機抽查精準，因為它打在 AI 最脆弱的地方")
rect(s, 0.55, 1.78, 4.3, 2.30, fill=WHITE, line=LINE, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.75, 1.92, 3.9, 0.3, "Prompt 最後強制加一句", size=10, bold=True, color=ORANGE)
tb(s, 0.75, 2.25, 3.95, 0.9, "「列出你認為最不確定的 3 條，並說明原因。」", size=12, bold=True, color=TEAL, spacing=1.3)
tb(s, 0.75, 3.20, 3.95, 0.7, "學生必須三選一表態：\n採用／修正／剔除（＋理由）", size=10, color=MUTED, spacing=1.3)
rows = [["情況","處置"],
        ["來源命中 < 100%","退回重生成（出現幻覺）"],
        ["矛盾 > 0","修正後重跑"],
        ["覆蓋率 < 80%","補回溯（列出群組的 token）"]]
table(s, 5.15, 1.90, 4.3, rows, [1.7, 2.6], size=9.5, row_h=0.48)

# ---------------- 32 換版程序 ----------------
s = slide()
kicker(s, "6.4 可維護性")
y = title(s, "換版程序：外包回來的版本怎麼併回", "這一步讓「換風格不換結構」從口號變成流程")
flow = ["外包只交\n第 2–8 章 ＋ token 表", "比對 10.2\n「不可換」清單", "通過才 merge\n更新版本指紋", "重跑 omp\n只重生視覺"]
for i,f in enumerate(flow):
    x = 0.55 + i*2.23
    rect(s, x, 1.85, 2.05, 0.95, fill=TEAL if i in (0,3) else PANEL, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
    tb(s, x+0.10, 1.95, 1.85, 0.75, f, size=9.5, bold=True,
       color=WHITE if i in (0,3) else TEAL, align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE, spacing=1.2)
    if i < 3:
        tb(s, x+2.06, 2.15, 0.16, 0.3, "›", size=16, bold=True, color=ORANGE, align=PP_ALIGN.CENTER)
tb(s, 0.55, 3.05, 8.9, 1.1,
   "不通過 → 退回，並指出違反哪一條（通常是被改了 IA、狀態語義或文案原則）。\n\n"
   "沒有這一步，外包會順手把 IA 也改了 —— 那整條下游（Wireframe、spec、程式）就要重做。",
   size=10.5, color=MUTED, spacing=1.35)

# ---------------- 33 divider ----------------
divider("07", "CHAPTER 07 · WRAP", "落地：課堂與評量", "三個小時怎麼跑完，以及怎麼打分。")

# ---------------- 34 課堂流程 ----------------
s = slide()
kicker(s, "7.1 流程")
y = title(s, "課堂流程（180 分鐘）", "時間不足可拆兩週：第 1 週 0–80 分、第 2 週 80–180 分")
rows = [["時間","段落","產出"],
        ["0–20","為什麼：四命題、四條路、ABI、四方讀者","理解"],
        ["20–40","上游走讀 ＋ 5 題檢核","檢核表"],
        ["40–60","Prompt 組裝 → Stitch 3 組 → 匯出","7 章原料"],
        ["60–80","貼骨架：章號、凍結標記、導讀","骨架完成"],
        ["80–110","第 1 章：AI 產生 → 五條審計 → 修正","DS-RATIONALE"],
        ["110–135","第 9 章：目的檢查 → 刪裝飾項","DS-MOTION"],
        ["135–160","第 10 章：回溯表 → 覆蓋率 → 契約","DS-TRACE"],
        ["160–180","三項指標、換版演練、分享","整併紀錄"]]
table(s, 0.55, 1.72, 8.9, rows, [0.9, 5.6, 2.4], size=9.5, row_h=0.335)

# ---------------- 35 評分 ----------------
s = slide()
kicker(s, "7.2 評量")
y = title(s, "60 ／ 40：產出與審計分開算", "分數要能由不看設計的人算出")
rows = [["大項","比重","子項","判準"],
        ["A 產出完整性","60%","章節結構 15｜第 1 章 15｜第 9 章 15｜第 10 章 15","7 章逐字未改、三章齊、覆蓋率 ≥80%"],
        ["B 審計品質","40%","紀錄 15｜抓錯能力 15｜決策品質 10","五條都做、抓到幾個、自陳 3 條有表態"]]
table(s, 0.55, 1.85, 8.9, rows, [1.6, 0.8, 4.0, 2.8], size=9.5, row_h=0.58)
rect(s, 0.55, 3.50, 8.9, 0.95, fill=WARNB, shape=MSO_SHAPE.ROUNDED_RECTANGLE)
tb(s, 0.80, 3.60, 8.4, 0.2, "一條硬規則", size=9, bold=True, color=ERROR)
tb(s, 0.80, 3.83, 8.4, 0.55, "全部接受（0 個修正）或全部拒絕（不寫理由）→ B 項 0 分。\n理由：全盤接受等於沒有審計；全盤拒絕等於沒有讀懂。",
   size=10.5, bold=True, color=INK, spacing=1.3)

# ---------------- 36 常見失分 ----------------
s = slide()
kicker(s, "7.3 提醒")
y = title(s, "五個最常見的失分", "都是「沒有機制」造成的，不是不用功")
rows = [["失分點","具體長相","怎麼救"],
        ["改了 Stitch 原文","順手把英文潤飾成中文","原文不動，改寫在「中文導讀」"],
        ["第 1 章塞 hex","1.2 出現 #134E4A","那是第 3 章的事，刪"],
        ["形容詞不可操作","「高級」「有質感」","換成低飽和、留白多、無裝飾"],
        ["動效自創時長","180ms、220ms","只能 150/200/250/300"],
        ["覆蓋率黑箱","「已完整回溯」但沒數字","必須給 N、M、%、未覆蓋清單"]]
table(s, 0.55, 1.80, 8.9, rows, [1.9, 3.4, 3.6], size=9.5, row_h=0.50)

# ---------------- 37 下週銜接 ----------------
s = slide()
kicker(s, "7.4 銜接")
y = title(s, "下週：六步走到 spec.md", "風格是抽樣校準（4 頁）；UX 是全量展開（N 頁）")
rows = [["#","階段","產出","Gate"],
        ["1","頁面盤點與 IA","SCR-01..N、導航圖","每個例外都有落點"],
        ["2","狀態與任務流","每頁狀態表","沒有一頁只有 happy path"],
        ["3","User Story ＋ AC","US-01..、EARS","每條有「以便」"],
        ["4","Wireframe","375px 線框（含狀態）","每個 AC 找得到位置"],
        ["5","元件對應與回流","Design.md v1.1","不留臨時樣式"],
        ["6","UX 走查 ＋ spec 鎖定","spec.md","三方各讀一遍"]]
table(s, 0.55, 1.80, 8.9, rows, [0.4, 2.2, 2.9, 3.4], size=9.5, row_h=0.42)

# ---------------- 38 核心一句話 ----------------
s = slide("0B3C49")
rect(s, 0, 0, SW, 0.10, fill=ORANGE)
tb(s, 0.75, 0.70, 8.5, 0.3, "本章核心一句話", size=10, bold=True, color=ORANGE)
lines = ["風格回答「同一個東西長什麼樣」，",
         "UX 回答「有哪些東西、先後順序、壞掉時怎麼辦」。",
         "",
         "Design.md 不是規格文件，是介面契約：",
         "換工具不換介面，換風格不換結構，換實作不換規格。"]
yy = 1.20
for i, ln in enumerate(lines):
    if ln == "":
        yy += 0.18; continue
    tb(s, 0.75, yy, 8.6, 0.5, ln, size=17 if i < 2 else 15, bold=True,
       color=WHITE if i < 2 else C("E2E8F0"), spacing=1.25)
    yy += 0.60
rect(s, 0.75, 4.55, 1.4, 0.045, fill=ORANGE)
tb(s, 0.75, 4.75, 8.5, 0.4, "AI 負責把理由翻成參數；學生負責驗證參數有沒有胡說。", size=11, color=C("94A3B8"))

NOTES = {
1:"開場先說：這份簡報的配色本身，就是案例的「平衡現代」預設——教材即範例。",
2:"先定位：本週不是做新設計，是把上週的決定版翻譯成規格。",
3:"七段的比例：生成 35 分、整併與審計 30 分，兩者合起來才是重點。",
4:"章節頁。可先問：如果沒有 Design.md，AI 生成的東西你能驗收嗎？",
5:"三個斷點逐一問學生：你會怎麼把「溫暖」變成參數？多數人答不出，正好引出分工。",
6:"第 2 條是最常見的誤解：以為 AI 一次生成就能用。",
7:"四命題可只講 1 與 2；3、4 留到換版程序時回頭呼應。",
8:"ABI 若學生不熟，用「USB 接口」比喻：換設備不用換電腦。",
9:"強調：這張表要真的寫進 Design.md 前言，不是簡報專用。",
10:"章節頁。",
11:"重點在最後一列：因果鏈是第 10 章的種子，SD 代碼不重新編號。",
12:"這 5 題當場抽問；答不出就回去讀 baseline，不要進實作。",
13:"三組預設只講差異，重點是最後一句「慣例不是定律」。",
14:"章節頁。",
15:"五步圖是整堂課的地圖；提醒第 5 步是本版新增。",
16:"接縫 4→5 就是過去學生卡住的地方。",
17:"章節頁。",
18:"7+3 要讓學生記住：工具給 7，人補 3。",
19:"骨架圖可直接投影，讓學生照著打。",
20:"講完三種修改立刻問：那我想改文案怎麼辦？答案是走換版程序。",
21:"中文導讀是評量工具，不是翻譯作業。",
22:"章節頁。",
23:"三型任務對應三種審計動作，這是本週最該記住的一張表。",
24:"第 1 章的硬條件：能脫離 baseline 單獨閱讀。",
25:"動效最容易寫成形容詞清單，強調「目的」欄。",
26:"第 10 章是守門章；可替換性那欄就是外包的施工邊界。",
27:"定律 vs 慣例，用對比度與圓角兩個例子對照。",
28:"章節頁。",
29:"三項指標要能當場算給學生看。",
30:"抽樣規則很重要：不是全部審，也不是隨便審。",
31:"自陳 3 條是最省成本的審計，務必要求。",
32:"可請一組演練：假設外包把 IA 改了，怎麼退回。",
33:"章節頁。",
34:"時間不足就拆兩週，第 1 週只做到骨架。",
35:"60/40 要說清楚：審計是可以練的能力。",
36:"五個失分都是機制問題，不是態度問題。",
37:"下週六步先給地圖，細節下週講。",
38:"收尾回到一句話：你能用一句話說明你的 Design.md 嗎？",
}
for i, s in enumerate(prs.slides, 1):
    if i in NOTES:
        s.notes_slide.notes_text_frame.text = NOTES[i]

# ---------------- footer ----------------
total = len(prs.slides.__iter__.__self__._sldIdLst) if False else len(prs.slides._sldIdLst)
for i, s in enumerate(prs.slides, 1):
    dark = (i in (1, 4, 10, 14, 17, 22, 28, 33, 38))
    col = C("64748B") if dark else C("94A3B8")
    tb(s, 0.55, 5.22, 5.0, 0.22, "網站前端程式設計 ｜ 第 5 週 v6 ｜ Design.md 10 章", size=8, color=col)
    tb(s, 8.6, 5.22, 0.9, 0.22, "%d / %d" % (i, total), size=8, color=col, align=PP_ALIGN.RIGHT)

out = r"G:\AsusWebStorage\2025\00_Teaching\115-1-csie@nuu\網站前端程式設計\05_AI輔助風格設計\06_新版_Design規格驅動\07_第05週講義_v6.pptx"
prs.save(out)
print("OK slides=%d" % total)
print("saved:", out)
