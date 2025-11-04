---
{
  "title": "Architecture",
  "generatedAt": "2025-11-04T09:53:49.227Z"
}
---

# Architecture

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

## Purpose and Scope

This document describes the architectural design of `@ui8kit/core`, including its three-layer component hierarchy, variant system, build pipeline, and module organization. It explains the structural relationships between primitives, composite components, and layouts, along with the underlying mechanisms for styling, type safety, and distribution.

For detailed API documentation of individual components and their props, see [API Reference](#4). For installation and configuration instructions, see [Getting Started](#2). For development workflows and usage patterns, see [Development Guide](#5).

---

## Three-Layer Architecture Overview

The library implements a three-layer architecture aligned with atomic design principles: **atoms** (core primitives), **molecules** (UI components), and **organisms** (layout templates). Each layer builds upon the previous one through composition and prop forwarding.

### Layer Hierarchy and Dependencies

Foundation: Variant System