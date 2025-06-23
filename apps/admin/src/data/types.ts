export interface PageData {
  title: string;
  excerpt: string;
  content: string;
}

export interface Feature {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
    alt: string;
    caption: string;
  };
}

export interface AboutData {
  page: PageData;
  features: Feature[];
}

// For other pages
export interface HomeData {
  page: PageData;
}

export interface ArchiveData {
  page: PageData;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
}

// Add new types for context.json
export interface ContextPost {
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

export interface ContextData {
  [key: string]: ContextPost;
}

// Adapted type for compatibility with existing code
export interface AdaptedBlogPost extends BlogPost {
  slug: string;
  url: string;
  featuredImage?: {
    url: string;
    alt: string;
    caption: string;
  };
  categories: string[];
  date: {
    formatted: string;
    display: string;
  };
}