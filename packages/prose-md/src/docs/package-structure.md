---
{
  "title": "Package Structure",
  "generatedAt": "2025-11-04T11:57:48.652Z"
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

| Property      | Value                | Purpose                                  |
| ------------- | -------------------- | ---------------------------------------- |
| `name`        | `@ui8kit/core`       | Scoped NPM package identifier            |
| `version`     | `0.1.8`              | Semantic version (MAJOR.MINOR.PATCH)     |
| `type`        | `"module"`           | Declares ES module format (not CommonJS) |
| `license`     | `GPL-3.0`            | Open source license                      |
| `homepage`    | `https://buildy.tw/` | Documentation and tooling site           |
| `sideEffects` | `false`              | Enables tree-shaking optimization        |

The `type: "module"` declaration [package.json8](https://github.com/ui8kit/core/blob/2afe2195/package.json#L8-L8) ensures all `.js` files are treated as ES modules, requiring explicit `.js` extensions in import statements. The `sideEffects: false` flag [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30) indicates the package contains pure modules without side effects, allowing bundlers to safely remove unused code.

**Sources:** [package.json1-30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L30)

---

## Module Entry Points and Exports

The package defines a single default export entry point with dual-format resolution:

```
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

### Entry Point Resolution

```
Build Artifacts

File System

Package Resolution

Consumer Import

import { Button, Card } from '@ui8kit/core'

exports field

'.' entry point

import condition

types condition

dist/index.js
Runtime code

dist/index.d.ts
Type definitions

TypeScript Compiler

src/index.tsx

src/components/ui/*

src/layouts/*

src/core/ui/*
```

The `main` field [package.json31](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L31) provides backward compatibility for older tools, while the `exports` field [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37) provides modern conditional exports. The `types` condition ensures TypeScript resolves type definitions correctly for both resolution strategies.

All components are exported from a single barrel file at [src/index.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/index.tsx) which is compiled to [dist/index.js](https://github.com/ui8kit/core/blob/2afe2195/dist/index.js) This provides a unified import surface:

```
// All exports available from single entry point
import { Button, Card, Block, Box, DashLayout } from '@ui8kit/core';
```

**Sources:** [package.json31-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L37)

---

## Distribution Files

The package distributes only essential files, configured via the `files` field:

```
{
  "files": [
    "dist/**/*",
    "README.md",
    "LICENSE"
  ]
}
```

### Distribution Manifest

```
Excluded Files

Included Files

Published Package

excluded

excluded

excluded

excluded

excluded

@ui8kit/Unsupported markdown: link

dist/
Compiled output

dist/index.js
Main entry point

dist/index.d.ts
Type definitions

dist/components/

dist/layouts/

dist/core/

dist/themes/

README.md
Documentation

LICENSE
GPL-3.0 terms

src/
Source code

node_modules/

scripts/

tsconfig.json
eslint.config.js

src/registry.json
```

The `files` array [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43) explicitly includes only the compiled `dist/` directory and documentation files. Source files in `src/`, build scripts, and development configuration are excluded from the published package.

The `.gitignore` file [.gitignore9-10](https://github.com/ui8kit/core/blob/2afe2195/.gitignore#L9-L10) excludes `dist/` from version control, as it contains generated artifacts. During NPM publication, the build process generates `dist/` and includes it in the package tarball.

**Sources:** [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43) [.gitignore9-10](https://github.com/ui8kit/core/blob/2afe2195/.gitignore#L9-L10)

---

## Dependencies

Dependencies are organized into three categories based on when and how they are required:

### Runtime Dependencies

```
Component Usage

Runtime Dependencies

class-variance-authority@^0.7.1
Variant resolution engine

clsx@^2.1.1
Conditional class names

lucide-react@^0.525.0
Icon components

react-resizable-panels@^3.0.6
DashLayout panels

tailwind-merge@^3.3.1
Class deduplication

All Components
Use CVA + CLSX + TWMerge

Sheet Component

Accordion Component

DashLayout Component
```

Runtime dependencies [package.json48-54](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L54) are bundled with the package and installed automatically:

| Dependency                 | Version    | Used By                      | Purpose                                   |
| -------------------------- | ---------- | ---------------------------- | ----------------------------------------- |
| `class-variance-authority` | `^0.7.1`   | All components               | CVA-based variant system                  |
| `clsx`                     | `^2.1.1`   | All components               | Conditional className construction        |
| `lucide-react`             | `^0.525.0` | Sheet, Accordion, DashLayout | Icon rendering (X, ChevronDown, etc.)     |
| `react-resizable-panels`   | `^3.0.6`   | DashLayout                   | Resizable sidebar panels                  |
| `tailwind-merge`           | `^3.3.1`   | All components               | Deduplicates conflicting Tailwind classes |

These dependencies appear in [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json) component metadata. For example, Sheet lists `lucide-react` [src/registry.json54-55](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L54-L55) and DashLayout lists both `lucide-react` and `react-resizable-panels` [src/registry.json266-267](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L266-L267)

### Peer Dependencies

```
@ui8kit/core

Peer Dependencies

Consumer Application

installs

installs

installs

uses from peer

uses from peer

Application package.json

node_modules/

react@^18.0.0 || ^19.0.0

react-dom@^18.0.0 || ^19.0.0

@ui8kit/Unsupported markdown: link

Components require React
```

Peer dependencies [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) must be provided by the consuming application:

```
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

The version range supports both React 18 and 19, providing flexibility for applications during the React 19 migration period. The library does not bundle React, avoiding version conflicts and duplicate React instances.

### Development Dependencies

Development dependencies [package.json59-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L59-L66) are used only during library development and testing:

