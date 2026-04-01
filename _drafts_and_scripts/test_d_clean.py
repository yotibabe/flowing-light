import os
import re

base_file = 'episodes/vol4/index.html'

def read_base():
    with open(base_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 移除底部的标准 Footer
    content = re.sub(r'<!-- Footer \(Synchronized with Global Spec\) -->[\s\S]*?</footer>', '', content)
    return content

content_D = read_base()

# D 方案的全新区块
new_cta_d = '''<!-- Reading End CTA (方案 D) -->
<div class="mt-16 md:mt-24 pt-12 border-t border-outline-variant/20 mb-32 flex flex-col items-center gap-6 max-w-lg mx-auto px-4 w-full relative z-20">
    
    <!-- 1. 就现在，来讲吧 (原先在下面的实色按钮，现在放到最上面) -->
    <div class="w-full flex flex-col items-center">
        <button class="speaker-trigger-btn group relative inline-flex items-center justify-center w-full py-4 bg-on-surface text-surface hover:bg-primary transition-all duration-300 rounded-sm overflow-hidden">
            <span class="font-label text-xs tracking-[0.2em] uppercase z-10 flex items-center gap-3">
                <span class="material-symbols-outlined text-lg">mic</span>
                就现在，来讲吧
            </span>
        </button>
    </div>

    <!-- 2. 回到目录 (原先的阅读完整实录按钮款式) -->
    <div class="w-full flex flex-col items-center">
        <a href="../../archive.html" class="group relative inline-flex items-center justify-center w-full py-4 bg-surface/50 backdrop-blur-sm border border-outline-variant/50 hover:border-primary hover:bg-surface text-on-surface hover:text-primary transition-all duration-300 rounded-sm overflow-hidden">
            <span class="font-label text-xs tracking-[0.2em] uppercase z-10 flex items-center gap-3">
                <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
                回到目录
            </span>
        </a>
    </div>

</div>
</main>
</div>
'''

# 替换掉原有的 Reading End CTA
content_D = re.sub(r'<!-- Reading End CTA -->[\s\S]*?(?=<!-- WeChat QR Modal -->)', new_cta_d + '\n\n', content_D)

with open('episodes/vol4/test_D.html', 'w', encoding='utf-8') as f:
    f.write(content_D)

print("Created test_D.html successfully.")
