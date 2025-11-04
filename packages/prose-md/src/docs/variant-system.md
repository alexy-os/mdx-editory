---
{
  "title": "Variant System",
  "generatedAt": "2025-11-04T09:53:49.256Z"
}
---

# Variant System

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [scripts/cva-extractor.ts](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

- [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts)

- [src/layouts/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/index.ts)

- [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json)

## Purpose and Scope

The Variant System is the foundational styling layer of `@ui8kit/core`, providing a CVA-based (class-variance-authority) approach to component styling. This system groups Tailwind CSS utility classes into 12 composable, reusable variant categories that cover approximately 80% of design scenarios, eliminating the need for manual `className` management and reducing style duplication across components.

This document covers the variant architecture, the 12 variant categories, CVA class generation, extraction mechanics, and composition patterns. For information about how components consume these variants, see [Core Components](#3.1) and [UI Components](#3.3). For build-time extraction of variant classes, see [Build System](#3.6).

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

---

## Architecture Overview

The Variant System operates as a three-stage pipeline: variant definitions, CVA resolution, and class application.

### Variant System Pipeline

Build-Time Extraction