---
{
  "title": "Package Structure",
  "generatedAt": "2025-11-04T09:53:49.274Z"
}
---

# Package Structure

Relevant source files

- [.gitignore](https://github.com/ui8kit/core/blob/2afe2195/.gitignore)

- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

- [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json)

This document describes the configuration of the `@ui8kit/core` package, including entry points, module exports, dependencies, and distribution setup. It explains how the package.json configuration supports multiple integration methods (NPM installation, per-component installation via buildy-ui CLI, git submodules, and direct source copying).

For information about the build process that generates distribution files, see [Build System](#3.6). For details on the component registry system, see [Component Registry](#3.7).

---

## Package Metadata

The package is configured as an ES module library targeting modern JavaScript environments.

PropertyValuePurpose`name``@ui8kit/core`Scoped NPM package identifier`version``0.1.8`Semantic version (MAJOR.MINOR.PATCH)`type``"module"`Declares ES module format (not CommonJS)`license``GPL-3.0`Open source license`homepage``https://buildy.tw/`Documentation and tooling site`sideEffects``false`Enables tree-shaking optimization
The `type: "module"` declaration [package.json8](https://github.com/ui8kit/core/blob/2afe2195/package.json#L8-L8) ensures all `.js` files are treated as ES modules, requiring explicit `.js` extensions in import statements. The `sideEffects: false` flag [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30) indicates the package contains pure modules without side effects, allowing bundlers to safely remove unused code.

**Sources:** [package.json1-30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L30)

---

## Module Entry Points and Exports

The package defines a single default export entry point with dual-format resolution:

```
{
&nbsp;&nbsp;"main":&nbsp;"./dist/index.js",
&nbsp;&nbsp;"types":&nbsp;"./dist/index.d.ts",
&nbsp;&nbsp;"exports":&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;".":&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"import":&nbsp;"./dist/index.js",
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"types":&nbsp;"./dist/index.d.ts"
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;}
}

```

### Entry Point Resolution

Build Artifacts