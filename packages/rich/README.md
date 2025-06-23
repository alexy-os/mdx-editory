# Rich Editor

A fully functional blog article editor based on TipTap, supporting Markdown/MDX files and integrating with WordPress data types.

## Features

- 🚀 **Modern editor** based on TipTap with rich functionality
- 📝 **Support for Markdown/MDX** with automatic frontmatter parsing
- 🌙 **Dark mode** with full support for dark: modifiers
- 📊 **Metadata management** with auto-generation of slug, excerpt, and id
- 👀 **Real-time preview** in a fullscreen modal
- 📁 **File manager** with drag & drop support
- 💾 **Export to MDX** while preserving all metadata
- 🔄 **Integration with WordPress** data types

## Installation

```bash
cd packages/rich
bun install
```

## Development

```bash
bun run dev
```

## Build

```bash
bun run build
```

## Usage

### Basic Usage

```tsx
import { RichEditorApp } from '@editory/rich';
import '@editory/rich/styles';

function App() {
  return <RichEditorApp />;
}
```

### Individual Components

```tsx
import { 
  RichEditor, 
  PostMetaEditor, 
  MarkdownPreview, 
  FileManager 
} from '@editory/rich';

function MyEditor() {
  const [content, setContent] = useState('');
  const [meta, setMeta] = useState({});

  return (
    <div>
      <RichEditor 
        content={content}
        onChange={setContent}
        isDarkMode={true}
      />
      
      <PostMetaEditor
        meta={meta}
        onChange={setMeta}
      />
    </div>
  );
}
```

## Project Structure

```
packages/rich/
├── src/
│   ├── components/          # React components
│   │   ├── RichEditor.tsx   # Main TipTap editor
│   │   ├── PostMetaEditor.tsx # Metadata editor
│   │   ├── MarkdownPreview.tsx # Preview
│   │   ├── FileManager.tsx  # File manager
│   │   └── RichEditorApp.tsx # Main application
│   ├── hooks/               # React hooks
│   │   ├── useEditor.ts     # Editor state management
│   │   ├── useFileManager.ts # File management
│   │   └── useDarkMode.ts   # Theme management
│   ├── types/               # TypeScript types
│   │   ├── editor.ts        # Editor types
│   │   ├── post.ts          # WordPress Post types
│   │   └── menu.ts          # WordPress Menu types
│   ├── utils/               # Utilities
│   │   └── index.ts         # MD parsing, slug generation, etc.
│   ├── styles/              # Styles
│   │   └── index.css        # Main styles with Tailwind
│   └── ~data/               # Data (will be created automatically)
│       ├── context.json     # Posts database
│       └── menu.json        # Sidebar menu
└── dist/                    # Build output
```

## Supported Formats

### Markdown Files (.md)
```markdown
---
title: "Article Title"
slug: "article-title"
excerpt: "Short description"
---

# Article Content

Text of the article in Markdown format.
```

### MDX Files (.mdx)
```mdx
---
title: "Interactive Article"
slug: "interactive-article"
categories: ["React", "MDX"]
---

import { CustomComponent } from './components';

# Article with Components

<CustomComponent prop="value" />
```

## Post Metadata

The editor supports the following required fields:

- **title** - Title of the article
- **slug** - URL slug (auto-generated from title)
- **id** - Unique ID (auto-generated)
- **excerpt** - Short description (auto-generated)

Additional fields:

- **featuredImage** - Main image
- **categories** - Categories
- **date** - Publication date

## API

### useEditor Hook

```tsx
const { state, actions } = useEditor();

// state contains:
// - currentFile: the current file
// - files: list of all files
// - isPreviewOpen: preview state
// - isDarkMode: theme state
// - context: posts database
// - menu: navigation menu

// actions contains:
// - loadFile: load a file
// - saveFile: save a file
// - updateContent: update content
// - updateMeta: update metadata
// - togglePreview: toggle preview
// - toggleDarkMode: toggle theme
// - exportToMDX: export to MDX
```

## Integration with WordPress

The editor is fully compatible with WordPress data types:

```typescript
// Automatic conversion to WordPress Post format
const wordpressPost: Post = {
  title: meta.title,
  content: content,
  slug: meta.slug,
  id: meta.id,
  excerpt: meta.excerpt,
  featuredImage: meta.featuredImage,
  categories: meta.categories,
  date: formatDate(new Date()),
  // ... other WordPress fields
};
```

## Customization

### Themes

The editor supports customization through CSS variables and Tailwind classes:

```css
/* Custom theme */
.my-editor-theme {
  --editor-bg: #f8f9fa;
  --editor-text: #212529;
  --editor-border: #dee2e6;
}

.dark .my-editor-theme {
  --editor-bg: #1a1d23;
  --editor-text: #e9ecef;
  --editor-border: #495057;
}
```

### TipTap Extensions

```tsx
import { Extension } from '@tiptap/core';

const CustomExtension = Extension.create({
  name: 'customExtension',
  // extension configuration
});

<RichEditor
  content={content}
  onChange={setContent}
  extensions={[CustomExtension]}
/>
```

## Development

1. Clone the repository
2. Install dependencies: `bun install`
3. Start development: `bun run dev`
4. Open http://localhost:5173

## License

MIT