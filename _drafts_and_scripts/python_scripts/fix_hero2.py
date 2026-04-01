import re

with open('index.html', 'r') as f:
    content = f.read()

# Let's replace the container for the 4 values in the hero section to be more mobile-friendly.
# Currently it is:
# <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-8 text-[10px] md:text-sm font-label tracking-widest text-outline uppercase items-center max-w-2xl px-6">
# It has separators: <span class="w-1 h-1 rounded-full bg-outline/40 mx-1"></span>
# On mobile, when they wrap, the dots get weirdly placed.

# Let's change it to a grid on mobile, and flex on desktop.
new_values = """<div class="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-y-4 gap-x-2 md:gap-8 text-[10px] md:text-sm font-label tracking-widest text-outline uppercase items-center w-full px-4 sm:px-6">
        <span class="text-center md:text-left">LIGHTNESS <span class="font-body tracking-widest opacity-80 block md:inline mt-1 md:mt-0">轻度分享</span></span>
        <span class="hidden md:inline-block w-1 h-1 rounded-full bg-outline/40 mx-1"></span>
        <span class="text-center md:text-left">CONNECTION <span class="font-body tracking-widest opacity-80 block md:inline mt-1 md:mt-0">深度链接</span></span>
        <span class="hidden md:inline-block w-1 h-1 rounded-full bg-outline/40 mx-1"></span>
        <span class="text-center md:text-left">AUTHENTICITY <span class="font-body tracking-widest opacity-80 block md:inline mt-1 md:mt-0">真实叙述</span></span>
        <span class="hidden md:inline-block w-1 h-1 rounded-full bg-outline/40 mx-1"></span>
        <span class="text-center md:text-left">COMMUNITY <span class="font-body tracking-widest opacity-80 block md:inline mt-1 md:mt-0">湾区精英</span></span>
    </div>"""

# Replace the old container
pattern = r'<div class="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-8 text-\[10px\].*?</div>'
content = re.sub(pattern, new_values, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(content)
print("Hero section values updated")
