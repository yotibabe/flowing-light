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
*   **Global Header Unity:** All pages MUST share the exact same top navigation styling: `bg-white/45 backdrop-blur-[40px] border-b border-outline-variant/10`. No page is allowed to use a heavier background (e.g., `bg-white/80`) to ensure global consistency.
*   **Ethereal Gradients:** Soft, multi-stop linear and radial gradients (class: `ethereal-gradient-bg`) to create depth.

## 3. Typography (Fluid Scale)
The typography uses a three-role pairing: **Playfair Display** (`font-display`) as the cinematic display typeface reserved exclusively for the homepage Hero `<h1>`; **Noto Serif SC** (`font-headline`) as the editorial content typeface for section headings, article titles on reading pages, and pull quotes; and **Work Sans** (`font-body` / `font-label`) for all functional UI text.

**We strictly use `clamp()` based fluid typography to avoid jarring breakpoints.** Do not use hardcoded `text-2xl sm:text-4xl` classes.

**Typography Classes (Ground Truth):**
*   `font-display`: Playfair Display — **Homepage Hero `<h1>` only.** No other use permitted.
*   `font-headline`: Noto Serif SC — Section headings, reading-page article titles (`<h1>`), pull quotes, editorial links.
*   `font-body` & `font-label`: Work Sans — Body copy, UI labels, buttons, metadata.

> **Note on reading pages:** Episode detail pages do NOT use `font-display` for the article `<h1>`. Use `font-headline font-bold` instead. `font-display` is for visual drama; reading pages prioritize content authority. This is an intentional distinction.

### 3a. Scene Classification (场景分级)
This system serves two fundamentally different page contexts. Each has its own typographic ceiling. Mixing the ceilings causes the "everything sounds equally loud" problem where a detail page feels as large and loud as the homepage.

*   **Display Context** (Homepage, Archive page): Goal is visual impact, first impression, and scanning. Larger, more dramatic type is appropriate and expected.
*   **Reading Context** (Episode detail pages): Goal is sustained comprehension and immersion. Typography should be quieter and smaller so the content — not the type — holds attention.

### 3b. Fluid Size Scale (with scene boundaries)
*   `text-fluid-6xl` & `text-fluid-5xl`: **Display Context only.** Homepage Hero `<h1>` paired with `font-display`. The absolute ceiling for any text in this system.
*   `text-fluid-4xl`: **Display Context only.** Large section headings on display pages (e.g., Archive sidebar title, Homepage philosophy `<h2>`). Never use on reading pages.
*   `text-fluid-3xl`: **Reading Context — Article `<h1>` ceiling** (Use `font-headline font-bold`). Also valid as the minimum size for a display page `<h2>`. This is where the two contexts meet.
*   `text-fluid-2xl`: **Reading Context — `<h2>` level.** Chapter or speaker section headings within an article. Also valid for display page intro copy.
*   `text-fluid-xl`: **Both contexts — `<h3>` / subheading level.** Card titles, sub-section headings, editorial text links. The maximum heading size on a reading page below its `<h1>`.
*   `text-fluid-lg`: **Intro paragraphs only.** The opening paragraph of an article, or description text on display pages. **Not** the default body size for sustained reading pages.
*   `text-fluid-base` & `text-fluid-sm`: **Reading body default.** All sustained body paragraphs on episode detail pages use `text-fluid-base` + `leading-relaxed`. `text-fluid-sm` for captions and secondary metadata.
*   `text-[10px]` / `text-xs`: Label/Caption. **Must** be styled with `uppercase` and extreme letter spacing (`tracking-widest` or `tracking-[0.4em]`).

### 3c. font-headline Usage Frequency
Noto Serif SC carries editorial authority only when used selectively. When it appears on every element in a viewport, it loses distinction and becomes a second default body font.

**Rule:** In any single viewport, `font-headline` elements should not exceed **3 instances**. The intended count is: one `<h1>` or `<h2>`, one `<h3>`, one blockquote. If a fourth headline-styled element appears in the same view, consolidate or replace with `font-body` using weight variation (`font-medium` / `font-bold`).

### 3d. Heading Hierarchy Gap Rule
Adjacent heading levels must skip at least one fluid step. This prevents parent and child headings from reading as visual siblings.

*   If `<h1>` = `text-fluid-3xl`, then `<h2>` maximum = `text-fluid-xl` (skipping `text-fluid-2xl`).
*   If `<h1>` = `text-fluid-4xl`, then `<h2>` maximum = `text-fluid-2xl`.
*   Body text must sit at least two fluid steps below its immediate parent heading.

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
*   **Mobile Navigation Safe Area:** The Top Navigation MUST NEVER overflow horizontally. Remove `overflow-x-auto` and `whitespace-nowrap`. On mobile (`< md`), the gap between links must be tight (`gap-2` to `gap-4`) to ensure they fit gracefully on a 320px width screen.
*   **Refined Footer Spacing:** The global footer is an endcap, not a gallery section. It must be kept "thin" and refined. Maximum vertical padding is `py-6 md:py-8`. Do NOT use `py-12` or `py-16` for the footer.

