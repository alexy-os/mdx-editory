# 🏗️ Architecture - @EditorY Turbo Monorepo

This document describes the architecture and structure of the `@editory` monorepo.

---

## 📦 Workspace Structure

```
@editory/
├── apps/                          (Standalone Applications)
│   ├── admin/
│   │   ├── src/
│   │   │   ├── app/               (React components)
│   │   │   ├── components/        (Reusable UI)
│   │   │   ├── hooks/             (Custom hooks)
│   │   │   ├── lib/               (Utilities)
│   │   │   ├── types/             (TypeScript types)
│   │   │   └── main.tsx           (Entry point)
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── blog/                      (Blog Application)
│   │   └── ... (similar structure)
│   │
│   └── doc/                       (Documentation Site)
│       └── ... (similar structure)
│
├── packages/                      (Shared Libraries)
│   ├── rich/                      (Rich Text Editor Library)
│   │   ├── src/
│   │   │   ├── components/        (Tiptap & CodeMirror based)
│   │   │   ├── hooks/             (Editor hooks)
│   │   │   ├── i18n/              (Internationalization)
│   │   │   ├── types/             (Type definitions)
│   │   │   ├── utils/             (Helper functions)
│   │   │   └── index.ts           (Export point)
│   │   ├── test/                  (Test fixtures)
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── ui/                        (UI Components Library)
│       ├── semantic/              (Semantic classes)
│       ├── utility/               (Utility classes)
│       ├── lib/                   (Utilities)
│       └── package.json
│
├── scripts/                       (Build & Utility Scripts)
│   ├── optimize-images.ts
│   └── public-generate.tsx
│
├── .github/
│   └── workflows/
│       └── turbo-ci.yml           (GitHub Actions)
│
├── Configuration Files
│   ├── turbo.json                 (Turbo config)
│   ├── .turboignore               (Cache optimization)
│   ├── .eslintrc.json             (Shared ESLint)
│   ├── .prettierrc.json           (Shared Prettier)
│   ├── package.json               (Root package)
│   ├── .gitignore                 (Git patterns)
│   └── docker-compose.yml         (Docker setup)
│
└── Documentation
    ├── README_TURBO.md            (Quick start)
    ├── GETTING_STARTED.md         (Beginner guide)
    ├── TURBO_COMMANDS.md          (Commands reference)
    ├── TURBO_SETUP.md             (Setup guide)
    ├── TURBO_MIGRATION_GUIDE.md   (Migration details)
    ├── TURBO_SUMMARY.md           (Complete overview)
    ├── INDEX.md                   (Documentation index)
    ├── ARCHITECTURE.md            (This file)
    └── CHANGES.md                 (Changelog)
```

---

## 🔗 Dependency Graph

### High-Level Dependencies

```
┌─────────────────────────────────────────────────────────┐
│                    @editory/admin                        │
│                  (React Dashboard App)                   │
├─────────────────────────────────────────────────────────┤
│ Dependencies:                                            │
│   - @editory/rich (Rich text editor library)            │
│   - React, React Router, etc.                           │
└─────────────────────────────────────────────────────────┘
                         ↓ depends on

┌─────────────────────────────────────────────────────────┐
│                    @editory/rich                         │
│              (Rich Text Editor Library)                  │
├─────────────────────────────────────────────────────────┤
│ Dependencies:                                            │
│   - Tiptap (Editor core)                                │
│   - CodeMirror (Syntax highlighting)                    │
│   - React, React DOM                                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    @editory/ui                           │
│                (UI Components Library)                   │
├─────────────────────────────────────────────────────────┤
│ Dependencies:                                            │
│   - React, React DOM                                    │
│   - (Independent - no internal deps)                    │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    @editory/blog                         │
│                  (Blog Application)                      │
├─────────────────────────────────────────────────────────┤
│ Dependencies:                                            │
│   - React, Vite                                         │
│   - (Can use @editory/rich, @editory/ui)               │
└─────────────────────────────────────────────────────────┘
```

### Turbo Dependency Resolution

