import { EditorFile } from '../types/editor';
import { Post } from '../types/post';
import { Menu } from '../types/menu';
import { formatDate, stringifyMarkdownFile } from './index';

// Create ~data folder if it doesn't exist
export function ensureDataDirectory(): Promise<void> {
  return new Promise((resolve) => {
    // In the browser we can't create real folders
    // This is a placeholder for future integration with the file system
    // console.log('Ensuring ~data directory exists...');
    resolve();
  });
}

// Convert EditorFile to WordPress Post format
export function convertToWordPressPost(file: EditorFile): Post {
  const meta = file.frontmatter || {};
  const date = formatDate(file.lastModified);
  
  // Use HTML content for export to JSON, not Markdown
  const htmlContent = file.htmlContent; // This is already HTML from TipTap
  
  return {
    title: meta.title || file.name,
    content: htmlContent, // Save HTML content
    slug: meta.slug || file.name.replace(/\.(md|mdx)$/, ''),
    url: `/${meta.slug || file.name.replace(/\.(md|mdx)$/, '')}`,
    id: meta.id || parseInt(file.id),
    excerpt: meta.excerpt || htmlContent.replace(/<[^>]*>/g, '').substring(0, 160) + '...', // Remove HTML tags for excerpt
    featuredImage: meta.featuredImage || {
      url: '',
      width: 0,
      height: 0,
      alt: ''
    },
    thumbnail: meta.thumbnail || meta.featuredImage || {
      url: '',
      width: 0,
      height: 0,
      alt: ''
    },
    meta: {
      _edit_last: '1',
      _edit_lock: `${Date.now()}:1`
    },
    categories: (meta.categories || []).map((cat: any, index: number) => ({
      name: typeof cat === 'string' ? cat : cat.name,
      url: `/category/${typeof cat === 'string' ? cat.toLowerCase().replace(/\s+/g, '-') : cat.slug}`,
      id: typeof cat === 'object' ? cat.id : Date.now() + index,
      slug: typeof cat === 'string' ? cat.toLowerCase().replace(/\s+/g, '-') : cat.slug,
      description: typeof cat === 'object' ? cat.description || '' : '',
      count: 1
    })),
    date: {
      ...date,
      modified: date.formatted,
      modified_display: date.display
    }
  };
}

// Generate context.json
export function generateContext(files: EditorFile[]): Record<string, any> {
  const context: Record<string, any> = {};
  
  files.forEach(file => {
    const post = convertToWordPressPost(file);
    context[file.id] = {
      ...post,
      filePath: file.path,
      fileType: file.type,
      lastModified: file.lastModified.toISOString()
    };
  });
  
  return context;
}

// Generate menu.json
export function generateMenu(files: EditorFile[]): Menu {
  const items = files.map((file, index) => {
    const meta = file.frontmatter || {};
    return {
      title: meta.title || file.name,
      url: `/${meta.slug || file.name.replace(/\.(md|mdx)$/, '')}`,
      id: meta.id || parseInt(file.id),
      order: index,
      parent: null,
      classes: [file.type === 'mdx' ? 'mdx-post' : 'md-post'],
      current: false
    };
  });

  return {
    primary: {
      items
    }
  };
}

// Save context.json (in the real application this will be an API call)
export async function saveContext(context: Record<string, any>): Promise<void> {
  try {
    await ensureDataDirectory();
    
    // In the browser we can only log or use localStorage
    const contextJson = JSON.stringify(context, null, 2);
    localStorage.setItem('rich-editor-context', contextJson);
    
    // console.log('Context saved to localStorage:', contextJson);
    
    // Here in the future there will be real file saving
    // await fs.writeFile('src/~data/context.json', contextJson);
    
  } catch (error) {
    console.error('Failed to save context:', error);
    throw error;
  }
}

// Save menu.json
export async function saveMenu(menu: Menu): Promise<void> {
  try {
    await ensureDataDirectory();
    
    const menuJson = JSON.stringify(menu, null, 2);
    localStorage.setItem('rich-editor-menu', menuJson);
    
    // console.log('Menu saved to localStorage:', menuJson);
    
    // Here in the future there will be real file saving
    // await fs.writeFile('src/~data/menu.json', menuJson);
    
  } catch (error) {
    console.error('Failed to save menu:', error);
    throw error;
  }
}

// Load context.json
export async function loadContext(): Promise<Record<string, any>> {
  try {
    const contextJson = localStorage.getItem('rich-editor-context');
    if (contextJson) {
      return JSON.parse(contextJson);
    }
    return {};
  } catch (error) {
    console.error('Failed to load context:', error);
    return {};
  }
}

// Load menu.json
export async function loadMenu(): Promise<Menu> {
  try {
    const menuJson = localStorage.getItem('rich-editor-menu');
    if (menuJson) {
      return JSON.parse(menuJson);
    }
    return { primary: { items: [] } };
  } catch (error) {
    console.error('Failed to load menu:', error);
    return { primary: { items: [] } };
  }
}

