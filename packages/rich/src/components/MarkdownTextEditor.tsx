import React from 'react';
import { cn } from '../utils';

interface MarkdownTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  isDarkMode?: boolean;
}

export function MarkdownTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing in Markdown...',  
  className,
  isDarkMode = false 
}: MarkdownTextEditorProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={cn(
      'rounded-lg border h-full flex flex-col',
      'border-gray-200 dark:border-gray-700',
      'bg-white dark:bg-gray-900',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'px-4 py-3 border-b',
        'border-gray-200 dark:border-gray-700',
        'bg-gray-50 dark:bg-gray-800'
      )}>
        <div className="flex items-center justify-between">
          <h3 className={cn(
            'text-sm font-medium',
            'text-gray-900 dark:text-gray-100'
          )}>
            Markdown editor
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>GitHub Flavored Markdown support</span>
          </div>
        </div>
      </div>

      {/* Text area */}
      <div className="flex-1 p-4">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            'w-full h-full resize-none',
            'bg-transparent border-none outline-none',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'font-mono text-sm leading-relaxed'
          )}
          style={{ minHeight: '400px' }}
        />
      </div>

      {/* Syntax tips */}
      <div className={cn(
        'px-4 py-2 border-t text-xs',
        'border-gray-200 dark:border-gray-700',
        'bg-gray-50 dark:bg-gray-800',
        'text-gray-500 dark:text-gray-400'
      )}>
        <div className="flex flex-wrap gap-4">
          <span><strong>**bold**</strong></span>
          <span><em>*italic*</em></span>
          <span><code>`code`</code></span>
          <span># Header</span>
          <span>- List</span>
          <span>[Link](url)</span>
          <span>![Image](url)</span>
        </div>
      </div>
    </div>
  );
} 