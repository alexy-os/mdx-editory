---
{
  "title": "Getting Started",
  "generatedAt": "2025-11-04T11:57:47.472Z"
}
---

# Getting Started

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [SUBMODULE\_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)
- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

This document covers the installation, configuration, and initial setup of `@ui8kit/core` in your React application. It provides step-by-step instructions for integrating the library into different project types (Next.js, Vite, Create React App) and demonstrates basic component usage patterns.

For detailed architectural information, see [Architecture](#3). For complete component API documentation, see [API Reference](#4). For advanced integration patterns including monorepo setup, refer to [SUBMODULE\_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)

---

## Prerequisites

Before installing `@ui8kit/core`, ensure your development environment meets these requirements:

| Requirement      | Version           | Purpose               |
| ---------------- | ----------------- | --------------------- |
| **Node.js**      | 18.0.0+           | JavaScript runtime    |
| **React**        | 18.0.0 or 19.0.0+ | Peer dependency       |
| **React DOM**    | 18.0.0 or 19.0.0+ | Peer dependency       |
| **Tailwind CSS** | 3.4.0+            | Utility-first styling |
| **TypeScript**   | 5.0.0+ (optional) | Type safety           |

**Sources:** [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) [package.json59-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L59-L66)

---

## Installation Methods

The library supports multiple installation approaches to accommodate different project architectures and optimization requirements.

### Installation Flow

```
Choose Installation Method

Full Library Installation
npm install @ui8kit/core

Per-Component Installation
npx buildy-ui add button

Monorepo Submodule
git submodule add

Direct Source Integration
Copy src/ directory

NPM Registry
@ui8kit/Unsupported markdown: link

registry.json
Component metadata

GitHub Repository
ui8kit/core

Application Setup

Configure Tailwind
tailwind.config.js

Import CSS
index.css or globals.css

Setup ThemeProvider
App.tsx or _app.tsx
```

**Sources:** [README.md21-34](https://github.com/ui8kit/core/blob/2afe2195/README.md#L21-L34) [README.md252-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L252-L276) [package.json1-70](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L70)

---

### Method 1: Full Library Installation (Recommended)

Install the complete library with all 15 UI components and 3 layout templates:

```
npm install @ui8kit/core react react-dom
```

This installs:

- Core primitives: `Block`, `Box`, `Grid`, `Flex`, `Stack`
- UI components: `Button`, `Card`, `Text`, `Title`, `Container`, `Icon`, `Image`, `Badge`, `Group`, `Sheet`, `Accordion`
- Layout components: `DashLayout`, `LayoutBlock`, `SplitBlock`
- CVA variant system and theme utilities

**Sources:** [README.md25-27](https://github.com/ui8kit/core/blob/2afe2195/README.md#L25-L27) [package.json31-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L37)

---

### Method 2: Per-Component Installation

Install individual components for optimal bundle size:

```
npx buildy-ui add button card text
```

This method uses [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json) to install only the requested components and their dependencies. Each component is deployed to its target directory:

- UI components → `components/ui/`
- Layout components → `layouts/`

**Sources:** [README.md260-265](https://github.com/ui8kit/core/blob/2afe2195/README.md#L260-L265) [src/registry.json](https://github.com/ui8kit/core/blob/2afe2195/src/registry.json)

---

### Method 3: Monorepo Submodule

For monorepo architectures, integrate as a Git submodule:

```
git submodule add https://github.com/ui8kit/core.git packages/@ui8kit/core
git submodule update --init --recursive
```

This approach provides:

- Direct source access for customization
- Turbo/workspace integration
- Zero-copy dependency resolution

Complete monorepo setup instructions are available in [SUBMODULE\_GUIDE.md1-713](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L1-L713)

**Sources:** [SUBMODULE\_GUIDE.md136-144](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L136-L144) [SUBMODULE\_GUIDE.md594-608](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L594-L608)

---

## Project Setup

After installation, configure your project to enable Tailwind CSS utilities, theme variables, and TypeScript path resolution.

### Setup Steps by File

```
Component Usage

Application Entry

Configuration Files

tailwind.config.js
Content paths, dark mode, theme

tsconfig.json
Path aliases for @ui8kit/core

index.css / globals.css
CSS variables, Tailwind layers

postcss.config.js
Tailwind + Autoprefixer

App.tsx / _app.tsx
ThemeProvider wrapper

main.tsx / index.tsx
CSS import, root render

import Button from '@ui8kit/core'

Use variant props:
p='lg' rounded='xl' shadow='md'

useTheme hook:
toggleDarkMode, isDarkMode
```

**Sources:** [SUBMODULE\_GUIDE.md332-437](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L332-L437) [SUBMODULE\_GUIDE.md449-589](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L449-L589)

---

### Step 1: Install Tailwind CSS

If Tailwind CSS is not already installed:

```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

This generates `tailwind.config.js` and `postcss.config.js`.

**Sources:** [README.md29-34](https://github.com/ui8kit/core/blob/2afe2195/README.md#L29-L34)

---

### Step 2: Configure Tailwind

Update `tailwind.config.js` to include library component paths and enable dark mode:

```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./node_modules/@ui8kit/core/dist/**/*.js"  // Full library
    // OR for submodule:
    // "./packages/@ui8kit/core/src/**/*.{ts,tsx}"
  ],
  darkMode: 'class',  // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // ... additional semantic colors
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // ... additional theme extensions
    },
  },
  plugins: [],
}
```

**Critical Configuration:**

- **`content` paths**: Must include library source files to prevent Tailwind from purging necessary classes
- **`darkMode: 'class'`**: Required for theme toggle functionality
- **CSS variable colors**: Enable dynamic theming via `hsl(var(--primary))` pattern

**Sources:** [SUBMODULE\_GUIDE.md332-437](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L332-L437)

---

### Step 3: Setup CSS Variables and Tailwind Layers

Create or update your global CSS file (typically `src/index.css` or `app/globals.css`):

```
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 97.2549%;
    --foreground: 240 3.3333% 11.7647%;
    --card: 0 0% 100%;
    --card-foreground: 240 3.3333% 11.7647%;
    --primary: 187.4739 173.4032% 31.3580%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 94.1176%;
    --secondary-foreground: 0 0% 29.0196%;
    --border: 0 0% 87.8431%;
    --radius: 0.625rem;
    /* ... additional light mode variables */
  }
  
  .dark {
    --background: 0 0% 7.0588%;
    --foreground: 0 0% 87.8431%;
    --card: 0 0% 11.7647%;
    --card-foreground: 0 0% 87.8431%;
    --primary: 189.9661 161.8632% 27.5935%;
    --primary-foreground: 183.1588 99.9180% 96.2486%;
    --secondary: 0 0% 16.4706%;
    --secondary-foreground: 0 0% 80%;
    --border: 0 0% 20%;
    /* ... additional dark mode variables */
  }
}
```

**Variable Format:**

- Colors use HSL format without the `hsl()` wrapper: `"187.4739 173.4032% 31.3580%"`
- Applied in Tailwind config as: `hsl(var(--primary))`
- This pattern enables runtime theme switching

**Sources:** [SUBMODULE\_GUIDE.md449-589](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L449-L589)

---

### Step 4: Configure TypeScript (Optional)

If using TypeScript, add path aliases to `tsconfig.json`:

```
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@ui8kit/core": ["./node_modules/@ui8kit/core/dist"],
      "@ui8kit/core/*": ["./node_modules/@ui8kit/core/dist/*"]
      // OR for submodule:
      // "@ui8kit/core": ["./packages/@ui8kit/core/src"],
      // "@ui8kit/core/*": ["./packages/@ui8kit/core/src/*"]
    }
  }
}
```

**Sources:** [SUBMODULE\_GUIDE.md187-217](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L187-L217)

---

## Basic Usage

Once configured, you can import and use components with the CVA variant system.

### Component Import and Usage Pattern

```
Runtime Rendering

