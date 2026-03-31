import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # Step 2: Fix Hero Section Background
    # Remove any <img> tags inside the hero section (which has ethereal-gradient-bg)
    # The hero section usually starts with `<section class="relative w-full h-[70vh]` or similar
    # We will just look for the first <section> and remove <img> inside it.
    
    # Or specifically:
    # <img alt="Vol X Event" class="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-1000 ease-in-out mix-blend-multiply" src="..."/>
    
    content = re.sub(r'<!-- Image from the article -->\s*<img[^>]*>\s*<div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>', '', content)
    content = re.sub(r'<img alt="Vol[^>]*class="absolute inset-0[^>]*>', '', content)
    
    # Make sure ethereal-graimport glob
import re

for file in glob.glob('dl
import re
nd
for fil 
     with open(file, 'r') as f:
        coad        content = f.read()

    # Ste  
    # Step 2: Fix Hero Set-    # Remove any <img> tags inside the h <    # The hero section usually starts with `<section class="relative w-full h-[70vh12    # We will just look for the first <section> and remove <img> inside it.
    
    # Or spe-con    
    # Or specifically:
    # <img alt="Vol X Event" class="absolute i>
    
    # <img alt="Vol Xce    
    content = re.sub(r'<!-- Image from the article -->\s*<img[^>]*>\s*<div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 px\] md:min   \[    content = re.sub(r'<img alt="Vol[^>]*class="absolute inset-0[^>]*>', '', content)
    
    # Make sure ethereal-graimport glob
import re

for file in glob.glob('dl
import rmd    
    # Make sure ethereal-graimport glob
import re

for file in glob.glob('dl
import re
nd
fcl   ="import re

for file in glob.glob('en
for fiv>
<div class="absolute w-[600px] nd
for f] fg-     wi-c        coad        content = f.read()-t
    # Ste  
    # Step 2: Fix Hero Ssol    w-[500px    
    # Or spe-con    
    # Or specifically:
    # <img alt="Vol X Event" class="absolute i>
    
    # <img alt="Vol Xce    
    content = re.sub(r'<!-- Image from the article -->\s*<img[^>]*>\s*<div class="absolute inse title    # Or spec   # 你    # <img alt="Vol X??    
    # <img alt="Vol Xce    
    content =t-   ma    content = re.sub(r'an