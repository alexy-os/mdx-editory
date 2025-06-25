import React from 'react';
import { RichEditor } from './RichEditor';
import { PostMetaEditor } from './PostMetaEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { FileManager } from './FileManager';
import { InfoPanel } from './InfoPanel';
import { Dropdown } from './Dropdown';
import { MarkdownTextEditor } from './MarkdownTextEditor';
import { useEditor } from '../hooks/useEditor';
import { useDarkMode } from '../hooks/useDarkMode';
import { cn } from '../utils';
import { prepareHtmlForMarkdown, prepareMarkdownForEditor } from '../utils/markdown';
import { exportContextFile } from '../utils/fileSystem';

interface RichEditorAppProps {
  className?: string;
}

export function RichEditorApp({ className }: RichEditorAppProps) {
  const { state, actions } = useEditor();
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const [layout, setLayout] = React.useState<'split' | 'editor' | 'meta'>('split');
  const [showInfo, setShowInfo] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'visual' | 'markdown'>('visual');

  const currentMeta = React.useMemo(() => {
    if (!state.currentFile) return {};
    return {
      title: state.currentFile.frontmatter?.title || '',
      slug: state.currentFile.frontmatter?.slug || '',
      id: state.currentFile.frontmatter?.id || 0,
      excerpt: state.currentFile.frontmatter?.excerpt || '',
      featuredImage: state.currentFile.frontmatter?.featuredImage,
      categories: state.currentFile.frontmatter?.categories || []
    };
  }, [state.currentFile]);

  const handleSave = async () => {
    if (state.currentFile) {
      await actions.saveFile(state.currentFile);
      // Here you can add a notification about successful saving
    }
  };

  const handleExport = async () => {
    try {
      await exportContextFile();
      // Here you can add a notification about successful export
    } catch (error) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleViewModeToggle = () => {
    setViewMode(prev => prev === 'visual' ? 'markdown' : 'visual');
  };

  // Get content depending on the view mode
  const getCurrentContent = () => {
    if (!state.currentFile) return '';

    if (viewMode === 'markdown') {
      // Convert HTML to Markdown for the text editor
      return prepareHtmlForMarkdown(state.currentFile.content);
    }

    return state.currentFile.content; // HTML for the visual editor
  };

  // Handler for content change depending on the view mode
  const handleContentChange = (content: string) => {
    if (viewMode === 'markdown') {
      // Convert Markdown to HTML for saving
      const htmlContent = prepareMarkdownForEditor(content);
      actions.updateContent(htmlContent);
    } else {
      actions.updateContent(content);
    }
  };

  return (
    <div className={cn(
      'min-h-screen',
      'bg-background',
      'transition-colors duration-200',
      isDarkMode && 'dark',
      className
    )}>
      {/* Application header */}
      <header className={cn(
        'border-b',
        'border-border',
        'bg-card',
        'px-6 py-4'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className={cn(
              'text-xl font-bold',
              'text-foreground'
            )}>
              Rich Editor
            </h1>

            {state.currentFile && (
              <div className="flex items-center gap-2">
                <div className={cn(
                  'w-2 h-2 rounded-full',
                  state.currentFile.type === 'mdx' ? 'bg-secondary' : 'bg-primary'
                )} />
                <span className={cn(
                  'text-sm font-medium',
                  'text-muted-foreground'
                )}>
                  {state.currentFile.frontmatter?.title || state.currentFile.name}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">

            {state.currentFile && (
              <>
                <button
                  onClick={() => handleViewModeToggle()}
                  className={cn(
                    'px-3 py-1 text-sm rounded transition-colors',
                    viewMode === 'visual'
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'bg-card text-foreground shadow-sm'
                  )}
                >
                  {viewMode === 'visual' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" /><path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" /><path d="m15 5 4 4" /><path d="m2 2 20 20" /></svg>}
                </button>
                <div className={cn(
                  'flex rounded p-1',
                  'bg-muted'
                )}>
                  <button
                    onClick={() => setLayout('split')}
                    className={cn(
                      'px-3 py-1 text-sm rounded transition-colors',
                      layout === 'split'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Split
                  </button>
                  <button
                    onClick={() => setLayout('editor')}
                    className={cn(
                      'px-3 py-1 text-sm rounded transition-colors',
                      layout === 'editor'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Editor
                  </button>
                  <button
                    onClick={() => setLayout('meta')}
                    className={cn(
                      'px-3 py-1 text-sm rounded transition-colors',
                      layout === 'meta'
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    Metadata
                  </button>
                </div>
                <Dropdown
                  trigger={
                    <button
                      className={cn(
                        'px-3 py-2 text-sm rounded flex items-center gap-2',
                        'bg-muted',
                        'text-muted-foreground',
                        'hover:bg-accent',
                        'transition-colors'
                      )}
                    >
                      <span>Actions</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  }
                  items={[
                    {
                      id: 'view-mode',
                      label: `View mode: ${viewMode === 'visual' ? 'Visual' : 'Markdown'}`,
                      onClick: handleViewModeToggle,
                      variant: 'default',
                      title: 'Switch between visual editor and Markdown',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )
                    },
                    {
                      id: 'preview',
                      label: 'Preview',
                      onClick: actions.togglePreview,
                      variant: 'success',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )
                    },
                    {
                      id: 'save',
                      label: 'Save MDX',
                      onClick: handleSave,
                      variant: 'primary' as const,
                      title: 'Save the current file as MDX',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      )
                    },
                    {
                      id: 'export',
                      label: 'Export Context',
                      onClick: handleExport,
                      variant: 'warning' as const,
                      title: 'Export context.json from localStorage',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )
                    },
                    {
                      id: 'update',
                      label: 'Update',
                      onClick: actions.saveAllData,
                      variant: 'warning' as const,
                      title: 'Update context.json and menu.json',
                      icon: (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      )
                    }
                  ]}
                />
              </>
            )}

            {/* Help button */}
            <button
              onClick={() => setShowInfo(true)}
              className={cn(
                'p-2 rounded-lg',
                'text-muted-foreground',
                'hover:bg-accent',
                'transition-colors'
              )}
              title="Help and instructions"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Theme switcher */}
            <button
              onClick={toggleDarkMode}
              className={cn(
                'p-2 rounded-lg',
                'text-muted-foreground',
                'hover:bg-accent',
                'transition-colors'
              )}
              title={isDarkMode ? 'Light theme' : 'Dark theme'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Sidebar with files */}
        <aside className={cn(
          'w-80 border-r',
          'border-border',
          'bg-card'
        )}>
          <FileManager
            files={state.files}
            currentFileId={state.currentFile?.id || null}
            onFileSelect={actions.selectFile}
            onFileLoad={actions.loadFile}
            onFileRemove={actions.removeFile}
          />
        </aside>

        {/* Main working area */}
        <main className="flex-1 overflow-hidden">
          {!state.currentFile ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className={cn(
                  'w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center',
                  'bg-muted'
                )}>
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V16a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className={cn(
                  'text-lg font-medium mb-2',
                  'text-foreground'
                )}>
                  Select a file for editing
                </h3>
                <p className={cn(
                  'text-sm',
                  'text-muted-foreground'
                )}>
                  Load a .md or .mdx file to start working
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex">
              {/* Editor */}
              {(layout === 'split' || layout === 'editor') && (
                <div className={cn(
                  'flex-1 flex flex-col',
                  layout === 'split' ? 'border-r border-border' : ''
                )}>
                  <div className="flex-1 overflow-auto p-6">
                    {viewMode === 'visual' ? (
                      <RichEditor
                        content={getCurrentContent()}
                        onChange={handleContentChange}
                        isDarkMode={isDarkMode}
                        placeholder="Start writing your article..."
                      />
                    ) : (
                      <MarkdownTextEditor
                        content={getCurrentContent()}
                        onChange={handleContentChange}
                        placeholder="Start writing in Markdown..."
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Metadata panel */}
              {(layout === 'split' || layout === 'meta') && (
                <div className={cn(
                  layout === 'split' ? 'w-72' : 'flex-1',
                  'flex flex-col'
                )}>
                  <div className="flex-1 overflow-auto p-6">
                    <PostMetaEditor
                      meta={currentMeta}
                      onChange={actions.updateMeta}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Preview modal window */}
      <MarkdownPreview
        content={state.currentFile?.content || ''}
        frontmatter={state.currentFile?.frontmatter}
        isOpen={state.isPreviewOpen}
        onClose={actions.togglePreview}
      />

      {/* Information panel */}
      {showInfo && (
        <InfoPanel
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}