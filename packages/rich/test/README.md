# Rich Editor Library Test

This directory contains a test application to verify the assembled Rich Editor library.

## How to Use

### 1. First, build the library
```bash
cd packages/rich
npm run build
```

### 2. Run the test in dev mode
```bash
npm run dev:test
```
It will open on port 5174: http://localhost:5174

### 3. Or build and preview the test
```bash
npm run build:test
npm run preview:test
```

## What is Tested

- ✅ Import from the assembled library `dist/rich-editor.es.js`
- ✅ Correctness of component exports
- ✅ Style functionality
- ✅ Functionality of the library as an external user

## Structure

- `index.html` - HTML page for testing
- `test.tsx` - React component using the library
- `vite.config.ts` - Vite configuration for testing
- `types.d.ts` - Types for importing from dist/

## Workflow

1. Modify the library code → `npm run build`
2. Test the changes → `npm run dev:test`
3. Check the build → `npm run build:test && npm run preview:test` 