## 5. Components & Interactions
*   **Navigation:** Touch-friendly links with a minimum hit area of `min-h-[44px] min-w-[44px]`. Hover states use a 1px expanding border from the left origin (`scale-x-100 transition-transform origin-left`).
*   **Buttons:** Rectangular with minimal rounding (`rounded-sm`). Primary buttons use `bg-on-surface text-surface`.
*   **Inline Contextual Links:** When a call-to-action carries strong emotional or philosophical context, do not use an isolated button. Instead, embed it within an `<h2>` or `<h3>` as an inline link with a bottom border and hover arrow (`border-b border-primary/30 pb-1 group-hover:translate-x-1`).
*   **Cards (The "Vibrant & Frosted" Standard):** 
    *   **Border Radius Limit:** All cards must use `rounded-2xl` or smaller (prefer `rounded-xl` or `rounded-2xl`). Do not mix extreme radii like `rounded-3xl` or `rounded-full` for content cards.
    *   **Frost Edges (Glassmorphism Only):** Glassmorphism cards (translucent panels) must have a crisp edge to define their boundary against the background. Always use `border border-white/40` (or similar low-opacity white) on glass containers.
    *   **Borderless (Image-Filled Cards Only):** Full-bleed image cards (like Archive cards) should be completely borderless (`border-none`). Their boundaries are defined by the image itself and a soft shadow (`shadow-lg`). Do NOT apply "Frost Edges" or solid borders to full-image cards, as it creates an undesirable "photo frame" effect.
    *   **Vibrant Hover (No Dark Overlays):** Cards should feel alive and welcoming. Default states should be bright and visible. Do NOT use dark overlays (`bg-black/50`) that only reveal color on hover. Instead, use a "Vibrant Hover" approach: default state is fully visible, hover state elevates the card slightly (`-translate-y-1`), enhances the shadow (`shadow-xl`), or subtly scales the image (`scale-105`).
    *   **Typography:** Archive card text must follow Editorial Layout principles: left-aligned, tight vertical rhythm, no arbitrary `<br>` line breaks.
    *   **Image Loading:** Always use `loading="lazy"` on archive cards.
*   **Blockquotes:** Marked by a subtle left border (`border-l-2 border-primary/30`) and generous `my-fluid-2xl` padding.
*   **Editorial Endcap (Reading CTA):** At the end of a long-form reading page, DO NOT use the standard global footer. Instead, use a tight, vertically stacked CTA block consisting of: a Primary Action (solid dark button with icon, e.g., "Speak Now") followed by a Secondary Navigation (ghost button with left arrow, e.g., "Back to Archive"). Keep copy direct; remove marketing fluff.

## 6. Layout Philosophies
*   **Editorial Asymmetry:** On desktop breakpoints, avoid strict center-alignment. Use wide containers (`max-w-[1100px]`) and pair left-aligned text with subtle right-aligned vertical decorations (lines or vertical typography) to create a magazine-like balance.
*   **Zero-Distraction Reading:** Reading pages (Episode Details) must strip away all background motion. Remove floating orbs, glowing cursors, and complex entrance animations. The background should be a static `ethereal-gradient-bg` to maintain absolute focus on typography and imagery.
*   **Vertical Elongation:** For glassmorphic concept cards (like the "Core Values" block), utilize asymmetric padding (e.g., `pt-24 pb-24` on desktop) to make the card appear elongated and elegant rather than square and boxy.

## 7. Do's and Don'ts

### Hard Rules (Non-negotiable — breaking these breaks the system)
*   **DO:** Use `text-fluid-*` and `gap-fluid-*` everywhere. Never use hardcoded size breakpoints like `text-2xl sm:text-4xl`.
*   **DO:** Keep `font-display` (Playfair Display) exclusive to the Homepage Hero `<h1>` only. Reading pages (episode detail) use `font-headline font-bold` for the article `<h1>` — not `font-display`.
*   **DO:** Use `font-headline italic` (Noto Serif SC italic) for pull-quote emphasis. This is the correct substitute for Playfair Display in non-hero contexts.
*   **DON'T:** Use `whitespace-nowrap` on mobile navigation. It causes horizontal scroll overflow.
*   **DON'T:** Animate layout properties (`width`, `height`, `margin`, `padding`). Use `transform` and `opacity` only.
*   **DON'T:** Use `shadow-xl` with pure black. Always scope shadows with surface tokens: `shadow-on-surface/5` or `shadow-primary/20`.

### Style Guidelines (Intentional defaults — deviation requires justification)
*   Mix Serif italic and upright weights within the same heading for typographic rhythm.
*   Make all touch targets at least 44×44px on mobile.
*   Prefer background shifts and whitespace over borders for section separation.

---

## 8. Quick Reference (速查表)

When in doubt about which token to use, consult this table before reaching for a larger size.

| Role | Display Page (Homepage / Archive) | Reading Page (Episode Detail) |
|---|---|---|
| **Page `<h1>`** | `text-fluid-5xl~6xl` + `font-display font-black` | `text-fluid-3xl` + `font-headline font-bold` |
| **Section `<h2>`** | `text-fluid-3xl~4xl` + `font-headline font-bold` | `text-fluid-xl~2xl` + `font-headline font-bold` |
| **Sub-section `<h3>`** | `text-fluid-xl` + `font-headline font-bold` | `text-fluid-xl` + `font-headline font-bold` |
| **Opening paragraph** | `text-fluid-lg` + `font-body font-light` | `text-fluid-lg` + `font-body font-light` (first para only) |
| **Body copy** | (Display pages have minimal sustained body) | `text-fluid-base` + `font-body font-light leading-relaxed` |
| **Blockquote** | `text-fluid-lg` + `font-headline italic` | `text-fluid-lg` + `font-headline italic` |
| **Metadata / Label** | `text-[10px]~text-xs` + `font-label uppercase tracking-widest` | Same |

> **Critical rule:** `font-display` (Playfair Display) never appears on reading pages. The reading page `<h1>` uses `font-headline` at a much smaller scale (`fluid-3xl` vs `fluid-5xl~6xl`). This is what prevents detail pages from sounding as loud as the homepage.