export interface EditorFile {
  id: string;
  name: string;
  path: string;
  htmlContent: string; // HTML content for the TipTap editor
  markdownContent: string; // Markdown content for the CodeMirror editor
  frontmatter?: Record<string, any>;
  type: 'md' | 'mdx';
  lastModified: Date;
}

export interface PostMeta {
  title: string;
  slug: string;
  id: number;
  excerpt: string;
  featuredImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  categories?: Array<{
    name: string;
    slug: string;
    id: number;
  }>;
  date?: {
    formatted: string;
    timestamp: number;
  };
}

export interface EditorState {
  currentFile: EditorFile | null;
  files: EditorFile[];
  isPreviewOpen: boolean;
  isDarkMode: boolean;
  context: Record<string, any>;
  menu: any[];
}

export interface EditorActions {
  loadFile: (file: File) => Promise<void>;
  saveFile: (file: EditorFile) => Promise<void>;
  updateHtmlContent: (content: string) => void;
  updateMarkdownContent: (content: string) => void;
  syncContentFromHtml: () => void; // Convert HTML to Markdown
  syncContentFromMarkdown: () => void; // Convert Markdown to HTML
  updateMeta: (meta: Partial<PostMeta>) => void;
  togglePreview: () => void;
  toggleDarkMode: () => void;
  exportToMDX: () => string;
} 