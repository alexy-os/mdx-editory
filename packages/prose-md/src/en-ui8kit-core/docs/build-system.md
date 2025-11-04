---
{
  "title": "Build System",
  "generatedAt": "2025-11-04T11:57:48.788Z"
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

```
Distribution

Build Artifacts

Build-Time Scripts

Source Code

bun scripts/cva-extractor.ts

generates

emits

emits

bunx buildy-ui scan

scans

scans

generates

publishes

safelist for
Tailwind purge

src/core/ui/
Primitives: Block, Box, Grid, etc.

src/core/variants/
CVA variant definitions

src/components/ui/
Composite components

src/layouts/
Layout templates

src/index.ts
Main entry point

scripts/cva-extractor.ts
Extracts 618 CSS classes

tsc -p tsconfig.json
TypeScript compiler

eslint src --ext .ts,.tsx
Code quality checks

buildy-ui scan
Registry generation

src/lib/core-classes.json
618-class whitelist

dist/index.js
ES2022 module output

dist/index.d.ts
TypeScript declarations

src/registry.json
Component metadata

NPM Package
@ui8kit/Unsupported markdown: link

Package files:
dist/**, README.md, LICENSE

Consumer
Applications
```

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L21-L28) [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26) [scripts/cva-extractor.ts1-339](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L339)

---

## Build Commands

The build system provides several npm scripts defined in `package.json` for different aspects of the build and development workflow.

### Core Build Commands

| Command              | Script                            | Purpose                                                 |
| -------------------- | --------------------------------- | ------------------------------------------------------- |
| `npm run build`      | `tsc -p tsconfig.json`            | Compile TypeScript to JavaScript with declaration files |
| `npm run type-check` | `tsc --noEmit`                    | Type-check without emitting files                       |
| `npm run lint`       | `eslint src --ext .ts,.tsx`       | Check code quality and style                            |
| `npm run lint:fix`   | `eslint src --ext .ts,.tsx --fix` | Auto-fix linting issues                                 |

### Tooling Commands

| Command           | Script                                                     | Purpose                              |
| ----------------- | ---------------------------------------------------------- | ------------------------------------ |
| `npm run scan`    | `bunx buildy-ui@latest scan`                               | Generate component registry metadata |
| `npm run build:r` | `bunx buildy-ui@latest build`                              | Build registry package               |
| `npm run publish` | `cd packages/registry && npm version patch && npm publish` | Publish registry to NPM              |

### Manual Build Scripts

| Script         | Command                        | Purpose                                      |
| -------------- | ------------------------------ | -------------------------------------------- |
| CVA Extraction | `bun scripts/cva-extractor.ts` | Extract CSS classes from variant definitions |

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L21-L28)

---

## TypeScript Compilation Process

The TypeScript compiler (`tsc`) transforms source files from `src/` into compiled JavaScript modules and declaration files in `dist/` using the configuration defined in `tsconfig.json`.

```
Outputs

Compilation Process

Compiler Settings

Compilation Inputs

tsconfig.json
Compiler configuration

src//*.ts
src//*.tsx
TypeScript source

target: ES2022
Modern JavaScript features

module: ES2022
moduleResolution: Bundler

jsx: react-jsx
React 18+ JSX transform

Path aliases:
@/* → ./src/*

Type checking
strict: true

JSX transformation
react-jsx runtime

Declaration generation
declaration: true

File emission
outDir: ./dist

dist/index.js
ES2022 modules

dist/index.d.ts
Type declarations

dist//*.js
dist//*.d.ts
Compiled submodules
```

### Compilation Configuration

The TypeScript compiler is configured in [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26) with the following key settings:

| Setting            | Value       | Purpose                                       |
| ------------------ | ----------- | --------------------------------------------- |
| `target`           | `ES2022`    | Output modern JavaScript with ES2022 features |
| `module`           | `ES2022`    | Use ES modules (import/export syntax)         |
| `moduleResolution` | `Bundler`   | Module resolution for modern bundlers         |
| `rootDir`          | `src`       | Source root directory                         |
| `outDir`           | `./dist`    | Compiled output directory                     |
| `declaration`      | `true`      | Generate `.d.ts` type declaration files       |
| `declarationDir`   | `./dist`    | Output location for declarations              |
| `jsx`              | `react-jsx` | Use React 18+ automatic JSX transform         |
| `strict`           | `true`      | Enable all strict type-checking options       |

### Path Aliases

The compiler resolves path aliases during compilation:

```
// Path alias configuration
{
  "@/*": ["./src/*"],              // Maps @/ to src/
  "@ui8kit/core": ["./src/index"]  // Maps package import to src/index
}
```

These aliases are used in source code but resolved to relative paths in the compiled output.

**Sources:** [tsconfig.json4-24](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L4-L24) Diagram 2 from high-level architecture

---

## Output Structure

The compilation process generates a structured output in the `dist/` directory that mirrors the source structure.

### Distribution Directory Layout

