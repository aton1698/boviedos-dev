# Regenerates public/capabilities/*.svg (brand wave style). Usage: python3 scripts/generate-capability-images.py public/capabilities
import math, sys
OUT = sys.argv[1]
E, S, R = "#2563ff", "#93c5fd", "#1e40af"
W, H = 1200, 800

def waves(n):
    out = []
    for k in range(3):
        amp = 50 + k * 26
        freq = (0.9 + 0.2 * k) * math.pi * 2 / W
        ph = n * 0.7 + k * 1.1
        base = H * (0.2 + 0.3 * k)
        pts = " L".join(f"{x},{base + amp * math.sin(freq * x + ph):.1f}" for x in range(0, W + 1, 24))
        out.append(f'<path d="M{pts}" fill="none" stroke="{R if k != 1 else E}" stroke-width="2" opacity="0.35"/>')
    return "\n".join(out)

def wrap(n, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0b1a46"/><stop offset="1" stop-color="#030816"/></linearGradient>
<radialGradient id="halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="{E}" stop-opacity="0.45"/><stop offset="1" stop-color="{E}" stop-opacity="0"/></radialGradient>
<filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/>
<ellipse cx="600" cy="400" rx="430" ry="300" fill="url(#halo)"/>
{waves(n)}
<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3">
{body}
</g>
</svg>
'''

def dot(x, y, r=7, c=E): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}" stroke="none"/>'
def rect(x, y, w, h, r=14, c=S, f="none", sw=3, extra=""): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" stroke="{c}" fill="{f}" stroke-width="{sw}" {extra}/>'
def line(x1, y1, x2, y2, c=S, sw=3, extra=""): return f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{c}" stroke-width="{sw}" {extra}/>'
def text(x, y, s, size=34, c=S, op=0.8): return f'<text x="{x}" y="{y}" font-family="Plus Jakarta Sans, Arial, sans-serif" font-weight="600" font-size="{size}" fill="{c}" opacity="{op}" stroke="none">{s}</text>'

# 1 Frontend: browser window with components
def frontend():
    b = [rect(320, 200, 560, 400, 22, S), line(320, 262, 880, 262, S, 2)]
    b += [dot(356, 231, 7, S), dot(382, 231, 7, E), dot(408, 231, 7, R)]
    b += [rect(350, 292, 120, 278, 12, R, "none", 2)]
    for i in range(3): b.append(line(366, 322 + i * 40, 450 - i * 18, 322 + i * 40, S, 3))
    b += [rect(500, 292, 350, 64, 12, E, "rgba(37,99,255,0.18)", 3), line(522, 324, 650, 324, S, 4)]
    b += [rect(500, 380, 166, 190, 14, S, "none", 3), rect(684, 380, 166, 190, 14, E, "rgba(37,99,255,0.22)", 3, 'filter="url(#glow)"')]
    b += [line(522, 410, 620, 410, S, 3), line(522, 440, 590, 440, S, 2), line(706, 410, 800, 410, S, 3), line(706, 440, 770, 440, S, 2)]
    b += [rect(706, 520, 96, 30, 15, S, E, 2), f'<path d="M795 505 L795 575 L812 560 L826 590 L840 583 L826 553 L850 553 Z" fill="{S}" stroke="#030816" stroke-width="2"/>']
    b.append(text(884, 650, "&lt;/&gt;", 40))
    return "\n".join(b)

# 2 Backend: stacked services + microservice nodes
def backend():
    b = []
    for i, y in enumerate((230, 340, 450)):
        b += [rect(300, y, 340, 80, 16, S if i != 1 else E, "rgba(37,99,255,0.16)" if i == 1 else "none", 3, 'filter="url(#glow)"' if i == 1 else "")]
        b += [dot(338, y + 40, 8, E), dot(366, y + 40, 8, S), line(410, y + 40, 600, y + 40, S, 3, 'stroke-dasharray="2 14"')]
    nodes = [(900, 250), (960, 400), (900, 550)]
    for (x, y), sy in zip(nodes, (270, 380, 490)):
        b.append(f'<path d="M640,{sy} C 760,{sy} 780,{y} {x-36},{y}" stroke="{E}" stroke-width="3"/>')
        b += [rect(x - 36, y - 36, 72, 72, 18, S, "rgba(147,197,253,0.12)", 3), dot(x, y, 9, E)]
    b += [line(900, 286, 960, 364, R, 2), line(960, 436, 900, 514, R, 2)]
    b += [text(200, 400, "{", 150, S, 0.5), text(1010, 480, "}", 150, S, 0.5)]
    for t in (0.25, 0.6):
        b.append(dot(round(640 + 120 * t), 270 + 0, 6, S))
    return "\n".join(b)

# 3 Architecture: layered blueprint
def architecture():
    b = [rect(500, 190, 200, 70, 14, S, "none", 3), text(540, 235, "client", 28, S, 0.9)]
    b += [rect(300, 340, 180, 70, 14, E, "rgba(37,99,255,0.18)", 3, 'filter="url(#glow)"'), rect(510, 340, 180, 70, 14, S, "none", 3), rect(720, 340, 180, 70, 14, S, "none", 3)]
    b += [rect(300, 500, 600, 70, 14, S, "none", 3), line(330, 535, 870, 535, R, 2, 'stroke-dasharray="4 12"')]
    for x in (390, 600, 810):
        b += [line(600, 260, x, 340, S, 2), line(x, 410, x, 500, S, 2), dot(x, 340, 6, E), dot(x, 500, 6, E)]
    b += [dot(600, 260, 7, E)]
    b += [rect(960, 330, 150, 90, 14, R, "none", 3, 'stroke-dasharray="10 8"'), line(900, 375, 960, 375, E, 3, 'stroke-dasharray="3 9"'), dot(960, 375, 7, E)]
    b += [text(990, 385, "API", 28, S, 0.9)]
    b += [rect(90, 330, 150, 90, 14, R, "none", 3, 'stroke-dasharray="10 8"'), line(240, 375, 300, 375, E, 3, 'stroke-dasharray="3 9"'), dot(300, 375, 7, E)]
    return "\n".join(b)

# 4 Cloud and data
def cloud():
    b = [f'<path d="M470 350 a62 62 0 0 1 -6 -124 a100 100 0 0 1 190 -26 a78 78 0 0 1 104 74 a56 56 0 0 1 -18 76 Z" stroke="{S}" fill="rgba(37,99,255,0.14)" stroke-width="3.5" filter="url(#glow)"/>']
    b += [line(600, 350, 600, 450, E, 3, 'stroke-dasharray="3 12"'), line(480, 350, 480, 450, E, 3, 'stroke-dasharray="3 12"'), line(720, 350, 720, 450, E, 3, 'stroke-dasharray="3 12"')]
    for x in (480, 600, 720):
        b += [f'<ellipse cx="{x}" cy="470" rx="62" ry="20" stroke="{S}" fill="none"/>', f'<path d="M{x-62},470 V560 a62,20 0 0 0 124,0 V470" stroke="{S}" fill="none"/>', f'<path d="M{x-62},515 a62,20 0 0 0 124,0" stroke="{R}" fill="none" stroke-width="2"/>', dot(x, 450, 6, E)]
    b += [text(860, 310, "S3", 34, S, 0.8), text(210, 330, "SQL", 34, S, 0.8), text(900, 540, "λ", 56, S, 0.7)]
    return "\n".join(b)

# 5 Quality
def quality():
    shield = "M600 190 L770 255 V400 C770 490 700 555 600 600 C500 555 430 490 430 400 V255 Z"
    b = [f'<path d="{shield}" stroke="{S}" fill="rgba(37,99,255,0.16)" stroke-width="3.5" filter="url(#glow)"/>', f'<path d="M525 395 L585 455 L685 335" stroke="{E}" stroke-width="12" fill="none"/>', f'<path d="M525 395 L585 455 L685 335" stroke="{S}" stroke-width="4" fill="none"/>']
    for i, y in enumerate((300, 380, 460)):
        b += [rect(130, y - 22, 220, 44, 12, S if i != 1 else E, "none", 2), line(150, y, 250 - i * 14, y, S, 3), f'<path d="M300 {y} l10 10 l20 -20" stroke="{E}" stroke-width="4" fill="none"/>', line(350, y, 430, 400 if i == 1 else y + (400 - y) * 0.6, R, 2, 'stroke-dasharray="3 9"')]
    for i, hgt in enumerate((90, 150, 220, 290)):
        x = 830 + i * 62
        b.append(rect(x, 600 - hgt, 44, hgt, 8, S if i < 3 else E, "rgba(37,99,255,0.22)" if i == 3 else "none", 3))
    b.append(line(820, 600, 1100, 600, R, 2))
    return "\n".join(b)

# 6 Troubleshooting
def trouble():
    b = []
    lens_c = (560, 390)
    lens_r = 120
    for i, (y, w) in enumerate(((250, 380), (300, 300), (350, 420), (400, 260), (450, 360), (500, 320), (550, 400))):
        b.append(line(330, y, 330 + w, y, R if i != 3 else E, 4 if i == 3 else 3))
    b += [f'<circle cx="{lens_c[0]}" cy="{lens_c[1]}" r="{lens_r}" stroke="{S}" fill="rgba(3,8,22,0.55)" stroke-width="5" filter="url(#glow)"/>']
    b += [line(lens_c[0] + 85, lens_c[1] + 85, 760, 590, S, 14), line(lens_c[0] + 85, lens_c[1] + 85, 760, 590, E, 6)]
    b += [line(470, 340, 650, 340, S, 4), line(470, 390, 600, 390, E, 8), line(470, 440, 640, 440, S, 4)]
    b += [dot(650, 390, 8, E), text(860, 330, "fix()", 38, S, 0.85)]
    b += [f'<path d="M850 400 q60 -30 120 0 t120 0" stroke="{E}" stroke-width="3"/>', f'<path d="M920 470 l22 24 l44 -52" stroke="{S}" stroke-width="6"/>', f'<circle cx="942" cy="470" r="46" stroke="{E}" stroke-width="3"/>']
    return "\n".join(b)

# 7 AI-driven
def ai():
    cx, cy = 600, 400
    star = f"M{cx} {cy-92} Q{cx+10} {cy-10} {cx+92} {cy} Q{cx+10} {cy+10} {cx} {cy+92} Q{cx-10} {cy+10} {cx-92} {cy} Q{cx-10} {cy-10} {cx} {cy-92} Z"
    pts = []
    for r, n, off in ((190, 6, 0.3), (310, 8, 0.1)):
        for k in range(n):
            a = off + k * 2 * math.pi / n
            pts.append((cx + r * 1.25 * math.cos(a), cy + r * 0.78 * math.sin(a), r))
    b = []
    inner = [p for p in pts if p[2] == 190]
    outer = [p for p in pts if p[2] == 310]
    for x, y, _ in inner: b.append(line(cx, cy, round(x), round(y), R, 2))
    for i, (x, y, _) in enumerate(outer):
        ix, iy, _ = inner[i * len(inner) // len(outer)]
        b.append(line(round(ix), round(iy), round(x), round(y), R, 2))
    for i in range(len(inner)):
        x1, y1, _ = inner[i]; x2, y2, _ = inner[(i + 1) % len(inner)]
        b.append(line(round(x1), round(y1), round(x2), round(y2), S, 2, 'opacity="0.5"'))
    for x, y, r in pts: b.append(dot(round(x), round(y), 8 if r == 190 else 6, S if r == 190 else E))
    b += [f'<path d="{star}" fill="{S}" stroke="{E}" stroke-width="3" filter="url(#glow)"/>', f'<circle cx="{cx}" cy="{cy}" r="150" stroke="{E}" stroke-width="2" opacity="0.5" fill="none" stroke-dasharray="4 12"/>']
    b += [text(120, 220, "&lt;/&gt;", 46, S, 0.7), text(980, 640, "MCP", 34, S, 0.7)]
    return "\n".join(b)

# 8 Collaboration
def collab():
    def person(x, y, s, c=S, f="none"):
        return f'<circle cx="{x}" cy="{y-30*s}" r="{26*s}" stroke="{c}" fill="{f}"/><path d="M{x-48*s},{y+50*s} a{48*s},{44*s} 0 0 1 {96*s},0" stroke="{c}" fill="{f}"/>'
    pos = [(600, 330, 1.6), (330, 360, 1.0), (870, 360, 1.0), (440, 560, 1.0), (760, 560, 1.0)]
    b = []
    for x, y, _ in pos[1:]: b.append(f'<path d="M600,330 Q{(600+x)//2},{min(330,y)-60} {x},{y}" stroke="{E}" stroke-width="3" stroke-dasharray="3 10"/>')
    b += [f'<path d="M330,360 Q380,470 440,560" stroke="{R}" stroke-width="2"/>', f'<path d="M870,360 Q820,470 760,560" stroke="{R}" stroke-width="2"/>', f'<path d="M440,560 Q600,620 760,560" stroke="{R}" stroke-width="2"/>']
    b.append(person(*pos[0], c=E, f="rgba(37,99,255,0.25)").replace("<circle", '<circle filter="url(#glow)"', 1))
    for x, y, s in pos[1:]: b.append(person(x, y, s))
    b += [dot(465, 300, 7, S), dot(735, 300, 7, S), dot(380, 470, 6, E), dot(820, 470, 6, E)]
    b += [rect(520, 190, 160, 60, 30, S, "none", 2), line(555, 220, 645, 220, S, 3), text(250, 250, "?", 56, S, 0.6), text(930, 250, "!", 56, S, 0.6)]
    return "\n".join(b)

motifs = {"frontend": frontend, "backend": backend, "architecture": architecture, "cloud-data": cloud, "quality": quality, "troubleshooting": trouble, "ai-driven": ai, "collaboration": collab}
for n, (name, fn) in enumerate(motifs.items()):
    open(f"{OUT}/{name}.svg", "w").write(wrap(n, fn()))
