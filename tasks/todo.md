# 审计修复执行计划 (Audit Fix Plan)

## 阶段一：修复严重运行故障 (Critical Runtime Fixes)
- [x] 1. 消除页面加载顺序报错
  - 目标文件: `index.html`, `archive.html`, `about.html`
  - 操作: 将底部内联 `<script>` 中的 GSAP 和 Lenis 初始化代码用 `DOMContentLoaded` 事件包裹，确保兼容外部被加上 `defer` 的脚本。
- [x] 2. 修复正则替换逻辑漏洞
  - 目标文件: `run_audit_fix.py`
  - 操作: 修改用于 `aria-label` 替换的正则表达式，杜绝造成后续文件被二次污染的隐患。

## 阶段二：修复 Episodes 页面组件损坏与结构（上）- Vol.1 & Vol.2
- [x] 1. 修复 CTA 按钮 DOM 损坏
  - 目标文件: `episodes/vol1/index.html`, `episodes/vol2/index.html`
  - 操作: 修正 `<button class="speaker-trigger-btn" group relative...` 导致的 Tailwind 的全局失效，恢复合理的 Class 排布。
- [x] 2. 清理违规的 Global Footer
  - 目标文件: `episodes/vol1/index.html`, `episodes/vol2/index.html`
  - 操作: 删除这部分的全局 Footer 模块，遵循“不冗余”原则。
- [x] 3. 修正 Heading Hierarchy Gap Rule
  - 目标文件: `episodes/vol1/index.html`, `episodes/vol2/index.html`
  - 操作: 将正文的 `<h2>` 强行从 `text-fluid-2xl` 降维为 `text-fluid-xl`。

## 阶段三：修复 Episodes 页面组件损坏与结构（下）- Vol.3 & Vol.4
- [x] 1. 修复 CTA 按钮 DOM 损坏
  - 目标文件: `episodes/vol3/index.html`, `episodes/vol4/index.html`
  - 操作: 去除双引号切割错误。
- [x] 2. 清理违规的 Global Footer
  - 目标文件: `episodes/vol3/index.html`, `episodes/vol4/index.html`
  - 操作: 删减违规 Footer。
- [x] 3. 修正 Heading Hierarchy Gap Rule
  - 目标文件: `episodes/vol3/index.html`, `episodes/vol4/index.html`
  - 操作: 同步对 `<h2>` 清洗降级。

## 阶段四：设计细节打磨及局部排版优化 (Design Polish)
- [x] 1. 严谨校准核心颜色
  - 目标文件: `css/style.css`
  - 操作: 将 `.drop-cap` 里的错误硬编码值 `#ff7b54` (primary-container) 替换回规范要求的主色 `#a63a19` (primary)。
- [x] 2. 清洗非法 Tailwind 类名与过度赋予权重的设计
  - 目标文件: 多份阅读页HTML文件。
  - 操作: 将非法的 `transition-duration-1000` 还原为 `duration-1000 transition-all`；移除人物小标签盲目使用的 `font-headline`。

## 评审与经验积累 (Review & Lessons)
- [x] 执行完四个回合后，将问题根源提取并归纳入 `tasks/lessons.md`。
