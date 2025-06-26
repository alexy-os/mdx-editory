import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { cn } from '../utils';

interface CodeMirrorEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  isDarkMode?: boolean;
}

export function CodeMirrorEditor({ 
  content, 
  onChange, 
  placeholder = 'Start writing in Markdown...',  
  className,
  isDarkMode = false 
}: CodeMirrorEditorProps) {
  
  const extensions = React.useMemo(() => [
    markdown(),
    EditorView.theme({
      '&': {
        fontSize: '14px',
      },
      '.cm-content': {
        padding: '16px',
        minHeight: '400px',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
      },
      '.cm-focused': {
        outline: 'none',
      },
      '.cm-editor': {
        borderRadius: '0.5rem',
      },
      '.cm-scroller': {
        fontFamily: 'inherit',
      },
    }),
    EditorView.lineWrapping,
  ], []);

  const theme = isDarkMode ? oneDark : undefined;

  return (
    <div className={cn(
      'codemirror-editor relative bg-background',
      className
    )}>
      {/* Header */}
      <div className={cn(
        'px-4 py-3 border-b',
        'border-border',
        'bg-muted'
      )}>
        <div className="flex items-center justify-between">
          <h3 className={cn(
            'text-sm font-medium',
            'text-foreground'
          )}>
            Markdown editor
          </h3>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>GitHub Flavored Markdown support</span>
          </div>
        </div>
      </div>

      {/* CodeMirror */}
      <div className="border-b border-border">
        <CodeMirror
          value={content}
          onChange={onChange}
          placeholder={placeholder}
          theme={theme}
          extensions={extensions}
          className={cn(
            'text-sm',
            isDarkMode ? 'dark' : ''
          )}
        />
      </div>

      {/* Syntax tips */}
      <div className={cn(
        'px-4 py-2 text-xs',
        'bg-muted',
        'text-muted-foreground'
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