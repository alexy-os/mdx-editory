---
{
  "title": "Variant System",
  "generatedAt": "2025-11-04T11:57:48.100Z"
}
---

# Variant System

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [scripts/cva-extractor.ts](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)
- [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts)
- [src/layouts/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/index.ts)
- [src/lib/core-classes.json](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json)

## Purpose and Scope

The Variant System is the foundational styling layer of `@ui8kit/core`, providing a CVA-based (class-variance-authority) approach to component styling. This system groups Tailwind CSS utility classes into 12 composable, reusable variant categories that cover approximately 80% of design scenarios, eliminating the need for manual `className` management and reducing style duplication across components.

This document covers the variant architecture, the 12 variant categories, CVA class generation, extraction mechanics, and composition patterns. For information about how components consume these variants, see [Core Components](#3.1) and [UI Components](#3.3). For build-time extraction of variant classes, see [Build System](#3.6).

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

---

## Architecture Overview

The Variant System operates as a three-stage pipeline: variant definitions, CVA resolution, and class application.

### Variant System Pipeline

```
Build-Time Extraction

Stage 3: Class Application

Stage 2: CVA Resolution

Stage 1: Variant Definitions

safelist for

whitelist for

src/core/variants/
TypeScript CVA definitions

12 Variant Categories
spacing, colors, layout,
typography, effects

class-variance-authority
cva() function calls

Component props
p='lg', rounded='xl'

Generated classes
p-8 rounded-xl

Primitives
Block, Box, Grid, Flex, Stack

Composites
Card, Button, Badge

Layouts
DashLayout, LayoutBlock

scripts/cva-extractor.ts
AST-based extraction

src/lib/core-classes.json
618 classes

Tailwind CSS purge

tw-merge utility
```

**Sources:** [README.md64-88](https://github.com/ui8kit/core/blob/2afe2195/README.md#L64-L88) [scripts/cva-extractor.ts282-291](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L282-L291) [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624)

---

## The 12 Variant Categories

The system provides 12 variant categories organized by design concern. Each category maps developer-friendly prop names to Tailwind CSS utility classes.

### Variant Category Overview

| Category                 | Variant Props                                                                    | Value Range                                                                                                              | Purpose                      |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| **Spacing**              | `p`, `m`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`                                                                      | Control padding and margin   |
| **Colors**               | `bg`, `c`, `borderColor`                                                         | Design system tokens: `primary`, `secondary`, `accent`, `destructive`, `muted`, `card`, `background`, `foreground`, etc. | Semantic color application   |
| **Layout - Sizing**      | `w`, `h`, `minH`, `maxW`                                                         | `auto`, `full`, `screen`, `fit`, `min`, `max`                                                                            | Width and height control     |
| **Layout - Position**    | `position`                                                                       | `static`, `relative`, `absolute`, `fixed`, `sticky`                                                                      | Element positioning          |
| **Typography - Size**    | `size`                                                                           | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`                                                               | Font size scaling            |
| **Typography - Weight**  | `weight`, `fw`                                                                   | `normal`, `medium`, `semibold`, `bold`                                                                                   | Font weight control          |
| **Typography - Align**   | `align`, `ta`                                                                    | `left`, `center`, `right`, `justify`                                                                                     | Text alignment               |
| **Typography - Leading** | `leading`                                                                        | `tight`, `normal`, `relaxed`                                                                                             | Line height control          |
| **Effects - Rounded**    | `rounded`                                                                        | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`                                                                     | Border radius                |
| **Effects - Shadow**     | `shadow`                                                                         | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`                                                                           | Box shadow application       |
| **Effects - Border**     | `border`                                                                         | `0`, `default`, `2`, `4` + directional variants                                                                          | Border thickness             |
| **Flexbox/Grid**         | `gap`, `justify`, `items`, `cols`, `rows`                                        | Contextual values                                                                                                        | Layout alignment and spacing |

**Sources:** [README.md174-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L174-L217) [src/components/README.md206-221](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L206-L221)

---

### Spacing Variants

Spacing variants control padding and margin using a consistent scale. Each variant supports directional modifiers.

#### Spacing Variant Structure

```
Value Scale

Margin Variants

Padding Variants

p (all sides)

px (horizontal)

py (vertical)

pt (top)

pr (right)

pb (bottom)

pl (left)

m (all sides)

mx (horizontal)

my (vertical)

mt (top)

mr (right)

mb (bottom)

ml (left)

none → 0

xs → 1 (0.25rem)

sm → 2 (0.5rem)

md → 4 (1rem)

lg → 8 (2rem)

xl → 12 (3rem)

2xl → 16+ (4rem+)

auto → auto
```

**Example Usage:**

```
// All sides padding
<Box p="lg">              // → p-8
<Box p="xl">              // → p-12

// Directional padding
<Box px="md" py="lg">     // → px-4 py-8
<Box pt="sm" pb="xl">     // → pt-2 pb-12

// Auto margins for centering
<Box mx="auto">           // → mx-auto
<Box ml="auto">           // → ml-auto

// Combined spacing
<Card p="xl" mb="lg">     // → p-12 mb-8
```

**Extracted Classes (sample):**

```
["p-0", "p-1", "p-2", "p-4", "p-6", "p-8", "p-12",
 "px-0", "px-1", "px-2", "px-4", "px-6", "px-8", "px-12",
 "py-0", "py-1", "py-2", "py-4", "py-8", "py-16", "py-32", "py-48",
 "m-0", "m-1", "m-2", "m-4", "m-6", "m-8", "m-12", "m-auto",
 "mx-auto", "my-auto", "mt-auto", "mb-auto", "ml-auto", "mr-auto"]
```

**Sources:** [README.md174-181](https://github.com/ui8kit/core/blob/2afe2195/README.md#L174-L181) [src/lib/core-classes.json261-463](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L261-L463) [src/components/README.md209-212](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L209-L212)

---

### Color Variants

Color variants apply the design system's semantic color tokens to backgrounds, text, and borders. Colors automatically support dark mode through Tailwind CSS variables.

#### Color Variant Mapping

```
Generated Classes

Semantic Tokens

Color Props

bg
(background)

c
(text color)

borderColor
(border)

primary /
primary-foreground

secondary /
secondary-foreground

accent /
accent-foreground

destructive /
destructive-foreground

muted /
muted-foreground

card /
card-foreground

background /
foreground

border / input / ring

bg-primary
bg-secondary
bg-accent
bg-destructive
bg-muted
bg-card
bg-background

text-primary
text-secondary
text-foreground
text-muted-foreground

border-primary
border-border
border-input
```

**Example Usage:**

```
// Background colors
<Card bg="card">                    // → bg-card
<Button bg="primary">               // → bg-primary
<Badge bg="destructive">            // → bg-destructive

// Text colors
<Text c="foreground">               // → text-foreground
<Text c="muted-foreground">         // → text-muted-foreground
<Title c="primary">                 // → text-primary

// Border colors
<Box borderColor="border">          // → border-border
<Box borderColor="input">           // → border-input

// Combined with hover states
<Button 
  bg="primary" 
  className="hover:bg-primary/90"
>                                   // → bg-primary hover:bg-primary/90
```

**Extracted Classes (sample):**

```
["bg-primary", "bg-primary-foreground", "bg-secondary", "bg-secondary-foreground",
 "bg-accent", "bg-accent-foreground", "bg-destructive", "bg-destructive-foreground",
 "bg-muted", "bg-muted-foreground", "bg-card", "bg-background", "bg-foreground",
 "bg-border", "bg-input", "bg-ring", "bg-transparent",
 "text-primary", "text-secondary", "text-foreground", "text-muted-foreground",
 "border-primary", "border-secondary", "border-border", "border-input"]
```

**Sources:** [README.md183-190](https://github.com/ui8kit/core/blob/2afe2195/README.md#L183-L190) [src/lib/core-classes.json26-576](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L26-L576)

---

### Layout Variants

Layout variants control element dimensions and positioning. Width and height variants support responsive and intrinsic sizing.

#### Layout Sizing Values

| Prop       | Values                                                                  | Generated Classes                                        | Use Case                  |
| ---------- | ----------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------- |
| `w`        | `auto`, `full`, `screen`, `fit`, `min`, `max`, `px`, numeric            | `w-auto`, `w-full`, `w-screen`, `w-fit`, `w-3` to `w-12` | Width control             |
| `h`        | `auto`, `full`, `screen`, `fit`, `min`, `max`, `px`, numeric            | `h-auto`, `h-full`, `h-screen`, `h-fit`, `h-3` to `h-12` | Height control            |
| `minH`     | `full`, `screen`, `200px`, `300px`, `400px`, `500px`                    | `min-h-full`, `min-h-screen`, `min-h-[200px]`            | Minimum height            |
| `maxW`     | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `4xl`, `6xl`, `full`, `screen-*` | `max-w-sm`, `max-w-md`, `max-w-screen-lg`                | Maximum width constraints |
| `position` | `static`, `relative`, `absolute`, `fixed`, `sticky`                     | `static`, `relative`, `absolute`, `fixed`, `sticky`      | Positioning mode          |

**Example Usage:**

```
// Full width/height
<Box w="full" h="screen">              // → w-full h-screen

// Intrinsic sizing
<Box w="fit" h="auto">                 // → w-fit h-auto

// Minimum height
<Box minH="screen">                    // → min-h-screen
<Box minH="400px">                     // → min-h-[400px]

// Maximum width with centering
<Container maxW="4xl" mx="auto">       // → max-w-4xl mx-auto

// Positioning
<Box position="relative">              // → relative
<Box position="absolute">              // → absolute
```

**Extracted Classes (sample):**

```
["w-auto", "w-full", "w-screen", "w-fit", "w-min", "w-max", "w-px", "w-3", "w-4", "w-5", "w-6", "w-8", "w-10", "w-12",
 "h-auto", "h-full", "h-screen", "h-fit", "h-min", "h-max", "h-px", "h-3", "h-4", "h-5", "h-6", "h-8", "h-9", "h-10", "h-11", "h-12",
 "min-h-full", "min-h-screen", "min-h-[200px]", "min-h-[300px]", "min-h-[400px]", "min-h-[500px]",
 "max-w-sm", "max-w-md", "max-w-lg", "max-w-xl", "max-w-2xl", "max-w-4xl", "max-w-6xl", "max-w-full", "max-w-screen-sm", "max-w-screen-md",
 "static", "relative", "absolute", "fixed", "sticky"]
```

**Sources:** [README.md192-199](https://github.com/ui8kit/core/blob/2afe2195/README.md#L192-L199) [src/lib/core-classes.json196-606](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L196-L606)

---

### Typography Variants

Typography variants control text appearance: size, weight, alignment, and leading (line height).

#### Typography Variant Matrix

```
Leading Variant

tight → leading-tight

normal → leading-normal

relaxed → leading-relaxed

Align Variant

left → text-left

center → text-center

right → text-right

justify → text-justify

Weight Variant

normal → font-normal

medium → font-medium

semibold → font-semibold

bold → font-bold

Size Variant

xs → text-xs

sm → text-sm

base → text-base

lg → text-lg

xl → text-xl

2xl → text-2xl

3xl → text-3xl

4xl → text-4xl

5xl → text-5xl
```

**Example Usage:**

```
// Size variants
<Text size="sm">                    // → text-sm
<Title size="3xl">                  // → text-3xl

// Weight variants
<Text weight="medium">              // → font-medium
<Title fw="bold">                   // → font-bold (fw is alias)

// Alignment variants
<Text align="center">               // → text-center
<Text ta="right">                   // → text-right (ta is alias)

// Leading variants
<Text leading="tight">              // → leading-tight

// Combined typography
<Title 
  size="2xl" 
  weight="bold" 
  align="center"
  leading="tight"
>                                   // → text-2xl font-bold text-center leading-tight
```

**Extracted Classes:**

```
["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl",
 "font-normal", "font-medium", "font-semibold", "font-bold",
 "text-left", "text-center", "text-right", "text-justify",
 "leading-tight", "leading-normal", "leading-relaxed"]
```

**Sources:** [README.md201-208](https://github.com/ui8kit/core/blob/2afe2195/README.md#L201-L208) [src/lib/core-classes.json150-579](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L150-L579)

---

### Effects Variants

Effects variants apply visual enhancements: rounded corners, shadows, and borders.

#### Effects Variant Categories

| Category    | Prop      | Values                                                      | Generated Classes                                                                                                    |
| ----------- | --------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Rounded** | `rounded` | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`        | `rounded-none`, `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`, `rounded-full` |
| **Shadow**  | `shadow`  | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `inner`              | `shadow-none`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-inner`                      |
| **Border**  | `border`  | `0`, `default`, `2`, `4` + directional (`t`, `r`, `b`, `l`) | `border-0`, `border`, `border-2`, `border-4`, `border-t`, `border-r`, `border-b`, `border-l`                         |

**Example Usage:**

```
// Rounded corners
<Card rounded="xl">                 // → rounded-xl
<Button rounded="full">             // → rounded-full
<Badge rounded="md">                // → rounded-md

// Shadows
<Card shadow="lg">                  // → shadow-lg
<Box shadow="md">                   // → shadow-md

// Borders
<Box border="default">              // → border
<Box border="2">                    // → border-2
<Box border="t">                    // → border-t (top only)

// Combined effects
<Card 
  rounded="2xl" 
  shadow="xl" 
  border="default"
  borderColor="border"
>                                   // → rounded-2xl shadow-xl border border-border
```

**Directional Border Variants:**

```
// Top border
<Box border="t" border="2">         // → border-t-2

// Bottom border
<Box border="b" border="4">         // → border-b-4

// Left and right
<Box border="l" border="r">         // → border-l border-r
```

**Extracted Classes (sample):**

```
["rounded-none", "rounded-sm", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full",
 "rounded-t-none", "rounded-t-sm", "rounded-t-md", "rounded-t-lg", "rounded-t-xl", "rounded-t-full",
 "rounded-b-none", "rounded-b-sm", "rounded-b-md", "rounded-b-lg", "rounded-b-xl", "rounded-b-full",
 "rounded-l-none", "rounded-l-sm", "rounded-l-md", "rounded-l-lg", "rounded-l-xl", "rounded-l-full",
 "rounded-r-none", "rounded-r-sm", "rounded-r-md", "rounded-r-lg", "rounded-r-xl", "rounded-r-full",
 "shadow-none", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner",
 "border", "border-0", "border-2", "border-4", "border-t", "border-r", "border-b", "border-l",
 "border-t-0", "border-t-2", "border-t-4", "border-b-0", "border-b-2", "border-b-4"]
```

**Sources:** [README.md210-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L210-L217) [src/lib/core-classes.json48-540](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L48-L540)

---

## CVA Engine and Class Generation

The variant system uses `class-variance-authority` (CVA) to transform prop-based API into Tailwind CSS classes.

### CVA Processing Flow

```
Output: Tailwind Classes

CVA Engine

CVA Definition

Input: Component Props

Component JSX

p='lg'
rounded='xl'
shadow='md'
bg='card'

cva() function

base: 'transition-all'

variants: {
  p: { lg: 'p-8' },
  rounded: { xl: 'rounded-xl' },
  shadow: { md: 'shadow-md' },
  bg: { card: 'bg-card' }
}

Variant Resolution

Class Merging

Generated className

'transition-all p-8 rounded-xl shadow-md bg-card'

Applied to DOM element
```

**CVA Definition Pattern:**

The CVA pattern used in variant files follows this structure:

```
import { cva } from 'class-variance-authority';

export const spacingVariants = cva('', {
  variants: {
    p: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-8',
      xl: 'p-12',
      '2xl': 'p-16'
    },
    px: {
      none: 'px-0',
      xs: 'px-1',
      sm: 'px-2',
      md: 'px-4',
      lg: 'px-8',
      xl: 'px-12'
    }
    // ... more spacing variants
  }
});
```

**Component Usage Pattern:**

Components import and apply variants:

```
import { spacingVariants } from '@/core/variants';

// Props are passed to CVA function
const className = spacingVariants({ p: 'lg', px: 'xl' });
// Result: 'p-8 px-12'
```

**Sources:** [scripts/cva-extractor.ts114-143](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L114-L143) [README.md283-304](https://github.com/ui8kit/core/blob/2afe2195/README.md#L283-L304)

---

## Extraction and Whitelist System

The build system extracts all CVA-defined classes to generate a whitelist for Tailwind CSS purging and `tw-merge` utilities.

### Extraction Pipeline

```
Consumers

Output

Extraction Process

Source Files

src/core/variants/
All .ts/.tsx files

CVA Definitions
cva('base', { variants: {...} })

scripts/cva-extractor.ts

@babel/parser
Parse to AST

@babel/traverse
Find cva() calls

Extract classes from:
• Base strings
• Variant objects
• Nested objects
• Arrays

618 unique classes

src/lib/core-classes.json

timestamp: 2025-10-29T12:17:54.882Z

tailwind.config.js
safelist configuration

tw-merge utility
class whitelist
```

**Extraction Script Details:**

The extraction script [scripts/cva-extractor.ts1-339](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L339) implements these steps:

1. **Recursively scan** `src/core/variants/` for `.ts` and `.tsx` files [scripts/cva-extractor.ts67-93](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L67-L93)

2. **Parse TypeScript** using Babel parser with plugins `['typescript', 'jsx']` [scripts/cva-extractor.ts103-106](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L103-L106)

3. **Traverse AST** to find `CallExpression` nodes where callee is `cva` [scripts/cva-extractor.ts114-125](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L114-L125)

4. **Extract classes** from:

   - String literals (base classes) [scripts/cva-extractor.ts129-137](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L129-L137)
   - Object expressions (variant definitions) [scripts/cva-extractor.ts138-142](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L138-L142)
   - Nested objects and arrays [scripts/cva-extractor.ts164-195](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L164-L195)

5. **Split by whitespace** to separate individual class names [scripts/cva-extractor.ts200-203](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L200-L203)

6. **Deduplicate** into a Set, then sort alphabetically [scripts/cva-extractor.ts46-51](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L46-L51)

**Generated Whitelist Structure:**

The output file [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624) contains:

```
{
  "classes": [
    "absolute",
    "bg-primary",
    "border",
    "flex",
    "gap-4",
    "p-8",
    "rounded-xl",
    "shadow-md",
    // ... 618 total classes
  ],
  "count": 618,
  "timestamp": "2025-10-29T12:17:54.882Z"
}
```

**Usage in Tailwind Configuration:**

```
// tailwind.config.js
const coreClasses = require('./src/lib/core-classes.json');

module.exports = {
  safelist: coreClasses.classes,
  // ... other config
};
```

**Sources:** [scripts/cva-extractor.ts1-339](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L339) [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624)

---

## Variant Composition

Variants are designed to be composable—multiple variants can be combined on a single component to achieve complex designs.

### Composition Patterns

```
Typography Composition

  size='2xl'
  weight='bold'
  align='center'
  leading='tight'
  c='primary'
/>

text-2xl font-bold text-center leading-tight text-primary

Directional Composition

  px='lg'
  py='md'
  mt='xl'
  mb='sm'
/>

px-8 py-4 mt-12 mb-2

Multi-Variant Composition

  p='xl'
  rounded='2xl'
  shadow='lg'
  bg='card'
/>

p-12 rounded-2xl shadow-lg bg-card

Single Variant Application

p-8
```

### Composition Priority

When variants conflict, the order of precedence is:

1. **Component-specific props** (higher specificity)
2. **Directional variants** (`px`, `py`) override general variants (`p`)
3. **Last prop wins** in the component prop list
4. **`className` prop** overrides all variants (escape hatch)

**Example: Directional Override**

```
// py overrides the vertical portion of p
<Box p="lg" py="xl">
// Result: p-8 py-12
// Tailwind applies: padding: 2rem (from p-8), then padding-top/bottom: 3rem (from py-12)
```

**Example: className Escape Hatch**

```
// className for custom styles not covered by variants
<Card 
  p="lg" 
  rounded="xl" 
  className="hover:scale-105 transition-transform"
>
// Result: p-8 rounded-xl hover:scale-105 transition-transform
```

**Sources:** [src/components/README.md238-257](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L238-L257)

---

## Type Safety and IntelliSense

The variant system provides full TypeScript support for type-safe prop usage and IntelliSense autocomplete.

### Type Definition Structure

```
Final Component Type

Component Props Interface

Variant Definition

cva('', { variants: {...} })

VariantProps

ComponentPropsWithoutRef<'div'>

SpacingVariantProps
ColorVariantProps
LayoutVariantProps
EffectsVariantProps

Custom component props

type CardProps = 
  BaseProps &
  VariantProps &
  CustomProps

IntelliSense shows:
• All variant options
• Valid values
• Descriptions
```

**Type Definition Example:**

```
// Variant definition with type extraction
import { cva, type VariantProps } from 'class-variance-authority';

const spacingVariants = cva('', {
  variants: {
    p: {
      none: 'p-0',
      xs: 'p-1',
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-8',
      xl: 'p-12'
    }
  }
});

// Extract variant prop types
export type SpacingVariantProps = VariantProps<typeof spacingVariants>;
// Result: { p?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' }

// Component props interface
interface CardProps extends ComponentPropsWithoutRef<'div'>, SpacingVariantProps {
  variant?: 'default' | 'outlined';
}
```

**IntelliSense Benefits:**

1. **Autocomplete**: Type `<Card p=` and IntelliSense shows `'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`
2. **Type checking**: Using `<Card p="invalid">` produces TypeScript error
3. **Documentation**: Hover over props to see available values
4. **Refactoring**: Rename variant values safely across the codebase

**Sources:** [README.md11-12](https://github.com/ui8kit/core/blob/2afe2195/README.md#L11-L12)

---

## Variant System File Structure

The variant system is organized by concern in `src/core/variants/`:

```
src/core/variants/
├── spacing.ts          # Padding and margin variants
├── colors.ts           # Background, text, border color variants
├── layout.ts           # Width, height, position variants
├── typography.ts       # Size, weight, align, leading variants
├── effects.ts          # Rounded, shadow, border variants
├── flex.ts             # Flexbox alignment and gap variants
├── grid.ts             # Grid layout variants
└── index.ts            # Exports all variants
```

**Export Pattern:**

All variants are exported from [src/index.ts1-3](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts#L1-L3):

```
// Export variants and utilities from core
export * from './core/variants';
```

This allows consumers to import variants:

```
import { 
  spacingVariants, 
  colorVariants, 
  roundedVariants 
} from '@ui8kit/core';
```

**Sources:** [src/index.ts1-3](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts#L1-L3)

---

## Usage Patterns

### Pattern 1: Direct Primitive Usage

Primitives (`Block`, `Box`, `Grid`, `Flex`, `Stack`) directly apply variants:

```
import { Block, Box, Stack } from '@ui8kit/core';

<Block 
  component="section" 
  p="xl" 
  bg="background" 
  rounded="lg"
>
  <Stack gap="md" align="center">
    <Box w="full" h="auto" border="default" rounded="md">
      Content
    </Box>
  </Stack>
</Block>
```

**Sources:** [README.md82-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L82-L103) [src/components/README.md23-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L92)

---

### Pattern 2: Composite Component Prop Forwarding

Composite components (`Card`, `Button`, `Badge`) extend primitives and forward variant props:

```
import { Card, Button, Text } from '@ui8kit/core';

<Card 
  p="lg" 
  rounded="xl" 
  shadow="md" 
  bg="card"
>
  <Card.Header>
    <Text size="xl" weight="bold" c="foreground">
      Title
    </Text>
  </Card.Header>
  <Card.Content>
    <Text size="base" c="muted-foreground">
      Description
    </Text>
  </Card.Content>
  <Card.Footer>
    <Button 
      bg="primary" 
      rounded="md" 
      px="lg" 
      py="md"
    >
      Action
    </Button>
  </Card.Footer>
</Card>
```

**Sources:** [README.md38-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L145) [src/components/README.md94-149](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L94-L149)

---

### Pattern 3: Layout Template Composition

Layouts use variants for consistent spacing and structure:

```
import { DashLayout, Container, LayoutBlock } from '@ui8kit/core';

<DashLayout>
  <Container maxW="6xl" px="lg" py="xl">
    <LayoutBlock 
      layout="grid" 
      gap="lg" 
      p="xl"
      bg="background"
      rounded="lg"
    >
      {/* Grid content */}
    </LayoutBlock>
  </Container>
</DashLayout>
```

**Sources:** [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168)

---

## Summary

The Variant System provides the foundational styling layer for `@ui8kit/core` through:

- **12 Composable Categories**: Spacing, colors, layout, typography, and effects covering \~80% of design scenarios
- **CVA-Based Engine**: Type-safe variant resolution using `class-variance-authority`
- **618 Extracted Classes**: Build-time extraction generates whitelist for Tailwind purging
- **Prop-Based API**: Clean developer experience with `p="lg"` instead of `className="p-8"`
- **Full Type Safety**: TypeScript types provide IntelliSense and compile-time validation
- **Composition Patterns**: Variants combine seamlessly across primitives, composites, and layouts

This architecture eliminates style duplication, reduces CSS complexity, and maintains type safety while providing unlimited design flexibility through composition.

**Sources:** [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22) [scripts/cva-extractor.ts1-339](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L1-L339) [src/lib/core-classes.json1-624](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L624)