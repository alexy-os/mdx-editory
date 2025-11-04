# 🎯 Getting Started - @EditorY Monorepo

Welcome! This guide will help you get started with the project in 10 minutes.

---

## ⚡ Quick Setup (First Time)

### 1. Clone and Install

```bash
# Navigate to project directory
cd E:\_@Bun\@EditorY

# Install dependencies
bun install
# or use npm if you prefer
npm install
```

### 2. Start Development

```bash
# Start all applications
npm run dev

# OR start a specific app
npm run dev:admin      # Just the admin dashboard
npm run dev:blog       # Just the blog
npm run dev:rich       # Just the rich editor
```

### 3. Open in Browser

Visit one of these addresses (check terminal for exact ports):
- Admin app: `http://localhost:5173`
- Blog app: `http://localhost:5174`
- Rich editor: `http://localhost:5175`

✅ **You're now running the monorepo!**

---

## 🚀 Common First Tasks

### Build the Project

```bash
# Build everything
npm run build

# Build just one package
npm run build:admin
npm run build:blog
npm run build:rich
npm run build:ui
```

### Run Tests

```bash
npm run test
```

### Check Code Quality

```bash
npm run lint
```

### Clean Up

```bash
# Remove all build artifacts
npm run clean

# Just clear the cache
npm run clean:cache
```

---

## 📦 What is This Project?

This is a **monorepo** - multiple projects in one repository:

```
@editory/
├── apps/              ← Full applications
│   ├── admin/        - Admin dashboard (React + Vite)
│   ├── blog/         - Blog application
│   └── doc/          - Documentation
└── packages/         ← Shared libraries
    ├── rich/         - Rich text editor
    └── ui/           - UI components
```

**Turbo** makes it easy to manage all these projects together!

---

## 🎓 Understanding Commands

### npm vs turbo

**These do the same thing:**
```bash
npm run build
turbo build
```

**These filter specific packages:**
```bash
npm run build:admin
turbo build --filter=@editory/admin

npm run dev:rich
turbo dev --filter=@editory/rich
```

So you can use whichever you prefer!

---

## 📚 Finding Answers

### Quick Questions?

| Question | Answer |
|----------|--------|
| "How do I start?" | Run `npm run dev` |
| "What commands exist?" | See [TURBO_COMMANDS.md](./TURBO_COMMANDS.md) |
| "Why is build slow?" | Try `npm run clean:cache` then rebuild |
| "What changed?" | Read [TURBO_MIGRATION_GUIDE.md](./TURBO_MIGRATION_GUIDE.md) |
| "How do Docker?" | See [README_TURBO.md](./README_TURBO.md) → Docker |
| "I'm lost!" | Check [INDEX.md](./INDEX.md) |

### Documentation by Role

**👨‍💻 I just want to code**
- Read: [README_TURBO.md](./README_TURBO.md)
- Bookmark: [TURBO_COMMANDS.md](./TURBO_COMMANDS.md)

**🔧 I need to understand the setup**
- Read: [TURBO_SETUP.md](./TURBO_SETUP.md)

**🏢 I'm leading the project**
- Read: [TURBO_MIGRATION_GUIDE.md](./TURBO_MIGRATION_GUIDE.md)
- Then: [TURBO_SUMMARY.md](./TURBO_SUMMARY.md)

**🧭 I'm confused where to start**
- Read: [INDEX.md](./INDEX.md)

---

## 💡 Tips for New Developers

### 1. Filtering Saves Time

When you only work on the admin app:
```bash
npm run dev:admin   # Only admin dev server starts
npm run build:admin # Only builds admin
```

### 2. Cache is Your Friend

The first build takes longer. Second builds are *much* faster! 
Don't be alarmed if second build is only a few seconds.

### 3. Check Dependencies Before Committing

Before pushing, make sure everything builds:
```bash
npm run build    # Full build
npm run lint     # Check code
npm run test     # Run tests
```

### 4. Use Verbose Mode for Debugging

If something seems wrong:
```bash
turbo build --verbose
```

---

## 🐛 Troubleshooting

### "Command not found: turbo"

**Solution 1:** Use npm scripts instead
```bash
npm run build    # Instead of: turbo build
```

**Solution 2:** Install Turbo globally
```bash
npm install -g turbo
```

### "Build is slow"

**Solution:** Clear cache and rebuild
```bash
npm run clean:cache
npm run build
```

### "Port already in use"

**Solution:** Kill process on port
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5173 | xargs kill -9
```

### "node_modules issues"

**Solution:** Fresh install
```bash
rm -rf node_modules bun.lockb
bun install
```

---

## ✅ First Week Checklist

- [ ] Ran `npm run dev` successfully
- [ ] Opened admin app in browser
- [ ] Read [README_TURBO.md](./README_TURBO.md)
- [ ] Made a code change and saw it hot-reload
- [ ] Built with `npm run build`
- [ ] Read [TURBO_COMMANDS.md](./TURBO_COMMANDS.md)
- [ ] Tried filtering: `npm run build:admin`
- [ ] Showed project to team member

---

## 🎯 Next Steps

### Learn More

1. **Read the docs** (pick one):
   - [README_TURBO.md](./README_TURBO.md) - Quick overview
   - [TURBO_COMMANDS.md](./TURBO_COMMANDS.md) - All commands
   - [TURBO_SETUP.md](./TURBO_SETUP.md) - Deep dive

2. **Try different commands**:
   ```bash
   npm run dev:blog         # Start different app
   turbo build --verbose    # See what's happening
   turbo graph              # View dependencies
   ```

3. **Understand the structure**:
   - Open `apps/admin/` - see a React app
   - Open `packages/rich/` - see a shared library
   - Open `turbo.json` - see task configuration

4. **Make a contribution**:
   - Find a small issue
   - Make a change
   - Build: `npm run build`
   - Test: `npm run test`
   - Commit!

---

## 🆘 Still Stuck?

**Don't panic! Here's what to do:**

1. **Check [INDEX.md](./INDEX.md)** - navigation guide
2. **Search the docs** - Ctrl+F in any .md file
3. **Ask a teammate** - They've been here too!
4. **Run with --verbose** - See what's happening
   ```bash
   turbo build --verbose
   turbo dev --verbose
   ```
5. **Check the Turbo docs** - [turbo.build](https://turbo.build)

---

## 🎉 You're Ready!

You now know enough to:
- ✅ Start the development servers
- ✅ Build the project
- ✅ Run tests and linting
- ✅ Use filtering for specific packages
- ✅ Find help when you need it

**Go build something awesome!** 🚀

---

## 📞 Quick Reference

```bash
# Development
npm run dev              # Start all apps
npm run dev:admin       # Start admin only

# Building
npm run build            # Build all
npm run build:admin     # Build admin only

# Verification
npm run lint            # Check code quality
npm run test            # Run tests

# Cleanup
npm run clean           # Clean everything
npm run clean:cache     # Clear Turbo cache only

# Advanced
turbo build --verbose   # Detailed output
turbo graph             # Show dependencies
turbo build --dry       # Preview what will run
```

---

**Welcome to the team!** 👋  
*Questions? See [INDEX.md](./INDEX.md)*
