import type { WPFastyContext } from '../wpfasty/types';

type PostsCollection = {
  posts: WPFastyContext['archive']['posts'][];
};

interface RichEditorPost {
  title: string;
  content: string;
  slug: string;
  url: string;
  id: number;
  excerpt: string;
  featuredImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  thumbnail?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  meta: {
    _edit_last: string;
    _edit_lock: string;
  };
  categories: Array<{
    name: string;
    url: string;
    id: number;
    slug: string;
    description: string;
    count: number;
  }>;
  date: {
    formatted: string;
    display: string;
    timestamp: number;
    year: string;
    month: string;
    day: string;
    modified: string;
    modified_display: string;
  };
  filePath: string;
  fileType: string;
  lastModified: string;
}

interface RichEditorContext {
  [key: string]: RichEditorPost;
}

interface RichEditorMenu {
  primary: {
    items: Array<{
      title: string;
      url: string;
      id: number;
      order: number;
      parent: null;
      classes: string[];
      current: boolean;
    }>;
  };
}

/**
 * Loads posts from rich editor localStorage
 */
export function loadPostsFromLocalStorage(): PostsCollection {
  try {
    const contextJson = localStorage.getItem('rich-editor-context');
    if (!contextJson) {
      console.log('No rich editor data found in localStorage');
      return { posts: [] };
    }

    const contextData = JSON.parse(contextJson) as RichEditorContext;
    
    const adaptedPosts = Object.values(contextData)
      .map(post => ({
        title: post.title,
        content: post.content,
        slug: post.slug,
        url: post.url,
        id: post.id,
        excerpt: post.excerpt,
        featuredImage: post.featuredImage || {
          url: '',
          width: 800,
          height: 600,
          alt: post.title
        },
        thumbnail: post.thumbnail || post.featuredImage || {
          url: '',
          width: 300,
          height: 200,
          alt: post.title
        },
        meta: post.meta,
        categories: post.categories,
        date: post.date
      }))
      .sort((a, b) => {
        // Sort by timestamp (newest first)
        return b.date.timestamp - a.date.timestamp;
      });

    console.log(`Loaded ${adaptedPosts.length} posts from rich editor localStorage`);
    return { posts: adaptedPosts };
  } catch (error) {
    console.error('Failed to load posts from localStorage:', error);
    return { posts: [] };
  }
}

/**
 * Loads menu from rich editor localStorage
 */
export function loadMenuFromLocalStorage(): RichEditorMenu {
  try {
    const menuJson = localStorage.getItem('rich-editor-menu');
    if (!menuJson) {
      console.log('No rich editor menu found in localStorage');
      return { primary: { items: [] } };
    }

    const menuData = JSON.parse(menuJson) as RichEditorMenu;
    console.log(`Loaded menu with ${menuData.primary.items.length} items from rich editor localStorage`);
    return menuData;
  } catch (error) {
    console.error('Failed to load menu from localStorage:', error);
    return { primary: { items: [] } };
  }
}

/**
 * Gets a specific post by ID from localStorage
 */
export function getPostByIdFromLocalStorage(id: number): WPFastyContext['archive']['posts'] | undefined {
  const posts = loadPostsFromLocalStorage();
  return posts.posts.find(post => post.id === id);
}

/**
 * Gets a specific post by slug from localStorage
 */
export function getPostBySlugFromLocalStorage(slug: string): WPFastyContext['archive']['posts'] | undefined {
  const posts = loadPostsFromLocalStorage();
  return posts.posts.find(post => post.slug === slug);
}

/**
 * Checks if rich editor has data in localStorage
 */
export function hasRichEditorData(): boolean {
  const contextJson = localStorage.getItem('rich-editor-context');
  if (!contextJson) return false;
  
  try {
    const contextData = JSON.parse(contextJson) as RichEditorContext;
    return Object.keys(contextData).length > 1; // More than one file
  } catch (error) {
    return false;
  }
}

/**
 * Gets posts count from localStorage
 */
export function getRichEditorPostsCount(): number {
  try {
    const contextJson = localStorage.getItem('rich-editor-context');
    if (!contextJson) return 0;
    
    const contextData = JSON.parse(contextJson) as RichEditorContext;
    return Object.keys(contextData).length;
  } catch (error) {
    return 0;
  }
} 