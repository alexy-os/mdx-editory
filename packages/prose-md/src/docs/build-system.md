---
{
  "title": "Build System",
  "generatedAt": "2025-11-04T09:53:49.288Z"
}
---

# Build System

Relevant source files

- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

- [scripts/cva-extractor.ts](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts)

- [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts)

- [src/layouts/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/index.ts)

- [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json)

- [tsconfig.json](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json)

## Purpose and Scope

This document covers the build system that compiles TypeScript source code into distributable JavaScript modules for NPM publication. It explains the compilation process, build scripts, TypeScript configuration, output structure, and distribution setup.

For information about the package structure and module exports, see [Package Structure](#3.5). For details about the component registry system that powers per-component installation, see [Component Registry](#3.7). For TypeScript-specific configuration details including path aliases and type generation, see [TypeScript Configuration](#3.8).

---

## Build Pipeline Overview

The build system transforms TypeScript source code in `src/` into ES2022 JavaScript modules with declaration files in `dist/`, along with generated artifacts that support Tailwind CSS and build tooling.

Distribution