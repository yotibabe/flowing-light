import glob
import re

for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # Find the link if it exists
    link_match = re.search(r'<a href="(https://mp\.weixin\.qq\.com/s/[^"]+)"', content)
    full_article_link = link_match.group(1) if link_match else "#"

    # Find where the group photo figure ends
    # We will match from `</figure>` after `<!-- Group Photo Placed Here for Emotional Resonance -->`
    # up to the first `<script>` tag.
    
    # Let's split the file at the `<script>` tag first, to preserve scripts.
    parts = content.split('<script>', 1)
    if len(parts) != 2:
        print(f"Skipping {file} - no <script> tag found")
        continue
        
    top_part = parts[0]
    bottom_part = '<script>' + parts[1]
    
    # Inside top_part, find the last `</figure>`
    last_figure_idx = top_part.rfind('</figure>')
    if last_figure_idx == -1:
        print(f"Skipping {file} - no </figure> found")
        continue
        
    # We want to replace everything between `</figure>` and the end of `top_part`
    # Wait, we need to preserve the closing `</div>` tags that close the main content areas.
    # Let's see how many `</div>` are there.
    # In detail-vol1.html:
    # </figure>
    # <p>现在，轮到你了。</p>
    # </div>
    # </div>
    
    # Instead of counting, let's just use regex to replace specific known bad blocks.
    
    # 1. Remove the "现在，轮到你了" block
    content = re.sub(r'<p class="font-headline[^>]*>\s*现在，轮到你了。\s*</p>', '', content)
    
    # 2. Remove the "Option C: Read Full Transcript Button" block
    content = re.sub(r'<!-- Option C: Read Full Transcript Button -->\s*<div class="flex flex-col items-center[^>]*>.*?</div>\s*</div>', '</div>', content, flags=re.DOTALL)

    # Actually, the block ends with `</div>` (the read full transcript container).
    # The regex `.*?</div>\s*</div>` might consume too many `</div>`s.
    
    # Let's do it safer:
    content = re.sub(r'<!-- Option C: Read Full Transcript Button -->.*?<span class="font-label[^>]*>Read Full Transcript on WeChat</span>\s*</div>', '', content, flags=re.DOTALL)
    
    # Let's also remove any old "Three Buttons Layout" just in case
    content = re.sub(r'<!-- Original Three Buttons Layout.*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)
    
    # Clean up empty spaces before script
    # We will insert the new buttons right after the last </figure>
    
    three_buttons = f"""
<!-- Original Three Buttons Layout (Beautified) -->
<div class="mt-16 md:mt-24 pt-12 border-t border-outline-variant/20 mb-16 flex flex-col items-center gap-8 max-w-lg mx-auto px-4 w-full">
    
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
    
    # We will insert `three_buttons` right after the last `</figure>`
    # Find the last `</figure>` in the content
    last_fig = content.rfind('</figure>')
    if last_fig != -1:
        insert_pos = last_fig + len('</figure>')
        content = content[:insert_pos] + '\n' + three_buttons + content[insert_pos:]
        
    with open(file, 'w') as f:
        f.write(content)
        
    print(f"Updated {file}")

