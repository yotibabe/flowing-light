import re

with open('css/style.css', 'r') as f:
    content = f.read()

content = re.sub(r'@keyframes glowFlow1 \{.*?\}',
'''@keyframes glowFlow1 {
    0% { transform: translateX(0px) scale(1); opacity: 0.8; }
    50% { transform: translateX(160px) scale(1.1); opacity: 1; }
    100% { transform: translateX(0px) scale(1); opacity: 0.8; }
}''', content, flags=re.DOTALL)

content = re.sub(r'@keyframes glowFlow2 \{.*?\}',
'''@keyframes glowFlow2 {
    0% { transform: translateX(0px) scale(1); opacity: 0.7; }
    50% { transform: translateX(-160px) scale(1.15); opacity: 0.9; }
    100% { transform: translateX(0px) scale(1); opacity: 0.7; }
}''', content, flags=re.DOTALL)

content = re.sub(r'@keyframes floatPanel \{.*?\}', '', content, flags=re.DOTALL)
content = re.sub(r'\.animate-float-panel \{.*?\}', '', content, flags=re.DOTALL)

with open('import re

with open('"css/style.css"', '"r"'en
with op op    content = f.read()

content = re.sub(r'"@keyf_c