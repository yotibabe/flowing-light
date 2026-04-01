import re

with open('about.html', 'r') as f:
    content = f.read()

content = content.replace('src="assets/wechat-qr.png"', 'src="assets/wechat-qr-yoti.jpg" onerror="this.onerror=null; this.src=\'assets/wechat-qr.jpg\';"')

with open('about.html', 'w') as f:
    f.write(content)

print("About modal updated.")
