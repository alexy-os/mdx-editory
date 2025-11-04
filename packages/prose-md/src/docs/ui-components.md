---
{
  "title": "UI Components",
  "generatedAt": "2025-11-04T09:53:49.355Z"
}
---

# UI Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

- [src/components/ui/Accordion/Accordion.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx)

- [src/components/ui/Badge/Badge.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx)

## Purpose and Scope

This document provides complete API documentation for the extended composite components located in `src/components/ui/`. These components form Layer 2 of the three-layer architecture, sitting between the core primitives (documented in [Core Components](#4.1)) and layout templates (documented in [Layout Components](#4.3)).

UI components extend base primitives through **prop forwarding**, inheriting variant capabilities while adding component-specific functionality. They provide a developer-friendly API that eliminates manual className management by exposing typed variant props like `p='lg'`, `rounded='md'`, and `shadow='sm'`.

For general usage patterns and best practices, see [Basic Workflow](#5.1). For the underlying variant system, see [Variant System](#3.2).

---

## Component Architecture

### Layer 2 Position in the System

Foundation: CVA Variants (core/variants)