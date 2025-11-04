---
{
  "title": "Dark Mode",
  "generatedAt": "2025-11-04T11:57:51.041Z"
}
---

# Dark Mode

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)
- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)
- [src/themes/index.ts](https://github.com/ui8kit/core/blob/2afe2195/src/themes/index.ts)
- [src/themes/providers/ThemeProvider.tsx](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx)

This document explains the dark mode implementation in `@ui8kit/core`, including the theme provider mechanism, state management, persistence strategies, and integration with Tailwind CSS. For general theming and variant styling, see [Variant System](#3.2). For component-specific styling patterns, see [Best Practices](#5.3).

## Purpose and Scope

The dark mode system provides automatic theme switching with persistent user preferences and system-level dark mode detection. The implementation is built around a React Context provider pattern that manages theme state, applies CSS classes to the document root, and synchronizes preferences to localStorage.

**Sources**: [src/themes/providers/ThemeProvider.tsx1-93](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L1-L93)

---

## ThemeProvider Architecture

The `ThemeProvider` component wraps the application and manages all theme-related state through React Context. It accepts a `theme` object conforming to the `ThemeBase` type and provides theme values and control functions through the context.

```
Browser APIs

State Management

ThemeProvider Component

Application Layer

reads from

reads from

reads from

writes to

updates

Application Root

Child Components

ThemeProvider

ThemeContext

useState hooks

useEffect hooks

isDarkMode: boolean

prefersReducedMotion: boolean

theme: ThemeBase

localStorage
ui:dark key

matchMedia
prefers-color-scheme

matchMedia
prefers-reduced-motion

document.documentElement
classList.toggle('dark')
```

**Diagram: ThemeProvider data flow and browser API integration**

The provider initializes state from three sources in priority order:

1. localStorage value at key `"ui:dark"` (if present)
2. System preference via `window.matchMedia('(prefers-color-scheme: dark)')`
3. Default fallback value of `false`

**Sources**: [src/themes/providers/ThemeProvider.tsx25-44](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L25-L44) [src/themes/providers/ThemeProvider.tsx70-83](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L70-L83)

---

## Dark Mode State Initialization and Persistence

The dark mode state follows a specific initialization and persistence flow that ensures user preferences are preserved across sessions while respecting system preferences when no explicit preference exists.

```
Update Flow

Initialization Flow

Yes

No

Yes

No

ThemeProvider mounts

Check localStorage
window.localStorage.getItem('ui:dark')

stored !== null?

Parse stored value
stored === '1' → true
stored === '0' → false

Check system preference
window.matchMedia('(prefers-color-scheme: dark)')

matchMedia
supported?

Get .matches value

Default to false

setIsDarkMode(value)

isDarkMode state changes

document.documentElement.classList.toggle('dark', isDarkMode)

document.documentElement.style.colorScheme = isDarkMode ? 'dark' : 'light'

localStorage.setItem('ui:dark', isDarkMode ? '1' : '0')
```

**Diagram: Dark mode state initialization and synchronization flow**

The initialization logic uses a lazy state initializer function to compute the initial value once during mount. The persistence mechanism stores values as string `"1"` (dark) or `"0"` (light) in localStorage at key `"ui:dark"`.

**Sources**: [src/themes/providers/ThemeProvider.tsx28-35](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L28-L35) [src/themes/providers/ThemeProvider.tsx37-44](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L37-L44)

---

## ThemeContextValue Interface

The `ThemeContext` provides a typed interface for accessing theme state and control functions. Components consume this context via the `useTheme` hook.

| Property               | Type                       | Description                          |
| ---------------------- | -------------------------- | ------------------------------------ |
| `theme`                | `T extends ThemeBase`      | The theme configuration object       |
| `rounded`              | `T['rounded']`             | Rounded corner variants from theme   |
| `buttonSize`           | `T['buttonSize']`          | Button size variants from theme      |
| `isDarkMode`           | `boolean`                  | Current dark mode state              |
| `isNavFixed`           | `boolean \| undefined`     | Optional navigation fixed state      |
| `prefersReducedMotion` | `boolean`                  | User's reduced motion preference     |
| `toggleDarkMode`       | `() => void`               | Function to toggle dark mode         |
| `setDarkMode`          | `(value: boolean) => void` | Function to set dark mode explicitly |

The `ThemeBase` type defines the minimum structure required for theme objects:

```
export type ThemeBase = {
  name: string;
  rounded: Record<string, any> & { default: any };
  buttonSize: Record<string, any> & { default: any };
  isNavFixed?: boolean;
};
```

**Sources**: [src/themes/providers/ThemeProvider.tsx4-10](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L4-L10) [src/themes/providers/ThemeProvider.tsx12-21](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L12-L21)

---

## Using the useTheme Hook

Components access theme context through the `useTheme` hook, which enforces usage within a `ThemeProvider` and returns the typed context value.

**Hook Usage Pattern:**

```
import { useTheme } from '@ui8kit/core';

function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? '☀️' : '🌙'}
    </button>
  );
}
```

The hook implementation throws an error if used outside a provider context, ensuring proper setup at the application root.

**Sources**: [src/themes/providers/ThemeProvider.tsx87-93](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L87-L93) [README.md235-249](https://github.com/ui8kit/core/blob/2afe2195/README.md#L235-L249)

---

## Dark Mode Toggle Implementation

The library provides two methods for controlling dark mode state:

### toggleDarkMode Function

Inverts the current dark mode state:

```
const { toggleDarkMode } = useTheme();
// Calling toggleDarkMode() switches between light and dark
```

### setDarkMode Function

Sets dark mode to a specific value:

```
const { setDarkMode } = useTheme();
// setDarkMode(true)  → Force dark mode
// setDarkMode(false) → Force light mode
```

Both functions trigger the persistence flow that updates the DOM and localStorage synchronously.

**Sources**: [src/themes/providers/ThemeProvider.tsx78-79](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L78-L79) [README.md240-248](https://github.com/ui8kit/core/blob/2afe2195/README.md#L240-L248)

---

## Accessibility: Reduced Motion Support

The `ThemeProvider` detects and tracks the user's `prefers-reduced-motion` system preference through the same media query pattern used for dark mode detection.

```
Runtime Monitoring

Initialization

Cleanup

Component Unmount

removeEventListener

Component Mount

window.matchMedia('prefers-reduced-motion: reduce')

setPrefersReducedMotion(matches)

MediaQueryList event listener

Change event handler

setPrefersReducedMotion(e.matches)
```

**Diagram: Reduced motion preference detection and monitoring**

The implementation includes fallback for older browsers that use `addListener`/`removeListener` instead of `addEventListener`/`removeEventListener`. Components can access this value through the context to conditionally disable animations.

**Sources**: [src/themes/providers/ThemeProvider.tsx46-68](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L46-L68)

---

## Tailwind CSS Integration

The dark mode system integrates with Tailwind CSS through the `.dark` class applied to `document.documentElement`. This requires Tailwind configuration with `darkMode: 'class'`:

```
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ... other config
}
```

When `isDarkMode` is `true`, the provider adds the `dark` class to the root element, activating Tailwind's `dark:` variant modifiers:

```
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content adapts to dark mode
</div>
```

The provider also sets `document.documentElement.style.colorScheme` to `"dark"` or `"light"`, which signals the user's preference to the browser for native form controls and scrollbars.

**Sources**: [src/themes/providers/ThemeProvider.tsx37-44](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L37-L44) [README.md219-233](https://github.com/ui8kit/core/blob/2afe2195/README.md#L219-L233)

---

## Theme Configuration

Applications must wrap their root component with `ThemeProvider` and pass a theme object. The library exports three pre-configured themes:

| Theme Export    | Module         | Theme Name |
| --------------- | -------------- | ---------- |
| `modernUITheme` | `@ui8kit/core` | "modernUI" |
| `skyOSTheme`    | `@ui8kit/core` | "skyOS"    |
| `lesseUITheme`  | `@ui8kit/core` | "lesseUI"  |

**Setup Pattern:**

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

Each theme object must satisfy the `ThemeBase` type constraint with `name`, `rounded`, and `buttonSize` properties. Custom themes can be created by implementing this interface.

**Sources**: [src/themes/index.ts1-9](https://github.com/ui8kit/core/blob/2afe2195/src/themes/index.ts#L1-L9) [README.md223-233](https://github.com/ui8kit/core/blob/2afe2195/README.md#L223-L233)

---

## Server-Side Rendering Considerations

The implementation includes SSR-safe checks using `typeof window !== 'undefined'` and `typeof document === 'undefined'` guards to prevent runtime errors during server rendering. Initial state computation avoids accessing browser APIs until the client hydration phase.

The lazy state initializer pattern ensures that:

1. State initialization logic runs only once during mount
2. Browser API access is safely guarded
3. SSR environments receive sensible defaults (`false` for dark mode)

Error handling wraps localStorage operations in try-catch blocks to prevent failures from blocking the application in environments with restricted storage access.

**Sources**: [src/themes/providers/ThemeProvider.tsx28-35](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L28-L35) [src/themes/providers/ThemeProvider.tsx37-44](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L37-L44) [src/themes/providers/ThemeProvider.tsx46-49](https://github.com/ui8kit/core/blob/2afe2195/src/themes/providers/ThemeProvider.tsx#L46-L49)