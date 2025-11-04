# Turbo Monorepo Setup Guide

## Overview

This project has been configured as a **Turbo-optimized Bun monorepo** with intelligent task caching, dependency management, and parallel execution.

## Architecture

```
@editory/root (workspace root)
├── apps/
│   ├── admin       (Vite + React app - dashboard)
│   ├── blog        (Blog application)
│   └── doc         (Documentation app)
└── packages/
    ├── rich        (Rich text editor library)
    └── ui          (UI components library)
```

## Quick Start

### Install Dependencies
```bash
bun install
# or
npm install
```

### Development

**Start all apps in development mode:**
```bash
npm run dev
# or
turbo dev
```

**Start specific workspace:**
```bash
npm run dev:admin    # Start admin app
npm run dev:blog     # Start blog app
npm run dev:rich     # Start rich package
npm run dev:ui       # Start UI package
```

### Building

**Build all packages:**
```bash
npm run build
# or
turbo build
```

**Build specific package:**
```bash
npm run build:admin   # Build admin app
npm run build:blog    # Build blog app
npm run build:rich    # Build rich library
npm run build:ui      # Build UI library
```

**Build with analysis (admin only):**
```bash
turbo run build:analyze --filter=@editory/admin
```

## Turbo Configuration

### Key Features

1. **Task Caching** - Automatic caching of build outputs
2. **Parallel Execution** - Tasks run in parallel when possible
3. **Dependency Graph** - Respects workspace dependencies
4. **Global Dependencies** - Files that trigger all tasks on change:
   - `.env`, `.env.local`
   - `turbo.json`

### Task Definitions

| Task | Cache | Output | Dependencies |
|------|-------|--------|--------------|
| `dev` | No | dist/** | None (persistent) |
| `build` | Yes | dist/**, build/**, .next/** | ^build |
| `build:test` | Yes | dist/** | ^build |
| `test` | Yes | - | build |
| `lint` | Yes | - | None |
| `preview` | No | - | build |
| `preview:test` | No | - | build:test |
| `dev:test` | No | - | None (persistent) |

## Advanced Commands

### Filter by Package
```bash
turbo build --filter=@editory/admin
turbo build --filter=@editory/rich
turbo dev --filter=@editory/*
```

### Include Dependencies
```bash
turbo build --filter=@editory/admin...
```

### Monorepo Scope Management
```bash
turbo build --scope=@editory/admin
turbo build --since=HEAD~1
```

### Cache Management
```bash
npm run clean        # Clean all builds
npm run clean:cache  # Clean Turbo cache
turbo prune --scope=@editory/admin  # Prune specific scope
```

## Performance Optimization

### Caching Strategy
- **Outputs stored in:** `.turbo/` directory
- **Files ignored:** `.turboignore`
- **Environment based:** NODE_ENV changes invalidate cache
- **Global changes:** `.env`, `.env.local` invalidate all caches

### Remote Cache (Optional)
To enable remote caching with Vercel:

```bash
turbo login
turbo link
```

Then configure in `turbo.json`:
```json
{
  "remoteCache": {
    "enabled": true
  }
}
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Build with Turbo
  run: npm run build
  
- name: Specific package build
  run: turbo build --filter=@editory/admin
```

### Vercel Integration
The `vercel-build` script automatically builds only the admin app:
```bash
npm run vercel-build
```

## Troubleshooting

### Cache not working
```bash
npm run clean:cache
npm run build
```

### Dependency issues
```bash
bun install
turbo build --no-cache
```

### See task execution details
```bash
turbo build --verbose
turbo build --graph
```

## File Structure

```
.turbo/                 # Turbo cache directory (git ignored)
.turboignore            # Files that don't trigger task reruns
turbo.json              # Main Turbo configuration
package.json            # Root workspace configuration
```

## Benefits

✅ **Faster builds** - Intelligent caching prevents rebuilding unchanged packages
✅ **Parallel execution** - Run multiple tasks simultaneously
✅ **Dependency management** - Automatic dependency graph resolution
✅ **Easy scaling** - Add new packages without configuration changes
✅ **Clear visualization** - Understand build dependencies with `turbo graph`

## Resources

- [Turbo Documentation](https://turbo.build/repo/docs)
- [Turbo API Reference](https://turbo.build/repo/docs/reference/command-line-reference)
- [Bun Documentation](https://bun.sh/docs)
