import React, { useCallback } from 'react';
import { EditorFile } from '../types/editor';
import { QuickStart } from './QuickStart';
import { cn } from '../utils';
// import { parseMarkdownFile, generateSlug, generateExcerpt, generateId } from '../utils';

interface FileManagerProps {
  files: EditorFile[];
  currentFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onFileLoad: (file: File) => void;
  onFileRemove: (fileId: string) => void;
  className?: string;
}

export function FileManager({
  files,
  currentFileId,
  onFileSelect,
  onFileLoad,
  onFileRemove,
  className
}: FileManagerProps) {
  // const [dragOver,  setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    
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
      'border-border',
      'bg-background',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'p-3 border-b rounded-t-lg',
        'border-border',
        'bg-muted'
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={cn(
              'text-lg font-semibold',
              'text-foreground'
            )}>
              Files ({files.length})
            </h3>
            {files.length > 0 && (
              <p className={cn(
                'text-xs mt-1',
                'text-muted-foreground'
              )}>
                Auto-save context.json and menu.json
              </p>
            )}
          </div>
          
          <label className={cn(
            'px-3 py-1 text-sm rounded cursor-pointer',
            'bg-primary',
            'text-primary-foreground',
            'hover:bg-primary/90',
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
          'border-[.5px]',
          files.length === 0 ? 'min-h-[200px] flex items-center justify-center border-primary/50 bg-primary/5 border-dashed transition-colors' : 'border-solid border-secondary'
        )}
      >
        {files.length === 0 ? (
          <label className="cursor-pointer">
          <QuickStart 
            onLoadExample={handleLoadExample}
            variant="list"
            showHeader={true}
            showTip={false}
            showCards={false}
          />
          <input
            type="file"
            multiple
            accept=".md,.mdx"
            onChange={handleFileInput}
            className="hidden"
          />
          </label>
        ) : (
          <div className="">
            {files.map((file) => (
              <div
                key={file.id} 
                className={cn(
                  'p-3 border cursor-pointer transition-colors',
                  currentFileId === file.id
                    ? 'border-primary bg-primary/10 text-primary-foreground'
                    : 'border-muted bg-card hover:border-primary hover:text-primary-foreground'
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
                        'text-foreground'
                      )}>
                        {file.frontmatter?.title || file.name}
                      </h4>
                      
                      <span className={cn(
                        'text-xs px-1.5 py-0.5 rounded',
                        'bg-muted',
                        'text-muted-foreground'
                      )}>
                        {file.type.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1">
                      <span className={cn(
                        'text-xs',
                        'text-muted-foreground'
                      )}>
                        {formatDate(file.lastModified)}
                      </span>
                      
                      {file.frontmatter?.slug && (
                        <span className={cn(
                          'text-xs',
                          'text-muted-foreground'
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
                      'p-2 rounded-full hover:bg-destructive/10',
                      'text-muted-foreground hover:text-destructive',
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
          'p-3 border-t rounded-b-lg',
          'border-border',
          'bg-muted'
        )}>
          <div className="flex items-center justify-between text-xs">
            <div className={cn(
              'text-muted-foreground'
            )}>
              Total files: {files.length}
            </div>
            
            <div className="flex gap-3">
              <span className={cn(
                'text-muted-foreground'
              )}>
                MD: {files.filter(f => f.type === 'md').length}
              </span>
              <span className={cn(
                'text-muted-foreground'
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