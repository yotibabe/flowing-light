import re

with open('archive.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix h3 classes
content = re.sub(r'text-2xl lg:text-3xl', 'text-fluid-xl', content)
# Fix p classes
content = re.sub(r'text-sm text-on-surface-variant leading-relaxed', 'text-fluid-sm text-on-surface-variant leading-relaxed', content)

# Fix future expectation
content = re.sub(r'font-display italic text-outline text-lg md:text-xl', 'font-headline italic text-outline text-fluid-lg', content)

with open('archive.html', 'w', encoding='utf-8') as f:
    f.write(content)
