import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # It seems the user's issue with the mobile menu might be that when the menu is OPEN, 
    # the layout of the open menu is weird (based on the screenshot OCR: "HOME ARCHIVE ABOUT" horizontally, and the logo and X button on the second line).
    # Ah! The user's screenshot 2 says:
    # "HOME ARCHIVE ABOUT"
    # "中大读书会Light                   X"
    # Wait, the screenshot shows the links are horizontal at the top, and the logo is below it? That's definitely wrong.
    # Our mobile menu is:
    # <div id="mobile-menu" class="fixed inset-0 bg-surface/95 backdrop-blur-md z-40 flex-col items-center justify-center gap-8 hidden opacity-0 transition-opacity duration-300">
    #     <a href="index.html" ...
    # This should cover the whole screen and show the links vertically centered.
    
    # Wait, let import glob
import re

for file in glob.glob('*.htddimport reex