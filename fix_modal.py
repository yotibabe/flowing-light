import glob

modal_html = """<!-- WeChat QR Modal -->
<div id="wechat-modal" class="fixed inset-0 z-[100] hidden items-center justify-center">
    <div id="wechat-modal-backdrop" class="absolute inset-0 bg-surface/90 backdrop-blur-md opacity-0 transition-opacity duration-300"></div>
    <div id="wechat-modal-content" class="relative bg-surface-container-lowest p-8 md:p-12 shadow-2xl scale-95 opacity-0 transition-all duration-300 max-w-sm w-[90%] mx-auto flex flex-col items-center border border-outline-variant/20">
        <button id="close-modal-btn" class="absolute top-4 right-4 p-2 text-outline hover:text-primary transition-colors">
            <span class="material-symbols-outlined">close</span>
        </button>
        <span class="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-6">Let's Connect</span>
        <h3 class="font-headline text-2xl font-bold mb-8 text-center leading-tight">
            扫码添加主理人微信<br>开启你的表达
        </h3>
        <div class="w-48 h-48 bg-surface-container-low mb-8 relative p-2 border border-outline-variant/20">
            <img src="assets/wechat-qr-yoti.jpg" alt="WeChat QR Code" class="w-full h-full object-cover">
        </div>
        <p class="font-body text-sm text-center text-outline leading-relaxed">
            请备注“Light 表达计划”<br>期待你的故事
        </p>
    </div>
</div>
"""

for file in ['detail-vol2.html', 'detail-vol3.html', 'detail-vol4.html', 'detail.html']:
    try:
        with open(file, 'r') as f:
            content = f.read()
        
        if 'id="wechat-modal"' not in content:
            # insert right before the first <script> tag
            content = content.replace('<script>', modal_html + '\n<script>', 1)
            with open(file, 'w') as f:
                f.write(content)
            print(f"Added modal to {file}")
        else:
            print(f"Modal already exists in {file}")
    except Exception as e:
        print(f"Skipping {file}: {e}")

