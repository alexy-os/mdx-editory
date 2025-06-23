import type { WPFastyContext } from '../wpfasty/types';
import contextJson from '../posts/context.json';

type PostsCollection = {
  posts: WPFastyContext['archive']['posts'][];
};

interface ContextPost {
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
  } | string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  } | string;
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

interface ContextData {
  [key: string]: ContextPost;
}

/**
 * Преобразует ContextPost в формат WPFastyContext['archive']['posts']
 */
function adaptContextPostToWPFormat(contextPost: ContextPost): WPFastyContext['archive']['posts'] {
  // Обрабатываем featuredImage
  let featuredImage: WPFastyContext['archive']['posts']['featuredImage'];
  if (contextPost.featuredImage && typeof contextPost.featuredImage === 'object') {
    featuredImage = contextPost.featuredImage;
  } else {
    // Дефолтные значения если featuredImage отсутствует или это строка
    featuredImage = {
      url: typeof contextPost.featuredImage === 'string' && contextPost.featuredImage !== 'undefined' 
        ? contextPost.featuredImage 
        : '',
      width: 800,
      height: 600,
      alt: contextPost.title
    };
  }

  // Обрабатываем thumbnail аналогично
  let thumbnail: WPFastyContext['archive']['posts']['thumbnail'];
  if (contextPost.thumbnail && typeof contextPost.thumbnail === 'object') {
    thumbnail = contextPost.thumbnail;
  } else {
    thumbnail = {
      url: typeof contextPost.thumbnail === 'string' && contextPost.thumbnail !== 'undefined' 
        ? contextPost.thumbnail 
        : featuredImage.url,
      width: 300,
      height: 200,
      alt: contextPost.title
    };
  }

  return {
    title: contextPost.title,
    content: contextPost.content,
    slug: contextPost.slug,
    url: contextPost.url,
    id: contextPost.id,
    excerpt: contextPost.excerpt,
    featuredImage,
    thumbnail,
    meta: contextPost.meta,
    categories: contextPost.categories,
    date: contextPost.date
  };
}

/**
 * Загружает посты из context.json и возвращает в формате PostsCollection
 */
export function loadPostsFromContext(): PostsCollection {
  const contextData = contextJson as ContextData;
  
  const adaptedPosts = Object.values(contextData)
    .map(adaptContextPostToWPFormat)
    .sort((a, b) => {
      // Сортируем по timestamp (новые сначала)
      return b.date.timestamp - a.date.timestamp;
    });

  return {
    posts: adaptedPosts
  };
}

/**
 * Получает конкретный пост по ID
 */
export function getPostById(id: number): WPFastyContext['archive']['posts'] | undefined {
  const posts = loadPostsFromContext();
  return posts.posts.find(post => post.id === id);
}

/**
 * Получает конкретный пост по slug
 */
export function getPostBySlug(slug: string): WPFastyContext['archive']['posts'] | undefined {
  const posts = loadPostsFromContext();
  return posts.posts.find(post => post.slug === slug);
}

/**
 * Получает посты с пагинацией
 */
export function getPostsPaginated(page: number = 1, limit: number = 10): {
  posts: WPFastyContext['archive']['posts'][];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
} {
  const allPosts = loadPostsFromContext();
  const total = allPosts.posts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allPosts.posts.slice(startIndex, endIndex);

  return {
    posts,
    total,
    totalPages,
    currentPage: page,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}

/**
 * Получает посты по категории
 */
export function getPostsByCategory(category: string): WPFastyContext['archive']['posts'][] {
  const posts = loadPostsFromContext();
  return posts.posts.filter(post => 
    post.categories.some(cat => 
      cat.name.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Получает все уникальные категории
 */
export function getAllCategories(): string[] {
  const posts = loadPostsFromContext();
  const categories = new Set<string>();
  
  posts.posts.forEach(post => {
    post.categories.forEach(category => {
      categories.add(category.name);
    });
  });

  return Array.from(categories).sort();
} 