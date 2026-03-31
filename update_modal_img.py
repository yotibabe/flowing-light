import glob
import re

for file in glob.glob('*.html'):
    with open(file, 'r') as f:
        content = f.read()

    # The user says: "二维码替换成这个"
    # It seems the previous QR code was named `wechat-qr.png`.
    # To ensure it uses the new one, we just need to let the user know they need to replace the file `assets/wechat-qr.jpg` or `wechat-qr.png`.
    # I can't download it automatically because of security/URL limits. I will instruct the user.
    pass
