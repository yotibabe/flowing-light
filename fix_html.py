html_path = 'index.html'

with open(html_path, 'r') as f:
    content = f.read()

# Add classes to hero background
content = content.replace(
    'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40"',
    'class="absolute w-[600px] h-[600px] bg-primary-container/20 rounded-full blur-[120px] -top-40 -left-40 animate-glow-flow-1"'
)
content = content.replace(
    'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20"',
    'class="absolute w-[500px] h-[500px] bg-secondary-container/15 rounded-full blur-[100px] bottom-20 right-20 animate-glow-flow-2"'
)

# Add float to panel
content = content.replace(
    'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px]',
    'class="relative z-10 w-[92%] max-w-[1100px] bg-white/40 backdrop-blur-[60px] animate-float-panel'
)

# Add fahtml_path = 'index.html'

with open(html"