import os
import re

def fix_quote_blocks(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # The Vol 1 style quote block:
    # <div class="py-8 md:py-12 my-8 md:my-12 relative bg-surface-container-lowest/50 ...">
    #     <div class="px-6 md:px-8 text-center relative max-w-4xl mx-auto">
    #         <span class="... text-[4rem] md:text-[6rem] ...">format_quote</span>
    #         <blockquote class="... text-fluid-xl ...">
    #             ...
    #         </blockquote>
    #     </div>
    # </div>
    
    # The Vol 2/3 style pull quote block:
    # <div class="py-16 md:py-32 my-8 md:my-12 relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-surface-container-low/50 border-y border-outline-variant/20 flex justify-center">
    # <div class="max-w-4xl px-6 md:px-8 text-center relative">
    # <span class="material-symbols-outlined text-[#B44C2E]/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[16rem] -z-10">format_quote</span>
    # <blockquote class="font-headline text-2xl sm:text-3xl md:text-4xl italic text-[#B44C2E] leading-[2.5] tracking-widest break-keep">
    #                 “建立信任始于规避风险，成于专业可靠，最终才导向价值交换。”
    #             </blockquote>
    # </div>
    # </div>

    # Let's replace Vol 1 style:
    vol1_pattern = re.compile(
        r'<div class="py-8 md:py-12 my-8 md:my-12 relative bg-surface-container-lowest/50 border-y border-outline-variant/20 flex justify-center -mx-6 md:mx-0 w-\[100vw\] md:w-auto left-1/2 md:left-auto right-1/2 md:right-auto -ml-\[50vw\] md:ml-0 -mr-\[50vw\] md:mr-0">\s*<div class="px-6 md:px-8 text-center relative max-w-4xl mx-auto">\s*<span class="material-symbols-outlined text-primary/10 absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 text-\[4rem\] md:text-\[6rem\] -z-10">format_quote</span>\s*<blockquote class="font-headline text-fluid-xl italic text-primary leading-snug tracking-tight">(.*?)</blockquote>\s*</div>\s*</div>',
        re.DOTALL
    )
    
    vol1_replacement = r'''<div class="py-10 md:py-16 my-8 md:my-12 relative bg-surface-container-lowest/50 border-y border-outline-variant/20 flex justify-center w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
    <div class="px-6 md:px-8 text-center relative max-w-4xl mx-auto flex items-center justify-center">
        <span class="material-symbols-outlined text-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] leading-none pointer-events-none -z-10">format_quote</span>
        <blockquote class="font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl italic text-primary leading-loose md:leading-loose tracking-widest relative z-10">
            \1
        </blockquote>
    </div>
</div>'''
    
    content = vol1_pattern.sub(vol1_replacement, content)

    # Vol 2/3 style
    vol2_pattern = re.compile(
        r'<div class="py-16 md:py-32 my-8 md:my-12 relative w-\[100vw\] left-1/2 right-1/2 -ml-\[50vw\] -mr-\[50vw\] bg-surface-container-low/50 border-y border-outline-variant/20 flex justify-center">\s*<div class="max-w-4xl px-6 md:px-8 text-center relative">\s*<span class="material-symbols-outlined ([^"]+) absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-\[8rem\] md:text-\[16rem\] -z-10">format_quote</span>\s*<blockquote class="font-headline text-2xl sm:text-3xl md:text-4xl italic ([^"]+) leading-\[2\.5\] tracking-widest break-keep">(.*?)</blockquote>\s*</div>\s*</div>',
        re.DOTALL
    )
    
    # We replace leading-[2.5] with leading-loose md:leading-loose
    # Add flex items-center justify-center to inner div
    # Add pointer-events-none leading-none to span
    # Add relative z-10 to blockquote
    # Change py-16 md:py-32 to py-16 md:py-24 to be a bit more reasonable
    
    vol2_replacement = r'''<div class="py-16 md:py-24 my-8 md:my-12 relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-surface-container-low/50 border-y border-outline-variant/20 flex justify-center">
<div class="max-w-4xl px-6 md:px-8 text-center relative flex items-center justify-center">
<span class="material-symbols-outlined \1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[16rem] leading-none pointer-events-none -z-10">format_quote</span>
<blockquote class="font-headline text-2xl sm:text-3xl md:text-4xl italic \2 leading-loose md:leading-loose tracking-widest break-keep relative z-10">
\3</blockquote>
</div>
</div>'''
    
    content = vol2_pattern.sub(vol2_replacement, content)

    # Vol 3 also has one with different text sizes for span:
    # <span class="material-symbols-outlined text-primary/10 absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 text-[6rem] md:text-[12rem] -z-10">format_quote</span>
    vol3_pattern = re.compile(
        r'<div class="py-16 md:py-32 my-8 md:my-12 relative w-\[100vw\] left-1/2 right-1/2 -ml-\[50vw\] -mr-\[50vw\] bg-surface-container-low/50 border-y border-outline-variant/20 flex justify-center">\s*<div class="max-w-4xl px-6 md:px-8 text-center relative">\s*<span class="material-symbols-outlined text-primary/10 absolute -top-8 md:-top-12 left-1/2 -translate-x-1/2 text-\[6rem\] md:text-\[12rem\] -z-10">format_quote</span>\s*<blockquote class="font-headline text-fluid-xl italic text-primary leading-snug tracking-tight">(.*?)</blockquote>\s*</div>\s*</div>',
        re.DOTALL
    )
    
    vol3_replacement = r'''<div class="py-16 md:py-24 my-8 md:my-12 relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-surface-container-low/50 border-y border-outline-variant/20 flex justify-center">
<div class="max-w-4xl px-6 md:px-8 text-center relative flex items-center justify-center">
<span class="material-symbols-outlined text-primary/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[16rem] leading-none pointer-events-none -z-10">format_quote</span>
<blockquote class="font-headline text-2xl sm:text-3xl md:text-4xl italic text-primary leading-loose md:leading-loose tracking-widest break-keep relative z-10">
\1</blockquote>
</div>
</div>'''
    
    content = vol3_pattern.sub(vol3_replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk('episodes'):
    for file in files:
        if file.endswith('.html'):
            fix_quote_blocks(os.path.join(root, file))

print("Fixed quotes")
