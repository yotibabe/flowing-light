import os

base_file = 'episodes/vol4/index.html'

with open(base_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 首先把之前所有可能写乱的 Back to Archive 删除
import re
content = re.sub(r'<!-- 3\. Back to Archive -->[\s\S]*?</div>\n</div>', '</div>', content)
content = re.sub(r'<!-- 方案 B: 沉浸式大收尾 -->[\s\S]*?</div>\n</div>', '', content)
content = re.sub(r'<!-- 方案 B: 真正的全屏沉浸式大收尾.*?-->[\s\S]*?</section>', '', content)

# 2. 我们不替换 </main>，我们直接在 </main> 的前面，确保关闭所有 div，
# 或者最安全的做法是：在 </main> 后面插入全宽容器。

huge_endcap = '''
<!-- 方案 B: 真正的全宽沉浸式大收尾 (独立于 main 的流式布局外) -->
<section class="w-full bg-surface-container-highest border-t border-outline-vaimport os

base_file = 'episodes/vol4/index.html'

with open(base_file, 'r', e z
base_filic
with open(base_file, 'r', encoding=ml    content = f.read()

# 1. 首先把之前所有可能写乱? 
# 1. 首先把之前x fimport re
content = re.sub(r'<!-- 3\. Back to Archive -->[\  conte clascontent = re.sub(r'<!-- 方案 B: 沉浸式大收尾 -->[\s\S]*?</div>\n</div>', '', contracontent = re.sub(r'<!-- 方案 B: 真正的全屏沉浸式大收尾.*?-->[\s\S]*?</section>', '5x