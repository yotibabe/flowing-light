import glob
import re

for file in glob.glob("*.html"):
    with open(file, "r") as f:
        content = f.read()

    # Define the CSS
    css_injection = """
    <!-- Fancy Effects CSS -->
    <style>
        /* 1. Dynamic Film Grain (动态胶片颗粒) */
        .film-grain {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.04;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            animation: noise-shift 0.2s infinite steps(2);
        }
        @keyframes noise-shift {
            0% { transform: translate(0, 0); }
            50% { transform: translate(-5%, -5%); }
            100% { transform: translate(5%, 5%); }
        }

        /* 2. Fluid Gradient Background (缓慢流动的流体渐变) */
        .ethereal-gradient-bg {
            background: linear-gradient(-45deg, #F7E1D8, #E9F3FF, #ffffff, #FDF5E6);
            background-size: 400% 400%;
            animation: gradient-flow 15s ease infinite;
        }
        @keyframes gradient-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        /* 4. Cinematic Text Reveal (电影级文字浮现) */
        .reveal-text-line {
            overflow: hidden;
            display: inline-block;
        }
        .reveal-text-line span {
            display: inline-block;
            transform: translateY(100%);
            opacity: 0;
            transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1), opacity 1.2s ease-out;
        }
        .reveal-text-line.is-visible span {
            transform: translateY(0);
            opacity: 1;
        }

        /* 5. Scroll Reveal (向下滚动时的丝滑浮现) */
        .scroll-reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .scroll-reveal.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
    """
    
    js_injection = """
    <!-- Fancy Effects JS -->
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            // 1. Add Film Grain element
            if (!document.querySelector(".film-grain")) {
                const grain = document.createElement("div");
                grain.className = "film-grain";
                document.body.appendChild(grain);
            }

            // 2. Scroll Reveal Logic (Intersection Observer)
            const revealElements = document.querySelectorAll(".scroll-reveal, .reveal-text-line");
            
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            }, {
                root: null,
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
            });

            revealElements.forEach(el => revealObserver.observe(el));
            
            // Trigger immediately for elements already in viewport on load
            setTimeout(() => {
                revealElements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if(rect.top < window.innerHeight && rect.bottom > 0) {
                        el.classList.add("is-visible");
                    }
                });
            }, 100);
        });
    </script>
    """
    
    if "Fancy Effects CSS" not in content:
        content = content.replace("</head>", css_injection + "\n</head>")
        
    if "Fancy Effects JS" not in content:
        content = content.replace("</body>", js_injection + "\n</body>")
        
    # Apply Cinematic Text Reveal to H1 tags
    def wrap_h1_content(match):
        attrs = match.group(1)
        inner = match.group(2)
        if "reveal-text-line" not in attrs:
            attrs = attrs + " reveal-text-line"
        if "<span style=\"transition-delay" not in inner:
            inner = f"<span style=\"transition-delay: 0.2s\">{inner}</span>"
        return f"<h1{attrs}>{inner}</h1>"
        
    content = re.sub(r"<h1([^>]*)>(.*?)</h1>", wrap_h1_content, content, flags=re.DOTALL)
    
    # Apply Scroll Reveal to paragraphs, figures, and cards
    # Only if they don't already have scroll-reveal
    content = re.sub(r'<p class="([^"]*font-body[^"]*)"', lambda m: f'<p class="{m.group(1)} scroll-reveal"' if 'scroll-reveal' not in m.group(1) else m.group(0), content)
    content = re.sub(r'<figure class="([^"]*)"', lambda m: f'<figure class="{m.group(1)} scroll-reveal"' if 'scroll-reveal' not in m.group(1) else m.group(0), content)
    
    # archive cards
    content = re.sub(r'<a href="detail-vol([^"]*)" class="group flex flex-col gap-4 cursor-pointer', lambda m: f'<a href="detail-vol{m.group(1)}" class="group flex flex-col gap-4 cursor-pointer scroll-reveal', content)

    with open(file, "w") as f:
        f.write(content)

print("done")
