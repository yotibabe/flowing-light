import re

# 1. Fix detail-vol3.html to add the CTA button
with open('detail-vol3.html', 'r') as f:
    content = f.read()

cta_html = """
<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10 mt-12 md:mt-20">
<p class="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] text-secondary/60 mb-3 md:mb-4">下一场周期，你会如何掌舵？</p>
<button class="speaker-trigger-btn bg-primary text-on-primary px-8 md:px-10 py-3 md:py-4 rounded-md font-medium text-base md:text-xl hover:bg-primary/90 transition-colors duration-300 shadow-md shadow-primary/20 w-full md:w-auto">
                        就现在，来讲吧
                    </button>
</div>
"""

# Insert before the bottom breadcrumb
if "就现在，来讲吧" not in content:
    breadcrumb_pattern = r'(<!-- Bottom Breadcrumb / Back Navigation -->)'
    content = re.sub(breadcrumb_pattern, cta_html + r'\n\1', content)
    
    with open('detail-vol3.html', 'w') as f:
        f.write(content)
    print("Fixed detail-vol3.html")

# 2. Fix about.html to ensure '成为讲者' has the trigger class
with open('about.html', 'r') as f:
    content = f.read()

# Make sure to find the anchor tag correctly and add the speaker-trigger-btn class
if "成为讲者" in content and "speaker-trigger-btn" not in content:
    about_cta_pattern = r'<a([^>]*)>(\s*<span[^>]*>\s*成为讲者\s*</span>\s*)</a>'
    def add_trigger_class(match):
        attrs = match.group(1)
        inner = match.group(2)
        if 'speaker-trigger-btn' not in attrs:
            attrs = attrs.replace('class="', 'class="speaker-trigger-btn ')
        return f'<a{attrs}>{inner}</a>'
    
    content = re.sub(about_cta_pattern, add_trigger_class, content)
    
    with open('about.html', 'w') as f:
        f.write(content)
    print("Fixed about.html")