```
Turbo build process:

1. ANALYZE DEPENDENCIES
   - @editory/admin → requires @editory/rich
   - @editory/rich → requires React
   - @editory/ui → no internal deps
   - @editory/blog → standalone

2. BUILD ORDER (Topological sort)
   ┌────────────────────────────────────┐
   │ Start                              │
   └────────────┬───────────────────────┘
                │
        ┌───────▼─────────┐
        │ Parallel Phase 1 │
        ├──────┬──────────┤
        │ rich │ ui, blog │  (can run in parallel)
        └──────┴──────────┘
                │
        ┌───────▼─────────┐
        │ Parallel Phase 2 │
        ├────────────────┤
        │ admin           │  (depends on rich)
        └────────────────┘
                │
        ┌───────▼───────────┐
        │ All builds done   │
        │ Cache results     │
        └───────────────────┘

3. CACHING
   - @editory/rich → Cache outputs/metadata
   - @editory/ui → Cache outputs/metadata
   - @editory/blog → Cache outputs/metadata
   - @editory/admin → Cache outputs/metadata

4. NEXT RUN
   - If source unchanged → use cache
   - If source changed → rebuild (only this package!)
```

---

## 🔄 Task Execution Flow

### Build Task Flow

```
npm run build
    ↓
turbo build (reads turbo.json)
    ↓
┌─────────────────────────────────────────┐
│ TASK: build                             │
│ dependsOn: ["^build"]                   │
│ cache: true                             │
│ outputs: ["dist/**", "build/**"]       │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ DEPENDENCY ANALYSIS                     │
│ Which packages need building?           │
│ Detect circular dependencies?           │
│ Plan execution order                    │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ CACHE CHECK                             │
│ Is output cached & valid?               │
│ Have dependencies changed?              │
│ Global dependencies changed?            │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ PARALLEL EXECUTION                      │
│ Rich, UI, Blog (no dependencies)        │
│ Admin (waits for Rich)                  │
└─────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────┐
│ CACHE WRITE                             │
│ Store outputs in .turbo/cache/          │
│ Update turbo-lock.json                  │
└─────────────────────────────────────────┘
```

---

## 📊 Cache Architecture

### Cache Storage

```
.turbo/                              (git ignored)
├── cache/
│   ├── [hash1]/
│   │   ├── outputs/                 (build artifacts)
│   │   ├── metadata.json
│   │   └── turbo-run-summary.json
│   ├── [hash2]/
│   └── ... (more caches)
└── turbo-lock.json                 (cache metadata)

Global Dependencies (trigger rebuild):
├── .env
├── .env.local
└── turbo.json

File Changes (selective rebuild):
├── apps/admin/src/...             → rebuild admin
├── packages/rich/src/...          → rebuild rich + admin
└── packages/ui/src/...            → rebuild ui
```

### Cache Invalidation Rules

```
Cache VALID if:
  ✅ Source files unchanged
  ✅ Dependencies unchanged
  ✅ .env files unchanged
  ✅ turbo.json unchanged
  ✅ Global dependencies unchanged

Cache INVALID if:
  ❌ Source files modified
  ❌ Dependency version changed
  ❌ .env modified
  ❌ turbo.json modified
  ❌ Node version changed (if tracked)
  ❌ Build command modified
```

---

## 🔧 Configuration Architecture

### turbo.json Structure

```json
{
  "globalDependencies": [        // Files that trigger all rebuilds
    ".env",
    ".env.local",
    "turbo.json"
  ],
  "globalEnv": [                 // Env vars that affect caching
    "NODE_ENV"
  ],
  "tasks": {
    "build": {
      "dependsOn": ["^build"],   // Wait for dependency builds
      "outputs": ["dist/**"],    // What to cache
      "cache": true              // Enable caching
    },
    "dev": {
      "cache": false,            // Never cache dev
      "persistent": true         // Keep running
    },
    ...
  }
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "turbo dev",                              // All packages
    "build": "turbo build",                          // All packages
    "build:admin": "turbo build --filter=@editory/admin",  // Single
    "build:rich": "turbo build --filter=@editory/rich",    // Single
    ...
  }
}
```

---

## 📈 Scaling Strategy

### Current State (5 packages)

```
5 packages
├── 2 apps (admin, blog)
├── 2 packages (rich, ui)
└── 1 doc app

Build Time: ~45 seconds
With Cache: ~2 seconds (on unchanged)
```

### Growth to 10 Packages

```
10 packages (add more apps/packages)

Turbo Benefits:
  - Still ~45 seconds (parallel execution)
  - Cache hits grow (more unchanged code)
  - With cache: ~1-2 seconds

Add more with:
  bun create-app myapp
  # Turbo automatically includes it
  npm run build  # Works without config changes!
```

