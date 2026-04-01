import os

html_path = 'index.html'

with open(html_path, 'r') as f:
    content = f.read()

# Add fade-in to the Title
content = content.replace(
    '<h2 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>',
    '<h2 class="scroll-reveal-text delay-0 font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8 md:mb-12 font-bold text-on-surface tracking-tight">\n                什么是 Light？\n            </h2>'
)

# Add fade-in to the Button
content = content.replace(
    '<a href="archive.html" class="inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">',
    '<a href="archive.html" class="scroll-reveal-text delay-100 inline-flex items-center gap-3 text-primary font-medium group mb-8 lg:mb-0">'
)

# Adjust delays for the right column so they come after the left column
content = content.replace('class="scroll-reveal-text delay-0"', 'class="scroll-reveal-text delay-200"', 1) # First paragraph
content = content.replace('class="scroll-reveal-text delay-100"', 'class="scroll-reveal-text delay-300"', 1) # Second paragraph
content = content.replace('class="scroll-reveal-text delay-200 text-base', 'class="scroll-reveal-text delay-400 text-base', 1)
content = content.replace('class="scroll-reveal-text delay-300 text-base', 'class="scroll-reveal-text delay-500 text-base', 1)

with open(html_path, 'w') as f:
    f.write(content)

# Fix CSS to make animations much more obvious
css_path = 'css/style.css'
with open(css_path, 'r') as f:
    css_content = f.read()

# Add new delay classes
extra_delays = """
.scroll-reveal-text.delay-400 { transition-delay: 600ms; }
.scroll-reveal-text.delay-500 { transition-delay: 750ms; }
"""
if ".scroll-reveal-text.delay-400" not in css_content:
    css_content += extra_delays

# Rewrite glowFlow animations to be huge and fast so they are immediately visible
import re

css_content = re.sub(r'@keyframes glowFlow1 \{.*?\}', 
"""@keyframes glowFlow1 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(150px, -150px) scale(1.3); }
    100% { transform: translate(0, 0) scale(1); }
}""", css_content, flags=re.DOTALL)

css_content = re.sub(r'@keyframes glowFlow2 \{.*?\}', 
"""@keyframes glowFlow2 {
    0% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(-150px, 150px) scale(1.4); }
    100% { transform: translate(0, 0) scale(1); }
}""", css_content, flags=re.DOTALL)

# Speed up animations and increase float distance
css_content = css_content.replace('animation: glowFlow1 25s', 'animation: glowFlow1 8s')
css_content = css_content.replace('animation: glowFlow2 30s', 'animation: glowFlow2 10s')
css_content = css_content.replace('animation: floatPanel 8s', 'animation: floatPanel 4s')

css_content = re.sub(r'@keyframes floatPanel \{.*?\}',
"""@keyframes floatPanel {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
    100% { transform: translateY(0px); }
}""", css_content, flags=re.DOTALL)

with open(css_path, 'w') as f:
    f.write(css_content)

print("Updated everything successfully.")
