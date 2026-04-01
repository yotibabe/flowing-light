import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()
    
    # Redesign the three buttons at the bottom of detail pages
    # We will replace everything from the start of the CTA to the end of the breadcrumb
    
    link_match = re.search(r'<a href="(https://mp\.weixin\.qq\.com/s/[^"]+)"[^>]*>\s*阅读本期活动完整实录', content)
    full_article_link = link_match.group(1) if link_match else "#"
    
    new_footer = f"""
        <!-- Article Actions Footer -->
        <div class="mt-24 pt-12 border-t border-outline-variant/20 mb-16">
            <div class="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto px-4">
                
                <!-- Primary Action: Read Full Article -->
                <div class="space-y-4 w-full">
                    <h4 class="font-headline text-xl md:text-2xl font-bold text-on-surface">意犹未尽？阅读万字完整实录</h4>
                    <a href="{full_article_link}" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center gap-3 w-full sm:w-auto sm:inline-flex px-8 py-4 bg-on-surface text-surface rounded-full hover:bg-primary hover:text-on-primary transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1">
                        <span class="font-medium tracking-wide">前往公众号阅读</span>
                        <span class="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_outward</span>
                    </a>
                </div>
                
                <div class="w-12 h-px bg-outline-variant/30"></div>
                
                <!-- Secondary Actions: Become Speaker & Back -->
                <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <button class="speaker-trigger-btn group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full border border-outline-variant hover:border-primary hover:text-primary transition-colors duration-300">
                        <span class="material-symbols-outlined text-lg">mic</span>
                        <span class="font-medium text-sm">就现在，来讲吧</span>
                    </button>
                    
                    <a href="archive.html" class="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full text-on-surface-variant hover:text-on-surface transition-colors duration-300">
                        <span class="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
                        <span class="font-medium text-sm tracking-wider">返回往期回顾</span>
                    </a>
                </div>
                
            </div>
        </div>
"""
    
    # Remove old CTA
    content = re.sub(r'<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10 mt-12 md:mt-20">.*?</div>', '', content, flags=re.DOTALL)
    # Remove old breadcrumb
    content = re.sub(r'<!-- Bottom Breadcrumb / Back Navigation -->\s*<div class="mt-16 md:mt-24 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">.*?</div>', '', content, flags=re.DOTALL)
    
    # Insert new footer before </article>
    if "Article Actions Footer" not in content:
        content = re.sub(r'(</article>)', new_footer + r'\n\1', content)

    # Update modal QR code to the new one we know the user saved
    content = content.replace('src="assets/wechat-qr.png"', 'src="assets/wechat-qr-yoti.jpg" onerror="this.onerror=null; this.src=\'assets/wechat-qr.jpg\';"')

    with open(file, 'w') as f:
        f.write(content)

print("Buttons redesigned.")
