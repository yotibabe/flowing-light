# Flowing Light Design System v3.1 (Comprehensive Edition)

本文件是 Flowing Light 的单一事实来源（Single Source of Truth）。  
目标是把审美判断、交互经验和工程约束统一为可执行、可复用、可验收的规则体系。

---

## 1. 系统定位与目标

### 1.1 Creative North Star
- 关键词：**Luminescent Parchment / 数字策展 / 轻盈而有分量**
- 本质：把页面当成“阅读展陈空间”，不是“功能密集控制台”
- 体验目标：首屏有气质，正文可沉浸，交互有反馈，系统可迭代

### 1.2 适用范围
- 生产页面：`index.html`、`archive.html`、`about.html`、`episodes/vol*/index.html`
- 设计系统页面：`design-system/design-system.html`
- 运行支撑：`js/tailwind-config.js`、`css/style.css`、`js/layout.js`、`js/site.js`

### 1.3 三条总原则
1. 先 token，后样式  
2. 先模式，后页面  
3. 先可读性，后视觉戏剧性

---

## 2. 信息架构（Style Guide + UI Kit + Pattern Library + Atomic Design）

### 2.1 Style Guide（视觉基础层）
- 色彩、字体、间距、层级、动效节奏
- 定义“视觉语言”和“语气边界”

### 2.2 UI Kit（组件层）
- 最小组件与交互状态（default/hover/focus/active/disabled/loading）
- 规定结构、尺寸、可访问性与响应式行为

### 2.3 Pattern Library（模式层）
- 组件组合策略（如 Header、Hero、Archive Grid、Reading Flow、Footer）
- 明确“适用场景、禁用场景、替换策略”

### 2.4 Atomic Design（方法层）
- Atoms → Molecules → Organisms → Templates → Pages
- 强调“自下而上可组合、自上而下可验收”

---

## 3. Foundation Tokens（基础令牌）

### 3.1 Color Tokens
- 来源：`js/tailwind-config.js`
- 禁止：硬编码 Hex、临时魔法色

**核心角色**
- 品牌：`primary`, `primary-container`, `primary-fixed`
- 表面：`surface`, `surface-container-lowest`, `surface-container-low`
- 文本：`on-surface`, `on-surface-variant`
- 边界：`outline-variant`

**硬规则**
- No-Line Rule：禁止把 `1px solid` 当结构主手段
- Ghost Border Fallback：必要分隔仅可用 `border-outline-variant/30`
- Surface Hierarchy：`lowest` 用于卡片抬升，`low` 用于区块换层
- Ethereal Gradient：优先由 `ethereal-gradient-bg` + 柔和光晕提供层次

### 3.2 Typography Tokens
- `font-display`：仅首页 Hero `<h1>`
- `font-headline`：章节标题、阅读页标题、引用
- `font-body` / `font-label`：正文、标签、按钮、元信息

**关键限制**
- 阅读页 `<h1>` 禁止 `font-display`
- `font-label` 必须搭配 `uppercase + tracking-widest` 或 `tracking-[0.4em]`
- 单一视口 `font-headline` 推荐不超过 3 处

### 3.3 Fluid Size Tokens
- 文本：`text-fluid-6xl` → `text-fluid-sm`
- 间距：`gap-fluid-sm/md/lg/xl/2xl` 与 `p-fluid-*` / `m-fluid-*`
- 行长：
  - 标准：`max-w-[1200px]`
  - 阅读：`max-w-[800px]`
  - 首屏：`max-w-[1440px]`

**场景上限**
- `text-fluid-6xl~5xl`：仅展示页 Hero
- `text-fluid-4xl`：仅展示页大标题
- `text-fluid-3xl`：阅读页 `<h1>` 上限
- `text-fluid-2xl`：阅读页 `<h2>` 上限
- `text-fluid-base`：阅读正文默认

**层级规则**
- 相邻标题层级至少跨 1 个 fluid step
- 正文至少比父标题小 2 个 fluid step

### 3.4 Radius / Shadow / Layer Tokens
- 圆角：内容卡片上限 `rounded-2xl`
- 阴影：优先 `shadow-on-surface/5` 或 `shadow-primary/20`
- 禁止：纯黑重阴影压塌层级
- 层级：固定头部 `z-50`，弹窗高于页面内容

