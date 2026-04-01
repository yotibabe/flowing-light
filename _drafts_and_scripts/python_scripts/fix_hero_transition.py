import glob
import re
import os

os.chdir("/Users/mac/Desktop/stitch_flowing_light_prd 2")

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    fade_div = '<div class="absolute bottom-0 left-0 w-full h-48 md:h-64 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>'
    
    pattern = r'(<div class="absolute w-\[500px\] h-\[500px\] bg-secondary-container/15 rounded-full blur-\[100px\] bottom-20 right-20 pointer-events-none"></div>)'
    
    if 'bg-gradient-to-t from-surface to-transparent' not in content:
        content = re.sub(pattern, r'\1\n' + fade_div, content)

    with open(file, 'w') as f:
        f.write(content)

print("Added smooth fade transition to hero sections.")
