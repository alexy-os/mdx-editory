---
{
  "title": "Troubleshooting",
  "generatedAt": "2025-11-04T11:57:51.225Z"
}
---

# Troubleshooting

Relevant source files

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [SUBMODULE\_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)
- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

This page provides solutions for common issues encountered when using `@ui8kit/core`, including installation problems, configuration errors, styling issues, build failures, and runtime errors. Each section includes diagnostic steps, root cause analysis, and concrete solutions with code references.

For development workflow guidance, see [Basic Workflow](#5.1) and [Advanced Workflow](#5.2). For component API issues, consult [API Reference](#4). For build system configuration, see [Build System](#3.6) and [TypeScript Configuration](#3.8).

---

## Installation & Setup Issues

### Missing Peer Dependencies

**Symptom**: Error messages during install or runtime: `Cannot find module 'react'` or `Module not found: Can't resolve 'react-dom'`

**Root Cause**: `@ui8kit/core` declares `react` and `react-dom` as peer dependencies, not bundled dependencies. [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58)

**Solution**:

```
npm install react react-dom @ui8kit/core
# Or with specific versions
npm install react@^19.1.0 react-dom@^19.1.0 @ui8kit/core
```

**Verification**:

```
npm list react react-dom
```

Expected output should show both packages installed without warnings.

**Sources**: [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) [README.md26-27](https://github.com/ui8kit/core/blob/2afe2195/README.md#L26-L27)

---

### Submodule Directory Empty After Clone

**Symptom**: After cloning a monorepo that uses `@ui8kit/core` as a git submodule, the `packages/@ui8kit/core/` directory exists but is empty.

**Root Cause**: Git does not automatically populate submodule directories during clone unless `--recurse-submodules` flag is used. [SUBMODULE\_GUIDE.md5-9](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L5-L9)

**Solution**:

```
# Initialize and populate existing submodules
git submodule update --init --recursive
```

**Prevention**: Clone with submodule support:

```
git clone --recurse-submodules <repository-url>
```

**Sources**: [SUBMODULE\_GUIDE.md5-9](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L5-L9) [SUBMODULE\_GUIDE.md139-149](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L139-L149)

---

### Package Export Not Found

**Symptom**: Import errors like `Package subpath './registry.json' is not defined by "exports"`

**Root Cause**: The package only exports the main entry point. Registry access requires direct file path import. [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37)

**Solution**:

```
// ❌ Incorrect - not in exports map
import registry from '@ui8kit/core/registry.json';

// ✅ Correct - access via source path if available
import registry from './node_modules/@ui8kit/core/src/registry.json';

// ✅ Or use NPM package installation
npm install @ui8kit/core
import { Button } from '@ui8kit/core';
```

**Sources**: [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37) [README.md270-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L270-L276)

---

## TypeScript Configuration Problems

### Cannot Find Module or Type Declarations

**Symptom**: TypeScript errors: `Cannot find module '@ui8kit/core'` or `Could not find a declaration file for module`

**Diagnostic Flow**:

```
Not installed

Installed

Missing

Exists

Paths misconfigured

Paths correct

Node/Classic

Bundler

TypeScript import error

Check: npm list @ui8kit/core

Check: dist/index.d.ts exists

Check: tsconfig.json paths

Check: moduleResolution setting

Run: npm install @ui8kit/core

Run: npm run build in library

Update baseUrl and paths

Set moduleResolution: bundler

Issue resolved
```

**Solution 1**: Verify package installation and types

```
# Check package is installed
npm list @ui8kit/core

# Verify type declarations exist
ls node_modules/@ui8kit/core/dist/index.d.ts
```

**Solution 2**: Configure TypeScript paths for monorepo/submodule usage [SUBMODULE\_GUIDE.md104-132](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L104-L132)

```
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@ui8kit/core": ["./packages/@ui8kit/core/src"],
      "@ui8kit/core/*": ["./packages/@ui8kit/core/src/*"]
    }
  }
}
```

**Solution 3**: For library development, rebuild type declarations

```
npm run build  # Runs: tsc -p tsconfig.json
```

**Sources**: [package.json32](https://github.com/ui8kit/core/blob/2afe2195/package.json#L32-L32) [SUBMODULE\_GUIDE.md104-132](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L104-L132) [SUBMODULE\_GUIDE.md189-217](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L189-L217)

---

### Type Errors on Variant Props

**Symptom**: TypeScript errors like `Type '"xl"' is not assignable to type 'Padding'` or `Property 'p' does not exist on type`

**Root Cause**: Component does not extend variant props, or import is incomplete.

**Solution**: Verify component extends appropriate variant types and imports are complete

```
// Check component definition extends variant props
import type { SpacingVariantsProps } from '../core/variants/spacingVariants';

interface ButtonProps extends 
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  SpacingVariantsProps,  // Must extend variant props
  LayoutVariantsProps {
  // ...
}
```

**Verification**: Inspect component prop types in IDE autocomplete. All variant props should appear.

**Sources**: Based on architecture patterns in [README.md98-124](https://github.com/ui8kit/core/blob/2afe2195/README.md#L98-L124)

---

## Tailwind CSS & Styling Issues

### Styles Not Applying / Purging Issue

**Symptom**: Components render with missing styles in production. Tailwind classes like `p-8`, `rounded-xl` are stripped during build.

**Root Cause**: Tailwind's purge/content configuration does not include `@ui8kit/core` source files, causing generated classes to be removed. The library generates 618 utility classes that must be safelisted. [package.json1-71](https://github.com/ui8kit/core/blob/2afe2195/package.json#L1-L71)

**Diagnosis Diagram**:

```
Missing library paths

Paths correct

No safelist

Not imported

Imported but not working

Styles missing in production

Check: tailwind.config content paths

Check: safelist configuration

Check: core-classes.json import

Add library to content array

Import and add to safelist

Verify safelist format

Rebuild with: npm run build

Inspect dist CSS file

Classes present
```

**Solution 1**: Add library paths to Tailwind content configuration [SUBMODULE\_GUIDE.md334-341](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L334-L341)

```
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@ui8kit/core/dist/**/*.js",  // NPM install
    // OR for submodule/monorepo:
    "../../packages/@ui8kit/core/src/**/*.{ts,tsx}"
  ],
  darkMode: 'class',
  // ...
}
```

**Solution 2**: Import core-classes safelist (recommended for production)

```
// tailwind.config.js
import coreClasses from './node_modules/@ui8kit/core/src/lib/core-classes.json' assert { type: 'json' };

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  safelist: coreClasses, // Array of 618 class strings
  // ...
}
```

**Verification**:

```
# Build and inspect CSS output size
npm run build
ls -lh dist/assets/*.css

# Search for specific class in output
grep "p-8" dist/assets/*.css
```

**Sources**: [SUBMODULE\_GUIDE.md334-342](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L334-L342) README references to 618 classes from variant system

---

### Dark Mode Not Working

**Symptom**: Dark mode toggle does not change theme, or styles remain in light mode.

**Root Cause Analysis**:

| Issue                         | Symptom              | Solution                                           |
| ----------------------------- | -------------------- | -------------------------------------------------- |
| Missing `ThemeProvider`       | No context available | Wrap app with `<ThemeProvider>`                    |
| Incorrect Tailwind `darkMode` | Classes not applied  | Set `darkMode: 'class'` in config                  |
| Theme not persisting          | Resets on reload     | `ThemeProvider` handles localStorage automatically |
| CSS variables not defined     | Colors undefined     | Import theme CSS or define variables               |

**Solution 1**: Wrap application with `ThemeProvider` [README.md223-233](https://github.com/ui8kit/core/blob/2afe2195/README.md#L223-L233)

```
import { ThemeProvider, modernUITheme } from '@ui8kit/core';

export function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

**Solution 2**: Configure Tailwind for class-based dark mode [SUBMODULE\_GUIDE.md342](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L342-L342)

```
// tailwind.config.js
export default {
  darkMode: 'class', // Required for ThemeProvider
  // ...
}
```

**Solution 3**: Use theme toggle correctly [README.md235-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L235-L249)

```
import { useTheme } from '@ui8kit/core';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <Button onClick={toggleDarkMode}>
      {isDarkMode ? '☀️' : '🌙'}
    </Button>
  );
}
```

**Verification**:

```
// Check localStorage after toggle
localStorage.getItem('theme') // Should be 'dark' or 'light'

// Check document class
document.documentElement.classList.contains('dark') // Should toggle
```

**Sources**: [README.md219-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L249) [SUBMODULE\_GUIDE.md342](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L342-L342) [SUBMODULE\_GUIDE.md278-296](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L278-L296)

---

### Custom CSS Variables Not Defined

**Symptom**: Console errors: `CSS variable '--primary' is undefined` or colors appear as `hsl(var(--primary))` in rendered output.

**Root Cause**: Theme CSS variables are not imported. The library uses CSS custom properties for colors. [SUBMODULE\_GUIDE.md452-589](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L452-L589)

**Solution**: Import base CSS with theme variables

```
// In your main entry file (e.g., main.tsx, App.tsx)
import './index.css'; // Must contain theme CSS variable definitions
```

**Example CSS structure** [SUBMODULE\_GUIDE.md458-554](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L458-L554):

```
@layer base {
  :root {
    --background: 0 0% 97.2549%;
    --foreground: 240 3.3333% 11.7647%;
    --primary: 187.4739 173.4032% 31.3580%;
    --primary-foreground: 0 0% 100%;
    /* ... additional variables */
  }
  
  .dark {
    --background: 0 0% 7.0588%;
    --foreground: 0 0% 87.8431%;
    --primary: 189.9661 161.8632% 27.5935%;
    /* ... dark mode overrides */
  }
}
```

**Sources**: [SUBMODULE\_GUIDE.md449-589](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L449-L589)

---

## Component Import/Export Issues

### Named Import Not Found

**Symptom**: `Module '"@ui8kit/core"' has no exported member 'ComponentName'`

**Component Export Reference**:

```
dist/index.js exports

Core Primitives
Box, Block, Grid, Flex, Stack

UI Components
Button, Card, Text, Title, etc.

Layout Components
DashLayout, LayoutBlock, SplitBlock

Theme System
ThemeProvider, useTheme, themes

Hooks
useMediaQuery, useMobile, useViewport

Variant Props
spacingVariants, colorVariants, etc.

dist/index.js
```

**Solution 1**: Verify component name matches exports

```
# List all exports from the package
node -e "console.log(Object.keys(require('./node_modules/@ui8kit/core/dist/index.js')))"
```

**Solution 2**: Check component exists in library [README.md361-387](https://github.com/ui8kit/core/blob/2afe2195/README.md#L361-L387)

Available components:

- **Core Primitives (5)**: `Box`, `Block`, `Grid`, `Flex`, `Stack`
- **UI Components (15)**: `Button`, `Card`, `Text`, `Title`, `Container`, `Icon`, `Image`, `Badge`, `Group`, `Sheet`, `Accordion`
- **Layouts (3)**: `DashLayout`, `LayoutBlock`, `SplitBlock`

**Solution 3**: For compound components, use dot notation

```
// ✅ Correct
import { Card } from '@ui8kit/core';
<Card.Header>...</Card.Header>

// ❌ Incorrect - not exported separately
import { CardHeader } from '@ui8kit/core';
```

**Sources**: [README.md361-387](https://github.com/ui8kit/core/blob/2afe2195/README.md#L361-L387) [package.json31-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L31-L37)

---

### Compound Component Not Rendering

**Symptom**: `Card.Header` or `Card.Content` components render as plain divs without styling or throw errors.

**Root Cause**: Compound components are attached to parent component, not standalone exports.

**Solution**: Verify compound component usage pattern

```
import { Card } from '@ui8kit/core';

// ✅ Correct usage
function Example() {
  return (
    <Card p="lg">
      <Card.Header>
        <Card.Title>Title</Card.Title>
      </Card.Header>
      <Card.Content>
        Content here
      </Card.Content>
      <Card.Footer>
        Actions
      </Card.Footer>
    </Card>
  );
}

// ❌ Incorrect - using without parent Card
function Broken() {
  return (
    <div>
      <Card.Header>This won't work</Card.Header>
    </div>
  );
}
```

**Sources**: [README.md43-59](https://github.com/ui8kit/core/blob/2afe2195/README.md#L43-L59) [README.md122-145](https://github.com/ui8kit/core/blob/2afe2195/README.md#L122-L145)

---

## Build & Compilation Issues

### Build Script Fails with TypeScript Errors

**Symptom**: Running `npm run build` produces TypeScript compilation errors.

**Build Process Mapping**:

```
Errors

Success

Success

npm run build

tsc -p tsconfig.json

Load: tsconfig.json

Scan: src//*.ts, src//*.tsx

Type checking

Emit: dist/index.js

Emit: dist/index.d.ts

Fix type errors in src/

Build artifacts in dist/
```

**Solution 1**: Run type check separately to diagnose

```
npm run type-check  # Runs: tsc --noEmit
```

**Solution 2**: Check TypeScript configuration [package.json22](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L22)

```
# Verify tsconfig.json exists and is valid
cat tsconfig.json

# Check TypeScript version
npm list typescript
```

**Solution 3**: Clean build artifacts and rebuild

```
rm -rf dist/
npm run build
```

**Sources**: [package.json22-23](https://github.com/ui8kit/core/blob/2afe2195/package.json#L22-L23) README references to build system

---

### CVA Extractor Script Fails

**Symptom**: Running variant extraction fails or core-classes.json is outdated.

**Root Cause**: The `cva-extractor.ts` script parses variant definitions to generate the class whitelist. Script errors indicate parsing failures.

**Solution**: Manual regeneration (requires Bun)

```
# Run extractor script
bun scripts/cva-extractor.ts

# Verify output
cat src/lib/core-classes.json
# Should contain array of ~618 class strings
```

**Note**: The `core-classes.json` file is pre-generated and committed. Regeneration is only needed when adding new variants.

**Sources**: References to cva-extractor in architecture diagrams

---

### ESLint Errors During Build

**Symptom**: Lint errors prevent build or CI from passing.

**Solution 1**: Run linter separately

```
npm run lint         # Check for errors
npm run lint:fix     # Auto-fix issues
```

**Solution 2**: Bypass linting temporarily for build

```
# Not recommended for production
npm run build -- --no-lint
```

**Sources**: [package.json24-25](https://github.com/ui8kit/core/blob/2afe2195/package.json#L24-L25)

---

## Runtime Errors

### Duplicate React Copies in Monorepo

**Symptom**: Error: `Invalid hook call. Hooks can only be called inside the body of a function component.` Multiple React instances detected.

**Root Cause**: Multiple copies of React are loaded when using monorepo/submodule setup. Vite or webpack loads both from app's node\_modules and library's node\_modules. [SUBMODULE\_GUIDE.md247-254](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L247-L254)

**Solution**: Configure bundler to dedupe React [SUBMODULE\_GUIDE.md236-257](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L236-L257)

```
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    preserveSymlinks: true,  // Important for submodules
    dedupe: ['react', 'react-dom'],  // Deduplicate React
    alias: {
      '@ui8kit/core': path.resolve(__dirname, '../../packages/@ui8kit/core/src')
    }
  }
});
```

**Verification**:

```
# Check for duplicate React
npm list react
# Should show single version, not multiple paths
```

**Sources**: [SUBMODULE\_GUIDE.md236-257](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L236-L257)

---

### Cannot Read Property of Undefined in useTheme

**Symptom**: Runtime error: `Cannot read property 'isDarkMode' of undefined` when calling `useTheme()`.

**Root Cause**: `useTheme` hook called outside `ThemeProvider` context.

**Solution**: Ensure `ThemeProvider` wraps component tree [README.md223-233](https://github.com/ui8kit/core/blob/2afe2195/README.md#L223-L233)

```
// ❌ Incorrect - useTheme called outside provider
function App() {
  const { isDarkMode } = useTheme(); // Error!
  return <div>...</div>;
}

