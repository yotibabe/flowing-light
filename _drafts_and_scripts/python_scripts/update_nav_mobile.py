import glob
import re

files = glob.glob('*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Step 1: In the mobile navigation menu, remove the remaining 成为嘉宾 button if it's there
    content = re.sub(r'<button class="mt-8 bg-primary text-on-primary px-8 py-3 rounded-full font-medium text-sm">\s*成为嘉宾\s*</button>', '', content, flags=re.DOTALL)
    
    with open(file, 'w') as f:
        f.write(content)

print("Mobile nav updated in all files.")