### 3.5 Motion Tokens
- 时长：
  - 快速反馈：`150ms~220ms`
  - 常规过渡：`280ms~500ms`
  - 叙事入场：`700ms~1200ms`
- 缓动：优先 `ease-out` / `power3.out`，禁弹跳式娱乐缓动
- 属性白名单：`transform`, `opacity`
- 属性黑名单：`width`, `height`, `margin`, `padding`

---

## 4. 场景分级（Display vs Reading）

### 4.1 Display Context（首页 / 归档）
- 目标：品牌感、首屏冲击、快速扫读
- 文本：`font-display + fluid-5xl~6xl`（仅首页 Hero）
- 可用：适度玻璃、背景光晕、节奏型动效

### 4.2 Reading Context（详情页）
- 目标：连续阅读、认知稳定、信息吸收
- 文本：`font-headline + fluid-3xl`（标题上限）
- 要求：弱干扰背景、收敛动效、稳定行长

---

## 5. 全局结构硬规则

### 5.1 Header 全站统一（强制）
- 样式：`bg-white/45 backdrop-blur-[40px] border-b border-outline-variant/10`
- 统一来源：`js/layout.js`
- 禁止：页面内私有 Header 变体漂移

### 5.2 Navigation 可用性
- 命中区：`min-h-[44px] min-w-[44px]`
- active：1px 下划线从左展开（`origin-left`）
- mobile：`gap-2~gap-4`，禁止横向溢出方案（如 `whitespace-nowrap`）

### 5.3 Footer 策略
- 全局 Footer 是“薄尾封”，`py-6 md:py-8` 为上限
- 页面行为：
  - `data-footer=global`：跳转 about 锚点
  - `data-footer=about-local`：关于页内锚点
  - `data-footer=none`：详情页可关闭

---

## 6. UI Kit 组件规范（完整）

### 6.1 Button
- 结构：文字 + 可选图标
- 变体：Primary / Secondary / Ghost / Disabled
- 状态：
  - hover：色相或边界轻变化
  - focus-visible：可见高对比焦点环
  - active：轻微压下反馈（scale 或色阶）
  - disabled：视觉变灰 + 交互禁用

### 6.2 Inline Context Link
- 用于“叙事中 CTA”，不打断阅读节奏
- 结构：文本下边线 + 箭头位移
- 禁止：替代所有按钮；只用于语义上“嵌入式行动”

### 6.3 Navigation Item
- 标签：`font-label` + `uppercase` + `tracking-widest`
- active 与 hover 行为一致化，避免多套导航语言

### 6.4 Archive Card
- 结构：图像层 + 轻遮罩 + 左对齐文本层
- 强约束：
  - `border-none`
  - `loading="lazy"`
  - 圆角上限 `rounded-2xl`
  - 禁暗图反显（默认需可读）
  - 禁 `<br>` 强制断行破坏节奏
- 交互：
  - hover：`-translate-y-1` + 阴影增强 + 图像轻缩放

### 6.5 Blockquote
- 标记：`border-l-2 border-primary/30`
- 留白：`my-fluid-2xl`
- 文体：`font-headline italic`

### 6.6 Hero Panel Container
- 展示页桌面允许：`md:bg-white/45 md:backdrop-blur-[40px]`
- 移动端降级：减少 blur 与过重玻璃
- 避免与全局背景层叠加后发灰

---

## 7. Pattern Library 模式规范（完整）

### 7.1 Global Header Pattern
- 由 `layout.js` 注入
- 参数：
  - `data-base-path`
  - `data-nav-active`
  - `data-footer`

### 7.2 Hero Pattern
- 目标：信息灯箱而非视觉炫技
- 替换策略：
  - 背景已足够丰富 → 去局部玻璃，保全局层
  - 内容对比不足 → 加轻量玻璃而非整体加白

### 7.3 Archive Grid Pattern
- 目标：归档快速浏览 + 视觉记忆锚点
- 规则：图像优先、文案左对齐、卡片交互统一节奏

### 7.4 Reading Flow Pattern
- 骨架：导语 → 分节 → 正文 → 引用 → Endcap CTA
- 行长固定阅读区，避免横向扫视负担

