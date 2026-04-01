import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # The user wants the nav links visible on mobile and right-aligned.
    # Currently:
    # <div class="hidden md:flex gap-12 items-center">
    # Let's change it to:
    # <div class="flex gap-4 md:gap-12 items-center">
    # And remove the mobile menu button and mobile menu container completely!
    
    # Remove mobile menu button
    content = re.sub(r'<!-- Mobile Menu Button -->\s*<button id="mobile-menu-btn" class="md:hidden flex items-center justify-center p-2 text-orange-900 z-50">\s*<span class="material-symbols-outlined text-2xl">menu</span>\s*</button>', '', content)
    
    # Make desktop nav visible on mobile
    content = content.replace('<div class="hidden md:flex gap-12 items-center">', '<div class="flex gap-4 md:gap-12 items-center">')
    
    # Also adjust the nav container so it doesn't wrap on small screens.
    # The logo might be too big for mobile if we also have 3 links.
    # Current logo: <div class="text-xl md:text-2xl font-display font-bold text-orange-900 z-50">
    # Current container: <div class="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-[1440px] mx-auto">
    # If the text is long, it might wrap. The user's screenshot showed it wrapping:
    # HOME ARCHIVE ABOUT
    # 中大读书会Light
    # We want it on ONE line if possible: "中大读书会Light   HOME ARCHIVE ABOUT"
    # Let's make the logo text slightly smaller on mobile to fit everything: `text-lg md:text-2xl`.
    # And make the links smaller on mobile: `text-[10px] md:text-sm`.
    
    content = content.replace('class="text-xl md:text-2xl font-display font-bold', 'class="text-base sm:text-xl md:text-2xl font-display font-bold whitespace-nowrap')
    content = content.replace('font-label text-sm uppercase', 'font-label text-[10px] sm:text-xs md:text-sm uppercase')
    
    # Remove the mobile menu container completely
    content = re.sub(r'<!-- Mobile Navigation Menu \(Hidden by default\) -->[\s\S]*?</nav>', '</nav>', content)
    
    # Remove the mobile menu script
    content = re.sub(r'<!-- Mobile Menu Script -->[\s\S]*?</script>', '', content)
    # Also in files where it might not have the comment
    content = re.sub(r'<script>\s*const mobileMenuBtn = document\.getElementById\(\'mobile-menu-btn\'\);[\s\S]*?</script>', '', content)

    with open(file, 'w') as f:
        f.write(content)

print("Nav fixed for mobile right alignment.")
