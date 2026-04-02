# 纠错复盘与经验教训库 (Lessons Learned)

## 1. 自动化正则修改的“盲点”危机
- **Status (场景):** 试图通过 Python 脚本 `run_audit_fix.py` 批量注入 `aria-label`。
- **Root Cause (根本原因):** 原正则 `r'<button class="speaker-trigger-btn([^>]*)>'` 过于依赖目标源码“一字不差”的情境。如果 `class` 属性包含多个类名（如 `speaker-trigger-btn group relative`...），它会把后续类名一字不减地当作 `target content` 去跟双引号重新拼接，导致了生成 `<button class="speaker-trigger-btn" group relative...` 的严重结构破损，直接摧毁了 Tailwind class 属性解析机制。
- **Suggested Fix (预防方案):** 永远不使用“单纯拼接”替换完整的 class 解析。遇到自动化脚本处理 DOM 结构时，更推荐使用 Beautiful Soup 等 AST/DOM 树级的解析工具，或者保证正则表达式有完善的前瞻与后顾断言：如 `r'<button([^>]*class="[^"]*speaker-trigger-btn[^"]*"[^>]*)>'`，确保只匹配并原位提取完整标签。

## 2. 脚本依赖倒置 (Dependency Inversion in Script Loading)
- **Status (场景):** 对三方包（GSAP, Lenis）进行了“性能优化”，强制加上了 `defer` 标签。页面随之崩溃（`ReferenceError`）。
- **Root Cause (根本原因):** 第三方脚本加载被设置为推迟到 HTML 解析之后（`defer`）。然而页面底部的 `<script>` 初始化代码块却没有做等待处理。DOM 解析时同步执行的初始化脚本因为找不到三方工具包的方法而出错。
- **Suggested Fix (预防方案):** 在对依赖文件添加异步或延迟下载属性（`defer` / `async`）时，**必需**确保内联依赖这些模块的处理代码受到事件锁保护——将其包裹在 `document.addEventListener('DOMContentLoaded', () => { ... })` 或者 `window.addEventListener('load')` 结构中，确保加载时序的闭环。

## 3. 设计系统的“滑坡效应”
- **Status (场景):** Episode 阅读页面的排版细节逐渐背离《Luminescent Parchment` v2.0》标准。出现了跳槽规则被打破、多余保留全局 Footer、无意义场景下赋予过重字重等问题。
- **Root Cause (根本原因):** 在构建底层页面结构时，“复制粘贴”模版容易带来不需要的设计冗余。例如，从统一 Layout 模板中继承了 Footer，并未按照特定的“阅读页末尾 CTA”逻辑进行强删除。
- **Suggested Fix (预防方案):** 实施更加严格的抽象或者组件定义界限。长文本阅读页面具有特殊的 Zero-Distraction 要求，开发该类页面前，应把特例规则单独提炼作 Checklist。严格限制特殊的字体（如 Display，Headline）频率。不要手写与 Config 相悖的颜色硬编码（如 drop cap 中的错误主色）。