// ✅ Correct - provider wraps app
function App() {
  return (
    <ThemeProvider theme={modernUITheme}>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme(); // Works!
  return <div>...</div>;
}
```

**Sources**: [README.md223-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L223-L249)

---

### Variant Props Not Applying Styles

**Symptom**: Component renders but variant props like `p="lg"` or `rounded="xl"` do not apply styles.

**Diagnostic Checklist**:

| Check                            | Command/Inspection                 | Expected Result                          |
| -------------------------------- | ---------------------------------- | ---------------------------------------- |
| Props passed correctly           | Inspect React DevTools             | Props visible in component               |
| Tailwind classes generated       | Inspect element classes in browser | Classes like `p-8`, `rounded-xl` present |
| Tailwind config includes library | Check `tailwind.config.js` content | Library paths included                   |
| CSS file loaded                  | Check Network tab                  | CSS file loaded without errors           |
| Classes not purged               | Inspect final CSS                  | Classes present in CSS file              |

**Solution 1**: Verify prop names match variant definitions

```
// ✅ Correct prop names
<Box p="lg" m="md" rounded="xl" />

// ❌ Incorrect prop names
<Box padding="lg" margin="md" borderRadius="xl" />
```

**Solution 2**: Check parent component forwards variant props

```
// Component must extend and spread variant props
interface CustomBoxProps extends 
  React.HTMLAttributes<HTMLDivElement>,
  SpacingVariantsProps {  // Must extend
  // ...
}

export function CustomBox({ p, m, ...props }: CustomBoxProps) {
  return <Box p={p} m={m} {...props} />;  // Must forward
}
```

**Sources**: Architecture diagrams showing variant system, [README.md174-217](https://github.com/ui8kit/core/blob/2afe2195/README.md#L174-L217)

---

## Monorepo Integration Issues

### Workspace Package Not Resolving

**Symptom**: In monorepo, imports fail with `Cannot find module '@ui8kit/core'` despite submodule being present.

**Monorepo Resolution Flow**:

```
```

**Solution 1**: Verify workspace configuration [SUBMODULE\_GUIDE.md56-60](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L56-L60)

```
// Root package.json
{
  "workspaces": [
    "apps/*",
    "packages/*",
    "packages/@ui8kit/*"  // Must include scoped packages
  ]
}
```

**Solution 2**: Check submodule is initialized [SUBMODULE\_GUIDE.md139-144](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L139-L144)

```
git submodule status
# Should show commit hash and path, not "-" prefix

git submodule update --init --recursive
```

**Solution 3**: Verify package.json dependency [SUBMODULE\_GUIDE.md167](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L167-L167)

```
// apps/web/package.json
{
  "dependencies": {
    "@ui8kit/core": "workspace:*"  // Use workspace protocol
  }
}
```

**Solution 4**: Reinstall dependencies

```
rm -rf node_modules
bun install  # or npm install
```

**Sources**: [SUBMODULE\_GUIDE.md46-74](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L46-L74) [SUBMODULE\_GUIDE.md139-149](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L139-L149)

---

### Submodule Commit Detached HEAD Warning

**Symptom**: Git warns about detached HEAD state when working in submodule directory.

**Root Cause**: Submodules track specific commits, not branches. Parent repo records exact commit hash. [SUBMODULE\_GUIDE.md684](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L684-L684)

**Solution 1**: Update submodule to latest from main branch [SUBMODULE\_GUIDE.md627-637](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L627-L637)

```
cd packages/@ui8kit/core
git fetch
git checkout main
git pull --ff-only
cd ../../..

# Commit the updated submodule pointer
git add packages/@ui8kit/core
git commit -m "chore: update @ui8kit/core submodule"
```

**Solution 2**: For development, create a branch in submodule

```
cd packages/@ui8kit/core
git checkout -b feature/my-changes
# Make changes, commit
cd ../../..
```

**Prevention**: Document submodule workflow in team documentation. [SUBMODULE\_GUIDE.md681-691](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L681-L691)

**Sources**: [SUBMODULE\_GUIDE.md625-651](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L625-L651) [SUBMODULE\_GUIDE.md681-691](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L681-L691)

---

## Performance Issues

### Large Bundle Size

**Symptom**: Production bundle includes unnecessary code or is larger than expected.

**Bundle Size Breakdown**:

| Component Group     | Approx Size | Optimization                      |
| ------------------- | ----------- | --------------------------------- |
| Core primitives (5) | \~5KB       | Tree-shakeable                    |
| UI components (15)  | \~25KB      | Import only needed                |
| Layouts (3)         | \~8KB       | Typically not needed in libraries |
| Theme system        | \~2KB       | Required if using themes          |
| Dependencies        | Variable    | Check peer vs bundled             |

**Solution 1**: Import only needed components

```
// ❌ Barrel import (imports everything)
import * as UI8Kit from '@ui8kit/core';

// ✅ Named imports (tree-shakeable)
import { Button, Card, Text } from '@ui8kit/core';
```

**Solution 2**: Analyze bundle composition

```
# For Vite
npm run build -- --mode production
npx vite-bundle-analyzer

# For Next.js
npm install @next/bundle-analyzer
```

**Solution 3**: Use per-component installation for micro-bundles [README.md260-265](https://github.com/ui8kit/core/blob/2afe2195/README.md#L260-L265)

```
npx buildy-ui add button card
# Installs only specified components
```

**Sources**: [README.md260-265](https://github.com/ui8kit/core/blob/2afe2195/README.md#L260-L265) [package.json30](https://github.com/ui8kit/core/blob/2afe2195/package.json#L30-L30)

---

### Slow Development Server

**Symptom**: Vite/webpack dev server slow to start or hot reload takes several seconds.

**Solution 1**: Optimize Vite configuration for monorepo [SUBMODULE\_GUIDE.md247-249](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L247-L249)

```
// vite.config.ts
export default defineConfig({
  resolve: {
    preserveSymlinks: true,  // Faster for symlinked packages
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],  // Pre-bundle dependencies
  }
});
```

**Solution 2**: Exclude unnecessary paths from Tailwind content scanning

```
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{ts,tsx}",  // Only app source
    "../../packages/@ui8kit/core/src/**/*.{ts,tsx}"  // Only library source
    // Don't include: node_modules, dist, build, etc.
  ]
}
```

**Sources**: [SUBMODULE\_GUIDE.md236-257](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L236-L257)

---

## FAQ

### Q: Can I use this library without Tailwind CSS?

**A**: No. The library is tightly coupled to Tailwind CSS through the CVA variant system. The 618 generated utility classes are Tailwind classes. However, you can customize the Tailwind configuration to match your design system.

**Sources**: Architecture diagrams showing CVA-Tailwind integration

---

### Q: How do I customize component styles?

**A**: Three approaches:

1. **Extend with variants**: Add custom CVA variants to components
2. **Compose with primitives**: Build custom components using `Box`, `Block`, etc.
3. **Override with className**: Pass custom Tailwind classes via `className` prop (merged with tw-merge)

Example:

```
import { Button } from '@ui8kit/core';
import { cva } from 'class-variance-authority';

