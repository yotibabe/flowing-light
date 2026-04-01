import re

with open('archive.html', 'r') as f:
    content = f.read()

# The current nav in archive is: <nav class="fixed top-0 w-full z-50 bg-white/80 md:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
# In index it's: <nav class="fixed top-0 w-full z-50 bg-white/80 md:bg-transparent backdrop-blur-xl border-b border-stone-200/50 md:border-none">
content = content.replace('md:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20', 'md:bg-transparent backdrop-blur-xl border-b border-stone-200/50 md:border-none')

bg_elements = """
<!-- Ethereal Background (Shared with Home) -->
<div class="fixed inset-0 z-[-1] ethereal-gradient-bg pointer-events-none">
    <div class="absolute inset-0 fluid-focus-gradient"></div>
    <div class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40"></div>
    <div class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20"></div>
</div>
"""
if "<!-- Ethereal Background (Shared with Home) -->" not in content:
    content = re.sub(r'<body[^>]*>', lambda m: m.group(0) + '\n' + bg_elements, content)

with open('archive.html', 'w') as f:
    f.write(content)

print("Archive background updated.")