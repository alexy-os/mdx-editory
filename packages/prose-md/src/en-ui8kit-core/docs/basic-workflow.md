---
{
  "title": "Basic Workflow",
  "generatedAt": "2025-11-04T11:57:50.504Z"
}
---

# Basic Workflow

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/components/README.md](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md)

## Purpose and Scope

This document describes the typical development workflows and patterns used when building user interfaces with `@ui8kit/core`. It covers common scenarios developers encounter when composing components, applying styling through the variant system, and building standard UI patterns like cards, forms, and layouts.

For advanced scenarios where standard components are insufficient (e.g., creating custom form components), see [Advanced Workflow](#5.2). For general guidelines and performance recommendations, see [Best Practices](#5.3).

**Sources:** [.devin/wiki.json181-188](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L181-L188) [src/components/README.md1-259](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L259)

---

## Component Selection Workflow

The first step in any development workflow is selecting the appropriate component for your use case. The library follows a three-layer hierarchy where each layer serves specific purposes.

```
Yes

No

Yes

No

Yes

No

Start: Need to render UI

Need layout
structure?

Need semantic
container?

Need pre-styled
component?

Layer 1: Core Primitives

Layer 2: UI Components

Layer 3: Layouts

Box
(generic container)

Block
(semantic element)

Grid
(CSS Grid)

Flex
(Flexbox)

Stack
(vertical/horizontal)

Button

Card + subcomponents

Text

Title

Container

Badge

Group

Icon

Image

DashLayout

LayoutBlock

SplitBlock
```

**Decision matrix:**

| Scenario                                      | Component Choice  | Reason                                          |
| --------------------------------------------- | ----------------- | ----------------------------------------------- |
| Generic container with styling                | `Box`             | Flexible primitive with full variant support    |
| Semantic HTML element (section, article, nav) | `Block`           | Renders semantic tags with `component` prop     |
| Grid layout                                   | `Grid`            | CSS Grid with responsive presets                |
| Flexbox layout                                | `Flex` or `Stack` | Flex for general, Stack for vertical/horizontal |
| Interactive button                            | `Button`          | Pre-styled with variants and states             |
| Content card                                  | `Card`            | Compound component with Header/Content/Footer   |
| Dashboard template                            | `DashLayout`      | Complete layout with sidebar and header         |

**Sources:** [README.md62-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L62-L103) [src/components/README.md9-19](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L9-L19) [README.md363-387](https://github.com/ui8kit/core/blob/2afe2195/README.md#L363-L387)

---

## Basic Styling Workflow

All components accept variant props instead of className strings. This workflow shows how to apply styling through the variant system.

```
Output

CVA Processing

Variant Categories

Component Instance

Spacing Props
p, m, px, py, etc.

Color Props
bg, c, borderColor

Visual Props
rounded, shadow, border

Layout Props
w, h, position

Typography Props
size, weight, align

spacingVariants

colorVariants

roundedVariants

shadowVariants

layoutVariants

typographyVariants

Tailwind Classes
p-8 rounded-xl shadow-md
```

### Step-by-Step: Styling a Component

**Step 1: Apply spacing variants**

```
// Import component
import { Box } from '@ui8kit/core';

// Apply padding and margin
<Box p="lg" m="md" mx="auto">
  Content
</Box>
```

Available spacing values: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`

**Step 2: Apply color variants**

```
<Box p="lg" bg="card" c="foreground">
  Content with semantic colors
</Box>
```

**Step 3: Apply visual effects**

```
<Box p="lg" bg="card" rounded="xl" shadow="md" border="default">
  Styled container
</Box>
```

**Step 4: Apply layout variants**

```
<Box p="lg" w="full" h="screen" position="relative">
  Full-width layout
</Box>
```

### Variant Props Reference

| Category     | Props                                   | Values                                               |
| ------------ | --------------------------------------- | ---------------------------------------------------- |
| **Spacing**  | `p`, `px`, `py`, `pt`, `pb`, `pl`, `pr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`          |
| **Spacing**  | `m`, `mx`, `my`, `mt`, `mb`, `ml`, `mr` | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `auto`  |
| **Colors**   | `bg`, `c`, `borderColor`                | Design system color tokens                           |
| **Rounded**  | `rounded`                               | `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full` |
| **Shadow**   | `shadow`                                | `none`, `sm`, `md`, `lg`, `xl`, `2xl`                |
| **Layout**   | `w`, `h`, `minH`, `maxW`                | `auto`, `full`, `screen`, `fit`, `min`, `max`        |
| **Position** | `position`                              | `static`, `relative`, `absolute`, `fixed`, `sticky`  |

**Sources:** [README.md170-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L170-L217) [src/components/README.md206-222](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L206-L222)

---

## Layout Pattern Workflows

### Vertical Stacking with `Stack`

The most common layout pattern is vertical stacking of elements.

```
import { Stack, Title, Text, Button } from '@ui8kit/core';

<Stack gap="lg" align="center" p="md">
  <Title order={1}>Heading</Title>
  <Text>Description text</Text>
  <Button variant="primary">Action</Button>
</Stack>
```

**Key `Stack` props:**

- `gap`: Space between children (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`)
- `align`: Cross-axis alignment (`start`, `center`, `end`, `stretch`)
- `justify`: Main-axis alignment (`start`, `center`, `end`, `between`, `around`)

**Sources:** [src/components/README.md52-64](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L52-L64)

### Horizontal Layout with `Group`

For horizontal arrangements, use `Group`.

```
import { Group, Button } from '@ui8kit/core';

<Group gap="md" align="center" justify="between">
  <Button variant="secondary">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</Group>
```

**Sources:** [src/components/README.md66-78](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L66-L78)

### Grid Layout with `Grid`

For multi-column layouts, use `Grid` with responsive presets.

```
import { Grid, GridCol, Card } from '@ui8kit/core';

<Grid cols="1-2-3" gap="lg" p="md">
  <GridCol span={2}>
    <Card p="lg">Wide column</Card>
  </GridCol>
  <GridCol>
    <Card p="lg">Regular column</Card>
  </GridCol>
</Grid>
```

**`cols` preset values:**

- `"1-2-3"`: 1 column mobile, 2 tablet, 3 desktop
- `"2"`: 2 columns at all breakpoints
- Custom: Use standard Grid props

**Sources:** [src/components/README.md80-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L80-L92) [README.md90-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L90-L103)

### Responsive Container

Use `Container` for centered, max-width layouts.

```
import { Container } from '@ui8kit/core';

<Container size="lg" px="md" centered>
  <Card p="lg">
    Centered content with responsive max-width
  </Card>
</Container>
```

**Container sizes:**

- `xs`: 448px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Sources:** [src/components/README.md39-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L39-L50)

---

## UI Component Patterns

### Working with Cards

`Card` is a compound component with semantic subcomponents.

```
Card (root container)

Card.Header

Card.Title

Card.Description

Card.Content

Card.Footer

data-class='card'

data-class='card-header'

data-class='card-title'

data-class='card-content'

data-class='card-footer'
```

**Step-by-Step: Building a Card**

```
import { Card, Title, Text, Button, Stack } from '@ui8kit/core';

<Card p="lg" rounded="xl" shadow="md" bg="card">
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Optional description</Card.Description>
  </Card.Header>
  
  <Card.Content>
    <Stack gap="md">
      <Text>Main content goes here</Text>
      <Text c="muted-foreground">Additional details</Text>
    </Stack>
  </Card.Content>
  
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

**Sources:** [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117) [README.md121-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L121-L145)

### Working with Buttons

`Button` supports variants, sizes, loading states, and icon sections.

```
import { Button } from '@ui8kit/core';
import { Heart } from 'lucide-react';

// Basic button
<Button variant="primary" size="md">
  Click me
</Button>

// Button with icon
<Button 
  variant="default" 
  leftSection={<Heart size={16} />}
  rounded="md"
  shadow="sm"
>
  Favorite
</Button>

// Loading state
<Button variant="primary" loading={isLoading}>
  Submit
</Button>
```

**Button variants:**

- `default`: Standard button
- `primary`: Primary action
- `secondary`: Secondary action
- `destructive`: Dangerous actions
- `outline`: Outlined style
- `ghost`: Minimal style
- `link`: Link-styled button

**Sources:** [src/components/README.md119-133](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L119-L133)

### Working with Typography

Use `Title` for headings and `Text` for body content.

```
import { Title, Text, Stack } from '@ui8kit/core';

<Stack gap="md">
  <Title order={1} size="3xl" weight="bold" c="primary">
    Main Heading
  </Title>
  
  <Title order={2} size="2xl" weight="semibold">
    Subheading
  </Title>
  
  <Text size="lg" c="muted-foreground" align="left">
    Body text with semantic styling
  </Text>
  
  <Text size="sm" weight="medium" truncate>
    Truncated text for overflow scenarios
  </Text>
</Stack>
```

**`Title` order mapping:**

- `order={1}`: `<h1>` tag
- `order={2}`: `<h2>` tag
- `order={3}`: `<h3>` tag
- (continues to `order={6}`)

**Sources:** [src/components/README.md150-177](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L150-L177)

### Working with Badges

Use `Badge` for status indicators and labels.

```
import { Badge, Group } from '@ui8kit/core';
import { CheckCircle } from 'lucide-react';

<Group gap="sm">
  <Badge variant="success" size="sm" rounded="full">
    Active
  </Badge>
  
  <Badge 
    variant="default" 
    dot
    rightSection={<CheckCircle size={14} />}
  >
    Verified
  </Badge>
</Group>
```

**Badge variants:**

- `default`: Standard badge
- `success`: Green/positive
- `warning`: Yellow/caution
- `error`: Red/negative
- `outline`: Outlined style

**Sources:** [src/components/README.md135-148](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L135-L148)

---

## Semantic HTML Workflow

Use `Block` with the `component` prop to render semantic HTML5 elements.

```
import { Block, Title, Text } from '@ui8kit/core';

<Block component="section" py="xl" bg="background">
  <Block component="article" p="lg" rounded="lg">
    <Title order={2}>Article Title</Title>
    <Text>Article content</Text>
  </Block>
</Block>

<Block component="nav" p="md" bg="card">
  <Block component="ul">
    <Block component="li">Nav item</Block>
  </Block>
</Block>

<Block component="header" py="md" border="bottom">
  <Title>Page Header</Title>
</Block>

<Block component="footer" py="lg" bg="muted">
  <Text size="sm">Footer content</Text>
</Block>
```

**Common semantic elements:**

- `section`: Thematic grouping
- `article`: Self-contained content
- `nav`: Navigation links
- `header`: Introductory content
- `footer`: Footer content
- `aside`: Sidebar content
- `main`: Main content area

**Sources:** [src/components/README.md23-37](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L23-L37) [README.md14](https://github.com/ui8kit/core/blob/2afe2195/README.md#L14-L14)

---

## Common Development Scenarios

### Scenario 1: Building a Feature Card

```
import { Card, Title, Text, Button, Stack, Badge } from '@ui8kit/core';
import { CheckCircle } from 'lucide-react';

export function FeatureCard() {
  return (
    <Card variant="outlined" p="xl" rounded="xl" shadow="lg">
      <Card.Header>
        <Stack gap="sm">
          <Badge variant="success" size="sm">
            New
          </Badge>
          <Title order={3} size="xl" weight="bold">
            Premium Feature
          </Title>
        </Stack>
      </Card.Header>
      
      <Card.Content>
        <Stack gap="md">
          <Text size="md" c="muted-foreground">
            Unlock advanced capabilities with our premium plan.
          </Text>
          <Stack gap="xs">
            <Text size="sm">
              ✓ Advanced analytics
            </Text>
            <Text size="sm">
              ✓ Priority support
            </Text>
            <Text size="sm">
              ✓ Custom integrations
            </Text>
          </Stack>
        </Stack>
      </Card.Content>
      
      <Card.Footer>
        <Button 
          variant="primary" 
          w="full"
          leftSection={<CheckCircle size={16} />}
        >
          Upgrade Now
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

**Sources:** [README.md310-339](https://github.com/ui8kit/core/blob/2afe2195/README.md#L310-L339) [src/components/README.md96-117](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L96-L117)

### Scenario 2: Building a Form Layout

When form-specific components are not available, compose layouts using `Block` and `Box`.

```
import { Card, Block, Box, Title, Text, Button, Stack } from '@ui8kit/core';

export function FormCard() {
  return (
    <Card variant="outlined" p="xl" rounded="xl">
      <Card.Header>
        <Title order={2} size="2xl">
          Sign Up
        </Title>
      </Card.Header>
      
      <Card.Content>
        <Stack gap="md">
          <Box>
            <Text weight="medium" mb="xs">
              Email
            </Text>
            <Box 
              component="input"
              type="email"
              p="sm"
              rounded="md"
              border="default"
              w="full"
            />
          </Box>
          
          <Box>
            <Text weight="medium" mb="xs">
              Password
            </Text>
            <Box 
              component="input"
              type="password"
              p="sm"
              rounded="md"
              border="default"
              w="full"
            />
          </Box>
        </Stack>
      </Card.Content>
      
      <Card.Footer>
        <Stack gap="md" direction="row">
          <Button variant="secondary" w="full">
            Cancel
          </Button>
          <Button variant="primary" w="full">
            Sign Up
          </Button>
        </Stack>
      </Card.Footer>
    </Card>
  );
}
```

**Note:** For advanced form workflows with custom components, see [Advanced Workflow](#5.2).

**Sources:** [README.md310-339](https://github.com/ui8kit/core/blob/2afe2195/README.md#L310-L339) [src/components/README.md315-328](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L315-L328)

### Scenario 3: Building a Dashboard Section

```
import { Block, Container, Grid, Card, Title, Text, Badge } from '@ui8kit/core';

export function DashboardSection() {
  return (
    <Block component="section" py="xl" bg="background">
      <Container size="lg">
        <Stack gap="lg">
          <Title order={1} size="3xl">
            Dashboard Overview
          </Title>
          
          <Grid cols="1-2-3" gap="lg">
            <Card p="lg" shadow="md">
              <Stack gap="sm">
                <Badge variant="success">Active</Badge>
                <Title order={3}>Total Users</Title>
                <Text size="2xl" weight="bold">1,234</Text>
              </Stack>
            </Card>
            
            <Card p="lg" shadow="md">
              <Stack gap="sm">
                <Badge variant="default">Pending</Badge>
                <Title order={3}>New Orders</Title>
                <Text size="2xl" weight="bold">56</Text>
              </Stack>
            </Card>
            
            <Card p="lg" shadow="md">
              <Stack gap="sm">
                <Badge variant="warning">Alert</Badge>
                <Title order={3}>Issues</Title>
                <Text size="2xl" weight="bold">3</Text>
              </Stack>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </Block>
  );
}
```

**Sources:** [README.md155-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L155-L168) [src/components/README.md80-92](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L80-L92)

### Scenario 4: Responsive Navigation

```
import { Block, Container, Group, Button, Image } from '@ui8kit/core';

export function Navbar() {
  return (
    <Block component="nav" py="md" bg="card" border="bottom">
      <Container size="xl">
        <Group justify="between" align="center">
          <Image 
            src="/logo.svg" 
            alt="Logo" 
            w="auto" 
            h="8"
          />
          
          <Group gap="md">
            <Button variant="ghost" size="sm">
              Home
            </Button>
            <Button variant="ghost" size="sm">
              About
            </Button>
            <Button variant="ghost" size="sm">
              Contact
            </Button>
          </Group>
          
          <Group gap="sm">
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </Group>
        </Group>
      </Container>
    </Block>
  );
}
```

**Sources:** [src/components/README.md66-78](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L66-L78) [src/components/README.md39-50](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L39-L50)

---

## Data Attribute Targeting

All UI components include `data-class` attributes for semantic targeting in CSS and tests.

```
<Card data-class="card">
  <Card.Header data-class="card-header">
    <Card.Title data-class="card-title">Title</Card.Title>
  </Card.Header>
  <Card.Content data-class="card-content">
    Content
  </Card.Content>
</Card>
```

**CSS targeting example:**

```
[data-class="card"] {
  /* Custom card styles */
}

[data-class="card-header"] {
  /* Custom header styles */
}
```

**Test selector example:**

```
// In tests
const card = screen.getByTestId('card');
const header = within(card).getByTestId('card-header');
```

**Sources:** [src/components/README.md223-236](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L223-L236)

---

## Workflow Summary Table

| Task               | Components to Use      | Key Props                         | Pattern                         |
| ------------------ | ---------------------- | --------------------------------- | ------------------------------- |
| Vertical layout    | `Stack`                | `gap`, `align`                    | Stacking elements vertically    |
| Horizontal layout  | `Group`                | `gap`, `justify`                  | Arranging elements horizontally |
| Grid layout        | `Grid`, `GridCol`      | `cols`, `gap`, `span`             | Multi-column responsive layouts |
| Content card       | `Card` + subcomponents | `p`, `rounded`, `shadow`          | Card.Header → Content → Footer  |
| Semantic container | `Block`                | `component`, variants             | Section, article, nav, etc.     |
| Interactive button | `Button`               | `variant`, `size`, loading states | Action triggers                 |
| Typography         | `Title`, `Text`        | `order`, `size`, `weight`         | Headings and body text          |
| Status indicator   | `Badge`                | `variant`, `size`, `dot`          | Labels and status               |
| Centered content   | `Container`            | `size`, `centered`                | Responsive max-width layouts    |
| Form layout        | `Block`, `Box`         | Spacing and border variants       | Custom form compositions        |

**Sources:** [src/components/README.md1-259](https://github.com/ui8kit/core/blob/2afe2195/src/components/README.md#L1-L259) [README.md36-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L36-L217)