import { site, menu } from './wpfasty/context';
import { about } from './pages/about';
import { home } from './pages/home';
import { blog } from './pages/blog';
// Remove old posts import
// import { posts } from './posts';

// Import new adapter
import { 
  loadPostsFromContext
} from './adapters/contextAdapter';

// Get posts from context.json in the same format
export const posts = loadPostsFromContext();

// Current implementation - now with data from context.json
export const renderContext = {
  about,
  home,
  blog,
  posts,
  site,
  menu,
} as const;

// Future implementation may include:
// - API calls
// - CMS integration  
// - Caching layer
// - Error handling

export type RenderContextKey = keyof typeof renderContext;