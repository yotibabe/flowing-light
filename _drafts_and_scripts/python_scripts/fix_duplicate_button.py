import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # The user screenshot shows TWO grey buttons:
    # "阅读本期活动完整实录 ->"
    # "READ FULL TRANSCRIPT ON WECHAT"
    
    # This happened because my previous script didn't match the actual structure of the first button properly,
    # so it appended the new one without removing the old one.
    
    # Let's find exactly how the old button is structured and remove it.
    # The block looks like:
    # <div class="w-full flex flex-col items-center gap-3">
    #   <a href="..." ...>阅读本期活动完整实录 ...</a>
    #   <span class="...">Read Full Transcript on WeChat</span>
    # </div>
    # But wait, there might be an even older version wrapped in another div.
    
    # Let's just remove ALL instances of "阅读本期活动完整实录", and then carefully insert just ONE.
    
    # Actually, let's look at the structure in the file directly.
