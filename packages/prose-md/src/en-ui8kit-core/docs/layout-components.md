---
{
  "title": "Layout Components",
  "generatedAt": "2025-11-04T11:57:49.952Z"
}
---

# Layout Components

Relevant source files

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx)
- [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx)
- [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx)

This document provides API reference and construction patterns for layout components in `@ui8kit/core`. Layout components orchestrate multiple UI components into complete application structures such as dashboards, landing pages, and admin panels.

For basic primitive layout components (Grid, Flex, Stack), see [Core Components](#4.1). For UI component composition patterns, see [UI Components](#4.2). For general best practices on layout construction, see [Best Practices](#5.3).

## Overview

The library provides three specialized layout components that compose primitives and UI components into application templates:

| Component     | Purpose                                              | Primary Use Case                |
| ------------- | ---------------------------------------------------- | ------------------------------- |
| `DashLayout`  | Dashboard layout with resizable sidebar              | Admin panels, dashboards        |
| `LayoutBlock` | Flexible content sections with grid/flex/stack modes | Landing pages, marketing sites  |
| `SplitBlock`  | Two-column split layouts                             | Feature sections, hero sections |

These layouts sit at Layer 3 of the architecture and build upon Layer 1 primitives (Block, Box, Grid, Container) and Layer 2 UI components (Card, Button, Text, Title).

**Sources**: [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx) [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx) [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx) [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168)

## Component Relationships

```
External Dependencies

Layer 1: Core Primitives

Layer 2: UI Components

Layer 3: Layout Components

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

uses

uses

DashLayout

LayoutBlock

SplitBlock

Navbar

Sidebar

Card

Button

Text

Title

Icon

Badge

Group

Image

Block

Box

Grid

Stack

Container

PanelGroup
(react-resizable-panels)

Panel
(react-resizable-panels)

PanelResizeHandle
(react-resizable-panels)
```

**Diagram**: Layout component dependency tree showing how Layer 3 layouts compose Layer 2 UI components and Layer 1 primitives, plus external dependencies for advanced features.

**Sources**: [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99) [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389) [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L1-L145)

## DashLayout

Dashboard layout component with resizable sidebar, navbar, and main content area. Built on `react-resizable-panels` for panel resizing functionality.

### DashLayout Props

```
interface DashboardProps {
  page?: React.ComponentType;
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  navbarProps?: Omit<NavbarProps, 'toggleDarkMode' | 'isDarkMode'> & 
    Partial<Pick<NavbarProps, 'isDarkMode' | 'toggleDarkMode'>>;
}
```

| Prop          | Type                   | Default | Description                                    |
| ------------- | ---------------------- | ------- | ---------------------------------------------- |
| `page`        | `React.ComponentType`  | -       | Component to render in main content area       |
| `children`    | `React.ReactNode`      | -       | Alternative to `page` prop for main content    |
| `sidebar`     | `React.ReactNode`      | -       | Content for resizable sidebar                  |
| `navbarProps` | `Partial<NavbarProps>` | -       | Props for navbar including brand, theme toggle |

### Navbar Sub-component

```
interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  brand?: string;
}
```

Minimal navbar with brand identity and theme toggle. Renders as semantic `<nav>` element with `data-role="dash-navbar"` attribute.

**Implementation**: [src/layouts/DashLayout.tsx34-49](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L34-L49)

### Sidebar Sub-component

```
interface SidebarProps {
  children?: React.ReactNode;
  className?: string;
  dataClass?: string;
  title?: string;
}
```

Resizable sidebar container rendered as semantic `<aside>` element. Wraps children in Stack layout with optional title.

**Implementation**: [src/layouts/DashLayout.tsx14-25](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L14-L25)

### Panel Structure

```
DashLayout

Navbar
(component='nav')

Block
(component='main')

PanelGroup
(direction='horizontal'
autoSaveId='dashlayout-panels')

Panel
(defaultSize=20
minSize=10
maxSize=40)

Panel
(defaultSize=80
minSize=50)

PanelResizeHandle

Sidebar
(component='aside')

Box + Container
```

**Diagram**: DashLayout panel structure showing PanelGroup with resizable sidebar (20% default) and main content (80% default) separated by resize handle.

**Sources**: [src/layouts/DashLayout.tsx64-91](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L64-L91)

### Import Pattern

```
// Full import
import { DashLayout } from '@ui8kit/core';

// Sub-component imports
import { Dashboard, Navbar, Sidebar } from '@ui8kit/core';
```

**Sources**: [src/layouts/DashLayout.tsx93-96](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L93-L96)

## LayoutBlock

Flexible content section component supporting three layout modes: grid, flex, and stack. Includes content hook system for customizable rendering and default presenters for common patterns.

### LayoutBlock Props

```
interface LayoutBlockProps {
  // Layout control
  layout: LayoutType; // "grid" | "flex" | "stack"
  
  // Container settings
  useContainer?: boolean;
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  padding?: VariantSpacingProps["px"] | null;
  py?: VariantSpacingProps["py"];

  // Grid settings (layout="grid")
  cols?: VariantGridProps["cols"];
  gridCols?: VariantGridProps["cols"];
  gap?: VariantGridProps["gap"];
  align?: VariantGridProps["align"];
  justify?: VariantGridProps["justify"];

  // Flex settings (layout="flex")
  wrap?: VariantFlexProps["wrap"];
  flexWrap?: boolean;

  // Stack settings (layout="stack")
  stackAlign?: VariantFlexProps["align"];

  // Header settings
  showHeader?: boolean;
  headerAlign?: "start" | "center" | "end";

  // Content data
  content?: {
    badge?: string;
    title?: string;
    description?: string;
    items?: Array<{
      id: string;
      title?: string;
      description: string;
      image?: { src: string; alt: string; };
      lucideIcon?: any;
      [key: string]: any;
    }>;
    [key: string]: any;
  };

  // Content hooks
  contentHooks?: LayoutContentHooks;
  
  className?: string;
}
```

**Sources**: [src/layouts/LayoutBlock.tsx32-84](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L32-L84)

### Layout Modes

| Mode    | Component | Use Case                      | Props                                         |
| ------- | --------- | ----------------------------- | --------------------------------------------- |
| `grid`  | `Grid`    | Feature grids, card galleries | `cols`, `gridCols`, `gap`, `align`, `justify` |
| `flex`  | `Group`   | Flexible wrapping layouts     | `wrap`, `flexWrap`, `gap`, `align`, `justify` |
| `stack` | `Stack`   | Vertical lists, timelines     | `stackAlign`, `gap`                           |

### Content Hook System

```
interface LayoutContentHooks {
  beforeHeader?: (content: any) => ReactNode;
  header?: (content: any) => ReactNode;
  afterHeader?: (content: any) => ReactNode;
  beforeItems?: (content: any) => ReactNode;
  item?: (item: any, index: number) => ReactNode;
  afterItems?: (content: any) => ReactNode;
}
```

Content hooks enable custom rendering logic at specific points in the layout lifecycle. Default hooks are provided for common patterns:

| Hook Set                               | Layout Mode | Item Renderer                     | Use Case                     |
| -------------------------------------- | ----------- | --------------------------------- | ---------------------------- |
| `defaultLayoutContentHooks.gridCards`  | `grid`      | `DefaultItemRenderers.gridCard`   | Card-based grids with images |
| `defaultLayoutContentHooks.gridSimple` | `grid`      | `DefaultItemRenderers.gridSimple` | Simple icon + text grids     |
| `defaultLayoutContentHooks.flex`       | `flex`      | `DefaultItemRenderers.flexItem`   | Horizontal feature lists     |
| `defaultLayoutContentHooks.stack`      | `stack`     | `DefaultItemRenderers.flexItem`   | Vertical feature lists       |

**Sources**: [src/layouts/LayoutBlock.tsx23-30](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L23-L30) [src/layouts/LayoutBlock.tsx229-254](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L229-L254)

### Default Item Renderers

```
layout='grid'
has images

layout='grid'
no images

layout='flex'

layout='stack'

LayoutBlock

gridCard
Card + Image + Icon
Stack layout

gridSimple
Icon + Title + Text
Stack layout

flexItem
Icon + Title + Text
Group layout
```

**Diagram**: Default item renderer selection logic based on layout mode and content structure.

**Sources**: [src/layouts/LayoutBlock.tsx123-227](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L123-L227)

### Import Pattern

```
// Basic import
import { LayoutBlock } from '@ui8kit/core';

// With content hooks
import { 
  LayoutBlock, 
  defaultLayoutContentHooks,
  createLayoutContentHook 
} from '@ui8kit/core';
```

**Sources**: [src/layouts/LayoutBlock.tsx256-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L256-L389)

## SplitBlock

Two-column split layout component for hero sections and feature showcases. Supports left/right media positioning and optional container wrapping.

### SplitBlock Props

```
interface SplitBlockProps {
  // Main sections
  mediaSection?: ReactNode;
  contentSection?: ReactNode;

  // Layout control
  leftMedia?: boolean;
  splitSection?: boolean;

  // Content data
  content?: {
    [key: string]: any;
  };

  // Content hooks
  contentHooks?: ContentHooks;

  // Named slots
  slots?: {
    media?: ReactNode;
    header?: ReactNode;
    body?: ReactNode;
    actions?: ReactNode;
  };

  // Container settings (splitSection=false)
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  padding?: VariantSpacingProps["px"];
  py?: VariantSpacingProps["py"];

  // Grid settings (splitSection=true)
  gap?: VariantGridProps["gap"];
  align?: VariantGridProps["align"];
  
  className?: string;
}
```

**Sources**: [src/layouts/SplitBlock.tsx17-55](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L17-L55)

### Layout Modes

| Mode                   | Description       | Structure                              |
| ---------------------- | ----------------- | -------------------------------------- |
| `splitSection={false}` | Contained layout  | `Block > Container > Grid(cols="1-2")` |
| `splitSection={true}`  | Full-width layout | `Block > Grid(cols="1-2")`             |

### Content Hook System

```
interface ContentHooks {
  beforeContent?: (content: any) => ReactNode;
  content?: (content: any) => ReactNode;
  afterContent?: (content: any) => ReactNode;
}
```

Minimal hook system for content customization. Default content renderer applies hooks in sequence:

**Implementation**: [src/layouts/SplitBlock.tsx57-65](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L57-L65)

### Import Pattern

```
// Basic import
import { SplitBlock } from '@ui8kit/core';

// With utilities
import { 
  SplitBlock, 
  DefaultContentSection,
  createContentHook 
} from '@ui8kit/core';
```

**Sources**: [src/layouts/SplitBlock.tsx67-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L67-L145)

## Construction Patterns by Use Case

### Landing Pages

Landing pages typically combine multiple `LayoutBlock` and `SplitBlock` components for hero sections, features, and CTAs.

```
Landing Page Structure

SplitBlock
Hero Section
leftMedia=true

LayoutBlock
Feature Grid
layout='grid'
cols='1-2-3'

LayoutBlock
Testimonial Carousel
layout='flex'

SplitBlock
Call-to-Action
leftMedia=false
```

**Diagram**: Common landing page structure using layout components.

**Import Pattern**:

```
import { 
  LayoutBlock, 
  SplitBlock,
  Container,
  Card,
  Button,
  Text,
  Title,
  Badge,
  Image
} from '@ui8kit/core';
```

**Example Structure**:

```
// Hero section with left media
<SplitBlock
  leftMedia={true}
  splitSection={false}
  containerSize="xl"
  mediaSection={<Image src="hero.jpg" alt="Hero" />}
  contentSection={
    <Stack gap="lg">
      <Badge>New Feature</Badge>
      <Title order={1}>Product Title</Title>
      <Text>Description text</Text>
      <Button variant="primary">Get Started</Button>
    </Stack>
  }
/>

// Features grid with 3 columns
<LayoutBlock
  layout="grid"
  cols="1-2-3"
  content={{
    title: "Features",
    items: [
      { id: "1", title: "Fast", description: "...", lucideIcon: Zap },
      { id: "2", title: "Secure", description: "...", lucideIcon: Lock },
      { id: "3", title: "Simple", description: "...", lucideIcon: Smile }
    ]
  }}
/>
```

**Sources**: [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389) [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L1-L145)

### Dashboards

Dashboards use `DashLayout` as the primary container with resizable sidebar for navigation.

```
Dashboard Application

DashLayout

Navbar
Brand + Theme Toggle

Sidebar
Navigation Links

Main Content Area

LayoutBlock
Stat Cards
layout='grid'
cols='1-2-4'

Grid
Chart Components

Card
Data Table
```

**Diagram**: Dashboard structure with DashLayout and nested content layouts.

**Import Pattern**:

```
import { 
  DashLayout,
  LayoutBlock,
  Card,
  Grid,
  Stack,
  Button,
  Icon,
  Text,
  Title
} from '@ui8kit/core';
import { useTheme } from '@ui8kit/core';
```

**Example Structure**:

```
// Dashboard wrapper
<DashLayout
  sidebar={
    <Stack gap="md">
      <Button variant="ghost" fullWidth>
        <Icon lucideIcon={Home} /> Dashboard
      </Button>
      <Button variant="ghost" fullWidth>
        <Icon lucideIcon={Users} /> Users
      </Button>
    </Stack>
  }
  navbarProps={{
    brand: "Admin Panel",
    isDarkMode: isDark,
    toggleDarkMode: toggleDark
  }}
>
  {/* Stat cards grid */}
  <LayoutBlock
    layout="grid"
    cols="1-2-4"
    gap="md"
    useContainer={false}
    content={{
      items: [
        { id: "1", title: "1,234", description: "Total Users" },
        { id: "2", title: "$12,345", description: "Revenue" }
      ]
    }}
  />
  
  {/* Charts and tables */}
  <Grid cols="1-2" gap="lg">
    <Card p="lg">
      <Card.Header>
        <Title order={3}>Analytics</Title>
      </Card.Header>
      <Card.Content>{/* Chart component */}</Card.Content>
    </Card>
  </Grid>
</DashLayout>
```

**Sources**: [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99) [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389)

### Websites

Multi-page websites compose `LayoutBlock` sections with different layout modes for varied content types.

```
Website Structure

Block
Header Navigation

SplitBlock
About Hero
splitSection=true

LayoutBlock
Team Grid
layout='grid'
cols='1-2-3'

LayoutBlock
Company Timeline
layout='stack'

Block
Footer Links
```

**Diagram**: Website page structure combining different layout types.

**Import Pattern**:

```
import { 
  Block,
  LayoutBlock,
  SplitBlock,
  Container,
  Stack,
  Grid,
  Card,
  Image,
  Text,
  Title
} from '@ui8kit/core';
```

**Example Structure**:

```
// About page hero
<SplitBlock
  leftMedia={false}
  splitSection={true}
  mediaSection={<Image src="team.jpg" alt="Team" />}
  contentSection={
    <Stack gap="lg" align="start">
      <Title order={1}>About Us</Title>
      <Text size="lg">Company story...</Text>
    </Stack>
  }
/>

// Team member grid
<LayoutBlock
  layout="grid"
  cols="1-2-3"
  content={{
    title: "Our Team",
    items: teamMembers.map(member => ({
      id: member.id,
      title: member.name,
      description: member.role,
      image: { src: member.photo, alt: member.name }
    }))
  }}
  contentHooks={defaultLayoutContentHooks.gridCards}
/>

// Company timeline
<LayoutBlock
  layout="stack"
  content={{
    title: "Our Journey",
    items: milestones.map(milestone => ({
      id: milestone.year,
      title: milestone.year,
      description: milestone.event,
      lucideIcon: Calendar
    }))
  }}
/>
```

**Sources**: [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389) [src/layouts/SplitBlock.tsx1-145](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L1-L145)

### Admin Panels

Admin panels extend the dashboard pattern with form layouts and data management interfaces.

```
Admin Panel Application

DashLayout

Navbar
Admin Brand

Sidebar
Admin Navigation
Settings, Users, Content

Main Content Area
Container

LayoutBlock
Settings Form
layout='stack'
useContainer=false

Card
User Table
Pagination Controls

Stack
Action Buttons
```

**Diagram**: Admin panel structure with form layouts and data management components.

**Import Pattern**:

```
import { 
  DashLayout,
  LayoutBlock,
  Card,
  Stack,
  Grid,
  Button,
  Text,
  Title,
  Icon,
  Badge
} from '@ui8kit/core';
```

**Example Structure**:

```
<DashLayout
  sidebar={
    <Stack gap="md">
      <Text c="muted" size="xs">MANAGEMENT</Text>
      <Button variant="ghost" fullWidth>
        <Icon lucideIcon={Users} /> Users
      </Button>
      <Button variant="ghost" fullWidth>
        <Icon lucideIcon={FileText} /> Content
      </Button>
      <Text c="muted" size="xs">SETTINGS</Text>
      <Button variant="ghost" fullWidth>
        <Icon lucideIcon={Settings} /> Config
      </Button>
    </Stack>
  }
  navbarProps={{
    brand: "Admin Dashboard"
  }}
>
  {/* Settings form */}
  <Card p="xl">
    <Card.Header>
      <Title order={2}>Site Settings</Title>
    </Card.Header>
    <Card.Content>
      <LayoutBlock
        layout="stack"
        gap="lg"
        useContainer={false}
        content={{
          items: settingsFields.map(field => ({
            id: field.name,
            title: field.label,
            description: field.description
          }))
        }}
        contentHooks={{
          item: (item) => (
            <Stack gap="xs">
              <Text weight="medium">{item.title}</Text>
              <input type="text" />
              <Text size="sm" c="muted">{item.description}</Text>
            </Stack>
          )
        }}
      />
    </Card.Content>
    <Card.Footer>
      <Grid cols="2" gap="md">
        <Button variant="secondary">Reset</Button>
        <Button variant="primary">Save Changes</Button>
      </Grid>
    </Card.Footer>
  </Card>
</DashLayout>
```

**Sources**: [src/layouts/DashLayout.tsx1-99](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L1-L99) [src/layouts/LayoutBlock.tsx1-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L1-L389)

## Common Composition Patterns

### Responsive Grid Configurations

| Use Case     | Cols Value | Description                          |
| ------------ | ---------- | ------------------------------------ |
| Feature grid | `"1-2-3"`  | 1 column mobile, 2 tablet, 3 desktop |
| Stat cards   | `"1-2-4"`  | 1 column mobile, 2 tablet, 4 desktop |
| Two-column   | `"1-2"`    | 1 column mobile, 2 desktop           |
| Simple grid  | `"2"`      | Always 2 columns                     |

**Sources**: [src/layouts/LayoutBlock.tsx280-324](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L280-L324)

### Content Hook Composition

```
// Override default item renderer
const customHooks = {
  ...defaultLayoutContentHooks.gridCards,
  item: (item, index) => (
    <Card variant="outlined" p="lg">
      <Stack gap="md">
        <Title order={3}>{item.title}</Title>
        <Text>{item.description}</Text>
        <Button variant="primary">Learn More</Button>
      </Stack>
    </Card>
  )
};

<LayoutBlock
  layout="grid"
  cols="1-2-3"
  content={content}
  contentHooks={customHooks}
/>
```

**Sources**: [src/layouts/LayoutBlock.tsx388-389](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L388-L389)

### Nested Layout Composition

```
// Outer layout block with nested split blocks
<LayoutBlock
  layout="stack"
  gap="3xl"
  content={{
    title: "Product Showcase",
    items: products
  }}
  contentHooks={{
    item: (product) => (
      <SplitBlock
        leftMedia={product.id % 2 === 0}
        mediaSection={<Image src={product.image} />}
        contentSection={
          <Stack gap="md">
            <Title order={3}>{product.name}</Title>
            <Text>{product.description}</Text>
            <Button variant="primary">View Details</Button>
          </Stack>
        }
      />
    )
  }}
/>
```

**Sources**: [src/layouts/LayoutBlock.tsx256-383](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L256-L383) [src/layouts/SplitBlock.tsx67-137](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L67-L137)

## Data Attributes for Targeting

Layout components include `data-class` and `data-role` attributes for consistent DOM targeting:

| Component     | Attribute    | Value                                                | Element            |
| ------------- | ------------ | ---------------------------------------------------- | ------------------ |
| `DashLayout`  | `data-role`  | `"dash-main"`                                        | Main content block |
| `Navbar`      | `data-role`  | `"dash-navbar"`                                      | Nav element        |
| `Sidebar`     | `data-role`  | `"dash-sidebar-stack"`                               | Stack container    |
| `LayoutBlock` | `data-class` | `"layout-block"`                                     | Section element    |
| `LayoutBlock` | `data-class` | `"layout-grid"` / `"layout-flex"` / `"layout-stack"` | Layout container   |
| `SplitBlock`  | `data-class` | `"split-grid"`                                       | Grid container     |

**Sources**: [src/layouts/DashLayout.tsx18-48](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx#L18-L48) [src/layouts/LayoutBlock.tsx320-345](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx#L320-L345) [src/layouts/SplitBlock.tsx129](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx#L129-L129)