Component Definition

Import Phase

import Button, Card, Text
from '@ui8kit/core'

import ThemeProvider
from '@ui8kit/core'

Component JSX:
<Card p='lg' rounded='xl'>

Variant Props:
p, m, rounded, shadow, bg, c

Child Components:
Card.Header, Card.Content

CVA resolves variants
to Tailwind classes

Rendered HTML:
<section class='p-8 rounded-xl'>

Theme class applied:
.dark on <html>
```

**Sources:** [README.md36-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L36-L60) [README.md91-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L91-L103)

---

### Example 1: First Component

Create a simple card with button using variant props:

```
import { Button, Card, Text, Stack } from '@ui8kit/core';

export function WelcomeCard() {
  return (
    <Card p="lg" rounded="xl" shadow="md">
      <Card.Header>
        <Text as="h2" size="xl" weight="bold">
          Welcome
        </Text>
      </Card.Header>
      <Card.Content>
        <Stack gap="md">
          <Text>Build beautiful UIs with minimal code.</Text>
          <Button variant="primary" size="md">
            Get Started
          </Button>
        </Stack>
      </Card.Content>
    </Card>
  );
}
```

**Key Patterns:**

- **Variant props**: `p="lg"`, `rounded="xl"`, `shadow="md"` instead of `className`
- **Compound components**: `Card.Header`, `Card.Content`, `Card.Footer` for flexible composition
- **Semantic components**: `Text as="h2"` renders `<h2>` element
- **Stack layout**: `Stack gap="md"` for vertical spacing

**Sources:** [README.md38-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L60)

---

### Example 2: Theme Provider Setup

Wrap your application with `ThemeProvider` for dark mode support:

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';
import { AppContent } from './AppContent';

export default function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <AppContent />
    </ThemeProvider>
  );
}
```

