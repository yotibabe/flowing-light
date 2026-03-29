import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    new_modal_content = """
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-[300px] p-6 transform scale-95 opacity-0 transition-all duration-300" id="wechat-modal-content">
        <button id="close-modal-btn" class="absolute top-3 right-3 text-stone-400 hover:text-stone-800 transition-colors z-20">
            <span class="material-symbols-outlined">close</span>
        </button>
        
        <div class="text-center flex flex-col items-center justify-center">
            <img src="assets/wechat-qr.png" onerror="this.onerror=null; this.src='assets/wechat-qr.jpg';" alt="WeChat QR Code" class="w-full h-auto object-contain">
        </div>
    </div>
    """
    
    # We need to replace the inner content of the modal.
    # The old modal content starts with `<div class="relative z-10 bg-white rounded-2xl` and ends with the matching `</div>` before `</div>` (the modal container).
    
    # A safer way: just find the whole modal and replace it
    old_modal_pattern = r'<!-- Wechat QR Code Modal -->.*?</script>'
    
    new_modal = """
<!-- Wechat QR Code Modal -->
<div id="wechat-modal" class="fixed inset-0 z-[100] hidden items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-surface/80 backdrop-blur-md transition-opacity duration-300 opacity-0" id="wechat-modal-backdrop"></div>
    
    <!-- Modal Content -->
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-[280px] p-4 sm:p-6 transform scale-95 opacity-0 transition-all duration-300" id="wechat-modal-content">
        <button id="close-modal-btn" class="absolute top-3 right-3 text-stone-400 hover:text-stone-800 transition-colors z-20 bg-white/80 rounded-full p-1">
            <span class="material-symbols-outlined text-xl">close</span>
        </button>
        
        <div class="text-center flex flex-col items-center justify-center pt-2">
            <!-- 直接展示纯净的二维码图片 -->
            <img src="assets/wechat-qr.png" onerror="this.onerror=null; this.src='assets/wechat-qr.jpg';" alt="WeChat QR Code" class="w-full h-auto object-contain rounded-lg">
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
        
        // Find all trigger buttons
        const triggerBtns = document.querySelectorAll('.speaker-trigger-btn');
        
        const openModal = () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Trigger reflow
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
    content = re.sub(old_modal_pattern, new_modal, content, flags=re.DOTALL)

    with open(file, 'w') as f:
        f.write(content)

print("Modal style updated to be clean and pure.")
