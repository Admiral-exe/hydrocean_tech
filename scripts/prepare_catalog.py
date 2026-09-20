import os
import shutil
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

ART_DIR = r"C:\Users\harsh\.gemini\antigravity-ide\brain\6989f669-1b8a-4bce-b3c8-9e67bf7cb5a0"
OUT_DIR = r"D:\temp\ro_purifier\hydrocean\public\images\products"

os.makedirs(OUT_DIR, exist_ok=True)

# 1. Map the 13 generated images
MAPPING = {
    "lexcru_lexzon_1789892923104.jpg": "lexcru-lexzon.jpg",
    "watermark_purifier_1789892941962.jpg": "water-mark-purifier.jpg",
    "aqua_mars_1789892960813.jpg": "aqua-mars.jpg",
    "all_filters_set_1789892989079.jpg": "all-filters.jpg",
    "aqua_glance_1789893014227.jpg": "aqua-glance.jpg",
    "aqua_c3_1789893129137.jpg": "aqua-c3.jpg",
    "dolphin_aqua_1789893220656.jpg": "dolphin-aqua.jpg",
    "aqua_jade_1789893255690.jpg": "aqua-jade.jpg",
    "commercial_50lph_ro_1789893301440.jpg": "commercial-30-to-50-lph-ro.jpg",
    "commercial_ro_system_1789893336936.jpg": "commercial-ro.jpg",
    "lx_two_1789893359366.jpg": "lx-two.jpg",
    "all_types_membranes_1789893382757.jpg": "all-types-of-membranes.jpg",
    "aqua_neeo_1789893408969.jpg": "aqua-neeo.jpg",
}

for src_name, dst_name in MAPPING.items():
    src_path = os.path.join(ART_DIR, src_name)
    dst_path = os.path.join(OUT_DIR, dst_name)
    if os.path.exists(src_path):
        shutil.copyfile(src_path, dst_path)
        print(f"Copied {src_name} -> {dst_name}")
    else:
        print(f"Warning: {src_path} does not exist!")

print("13 generated images copied successfully!")