### 7.5 Endcap CTA Pattern
- 主动作在上，次动作在下
- 文案直接，不做营销口号堆叠

---

## 8. Atomic Design 映射

| 层级 | 定义 | Flowing Light 示例 |
|---|---|---|
| Atoms | 最小视觉单位 | 标签、标题、正文、图标、色块 |
| Molecules | 原子组合单元 | 导航项、按钮+图标、卡片标题区 |
| Organisms | 区块级组件 | Header、Archive Grid、Footer |
| Templates | 布局骨架 | 首页模板、归档模板、关于模板、详情模板 |
| Pages | 生产页面实例 | `index.html`、`archive.html`、`about.html`、`episodes/vol*/index.html` |

---

## 9. 交互、动效、可访问性

### 9.1 状态矩阵要求
- 所有可交互组件必须声明：default / hover / focus-visible / active / disabled
- 复杂组件额外声明：loading / empty / error / success

### 9.2 Motion Policy
- 页面入场动效用于叙事，不用于装饰炫技
- 阅读页动效总量低于展示页
- `prefers-reduced-motion` 必须可降级到静态终态

### 9.3 Accessibility Baseline
- 命中区 ≥ 44×44
- 焦点态可见
- 文本对比满足基础可读
- 不仅靠颜色传达唯一语义

---

## 10. 生产页面映射（规范落地）

### 10.1 首页 `index.html`
- 角色：Display Context
- 重点：Hero 视觉叙事、品牌标题、展示级排版

### 10.2 归档页 `archive.html`
- 角色：Display Context
- 重点：Archive Card 模式、侧栏信息结构、卡片网格节奏

### 10.3 关于页 `about.html`
- 角色：Display + 信息说明混合
- 重点：组织叙事、CTA 区块、页内锚点 Footer

### 10.4 详情页 `episodes/vol*/index.html`
- 角色：Reading Context
- 重点：阅读流、低干扰背景、正文可读性优先

---

## 11. 设计系统治理（Governance）

### 11.1 变更流程
1. 先在 `design-system.html` 增加/修正样例
2. 再更新本规范文档对应章节
3. 最后改生产页面并做回归检查

### 11.2 提交门槛（Checklist）
- 是否复用既有 token
- 是否复用既有组件/模式
- 是否破坏 Display/Reading 分级
- 是否引入边界漂移（Header/Footer/导航）
- 是否影响移动端导航安全区
- 是否引入不必要实线分割
- 是否导致阅读页字体与动效过重

### 11.3 回归检查（页面级）
- 首页：Hero 冲击与透明导航共存
- 归档：卡片亮态可读 + hover 增强一致
- 关于：Footer 锚点正确
- 详情：`<h1>` 仍为 `font-headline + text-fluid-3xl` 且低干扰

---

## 12. 快速索引

- 系统看板：`design-system/design-system.html`
- 规范文档：`design-system/DESIGN_SYSTEM_V2.md`
- tokens：`js/tailwind-config.js`
- 全局样式：`css/style.css`
- 共享布局：`js/layout.js`
- 交互脚本：`js/site.js`

---

## 13. 速查对照

| 角色 | 展示页（首页/归档） | 阅读页（详情） |
|---|---|---|
| Page `<h1>` | `text-fluid-5xl~6xl` + `font-display font-black` | `text-fluid-3xl` + `font-headline font-bold` |
| Section `<h2>` | `text-fluid-3xl~4xl` + `font-headline` | `text-fluid-xl~2xl` + `font-headline` |
| Sub `<h3>` | `text-fluid-xl` + `font-headline` | `text-fluid-xl` + `font-headline` |
| Opening Paragraph | `text-fluid-lg` + `font-body font-light` | `text-fluid-lg`（仅首段） |
| Body Copy | 短说明为主 | `text-fluid-base + leading-relaxed` |
| Metadata | `text-[10px]~text-xs` + `font-label uppercase tracking-widest` | 同左 |

---

> Flowing Light 不是“一次性视觉稿”，而是“长期可演化的系统资产”。  
> 新页面必须可在本系统中被解释、被复用、被验收。
