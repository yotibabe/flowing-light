import os
import re

base_file = 'episodes/vol4/index.html'

def read_base():
    with open(base_file, 'r', encoding='utf-8') as f:
        content = f.read()
    # 移除底部的标准 Footer
    content = re.sub(r'<!-- Footer \(Synchronized with Global Spec\) -->[\s\S]*?</footer>', '', content)
    # 移除文章末尾的返回按钮块
    back_pattern = r'<!-- 3\. Back to Archive -->[\s\S]*?</div>\n</div>'
    content = re.sub(back_pattern, '</div>', content)
    return content

base_content = read_base()

# ====== 修复 Test B: 沉浸式大收尾 (宽幅、大面积) ======
content_B = base_content
huge_endcap = '''
</main>

<!-- 方案 B: 沉浸式大收尾 (真正的宽幅、大面积) -->
<div class="w-full bg-surface-container-highest border-t border-outline-variant/10 mt-16 group cursor-pointer transition-colors duration-700 hover:bg-primary/5" onclick="window.location.href='../../archive.html'">
    <div class="max-w-[1440px] mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="flex-1 text-center md:text-left">
            <span class="font-label text-sm uppercase tracking-[0.4em] text-outline mb-4 block">End of Episode</span>
            <h2 class="font-display text-fluid-4xl md:text-fluid-5xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors duration-500">
                The Archive
            </h2>
            <p class="font-body text-fluid-lg text-on-surface-variant mt-4 font-light">
                探索更多微光时刻
            </p>
        </div>
        
        <div class="shrink-0 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full border border-outline-variant/30 group-hover:border-primary/50 group-hover:bg-primary transition-all duration-500">
            <span class="material-symbols-outlined text-4xl text-outline group-hover:text-white group-hover:-translate-x-2 transition-all duration-500">west</span>
        </div>
    </div>
</div>
'''
# 将收尾直接替换 </main>，也就是让它跳出 <main> 的限制，独占底部全宽
content_B = content_B.replace('</main>', huge_endcap)
with open('episodes/vol4/test_B.html', 'w', encoding='utf-8') as f:
    f.write(content_B)


# ====== 修复 Test C: 侧边栏导航坐标 (绝对侧边，粘性悬浮) ======
content_C = base_content
fixed_sidebar_c = '''
<!-- 方案 C: 左侧悬浮的杂志坐标线 (PC端) -->
<div class="hidden 2xl:flex fixed left-0 top-0 h-screen w-24 flex-col items-center justify-center border-r border-outline-variant/10 bg-surface/30 backdrop-blur-sm z-[100]">
    <a href="../../archive.html" class="group flex flex-col items-center gap-8 h-full justify-center text-outline hover:text-primary transition-colors w-full">
        <span class="material-symbols-outlined transform group-hover:-translate-y-4 transition-transform duration-500 text-xl">arrow_upward</span>
        <span class="font-label text-xs uppercase tracking-[0.5em] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
            Back to Archive
        </span>
        <div class="w-[1px] h-32 bg-outline-variant/30 group-hover:bg-primary/50 transition-colors duration-500 mt-4"></div>
    </a>
</div>

<!-- 方案 C: 移动端/小屏幕时的顶部简约返回 -->
<div class="2xl:hidden w-full max-w-[800px] mx-auto px-6 pt-32 pb-4 relative z-20">
    <a href="../../archive.html" class="inline-flex items-center gap-3 text-outline hover:text-primary transition-colors group">
        <span class="material-symbols-outlined text-base group-hover:-translate-x-2 transition-transform">arrow_back</span>
        <span class="font-label text-xs uppercase tracking-[0.2em]">Archive</span>
    </a>
</div>
'''
# 在 main 的最外层外部插入侧边栏，这样就不会被页面其他元素的宽度挤压
content_C = content_C.replace('<main>', fixed_sidebar_c + '\n<main>')
with open('episodes/vol4/test_C.html', 'w', encoding='utf-8') as f:
    f.write(content_C)

print("Fixed test_B.html and test_C.html successfully.")
