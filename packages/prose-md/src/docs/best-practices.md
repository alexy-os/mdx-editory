---
{
  "title": "Best Practices",
  "generatedAt": "2025-11-04T09:53:49.409Z"
}
---

# Best Practices

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

This document provides general guidelines and recommendations for effectively using the @ui8kit/core component library. It covers strategies for component selection, variant system usage, semantic HTML practices, accessibility, performance optimization, and composition patterns.

For common development patterns and typical usage examples, see [Basic Workflow](#5.1). For handling edge cases requiring custom solutions, see [Advanced Workflow](#5.2).

---

## Component Selection Strategy

Choosing the right component layer is fundamental to writing maintainable code. The three-layer architecture provides clear boundaries for different levels of abstraction.

### Decision Flow for Component Selection