Then use the `useTheme` hook in components:

```
import { useTheme } from '@ui8kit/core';
import { Button } from '@ui8kit/core';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </Button>
  );
}
```

**Available Themes:**

- `modernUITheme` - Contemporary design system
- `skyOSTheme` - Sky-inspired palette
- `lesseUITheme` - Minimal aesthetic

**Sources:** [README.md219-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L249) [SUBMODULE\_GUIDE.md277-304](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L277-L304)

---

### Example 3: Layout Composition

Build a page layout with primitives:

```
import { Block, Container, Stack, Grid, Box } from '@ui8kit/core';

export function PageLayout() {
  return (
    <Block component="main" py="xl">
      <Container maxW="7xl">
        <Stack gap="lg">
          <Box as="header" mb="md">
            <h1>Page Title</h1>
          </Box>
          
          <Grid cols={2} gap="md">
            <Box bg="card" p="lg" rounded="lg">
              Column 1
            </Box>
            <Box bg="card" p="lg" rounded="lg">
              Column 2
            </Box>
          </Grid>
        </Stack>
      </Container>
    </Block>
  );
}
```

**Primitives Used:**

- **Block**: Semantic container (`section`, `nav`, `main`, `article`)
- **Container**: Responsive max-width wrapper
- **Stack**: Vertical layout with gap
- **Grid**: CSS Grid with column control
- **Box**: Generic div with variant props

**Sources:** [README.md81-103](https://github.com/ui8kit/core/blob/2afe2195/README.md#L81-L103)

---

## Framework-Specific Setup

### Next.js Integration

#### App Router (Next.js 13+)

**1. Install dependencies:**

```
npm install @ui8kit/core react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**2. Configure `app/layout.tsx`:**

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider theme={modernUITheme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Critical:** Add `suppressHydrationWarning` to `<html>` to prevent theme class mismatch warnings during hydration.

**3. Update `app/globals.css`:**

Import Tailwind layers and CSS variables as shown in [Step 3](<https://github.com/ui8kit/core/blob/2afe2195/Step 3#LNaN-LNaN>)

**4. Configure `tailwind.config.js`:**

```
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@ui8kit/core/dist/**/*.js',
  ],
  darkMode: 'class',
  // ... rest of config
}
```

**Sources:** [SUBMODULE\_GUIDE.md277-304](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L277-L304)

---

#### Pages Router (Next.js 12 and earlier)

**Configure `pages/_app.tsx`:**

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={modernUITheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

**Sources:** [README.md223-232](https://github.com/ui8kit/core/blob/2afe2195/README.md#L223-L232)

---

### Vite Integration

**1. Create Vite React project:**

```
npm create vite@latest my-app -- --template react-swc-ts
cd my-app
```

**2. Install dependencies:**

```
npm install @ui8kit/core react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**3. Configure `vite.config.ts`:**

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
})
```

**4. Update `src/main.tsx`:**

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**5. Configure `src/App.tsx`:**

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';
import { Button, Card, Text, Stack } from '@ui8kit/core';

function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <Card p="lg" rounded="xl" shadow="md">
        <Card.Header>
          <Text size="xl" weight="bold">Vite + UI8Kit</Text>
        </Card.Header>
        <Card.Content>
          <Stack gap="md">
            <Text>Fast development with Vite</Text>
            <Button variant="primary">Get Started</Button>
          </Stack>
        </Card.Content>
      </Card>
    </ThemeProvider>
  );
}

export default App;
```

