import React, { useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { SiteLogo } from "@/app/components/SiteLogo";
import { DarkMode } from '@/app/components/DarkMode';

import { Main } from '@ui8kit/components/main';
import { Container, SectionFooter } from '@ui8kit/components/section';
import { SheetLayout, SheetOverlay, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetTrigger } from '@ui8kit/components/sheet';
import { NavGroupButtons, NavBar, NavMobileList, NavMobileItem, NavMobileLink, NavMobileDropdown, NavMobileDropdownItem } from '@ui8kit/components/nav';
import { Aside } from '@ui8kit/components/aside';

import { cn } from '@/lib/utils';

import { renderContext } from '@/data';
import { quickStartExamples } from '@/data/examples/welcome';

import {
  RichEditor,
  PostMetaEditor,
  MarkdownPreview,
  MarkdownTextEditor,
  FileManager,
  InfoPanel,
  QuickStart,
  Dropdown,
  prepareHtmlForMarkdown,
  prepareMarkdownForEditor,
  exportContextFile,
  useEditor,
  QuickStartProvider
} from '@editory/rich';

export type SidebarProps = {
  className?: string
  state: any
  actions: any
}

export const { site, menu } = renderContext;
export const { features } = renderContext.about;
export const widget = features[0]

export const EditoryLayout = () => {
  const { state, actions } = useEditor();
  const [layout, setLayout] = React.useState<'split' | 'editor' | 'meta'>('split');
  const [showInfo, setShowInfo] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'visual' | 'markdown'>('visual');
  const isMobile = useIsMobile();

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

  const handleLoadExample = useCallback((content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const file = new File([blob], filename, { 
      type: 'text/markdown',
      lastModified: Date.now()
    });
    actions.loadFile(file);
  }, [actions]);

  return (
    <QuickStartProvider onLoadExample={handleLoadExample}>
      <SheetLayout>
        <div className="grid grid-cols-4">
          <EditorySidebar className="col-span-4 md:col-span-1" state={state} actions={actions} />
          <Main className="col-span-4 md:col-span-3">
            <Container>
              <NavBar className="md:[&_[data-slot=nav-container]]:!justify-end">
                <SiteLogo className="block md:hidden" />

                {state.currentFile && (
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-2 h-2 rounded-full',
                      state.currentFile.type === 'mdx' ? 'bg-purple-500' : 'bg-blue-500'
                    )} />
                    <span className={cn(
                      'text-sm font-medium',
                      'text-gray-700 dark:text-gray-300'
                    )}>
                      {state.currentFile.frontmatter?.title || state.currentFile.name}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">

                  {state.currentFile && (
                    <>
                      <button
                        onClick={() => handleViewModeToggle()}
                        className={cn(
                          'px-3 py-1 text-sm rounded transition-colors',
                          viewMode === 'visual'
                            ? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                            : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                        )}
                      >
                        {viewMode === 'visual' ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982" /><path d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353" /><path d="m15 5 4 4" /><path d="m2 2 20 20" /></svg>}
                      </button>
                      <div className={cn(
                        'flex rounded-lg p-1',
                        'bg-gray-100 dark:bg-gray-700'
                      )}>
                        <button
                          onClick={() => setLayout('split')}
                          className={cn(
                            'px-3 py-1 text-sm rounded transition-colors',
                            layout === 'split'
                              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                          )}
                        >
                          Split
                        </button>
                        <button
                          onClick={() => setLayout('editor')}
                          className={cn(
                            'px-3 py-1 text-sm rounded transition-colors',
                            layout === 'editor'
                              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                          )}
                        >
                          Editor
                        </button>
                        <button
                          onClick={() => setLayout('meta')}
                          className={cn(
                            'px-3 py-1 text-sm rounded transition-colors',
                            layout === 'meta'
                              ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                          )}
                        >
                          Metadata
                        </button>
                      </div>
                      <Dropdown
                        trigger={
                          <button
                            className={cn(
                              'px-3 py-2 text-sm rounded-lg flex items-center gap-2',
                              'bg-gray-100 dark:bg-gray-700',
                              'text-gray-700 dark:text-gray-300',
                              'hover:bg-gray-200 dark:hover:bg-gray-600',
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

                  {/* Help button */}
                  <button
                    onClick={() => setShowInfo(true)}
                    className={cn(
                      'p-2 rounded-lg',
                      'text-gray-500 dark:text-gray-400',
                      'hover:bg-gray-100 dark:hover:bg-gray-700',
                      'transition-colors'
                    )}
                    title="Help and instructions"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                    </>
                  )}
                </div>

                <NavGroupButtons>
                  <DarkMode />
                  <SheetTrigger>
                    <span className="latty latty-menu"></span>
                  </SheetTrigger>
                </NavGroupButtons>
              </NavBar>
                </Container>
              
              {isMobile ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
                  <div className="mb-6">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Desktop Required
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                    EditorY is optimized for desktop use. Please access this editor from a computer for the best experience.
                  </p>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                          Why Desktop?
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          The rich editor, split-screen preview, and file management features work best with keyboard shortcuts and larger screens.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {!state.currentFile ? (
                    <>
                      <div className="flex flex-col text-center gap-8 items-center py-6 lg:py-12">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                          Welcome to EditorY
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4 max-w-4xl">
                          Professional Markdown editing meets modern web standards. 
                          Write in Markdown, preview in real-time, export as semantic HTML5. 
                          Perfect for blogs, documentation, and content creation.
                        </p>
                        <QuickStart
                          onLoadExample={handleLoadExample}
                          variant="cards"
                          className="flex-1 mt-8 w-full max-w-4xl"
                          showHeader={false}
                          examples={quickStartExamples}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex">
                      {/* Editor */}
                      {(layout === 'split' || layout === 'editor') && (
                        <div className={cn(
                          'flex-1 overflow-auto',
                          layout === 'split' ? 'border-r border-gray-200 dark:border-gray-700' : ''
                        )}>
                          {viewMode === 'visual' ? (
                            <RichEditor
                              content={getCurrentContent()}
                              onChange={handleContentChange}
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
                      )}

                      {/* Metadata panel */}
                      {(layout === 'split' || layout === 'meta') && (
                        <div className={cn(
                          layout === 'split' ? 'w-96' : 'flex-1',
                          'p-6 overflow-auto'
                        )}>
                          <PostMetaEditor
                            meta={currentMeta}
                            onChange={actions.updateMeta}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

            <SectionFooter className="sticky bottom-0 z-50 w-full py-2 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <Container>
                <a href="https://github.com/buildy-ui/ui" className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} buildy/ui</a>
              </Container>
            </SectionFooter>
          </Main>
        </div>
        <SheetOverlay />
        <SheetContent>
          <SheetHeader>
            <SheetTitle><SiteLogo /></SheetTitle>
            <SheetDescription>UI8Kit Design System</SheetDescription>
          </SheetHeader>

          <SheetBody>
            <NavMobileList>
              {menu.primary.items.map((item) => (
                <NavMobileItem key={item.id}>
                  <NavMobileLink href={item.url}>{item.title}</NavMobileLink>
                </NavMobileItem>
              ))}
            </NavMobileList>
          </SheetBody>
        </SheetContent>

      </SheetLayout>

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
    </QuickStartProvider>
  );
};

function EditorySidebar({ className, state, actions }: SidebarProps) {

  return (
    <Aside className={`${className} sticky top-0 z-50 overflow-y-auto w-full h-screen border-r border-border hidden md:block`}>
      <div className="flex flex-col gap-6 p-4">
        <SiteLogo className="hidden md:block" />
        <NavMobileList>
          {menu.primary.items.map((item) => (
            <NavMobileItem key={item.id}>
              <NavMobileLink className="text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-secondary-foreground/10 rounded-md p-2" href={item.url}>{item.title}</NavMobileLink>
            </NavMobileItem>
          ))}
          {/*<NavMobileItem>
            <NavMobileDropdown className="text-sm font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/90 rounded-md" title="Services">
              <NavMobileDropdownItem href="/web-dev">Web Development</NavMobileDropdownItem>
              <NavMobileDropdownItem href="/mobile-dev">Mobile Development</NavMobileDropdownItem>
            </NavMobileDropdown>
          </NavMobileItem>*/}
        </NavMobileList>
        <FileManager
          files={state.files}
          currentFileId={state.currentFile?.id || null}
          onFileSelect={actions.selectFile}
          onFileLoad={actions.loadFile}
          onFileRemove={actions.removeFile}
        />
      </div>
    </Aside>
  );
}