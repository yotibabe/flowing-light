import os
import glob

css_path = 'css/style.css'

fancy_css = """
/* =========================================
   FANCY INTERACTIVE EFFECTS (NON-INVASIVE)
   ========================================= */

/* 1. Custom Magnetic Cursor */
@media (pointer: fine) {
    body { cursor: none; }
}

.fancy-cursor {
    position: fixed; top: 0; left: 0; width: 20px; height: 20px;
    border: 1.5px solid rgba(166, 58, 25, 0.8); border-radius: 50%;
    pointer-events: none; z-index: 999999; transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease, background-color 0.3s ease;
}

.fancy-cursor-dot {
    position: fixed; top: 0; left: 0; width: 4px; height: 4px;
    background-color: #a63a19; border-radius: 50%;
    pointer-events: none; z-index: 1000000; transform: translate(-50%, -50%);
}

.fancy-cursor.hovering {
    width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2);
    border-color: rgba(166, 58, 25, 0.2); backdrop-filter: blur(2px);
}

/* 2. 3D Tilt Effect */
.tilt-element {
    transition: transform 0.1s ease-out; transform-style: preserve-3d; will-change: transform;
}

/* 3. Smooth Reveal */
.fancy-reveal {
    opacity: 0; transform: translateY(30px);
    transition: opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1);
}
.fancy-reveal.is-visible { opacity: 1; transform: translateY(0); }

/* 4. Blob Animation */
@keyframes blobSwim {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -30px) scale(1.05); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
    100% { transform: translate(0px, 0px) scale(1); }
}
.blob-animated { animation: blobSwim 15s ease-in-out infinite alternate; }
"""

with open(css_path, 'r') as f:
    css_content = f.read()

if "FANCY INTERACTIVE EFFECTS" not in css_content:
    with open(css_path, 'a') as f:
        f.write("\n" + fancy_css)

fancy_js = """
<!-- FANCY INTERACTIVE SCRIPTS -->
<script>
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    if (window.matchMedia("(pointer: fine)").matches) {
        const cursor = document.createElement('div'); cursor.className = 'fancy-cursor';
        const dot = document.createElement('div'); dot.className = 'fancy-cursor-dot';
        document.body.appendChild(cursor); document.body.appendChild(dot);
        
        let mouseX = 0, mouseY = 0, cx = 0, cy = 0;
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX; mouseY = e.clientY;
            dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        });
        
        const loop = () => {
            cx += (mouseX - cx) * 0.15; cy += (mouseY - cy) * 0.15;
            cursor.style.transform = `translate(${cx}px, ${cy}px)`;
            requestAnimationFrame(loop);
        };
        loop();
        
        document.querySelectorAll('a, button, .archive-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // 2. 3D Tilt
    document.querySelectorAll('.backdrop-blur-\\[60px\\], .archive-card').forEach(el => {
        el.classList.add('tilt-element');
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rx = ((y - rect.height/2) / rect.height) * -6;
            const ry = ((x - rect.width/2) / rect.width) * 6;
            el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        });
    });

    // 3. Blob & Reveal
    document.querySelectorAll('.rounded-full.blur-\\[120px\\], .rounded-full.blur-\\[100px\\]').forEach(el => el.classList.add('blob-animated'));
    
    document.querySelectorAll('p, h2, h3, figure, .archive-card').forEach(el => el.classList.add('fancy-reveal'));
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    document.querySelectorAll('.fancy-reveal').forEach(el => observer.observe(el));
});
</script>
"""

for file in glob.glob('*.html'):
    if 'index2.html' in file: continue
    try:
        with open(file, 'r') as f:
            content = f.read()
            
        if "FANCY INTERACTIVE SCRIPTS" not in content:
            last_body = content.rfind('</body>')
            if last_body != -1:
                new_content = content[:last_body] + fancy_js + content[last_body:]
                with open(file, 'w') as f:
                    f.write(new_content)
                print(f"Injected into {file}")
    except Exception as e:
        print(f"Error {file}: {e}")

print("Fancy effects applied.")
