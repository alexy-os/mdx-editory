---
{
  "title": "Component Registry",
  "generatedAt": "2025-11-04T11:57:48.909Z"
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

| Property      | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| `$schema`     | string | JSON schema URL for validation              |
| `items`       | array  | Array of component metadata objects         |
| `version`     | string | Registry schema version (currently "1.0.0") |
| `lastUpdated` | string | ISO 8601 timestamp of last update           |
| `registry`    | string | Registry identifier ("ui")                  |

**Sources:** [src/registry.json2-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L281)

### Registry Schema Diagram

```
registry.json

$schema: buildy.tw/schema/registry.json

items[]
Component metadata array

version: 1.0.0

lastUpdated: ISO 8601 timestamp

registry: ui

Component Metadata Object

name: string

type: registry:ui | registry:layout

description: string

dependencies: string[]

devDependencies: string[]

files[]

path: src path

target: destination directory
```

**Sources:** [src/registry.json2-10](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L10) [src/registry.json278-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L278-L281)

---

## Component Metadata Schema

Each component entry in the `items` array contains the following fields:

| Field             | Type      | Required | Description                                            |
| ----------------- | --------- | -------- | ------------------------------------------------------ |
| `name`            | string    | Yes      | Component name (e.g., "Button", "Card")                |
| `type`            | string    | Yes      | Component category: "registry:ui" or "registry:layout" |
| `description`     | string    | Yes      | Component description (may be empty string)            |
| `dependencies`    | string\[] | Yes      | Runtime dependencies (e.g., "react", "lucide-react")   |
| `devDependencies` | string\[] | Yes      | Development dependencies (typically empty)             |
| `files`           | object\[] | Yes      | Array of file metadata objects                         |
| `files[].path`    | string    | Yes      | Source file path relative to repo root                 |
| `files[].target`  | string    | Yes      | Target directory in consumer project                   |

**Sources:** [src/registry.json4-17](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L4-L17)

### Component Types Distribution

The registry contains 18 components across two types:

| Type              | Count | Components                                                                                                 |
| ----------------- | ----- | ---------------------------------------------------------------------------------------------------------- |
| `registry:ui`     | 15    | Title, Text, Stack, Sheet, Image, Icon, Group, Grid, Container, Card, Button, Box, Block, Badge, Accordion |
| `registry:layout` | 3     | SplitBlock, LayoutBlock, DashLayout                                                                        |

**Sources:** [src/registry.json2-276](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L276)

### Example Component Entry

The Button component demonstrates a minimal registry entry:

```
{
  "name": "Button",
  "type": "registry:ui",
  "description": "",
  "dependencies": ["react"],
  "devDependencies": [],
  "files": [
    {
      "path": "src/components/ui/Button/Button.tsx",
      "target": "components/ui"
    }
  ]
}
```

**Sources:** [src/registry.json156-169](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L156-L169)

---

## Dependency Classification

The registry tracks two categories of dependencies for each component:

### Runtime Dependencies

Components declare runtime dependencies that must be installed in the consumer application:

| Dependency               | Used By          | Purpose                           |
| ------------------------ | ---------------- | --------------------------------- |
| `react`                  | All components   | Core React library                |
| `lucide-react`           | Sheet, Accordion | Icon components (ChevronRight, X) |
| `react-resizable-panels` | DashLayout       | Resizable panel layout system     |

**Note:** `class-variance-authority`, `clsx`, and `tailwind-merge` are package-level dependencies defined in [package.json48-53](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L53) and not tracked per-component.

### Development Dependencies

The `devDependencies` array is present in all entries but typically empty, as development dependencies are managed at the package level in [package.json59-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L59-L66)

**Sources:** [src/registry.json8-10](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L8-L10) [src/registry.json54-56](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L54-L56) [src/registry.json266-268](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L266-L268) [package.json48-53](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L53)

---

## File Path Mapping

Each component entry maps source files to target directories in the consumer project:

### Target Directory Structure

| Target          | Purpose          | Components                                         |
| --------------- | ---------------- | -------------------------------------------------- |
| `components/ui` | UI components    | 15 components (Button, Card, etc.)                 |
| `layouts`       | Layout templates | 3 components (DashLayout, LayoutBlock, SplitBlock) |

### File Mapping Diagram

```
Consumer Project

Registry Metadata

Source Repository

src/components/ui/Button/Button.tsx

src/layouts/DashLayout.tsx

Button entry
path: src/components/ui/Button/Button.tsx
target: components/ui

DashLayout entry
path: src/layouts/DashLayout.tsx
target: layouts

components/ui/Button.tsx

layouts/DashLayout.tsx
```

**Sources:** [src/registry.json14-16](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L14-L16) [src/registry.json240-243](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L240-L243) [src/registry.json272-274](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L272-L274)

---

## Registry Generation

The registry is generated and maintained through the `buildy-ui` CLI tool:

### Scan Command

The `scan` script in [package.json26](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L26) executes the buildy-ui scanner:

```
bunx buildy-ui@latest scan
```

This command:

1. Scans component directories (`src/components/ui/`, `src/layouts/`)
2. Extracts component metadata from source files
3. Determines dependencies by analyzing imports
4. Updates [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281) with current metadata
5. Sets `lastUpdated` timestamp to current ISO 8601 time

**Sources:** [package.json26](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L26) [src/registry.json279](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L279-L279)

### Build Registry Command

The `build:r` script in [package.json27](https://github.com/ui8kit/core/blob/2afe2195/package.json#L27-L27) generates distribution artifacts:

```
bunx buildy-ui@latest build
```

This creates the published registry package at `packages/registry/` for programmatic access.

**Sources:** [package.json27-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L27-L28)

---

## Integration with Installation Methods

The registry powers four distinct installation patterns:

### Installation Methods Comparison

| Method        | Command                                | Registry Usage                       | Use Case               |
| ------------- | -------------------------------------- | ------------------------------------ | ---------------------- |
| Full Library  | `npm install @ui8kit/core`             | Not used (installs entire package)   | Comprehensive projects |
| Per-Component | `npx buildy-ui add button`             | Reads metadata for selective install | Bundle optimization    |
| Programmatic  | `import registry from 'registry.json'` | Direct JSON access                   | Tooling/automation     |
| Git Submodule | `git submodule add`                    | Not used (clones source)             | Monorepo architectures |

**Sources:** [README.md255-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L255-L276)

### Per-Component Installation Flow

```
Missing

Present

npx buildy-ui add button

src/registry.json

Look up 'button' in items array

Extract metadata:
name: Button
type: registry:ui
files: src/components/ui/Button/Button.tsx
dependencies: react

Fetch file from GitHub:
ui8kit/core/src/components/ui/Button/Button.tsx

Check dependencies:
Is react installed?

Install missing dependencies:
npm install react

Write to target:
components/ui/Button.tsx

Installation complete
```

**Sources:** [README.md261-265](https://github.com/ui8kit/core/blob/2afe2195/README.md#L261-L265) [src/registry.json156-169](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L156-L169)

---

## Programmatic Registry Access

Applications can import the registry JSON for automation and tooling:

### Registry Data Structure

```
interface RegistryFile {
  $schema: string;
  items: ComponentItem[];
  version: string;
  lastUpdated: string;
  registry: string;
}

interface ComponentItem {
  name: string;
  type: "registry:ui" | "registry:layout";
  description: string;
  dependencies: string[];
  devDependencies: string[];
  files: FileItem[];
}

interface FileItem {
  path: string;
  target: string;
}
```

### Example Usage

```
import registry from '@ui8kit/core/registry.json';

// List all UI components
const uiComponents = registry.items
  .filter(item => item.type === 'registry:ui')
  .map(item => item.name);

// Find components requiring lucide-react
const iconComponents = registry.items
  .filter(item => item.dependencies.includes('lucide-react'))
  .map(item => item.name);
// Result: ["Sheet", "Accordion"]

// Get installation targets
const targets = [...new Set(
  registry.items.flatMap(item => 
    item.files.map(file => file.target)
  )
)];
// Result: ["components/ui", "layouts"]
```

**Sources:** [README.md268-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L268-L276) [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281)

---

## Component Coverage

The registry provides complete coverage of the library's component hierarchy:

### Component Inventory by Layer

```
Layer 3: Layouts

Layer 2: UI Components

Layer 1: Core Primitives

Registry Items: 18 Total

registry:ui
15 components

registry:layout
3 components

Box
src/components/ui/Box/Box.tsx

Block
src/components/ui/Block/Block.tsx

Grid
src/components/ui/Grid/Grid.tsx

Stack
src/components/ui/Stack/Stack.tsx

Button
src/components/ui/Button/Button.tsx

Card
src/components/ui/Card/Card.tsx

Text
src/components/ui/Text/Text.tsx

Title
src/components/ui/Title/Title.tsx

Container
src/components/ui/Container/Container.tsx

Icon
src/components/ui/Icon/Icon.tsx

Image
src/components/ui/Image/Image.tsx

Badge
src/components/ui/Badge/Badge.tsx

Group
src/components/ui/Group/Group.tsx

Sheet
src/components/ui/Sheet/Sheet.tsx

Accordion
src/components/ui/Accordion/Accordion.tsx

DashLayout
src/layouts/DashLayout.tsx

LayoutBlock
src/layouts/LayoutBlock.tsx

SplitBlock
src/layouts/SplitBlock.tsx
```

**Sources:** [src/registry.json1-276](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L276)

---

## Registry Maintenance

### Version Management

The registry uses semantic versioning independently from the package version:

- **Registry Version:** [src/registry.json278](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L278-L278) - Currently "1.0.0"
- **Package Version:** [package.json3](https://github.com/ui8kit/core/blob/2afe2195/package.json#L3-L3) - Currently "0.1.8"

The registry version changes when the metadata schema changes, not when components are added or modified.

### Last Updated Timestamp

The `lastUpdated` field in [src/registry.json279](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L279-L279) records the last modification time as an ISO 8601 string:

```
"lastUpdated": "2025-10-30T13:21:21.408Z"
```

This timestamp updates automatically when running `npm run scan`.

**Sources:** [src/registry.json278-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L278-L281) [package.json3](https://github.com/ui8kit/core/blob/2afe2195/package.json#L3-L3) [package.json26](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L26)

---

## Registry Distribution

The registry is distributed through two channels:

### NPM Package Distribution

The registry JSON is included in the NPM package through the `files` field in [package.json39-42](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L42):

```
"files": [
  "dist/**/*",
  "README.md",
  "LICENSE"
]
```

Note: The registry.json is not explicitly listed here but is included in the NPM tarball for programmatic access.

### Standalone Registry Package

The `publish` script in [package.json28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L28-L28) publishes a standalone registry package:

```
cd packages/registry && npm version patch && npm publish
```

This creates a dedicated NPM package containing only the registry metadata for lightweight access by CLI tools.

**Sources:** [package.json28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L28-L28) [package.json39-42](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L42)

---

## Integration with Build Pipeline

The registry interacts with other build-time systems:

```
Distribution

Build Artifacts

Build-Time Tools

Source Files

scans

generates

compiles

generates

extracts

generates

included in

published as

included in

referenced by

src/components/ui/**/.tsx
src/layouts/.tsx

buildy-ui scan

TypeScript Compiler

CVA Extractor

src/registry.json

dist/

src/lib/core-classes.json

NPM Package
@ui8kit/core

Registry Package
```

**Sources:** [package.json22-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L28) [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281)

---

## Summary

The Component Registry serves as the single source of truth for component metadata in `@ui8kit/core`. It enables:

1. **Per-component installation** via `npx buildy-ui add [component]`
2. **Programmatic access** for tooling and automation
3. **Dependency tracking** for selective installations
4. **File path mapping** from source to target directories
5. **Component classification** by type (UI vs Layout)

The registry is automatically maintained through the `buildy-ui scan` command and distributed via NPM alongside the compiled package.

**Sources:** [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281) [README.md251-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L251-L276) [package.json26-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L28)