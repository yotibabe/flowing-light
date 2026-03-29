import re

with open('about.html', 'r') as f:
    content = f.read()

# In about.html, the nav container is: <nav class="hidden md:flex gap-12 items-center">
# It should be visible on mobile: <nav class="flex gap-3 sm:gap-6 md:gap-12 items-center justify-end shrink-0 ml-4">
content = content.replace('<nav class="hidden md:flex gap-12 items-center">', '<nav class="flex gap-3 sm:gap-6 md:gap-12 items-center justify-end shrink-0 ml-4">')

# Also fix the logo part in about.html so it doesn't wrap
# <div class="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-24 flex items-center justify-between">
# <a class="text-xl md:text-2xl font-display tracking-wide text-on-surface z-50" href="index.html">
#         中大读书会 <span class="italic font-normal">Light</span>
# </a>
content = content.replace('<div class="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-24 flex items-center justify-between">',
                     import re

with open('about.html', 'r'px