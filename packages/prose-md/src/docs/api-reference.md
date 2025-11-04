---
{
  "title": "API Reference",
  "generatedAt": "2025-11-04T09:53:49.351Z"
}
---

# API Reference

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

This document provides a comprehensive reference for all exported APIs from the `@ui8kit/core` library. It covers component exports, variant props, TypeScript interfaces, and naming conventions used throughout the codebase.

For architectural context and component relationships, see [Architecture](#3). For detailed API documentation of individual components, see sub-pages: [Core Components](#4.1), [UI Components](#4.2), and [Layout Components](#4.3). For usage patterns and examples, see [Development Guide](#5).

## Export Structure

The library follows a flat export structure from [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) All components, variants, hooks, and utilities are re-exported from this single entry point for simplified imports.

Utility Hooks