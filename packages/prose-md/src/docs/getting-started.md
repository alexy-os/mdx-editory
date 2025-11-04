---
{
  "title": "Getting Started",
  "generatedAt": "2025-11-04T09:53:49.223Z"
}
---

# Getting Started

Relevant source files

- [.devin/wiki.json](https://github.com/ui8kit/core/blob/2afe2195/.devin/wiki.json)

- [README.md](https://github.com/ui8kit/core/blob/2afe2195/README.md)

- [SUBMODULE_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)

- [package.json](https://github.com/ui8kit/core/blob/2afe2195/package.json)

This document covers the installation, configuration, and initial setup of `@ui8kit/core` in your React application. It provides step-by-step instructions for integrating the library into different project types (Next.js, Vite, Create React App) and demonstrates basic component usage patterns.

For detailed architectural information, see [Architecture](#3). For complete component API documentation, see [API Reference](#4). For advanced integration patterns including monorepo setup, refer to [SUBMODULE_GUIDE.md](https://github.com/ui8kit/core/blob/2afe2195/SUBMODULE_GUIDE.md)

---

## Prerequisites

Before installing `@ui8kit/core`, ensure your development environment meets these requirements:

RequirementVersionPurpose**Node.js**18.0.0+JavaScript runtime**React**18.0.0 or 19.0.0+Peer dependency**React DOM**18.0.0 or 19.0.0+Peer dependency**Tailwind CSS**3.4.0+Utility-first styling**TypeScript**5.0.0+ (optional)Type safety
**Sources:** [package.json55-58](https://github.com/ui8kit/core/blob/2afe2195/package.json#L55-L58) [package.json59-66](https://github.com/ui8kit/core/blob/2afe2195/package.json#L59-L66)

---

## Installation Methods

The library supports multiple installation approaches to accommodate different project architectures and optimization requirements.

### Installation Flow