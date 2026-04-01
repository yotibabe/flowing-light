import glob
import re

# 1. Update the QR code modal image path to 'wechat-qr-yoti.jpg' or just update the instructions
# The user will replace the file, but let's make sure the code references a safe fallback
for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()
    
    # Just update the alt text to match the new context
    content = content.replace('alt="WeChat QR Code"', 'alt="Yoti WeChat QR Code"')
    
    # 2. Redesign the three buttons at the bottom of detail pages
    # Currently they are:
    # 1. 返回往期回顾 (Back to Archive)
    # 2. 成为讲者 (Become a Speaker) -> we changed this to "就现在，来讲吧"
    # 3. 阅读本期活动完整实录 (Read full transcript)
    
    # The user says "现在的每一个详情页下面都有三个按钮不够美观，你再设计一下。"
    # Letimport glob
import re

# 1. Update the QR code modal image path to 'wechat-qr-yoti.jpg' or just update the iesimport re
St
# 1. Up"Ac# The user will replace the file, but let's make sure the code references a safe fallback
for file ckfor file in glob.glob('*.html'):
    with open(file, 'r') as f:
        cont?   with open(file, 'r') as f:
          content = f.read()
    
   ary,    
    # Just update th?  ?]    content = content.replace('alt="WeChat QR Code--    
    # 2. Redesign the three buttons at the bottom of detail pages
    # Currently they are:
 c   ,     # Currently they are:
    # 1. 返回往期回顾 (Back tobord    # 1. 返回往期回-1    # 2. 成为讲者 (Become a Speaker) -> -[    # 3. 阅读本期活动完整实录 (Read full transcript)
    
    # The user sa?   
    # The user says "现在的每一个详情页下面?t   ge    # Letimport glob
import re

# 1. Update the QR code modal image path to 'wechat-qr-yoti.jpg' or ttimport re

# 1. Updk 
# 1. Upon St
# 1. Up"Ac# The user will replace the file, but let's make sure the code references a safe fallbjustifor file ckfor file in glob.glob('*.html'):
    with open(file, 'r') as f:
        con h    with open(file, 'r') as f:
        con          cont?   with open(file, 'e           content =ngle, beautiful Article Footer c    
   ary,    
    # Justil   l # Just # 2. Redesign the three buttons at the bottom of detail pages