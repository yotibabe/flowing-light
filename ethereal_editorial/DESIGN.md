# Design System: Luminescent Parchment

### 1. Overview & Creative North Star
**Creative North Star: The Digital Curator**
Luminescent Parchment is a design system that treats the screen as a gallery space rather than a software interface. It prioritizes the "weight" of intellectual content through high-end editorial layouts. The system rejects the generic "SaaS" look in favor of intentional asymmetry, varying typographic rhythms, and a sense of "flowing light." It is designed for platforms where information is meant to be savored, not just processed.

### 2. Colors
The palette is rooted in warm, earthen tones (Terracotta Primary) and intellectual blues (Slate Secondary), set against a near-white, luminous background (#FDFDFD).

*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for structural sectioning. Boundaries are created through background shifts (e.g., transitioning from `surface` to `surface_container_low`) or the use of generous whitespace.
*   **Surface Hierarchy:** 
    *   `surface_container_lowest` (#ffffff) is reserved for cards and elevated glass panels.
    *   `surface_container_low` (#f3f3f3) is used for subtle section differentiation.
*   **The "Glass & Gradient" Rule:** Floating UI elements must utilize `glass-panel` styling (45% white opacity with 40px backdrop blur) to maintain the "light" aesthetic.
*   **Signature Textures:** Use "Ethereal Gradients"—soft, multi-stop linear and radial gradients (e.g., mixing `primary-fixed` and `secondary-fixed` at low opacities) to create depth in hero backgrounds.

### 3. Typography
The typography uses a sophisticated pairing of **Noto Serif SC** for high-impact editorial moments and **Work Sans** for functional, modern clarity.

**Typography Scale (Ground Truth):**
*   **Display (Playfair Display):** Used for dramatic, oversized hero text. Sizes reach up to `8rem` (approx 128px) or `4.5rem` (72px) with tight tracking (`tracking-tighter`) and high-contrast weights (Black vs. Italic).
*   **Headline (Noto Serif SC):** For section titles and primary headers. Range: `3rem` (48px) to `1.875rem` (30px).
*   **Body (Work Sans):** For long-form reading. Standard size is `1.125rem` (18px) to `1.25rem` (20px) with generous leading (`leading-loose`) to enhance readability.
*   **Label/Caption (Work Sans):** `0.75rem` (12px) or `10px` for metadata. Often styled in uppercase with extreme letter spacing (`0.4em` to `0.5em`) to evoke luxury branding.

### 4. Elevation & Depth
Hierarchy is established through **Tonal Layering** and diffused light rather than physical shadows.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. For example, a card (`surface_container_lowest`) sits atop a section (`surface_container_low`).
*   **Ambient Shadows:** 
    *   `shadow-2xl`: Used only for major floating panels, characterized by a massive spread and very low opacity (`on-surface/5`).
    *   `shadow-sm`: Used for subtle image lift.
*   **The "Ghost Border" Fallback:** If a separator is required, use `outline-variant` at 30% opacity.
*   **Glassmorphism:** Navigation and hero panels use `backdrop-blur-[60px]` to create a "frosted glass" effect that allows the "flowing light" of background gradients to bleed through.

### 5. Components
*   **Buttons:** Rectangular with minimal rounding (`0.125rem`). Primary buttons use the bold `primary` terracotta; secondary buttons are transparent with thin bottom borders.
*   **Cards:** Asymmetric layouts. Images should have a `rounded-lg` (0.25rem) corner and often feature overlapping elements (e.g., an image offset from its background container).
*   **Chips:** Pill-shaped (`rounded-full`) but tiny. Used for metadata/tags with `surface-container-high` backgrounds.
*   **Inputs:** Minimalist with `outline-variant` borders that only appear on focus or as thin baselines.
*   **Separators:** Vertical or horizontal lines using `primary/30` or `outline-variant/30`, often acting as rhythmic spacers rather than full dividers.

### 6. Do's and Don'ts
*   **Do:** Use "Vertical Writing Mode" for decorative labels to break the horizontal grid.
*   **Do:** Mix Serif (Italic) and Sans-Serif within the same heading for emphasis.
*   **Don't:** Use heavy drop shadows or vibrant, saturated background colors.
*   **Don't:** Use perfectly sharp corners (0px) or fully pill-shaped (pill) containers for primary structural blocks; stick to the "subtle" `0.125rem` – `0.5rem` range.
*   **Do:** Use grayscale filters on images that only transition to color on hover for a sophisticated "archival" feel.