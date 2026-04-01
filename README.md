# 流光 (Flowing Light) - 中大深圳校友会读书会分享栏目

本项目是“流光”分享栏目的官方网站，致力于通过高质感的数字排版呈现湾区校友的真实生命故事。

## 📁 目录结构说明

为了保持项目的整洁和工程化标准，本仓库的结构经过了严格的整理：

### 核心页面 (Core Pages)
根目录下的 `.html` 文件是网站的正式产物，可直接用于部署（如 Vercel）：
- `index.html` - 网站首页
- `about.html` - 关于项目
- `archive.html` - 往期对话实录

### 🎨 设计系统 (Single Source of Truth)
**`design-system/`** 文件夹是整个项目设计的**唯一事实来源 (Single Source of Truth)**。在开发新页面或修改现有页面时，**必须**参考此文件夹中的规范：
- `design-system.html` - **核心！** 这是可视化的组件陈列室（UI Kit Sandbox）。包含了全站统一的排版缩放（Fluid Typography）、调色板、间距以及核心布局蓝本（导航栏、首屏卡片、正文排版）。
- `DESIGN_SYSTEM_V2.md` - **最新的设计系统文档！** 包含了当前生效的流光设计规则，如“无边框法则”、“流光质感”，以及对响应式类名（`text-fluid-*` 等）的详细说明。

### 静态业务内容 (Episodes & Assets)
- `css/style.css` - 存放全局自定义样式（非 Tailwind 部分）。
- `js/tailwind-config.js` - **核心！** Tailwind 的全局配置，所有在 `design-system.html` 中定义的字体、颜色、流体间距 (`fluid-*`) 都在这里被注册为全局变量。
- `assets/` - 存放所有的全局通用图片、字体等媒体文件。
- `episodes/` - **核心内容目录！** 采用静态子目录路由模式。内部每个文件夹（如 `vol1`, `vol2`）均包含该期的全量页面代码 (`index.html`)、独立图片资源及静态内容。

### 📦 归档与草稿 (Archives & Drafts)
**`_drafts_and_scripts/`** - 收纳箱。所有非正式的草稿、测试页面、历史版本的废弃模板（如早期的 `detail.html` 单页模板）以及用于批量修改 HTML 的 Python 脚本（如 `fix_episodes_bq.py`）都已安全地存放在这里。这保证了根目录和线上生产环境的绝对清爽。

---

## 🛠 开发与设计指南

1. **不要凭感觉写样式：** 当你需要添加一个标题、按钮或调整间距时，请先打开 `design-system/design-system.html`，找到对应的标准件（如 `text-fluid-3xl`, `gap-fluid-md`），然后复制其类名。
2. **响应式优先：** 所有的文字和间距都已经配置为 `clamp()` 流体缩放。请**尽量避免**在 HTML 中写死如 `sm:text-5xl md:text-6xl` 的断点类名，统一使用 `text-fluid-*` 以保证多端体验平滑。
3. **保持轻盈：** 遵循“流光”的设计理念，多用留白和背景色阶区分层级，少用粗重的实线边框。

---
*Est. 2023 • SYSU Reading Club*