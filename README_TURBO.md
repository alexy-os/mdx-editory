# 🚀 EditorY - Turbo Monorepo

## Quick Start

### Install & Run

```bash
# Install dependencies
bun install

# Start development (all apps)
npm run dev

# Build all packages
npm run build
```

## Common Commands

```bash
# Development
npm run dev              # All apps
npm run dev:admin       # Admin app only
npm run dev:rich        # Rich editor only

# Building
npm run build            # Build all
npm run build:admin     # Build admin only

# Utilities
npm run clean           # Clean everything
npm run clean:cache     # Clean Turbo cache only
npm run lint            # Lint all
npm run test            # Test all
```

## Project Structure

```
@editory/
├── apps/
│   ├── admin          - React admin dashboard
│   ├── blog           - Blog application
│   └── doc            - Documentation
└── packages/
    ├── rich           - Rich text editor library
    └── ui             - UI components library
```

## Turbo Features

✅ **Smart Caching** - Unchanged packages skip rebuild  
✅ **Parallel Builds** - Multiple packages build at once  
✅ **Dependency Aware** - Correct build order automatically  
✅ **Filtering** - Build specific packages with `--filter`  

## Key Files

| File | Purpose |
|------|---------|
| `turbo.json` | Turbo configuration & task definitions |
| `.turboignore` | Files that don't trigger rebuilds |
| `TURBO_SETUP.md` | Complete setup guide |
| `TURBO_COMMANDS.md` | Command reference |
| `TURBO_MIGRATION_GUIDE.md` | Migration details |

## Advanced Usage

### Filter specific packages
```bash
turbo build --filter=@editory/admin
turbo build --filter='@editory/*'
turbo build --filter=@editory/admin...    # Include dependencies
```

### Git-based filtering
```bash
turbo build --since=HEAD~1
turbo build --since=origin/main
```

### Debugging
```bash
turbo build --verbose              # Detailed output
turbo build --dry                  # Preview tasks
turbo graph                         # Show dependency graph
turbo build --profile=profile.json  # Performance analysis
```

## Cache Management

```bash
# Cache stored in .turbo/ (git ignored)
# Automatic invalidation on:
# - Source file changes
# - .env file changes
# - turbo.json changes

# Manual cache clear
npm run clean:cache

# No cache builds
turbo build --no-cache
```

## Docker Development

```bash
# Development environment
docker-compose up dev

# Build environment
docker-compose up build

# Specific apps
docker-compose up admin    # Admin on port 5174
docker-compose up blog     # Blog on port 5175
docker-compose up rich     # Rich on port 5176
```

## CI/CD

GitHub Actions workflow: `.github/workflows/turbo-ci.yml`

Includes:
- Automatic caching
- Parallel builds
- Package-specific jobs
- Bun integration

## Vercel Deployment

```bash
npm run vercel-build  # Builds admin app only
```

## Performance Tips

1. Use filtering for specific packages
2. Keep `.env` changes minimal
3. Enable Turbo cache (default)
4. Use `--concurrency` to limit parallel tasks
5. Check `turbo graph` for dependencies

## Documentation

- **[TURBO_SETUP.md](./TURBO_SETUP.md)** - Complete setup guide
- **[TURBO_COMMANDS.md](./TURBO_COMMANDS.md)** - All commands
- **[TURBO_MIGRATION_GUIDE.md](./TURBO_MIGRATION_GUIDE.md)** - Migration details

## Troubleshooting

### Cache not working?
```bash
npm run clean:cache
npm run build
```

### Dependency issues?
```bash
bun install
turbo build --no-cache
```

### Need visibility?
```bash
turbo build --verbose
turbo graph
```

## Resources

- 📚 [Turbo Docs](https://turbo.build/repo/docs)
- 🍞 [Bun Docs](https://bun.sh/docs)
- 💬 [Turbo Discord](https://turbo.build/chat)

---

**Start building!** Run `npm run dev` to begin development. 🎉
