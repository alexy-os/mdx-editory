import { MainLayout } from '@/app/layouts/MainLayout';
import { renderContext } from '@/data';
import { getPostBySlugFromLocalStorage, hasRichEditorData } from '@/data/adapters/localStorageAdapter';
import { Article, ArticleHeader, ArticleContent, ArticleFigure, ArticleImage, ArticleFigcaption, ArticleMeta, ArticleTime, ArticleFooter, ArticleTags, ArticleTag } from '@ui8kit/components/article';
import { H1, P } from '@ui8kit/components/markup';
import { useParams } from 'react-router-dom';

export const { posts } = renderContext.posts;

export const NotFound = {
  title: 'Post Not Found',
  content: 'The post you\'re looking for doesn\'t exist.',
  link: '/',
  linkText: 'Return to homepage'
} as const;

interface PostProps {
  slug?: string; // For static generation
}

export function Post({ slug: propSlug }: PostProps = {}) {
  const params = useParams<{ slug: string }>();
  // Use the slug from props (for static generation) or from useParams (for SPA)
  const slug = propSlug || params.slug;
  
  // Try to get post from localStorage first, then fallback to static posts
  const post = hasRichEditorData() && slug 
    ? getPostBySlugFromLocalStorage(slug) || posts.find(p => p.slug === slug)
    : posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <MainLayout title={NotFound.title} description={NotFound.content}>
        <Article>
          <ArticleHeader>
            <H1>{NotFound.title}</H1>
          </ArticleHeader>
          <ArticleContent>
            <P>{NotFound.content}</P>
            <a href={NotFound.link}>{NotFound.linkText}</a>
          </ArticleContent>
        </Article>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={post.title} description={post.excerpt}>
      <article>

        {post.featuredImage && (
          <ArticleFigure>
            <ArticleImage
              src={post.featuredImage.url}
              alt={post.featuredImage.alt}
            />
            {post.featuredImage.alt && (
              <ArticleFigcaption>{post.featuredImage.alt}</ArticleFigcaption>
            )}
          </ArticleFigure>
        )}

        <ArticleHeader>
          <H1>{post.title}</H1>
          <ArticleMeta>
            <ArticleTime>Published on {post.date.display}</ArticleTime>
            {hasRichEditorData() && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rich Editor
              </div>
            )}
          </ArticleMeta>
        </ArticleHeader>
        
        <ArticleContent className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.categories && (
          <ArticleFooter>
            <ArticleTags>
              {post.categories.map(category => (
                <ArticleTag key={category.id}>
                  <a href={category.url}>
                    {category.name}
                  </a>
                </ArticleTag>
              ))}
            </ArticleTags>
          </ArticleFooter>
        )}
      </article>
    </MainLayout>
  )
}