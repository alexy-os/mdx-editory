---
{
  "title": "Advanced Workflow",
  "generatedAt": "2025-11-04T11:57:50.727Z"
}
---

# Advanced Workflow

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [src/components/GUIDE\_CREATE\_FORM.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

## Purpose and Scope

This document covers non-standard scenarios where the 15 composite UI components from [src/components/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/components/ui/) are insufficient for your use case. You will learn how to compose the five core primitives (`Block`, `Box`, `Grid`, `Flex`, `Stack`) from [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/) to build custom interfaces.

For typical component usage with ready-made composites, see [Basic Workflow](#5.1). For general usage guidelines and patterns, see [Best Practices](#5.3).

**Sources:** [.devin/wiki.json191-198](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L191-L198) [src/components/GUIDE\_CREATE\_FORM.md1-10](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L1-L10)

---

## When to Use Advanced Workflow

The library provides 15 composite components that cover \~80% of common UI scenarios. However, certain elements are intentionally absent from the library:

| Missing Component Type             | Reason for Absence                | Advanced Solution                             |
| ---------------------------------- | --------------------------------- | --------------------------------------------- |
| Form elements (Form, Label, Input) | HTML semantics vary widely        | Compose `Block` + `Box` with `component` prop |
| Select dropdowns                   | Requires complex state management | Use `Box component="select"` with variants    |
| Custom interactive widgets         | Application-specific logic        | Build with primitives + variants              |
| Non-standard layouts               | Unique structural requirements    | Compose `Grid`, `Flex`, `Stack` directly      |

**Decision Tree: Basic vs Advanced Workflow**

```
Yes

No

Yes

No

Yes

No

Need UI element

Component exists in
src/components/ui/?

Use composite component
(Button, Card, Badge)

Standard HTML element
with styling?

Use Block/Box
with component prop

Complex layout
structure?

Compose Grid/Flex/Stack
with primitives

Build custom component
from primitives

Basic Workflow (5.1)

Advanced Workflow (5.2)
```

**Sources:** [src/components/README.md1-8](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L8) [src/components/GUIDE\_CREATE\_FORM.md5-10](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L5-L10)

---

## Building Forms with Block and Box

The library does not include dedicated Form, Label, or Input components. Instead, use the polymorphic `component` prop on `Block` and `Box` to render semantic HTML elements with the full variant system.

### Component Prop Pattern

The `component` prop transforms primitives into any HTML element while maintaining type-safe variant props:

```
Variant Props

Rendered Elements

component prop

Primitive Components

applies to

applies to

applies to

applies to

Block
(semantic container)

Box
(flexible primitive)

component='form'

component='label'

component='input'

component='textarea'

component='select'

<form>

<label>

<input>

<textarea>

<select>

p, m, px, py, etc

w, h, maxW, minH

rounded, border, shadow

bg, c, borderColor
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md7-9](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L7-L9)

---

### Form Structure Pattern

Use `Block` with `component="form"` as the form wrapper, applying layout and styling variants:

**Form Container Structure:**

| Element       | Component                    | Props                                               | Purpose                             |
| ------------- | ---------------------------- | --------------------------------------------------- | ----------------------------------- |
| Form wrapper  | `<Block component="form">`   | `w`, `maxW`, `p`, `rounded`, `shadow`, `bg`         | Semantic form container with layout |
| Field groups  | `<Block>`                    | `w="full"`, `className="space-y-2"`                 | Vertical field spacing              |
| Labels        | `<Box component="label">`    | `c`, `className="text-sm font-medium"`              | Accessible field labels             |
| Inputs        | `<Box component="input">`    | `w="full"`, `p`, `rounded`, `border`, `borderColor` | Form input fields                   |
| Textareas     | `<Box component="textarea">` | `w="full"`, `p`, `rounded`, `border`, `minH`        | Multi-line text input               |
| Submit button | `<Button>`                   | `w="full"`, `size`, `variant`                       | Form submission                     |

**Example form structure** (see [src/components/GUIDE\_CREATE\_FORM.md14-32](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L14-L32)):

```
<Block 
  component="form"
  w="full"
  maxW="md"
  p="lg"
  rounded="lg"
  shadow="md"
  bg="white"
>
  {/* Form fields */}
</Block>
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md11-33](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L11-L33)

---

### Input Field Patterns

All input types use `Box` with `component="input"` and standard HTML attributes:

**Text Input** ([src/components/GUIDE\_CREATE\_FORM.md37-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L37-L50)):

```
<Box 
  component="input"
  type="text"
  placeholder="Enter your name"
  w="full"
  p="md"
  rounded="md"
  border="default"
  borderColor="gray-300"
/>
```

**Input with Focus States** ([src/components/GUIDE\_CREATE\_FORM.md54-67](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L54-L67)):

```
<Box 
  component="input"
  type="text"
  w="full"
  p="md"
  rounded="lg"
  border="default"
  bg="white"
  c="gray-900"
  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
```

**Password Input** ([src/components/GUIDE\_CREATE\_FORM.md70-82](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L70-L82)):

```
<Box 
  component="input"
  type="password"
  placeholder="Password"
  w="full"
  p="md"
  rounded="md"
  border="default"
  borderColor="gray-300"
/>
```

**Number Input with Constraints** ([src/components/GUIDE\_CREATE\_FORM.md84-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L84-L97)):

```
<Box 
  component="input"
  type="number"
  placeholder="Age"
  w="full"
  p="md"
  rounded="md"
  border="default"
  min={0}
  max={120}
/>
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md35-97](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L35-L97)

---

### Textarea Fields

Use `Box` with `component="textarea"` for multi-line text input:

**Basic Textarea** ([src/components/GUIDE\_CREATE\_FORM.md99-115](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L99-L115)):

```
<Box 
  component="textarea"
  rows={4}
  placeholder="Enter your message"
  w="full"
  p="md"
  rounded="md"
  border="default"
  borderColor="gray-300"
  className="resize-none"
/>
```

**Textarea with Minimum Height** ([src/components/GUIDE\_CREATE\_FORM.md117-129](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L117-L129)):

```
<Box 
  component="textarea"
  placeholder="Description"
  w="full"
  p="md"
  rounded="lg"
  border="default"
  minH="32"
  className="resize-y"
/>
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md99-129](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L99-L129)

