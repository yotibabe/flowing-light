import os

html_path = 'index.html'

with open(html_path, 'r') as f:
    content = f.read()

# 1. Add fade-in and translate up to "什么是 Light" title and "Moments of Light" button
content = content.replace(
    '<h2 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>',
    '<h2 class="scroll-reveal-text delay-0 font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>'
)

content = content.replace(
    '<a href="archive.html" class="inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">',
    '<a href="archive.html" class="scroll-reveal-text delay-100 inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">'import os

html_path = '"index.html"'

witaragraphs to 
with open(html_path, '"r"de