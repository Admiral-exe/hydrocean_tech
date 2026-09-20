import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

OUT_DIR = r"D:\temp\ro_purifier\hydrocean\public\images\products"

def get_font(size, bold=False):
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "seguiemb.ttf" if bold else "segoeui.ttf",
        "calibrib.ttf" if bold else "calibri.ttf"
    ]
    for name in font_names:
        try:
            return ImageFont.truetype(name, size)
        except Exception:
            continue
    return ImageFont.load_default()

def create_product_image(base_src, out_name, title, subtitle, badge_text, color_shift=(1.0, 1.0, 1.0), theme_color="#0b3b60"):
    src_path = os.path.join(OUT_DIR, base_src)
    im = Image.open(src_path).convert("RGBA")
    w, h = im.size
    
    # Color balance adjustment if specified
    if color_shift != (1.0, 1.0, 1.0):
        r, g, b, a = im.split()
        r = r.point(lambda i: min(255, int(i * color_shift[0])))
        g = g.point(lambda i: min(255, int(i * color_shift[1])))
        b = b.point(lambda i: min(255, int(i * color_shift[2])))
        im = Image.merge("RGBA", (r, g, b, a))

    # Subtle modern overlay badge at top
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    # Top Brand Badge
    font_badge = get_font(int(h * 0.024), bold=True)
    badge_w = int(w * 0.38)
    badge_h = int(h * 0.055)
    bx = 40
    by = 40
    draw.rounded_rectangle([bx, by, bx + badge_w, by + badge_h], radius=14, fill=(255, 255, 255, 230), outline=(180, 210, 235, 220), width=2)
    draw.text((bx + 16, by + 12), badge_text, fill=theme_color, font=font_badge)

    # Bottom Model Watermark Tag
    font_title = get_font(int(h * 0.028), bold=True)
    font_sub = get_font(int(h * 0.018), bold=False)
    
    tag_w = int(w * 0.44)
    tag_h = int(h * 0.08)
    tx = w - tag_w - 40
    ty = h - tag_h - 40
    draw.rounded_rectangle([tx, ty, tx + tag_w, ty + tag_h], radius=16, fill=(255, 255, 255, 240), outline=(200, 220, 240, 230), width=2)
    draw.text((tx + 18, ty + 10), title, fill="#0b3b60", font=font_title)
    draw.text((tx + 18, ty + 42), subtitle, fill="#64748b", font=font_sub)

    final_im = Image.alpha_composite(im, overlay).convert("RGB")
    final_path = os.path.join(OUT_DIR, out_name)
    final_im.save(final_path, "JPEG", quality=95)
    print(f"Generated {out_name}")

