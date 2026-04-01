import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()
    
    # Let's find the full article link
    link_match = re.search(r'<a href="(https://mp\.weixin\.qq\.com/s/[^"]+)"[^>]*>\s*<span class="font-medium tracking-wide">前往公众号阅读</span>', content)
    full_article_link = link_match.group(1) if link_match else "#"
    
    # We want a very minimalist, clean, magazine-like button design.
    # Something like a simple centered primary button for the article,
    # and maybe two very subtle text links below it, or just keep it super minimal.
    # The user said "太繁琐" (too complex/cluttered).
    
    # Minimalist design:
    # ---------------------------------------------------
    #         [ 阅读完整实录 ↗ ] (Primary, solid but elegant)
    # 
    #       就现在，来讲吧  ·  返回往期回顾 (Simple text links with subtle hover)
    # ---------------------------------------------------
    
    minimal_footer = f"""
        <!-- Article Actions Footer (Minimalist) -->
        <div class="mt-20 md:mt-32 pt-12 border-t border-outline-variant/20 mb-16 md:mb-24">
            <div class="flex flex-col items-center justify-center gap-8 max-w-lg mx-auto">
                
                <!-- Primary Action -->
                <a href="{full_article_link}" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-full font-medium tracking-widest text-sm hover:opacity-90 transition-opacity">
                    阅读完整实录
                    <span class="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">arrow_outward</span>
                </a>
                
                <!-- Secondary Actions (Text Links) -->
                <div class="flex items-center gap-6 font-label text-xs tracking-widest uppercase text-stone-500">
                    <button class="speaker-trigger-btn hover:text-primary transition-colors">
                        成为讲者
                    </button>
                    <span class="w-1 h-1 rounded-full bg-stone-300"></span>
                    <a href="archive.html" class="hover:text-primary transition-colors">
                        返回目录
                    </a>
                </div>
                
            </div>
        </div>
"""
    
    # Replace the old complex footer
    content = re.sub(r'<!-- Article Actions Footer -->.*?</div>\s*</div>', minimal_footer, content, flags=re.DOTALL)

    with open(file, 'w') as f:
        f.write(content)

print("Buttons simplified.")