// Approach 1: Custom variants
const customButton = cva('', {
  variants: {
    gradient: {
      true: 'bg-gradient-to-r from-blue-500 to-purple-500'
    }
  }
});

// Approach 3: className override
<Button className="hover:scale-105 transition-transform">
  Custom Button
</Button>
```

**Sources**: [README.md278-304](https://github.com/ui8kit/core/blob/2afe2195/README.md#L278-L304)

---

### Q: Why am I getting "className is not a valid prop" warnings?

**A**: If passing complex className strings with template literals or conditionals, ensure proper string concatenation:

```
// ❌ May cause warnings
<Box className={`${baseClass} ${isActive && 'active'}`} />

// ✅ Use clsx or proper concatenation
import { clsx } from 'clsx';
<Box className={clsx(baseClass, isActive && 'active')} />
```

---

### Q: How do I contribute new components?

**A**: For contribution workflow, see [Development Guide](#5). Key steps:

1. Create component in appropriate layer (`src/core/ui/`, `src/components/ui/`, or `src/layouts/`)
2. Extend variant props from variant system
3. Add to registry.json
4. Update exports in index files
5. Run `npm run build` and `npm run scan`

---

### Q: Can I use this in Next.js app router?

**A**: Yes, but mark client components:

```
'use client';

import { Button, Card } from '@ui8kit/core';
```

Theme provider should also be a client component.

---

### Q: How do I debug which React version is loaded?

**A**: Use this snippet in your component:

```
import React from 'react';

console.log('React version:', React.version);
console.log('React module path:', require.resolve('react'));

// In browser DevTools:
// Should show single version and path
```

For Vite, check `vite.config.ts` includes `dedupe: ['react', 'react-dom']` [SUBMODULE\_GUIDE.md249](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L249-L249)

**Sources**: [SUBMODULE\_GUIDE.md247-254](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L247-L254)

---

## Getting Additional Help

If issues persist after trying solutions in this guide:

1. **Check GitHub Issues**: <https://github.com/ui8kit/core/issues>
2. **Review Architecture**: See [Architecture](#3) for system understanding
3. **Consult API Reference**: See [API Reference](#4) for component details
4. **Verify Configuration**: See [TypeScript Configuration](#3.8) and [Build System](#3.6)

For build system issues, see [Build System](#3.6). For component usage patterns, see [Basic Workflow](#5.1) and [Best Practices](#5.3).

**Sources**: [package.json44-47](https://github.com/ui8kit/core/blob/2afe2195/package.json#L44-L47) [README.md404-411](https://github.com/ui8kit/core/blob/2afe2195/README.md#L404-L411)