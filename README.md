# EditorY

A smart, modern Markdown editor built for content creators and developers. EditorY transforms your Markdown files into structured JSON context for blogs, documentation, and web applications with advanced metadata management and real-time preview capabilities.

## ✨ Features

### 📝 **Smart Markdown Editing**
- **Dual-Mode Editor**: Switch between visual rich-text editor and raw Markdown mode
- **Real-time Preview**: Live preview with syntax highlighting and proper formatting
- **TipTap Integration**: Powerful rich-text editing with extensive formatting options
- **Syntax Highlighting**: Code blocks with language-specific highlighting using Lowlight

### 🎯 **Advanced Content Management**
- **File Manager**: Drag-and-drop support for `.md` and `.mdx` files
- **Metadata Editor**: Structured frontmatter editing with form validation
- **Auto-save**: Automatic context and menu JSON generation
- **Export System**: Export structured content as JSON context for blogs

### 🎨 **Professional Interface**
- **Split-Screen Layout**: Editor, metadata, and preview in customizable panels
- **Responsive Design**: Optimized for desktop editing workflows
- **Dark/Light Mode**: Automatic theme switching with system preference detection
- **Custom Icons**: Beautiful SVG icons with base64 encoding for fast loading

### 🔧 **Developer-Friendly**
- **TypeScript**: Full type safety with comprehensive interfaces
- **Monorepo Structure**: Clean separation of concerns with workspace packages
- **Modern Stack**: Built with React 19, Vite, and Tailwind CSS 4
- **Extensible**: Plugin-based architecture for custom functionality

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/alexy-os/mdx-editory.git
cd editory
```

2. **Install dependencies**
```bash
bun install
```

3. **Start development server**
```bash
# From root directory
bun admin:dev

# Or navigate to admin app
cd apps/admin
bun dev
```

4. **Open in browser**
Navigate to `http://localhost:5173` to access EditorY

### Production Build

```bash
# Build for production
bun admin:build

# Preview production build
bun admin:preview
```

## 📁 Project Structure

```
editory/
├── apps/
│   ├── admin/          # Main EditorY application
│   └── blog/           # Example blog implementation
├── packages/
│   ├── rich/           # Rich editor components
│   └── ui/             # UI component library
└── scripts/            # Build and utility scripts
```

## 🎯 Core Components

### **EditorY Layout** (`EditoryLayout.tsx`)
The main application layout featuring:
- Resizable panel system with split-screen editing
- Integrated file management sidebar
- Responsive navigation with mobile optimization
- Context-aware toolbar with export capabilities

### **File Manager** (`FileManager.tsx`)
Advanced file handling system:
- Drag-and-drop file upload
- Multi-file project management
- Auto-detection of `.md` and `.mdx` formats
- Real-time file statistics and metadata display

### **Smart Dropdown** (`Dropdown.tsx`)
Contextual action menus with:
- Export to JSON context
- View mode switching (Visual/Markdown)
- File operations (Save, Preview, Update)
- Keyboard shortcuts integration

## 🔧 Configuration

### Environment Variables
Create `.env` file in `apps/admin/`:
```env
VITE_APP_TITLE=EditorY
VITE_API_URL=your-api-endpoint
```

### Customization
- **Themes**: Modify `tailwind.config.js` for custom styling
- **Extensions**: Add TipTap extensions in `packages/rich/src/components/RichEditor.tsx`
- **Icons**: Update base64 icons in `packages/rich/src/styles/latty.css`

## 📊 Content Structure

EditorY generates structured JSON context from your Markdown files:

```json
{
  "id": "unique-post-id",
  "title": "Your Post Title",
  "slug": "your-post-slug",
  "excerpt": "Auto-generated or custom excerpt",
  "content": "<h1>Rendered HTML content</h1>",
  "frontmatter": {
    "categories": ["web-development", "markdown"],
    "featuredImage": "/images/featured.jpg",
    "publishedAt": "2024-01-01T00:00:00Z"
  }
}
```

## 🛠️ Development

### Available Scripts
```bash
# Development
bun admin:dev      # Start admin development server
bun rich:dev       # Start rich editor development
bun blog:dev       # Start example blog

# Production
bun admin:build    # Build admin application
bun admin:preview  # Preview production build

# Utilities
bun generate       # Generate public assets
bun optimize:images # Optimize image assets
```

### Package Scripts
Each workspace package has its own scripts accessible via:
```bash
cd apps/admin && bun dev
cd packages/rich && bun build
```

## 🎨 Theming

EditorY uses Tailwind CSS 4 with custom CSS variables for theming:
- Automatic dark/light mode detection
- Custom color palette with semantic naming
- Responsive typography scaling
- Icon system with SVG optimization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with conventional commits: `git commit -m 'feat: add amazing feature'`
5. Push to your fork and submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TipTap](https://tiptap.dev/) - Extensible rich-text editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool

---

**Built with ❤️ by [buildy-ui](https://github.com/buildy-ui)**

*EditorY - Transform your Markdown into structured content for the modern web.*