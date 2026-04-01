import os

html_path = 'index.html'

with open(html_path, 'r') as f:
    content = f.read()

# 1. Modify Hero Glow Circles
content = content.replace(
    'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40"',
    'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 animate-glow-flow-1"'
)
content = content.replace(
    'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20"',
    'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 animate-glow-flow-2"'
)

# 2. Add Float class to Glass Panel
content = content.replace(
    'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px]',
    'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px] hover:shadow-primary/10 transition-shadow duration-700 animate-float-panel'
)

# 3. Wrap "什么是 Light" content for Scroll Reveal
content = content.replace(
    '<p>它取<span class="text-primary-container italic font-medium mx-1">"轻"</span>与<span class="text-primary-container italic font-medium mx-1">"光"</span>的双重含义。</p>',
    '<p class="scroll-reveal-text delay-0">它取<span class="text-primary-container italic font-medium mx-1">"轻"</span>与<span class="text-primary-container italic font-medium mx-1">"光"</span>的双重含义。</p>'
)
content = content.replace(
    '<p>是轻盈的相聚，是不设防的敞开；是照见彼此，<span class="font-medium text-primary-container">微光照亮微光</span>。</p>',
    '<p class="scroll-reveal-text delay-100">是轻盈的相聚，是不设防的敞开；是照见彼此，<span class="font-medium text-primary-container">微光照亮微光</span>。</p>'
)
content = content.replace(
    '<p class="text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light">\n                    2025年7月，「中大读书会 Light」正式点亮。作为中大深圳校友会读书会旗下的深度分享栏目，我们聚焦于真实的个体生命，邀请各行各业的湾区校友，呈现生命里极具重量的转折时刻。\n                </p>',
    '<p class="scroll-reveal-text delay-200 text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light">\n                    2025年7月，「中大读书会 Light」正式点亮。作为中大深圳校友会读书会旗下的深度分享栏目，我们聚焦于真实的个体生命，邀请各行各业的湾区校友，呈现生命里极具重量的转折时刻。\n                </p>'
)
content = content.replace(
    '<p class="text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light italic mt-6 md:mt-8">\n                    “ 愿散场之后，你能从别人的故事里，找到自己的答案。”\n                </p>',
    '<p class="scroll-reveal-text delay-300 text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light italic mt-6 md:mt-8">\n                    “ 愿散场之后，你能从别人的故事里，找到自己的答案。”\n                </p>'
)

# 4. Inject JS observer safely before </body>
js_code = """
<!-- HOME PAGE INTERACTIVE SCRIPTS -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal for About Text
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after revealing to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: "0px 0px -10% 0px"
    });

    document.querySelectorAll('.scroll-reveal-text').forEach(el => {
        observer.observe(el);
    });
});
</script>
"""

if 'HOME PAGE INTERACTIVE SCRIPTS' not in content:
    last_body = content.rfind('</body>')
    if last_body != -1:
        content = content[:last_body] + js_code + '\n' + content[last_body:]

with open(html_path, 'w') as f:
    f.write(content)

print("Updated index.html safely")
