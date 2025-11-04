---
{
  "title": "API Reference",
  "generatedAt": "2025-11-04T11:57:49.287Z"
}
---

# API Reference

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

This document provides a comprehensive reference for all exported APIs from the `@ui8kit/core` library. It covers component exports, variant props, TypeScript interfaces, and naming conventions used throughout the codebase.

For architectural context and component relationships, see [Architecture](#3). For detailed API documentation of individual components, see sub-pages: [Core Components](#4.1), [UI Components](#4.2), and [Layout Components](#4.3). For usage patterns and examples, see [Development Guide](#5).

## Export Structure

The library follows a flat export structure from [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) All components, variants, hooks, and utilities are re-exported from this single entry point for simplified imports.

```
Utility Hooks

Theme System

Variant Exports

Layout Components

UI Components

Core Primitives

Package Entry Point

src/index.ts
Main export barrel

Block
BlockProps

Box
BoxProps

Grid
GridProps

Flex
FlexProps

Stack
StackProps

Button
BaseButtonProps

Card + Card.Header/Content/Footer
CardProps, CardHeaderProps

Text
TextProps

Title
TitleProps

Badge
BadgeProps

Container
ContainerProps

Icon
IconProps

Image
ImageProps

Group
GroupProps

Sheet
SheetProps

Accordion
AccordionProps

DashLayout
DashLayoutProps

LayoutBlock
LayoutBlockProps

SplitBlock
SplitBlockProps

spacingVariants
marginVariants, paddingVariants

backgroundColorVariants
textColorVariants, borderColorVariants

widthVariants, heightVariants
positionVariants

fontSizeVariants, fontWeightVariants
textAlignVariants, lineHeightVariants

roundedVariants, shadowVariants
borderVariants

ThemeProvider
ThemeProviderProps

useTheme()
ThemeContextValue

modernUITheme
ThemeConfig

useMediaQuery(query)
boolean

useMobile()
boolean

useViewport()
ViewportSize
```

**Sources:** [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md362-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L362-L386) [.devin/wiki.json136-139](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L136-L139)

## Component Export Catalog

The following table documents all component exports with their source locations and TypeScript interfaces:

| Export Name        | Type      | Source File                                                                                                     | Props Interface        | Description                                         |
| ------------------ | --------- | --------------------------------------------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------- |
| `Block`            | Component | [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx)                     | `BlockProps`           | Semantic block container with HTML5 element support |
| `Box`              | Component | [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx)                         | `BoxProps`             | Flexible primitive with full variant support        |
| `Grid`             | Component | [src/core/ui/Grid.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Grid.tsx)                       | `GridProps`            | CSS Grid layout primitive                           |
| `Flex`             | Component | [src/core/ui/Flex.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Flex.tsx)                       | `FlexProps`            | Flexbox layout primitive                            |
| `Stack`            | Component | [src/core/ui/Stack.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Stack.tsx)                     | `StackProps`           | Vertical/horizontal stacking with gap               |
| `Button`           | Component | [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx)       | `BaseButtonProps`      | Action button with variants                         |
| `Card`             | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardProps`            | Flexible card with compound parts                   |
| `Card.Header`      | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardHeaderProps`      | Card header section                                 |
| `Card.Content`     | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardContentProps`     | Card content section                                |
| `Card.Footer`      | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardFooterProps`      | Card footer section                                 |
| `Card.Title`       | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardTitleProps`       | Card title element                                  |
| `Card.Description` | Component | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)           | `CardDescriptionProps` | Card description text                               |
| `Text`             | Component | [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx)           | `TextProps`            | Semantic text rendering                             |
| `Title`            | Component | [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx)         | `TitleProps`           | Heading hierarchy (h1-h6)                           |
| `Badge`            | Component | [src/components/ui/Badge.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Badge.tsx)         | `BadgeProps`           | Small label component                               |
| `Container`        | Component | [src/components/ui/Container.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Container.tsx) | `ContainerProps`       | Responsive container                                |
| `Icon`             | Component | [src/components/ui/Icon.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Icon.tsx)           | `IconProps`            | SVG icon wrapper                                    |
| `Image`            | Component | [src/components/ui/Image.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Image.tsx)         | `ImageProps`           | Optimized image component                           |
| `Group`            | Component | [src/components/ui/Group.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Group.tsx)         | `GroupProps`           | Group related elements                              |
| `Sheet`            | Component | [src/components/ui/Sheet.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Sheet.tsx)         | `SheetProps`           | Drawer/sheet component                              |
| `Accordion`        | Component | [src/components/ui/Accordion.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Accordion.tsx) | `AccordionProps`       | Expandable content sections                         |
| `DashLayout`       | Component | [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx)           | `DashLayoutProps`      | Dashboard layout template                           |
| `LayoutBlock`      | Component | [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)         | `LayoutBlockProps`     | Flexible content block layout                       |
| `SplitBlock`       | Component | [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)           | `SplitBlockProps`      | Two-column split layout                             |

**Sources:** [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md362-386](https://github.com/ui8kit/core/blob/2afe2195/README.md#L362-L386) [src/registry.json2-244](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json#L2-L244)

## Variant System API

The variant system provides 12 composable prop categories that apply across all components through the CVA (class-variance-authority) engine. Each variant category maps to specific TypeScript types and Tailwind CSS utility classes.

### Variant Prop Types

```
Source Files

Effects Variants

Typography Variants

Layout Variants

Color Variants

Spacing Variants

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

defined in

p, px, py, pt, pb, pl, pr
Type: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

m, mx, my, mt, mb, ml, mr
Type: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'auto'

bg
Type: 'background' | 'card' | 'primary' | 'secondary' | etc.

c
Type: 'foreground' | 'primary' | 'secondary' | 'muted' | etc.

borderColor
Type: 'border' | 'input' | 'primary' | etc.

w
Type: 'auto' | 'full' | 'screen' | 'fit' | 'min' | 'max'

h, minH
Type: 'auto' | 'full' | 'screen' | 'fit' | 'min'

maxW
Type: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | etc.

position
Type: 'relative' | 'absolute' | 'fixed' | 'sticky'

size
Type: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | etc.

weight
Type: 'normal' | 'medium' | 'semibold' | 'bold'

align
Type: 'left' | 'center' | 'right' | 'justify'

leading
Type: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'

rounded
Type: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

shadow
Type: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

border
Type: '1px solid border' | '2px solid border' | etc.

src/core/variants/spacing.ts
paddingVariants, marginVariants

src/core/variants/colors.ts
backgroundColorVariants, textColorVariants

src/core/variants/layout.ts
widthVariants, heightVariants, positionVariants

src/core/variants/typography.ts
fontSizeVariants, fontWeightVariants

src/core/variants/effects.ts
roundedVariants, shadowVariants, borderVariants
```

**Sources:** [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

### Variant Prop Reference Table

| Variant Category | Props                                   | Valid Values                                                                                           | Export Name               | Source File                                                                                                     |
| ---------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Padding**      | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | `'none'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`                                              | `paddingVariants`         | [src/core/variants/spacing.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/spacing.ts)       |
| **Margin**       | `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `'none'`, `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'auto'`                                    | `marginVariants`          | [src/core/variants/spacing.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/spacing.ts)       |
| **Background**   | `bg`                                    | `'background'`, `'card'`, `'primary'`, `'secondary'`, `'destructive'`, `'muted'`, `'accent'`           | `backgroundColorVariants` | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Text Color**   | `c`                                     | `'foreground'`, `'primary'`, `'secondary'`, `'muted'`, `'accent'`, `'destructive'`                     | `textColorVariants`       | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Border Color** | `borderColor`                           | `'border'`, `'input'`, `'primary'`, `'secondary'`, `'destructive'`                                     | `borderColorVariants`     | [src/core/variants/colors.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/colors.ts)         |
| **Width**        | `w`                                     | `'auto'`, `'full'`, `'screen'`, `'fit'`, `'min'`, `'max'`                                              | `widthVariants`           | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Height**       | `h`, `minH`                             | `'auto'`, `'full'`, `'screen'`, `'fit'`, `'min'`                                                       | `heightVariants`          | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Max Width**    | `maxW`                                  | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`, `'6xl'`, `'7xl'`, `'full'` | `maxWidthVariants`        | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Position**     | `position`                              | `'relative'`, `'absolute'`, `'fixed'`, `'sticky'`                                                      | `positionVariants`        | [src/core/variants/layout.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/layout.ts)         |
| **Font Size**    | `size`                                  | `'xs'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`                             | `fontSizeVariants`        | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Font Weight**  | `weight`                                | `'normal'`, `'medium'`, `'semibold'`, `'bold'`                                                         | `fontWeightVariants`      | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Text Align**   | `align`                                 | `'left'`, `'center'`, `'right'`, `'justify'`                                                           | `textAlignVariants`       | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Line Height**  | `leading`                               | `'none'`, `'tight'`, `'snug'`, `'normal'`, `'relaxed'`, `'loose'`                                      | `lineHeightVariants`      | [src/core/variants/typography.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/typography.ts) |
| **Rounded**      | `rounded`                               | `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`, `'full'`                                            | `roundedVariants`         | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |
| **Shadow**       | `shadow`                                | `'none'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'2xl'`                                                      | `shadowVariants`          | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |
| **Border**       | `border`                                | `'1px solid border'`, `'2px solid border'`, `'default'`                                                | `borderVariants`          | [src/core/variants/effects.ts](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/effects.ts)       |

**Sources:** [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/) [README.md174-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L174-L217) [.devin/wiki.json19-22](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L19-L22)

## Prop Forwarding Pattern

Components in the library implement a consistent prop forwarding pattern where composite components extend base primitives with additional variant props. This creates a type-safe inheritance chain.

```
Output

Variant Resolution

Primitive Layer

Component Layer

Developer API

forwards spacing & effects

applies button variants

applies base variants

  p='md'
  rounded='lg'
  variant='primary'
  size='md'
/>

Button
src/components/ui/Button.tsx

BaseButtonProps extends
- ButtonHTMLAttributes
- Spacing variants
- Effects variants
- Custom: variant, size

Box
src/core/ui/Box.tsx

BoxProps extends
- HTMLAttributes
- All variant props
- component prop

CVA Engine
class-variance-authority

Generated classes:
'p-4 rounded-lg'
+ button-specific classes

  class='...'
  data-class='button'
/>
```

**Sources:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14) [README.md14-17](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L17)

### Prop Forwarding Examples

The following examples demonstrate how variant props are forwarded from composite components to their base primitives:

**Button extends Box:**

```
// Button receives spacing and effects variants from Box
<Button 
  p="md"           // forwarded to Box → paddingVariants
  rounded="lg"     // forwarded to Box → roundedVariants
  variant="primary" // Button-specific prop
  size="md"        // Button-specific prop
/>
```

**Card extends Block:**

```
// Card receives all Block variants
<Card 
  p="xl"           // forwarded to Block → paddingVariants
  shadow="md"      // forwarded to Block → shadowVariants
  rounded="2xl"    // forwarded to Block → roundedVariants
  bg="card"        // forwarded to Block → backgroundColorVariants
/>
```

**Text extends Box:**

```
// Text receives Box variants plus typography variants
<Text 
  size="lg"        // Text-specific typography variant
  weight="bold"    // Text-specific typography variant
  c="primary"      // forwarded to Box → textColorVariants
  mb="md"          // forwarded to Box → marginVariants
/>
```

**Sources:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx) [README.md38-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L60)

## TypeScript Type System

The library provides comprehensive TypeScript support with precise type definitions for all components, variants, and utilities.

### Core Type Hierarchy

```
Layout Component Props

UI Component Props

Core Component Props

Variant Types

Base Types

React.HTMLAttributes

React.ComponentPropsWithRef

React.ForwardRefExoticComponent

SpacingProps
from paddingVariants, marginVariants
VariantProps

ColorProps
from backgroundColorVariants, textColorVariants
VariantProps

LayoutProps
from widthVariants, heightVariants
VariantProps

TypographyProps
from fontSizeVariants, fontWeightVariants
VariantProps

EffectsProps
from roundedVariants, shadowVariants
VariantProps

BoxProps extends
HTMLAttributes & SpacingProps
& ColorProps & LayoutProps
& EffectsProps & TypographyProps

BlockProps extends
BoxProps & { component?: 'section' | 'article' | ... }

GridProps extends
BlockProps & { cols?: number, gap?: string }

FlexProps extends
BoxProps & { direction?: 'row' | 'column' }

StackProps extends
BoxProps & { gap?: string, direction?: 'vertical' | 'horizontal' }

BaseButtonProps extends
ButtonHTMLAttributes & SpacingProps
& EffectsProps & { variant, size, ... }

CardProps extends
BlockProps & { variant?: string }

TextProps extends
BoxProps & TypographyProps
& { as?: 'p' | 'span' | ... }

TitleProps extends
BoxProps & TypographyProps
& { order: 1 | 2 | 3 | 4 | 5 | 6 }

DashLayoutProps extends
{ sidebar, header, children, ... }

LayoutBlockProps extends
BlockProps & { layout?: 'default' | 'grid' | 'flex' }

SplitBlockProps extends
{ left, right, ratio?, ... }
```

**Sources:** [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx) [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx) [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [src/layouts/](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/)

### Common Type Patterns

| Pattern                 | Description                                                                       | Example Interface                                                                                   | Source                                                                                                  |
| ----------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Variant Props**       | Props extracted from CVA variant definitions using `VariantProps<typeof variant>` | `VariantProps<typeof paddingVariants>`                                                              | [src/core/variants/](https://github.com/ui8kit/core/blob/2afe2195/src/core/variants/)                   |
| **Component Prop**      | Union type allowing semantic HTML element selection                               | `component?: 'section' \| 'article' \| 'nav' \| 'header' \| 'footer' \| 'aside' \| 'main' \| 'div'` | [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx)             |
| **As Prop**             | Union type for polymorphic text rendering                                         | `as?: 'p' \| 'span' \| 'div' \| 'em' \| 'strong' \| 'small'`                                        | [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx)   |
| **Order Prop**          | Numeric literal type for heading levels                                           | `order: 1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                                 | [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx) |
| **Ref Forwarding**      | `ForwardRefExoticComponent` with `ComponentPropsWithRef`                          | `React.forwardRef<HTMLDivElement, BoxProps>`                                                        | [src/core/ui/Box.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx)                 |
| **Compound Components** | Namespace pattern for related component parts                                     | `Card.Header`, `Card.Content`, `Card.Footer`                                                        | [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx)   |

**Sources:** [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## Common Component Props

All components in the library share a consistent set of base props inherited from React's HTML attributes and the variant system.

### Standard React Props

| Prop        | Type               | Description                                            | Inherited From          |
| ----------- | ------------------ | ------------------------------------------------------ | ----------------------- |
| `className` | `string`           | Additional CSS classes to merge with generated classes | `HTMLAttributes`        |
| `style`     | `CSSProperties`    | Inline styles                                          | `HTMLAttributes`        |
| `children`  | `ReactNode`        | Child elements to render                               | `HTMLAttributes`        |
| `ref`       | `Ref<HTMLElement>` | Ref to underlying DOM element                          | `ComponentPropsWithRef` |
| `data-*`    | `string`           | Data attributes for DOM targeting                      | `HTMLAttributes`        |
| `aria-*`    | `string`           | Accessibility attributes                               | `HTMLAttributes`        |

### Custom Component Props

| Prop         | Type                                                                                    | Default        | Description                            | Availability    |
| ------------ | --------------------------------------------------------------------------------------- | -------------- | -------------------------------------- | --------------- |
| `component`  | `'section' \| 'article' \| 'nav' \| 'header' \| 'footer' \| 'aside' \| 'main' \| 'div'` | `'div'`        | Semantic HTML element to render        | `Block`, `Grid` |
| `as`         | `'p' \| 'span' \| 'div' \| 'em' \| 'strong' \| 'small'`                                 | `'p'`          | Text element type                      | `Text`          |
| `order`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                                            | Required       | Heading level                          | `Title`         |
| `data-class` | `string`                                                                                | Component name | Component identifier for DOM targeting | All components  |

**Sources:** [src/core/ui/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx) [src/components/ui/Text.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Text.tsx) [src/components/ui/Title.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Title.tsx) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## Theme System API

The theme system provides dark mode support, accessibility preferences, and theme persistence through React Context.

### Theme Provider

```
// Export: ThemeProvider
// Interface: ThemeProviderProps
interface ThemeProviderProps {
  theme: ThemeConfig;
  children: ReactNode;
  defaultMode?: 'light' | 'dark' | 'system';
  storageKey?: string;
}

// Export: useTheme
// Returns: ThemeContextValue
interface ThemeContextValue {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
  mode: 'light' | 'dark' | 'system';
  setMode: (mode: 'light' | 'dark' | 'system') => void;
  preferences: ThemePreferences;
  updatePreferences: (preferences: Partial<ThemePreferences>) => void;
}

// Export: modernUITheme
// Type: ThemeConfig
interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  author: string;
  version: string;
  colors: ColorScheme;
  typography: TypographyConfig;
  spacing: SpacingConfig;
  effects: EffectsConfig;
}
```

**Sources:** [src/themes/providers/ThemeProvider.tsx1-109](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L109) [src/themes/modern-ui.ts](https://github.com/ui8kit/core/blob/2afe2195/src/themes/modern-ui.ts) [README.md219-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L249)

## Utility Hooks API

The library exports responsive design utilities for viewport detection and media queries.

| Hook            | Parameters      | Return Type                         | Description                         | Source                                                                                                        |
| --------------- | --------------- | ----------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `useMediaQuery` | `query: string` | `boolean`                           | Matches CSS media query             | [src/lib/hooks/useMediaQuery.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useMediaQuery.ts) |
| `useMobile`     | None            | `boolean`                           | Detects mobile viewport (< 768px)   | [src/lib/hooks/useMobile.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useMobile.ts)         |
| `useViewport`   | None            | `{ width: number, height: number }` | Returns current viewport dimensions | [src/lib/hooks/useViewport.ts](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/useViewport.ts)     |

**Usage Example:**

```
import { useMediaQuery, useMobile, useViewport } from '@ui8kit/core';

function ResponsiveComponent() {
  const isMobile = useMobile();
  const isSmall = useMediaQuery('(max-width: 640px)');
  const { width, height } = useViewport();
  
  return <Box>{isMobile ? 'Mobile' : 'Desktop'}</Box>;
}
```

**Sources:** [src/lib/hooks/](https://github.com/ui8kit/core/blob/2afe2195/src/lib/hooks/) [README.md341-359](https://github.com/ui8kit/core/blob/2afe2195/README.md#L341-L359)

## Component-Specific Variants

Some components define additional variants beyond the core variant system for specialized styling.

### Button Variants

```
// Defined in: src/components/ui/Button.tsx
export const buttonStyleVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline'
    }
  }
});

export const buttonSizeVariants = cva('', {
  variants: {
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-10 w-10'
    }
  }
});
```

**Sources:** [src/components/ui/Button.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx) [README.md284-303](https://github.com/ui8kit/core/blob/2afe2195/README.md#L284-L303)

### Card Variants

```
// Defined in: src/components/ui/Card.tsx
export const cardVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-card text-card-foreground',
      outlined: 'border border-border bg-card text-card-foreground'
    }
  }
});
```

**Sources:** [src/components/ui/Card.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx) [README.md125-144](https://github.com/ui8kit/core/blob/2afe2195/README.md#L125-L144)

## Data Attributes

All components render with `data-class` attributes for consistent DOM targeting and styling.

| Component      | `data-class` Value | Purpose                        |
| -------------- | ------------------ | ------------------------------ |
| `Block`        | `'block'`          | Identifies Block primitive     |
| `Box`          | `'box'`            | Identifies Box primitive       |
| `Grid`         | `'grid'`           | Identifies Grid primitive      |
| `Flex`         | `'flex'`           | Identifies Flex primitive      |
| `Stack`        | `'stack'`          | Identifies Stack primitive     |
| `Button`       | `'button'`         | Identifies Button component    |
| `Card`         | `'card'`           | Identifies Card component      |
| `Card.Header`  | `'card-header'`    | Identifies Card header         |
| `Card.Content` | `'card-content'`   | Identifies Card content        |
| `Card.Footer`  | `'card-footer'`    | Identifies Card footer         |
| `Text`         | `'text'`           | Identifies Text component      |
| `Title`        | `'title'`          | Identifies Title component     |
| `Badge`        | `'badge'`          | Identifies Badge component     |
| `Container`    | `'container'`      | Identifies Container component |

**Usage Example:**

```
// Targeting in tests or stylesheets
const button = document.querySelector('[data-class="button"]');

// CSS targeting
[data-class="card"] {
  /* Custom styles */
}
```

**Sources:** [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) [.devin/wiki.json11-14](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L11-L14)

## Detailed API Documentation

For complete API documentation of individual components with all props, methods, and usage examples, see:

- **[Core Components](#4.1)** - Primitives: `Block`, `Box`, `Grid`, `Flex`, `Stack`
- **[UI Components](#4.2)** - Composite components: `Button`, `Card`, `Text`, `Title`, `Badge`, etc.
- **[Layout Components](#4.3)** - Layout templates: `DashLayout`, `LayoutBlock`, `SplitBlock`

**Sources:** [.devin/wiki.json135-168](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L135-L168) [src/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/index.ts) [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453)