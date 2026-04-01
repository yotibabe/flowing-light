import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # Make sure QR code fallback handles .jpg, .png, .jpeg
    old_qr = '<img src="assets/wechat-qr.png" alt="WeChat QR Code" class="w-full h-full object-contain p-2">'
    new_qr = '<img src="assets/wechat-qr.png" onerror="this.onerror=null; this.src=\'assets/wechat-qr.jpg\';" alt="WeChat QR Code" class="w-full h-full object-contain p-2">'
    
    content = content.replace(old_qr, new_qr)

    # Let's fix the navigation wrapping issue seen in screenshot 2
    # The user screenshot showed:
    # HOME ARCHIVE ABOUT
    # 中大读书会Light
    # This happens because the container uses flex-wrap or the items are too wide.
    # Currently it's:
    # <div class="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-[1440px] mx-auto">
    # If the children are too wide, it might wrap.
    # Let's change the container to prevent wrapping: flex-wrap: nowrap
    
    # We want it to be:
    # <div class="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-[1440px] mx-auto flex-nowrap">
    content = content.replace('<div class="flex justify-between items-center w-full px-6 md:px-12 py-4 md:py-6 max-w-[1440px] mx-auto">', 
                              '<div class="flex justify-between items-center w-full px-4 sm:px-6 md:px-12 py-4 md:py-6 max-w-[1440px] mx-auto flex-nowrap overflow-x-auto no-scrollbar">')
                              
    # Adjust logo text size to be smaller on mobile so it fits with the links
    content = content.replace('text-base sm:text-xl md:text-2xl font-display font-bold whitespace-nowrap', 
                              'text-sm sm:text-lg md:text-2xl font-display font-bold whitespace-nowrap shrink-0')
                              
    # Adjust nav links container to be on the right and allow shrinking
    content = content.replace('<div class="flex gap-4 md:gap-12 items-center">',
                              '<div class="flex gap-3 sm:gap-6 md:gap-12 items-center justify-end shrink-0 ml-4">')
                              
    # Adjust link text sizes
    content = content.replace('font-label text-[10px] sm:text-xs md:text-sm uppercase',
                              'font-label text-[9px] sm:text-[10px] md:text-sm uppercase whitespace-nowrap')

    with open(file, 'w') as f:
        f.write(content)

print("Modal QR fallback and mobile nav alignment fixed.")