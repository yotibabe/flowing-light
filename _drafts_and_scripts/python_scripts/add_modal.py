import glob
import re

modal_html = """
<!-- Wechat QR Code Modal -->
<div id="wechat-modal" class="fixed inset-0 z-[100] hidden items-center justify-center">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-surface/80 backdrop-blur-md transition-opacity duration-300 opacity-0" id="wechat-modal-backdrop"></div>
    
    <!-- Modal Content -->
    <div class="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm p-8 transform scale-95 opacity-0 transition-all duration-300" id="wechat-modal-content">
        <button id="close-modal-btn" class="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        
        <div class="text-center space-y-6">
            <div class="space-y-2">
                <h3 class="font-display text-xl font-bold text-stone-900">期待在这里<br>听到你的声音</h3>
                <p class="font-label text-xs uppercase tracking-widest text-stone-500">BECOME A SPEAKER</p>
            </div>
            
            <!-- QR Code Placeholder -->
            <div class="w-48 h-48 mx-auto bg-stone-100 rounded-xl flex items-center justify-center border border-stone-200 overflow-hidden">
                <!-- TODO: 替换为您的微信二维码图片 -->
                <!-- <img src="assets/wechat-qr.jpg" alt="WeChat QR Code" class="w-full h-full object-cover"> -->
                <span class="font-label text-sm text-stone-400">二维码占位符</span>
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

# Update detail pages
for file in glob.glob('detail-vol*.html'):
    with open(file, 'r') as f:
        content = f.read()

    cta_pattern = r'<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10">.*?</div>'
    new_cta = """<div class="text-center pt-8 md:pt-12 border-t border-outline-variant/10">
<p class="font-label text-[10px] md:text-xs uppercase tracking-[0.2em] text-secondary/60 mb-3 md:mb-4">下一场周期，你会如何掌舵？</p>
<button class="speaker-trigger-btn bg-primary text-on-primary px-8 md:px-10 py-3 md:py-4 rounded-md font-medium text-base md:text-xl hover:bg-primary/90 transition-colors duration-300 shadow-md shadow-primary/20 w-full md:w-auto">
                        就现在，来讲吧
                    </button>
</div>"""
    
    if "下一场周期，你会如何掌舵？" in content:
        content = re.sub(cta_pattern, new_cta, content, flags=re.DOTALL)
    elif "就现在，来讲吧" in content:
        # Just replace the button class
        content = content.replace('class="bg-primary text-on-primary', 'class="speaker-trigger-btn bg-primary text-on-primary')

    # Insert modal before </body>
    if "wechat-modal" not in content:
        content = content.replace('</body>', modal_html + '\n</body>')

    with open(file, 'w') as f:
        f.write(content)

print("Detail pages updated.")

# Update About page
with open('about.html', 'r') as f:
    content = f.read()

content = content.replace('>成为讲者</a>', '>.成为讲者</a>') 
content = content.replace('href="#" class="bg-primary', 'href="#" class="speaker-trigger-btn bg-primary')
content = content.replace('>.成为讲者</a>', '>成为讲者</a>')

if "wechat-modal" not in content:
    content = content.replace('</body>', modal_html + '\n</body>')

with open('about.html', 'w') as f:
    f.write(content)
    
print("About page updated.")
