import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    new_modal = """
<!-- Wechat QR Code Modal -->
<div id="wechat-modal" class="fixed inset-0 z-[100] hidden items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-surface/80 backdrop-blur-md transition-opacity duration-300 opacity-0" id="wechat-modal-backdrop"></div>
    
    <!-- Modal Content -->
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-8 transform scale-95 opacity-0 transition-all duration-300" id="wechat-modal-content">
        <button id="close-modal-btn" class="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors z-20">
            <span class="material-symbols-outlined">close</span>
        </button>
        
        <div class="text-center space-y-6">
            <div class="space-y-2">
                <h3 class="font-display text-xl font-bold text-stone-900">期待在这里<br>听到你的声音</h3>
                <p class="font-label text-xs uppercase tracking-widest text-stone-500">BECOME A SPEAKER</p>
            </div>
            
            <!-- QR Code Area -->
            <div class="w-56 h-56 mx-auto flex items-center justify-center overflow-hidden bg-white">
                <img src="assets/wechat-qr.png" onerror="this.onerror=null; this.src='assets/wechat-qr.jpg';" alt="WeChat QR Code" class="w-full h-full object-contain">
            </div>
            
            <p class="font-body text-sm text-stone-600">
                扫码添加主理人微信<br>开启你的表达之旅
            </p>
        </div>
    </div>
</div>

<script>
    // Modal Logic
    document.addEventListener('DOMContentLoaded', () => {
        const modal = document.getElementById('wechat-modal');
        const backdrop = document.getElementById('wechat-modal-backdrop');
        const content = document.getElementById('wechat-modal-content');
        const closeBtn = document.getElementById('close-modal-btn');
        
        const triggerBtns = document.querySelectorAll('.speaker-trigger-btn');
        
        const openModal = () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            void modal.offsetWidth;
            backdrop.classList.remove('opacity-0');
            backdrop.classList.add('opacity-100');
            content.classList.remove('scale-95', 'opacity-0');
            content.classList.add('scale-100', 'opacity-100');
            document.body.style.overflow = 'hidden';
        };
        
        const closeModal = () => {
            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.remove('flex');
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            }, 300);
        };
        
        triggerBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
        
        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        if(backdrop) backdrop.addEventListener('click', closeModal);
    });
</script>
"""

    old_modal_pattern = r'<!-- Wechat QR Code Modal -->.*?</script>'
    content = re.sub(old_modal_pattern, new_modal, content, flags=re.DOTALL)

    with open(file, 'w') as f:
        f.write(content)

print("Modal reverted to have text but clean image.")
