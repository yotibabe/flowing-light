import os
import glob
import re

base_dir = '/Users/zheliu/Desktop/light/flowing-light'
html_files = glob.glob(os.path.join(base_dir, '*.html')) + glob.glob(os.path.join(base_dir, 'episodes', '*', '*.html'))

def process_html(content):
    # 1. Colors (Color & Theme Tokens)
    content = content.replace('text-orange-950', 'text-on-surface')
    content = content.replace('text-orange-900', 'text-primary')
    content = content.replace('text-orange-800', 'text-primary')
    content = content.replace('text-orange-600', 'text-primary')
    content = content.replace('text-stone-900', 'text-on-surface')
    content = content.replace('text-stone-800', 'text-on-surface')
    content = content.replace('text-stone-600', 'text-on-surface-variant')
    content = content.replace('text-stone-500', 'text-on-surface-variant')
    content = content.replace('text-stone-400', 'text-outline')
    content = content.replace('bg-stone-100', 'bg-surface-container-low')
    
    # 2. No-Line Rule
    content = content.replace('border-b border-stone-200/50 md:border-none', 'md:border-none')
    content = content.replace('border-b border-stone-200/50', '')
    content = content.replace('border-t border-stone-200/50', '')
    content = content.replace('<footer class="w-full  bg-surface">', '<footer class="w-full bg-surface-container-low">')
    content = content.replace('<footer class="w-full bg-surface">', '<footer class="w-full bg-surface-container-low">')

    # 3. Buttons (克制美学)
    # Replace rounded-full specifically on some buttons
    content = re.sub(r'rounded-full([^>]*>成为嘉宾)', r'rounded-sm\1', content)
    content = content.replace('rounded-md bg-primary text-on-primary', 'rounded-sm bg-primary text-on-primary')
    content = content.replace('shadow-md shadow-primary/20', '')
    content = content.replace('shadow-lg hover:shadow-xl', '')
    content = content.replace('shadow-sm hover:shadow-md', '')
    content = content.replace('rounded-full overflow-hidden', 'rounded-sm overflow-hidden')
    
    # 4. Glass Panel
    content = content.replace('bg-white/40 backdrop-blur-[60px]', 'bg-white/45 backdrop-blur-[40px]')
    content = content.replace('bg-white/80 md:bg-transparent backdrop-blur-xl', 'bg-white/45 md:bg-transparent backdrop-blur-[40px]')

    # 5. Archive Cards
    # Using regex to target cards properly
    content = re.sub(
        r'class="group relative w-full aspect-\[4/5\] bg-surface-container-low overflow-hidden flex flex-col justify-end([^"]*) shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"',
        r'class="archive-card group relative w-full aspect-[4/5] bg-surface-container-lowest rounded-md overflow-hidden flex flex-col justify-end\1 cursor-pointer"',
        content
    )
    content = content.replace('<div class="absolute inset-0">\n                 <img', '<div class="card-image-wrapper absolute inset-0">\n                 <img')
    content = re.sub(
        r'<img src="([^"]+)" alt="([^"]+)" class="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105">',
        r'<img src="\1" alt="\2" class="card-image w-full h-full object-cover">',
        content
    )

    # 6. Chips/Tags
    content = content.replace('bg-primary-container/10 rounded-full text-primary', 'bg-surface-container-high rounded-full text-on-surface-variant')
    
    return content

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()
    
    updated = process_html(original)
    
    if original != updated:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated)
        print(f"Updated: {filepath}")
