---
{
  "title": "UI Components",
  "generatedAt": "2025-11-04T11:57:48.299Z"
}
---

# UI Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)
- [src/components/ui/Accordion/Accordion.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx)
- [src/components/ui/Badge/Badge.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx)

## Purpose and Scope

This page documents the **Layer 2** composite UI components located in `src/components/ui/`. These 15 components provide a developer-friendly API that extends the core primitives with prop forwarding, variant integration, and semantic composition patterns.

For documentation of the underlying primitives (Box, Block, Grid, Flex, Stack), see [Core Components](#3.1). For the variant system that powers styling, see [Variant System](#3.2). For complete API reference including all props, see [UI Components API](#4.2).

**Sources:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md1-20](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L20) [.devin/wiki.json75-84](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L75-L84)

---

## Architecture Position

UI Components occupy **Layer 2** in the three-layer architecture, sitting between core primitives and layout templates:

```
Foundation: Variant System

Layer 1: Core Primitives

Layer 2: UI Components (Current)

extends

extends

uses

uses

imports & applies

forwards props

forwards props

imports & applies

forwards props

forwards props

forwards props

forwards props

forwards props

Button
src/components/ui/Button

Card + Compound Parts
src/components/ui/Card

Badge
src/components/ui/Badge

Text
src/components/ui/Text

Title
src/components/ui/Title

Icon
src/components/ui/Icon

Image
src/components/ui/Image

Group
src/components/ui/Group

Container
src/components/ui/Container

Sheet
src/components/ui/Sheet

Accordion
src/components/ui/Accordion

BaseButton
src/core/ui/Button

BaseCard
src/core/ui/Card

Box
src/core/ui/Box

Block
src/core/ui/Block

spacingVariants
src/core/variants/spacing.ts

roundedVariants
src/core/variants/rounded.ts

shadowVariants
src/core/variants/shadow.ts

buttonSizeVariants
buttonStyleVariants

badgeSizeVariants
badgeStyleVariants
```

**Sources:** [README.md62-79](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L79) [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19)

---

## Core Principles

### 1. Prop Forwarding Architecture

UI components extend base primitives by **forwarding variant props** while adding component-specific functionality. This pattern enables developers to use spacing, layout, and styling props directly without managing `className`:

```
Developer Code
<Badge p='md' rounded='lg'
variant='success' />

Badge Component
src/components/ui/Badge/Badge.tsx

Variant Props
p, m, rounded, shadow, border

Component Props
variant, size, dot
leftSection, rightSection

BaseBadge
src/core/ui/Badge

CVA Resolution
spacingVariants()
roundedVariants()
badgeStyleVariants()

Rendered DOM
<div class='inline-flex
p-4 rounded-lg...'
data-class='badge' />
```

**Sources:** [src/components/ui/Badge/Badge.tsx1-96](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L96) [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19)

### 2. TypeScript Type Composition

Components achieve type safety by **composing interfaces** from multiple variant type sources:

```
BadgeProps Interface

React.HTMLAttributes<HTMLDivElement>
Standard HTML props

Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>
Selected spacing props

RoundedProps
rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl'...

ShadowProps
shadow?: 'none' | 'sm' | 'md' | 'lg'...

BorderProps
border, borderTop, borderBottom...

BadgeSizeProps
size?: 'default' | 'sm' | 'lg'

BadgeStyleProps
variant?: 'default' | 'secondary'...

Custom Props
leftSection, rightSection, dot
```

**Sources:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32) [src/components/README.md206-221](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L206-L221)

### 3. data-class Convention

All UI components apply **semantic `data-class` attributes** for consistent DOM targeting and testing. This convention enables CSS selectors and test queries without relying on dynamically generated class names:

| Component | Root data-class          | Sub-component data-classes                                                     |
| --------- | ------------------------ | ------------------------------------------------------------------------------ |
| Badge     | `data-class="badge"`     | `badge-dot`, `badge-left-section`, `badge-right-section`                       |
| Card      | `data-class="card"`      | `card-header`, `card-title`, `card-description`, `card-content`, `card-footer` |
| Accordion | `data-class="accordion"` | `accordion-item`, `accordion-trigger`, `accordion-content`                     |
| Button    | `data-class="button"`    | `button-left-section`, `button-right-section`                                  |

**Sources:** [src/components/ui/Badge/Badge.tsx59-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L59-L92) [src/components/ui/Accordion/Accordion.tsx67-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L67-L182) [src/components/README.md223-235](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L235)

### 4. Compound Component Pattern

Complex components use **nested sub-components** with shared context for flexible composition:

