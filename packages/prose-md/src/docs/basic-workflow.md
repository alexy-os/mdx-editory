---
{
  "title": "Basic Workflow",
  "generatedAt": "2025-11-04T09:53:49.389Z"
}
---

# Basic Workflow

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

## Purpose and Scope

This document describes the typical development workflows and patterns used when building user interfaces with `@ui8kit/core`. It covers common scenarios developers encounter when composing components, applying styling through the variant system, and building standard UI patterns like cards, forms, and layouts.

For advanced scenarios where standard components are insufficient (e.g., creating custom form components), see [Advanced Workflow](#5.2). For general guidelines and performance recommendations, see [Best Practices](#5.3).

**Sources:** [.devin/wiki.json181-188](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L181-L188) [src/components/README.md1-259](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L259)

---

## Component Selection Workflow

The first step in any development workflow is selecting the appropriate component for your use case. The library follows a three-layer hierarchy where each layer serves specific purposes.