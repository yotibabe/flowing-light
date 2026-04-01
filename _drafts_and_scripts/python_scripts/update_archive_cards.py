import re

with open('archive.html', 'r') as f:
    content = f.read()

new_grid = """<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        <!-- Vol 04 Card (Redesigned) -->
        <a href="detail-vol4.html" class="group flex flex-col gap-4 cursor-pointer">
            <div class="w-full aspect-[4/3] overflow-hidden bg-surface-container-low rounded-lg relative">
                <img src="assets/vol4/大合照.jpg" alt="Vol 4" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-stone-800">已圆满结束</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary">VOL. 04</span>
                    <span class="w-4 h-px bg-outline-variant/50"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-outline">OCT 2025</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">【认知觉醒】<br>穿越周期的力量</h3>
                <p class="font-body text-sm text-on-surface-variant line-clamp-2 mt-1">
                    在纷繁复杂的世界中，找回思考的主动权。投资不是关于财富的简单博弈，而是对客观规律的尊重。
                </p>
                <div class="inline-flex items-center gap-2 mt-2 text-primary font-medium text-xs tracking-wider group-hover:gap-3 transition-all">
                    <span>READ MORE</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
            </div>
        </a>

        <!-- Vol 03 Card (Redesigned) -->
        <a href="detail-vol3.html" class="group flex flex-col gap-4 cursor-pointer mt-0 md:mt-12">
            <div class="w-full aspect-[4/3] overflow-hidden bg-surface-container-low rounded-lg relative">
                <img src="assets/vol3/现场大合照.jpg" alt="Vol 3" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-stone-800">已圆满结束</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary">VOL. 03</span>
                    <span class="w-4 h-px bg-outline-variant/50"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-outline">AUG 2025</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">【教育探索】<br>把世界交还给孩子</h3>
                <p class="font-body text-sm text-on-surface-variant line-clamp-2 mt-1">
                    从“流水线”到“旷野”，探讨未来教育的另一种可能。教育的本质，是唤醒一个灵魂。
                </p>
                <div class="inline-flex items-center gap-2 mt-2 text-primary font-medium text-xs tracking-wider group-hover:gap-3 transition-all">
                    <span>READ MORE</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
            </div>
        </a>

        <!-- Vol 02 Card (Redesigned) -->
        <a href="detail-vol2.html" class="group flex flex-col gap-4 cursor-pointer">
            <div class="w-full aspect-[4/3] overflow-hidden bg-surface-container-low rounded-lg relative">
                <img src="assets/vol2/大合照.jpg" alt="Vol 2" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-stone-800">已圆满结束</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary">VOL. 02</span>
                    <span class="w-4 h-px bg-outline-variant/50"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-outline">MAY 2025</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">【自我破局】<br>从旷野中寻找旷野</h3>
                <p class="font-body text-sm text-on-surface-variant line-clamp-2 mt-1">
                    人生的容错率比想象中高得多。打破既定轨道，在不确定性中寻找属于自己的坐标。
                </p>
                <div class="inline-flex items-center gap-2 mt-2 text-primary font-medium text-xs tracking-wider group-hover:gap-3 transition-all">
                    <span>READ MORE</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
            </div>
        </a>

        <!-- Vol 01 Card (Redesigned) -->
        <a href="detail-vol1.html" class="group flex flex-col gap-4 cursor-pointer mt-0 md:mt-12">
            <div class="w-full aspect-[4/3] overflow-hidden bg-surface-container-low rounded-lg relative">
                <img src="assets/vol1/合照.jpg" alt="Vol 1" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105">
                <div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-stone-800">已圆满结束</span>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <div class="flex items-center gap-3">
                    <span class="font-label text-[10px] uppercase tracking-[0.3em] text-primary">VOL. 01</span>
                    <span class="w-4 h-px bg-outline-variant/50"></span>
                    <span class="font-label text-[10px] uppercase tracking-widest text-outline">MAR 2025</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-on-surface group-hover:text-primary transition-colors leading-tight">【跨界转型】<br>我们终将成为我们</h3>
                <p class="font-body text-sm text-on-surface-variant line-clamp-2 mt-1">
                    从金融到实业，从大厂到创业。三个不同的人生样本，共同诠释了什么是真正的热爱。
                </p>
                <div class="inline-flex items-center gap-2 mt-2 text-primary font-medium text-xs tracking-wider group-hover:gap-3 transition-all">
                    <span>READ MORE</span>
                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
            </div>
        </a>
    </div>"""

content = re.sub(r'<div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">.*?</div>\n        \n        <!-- 2026', new_grid + '\n        \n        <!-- 2026', content, flags=re.DOTALL)

with open('archive.html', 'w') as f:
    f.write(content)
print("Archive cards updated.")