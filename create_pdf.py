import os
from PIL import Image

image_path = "public/images/timeline_infographic.jpg"
pdf_path = "public/timeline.pdf"

if os.path.exists(image_path):
    # Open image
    img = Image.open(image_path)
    # Convert to RGB (required for saving as PDF)
    if img.mode != "RGB":
        img = img.convert("RGB")
    # Save as PDF
    img.save(pdf_path, "PDF", resolution=100.0, save_all=True)
    print(f"Successfully created {pdf_path}")
else:
    print(f"Image not found at {image_path}")
