---
{
  "title": "Troubleshooting",
  "generatedAt": "2025-11-04T09:53:49.423Z"
}
---

# Troubleshooting

Relevant source files

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [SUBMODULE_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)

- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

This page provides solutions for common issues encountered when using `@ui8kit/core`, including installation problems, configuration errors, styling issues, build failures, and runtime errors. Each section includes diagnostic steps, root cause analysis, and concrete solutions with code references.

For development workflow guidance, see [Basic Workflow](#5.1) and [Advanced Workflow](#5.2). For component API issues, consult [API Reference](#4). For build system configuration, see [Build System](#3.6) and [TypeScript Configuration](#3.8).

---

## Installation &amp; Setup Issues

### Missing Peer Dependencies

**Symptom**: Error messages during install or runtime: `Cannot find module 'react'` or `Module not found: Can't resolve 'react-dom'`

**Root Cause**: `@ui8kit/core` declares `react` and `react-dom` as peer dependencies, not bundled dependencies. [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58)

**Solution**:

```
npm&nbsp;install&nbsp;react&nbsp;react-dom&nbsp;@ui8kit/core
#&nbsp;Or&nbsp;with&nbsp;specific&nbsp;versions
npm&nbsp;install&nbsp;react@^19.1.0&nbsp;react-dom@^19.1.0&nbsp;@ui8kit/core

```

**Verification**:

```
npm&nbsp;list&nbsp;react&nbsp;react-dom

```

Expected output should show both packages installed without warnings.

**Sources**: [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) [README.md26-27](https://github.com/ui8kit/core/blob/2afe2195/README.md#L26-L27)

---

### Submodule Directory Empty After Clone

**Symptom**: After cloning a monorepo that uses `@ui8kit/core` as a git submodule, the `packages/@ui8kit/core/` directory exists but is empty.

**Root Cause**: Git does not automatically populate submodule directories during clone unless `--recurse-submodules` flag is used. [SUBMODULE_GUIDE.md5-9](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L5-L9)

**Solution**:

```
#&nbsp;Initialize&nbsp;and&nbsp;populate&nbsp;existing&nbsp;submodules
git&nbsp;submodule&nbsp;update&nbsp;--init&nbsp;--recursive

```

**Prevention**: Clone with submodule support:

```
git&nbsp;clone&nbsp;--recurse-submodules&nbsp;&lt;repository-url&gt;

```

**Sources**: [SUBMODULE_GUIDE.md5-9](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L5-L9) [SUBMODULE_GUIDE.md139-149](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md#L139-L149)

---

### Package Export Not Found

**Symptom**: Import errors like `Package subpath './registry.json' is not defined by "exports"`

**Root Cause**: The package only exports the main entry point. Registry access requires direct file path import. [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37)

**Solution**:

```
//&nbsp;❌&nbsp;Incorrect&nbsp;-&nbsp;not&nbsp;in&nbsp;exports&nbsp;map
import&nbsp;registry&nbsp;from&nbsp;'@ui8kit/core/registry.json';

//&nbsp;✅&nbsp;Correct&nbsp;-&nbsp;access&nbsp;via&nbsp;source&nbsp;path&nbsp;if&nbsp;available
import&nbsp;registry&nbsp;from&nbsp;'./node_modules/@ui8kit/core/src/registry.json';

//&nbsp;✅&nbsp;Or&nbsp;use&nbsp;NPM&nbsp;package&nbsp;installation
npm&nbsp;install&nbsp;@ui8kit/core
import&nbsp;{&nbsp;Button&nbsp;}&nbsp;from&nbsp;'@ui8kit/core';

```

**Sources**: [package.json33-37](https://github.com/ui8kit/core/blob/2afe2195/package.json#L33-L37) [README.md270-276](https://github.com/ui8kit/core/blob/2afe2195/README.md#L270-L276)

---

## TypeScript Configuration Problems

### Cannot Find Module or Type Declarations

**Symptom**: TypeScript errors: `Cannot find module '@ui8kit/core'` or `Could not find a declaration file for module`

**Diagnostic Flow**: