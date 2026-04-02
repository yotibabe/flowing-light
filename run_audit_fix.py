import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Performance: Defer scripts
    content = re.sub(r'<script src="https://(cdnjs|cdn)\.([^>]+)"></script>', r'<script defer src="https://\1.\2"></script>', content)

    # Performance: Lazy load images
    content = re.sub(r'<img(?![^>]*loading="lazy")([^>]*)>', r'<img loading="lazy"\1>', content)

    # A11y: Modal close aria-label
    content = re.sub(r'<button id="close-modal-btn"([^>]*)>', r'<button id="close-modal-btn" aria-label="Close modal"\1>', content)

    # A11y: Speaker trigger aria-label
    content = re.sub(r'<button([^>]*class="[^"]*speaker-trigger-btn[^"]*"[^>]*)>', r'<button\1 aria-label="Apply to be a speaker">', content)

    # Polish: Replace <a href="#"> in footer with better accessibility
    content = content.replace('href="#"', 'href="javascript:void(0)"')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Fixed:", filepath)

html_files = [
    'index.html',
    'about.html',
    'archive.html',
    'episodes/vol1/index.html',
    'episodes/vol2/index.html',
    'episodes/vol3/index.html',
    'episodes/vol4/index.html',
]

for f in html_files:
    if os.path.exists(f):
        process_file(f)
