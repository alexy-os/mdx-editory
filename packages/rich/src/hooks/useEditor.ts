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
  saveMDXFile 
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
    
    // Convert Markdown to HTML for the TipTap editor
    const htmlContent = isMarkdownContent(body) ? prepareMarkdownForEditor(body) : body;
    
    const editorFile: EditorFile = {
      id: generateId().toString(),
      name: file.name,
      path: file.name,
      content: htmlContent, // Save HTML for the editor
      originalMarkdown: body, // Save original Markdown
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
      // Convert HTML back to Markdown for saving
      const markdownContent = prepareHtmlForMarkdown(file.content);
      
      // Create a copy of the file with Markdown content for saving
      const fileToSave: EditorFile = {
        ...file,
        content: markdownContent
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

  const updateContent = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        content,
        lastModified: new Date()
      } : null
    }));
  }, []);

  const updateMeta = useCallback((meta: Partial<PostMeta>) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        frontmatter: {
          ...prev.currentFile.frontmatter,
          ...meta,
          // Generate slug if not specified
          slug: meta.slug || (meta.title ? generateSlug(meta.title) : prev.currentFile.frontmatter?.slug),
          // Generate excerpt if not specified
          excerpt: meta.excerpt || generateExcerpt(prev.currentFile.content),
          // Generate ID if not specified
          id: meta.id || prev.currentFile.frontmatter?.id || generateId(),
          // Update date
          date: formatDate(new Date())
        }
      } : null
    }));
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

  const updateCurrentFileInList = useCallback(() => {
    setState(prev => {
      if (!prev.currentFile) return prev;
      
      const updatedFiles = prev.files.map(f => 
        f.id === prev.currentFile!.id ? prev.currentFile! : f
      );
      
      return {
        ...prev,
        files: updatedFiles
      };
    });
  }, []);

  const exportToMDX = useCallback(() => {
    if (!state.currentFile) return '';
    // Convert HTML back to Markdown for export
    const markdownContent = prepareHtmlForMarkdown(state.currentFile.content);
    return stringifyMarkdownFile(state.currentFile.frontmatter || {}, markdownContent);
  }, [state.currentFile]);

  // Update file in the list when content or metadata changes
  const updateContentWithSync = useCallback((content: string) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        content,
        lastModified: new Date()
      } : null
    }));
    // Sync with the list of files
    setTimeout(updateCurrentFileInList, 0);
  }, [updateCurrentFileInList]);

  const updateMetaWithSync = useCallback((meta: Partial<PostMeta>) => {
    setState(prev => ({
      ...prev,
      currentFile: prev.currentFile ? {
        ...prev.currentFile,
        frontmatter: {
          ...prev.currentFile.frontmatter,
          ...meta,
          // Generate slug if not specified
          slug: meta.slug || (meta.title ? generateSlug(meta.title) : prev.currentFile.frontmatter?.slug),
          // Generate excerpt if not specified
          excerpt: meta.excerpt || generateExcerpt(prev.currentFile.content),
          // Generate ID if not specified
          id: meta.id || prev.currentFile.frontmatter?.id || generateId(),
          // Update date
          date: formatDate(new Date())
        }
      } : null
    }));
    // Sync with the list of files
    setTimeout(updateCurrentFileInList, 0);
  }, [updateCurrentFileInList]);

  return {
    state,
    actions: {
      loadFile,
      saveFile,
      saveAllData,
      selectFile,
      removeFile,
      updateContent: updateContentWithSync,
      updateMeta: updateMetaWithSync,
      togglePreview,
      toggleDarkMode,
      exportToMDX
    }
  };
} 