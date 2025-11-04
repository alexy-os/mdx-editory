---
{
  "title": "UI Components",
  "generatedAt": "2025-11-04T11:57:49.745Z"
}
---

# UI Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)
- [src/components/ui/Accordion/Accordion.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx)
- [src/components/ui/Badge/Badge.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx)

## Purpose and Scope

This document provides complete API documentation for the extended composite components located in `src/components/ui/`. These components form Layer 2 of the three-layer architecture, sitting between the core primitives (documented in [Core Components](#4.1)) and layout templates (documented in [Layout Components](#4.3)).

UI components extend base primitives through **prop forwarding**, inheriting variant capabilities while adding component-specific functionality. They provide a developer-friendly API that eliminates manual className management by exposing typed variant props like `p='lg'`, `rounded='md'`, and `shadow='sm'`.

For general usage patterns and best practices, see [Basic Workflow](#5.1). For the underlying variant system, see [Variant System](#3.2).

---

## Component Architecture

### Layer 2 Position in the System

```
Foundation: CVA Variants (core/variants)

Layer 1: Core Primitives (core/ui)

Layer 2: Composite Components (components/ui)

Developer API

imports

imports

imports

extends

extends

extends

composes

applies

applies

applies

applies

renders with

renders with

Component Usage
JSX with variant props

Card.tsx
BaseBadge + variants

Button.tsx
BaseButton + variants

Badge.tsx
BaseBadge + variants

Accordion.tsx
Context + Button

Title.tsx
variants only

Text.tsx
variants only

Icon.tsx
lucide-react wrapper

Image.tsx
variants + aspect

Card (primitive)

Button (primitive)

Badge (primitive)

Block

Box

spacingVariants

roundedVariants

shadowVariants

badgeStyleVariants

buttonStyleVariants
```

**Sources:** [src/components/README.md1-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L19) [src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18) Diagram 1 from high-level architecture

---

## Prop Forwarding Pattern

### Core Principle

UI components implement **prop forwarding** to extend base primitives with variant props. This pattern:

1. Imports variant functions from `@ui8kit/core`
2. Accepts variant props in the component's TypeScript interface
3. Applies variants using the `cn()` utility with CVA variant functions
4. Forwards remaining props to the base primitive

```
Rendered Output

Render Logic

Badge Component Definition

BadgeProps interface
extends HTMLAttributes
+ VariantSpacingProps
+ RoundedProps
+ BadgeSizeProps

Import variants:
spacingVariants
roundedVariants
badgeSizeVariants
badgeStyleVariants

Destructure props:
m, mx, my
rounded, shadow
size, variant

BaseBadge primitive
from core/ui

cn() utility combines:
base classes
+ variant functions
+ custom className

HTML element with:
data-class='badge'
computed Tailwind classes
forwarded HTML attributes
```

**Sources:** [src/components/ui/Badge/Badge.tsx20-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L95) [src/components/README.md10-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L10-L19)

### Implementation Example: Badge Component

The `Badge` component demonstrates the complete prop forwarding pattern:

[src/components/ui/Badge/Badge.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L18)

- **Line 3-18**: Imports base `Badge` primitive and variant functions (`spacingVariants`, `roundedVariants`, `shadowVariants`, `borderVariants`, `badgeSizeVariants`, `badgeStyleVariants`)

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

- **Line 20-32**: `BadgeProps` interface extends `HTMLAttributes<HTMLDivElement>` and picks specific props from variant interfaces using TypeScript's `Pick<>` utility

[src/components/ui/Badge/Badge.tsx34-55](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L55)

- **Line 34-55**: Destructures variant props (`m`, `mx`, `my`, `rounded`, `shadow`, `border`, etc.) separately from HTML props

[src/components/ui/Badge/Badge.tsx56-73](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L73)

- **Line 56-73**: Applies variants using `cn()` utility, combining:

  - Base component classes (line 62)
  - Focus styles (line 63)
  - CVA variant functions (lines 65-70)
  - Custom `className` prop (line 71)

**Sources:** [src/components/ui/Badge/Badge.tsx1-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L95)

---

## Variant Integration

### Variant Categories Available to UI Components

UI components access 12 variant categories from the foundation layer. Each component selectively imports only the variants it needs:

| Variant Category | Props                                                                            | Values                                                                 | Common Components           |
| ---------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------- |
| **Spacing**      | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`                    | All components              |
| **Rounded**      | `rounded`                                                                        | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`                   | Card, Badge, Button, Image  |
| **Shadow**       | `shadow`                                                                         | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                                  | Card, Badge, Image          |
| **Border**       | `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight`               | `none`, `default`, `border`                                            | Card, Badge                 |
| **Colors**       | `bg`, `c`, `borderColor`                                                         | Design system colors                                                   | Card, Badge, Title, Text    |
| **Layout**       | `w`, `h`, `minH`, `maxW`, `position`                                             | `auto`, `full`, `screen`, `fit`, `min`, `max`                          | Accordion, Container, Stack |
| **Typography**   | `size`, `weight`, `align`, `leading`                                             | Font properties                                                        | Title, Text                 |
| **Badge Style**  | `variant`                                                                        | `default`, `secondary`, `destructive`, `outline`, `success`, `warning` | Badge                       |
| **Button Style** | `variant`, `size`, `contentAlign`                                                | Button-specific variants                                               | Button                      |
| **Flexbox**      | `gap`, `direction`, `align`, `justify`                                           | Flex properties                                                        | Group, Stack, AccordionItem |
| **Grid**         | `cols`, `gap`                                                                    | Grid properties                                                        | Grid, GridCol               |
| **Effects**      | Various visual effects                                                           | Component-specific                                                     | Multiple                    |

**Sources:** [src/components/README.md205-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L205-L222) [.devin/wiki.json20-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L20-L22)

### Variant Application Flow

```
Output Render

Class Merging

CVA Variant Resolution

Component Processing

Developer Props

<Badge
  p='lg'
  rounded='xl'
  shadow='md'
  variant='success'
/>

TypeScript validates props
against BadgeProps interface

Destructure variant props:
p, rounded, shadow, variant

Separate HTML props:
...props

spacingVariants({ p: 'lg' })
→ 'p-8'

roundedVariants({ rounded: 'xl' })
→ 'rounded-xl'

shadowVariants({ shadow: 'md' })
→ 'shadow-md'

badgeStyleVariants({ variant: 'success' })
→ 'bg-green-500...'

cn() utility merges:
base classes + variants
using tw-merge

Final className string

BaseBadge renders with:
className
data-class='badge'
HTML props
```

**Sources:** [src/components/ui/Badge/Badge.tsx56-73](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L73) Diagram 3 from high-level architecture

---

## Data Class Attributes

### Purpose and Convention

Every UI component includes a **`data-class`** attribute for consistent DOM targeting and semantic identification. This pattern enables:

- CSS selector targeting without fragile className dependencies
- Testing selectors that remain stable across style changes
- DOM inspection and debugging
- Semantic understanding of component structure

[src/components/README.md223-236](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L236)

### Naming Convention

The `data-class` attribute follows a **kebab-case** naming pattern that mirrors the component hierarchy:

| Component   | Primary Element          | Child Elements                                                                 |
| ----------- | ------------------------ | ------------------------------------------------------------------------------ |
| `Card`      | `data-class="card"`      | `card-header`, `card-title`, `card-description`, `card-content`, `card-footer` |
| `Badge`     | `data-class="badge"`     | `badge-dot`, `badge-left-section`, `badge-right-section`                       |
| `Accordion` | `data-class="accordion"` | `accordion-item`, `accordion-trigger`, `accordion-content`                     |
| `Button`    | `data-class="button"`    | `button-left-section`, `button-right-section`                                  |

**Sources:** [src/components/README.md223-236](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L236) [src/components/ui/Badge/Badge.tsx59](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L59-L59)

### Implementation Pattern

[src/components/ui/Badge/Badge.tsx56-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L92)

- **Line 59**: Root component receives `data-class="badge"`
- **Line 77**: Dot element receives `data-class="badge-dot"`
- **Line 82**: Left section receives `data-class="badge-left-section"`
- **Line 88**: Right section receives `data-class="badge-right-section"`

[src/components/ui/Accordion/Accordion.tsx64-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L64-L180)

- **Line 67**: Root `Accordion` receives `data-class="accordion"`
- **Line 108**: `AccordionItem` receives `data-class="accordion-item"`
- **Line 142**: `AccordionTrigger` receives `data-class="accordion-trigger"`
- **Line 169**: `AccordionContent` receives `data-class="accordion-content"`

**Sources:** [src/components/ui/Badge/Badge.tsx56-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L56-L92) [src/components/ui/Accordion/Accordion.tsx64-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L64-L180)

---

## Type Safety and TypeScript Patterns

### Interface Composition with Pick<>

UI components use TypeScript's `Pick<>` utility to selectively include variant props, avoiding interface pollution:

[src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

```
export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantSpacingProps, 'm' | 'mx' | 'my'>,
    RoundedProps,
    ShadowProps,
    BorderProps,
    BadgeSizeProps,
    BadgeStyleProps {
  // Component-specific props
}
```

This pattern:

- Prevents accidental prop inclusion (e.g., `Badge` doesn't need `p`, `px`, `py`)
- Provides autocomplete only for relevant props
- Maintains type safety across variant system

**Sources:** [src/components/ui/Badge/Badge.tsx20-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L20-L32)

### ForwardRef Pattern

All UI components use `React.forwardRef` for ref forwarding to underlying DOM elements:

[src/components/ui/Badge/Badge.tsx34-95](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L95)

```
export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ children, className, variant = 'default', ... }, ref) => {
    return (
      <BaseBadge
        ref={ref}
        // ...
      />
    );
  }
);

Badge.displayName = "Badge";
```

[src/components/ui/Accordion/Accordion.tsx34-75](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L75)

```
const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", collapsible = false, ... }, ref) => {
    // ...
  }
);
Accordion.displayName = "Accordion";
```

**Sources:** [src/components/ui/Badge/Badge.tsx34-96](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L34-L96) [src/components/ui/Accordion/Accordion.tsx34-75](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L75)

### Context-Based Components

Complex components use React Context for state sharing across compound components:

```
Custom Hooks

Context Values

Accordion Component Architecture

provides

provides

consumes via

consumes via

consumes via

accesses

accesses

Accordion
AccordionContext.Provider

AccordionItem
AccordionItemContext.Provider

AccordionTrigger
useAccordionContext()
useAccordionItemContext()

AccordionContent
useAccordionItemContext()

AccordionContext:
value: string | string[]
onItemClick: function
type: single | multiple
collapsible: boolean

AccordionItemContext:
value: string

useAccordionContext()
validates context exists
returns context value

useAccordionItemContext()
validates context exists
returns item value
```

**Sources:** [src/components/ui/Accordion/Accordion.tsx9-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L89)

[src/components/ui/Accordion/Accordion.tsx9-24](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L24)

- **Line 9-14**: `AccordionContextValue` type definition
- **Line 16**: Context creation
- **Line 18-24**: `useAccordionContext()` hook with validation

[src/components/ui/Accordion/Accordion.tsx77-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L77-L89)

- **Line 77-79**: `AccordionItemContextValue` type definition
- **Line 81**: Context creation
- **Line 83-89**: `useAccordionItemContext()` hook with validation

**Sources:** [src/components/ui/Accordion/Accordion.tsx9-89](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L9-L89)

---

## Component Catalog

### Layout Components

#### Block

Section wrapper component with full styling control. Semantic container for content sections.

**Key Props:**

- `component`: HTML element to render (default: `'div'`)
- Supports all spacing, color, layout, rounded, shadow, and border variants

**Location:** [src/components/ui/Block/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/) (referenced in [src/components/README.md25-37](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L25-L37))

#### Container

Responsive container with size presets and centering.

**Key Props:**

- `size`: `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'full'`
- `centered`: Boolean for centering
- Supports spacing and layout variants

**Location:** [src/components/ui/Container/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Container/) (referenced in [src/components/README.md39-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L39-L50))

#### Stack

Vertical flex layout for stacking elements.

**Key Props:**

- `gap`: Spacing between children
- `align`: Alignment (`'start'` | `'center'` | `'end'` | `'stretch'`)
- Supports all spacing and layout variants

**Location:** [src/components/ui/Stack/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Stack/) (referenced in [src/components/README.md52-64](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L52-L64))

#### Group

Horizontal flex layout for arranging elements in a row.

**Key Props:**

- `gap`: Spacing between children
- `align`: Vertical alignment
- `justify`: Horizontal distribution (`'start'` | `'center'` | `'end'` | `'between'` | `'around'`)

**Location:** [src/components/ui/Group/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Group/) (referenced in [src/components/README.md66-78](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L66-L78))

#### Grid

CSS Grid layout with responsive column presets.

**Key Props:**

- `cols`: Responsive columns (`'1'` | `'2'` | `'3'` | `'1-2'` | `'1-2-3'` | `'1-2-3-4'`)
- `gap`: Spacing between grid items
- Supports all spacing and layout variants

**Sub-component:** `GridCol` with `span` prop for column spanning

**Location:** [src/components/ui/Grid/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Grid/) (referenced in [src/components/README.md80-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L80-L92))

**Sources:** [src/components/README.md23-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L92)

---

### UI Components

#### Card

Card component with compound structure for headers, content, and footers.

**Structure:**

- `Card`: Root container
- `Card.Header` / `CardHeader`: Top section
- `Card.Title` / `CardTitle`: Heading
- `Card.Description` / `CardDescription`: Subtitle
- `Card.Content` / `CardContent`: Main content area
- `Card.Footer` / `CardFooter`: Bottom section

**Key Props:**

- Supports all spacing, rounded, shadow, border, and color variants
- Each sub-component has appropriate `data-class` attributes

**Location:** [src/components/ui/Card/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card/) (referenced in [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117))

#### Button

Interactive button with variants, sizes, and loading states.

**Key Props:**

- `variant`: `'default'` | `'secondary'` | `'destructive'` | `'outline'` | `'ghost'` | `'link'`
- `size`: `'sm'` | `'default'` | `'lg'` | `'icon'`
- `contentAlign`: `'start'` | `'center'` | `'end'` | `'between'`
- `leftSection`, `rightSection`: Icon or content slots
- `loading`: Boolean for loading state
- Supports spacing, rounded, and shadow variants

**Location:** [src/components/ui/Button/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button/) (referenced in [src/components/README.md119-133](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L119-L133))

#### Badge

Small status indicators with dots and sections.

**Key Props:**

- `variant`: `'default'` | `'secondary'` | `'destructive'` | `'outline'` | `'success'` | `'warning'`
- `size`: `'sm'` | `'default'` | `'lg'`
- `dot`: Boolean for status dot
- `leftSection`, `rightSection`: Content slots
- Supports margin, rounded, shadow, and border variants

**Implementation:** [src/components/ui/Badge/Badge.tsx1-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L97)

#### Title

Semantic heading elements with typography control.

**Key Props:**

- `order`: `1` | `2` | `3` | `4` | `5` | `6` (maps to `h1`-`h6`)
- `size`: Font size variant
- `fw`: Font weight
- `c`: Text color
- Supports spacing variants

**Location:** [src/components/ui/Title/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title/) (referenced in [src/components/README.md150-163](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L150-L163))

#### Text

Text elements with full typography control.

**Key Props:**

- `size`: Font size variant
- `c`: Text color
- `ta`: Text alignment (`'left'` | `'center'` | `'right'` | `'justify'`)
- `truncate`: Boolean for text truncation
- Supports spacing variants

**Location:** [src/components/ui/Text/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text/) (referenced in [src/components/README.md165-177](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L165-L177))

#### Image

Enhanced image component with aspect ratio and fit control.

**Key Props:**

- `src`, `alt`: Standard image attributes
- `aspect`: `'square'` | `'video'` | `'portrait'` | `'landscape'`
- `fit`: `'contain'` | `'cover'` | `'fill'` | `'none'`
- Supports rounded and shadow variants

**Location:** [src/components/ui/Image/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Image/) (referenced in [src/components/README.md179-191](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L179-L191))

#### Icon

Icon wrapper for lucide-react icons with size and color control.

**Key Props:**

- `lucideIcon`: Lucide icon component
- `size`: Size variant
- `c`: Color variant
- Supports spacing variants

**Location:** [src/components/ui/Icon/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Icon/) (referenced in [src/components/README.md193-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L193-L203))

#### Accordion

Expandable/collapsible sections with state management.

**Structure:**

- `Accordion`: Root with controlled/uncontrolled state
- `AccordionItem`: Individual collapsible section
- `AccordionTrigger`: Clickable header (uses `Button`)
- `AccordionContent`: Collapsible content area

**Key Props (Accordion):**

- `type`: `'single'` | `'multiple'`
- `collapsible`: Boolean for closing active item
- `value`, `onValueChange`, `defaultValue`: State control
- `w`: Width variant

**Key Props (AccordionItem):**

- `value`: Unique identifier (required)
- `w`: Width variant
- `gap`, `direction`: Flex variants

**Key Props (AccordionTrigger):**

- Extends all `ButtonProps`
- `w`: Width variant (defaults to `'full'`)

**Key Props (AccordionContent):**

- `w`: Width variant
- Automatic animation via CSS transitions

**Implementation:** [src/components/ui/Accordion/Accordion.tsx1-184](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L1-L184)

**Sources:** [src/components/README.md94-203](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L94-L203) [src/components/ui/Badge/Badge.tsx1-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge/Badge.tsx#L1-L97) [src/components/ui/Accordion/Accordion.tsx1-184](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L1-L184)

---

## Universal Props Reference

All UI components support these props through the CVA variant system:

### Spacing Props

| Prop                   | Description              | Values                                              |
| ---------------------- | ------------------------ | --------------------------------------------------- |
| `p`                    | Padding (all sides)      | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         |
| `px`                   | Padding horizontal       | Same as `p`                                         |
| `py`                   | Padding vertical         | Same as `p`                                         |
| `pt`, `pb`, `pl`, `pr` | Padding individual sides | Same as `p`                                         |
| `m`                    | Margin (all sides)       | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto` |
| `mx`                   | Margin horizontal        | Same as `m`                                         |
| `my`                   | Margin vertical          | Same as `m`                                         |
| `mt`, `mb`, `ml`, `mr` | Margin individual sides  | Same as `m`                                         |

### Visual Props

| Prop                                                               | Description      | Values                                               |
| ------------------------------------------------------------------ | ---------------- | ---------------------------------------------------- |
| `rounded`                                                          | Border radius    | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` |
| `shadow`                                                           | Box shadow       | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                |
| `bg`                                                               | Background color | Design system colors                                 |
| `c`                                                                | Text color       | Design system colors                                 |
| `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight` | Border styles    | `none`, `default`, `border`                          |

### Layout Props

| Prop       | Description  | Values                                              |
| ---------- | ------------ | --------------------------------------------------- |
| `w`        | Width        | `auto`, `full`, `screen`, `fit`, `min`, `max`       |
| `h`        | Height       | Same as `w`                                         |
| `minH`     | Min height   | Same as `w`                                         |
| `maxW`     | Max width    | Same as `w`                                         |
| `position` | CSS position | `static`, `relative`, `absolute`, `fixed`, `sticky` |

**Sources:** [src/components/README.md205-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L205-L222)

---

## Usage Patterns

### Basic Component Usage

```
import { Badge } from '@ui8kit/core';

<Badge 
  variant="success" 
  size="sm" 
  rounded="full"
  m="xs"
  dot
>
  Active
</Badge>
```

### Compound Component Pattern

```
import { Card, CardHeader, CardTitle, CardContent } from '@ui8kit/core';

<Card p="lg" rounded="xl" shadow="md" bg="card">
  <CardHeader>
    <CardTitle>Dashboard</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Context-Based Components

```
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@ui8kit/core';

<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

**Sources:** [src/components/README.md96-133](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L133) [src/components/ui/Accordion/Accordion.tsx34-180](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion/Accordion.tsx#L34-L180)

---

## Extension Capabilities

### Adding Custom Variants

Components can be extended with additional variants by:

1. Creating new variant definitions in `src/core/variants/`
2. Importing the variant function and types
3. Adding props to the component interface using `Pick<>`
4. Applying the variant in the `cn()` call

### Composition Patterns

UI components serve as building blocks for higher-level patterns:

- **Forms**: Combine `Block`, `Stack`, `Group`, `Button`, and custom input components
- **Data Display**: Compose `Card`, `Title`, `Text`, `Badge`, `Image`
- **Navigation**: Use `Group`, `Button`, `Icon` for nav bars
- **Content Sections**: Build with `Block`, `Container`, `Grid`, `Stack`

For detailed composition examples, see [Development Guide](#5) and [Layout Components](#4.3).

**Sources:** [src/components/README.md237-259](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L259) [.devin/wiki.json12-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L12-L14)