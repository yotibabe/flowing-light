import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # The user screenshot shows what is currently rendered in the browser.
    # It seems there are FOUR separate blocks:
    # 1. "阅读本期活动完整实录 ->" (Grey button)
    # 2. "就现在，来讲吧" (Big red button)
    # 3. "<- BACK TO ARCHIVE"
    # 4. "阅读完整实录 ↗" (The new button I just added)
    # My previous script didn't properly remove the old buttons because the regex didn't match the actual HTML structure in the file!

    # Let's cleanly remove ALL of them by finding their distinct wrappers.
    
    # 1. Remove the old WeChat link button block
    content = re.sub(r'<div class="flex flex-col items-center gap-3 md:gap-4 my-16 md:my-24">.*?Read Full Transcript on WeChat</span>\s*</div>', '', conteimport glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as asimport re
nt
for filmd:    with open(file, 'r') as f:
      >.*??       content = f.read()

    # Theiv
    # The user screenshont,    # It seems there are FOUR separate blocks:
    # 1. "阅读本期活?t    # 1. "阅读本期活动完整实录 ->" ac    # 2. "就现在，来讲吧" (Big red button)
    #fy-c    # 3. "<- BACK TO ARCHIVE"
    # 4. "阅读??    # 4. "阅读完整实录>\    # My previous script didn't properly remove the old bu# 
    # Let's cleanly remove ALL of them by finding their distinct wrappers.
    
    # 1. Remove the old WeChat link button block
    co->.    
    # 1. Remove the old WeChat link button block
    content = re.sub(r"   s     content = re.sub(r'<div class="flex fleidimport re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as asimport re
nt
for filmd:    with open(file, 'r') as f:
      >.*??     "m
for filtif    with open(file, 'r') as asimport re
nd)nt
for filmd:    with open(file, 'r') ????     >.*??       content = f.read()

    # T?    # Theiv
    # The user screenshod)
    # The AC    # 1. "阅读本m, text link)
    # Wait, the screenshot the user sent     #fy-c    # 3. "<- BACK TO ARCHIVE"
    # 4. "阅读??    # 4. "阅读完整实录>\    # My previous script didn'??    # 4. "阅读??    # 4. "阅读?i    # Let's cleanly remove ALL of them by finding their distinct wrappers.
    
    # 1. Remove the old WeChath    
    # 1. Remove the old WeChat link button block
    co->.    
    # 1. qq   om    co->.    
    # 1. Remove the old WeChat li =    # 1. Remgr    content = re.sub(r"   s     content = re.er
for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as6 b    with open(file, 'r') as asimport re
n-cnt
for filmdter gap-8 max-w-md mx-auto px-4">
  f        >.*??     "m
for filtif    with open(fi}"for filtif    with l=nd)nt
for filmd:    with open(file, 'items-center justifor en