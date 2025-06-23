import { EditorFile, PostMeta } from '../types/editor';
import { Post } from '../types/post';
import { Menu } from '../types/menu';
import { formatDate } from './index';

// Создаем папку ~data если она не существует
export function ensureDataDirectory(): Promise<void> {
  return new Promise((resolve) => {
    // В браузере мы не можем создавать реальные папки
    // Это заглушка для будущей интеграции с файловой системой
    console.log('Ensuring ~data directory exists...');
    resolve();
  });
}

// Преобразование EditorFile в WordPress Post формат
export function convertToWordPressPost(file: EditorFile): Post {
  const meta = file.frontmatter || {};
  const date = formatDate(file.lastModified);
  
  // Используем HTML контент для экспорта в JSON, а не Markdown
  const htmlContent = file.content; // Это уже HTML из TipTap
  
  return {
    title: meta.title || file.name,
    content: htmlContent, // Сохраняем HTML контент
    slug: meta.slug || file.name.replace(/\.(md|mdx)$/, ''),
    url: `/${meta.slug || file.name.replace(/\.(md|mdx)$/, '')}`,
    id: meta.id || parseInt(file.id),
    excerpt: meta.excerpt || htmlContent.replace(/<[^>]*>/g, '').substring(0, 160) + '...', // Убираем HTML теги для excerpt
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

// Генерация context.json
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

// Генерация menu.json
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

// Сохранение context.json (в реальном приложении это будет API вызов)
export async function saveContext(context: Record<string, any>): Promise<void> {
  try {
    await ensureDataDirectory();
    
    // В браузере мы можем только логировать или использовать localStorage
    const contextJson = JSON.stringify(context, null, 2);
    localStorage.setItem('rich-editor-context', contextJson);
    
    console.log('Context saved to localStorage:', contextJson);
    
    // Здесь в будущем будет реальное сохранение файла
    // await fs.writeFile('src/~data/context.json', contextJson);
    
  } catch (error) {
    console.error('Failed to save context:', error);
    throw error;
  }
}

// Сохранение menu.json
export async function saveMenu(menu: Menu): Promise<void> {
  try {
    await ensureDataDirectory();
    
    const menuJson = JSON.stringify(menu, null, 2);
    localStorage.setItem('rich-editor-menu', menuJson);
    
    console.log('Menu saved to localStorage:', menuJson);
    
    // Здесь в будущем будет реальное сохранение файла
    // await fs.writeFile('src/~data/menu.json', menuJson);
    
  } catch (error) {
    console.error('Failed to save menu:', error);
    throw error;
  }
}

// Загрузка context.json
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

// Загрузка menu.json
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

// Сохранение отдельного MDX файла
export async function saveMDXFile(file: EditorFile): Promise<void> {
  try {
    const { stringifyMarkdownFile } = await import('./index');
    const content = stringifyMarkdownFile(file.frontmatter || {}, file.content);
    
    // В браузере мы можем только скачать файл
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
    
    // Здесь в будущем будет реальное сохранение файла
    // await fs.writeFile(`src/data/${file.frontmatter?.slug || file.name}`, content);
    
  } catch (error) {
    console.error('Failed to save MDX file:', error);
    throw error;
  }
}

// Экспорт context.json из localStorage
export async function exportContextFile(): Promise<void> {
  try {
    const contextJson = localStorage.getItem('rich-editor-context');
    if (!contextJson) {
      throw new Error('Нет данных для экспорта. Сначала загрузите и отредактируйте файлы.');
    }
    
    // Проверяем, что данные валидные
    const context = JSON.parse(contextJson);
    const formattedJson = JSON.stringify(context, null, 2);
    
    // Скачиваем файл
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