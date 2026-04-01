import glob
import re

files = glob.glob('*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Step 1: Remove the search and 成为嘉宾 button div
    content = re.sub(r'<div class="hidden md:flex items-center gap-6">[\s\S]*?</button>\s*</div>', '', content)
    
    # Also remove from mobile menu
    content = re.sub(r'<button class="mt-8 bg-primary text-on-primary px-8 py-3 rounded-full font-medium text-sm">\s*成为嘉宾\s*</button>', '', content)

    with open(file, 'w') as f:
        f.write(content)

print("Navigation updated in all files.")