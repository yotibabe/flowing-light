import re
import glob

files = glob.glob('episodes/vol*/index.html')

for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace nav links wrapper
    content = re.sub(
        r'<a class="group flex flex-col items-center gap-1"',
        r'<a class="group flex flex-col items-center gap-1 p-2 sm:p-0 min-h-[44px] min-w-[44px] justify-center"',
        content
    )
    
    # Replace span classes
    content = re.sub(
        r'text-\[9px\] sm:text-\[10px\] md:text-sm uppercase whitespace-nowrap',
        r'text-fluid-sm uppercase',
        content
    )
    
    # Remove active state absolute bar and replace with new design system one
    content = re.sub(
        r'<span class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-\[2px\] bg-primary"></span>',
        r'<span class="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-100 transition-transform origin-left"></span>',
        content
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
