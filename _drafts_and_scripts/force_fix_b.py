import os
import re

filepath = 'episodes/vol4/test_B.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 问题找到了！文件里居然有两个巨大的被注释掉的 block，还有一大堆 </div>
# 最重要的是，`<main>` 根本就没有关闭（在文件中找不到 `</main>` 或者它在错误的地方）
# 以及原来的按钮块 (Reading End CTA) 里，多了一个 `Back to Archive`

# 1. 强力清除旧的 Back to Archive
content = re.sub(r'<div class="w-full flex justify-center pt-8 border-t border-outline-variant/10 mt-2">\s*<a href="../../archive.html"[\s\S]*?</a>\s*</div>', '', content)

# 2. 清理掉那些多余的空 div 
content = re.sub(r'</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>', '</div>', content)

# 3. 定位到真正的插入点。在微信模态框之前，关闭所有的容器，然后插入巨大的区块。
huge_endcap = '''
</main> <!-- 强制关闭 main -->
</div> <!-- 强制关闭任何可能的父容器 -->

<!-- 方案 B: 真正的全宽沉浸式大收尾 (独立于 main 的流式布局外) -->
<section class="w-full bg-surface-container-highest border-t border-outline-variant/10 mt-24 group cursor-pointer transition-colors duration-700 hover:bg-primary/5 relative z-50" onclick="window.location.href='../../archive.html'">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32 lg:py-48 flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="flex-1 text-center md:text-left">
            <span class="font-label text-sm md:text-base uppercase tracking-[0.4em] text-outline mb-6 block">End of Episode</span>
            <h2 class="font-display text-fluid-5xl md:text-[8rem] leading-none font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors duration-500">
                The Archive
            </h2>
            <p class="font-body text-fluid-xl text-on-surface-variant mt-8 font-light tracking-wide">
                向左翻页，探索更多微光时刻
            </p>
        </div>
        
        <div class="shrink-0 flex items-center justify-center w-32 h-32 md:w-48 md:h-48 rounded-full border border-outline-variant/30 group-hover:border-primary/50 group-hover:bg-primary transition-all duration-500 shadow-lg shadow-on-surface/5 group-hover:shadow-primary/20 group-hover:-translate-x-6">
            <span class="material-symbols-outlined text-5xl md:text-7xl text-outline group-hover:text-white transition-all duration-500">west</span>
        </div>
    </div>
</section>
'''

# 替换 modal 之前的区域
content = content.replace('<!-- WeChat QR Modal -->', huge_endcap + '\n<!-- WeChat QR Modal -->')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Force fixed test_B.html")