---

### Complete Form Example

**Contact Form Architecture:**

```
Block component='form'
onSubmit handler
Layout: w='full' maxW='lg' p='lg'
Style: rounded='lg' shadow='lg' bg='white'

Block (Name field group)
w='full' space-y-2

Box component='label'
c='gray-700' text-sm font-medium

Box component='input'
type='text' name='name' required
w='full' p='md' rounded='md'
border='default' borderColor='gray-300'

Block (Email field group)
w='full' space-y-2

Box component='label'
c='gray-700' text-sm font-medium

Box component='input'
type='email' name='email' required
w='full' p='md' rounded='md'

Block (Message field group)
w='full' space-y-2

Box component='label'
c='gray-700' text-sm font-medium

Box component='textarea'
rows=5 name='message' required
w='full' p='md' minH='32'
resize-none focus:ring-2

Button type='submit'
w='full' size='lg' variant='default'
```

Full implementation at [src/components/GUIDE\_CREATE\_FORM.md134-226](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L134-L226) Key patterns:

1. **Form event handling**: `onSubmit` prop on form Block
2. **Field structure**: Block wrapper → label → input in each group
3. **Spacing**: `className="space-y-6"` on form, `className="space-y-2"` on field groups
4. **Validation**: `required` attribute on inputs
5. **Focus states**: Combine variants with `className` for focus rings

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md131-226](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L131-L226)

---

### Multi-Column Form Layout

For complex forms, use `Box` with grid display ([src/components/GUIDE\_CREATE\_FORM.md228-277](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L228-L277)):

```
<Block 
  component="form"
  w="full"
  maxW="2xl"
  p="lg"
  rounded="lg"
  shadow="md"
  bg="white"
>
  <Box 
    display="grid" 
    className="grid-cols-1 md:grid-cols-2 gap-6"
  >
    {/* First Name field */}
    <Block className="space-y-2">
      <Box component="label" className="text-sm font-medium">
        First Name
      </Box>
      <Box 
        component="input"
        type="text"
        w="full"
        p="md"
        rounded="md"
        border="default"
      />
    </Block>

    {/* Last Name field */}
    <Block className="space-y-2">
      <Box component="label" className="text-sm font-medium">
        Last Name
      </Box>
      <Box 
        component="input"
        type="text"
        w="full"
        p="md"
        rounded="md"
        border="default"
      />
    </Block>
  </Box>
</Block>
```

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md228-277](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L228-L277)

