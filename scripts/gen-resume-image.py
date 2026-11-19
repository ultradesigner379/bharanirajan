"""Build a faithful one-page resume PDF from the uploaded resume image.

The page size matches the image's aspect ratio so the image fills the page
edge-to-edge (no white borders). Output: public/resume.pdf (replaces the
placeholder). The original image is also copied to public/resume.png.
"""
from PIL import Image
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import shutil
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_IMG = os.path.join(ROOT, "upload", "pasted_image_1795080279704.png")
OUT_PDF = os.path.join(ROOT, "public", "resume.pdf")
OUT_PNG = os.path.join(ROOT, "public", "resume.png")

# 1) copy the original image so it's viewable on the site
shutil.copyfile(SRC_IMG, OUT_PNG)
print(f"copied image -> {OUT_PNG}")

# 2) build the PDF, page sized to the image aspect ratio, full-bleed
im = Image.open(SRC_IMG).convert("RGB")
w, h = im.size

# scale so the longer side is ~11in (792pt) for a sensible on-screen PDF size
scale = (11 * inch) / max(w, h)
page_w = w * scale
page_h = h * scale

c = canvas.Canvas(OUT_PDF, pagesize=(page_w, page_h))
c.setTitle("Resume - S. Bharani Rajan (Ultra Designer)")
c.setAuthor("S. Bharani Rajan")
c.setSubject("Resume / CV")
c.setCreator("Ultra Designer (UD)")

img_reader = ImageReader(im)
# draw full-bleed: image occupies the entire page
c.drawImage(img_reader, 0, 0, width=page_w, height=page_h, preserveAspectRatio=False)
c.showPage()
c.save()

size = os.path.getsize(OUT_PDF)
print(f"wrote {OUT_PDF} ({size} bytes, page {page_w:.0f}x{page_h:.0f}pt)")
