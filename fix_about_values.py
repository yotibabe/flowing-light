import re

with open('about.html', 'r') as f:
    content = f.read()

# Make icon and text side-by-side on mobile instead of stacked
content = content.replace('flex flex-col md:flex-row md:items-start gap-6 md:gap-12 border-b border-outline-variant/20 pb-16 last:border-0 last:pb-0',
                          'flex flex-row items-start gap-4 md:gap-12 border-b border-outline-variant/20 pb-12 md:pb-16 last:border-0 last:pb-0')

with open('about.html', 'w') as f:
    f.write(content)
print("About page values layout fixed")
