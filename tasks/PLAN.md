# 消除 DRY 架构炸弹：静态分离重构计划 (PLAN)

## 核心目标
彻底解决“重度复制粘贴”带来的维护灾难，将项目升级为具备“公共组件剥离与自动拼装”能力的工程。我们将引入目前静态领域最成熟、完全不侵入前端 CDN 设定的开源生成器 —— **Eleventy (11ty)**。

## 为什么是 Eleventy？
* **零配置起步**：不需要写复杂的 Vite/Webpack config，完美兼容你现有的基于 `CDN` 的 Tailwind 和 GSAP，不会进行破坏性转码。
* **干净的产出**：它只做一件事——把分离的 `.html` 模板组装成完美的纯正 `.html` 文件。

## 执行步骤拆解 (Execution Steps)

### Phase 1: 环境注入与工程结构清洗
1. 初始化 `package.json`，并安装唯一依赖 `@11ty/eleventy`。
2. 创建 `src/` 源码目录与 `_includes/` 组件文件夹。将现有的 `index.html`、`about.html` 等源文件安全迁移至 `src/`。

### Phase 2: 组件抽取与复用 (Component Extraction)
1. **抽离 Header**：创建 `_includes/header.html`。
2. **抽离 Footer 并修复交互断层**：创建 `_includes/footer.html`，并将原有的占位符 (`javascript:void(0)`) 全部替换为真实的事件挂载（呼出微信弹窗或调用 `mailto:light@sysuszalumni.com`）。
3. **抽离注入层**：将 `<head>` 中冗长的 Tailwind CDN 配置和字体挂载提取为 `_includes/head.html`。
4. **抽离全局挂件**：剥离 WeChat Modal 组件。

### Phase 3: 视图层组装 (View Assembly)
在原页面如 `about.html` 中清洗掉沉冗代码，替换为极简的调用指令，例如：
```html
{% include "head.html" %}
{% include "header.html" %}
<!-- 核心业务逻辑 -->
{% include "footer.html" %}
```

### Phase 4: 构建与 Vercel 纠错
1. 编写 NPM Script (`npm run dev` 对应热更新预览，`npm run build` 对应产出到 `_site/` 目录)。
2. **切除隐性毒瘤**：修改当前的 `vercel.json`。此时目录里的 `rewrites` 拦截规则 `{"source":"/(.*)","destination":"/index.html"}` 会导致 Vercel 错误地把后续所有页面劫持到首页（这是典型的 SPA 单页应用才有的配置）。我将对其修正以适配静态多页输出机制。

---
**确认机制：** 这是完全重构文件目录的手术。确认无误后请回复批准，我将依次启动阶段 1 至 4，全程保持业务文件内容的等价性。
