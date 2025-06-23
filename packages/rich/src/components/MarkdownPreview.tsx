import React from 'react';
import { cn } from '../utils';

interface MarkdownPreviewProps {
  content: string;
  frontmatter?: Record<string, any>;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export function MarkdownPreview({ 
  content, 
  frontmatter, 
  isOpen, 
  onClose, 
  isDarkMode = false 
}: MarkdownPreviewProps) {
  if (!isOpen) return null;

  // Простой парсер Markdown для превью
  const parseMarkdown = (markdown: string) => {
    return markdown
      // Заголовки
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-6">$1</h1>')
      // Жирный текст
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-semibold">$1</strong>')
      // Курсив
      .replace(/\*(.*)\*/gim, '<em class="italic">$1</em>')
      // Код
      .replace(/`([^`]*)`/gim, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      // Ссылки
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>')
      // Параграфы
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      // Переносы строк
      .replace(/\n/gim, '<br>');
  };

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'bg-black/50 backdrop-blur-sm'
    )}>
      <div className={cn(
        'w-full h-full max-w-6xl max-h-[90vh] mx-4',
        'bg-white dark:bg-gray-900',
        'rounded-lg shadow-2xl',
        'flex flex-col overflow-hidden'
      )}>
        {/* Заголовок модального окна */}
        <div className={cn(
          'flex items-center justify-between p-4 border-b',
          'border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800'
        )}>
          <div className="flex items-center gap-3">
            <h2 className={cn(
              'text-lg font-semibold',
              'text-gray-900 dark:text-gray-100'
            )}>
              Предпросмотр
            </h2>
            {frontmatter?.title && (
              <span className={cn(
                'text-sm px-2 py-1 rounded',
                'bg-blue-100 dark:bg-blue-900/30',
                'text-blue-700 dark:text-blue-300'
              )}>
                {frontmatter.title}
              </span>
            )}
          </div>
          
          <button
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700',
              'text-gray-500 dark:text-gray-400',
              'transition-colors'
            )}
            title="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Контент предпросмотра */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* Панель метаданных */}
            {frontmatter && Object.keys(frontmatter).length > 0 && (
              <div className={cn(
                'w-80 p-6 border-r overflow-y-auto',
                'border-gray-200 dark:border-gray-700',
                'bg-gray-50 dark:bg-gray-800'
              )}>
                <h3 className={cn(
                  'text-sm font-semibold mb-4',
                  'text-gray-700 dark:text-gray-300'
                )}>
                  Метаданные
                </h3>
                
                <div className="space-y-3">
                  {Object.entries(frontmatter).map(([key, value]) => (
                    <div key={key}>
                      <dt className={cn(
                        'text-xs font-medium mb-1',
                        'text-gray-500 dark:text-gray-400'
                      )}>
                        {key}
                      </dt>
                      <dd className={cn(
                        'text-sm',
                        'text-gray-900 dark:text-gray-100'
                      )}>
                        {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Основной контент */}
            <div className="flex-1 p-8 overflow-y-auto">
              <article className={cn(
                'prose prose-lg max-w-none',
                'dark:prose-invert',
                'prose-headings:text-gray-900 dark:prose-headings:text-gray-100',
                'prose-p:text-gray-700 dark:prose-p:text-gray-300',
                'prose-a:text-blue-600 dark:prose-a:text-blue-400',
                'prose-strong:text-gray-900 dark:prose-strong:text-gray-100',
                'prose-code:text-pink-600 dark:prose-code:text-pink-400',
                'prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800',
                'prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400'
              )}>
                {frontmatter?.title && (
                  <header className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                      {frontmatter.title}
                    </h1>
                    {frontmatter?.excerpt && (
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {frontmatter.excerpt}
                      </p>
                    )}
                    {frontmatter?.date && (
                      <time className="text-sm text-gray-500 dark:text-gray-500">
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

        {/* Подвал модального окна */}
        <div className={cn(
          'flex items-center justify-between p-4 border-t',
          'border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800'
        )}>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Символов: {content.length}</span>
            <span>Слов: {content.split(/\s+/).filter(Boolean).length}</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
              }}
              className={cn(
                'px-3 py-1 text-sm rounded',
                'bg-gray-200 dark:bg-gray-700',
                'text-gray-700 dark:text-gray-300',
                'hover:bg-gray-300 dark:hover:bg-gray-600',
                'transition-colors'
              )}
            >
              Копировать
            </button>
            
            <button
              onClick={onClose}
              className={cn(
                'px-4 py-1 text-sm rounded',
                'bg-blue-600 dark:bg-blue-500',
                'text-white',
                'hover:bg-blue-700 dark:hover:bg-blue-600',
                'transition-colors'
              )}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 