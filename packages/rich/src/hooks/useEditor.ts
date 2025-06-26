import { useState, useCallback, useEffect } from 'react';
import { EditorState, EditorFile, PostMeta } from '../types/editor';
import { parseMarkdownFile, stringifyMarkdownFile, generateSlug, generateExcerpt, generateId, formatDate } from '../utils';
import { 
  generateContext, 
  generateMenu, 
  saveContext, 
  saveMenu, 
  loadContext, 
  loadMenu,
  saveMDXFile,
  importContextFile,
  convertContextToEditorFiles
} from '../utils/fileSystem';
import { 
  prepareMarkdownForEditor, 
  prepareHtmlForMarkdown, 
  isMarkdownContent 
} from '../utils/markdown';

export function useEditor() {
  const [state, setState] = useState<EditorState>({
    currentFile: null,
    files: [],
    isPreviewOpen: false,
    isDarkMode: false,
    context: {},
    menu: []
  });

    const saveAllData = useCallback(async () => {
    try {
      // Generate and save context.json
      const context = generateContext(state.files);
      await saveContext(context);
      
      // Generate and save menu.json
      const menu = generateMenu(state.files);
      await saveMenu(menu);
      
      // Update state
      setState(prev => ({
        ...prev,
        context,
        menu: menu.primary.items
      }));
      
      console.log('All data saved successfully');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }, [state.files]);

  // Load saved data when initializing
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const [context, menu] = await Promise.all([
          loadContext(),
          loadMenu()
        ]);
        
        setState(prev => ({
          ...prev,
          context,
          menu: menu.primary.items
        }));
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    };
    
    loadSavedData();
  }, []);

  // Automatically save context and menu when files change
  useEffect(() => {
    if (state.files.length > 0) {
      const timeoutId = setTimeout(() => {
        saveAllData();
      }, 1000); // Debounce 1 second
      
      return () => clearTimeout(timeoutId);
    }
  }, [state.files, saveAllData]);

  const loadFile = useCallback(async (file: File) => {
    const content = await file.text();
    const { frontmatter, body } = parseMarkdownFile(content);
    
    // Store both HTML and Markdown versions
    const htmlContent = isMarkdownContent(body) ? prepareMarkdownForEditor(body) : body;
    const markdownContent = body;
    
    const editorFile: EditorFile = {
      id: generateId().toString(),
      name: file.name,
      path: file.name,
      htmlContent,
      markdownContent,
      frontmatter,
      type: file.name.endsWith('.mdx') ? 'mdx' : 'md',
      lastModified: new Date(file.lastModified)
    };

    setState(prev => ({
      ...prev,
      currentFile: editorFile,
      files: [...prev.files.filter(f => f.id !== editorFile.id), editorFile]
    }));
  }, []);

  const saveFile = useCallback(async (file: EditorFile) => {
    try {
      // Use the current markdown content for saving
      const fileToSave = {
        ...file,
        content: file.markdownContent // Use markdownContent for saving
      };
      
      // Save MDX file
      await saveMDXFile(fileToSave);
      
      // Update state with new data
      setState(prev => {
        const updatedFiles = prev.files.map(f => f.id === file.id ? file : f);
        return {
          ...prev,
          files: updatedFiles
        };
      });
      
      console.log('File saved successfully:', file.name);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  }, []);

  const togglePreview = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPreviewOpen: !prev.isPreviewOpen
    }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState(prev => ({
      ...prev,
      isDarkMode: !prev.isDarkMode
    }));
  }, []);

  const selectFile = useCallback((fileId: string) => {
    setState(prev => {
      const file = prev.files.find(f => f.id === fileId);
      if (file) {
        return {
          ...prev,
          currentFile: file
        };
      }
      return prev;
    });
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setState(prev => {
      const updatedFiles = prev.files.filter(f => f.id !== fileId);
      const newCurrentFile = prev.currentFile?.id === fileId 
        ? (updatedFiles.length > 0 ? updatedFiles[0] : null)
        : prev.currentFile;
      
      return {
        ...prev,
        files: updatedFiles,
        currentFile: newCurrentFile
      };
    });
  }, []);

  const exportToMDX = useCallback(() => {
    if (!state.currentFile) return '';
    // Use the current markdown content for export
    return stringifyMarkdownFile(state.currentFile.frontmatter || {}, state.currentFile.markdownContent);
  }, [state.currentFile]);

  // Update HTML content
  const updateHtmlContent = useCallback((htmlContent: string) => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const updatedFile = {
        ...prev.currentFile,
        htmlContent,
        lastModified: new Date()
      };
      
      // Update both current file and files list in one setState
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? updatedFile : f
      );
      
      return {
        ...prev,
        currentFile: updatedFile,
        files: updatedFiles
      };
    });
  }, []);

  // Update Markdown content
  const updateMarkdownContent = useCallback((markdownContent: string) => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const updatedFile = {
        ...prev.currentFile,
        markdownContent,
        lastModified: new Date()
      };
      
      // Update both current file and files list in one setState
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? updatedFile : f
      );
      
      return {
        ...prev,
        currentFile: updatedFile,
        files: updatedFiles
      };
    });
  }, []);

  // Sync content from HTML to Markdown
  const syncContentFromHtml = useCallback(() => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const markdownContent = prepareHtmlForMarkdown(prev.currentFile.htmlContent);
      const updatedFile = {
        ...prev.currentFile,
        markdownContent,
        lastModified: new Date()
      };
      
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? updatedFile : f
      );
      
      return {
        ...prev,
        currentFile: updatedFile,
        files: updatedFiles
      };
    });
  }, []);

  // Sync content from Markdown to HTML
  const syncContentFromMarkdown = useCallback(() => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const htmlContent = prepareMarkdownForEditor(prev.currentFile.markdownContent);
      const updatedFile = {
        ...prev.currentFile,
        htmlContent,
        lastModified: new Date()
      };
      
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? updatedFile : f
      );
      
      return {
        ...prev,
        currentFile: updatedFile,
        files: updatedFiles
      };
    });
  }, []);

  const updateMetaWithSync = useCallback((meta: Partial<PostMeta>) => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const updatedFile = {
        ...prev.currentFile,
        frontmatter: {
          ...prev.currentFile.frontmatter,
          ...meta,
          // Generate slug if not specified
          slug: meta.slug || (meta.title ? generateSlug(meta.title) : prev.currentFile.frontmatter?.slug),
          // Generate excerpt if not specified
          excerpt: meta.excerpt || generateExcerpt(prev.currentFile.markdownContent),
          // Generate ID if not specified
          id: meta.id || prev.currentFile.frontmatter?.id || generateId(),
          // Update date
          date: formatDate(new Date())
        }
      };
      
      // Update both current file and files list in one setState
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? updatedFile : f
      );
      
      return {
        ...prev,
        currentFile: updatedFile,
        files: updatedFiles
      };
    });
  }, []);

  const importContext = useCallback(async () => {
    try {
      // Import context and clear localStorage
      const context = await importContextFile();
      
      // Convert context back to EditorFile format
      const importedFiles = convertContextToEditorFiles(context);
      
      // Update state with imported files
      setState(prev => ({
        ...prev,
        files: importedFiles,
        currentFile: importedFiles.length > 0 ? importedFiles[0] : null,
        context,
        menu: [] // Menu will be regenerated automatically
      }));
      
      console.log('Context imported successfully, files loaded:', importedFiles.length);
      
    } catch (error) {
      console.error('Failed to import context:', error);
      throw error;
    }
  }, []);

  return {
    state,
    actions: {
      loadFile,
      saveFile,
      saveAllData,
      selectFile,
      removeFile,
      updateHtmlContent,
      updateMarkdownContent,
      syncContentFromHtml,
      syncContentFromMarkdown,
      updateMeta: updateMetaWithSync,
      togglePreview,
      toggleDarkMode,
      exportToMDX,
      importContext
    }
  };
} 