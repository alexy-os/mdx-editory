---
{
  "title": "Architecture",
  "generatedAt": "2025-11-04T11:57:47.694Z"
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

```
Foundation: Variant System

Layer 1: Core Primitives (Atoms)

Layer 2: UI Components (Molecules)

Layer 3: Layouts (Organisms)

uses

uses

uses

uses

extends

extends

uses

extends

applies

applies

applies

applies

DashLayout

LayoutBlock

SplitBlock

Card + Card.Header/Content/Footer

Button

Badge

Title

Text

Image

Icon

Accordion

Sheet

Group

Container

Block

Box

Grid

Flex

Stack

class-variance-authority

spacingVariants

colorVariants

layoutVariants

typographyVariants

effectsVariants
```

**Sources:** [README.md62-89](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L89) [README.md105-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L168) [src/components/README.md9-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L9-L19)

### Layer 1: Core Primitives

Five fundamental building blocks located in [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) provide direct access to the CVA variant system. These primitives render as semantic HTML elements and serve as the foundation for all higher-level components.

| Primitive | Base Element | Primary Use Case             | Key Props                       |
| --------- | ------------ | ---------------------------- | ------------------------------- |
| `Box`     | `div`        | Generic container            | `component`, all variants       |
| `Block`   | `section`    | Semantic blocks              | `component`, all variants       |
| `Grid`    | `div`        | CSS Grid layouts             | `cols`, `gap`, grid variants    |
| `Flex`    | `div`        | Flexbox layouts              | `direction`, `align`, `justify` |
| `Stack`   | `div`        | Vertical/horizontal stacking | `gap`, `align`, extends Flex    |

**Implementation Details:**

- All primitives support `forwardRef` for DOM access: [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx)
- Polymorphic `component` prop enables semantic HTML tags: [src/core/ui/Block.tsx10-15](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx#L10-L15)
- Direct variant application without intermediate abstraction: [src/core/ui/Box.tsx20-30](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx#L20-L30)

**Sources:** [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103) [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) [src/components/README.md23-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L92)

### Layer 2: UI Components

Fifteen composite components in [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) extend core primitives through prop forwarding. These components add semantic structure, compound patterns, and specialized behavior while inheriting the full variant system.

| Component   | Extends | Compound Parts                              | Special Features                             |
| ----------- | ------- | ------------------------------------------- | -------------------------------------------- |
| `Card`      | `Block` | Header, Content, Footer, Title, Description | Compound component pattern                   |
| `Button`    | `Box`   | -                                           | Loading state, sections (left/right)         |
| `Badge`     | `Box`   | -                                           | Dot indicator, variant system                |
| `Title`     | `Box`   | -                                           | Heading hierarchy (h1-h6)                    |
| `Text`      | `Box`   | -                                           | Semantic text elements (p, span, em, strong) |
| `Container` | `Block` | -                                           | Responsive max-width presets                 |
| `Group`     | `Flex`  | -                                           | Horizontal layout helper                     |
| `Icon`      | `Box`   | -                                           | SVG wrapper with size control                |
| `Image`     | `Box`   | -                                           | Aspect ratio, object-fit                     |
| `Sheet`     | -       | -                                           | Drawer/sheet with transitions                |
| `Accordion` | -       | Item, Trigger, Content                      | Expandable sections                          |

**Prop Forwarding Pattern:**

```
forwards props

imports

Developer JSX
Card p='lg' rounded='xl'

Card component
src/components/ui/Card.tsx

Block primitive
src/core/ui/Block.tsx

spacingVariants
roundedVariants
shadowVariants

class-variance-authority
Resolves variants

Tailwind classes
p-8 rounded-xl
```

**Sources:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) [src/components/README.md94-177](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L94-L177)

### Layer 3: Layouts

Three layout templates in [src/layouts/](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/) orchestrate UI components into application structures. These templates handle complex composition patterns like resizable panels, grid systems, and responsive breakpoints.

| Layout        | Primary Use            | Key Features                      | Dependencies             |
| ------------- | ---------------------- | --------------------------------- | ------------------------ |
| `DashLayout`  | Dashboard applications | Sidebar, header, resizable panels | `react-resizable-panels` |
| `LayoutBlock` | Content sections       | Grid layout, content hooks        | `Grid` primitive         |
| `SplitBlock`  | Two-column layouts     | Responsive split, image/content   | `Container`, `Grid`      |

**Content Hooks Pattern:**

The `LayoutBlock` component demonstrates the content hooks pattern for dynamic rendering:

```
// From src/layouts/LayoutBlock.tsx
interface LayoutBlockProps {
  contentHooks?: {
    beforeContent?: () => React.ReactNode;
    content?: () => React.ReactNode;
    afterContent?: () => React.ReactNode;
  };
}
```

**Sources:** [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168) [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx) [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx) [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)

---

## Architectural Principles

### Atomic Design Alignment

The three-layer structure maps directly to atomic design methodology:

| Layer             | Atomic Design Level | Complexity | Composition                       |
| ----------------- | ------------------- | ---------- | --------------------------------- |
| Layer 1 (Core)    | Atoms               | Minimal    | Direct variant application        |
| Layer 2 (UI)      | Molecules           | Moderate   | Extends atoms, prop forwarding    |
| Layer 3 (Layouts) | Organisms           | Complex    | Composes molecules into templates |

This alignment ensures components are organized by complexity and reusability, making the codebase predictable and maintainable.

**Sources:** [README.md62-79](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L79) [.devin/wiki.json4](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L4-L4)

### Minimalism Philosophy

The library achieves its minimalist goal through three key constraints:

1. **15 composite components** provide 95% coverage of UI needs: [README.md370-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L370-L386)
2. **12 reusable variants** eliminate 80% of custom classes: [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217)
3. **5 core primitives** serve as universal building blocks: [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103)

This constraint-based design reduces bundle size, development time, cognitive load, and CSS complexity.

**Sources:** [README.md388-403](https://github.com/ui8kit/core/blob/2afe2195/README.md#L388-L403) [.devin/wiki.json8-9](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L8-L9)

### Prop Forwarding Pattern

All Layer 2 components inherit variant props from their base primitives through explicit prop forwarding:

```
props

own variants

forwards to

applies

merged with

User Code
Button p='md' rounded='lg' shadow='sm'

Button Component
src/components/ui/Button.tsx

Box Primitive
src/core/ui/Box.tsx

buttonStyleVariants
buttonSizeVariants

spacingVariants
roundedVariants
shadowVariants
```

This pattern enables:

- **Type Safety:** TypeScript validates all forwarded props
- **Variant Inheritance:** Components automatically gain new variants added to primitives
- **Composition Flexibility:** Multiple variant sources combine without conflict

**Sources:** [src/components/README.md9-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L9-L19) [.devin/wiki.json12-13](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L12-L13)

### Semantic HTML and Data Attributes

Every component renders semantic HTML5 elements and includes `data-class` attributes for identification:

| Pattern                 | Purpose                | Example                                                     |
| ----------------------- | ---------------------- | ----------------------------------------------------------- |
| Semantic elements       | Accessibility, SEO     | `<Block component="section">`, `<Block component="nav">`    |
| `data-class` attributes | DOM targeting, testing | `<div data-class="card">`, `<div data-class="card-header">` |
| Polymorphic components  | Flexible element types | `component` prop accepts any valid HTML tag                 |

**Example from Card component:**

```
// src/components/ui/Card.tsx
<Block data-class="card" {...props}>
  {children}
</Block>

// Compound parts also use data-class
<Box data-class="card-header">{children}</Box>
<Box data-class="card-content">{children}</Box>
<Box data-class="card-footer">{children}</Box>
```

**Sources:** [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14) [src/components/README.md223-235](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L235)

---

## Component Relationships and File Structure

### Directory Organization

```
@ui8kit/core/
├── src/
│   ├── core/
│   │   ├── ui/              # Layer 1: 5 primitives
│   │   │   ├── Box.tsx
│   │   │   ├── Block.tsx
│   │   │   ├── Grid.tsx
│   │   │   ├── Flex.tsx
│   │   │   └── Stack.tsx
│   │   └── variants/        # CVA variant definitions
│   │       ├── spacing.ts
│   │       ├── colors.ts
│   │       ├── layout.ts
│   │       ├── typography.ts
│   │       └── effects.ts
│   ├── components/
│   │   └── ui/              # Layer 2: 15 UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── badge.tsx
│   │       └── ...
│   ├── layouts/             # Layer 3: 3 layout templates
│   │   ├── DashLayout.tsx
│   │   ├── LayoutBlock.tsx
│   │   └── SplitBlock.tsx
│   ├── themes/
│   │   └── providers/       # Theme system
│   │       └── ThemeProvider.tsx
│   ├── lib/
│   │   ├── core-classes.json  # Generated class whitelist (618 classes)
│   │   └── utils.ts
│   └── registry.json        # Component metadata
├── dist/                    # Build output (ES2022 modules)
│   ├── index.js
│   └── index.d.ts
└── scripts/
    └── cva-extractor.ts     # Build-time class extraction
```

**Sources:** [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453) [package.json1-50](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L50)

### Component Import and Export Flow

```
tsc compile

npm publish

imports

imports

imports

src/core/ui/
Box, Block, Grid, Flex, Stack

src/core/variants/
12 variant definitions

src/components/ui/
15 composite components

src/layouts/
3 layout templates

src/themes/providers/
ThemeProvider

src/index.ts
Central export file

dist/
index.js + index.d.ts

NPM Registry
@ui8kit/core
```

**Entry Points:**

The main entry point [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) re-exports all public APIs:

```
// Core primitives
export * from './core/ui/Box';
export * from './core/ui/Block';
export * from './core/ui/Grid';
export * from './core/ui/Flex';
export * from './core/ui/Stack';

// UI components
export * from './components/ui/button';
export * from './components/ui/card';
// ... 13 more

// Layouts
export * from './layouts/DashLayout';
export * from './layouts/LayoutBlock';
export * from './layouts/SplitBlock';

// Theme system
export * from './themes/providers/ThemeProvider';

// Variants (optional export for extension)
export * from './core/variants';
```

**Sources:** [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [package.json30-36](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L36)

### Composition Patterns

The library supports five distinct composition patterns for different architectural needs:

```
Pattern 5: Content Hooks

LayoutBlock
contentHooks functions

beforeContent, content, afterContent

Dynamic section rendering

Pattern 4: Layout Composition

DashLayout
sidebar, header, children

Container + Card + Stack

Dashboard structure

Pattern 3: Prop Forwarding

Button p='md' rounded='lg'
+ button-specific props

Merges button variants + core variants

Styled button element

Pattern 2: Compound Components

Card
Card.Header
Card.Content
Card.Footer

Structured card with parts

Pattern 1: Direct Primitive

Block component='form' p='lg'

form element with padding
```

**Pattern Details:**

1. **Direct Primitive:** Use `Box` or `Block` with `component` prop for semantic HTML
2. **Compound Components:** Use structured components like `Card.Header`, enables flexible composition
3. **Prop Forwarding:** Composite components merge their own variants with inherited base variants
4. **Layout Composition:** Templates orchestrate multiple components into application structures
5. **Content Hooks:** Layouts accept render functions for dynamic content injection

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md10-13](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L10-L13) [src/layouts/LayoutBlock.tsx15-22](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L15-L22) [src/layouts/DashLayout.tsx72-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L72-L99)

---

## Variant System Architecture

### CVA Integration

The variant system is powered by `class-variance-authority`, providing type-safe, composable styling utilities. All variants are defined in [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) and applied through core primitives.

**12 Variant Categories:**

| Category   | Variants                                                                         | Values                                               | Purpose                         |
| ---------- | -------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------- |
| Spacing    | `p`, `m`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`  | Padding and margins             |
| Colors     | `bg`, `c`, `borderColor`                                                         | Design system colors                                 | Background, text, border colors |
| Layout     | `w`, `h`, `minH`, `maxW`, `position`                                             | `auto`, `full`, `screen`, `fit`, `min`, `max`        | Width, height, positioning      |
| Typography | `size`, `weight`, `align`, `leading`                                             | Font sizes and weights                               | Text styling                    |
| Effects    | `rounded`, `shadow`, `border`                                                    | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` | Visual enhancements             |
| Display    | `display`                                                                        | `block`, `inline`, `flex`, `grid`, `none`            | Display modes                   |
| Flexbox    | `direction`, `align`, `justify`, `wrap`                                          | Flex properties                                      | Flexbox layouts                 |
| Grid       | `cols`, `rows`, `gap`                                                            | Grid properties                                      | Grid layouts                    |
| Overflow   | `overflow`, `overflowX`, `overflowY`                                             | `auto`, `hidden`, `scroll`, `visible`                | Overflow control                |
| Cursor     | `cursor`                                                                         | `pointer`, `default`, `move`, etc.                   | Cursor styles                   |
| Opacity    | `opacity`                                                                        | `0` to `100`                                         | Transparency                    |
| Z-Index    | `z`                                                                              | `0`, `10`, `20`, `30`, `40`, `50`                    | Stacking order                  |

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/)

### Variant Application Pipeline

```
Component Props
p='lg' rounded='xl' shadow='md'

Imported Variants
spacingVariants
roundedVariants
shadowVariants

CVA Engine
class-variance-authority

Generated Classes
'p-8 rounded-xl shadow-md'

core-classes.json
618-class whitelist

Tailwind CSS Purge
Safelist validation

DOM Output
className attribute
```

**Pipeline Stages:**

1. **Prop Input:** Developer provides variant props (e.g., `p='lg'`)
2. **Variant Resolution:** CVA engine resolves props to Tailwind classes using variant definitions
3. **Class Generation:** Produces className string (e.g., `'p-8 rounded-xl shadow-md'`)
4. **Whitelist Validation:** Generated classes validated against [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json) (618 classes)
5. **Tailwind Processing:** Tailwind CSS applies utility classes, using whitelist as safelist to prevent purging
6. **DOM Output:** Final className applied to rendered element

**Sources:** [README.md98-124](https://github.com/ui8kit/core/blob/2afe2195/README.md#L98-L124) [src/lib/core-classes.json1-619](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L619) [scripts/cva-extractor.ts223-260](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L223-L260)

### Class Whitelist Generation

The build-time `cva-extractor.ts` script scans all variant definitions to generate the class whitelist:

**Extractor Workflow:**

```
scan

generates

writes

imported by

src/core/variants/
*.ts variant definitions

scripts/cva-extractor.ts
Static analysis

Extracted Classes
618 total classes

src/lib/core-classes.json
Committed artifact

tailwind.config.js
safelist configuration
```

**Generated Class Categories:**

- Spacing: `p-0`, `p-1`, `p-2`, ..., `p-96`, `m-0`, `m-1`, ..., `m-96`, `mx-auto`, `my-auto`
- Rounded: `rounded-none`, `rounded-sm`, `rounded-md`, ..., `rounded-full`
- Shadow: `shadow-none`, `shadow-sm`, `shadow-md`, ..., `shadow-2xl`
- Colors: All design system color utilities
- Layout: `w-full`, `w-screen`, `h-full`, `h-screen`, etc.

**Sources:** [scripts/cva-extractor.ts1-260](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L260) [src/lib/core-classes.json617-619](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L617-L619)

---

## Build-Time vs Runtime Architecture

The system maintains strict separation between build-time tooling and runtime code to optimize bundle size and developer experience.

### Build-Time Systems

```
Build Artifacts (Committed)

Build-Time Tools

Source Code
src/

cva-extractor.ts
Extract CSS classes

TypeScript Compiler
tsc -p tsconfig.json

ESLint
Code quality checks

buildy-ui scan
Component metadata

src/lib/core-classes.json
618 classes

dist/index.js
dist/index.d.ts

src/registry.json
Component metadata
```

**Build Commands:**

| Command                        | Tool          | Output              | Purpose                   |
| ------------------------------ | ------------- | ------------------- | ------------------------- |
| `bun scripts/cva-extractor.ts` | Custom script | `core-classes.json` | Extract variant classes   |
| `tsc -p tsconfig.json`         | TypeScript    | `dist/` directory   | Compile to ES2022 modules |
| `eslint src --ext .ts,.tsx`    | ESLint        | Console output      | Code quality validation   |
| `buildy-ui scan`               | buildy-ui CLI | `registry.json`     | Component metadata        |

**Sources:** [scripts/cva-extractor.ts1-260](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L260) [package.json19-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L19-L25)

### Runtime Systems

```
Consumer Application

External Runtime Dependencies

Runtime Systems

dist/index.js
Compiled modules

Core Primitives
Block, Box, Grid, Flex, Stack

Variant System
class-variance-authority

UI Components
15 composite components

Layout Templates
3 layout components

Theme System
ThemeProvider + useTheme

react ^18 | ^19

lucide-react
Icons

react-resizable-panels
Layouts

class-variance-authority
Variant engine

Application Code
import from @ui8kit/core

Tailwind CSS
Utility styling
```

**Runtime Dependencies:**

| Dependency                 | Type   | Usage               | Components       |
| -------------------------- | ------ | ------------------- | ---------------- |
| `react`                    | Peer   | Component framework | All components   |
| `react-dom`                | Peer   | DOM rendering       | All components   |
| `class-variance-authority` | Direct | Variant engine      | Core primitives  |
| `lucide-react`             | Direct | Icons               | Sheet, Accordion |
| `react-resizable-panels`   | Direct | Resizable panels    | DashLayout       |

**Sources:** [package.json42-56](https://github.com/ui8kit/core/blob/2afe2195/package.json#L42-L56) [src/themes/providers/ThemeProvider.tsx1-109](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L109)

---

## Distribution and Module System

### Package Configuration

The [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json) defines multiple entry points and export patterns:

**Main Entry Points:**

```
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./registry.json": "./src/registry.json",
    "./core-classes.json": "./src/lib/core-classes.json"
  }
}
```

**Export Pattern:**

- **Primary export (`.`):** All components, variants, and theme utilities
- **Registry export (`./registry.json`):** Component metadata for tooling
- **Classes export (`./core-classes.json`):** CSS class whitelist for Tailwind config

**Sources:** [package.json30-42](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L42)

### Integration Methods

```
```

**Integration Comparison:**

| Method           | Installation                    | Updates                | Bundle       | Use Case                |
| ---------------- | ------------------------------- | ---------------------- | ------------ | ----------------------- |
| Full NPM install | `npm install @ui8kit/core`      | `npm update`           | Full library | Complete library needed |
| Per-component    | `npx buildy-ui add button card` | Manual re-add          | Minimal      | Bundle optimization     |
| Git submodule    | `git submodule add`             | `git submodule update` | Full source  | Monorepo architecture   |
| Direct source    | Copy files manually             | Manual sync            | Custom       | Custom modifications    |

**Sources:** [README.md252-277](https://github.com/ui8kit/core/blob/2afe2195/README.md#L252-L277) [src/registry.json2-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L244)

### Component Registry Structure

The [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json) file provides metadata for tooling automation:

**Registry Schema:**

```
interface Registry {
  version: string;
  items: ComponentItem[];
}

interface ComponentItem {
  name: string;              // Component identifier
  type: "registry:ui" | "registry:layout";
  description: string;       // Human-readable description
  dependencies?: string[];   // External package dependencies
  registryDependencies?: string[]; // Internal component dependencies
  files: string[];          // Source file paths
  target?: string;          // Installation target directory
}
```

**Example Entry:**

```
{
  "name": "card",
  "type": "registry:ui",
  "description": "Flexible card component with compound parts",
  "dependencies": [],
  "registryDependencies": ["block", "box"],
  "files": ["src/components/ui/card.tsx"],
  "target": "components/ui"
}
```

This metadata enables:

- Per-component installation via `buildy-ui` CLI
- Automatic dependency resolution
- Programmatic component discovery
- Build tool integration

**Sources:** [src/registry.json1-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L244) [README.md251-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L251-L276)

---

## Cross-Cutting Concerns

### TypeScript Configuration

The TypeScript setup balances strict type safety with developer ergonomics:

**Key Settings from [tsconfig.json](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json):**

| Setting          | Value       | Purpose                    |
| ---------------- | ----------- | -------------------------- |
| `target`         | `ES2022`    | Modern JavaScript features |
| `module`         | `ESNext`    | ES module support          |
| `jsx`            | `react-jsx` | React 17+ JSX transform    |
| `strict`         | `true`      | Maximum type safety        |
| `skipLibCheck`   | `true`      | Faster compilation         |
| `declaration`    | `true`      | Generate `.d.ts` files     |
| `declarationMap` | `true`      | Source map for types       |
| `outDir`         | `./dist`    | Build output directory     |

**Path Aliases:**

```
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/core/*": ["./src/core/*"],
    "@/layouts/*": ["./src/layouts/*"]
  }
}
```

For detailed TypeScript configuration, see [TypeScript Configuration](#3.8).

**Sources:** [tsconfig.json1-30](https://github.com/ui8kit/core/blob/2afe2195/tsconfig.json#L1-L30) [package.json19-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L19-L25)

### Theme System

The theme system provides dark mode support with automatic persistence:

**ThemeProvider Architecture:**

```
```

**Usage Pattern:**

```
// Wrap application
import { ThemeProvider, modernUITheme } from '@ui8kit/core';

<ThemeProvider theme={modernUITheme}>
  <App />
</ThemeProvider>

// Access theme in components
import { useTheme } from '@ui8kit/core';

const { isDarkMode, toggleDarkMode } = useTheme();
```

For detailed theme implementation, see [Dark Mode](#5.4).

**Sources:** [src/themes/providers/ThemeProvider.tsx1-109](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L109) [README.md219-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L249)

### Accessibility Features

The library implements accessibility through semantic HTML and ARIA patterns:

**Accessibility Strategies:**

1. **Semantic HTML5 elements:** `<Block component="section">`, `<Block component="nav">`
2. **Heading hierarchy:** `<Title order={1}>` renders `<h1>`, ensuring proper document outline
3. **Keyboard navigation:** Interactive components support Tab, Enter, Space
4. **ARIA attributes:** Accordion and Sheet components include proper ARIA labels
5. **Focus management:** Focus visible states and logical tab order
6. **Color contrast:** Design system colors meet WCAG AA standards

**Sources:** [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/)

---

## Subsection References

This architecture overview provides the foundation for understanding the library's structure. For detailed information on specific subsystems, see the following pages:

- [Core Components](#3.1) - Detailed documentation of the 5 core primitives
- [Variant System](#3.2) - Complete variant definitions and usage patterns
- [UI Components](#3.3) - Extended component implementations and prop forwarding
- [Layouts](#3.4) - Layout template patterns and composition strategies
- [Package Structure](#3.5) - Module exports, entry points, and distribution setup
- [Build System](#3.6) - TypeScript compilation, build scripts, and artifact generation
- [Component Registry](#3.7) - Registry system, metadata format, and tooling integration
- [TypeScript Configuration](#3.8) - Type system setup, path aliases, and compiler options

For API documentation of specific components and their props, see [API Reference](#4).

For development workflows and usage examples, see [Development Guide](#5).

**Sources:** [.devin/wiki.json45-133](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L45-L133) [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453)