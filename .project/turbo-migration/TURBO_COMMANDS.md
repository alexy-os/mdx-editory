# Turbo Commands Reference

## Root Scripts (in package.json)

```bash
npm run dev              # Start all apps in dev mode
npm run build            # Build all packages
npm run test             # Run all tests
npm run lint             # Run linting
npm run preview          # Preview builds
npm run clean            # Clean all builds and node_modules
npm run clean:cache      # Clean Turbo cache only
npm run generate         # Build and generate public files
npm run optimize:images  # Optimize images
npm run vercel-build     # Build for Vercel (admin only)
```

## Package-Specific Dev/Build

```bash
# Admin App
npm run dev:admin        # Dev: Admin only
npm run build:admin      # Build: Admin only

# Blog App
npm run dev:blog         # Dev: Blog only
npm run build:blog       # Build: Blog only

# Rich Package
npm run dev:rich         # Dev: Rich editor only
npm run build:rich       # Build: Rich editor only

# UI Package
npm run dev:ui           # Dev: UI components only
npm run build:ui         # Build: UI components only
```

## Direct Turbo Commands

```bash
# Basic builds
turbo build              # Build all packages
turbo build --no-cache   # Build without using cache
turbo build --verbose    # Show detailed output

# Filtering specific packages
turbo build --filter=@editory/admin          # Single package
turbo build --filter=@editory/{admin,blog}   # Multiple packages
turbo build --filter='@editory/*'            # All packages
turbo build --filter=...@editory/admin       # Include dependencies

# Development with filtering
turbo dev --filter=@editory/admin
turbo dev --filter='@editory/*'

# Testing
turbo test               # Run all tests
turbo test --filter=@editory/admin

# Linting
turbo lint               # Lint all packages
turbo lint --filter=@editory/admin

# Cache management
turbo prune --scope=@editory/admin              # Prune single package
turbo prune --scope='@editory/{admin,blog}'     # Prune multiple
turbo clean                                      # Clean all cache
```

## Advanced Filters

### By Package
```bash
turbo build --filter=@editory/admin
```

### Multiple Packages
```bash
turbo build --filter='@editory/{admin,blog}'
```

### All Packages
```bash
turbo build --filter='@editory/*'
```

### Include Dependencies
```bash
turbo build --filter=@editory/admin...
```

### Specific Directories
```bash
turbo build --filter='./apps/*'
```

## Git-Based Filtering

```bash
# Only changed packages since last commit
turbo build --since=HEAD~1

# Only changed packages in this branch
turbo build --since=origin/main

# Only packages changed in PR
turbo build --filter=[origin/main...HEAD]
```

## Monorepo Visualization

```bash
# View dependency graph
turbo graph

# Output graph for specific scope
turbo graph --filter=@editory/admin

# Generate graph as JSON
turbo graph --filter='@editory/*' > graph.json
```

## Useful Combinations

```bash
# Build and test
turbo build && turbo test

# Build specific package with verbose output
turbo build --filter=@editory/admin --verbose

# Preview admin build
turbo build --filter=@editory/admin && turbo preview --filter=@editory/admin

# Clean and rebuild everything
npm run clean && npm run build

# Run only changed packages since branch point
turbo build --filter=[origin/main...HEAD] --no-cache

# Run with specific parallel limit
turbo build --concurrency=4

# Show what would be executed
turbo build --dry
turbo build --dry=json
```

## Cache Strategies

### Skip Cache
```bash
turbo build --no-cache
```

### Use Cache Only (No Rebuild)
```bash
turbo build --force
```

### Visualize Cache Keys
```bash
turbo build --verbose | grep "Local cache"
```

## Debugging

```bash
# Verbose output
turbo build --verbose

# Profile task execution
turbo build --profile=profile.json

# Print task order
turbo build --dry

# Show task configuration
turbo run <task> --verbose

# Generate cache debug info
turbo build --log-order=grouped
```

## CI/CD Commands

```bash
# Build for CI (recommended)
turbo build --filter=[origin/main...HEAD]

# Build with cache retrieval from remote
turbo build --remote-only

# Full rebuild for release
turbo build --force --no-cache
```

## Package Installation

```bash
# Fresh install
rm -rf node_modules bun.lockb && bun install

# Install in specific workspace
cd packages/rich && bun install

# Clean install
npm run clean && bun install
```

## Performance Tips

1. **Use filtering** to build only what changed
2. **Enable Turbo cache** (default) for faster rebuilds
3. **Use --concurrency** to control parallel tasks
4. **Run --dry** before big operations
5. **Monitor with --verbose** for debugging

## Common Workflows

### Development
```bash
npm run dev:admin              # Start specific app
```

### Build for Production
```bash
npm run build                  # Build all
turbo build --filter=@editory/admin  # Build specific
```

### Testing
```bash
npm run test                   # Test all
turbo test --filter=@editory/admin   # Test specific
```

### CI/CD
```bash
turbo build --since=origin/main
npm run build
```

### Cleanup
```bash
npm run clean                  # Full cleanup
npm run clean:cache            # Cache only
turbo prune --scope=@editory/admin
```

## Troubleshooting

### Task not running
```bash
turbo build --verbose      # Check verbose output
turbo build --dry          # Preview what will run
```

### Cache not working
```bash
turbo build --no-cache
rm -rf .turbo
turbo build
```

### Dependency issues
```bash
bun install
turbo build --force
```

For more information, see [TURBO_SETUP.md](./TURBO_SETUP.md) or visit [turbo.build/repo/docs](https://turbo.build/repo/docs)
