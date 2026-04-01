import re

with open('about.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix logo
content = re.sub(
    r'<a class="text-fluid-lg font-display tracking-wide text-on-surface z-50 whitespace-nowrap shrink-0"',
    r'<a class="text-fluid-lg font-display font-bold tracking-wide text-primary z-50 shrink-0"',
    content
)

# Fix paddings/margins
content = re.sub(r'mb-32 bg-surface rounded-3xl p-12 md:p-20', 'mb-fluid-2xl bg-surface rounded-3xl p-fluid-xl', content)
content = re.sub(r'my-32', 'my-fluid-2xl', content)
content = re.sub(r'pt-16 pb-24', 'py-fluid-2xl', content)

# Fix h3 and p
content = re.sub(r'text-2xl md:text-3xl font-headline', 'font-headline text-fluid-3xl', content)
content = re.sub(r'text-on-surface-variant font-body text-lg', 'text-on-surface-variant font-body text-fluid-lg', content)

# Fix h2 and p
content =import re

with open('about.html', 'r"