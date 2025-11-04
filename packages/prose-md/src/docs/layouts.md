---
{
  "title": "Layouts",
  "generatedAt": "2025-11-04T09:53:49.269Z"
}
---

# Layouts

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx)

- [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)

- [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)

This document covers the Layer 3 layout components in the `@ui8kit/core` architecture: `DashLayout`, `LayoutBlock`, and `SplitBlock`. These are template-level components (organisms) that orchestrate Layer 2 UI components and Layer 1 primitives into structural page layouts. This page focuses on layout composition patterns, content hook systems, and special considerations for building application structures.

For basic layout primitives (`Grid`, `Flex`, `Stack`), see [Core Components](#3.1).

For UI components used within layouts, see [UI Components](#3.3).

For API details and prop references, see [Layout Components API](#4.3).
---

## Layout Architecture Overview

The layout system operates at the highest architectural layer, composing UI components and primitives into complete page structures. The three layout components serve distinct structural purposes:

External Dependencies