# Custom Stainless Steel Commercial RO With Cooler
def generate_ro_with_cooler():
    w, h = 1024, 1024
    im = Image.new("RGB", (w, h), "#f4f7fa")
    draw = ImageDraw.Draw(im)

    # Studio background gradient / subtle lighting
    for y in range(h):
        shade = int(244 - (y / h) * 18)
        draw.line([(0, y), (w, y)], fill=(shade, shade + 3, shade + 8))

    # Base ground plane shadow
    draw.ellipse([180, 880, 844, 940], fill="#cbd5e1")

    # Stainless steel cooler body (tall standing cabinet)
    cx1, cy1, cx2, cy2 = 260, 160, 764, 890
    
    # Cooler main stainless steel cabinet with vertical metallic gradient
    for x in range(cx1, cx2):
        pos = (x - cx1) / (cx2 - cx1)
        # brushed steel metallic reflection
        if 0.15 < pos < 0.35:
            col = int(220 + 35 * (1 - abs(pos - 0.25) / 0.1))
        elif 0.65 < pos < 0.85:
            col = int(210 + 40 * (1 - abs(pos - 0.75) / 0.1))
        else:
            col = int(185 + 25 * pos)
        draw.line([(x, cy1), (x, cy2)], fill=(col, col + 2, col + 6))

    # Cabinet borders and bevel
    draw.rectangle([cx1, cy1, cx2, cy2], outline="#94a3b8", width=3)

    # Top cooling tank lid
    draw.rounded_rectangle([cx1 - 8, cy1 - 25, cx2 + 8, cy1 + 10], radius=8, fill="#e2e8f0", outline="#94a3b8", width=2)

    # Dispensing Alcove
    ax1, ay1, ax2, ay2 = 320, 240, 704, 480
    draw.rounded_rectangle([ax1, ay1, ax2, ay2], radius=14, fill="#1e293b", outline="#0f172a", width=2)
    # Deep stainless steel backsplash inside alcove
    draw.rounded_rectangle([ax1 + 8, ay1 + 8, ax2 - 8, ay2 - 8], radius=10, fill="#334155")

    # Twin dispensing push faucets (Left: Chilled Blue, Right: Ambient Green)
    # Tap 1 - Chilled
    draw.rounded_rectangle([390, 280, 440, 360], radius=8, fill="#cbd5e1", outline="#64748b", width=2)
    draw.rectangle([410, 360, 420, 410], fill="#94a3b8")
    draw.ellipse([400, 410, 430, 424], fill="#38bdf8") # Blue water drop spout
    draw.rounded_rectangle([380, 255, 450, 275], radius=5, fill="#0284c7") # Cold push lever

    # Tap 2 - Ambient / Pure RO
    draw.rounded_rectangle([580, 280, 630, 360], radius=8, fill="#cbd5e1", outline="#64748b", width=2)
    draw.rectangle([600, 360, 610, 410], fill="#94a3b8")
    draw.ellipse([590, 410, 620, 424], fill="#10b981") # Green water drop spout
    draw.rounded_rectangle([570, 255, 640, 275], radius=5, fill="#059669") # Normal push lever

    # Drip Tray with stainless steel grill slats
    draw.rounded_rectangle([340, 450, 684, 474], radius=6, fill="#64748b", outline="#475569", width=2)
    for sx in range(355, 670, 14):
        draw.line([(sx, 453), (sx, 471)], fill="#1e293b", width=2)

    # Built-in RO System Viewing Window / Front Panel
    rx1, ry1, rx2, ry2 = 320, 520, 704, 760
    draw.rounded_rectangle([rx1, ry1, rx2, ry2], radius=12, fill="#0f172a", outline="#38bdf8", width=2)
    
    # Internal RO membranes and pre-filters visible through acrylic window
    # 2 horizontal membrane vessels
    draw.rounded_rectangle([340, 545, 684, 580], radius=8, fill="#f8fafc", outline="#cbd5e1", width=2)
    draw.text((430, 552), "RO MEMBRANE 100 GPD", fill="#0369a1", font=get_font(18, bold=True))
    
    draw.rounded_rectangle([340, 595, 684, 630], radius=8, fill="#f8fafc", outline="#cbd5e1", width=2)
    draw.text((430, 602), "RO MEMBRANE 100 GPD", fill="#0369a1", font=get_font(18, bold=True))

    # Dual vertical pre-filters below
    draw.rounded_rectangle([370, 645, 450, 745], radius=8, fill="#0284c7", outline="#0369a1", width=2)
    draw.text((385, 685), "SEDIMENT", fill="#ffffff", font=get_font(12, bold=True))

    draw.rounded_rectangle([480, 645, 560, 745], radius=8, fill="#0284c7", outline="#0369a1", width=2)
    draw.text((490, 685), "CARBON", fill="#ffffff", font=get_font(12, bold=True))

    draw.rounded_rectangle([590, 645, 670, 745], radius=8, fill="#10b981", outline="#059669", width=2)
    draw.text((605, 685), "MINERAL", fill="#ffffff", font=get_font(12, bold=True))

    # Commercial Ventilation Louvers at bottom
    for vy in range(790, 860, 12):
        draw.line([(340, vy), (684, vy)], fill="#64748b", width=3)
        draw.line([(340, vy+3), (684, vy+3)], fill="#cbd5e1", width=1)

    # Top Brand and Spec Badges
    font_badge = get_font(24, bold=True)
    draw.rounded_rectangle([40, 40, 440, 95], radius=14, fill=(255, 255, 255), outline="#0284c7", width=2)
    draw.text((58, 52), "COMMERCIAL RO + COOLER", fill="#0b3b60", font=font_badge)

    draw.rounded_rectangle([w - 460, h - 120, w - 40, h - 40], radius=16, fill=(255, 255, 255), outline="#cbd5e1", width=2)
    draw.text((w - 440, h - 108), "RO WITH COOLER", fill="#0b3b60", font=get_font(28, bold=True))
    draw.text((w - 440, h - 74), "40L Cold Storage • Dual Dispensing Taps", fill="#64748b", font=get_font(18, bold=False))

    out_path = os.path.join(OUT_DIR, "ro-with-cooler.jpg")
    im.save(out_path, "JPEG", quality=95)
    print("Generated ro-with-cooler.jpg")

# Run generation
generate_ro_with_cooler()

# 14. AQUA ALIVE
create_product_image(
    "aqua-mars.jpg",
    "aqua-alive.jpg",
    "AQUA ALIVE",
    "RO + UV + Active Minerals • 10L",
    "ACTIVE MINERAL INFUSION",
    color_shift=(0.95, 1.05, 1.15),
    theme_color="#0284c7"
)

# 16. AQUA 9090
create_product_image(
    "lx-two.jpg",
    "aqua-9090.jpg",
    "AQUA 9090",
    "Multi-stage RO+UV+MTDS • 11L",
    "ADVANCED MTDS CASCADE",
    color_shift=(0.9, 0.9, 0.95),
    theme_color="#0f172a"
)

# 17. Aqua NINE
create_product_image(
    "dolphin-aqua.jpg",
    "aqua-nine.jpg",
    "AQUA NINE",
    "High Recovery RO+UV • 10L",
    "SMART 10L TANK PURIFIER",
    color_shift=(1.05, 1.05, 0.95),
    theme_color="#0b3b60"
)

# 18. Aqua ZURIC
create_product_image(
    "aqua-glance.jpg",
    "aqua-zuric.jpg",
    "AQUA ZURIC",
    "Swiss Alkaline Purification • 10L",
    "SWISS DESIGN ALKALINE",
    color_shift=(0.9, 1.05, 1.1),
    theme_color="#0891b2"
)

# 19. Aqua 2090
create_product_image(
    "aqua-neeo.jpg",
    "aqua-2090.jpg",
    "AQUA 2090",
    "Copper + Zinc RO+UV • 12L",
    "ACTIVE COPPER & ZINC",
    color_shift=(1.1, 0.98, 0.9),
    theme_color="#c2410c"
)

# 20. Aqua innovica
create_product_image(
    "aqua-jade.jpg",
    "aqua-innovica.jpg",
    "AQUA INNOVICA",
    "Digital TDS Touchscreen • 10L",
    "SMART DIGITAL TOUCHSCREEN",
    color_shift=(0.92, 0.95, 1.08),
    theme_color="#4338ca"
)

# 21. Aqua v5
create_product_image(
    "lexcru-lexzon.jpg",
    "aqua-v5.jpg",
    "AQUA V5",
    "7-Stage Silent Booster • 10L",
    "7-STAGE SILENT CASCADE",
    color_shift=(1.0, 1.1, 1.05),
    theme_color="#059669"
)

print("All 21 product images generated and ready in public/images/products!")