| Dependency        | Version   | Purpose                 |
| ----------------- | --------- | ----------------------- |
| `react`           | `^19.1.0` | Development and testing |
| `react-dom`       | `^19.1.0` | Development and testing |
| `bun-types`       | `^1.1.29` | Bun runtime types       |
| `typescript`      | `^5.6.3`  | TypeScript compilation  |
| `@babel/parser`   | `^7.28.4` | CVA extractor script    |
| `@babel/traverse` | `^7.28.4` | CVA extractor script    |

React and ReactDOM appear in both `peerDependencies` and `devDependencies`. The `devDependencies` versions are used for local development, while `peerDependencies` declare compatibility requirements for consumers.

**Sources:** [package.json48-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L66) [src/registry.json54-55](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L54-L55) [src/registry.json266-267](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L266-L267)

---

## Build Scripts

The `scripts` section defines commands for development and publication workflows:

```
{
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "type-check": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "scan": "bunx buildy-ui@latest scan",
    "build:r": "bunx buildy-ui@latest build",
    "publish": "cd packages/registry && npm version patch && npm publish"
  }
}
```

### Build Script Flow

```
Build Scripts

Development Scripts

Publication Scripts

npm run publish

npm version patch

npm publish

NPM Registry

Registry Scripts

npm run scan
buildy-ui scan

src/registry.json

npm run build:r
buildy-ui build

npm run type-check
Validate types without output

npm run lint
Check code quality

npm run lint:fix
Auto-fix issues

npm run build
Compile TypeScript

tsc -p tsconfig.json

dist/ directory
```

| Script       | Command                                                    | Purpose                                  |
| ------------ | ---------------------------------------------------------- | ---------------------------------------- |
| `build`      | `tsc -p tsconfig.json`                                     | Compiles TypeScript to `dist/`           |
| `type-check` | `tsc --noEmit`                                             | Validates types without generating files |
| `lint`       | `eslint src --ext .ts,.tsx`                                | Checks code quality                      |
| `lint:fix`   | `eslint src --ext .ts,.tsx --fix`                          | Auto-fixes linting issues                |
| `scan`       | `bunx buildy-ui@latest scan`                               | Updates component registry metadata      |
| `build:r`    | `bunx buildy-ui@latest build`                              | Builds registry package                  |
| `publish`    | `cd packages/registry && npm version patch && npm publish` | Publishes to NPM                         |

The `build` script [package.json22](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L22) is the primary compilation command, generating ES2022 modules and TypeScript declarations in `dist/`. The `scan` script [package.json26](https://github.com/ui8kit/core/blob/2afe2195/package.json#L26-L26) updates [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json) with component metadata, enabling per-component installation via `npx buildy-ui add [component]`.

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L21-L28)

---

## Integration Methods Supported

The package structure supports four distinct integration methods, each using different aspects of the package configuration:

### Integration Method Matrix

```
Installed Artifacts

Package Configuration Used

Integration Methods

Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list

main + exports
package.json:31-37

files field
package.json:39-43

dependencies
package.json:48-54

peerDependencies
package.json:55-58

src/registry.json
Component metadata

items[] array
18 components

src/ directory
TypeScript source

repository.url
package.json:45

node_modules/@ui8kit/core/
dist/, README, LICENSE

components/ui/
Selected components

packages/@ui8kit/core/
Full source

src/components/
Copied source
```

### Method 1: Full NPM Installation

Uses the complete package configuration:

- Resolves entry points via `main` and `exports` fields [package.json31-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L37)
- Installs files specified in `files` array [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43)
- Installs all runtime dependencies [package.json48-54](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L54)
- Requires peer dependencies [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58)

Installed location: `node_modules/@ui8kit/core/`

### Method 2: Per-Component Installation

Uses the component registry:

- Reads component metadata from `src/registry.json` [src/registry.json3-276](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L3-L276)
- Installs only specified component files to `components/ui/` or `layouts/`
- Installs component-specific dependencies (e.g., `lucide-react` for Sheet)

Command: `npx buildy-ui add [component]`

### Method 3: Git Submodule

Uses repository URL:

- Clones repository via `repository.url` [package.json45](https://github.com/ui8kit/core/blob/2afe2195/package.json#L45-L45)
- Provides access to full source tree in `src/`
- Requires manual dependency management

Installed location: `packages/@ui8kit/core/` (typical monorepo pattern)

### Method 4: Direct Source Copy

Uses source files directly:

- Copies `src/components/` or specific components
- Requires manual dependency installation
- Enables custom modifications

Installed location: Application's `src/` directory

**Sources:** [package.json31-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L58) [src/registry.json1-281](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L281)

---

## Repository Configuration

The `repository` field enables source code discovery and git-based integrations:

```
{
  "repository": {
    "url": "https://github.com/ui8kit/core.git",
    "type": "git"
  }
}
```

This configuration [package.json44-47](https://github.com/ui8kit/core/blob/2afe2195/package.json#L44-L47):

- Links NPM package to GitHub repository
- Enables `npm repo` command to open repository
- Supports git submodule integration via `git submodule add https://github.com/ui8kit/core.git`
- Provides source code visibility for transparency (GPL-3.0 license requirement)

**Sources:** [package.json44-47](https://github.com/ui8kit/core/blob/2afe2195/package.json#L44-L47)

---

## Publish Configuration

The `publishConfig` section controls NPM publication behavior:

```
{
  "publishConfig": {
    "access": "public"
  }
}
```

The `access: "public"` setting [package.json67-69](https://github.com/ui8kit/core/blob/2afe2195/package.json#L67-L69) is required for scoped packages (`@ui8kit/core`) to be publicly accessible on the NPM registry. Without this configuration, scoped packages default to private access.

**Sources:** [package.json67-69](https://github.com/ui8kit/core/blob/2afe2195/package.json#L67-L69)