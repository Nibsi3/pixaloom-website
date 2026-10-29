"""Build the downloadable portfolio from the same content used by the website."""
import json
import html
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph
from reportlab.lib.utils import ImageReader

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'lib/capabilities.json').read_text(encoding='utf-8'))
OUT = ROOT / 'public/downloads/pixaloom-capabilities.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
W, H, M = 595.28, 841.89, 44
CW = W - M * 2
C = canvas.Canvas(str(OUT), pagesize=(W, H))
C.setTitle('Pixaloom | Development capabilities and portfolio CV')
C.setAuthor('Cameron Falck - Pixaloom')
page = 0
y = 0
bottoms = []

def clean(text):
    return text.replace('\u2014', ' - ').replace('\u2013', '-').replace('\u2011', '-').replace('\u2019', "'").replace('\u2018', "'")

def para(text, size=10.5, leading=15.5, color='#33434b', font='Helvetica', gap=10, width=CW, x=M):
    global y
    style = ParagraphStyle('body', fontName=font, fontSize=size, leading=leading, textColor=HexColor(color))
    p = Paragraph(clean(text), style)
    _, ph = p.wrap(width, H)
    p.drawOn(C, x, y - ph)
    y -= ph + gap

def new_page(label):
    global page, y
    if page:
        bottoms.append(round(y, 1))
        assert y > 51, f'Content overflows page {page}: {y}'
        C.showPage()
    page += 1
    C.setFillColor(HexColor('#f8f6f0'))
    C.rect(0, 0, W, H, fill=1, stroke=0)
    C.setFillColor(HexColor('#14242b'))
    C.setFont('Helvetica-Bold', 11)
    C.drawString(M, H-35, 'PIXALOOM')
    C.setFont('Helvetica', 8)
    C.drawRightString(W-M, H-35, 'CAMERON FALCK / PORTFOLIO CV')
    C.setStrokeColor(HexColor('#c5cecd'))
    C.line(M, 42, W-M, 42)
    C.setFillColor(HexColor('#52636c'))
    C.setFont('Helvetica', 8)
    C.drawString(M, 27, 'pixaloom.co.za/capabilities')
    C.linkURL('https://www.pixaloom.co.za/capabilities', (M, 22, 205, 36))
    C.drawRightString(W-M, 27, f'{DATA["date"]}  /  {page:02}')
    y = H - 76
    para(label.upper(), 8.5, 12, '#52636c', 'Helvetica-Bold', 16)

def picture(src, max_h=205, caption=None):
    global y
    path = ROOT / 'public' / src.lstrip('/')
    image = ImageReader(str(path))
    iw, ih = image.getSize()
    scale = min(CW / iw, max_h / ih)
    dw, dh = iw*scale, ih*scale
    C.drawImage(image, M+(CW-dw)/2, y-dh, dw, dh, mask='auto')
    y -= dh + 8
    if caption:
        para(html.escape(caption), 8, 11, '#52636c', gap=15)

new_page('Selected work / Development capabilities')
para('From a good idea<br/>to a working system.', 43, 47, '#14242b', 'Times-Roman', 25)
para(html.escape(DATA['intro']), 13, 20, gap=25)
para('CUSTOM SOFTWARE / WORDPRESS / CONNECTED SYSTEMS', 9, 14, '#52636c', 'Helvetica-Bold', 20)
for name, detail in [
    ('Illumi', 'AI-assisted invoicing, six payment integrations, reviewed data imports and organic search growth.'),
    ('Team Colours', 'WordPress and WooCommerce experience, apparel catalogues and campaign-led storefront design.'),
    ('Slip a Tip', 'QR tipping, fee calculations, ledger entries, settlement holds and withdrawal workflows.'),
    ('TrakCare scanner', 'A mobile barcode workflow for authorised clinicians accessing an existing clinical system.')]:
    para(name, 16, 20, '#14242b', 'Times-Bold', 4)
    para(detail, 11, 16, gap=17)
para('Based in George, South Africa. Working with businesses nationwide.', 10, 15, gap=12)
para('<b>Contact</b>  info@pixaloom.co.za  |  066 299 5533', 11, 16, '#14242b', gap=8)
para('<link href="https://www.pixaloom.co.za/contact" color="#24576b">Discuss a project at pixaloom.co.za/contact</link>', 10, 15)

for section in DATA['sections']:
    new_page(section['eyebrow'])
    para(html.escape(section['title']), 29, 32, '#14242b', 'Times-Roman', 13)
    para(html.escape(section['intro']), 10.5, 15, gap=15)
    if section['id'] == 'payments':
        para(' / '.join(DATA['providers']), 10, 15, '#24576b', 'Helvetica-Bold', 13)
    if section['id'] == 'growth':
        para('1,655 clicks     553K impressions     9.9 average position', 16, 22, '#14242b', 'Times-Bold', 16)
    picture(section['image'], 260, section['caption'])
    for point in section['points']:
        para('- ' + html.escape(point), 10.5, 15, gap=5)
    y -= 7
    para(html.escape(section['note']), 8, 11, '#52636c', gap=10)
    para(f'<link href="https://www.pixaloom.co.za{section["link"]}" color="#24576b">Explore the project and related work online</link>', 9, 13, gap=0)
    if section['id'] == 'assistant':
        new_page('Illumi / The experience in practice')
        para('From conversation<br/>to a useful record.', 31, 35, '#14242b', 'Times-Roman', 18)
        picture('/capabilities/illumi-assistant.png', 335, 'Owner-supplied assistant screenshot: a completed client record using explicitly fictional test-company details.')
        picture('/portfolio/2026-10-19/illumi-detail-1.png', 190, 'Illumi public invoicing-page capture with an illustrative invoice. Sample data, not a customer invoice.')

new_page('Further work / Skills / Contact')
para('Built around the problem.<br/>Not a single platform.', 32, 36, '#14242b', 'Times-Roman', 22)
for item in DATA['other']:
    para(html.escape(item['name']), 17, 21, '#14242b', 'Times-Bold', 5)
    para(html.escape(item['description']), 10.5, 16, gap=17)
para('Technical strengths', 21, 25, '#14242b', 'Times-Roman', 12)
para(' / '.join(DATA['skills']), 10.5, 18, gap=25)
para('Let’s build something useful.', 27, 31, '#14242b', 'Times-Roman', 14)
para('Cameron Falck / Pixaloom<br/>George, Western Cape, South Africa<br/>info@pixaloom.co.za / 066 299 5533', 11, 18, gap=12)
para('<link href="https://www.pixaloom.co.za/contact" color="#24576b">Start a conversation</link>  /  <link href="https://www.pixaloom.co.za/capabilities" color="#24576b">View the online capabilities page</link>', 11, 16)
bottoms.append(round(y,1))
assert y > 51, f'Content overflows page {page}'
C.save()
print(json.dumps({'output': str(OUT), 'pages': page, 'content_bottoms': bottoms}))
