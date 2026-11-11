
# -*- coding: utf-8 -*-
import os, sys, glob
from docx import Document
from docx.table import Table
from docx.text.paragraph import Paragraph

def cell_text(c):
    return " ".join(p.text.strip() for p in c.paragraphs).replace("|","/").strip()

def convert(src, dst):
    doc = Document(src)
    out = []
    imgs = 0
    body = doc.element.body
    for child in body.iterchildren():
        tag = child.tag.split('}')[-1]
        if tag == 'p':
            p = Paragraph(child, doc)
            t = p.text.strip()
            if not t:
                continue
            style = (p.style.name or "").lower()
            if style.startswith("heading"):
                lvl = "".join(ch for ch in style if ch.isdigit()) or "1"
                out.append("#" * min(int(lvl), 6) + " " + t)
            elif "list" in style:
                out.append("- " + t)
            else:
                out.append(t)
            out.append("")
        elif tag == 'tbl':
            tb = Table(child, doc)
            rows = [[cell_text(c) for c in r.cells] for r in tb.rows]
            if not rows:
                continue
            ncol = max(len(r) for r in rows)
            rows = [r + [""]*(ncol-len(r)) for r in rows]
            out.append("| " + " | ".join(rows[0]) + " |")
            out.append("|" + "---|"*ncol)
            for r in rows[1:]:
                out.append("| " + " | ".join(r) + " |")
            out.append("")
    imgs = len(doc.inline_shapes)
    # 後處理：中文序號（一、二、…）升為 ##；x.y 小節升為 ###
    fixed = []
    for line in "\n".join(out).split("\n"):
        s = line.strip()
        if not s.startswith("#") and len(s) > 2:
            if s[0] in "一二三四五六七八九十" and s[1] == "、":
                fixed.append("## " + s); continue
            import re as _re
            if _re.match(r"^\d+\.\d+\s", s) or _re.match(r"^\d+\.\d+\D", s):
                fixed.append("### " + s); continue
        fixed.append(line)
    text = "\n".join(fixed).strip() + "\n"
    if imgs:
        text += "\n> 本檔含 %d 張圖片，md 版未內嵌；原圖見同名 .docx。\n" % imgs
    with open(dst, "w", encoding="utf-8") as f:
        f.write(text)
    return len(text), imgs

for src in sorted(glob.glob(os.path.join(sys.argv[1], "*.docx"))):
    dst = src[:-5] + ".md"
    n, imgs = convert(src, dst)
    print("%-46s %6d chars  imgs=%d" % (os.path.basename(dst), n, imgs))
