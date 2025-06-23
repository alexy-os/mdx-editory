import { site, menu } from './wpfasty/context';
import { about } from './pages/about';
import { home } from './pages/home';
import { blog } from './pages/blog';
// Убираем старый импорт постов
// import { posts } from './posts';

// Импортируем новый адаптер
import { 
  loadPostsFromContext
} from './adapters/contextAdapter';

// Получаем посты из context.json в том же формате
export const posts = loadPostsFromContext();

// Current implementation - теперь с данными из context.json
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