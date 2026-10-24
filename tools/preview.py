"""Local preview of learnwithlane.com without Ruby or Jekyll.

GitHub Pages builds the live site with Jekyll. This machine has no Ruby, so this
script does the small part of Jekyll the site uses and serves the result:

  - strips YAML front matter (reading `header_cta_text` / `header_cta_url` from it)
  - replaces {% include name.html %} with _includes/name.html
  - replaces {{ page.key | default: 'x' }} with the front-matter value or 'x'

Anything else in Liquid is left alone, so keep page Liquid to those three forms.

Run: python tools/preview.py               (builds _preview/ and serves http://localhost:4000)
     python tools/preview.py --port 8765   (another port)
     python tools/preview.py --build       (build only)
"""
import http.server
import re
import shutil
import sys
from functools import partial
from pathlib import Path

SITE = Path(__file__).resolve().parent.parent
OUT = SITE / "_preview"
SKIP = {".git", "_preview", "_includes", "tools", "Hero Images", "Preproject Planning"}
FRONT = re.compile(r"\A---\n(.*?)---\n", re.S)
INCLUDE = re.compile(r"{%\s*include\s+([\w.-]+)\s*%}")
VAR = re.compile(r"{{\s*page\.(\w+)\s*\|\s*default:\s*'([^']*)'\s*}}")


def render(text):
    m = FRONT.match(text)
    if not m:
        return text
    page = dict(re.findall(r"^(\w+):\s*(.*)$", m.group(1), re.M))
    text = text[m.end():]
    for _ in range(3):  # includes may include
        text = INCLUDE.sub(lambda i: (SITE / "_includes" / i.group(1)).read_text(encoding="utf-8"), text)
    return VAR.sub(lambda v: page.get(v.group(1), v.group(2)).strip("\"'"), text)


def build():
    if OUT.exists():
        shutil.rmtree(OUT)
    for src in SITE.rglob("*"):
        rel = src.relative_to(SITE)
        if rel.parts[0] in SKIP or src.is_dir():
            continue
        dst = OUT / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        if src.suffix == ".html":
            dst.write_text(render(src.read_text(encoding="utf-8")), encoding="utf-8")
        else:
            shutil.copy2(src, dst)
    print(f"built {OUT}")


if __name__ == "__main__":
    build()
    if "--build" not in sys.argv:
        port = int(sys.argv[sys.argv.index("--port") + 1]) if "--port" in sys.argv else 4000
        handler = partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
        print(f"serving http://localhost:{port}")
        http.server.ThreadingHTTPServer(("", port), handler).serve_forever()
