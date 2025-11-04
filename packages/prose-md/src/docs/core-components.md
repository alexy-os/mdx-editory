---
{
  "title": "Core Components",
  "generatedAt": "2025-11-04T11:57:47.850Z"
}
---

# Core Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/components/ui/Block/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx)
- [src/components/ui/Box/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts)

## Purpose and Scope

This document covers the five foundational primitives in Layer 1 of the architecture: `Block`, `Box`, `Grid`, `Flex`, and `Stack`. These components serve as the building blocks for all higher-level UI components and layouts in the library. They provide direct access to the CVA variant system and implement fundamental React patterns including `forwardRef`, TypeScript type composition, and HTML attribute forwarding.

For documentation on composite components that extend these primitives (Button, Card, etc.), see [UI Components](#3.3). For variant system details, see [Variant System](#3.2).

**Sources:** [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103) [.devin/wiki.json56-63](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L56-L63)

---

## Architectural Role

Core components form the foundation of the three-layer architecture. They are the only components that directly apply the CVA variant system and render semantic HTML5 elements. All Layer 2 components (UI Components) and Layer 3 components (Layouts) ultimately compose or extend these five primitives.

```
Output

React Patterns

CVA Variant System

Layer 1: Core Components (This Document)

Block
component='section' | 'article' | 'nav' | etc.
data-class='block'

Box
component='div' | 'span' | any ElementType
data-class='box'

Grid
CSS Grid layout
cols, rows, gap props

Flex
Flexbox layout
direction, align, justify props

Stack
Vertical/horizontal stacking
gap, direction props

class-variance-authority
Variant resolution

spacingVariants()
p, m, px, py, etc.

colorVariants()
bg, c, borderColor

layoutVariants()
w, h, minH, position

roundedVariants()
rounded

shadowVariants()
shadow

borderVariants()
border, borderTop, etc.

forwardRef()
Ref forwarding to DOM

TypeScript interfaces
HTMLAttributes + VariantProps

...props
HTML attribute forwarding

Semantic HTML5
section, article, nav, header, footer

data-class attributes
DOM targeting

Tailwind CSS classes
Applied to className
```

**Sources:** [README.md62-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L103) [src/components/ui/Block/Block.tsx1-88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L88)

---

## The Five Core Primitives

### Overview Table

| Component | Primary Purpose              | Semantic HTML Support                                   | Key Variants                                    | Default Width |
| --------- | ---------------------------- | ------------------------------------------------------- | ----------------------------------------------- | ------------- |
| `Block`   | Semantic block containers    | section, article, nav, header, footer, aside, main, div | spacing, color, layout, rounded, shadow, border | `w='full'`    |
| `Box`     | Generic flexible container   | Any `ElementType` (div, span, p, etc.)                  | spacing, color, layout                          | No default    |
| `Grid`    | CSS Grid layouts             | div with `display: grid`                                | spacing, layout, cols, rows, gap                | No default    |
| `Flex`    | Flexbox layouts              | div with `display: flex`                                | spacing, layout, direction, align, justify      | No default    |
| `Stack`   | Vertical/horizontal stacking | div with flexbox stacking                               | spacing, gap, direction                         | No default    |

**Sources:** [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103)

---

## Fundamental React Patterns

### forwardRef Implementation

All core components implement `forwardRef` to expose the underlying DOM element reference to parent components. This enables imperative DOM operations and integration with third-party libraries.

```
ref={blockRef}

ref forwarding

blockRef.current?.scrollIntoView()

Parent Component
const blockRef = useRef(null)

Block
forwardRef

DOM Element
section | article | nav | etc.
```

**Example structure from Block component:**

[src/components/ui/Block/Block.tsx33-36](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L33-L36)

```
export const Block = forwardRef<HTMLElement, BlockProps>(
  ({ children, className, component, variant = 'div', ...props }, ref) => {
    // Component implementation
  }
);
```

**Sources:** [src/components/ui/Block/Block.tsx33-86](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L33-L86)

### TypeScript Type Composition

Core components compose multiple TypeScript interfaces to achieve type safety across HTML attributes, variant props, and custom component props.

```
extends

extends

extends

Pick<..., 'w' | 'h' | 'minH' | 'position'>

extends

extends

extends

includes

BlockProps
Component-specific interface

React.HTMLAttributes
Standard HTML attributes

VariantSpacingProps
p, px, py, pt, pb, pl, pr
m, mx, my, mt, mb, ml, mr

ColorProps
bg, c, borderColor

VariantLayoutProps
w, h, minH, maxW, position

RoundedProps
rounded

ShadowProps
shadow

BorderProps
border, borderTop, etc.

Custom Props
children: ReactNode
component?: ElementType
variant?: 'section' | 'article' | ...
```

**Type composition pattern from Block:**

[src/components/ui/Block/Block.tsx20-31](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L20-L31)

```
export interface BlockProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantSpacingProps,
    ColorProps,
    Pick<VariantLayoutProps, 'w' | 'h' | 'minH' | 'position'>,
    RoundedProps,
    ShadowProps,
    BorderProps {
  children: ReactNode;
  component?: ElementType;
  variant?: 'section' | 'main' | 'nav' | 'article' | 'header' | 'footer' | 'aside' | 'div';
}
```

**Sources:** [src/components/ui/Block/Block.tsx20-31](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L20-L31)

### Prop Destructuring and HTML Attribute Forwarding

Core components destructure variant props explicitly and forward remaining HTML attributes to the underlying DOM element using the spread operator (`...props`).

```
Incoming Props
p='lg', onClick, data-testid, etc.

Destructured Variant Props
p, px, py, m, bg, c, w, h, rounded, shadow, border

Rest Props (...props)
onClick, data-testid, aria-label, etc.

Variant Functions
spacingVariants({ p, px, py, ... })
colorVariants({ bg, c })
layoutVariants({ w, h })

className prop
cn(variants, custom className)

Base Component
Block/Box/Grid/Flex/Stack

Rendered DOM Element
with className + ...props
```

**Prop destructuring pattern from Block:**

[src/components/ui/Block/Block.tsx34-61](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L34-L61)

```
({ 
  children, 
  className,
  component,
  variant = 'div',
  // Spacing props
  p, px, py, pt, pb, pl, pr,
  m, mx, my, mt, mb, ml, mr,
  // Color props
  bg, c, borderColor,
  // Layout props
  w = 'full', h, minH, position,
  // Visual props
  rounded, shadow,
  // Border props
  border, borderTop, borderBottom, borderLeft, borderRight,
  ...props  // Remaining HTML attributes
}, ref)
```

**Sources:** [src/components/ui/Block/Block.tsx34-86](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L34-L86)

---

## Component-Specific Features

### Block: Semantic HTML Container

`Block` is designed for semantic block-level elements. It defaults to `w='full'` (full width) and provides a `variant` prop for selecting semantic HTML5 elements.

**Key characteristics:**

- Semantic element selection via `variant` prop
- Full width by default (`w='full'`)
- Supports all spacing, color, layout, rounded, shadow, and border variants
- Uses `data-class="block"` for DOM targeting

**Element type resolution:**

[src/components/ui/Block/Block.tsx62-68](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L62-L68)

```
// Use variant as component if no component is explicitly provided
const elementType = component || variant;

return (
  <BaseBlock
    ref={ref}
    component={elementType}
    data-class="block"
```

**Usage examples:**

```
// Renders as <section> with full width
<Block variant="section" p="lg" rounded="xl">
  Section content
</Block>

// Renders as <nav> with custom background
<Block variant="nav" bg="primary" c="white">
  Navigation links
</Block>

// Override with custom component
<Block component="article" p="md">
  Article content
</Block>
```

**Sources:** [src/components/ui/Block/Block.tsx1-88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L88) [README.md85-87](https://github.com/ui8kit/core/blob/2afe2195/README.md#L85-L87)

### Box: Flexible Generic Container

`Box` is the most flexible primitive, accepting any `ElementType` via the `component` prop. It has no default width and minimal defaults, making it suitable for inline and custom layouts.

**Key characteristics:**

- Accepts any React `ElementType` (div, span, p, a, button, custom components)
- No default width or height
- Supports spacing, color, and layout variants
- Uses `data-class="box"` for DOM targeting

**Usage examples:**

```
// Renders as <div>
<Box p="md" bg="card">
  Generic container
</Box>

// Renders as <span> (inline)
<Box component="span" c="primary" weight="bold">
  Inline text
</Box>

// Renders as custom element
<Box component="input" w="full" p="sm" border="default" />
```

**Sources:** [README.md85](https://github.com/ui8kit/core/blob/2afe2195/README.md#L85-L85) [src/components/ui/Box/index.ts1](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts#L1-L1)

### Grid: CSS Grid Layout

`Grid` provides CSS Grid layout capabilities with props for columns, rows, and gap.

**Key characteristics:**

- `display: grid` applied by default
- `cols` prop for column count
- `rows` prop for row count
- `gap` prop for grid spacing
- Supports spacing and layout variants

**Usage examples:**

```
// 2-column grid with gap
<Grid cols={2} gap="md" p="lg">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
  <Box>Item 4</Box>
</Grid>

// 3-column responsive grid
<Grid cols={3} gap="lg" w="full">
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Grid>
```

**Sources:** [README.md88](https://github.com/ui8kit/core/blob/2afe2195/README.md#L88-L88)

### Flex: Flexbox Layout

`Flex` provides Flexbox layout capabilities with props for direction, alignment, and justification.

**Key characteristics:**

- `display: flex` applied by default
- `direction` prop for flex-direction
- `align` prop for align-items
- `justify` prop for justify-content
- Supports spacing and layout variants

**Usage examples:**

```
// Horizontal flex with centered items
<Flex direction="row" align="center" justify="between" p="md">
  <Text>Left content</Text>
  <Button>Right action</Button>
</Flex>

// Vertical flex
<Flex direction="column" gap="md">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>
```

**Sources:** [README.md88](https://github.com/ui8kit/core/blob/2afe2195/README.md#L88-L88)

### Stack: Simplified Stacking

`Stack` is a specialized flex container for vertical or horizontal stacking with consistent gap spacing.

**Key characteristics:**

- Simplified API compared to `Flex`
- `direction` prop: 'vertical' (default) or 'horizontal'
- `gap` prop for spacing between children
- Automatic flex layout

**Usage examples:**

```
// Vertical stack (default)
<Stack gap="md" p="lg">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Stack>

// Horizontal stack
<Stack direction="horizontal" gap="sm">
  <Button>Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>
```

**Sources:** [README.md89](https://github.com/ui8kit/core/blob/2afe2195/README.md#L89-L89)

---

## Variant Application Pattern

Core components apply variants using the `cn()` utility function, which merges variant-generated classes with custom className props using `tw-merge` for conflict resolution.

```
validated by

Variant Props
p='lg', bg='card', rounded='xl'

Variant Functions
spacingVariants({ p: 'lg' })
colorVariants({ bg: 'card' })
roundedVariants({ rounded: 'xl' })

Generated Classes
'p-8' (from p='lg')
'bg-card' (from bg='card')
'rounded-xl' (from rounded='xl')

Custom className
(optional user override)

cn() utility
tw-merge for conflict resolution

Final className
Applied to component

core-classes.json
618 class whitelist
Prevents Tailwind purging
```

**Application pattern from Block:**

[src/components/ui/Block/Block.tsx70-79](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L70-L79)

```
className={cn(
  // Apply variants
  spacingVariants({ p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr }),
  colorVariants({ bg, c, borderColor }),
  layoutVariants({ w, h, minH, position }),
  roundedVariants({ rounded }),
  shadowVariants({ shadow }),
  borderVariants({ border, borderTop, borderBottom, borderLeft, borderRight }),
  className  // User's custom className (if provided)
)}
```

**Sources:** [src/components/ui/Block/Block.tsx70-79](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L70-L79)

---

## Import and Export Pattern

Core components follow a consistent import/export structure for tree-shaking and type safety.

### Component File Structure

Each core component has a dedicated directory with two files:

```
src/core/ui/Block/
├── Block.tsx          # Component implementation
└── index.ts           # Public exports
```

### Import Pattern in Component Files

[src/components/ui/Block/Block.tsx3-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L3-L18)

```
import {
  Block as BaseBlock,           // Base component from core
  spacingVariants,              // Variant functions
  colorVariants,
  layoutVariants,
  roundedVariants,
  shadowVariants,
  borderVariants,
  type VariantSpacingProps,     // TypeScript types
  type ColorProps,
  type VariantLayoutProps,
  type RoundedProps,
  type ShadowProps,
  type BorderProps,
  cn                            // Utility function
} from "@ui8kit/core";
```

### Export Pattern in Index Files

[src/components/ui/Box/index.ts1](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts#L1-L1)

```
export { Box, type BoxProps } from "./Box";
```

**Export structure:**

- Named export for component
- Named export for TypeScript props interface using `type` keyword
- No default exports (enforces consistent import syntax)

**Sources:** [src/components/ui/Block/Block.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L18) [src/components/ui/Box/index.ts1](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts#L1-L1)

---

## data-class Attributes

All core components include a `data-class` attribute for consistent DOM targeting in tests, CSS selectors, and debugging tools.

```
Block
data-class='block'

Box
data-class='box'

Grid
data-class='grid'

Flex
data-class='flex'

Stack
data-class='stack'

DOM Queries
document.querySelector('[data-class=block]')
screen.getByTestId('block')

CSS Selectors
[data-class='block'] { ... }

Browser DevTools
Filter by data-class
```

**Usage from Block component:**

[src/components/ui/Block/Block.tsx69](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L69-L69)

```
data-class="block"
```

**Consumer testing example:**

```
// React Testing Library
const blockElement = screen.getByTestId('block');

// Direct DOM query
const allBlocks = document.querySelectorAll('[data-class="block"]');

// Cypress
cy.get('[data-class="block"]').should('exist');
```

**Sources:** [src/components/ui/Block/Block.tsx69](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L69-L69)

---

## displayName Convention

All core components set `displayName` for improved debugging experience in React DevTools and error messages.

[src/components/ui/Block/Block.tsx88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L88-L88)

```
Block.displayName = "Block";
```

**Benefits:**

- Clear component names in React DevTools component tree
- Improved error stack traces
- Better debugging with React.StrictMode warnings

**Sources:** [src/components/ui/Block/Block.tsx88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L88-L88)

---

## Relationship with Higher Layers

Core components serve as the foundation for Layer 2 (UI Components) and Layer 3 (Layouts). Higher-level components either extend core components with additional props or compose multiple core components together.

```
Layer 1: Core Components

Layer 2: UI Components

Layer 3: Layouts

uses

uses

uses

uses

uses

uses

extends

extends

uses

DashLayout
Composes: Container, Grid, Flex

LayoutBlock
Uses: Grid or Flex

SplitBlock
Uses: Container

Card
Extends: Block
Forwards variant props

Button
Extends: Box
Adds button-specific variants

Container
Uses: Block
Adds max-width logic

Block
Direct variant application

Box
Direct variant application

Grid
Direct variant application

Flex
Direct variant application

Stack
Direct variant application
```

**Extension pattern (Card extends Block):**

```
// Card component internally uses Block
<Block
  component="div"
  data-class="card"
  className={cn(cardVariants({ variant }), className)}
  {...variantProps}  // Forwards spacing, color, layout props
>
  {children}
</Block>
```

**Composition pattern (DashLayout uses Grid):**

```
// DashLayout composes multiple core components
<Block component="div" className="dashboard-layout">
  <Grid cols={12} gap="md">
    <Block component="aside" className="sidebar">
      {sidebar}
    </Block>
    <Block component="main" className="content">
      {children}
    </Block>
  </Grid>
</Block>
```

**Sources:** [README.md62-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L168)

---

## Summary

Core components implement five fundamental patterns:

1. **forwardRef** - Expose DOM references to parent components
2. **Type Composition** - Combine `React.HTMLAttributes` with variant prop types
3. **Prop Destructuring** - Extract variant props and forward HTML attributes
4. **Variant Application** - Apply CVA variants via `cn()` utility
5. **Semantic HTML** - Render appropriate HTML5 elements via `component` prop

These patterns enable:

- Type-safe component APIs with full TypeScript inference
- Direct access to the variant system without prop forwarding overhead
- Flexible semantic HTML structure for accessibility
- Consistent DOM targeting via `data-class` attributes
- Clean React DevTools debugging with `displayName`

All higher-level components in the library either extend or compose these five primitives, ensuring architectural consistency throughout the system.

**Sources:** [README.md62-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L103) [src/components/ui/Block/Block.tsx1-88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L88) [.devin/wiki.json56-63](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L56-L63)