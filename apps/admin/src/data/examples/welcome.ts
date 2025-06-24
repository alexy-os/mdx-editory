export const welcomeExample = {
  name: 'welcome-to-editory.md',
  title: 'Welcome to EditorY',
  content: `---
title: "Welcome to EditorY"
slug: "welcome-to-editory"
excerpt: "The modern Markdown editor that transforms your writing workflow. Create, edit, and publish beautiful content with semantic HTML5 and real-time preview."
categories: ["Getting Started", "Documentation"]
featuredImage:
  url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
  alt: "Modern workspace with laptop and writing tools"
  width: 800
  height: 600
---

# Welcome to EditorY

The modern Markdown editor that transforms your writing workflow into a seamless, professional experience.

## 🚀 Get Started Quickly

EditorY combines the simplicity of Markdown with the power of modern web technologies:

- **Real-time Preview** - See your content as you write
- **Semantic HTML5** - Clean, accessible markup generation  
- **TypeScript-First** - Type-safe development experience
- **Dark Mode Support** - Comfortable writing in any lighting

## ✨ Key Features

### Visual & Markdown Modes
Switch between visual editing and raw Markdown with a single click. Perfect for both writers and developers.

### Metadata Management
Built-in frontmatter editor for:
- SEO optimization
- Category management
- Featured images
- Custom fields

### Export Options
- **MDX Files** - Ready for modern React frameworks
- **Context JSON** - Structured data for APIs
- **Semantic HTML** - Clean, standards-compliant markup

## 📝 Writing Experience

Start typing and watch your content come to life. EditorY handles the technical details while you focus on creating great content.

\`\`\`markdown
# Your ideas deserve beautiful presentation
*Write naturally, publish professionally*
\`\`\`

## 🎯 Perfect For

- **Bloggers** - Professional content creation
- **Developers** - Documentation and technical writing  
- **Content Teams** - Collaborative writing workflows
- **Publishers** - SEO-optimized content management

---

**Ready to start?** Load one of the example files or create your own content. Happy writing! ✍️
`
};

export const quickStartExamples = [
  welcomeExample,
  {
    name: 'getting-started-guide.md',
    title: 'Getting Started Guide',
    content: `---
title: "Getting Started with EditorY"
slug: "getting-started-guide"
excerpt: "A comprehensive guide to get you up and running with EditorY's powerful features in minutes."
categories: ["Tutorial", "Getting Started"]
featuredImage:
  url: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop"
  alt: "Getting started tutorial illustration"
  width: 800
  height: 600
---

# Getting Started with EditorY

This guide will help you master EditorY's features step by step.

## Step 1: Load Your First File

Choose from our example templates or upload your own Markdown files:

1. Click on any example card to load it
2. Or drag & drop your .md/.mdx files
3. Use the Upload button in the sidebar

## Step 2: Switch Between Modes

- **Visual Mode** 📝 - Rich text editing experience
- **Markdown Mode** 🔧 - Raw Markdown editing

Toggle with the mode switcher in the toolbar.

## Step 3: Edit Metadata

Use the metadata panel to configure:
- Title and slug
- SEO excerpt
- Categories and tags
- Featured images

## Step 4: Export Your Work

- **Save MDX** - Download as .mdx file
- **Export Context** - Generate JSON data
- **Update** - Save to localStorage

Start creating amazing content! 🎉
`
  },
  {
    name: 'markdown-cheatsheet.md',
    title: 'Markdown Cheatsheet',
    content: `---
title: "Markdown Cheatsheet"
slug: "markdown-cheatsheet"
excerpt: "Quick reference for Markdown syntax with examples for headers, lists, links, code blocks, and more."
categories: ["Reference", "Markdown"]
featuredImage:
  url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
  alt: "Markdown syntax reference guide"
  width: 800
  height: 600
---

# Markdown Cheatsheet

Quick reference for all essential Markdown syntax.

## Headers

\`\`\`markdown
# H1 Header
## H2 Header  
### H3 Header
\`\`\`

## Text Formatting

- **Bold text** - \`**bold**\`
- *Italic text* - \`*italic*\`
- \`Inline code\` - \`\\\`code\\\`\`
- ~~Strikethrough~~ - \`~~text~~\`

## Lists

### Unordered
- Item 1
- Item 2
  - Nested item
  - Another nested

### Ordered
1. First item
2. Second item
3. Third item

## Links & Images

- [Link text](https://example.com)
- ![Alt text](image-url.jpg)

## Code Blocks

\`\`\`javascript
function hello() {
  console.log("Hello, EditorY!");
}
\`\`\`

## Tables

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |

## Blockquotes

> This is a blockquote
> 
> Multiple lines supported

## Advanced Features

### Task Lists
- [x] Completed task
- [ ] Incomplete task

### Footnotes
Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

### Horizontal Rules
---

Happy writing! 📝
`
  }
];
