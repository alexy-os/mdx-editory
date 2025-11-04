---
{
  "title": "Dark Mode",
  "generatedAt": "2025-11-04T09:53:49.419Z"
}
---

# Dark Mode

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/themes/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/themes/index.ts)

- [src/themes/providers/ThemeProvider.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx)

This document explains the dark mode implementation in `@ui8kit/core`, including the theme provider mechanism, state management, persistence strategies, and integration with Tailwind CSS. For general theming and variant styling, see [Variant System](#3.2). For component-specific styling patterns, see [Best Practices](#5.3).

## Purpose and Scope

The dark mode system provides automatic theme switching with persistent user preferences and system-level dark mode detection. The implementation is built around a React Context provider pattern that manages theme state, applies CSS classes to the document root, and synchronizes preferences to localStorage.

**Sources**: [src/themes/providers/ThemeProvider.tsx1-93](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L93)

---

## ThemeProvider Architecture

The `ThemeProvider` component wraps the application and manages all theme-related state through React Context. It accepts a `theme` object conforming to the `ThemeBase` type and provides theme values and control functions through the context.

Browser APIs