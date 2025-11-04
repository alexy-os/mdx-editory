---
{
  "title": "Layouts",
  "generatedAt": "2025-11-04T11:57:48.538Z"
}
---

# Layouts

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx)
- [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)
- [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)

This document covers the Layer 3 layout components in the `@ui8kit/core` architecture: `DashLayout`, `LayoutBlock`, and `SplitBlock`. These are template-level components (organisms) that orchestrate Layer 2 UI components and Layer 1 primitives into structural page layouts. This page focuses on layout composition patterns, content hook systems, and special considerations for building application structures.

For basic layout primitives (`Grid`, `Flex`, `Stack`), see [Core Components](#3.1).\
For UI components used within layouts, see [UI Components](#3.3).\
For API details and prop references, see [Layout Components API](#4.3).

---

## Layout Architecture Overview

The layout system operates at the highest architectural layer, composing UI components and primitives into complete page structures. The three layout components serve distinct structural purposes:

```
External Dependencies

Layer 1: Primitives Used

Layer 2: UI Components Used

Layer 3: Layout Components

uses

uses

uses

uses

uses

uses

requires

uses

uses

uses

uses

uses

uses

uses

uses

uses

uses

uses

uses

uses

optional icons

optional icons

DashLayout
(Dashboard Structure)

LayoutBlock
(Content Sections)

SplitBlock
(Two-Column Layouts)

Card

Button

Text

Title

Badge

Icon

Image

Container

Group

Block
(Semantic sections)

Box
(Generic container)

Grid
(CSS Grid)

Stack
(Vertical/horizontal)

react-resizable-panels
(PanelGroup, Panel)

lucide-react
(Icon components)
```

**Sources:** [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99) [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389) [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L1-L145) [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168)

---

## DashLayout - Dashboard Template

`DashLayout` provides a complete dashboard structure with resizable panels, navigation header, and collapsible sidebar. It uses `react-resizable-panels` for interactive panel management.

### Component Structure

```
renders

renders

contains

contains

contains

wraps

wraps

uses

uses

uses

uses

uses

uses

uses

uses

Dashboard
(Main Component)

Navbar
(Header with brand + theme toggle)

Sidebar
(Collapsible navigation)

Main Panel
(Content area)

PanelGroup
(direction: horizontal)

Panel
(Sidebar container)

PanelResizeHandle
(Drag handle)

Panel
(Content container)

Block component='nav'

Group

Button variant='ghost'

Icon

Text

Block component='aside'

Stack

Container
```

### Key Interfaces and Props

| Interface        | Purpose                   | Key Props                                    |
| ---------------- | ------------------------- | -------------------------------------------- |
| `DashboardProps` | Main layout configuration | `page`, `children`, `sidebar`, `navbarProps` |
| `NavbarProps`    | Header configuration      | `isDarkMode`, `toggleDarkMode`, `brand`      |
| `SidebarProps`   | Sidebar configuration     | `children`, `title`, `dataClass`             |

### Implementation Details

The `Dashboard` component at [src/layouts/DashLayout.tsx64-91](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L64-L91) orchestrates the layout:

1. **Navbar** renders at top with theme toggle at [src/layouts/DashLayout.tsx34-49](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L34-L49)
2. **PanelGroup** with `direction="horizontal"` creates resizable layout at [src/layouts/DashLayout.tsx75-88](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L75-L88)
3. **Panel** components define sidebar (20% default, 10-40% range) and content area (80% default, 50% minimum) at [src/layouts/DashLayout.tsx76-86](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L76-L86)
4. **PanelResizeHandle** enables interactive resizing at [src/layouts/DashLayout.tsx80](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L80-L80)
5. **Container** wraps main content with responsive sizing at [src/layouts/DashLayout.tsx84](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L84-L84)

### Usage Pattern

```
import { DashLayout } from '@ui8kit/core';

<DashLayout
  sidebar={<NavSidebar />}
  navbarProps={{
    brand: "MyApp",
    isDarkMode: true,
    toggleDarkMode: handleToggle
  }}
>
  <Container>
    <Card p="lg">Content</Card>
  </Container>
</DashLayout>
```

The layout automatically persists panel sizes via `autoSaveId="dashlayout-panels"` at [src/layouts/DashLayout.tsx75](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L75-L75)

**Sources:** [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99) [README.md155-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L155-L168)

---

## LayoutBlock - Flexible Content Sections

`LayoutBlock` is a versatile layout component that renders content sections with three layout modes (`grid`, `flex`, `stack`) and a powerful content hook system for dynamic rendering.

### Layout Modes and Configuration

```
renders

renders

renders

uses

uses

uses

wraps with

wraps in

LayoutBlock

Grid Mode
(layout='grid')

Flex Mode
(layout='flex')

Stack Mode
(layout='stack')

Grid Component
cols, gap, align, justify

Group Component
gap, align, justify, wrap

Stack Component
gap, align

Container
(optional wrapper)

Block component='section'
```

### Content Hook System

The content hook system at [src/layouts/LayoutBlock.tsx22-30](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L22-L30) allows replacing any part of the rendered content:

| Hook           | Purpose                       | Signature                                 |
| -------------- | ----------------------------- | ----------------------------------------- |
| `beforeHeader` | Content before header section | `(content: any) => ReactNode`             |
| `header`       | Custom header renderer        | `(content: any) => ReactNode`             |
| `afterHeader`  | Content after header section  | `(content: any) => ReactNode`             |
| `beforeItems`  | Content before items list     | `(content: any) => ReactNode`             |
| `item`         | Custom item renderer          | `(item: any, index: number) => ReactNode` |
| `afterItems`   | Content after items list      | `(content: any) => ReactNode`             |

### Default Renderers

The component provides default renderers at [src/layouts/LayoutBlock.tsx123-227](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L123-L227):

- **DefaultHeaderRenderer** at [src/layouts/LayoutBlock.tsx87-121](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L87-L121) - Renders badge, title, and description with alignment
- **DefaultItemRenderers.gridCard** at [src/layouts/LayoutBlock.tsx126-166](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L126-L166) - Card-based grid items with images/icons
- **DefaultItemRenderers.gridSimple** at [src/layouts/LayoutBlock.tsx169-196](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L169-L196) - Minimal grid items without cards
- **DefaultItemRenderers.flexItem** at [src/layouts/LayoutBlock.tsx199-226](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L199-L226) - Horizontal group layout for flex/stack modes

### Configuration Props

| Prop Category       | Props                                         | Purpose                      |
| ------------------- | --------------------------------------------- | ---------------------------- |
| **Layout Control**  | `layout`, `useContainer`, `containerSize`     | Mode and container settings  |
| **Grid Settings**   | `cols`, `gridCols`, `gap`, `align`, `justify` | CSS Grid configuration       |
| **Flex Settings**   | `wrap`, `flexWrap`                            | Flexbox wrapping behavior    |
| **Stack Settings**  | `stackAlign`                                  | Vertical alignment           |
| **Header Settings** | `showHeader`, `headerAlign`                   | Header display and alignment |
| **Content Data**    | `content`, `content.items`                    | Data structure for rendering |
| **Customization**   | `contentHooks`                                | Custom render functions      |

### Content Data Structure

The `content` prop at [src/layouts/LayoutBlock.tsx61-77](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L61-L77) follows this schema:

```
content: {
  badge?: string;          // Optional badge text
  title?: string;          // Section title
  description?: string;    // Section description
  items?: Array<{
    id: string;           // Required unique identifier
    title?: string;       // Item title
    description: string;  // Item description (required)
    image?: {             // Optional image
      src: string;
      alt: string;
    };
    lucideIcon?: any;     // Optional Lucide icon component
    [key: string]: any;   // Additional custom data
  }>;
}
```

### Layout Mode Rendering

The rendering logic at [src/layouts/LayoutBlock.tsx298-353](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L298-L353) selects the appropriate layout component:

```
grid

flex

stack

renderItems()

layout type?

Grid Component
cols, gap, align, justify
data-class='layout-grid'

Group Component
gap, align, justify, wrap
data-class='layout-flex'

Stack Component
gap, align
data-class='layout-stack'

itemRenderer(item, index)
```

Each layout wraps items in the appropriate primitive component with `data-class` attributes for DOM targeting at [src/layouts/LayoutBlock.tsx320-348](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L320-L348)

### Usage Examples

**Grid with Cards:**

```
<LayoutBlock
  layout="grid"
  cols="1-2-3"
  gap="lg"
  content={{
    badge: "Features",
    title: "Why Choose Us",
    description: "Discover our advantages",
    items: [
      {
        id: "1",
        title: "Fast",
        description: "Lightning speed",
        lucideIcon: Zap
      }
    ]
  }}
/>
```

**Flex with Custom Hooks:**

```
<LayoutBlock
  layout="flex"
  wrap="wrap"
  contentHooks={{
    header: (content) => <CustomHeader {...content} />,
    item: (item, index) => <CustomCard key={item.id} {...item} />
  }}
  content={data}
/>
```

**Sources:** [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389) [README.md149-154](https://github.com/ui8kit/core/blob/2afe2195/README.md#L149-L154)

---

## SplitBlock - Two-Column Split Layout

`SplitBlock` creates two-column layouts with flexible media and content sections, commonly used for hero sections, feature showcases, and content/image combinations.

### Layout Modes

```
SplitBlock

Container Mode
(splitSection=false)

Full Width Mode
(splitSection=true)

Block component='section'

Container wrapper

Grid cols='1-2'

Grid cols='1-2'
data-class='split-grid'

leftMedia=true

leftMedia=false
```

### Content Hook System

Similar to `LayoutBlock`, `SplitBlock` supports content hooks at [src/layouts/SplitBlock.tsx11-15](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L11-L15):

| Hook            | Purpose                     | Signature                     |
| --------------- | --------------------------- | ----------------------------- |
| `beforeContent` | Content before main section | `(content: any) => ReactNode` |
| `content`       | Main content renderer       | `(content: any) => ReactNode` |
| `afterContent`  | Content after main section  | `(content: any) => ReactNode` |

### Slots API

The slots API at [src/layouts/SplitBlock.tsx36-42](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L36-L42) provides named overrides:

```
slots?: {
  media?: ReactNode;      // Override media section
  header?: ReactNode;     // Future: Header slot
  body?: ReactNode;       // Future: Body slot
  actions?: ReactNode;    // Future: Actions slot
}
```

The media slot resolution at [src/layouts/SplitBlock.tsx91](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L91-L91) prioritizes slot overrides over direct props.

### Configuration Props

| Prop             | Type                           | Default    | Purpose                                    |
| ---------------- | ------------------------------ | ---------- | ------------------------------------------ |
| `mediaSection`   | `ReactNode`                    | -          | Content for media column                   |
| `contentSection` | `ReactNode`                    | -          | Content for content column                 |
| `leftMedia`      | `boolean`                      | `false`    | Position media on left side                |
| `splitSection`   | `boolean`                      | `true`     | Use full-width grid vs container           |
| `containerSize`  | `ContainerSizingProps["size"]` | `"lg"`     | Container size (when `splitSection=false`) |
| `gap`            | `VariantGridProps["gap"]`      | `"lg"`     | Gap between columns                        |
| `align`          | `VariantGridProps["align"]`    | `"center"` | Vertical alignment                         |

### Layout Rendering Logic

The rendering logic at [src/layouts/SplitBlock.tsx94-136](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L94-L136) creates two distinct layouts:

**Container Mode** (`splitSection=false`) at [src/layouts/SplitBlock.tsx96-111](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L96-L111):

- Wraps grid in responsive `Container`
- Applies `containerSize` and `padding` props
- Suitable for standard page sections

**Full Width Mode** (`splitSection=true`) at [src/layouts/SplitBlock.tsx115-135](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L115-L135):

- Grid directly after `Block` with no container
- Uses `data-class="split-grid"` for identification at [src/layouts/SplitBlock.tsx129](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L129-L129)
- Applies `flex-1 items-center` for full viewport height

### Column Order

The column order is determined by `leftMedia` prop at [src/layouts/SplitBlock.tsx106-107](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L106-L107) and [src/layouts/SplitBlock.tsx131-132](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L131-L132):

- `leftMedia=true`: `[mediaSection, contentSection]`
- `leftMedia=false`: `[contentSection, mediaSection]`

### Usage Examples

**Basic Split with Media:**

```
<SplitBlock
  mediaSection={
    <Image src="/hero.jpg" alt="Hero" fit="cover" />
  }
  contentSection={
    <Stack gap="lg">
      <Title order={1}>Welcome</Title>
      <Text>Description text</Text>
      <Button>Get Started</Button>
    </Stack>
  }
  leftMedia
/>
```

**With Content Hooks:**

```
<SplitBlock
  content={{ title: "Feature", description: "Details" }}
  contentHooks={{
    beforeContent: (content) => <Badge>{content.badge}</Badge>,
    content: (content) => (
      <Stack gap="md">
        <Title>{content.title}</Title>
        <Text>{content.description}</Text>
      </Stack>
    ),
    afterContent: () => <Button>Learn More</Button>
  }}
  slots={{
    media: <Image src="/feature.jpg" />
  }}
/>
```

**Full Width Hero:**

```
<SplitBlock
  splitSection
  leftMedia={false}
  mediaSection={<HeroImage />}
  contentSection={<HeroContent />}
/>
```

**Sources:** [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L1-L145) [README.md149-154](https://github.com/ui8kit/core/blob/2afe2195/README.md#L149-L154)

---

## Layout Primitives Integration

Layout components extensively use Layer 1 primitives for structure. Understanding these primitives is essential for working with layouts.

### Grid Component

Used by `LayoutBlock` (grid mode) and `SplitBlock` for CSS Grid layouts:

```
applies

applies

applies

applies

'1-2-3' creates

Grid
(CSS Grid)

cols variant
'1-2-3', '2', '3', '4'

gap variant
'sm', 'md', 'lg', 'xl'

align variant
'start', 'center', 'end'

justify variant
'start', 'center', 'between'

Responsive columns
1 col mobile
2 cols tablet
3 cols desktop
```

**Common Grid Configurations:**

- `cols="1-2-3"` - Responsive 1/2/3 columns
- `cols="2"` - Fixed 2 columns
- `gap="lg"` - Large gap between items
- `align="center"` - Center items vertically

### Stack Component

Used by `LayoutBlock` (stack mode) and within content sections for vertical layouts:

| Prop    | Values                                           | Purpose              |
| ------- | ------------------------------------------------ | -------------------- |
| `gap`   | `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"` | Vertical spacing     |
| `align` | `"start"`, `"center"`, `"end"`                   | Horizontal alignment |
| `ta`    | `"left"`, `"center"`, `"right"`                  | Text alignment       |

### Block Component

All layout components use `Block` as the root semantic container:

```
<Block
  component="section"  // Semantic HTML5 tag
  w="full"            // Full width
  py="xl"             // Vertical padding
  data-class="layout-block"  // DOM identification
>
  {/* Layout content */}
</Block>
```

The `component` prop at [src/layouts/DashLayout.tsx16](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L16-L16) [src/layouts/DashLayout.tsx36](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L36-L36) and [src/layouts/DashLayout.tsx74](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L74-L74) ensures semantic HTML structure (`<section>`, `<nav>`, `<aside>`, `<main>`).

**Sources:** [src/layouts/LayoutBlock.tsx3-16](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L3-L16) [src/layouts/SplitBlock.tsx3-8](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L3-L8) [src/layouts/DashLayout.tsx2](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L2-L2)

---

## Composition Patterns

Layout components follow specific composition patterns for building complex structures.

### Pattern 1: Nested Layout Composition

Layouts can be nested to create complex page structures:

```
```

**Example:**

```
<DashLayout sidebar={<Navigation />}>
  <LayoutBlock layout="grid" cols="1-2-3" content={heroData} />
  <SplitBlock mediaSection={<Image />} contentSection={<Content />} />
  <LayoutBlock layout="stack" content={testimonialsData} />
</DashLayout>
```

### Pattern 2: Container Management

Layouts use `Container` component for responsive width control:

| Layout        | Container Usage                                                                                                                                             | When Used                                  |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `DashLayout`  | Always uses `Container` at [src/layouts/DashLayout.tsx84](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L84-L84)                  | Wraps main content panel                   |
| `LayoutBlock` | Optional via `useContainer` prop at [src/layouts/LayoutBlock.tsx259](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L259-L259)    | Default `true`, can disable for full-width |
| `SplitBlock`  | Conditional via `splitSection` prop at [src/layouts/SplitBlock.tsx94-112](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L94-L112) | Used when `splitSection=false`             |

### Pattern 3: Content Hook Override

The content hook system enables progressive enhancement:

```
```

**Fallback Chain:**

1. Check for custom `contentHooks.item` at [src/layouts/LayoutBlock.tsx302](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L302-L302)
2. Fall back to default renderer at [src/layouts/LayoutBlock.tsx285](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L285-L285)
3. Apply layout-specific defaults at [src/layouts/LayoutBlock.tsx230-254](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L230-L254)

### Pattern 4: Slot-Based Overrides

`SplitBlock` slots provide targeted customization without full content hooks:

```
<SplitBlock
  // Base props
  leftMedia
  gap="xl"
  
  // Original sections
  mediaSection={<DefaultImage />}
  contentSection={<DefaultContent />}
  
  // Slot overrides
  slots={{
    media: <CustomVideo />  // Overrides mediaSection
  }}
/>
```

The resolution at [src/layouts/SplitBlock.tsx91](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L91-L91) prioritizes slots over direct props.

### Pattern 5: Data-Driven Rendering

Layouts accept structured data and render automatically:

```
const pageData = {
  badge: "New",
  title: "Feature Section",
  description: "Amazing features",
  items: [
    { id: "1", title: "Fast", description: "Speed", lucideIcon: Zap },
    { id: "2", title: "Secure", description: "Safe", lucideIcon: Lock }
  ]
};

<LayoutBlock layout="grid" cols="2" content={pageData} />
```

The rendering pipeline at [src/layouts/LayoutBlock.tsx288-361](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L288-L361) handles:

1. Header rendering from `content.badge/title/description`
2. Item iteration and rendering from `content.items`
3. Layout wrapping based on `layout` mode

**Sources:** [src/layouts/LayoutBlock.tsx256-386](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L256-L386) [src/layouts/SplitBlock.tsx67-143](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L67-L143) [src/layouts/DashLayout.tsx64-91](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L64-L91)

---

## Special Considerations

### Semantic HTML Structure

Layout components enforce semantic HTML5 structure:

| Component            | Root Element       | Purpose                                                                                                                                                |
| -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `DashLayout`         | `<nav>` + `<main>` | Navigation header + main content at [src/layouts/DashLayout.tsx36-74](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L36-L74) |
| `DashLayout.Sidebar` | `<aside>`          | Sidebar navigation at [src/layouts/DashLayout.tsx16](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L16-L16)                  |
| `LayoutBlock`        | `<section>`        | Content sections at [src/layouts/LayoutBlock.tsx366](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L366-L366)               |
| `SplitBlock`         | `<section>`        | Split content sections at [src/layouts/SplitBlock.tsx97-117](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L97-L117)         |

This ensures accessibility and SEO compliance without additional configuration.

### Data-Class Attributes

All layouts apply `data-class` attributes for consistent DOM targeting:

| Component            | Data-Class Value            | Location                                                                                                             |
| -------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `DashLayout.Navbar`  | `data-role="dash-navbar"`   | [src/layouts/DashLayout.tsx36](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L36-L36)      |
| `DashLayout.Sidebar` | Custom via prop             | [src/layouts/DashLayout.tsx16](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L16-L16)      |
| `LayoutBlock`        | `data-class="layout-block"` | [src/layouts/LayoutBlock.tsx371](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L371-L371) |
| `LayoutBlock` Grid   | `data-class="layout-grid"`  | [src/layouts/LayoutBlock.tsx320](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L320-L320) |
| `LayoutBlock` Flex   | `data-class="layout-flex"`  | [src/layouts/LayoutBlock.tsx333](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L333-L333) |
| `LayoutBlock` Stack  | `data-class="layout-stack"` | [src/layouts/LayoutBlock.tsx344](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L344-L344) |
| `SplitBlock` Grid    | `data-class="split-grid"`   | [src/layouts/SplitBlock.tsx129](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L129-L129)   |

These enable reliable testing and styling without className dependencies.

### Responsive Behavior

Layouts handle responsive design through variant props:

**Grid Responsive Columns:**

- `cols="1-2-3"` creates mobile→tablet→desktop breakpoints
- Automatically collapses to 1 column on mobile
- Scales to 2 columns on tablet (`md:`)
- Expands to 3 columns on desktop (`lg:`)

**Container Responsive Sizing:**

- `containerSize="lg"` applies `max-w-7xl` with breakpoint adjustments
- Automatically adds horizontal padding on mobile
- Centers content with `mx="auto"`

**Panel Resizing (DashLayout):**

- Sidebar: `defaultSize={20}`, `minSize={10}`, `maxSize={40}` at [src/layouts/DashLayout.tsx76](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L76-L76)
- Content: `defaultSize={80}`, `minSize={50}` at [src/layouts/DashLayout.tsx82](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L82-L82)
- Sizes persisted via `autoSaveId` at [src/layouts/DashLayout.tsx75](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L75-L75)

### Performance Considerations

**Item Key Management:** The `LayoutBlock` component requires unique `id` in content items at [src/layouts/LayoutBlock.tsx66](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L66-L66) for efficient React reconciliation. Keys are applied at [src/layouts/LayoutBlock.tsx306](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L306-L306)

**Memoization Opportunities:** Content hooks and renderers are evaluated on every render. For expensive computations, wrap in `useMemo`:

```
const contentHooks = useMemo(() => ({
  item: (item, index) => <ExpensiveComponent {...item} />
}), [dependencies]);
```

**Panel State Persistence:** `DashLayout` automatically persists panel sizes to localStorage via `react-resizable-panels`, reducing layout shift on reload.

### External Dependencies

| Component    | Dependency               | Purpose                  | Installation                         |
| ------------ | ------------------------ | ------------------------ | ------------------------------------ |
| `DashLayout` | `react-resizable-panels` | Resizable panel system   | `npm install react-resizable-panels` |
| All layouts  | `lucide-react`           | Optional icon components | `npm install lucide-react`           |

These are listed as peer dependencies and must be installed separately when using layouts.

**Sources:** [src/layouts/DashLayout.tsx4](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L4-L4) [src/layouts/LayoutBlock.tsx366-383](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L366-L383) [src/layouts/SplitBlock.tsx94-136](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L94-L136)

---

## Usage Examples

### Dashboard Application

Complete dashboard with navigation, resizable panels, and content sections:

```
import { DashLayout, LayoutBlock, Card } from '@ui8kit/core';
import { Home, Settings, Users } from 'lucide-react';

function DashboardApp() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <DashLayout
      navbarProps={{
        brand: "Admin Panel",
        isDarkMode: darkMode,
        toggleDarkMode: () => setDarkMode(!darkMode)
      }}
      sidebar={
        <Stack gap="md">
          <Button variant="ghost" leftSection={<Home />}>
            Dashboard
          </Button>
          <Button variant="ghost" leftSection={<Users />}>
            Users
          </Button>
          <Button variant="ghost" leftSection={<Settings />}>
            Settings
          </Button>
        </Stack>
      }
    >
      <LayoutBlock
        layout="grid"
        cols="1-2-3"
        gap="lg"
        content={{
          title: "Overview",
          description: "Key metrics",
          items: statsData
        }}
      />
    </DashLayout>
  );
}
```

### Marketing Landing Page

Hero section with split layout and feature grid:

```
import { SplitBlock, LayoutBlock } from '@ui8kit/core';
import { Zap, Shield, Globe } from 'lucide-react';

function LandingPage() {
  return (
    <>
      <SplitBlock
        leftMedia={false}
        splitSection
        mediaSection={
          <Image
            src="/hero.jpg"
            alt="Hero"
            fit="cover"
            h="full"
          />
        }
        contentSection={
          <Stack gap="xl" align="start" p="2xl">
            <Badge variant="secondary">New Release</Badge>
            <Title order={1} size="4xl" fw="bold">
              Build Faster
            </Title>
            <Text size="xl" c="secondary-foreground">
              Create amazing interfaces with minimal code
            </Text>
            <Group gap="md">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Group>
          </Stack>
        }
      />
      
      <LayoutBlock
        layout="grid"
        cols="1-2-3"
        gap="xl"
        py="3xl"
        content={{
          badge: "Features",
          title: "Why Choose Us",
          description: "Everything you need to succeed",
          items: [
            {
              id: "fast",
              title: "Lightning Fast",
              description: "Optimized for performance",
              lucideIcon: Zap
            },
            {
              id: "secure",
              title: "Secure by Default",
              description: "Built with security in mind",
              lucideIcon: Shield
            },
            {
              id: "global",
              title: "Global Scale",
              description: "Deploy worldwide instantly",
              lucideIcon: Globe
            }
          ]
        }}
      />
    </>
  );
}
```

### Content-Heavy Article Layout

Stack layout with custom content hooks for rich content:

```
import { LayoutBlock, createLayoutContentHook } from '@ui8kit/core';

const articleHooks = createLayoutContentHook({
  header: (content) => (
    <Stack gap="md" align="center" ta="center">
      <Badge>{content.category}</Badge>
      <Title order={1} size="4xl">{content.title}</Title>
      <Text c="muted" size="sm">
        {content.author} • {content.date}
      </Text>
    </Stack>
  ),
  item: (item, index) => (
    <Card p="xl" rounded="lg" shadow="sm">
      <Stack gap="lg">
        <Title order={2} size="2xl">{item.title}</Title>
        <Text>{item.content}</Text>
        {item.quote && (
          <Box p="lg" bg="muted" rounded="md" border="1px solid border">
            <Text size="lg" fw="medium">"{item.quote}"</Text>
          </Box>
        )}
      </Stack>
    </Card>
  )
});

function ArticlePage() {
  return (
    <LayoutBlock
      layout="stack"
      gap="2xl"
      containerSize="md"
      contentHooks={articleHooks}
      content={articleData}
    />
  );
}
```

**Sources:** [README.md36-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L36-L168) [src/layouts/DashLayout.tsx53-96](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L53-L96) [src/layouts/LayoutBlock.tsx256-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L256-L389) [src/layouts/SplitBlock.tsx67-143](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L67-L143)