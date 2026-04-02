---
name: "flowing-light-design"
description: "Enforces Flowing Light design rules. Invoke whenever user asks to modify, create, or update any frontend pages, components, or styles in this project."
---

# Flowing Light Design System Enforcer

You are developing frontend features for the Flowing Light project. The project strictly follows a unified design system.

## ⚠️ Mandatory Pre-requisite
Whenever you are asked to implement or modify frontend UI (HTML, CSS, JS), you **MUST** first review the following reference files to ensure strict compliance:
1. `design-system/DESIGN_SYSTEM_V2.md` (The definitive rulebook for tokens, patterns, and principles)
2. `design-system/design-system.html` (The visual component library and pattern examples)

## Core Directives
1. **Tokens First, Not Styles:**
   - NEVER use hardcoded Hex colors or magic numbers.
   - Use the established Tailwind tokens defined in `js/tailwind-config.js` (e.g., `text-on-surface`, `bg-primary-container`).
2. **Strict Typography Hierarchy:**
   - Only use `font-display` for the Hero `<h1>` on the index page.
   - Use `font-headline` for reading titles and `font-body`/`font-label` for standard text.
   - Apply fluid size tokens (e.g., `text-fluid-base`, `text-fluid-3xl`).
3. **No-Line Rule:**
   - Avoid `1px solid` borders for structural separation. Prefer soft elevation (`shadow-on-surface/5`, `shadow-primary/20`) or ethereal gradients (`ethereal-gradient-bg`).
   - If borders are necessary, use `border-outline-variant/30`.
4. **Context-Aware Design:**
   - **Display Context (Home/Archive):** Brand-focused, fluid 5xl-6xl typography, moderate glassmorphism.
   - **Reading Context (Detail Pages):** Focus on continuous reading. Restrained animations, fixed line lengths (`max-w-[800px]`), and low-interference backgrounds.
5. **Pattern Consistency:**
   - The Global Header and Footer must remain uniform across all pages. Do not introduce custom variations.
   - Interactive elements must handle all states: `default`, `hover`, `focus-visible`, `active`, and `disabled`.

Before finishing your task, verify your implementation against the Checklist in section 11.2 of `DESIGN_SYSTEM_V2.md`.
