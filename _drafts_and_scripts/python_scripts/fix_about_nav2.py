import re

with open('about.html', 'r') as f:
    content = f.read()

content = content.replace('<nav class="hidden md:flex gap-12 items-center">', '<nav class="flex gap-3 sm:gap-6 md:gap-12 items-center justify-end shrink-0 ml-4">')

content = content.replace('<div class="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-24 flex items-center justify-between">',
                          '<div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-24 flex items-center justify-between flex-nowrap overflow-x-auto no-scrollbar">')
                          
content = content.replace('<a class="text-xl md:text-2xl font-display tracking-wide text-on-surface z-50" href="index.html">',
                          '<a class="text-sm sm:text-lg md:text-2xl font-display tracking-wide text-on-surface z-50 whitespace-nowrap shrink-0" href="index.html">')

with open('about.html', 'w') as f:
    f.write(content)
print("About page nav fixed")
