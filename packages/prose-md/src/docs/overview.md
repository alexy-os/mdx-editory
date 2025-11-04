---
{
  "title": "Overview",
  "generatedAt": "2025-11-04T11:57:47.204Z"
}
---

# Overview

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

This document introduces `@ui8kit/core`, a minimalist React UI component library built on utility-first Tailwind CSS and semantic HTML5. It covers the design philosophy, architectural layers, component inventory, variant system, and integration methods.

For installation instructions and setup, see [Getting Started](#2).\
For detailed architectural descriptions, see [Architecture](#3).\
For complete API documentation, see [API Reference](#4).

**Sources:** [.devin/wiki.json24-33](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L24-L33) [README.md1-10](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L10)

---

## Purpose and Scope

`@ui8kit/core` is a production-ready React component library designed to enable rapid interface development with minimal code. The library provides 23 total components organized in three architectural layers, styled through 12 composable CVA-based variants that eliminate the need for manual className management in \~80% of use cases.

**Target Audience:** React developers building applications with Tailwind CSS who prioritize:

- Minimal bundle size and code footprint
- Type-safe component APIs with TypeScript
- Semantic HTML5 for accessibility and SEO
- Flexible composition patterns without rigid design constraints

**What This Library Provides:**

- 5 core primitive components (Layer 1) for foundational layouts
- 15 UI composite components (Layer 2) for common interface patterns
- 3 layout template components (Layer 3) for application structures
- 12 reusable variant categories covering spacing, colors, layout, typography, and effects
- Multiple integration methods: NPM package, per-component installation, git submodule, direct source

**What This Library Does Not Provide:**

- Opinionated design system with fixed visual style
- Form validation or state management
- Animation framework
- Icon library (depends on `lucide-react` for icons in specific components)

**Sources:** [package.json1-20](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L20) [README.md3-19](https://github.com/ui8kit/core/blob/2afe2195/README.md#L3-L19) [.devin/wiki.json2-10](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L2-L10)

---

## Design Philosophy

The library is built on the principle of **minimal code with maximum flexibility**. Complex interfaces emerge from composing a small set of primitives rather than assembling dozens of specialized components.

### Core Principles

| Principle                 | Implementation                                               | Benefit                                    |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------ |
| **Minimalism**            | 15 UI components vs. 50+ in typical libraries                | Reduced bundle size, faster learning curve |
| **80/20 Coverage**        | 12 variants cover \~80% of styling needs                     | Eliminates most manual className usage     |
| **Composability**         | Primitives combine to create unlimited designs               | No rigid design constraints                |
| **Type Safety**           | Full TypeScript support with prop interfaces                 | Prevents runtime prop errors               |
| **Semantic HTML**         | Components render as `<section>`, `<article>`, `<nav>`, etc. | Better accessibility and SEO               |
| **Zero Runtime Overhead** | CVA generates static Tailwind classes at build time          | No runtime style calculation               |

### Minimalism in Practice

The library achieves interface complexity through composition rather than component proliferation:

```
// Traditional approach: specialized form components
<Form>
  <FormField>
    <FormLabel>Email</FormLabel>
    <FormInput type="email" />
    <FormError>Invalid email</FormError>
  </FormField>
</Form>

// @ui8kit/core approach: compose primitives
<Block component="form" p="lg" rounded="md" bg="card">
  <Stack gap="md">
    <Box>
      <Text weight="medium" mb="xs">Email</Text>
      <Box component="input" type="email" w="full" border="1px solid border" />
      <Text size="sm" c="destructive">Invalid email</Text>
    </Box>
  </Stack>
</Block>
```

Both achieve the same result, but the primitive approach:

- Eliminates 4 specialized components from the bundle
- Provides full styling control through variants
- Maintains semantic HTML with `component="form"` and `component="input"`
- Requires no additional component learning curve

**Sources:** [README.md388-403](https://github.com/ui8kit/core/blob/2afe2195/README.md#L388-L403) [.devin/wiki.json7-10](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L7-L10) [src/components/GUIDE\_CREATE\_FORM.md1-100](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L1-L100)

---

## Component Architecture

```
Variant System (src/core/variants/)

Layer 1: Core Primitives (src/core/ui/)

Layer 2: UI Components (src/components/ui/)

Layer 3: Layout Templates (src/layouts/)

uses

uses

uses

extends

extends

uses

applies

applies

applies

prop forwarding

prop forwarding

DashLayout.tsx
Dashboard with sidebar/header

LayoutBlock.tsx
Content sections

SplitBlock.tsx
Two-column layouts

button.tsx
Action buttons

card.tsx
+ Card.Header/Content/Footer

text.tsx
Semantic text

title.tsx
h1-h6 headings

badge.tsx
Labels

icon.tsx
SVG wrapper

image.tsx
Optimized images

container.tsx
Max-width container

group.tsx
Element grouping

sheet.tsx
Drawer component

accordion.tsx
Expandable sections

Block.tsx
Semantic container

Box.tsx
Flexible primitive

Grid.tsx
CSS Grid layout

Flex.tsx
Flexbox layout

Stack.tsx
Vertical/horizontal stacking

spacing-variants.ts
p, m, px, py, mx, my, etc.

color-variants.ts
bg, c, borderColor

layout-variants.ts
w, h, position

typography-variants.ts
size, weight, align

effect-variants.ts
shadow, rounded, border
```

**Architecture: Three-Layer Component Hierarchy**

The library implements a strict three-layer hierarchy aligned with atomic design principles:

### Layer 1: Core Primitives (`src/core/ui/`)

Five foundational components that directly apply the variant system:

| Component | File        | Purpose                                                | Variants Applied         |
| --------- | ----------- | ------------------------------------------------------ | ------------------------ |
| `Block`   | `Block.tsx` | Semantic container (`section`, `article`, `nav`, etc.) | All 12 variants          |
| `Box`     | `Box.tsx`   | Generic flexible primitive (any HTML element)          | All 12 variants          |
| `Grid`    | `Grid.tsx`  | CSS Grid layout with `cols` and `rows` props           | Spacing, layout variants |
| `Flex`    | `Flex.tsx`  | Flexbox layout with `direction` and `justify` props    | Spacing, layout variants |
| `Stack`   | `Stack.tsx` | Vertical/horizontal stacking with `gap` prop           | Spacing variants         |

These primitives provide the foundation for all higher-layer components. They render semantic HTML5 elements and accept variant props directly.

### Layer 2: UI Components (`src/components/ui/`)

Fifteen composite components that extend primitives through prop forwarding:

| Component   | File            | Base Primitive | Special Features                                       |
| ----------- | --------------- | -------------- | ------------------------------------------------------ |
| `Button`    | `button.tsx`    | `Box`          | `variant`, `size`, `leftSection`, `rightSection`       |
| `Card`      | `card.tsx`      | `Block`        | Compound: `Card.Header`, `Card.Content`, `Card.Footer` |
| `Text`      | `text.tsx`      | `Box`          | Semantic tags: `p`, `span`, `em`, `strong`             |
| `Title`     | `title.tsx`     | `Box`          | Heading hierarchy: `h1`-`h6` via `order` prop          |
| `Badge`     | `badge.tsx`     | `Box`          | Small label with `variant`                             |
| `Icon`      | `icon.tsx`      | `Box`          | SVG wrapper with size control                          |
| `Image`     | `image.tsx`     | `Box`          | Optimized with `alt` and `loading` props               |
| `Container` | `container.tsx` | `Block`        | Responsive max-width: `sm`, `md`, `lg`, `xl`, `2xl`    |
| `Group`     | `group.tsx`     | `Flex`         | Element grouping with `gap`                            |
| `Sheet`     | `sheet.tsx`     | N/A            | Drawer with `side` prop (uses `lucide-react`)          |
| `Accordion` | `accordion.tsx` | N/A            | Expandable sections (uses `lucide-react`)              |

These components inherit all variant props from their base primitives while adding component-specific props.

### Layer 3: Layout Templates (`src/layouts/`)

Three template components that orchestrate Layer 2 components into application structures:

| Component     | File              | Purpose                                                             | Dependencies             |
| ------------- | ----------------- | ------------------------------------------------------------------- | ------------------------ |
| `DashLayout`  | `DashLayout.tsx`  | Dashboard with resizable sidebar, header, content                   | `react-resizable-panels` |
| `LayoutBlock` | `LayoutBlock.tsx` | Content section with `beforeContent`/`content`/`afterContent` hooks | `Grid`                   |
| `SplitBlock`  | `SplitBlock.tsx`  | Two-column layout (media + content or content + media)              | `Container`              |

**Sources:** [README.md62-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L168) [src/core/ui/Block.tsx1-50](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx#L1-L50) [src/core/ui/Box.tsx1-40](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx#L1-L40) [src/components/ui/button.tsx1-100](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/button.tsx#L1-L100) [src/components/ui/card.tsx1-150](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/card.tsx#L1-L150) [src/layouts/DashLayout.tsx1-100](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L100)

---

## Variant System Overview

```
Output

Build Artifact

CVA Engine

Variant Files (src/core/variants/)

Developer API

generates

generates

safelist for

Component JSX
p='lg' rounded='xl'
shadow='md' bg='card'

spacing-variants.ts
spacingVariants

color-variants.ts
colorVariants

layout-variants.ts
layoutVariants

typography-variants.ts
typographyVariants

effect-variants.ts
effectVariants

class-variance-authority
cva() function

Generated Classes
p-8 rounded-xl shadow-md
bg-card

src/lib/core-classes.json
618 class whitelist

HTML Element
with Tailwind classes

Tailwind CSS Purge
```

**Variant System: CVA-Based Styling Pipeline**

The variant system centralizes all styling logic through 12 composable variant categories, eliminating the need for manual `className` management in most scenarios.

### Variant Categories

| Category       | Props                                                                            | Values                                                                                      | File                          |
| -------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------- |
| **Spacing**    | `p`, `m`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`                                         | `spacing-variants.ts`         |
| **Colors**     | `bg`, `c`, `borderColor`                                                         | Design system colors: `primary`, `secondary`, `destructive`, `card`, `foreground`, etc.     | `color-variants.ts`           |
| **Layout**     | `w`, `h`, `minH`, `maxW`, `position`                                             | `auto`, `full`, `screen`, `fit`, `min`, `max`                                               | `layout-variants.ts`          |
| **Typography** | `size`, `weight`, `align`, `leading`                                             | Font sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`; weights: `normal`, `medium`, `bold` | `typography-variants.ts`      |
| **Effects**    | `rounded`, `shadow`, `border`                                                    | Corner radius, shadow depth, border styles                                                  | `effect-variants.ts`          |
| **Flexbox**    | `direction`, `justify`, `items`, `wrap`, `gap`                                   | Flexbox properties                                                                          | Integrated in layout variants |
| **Grid**       | `cols`, `rows`, `gap`                                                            | CSS Grid properties                                                                         | Integrated in layout variants |

### Variant Application Flow

1. **Developer writes variant props** in JSX: `<Card p="lg" rounded="xl" shadow="md" bg="card" />`
2. **CVA engine resolves props** to Tailwind classes via `cva()` function from `class-variance-authority`
3. **Generated classes** output: `p-8 rounded-xl shadow-md bg-card`
4. **Whitelist validation** ensures Tailwind purge doesn't remove necessary classes (618 classes in `core-classes.json`)
5. **DOM renders** with final class string applied

### Build-Time Class Extraction

The `scripts/cva-extractor.ts` script scans all variant files and generates `src/lib/core-classes.json`:

```
{
  "classes": [
    "p-0", "p-1", "p-2", "p-4", "p-6", "p-8", "p-12", "p-16",
    "m-0", "m-1", "m-2", "m-4", "m-6", "m-8", "m-12", "m-16",
    "bg-primary", "bg-secondary", "bg-card", "bg-background",
    "rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl",
    // ... 618 total classes
  ]
}
```

This whitelist serves two purposes:

- **Tailwind safelist** - prevents CSS purge from removing variant classes
- **tw-merge safety** - ensures class merging works correctly

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [src/core/variants/spacing-variants.ts1-100](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/spacing-variants.ts#L1-L100) [src/core/variants/color-variants.ts1-80](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/color-variants.ts#L1-L80) [scripts/cva-extractor.ts1-260](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L260) [src/lib/core-classes.json1-619](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L619)

---

## Technology Stack

### Core Dependencies

| Package                    | Version                | Purpose             | Usage                                      |
| -------------------------- | ---------------------- | ------------------- | ------------------------------------------ |
| `react`                    | `^18.0.0` or `^19.0.0` | UI framework        | Peer dependency (provided by consumer)     |
| `react-dom`                | `^18.0.0` or `^19.0.0` | React rendering     | Peer dependency (provided by consumer)     |
| `class-variance-authority` | `^0.7.1`               | Variant engine      | Powers the 12 variant categories           |
| `clsx`                     | `^2.1.1`               | Class concatenation | Utility for merging class strings          |
| `tailwind-merge`           | `^3.3.1`               | Class deduplication | Prevents duplicate Tailwind classes        |
| `lucide-react`             | `^0.525.0`             | Icon library        | Used in `Sheet` and `Accordion` components |
| `react-resizable-panels`   | `^3.0.6`               | Resizable layouts   | Used in `DashLayout` for sidebar resizing  |

### Build Tools

| Tool               | Purpose                       | Configuration                           |
| ------------------ | ----------------------------- | --------------------------------------- |
| TypeScript         | Type checking and compilation | `tsconfig.json` with `ES2022` target    |
| ESLint             | Code quality                  | `.eslintrc` with TypeScript rules       |
| Bun                | Package manager and runtime   | `bun-types` for TypeScript support      |
| `cva-extractor.ts` | Build-time class extraction   | Generates `core-classes.json` whitelist |
| `buildy-ui` CLI    | Component registry scanner    | Generates `registry.json` metadata      |

### Distribution Format

The library distributes as ES2022 modules with TypeScript declarations:

| Artifact           | Path                        | Purpose                                 |
| ------------------ | --------------------------- | --------------------------------------- |
| Main entry         | `dist/index.js`             | ES2022 module exports                   |
| Type definitions   | `dist/index.d.ts`           | TypeScript interface declarations       |
| Class whitelist    | `src/lib/core-classes.json` | Tailwind safelist (618 classes)         |
| Component registry | `src/registry.json`         | Metadata for per-component installation |

**Export Configuration** in [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37):

```
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  }
}
```

**Sources:** [package.json48-69](https://github.com/ui8kit/core/blob/2afe2195/package.json#L48-L69) [package.json30-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L37) [README.md422-440](https://github.com/ui8kit/core/blob/2afe2195/README.md#L422-L440)

---

## Integration Methods

```
Integration Method 5: Programmatic

Integration Method 4: Direct Source

Integration Method 3: Git Submodule

Integration Method 2: Per-Component

Integration Method 1: Full Library

Distribution Channels

Source Repository

github.com/ui8kit/core

src/registry.json
Component metadata

NPM Registry
@ui8kit/Unsupported markdown: link

Git Repository
main branch

npm install @ui8kit/core

import { Button, Card } from '@ui8kit/core'

npx buildy-ui add button card

components/ui/button.tsx
components/ui/card.tsx

git submodule add
Unsupported markdown: link
packages/@ui8kit/core

import { Button } from '@ui8kit/core'

Copy src/ directory

Custom build process

import registry from
'@ui8kit/core/registry.json'

Tooling automation
```

**Integration Methods: Five Approaches**

The library supports five distinct integration methods to accommodate different development workflows:

### Method 1: Full Library Installation (NPM)

**Use Case:** Standard application development with all components available

```
npm install @ui8kit/core react react-dom
```

**Imports:**

```
import { Button, Card, Text, Stack, Grid } from '@ui8kit/core';
```

**Bundle Size:** Full library (\~15 UI components + 3 layouts + 5 primitives)

**Advantages:**

- Single dependency declaration
- All components immediately available
- Automatic updates via `npm update`

**Sources:** [README.md21-34](https://github.com/ui8kit/core/blob/2afe2195/README.md#L21-L34) [package.json2-3](https://github.com/ui8kit/core/blob/2afe2195/package.json#L2-L3)

---

### Method 2: Per-Component Installation (buildy-ui CLI)

**Use Case:** Bundle optimization, progressive adoption, microservices

```
npx buildy-ui add button card text
```

**Result:** Copies component files to `components/ui/` directory

```
components/
└── ui/
    ├── button.tsx
    ├── card.tsx
    └── text.tsx
```

**Imports:**

```
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

**Advantages:**

- Minimal bundle size (only installed components)
- No dependency on full library
- Full source code control

**Registry Metadata** in [src/registry.json1-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L244):

```
{
  "name": "button",
  "type": "registry:ui",
  "dependencies": ["class-variance-authority"],
  "files": [
    {
      "path": "components/ui/button.tsx",
      "type": "registry:ui"
    }
  ]
}
```

**Sources:** [README.md252-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L252-L276) [src/registry.json1-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L244)

---

### Method 3: Git Submodule (Monorepo)

**Use Case:** Monorepo architectures, shared component libraries across projects

```
git submodule add https://github.com/ui8kit/core.git packages/@ui8kit/core
```

**TypeScript Configuration:**

```
{
  "compilerOptions": {
    "paths": {
      "@ui8kit/core": ["./packages/@ui8kit/core/src"]
    }
  }
}
```

**Advantages:**

- Direct source access
- Version pinning via git commits
- Shared across monorepo packages
- Local modifications possible

**Sources:** [SUBMODULE\_GUIDE.md1-300](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L1-L300) (referenced in diagrams)

---

### Method 4: Direct Source Integration

**Use Case:** Custom builds, heavily modified components, embedded systems

**Process:**

1. Copy `src/` directory to project
2. Adjust import paths
3. Customize components as needed
4. Build with project's TypeScript compiler

**Advantages:**

- Complete control over source code
- No external dependencies
- Custom compilation targets
- Remove unused components

---

### Method 5: Programmatic Registry Access

**Use Case:** Build tooling, component documentation generators, automated testing

```
import registry from '@ui8kit/core/registry.json';

// Iterate all components
registry.items.forEach(component => {
  console.log(`${component.name}: ${component.description}`);
  console.log(`Type: ${component.type}`);
  console.log(`Dependencies:`, component.dependencies);
});
```

**Registry Structure:**

```
{
  "name": "@ui8kit/core",
  "version": "1.0.0",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "description": "Action button component",
      "dependencies": ["class-variance-authority"],
      "files": [...]
    }
  ]
}
```

**Advantages:**

- Automate component discovery
- Generate documentation
- Build custom CLI tools
- Validate component metadata

**Sources:** [README.md267-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L267-L276) [src/registry.json1-10](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L1-L10)

---

## Component Inventory

### Complete Component List

| Layer                        | Component Count | Components                                                                                              |
| ---------------------------- | --------------- | ------------------------------------------------------------------------------------------------------- |
| **Layer 1: Core Primitives** | 5               | `Block`, `Box`, `Grid`, `Flex`, `Stack`                                                                 |
| **Layer 2: UI Components**   | 15              | `Button`, `Card`, `Text`, `Title`, `Container`, `Icon`, `Image`, `Badge`, `Group`, `Sheet`, `Accordion` |
| **Layer 3: Layouts**         | 3               | `DashLayout`, `LayoutBlock`, `SplitBlock`                                                               |
| **Total**                    | **23**          | -                                                                                                       |

### Component Distribution by Type

| Category        | Count | Purpose                                                           |
| --------------- | ----- | ----------------------------------------------------------------- |
| **Primitives**  | 5     | Foundation for all layouts and components                         |
| **Content**     | 5     | Text, titles, images, icons, badges                               |
| **Containers**  | 3     | Cards, groups, containers                                         |
| **Interactive** | 2     | Buttons, sheets                                                   |
| **Collapsible** | 1     | Accordion                                                         |
| **Layouts**     | 7     | Grid, Flex, Stack, DashLayout, LayoutBlock, SplitBlock, Container |

### Variant Coverage Statistics

| Coverage Area      | Percentage | Variants Involved                      |
| ------------------ | ---------- | -------------------------------------- |
| **Spacing**        | 30%        | 16 props (p, m, px, py, etc.)          |
| **Colors**         | 20%        | 3 props (bg, c, borderColor)           |
| **Layout**         | 20%        | 5 props (w, h, minH, maxW, position)   |
| **Typography**     | 15%        | 4 props (size, weight, align, leading) |
| **Effects**        | 15%        | 3 props (rounded, shadow, border)      |
| **Total Coverage** | **\~80%**  | **12 variant categories**              |

**Sources:** [README.md361-387](https://github.com/ui8kit/core/blob/2afe2195/README.md#L361-L387) [README.md388-403](https://github.com/ui8kit/core/blob/2afe2195/README.md#L388-L403)

---

## Key Features Summary

### Type Safety and Developer Experience

| Feature                     | Implementation                                         | Benefit                                      |
| --------------------------- | ------------------------------------------------------ | -------------------------------------------- |
| **Full TypeScript Support** | All components with precise prop interfaces            | Prevents runtime errors, IDE autocomplete    |
| **Prop Forwarding**         | Extended components inherit base props                 | Consistent API, reduced learning curve       |
| **Semantic HTML**           | Components render as `section`, `article`, `nav`, etc. | Better accessibility (WCAG), improved SEO    |
| **Data Attributes**         | All components include `data-class` attribute          | Consistent DOM targeting for testing/styling |
| **ForwardRef Pattern**      | All components support `ref` forwarding                | Direct DOM access when needed                |

### Performance and Bundle Size

| Optimization              | Implementation                             | Benefit                               |
| ------------------------- | ------------------------------------------ | ------------------------------------- |
| **Zero Runtime Overhead** | CVA generates static classes at build time | No style calculation at runtime       |
| **Tree Shaking**          | ES2022 modules with `sideEffects: false`   | Unused components removed by bundlers |
| **Minimal Dependencies**  | Only 5 core dependencies                   | Smaller bundle size                   |
| **Class Whitelist**       | 618 classes in `core-classes.json`         | Tailwind purge safety                 |
| **Per-Component Install** | Via `buildy-ui add` command                | Install only what you need            |

### Design Flexibility

| Capability                  | Implementation                                    | Benefit                            |
| --------------------------- | ------------------------------------------------- | ---------------------------------- |
| **Composable Architecture** | Primitives combine into unlimited designs         | No rigid design constraints        |
| **Variant System**          | 12 reusable categories                            | \~80% of styling without className |
| **Compound Components**     | `Card.Header`, `Card.Content`, `Card.Footer`      | Flexible composition patterns      |
| **Dark Mode**               | `ThemeProvider` with persistence                  | Built-in theme support             |
| **Responsive Design**       | Tailwind responsive prefixes work on all variants | Mobile-first layouts               |

**Sources:** [README.md9-19](https://github.com/ui8kit/core/blob/2afe2195/README.md#L9-L19) [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30) [src/themes/providers/ThemeProvider.tsx1-109](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L109)

---

## Getting Started

To begin using `@ui8kit/core`, proceed to [Getting Started](#2) for installation instructions and basic configuration examples.

For detailed architectural documentation, see [Architecture](#3).\
For component API reference, see [API Reference](#4).\
For development patterns and best practices, see [Development Guide](#5).

**Sources:** [.devin/wiki.json35-43](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L35-L43) [README.md21-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L21-L60)