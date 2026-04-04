import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all class="..."
    def replace_class(match):
        class_str = match.group(1)
        
        # If it has font-body but not font-light, add font-light
        if 'font-body' in class_str and 'font-light' not in class_str:
            # Check if it has font-semibold or font-bold or font-normal.
            # If we want ALL body texts to be font-light (字重300), maybe we shouldn't override bold ones?
            # User said "所有的正文（包括首页理念、详情页故事）还是用回 font-light （字重 300）"
            # But wait, there are things like <p class="font-body text-base font-semibold">龚玉婷</p>
            # We probably shouldn't make bold text light.
            # So if it has font-bold, font-semibold, font-medium, or font-black, we skip adding font-light?
            if not any(w in class_str for w in ['font-bold', 'font-semibold', 'font-medium', 'font-black']):
                # remove font-normal if present
                class_str = class_str.replace('font-normal', '')
                # add font-light
                class_str += ' font-light'
                # clean up multiple spaces
                class_str = ' '.join(class_str.split())
        
        return f'class="{class_str}"'

    new_content = re.sub(r'class="([^"]+)"', replace_class, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.html'):
            process_file(os.path.join(root, file))
