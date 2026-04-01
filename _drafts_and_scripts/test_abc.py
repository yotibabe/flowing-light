import os
import re

base_file = 'episodes/vol4/index.html'

def read_base():
    with open(base_file, 'r', encoding='utf-8') as f:
        content = f.read()
    content = re.sub(r'<!-- Footer \(Synchronized with Global Spec\) -->[\s\S]*?</footer>', '', content)
    back_pattern = r'<!-- 3\. Back to Archive -->[\s\S]*?</div>\n</div>'
    content = re.sub(back_pattern, '</div>', content)
    return content

base_content = read_base()

# --- 方案 A: 悬浮书签 ---
content_A = base_content
floating_btn_A = '''
<!-- 方案 A: 悬浮书签 -->
<div class="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[100]">
    <a href="../../archive.html" class="group flex items-center justify-center h-12 w-12 hover:w-48 bg-white/60 backdrop-blur-md border border-outline-variant/30 rounded-full shadow-lg shadow-on-surface/5 transition-all duration-500 overflow-hidden">
        <span class="material-symbols-outlined text-on-surface group-hover:-translate-x-2 transition-transform duration-500 shrink-0 absolute">arrow_back</span>
        <span class="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500 whitespace-nowrap absolute">
            Back to Archive
        </span>
    </a>
</div>
'''
content_A = content_A.replace('<!-- WeChat QR Modal -->', floating_btn_A + '\n<!-- WeChat QR Modal -->')
with open('episodes/vol4/test_A.html', 'w', encoding='utf-8') as f:
    f.write(content_A)

# --- 方案 B: 沉浸式大收尾 ---
content_B = base_content
endcap_B = '''
<!-- 方案 B: 沉浸式大收尾 -->
<div class="w-full border-t border-outline-variant/20 mt-24">
    <a href="../../archive.html" class="group block w-full py-16 md:py-24 text-center hover:bg-surface-container-low transition-colors duration-700">
        <div class="flex flex-col items-center gap-6">
            <span class="material-symbols-outlined text-3xl md:text-4xl text-outline group-hover:text-primary group-hover:-translate-x-4 transition-all duration-500">west</span>
            <div class="space-y-2">
                <h3 class="font-headline text-fluid-2xl font-bold text-on-surface group-hover:text-primary transition-colors">The Archive</h3>
                <p class="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant">探索更多往期实录</p>
            </div>
        </div>
    </a>
</div>
'''
content_B = content_B.replace('</main>', endcap_B + '\n</main>')
with open('episodes/vol4/test_B.html', 'w', encoding='utf-8') as f:
    f.write(content_B)

# --- 方案 C: 侧边栏导航坐标 ---
content_C = base_content
coordinate_C = '''
<!-- 方案 C: 侧边栏导航坐标 -->
<div class="hidden lg:block absolute left-8 top-[90vh] h-full z-30">
    <div class="sticky top-40 flex flex-col items-center gap-6">
        <a href="../../archive.html" class="group flex flex-col items-center gap-4 hover:text-primary text-outline transition-colors">
            <span class="material-symbols-outlined transform group-hover:-translate-y-2 transition-transform duration-300">arrow_upward</span>
            <span class="font-label text-[10px] uppercase tracking-[0.4em] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                Back to Archive
            </span>
        </a>
        <div class="w-px h-24 bg-outline-variant/30"></div>
    </div>
</div>
'''
mobile_C = '''
<!-- 方案 C: 移动端顶部返回 -->
<div class="lg:hidden w-full px-6 pt-8 pb-4">
    <a href="../../archive.html" class="inline-flex items-center gap-2 text-outline hover:text-primary transition-colors group">
        <span class="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span class="font-label text-[10px] uppercase tracking-[0.2em]">Archive</span>
    </a>
</div>
'''
content_C = content_C.replace('<!-- Narrative Content: Editorial Layout -->', coordinate_C + '\n' + mobile_C + '\n<!-- Narrative Content: Editorial Layout -->')
with open('episodes/vol4/test_C.html', 'w', encoding='utf-8') as f:
    f.write(content_C)

print("Generated test_A.html, test_B.html, test_C.html in episodes/vol4/")
