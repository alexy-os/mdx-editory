---
{
  "title": "Development Guide",
  "generatedAt": "2025-11-04T11:57:50.093Z"
}
---

# Development Guide

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

This guide provides practical workflows for developers working with `@ui8kit/core`. It covers component selection strategies, variant system usage patterns, architectural layer navigation, and integration approaches. This page serves as an entry point to understanding how to effectively use the library in different development scenarios.

For detailed step-by-step examples, see [Basic Workflow](#5.1). For handling edge cases and custom implementations, see [Advanced Workflow](#5.2). For general recommendations, see [Best Practices](#5.3). For theme configuration, see [Dark Mode](#5.4).

---

## Development Workflow Overview

The library supports three primary development approaches based on architectural layers:

### Layer-Based Development Model

```
Styling Layer

Layer 1: Core Primitives

Layer 2: UI Components

Layer 3: Layouts

Decision Tree

Yes

No

Yes

No

Yes

Development Start

Need custom layout structure?

Need pre-styled component?

Need basic primitive?

Use Layout Components

Use Composite Components

Use Core Primitives

DashLayout
src/layouts/DashLayout.tsx

LayoutBlock
src/layouts/LayoutBlock.tsx

SplitBlock
src/layouts/SplitBlock.tsx

Button
src/components/ui/Button.tsx

Card + Card.Header/Content/Footer
src/components/ui/Card.tsx

Accordion
src/components/ui/Accordion.tsx

Sheet
src/components/ui/Sheet.tsx

Box
src/core/ui/Box.tsx

Block
src/core/ui/Block.tsx

Grid
src/core/ui/Grid.tsx

Flex
src/core/ui/Flex.tsx

Stack
src/core/ui/Stack.tsx

Apply CVA Variants
src/core/variants/

spacingVariants

colorVariants

layoutVariants

typographyVariants

effectsVariants
```

**Sources**: [README.md64-169](https://github.com/ui8kit/core/blob/2afe2195/README.md#L64-L169) [.devin/wiki.json4-5](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L4-L5)

---

## Component Selection Guide

### When to Use Each Layer

| Scenario                      | Layer   | Component Choice | Example Use Case                                   |
| ----------------------------- | ------- | ---------------- | -------------------------------------------------- |
| **Dashboard application**     | Layer 3 | `DashLayout`     | Admin panel with sidebar, header, resizable panels |
| **Content section with grid** | Layer 3 | `LayoutBlock`    | Landing page sections with multiple content blocks |
| **Two-column split**          | Layer 3 | `SplitBlock`     | Feature comparison, image + text layouts           |
| **Action button**             | Layer 2 | `Button`         | Form submit, navigation, CTAs                      |
| **Content card**              | Layer 2 | `Card`           | Product cards, blog posts, user profiles           |
| **Collapsible sections**      | Layer 2 | `Accordion`      | FAQ, settings panels                               |
| **Side drawer**               | Layer 2 | `Sheet`          | Mobile menu, filters, notifications                |
| **Custom form**               | Layer 1 | `Block` + `Box`  | Form elements when UI components insufficient      |
| **Generic container**         | Layer 1 | `Box`            | Wrapper with specific styling needs                |
| **CSS Grid layout**           | Layer 1 | `Grid`           | Photo galleries, product grids                     |
| **Flexbox layout**            | Layer 1 | `Flex`           | Navigation bars, toolbars                          |
| **Vertical/horizontal stack** | Layer 1 | `Stack`          | Form fields, button groups                         |

**Sources**: [README.md80-169](https://github.com/ui8kit/core/blob/2afe2195/README.md#L80-L169) [.devin/wiki.json7-13](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L7-L13)

---

## Variant System Application

### Variant Flow in Development

```
Component Application

Runtime Processing

Variant Categories

Developer Workflow

Write JSX with variant props

Select from 12 variant categories

TypeScript validates props

Spacing: p, m, px, py, mx, my, etc.
src/core/variants/spacingVariants.ts

Colors: bg, c, borderColor
src/core/variants/colorVariants.ts

Layout: w, h, minH, maxW, position
src/core/variants/layoutVariants.ts

Typography: size, weight, align, leading
src/core/variants/typographyVariants.ts

Effects: rounded, shadow, border
src/core/variants/effectsVariants.ts

class-variance-authority
resolves variants

Generated Tailwind classes

core-classes.json
618 class whitelist
src/lib/core-classes.json

Core Primitives
Direct variant application

Composite Components
Prop forwarding

Rendered DOM
with data-class attributes
```

**Sources**: [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [.devin/wiki.json19-21](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L21)

---

## Common Development Patterns

### Pattern 1: Using Primitives Directly

For basic layout needs, use core primitives with variants:

```
import { Box, Stack } from '@ui8kit/core';

// Simple container with variants
<Box p="lg" bg="card" rounded="xl" shadow="md">
  <Stack gap="md">
    {/* content */}
  </Stack>
</Box>
```

**When to use**: Custom layouts, simple wrappers, form structures.

**Component files**: [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [src/core/ui/Stack.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Stack.tsx)

---

### Pattern 2: Using Composite Components

For pre-styled UI elements, use Layer 2 components:

```
import { Button, Card } from '@ui8kit/core';

// Composite with compound parts
<Card p="lg" shadow="md">
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>
    Content
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

**When to use**: Standard UI patterns, consistent styling across app.

**Component files**: [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx)

---

### Pattern 3: Using Layout Templates

For application structure, use Layer 3 layouts:

```
import { DashLayout, Container } from '@ui8kit/core';

// Dashboard template
<DashLayout 
  sidebar={<Sidebar />}
  header={<Header />}
>
  <Container>
    {/* main content */}
  </Container>
</DashLayout>
```

**When to use**: Dashboard apps, admin panels, complex multi-section pages.

**Component files**: [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx) [src/components/ui/Container.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Container.tsx)

---

### Pattern 4: Prop Forwarding with Variants

Composite components inherit variant props from primitives:

```
import { Button } from '@ui8kit/core';

// Button extends Box, inherits all variant props
<Button 
  variant="primary"
  size="md"
  p="lg"           // spacing variant from Box
  rounded="xl"     // effects variant from Box
  shadow="sm"      // effects variant from Box
>
  Submit
</Button>
```

**When to use**: Need additional styling beyond component defaults.

**Component files**: [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx)

---

### Pattern 5: Content Hooks in Layouts

Layouts support dynamic content injection:

```
import { LayoutBlock } from '@ui8kit/core';

<LayoutBlock
  layout="grid"
  contentHooks={{
    beforeContent: () => <Header />,
    content: () => <MainContent />,
    afterContent: () => <Footer />
  }}
/>
```

**When to use**: Flexible content sections, dynamic layouts.

**Component files**: [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)

**Sources**: [README.md36-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L36-L60) [README.md278-338](https://github.com/ui8kit/core/blob/2afe2195/README.md#L278-L338)

---

## Integration Approaches

### Installation Method Selection

```
Method 4: Direct Source

Method 3: Git Submodule

Method 2: Per-Component Install

Method 1: Full NPM Install

Decision Factors

Yes

No

Yes

No

Yes

No

Yes

No

Select Integration Method

Need entire library?

Bundle size critical?

Monorepo architecture?

Custom build required?

npm install @ui8kit/core

Import all 18 components

Uses dist/index.js
ES2022 modules

npx buildy-ui add button card

Reads registry.json metadata

Copies specific files to
components/ui/ or layouts/

git submodule add
Unsupported markdown: link

packages/@ui8kit/core

Import from submodule path

Copy src/ directory

Custom TypeScript build

Full control over compilation
```

**Sources**: [README.md252-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L252-L276) [.devin/wiki.json15-17](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L15-L17) [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json)

---

## Development Environment Setup

### Required Dependencies

| Dependency                 | Type   | Purpose                       | Installation                          |
| -------------------------- | ------ | ----------------------------- | ------------------------------------- |
| `react`                    | Peer   | React framework               | `npm install react@^18` or `@^19`     |
| `react-dom`                | Peer   | React DOM rendering           | `npm install react-dom@^18` or `@^19` |
| `tailwindcss`              | Dev    | Utility-first CSS             | `npm install -D tailwindcss`          |
| `class-variance-authority` | Direct | Variant engine                | Included with `@ui8kit/core`          |
| `lucide-react`             | Direct | Icons (Sheet, Accordion)      | Included with `@ui8kit/core`          |
| `react-resizable-panels`   | Direct | Resizable panels (DashLayout) | Included with `@ui8kit/core`          |

**Sources**: [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json) [README.md22-34](https://github.com/ui8kit/core/blob/2afe2195/README.md#L22-L34)

---

### Tailwind Configuration

Configure Tailwind to process library classes:

```
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@ui8kit/core/dist/**/*.js',
  ],
  darkMode: 'class',
  safelist: [
    // Include core-classes.json if needed
  ],
};
```

Import the whitelist for safelist configuration:

```
const coreClasses = require('@ui8kit/core/src/lib/core-classes.json');

module.exports = {
  safelist: coreClasses,
};
```

**Configuration files**: [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json)

**Sources**: [README.md29-34](https://github.com/ui8kit/core/blob/2afe2195/README.md#L29-L34) [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json)

---

## Component Lifecycle in Development

### From Selection to Rendering

```
Runtime Phase

Build Phase

Development Phase

Variant props

Type safety

Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
Unsupported markdown: list
```

**Sources**: [README.md422-440](https://github.com/ui8kit/core/blob/2afe2195/README.md#L422-L440) [.devin/wiki.json4-5](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L4-L5)

---

## Working with Data-Class Attributes

All components use `data-class` attributes for consistent DOM targeting:

### Component Identification Pattern

```
// Card component renders with data-class
<Card p="lg">
  {/* Renders as: */}
  {/* <div data-class="card" class="p-8">...</div> */}
</Card>

// Compound components maintain hierarchy
<Card.Header>
  {/* Renders as: */}
  {/* <div data-class="card-header">...</div> */}
</Card.Header>
```

### Usage in Testing/Automation

```
// Query by data-class in tests
const card = screen.getByTestId('[data-class="card"]');
const header = screen.getByTestId('[data-class="card-header"]');

// CSS selectors
[data-class="card"] { /* styles */ }
[data-class="button"][data-variant="primary"] { /* styles */ }
```

**Component files**: [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx)

**Sources**: [.devin/wiki.json11-13](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L13)

---

## ForwardRef Pattern Usage

Components use `forwardRef` for ref access to underlying DOM elements:

### Ref Access in Development

```
import { Button, Box } from '@ui8kit/core';
import { useRef } from 'react';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    buttonRef.current?.focus();
    boxRef.current?.scrollIntoView();
  };
  
  return (
    <>
      <Button ref={buttonRef}>Focus me</Button>
      <Box ref={boxRef}>Scroll to me</Box>
    </>
  );
}
```

**When to use refs**: Form field management, scroll control, focus management, DOM measurements.

**Component files**: [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx) [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx)

**Sources**: [README.md11-19](https://github.com/ui8kit/core/blob/2afe2195/README.md#L11-L19)

---

## Type Safety in Development

### TypeScript Integration

All components provide full type definitions:

```
import type { ButtonProps, CardProps } from '@ui8kit/core';

// Type-safe prop definitions
interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

// Variant prop types are inferred
<Button 
  variant="primary"  // ✓ Type-safe: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size="md"          // ✓ Type-safe: 'sm' | 'md' | 'lg'
  p="lg"             // ✓ Type-safe: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
>
  Submit
</Button>
```

**Type definition files**: Generated in [dist/index.d.ts](https://github.com/ui8kit/core/blob/2afe2195/dist/index.d.ts) from TypeScript compilation.

**Sources**: [README.md12](https://github.com/ui8kit/core/blob/2afe2195/README.md#L12-L12) [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

---

## Next Steps

For detailed development workflows:

- **[Basic Workflow](#5.1)** - Step-by-step patterns for common scenarios
- **[Advanced Workflow](#5.2)** - Custom forms and edge case handling
- **[Best Practices](#5.3)** - Performance, accessibility, and code organization
- **[Dark Mode](#5.4)** - Theme provider configuration and usage

For architectural details, see [Architecture](#3). For complete API documentation, see [API Reference](#4).

**Sources**: [.devin/wiki.json170-219](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L170-L219)