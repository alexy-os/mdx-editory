---
{
  "title": "Component Registry",
  "generatedAt": "2025-11-04T09:53:49.299Z"
}
---

# Component Registry

Relevant source files

- [.gitignore](https://github.com/ui8kit/core/blob/2afe2195/.gitignore)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

- [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json)

## Purpose and Scope

The Component Registry is a centralized metadata system that catalogs all components in `@ui8kit/core` and enables multiple installation and consumption patterns. The registry is defined in [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281) and provides structured metadata including component names, types, dependencies, file paths, and target directories.

This page documents the registry format, component metadata schema, registration process, and how the registry powers different installation methods. For information about the build pipeline that generates registry artifacts, see [Build System](#3.6). For details on package distribution, see [Package Structure](#3.5).

**Sources:** [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281) [README.md251-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L251-L276)

---

## Registry File Structure

The registry is a JSON file conforming to the buildy-ui schema. It contains three top-level properties:

PropertyTypeDescription`$schema`stringJSON schema URL for validation`items`arrayArray of component metadata objects`version`stringRegistry schema version (currently "1.0.0")`lastUpdated`stringISO 8601 timestamp of last update`registry`stringRegistry identifier ("ui")
**Sources:** [src/registry.json2-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L281)

### Registry Schema Diagram