// Save individual MDX file
export async function saveMDXFile(file: EditorFile): Promise<void> {
  try {
    const content = stringifyMarkdownFile(file.frontmatter || {}, file.markdownContent);
    
    // In the browser we can only download the file
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.frontmatter?.slug || file.name.replace(/\.(md|mdx)$/, '')}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log(`File ${file.name} saved as MDX`);
    
    // Here in the future there will be real file saving
    // await fs.writeFile(`src/data/${file.frontmatter?.slug || file.name}`, content);
    
  } catch (error) {
    console.error('Failed to save MDX file:', error);
    throw error;
  }
}

// Export context.json from localStorage
export async function exportContextFile(): Promise<void> {
  try {
    const contextJson = localStorage.getItem('rich-editor-context');
    if (!contextJson) {
      throw new Error('No data to export. First load and edit the files.');
    }
    
    // Check if the data is valid
    const context = JSON.parse(contextJson);
    const formattedJson = JSON.stringify(context, null, 2);
    
    // Download the file
    const blob = new Blob([formattedJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rich-editor-context.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('Context.json exported successfully');
    
  } catch (error) {
    console.error('Failed to export context.json:', error);
    throw error;
  }
}

// Import context.json to localStorage with clearing existing data
export async function importContextFile(): Promise<Record<string, any>> {
  return new Promise((resolve, reject) => {
    try {
      // Create file input element
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.style.display = 'none';
      
      input.onchange = async (event) => {
        try {
          const file = (event.target as HTMLInputElement).files?.[0];
          if (!file) {
            reject(new Error('No file selected'));
            return;
          }
          
          // Read file content
          const content = await file.text();
          
          // Parse and validate JSON
          let context: Record<string, any>;
          try {
            context = JSON.parse(content);
          } catch (parseError) {
            reject(new Error('Invalid JSON file format'));
            return;
          }
          
          // Validate that it's a context file structure
          if (typeof context !== 'object' || context === null) {
            reject(new Error('Invalid context file structure'));
            return;
          }
          
          // Clear existing localStorage data
          localStorage.removeItem('rich-editor-context');
          localStorage.removeItem('rich-editor-menu');
          
          // Save new context to localStorage
          const contextJson = JSON.stringify(context, null, 2);
          localStorage.setItem('rich-editor-context', contextJson);
          
          console.log('Context imported and localStorage cleared successfully');
          
          // Clean up
          document.body.removeChild(input);
          
          resolve(context);
          
        } catch (error) {
          document.body.removeChild(input);
          reject(error);
        }
      };
      
      input.oncancel = () => {
        document.body.removeChild(input);
        reject(new Error('Import cancelled'));
      };
      
      // Add to DOM and trigger click
      document.body.appendChild(input);
      input.click();
      
    } catch (error) {
      console.error('Failed to import context.json:', error);
      reject(error);
    }
  });
}

// Convert imported context back to EditorFile format
export function convertContextToEditorFiles(context: Record<string, any>): EditorFile[] {
  const files: EditorFile[] = [];
  
  Object.entries(context).forEach(([id, data]: [string, any]) => {
    try {
      // Extract metadata from the imported post data
      const frontmatter = {
        title: data.title || '',
        slug: data.slug || '',
        id: data.id || parseInt(id),
        excerpt: data.excerpt || '',
        featuredImage: data.featuredImage,
        categories: data.categories || []
      };
      
      // The data.content is HTML from TipTap editor
      // We need to convert it to Markdown for the raw editor
      const htmlContent = data.content || '';
      
      // Simple HTML to Markdown conversion for basic content
      let markdownContent = htmlContent
        .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
        .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
        .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
        .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
        .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
        .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
        .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<ul[^>]*>(.*?)<\/ul>/gi, '$1\n')
        .replace(/<ol[^>]*>(.*?)<\/ol>/gi, '$1\n')
        .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
        .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
        .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
        .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
        .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
        .replace(/<[^>]+>/g, '') // Remove any remaining HTML tags
        .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines
        .trim();
      
      // Create EditorFile from imported data
      const editorFile: EditorFile = {
        id: id,
        name: data.filePath || `${data.slug || id}.mdx`,
        path: data.filePath || `${data.slug || id}.mdx`,
        htmlContent, // Keep original HTML for TipTap editor
        markdownContent, // Converted Markdown for CodeMirror editor
        frontmatter,
        type: (data.fileType as 'md' | 'mdx') || 'mdx',
        lastModified: data.lastModified ? new Date(data.lastModified) : new Date()
      };
      
      files.push(editorFile);
    } catch (error) {
      console.warn(`Failed to convert context entry ${id}:`, error);
    }
  });
  
  return files;
} 