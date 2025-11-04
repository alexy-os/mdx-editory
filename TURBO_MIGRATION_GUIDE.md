# Turbo Monorepo Migration Guide

## Migration Summary

This project has been successfully migrated from a basic Bun monorepo to a **production-grade Turbo monorepo**. This document outlines the changes made and how to use the new setup.

## What Changed

### 1. **Configuration Files**

#### New Files Added:
- `turbo.json` - Main Turbo configuration with task definitions and caching
- `.turboignore` - Files that don't trigger task reruns
- `TURBO_SETUP.md` - Detailed setup documentation
- `TURBO_COMMANDS.md` - Command reference
- `docker-compose.yml` - Docker environments for development

#### Updated Files:
- `package.json` - Root replaced with Turbo commands
- `.gitignore` - Added Turbo cache entries

### 2. **Before and After - Command Comparison**

#### Before (Bun-only):
```bash
bun run --cwd apps/admin dev
bun run --cwd apps/blog build
bun run --cwd packages/rich build
```

#### After (Turbo):
```bash
npm run dev:admin
npm run build
turbo build --filter=@editory/admin
```

## Key Improvements

### ⚡ Performance

1. **Intelligent Caching**
   - Build outputs cached in `.turbo/`
   - Unchanged packages skip rebuild
   - Significant speedup on second builds (up to 80% faster)

2. **Parallel Execution**
   - Multiple packages build simultaneously
   - Automatic dependency graph resolution
   - CPU-efficient resource utilization

3. **Smart Filtering**
   - Build only changed packages
   - Git-aware filtering (since commits)
   - Selective monorepo operations

### 🎯 Developer Experience

1. **Unified Commands**
   ```bash
   npm run dev          # All apps
   npm run build        # All packages
   npm run build:admin  # Specific app
   ```

2. **Better Visibility**
   ```bash
   turbo build --verbose    # See what's happening
   turbo graph              # Visualize dependencies
   turbo build --dry        # Preview tasks
   ```

3. **Flexible Configuration**
   - Per-task caching policies
   - Global dependency tracking
   - Environment-aware invalidation

### 🔗 Dependency Management

Turbo automatically respects workspace dependencies:

- `@editory/admin` depends on `@editory/rich`
- `@editory/rich` is built first
- Builds happen in correct order
- Circular dependencies detected and prevented

## File Structure Changes

```
Before:
.
├── apps/
│   ├── admin/
│   ├── blog/
│   └── doc/
└── packages/
    ├── rich/
    └── ui/

After (same structure, but with Turbo):
.
├── .turbo/              ← Cache directory (git ignored)
├── .turboignore         ← ← Ignore file patterns
├── turbo.json           ← ← Main configuration
├── TURBO_SETUP.md       ← ← Documentation
├── TURBO_COMMANDS.md    ← ← Command reference
├── TURBO_MIGRATION_GUIDE.md  ← ← This file
├── apps/
│   ├── admin/
│   ├── blog/
│   └── doc/
└── packages/
    ├── rich/
    └── ui/
```

## Task Configuration

### Configured Tasks in `turbo.json`:

| Task | Purpose | Cached | Dependencies |
|------|---------|--------|--------------|
| `dev` | Start development servers | No | None |
| `build` | Production builds | Yes | ^build |
| `build:test` | Test builds | Yes | ^build |
| `test` | Run tests | Yes | build |
| `lint` | Linting checks | Yes | None |
| `preview` | Preview builds | No | build |
| `dev:test` | Dev test mode | No | None |

### How Dependencies Work

**Example: Building admin app**

```
turbo build --filter=@editory/admin

1. Check if @editory/admin needs rebuild
2. Check @editory/rich (dependency) needs rebuild
3. Build @editory/rich first
4. Build @editory/admin
5. Cache results for future runs
```

## Global Dependencies

Files that trigger ALL tasks to re-run:

```
- .env
- .env.local
- turbo.json
```

When these change, all caches are invalidated.

## Caching Strategy

### What Gets Cached
- Build outputs (dist/, build/, .next/)
- Build metadata
- Task execution time

### What Doesn't Get Cached
- `dev` tasks (persistent, always runs)
- `preview` tasks (always fresh)
- Tasks with `cache: false`

### Cache Location
- **Local**: `.turbo/` directory
- **Remote** (optional): Vercel servers

