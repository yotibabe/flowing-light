import os
import re
import glob

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. 替换 Top Nav
    nav_pattern = r'<nav class="fixed top-0 w-full z-50[^>]*>[\s\S]*?</nav>'
    new_header = '''<!-- Header Area -->
<header class="fixed top-0 w-full z-50 transition-all duration-300 bg-white/45 backdrop-blur-[40px] border-b border-outline-variant/10">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 h-16 md:h-24 flex items-center justify-between">
        <a class="text-fluid-lg font-display font-bold tracking-wide shrink-0 text-primary z-50" href="../../index.html">
            中大读书会 <span class="italic font-normal">Light</span>
        </a>
        <nav class="flex gap-2 sm:gap-4 md:gap-8 items-center justify-end shrink-0 ml-2">
            <a class="group flex flex-col items-center gap-1 px-1 py-2 sm:p-0 min-h-[44px] min-w-[44px] justify-center" href="../../index.html">
                <span class="font-label text-[10px] sm:text-xs uppercase tracking-widest text-outline group-hover:text-primary transition-colors">HOME</span>
            </a>
            <a class="group flex flex-col items-center gap-1 px-1 py-2 sm:p-0 min-h-[44px] min-w-[44px] justify-center" href="../../archive.html">
                <span class="font-label text-[10px] sm:text-xs uppercase tracking-widest text-primary relative">
                    ARCHIVE
                    <span class="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-100 transition-transform origin-left"></span>
                </span>
            </a>
            <a class="group flex flex-col items-center gap-1 px-1 py-2 sm:p-0 min-h-[44px] min-w-[44px] justify-center" href="../../about.html">
                <span class="font-label text-[10px] sm:text-xs uppercase tracking-widest text-outline group-hover:text-primary transition-colors">ABOUT</span>
            </a>
        </nav>
    </div>
</header>'''
    content = re.sub(nav_pattern, new_header, content)

    # 2. 移除动态效果元素
    content = re.sub(r'<!-- Glowing Custom Cursor -->[\s\S]*?</div>\n?', '', content)
    content = re.sub(r'<!-- Background Orbs -->[\s\S]*?</div>\n?', '', content)
    content = re.sub(r'<div id="cursor-glow"[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="fixed inset-0 z-0 fluid-focus-gradient[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="fixed w-\[600px\][^>]*animate-float-slow[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="fixed w-\[500px\][^>]*animate-float-delayed[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="absolute w-\[600px\][^>]*animate-float-slow[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="absolute w-\[500px\][^>]*animate-float-delayed[^>]*></div>\n?', '', content)
    content = re.sub(r'<div class="absolute w-\[600px\] h-\[600px\] bg-primary-container/20 rounded-full blur-\[120px\] -top-40 -left-40 pointer-events-none"></div>\n?', '', content)
    content = re.sub(r'<div class="absolute w-\[500px\] h-\[500px\] bg-secondary-container/15 rounded-full blur-\[100px\] bottom-20 right-20 pointer-events-none"></div>\n?', '', content)

    # 3. 精简底部按钮
    buttons_pattern = r'<!-- Original Three Buttons Layout \(Beautified\) -->[\s\S]*?</div>\n\s*</div>'
    new_buttons = '''<!-- Reading End CTA -->
<div class="mt-16 md:mt-24 pt-12 border-t border-outline-variant/20 mb-16 flex flex-col items-center gap-8 max-w-lg mx-auto px-4 w-full">
    <div class="w-full flex flex-col items-center gap-3">
        <a href="#" target="_blank" rel="noopener noreferrer" class="group relative inline-flex items-center justify-center w-full py-4 bg-surface/50 backdrop-blur-sm border border-outline-variant/50 hover:border-primary hover:bg-surface text-on-surface hover:text-primary transition-all duration-300 rounded-sm overflow-hidden">
            <span class="font-label text-xs tracking-[0.2em] uppercase z-10 flex items-center gap-3">
                阅读完整实录
                <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </span>
        </a>
    </div>
    <div class="w-full text-center pt-8 border-t border-outline-variant/10">
        <p class="font-label text-[10px] uppercase tracking-[0.3em] text-outline mb-4">下一场周期，你会如何掌舵？</p>
        <button class="speaker-trigger-btn group relative inline-flex items-center justify-center w-full py-4 bg-on-surface text-surface hover:bg-primary transition-all duration-300 rounded-sm overflow-hidden">
            <span class="font-label text-xs tracking-[0.2em] uppercase z-10 flex items-center gap-3">
                <span class="material-symbols-outlined text-lg">mic</span>
                就现在，来讲吧
            </span>
        </button>
    </div>
    <div class="w-full flex justify-center pt-8 border-t border-outline-variant/10 mt-2">
        <a href="../../archive.html" class="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors group">
            <span class="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span class="font-label text-[10px] uppercase tracking-[0.3em] font-medium">Back to Archive</span>
        </a>
    </div>
</div>'''
    content = re.sub(buttons_pattern, new_buttons + '\n</div>', content)

    # 4. 替换/追加 Footer
    content = re.sub(r'<footer[^>]*>[\s\S]*?</footer>', '', content)
    footer_html = '''
<!-- Footer (Synchronized with Global Spec) -->
<footer class="w-full bg-surface-container-low mt-auto relative z-20">
    <div class="flex flex-col md:flex-row justify-between items-center w-full px-4 sm:px-6 md:px-12 py-6 md:py-8 gap-6 md:gap-8 max-w-[1440px] mx-auto">
        <div class="text-fluid-lg font-display font-bold text-on-surface text-center md:text-left shrink-0">
            中大读书会 Light
        </div>
        <div class="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 md:gap-8 flex-1">
            <a class="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant hover:underline decoration-orange-500/30 underline-offset-4" href="#">微信公众号</a>
            <a class="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant hover:underline decoration-orange-500/30 underline-offset-4" href="#">加入社群</a>
            <a class="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant hover:underline decoration-orange-500/30 underline-offset-4" href="#">嘉宾推荐</a>
            <a class="font-label text-[10px] md:text-xs uppercase tracking-widest text-on-surface-variant hover:underline decoration-orange-500/30 underline-offset-4" href="#">联系我们</a>
        </div>
        <div class="font-label text-[9px] md:text-xs uppercase tracking-widest text-on-surface-variant text-center md:text-right w-full md:w-auto shrink-0">
            © 2025 中山大学深圳校友会读书会. All Rights Reserved.
        </div>
    </div>
</footer>'''
    if '<!-- WeChat QR Modal -->' in content:
        content = content.replace('<!-- WeChat QR Modal -->', footer_html + '\n\n<!-- WeChat QR Modal -->')
    else:
        content = content.replace('</body>', footer_html + '\n</body>')

    # 5. 移除动画脚本
    script_pattern = r'<!-- Interactive Animations Scripts -->[\s\S]*?<script>[\s\S]*?// Modal Logic'
    if re.search(script_pattern, content):
        content = re.sub(script_pattern, '<script>\n    // Modal Logic', content)
    else:
        content = re.sub(r'// 1\. Lenis Smooth Scroll Setup[\s\S]*?// Modal Logic', '// Modal Logic', content)
    
    content = re.sub(r'<script src="https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.2/gsap\.min\.js"></script>\n?', '', content)
    content = re.sub(r'<script src="https://cdnjs\.cloudflare\.com/ajax/libs/gsap/3\.12\.2/ScrollTrigger\.min\.js"></script>\n?', '', content)
    content = re.sub(r'<script src="https://cdn\.jsdelivr\.net/gh/studio-freight/lenis@1\.0\.29/bundled/lenis\.min\.js"></script>\n?', '', content)
    content = re.sub(r'<!-- Injecting GSAP & Lenis for animations -->\n?', '', content)

    # 6. 确保图片有 loading="lazy"
    content = re.sub(r'<img(?![^>]*loading="lazy")([^>]*)>', r'<img loading="lazy"\1>', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed: {filepath}")

for vol_dir in glob.glob('episodes/vol*'):
    index_file = os.path.join(vol_dir, 'index.html')
    if os.path.exists(index_file):
        process_html_file(index_file)

