import React, { useCallback, useState } from 'react';
import { EditorFile } from '../types/editor';
// import { QuickStart } from './QuickStart';
import { cn } from '../utils';
// import { parseMarkdownFile, generateSlug, generateExcerpt, generateId } from '../utils';

interface FileManagerProps {
  files: EditorFile[];
  currentFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onFileLoad: (file: File) => void;
  onFileRemove: (fileId: string) => void;
  className?: string;
  isDarkMode?: boolean;
}

export function FileManager({
  files,
  currentFileId,
  onFileSelect,
  onFileLoad,
  onFileRemove,
  className,
  isDarkMode = false
}: FileManagerProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(file => {
      if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
        onFileLoad(file);
      }
    });
  }, [onFileLoad]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(file => {
      if (file.name.endsWith('.md') || file.name.endsWith('.mdx')) {
        onFileLoad(file);
      }
    });
    // Reset input to allow selecting the same file again
    e.target.value = '';
  }, [onFileLoad]);

  const handleLoadExample = useCallback((content: string, filename: string) => {
    // Create File object from string for compatibility with onFileLoad
    const blob = new Blob([content], { type: 'text/markdown' });
    const file = new File([blob], filename, { 
      type: 'text/markdown',
      lastModified: Date.now()
    });
    onFileLoad(file);
  }, [onFileLoad]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={cn(
      'rounded-lg border',
      'border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'p-4 border-b',
        'border-gray-200 dark:border-gray-700',
        'bg-gray-50 dark:bg-gray-800'
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={cn(
              'text-lg font-semibold',
              'text-gray-900 dark:text-gray-100'
            )}>
              Files ({files.length})
            </h3>
            {files.length > 0 && (
              <p className={cn(
                'text-xs mt-1',
                'text-gray-500 dark:text-gray-400'
              )}>
                Auto-save context.json and menu.json
              </p>
            )}
          </div>
          
          <label className={cn(
            'px-3 py-1 text-sm rounded cursor-pointer',
            'bg-blue-600 dark:bg-blue-500',
            'text-white',
            'hover:bg-blue-700 dark:hover:bg-blue-600',
            'transition-colors'
          )}>
            Upload
            <input
              type="file"
              multiple
              accept=".md,.mdx"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Drag and drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'p-6 border-2 border-dashed transition-colors',
          dragOver 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600',
          files.length === 0 ? 'min-h-[200px] flex items-center justify-center' : ''
        )}
      >
        {files.length === 0 ? (
          <>
          <div>
            <h3 className={cn(
              'text-lg font-semibold',
              'text-gray-900 dark:text-gray-100'
            )}>
              Files ({files.length})
            </h3>
          </div>
          {/*<QuickStart 
            onLoadExample={handleLoadExample}
            isDarkMode={isDarkMode}
          />*/}
          </>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-colors',
                  currentFileId === file.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                onClick={() => onFileSelect(file.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        'w-2 h-2 rounded-full',
                        file.type === 'mdx' ? 'bg-purple-500' : 'bg-blue-500'
                      )} />
                      
                      <h4 className={cn(
                        'text-sm font-medium truncate',
                        'text-gray-900 dark:text-gray-100'
                      )}>
                        {file.frontmatter?.title || file.name}
                      </h4>
                      
                      <span className={cn(
                        'text-xs px-1.5 py-0.5 rounded',
                        'bg-gray-100 dark:bg-gray-700',
                        'text-gray-600 dark:text-gray-400'
                      )}>
                        {file.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-1">
                      <span className={cn(
                        'text-xs',
                        'text-gray-500 dark:text-gray-400'
                      )}>
                        {formatDate(file.lastModified)}
                      </span>
                      
                      {file.frontmatter?.slug && (
                        <span className={cn(
                          'text-xs',
                          'text-gray-500 dark:text-gray-400'
                        )}>
                          /{file.frontmatter.slug}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileRemove(file.id);
                    }}
                    className={cn(
                      'p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30',
                      'text-gray-400 hover:text-red-600 dark:hover:text-red-400',
                      'transition-colors'
                    )}
                    title="Delete file"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Statistics */}
      {files.length > 0 && (
        <div className={cn(
          'p-4 border-t',
          'border-gray-200 dark:border-gray-700',
          'bg-gray-50 dark:bg-gray-800'
        )}>
          <div className="flex items-center justify-between text-sm">
            <div className={cn(
              'text-gray-600 dark:text-gray-400'
            )}>
              Total files: {files.length}
            </div>
            
            <div className="flex gap-4">
              <span className={cn(
                'text-gray-600 dark:text-gray-400'
              )}>
                MD: {files.filter(f => f.type === 'md').length}
              </span>
              <span className={cn(
                'text-gray-600 dark:text-gray-400'
              )}>
                MDX: {files.filter(f => f.type === 'mdx').length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 