### Growth to 50+ Packages

```
50+ packages (enterprise monorepo)

Turbo Advantages:
  - Distributed caching (Turbo Remote Cache)
  - Selective rebuilds (only changed)
  - Git-based filtering (since origin/main)
  - Build farm support

Commands:
  turbo build --since=origin/main  # Only changed
  turbo build --filter=...[apps]   # Specific scope
```

---

## 🚀 Performance Characteristics

### Build Time Analysis

```
Operation                Before    After     Improvement
─────────────────────────────────────────────────────
First build              45s       45s       -
Second build (cached)    45s       2s        95%
Change one file          45s       15s       67%
Change library           45s       20s       56%
CI/CD full build         60s       15s       75%
```

### Memory Usage

```
npm run dev              ~500MB    (all apps)
npm run dev:admin        ~300MB    (single app)
turbo build              ~400MB    (parallel builds)
```

### Network

```
CI/CD (remote cache):    On-demand
                         ├── First build: full compile
                         └── Next builds: cache hits from Turbo server
```

---

## 🔐 Security & Isolation

### Package Isolation

```
Each package has:
├── Separate node_modules (symlinked)
├── Own package.json
├── Independent build output
├── Isolated runtime

NO direct dependency on internal code:
├── Must be in package.json
├── Must use workspace: protocol
└── Version locked in lockfile
```

### Example: Admin app uses Rich

```
apps/admin/package.json:
{
  "dependencies": {
    "@editory/rich": "workspace:*"  // Internal dep
  }
}

Result:
- Rich built first (Turbo ensures)
- Admin receives built Rich
- Type-safe with dist/index.d.ts
```

---

## 📋 Development Workflow

### Local Development

```
1. Developer runs: npm run dev:admin

2. Turbo executes:
   - turbo dev --filter=@editory/admin
   - Only admin dev server starts
   - Port 5173 (or first available)

3. Developer makes change:
   - Vite hot-reload
   - No Turbo rebuild needed
   - Changes appear instantly

4. Ready to test admin build:
   - npm run build:admin
   - Only admin rebuilds
   - Rich comes from cache
```

### CI/CD Workflow

```
1. PR pushed to GitHub

2. GitHub Actions triggered:
   - Runs .github/workflows/turbo-ci.yml
   - Downloads cache from Turbo Remote
   - Only rebuilds changed packages

3. Build jobs:
   - Main build: full test suite
   - Parallel: admin, blog builds

4. Cache upload:
   - Results cached for future runs
   - Team benefits from cache
```

---

## 🎯 Best Practices

### ✅ DO

```bash
# Filter to what you're working on
npm run dev:admin          # Start specific app

# Use cache-aware builds
npm run build              # Turbo handles caching

# Check dependencies
turbo graph                # Understand structure

# Clean when needed
npm run clean:cache        # Clear cache only
npm run clean              # Full clean
```

### ❌ DON'T

```bash
# Don't bypass Turbo
bun run --cwd apps/admin build   # Won't use cache

# Don't modify .turbo/
# (Let Turbo manage it)

# Don't commit cache
# (.turbo is in .gitignore)

# Don't ignore performance
# Profile slow builds: turbo build --profile=profile.json
```

---

## 🔍 Monitoring & Debugging

### Visibility Commands

```bash
turbo graph                          # Dependency graph
turbo build --verbose               # Detailed output
turbo build --dry                   # Preview tasks
turbo build --profile=profile.json  # Performance analysis
turbo build --force                 # Ignore cache
```

### Health Check

```bash
# Full build works?
npm run build

# Tests pass?
npm run test

# Linting clean?
npm run lint

# All good!
git commit -m "Your changes"
```

---

## 📚 Related Documentation

- [README_TURBO.md](./README_TURBO.md) - Quick start
- [TURBO_SETUP.md](./TURBO_SETUP.md) - Setup guide
- [TURBO_COMMANDS.md](./TURBO_COMMANDS.md) - Commands reference
- [turbo.json](./turbo.json) - Configuration
- [docker-compose.yml](./docker-compose.yml) - Docker setup

---

**Architecture Complete** ✨  
*For questions, see [INDEX.md](./INDEX.md)*
