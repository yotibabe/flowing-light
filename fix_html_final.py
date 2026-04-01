import os

html_path = 'index.html'
with open(html_path, 'r') as f:
    content = f.read()

# Make sure we don't duplicate
if 'animate-glow-flow-1' not in content:
    content = content.replace(
        'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40"',
        'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 animate-glow-flow-1"'
    )
    content = content.replace(
        'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20"',
        'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 animate-glow-flow-2"'
    )

if 'animate-float-panel' not in content:
    content = content.replace(
        'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px]',
        'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px] animate-float-panel'
    )

if 'scroll-reveal-text delay-0' not in content:
    content = content.replace(
        '<h2 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>',
        '<h2 class="scroll-reveal-text delay-0 font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>'
    )

    content = content.replace(
        '<a href="archive.html" class="inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">',
        '<a href="archive.html" class="scroll-reveal-text delay-100 inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">'
    )

    content = content.replace(
        '<p>它取<span class="text-primary-container italic font-medium mx-1">"轻"</span>与<span class="text-primary-container italic font-medium mx-1">"光"</span>的双重含义。</p>',
        '<p class="scroll-reveal-text delay-200">它取<span class="text-primary-container italic font-medium mx-1">"轻"</span>与<span class="text-primary-container italic font-medium mx-1">"光"</span>的双重含义。</p>'
    )

    content = content.replace(
        '<p>是轻盈的相聚，是不设防的敞开；是照见彼此，<span class="font-medium text-primary-container">微光照亮微光</span>。</p>',
        '<p class="scroll-reveal-text delay-300">是轻盈的相聚，是不设防的敞开；是照见彼此，<span class="font-medium text-primary-container">微光照亮微光</span>。</p>'
    )

    content = content.replace(
        '<p class="text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light">\n                    2025年7月，「中大读书会 Light」正式点亮',
        '<p class="scroll-reveal-text delay-400 text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light">\n                    2025年7月，「中大读书会 Light」正式点亮'
    )

    content = content.replace(
        '<p class="text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light italic mt-6 md:mt-8">\n                    “ 愿散场之后',
        '<p class="scroll-reveal-text delay-500 text-base sm:text-lg md:text-xl leading-loose text-on-surface-variant font-light italic mt-6 md:mt-8">\n                    “ 愿散场之后'
    )

js_code = """
<!-- HOME PAGE INTERACTIVE SCRIPTS -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
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
print("Updated index.html")
