import glob
import re

exact_modal_content = """
<!-- WECHAT MODAL (Hidden by default) -->
<div id="wechat-modal" class="fixed inset-0 z-[100] hidden items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-surface-container-highest/80 backdrop-blur-md transition-opacity" 
         onclick="document.getElementById('wechat-modal').classList.add('hidden'); document.getElementById('wechat-modal-content').classList.remove('scale-100', 'opacity-100'); document.getElementById('wechat-modal-content').classList.add('scale-95', 'opacity-0');">
    </div>
    
    <!-- Modal Content -->
    <div id="wechat-modal-content" class="relative bg-white p-8 shadow-2xl scale-95 opacity-0 transition-all duration-300 max-w-[320px] w-full mx-auto flex flex-col items-center rounded-2xl">
        <!-- Close Button -->
        <button onclick="document.getElementById('wechat-modal').classList.add('hidden'); document.getElementById('wechat-modal-content').classList.remove('scale-100', 'opacity-100'); document.getElementById('wechat-modal-content').classList.add('scale-95', 'opacity-0');" 
                class="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <span class="material-symbols-outlined text-2xl font-light">close</span>
        </button>
        
        <h3 class="font-headline text-[22px] font-bold text-gray-900 mb-1 text-center leading-snug tracking-wide mt-2">期待在这里<br>听到你的声音</h3>
        <p class="font-sans text-[10px] text-gray-400 tracking-[0.15em] uppercase mb-6">BECOME A SPEAKER</p>
        
        <!-- Profile info above QR -->
        <div class="flex items-center gap-3 self-start ml-2 mb-2">
            <img src="assets/yoti-avatar.jpg" alt="Yoti" class="w-10 h-10 rounded-lg object-cover" onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=Yoti&background=random';">
            <div class="flex flex-col">
                <span class="font-medium text-sm text-gray-900">Yoti</span>
                <span class="text-[10px] text-gray-400">广东 深圳</span>
            </div>
        </div>
        
        <div class="w-full aspect-square bg-white mb-6 flex justify-center items-center">
            <img src="assets/wechat-qr-yoti.jpg" alt="WeChat QR Code" class="w-[90%] h-[90%] object-contain" onerror="this.onerror=null; this.src='assets/wechat-qr-yoti.png';">
        </div>
        
        <p class="font-sans text-[13px] text-gray-600 text-center leading-relaxed mb-2">扫码添加主理人微信<br>开启你的表达之旅</p>
    </div>
</div>
</main>
"""

for file in glob.glob("*.html"):
    if file.endswith(".py"):
        continue
        
    with open(file, "r", encoding="utf-8") as f:
        html = f.read()

    # Find and replace the entire modal block up to </main>
    html = re.sub(r'<!-- WECHAT MODAL.*?</div>\s*</div>\s*</main>', exact_modal_content, html, flags=re.DOTALL)

    with open(file, "w", encoding="utf-8") as f:
        f.write(html)

print("done")