```
Card
Provides styling context

Card.Header
data-class='card-header'

Card.Title
data-class='card-title'

Card.Description
data-class='card-description'

Card.Content
data-class='card-content'

Card.Footer
data-class='card-footer'

Accordion
Manages open/closed state

AccordionContext
value, onItemClick, type

AccordionItem
Provides item value

AccordionItemContext
value string

AccordionTrigger
Reads contexts, toggles

AccordionContent
Conditional rendering
```

**Sources:** [src/components/ui/Accordion/Accordion.tsx9-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L182) [README.md17](https://github.com/ui8kit/core/blob/2afe2195/README.md#L17-L17) [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144)

---

## Complete Component Catalog

The library provides 15 composite UI components organized by functional category:

| Component     | Location                      | Base Primitive | Primary Purpose              | Key Variants                                           |
| ------------- | ----------------------------- | -------------- | ---------------------------- | ------------------------------------------------------ |
| **Button**    | `src/components/ui/Button`    | `BaseButton`   | Interactive actions          | `buttonStyleVariants`, `buttonSizeVariants`            |
| **Card**      | `src/components/ui/Card`      | `BaseCard`     | Content containers           | `spacingVariants`, `roundedVariants`, `shadowVariants` |
| **Badge**     | `src/components/ui/Badge`     | `BaseBadge`    | Status indicators            | `badgeSizeVariants`, `badgeStyleVariants`              |
| **Text**      | `src/components/ui/Text`      | `Box`          | Semantic text elements       | `typographyVariants`, `colorVariants`                  |
| **Title**     | `src/components/ui/Title`     | `Box`          | Heading hierarchy (h1-h6)    | `typographyVariants`, `colorVariants`                  |
| **Container** | `src/components/ui/Container` | `Block`        | Responsive containers        | `layoutVariants`, `spacingVariants`                    |
| **Icon**      | `src/components/ui/Icon`      | `Box`          | SVG icon wrapper             | `colorVariants`, `spacingVariants`                     |
| **Image**     | `src/components/ui/Image`     | `Box`          | Optimized images             | `roundedVariants`, `shadowVariants`, `layoutVariants`  |
| **Group**     | `src/components/ui/Group`     | `Flex`         | Horizontal grouping          | `flexVariants`, `spacingVariants`                      |
| **Stack**     | `src/components/ui/Stack`     | `Flex`         | Vertical/horizontal stacking | `flexVariants`, `spacingVariants`                      |
| **Grid**      | `src/components/ui/Grid`      | `Grid`         | CSS Grid layouts             | `gridVariants`, `spacingVariants`                      |
| **Sheet**     | `src/components/ui/Sheet`     | `Block`        | Drawer/sheet overlays        | `layoutVariants`, `shadowVariants`                     |
| **Accordion** | `src/components/ui/Accordion` | Context-based  | Expandable sections          | `flexVariants`, `layoutVariants`                       |
| **Flex**      | `src/components/ui/Flex`      | `Flex`         | Flexbox layouts              | `flexVariants`, `spacingVariants`                      |
| **Block**     | `src/components/ui/Block`     | `Block`        | Semantic sections            | All variants via forwarding                            |

**Sources:** [README.md370-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L370-L386) [src/components/README.md21-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L21-L203)

---

## Prop Forwarding Implementation

### Destructuring and Forwarding Pattern

UI components use a consistent pattern for prop forwarding illustrated by the Badge implementation:

```
Badge Props Object
{variant, size, rounded,
m, mx, my, shadow,
border, className, ...rest}

Destructure Props
Extract known props
Collect ...rest

Apply CVA Variants
badgeStyleVariants({variant})
badgeSizeVariants({size})
spacingVariants({m, mx, my})
roundedVariants({rounded})
shadowVariants({shadow})

Merge with cn()
Base classes +
variant classes +
custom className

Forward to BaseBadge
className={merged}
...rest props
```

**Implementation example from Badge:**

[src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

Key characteristics:

1. **Selective destructuring** - Extract only the variant props the component uses
2. **Spread operator** - Collect remaining HTML attributes in `...props`
3. **CVA resolution** - Apply each variant function with corresponding prop
4. **Class merging** - Use `cn()` utility to merge all class strings
5. **Forwarding** - Pass merged className and spread props to base component

**Sources:** [src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

---

## Variant Integration Patterns

### Multi-Variant Composition

Components typically integrate 3-7 variant categories simultaneously:

```
Component Props
(e.g., Card, Badge, Button)

Core Styling Variants

spacingVariants
p, px, py, m, mx, my

roundedVariants
rounded: 'none' to 'full'

shadowVariants
shadow: 'none' to '2xl'

borderVariants
border, borderTop, etc.

Component-Specific Variants

sizeVariants
size: 'sm' | 'md' | 'lg'

styleVariants
variant: 'default' | 'primary'...

Layout Variants

layoutVariants
w: 'full' | 'auto' | 'fit'
```

### Import and Application Pattern

Each UI component follows this import structure:

```
// 1. Import base primitive
import { Badge as BaseBadge } from "@ui8kit/core";

// 2. Import variant functions
import {
  spacingVariants,
  roundedVariants,
  shadowVariants,
  borderVariants,
  badgeSizeVariants,    // Component-specific
  badgeStyleVariants,   // Component-specific
} from "@ui8kit/core";

// 3. Import variant prop types
import type {
  VariantSpacingProps,
  RoundedProps,
  ShadowProps,
  BorderProps,
  BadgeSizeProps,
  BadgeStyleProps,
} from "@ui8kit/core";

// 4. Import cn utility for class merging
import { cn } from "@ui8kit/core";
```

**Sources:** [src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18) [src/components/ui/Accordion/Accordion.tsx5-7](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L5-L7)

---

## Type Safety Architecture

### Interface Composition Strategy

UI components compose their TypeScript interfaces from multiple sources using `Pick` utility types for selective prop inclusion:

```
Component Props Interface

Base HTML Interface
React.HTMLAttributes<T>
onClick, onMouseEnter, etc.

Selective Variant Props

Pick<VariantSpacingProps,
'p' | 'px' | 'py' | 'm'>

Pick<VariantLayoutProps,
'w' | 'h'>

Pick<VariantFlexProps,
'gap' | 'direction'>

Full Variant Props

RoundedProps
All rounded values

ShadowProps
All shadow values

Component-Specific Props

Custom Interface
leftSection?: ReactNode
rightSection?: ReactNode
dot?: boolean
```

### Example: Badge Type Composition

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

This pattern achieves:

- **Selective inclusion** - Only expose spacing props needed (m, mx, my), not all padding props
- **Type inheritance** - Extend base HTML props for event handlers
- **Variant integration** - Include all props from variant interfaces
- **Custom extension** - Add component-specific props (leftSection, rightSection, dot)

### Example: Accordion Type Composition

[src/components/ui/Accordion/Accordion.tsx26-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L26-L32) [src/components/ui/Accordion/Accordion.tsx91-93](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L91-L93)

Demonstrates:

- **Controlled/uncontrolled** - Support both value patterns
- **Selective width** - Pick only `w` from layout variants
- **Context typing** - Type-safe context values for compound components

**Sources:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32) [src/components/ui/Accordion/Accordion.tsx26-93](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L26-L93)

---

## Compound Component Implementation

### Context-Based State Sharing

Complex components like Accordion use React Context for state management across sub-components:

```
Root Component
(Accordion, Sheet)

Context Provider
value={{state, actions}}

Sub-Component 1
(AccordionItem)

Sub-Component 2
(AccordionTrigger)

Sub-Component 3
(AccordionContent)

useContext Hook
Access state

useContext Hook
Access actions

useContext Hook
Access state
```

### Accordion Implementation Pattern

The Accordion component demonstrates a two-level context hierarchy:

1. **AccordionContext** - Manages global accordion state (open items, click handlers)

   - [src/components/ui/Accordion/Accordion.tsx9-24](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L24)

2. **AccordionItemContext** - Provides item-specific value to triggers/content

   - [src/components/ui/Accordion/Accordion.tsx77-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L77-L89)

3. **State management** - Supports both controlled and uncontrolled modes

   - [src/components/ui/Accordion/Accordion.tsx36-60](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L36-L60)

4. **Sub-component coordination** - Trigger reads context to toggle, content reads to render

   - [src/components/ui/Accordion/Accordion.tsx125-153](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L125-L153)
   - [src/components/ui/Accordion/Accordion.tsx157-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L157-L182)

**Sources:** [src/components/ui/Accordion/Accordion.tsx9-182](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L182)

### Card Compound Pattern

Card uses a simpler pattern without context, relying on prop composition:

```
Card (root container with variants)
├── Card.Header (semantic header section)
│   ├── Card.Title (heading element)
│   └── Card.Description (muted text)
├── Card.Content (main content area)
└── Card.Footer (action area)
```

Each sub-component:

- Receives all variant props independently
- Applies semantic `data-class` attributes
- Forwards refs for DOM access
- Extends base primitives

**Sources:** [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144) [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117)

---

## Usage Patterns

### Basic Component Usage

Simple components with variant props:

```
// Badge with variants
<Badge 
  variant="success" 
  size="sm" 
  rounded="full"
  m="xs"
  dot
>
  Active
</Badge>

// Button with sections and variants
<Button 
  variant="primary" 
  size="lg"
  rounded="md"
  shadow="sm"
  leftSection={<Icon lucideIcon={Heart} />}
>
  Save
</Button>
```

### Compound Component Composition

Complex components with nested structure:

```
// Card with all sub-components
<Card p="lg" rounded="xl" shadow="md" bg="card">
  <Card.Header>
    <Card.Title>Dashboard</Card.Title>
    <Card.Description>Overview of your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <Stack gap="md">
      {/* Content here */}
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Group gap="md" justify="end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </Group>
  </Card.Footer>
</Card>

// Accordion with state management
<Accordion type="single" collapsible w="full">
  <AccordionItem value="item-1" gap="sm">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>
      Content for section 1
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" gap="sm">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>
      Content for section 2
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Layout Component Usage

Responsive layouts with variant props:

```
// Container with sizing
<Container size="lg" px="md" centered>
  <Stack gap="xl" align="stretch">
    {/* Page content */}
  </Stack>
</Container>

// Grid layout
<Grid cols="1-2-3" gap="lg" p="md">
  <GridCol span={2}>Wide content</GridCol>
  <GridCol>Regular content</GridCol>
</Grid>

// Group for horizontal layout
<Group gap="md" align="center" justify="between">
  <Title order={2}>Page Title</Title>
  <Button>Action</Button>
</Group>
```

**Sources:** [README.md121-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L121-L145) [src/components/README.md23-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L203)

---

## Integration with Core Primitives

UI components extend core primitives while maintaining the same variant prop API:

| UI Component | Extends Primitive | Added Features                                                   |
| ------------ | ----------------- | ---------------------------------------------------------------- |
| Button       | BaseButton        | Size variants, style variants, loading state, icon sections      |
| Badge        | BaseBadge         | Size variants, style variants, dot indicator, icon sections      |
| Card         | BaseCard          | Compound structure (Header, Content, Footer, Title, Description) |
| Text         | Box               | Semantic text elements (p, span, em, strong), truncation         |
| Title        | Box               | Heading hierarchy (h1-h6), semantic order prop                   |
| Container    | Block             | Responsive size presets, centered prop                           |
| Icon         | Box               | Lucide icon integration, size scaling                            |
| Group        | Flex              | Horizontal layout defaults, simplified justify/align             |
| Stack        | Flex              | Vertical/horizontal stacking, simplified gap prop                |

The inheritance relationship enables:

1. **Variant reuse** - All spacing, layout, color variants from primitives
2. **Ref forwarding** - Access underlying DOM elements via forwardRef
3. **HTML attributes** - All standard HTML props pass through
4. **Type safety** - Full TypeScript support across composition chain

**Sources:** [src/components/README.md8-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L8-L19) [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103)

---

## Best Practices

### 1. Prefer Variants Over className

Use variant props instead of manual `className` for consistency:

```
// ❌ Avoid
<Badge className="px-4 py-2 rounded-lg shadow-md">Status</Badge>

// ✅ Prefer
<Badge px="md" py="sm" rounded="lg" shadow="md">Status</Badge>
```

### 2. Use data-class for Custom Styling

Target components via `data-class` attributes in custom CSS:

```
/* ✅ Stable selector */
[data-class="badge"] {
  /* Custom styles */
}

[data-class="card-header"] {
  /* Header-specific styles */
}
```

### 3. Leverage Compound Components

Use sub-components for semantic structure:

```
// ✅ Semantic and flexible
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
</Card>

// ❌ Less semantic
<Card>
  <div className="header">
    <h3>Title</h3>
  </div>
  <div>Content</div>
</Card>
```

### 4. Apply Type Safety

Use TypeScript interfaces for prop validation:

```
// Component prop interface ensures type safety
interface MyComponentProps {
  badge: BadgeProps;
  onAction: () => void;
}

export function MyComponent({ badge, onAction }: MyComponentProps) {
  return (
    <Card p="lg">
      <Badge {...badge} />
      <Button onClick={onAction}>Action</Button>
    </Card>
  );
}
```

**Sources:** [src/components/README.md237-258](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L258) [.devin/wiki.json200-209](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L200-L209)

---

## Summary

UI Components in Layer 2 provide:

- **15 composite components** covering common UI patterns
- **Prop forwarding** from core primitives to user-facing API
- **Type safety** via composed TypeScript interfaces
- **Variant integration** across 12 reusable variant categories
- **data-class convention** for stable DOM targeting
- **Compound patterns** for flexible composition
- **Semantic HTML** with accessibility built-in

This architecture achieves the library's goal of building complex interfaces with minimal code while maintaining type safety, flexibility, and consistency.

For component-by-component API documentation, see [UI Components API](#4.2). For usage examples and workflows, see [Basic Workflow](#5.1).

**Sources:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md1-258](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L258) [.devin/wiki.json75-84](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L75-L84)