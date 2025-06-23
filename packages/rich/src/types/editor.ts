export interface EditorFile {
  id: string;
  name: string;
  path: string;
  content: string; // HTML content for the TipTap editor
  originalMarkdown?: string; // Original Markdown content
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
  updateContent: (content: string) => void;
  updateMeta: (meta: Partial<PostMeta>) => void;
  togglePreview: () => void;
  toggleDarkMode: () => void;
  exportToMDX: () => string;
} 