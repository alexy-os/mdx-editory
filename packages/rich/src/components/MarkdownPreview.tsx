import { cn } from '../utils';

interface MarkdownPreviewProps {
  content: string;
  frontmatter?: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
}

export function MarkdownPreview({ 
  content, 
  frontmatter, 
  isOpen, 
  onClose
}: MarkdownPreviewProps) {
  if (!isOpen) return null;

  // Simple Markdown parser for preview
  const parseMarkdown = (markdown: string) => {
    return markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-6">$1</h1>')
      // Bold text
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      // Code
      .replace(/`([^`]*)`/gim, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // Links
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" class="text-primary hover:underline">$1</a>')
      // Paragraphs
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      // Line breaks
      .replace(/\n/gim, '<br>');
  };

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-black/50 backdrop-blur-sm'
    )}>
      <div className={cn(
        'w-full h-full max-w-6xl max-h-[90vh] mx-4',
        'bg-background',
        'rounded-lg shadow-2xl',
        'flex flex-col overflow-hidden'
      )}>
        {/* Modal window header */}
        <div className={cn(
          'flex items-center justify-between p-4 border-b',
          'border-border',
          'bg-muted'
        )}>
          <div className="flex items-center gap-3">
            <h2 className={cn(
              'text-lg font-semibold',
              'text-foreground'
            )}>
              Preview
            </h2>
            {frontmatter?.title && (
              <span className={cn(
                'text-sm px-2 py-1 rounded',
                'bg-accent',
                'text-accent-foreground'
              )}>
                {frontmatter.title}
              </span>
            )}
          </div>
          
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg hover:bg-accent',
              'text-muted-foreground',
              'transition-colors'
            )}
            title="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Preview content */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Metadata panel */}
            {frontmatter && Object.keys(frontmatter).length > 0 && (
              <div className={cn(
                'w-80 p-6 border-r overflow-y-auto',
                'border-border',
                'bg-muted'
              )}>
                <h3 className={cn(
                  'text-sm font-semibold mb-4',
                  'text-muted-foreground'
                )}>
                  Metadata
                </h3>
                
                <div className="space-y-3">
                  {Object.entries(frontmatter).map(([key, value]) => (
                    <div key={key}>
                      <dt className={cn(
                        'text-xs font-medium mb-1',
                        'text-muted-foreground'
                      )}>
                        {key}
                      </dt>
                      <dd className={cn(
                        'text-sm',
                        'text-foreground'
                      )}>
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 p-8 overflow-y-auto">
              <article className={cn(
                'prose prose-lg max-w-none',
                'dark:prose-invert',
                'prose-headings:text-foreground',
                'prose-p:text-foreground',
                'prose-a:text-primary',
                'prose-strong:text-foreground',
                'prose-code:text-accent-foreground',
                'prose-pre:bg-muted',
                'prose-blockquote:border-l-primary'
              )}>
                {frontmatter?.title && (
                  <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                      {frontmatter.title}
                    </h1>
                    {frontmatter?.excerpt && (
                      <p className="text-lg text-muted-foreground mb-4">
                        {frontmatter.excerpt}
                      </p>
                    )}
                    {frontmatter?.date && (
                      <time className="text-sm text-muted-foreground">
                        {typeof frontmatter.date === 'object' 
                          ? frontmatter.date.display || frontmatter.date.formatted
                          : frontmatter.date}
                      </time>
                    )}
                  </header>
                )}
                
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: `<p class="mb-4">${parseMarkdown(content)}</p>` 
                  }} 
                />
              </article>
            </div>
          </div>
        </div>

        {/* Modal window footer */}
        <div className={cn(
          'flex items-center justify-between p-4 border-t',
          'border-border',
          'bg-muted'
        )}>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Characters: {content.length}</span>
            <span>Words: {content.split(/\s+/).filter(Boolean).length}</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
              }}
              className={cn(
                'px-3 py-1 text-sm rounded',
                'bg-secondary',
                'text-secondary-foreground',
                'hover:bg-secondary/80',
                'transition-colors'
              )}
            >
              Copy
            </button>
            
            <button
              onClick={onClose}
              className={cn(
                'px-4 py-1 text-sm rounded',
                'bg-primary',
                'text-primary-foreground',
                'hover:bg-primary/90',
                'transition-colors'
              )}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 