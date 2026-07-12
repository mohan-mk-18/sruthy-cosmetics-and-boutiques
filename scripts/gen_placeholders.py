"""
Generates elegant editorial placeholder images for Sruthy Cosmetics And Boutiques.
Not final photography — swap these out with real atelier/product photography before launch.
Each image is produced as both .jpg and .webp per the design brief.
"""
import os
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

# Brand palette
IVORY = (247, 232, 236)      # Soft Pale Rose — base background
ROSE_GOLD = (197, 124, 138)  # Dusty Mauve / Soft Wine — accent/CTA
SOFT_GOLD = (168, 93, 109)   # deeper wine — secondary accent
CORAL = (197, 124, 138)      # same accent color, kept as a separate name for clarity
BLUSH = (240, 211, 218)      # light tint
CHARCOAL = (26, 11, 18)      # Near-Black Plum — text

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def gradient(size, c1, c2, direction="diag"):
    w, h = size
    img = Image.new("RGB", size, c1)
    px = img.load()
    for y in range(h):
        for x in range(w):
            if direction == "diag":
                t = (x / w + y / h) / 2
            elif direction == "vert":
                t = y / h
            else:
                t = x / w
            px[x, y] = lerp(c1, c2, t)
    return img

def add_label(img, title, subtitle, ratio_tag):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    # soft glass panel
    panel_h = int(h * 0.22)
    panel = Image.new("RGBA", (w, panel_h), (255, 255, 255, 70))
    img.paste(panel, (0, h - panel_h), panel)
    draw = ImageDraw.Draw(img, "RGBA")
    try:
        f_title = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", int(h * 0.055))
        f_sub = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", int(h * 0.028))
    except Exception:
        f_title = ImageFont.load_default()
        f_sub = ImageFont.load_default()
    draw.text((w * 0.06, h - panel_h + panel_h * 0.18), title, font=f_title, fill=(30, 30, 30, 235))
    draw.text((w * 0.06, h - panel_h + panel_h * 0.62), subtitle, font=f_sub, fill=(30, 30, 30, 190))
    draw.text((w * 0.06, h * 0.04), ratio_tag, font=f_sub, fill=(255, 255, 255, 230))
    return img

def make(name, size, c1, c2, title, subtitle, direction="diag"):
    ratio_tag = f"{size[0]}×{size[1]} · PLACEHOLDER"
    img = gradient(size, c1, c2, direction)
    img = add_label(img, title, subtitle, ratio_tag)
    jpg_path = os.path.join(OUT_DIR, f"{name}.jpg")
    webp_path = os.path.join(OUT_DIR, f"{name}.webp")
    img.convert("RGB").save(jpg_path, "JPEG", quality=86)
    img.convert("RGB").save(webp_path, "WEBP", quality=86)
    print("wrote", name)

# Hero — 16:9
make("hero-hero-1", (1600, 900), IVORY, ROSE_GOLD, "Sruthy Cosmetics And Boutiques", "Editorial hero — swap for real atelier photography", "diag")

# Bridal collection hero — wide editorial
make("bridal-collection-hero", (1400, 1000), BLUSH, ROSE_GOLD, "Bridal Collection", "Two-column editorial split image", "vert")

# Store front — 4:3
make("store-front", (1200, 900), IVORY, SOFT_GOLD, "Sruthy — Store Front", "Location strip imagery", "horiz")

# Instagram placeholders — 1:1 grid x6
for i in range(1, 7):
    c2 = [ROSE_GOLD, SOFT_GOLD, CORAL, BLUSH][i % 4]
    make(f"instagram-placeholder-{i}", (800, 800), IVORY, c2, "@sruthycosmetics", f"Post {i}", "diag")

# Category cards — 4:5 portrait
categories = [
    ("category-jewellery", "Jewellery"),
    ("category-beauty-products", "Beauty Products"),
    ("category-boutique", "Boutique"),
    ("category-bridal-accessories", "Bridal Accessories"),
    ("category-handbags", "Handbags"),
    ("category-hair-accessories", "Hair Accessories"),
    ("category-gift-items", "Gift Items"),
]
for slug, label in categories:
    make(slug, (960, 1200), IVORY, ROSE_GOLD, label, "Category cover — 4:5", "vert")

# Product cards — 4:5 portrait, 10 sample products
products = [
    ("jewellery-earrings-1", "Rose Gold Drop Earrings"),
    ("jewellery-necklace-1", "Kundan Bridal Necklace"),
    ("jewellery-bangles-1", "Gold Covering Bangles Set"),
    ("jewellery-wedding-set-1", "Temple Wedding Jewellery Set"),
    ("beauty-serum-1", "Radiance Vitamin C Serum"),
    ("beauty-lipstick-1", "Velvet Matte Lipstick — Coral Muse"),
    ("beauty-sunscreen-1", "Silk Matte Sunscreen SPF 50"),
    ("boutique-bridal-costume-1", "Aari Work Bridal Blouse"),
    ("boutique-stitching-1", "Customised Anarkali Stitching"),
    ("beauty-foundation-1", "Second-Skin Foundation"),
]
for slug, label in products:
    make(slug, (960, 1200), IVORY, SOFT_GOLD, label, "Product placeholder — 4:5", "diag")

# Gallery masonry — mixed 1:1 and 4:5
gallery = [
    ("gallery-1", (900, 900)),
    ("gallery-2", (900, 1125)),
    ("gallery-3", (900, 900)),
    ("gallery-4", (900, 1125)),
    ("gallery-5", (900, 900)),
    ("gallery-6", (900, 1125)),
]
for slug, size in gallery:
    make(slug, size, BLUSH, ROSE_GOLD, "Atelier Gallery", "Masonry tile", "diag")

print("done")
