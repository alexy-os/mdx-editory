---
{
  "title": "Core Components",
  "generatedAt": "2025-11-04T11:57:49.554Z"
}
---

# Core Components

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/components/ui/Block/Block.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx)
- [src/components/ui/Box/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts)

This page provides complete API reference documentation for the five fundamental primitive components in `src/core/ui/`. These are Layer 1 components (atoms) that serve as the foundational building blocks for all higher-level components in the library.

**Scope**: This page covers only the core primitives: `Block`, `Box`, `Grid`, `Flex`, and `Stack`. For extended UI components (Button, Card, Badge, etc.), see [UI Components](#4.2). For architectural explanations and composition patterns, see [Core Components](#3.1).

## Component Overview

The core primitives provide low-level rendering capabilities with direct access to the CVA variant system. They render semantic HTML5 elements while accepting variant props for styling.

```
React Core

Variant System

Core Primitives Layer

Block
(src/core/ui/Block.tsx)

Box
(src/core/ui/Box.tsx)

Grid
(src/core/ui/Grid.tsx)

Flex
(src/core/ui/Flex.tsx)

Stack
(src/core/ui/Stack.tsx)

spacingVariants
(src/core/variants/)

colorVariants

layoutVariants

roundedVariants

shadowVariants

borderVariants

React.forwardRef

HTMLElement
```

**Sources**: [README.md82-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L82-L103) Diagram 1 from high-level architecture

## Component Comparison

| Component | Primary Use Case             | Semantic Element                                                        | Layout Type           | Key Variants                                                |
| --------- | ---------------------------- | ----------------------------------------------------------------------- | --------------------- | ----------------------------------------------------------- |
| `Block`   | Semantic sections            | `section`, `article`, `nav`, `header`, `footer`, `aside`, `main`, `div` | Block-level container | All variants (spacing, color, layout, effects)              |
| `Box`     | Generic container            | `div`, `span`, any HTML element                                         | Flexible primitive    | All variants (spacing, color, layout, effects)              |
| `Grid`    | CSS Grid layouts             | `div` with `display: grid`                                              | CSS Grid              | Grid-specific (cols, rows, gap) + layout variants           |
| `Flex`    | Flexbox layouts              | `div` with `display: flex`                                              | Flexbox               | Flex-specific (direction, align, justify) + layout variants |
| `Stack`   | Vertical/horizontal stacking | `div` with flex                                                         | Stacked layout        | Stack-specific (gap, direction) + spacing variants          |

**Sources**: [README.md82-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L82-L103) Diagram 1

---

## Block Component

The `Block` component renders semantic HTML5 structural elements with full variant system support. It is the primary container for building page sections with semantic meaning.

### Type Definition

```
interface BlockProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantSpacingProps,
    ColorProps,
    VariantLayoutProps,
    RoundedProps,
    ShadowProps,
    BorderProps {
  children: ReactNode;
  component?: ElementType;
  variant?: 'section' | 'main' | 'nav' | 'article' | 'header' | 'footer' | 'aside' | 'div';
}
```

### Props Reference

| Prop                                                               | Type                                                                                    | Default  | Description                           |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | -------- | ------------------------------------- |
| `children`                                                         | `ReactNode`                                                                             | Required | Content to render inside the block    |
| `component`                                                        | `ElementType`                                                                           | -        | Override the rendered HTML element    |
| `variant`                                                          | `'section' \| 'main' \| 'nav' \| 'article' \| 'header' \| 'footer' \| 'aside' \| 'div'` | `'div'`  | Semantic HTML element to render       |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`                            | Spacing values                                                                          | -        | Padding variants                      |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr`                            | Spacing values                                                                          | -        | Margin variants                       |
| `bg`                                                               | Color token                                                                             | -        | Background color                      |
| `c`                                                                | Color token                                                                             | -        | Text color                            |
| `borderColor`                                                      | Color token                                                                             | -        | Border color                          |
| `w`                                                                | Layout value                                                                            | `'full'` | Width                                 |
| `h`                                                                | Layout value                                                                            | -        | Height                                |
| `minH`                                                             | Layout value                                                                            | -        | Minimum height                        |
| `position`                                                         | `'relative' \| 'absolute' \| 'fixed' \| 'sticky'`                                       | -        | CSS position                          |
| `rounded`                                                          | Rounded value                                                                           | -        | Border radius                         |
| `shadow`                                                           | Shadow value                                                                            | -        | Box shadow                            |
| `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight` | Border value                                                                            | -        | Border styles                         |
| `className`                                                        | `string`                                                                                | -        | Additional CSS classes                |
| `ref`                                                              | `Ref<HTMLElement>`                                                                      | -        | Forward ref to underlying DOM element |

### forwardRef Implementation

The `Block` component uses React's `forwardRef` pattern to expose the underlying DOM element reference:

```
export const Block = forwardRef<HTMLElement, BlockProps>(
  ({ children, component, variant = 'div', ...props }, ref) => {
    const elementType = component || variant;
    return <BaseElement ref={ref} component={elementType} {...props}>{children}</BaseElement>;
  }
);
```

**Key Points**:

- Generic type `forwardRef<HTMLElement, BlockProps>` ensures type-safe ref access
- `ref` parameter is automatically typed as `Ref<HTMLElement>`
- The ref is passed through to the underlying DOM element
- `displayName` is set for React DevTools debugging

### Variant Application Flow

```
Component Props
{p: 'lg', bg: 'card', rounded: 'md'}

Extract Variant Props

spacingVariants({p: 'lg'})

colorVariants({bg: 'card'})

roundedVariants({rounded: 'md'})

CVA Engine

Generated Classes
'p-8 bg-card rounded-md'

cn() utility
Merge with className

DOM Element
<section class='...' />
```

**Sources**: [src/components/ui/Block/Block.tsx33-86](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L33-L86)

### Usage Examples

**Basic semantic section:**

```
<Block variant="section" p="lg" bg="background">
  <h2>Section Title</h2>
  <p>Section content</p>
</Block>
```

**Navigation with positioning:**

```
<Block variant="nav" position="sticky" bg="primary" c="white" p="md">
  <NavLinks />
</Block>
```

**Article with shadow and rounded corners:**

```
<Block variant="article" p="xl" rounded="lg" shadow="md" bg="card">
  <ArticleContent />
</Block>
```

**Custom element override:**

```
<Block component="form" variant="div" p="lg" onSubmit={handleSubmit}>
  <FormFields />
</Block>
```

### Data Attributes

All `Block` instances automatically receive `data-class="block"` for consistent DOM targeting:

```
<BaseBlock
  data-class="block"
  className={/* merged variant classes */}
  {...props}
/>
```

**Sources**: [src/components/ui/Block/Block.tsx1-88](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L88) [README.md82-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L82-L103)

---

## Box Component

The `Box` component is the most flexible primitive, capable of rendering any HTML element with full variant support. It serves as a low-level building block for custom components.

### Type Definition

```
interface BoxProps 
  extends React.HTMLAttributes<HTMLElement>,
    VariantSpacingProps,
    ColorProps,
    VariantLayoutProps,
    RoundedProps,
    ShadowProps,
    BorderProps {
  children?: ReactNode;
  component?: ElementType;
  as?: ElementType; // Alias for component
}
```

### Props Reference

| Prop              | Type               | Default | Description                                    |
| ----------------- | ------------------ | ------- | ---------------------------------------------- |
| `children`        | `ReactNode`        | -       | Content to render (optional for void elements) |
| `component`       | `ElementType`      | `'div'` | HTML element or component to render            |
| `as`              | `ElementType`      | -       | Alias for `component` prop                     |
| All spacing props | Spacing values     | -       | Padding and margin variants                    |
| All color props   | Color tokens       | -       | Background, text, border colors                |
| All layout props  | Layout values      | -       | Width, height, position, display               |
| All effect props  | Effect values      | -       | Rounded, shadow, border                        |
| `className`       | `string`           | -       | Additional CSS classes                         |
| `ref`             | `Ref<HTMLElement>` | -       | Forward ref to DOM element                     |

### Component Polymorphism

The `Box` component supports polymorphic rendering through the `component` or `as` prop:

```
Box component='button'

Polymorphic Logic

React.createElement(component, props)

<button class='...' />

Box as='a'

Polymorphic Logic

React.createElement('a', props)

<a class='...' />

Box (default)

Polymorphic Logic

React.createElement('div', props)

<div class='...' />
```

### TypeScript Attribute Forwarding

The `Box` component extends `React.HTMLAttributes<HTMLElement>`, which means:

1. **All standard HTML attributes are type-safe**: `onClick`, `onMouseOver`, `data-*`, `aria-*`, etc.
2. **Attributes are forwarded to the underlying element**: Props not consumed by variants pass through
3. **Type inference works with `component` prop**: TypeScript narrows attribute types based on the element

```
// ✅ Valid: div accepts onClick
<Box onClick={handler}>Click me</Box>

// ✅ Valid: input accepts value
<Box component="input" value={inputValue} />

// ✅ Valid: button accepts type
<Box component="button" type="submit">Submit</Box>
```

### Usage Examples

**Generic container:**

```
<Box p="md" bg="muted" rounded="sm">
  Generic content
</Box>
```

**Button element:**

```
<Box component="button" p="md" bg="primary" c="white" rounded="md" onClick={handleClick}>
  Custom Button
</Box>
```

**Link element:**

```
<Box as="a" href="/page" p="sm" c="blue" hover:underline>
  Link text
</Box>
```

**Inline span:**

```
<Box component="span" c="muted" size="sm">
  Inline text
</Box>
```

**Input wrapper:**

```
<Box component="input" type="text" w="full" p="sm" border="default" rounded="md" />
```

**Sources**: [README.md85-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L85-L103) [src/components/ui/Box/index.ts1](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Box/index.ts#L1-L1)

---

## Grid Component

The `Grid` component provides CSS Grid layout capabilities with declarative props for grid-specific configuration.

### Type Definition

```
interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantSpacingProps, 'p' | 'px' | 'py' | 'gap'>,
    Pick<VariantLayoutProps, 'w' | 'h' | 'minH'> {
  children: ReactNode;
  cols?: number | string;
  rows?: number | string;
  areas?: string;
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
  alignItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyItems?: 'start' | 'end' | 'center' | 'stretch';
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly';
}
```

### Props Reference

| Prop             | Type                  | Default  | Description                                                          |
| ---------------- | --------------------- | -------- | -------------------------------------------------------------------- |
| `children`       | `ReactNode`           | Required | Grid items to layout                                                 |
| `cols`           | `number \| string`    | -        | `grid-template-columns` value (e.g., 2, '1fr 2fr', 'repeat(3, 1fr)') |
| `rows`           | `number \| string`    | -        | `grid-template-rows` value                                           |
| `areas`          | `string`              | -        | `grid-template-areas` value                                          |
| `autoFlow`       | Grid auto-flow values | `'row'`  | Direction for auto-placed items                                      |
| `gap`            | Spacing value         | -        | Gap between grid items                                               |
| `alignItems`     | Alignment value       | -        | Vertical alignment of items within cells                             |
| `justifyItems`   | Alignment value       | -        | Horizontal alignment of items within cells                           |
| `alignContent`   | Alignment value       | -        | Vertical alignment of the grid within container                      |
| `justifyContent` | Alignment value       | -        | Horizontal alignment of the grid within container                    |
| `p`, `px`, `py`  | Spacing values        | -        | Padding variants                                                     |
| `w`, `h`, `minH` | Layout values         | -        | Container dimensions                                                 |
| `ref`            | `Ref<HTMLDivElement>` | -        | Forward ref to grid container                                        |

### Grid Layout Patterns

```
Auto-Flow Grid

Grid autoFlow='dense' cols={4}

Auto-placed items

Fill gaps automatically

Named Grid Areas

Grid areas='header header | nav main | footer footer'

Header area

Nav area

Main area

Footer area

Simple Column Grid

Grid cols={3} gap='md'

Item 1

Item 2

Item 3

Item 4
```

### Usage Examples

**Simple column grid:**

```
<Grid cols={3} gap="md" p="lg">
  <Box bg="muted" p="md">Item 1</Box>
  <Box bg="muted" p="md">Item 2</Box>
  <Box bg="muted" p="md">Item 3</Box>
</Grid>
```

**Responsive grid with custom columns:**

```
<Grid cols="repeat(auto-fit, minmax(250px, 1fr))" gap="lg">
  {items.map(item => <GridItem key={item.id} />)}
</Grid>
```

**Named grid areas:**

```
<Grid
  areas={`
    "header header header"
    "nav main aside"
    "footer footer footer"
  `}
  cols="200px 1fr 200px"
  rows="auto 1fr auto"
  gap="md"
  minH="screen"
>
  <Box style={{ gridArea: 'header' }}>Header</Box>
  <Box style={{ gridArea: 'nav' }}>Nav</Box>
  <Box style={{ gridArea: 'main' }}>Main</Box>
  <Box style={{ gridArea: 'aside' }}>Aside</Box>
  <Box style={{ gridArea: 'footer' }}>Footer</Box>
</Grid>
```

**Sources**: [README.md91-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L91-L103)

---

## Flex Component

The `Flex` component provides Flexbox layout capabilities with declarative props for flex-specific configuration.

### Type Definition

```
interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<VariantSpacingProps, 'p' | 'px' | 'py' | 'gap'>,
    Pick<VariantLayoutProps, 'w' | 'h' | 'minH'> {
  children: ReactNode;
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline';
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  inline?: boolean;
}
```

### Props Reference

| Prop             | Type                                                                | Default    | Description                                           |
| ---------------- | ------------------------------------------------------------------- | ---------- | ----------------------------------------------------- |
| `children`       | `ReactNode`                                                         | Required   | Flex items to layout                                  |
| `direction`      | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'`            | `'row'`    | Main axis direction                                   |
| `align`          | `'start' \| 'end' \| 'center' \| 'stretch' \| 'baseline'`           | -          | Cross-axis alignment (`align-items`)                  |
| `justify`        | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | -          | Main-axis alignment (`justify-content`)               |
| `wrap`           | `'nowrap' \| 'wrap' \| 'wrap-reverse'`                              | `'nowrap'` | Whether items wrap to multiple lines                  |
| `inline`         | `boolean`                                                           | `false`    | Use `display: inline-flex` instead of `display: flex` |
| `gap`            | Spacing value                                                       | -          | Gap between flex items                                |
| `p`, `px`, `py`  | Spacing values                                                      | -          | Padding variants                                      |
| `w`, `h`, `minH` | Layout values                                                       | -          | Container dimensions                                  |
| `ref`            | `Ref<HTMLDivElement>`                                               | -          | Forward ref to flex container                         |

### Flexbox Axis Model

```
```

### Usage Examples

**Horizontal layout with spacing:**

```
<Flex direction="row" justify="between" align="center" gap="md" p="lg">
  <Box>Left content</Box>
  <Box>Center content</Box>
  <Box>Right content</Box>
</Flex>
```

**Vertical stack:**

```
<Flex direction="column" gap="sm" w="full">
  <Box>First item</Box>
  <Box>Second item</Box>
  <Box>Third item</Box>
</Flex>
```

**Centered content:**

```
<Flex justify="center" align="center" minH="screen">
  <Box>Centered content</Box>
</Flex>
```

**Wrapping grid alternative:**

```
<Flex wrap="wrap" gap="md" justify="start">
  {items.map(item => (
    <Box key={item.id} w="200px">
      {item.content}
    </Box>
  ))}
</Flex>
```

**Sources**: [README.md91-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L91-L103)

---

## Stack Component

The `Stack` component simplifies vertical or horizontal stacking with automatic gap spacing. It is a specialized version of `Flex` optimized for common stacking patterns.

### Type Definition

```
interface StackProps
  extends Omit<FlexProps, 'wrap' | 'inline'> {
  children: ReactNode;
  direction?: 'vertical' | 'horizontal';
  spacing?: Spacing value;
  gap?: Spacing value; // Alias for spacing
}
```

### Props Reference

| Prop             | Type                         | Default      | Description                                  |
| ---------------- | ---------------------------- | ------------ | -------------------------------------------- |
| `children`       | `ReactNode`                  | Required     | Items to stack                               |
| `direction`      | `'vertical' \| 'horizontal'` | `'vertical'` | Stacking direction                           |
| `spacing`        | Spacing value                | -            | Gap between items (maps to `gap` internally) |
| `gap`            | Spacing value                | -            | Alternative prop name for `spacing`          |
| `align`          | Alignment value              | -            | Cross-axis alignment                         |
| `justify`        | Alignment value              | -            | Main-axis alignment                          |
| `p`, `px`, `py`  | Spacing values               | -            | Padding variants                             |
| `w`, `h`, `minH` | Layout values                | -            | Container dimensions                         |
| `ref`            | `Ref<HTMLDivElement>`        | -            | Forward ref to stack container               |

### Stack vs Flex Comparison

| Feature          | Stack                        | Flex                                                     |
| ---------------- | ---------------------------- | -------------------------------------------------------- |
| Direction API    | `'vertical' \| 'horizontal'` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` |
| Wrapping         | Not supported                | `wrap` prop available                                    |
| Primary Use Case | Simple stacking patterns     | Complex layouts requiring full flex control              |
| Gap Prop         | `spacing` or `gap`           | `gap` only                                               |
| API Simplicity   | Simplified for common cases  | Full flexbox API                                         |

### Usage Examples

**Vertical stack (default):**

```
<Stack gap="md" p="lg">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</Stack>
```

**Horizontal stack:**

```
<Stack direction="horizontal" gap="sm" align="center">
  <Button>Cancel</Button>
  <Button variant="primary">Save</Button>
</Stack>
```

**Form layout:**

```
<Stack gap="lg" w="full">
  <Box>
    <Text weight="medium" mb="xs">Email</Text>
    <Box component="input" type="email" w="full" p="sm" border="default" />
  </Box>
  <Box>
    <Text weight="medium" mb="xs">Password</Text>
    <Box component="input" type="password" w="full" p="sm" border="default" />
  </Box>
  <Button variant="primary" w="full">Sign In</Button>
</Stack>
```

**Sources**: [README.md91-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L91-L103)

---

## TypeScript Type System

### Variant Props Type Composition

All core components compose their props interfaces from shared variant type definitions:

```
```

**Sources**: [src/components/ui/Block/Block.tsx1-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L1-L18)

### Generic Type Parameters

The `forwardRef` generic signature ensures type safety for both props and refs:

```
// Pattern used by all core components
forwardRef<RefType, PropsType>(
  (props: PropsType, ref: Ref<RefType>) => ReactElement
)

// Example: Block component
forwardRef<HTMLElement, BlockProps>(
  ({ children, component, variant, ...props }, ref) => {
    // Implementation
  }
)
```

**Type Safety Guarantees:**

1. **Props are fully typed**: Autocomplete works for all variant props
2. **Ref type matches element**: `ref.current` is typed as `HTMLElement`
3. **HTML attributes are validated**: Invalid attributes trigger TypeScript errors
4. **Component polymorphism is safe**: `component` prop narrows attribute types

**Sources**: [src/components/ui/Block/Block.tsx33-34](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L33-L34)

### Prop Intersection Types

Core components use TypeScript intersection types (`&`) to combine multiple prop interfaces:

```
interface BlockProps 
  extends React.HTMLAttributes<HTMLElement>,    // HTML attributes
    VariantSpacingProps,                        // Spacing variants
    ColorProps,                                 // Color variants
    VariantLayoutProps,                         // Layout variants
    RoundedProps,                               // Rounded variants
    ShadowProps,                                // Shadow variants
    BorderProps {                               // Border variants
  // Component-specific props
  children: ReactNode;
  component?: ElementType;
  variant?: 'section' | 'main' | 'nav' | /* ... */;
}
```

**Benefits:**

- **Prop merging**: All variant props are available on the component
- **No prop collisions**: TypeScript ensures no overlapping prop names
- **IntelliSense support**: IDE autocomplete shows all available props
- **Type narrowing**: Optional props are properly typed as `T | undefined`

**Sources**: [src/components/ui/Block/Block.tsx20-31](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L20-L31)

---

## Component Selection Guide

### Decision Tree

```
```

### Usage Recommendations

| Scenario                           | Recommended Component               | Rationale                                         |
| ---------------------------------- | ----------------------------------- | ------------------------------------------------- |
| Page section with semantic meaning | `Block variant="section"`           | SEO and accessibility benefits from semantic HTML |
| Navigation bar                     | `Block variant="nav"`               | Proper landmark for screen readers                |
| Article content                    | `Block variant="article"`           | Semantic structure for content                    |
| Form container                     | `Block component="form"`            | Semantic form element with variant support        |
| Generic div container              | `Box`                               | Most flexible primitive, any element              |
| Button or link with styling        | `Box component="button"`            | Full control over element type and styling        |
| Multi-column layout                | `Grid cols={3}`                     | Declarative grid API                              |
| Card grid (responsive)             | `Grid cols="repeat(auto-fit, ...)"` | Responsive grid without media queries             |
| Horizontal button group            | `Stack direction="horizontal"`      | Simple API for horizontal spacing                 |
| Vertical form fields               | `Stack gap="lg"`                    | Clean stacking with consistent gaps               |
| Navbar with space-between          | `Flex justify="between"`            | Flexbox alignment control                         |
| Complex responsive layout          | `Flex wrap="wrap"`                  | Wrapping with full flex control                   |

**Sources**: [README.md82-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L82-L103) Diagram 1

---

## Best Practices

### 1. Prefer Semantic Elements

Use `Block` with semantic variants instead of generic `div` elements when structure has meaning:

```
// ✅ Good: Semantic structure
<Block variant="article" p="lg">
  <Block variant="header" mb="md">
    <Title>Article Title</Title>
  </Block>
  <Block component="p">Article content...</Block>
  <Block variant="footer" mt="md">
    Footer content
  </Block>
</Block>

// ❌ Avoid: Non-semantic structure
<Box p="lg">
  <Box mb="md">
    <Title>Article Title</Title>
  </Box>
  <Box>Article content...</Box>
  <Box mt="md">Footer content</Box>
</Box>
```

### 2. Use Component Polymorphism

Leverage `component` prop to render the correct HTML element while maintaining variant props:

```
// ✅ Good: Correct semantic element
<Box component="button" onClick={handleClick} p="md" bg="primary">
  Click me
</Box>

// ❌ Avoid: div with onClick (accessibility issues)
<Box onClick={handleClick} p="md" bg="primary">
  Click me
</Box>
```

### 3. Choose the Right Layout Component

Don't use `Flex` for simple stacking; `Stack` is more readable:

```
// ✅ Good: Simple stack
<Stack gap="md">
  <Item1 />
  <Item2 />
  <Item3 />
</Stack>

// ❌ Avoid: Overcomplicated
<Flex direction="column" gap="md">
  <Item1 />
  <Item2 />
  <Item3 />
</Flex>
```

### 4. Leverage Variant Props

Use variant props instead of `className` for common styles:

```
// ✅ Good: Variant props
<Block p="lg" bg="card" rounded="md" shadow="sm">
  Content
</Block>

// ❌ Avoid: className strings
<Block className="p-8 bg-card rounded-md shadow-sm">
  Content
</Block>
```

### 5. Forward Refs for DOM Access

Always provide ref types when accessing DOM elements:

```
// ✅ Good: Typed ref
const blockRef = useRef<HTMLElement>(null);

useEffect(() => {
  if (blockRef.current) {
    blockRef.current.scrollIntoView();
  }
}, []);

return <Block ref={blockRef}>Content</Block>;
```

**Sources**: [README.md278-359](https://github.com/ui8kit/core/blob/2afe2195/README.md#L278-L359) Diagram 6

---

## Integration with Variant System

### Variant Import Pattern

All core components import and apply variants from `src/core/variants/`:

```
import {
  spacingVariants,
  colorVariants,
  layoutVariants,
  roundedVariants,
  shadowVariants,
  borderVariants,
  cn
} from "@ui8kit/core";

// Apply variants in className
className={cn(
  spacingVariants({ p, px, py, pt, pb, pl, pr, m, mx, my, mt, mb, ml, mr }),
  colorVariants({ bg, c, borderColor }),
  layoutVariants({ w, h, minH, position }),
  roundedVariants({ rounded }),
  shadowVariants({ shadow }),
  borderVariants({ border, borderTop, borderBottom, borderLeft, borderRight }),
  className // User-provided className last (highest specificity)
)}
```

**Sources**: [src/components/ui/Block/Block.tsx3-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L3-L18) [src/components/ui/Block/Block.tsx70-78](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L70-L78)

### Class Merging with cn()

The `cn()` utility (from `class-variance-authority`) intelligently merges Tailwind classes:

1. **Deduplicates conflicting classes**: `cn('p-4', 'p-8')` → `'p-8'` (last wins)
2. **Preserves non-conflicting classes**: `cn('p-4 bg-red', 'mt-4')` → `'p-4 bg-red mt-4'`
3. **Handles conditional classes**: `cn('base', condition && 'conditional')` → conditional inclusion

**Sources**: [src/components/ui/Block/Block.tsx70](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Block/Block.tsx#L70-L70)

### Variant Coverage

The core components provide access to these variant categories:

| Variant Category | Props                                                                            | Values                                              | Coverage               |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------- |
| Spacing          | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto` | \~80% of spacing needs |
| Colors           | `bg`, `c`, `borderColor`                                                         | Design system tokens                                | Full color palette     |
| Layout           | `w`, `h`, `minH`, `maxW`, `position`                                             | Responsive sizes                                    | Common dimensions      |
| Effects          | `rounded`, `shadow`                                                              | Predefined scales                                   | Visual enhancements    |
| Borders          | `border`, `borderTop`, `borderBottom`, `borderLeft`, `borderRight`               | Border styles                                       | Edge decoration        |

For complete variant documentation, see [Variant System](#3.2).

**Sources**: [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) Diagram 3

---

## Common Patterns

### Pattern 1: Form Layout with Block and Box

```
<Block component="form" p="lg" bg="card" rounded="lg" onSubmit={handleSubmit}>
  <Stack gap="md">
    <Box>
      <Text weight="medium" mb="xs">Email</Text>
      <Box component="input" type="email" w="full" p="sm" border="default" rounded="md" />
    </Box>
    <Box>
      <Text weight="medium" mb="xs">Password</Text>
      <Box component="input" type="password" w="full" p="sm" border="default" rounded="md" />
    </Box>
    <Button type="submit" variant="primary" w="full">Sign In</Button>
  </Stack>
</Block>
```

### Pattern 2: Dashboard Grid Layout

```
<Grid cols="repeat(auto-fit, minmax(300px, 1fr))" gap="lg" p="lg">
  <Card>
    <Card.Header>Metric 1</Card.Header>
    <Card.Content>Value</Card.Content>
  </Card>
  <Card>
    <Card.Header>Metric 2</Card.Header>
    <Card.Content>Value</Card.Content>
  </Card>
  <Card>
    <Card.Header>Metric 3</Card.Header>
    <Card.Content>Value</Card.Content>
  </Card>
</Grid>
```

### Pattern 3: Page Header with Flex

```
<Block variant="header" bg="background" border="default" borderBottom>
  <Container>
    <Flex justify="between" align="center" p="md">
      <Flex align="center" gap="md">
        <Image src="/logo.png" w="32px" h="32px" />
        <Title order={1} size="lg">App Name</Title>
      </Flex>
      <Stack direction="horizontal" gap="sm">
        <Button variant="ghost">Docs</Button>
        <Button variant="primary">Sign In</Button>
      </Stack>
    </Flex>
  </Container>
</Block>
```

### Pattern 4: Sidebar Navigation

```
<Block variant="nav" bg="muted" w="250px" h="screen" position="fixed">
  <Stack gap="xs" p="md">
    <Box component="a" href="/dashboard" p="sm" rounded="md" bg="primary" c="white">
      Dashboard
    </Box>
    <Box component="a" href="/analytics" p="sm" rounded="md" hover:bg="muted">
      Analytics
    </Box>
    <Box component="a" href="/settings" p="sm" rounded="md" hover:bg="muted">
      Settings
    </Box>
  </Stack>
</Block>
```

**Sources**: [README.md310-359](https://github.com/ui8kit/core/blob/2afe2195/README.md#L310-L359) Diagram 6

---

## Performance Considerations

### 1. Variant Prop Extraction

Variant props are extracted and processed on every render. For performance-critical components with many variant props:

```
// ✅ Memoize variant props if they come from complex computations
const variantProps = useMemo(() => ({
  p: computedPadding,
  bg: computedBackground,
  rounded: computedRadius
}), [computedPadding, computedBackground, computedRadius]);

<Block {...variantProps}>Content</Block>
```

### 2. Ref Forwarding Overhead

The `forwardRef` pattern adds minimal overhead but is necessary for DOM access. If you don't need refs, regular components would be marginally faster (but core components always use `forwardRef` for consistency).

### 3. Class Merging Cost

The `cn()` utility performs string parsing on every render. For static className strings that don't change:

```
// ✅ Extract static classes outside component
const staticClasses = cn('base-class', 'another-class');

function MyComponent() {
  return <Block className={staticClasses}>Content</Block>;
}
```

### 4. Component vs Element Trade-off

Using core components adds a thin abstraction layer over raw HTML. For performance-critical scenarios with thousands of elements (e.g., virtualized lists), consider using raw HTML with Tailwind classes:

```
// Core component: ~1ms overhead per 100 elements
<Block p="md">Item</Block>

// Raw HTML: No abstraction overhead
<div className="p-4">Item</div>
```

**Sources**: [README.md398-403](https://github.com/ui8kit/core/blob/2afe2195/README.md#L398-L403)

---

## Related Documentation

- **[Variant System](#3.2)** - Complete documentation of the CVA-based variant system
- **[UI Components](#4.2)** - API reference for extended components (Button, Card, etc.)
- **[Layout Components](#4.3)** - API reference for layout templates (DashLayout, etc.)
- **[Core Components Architecture](#3.1)** - Architectural explanation and composition patterns
- **[Best Practices](#5.3)** - General guidelines for using components effectively
- **[Advanced Workflow](#5.2)** - Examples of composing Block + Box for custom forms

**Sources**: Inferred from wiki.json structure