**Sources:** [SUBMODULE\_GUIDE.md154-184](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L154-L184) [SUBMODULE\_GUIDE.md234-258](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L234-L258) [SUBMODULE\_GUIDE.md260-304](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L260-L304)

---

### Create React App Integration

**1. Create CRA project:**

```
npx create-react-app my-app --template typescript
cd my-app
```

**2. Install dependencies:**

```
npm install @ui8kit/core react react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**3. Configure `tailwind.config.js`:**

```
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@ui8kit/core/dist/**/*.js",
  ],
  darkMode: 'class',
  // ... rest of config
}
```

**4. Update `src/index.tsx`:**

```
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**5. Configure `src/App.tsx`:**

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';
import { Button, Card, Text } from '@ui8kit/core';

function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <div className="min-h-screen bg-background p-8">
        <Card p="lg" rounded="xl" shadow="md">
          <Card.Header>
            <Text size="xl" weight="bold">
              Create React App + UI8Kit
            </Text>
          </Card.Header>
          <Card.Content>
            <Text mb="md">Ready to build.</Text>
            <Button variant="primary">Start Building</Button>
          </Card.Content>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

**Sources:** [README.md412-421](https://github.com/ui8kit/core/blob/2afe2195/README.md#L412-L421)

---

## Verification

After setup, verify your installation with this checklist:

### Verification Checklist

| Check                | Expected Behavior                                            | Troubleshooting                               |
| -------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| **Component import** | `import { Button } from '@ui8kit/core'` works without errors | Verify `node_modules/@ui8kit/core` exists     |
| **Variant props**    | `<Box p="lg" rounded="md" />` applies classes                | Check Tailwind content paths include library  |
| **Dark mode toggle** | Clicking theme toggle switches appearance                    | Verify `darkMode: 'class'` in Tailwind config |
| **CSS variables**    | Colors render correctly in light/dark modes                  | Check `:root` and `.dark` variables in CSS    |
| **TypeScript types** | No type errors in IDE                                        | Verify TypeScript version ≥5.0.0              |
| **Dev server**       | Application runs without console errors                      | Check peer dependencies installed             |

**Sources:** [README.md21-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L21-L60) [README.md412-421](https://github.com/ui8kit/core/blob/2afe2195/README.md#L412-L421)

---

### Test Component

Create a test component to verify all features:

```
import { 
  ThemeProvider, 
  modernUITheme, 
  useTheme,
  Card, 
  Button, 
  Text, 
  Stack,
  Box 
} from '@ui8kit/core';

function TestContent() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <Box p="xl" bg="background" minH="screen">
      <Stack gap="lg" align="center">
        <Card p="lg" rounded="xl" shadow="lg" maxW="md">
          <Card.Header>
            <Text size="2xl" weight="bold">
              UI8Kit Test
            </Text>
          </Card.Header>
          <Card.Content>
            <Stack gap="md">
              <Text>
                Theme: {isDarkMode ? 'Dark' : 'Light'}
              </Text>
              <Button 
                variant="primary" 
                onClick={toggleDarkMode}
              >
                Toggle Theme
              </Button>
              <Box 
                p="md" 
                bg="primary" 
                c="primary-foreground" 
                rounded="md"
              >
                <Text weight="medium">
                  ✓ Variant system working
                </Text>
              </Box>
            </Stack>
          </Card.Content>
        </Card>
      </Stack>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <TestContent />
    </ThemeProvider>
  );
}
```

**Expected Results:**

- Card renders with padding, rounded corners, and shadow
- Button changes appearance on hover
- Theme toggle switches between light/dark modes
- Colors update based on CSS variables
- No console errors or warnings

**Sources:** [README.md38-60](https://github.com/ui8kit/core/blob/2afe2195/README.md#L38-L60) [README.md236-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L236-L249) [SUBMODULE\_GUIDE.md277-304](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L277-L304)

---

## Next Steps

After completing the setup:

1. **Explore Components**: Review the [UI Components](#3.3) section for detailed component documentation
2. **Learn Variants**: Study the [Variant System](#3.2) to understand the 12 reusable variants
3. **Build Layouts**: Explore [Layout Components](#3.4) for dashboard and page templates
4. **Review Patterns**: Check [Development Guide](#5) for common usage patterns
5. **Implement Dark Mode**: See [Dark Mode](#5.4) for advanced theming

**Sources:** [README.md1-453](https://github.com/ui8kit/core/blob/2afe2195/README.md#L1-L453) [.devin/wiki.json24-44](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json#L24-L44)