### Invalidation Rules
```
1. Source files change → rebuild
2. Dependencies change → rebuild
3. .env files change → rebuild all
4. turbo.json changes → rebuild all
5. Global environment changes → rebuild all
```

## Development Workflows

### Starting Development

**All apps:**
```bash
npm run dev
# Opens multiple dev servers on different ports
```

**Specific app:**
```bash
npm run dev:admin
# Opens only admin app
```

**With filtering:**
```bash
turbo dev --filter=@editory/*
```

### Building for Production

**All packages:**
```bash
npm run build
```

**Specific package:**
```bash
npm run build:admin
```

**With analysis:**
```bash
turbo run build:analyze --filter=@editory/admin
```

### Testing Workflow

```bash
# Test all
npm run test

# Test specific
turbo test --filter=@editory/admin

# Test with verbose output
turbo test --verbose
```

## CI/CD Integration

### GitHub Actions (Provided)

New workflow: `.github/workflows/turbo-ci.yml`

Features:
- Automatic Turbo cache
- Parallel builds for speed
- Package-specific workflows
- Bun integration

### Running Locally as CI

```bash
# Simulate CI build
turbo build --since=origin/main
turbo test
turbo lint
```

### Vercel Deployment

Already configured with:
- `vercel-build` script
- Builds only admin app
- Caches across deployments

## Docker Setup

New `docker-compose.yml` provides isolated environments:

```bash
# Development environment
docker-compose up dev

# Build environment
docker-compose up build

# Specific app
docker-compose up admin    # Admin app on port 5174
docker-compose up blog     # Blog app on port 5175
docker-compose up rich     # Rich editor on port 5176
```

## Migration Checklist

- [x] Install Turbo (`npm install -g turbo`)
- [x] Update root `package.json` with Turbo commands
- [x] Create `turbo.json` with task configuration
- [x] Create `.turboignore` for optimization
- [x] Update `.gitignore` with `.turbo/`
- [x] Test `npm run build`
- [x] Test `npm run dev`
- [x] Test filtering `npm run build:admin`
- [x] Update CI/CD workflows
- [x] Document all changes

## Troubleshooting

### Build Not Using Cache
```bash
# Check cache status
turbo build --verbose

# Clear cache
npm run clean:cache

# Rebuild
npm run build
```

### Tasks Not Running in Right Order
```bash
# Check dependency graph
turbo graph

# Verify turbo.json task dependencies
cat turbo.json | grep -A 5 '"dependsOn"'
```

### Performance Regression
```bash
# Check what changed
turbo build --profile=profile.json
# Review profile.json for slow tasks

# Run with fewer parallel tasks
turbo build --concurrency=2
```

### Cache Invalidation Issues
```bash
# Check global dependencies
# Make sure .env changes are tracked

turbo build --no-cache
# Then check if issue persists
```

## Performance Metrics

### Expected Improvements

| Scenario | Before | After | Improvement |
|----------|--------|-------|-------------|
| Full rebuild | 45s | 45s | - |
| No changes | 45s | 2s | **98%** |
| Single package change | 20s | 5s | **75%** |
| CI rebuild | 60s | 15s | **75%** |

*Times are examples; actual times depend on system specs*

## Next Steps

1. **Remove old scripts** - Legacy `bun run --cwd` commands no longer needed
2. **Update documentation** - Point team to `TURBO_COMMANDS.md`
3. **Configure remote cache** (optional) - For CI/CD speedup
4. **Train team** - Share benefits and new commands
5. **Monitor builds** - Track performance improvements

## Resources

- [Turbo Documentation](https://turbo.build/repo/docs)
- [Turbo CLI Reference](https://turbo.build/repo/docs/reference/command-line-reference)
- [Turbo Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Bun Documentation](https://bun.sh/docs)

## Support

For issues or questions:

1. Check `TURBO_SETUP.md` for setup details
2. Review `TURBO_COMMANDS.md` for command reference
3. Run `turbo build --verbose` for debugging
4. Check `.turboignore` if tasks not running

## Summary

Your monorepo is now optimized with Turbo! 🚀

Key benefits:
- ⚡ Faster builds with caching
- 🔗 Automatic dependency management
- 🎯 Flexible task filtering
- 📊 Better visibility and control
- 🚀 Ready for scale

Start using `npm run dev` or `npm run build` right away!
