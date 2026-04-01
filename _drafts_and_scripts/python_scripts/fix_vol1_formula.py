import re

with open("detail-vol1.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix the formula text
old_formula = """<p class="font-display italic text-3xl md:text-4xl text-on-surface tracking-wider">
        热爱 + 重复 = 作品
    </p>"""
    
new_formula = """<p class="font-display italic text-3xl md:text-4xl text-on-surface tracking-wider font-bold">
        重复 <span class="text-orange-700">+</span> 利他 <span class="text-orange-700">=</span> 复利
    </p>"""

html = html.replace(old_formula, new_formula)

with open("detail-vol1.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Formula fixed")
