import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # Fix body paragraphs that were text-lg in v1.0-stable but became text-base md:text-xl
    content = content.replace('text-base md:text-xl leading-loose', 'text-base md:text-lg leading-loose')
    
    # Fix blockquotes that were text-2xl in v1.0-stable but became text-xl md:text-3xl
    content = content.replace('text-xl md:text-3xl', 'text-xl md:text-2xl')
    
    # Fix prologue paragraphs that didn't get responsive classes (they were text-xl originally)
    # We want text-lg md:text-xl
    content = re.sub(r'class="font-body text-xl leading-loose', r'class="font-body text-lg md:text-xl leading-loose', content)

    with open(file, 'w') as f:
        f.write(content)
        
print("Typography fixed.")
