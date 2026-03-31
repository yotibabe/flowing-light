import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # STRIP EVERYTHING OUT AT THE BOTTOM
    # Find </main> or </article> and just remove everything between the end of the article text and the closing tag
    # Actually it's safer to just regex out the specific blocks.
    
    # Block 1
    content = re.sub(r'<div class="w-full flex flex-col items-center gap-3">.*?Read Full Transcript on WeChat</span>\s*</div>', '', content, flags=re.DOTALL)
    # Block 2
    content = re.sub(r'<div class="flex flex-col items-center gap-3 md:gap-4 my-16 md:my-24">.*?Read Full Transcript on WeChat</span>\s*</div>', '', content, flags=re.DOTALL)
    # Block 3
    content = re.sub(r'<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10[^>]*>.*?就现在，来讲吧.*?</buttonimport glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r'ttom Breadcrum
for fil Na    with open(file, '"r"') as f:
        cofl        content = f.read()

    # STRen
    # STRIP EVERYTHING Oicl    # Find </main> or </article> and judi    # Actually it'"s safer to just regex out the specific blocks.