---
{
  "title": "Core Components",
  "generatedAt": "2025-11-04T09:53:49.353Z"
}
---

# Core Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/components/ui/Block/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx)

- [src/components/ui/Box/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts)

This page provides complete API reference documentation for the five fundamental primitive components in `src/core/ui/`. These are Layer 1 components (atoms) that serve as the foundational building blocks for all higher-level components in the library.

**Scope**: This page covers only the core primitives: `Block`, `Box`, `Grid`, `Flex`, and `Stack`. For extended UI components (Button, Card, Badge, etc.), see [UI Components](#4.2). For architectural explanations and composition patterns, see [Core Components](#3.1).

## Component Overview

The core primitives provide low-level rendering capabilities with direct access to the CVA variant system. They render semantic HTML5 elements while accepting variant props for styling.

React Core