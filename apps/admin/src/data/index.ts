import { site, menu } from './wpfasty/context';
import { about } from './pages/about';
import { home } from './pages/home';
import { blog } from './pages/blog';
// Remove old posts import
// import { posts } from './posts';

// Import adapters
import { 
  loadPostsFromContext
} from './adapters/contextAdapter';
import { 
  loadPostsFromLocalStorage,
  hasRichEditorData,
  getRichEditorPostsCount
} from './adapters/localStorageAdapter';

// Get posts from localStorage if available, otherwise from context.json
function loadPosts() {
  if (hasRichEditorData()) {
    console.log(`Loading ${getRichEditorPostsCount()} posts from rich editor localStorage`);
    return loadPostsFromLocalStorage();
  } else {
    console.log('Loading posts from context.json (fallback)');
    return loadPostsFromContext();
  }
}

export const posts = loadPosts();

// Current implementation - posts from localStorage or context.json, menu always static
export const renderContext = {
  about,
  home,
  blog,
  posts,
  site,
  menu, // Always use original static menu
} as const;

// Future implementation may include:
// - API calls
// - CMS integration  
// - Caching layer
// - Error handling

export type RenderContextKey = keyof typeof renderContext;