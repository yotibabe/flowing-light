import os
css_path = 'css/style.css'

with open(css_path, 'r') as f:
    content = f.read()

# The python regex replace messed up the CSS syntax. Let's fix it by completely replacing the section.
# Find everything before "HOME PAGE SPECIFIC ANIMATIONS"
split_point = content.find("/* =========================================")
if split_point != -1:
    clean_content = content[:split_point]
else:
    clean_content = content

new_css = """
/* =========================================
   HOME PAGE SPECIFIC ANIMATIONS
   ========================================= */

/* 1. Fluid Light Background (Hero) */
@keyframes glowFlow1 {
    0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.8; border-radius: 50%; }
    33% { transform: translate(150px, -150px) scale(1.3) rotate(45deg); opacity: 1; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    66% { transform: translate(-100px, 100px) scale(0.9) rotate(90deg); opacity: 0.7; border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
    100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.8; border-radius: 50%; }
}

@keyframes glowFlow2 {
    0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.7; border-radius: 50%; }
    33% { transform: translate(-150px, 150px) scale(0.95) rotate(-45deg); opacity: 0.9; border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%; }
    66% { transform: translate(100px, -100px) scale(1.4) rotate(-90deg); opacity: 0.6; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
    100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.7; border-radius: 50%; }
}

.animate-glow-flow-1 {
    animation: glowFlow1 12s ease-in-out infinite alternate;
}

.animate-glow-flow-2 {
    animation: glowFlow2 15s ease-in-out infinite alternate;
}

/* 2. Glass Panel Float (Hero) */
@keyframes floatPanel {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0px); }
}

.animate-float-panel {
    animation: floatPanel 6s ease-in-out infinite;
}

/* 3. Scroll Reveal Text (About Section) */
.scroll-reveal-text {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), 
                transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: opacity, transform;
}

.scroll-reveal-text.revealed {
    opacity: 1;
    transform: translateY(0);
}

/* Staggered Delays for multiple paragraphs */
.scroll-reveal-text.delay-0 { transition-delay: 0ms; }
.scroll-reveal-text.delay-100 { transition-delay: 150ms; }
.scroll-reveal-text.delay-200 { transition-delay: 300ms; }
.scroll-reveal-text.delay-300 { transition-delay: 450ms; }
.scroll-reveal-text.delay-400 { transition-delay: 600ms; }
.scroll-reveal-text.delay-500 { transition-delay: 750ms; }
"""

with open(css_path, 'w') as f:
    f.write(clean_content + new_css)
print("CSS fixed")
