import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # 1. Clean up ALL button sections from the bottom of the article.
    # We want to remove everything after the article body until the </article> tag.
    
    # Let's find where the article content ends.
    # Usually it's right after `<div class="mt-16 md:mt-24">` or `<!-- Article Actions Footer -->`
    
    # Remove the first old block: "Read Full Transcript on WeChat"
    content = re.sub(r'<div class="flex flex-col items-center gap-3 md:gap-4 my-16 md:my-24">.*?</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Remove the "就现在，来讲吧" block
    content = re.sub(r'<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10">.*?</div>', '', content, flags=re.DOTALL)
    
    # Remove "Bottom Breadcrumb / Back Navigation"
    content = re.sub(r'<!-- Bottom Breadcrumb / Back Navigation -->.*?</div>', '', content, flags=re.DOTALL)
    
    # Remove "Article Actions Footer (Minimalist)"
    content = re.sub(r'<!-- Article Actions Footer \(Minimalist\) -->.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Now let's insert EXACTLY the original three buttons, but with nice spacing so they look good.
    # Extract the actual link
    link_match = re.search(r'<a href="(https://mp\.weixin\.qq\.com/s/[^"]+)"', content)
    full_article_link = link_match.group(1) if link_match else "#"

    original_style_footer = f"""
        <!-- Original Three Buttons Layout (Beautified) -->
        <div class="mt-20 md:mt-32 pt-12 border-t border-outline-variant/20 mb-16 flex flex-col items-center gap-8 max-w-lg mx-auto px-4">
            
            <!-- 1. 阅读完整实录 (Grey) -->
            <div class="w-full flex flex-col items-center gap-3">
                <a href="{full_article_link}" target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center w-full py-4 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface font-medium text-sm md:text-base tracking-widest border border-outline-variant/30">
                    阅读本期活动完整实录
                    <span class="material-symbols-outlined ml-2 text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <span class="font-label text-[10px] text-outline uppercase tracking-widest">Read Full Transcript on WeChat</span>
            </div>

            <!-- 2. 就现在，来讲吧 (Red) -->
            <div class="w-full text-center pt-8 border-t border-outline-variant/10">
                <p class="font-label text-xs uppercase tracking-[0.2em] text-secondary/60 mb-4">下一场周期，你会如何掌舵？</p>
                <button class="speaker-trigger-btn w-full py-4 rounded-md bg-primary text-on-primary font-medium text-base tracking-widest shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
                    就现在，来讲吧
                </button>
            </div>
            
            <!-- 3. Back to Archive -->
            <div class="w-full flex justify-center pt-8 border-t border-outline-variant/10 mt-2">
                <a href="archive.html" class="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors group">
                    <span class="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
                    <span class="font-label text-xs uppercase tracking-[0.3em] font-medium">Back to Archive</span>
                </a>
            </div>

        </div>
"""
    
    # We need to make sure we don't duplicate. Let's just do a clean replace of the bottom part.
    # The article tag usually ends with `</article>`. Let's insert before that.
    # First, let's remove any existing "Original Three Buttons Layout" to be safe.
    content = re.sub(r'<!-- Original Three Buttons Layout \(Beautified\) -->.*?</article>', '</article>', content, flags=re.DOTALL)
    
    # And remove any remaining loose buttons that might have slipped through the regex
    # (Just in case the regex failed)
    
    content = content.replace('</article>', original_style_footer + '\n</article>')

    with open(file, 'w') as f:
        f.write(content)

print("Restored the original 3 buttons layout, perfectly aligned.")
