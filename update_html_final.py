import glob
import re

# 1. Update index.html for Hero Glow animation
try:
    with open('index.html', 'r') as f:
        idx_content = f.read()

    idx_content = idx_content.replace(
        'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40"',
        'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 animate-glow-1"'
    )
    idx_content = idx_content.replace(
        'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20"',
        'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 animate-glow-2"'
    )
    with open('index.html', 'w') as f:
        f.write(idx_content)
    print("Updated index.html")
except Exception as e:
    print(f"Error on index.html: {e}")

# 2. Update archive.html for Reveal-on-scroll
try:
    with open('archive.html', 'r') as f:
        arch_content = f.read()

    arch_content = arch_content.replace(
        'class="group relative w-full aspect-[4/5] bg-stone-100',
        'class="reveal-on-scroll group relative w-full aspect-[4/5] bg-stone-100'
    )

    js_script = """
<script>
    // Reveal on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });
</script>
</body>
"""
    if 'IntersectionObserver' not in arch_content:
        arch_content = arch_content.replace('</body>', js_script)

    with open('archive.html', 'w') as f:
        f.write(arch_content)
    print("Updated archive.html")
except Exception as e:
    print(f"Error on archive.html: {e}")

# 3. Update detail pages for Progress Bar & Spotlight & Reveal
detail_js = """
<!-- Progress Bar -->
<div id="reading-progress"></div>

<script>
    // Reading Progress
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('reading-progress').style.width = scrolled + '%';
    });

    // Spotlight Hover
    document.querySelectorAll('.spotlight-wrapper').forEach(wrapper => {
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            wrapper.style.setProperty('--x', `${x}px`);
            wrapper.style.setProperty('--y', `${y}px`);
        });
    });

    // Reveal on Scroll
    const detailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                detailObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        detailObserver.observe(el);
    });
</script>
"""

for file in glob.glob('detail*.html'):
    try:
        with open(file, 'r') as f:
            content = f.read()
            
        # Add spotlight to images inside figures
        content = re.sub(
            r'(<div class="[^"]*bg-surface-container-low[^"]*overflow-hidden[^"]*">)',
            r'\1 spotlight-wrapper reveal-on-scroll',
            content
        )
        
        # Add reveal to blockquotes
        content = content.replace('<blockquote class="', '<blockquote class="reveal-on-scroll ')
        
        if 'id="reading-progress"' not in content:
            content = content.replace('</body>', detail_js + '\n</body>')
            
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")
    except Exception as e:
        print(f"Error on {file}: {e}")

