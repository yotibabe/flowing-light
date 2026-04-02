# 流光 (Flowing Light) - 中大深圳校友会读书会分享栏目

本项目是“流光”分享栏目的官方网站，采用纯静态多页架构，聚焦湾区校友的真实生命故事与高质感数字排版呈现。

## 📁 项目结构总览

```text
flowing-light/
├─ index.html                  # 首页
├─ archive.html                # 往期列表页
├─ about.html                  # 关于页
├─ README.md
├─ vercel.json                 # 部署配置（trailingSlash）
├─ .vercelignore               # 部署忽略清单
├─ .gitignore
├─ content                     # 预留文件（当前为空）
├─ run_audit_fix.py            # 批量审计/修复脚本
│
├─ js/
│  ├─ layout.js                # 全站共享 Header/Footer 渲染
│  ├─ site.js                  # 通用弹窗交互能力
│  └─ tailwind-config.js       # 全局 Tailwind 设计令牌
│
├─ css/
│  └─ style.css                # 全局自定义样式
│
├─ design-system/
│  ├─ design-system.html       # 可视化组件沙盒
│  └─ DESIGN_SYSTEM_V2.md      # 设计规范文档
│
├─ episodes/
│  ├─ vol1/vol2/vol3/vol4/
│  │  ├─ index.html            # 各期详情页
│  │  └─ images/               # 各期局部图片资源
│
├─ assets/
│  ├─ vol1/vol2/vol2_temp/vol3/vol4/
│  └─ wechat-qr*.png|jpg       # 通用素材
│
├─ tasks/
│  ├─ PLAN.md
│  ├─ todo.md
│  └─ lessons.md
└─ .vercel/project.json         # 本地 Vercel 绑定元数据
```

## 🧩 关键模块说明

### 页面入口
- `index.html`：首页叙事入口与栏目定位。
- `archive.html`：往期内容聚合入口，卡片跳转至 `episodes/vol*/index.html`。
- `about.html`：栏目理念、组织根基、社群入口与联系锚点。

### 共享布局（Header / Footer）
- `js/layout.js` 是当前头尾统一来源：
  - 基于 `body` 的 `data-base-path`、`data-nav-active`、`data-footer` 渲染头尾。
  - 将统一 Header 挂载到 `#site-header`。
  - 将统一 Footer 挂载到 `#site-footer`（可按页面配置关闭）。
- `data-footer` 支持：
  - `global`：链接到 `about.html#...`
  - `about-local`：链接到当前页 `#...`
  - `none`：不渲染 Footer（用于详情页）

### 设计系统与样式
- `design-system/design-system.html`：组件、排版、色板、布局基线展示。
- `design-system/DESIGN_SYSTEM_V2.md`：当前生效设计规则。
- `js/tailwind-config.js`：全局 token 注册（字体、颜色、流体尺度等）。
- `css/style.css`：Tailwind 之外的全局增强样式。

### 交互脚本
- `js/site.js`：封装通用弹窗能力（`FlowingLight.setupModal`），供页面调用。

## 🚀 开发约定

1. **先看设计系统再写样式：** 新增样式前优先参考 `design-system/`，尽量复用既有 token 与类名。
2. **优先流体排版：** 文本与间距尽量使用 `text-fluid-*`、`gap-fluid-*` 等流体体系。
3. **页面头尾不要手写重复代码：** 使用 `layout.js + data-*` 配置，避免样式漂移。
4. **详情页保持轻量：** `episodes/vol*` 页面默认仅共享 Header，Footer 按需开启。

## 📦 部署说明

- 项目可直接按静态站部署（Vercel / Nginx / GitHub Pages 等）。
- `vercel.json` 当前仅保留静态站必要配置，不做全量重写路由。

---
*Est. 2023 • SYSU Reading Club*
