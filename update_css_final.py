import os

css_path = 'css/style.css'

with open(css_path, 'r') as f:
    css_content = f.read()

new_css = """
/* --- Advanced Animations --- */
@keyframes ambientGlow1 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.8; }
    33% { transform: translate(30px, -50px) scale(1.1); opacity: 1; }
    66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.7; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
}

@keyframes ambientGlow2 {
    0% { transform: translate(0, 0) scale(1); opacity: 0.7; }
    33% { transform: translate(-40px, 30px) scale(0.95); opacity: 0.9; }
    66% { transform: translate(20px, -20px) scale(1.05); opacity: 0.6; }
    100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
}

.animate-glow-1 { animation: ambientGlow1 20s ease-in-out infinite alternate; }
.animate-glow-2 { animation: ambientGlow2 25s ease-in-out infinite alternate; }

#reading-progress {
    position: fixed; top: 0; left: 0; width: 0%; height: 3px;
    background: #a63a19; z-index: 9999; transition: width 0.1s ease-out;
}

.reveal-on-scroll {
    opacity: 0; transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.2, 1, 0.3, 1), transform 0.8s cubic-bezier(0.2, 1, 0.3, 1);
}
.reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0); }

.spotlight-wrapper { position: relative; overflow: hidden; }
.spotlight-wrapper::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(circle 150px at var(--x, 50%) var(--y, 50%), rgba(255, 255, 255, 0.15), transparent 80%);
    opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: 20;
}
.spotlight-wrapper:hover::before { opacity: 1; }

.parallax-bg { will-change: transform; }
"""

if "/* --- Advanced Animations --- */" not in css_content:
    with open(css_path, 'a') as f:
        f.write("\n" + new_css)
    print("CSS updated.")
