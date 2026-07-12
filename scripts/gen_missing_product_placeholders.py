"""
Fills in placeholder images for any product photo referenced in
data/products.json that doesn't have a real file in public/images yet.

Run this any time new products are added to products.json before their real
photos are ready — it keeps the site from showing broken images. Once real
photos are dropped in via `npm run optimize-images` (see scripts/optimize-images.mjs),
they'll simply overwrite these placeholders (same filename = automatic swap).
"""
import json
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..")
PRODUCTS_JSON = os.path.join(ROOT, "data", "products.json")
OUT_DIR = os.path.join(ROOT, "public", "images")

IVORY = (247, 232, 236)
ROSE_GOLD = (197, 124, 138)
SOFT_GOLD = (168, 93, 109)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def gradient(size, c1, c2):
    w, h = size
    img = Image.new("RGB", size, c1)
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x / w + y / h) / 2
            px[x, y] = lerp(c1, c2, t)
    return img

def add_label(img, title):
    draw = ImageDraw.Draw(img, "RGBA")
    w, h = img.size
    panel_h = int(h * 0.24)
    panel = Image.new("RGBA", (w, panel_h), (255, 255, 255, 80))
    img.paste(panel, (0, h - panel_h), panel)
    draw = ImageDraw.Draw(img, "RGBA")
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", int(h * 0.045))
        font_sm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", int(h * 0.024))
    except Exception:
        font = ImageFont.load_default()
        font_sm = ImageFont.load_default()

    # simple word-wrap for the title within the card width
    words = title.split()
    lines, current = [], ""
    max_chars = 24
    for word in words:
        trial = f"{current} {word}".strip()
        if len(trial) > max_chars:
            lines.append(current)
            current = word
        else:
            current = trial
    if current:
        lines.append(current)
    lines = lines[:3]

    y = h - panel_h + panel_h * 0.12
    for line in lines:
        draw.text((w * 0.06, y), line, font=font, fill=(30, 30, 30, 235))
        y += h * 0.05
    draw.text((w * 0.06, h * 0.04), "PLACEHOLDER — PHOTO PENDING", font=font_sm, fill=(255, 255, 255, 230))
    return img

def make(path, title, size=(960, 1200)):
    img = gradient(size, IVORY, ROSE_GOLD if hash(title) % 2 == 0 else SOFT_GOLD)
    img = add_label(img, title)
    img.convert("RGB").save(path, "JPEG", quality=85)

def main():
    with open(PRODUCTS_JSON) as f:
        products = json.load(f)

    os.makedirs(OUT_DIR, exist_ok=True)
    created = 0
    for p in products:
        for img_path in p.get("images", []):
            fname = img_path.replace("/images/", "")
            full_path = os.path.join(OUT_DIR, fname)
            if os.path.exists(full_path):
                continue
            make(full_path, p["name"])
            created += 1
            print(f"created placeholder for {fname} ({p['name']})")

    print(f"\nDone — {created} placeholder image(s) created in public/images/")
    print("These will be automatically overwritten once real photos with the same filename are added via `npm run optimize-images`.")

if __name__ == "__main__":
    main()