---

### Form Validation Pattern

Build reusable validated input components ([src/components/GUIDE\_CREATE\_FORM.md311-339](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L311-L339)):

```
function ValidatedInput({ error, label, ...props }) {
  return (
    <Block w="full" className="space-y-2">
      <Box component="label" c="gray-700" className="text-sm font-medium">
        {label}
      </Box>
      <Box 
        component="input"
        w="full"
        p="md"
        rounded="md"
        border="default"
        borderColor={error ? "red-500" : "gray-300"}
        bg={error ? "red-50" : "white"}
        className={error ? "focus:ring-red-500" : "focus:ring-blue-500"}
        {...props}
      />
      {error && (
        <Box c="red-600" className="text-sm">
          {error}
        </Box>
      )}
    </Block>
  );
}
```

**Pattern breakdown:**

- Conditional `borderColor` and `bg` based on error state
- Dynamic focus ring colors via `className`
- Error message display with `Box` for text color
- Props spreading with `{...props}` for HTML attributes

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md311-339](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L311-L339)

---

## Available Variant Props for Primitives

All primitives support the 12 CVA variant categories. Key variants for form building:

### Spacing Variants

| Prop                                    | Values                                              | Purpose         |
| --------------------------------------- | --------------------------------------------------- | --------------- |
| `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`         | Padding control |
| `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto` | Margin control  |

### Layout Variants

| Prop      | Values                                                            | Purpose                                   |
| --------- | ----------------------------------------------------------------- | ----------------------------------------- |
| `w`       | `auto`, `full`, `screen`, `fit`, `min`, `max`, `1/2`, `1/3`, etc. | Width control                             |
| `h`       | `auto`, `full`, `screen`, `fit`, `min`, `max`                     | Height control                            |
| `minH`    | Numeric values like `"32"`, `"64"`                                | Minimum height (useful for textareas)     |
| `maxW`    | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, etc.                  | Maximum width (useful for centered forms) |
| `display` | `block`, `flex`, `grid`, `inline`, `none`                         | Display type                              |

### Border & Style Variants

| Prop          | Values                                               | Purpose       |
| ------------- | ---------------------------------------------------- | ------------- |
| `border`      | `none`, `default`, `2`, `4`, `8`                     | Border width  |
| `borderColor` | All design system colors                             | Border color  |
| `rounded`     | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` | Border radius |
| `shadow`      | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                | Box shadow    |

### Color Variants

| Prop | Values                                                      | Purpose          |
| ---- | ----------------------------------------------------------- | ---------------- |
| `bg` | All design system colors (e.g., `white`, `card`, `gray-50`) | Background color |
| `c`  | All design system colors (e.g., `gray-700`, `red-600`)      | Text color       |

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md279-301](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L279-L301) [src/components/README.md205-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L205-L222)

---

## Best Practices for Advanced Composition

### Form Field Guidelines

1. **Always set `w="full"`** on input fields for consistent width ([src/components/GUIDE\_CREATE\_FORM.md304](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L304-L304))
2. **Use `Block` for form structure** (form element, field groups) ([src/components/GUIDE\_CREATE\_FORM.md305](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L305-L305))
3. **Use `Box` for actual inputs** (input, textarea, select) ([src/components/GUIDE\_CREATE\_FORM.md306](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L306-L306))
4. **Combine variant props with Tailwind classes** for focus states ([src/components/GUIDE\_CREATE\_FORM.md307](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L307-L307))
5. **Use `minH` for textarea** instead of fixed height ([src/components/GUIDE\_CREATE\_FORM.md308](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L308-L308))
6. **Apply `className="resize-none"`** to prevent textarea resizing if needed ([src/components/GUIDE\_CREATE\_FORM.md309](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L309-L309))

### Variant + ClassName Hybrid Pattern

The variant system covers \~80% of styling needs. For remaining 20%, combine variants with `className`:

```
<Box 
  component="input"
  // Variants cover structure
  w="full"
  p="md"
  rounded="md"
  border="default"
  bg="white"
  // className covers interactive states
  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
