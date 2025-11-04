---
{
  "title": "Best Practices",
  "generatedAt": "2025-11-04T11:57:50.969Z"
}
---

# Best Practices

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

This document provides general guidelines and recommendations for effectively using the @ui8kit/core component library. It covers strategies for component selection, variant system usage, semantic HTML practices, accessibility, performance optimization, and composition patterns.

For common development patterns and typical usage examples, see [Basic Workflow](#5.1). For handling edge cases requiring custom solutions, see [Advanced Workflow](#5.2).

---

## Component Selection Strategy

Choosing the right component layer is fundamental to writing maintainable code. The three-layer architecture provides clear boundaries for different levels of abstraction.

### Decision Flow for Component Selection

```
Yes

No

Yes

No

Yes

No

Grid layout

Flex layout

Stack items

Generic

Need to render UI element

Building page
structure or
dashboard?

Need pre-styled
component with
variants?

Need semantic
HTML element?

Need layout
control?

Use DashLayout
src/layouts/DashLayout.tsx

Use LayoutBlock
src/layouts/LayoutBlock.tsx

Use SplitBlock
src/layouts/SplitBlock.tsx

Use UI Component
Button, Card, Badge, etc.
src/components/ui/

Use Block
with component prop
src/core/ui/Block.tsx

Use Box
generic container
src/core/ui/Box.tsx

Use Grid
src/core/ui/Grid.tsx

Use Flex
src/core/ui/Flex.tsx

Use Stack
src/core/ui/Stack.tsx
```

**Sources:** [README.md64-89](https://github.com/ui8kit/core/blob/2afe2195/README.md#L64-L89) [README.md105-120](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L120) [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168) [src/components/README.md1-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L19)

### Layer 1: Core Primitives Usage

Use core primitives when you need maximum control over layout and semantic structure:

| Component | Use When                                        | Example Scenario                                         |
| --------- | ----------------------------------------------- | -------------------------------------------------------- |
| `Block`   | Need semantic HTML5 element with variants       | `<Block component="section">`, `<Block component="nav">` |
| `Box`     | Need generic container without semantic meaning | Wrapper divs, flex items, grid cells                     |
| `Grid`    | Need CSS Grid layout                            | Product grids, image galleries, card layouts             |
| `Flex`    | Need flexbox layout with explicit control       | Custom toolbars, complex alignments                      |
| `Stack`   | Need vertical/horizontal stacking with gap      | Form fields, button groups, content sections             |

**Sources:** [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103) [src/components/README.md23-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L92)

### Layer 2: UI Components Usage

Use UI components for pre-styled, ready-to-use elements:

```
// ✅ Good: Use UI component for common elements
<Button variant="primary" size="lg" p="md" rounded="lg">
  Submit
</Button>

// ❌ Bad: Recreating UI component with primitives
<Box 
  component="button" 
  className="inline-flex items-center justify-center bg-primary text-primary-foreground..."
>
  Submit
</Box>
```

**Sources:** [README.md105-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L105-L145) [src/components/README.md94-204](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L94-L204)

### Layer 3: Layout Components Usage

Use layout components for structural page organization:

```
// ✅ Good: DashLayout for dashboard structure
<DashLayout 
  sidebar={<NavigationSidebar />}
  header={<DashboardHeader />}
>
  <Container>
    <Card p="lg">Content</Card>
  </Container>
</DashLayout>

// ❌ Bad: Manual layout reconstruction
<Box className="flex min-h-screen">
  <Box className="w-64 border-r">
    <NavigationSidebar />
  </Box>
  {/* Complex manual layout logic */}
</Box>
```

**Sources:** [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168) [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99)

---

## Variant System Usage

The variant system eliminates \~80% of className usage through 12 composable variants. Follow these guidelines to maximize its effectiveness.

### Variant Application Flow

```
Developer writes JSX

Variant Props
p='lg'
rounded='xl'
shadow='md'
bg='card'

class-variance-authority
Resolves variants to classes

core-classes.json
618 validated classes

Tailwind CSS
Applies utility classes

Rendered DOM
with semantic elements
```

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [src/lib/core-classes.json1-619](https://github.com/ui8kit/core/blob/2afe2195/src/lib/core-classes.json#L1-L619) [scripts/cva-extractor.ts223-260](https://github.com/ui8kit/core/blob/2afe2195/scripts/cva-extractor.ts#L223-L260)

### Variant Composition Guidelines

| Variant Category | Props                                                                            | Values                                              | Use Case                           |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------- |
| **Spacing**      | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr`, `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto` | Control padding and margins        |
| **Colors**       | `bg`, `c`, `borderColor`                                                         | Design system colors                                | Background, text, border colors    |
| **Layout**       | `w`, `h`, `minH`, `maxW`, `position`                                             | `auto`, `full`, `screen`, `fit`, `min`, `max`       | Control dimensions and positioning |
| **Typography**   | `size`, `weight`, `align`, `leading`                                             | Font-specific values                                | Text styling                       |
| **Effects**      | `rounded`, `shadow`, `border`                                                    | Preset values                                       | Visual enhancements                |

```
// ✅ Good: Compose variants for complex styling
<Card 
  p="xl" 
  rounded="2xl" 
  shadow="lg"
  bg="card"
  border="default"
  w="full"
  maxW="2xl"
  mx="auto"
>
  Content
</Card>

// ❌ Bad: Using className for variant-covered styles
<Card className="p-12 rounded-2xl shadow-lg bg-card border w-full max-w-2xl mx-auto">
  Content
</Card>

// ⚠️ Acceptable: className for the 20% edge cases
<Card 
  p="xl" 
  rounded="2xl"
  className="animate-pulse hover:scale-105 transition-transform"
>
  Custom animation
</Card>
```

**Sources:** [README.md171-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L171-L217) [src/components/README.md206-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L206-L222)

### When to Use className

The variant system covers \~80% of styling needs. Use `className` for:

1. **Animations and transitions** (not covered by variants)
2. **Pseudo-classes** like `:hover`, `:focus`, `:active`
3. **Custom grid/flex** patterns beyond basic layouts
4. **Project-specific** utility classes not in the design system

```
// ✅ Good: Use className for animations
<Box 
  p="lg" 
  rounded="xl"
  className="hover:scale-105 transition-transform duration-200"
>
  Interactive element
</Box>

// ✅ Good: Use className for pseudo-classes
<Button 
  variant="primary" 
  size="md"
  className="focus-visible:ring-2 focus-visible:ring-offset-2"
>
  Accessible button
</Button>
```

**Sources:** [README.md278-304](https://github.com/ui8kit/core/blob/2afe2195/README.md#L278-L304) [src/components/README.md237-244](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L244)

---

## Semantic HTML Best Practices

The library emphasizes semantic HTML5 elements for accessibility and SEO. Always use the most appropriate semantic element.

### Semantic Element Selection

```
Yes

No

Yes

No

Yes

No

Yes

No

Yes

No

Yes

No

Yes

No

Rendering content

Navigation menu
or links?

Self-contained
syndicated content?

Thematic
grouping?

Tangentially
related content?

Introductory
content?

Footer content?

Main content
area?

Block component='nav'

Block component='article'

Block component='section'

Block component='aside'

Block component='header'

Block component='footer'

Block component='main'

Box
generic container
```

**Sources:** [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14) [src/components/README.md239](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L239-L239) [src/core/ui/Block.tsx1-15](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx#L1-L15)

### Semantic HTML Examples

```
// ✅ Good: Semantic page structure
<Block component="main" py="xl">
  <Block component="section" py="lg">
    <Container>
      <Block component="header" mb="lg">
        <Title order={1}>Page Title</Title>
      </Block>
      <Block component="article">
        <Text>Article content...</Text>
      </Block>
    </Container>
  </Block>
</Block>

// ❌ Bad: Generic divs everywhere
<Box py="xl">
  <Box py="lg">
    <Container>
      <Box mb="lg">
        <Title order={1}>Page Title</Title>
      </Box>
      <Box>
        <Text>Article content...</Text>
      </Box>
    </Container>
  </Box>
</Box>

// ✅ Good: Navigation with semantic nav element
<Block component="nav" p="md" bg="background" border="default">
  <Stack gap="sm">
    <a href="/">Home</a>
    <a href="/about">About</a>
  </Stack>
</Block>

// ✅ Good: Proper heading hierarchy
<Block component="article">
  <Title order={1}>Main Title</Title>
  <Title order={2}>Section Title</Title>
  <Title order={3}>Subsection Title</Title>
</Block>
```

**Sources:** [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14) [src/components/README.md28-64](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L28-L64) [src/core/ui/Block.tsx1-15](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Block.tsx#L1-L15)

---

## Accessibility Best Practices

Ensure all components are accessible to users with disabilities by following WCAG guidelines.

### Core Accessibility Principles

| Principle               | Implementation                                          | Example                                             |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| **Keyboard Navigation** | Ensure all interactive elements are keyboard accessible | Use semantic `<button>` instead of `<div onClick>`  |
| **ARIA Labels**         | Provide labels for screen readers                       | `aria-label`, `aria-labelledby`, `aria-describedby` |
| **Focus Management**    | Visible focus indicators                                | `:focus-visible` styles                             |
| **Color Contrast**      | Minimum 4.5:1 ratio for text                            | Use design system colors                            |
| **Alt Text**            | Descriptive text for images                             | Always provide `alt` prop                           |

```
// ✅ Good: Accessible button
<Button 
  variant="primary" 
  size="md"
  aria-label="Submit form"
  className="focus-visible:ring-2 focus-visible:ring-primary"
>
  Submit
</Button>

// ✅ Good: Accessible image
<Image 
  src="/product.jpg"
  alt="Blue running shoes with white stripes"
  rounded="lg"
/>

// ✅ Good: Accessible navigation
<Block component="nav" aria-label="Main navigation">
  <Stack gap="md" role="list">
    <a href="/" role="listitem">Home</a>
    <a href="/about" role="listitem">About</a>
  </Stack>
</Block>

// ❌ Bad: Non-semantic interactive element
<Box 
  onClick={handleClick}
  className="cursor-pointer"
>
  Click me
</Box>

// ✅ Good: Use Button component
<Button onClick={handleClick}>
  Click me
</Button>
```

**Sources:** [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14) [src/components/ui/Button.tsx1-40](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx#L1-L40) [src/components/ui/Image.tsx1-20](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Image.tsx#L1-L20)

### Form Accessibility

```
// ✅ Good: Accessible form with semantic structure
<Block component="form" onSubmit={handleSubmit}>
  <Stack gap="md">
    <Box>
      <Text as="label" htmlFor="email" weight="medium" mb="xs">
        Email
      </Text>
      <Box
        component="input"
        id="email"
        type="email"
        aria-required="true"
        aria-describedby="email-error"
        p="sm"
        rounded="md"
        border="default"
        w="full"
      />
      <Text id="email-error" size="sm" c="destructive" mt="xs">
        {emailError}
      </Text>
    </Box>
    
    <Button type="submit" variant="primary">
      Submit
    </Button>
  </Stack>
</Block>
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md1-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L1-L50) [src/components/README.md239](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L239-L239)

---

## Performance Optimization

Follow these patterns to maintain optimal performance in large applications.

### Component Composition vs Prop Drilling

```
// ✅ Good: Compose components naturally
<Card p="lg" rounded="xl">
  <Card.Header>
    <Title order={2}>Product</Title>
  </Card.Header>
  <Card.Content>
    <Stack gap="md">
      <Image src="/product.jpg" alt="Product" />
      <Text>Description</Text>
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Button variant="primary">Buy Now</Button>
  </Card.Footer>
</Card>

// ❌ Bad: Excessive prop drilling
<ProductCard
  title="Product"
  imageSrc="/product.jpg"
  imageAlt="Product"
  description="Description"
  buttonText="Buy Now"
  buttonVariant="primary"
  cardPadding="lg"
  cardRounded="xl"
/>
```

**Sources:** [README.md306-338](https://github.com/ui8kit/core/blob/2afe2195/README.md#L306-L338) [src/components/ui/Card.tsx1-80](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx#L1-L80)

### Memoization Guidelines

```
import { memo } from 'react';

// ✅ Good: Memoize expensive list items
const ProductCard = memo(({ product }) => (
  <Card p="md" rounded="lg">
    <Card.Content>
      <Stack gap="sm">
        <Image src={product.image} alt={product.name} />
        <Text>{product.name}</Text>
        <Text size="sm" c="muted-foreground">
          ${product.price}
        </Text>
      </Stack>
    </Card.Content>
  </Card>
));

// ✅ Good: Use forwardRef for ref forwarding
import { forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => (
  <Box
    component="input"
    ref={ref}
    p="sm"
    rounded="md"
    border="default"
    {...props}
  />
));
```

**Sources:** [src/core/ui/Box.tsx1-30](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/Box.tsx#L1-L30) [src/components/ui/Button.tsx1-40](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx#L1-L40)

### Avoid Unnecessary Re-renders

```
// ✅ Good: Use primitive values as dependencies
const [count, setCount] = useState(0);

useEffect(() => {
  // Effect logic
}, [count]);

// ❌ Bad: Object/array dependencies cause unnecessary re-renders
const config = { theme: 'dark' };

useEffect(() => {
  // This runs on every render
}, [config]);

// ✅ Good: Extract primitive values
const theme = config.theme;

useEffect(() => {
  // This runs only when theme changes
}, [theme]);
```

**Sources:** [README.md341-359](https://github.com/ui8kit/core/blob/2afe2195/README.md#L341-L359)

---

## Composition Patterns

The library supports multiple composition patterns. Choose the appropriate pattern for your use case.

### Pattern Comparison

```
Pattern 4: Children Composition

Stack

Child component 1

Child component 2

Child component 3

Pattern 3: Content Hooks

LayoutBlock

beforeContent function

content function

afterContent function

Pattern 2: Prop Forwarding

Button
extends BaseButton

spacingVariants
roundedVariants
shadowVariants

Pattern 1: Compound Components

Card

Card.Header

Card.Content

Card.Footer
```

**Sources:** [README.md15-17](https://github.com/ui8kit/core/blob/2afe2195/README.md#L15-L17) [src/layouts/LayoutBlock.tsx15-22](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L15-L22) [src/components/ui/Card.tsx1-80](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx#L1-L80)

### Compound Components Pattern

Use for flexible component structures with predefined sub-components:

```
// ✅ Good: Flexible card composition
<Card p="lg" rounded="xl" shadow="md">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    <Stack gap="md">
      {/* Content */}
    </Stack>
  </Card.Content>
  <Card.Footer>
    <Group gap="md" justify="end">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save</Button>
    </Group>
  </Card.Footer>
</Card>

// ✅ Good: Optional parts
<Card p="lg">
  <Card.Content>
    {/* Only content, no header/footer */}
  </Card.Content>
</Card>
```

**Sources:** [README.md38-59](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L59) [README.md121-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L121-L145) [src/components/ui/Card.tsx1-80](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Card.tsx#L1-L80)

### Prop Forwarding Pattern

All UI components forward variant props from the base components:

```
// ✅ Good: Button with forwarded spacing and visual variants
<Button 
  variant="primary"
  size="lg"
  p="md"        // From spacingVariants
  rounded="lg"  // From roundedVariants
  shadow="sm"   // From shadowVariants
>
  Click me
</Button>

// ✅ Good: Card with forwarded layout variants
<Card
  p="xl"         // From spacingVariants
  rounded="2xl"  // From roundedVariants
  shadow="lg"    // From shadowVariants
  w="full"       // From layoutVariants
  maxW="2xl"     // From layoutVariants
  mx="auto"      // From spacingVariants
>
  Content
</Card>
```

**Sources:** [README.md16](https://github.com/ui8kit/core/blob/2afe2195/README.md#L16-L16) [src/components/README.md12-18](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L12-L18) [src/components/ui/Button.tsx1-40](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/Button.tsx#L1-L40)

### Content Hooks Pattern

Use for dynamic rendering in layout components:

```
// ✅ Good: LayoutBlock with content hooks
<LayoutBlock
  layout="grid"
  cols={3}
  gap="lg"
  contentHooks={{
    beforeContent: () => (
      <Block component="header" mb="lg">
        <Title order={1}>Page Title</Title>
      </Block>
    ),
    content: () => products.map(product => (
      <Card key={product.id} p="md">
        {/* Product card */}
      </Card>
    )),
    afterContent: () => (
      <Block component="footer" mt="lg">
        <Button>Load More</Button>
      </Block>
    )
  }}
/>
```

**Sources:** [src/layouts/LayoutBlock.tsx15-22](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L15-L22) [src/layouts/LayoutBlock.tsx1-50](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L50)

---

## Common Anti-Patterns

Avoid these common mistakes when using the library.

### Anti-Pattern 1: Overusing className

```
// ❌ Bad: Using className for variant-covered styles
<Card className="p-12 rounded-2xl shadow-lg bg-card w-full max-w-2xl">
  Content
</Card>

// ✅ Good: Use variants
<Card p="xl" rounded="2xl" shadow="lg" bg="card" w="full" maxW="2xl">
  Content
</Card>
```

### Anti-Pattern 2: Bypassing Semantic HTML

```
// ❌ Bad: Generic divs for navigation
<Box className="nav-container">
  <Box className="nav-item">Home</Box>
  <Box className="nav-item">About</Box>
</Box>

// ✅ Good: Semantic navigation
<Block component="nav" aria-label="Main navigation">
  <Stack gap="md" component="ul" role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </Stack>
</Block>
```

### Anti-Pattern 3: Recreating Existing Components

```
// ❌ Bad: Recreating Button component
const CustomButton = ({ children, ...props }) => (
  <Box
    component="button"
    className="inline-flex items-center justify-center rounded-md px-4 py-2 bg-primary text-white"
    {...props}
  >
    {children}
  </Box>
);

// ✅ Good: Extend existing Button
import { Button } from '@ui8kit/core';

const CustomButton = ({ children, ...props }) => (
  <Button 
    variant="primary" 
    size="md"
    className="custom-animation" // Only add custom styles
    {...props}
  >
    {children}
  </Button>
);
```

### Anti-Pattern 4: Excessive Nesting

```
// ❌ Bad: Unnecessary wrapper nesting
<Box>
  <Box>
    <Box>
      <Box>
        <Text>Content</Text>
      </Box>
    </Box>
  </Box>
</Box>

// ✅ Good: Minimal nesting
<Box>
  <Text>Content</Text>
</Box>

// ✅ Good: Use Stack for spacing instead of wrappers
<Stack gap="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Stack>
```

### Anti-Pattern 5: Ignoring data-class Attributes

```
// ❌ Bad: Custom selectors without data-class
<Card className="my-custom-card">
  <div className="my-custom-header">Header</div>
</Card>

// ✅ Good: Use data-class attributes for targeting
<Card data-class="product-card">
  <Card.Header data-class="product-card-header">
    Header
  </Card.Header>
</Card>

// In CSS or testing:
// [data-class="product-card"] { ... }
// screen.getByTestId('product-card')
```

**Sources:** [src/components/README.md223-235](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L235) [src/components/README.md237-244](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L244)

---

## Summary Checklist

Use this checklist when building interfaces with @ui8kit/core:

- [ ] **Component Selection**: Use the appropriate layer (Core/UI/Layout) for each use case
- [ ] **Variant System**: Prefer variants over className for \~80% of styling needs
- [ ] **Semantic HTML**: Use appropriate semantic elements via `component` prop on `Block`
- [ ] **Accessibility**: Include ARIA labels, keyboard navigation, and focus management
- [ ] **Performance**: Compose components naturally, avoid prop drilling
- [ ] **Composition**: Use compound components, prop forwarding, and content hooks appropriately
- [ ] **Data Attributes**: Utilize `data-class` attributes for DOM targeting and testing
- [ ] **Type Safety**: Leverage TypeScript types for prop validation
- [ ] **Avoid Anti-Patterns**: Don't overuse className, bypass semantics, or recreate components

**Sources:** [README.md388-402](https://github.com/ui8kit/core/blob/2afe2195/README.md#L388-L402) [src/components/README.md237-244](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L244)