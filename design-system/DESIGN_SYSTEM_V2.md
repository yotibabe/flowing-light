# Flowing Light Design System v2.0 (Luminescent Parchment)

**This document is the Single Source of Truth for the Flowing Light design language.**
It replaces the outdated v1 document by incorporating modern responsive frontend practices (Fluid Typography & Fluid Spacing).

## 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**
"Luminescent Parchment" is a design system that treats the screen as a gallery space rather than a software interface. It prioritizes the "weight" of intellectual content through high-end editorial layouts. The system rejects the generic "SaaS" look in favor of intentional asymmetry, varying typographic rhythms, and a sense of "flowing light." It is designed for platforms where information is meant to be savored, not just processed.

## 2. Colors & Textures
The palette is rooted in warm, earthen tones (Terracotta Primary) and intellectual blues (Slate Secondary), set against a near-white, luminous background (`bg-surface`).

### Core Rules
*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for structural sectioning. Boundaries are created through background shifts (e.g., transitioning from `bg-surface` to `bg-surface-container-low`) or the use of generous whitespace (`gap-fluid-*`).
*   **The "Ghost Border" Fallback:** If a separator is absolutely required, use `border-outline-variant/30`.
*   **Surface Hierarchy:** 
    *   `bg-surface-container-lowest` is reserved for cards and elevated panels. (Actual value defined in `tailwind-config.js`, do not hardcode hex.)
    *   `bg-surface-container-low` is used for subtle section differentiation. (Actual value defined in `tailwind-config.js`, do not hardcode hex.)
*   **The "Glass & Gradient" Rule:** Hero panels and floating UI elements utilize `bg-white/45 backdrop-blur-[40px]` on desktop to maintain the "light" aesthetic. **On mobile, heavy glassmorphism is removed to preserve performance and breathing room.**
*   **Ethereal Gradients:** Soft, multi-stop linear and radial gradients (class: `ethereal-gradient-bg`) to create depth.

## 3. Typography (Fluid Scale)
The typography uses a three-role pairing: **Playfair Display** as the primary display typeface for large-scale hero moments, **Noto Serif SC** as the editorial content typeface for section headings and article subheadings, and **Work Sans** for all functional UI text (body, labels, buttons).

**We strictly use `clamp()` based fluid typography to avoid jarring breakpoints.** Do not use hardcoded `text-2xl sm:text-4xl` classes.

**Typography Classes (Ground Truth):**
*   `font-display`: Playfair Display (Italics allowed)
*   `font-headline`: Noto Serif SC
*   `font-body` & `font-label`: Work Sans

**Fluid Size Scale (`text-fluid-*`):**
*   `text-fluid-6xl` & `text-fluid-5xl`: Display size for dramatic, oversized hero text. Use with tight tracking (`tracking-tighter`) and high-contrast weights.
*   `text-fluid-4xl` & `text-fluid-3xl`: Primary section titles.
*   `text-fluid-2xl`: Section intro headings (e.g., `<h2>` on content pages).
*   `text-fluid-xl`: Secondary subheadings within a section (e.g., `<h3>` in component demos). **Do not use for Blockquotes** — blockquotes use `text-fluid-lg` to maintain visual distinction from structural headings.
*   `text-fluid-lg`: Intro paragraphs and large body text.
*   `text-fluid-base` & `text-fluid-sm`: Standard reading text. Always pair with `leading-relaxed` to enhance readability.
*   `text-[10px]` / `text-xs`: Label/Caption for metadata. **Must** be styled with `uppercase` and extreme letter spacing (`tracking-widest` or `tracking-[0.4em]`).

## 4. Spacing & Rhythm (Fluid Layout)
Layout problems are often the root cause of interfaces feeling "off". Space is a design material—use it with intention.

**Fluid Spacing Scale (`gap-fluid-*`, `m-fluid-*`, `p-fluid-*`):**
*   `fluid-sm` / `fluid-md`: Tight grouping for related elements (e.g., paragraphs within an article).
*   `fluid-lg`: Generous separation between distinct components.
*   `fluid-xl` / `fluid-2xl`: Massive separation between major page sections to create a rhythmic, gallery-like feel.

**Layout Constraints:**
*   **Standard Page Width:** `max-w-[1200px] mx-auto`
*   **Reading Flow Width:** `max-w-[800px] mx-auto` (For detail pages to ensure optimal line-length).
*   **Hero Panel Width:** `max-w-[1440px]` (Allowed to break the standard grid for dramatic effect).

## 5. Components & Interactions
*   **Navigation:** Touch-friendly links with a minimum hit area of `min-h-[44px] min-w-[44px]`. Hover states use a 1px expanding border from the left origin (`scale-x-100 transition-transform origin-left`).
*   **Buttons:** Rectangular with minimal rounding (`rounded-sm`). Primary buttons use `bg-on-surface text-surface`.
*   **Cards:** Asymmetric layouts. Images should feature overlapping elements. Always use `loading="lazy"` on archive cards.
*   **Blockquotes:** Marked by a subtle left border (`border-l-2 border-primary/30`) and generous `my-fluid-2xl` padding.

## 6. Do's and Don'ts

### Hard Rules (Non-negotiable — breaking these breaks the system)
*   **DO:** Use `text-fluid-*` and `gap-fluid-*` everywhere. Never use hardcoded size breakpoints like `text-2xl sm:text-4xl`.
*   **DO:** Keep `font-display` (Playfair Display) exclusive to Hero `<h1>` elements only. Do not use it for inline links, blockquotes, or decorative elements elsewhere.
*   **DO:** Use `font-headline italic` (Noto Serif SC italic) for pull-quote emphasis. This is the correct substitute for Playfair Display in non-hero contexts.
*   **DON'T:** Use `whitespace-nowrap` on mobile navigation. It causes horizontal scroll overflow.
*   **DON'T:** Animate layout properties (`width`, `height`, `margin`, `padding`). Use `transform` and `opacity` only.
*   **DON'T:** Use `shadow-xl` with pure black. Always scope shadows with surface tokens: `shadow-on-surface/5` or `shadow-primary/20`.

### Style Guidelines (Intentional defaults — deviation requires justification)
*   Mix Serif italic and upright weights within the same heading for typographic rhythm.
*   Make all touch targets at least 44×44px on mobile.
*   Prefer background shifts and whitespace over borders for section separation.