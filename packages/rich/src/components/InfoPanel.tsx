import React from 'react';
import { cn } from '../utils';

interface InfoPanelProps {
  isDarkMode?: boolean;
  onClose: () => void;
}

export function InfoPanel({ isDarkMode = false, onClose }: InfoPanelProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className={cn(
        'max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg',
        'bg-background',
        'border border-border'
      )}>
        {/* Header */}
        <div className={cn(
          'p-6 border-b',
          'border-border',
          'bg-muted'
        )}>
          <div className="flex items-center justify-between">
            <h2 className={cn(
              'text-xl font-semibold',
              'text-foreground'
            )}>
              Rich Editor - Instructions
            </h2>
            <button
              onClick={onClose}
              className={cn(
                'p-2 rounded-lg',
                'text-muted-foreground',
                'hover:bg-accent',
                'transition-colors'
              )}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main features */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-foreground'
            )}>
              Main features
            </h3>
            <ul className={cn(
              'space-y-2 text-sm',
              'text-muted-foreground'
            )}>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Editing Markdown and MDX files with rich-text interface</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Managing article metadata (title, slug, excerpt, categories)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Full-screen preview with MDX rendering</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Switching between multiple files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Automatic saving in context.json and menu.json</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Export to MDX format</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Dark and light themes</span>
              </li>
            </ul>
          </section>

          {/* Quick start */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-foreground'
            )}>
              Quick start
            </h3>
            <ol className={cn(
              'space-y-2 text-sm list-decimal list-inside',
              'text-muted-foreground'
            )}>
              <li>Drag and drop .md or .mdx files to the left panel or use the "Upload" button</li>
              <li>Select a file for editing from the list</li>
              <li>Use the toolbar to format text</li>
              <li>Fill in the metadata in the right panel (or switch to the "Metadata" view)</li>
              <li>Click "Preview" for full-screen view</li>
              <li>Use "Save" to save a single file or "Update" to update all data</li>
            </ol>
          </section>

          {/* Automatic functions */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-foreground'
            )}>
              Automatic functions
            </h3>
            <div className={cn(
              'space-y-3 text-sm',
              'text-muted-foreground'
            )}>
              <div className="p-3 rounded-lg bg-accent border border-border">
                <strong className="text-accent-foreground">Slug auto-generation:</strong>
                <p className="mt-1">If slug is not specified, it is automatically generated from the title</p>
              </div>
              <div className="p-3 rounded-lg bg-accent border border-border">
                <strong className="text-accent-foreground">Excerpt auto-generation:</strong>
                <p className="mt-1">If excerpt is not specified, it is automatically generated from the first 160 characters of the content</p>
              </div>
              <div className="p-3 rounded-lg bg-accent border border-border">
                <strong className="text-accent-foreground">ID auto-generation:</strong>
                <p className="mt-1">Each file is automatically assigned a unique ID</p>
              </div>
            </div>
          </section>

          {/* File structure */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-foreground'
            )}>
              Saving data
            </h3>
            <div className={cn(
              'p-4 rounded-lg',
              'bg-muted',
              'border border-border'
            )}>
              <p className={cn(
                'text-sm mb-2',
                'text-muted-foreground'
              )}>
                In the current version, data is saved in the browser's localStorage:
              </p>
              <ul className={cn(
                'space-y-1 text-sm',
                'text-muted-foreground'
              )}>
                <li><code className="bg-secondary px-1 rounded">rich-editor-context</code> - database of posts</li>
                <li><code className="bg-secondary px-1 rounded">rich-editor-menu</code> - menu structure</li>
              </ul>
              <p className={cn(
                'text-xs mt-2 text-secondary-foreground'
              )}>
                In the production version, data will be saved in the files src/~data/context.json and src/~data/menu.json
              </p>
            </div>
          </section>

          {/* Hotkeys */}
          <section>
            <h3 className={cn(
              'text-lg font-semibold mb-3',
              'text-foreground'
            )}>
              Hotkeys
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bold</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+B</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Italic</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+I</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Code</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+E</kbd>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cancel</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Z</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Repeat</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Y</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Save</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+S</kbd>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className={cn(
          'p-4 border-t',
          'border-border',
          'bg-muted'
        )}>
          <div className="flex justify-between items-center">
            <span className={cn(
              'text-xs',
              'text-muted-foreground'
            )}>
              Rich Editor v1.0.0 - Powered by TipTap & MDX
            </span>
            <button
              onClick={onClose}
              className={cn(
                'px-4 py-2 text-sm rounded',
                'bg-primary',
                'text-primary-foreground',
                'hover:bg-primary/90',
                'transition-colors'
              )}
            >
              I understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 