```
dist/ Output Directory

Supporting Modules

Layout Modules

Component Modules

Core Modules

imports

imports

imports

imports

imports

imports

dist/themes/
Theme system

dist/index.js
Main entry point module

dist/core/ui/
Compiled primitive components

dist/core/variants/
CVA variant definitions

dist/components/ui/
Composite components

dist/layouts/
Layout templates

dist/hooks/
React hooks

dist/ui/
UI component exports

dist/core/utils/
Utility functions

dist/index.d.ts
Main type declarations
```

### Entry Point Structure

The main entry point at [src/index.ts1-32](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts#L1-L32) defines the public API through a series of exports:

```
// Export structure from src/index.ts
export * from './core/variants';      // Variant definitions
export * from './core/utils';         // Utility functions

// Core primitives with Base prefix
export {
  Block as BaseBlock,
  Box as BaseBox,
  // ... etc
} from './core/ui';

// Composite components (main exports)
export * from './ui';                 // Button, Card, etc.

// Layout components
export * from './layouts';            // DashLayout, LayoutBlock, etc.

// Theme system
export * from './themes';             // ThemeProvider, useTheme

// React hooks
export * from './hooks';
```

This structure is preserved in the compiled `dist/index.js` with all imports resolved to relative paths.

### File Types Generated

| File Type          | Extension   | Purpose                         |
| ------------------ | ----------- | ------------------------------- |
| JavaScript modules | `.js`       | ES2022 executable code          |
| Type declarations  | `.d.ts`     | TypeScript type information     |
| Declaration maps   | `.d.ts.map` | Source mapping for declarations |

**Sources:** [src/index.ts1-32](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts#L1-L32) [tsconfig.json13-19](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L13-L19) [package.json31-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L37)

---

## Distribution Configuration

The package is configured for NPM distribution through settings in `package.json` that define how the compiled code is exposed to consumers.

### Module Exports Configuration

The package defines its exports using the modern `exports` field:

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

This configuration:

- **`main`**: Default entry point for CommonJS and older tools
- **`types`**: TypeScript declaration file location
- **`exports["."]`**: Modern conditional exports for ESM and types

### Package Distribution Files

The `files` field in [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43) specifies which files are included in the published package:

```
{
  "files": [
    "dist/**/*",      // All compiled output
    "README.md",      // Documentation
    "LICENSE"         // License file
  ]
}
```

### Package Metadata

| Field                  | Value          | Purpose                           |
| ---------------------- | -------------- | --------------------------------- |
| `name`                 | `@ui8kit/core` | NPM package name                  |
| `version`              | `0.1.8`        | Semantic version number           |
| `type`                 | `module`       | Declares package as ESM           |
| `sideEffects`          | `false`        | Enables tree-shaking optimization |
| `publishConfig.access` | `public`       | Allows public NPM access          |

**Sources:** [package.json1-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L43) [package.json67-69](https://github.com/ui8kit/core/blob/2afe2195/package.json#L67-L69)

---

## Build-Time Tooling

The build system includes specialized scripts that run during development to generate artifacts required by the runtime system and consumer applications.

### CVA Class Extractor

The [scripts/cva-extractor.ts1-339](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L339) script analyzes variant definitions to extract CSS classes used by the library.

```
CVA Extractor Process

Class Extraction

Base Classes
First argument strings

Input:
src/core/variants/**/*.ts
All variant definition files

Babel Parser
Parse TypeScript AST

AST Traversal
Find cva() calls

Variant Classes
Object properties

Compound Variants
Nested objects

Deduplication
Set-based uniqueness

Output:
src/lib/core-classes.json
618 unique classes
```

### Extractor Implementation

The `SimpleCVAExtractor` class processes variant files:

1. **File Discovery**: Recursively scans [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) for `.ts` and `.tsx` files

2. **AST Parsing**: Uses `@babel/parser` to parse TypeScript syntax

3. **CVA Detection**: Finds `cva()` function calls via AST traversal

4. **Class Extraction**: Extracts all string literals from:

   - Base classes (first argument)
   - Variant objects (second argument properties)
   - Nested variant definitions

5. **Deduplication**: Uses a `Set<string>` to ensure uniqueness

6. **Output Generation**: Writes JSON array of 618 classes

### Generated Class Whitelist

The extractor produces [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624) with this structure:

```
{
  "classes": [
    "absolute",
    "accent-auto",
    // ... 616 more classes
    "z-auto"
  ],
  "count": 618,
  "timestamp": "2025-10-29T12:17:54.882Z"
}
```

This whitelist serves two purposes:

1. **Tailwind safelist**: Prevents CSS purging from removing classes generated by variants
2. **tw-merge configuration**: Enables safe merging of variant-generated classes

### Component Registry Scanner

The `buildy-ui scan` command generates [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json) by analyzing component files for metadata used by the per-component installation system. See [Component Registry](#3.7) for details.

**Sources:** [scripts/cva-extractor.ts11-279](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L11-L279) [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624) Diagram 2 and Diagram 5 from high-level architecture

---

## Build Artifacts

The build process generates several committed artifacts that bridge build-time and runtime systems.

### Artifact Summary

```
Runtime Usage

Committed Artifacts

Build-Time Generation

produces

produces

produces

npm run build

bun scripts/cva-extractor.ts

npm run scan

dist/
Compiled JS + types
Generated by tsc

src/lib/core-classes.json
618 CSS classes
Generated by CVA extractor

src/registry.json
Component metadata
Generated by buildy-ui

npm install @ui8kit/core
Installs dist/ output

Consumer tailwind.config.js
Uses core-classes.json

npx buildy-ui add button
Uses registry.json
```

### Artifact Details

| Artifact            | Location                    | Generated By       | Purpose                         | Committed |
| ------------------- | --------------------------- | ------------------ | ------------------------------- | --------- |
| Compiled modules    | `dist/**/*.js`              | `tsc`              | Runtime code for NPM package    | Yes       |
| Type declarations   | `dist/**/*.d.ts`            | `tsc`              | TypeScript type information     | Yes       |
| CSS class whitelist | `src/lib/core-classes.json` | `cva-extractor.ts` | Tailwind safelist configuration | Yes       |
| Component registry  | `src/registry.json`         | `buildy-ui scan`   | Per-component installation      | Yes       |

### Why Artifacts Are Committed

Build artifacts are committed to the repository (unlike typical Node.js projects) for several reasons:

1. **Immediate NPM readiness**: The `dist/` directory can be published directly without requiring consumers to run build steps
2. **Submodule compatibility**: Git submodule installations can use the compiled output without build tooling
3. **Whitelist stability**: The `core-classes.json` file serves as a versioned contract for Tailwind configurations
4. **Registry accessibility**: The `registry.json` enables per-component installation without requiring full package installation

**Sources:** [package.json39-43](https://github.com/ui8kit/core/blob/2afe2195/package.json#L39-L43) [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624) Diagram 5 from high-level architecture

---

## Build Workflow Example

A typical development workflow involves running build commands in sequence:

### Full Build Sequence

```
# 1. Extract CVA classes (updates src/lib/core-classes.json)
bun scripts/cva-extractor.ts

# 2. Type-check source code
npm run type-check

# 3. Lint source code
npm run lint

# 4. Compile TypeScript (generates dist/)
npm run build

# 5. Generate component registry
npm run scan

# 6. Publish to NPM (from packages/registry/)
npm run publish
```

### Development Build

For iterative development, run a minimal build:

```
# Quick build for testing
npm run build

# Or just type-check without emitting
npm run type-check
```

### Continuous Integration

A CI/CD pipeline typically runs:

```
npm run lint          # Code quality
npm run type-check    # Type safety
npm run build         # Compilation
```

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L21-L28)

---

## Dependencies and Requirements

The build system requires specific tools and dependencies to function correctly.

### Build-Time Dependencies

| Dependency        | Version   | Purpose                          |
| ----------------- | --------- | -------------------------------- |
| `typescript`      | `^5.6.3`  | TypeScript compiler              |
| `@babel/parser`   | `^7.28.4` | AST parsing for CVA extraction   |
| `@babel/traverse` | `^7.28.4` | AST traversal for CVA extraction |
| `bun-types`       | `^1.1.29` | Type definitions for Bun runtime |

### Runtime Dependencies

These are bundled with the package:

| Dependency                 | Version    | Purpose            |
| -------------------------- | ---------- | ------------------ |
| `class-variance-authority` | `^0.7.1`   | CVA variant engine |
| `clsx`                     | `^2.1.1`   | Class name utility |
| `tailwind-merge`           | `^3.3.1`   | Class name merging |
| `lucide-react`             | `^0.525.0` | Icon components    |
| `react-resizable-panels`   | `^3.0.6`   | Layout resizing    |

### Peer Dependencies

Consumer applications must provide:

| Dependency  | Version Range          | Purpose            |
| ----------- | ---------------------- | ------------------ |
| `react`     | `^18.0.0 \|\| ^19.0.0` | React runtime      |
| `react-dom` | `^18.0.0 \|\| ^19.0.0` | React DOM renderer |

**Sources:** [package.json48-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L66)

---

## Troubleshooting Build Issues

### Common Build Problems

| Issue                    | Cause                    | Solution                                                         |
| ------------------------ | ------------------------ | ---------------------------------------------------------------- |
| `tsc` not found          | TypeScript not installed | Run `npm install` to install dev dependencies                    |
| Type errors during build | Strict type checking     | Fix type errors or temporarily disable with `npm run type-check` |
| Missing `dist/` output   | Build not run            | Run `npm run build` explicitly                                   |
| CVA classes not found    | Whitelist not generated  | Run `bun scripts/cva-extractor.ts`                               |
| Registry out of sync     | Components changed       | Run `npm run scan` to regenerate                                 |

### Verification Steps

To verify a successful build:

```
# 1. Check dist/ exists and contains files
ls -la dist/

# 2. Verify main entry points exist
ls -la dist/index.js dist/index.d.ts

# 3. Check CVA whitelist is up to date
cat src/lib/core-classes.json | grep count

# 4. Verify registry is current
cat src/registry.json | grep version
```

**Sources:** [package.json21-28](https://github.com/ui8kit/core/blob/2afe2195/package.json#L21-L28) [tsconfig.json1-26](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L26)