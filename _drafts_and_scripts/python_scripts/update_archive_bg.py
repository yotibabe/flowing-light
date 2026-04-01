import re

with open('archive.html', 'r') as f:
    content = f.read()

# Remove the ethereal background we added previously
bg_pattern = r'<!-- Ethereal Background \(Shared with Home\) -->\n<div class="fixed inset-0 z-\[-1\] ethereal-gradient-bg pointer-events-none">\n    <div class="absolute inset-0 fluid-focus-gradient"></div>\n    <div class="absolute w-\[600px\] h-\[600px\] bg-primary-container/20 rounded-full blur-\[120px\] -top-40 -left-40"></div>\n    <div class="absolute w-\[500px\] h-\[500px\] bg-secondary-container/15 rounded-full blur-\[100px\] bottom-20 right-20"></div>\n</div>\n'
content = re.sub(bg_pattern, '', content)

# The current nav in archive is: <nav class="fixed top-0 w-full z-50 bg-white/80 md:bg-transparent backdrop-blur-xl border-b border-stone-200/50 md:border-none">
# Change it back to: <nav class="fixed top-0 w-full z-50 bg-white/80 md:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
content = content.replace('md:bg-transparent backdrop-blur-xl border-b border-stone-200/50 md:border-none', 'md:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20')


with open('archive.html', 'w') as f:
    f.write(content)

print("Archive background restored.")