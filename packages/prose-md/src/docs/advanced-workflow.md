---
{
  "title": "Advanced Workflow",
  "generatedAt": "2025-11-04T09:53:49.392Z"
}
---

# Advanced Workflow

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [src/components/GUIDE_CREATE_FORM.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md)

- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

## Purpose and Scope

This document covers non-standard scenarios where the 15 composite UI components from [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) are insufficient for your use case. You will learn how to compose the five core primitives (`Block`, `Box`, `Grid`, `Flex`, `Stack`) from [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) to build custom interfaces.

For typical component usage with ready-made composites, see [Basic Workflow](#5.1). For general usage guidelines and patterns, see [Best Practices](#5.3).

**Sources:** [.devin/wiki.json191-198](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L191-L198) [src/components/GUIDE_CREATE_FORM.md1-10](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L1-L10)

---

## When to Use Advanced Workflow

The library provides 15 composite components that cover ~80% of common UI scenarios. However, certain elements are intentionally absent from the library:

Missing Component TypeReason for AbsenceAdvanced SolutionForm elements (Form, Label, Input)HTML semantics vary widelyCompose `Block` + `Box` with `component` propSelect dropdownsRequires complex state managementUse `Box component="select"` with variantsCustom interactive widgetsApplication-specific logicBuild with primitives + variantsNon-standard layoutsUnique structural requirementsCompose `Grid`, `Flex`, `Stack` directly
**Decision Tree: Basic vs Advanced Workflow**