import glob
import re

# 1. Fix hero background in detail pages
for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # Remove the img tags in hero section
    content = re.sub(r'<!-- Image from the article -->\s*<img[^>]*>\s*<div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>', '', content)
    content = re.sub(r'<img alt="Vol \d+ Event" class="absolute inset-0[^>]*>', '', content)
    
    # Update the ethereal background to match index.html
    old_hero_start = r'<section class="relative w-full h-\[70vh\] md:h-\[85vh\] min-h-\[500px\] md:min-h-\[600px\] flex items-end overflow-hidden ethereal-gradient-bg">\s*<div class="absolute inset-0 z-0 fluid-focus-gradient"></div>'
    new_hero_start = """<section class="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden ethereal-gradient-bg">
<div class="absolute inset-0 z-0 fluid-focus-gradient"></div>
<div class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none"></div>
<div class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 pointer-events-none"></div>"""
    content = re.sub(old_hero_start, new_hero_start, content)

    # 2. Fix typography orphans (一行只剩一个字)
    content = content.replace('class="font-headline text-4xl sm:text-5xl md:text-7xl font-black text-on-surface leading-[1.15] tracking-tight mb-6 md:mb-8"', 
                              'class="font-headline text-4xl sm:text-5xl md:text-7xl font-black text-on-surface leading-[1.15] tracking-tight mb-6 md:mb-8 text-balance break-keep"')
    content = content.replace('class="font-headline text-xl sm:text-2xl md:text-3xl font-light text-on-surface-variant max-w-2xl leading-relaxed"',
                              'class="font-headline text-xl sm:text-2xl md:text-3xl font-light text-on-surface-variant max-w-2xl leading-relaxed text-balance break-keep"')
    
    # Tie the last words to the span to prevent the span from dropping alone
    content = re.sub(r' <span class="font-display italic font-normal text-primary">', 
                     r'&nbsp;<span class="font-display italic font-normal text-primary whitespace-nowrap">', content)

    with open(file, 'w') as f:
        f.write(content)

print("Detail pages fixed.")

# 3. Fix the reading links in vol1 and vol2
def replace_link(file_name, new_link):
    with open(file_name, 'r') as f:
        content = f.read()
    content = re.sub(r'<a href="https://mp.weixin.qq.com/s/[^"]+" target="_blank" rel="noopener noreferrer" class="group relative inline-flex items-center justify-center px-6 md:px-8 py-3',
                     f'<a href="{new_link}" target="_blank" rel="noopener noreferrer" class="group relative inline-flex items-center justify-center px-6 md:px-8 py-3', content)
    with open(file_name, 'w') as f:
        f.write(content)

replace_link('detail-vol1.html', 'https://mp.weixin.qq.com/s/n7VUsp6A3ZMP4yXcLIbZnQ')
replace_link('detail-vol2.html', 'https://mp.weixin.qq.com/s/4_NnYqmV0Ir43xcNGb-cCg')
print("Links updated.")
