import { MainLayout } from '@/app/layouts/MainLayout';
import { renderContext } from '@/data';
import { hasRichEditorData, getRichEditorPostsCount } from '@/data/adapters/localStorageAdapter';
import { Button } from '@ui8kit/ui/button';
import { Grid, SectionHeader, SectionContent, SectionTitle, SectionDescription } from '@ui8kit/components/section';
import { Article, ArticleHeader, ArticleTitle, ArticleMeta, ArticleTime, ArticleContent, ArticleFooter, ArticleFigure, ArticleImage, ArticleFigcaption } from '@ui8kit/components/article';
import { P } from '@ui8kit/components/markup';

export const { page } = renderContext.blog;
export const { posts } = renderContext.posts;

export function Blog() {
  const isUsingRichEditor = hasRichEditorData();
  const postsCount = getRichEditorPostsCount();

  return (

    <MainLayout
      title={page.title}
      description={page.excerpt}
    >
      <SectionHeader>
        <SectionTitle>{page.title}</SectionTitle>
        <SectionDescription>{page.excerpt}</SectionDescription>
        {isUsingRichEditor && (
          <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                Rich Editor Active: {postsCount} posts loaded from localStorage
              </span>
            </div>
          </div>
        )}
      </SectionHeader>

      <SectionContent>
        <Grid>
          {posts.map((post) => (
            <Article key={post.id}>

              {post.featuredImage && (
                <ArticleFigure>
                  <ArticleImage
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt}
                  />
                  <ArticleFigcaption>{post.featuredImage.alt}</ArticleFigcaption>
                </ArticleFigure>
              )}
              <ArticleHeader>
                <ArticleTitle>
                  <a href={`/post/${post.slug}`}>
                    {post.title}
                  </a>
                </ArticleTitle>
                <ArticleMeta>
                  <ArticleTime>
                    {post.date.display}
                  </ArticleTime>
                </ArticleMeta>
              </ArticleHeader>
              <ArticleContent className="py-0 text-sm text-secondary-foreground">
                <P>
                  {post.excerpt}
                </P>
              </ArticleContent>
              <ArticleFooter>
                <a href={`/post/${post.slug}`}>
                  <Button variant="secondary" size="sm">Read more</Button>
                </a>
              </ArticleFooter>
            </Article>
          ))}
        </Grid>
      </SectionContent>
    </MainLayout>
  )
}
