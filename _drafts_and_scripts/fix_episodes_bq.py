import re
import glob

files = glob.glob('episodes/vol*/index.html')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace normal blockquote wrapper
    content = re.sub(
        r'<blockquote class="pl-4 md:pl-6 border-l-4 border-primary/50 my-8 md:my-10 py-2">',
        r'<blockquote class="pl-6 md:pl-12 border-l-2 border-primary/30 my-fluid-2xl py-2 relative">',
        content
    )
    
    # Replace blockquote text
    content = re.sub(
        r'<p class="font-headline italic text-xl md:text-2xl text-on-surface leading-relaxed">',
        r'<p class="font-headline italic text-fluid-lg text-primary leading-relaxed">',
        content
    )
    
    # Epilogue large blockquote wrapper and text
    content = re.sub(
        r'<blockquote class="font-display text-fluid-3xl italic text-primary leading-snug tracking-tight">',
        r'<blockquote class="font-headline text-fluid-3xl italic text-primary leading-snug tracking-tight">',
        content
    )
    content = re.sub(
        r'<blockquote class="font-display text-2xl sm:text-3xl md:text-5xl italic text-primary leading-snug tracking-tight">',
        r'<blockquote class="font-headline text-fluid-3xl italic text-primary leading-snug tracking-tight">',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