```

**When to use `className`:**

- Interactive states (`:hover`, `:focus`, `:active`)
- Pseudo-elements (`:before`, `:after`)
- Complex animations
- Grid/flex utilities not covered by variants
- Responsive breakpoints beyond variant system

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md302-310](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L302-L310) [src/components/README.md237-244](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L244)

---

## Custom Component Composition

### Building Reusable Composites

When you need the same pattern repeatedly, extract it into a custom component:

**Pattern: Labeled Input Field**

```
controls

displays

renders

Custom ValidatedInput Component

Block wrapper
w='full' space-y-2

Box component='label'
c='gray-700'
text-sm font-medium

Box component='input'
w='full' p='md'
rounded='md' border='default'
Conditional: borderColor, bg

Box (conditional render)
c='red-600' text-sm
Displays error message

Props:
- error (string | undefined)
- label (string)
- ...props (HTML attributes)
```

**Implementation approach:**

1. Accept variant props and HTML attributes via props spreading
2. Handle conditional logic (error states, validation)
3. Maintain accessibility (label associations, ARIA attributes)
4. Return primitive composition (Block + Box)

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md311-339](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L311-L339)

---

### Non-Form Custom Scenarios

**Custom Interactive Widgets:**

When building application-specific widgets (sliders, pickers, custom controls):

1. **Start with `Box` or `Block`** as container
2. **Apply semantic `component` prop** (`<Box component="button">` for clickable elements)
3. **Use variant props** for layout and styling
4. **Add event handlers** (`onClick`, `onChange`, etc.)
5. **Combine with `className`** for complex interactions

**Custom Layout Structures:**

For unique layout requirements not covered by DashLayout, LayoutBlock, or SplitBlock:

1. **Compose `Grid`, `Flex`, or `Stack`** from [src/core/ui/](https://github.com/ui8kit/core/blob/2afe2195/src/core/ui/)
2. **Apply layout variants** (`cols`, `gap`, `align`, `justify`)
3. **Nest primitives** for hierarchical structure
4. **Use `Block` with `component="section"`/`component="aside"`** for semantic markup

**Sources:** [src/components/README.md237-244](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L237-L244) [.devin/wiki.json191-198](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L191-L198)

---

## Comparison: Basic vs Advanced Workflow

**When to use each approach:**

```
Advanced Workflow (5.2)

Basic Workflow (5.1)

Yes

No

Ready-made components exist

Card, Button, Badge,
Title, Text, Image, Icon

Use composite components
from src/components/ui/

Example:
<Card p='lg' rounded='xl'>

Custom requirements

Form elements, custom widgets,
unique layouts

Compose primitives
from src/core/ui/

Example:
<Block component='form'>
<Box component='input'/>

Component exists
in library?
```

**Capability matrix:**

| Feature           | Basic Workflow                   | Advanced Workflow                 |
| ----------------- | -------------------------------- | --------------------------------- |
| Development speed | Fast (pre-built components)      | Moderate (manual composition)     |
| Flexibility       | Limited to component props       | Full control via primitives       |
| Code maintenance  | Easier (fewer components)        | More complex (more code)          |
| Type safety       | Full (composite component types) | Full (primitive component types)  |
| Variant support   | Via prop forwarding              | Direct application                |
| Semantic HTML     | Predefined structure             | Full control via `component` prop |
| Best for          | Standard UI patterns             | Custom/unique requirements        |

**Sources:** [src/components/README.md1-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L19) [src/components/GUIDE\_CREATE\_FORM.md1-10](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L1-L10)

---

## Summary

The advanced workflow enables building custom interfaces when the 15 composite components are insufficient:

1. **Forms**: Compose `Block` + `Box` with `component` prop for form elements, labels, and inputs
2. **Custom widgets**: Use primitives with semantic `component` props and variant system
3. **Unique layouts**: Compose `Grid`, `Flex`, `Stack` for structural requirements
4. **Hybrid approach**: Combine variant props (\~80% coverage) with `className` for edge cases

For standard scenarios with existing components, use [Basic Workflow](#5.1). For general guidelines, see [Best Practices](#5.3).

**Sources:** [src/components/GUIDE\_CREATE\_FORM.md341-347](https://github.com/ui8kit/core/blob/2afe2195/src/components/GUIDE_CREATE_FORM.md#L341-L347) [.devin/wiki.json191-198](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L191-L198)