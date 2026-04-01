import re
import glob

files = glob.glob('episodes/vol*/index.html')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Nav logo
    content = re.sub(
        r'<div class="text-sm sm:text-lg md:text-2xl font-display font-bold whitespace-nowrap shrink-0 text-primary z-50">',
        r'<div class="text-fluid-lg font-display font-bold tracking-wide shrink-0 text-primary z-50">',
        content
    )
    
    # Hero H1 and P
    content = re.sub(r'text-4xl sm:text-5xl md:text-7xl', 'text-fluid-6xl', content)
    content = re.sub(r'text-xl sm:text-2xl md:text-3xl', 'text-fluid-3xl', content)
    
    # Body text
    content = re.sub(r'text-lg md:text-xl leading-loose', 'text-fluid-lg leading-relaxed', content)
    content = re.sub(r'text-base md:text-lg leading-loose', 'text-fluid-lg leading-relaxed', content)
    content = re.sub(r'text-xl sm:text-2xl md:text-3xl', 'text-fluid-3xl', content) # In case blockquote has it

    # H2 section headers
    content = re.sub(r'text-2xl sm:text-3xl md:text-4xl', 'text-fluid-4xl', content)
    
    # Formula blockquote text
    content = re.sub(r'text-3xl md:text-4xl', 'text-fluid-4xl', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
