import re

with open("about.html", "r", encoding="utf-8") as f:
    about_html = f.read()

# Fix About page Seek Light. Stay Light. split line issue
about_html = re.sub(
    r'<h1([^>]*)flex flex-col([^>]*)>\s*<span>Seek <span class="italic font-normal">Light\.</span>\s*<span>Stay <span class="italic font-normal">Light\.</span></span>\s*</span></h1>',
    r'<h1\1flex flex-row flex-wrap justify-center gap-2 md:gap-4\2>\n<span>Seek <span class="italic font-normal">Light.</span></span>\n<span>Stay <span class="italic font-normal">Light.</span></span>\n</h1>',
    about_html
)

with open("about.html", "w", encoding="utf-8") as f:
    f.write(about_html)

print("about fixed")
