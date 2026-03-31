import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # The user wants the hero background to transition naturally into the body background (which is surface/white).
    # Currently, the hero section has the ethereal background:
    # <section class="relative w-full h-[70vh] md:h-[85vh] min-h-[500px] md:min-h-[600px] flex items-end overflow-hidden ethereal-gradient-bg">
    # <div class="absolute inset-0 z-0 fluid-focus-gradient"></div>
    # <div class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 pointer-events-none"></div>
    # <div class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 pointer-events-none"></div>
    
    # We can add a gradient overlay at the bottom of the hero section that fades from transparent to white (the surface color).
    # Something like: <div class="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>
    
    # Let's see if there's already a gradient there.
    # We removed it earlier: `<div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>`
    
    # Let's add a soft bottom fade back.
    fade_div = '<div class="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-surface to-transparent z-10 pointer-events-none"></div>'
    
    # Find the closing tag of the ethereal elements, before the actual content container.
    # The container is `<div class="w-full px-6 md:px-12 pb-16 md:pb-24 z-10 max-w-[1440px] mx-auto">`
    # Let's insert the fade div just before the content container.
    
    pattern = r'(<div class="absolute w-\[500px\] h-\[500px\] bg-secondary-container/15 rounded-full blur-\[100px\] bottom-20 right-20 pointer-events-none"></div>)'
    
    if 'bg-gradient-to-t from-surface to-transparent' not in content:
        content = re.sub(pattern, r'\1\n' + fade_div, content)

    with open(file, 'w') as f:
        f.write(content)

print("Added smooth fade transition to hero sections.")
