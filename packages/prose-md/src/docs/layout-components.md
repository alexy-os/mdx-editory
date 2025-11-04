---
{
  "title": "Layout Components",
  "generatedAt": "2025-11-04T09:53:49.362Z"
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

ComponentPurposePrimary Use Case`DashLayout`Dashboard layout with resizable sidebarAdmin panels, dashboards`LayoutBlock`Flexible content sections with grid/flex/stack modesLanding pages, marketing sites`SplitBlock`Two-column split layoutsFeature sections, hero sections
These layouts sit at Layer 3 of the architecture and build upon Layer 1 primitives (Block, Box, Grid, Container) and Layer 2 UI components (Card, Button, Text, Title).

**Sources**: [src/layouts/DashLayout.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/DashLayout.tsx) [src/layouts/LayoutBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/LayoutBlock.tsx) [src/layouts/SplitBlock.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/layouts/SplitBlock.tsx) [README.md147-168](https://github.com/ui8kit/core/blob/2afe2195/README.md#L147-L168)

## Component Relationships

External Dependencies